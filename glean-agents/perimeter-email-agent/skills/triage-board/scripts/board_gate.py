#!/usr/bin/env python3
"""Completeness gate for the Outlook action board.

Usage: python3 board_gate.py
Run it after board.json is written and before the board is drawn. It takes the triage table of the saved List messages results
(the same I1, I2 ... and W1, W2 ... labels as triage.py) and checks that every row is accounted for:
a card in board.json (matched by cid), the category Brief: Ignored on the newest message, or a written reason for the label in classified.json
(a JSON object like {"I3": "newsletter, no ask"}). Prints "ok N of N rows accounted" and exits 0, or "missing M of N rows" with one line label|subject
per missing row and exits 1. Exits 2 when board.json is missing. It judges nothing, it only finds rows that nobody looked at.
Nothing is written or sent.
"""
import glob
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import triage as t  # noqa: E402

BOARD = '/home/user/output/board.json'
CLASSIFIED = '/home/user/output/classified.json'
SECTIONS = ('must', 'waitingYou', 'waiting', 'review')
IGNORED = 'Brief: Ignored'


def card_cids(board):
    """Conversation ids of every card in board.json, including the cards of items ignored in this chat."""
    cids = set()
    for key in SECTIONS:
        for c in board.get(key) or []:
            if isinstance(c, dict) and c.get('cid'):
                cids.add(str(c['cid']))
    for row in board.get('ignored') or []:
        for saved in (row.get('cards') or []) if isinstance(row, dict) else []:
            card = saved.get('card') if isinstance(saved, dict) else None
            if isinstance(card, dict) and card.get('cid'):
                cids.add(str(card['cid']))
    return cids


def labelled(result):
    """[(label, row)] in the order of the triage table: I rows first, then W rows."""
    return ([(f'I{i}', r) for i, r in enumerate(result['conversations'], 1)] +
            [(f'W{i}', r) for i, r in enumerate(result['awaiting'], 1)])


MIN_REASON_CHARS = 15
MIN_REASON_WORDS = 3
MAX_SHARED_REASON = 3
WEAK = ' (reason too short or repeated)'


def norm(reason):
    return ' '.join(str(reason or '').lower().split())


def weak_labels(classified):
    """Labels whose reason is too short (under 15 characters or 3 words) or is the same words as the reason of more than 3 rows."""
    counts = {}
    for reason in classified.values():
        if norm(reason):
            counts[norm(reason)] = counts.get(norm(reason), 0) + 1
    return {label for label, reason in classified.items() if norm(reason) and (
        len(norm(reason)) < MIN_REASON_CHARS or len(norm(reason).split()) < MIN_REASON_WORDS or counts[norm(reason)] > MAX_SHARED_REASON)}


def missing(result, cids, classified):
    """[(label, subject)] of the rows that are no card, not ignored and have no usable written reason. A weak reason adds a note to the subject."""
    weak = weak_labels(classified)
    gaps = []
    for label, row in labelled(result):
        if row['cid'] in cids or IGNORED in row.get('categories', []):
            continue
        if not norm(classified.get(label)):
            gaps.append((label, row['subject']))
        elif label in weak:
            gaps.append((label, row['subject'] + WEAK))
    return gaps


def load_json(path):
    try:
        with open(path, encoding='utf-8') as fh:
            data = json.load(fh)
    except (OSError, ValueError):
        return None
    return data if isinstance(data, dict) else None


def main():
    board = load_json(os.environ.get('BOARD_GATE_BOARD', BOARD))
    if board is None:
        print('no board.json found, write the board first')
        return 2
    pattern = os.environ.get('TRIAGE_MAIL_GLOB', t.MAIL_GLOB)
    if not glob.glob(pattern):
        print('ok no saved mail')
        return 0
    result = t.triage(t.load_mail(pattern))
    classified = load_json(os.environ.get('BOARD_GATE_CLASSIFIED', CLASSIFIED)) or {}
    total = len(labelled(result))
    gaps = missing(result, card_cids(board), classified)
    if not gaps:
        print(f'ok {total} of {total} rows accounted')
        return 0
    print(f'missing {len(gaps)} of {total} rows')
    for label, subject in gaps:
        print(f'{label}|{t.clean(subject)}')
    print('Give each one a card or a reason in classified.json, then run the gate again.')
    return 1


if __name__ == '__main__':
    sys.exit(main())
