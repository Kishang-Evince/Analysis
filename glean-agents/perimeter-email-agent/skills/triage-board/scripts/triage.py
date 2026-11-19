#!/usr/bin/env python3
"""Step 1C triage table for the Outlook action board.

Usage: python3 triage.py
Reads the List messages results that the run saved (the files of the agent sandbox, newest file wins for a message) and prints a compact table.
First line: files N conversations C awaiting A. With no saved files it prints only: files 0
One line per inbound conversation (I1, I2, ... newest first), then one line per sent conversation (W1, W2, ...).
The table holds facts only. It never decides that a request was answered, the model keeps that judgment.
Nothing is written or sent.
"""
import glob
import datetime
import json
import os
import re
import sys

MAIL_GLOB = '/home/user/tool_output/OUTLOOK_LIST_MESSAGES_*/OUTLOOK_LIST_MESSAGES_*.json'
BRIEF_PREFIXES = ('daily brief:', 'weekly brief:')
AUTO_SENDER = re.compile(r'no[-_.]?reply|do[-_.]?not[-_.]?reply|mailer-daemon|postmaster|notifications?@|newsletter|updates?(@|$)|[a-z]updates@')
AUTO_SUBJECT = ('automatic reply', 'automatic response', 'autoreply', 'out of office', 'undeliverable', 'delivery status notification')


def is_automated(sender, subject):
    """Mail no person wrote for the owner: a no-reply or newsletter sender, or an automatic reply.
    shortcut: names only, a person who writes from a robot address is missed, extend the pattern when that happens."""
    return bool(AUTO_SENDER.search(str(sender or '').lower())) or str(subject or '').strip().lower().startswith(AUTO_SUBJECT)


def find_messages(obj, out):
    """Every message-like object (conversationId plus a received or sent time), whatever the nesting of the saved result."""
    if isinstance(obj, dict):
        if 'conversationId' in obj and ('receivedDateTime' in obj or 'sentDateTime' in obj):
            out.append(obj)
        for v in obj.values():
            find_messages(v, out)
    elif isinstance(obj, list):
        for v in obj:
            find_messages(v, out)


def load_mail(pattern):
    paths = sorted(glob.glob(pattern), key=lambda p: (os.path.getmtime(p), p))
    by_key = {}
    for path in paths:
        try:
            with open(path, encoding='utf-8') as fh:
                found = []
                find_messages(json.load(fh), found)
        except (OSError, ValueError):
            continue
        for m in found:
            by_key[m.get('id') or (m.get('conversationId'), m.get('receivedDateTime'), m.get('sentDateTime'))] = m
    return list(by_key.values())


def when(m):
    return str(m.get('receivedDateTime') or m.get('sentDateTime') or '')


def address(person):
    a = person.get('emailAddress') if isinstance(person, dict) else None
    return str(a.get('address') if isinstance(a, dict) else '').strip().lower()


def addresses(m, key):
    people = m.get(key)
    found = [address(p) for p in people] if isinstance(people, list) else []
    return [a for a in found if a]


def norm_subject(value):
    return re.sub(r'^\s*((re|fw|fwd)\s*:\s*)+', '', str(value or ''), flags=re.I).strip().lower()


def owner(mail):
    """The mailbox owner, as the address that is most often a To recipient. Inbound mail is addressed to the owner, sent mail to many others.
    A tie for first place means no clear owner, then only the missing receivedDateTime marks a sent message.
    shortcut: breaks for a mailbox of mostly bcc mail, set an explicit address when that matters."""
    counts = {}
    for m in mail:
        for a in addresses(m, 'toRecipients'):
            counts[a] = counts.get(a, 0) + 1
    ranked = sorted(counts.values(), reverse=True)
    if not ranked or (len(ranked) > 1 and ranked[0] == ranked[1]):
        return ''
    return max(sorted(counts), key=lambda a: counts[a])


def is_inbound(m, me):
    """Sent messages carry no receivedDateTime, or the run asked for both times and the sender is the owner."""
    if not m.get('receivedDateTime'):
        return False
    return not (me and address(m.get('from')) == me)


def own_brief(m, me):
    """The brief this agent mailed to the user. Step 1 removes it, so the table leaves it out too."""
    if not str(m.get('subject') or '').strip().lower().startswith(BRIEF_PREFIXES):
        return False
    if not is_inbound(m, me):
        return True
    return address(m.get('from')) in addresses(m, 'toRecipients')


def age_days(newest, today):
    """Whole days between the date of the newest message (the date part of its ISO time) and today (a date or YYYY-MM-DD, default today in UTC)."""
    day = datetime.date.fromisoformat(str(today)) if today else datetime.datetime.now(datetime.timezone.utc).date()
    try:
        return (day - datetime.date.fromisoformat(newest[:10])).days
    except ValueError:
        return 0


def triage(mail, today=None, read_days=3):
    me = owner(mail)
    mail = [m for m in mail if not own_brief(m, me)]
    inbound, sent = {}, {}
    for m in mail:
        (inbound if is_inbound(m, me) else sent).setdefault(str(m.get('conversationId')), []).append(m)
    rows = []
    for cid, msgs in inbound.items():
        newest = max(msgs, key=when)
        sent_times = [when(s) for s in sent.get(cid, [])]
        rows.append({
            'cid': cid,
            'subject': str(newest.get('subject') or ''),
            'from': address(newest.get('from')),
            'newest': when(newest),
            'count': len(msgs),
            'unread': newest.get('isRead') is not True,
            'categories': [c for c in (newest.get('categories') or []) if isinstance(c, str)],
            'importance': str(newest.get('importance') or 'normal'),
            'flag': (newest.get('flag') or {}).get('flagStatus') == 'flagged',
            'sentAfter': any(s > when(newest) for s in sent_times),
            'auto': is_automated(address(newest.get('from')), newest.get('subject')),
        })
        rows[-1]['ageDays'] = age_days(when(newest), today)
        rows[-1]['old'] = not rows[-1]['unread'] and rows[-1]['ageDays'] > read_days
    rows.sort(key=lambda r: (r['newest'], r['cid']), reverse=True)
    for r in rows:
        key = norm_subject(r['subject'])
        r['sameSubjectAs'] = sorted(o['cid'] for o in rows if o is not r and norm_subject(o['subject']) == key)
    awaiting = []
    for cid, msgs in sent.items():
        newest = max(msgs, key=when)
        later = sorted((m for m in inbound.get(cid, []) if when(m) > when(newest)), key=when)
        awaiting.append({
            'cid': cid,
            'subject': str(newest.get('subject') or ''),
            'to': addresses(newest, 'toRecipients'),
            'cc': addresses(newest, 'ccRecipients'),
            'sent': when(newest),
            'repliesAfter': [{'from': address(m.get('from')), 'received': when(m)} for m in later],
        })
    awaiting.sort(key=lambda r: (r['sent'], r['cid']), reverse=True)
    return {'conversations': rows, 'awaiting': awaiting}


def clean(value):
    return re.sub(r'\s+', ' ', str(value).replace('|', '/')).strip()


def render(result, files):
    rows, awaiting = result['conversations'], result['awaiting']
    label = {r['cid']: f'I{i}' for i, r in enumerate(rows, 1)}
    lines = [f'files {files} conversations {len(rows)} awaiting {len(awaiting)}']
    for i, r in enumerate(rows, 1):
        same = ','.join(label[c] for c in r['sameSubjectAs']) or '-'
        cats = ','.join(r['categories']) or '-'
        lines.append('|'.join([
            f'I{i}', r['newest'], 'unread' if r['unread'] else 'read', r['from'] or '-', clean(r['subject']),
            f"msgs {r['count']}", r['importance'], 'flag' if r['flag'] else 'noflag',
            'sentafter' if r['sentAfter'] else 'nosent', f'cats {clean(cats)}', f'same {same}', 'auto' if r['auto'] else 'human', f"age {r['ageDays']}d", 'old' if r['old'] else 'new', f"cid {r['cid']}"]))
    for i, r in enumerate(awaiting, 1):
        replies = ','.join(f"{x['from'] or '-'}@{x['received']}" for x in r['repliesAfter']) or '-'
        lines.append('|'.join([
            f'W{i}', r['sent'], f"to {','.join(r['to']) or '-'}", f"cc {','.join(r['cc']) or '-'}", clean(r['subject']),
            f'replies {replies}', f"cid {r['cid']}"]))
    return lines


def option(args, name, default):
    return args[args.index(name) + 1] if name in args and args.index(name) + 1 < len(args) else default


def main():
    pattern = os.environ.get('TRIAGE_MAIL_GLOB', MAIL_GLOB)
    files = len(glob.glob(pattern))
    if files == 0:
        print('files 0')
        return 0
    args = sys.argv[1:]
    try:
        today, read_days = option(args, '--today', None), int(option(args, '--read-days', 3))
        print('\n'.join(render(triage(load_mail(pattern), today=today, read_days=read_days), files)))
    except ValueError as e:
        print(f'error: --today needs YYYY-MM-DD and --read-days a whole number ({e})')
        return 2
    return 0


if __name__ == '__main__':
    sys.exit(main())
