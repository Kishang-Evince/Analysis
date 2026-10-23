#!/usr/bin/env python3
"""Renders the Outlook action board brief from a JSON file into email safe HTML.

Usage: python3 render_brief.py <board.json> <brief.html>
Writes the HTML file (UTF-8), prints one line of JSON with the counts, exits 0.
A structural error prints "error: <path>: <message>" to stderr and exits 2.
Port of test-mailer/brief-render.mjs, which stays the test oracle.
"""
import datetime
import functools
import json
import math
import os
import re
import sys

ASSETS = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets')
MODES = ('morning', 'end-of-day', 'weekly')
WEEK_LISTS = (('asksToMe', 'Asks to me', 'sh1'), ('openCommitments', 'My open commitments', 'sh2'), ('othersOwe', 'Others owe me', 'sh3'), ('waitingOnOthers', 'Waiting on others', 'sh4'))
PURPLE, RED = '#5B62D6', '#B42318'
MONTHS = {m: i + 1 for i, m in enumerate(('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'))}


class StructuralError(Exception):
    """The JSON does not have the shape of the contract. Carries the path of the offending value."""

    def __init__(self, path, message):
        super().__init__(f'{path}: {message}')


def text(value):
    return '' if value is None else str(value)


def escape(value):
    return text(value).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')


def esc(value):
    """HTML escape of the four characters & < > ". A missing or empty value is written as "not given"."""
    return escape(value) if text(value).strip() else 'not given'


def number(value):
    try:
        n = float(text(value).strip())
    except ValueError:
        return 0
    return int(n) if math.isfinite(n) else 0


def round_half_up(x):
    return math.floor(x + 0.5)


@functools.lru_cache(maxsize=None)
def fragment(name):
    with open(os.path.join(ASSETS, f'{name}.html'), encoding='utf-8', newline='') as f:
        content = f.read()
    return content[:-1] if content.endswith('\n') else content


def fill(name, mapping):
    """Replaces @@KEY@@ in one pass, so a value that contains @@KEY@@ is never expanded. Raises KeyError for a missing key."""
    return re.sub(r'@@(\w+)@@', lambda m: text(mapping[m.group(1)]), fragment(name), flags=re.ASCII)


def plural(n, word):
    return f'{n} {word}{"" if n == 1 else "s"}'


def initials(name):
    return ''.join(w[0].upper() for w in text(name).split()[:2]) or '?'


def flag(value):
    """True for a real mark. The strings "false", "no", "none" and "not given" mean the mark is absent."""
    if isinstance(value, str):
        return value.strip().lower() not in ('', 'false', 'no', 'none', 'not given')
    return bool(value)


def pill(cls, label):
    return fill('pill', {'PCLASS': cls, 'TEXT': esc(label)})


def pills(c):
    return {'VIP_PILL': pill('pv', 'VIP') if flag(c.get('vip')) else '', 'TOPIC_PILL': pill('pt', f'Topic: {c["topic"]}') if flag(c.get('topic')) else ''}


def row_text(label, value):
    return fill('row-text', {'LABEL': label, 'TEXT': esc(value)}) if text(value).strip() else ''


def row_kv(label, value):
    return fill('row-kv', {'LABEL': label, 'TEXT': esc(value)}) if text(value).strip() else ''


def date_of(value):
    m = re.search(r'([A-Z][a-z]{2}) (\d{1,2}), (\d{4})', text(value))
    if not m or m.group(1) not in MONTHS:
        return None
    try:
        return datetime.date(int(m.group(3)), MONTHS[m.group(1)], 1).toordinal() + int(m.group(2)) - 1
    except ValueError:
        return None


def days_from_due(due, as_of):
    """Whole days between the first date in the due text and as_of, only when the due text ends with "passed", else 0."""
    if not re.search(r'passed\s*\Z', text(due)):
        return 0
    start, end = date_of(due), date_of(as_of)
    if start is None or end is None:
        return 0
    return max(0, end - start)


def days_of(c, as_of):
    return days_from_due(c.get('due'), as_of) if c.get('days') is None else number(c['days'])


def inbound_days(n):
    return (plural(n, 'day'), 'dpr' if n >= 5 else 'dpa') if n > 0 else ('Not overdue', 'dpn')


def waiting_days(n):
    return plural(n, 'day'), 'dpr' if n >= 8 else 'dpa' if n >= 4 else 'dpn'


def inbound_card(c, rank, as_of):
    days, dclass = inbound_days(days_of(c, as_of))
    return fill('card-inbound', {
        'RANK': rank, 'PERSON': esc(c.get('person')), **pills(c), 'SUBJECT': esc(c.get('subject')), 'DCLASS': dclass, 'DAYS': days,
        'ASK': esc(c.get('ask')), 'ACTION': esc(c.get('action')), 'CONFIDENCE': esc(c.get('confidence')), 'OWNERSHIP': esc(c.get('ownership')),
        'MESSAGES': esc(c.get('messages')), 'WHY': esc(c.get('why')), 'DUE': esc(c.get('due')), 'ORIGINAL': esc(c.get('original')),
        'LATEST': esc(c.get('latest')), 'MORE_ROW': row_text('More asks', c.get('more')), 'ALSO_ROW': row_text('Also waiting on', c.get('also')),
    })


def waiting_card(c):
    days_waiting = number(c.get('daysWaiting'))
    days, dclass = waiting_days(days_waiting)
    return fill('card-waiting', {
        'INITIALS': escape(initials(text(c.get('recipients')).split(',')[0])), 'RECIPIENTS': esc(c.get('recipients')), **pills(c),
        'SUBJECT': esc(c.get('subject')), 'DCLASS': dclass, 'DAYS': days, 'ASKED': esc(c.get('asked')), 'SENT': esc(c.get('sent')),
        'STALENESS': esc(c.get('staleness')), 'DAYS_WAITING': days_waiting, 'FOLLOW_UP': esc(c.get('followUp')),
        'RESPONSES_ROW': row_kv('Responses', c.get('responses')),
    })


def inbound_cards(items, as_of):
    return [inbound_card(c, i + 1, as_of) for i, c in enumerate(items)]


SECTIONS = (
    ('must', 'Must Do Today', 'sh1', inbound_cards),
    ('waitingYou', 'Waiting on Your Response', 'sh2', inbound_cards),
    ('waiting', 'Waiting on Others', 'sh3', lambda items, as_of: [waiting_card(c) for c in items]),
    ('review', 'Review Quickly', 'sh4', inbound_cards),
)


def commitments(c):
    def listing(label, rows, rclass, role):
        if not rows:
            return ''
        body = ''.join(fill('commit-row', {
            'RCLASS': rclass, 'BADGE': escape(initials(text(r.get('who')))) if text(r.get('who')) else '', 'WHO': esc(r.get('who')), 'ROLE': role,
            'STATUS': esc(r.get('status')), 'OVERDUE': fragment('overdue-pill') if flag(r.get('overdue')) else '', 'WHAT': esc(r.get('what')), 'DUE': esc(r.get('due')),
        }) for r in rows)
        return fill('commit-list', {'LABEL': label, 'ROWS': body})
    return listing('Mine', c['mine'], 'rk', 'You owe') + listing('Others owe me', c['others'], 'rw', 'Owes you')


def meeting_card(entry, rank, unsummarized):
    """One meeting: the first line is "title, time", the lines after it are the prep notes. The time is what follows the last comma."""
    first, *rest = text(entry).split('\n')
    cut = first.rfind(', ')
    title, time = (first, '') if cut == -1 else (first[:cut], first[cut + 2:])
    return fill('meeting-card', {
        'RCLASS': 'rk', 'BADGE': rank, 'TITLE': escape(title), 'TIME': escape(time), 'PILL': pill('dpa', 'Not summarized') if unsummarized else '',
        'NOTES_ROW': fill('meeting-notes', {'DETAILS': '<br>'.join(escape(line) for line in rest)}) if rest else '',
    })


def meetings(m):
    entries, unsummarized = m['entries'], m['unsummarized']
    return [meeting_card(e, i + 1, False) for i, e in enumerate(entries)] + [meeting_card(u, len(entries) + i + 1, True) for i, u in enumerate(unsummarized)]


def duplicate_pairs(cards):
    seen = {}
    for c in cards:
        key = (text(c.get('person')), text(c.get('subject')))
        seen[key] = seen.get(key, 0) + 1
    return sum(1 for n in seen.values() if n > 1)


def stats(d, must, waiting_you, review, waiting):
    everyone = must + waiting_you + review
    people = {}

    def add(name, key):
        p = people.setdefault(name, {'name': name, 'todo': 0, 'wait': 0})
        p[key] += 1

    for c in must:
        add(text(c.get('person')) or 'not given', 'todo')
    for c in waiting:
        for r in re.split(r',\s*', re.sub(r',?\s*and \d+ more\Z', '', text(c.get('recipients')))):
            if r:
                add(r, 'wait')
    rows = sorted(({**p, 'total': p['todo'] + p['wait']} for p in people.values()), key=lambda p: -p['total'])
    drafts = sum(1 for c in everyone + waiting if 'Draft ready in Outlook' in f'{text(c.get("why"))} {text(c.get("followUp"))}')
    return {
        'open': len(everyone) + len(waiting), 'must': len(must), 'waiting': len(waiting), 'review': len(review), 'drafts': drafts,
        'oldestOverdue': max([0] + [days_of(c, d.get('asOf')) for c in must]), 'longestWait': max([0] + [number(c.get('daysWaiting')) for c in waiting]),
        'recipients': len(rows), 'duplicates': duplicate_pairs(everyone), 'rows': rows,
    }


def kpi_rows(tiles):
    def tile(t):
        label, value, color, unit = (t + (PURPLE, ''))[:4] if len(t) == 2 else t
        return fill('kpi-tile', {'COLOR': color, 'VALUE': value, 'LABEL': label, 'UNIT': fill('kpi-unit', {'COLOR': color, 'UNIT_TEXT': unit}) if unit else ''})
    return ''.join(fill('kpi-row', {'TILES': fragment('kpi-gap').join(tile(t) for t in tiles[i:i + 3])}) for i in range(0, len(tiles), 3))


def chart(rows):
    top = rows[:8]
    biggest = top[0]['total'] if top else 1
    out = []
    for p in top:
        todo, wait = round_half_up(p['todo'] / biggest * 100), round_half_up(p['wait'] / biggest * 100)
        sub = ', '.join(s for s in (p['todo'] and f'{p["todo"]} to do', p['wait'] and f'{p["wait"]} waiting') if s)
        out.append(fill('chart-row', {
            'INITIALS': escape(initials(p['name'])), 'NAME': esc(p['name']), 'SUB': sub, 'PCT_TODO': todo, 'PCT_WAIT': wait,
            'PCT_REST': max(0, 100 - todo - wait), 'TOTAL': p['total'],
        }))
    return ''.join(out), len(top)


def object_list(value, path):
    if value is None:
        return []
    if not isinstance(value, list):
        raise StructuralError(path, 'not a list')
    for i, item in enumerate(value):
        if not isinstance(item, dict):
            raise StructuralError(f'{path}[{i}]', 'not an object')
    return value


def object_of(value, path):
    if value is None:
        return {}
    if not isinstance(value, dict):
        raise StructuralError(path, 'not an object')
    return value


def check_mode(data):
    if not isinstance(data, dict):
        raise StructuralError('board', 'not an object')
    if data.get('mode') not in MODES:
        raise StructuralError('mode', f'must be one of {", ".join(MODES)}')


def check(data):
    lists = {key: object_list(data.get(key), key) for key, *_ in SECTIONS}
    c = object_of(data.get('commitments'), 'commitments')
    commit = {k: object_list(c.get(k), f'commitments.{k}') for k in ('mine', 'others')}
    m = object_of(data.get('meetings'), 'meetings')
    meet = {}
    for k in ('entries', 'unsummarized'):
        meet[k] = m.get(k) if m.get(k) is not None else []
        if not isinstance(meet[k], list):
            raise StructuralError(f'meetings.{k}', 'not a list')
    return lists, commit, meet, object_notes(data)


def render_weekly(data):
    week = object_of(data.get('weekly'), 'weekly')
    lists = {key: object_list(week.get(key), f'weekly.{key}') for key, *_ in WEEK_LISTS}
    total = sum(len(rows) for rows in lists.values())
    body = []
    for key, title, sclass in WEEK_LISTS:
        if lists[key]:
            rows = ''.join(fill('week-row', {'WHO': esc(r.get('who')), 'WHAT': esc(r.get('what')), 'DATE': esc(r.get('date'))}) for r in lists[key])
            body += [fill('section-head', {'SCLASS': sclass, 'TITLE': title, 'COUNT': len(lists[key])}),
                     f'<table role="presentation" class="card" width="100%" cellpadding="0" cellspacing="0">{rows}</table>']
    if not total:
        body.append(fill('empty', {'TEXT': 'Nothing unresolved this week.'}))
    html = fill('shell', {
        'MODE': 'Weekly', 'AS_OF': esc(data.get('asOf')), 'HEADLINE': f'Unresolved this week: {total}.' if total else 'Nothing unresolved this week.',
        'KPI_ROWS': '', 'HIGHLIGHTS_ROW': '', 'CHART_ROW': '', 'BODY': ''.join(body),
        'NOTES': ''.join(f'<p style="margin:0 0 6px 0">{escape(n)}</p>' for n in object_notes(data)), 'SUMMARY': escape(data.get('summary')),
    })
    summary = {'mode': 'weekly', 'cards': total, 'weekly': {k: len(v) for k, v in lists.items()}, 'commitment_rows': 0, 'meeting_cards': 0,
               'tiles': 0, 'chart_rows': 0, 'duplicates': 0, 'bytes': len(html.encode('utf-8'))}
    return html, summary


def object_notes(data):
    notes = data.get('notes') if data.get('notes') is not None else []
    if not isinstance(notes, list):
        raise StructuralError('notes', 'not a list')
    return notes


def render(data):
    """Returns (html, summary). Raises StructuralError when the data is not shaped like the contract."""
    check_mode(data)
    if data['mode'] == 'weekly':
        return render_weekly(data)
    lists, commit_rows, meet, notes = check(data)
    must, waiting_you, review, waiting = lists['must'], lists['waitingYou'], lists['review'], lists['waiting']
    s = stats(data, must, waiting_you, review, waiting)
    eod = data['mode'] == 'end-of-day'
    as_of = data.get('asOf')
    body = []
    for key, title, sclass, build in SECTIONS:
        if lists[key]:
            body += [fill('section-head', {'SCLASS': sclass, 'TITLE': title, 'COUNT': len(lists[key])}), *build(lists[key], as_of)]
    commit = commitments(commit_rows)
    commit_count = len(commit_rows['mine']) + len(commit_rows['others'])
    if commit:
        body += [fill('section-head', {'SCLASS': 'sh5', 'TITLE': 'Commitments', 'COUNT': commit_count}), commit]
    meet_cards = meetings(meet)
    if meet_cards:
        body += [fill('section-head', {'SCLASS': 'sh6', 'TITLE': 'Meeting prep', 'COUNT': len(meet_cards)}), *meet_cards]
    empty = not s['open'] and not commit
    empty_text = 'All clear for the rest of today.' if eod else 'Inbox is clear.'
    if empty:
        body.insert(0, fill('empty', {'TEXT': empty_text}))
    if eod:
        tiles = [('Must do overdue', s['must']), ('Overdue sent asks', s['waiting']), ('Drafts ready', s['drafts']), ('Oldest overdue', s['oldestOverdue'], RED, 'days'),
                 ('Longest wait', s['longestWait'], PURPLE, 'days'), ('Recipients', s['recipients'])]
    else:
        tiles = [('Open items', s['open']), ('Must do today', s['must']), ('Waiting on others', s['waiting']), ('Drafts ready', s['drafts']), ('Review quickly', s['review']),
                 ('Oldest overdue', s['oldestOverdue'], RED, 'days'), ('Longest wait', s['longestWait'], PURPLE, 'days'), ('Recipients', s['recipients']),
                 ('Duplicate pairs', s['duplicates'])]
    if empty:
        headline = empty_text
    elif eod:
        headline = f'Overdue for you: {s["must"]}. Overdue sent asks: {s["waiting"]}. Start with the first card.'
    else:
        headline = f'Needs you today: {s["must"]}. Waiting on others: {s["waiting"]}. Start with the first card.'
    chart_html, chart_rows = chart(s['rows']) if s['rows'] else ('', 0)
    html = fill('shell', {
        'MODE': 'End-of-day' if eod else 'Morning', 'AS_OF': esc(as_of), 'HEADLINE': headline, 'KPI_ROWS': '' if empty else kpi_rows(tiles),
        'HIGHLIGHTS_ROW': fill('highlights-row', {'TEXT': esc(data['highlights'])}) if text(data.get('highlights')).strip() else '',
        'CHART_ROW': fill('chart-block', {'CHART_ROWS': chart_html}) if s['rows'] else '',
        'BODY': ''.join(body), 'NOTES': ''.join(f'<p style="margin:0 0 6px 0">{escape(n)}</p>' for n in notes), 'SUMMARY': escape(data.get('summary')),
    })
    summary = {
        'mode': data['mode'], 'cards': len(must) + len(waiting_you) + len(waiting) + len(review),
        'sections': {k: len(lists[k]) for k in ('must', 'waitingYou', 'waiting', 'review')},
        'commitment_rows': commit_count, 'meeting_cards': len(meet_cards), 'tiles': 0 if empty else len(tiles), 'chart_rows': chart_rows,
        'duplicates': s['duplicates'], 'bytes': len(html.encode('utf-8')),
    }
    return html, summary


def main(argv):
    if len(argv) != 3:
        print('usage: render_brief.py <board.json> <brief.html>', file=sys.stderr)
        return 2
    source, target = argv[1], argv[2]
    try:
        with open(source, encoding='utf-8') as f:
            data = json.load(f)
        html, summary = render(data)
    except (OSError, ValueError) as e:
        print(f'error: {source}: {e}', file=sys.stderr)
        return 2
    except StructuralError as e:
        print(f'error: {e}', file=sys.stderr)
        return 2
    with open(target, 'w', encoding='utf-8', newline='') as f:
        f.write(html)
    print(json.dumps(summary, separators=(',', ':')))
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
