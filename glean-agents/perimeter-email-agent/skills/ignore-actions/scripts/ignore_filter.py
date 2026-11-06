#!/usr/bin/env python3
"""Step 7 ignore filter for the Outlook action board.

Usage: python3 ignore_filter.py
Reads the List messages results that the run saved (the files of the agent sandbox, newest file wins for a message) and prints one line of JSON:
{"hidden": [...], "newReply": [...], "files": N}
hidden:   conversations whose newest message carries the category Brief: Ignored (their items are left out of the board)
newReply: conversations where an older message carries it and the newest does not (their items get " New reply since ignored." in Why included)
Each entry is {"cid": conversationId, "subject": subject of the newest message, "from": its sender address}. Nothing is written or sent.
"""
import glob
import json
import os
import sys

MAIL_GLOB = '/home/user/tool_output/OUTLOOK_LIST_MESSAGES_*/OUTLOOK_LIST_MESSAGES_*.json'
IGNORED = 'Brief: Ignored'


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


def marked(m):
    cats = m.get('categories')
    return isinstance(cats, list) and IGNORED in cats


def address(m):
    sender = m.get('from')
    a = sender.get('emailAddress') if isinstance(sender, dict) else None
    return str(a.get('address') if isinstance(a, dict) else '').strip().lower()


def classify(mail):
    by_cid = {}
    for m in mail:
        by_cid.setdefault(str(m.get('conversationId')), []).append(m)
    hidden, new_reply = [], []
    for cid in sorted(by_cid):
        msgs = by_cid[cid]
        newest = max(msgs, key=when)
        entry = {'cid': cid, 'subject': str(newest.get('subject') or ''), 'from': address(newest)}
        if marked(newest):
            hidden.append(entry)
        elif any(marked(m) for m in msgs if m is not newest):
            new_reply.append(entry)
    return {'hidden': hidden, 'newReply': new_reply}


def main():
    pattern = os.environ.get('IGNORE_FILTER_MAIL_GLOB', MAIL_GLOB)
    out = classify(load_mail(pattern))
    out['files'] = len(glob.glob(pattern))
    print(json.dumps(out, ensure_ascii=False, separators=(',', ':')))
    return 0


if __name__ == '__main__':
    sys.exit(main())
