#!/usr/bin/env python3
"""Renders the Outlook action board for a Glean chat as an interactive HTML page with Ignore buttons.

Usage: python3 render_widget.py <board.json> <widget.html> [--ignore N[,N] | --undo N]
Writes the HTML file (UTF-8), prints one line of JSON (counts and the card numbers), exits 0.
--ignore takes the cards with those numbers out of board.json (several numbers are duplicates of one item), --undo puts an ignored item back.
Both rewrite board.json after the page is made, so the file always holds the board that is shown.
Each card is also checked against the saved List messages results of the run (its conversation is found by cid, or by subject and sender
address when the cid is missing and only one conversation fits): when an older message of the
conversation carries the category Brief: Ignored and the newest does not, the card gets " New reply since ignored." in why. When the newest
message carries the category the card is taken out and counted in hidden.
A structural error prints "error: <path>: <message>" to stderr, writes nothing and exits 2.
The buttons send a chat message through GleanBridge.postMessage, nothing else. No network, form or external file.
"""
import copy
import glob
import json
import os
import re
import sys

MODES = {'morning': 'Morning', 'end-of-day': 'End-of-day'}
SECTIONS = (('must', '\U0001F534 Must Do Today', False), ('waitingYou', '\U0001F7E1 Waiting on Your Response', False),
            ('waiting', '\U0001F7E0 Waiting on Others', True), ('review', '\U0001F535 Review Quickly', False))
NEW_REPLY = 'New reply since ignored.'
IGNORED = 'Brief: Ignored'
MAIL_GLOB = '/home/user/tool_output/OUTLOOK_LIST_MESSAGES_*/OUTLOOK_LIST_MESSAGES_*.json'
NO_BRIDGE = 'Ignore buttons need the Glean chat, type Ignore N instead.'

CSS = '''
:root{--bg:#fff;--fg:#1f2328;--mut:#656d76;--line:#d0d7de;--card:#f6f8fa;--acc:#4f46e5;--red:#b42318;--mark:#fff3bf}
@media (prefers-color-scheme:dark){:root{--bg:#161b22;--fg:#e6edf3;--mut:#8b949e;--line:#30363d;--card:#1c2128;--acc:#a5b4fc;--red:#ff8a80;--mark:#5c4a00}}
*{box-sizing:border-box}
body{margin:0;padding:12px;background:var(--bg);color:var(--fg);font:14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
h1{font-size:18px;margin:4px 0 8px}h2{font-size:15px;margin:18px 0 8px}h3{font-size:13px;margin:10px 0 4px;color:var(--mut)}
p{margin:6px 0}.mut{color:var(--mut)}.note{color:var(--mut);font-size:13px}.summary{color:var(--mut);font-size:13px;margin-top:14px}
.card{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:10px 12px;margin:8px 0}
.top{display:flex;align-items:center;gap:10px}.title{flex:1;min-width:0;overflow-wrap:anywhere}
.num{flex:none;width:24px;height:24px;border-radius:50%;background:var(--line);text-align:center;line-height:24px;font-size:12px;font-weight:600}
.ig{flex:none;border:1px solid var(--acc);color:var(--acc);background:transparent;border-radius:6px;padding:4px 12px;font:inherit;cursor:pointer}
.ig:hover{background:var(--acc);color:var(--bg)}.ig:disabled{opacity:.45;cursor:default;background:transparent;color:var(--acc)}
.from{color:var(--mut);font-size:12px;margin:2px 0 0 34px;overflow-wrap:anywhere}
.ask{margin:6px 0 2px;font-weight:500}.preview{color:var(--mut);font-size:13px;border-left:3px solid var(--line);padding-left:8px;margin:4px 0;overflow-wrap:anywhere}.meta{margin:4px 0;display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.pill{display:inline-block;border:1px solid var(--line);border-radius:999px;padding:0 8px;font-size:12px;margin-left:4px}
.pill.act{margin:0;border-color:var(--acc);color:var(--acc)}.due.late{color:var(--red);font-weight:600}
mark{background:var(--mark);color:inherit;padding:0 2px;border-radius:3px}
a{color:var(--acc)}details{margin-top:6px}summary{cursor:pointer;color:var(--mut);font-size:13px}
dl{display:grid;grid-template-columns:max-content 1fr;gap:2px 12px;margin:6px 0 0;font-size:13px}dt{color:var(--mut)}dd{margin:0}
ul{margin:4px 0;padding-left:20px}.ignored li{display:flex;align-items:center;gap:10px;list-style:none;margin:4px 0}.ignored ul{padding:0}
'''

JS = r'''
(function(){
var bs=document.querySelectorAll('button[data-act]');
var b=window.GleanBridge;
function off(){for(var i=0;i<bs.length;i++){bs[i].disabled=true;}}
if(!b||typeof b.postMessage!=='function'){off();document.getElementById('nobridge').hidden=false;return;}
function wire(x){x.addEventListener('click',function(){
var ig=x.dataset.act==='ignore',n=x.dataset.n,s=x.dataset.subject;
b.postMessage({actionId:(ig?'ignore-':'undo-')+n,type:'glean-send-message',metadata:{displayLabel:(ig?'Ignore ':'Restore ')+'“'+s+'”',context:(ig?'Ignore ':'Undo ')+n}});
off();});}
for(var i=0;i<bs.length;i++){wire(bs[i]);}
})();
'''


class StructuralError(Exception):
    """The JSON does not have the shape of the contract. Carries the path of the offending value."""

    def __init__(self, path, message):
        super().__init__(f'{path}: {message}')


def text(value):
    return '' if value is None else str(value)


def escape(value):
    return text(value).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')


def esc(value):
    """HTML escape of & < > ". A missing or empty value is written as "not given"."""
    return escape(value) if text(value).strip() else 'not given'


def has(value):
    return bool(text(value).strip())


def flag(value):
    if isinstance(value, str):
        return value.strip().lower() not in ('', 'false', 'no', 'none', 'not given')
    return bool(value)


def pills(c):
    out = '<span class="pill">VIP</span>' if flag(c.get('vip')) else ''
    return out + (f'<span class="pill">Topic: {escape(c["topic"])}</span>' if flag(c.get('topic')) else '')


def link(url):
    u = text(url).strip()
    return f'<a href="{escape(u)}" target="_blank" rel="noopener noreferrer">Open email</a>' if re.match(r'https://', u, re.I) else ''


def from_line(c, who, received=True):
    """Muted line under the title: sender (or recipient) address and the received date. Left out when both are missing."""
    parts = [f'{who} {escape(c["email"])}'] if has(c.get('email')) else []
    if received and has(c.get('received')):
        parts.append(f'Received {escape(c["received"])}')
    return f'<div class="from">{" \u00b7 ".join(parts)}</div>' if parts else ''


def preview(c):
    return f'<div class="preview">{escape(c["preview"])}</div>' if has(c.get('preview')) else ''


def button(act, n, subject, label):
    return f'<button type="button" class="ig" data-act="{act}" data-n="{n}" data-subject="{escape(subject)}">{label}</button>'


def rows(pairs):
    """Definition list of the (label, value) pairs. A pair with value None is left out."""
    return '<dl>' + ''.join(f'<dt>{label}</dt><dd>{value}</dd>' for label, value in pairs if value is not None) + '</dl>'


def optional(value):
    return esc(value) if has(value) else None


def why(c):
    return esc(c.get('why')).replace(NEW_REPLY, f'<mark>{NEW_REPLY}</mark>')


def due(c):
    late = text(c.get('due')).strip().endswith('passed')
    return f'<span class="due{" late" if late else ""}">Due: {esc(c.get("due"))}</span>'


def inbound_card(n, c):
    detail = rows([('Confidence', esc(c.get('confidence'))), ('Ownership', esc(c.get('ownership'))), ('Original ask', esc(c.get('original'))),
                   ('Latest update', esc(c.get('latest'))), ('Messages', esc(c.get('messages'))), ('More asks', optional(c.get('more'))),
                   ('Also waiting on', optional(c.get('also'))), ('Draft', optional(c.get('draft')))])
    return (f'<div class="card" data-n="{n}"><div class="top"><span class="num">{n}</span>'
            f'<div class="title"><b>{esc(c.get("person"))} | {esc(c.get("subject"))}</b>{pills(c)}</div>{button("ignore", n, c.get("subject"), "Ignore")}</div>'
            f'{from_line(c, "From")}<div class="ask">{esc(c.get("ask"))}</div>{preview(c)}'
            f'<div class="meta"><span class="pill act">{esc(c.get("action"))}</span>{due(c)}</div>'
            f'<div>{why(c)}</div><div>{link(c.get("link"))}</div>'
            f'<details><summary>Details</summary>{detail}</details></div>')


def waiting_card(n, c):
    detail = rows([('Sent', esc(c.get('sent'))), ('Responses', optional(c.get('responses'))), ('Draft', optional(c.get('draft')))])
    return (f'<div class="card" data-n="{n}"><div class="top"><span class="num">{n}</span>'
            f'<div class="title"><b>{esc(c.get("recipients"))} | {esc(c.get("subject"))}</b>{pills(c)}</div>{button("ignore", n, c.get("subject"), "Ignore")}</div>'
            f'{from_line(c, "To", received=False)}<div class="ask">{esc(c.get("asked"))}</div>{preview(c)}'
            f'<div class="meta"><span class="pill act">{esc(c.get("staleness"))}</span><span>Days waiting: {esc(c.get("daysWaiting"))}</span></div>'
            f'<div>{esc(c.get("followUp"))}</div>' + (f'<div>{why(c)}</div>' if has(c.get('why')) else '') + f'<div>{link(c.get("link"))}</div>'
            f'<details><summary>Details</summary>{detail}</details></div>')


def items(data, key):
    value = data.get(key, [])
    if not isinstance(value, list):
        raise StructuralError(key, 'must be a list')
    for i, item in enumerate(value):
        if not isinstance(item, dict):
            raise StructuralError(f'{key}[{i}]', 'must be an object')
    return value


def commitment_lists(data):
    com = data.get('commitments') or {}
    if not isinstance(com, dict):
        raise StructuralError('commitments', 'must be an object')
    lists = []
    for key, label in (('mine', 'Mine'), ('others', 'Others owe me')):
        rs = items(com, key)
        lists.append((label, rs))
    return lists


def commitments_html(lists):
    if not any(rs for _, rs in lists):
        return ''
    out = '<h2>Commitments</h2>'
    for label, rs in lists:
        out += f'<h3>{label}</h3>'
        if not rs:
            out += '<p class="mut">None identified.</p>'
            continue
        out += '<ul>' + ''.join(
            f'<li>{esc(r.get("who"))} | {esc(r.get("what"))} | Due: {esc(r.get("due"))} | Status: {esc(r.get("status"))}'
            + (' | <mark>Overdue</mark>' if flag(r.get('overdue')) else '') + '</li>' for r in rs) + '</ul>'
    return out


def meetings_html(data):
    m = data.get('meetings') or {}
    if not isinstance(m, dict):
        raise StructuralError('meetings', 'must be an object')
    lines = [text(x) for x in m.get('entries', []) + m.get('unsummarized', [])]
    return '<h2>Meeting prep</h2>' + ''.join(f'<p>{esc(x)}</p>' for x in lines) if lines else ''


def ignored_html(data):
    ig = data.get('ignored', [])
    if not isinstance(ig, list):
        raise StructuralError('ignored', 'must be a list')
    for i, x in enumerate(ig):
        if not isinstance(x, dict) or not has(x.get('n')) or not has(x.get('subject')):
            raise StructuralError(f'ignored[{i}]', 'needs n and subject')
    if not ig:
        return '', 0
    lis = ''.join(f'<li><span class="num">{escape(x["n"])}</span><span>{esc(x["subject"])}</span>{button("undo", escape(x["n"]), x["subject"], "Undo")}</li>' for x in ig)
    return f'<section class="ignored"><h2>Ignored this session</h2><ul>{lis}</ul></section>', len(ig)


def hidden_count(data):
    h = data.get('hidden', 0)
    if isinstance(h, bool) or not isinstance(h, int) or h < 0:
        raise StructuralError('hidden', 'must be a whole number, 0 or more')
    return h


def numbered(data):
    """[(n, section, index, card)] in display order, the numbers the chat uses."""
    out, n = [], 0
    for key, _, _ in SECTIONS:
        for i, c in enumerate(items(data, key)):
            n += 1
            out.append((n, key, i, c))
    return out


def apply_ignore(data, ns):
    """Copy of data without the cards numbered ns. They become one row of "ignored" (with the cards kept for undo), hidden grows by their count."""
    data = copy.deepcopy(data)
    by_n = {n: (key, i, c) for n, key, i, c in numbered(data)}
    for n in ns:
        if n not in by_n:
            raise StructuralError('ignore', f'no card {n}')
    removed = [by_n[n] for n in sorted(set(ns))]
    for key, i, _ in reversed(removed):
        del data[key][i]
    _, count = ignored_html(data)
    rows = data.get('ignored', [])
    rows.append({'n': count + 1, 'subject': text(removed[0][2].get('subject')), 'cards': [{'section': k, 'index': i, 'card': c} for k, i, c in removed]})
    data['ignored'] = rows
    data['hidden'] = hidden_count(data) + len(removed)
    return data


def apply_undo(data, n):
    """Copy of data with ignored row n put back in its place, the rows after it renumbered, hidden lowered by the cards restored."""
    data = copy.deepcopy(data)
    _, _ = ignored_html(data)
    rows = data.get('ignored', [])
    pos = next((k for k, x in enumerate(rows) if text(x.get('n')) == str(n)), None)
    if pos is None:
        raise StructuralError('undo', f'no ignored item {n}')
    saved = rows.pop(pos).get('cards') or []
    if not saved:
        raise StructuralError('undo', f'ignored item {n} has no saved cards')
    for r in sorted(saved, key=lambda r: r['index']):
        lst = data.setdefault(r['section'], [])
        lst.insert(min(r['index'], len(lst)), r['card'])
    for k, x in enumerate(rows, start=1):
        x['n'] = k
    data['hidden'] = max(0, hidden_count(data) - len(saved))
    return data


def find_messages(obj, out):
    """Collects every message-like object (conversationId plus a received or sent time), whatever the nesting of the saved result."""
    if isinstance(obj, dict):
        if 'conversationId' in obj and ('receivedDateTime' in obj or 'sentDateTime' in obj):
            out.append(obj)
        for v in obj.values():
            find_messages(v, out)
    elif isinstance(obj, list):
        for v in obj:
            find_messages(v, out)


def load_mail(pattern):
    """Messages from the saved List messages files. The oldest file is read first so a newer file wins for the same message id."""
    paths = sorted(glob.glob(pattern), key=lambda p: (os.path.getmtime(p), p))
    by_key = {}
    for path in paths:
        try:
            with open(path, encoding='utf-8') as f:
                found = []
                find_messages(json.load(f), found)
        except (OSError, ValueError):
            continue
        for m in found:
            by_key[m.get('id') or (m.get('conversationId'), m.get('receivedDateTime'), m.get('sentDateTime'))] = m
    return list(by_key.values())


def mail_time(m):
    return text(m.get('receivedDateTime') or m.get('sentDateTime'))


def is_marked(m):
    cats = m.get('categories')
    return isinstance(cats, list) and IGNORED in cats


def norm_subject(value):
    return re.sub(r'^\s*((re|fw|fwd)\s*:\s*)+', '', text(value), flags=re.I).strip().lower()


def sender(m):
    f = m.get('from')
    a = f.get('emailAddress') if isinstance(f, dict) else None
    return text(a.get('address') if isinstance(a, dict) else '').strip().lower()


def infer_messages(card, by_cid, by_subject):
    """Messages of the one conversation that matches the card by subject (and sender address when the card has one). None when it is not clear."""
    cids = by_subject.get(norm_subject(card.get('subject')))
    if not cids:
        return None
    if has(card.get('email')):
        who = text(card.get('email')).strip().lower()
        mine = [c for c in cids if any(sender(m) == who for m in by_cid[c])]
        cids = mine or cids
    return by_cid[next(iter(cids))] if len(cids) == 1 else None


def apply_marks(data, mail):
    """Returns (data copy, labeled, dropped). Cards are checked against the mail, see the module text."""
    data = copy.deepcopy(data)
    by_cid, by_subject = {}, {}
    for m in mail:
        cid = text(m.get('conversationId'))
        by_cid.setdefault(cid, []).append(m)
        by_subject.setdefault(norm_subject(m.get('subject')), set()).add(cid)
    labeled = dropped = 0
    for key, _, _ in SECTIONS:
        kept = []
        for c in items(data, key):
            msgs = by_cid.get(text(c.get('cid'))) if has(c.get('cid')) else infer_messages(c, by_cid, by_subject)
            if msgs:
                newest = max(msgs, key=mail_time)
                if is_marked(newest):
                    dropped += 1
                    continue
                if any(is_marked(m) for m in msgs if m is not newest) and NEW_REPLY not in text(c.get('why')):
                    c['why'] = (text(c.get('why')).rstrip() + ' ' if has(c.get('why')) else '') + NEW_REPLY
                    labeled += 1
            kept.append(c)
        if key in data:
            data[key] = kept
    if dropped:
        data['hidden'] = hidden_count(data) + dropped
    return data, labeled, dropped


def render(data, mail=None):
    """Returns (html, summary). Raises StructuralError."""
    if not isinstance(data, dict):
        raise StructuralError('board', 'must be an object')
    mode = data.get('mode')
    if mode not in MODES:
        raise StructuralError('mode', 'weekly has no widget, use the markdown board' if mode == 'weekly' else 'must be morning or end-of-day')
    if not has(data.get('asOf')):
        raise StructuralError('asOf', 'is required')
    notes = data.get('notes', [])
    if not isinstance(notes, list):
        raise StructuralError('notes', 'must be a list')
    data, labeled, dropped = apply_marks(data, load_mail(os.environ.get('BOARD_WIDGET_MAIL_GLOB', MAIL_GLOB)) if mail is None else mail)
    n, numbers, body, sections = 0, [], '', {}
    for key, label, is_waiting in SECTIONS:
        cards = items(data, key)
        sections[key] = len(cards)
        if not cards:
            continue
        body += f'<section><h2>{label}</h2>'
        for c in cards:
            n += 1
            numbers.append({'n': n, 'subject': text(c.get('subject')), 'section': key})
            body += waiting_card(n, c) if is_waiting else inbound_card(n, c)
        body += '</section>'
    lists = commitment_lists(data)
    commit = commitments_html(lists)
    empty = ''
    if n == 0 and not commit:
        empty = '<p>' + ('Inbox is clear.' if mode == 'morning' else 'All clear for the rest of today.') + '</p>'
    ignored, count = ignored_html(data)
    hidden = hidden_count(data)
    head = (f'<p class="note">{esc(data.get("vipLine"))}</p>' if has(data.get('vipLine')) else '') + \
        f'<h1>Outlook Action Board: {MODES[mode]}, as of {esc(data.get("asOf"))}</h1>' + \
        (f'<p><b>Highlights:</b> {esc(data.get("highlights"))}</p>' if has(data.get('highlights')) else '')
    tail = ''.join(f'<p class="note">{esc(x)}</p>' for x in notes) + (f'<p class="note">Ignored items hidden: {hidden}</p>' if hidden else '') + (f'<p class="summary">{esc(data.get("summary"))}</p>' if has(data.get('summary')) else '')
    html = ('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
            f'<title>Outlook Action Board</title><style>{CSS}</style></head><body>{head}{empty}{body}{commit}{meetings_html(data)}{tail}{ignored}'
            f'<p id="nobridge" class="note" hidden>{NO_BRIDGE}</p><script>{JS}</script></body></html>')
    summary = {'mode': mode, 'cards': n, 'sections': sections, 'ignored': count, 'hidden': hidden, 'labeled': labeled, 'dropped': dropped, 'buttons': n + count, 'numbers': numbers, 'bytes': len(html.encode('utf-8'))}
    return html, summary


def parse_numbers(value, label, single=False):
    try:
        ns = [int(x) for x in value.split(',')]
    except ValueError:
        ns = []
    if not ns or any(n < 1 for n in ns) or (single and len(ns) != 1):
        raise StructuralError(label, 'needs whole numbers like 1 or 1,2' if not single else 'needs one whole number like 1')
    return ns


def main(argv):
    args = argv[1:]
    if len(args) not in (2, 4) or (len(args) == 4 and args[2] not in ('--ignore', '--undo')):
        print('error: usage: render_widget.py <board.json> <widget.html> [--ignore N[,N] | --undo N]', file=sys.stderr)
        return 2
    try:
        with open(args[0], encoding='utf-8') as f:
            data = json.load(f)
        data, labeled, dropped = apply_marks(data, load_mail(os.environ.get('BOARD_WIDGET_MAIL_GLOB', MAIL_GLOB)))
        if len(args) == 4:
            label = args[2][2:]
            nums = parse_numbers(args[3], label, single=label == 'undo')
            data = apply_ignore(data, nums) if label == 'ignore' else apply_undo(data, nums[0])
        html, summary = render(data, mail=[])
        summary['labeled'], summary['dropped'] = labeled, dropped
    except (OSError, ValueError) as e:
        print(f'error: json: {e}', file=sys.stderr)
        return 2
    except StructuralError as e:
        print(f'error: {e}', file=sys.stderr)
        return 2
    with open(args[1], 'w', encoding='utf-8', newline='') as f:
        f.write(html)
    if len(args) == 4 or labeled or dropped:
        with open(args[0], 'w', encoding='utf-8', newline='') as f:
            json.dump(data, f, ensure_ascii=False)
    print(json.dumps(summary, ensure_ascii=False, separators=(',', ':')))
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
