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
CODES = ('AUTO', 'ACK', 'INFO', 'DUP', 'REPLIED', 'LATER')
LATER_NOTE = ' (LATER is only for a board that hides sections on purpose: end-of-day, a FOCUS other than full board, or a SHOW_ setting of no. Set partial to true in board.json then)'
ASK_WORDS = {'request', 'requests', 'requested', 'ask', 'asks', 'asked', 'asking'}
NEGATORS = {'no', 'not', 'without', 'nothing', 'any', 'never'}
REQUEST_NOTE = ' (this reason names a request or an ask, so the row needs a card)'
CODE_NOTE = ' (start the reason with a code: ACK, INFO, DUP, REPLIED or LATER, then a colon)'


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


def code_of(reason):
    head, sep, _ = str(reason or '').partition(':')
    return head.strip().upper() if sep else ''


def is_scoped(board):
    """True when the board leaves sections out on purpose (end-of-day mode, or partial set to true in board.json)."""
    return board.get('mode') == 'end-of-day' or board.get('partial') is True


def code_problem(row, reason, scoped=False):
    """A note when the code of the reason does not fit the facts of the row, else ''. ACK and INFO are the model's judgment, the rest is checkable."""
    code = code_of(reason)
    if code not in CODES:
        return CODE_NOTE
    if code == 'LATER' and not scoped:
        return LATER_NOTE
    if code == 'AUTO' and not row.get('auto'):
        return ' (AUTO needs an automated sender or an automatic reply, this row is human)'
    if code == 'DUP' and not row.get('sameSubjectAs'):
        return ' (DUP needs another conversation with the same subject, this row has none)'
    if code == 'REPLIED' and not (row.get('sentAfter') or row.get('repliesAfter')):
        return ' (REPLIED needs a sent message after the newest mail, this row has none)'
    if code in ('ACK', 'INFO'):
        words = [w.strip('.,;!?').lower() for w in str(reason).partition(':')[2].split()]
        for i, w in enumerate(words):
            if w in ASK_WORDS and not NEGATORS.intersection(words[max(0, i - 2):i + 2]):
                return REQUEST_NOTE
    return ''


def missing(result, cids, classified, scoped=False):
    """[(label, subject)] of the rows that are no card, not ignored and have no usable written reason. A weak reason adds a note to the subject."""
    weak = weak_labels(classified)
    gaps = []
    for label, row in labelled(result):
        if row['cid'] in cids or IGNORED in row.get('categories', []) or row.get('auto'):
            continue
        if not norm(classified.get(label)):
            gaps.append((label, row['subject']))
        elif code_problem(row, classified[label], scoped):
            gaps.append((label, row['subject'] + code_problem(row, classified[label], scoped)))
        elif label in weak:
            gaps.append((label, row['subject'] + WEAK))
    return gaps


def automated_cards(result, cids):
    """[(label, subject)] of cards written for automated mail (no-reply sender, newsletter, automatic reply). Such rows are noise, never a card."""
    return [(label, row['subject']) for label, row in labelled(result) if row.get('auto') and row['cid'] in cids]


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
    cids = card_cids(board)
    gaps = missing(result, cids, classified, is_scoped(board))
    noise = automated_cards(result, cids)
    if noise:
        print(f'refused {len(noise)} cards for automated mail')
        for label, subject in noise:
            print(f'{label}|{t.clean(subject)}')
        print('Take these cards out of board.json (an automated row needs no card and no reason), then run the gate again.')
        return 1
    if not gaps:
        print(f'ok {total} of {total} rows accounted')
        return 0
    print(f'missing {len(gaps)} of {total} rows')
    for label, subject in gaps:
        print(f'{label}|{t.clean(subject)}')
    print('Give each one a card or a reason that starts with a code (ACK, INFO, DUP, REPLIED or LATER) in classified.json, then run the gate again.')
    return 1


if __name__ == '__main__':
    sys.exit(main())
