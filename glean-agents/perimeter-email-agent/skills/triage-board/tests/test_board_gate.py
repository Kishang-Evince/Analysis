import json
import os
import subprocess
import sys
import tempfile
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))
SCRIPTS = os.path.join(HERE, '..', 'scripts')
sys.path.insert(0, SCRIPTS)
import board_gate as g  # noqa: E402
import triage as t  # noqa: E402
from test_triage import inbound, sent, mail_file  # noqa: E402


def result_of(*messages):
    return t.triage(list(messages))


def two_rows():
    return result_of(inbound('A', '2026-11-04T10:00:00Z', subject='Audit evidence'), inbound('B', '2026-11-04T09:00:00Z', subject='Newsletter'))


class MissingTests(unittest.TestCase):
    def test_every_row_a_card_or_classified_gives_nothing_missing(self):
        out = g.missing(two_rows(), {'A'}, {'I2': 'INFO: newsletter, no ask'})
        self.assertEqual(out, [])

    def test_unclassified_row_is_reported_with_label_and_subject(self):
        out = g.missing(two_rows(), {'A'}, {})
        self.assertEqual(out, [('I2', 'Newsletter')])

    def test_blank_reason_does_not_count(self):
        out = g.missing(two_rows(), {'A'}, {'I2': '   '})
        self.assertEqual(out, [('I2', 'Newsletter')])

    def test_short_reason_is_rejected(self):
        for reason in ('INFO: noise', 'INFO: no ask', 'INFO: none'):
            out = g.missing(two_rows(), {'A'}, {'I2': reason})
            self.assertEqual(out, [('I2', 'Newsletter (reason too short or repeated)')], reason)

    def test_same_reason_on_more_than_three_rows_is_rejected(self):
        res = result_of(*[inbound(f'C{i}', f'2026-11-04T0{i}:00:00Z', subject=f'Mail {i}') for i in range(1, 6)])
        same = {f'I{i}': 'INFO: not actionable or surfaced as a card' for i in range(1, 6)}
        out = g.missing(res, set(), same)
        self.assertEqual(sorted(label for label, _ in out), ['I1', 'I2', 'I3', 'I4', 'I5'])
        self.assertTrue(all(subject.endswith('(reason too short or repeated)') for _, subject in out))

    def test_same_reason_on_three_rows_is_allowed(self):
        res = result_of(*[inbound(f'C{i}', f'2026-11-04T0{i}:00:00Z', subject=f'Mail {i}') for i in range(1, 4)])
        same = {f'I{i}': 'INFO: automated product newsletter' for i in range(1, 4)}
        self.assertEqual(g.missing(res, set(), same), [])

    def test_repeat_is_judged_case_and_space_insensitive(self):
        res = result_of(*[inbound(f'C{i}', f'2026-11-04T0{i}:00:00Z', subject=f'Mail {i}') for i in range(1, 6)])
        same = {'I1': 'INFO: Automated product newsletter', 'I2': 'INFO: automated  product newsletter', 'I3': 'INFO: AUTOMATED PRODUCT NEWSLETTER',
                'I4': 'INFO: automated product newsletter ', 'I5': 'info: automated product newsletter'}
        self.assertEqual(len(g.missing(res, set(), same)), 5)

    def test_ignored_category_counts_as_accounted(self):
        res = result_of(inbound('A', '2026-11-04T10:00:00Z'), inbound('B', '2026-11-04T09:00:00Z', cats=['Brief: Ignored']))
        self.assertEqual(g.missing(res, {'A'}, {}), [])

    def test_sent_row_needs_a_card_or_a_reason(self):
        res = result_of(sent('W1', '2026-11-04T10:00:00Z', subject='Headcount'))
        self.assertEqual(g.missing(res, set(), {}), [('W1', 'Headcount')])
        self.assertEqual(g.missing(res, {'W1'}, {}), [])
        self.assertEqual(g.missing(res, set(), {'W1': 'INFO: answered by phone'}), [])

    def test_card_cids_read_from_all_sections_and_ignored_rows(self):
        board = {'must': [{'cid': 'A'}], 'waitingYou': [{'cid': 'B'}], 'waiting': [{'cid': 'C'}], 'review': [{'cid': 'D'}],
                 'ignored': [{'n': 1, 'subject': 'S', 'cards': [{'section': 'must', 'index': 0, 'card': {'cid': 'E'}}]}]}
        self.assertEqual(g.card_cids(board), {'A', 'B', 'C', 'D', 'E'})

    def test_labels_match_the_triage_table(self):
        res = two_rows()
        res['awaiting'] = t.triage([sent('W1', '2026-11-04T10:00:00Z')])['awaiting']
        self.assertEqual([lab for lab, _ in g.labelled(res)], ['I1', 'I2', 'W1'])


class ReasonCodeTests(unittest.TestCase):
    def rows(self):
        return result_of(inbound('A', '2026-11-04T10:00:00Z', subject='Training plan sign-off'),
                         inbound('B', '2026-11-04T09:00:00Z', subject='Audit evidence'),
                         inbound('C', '2026-11-03T09:00:00Z', subject='Re: Audit evidence'),
                         sent('B', '2026-11-04T11:00:00Z', to=('x@y.com',), subject='Audit evidence'))

    def problems(self, classified):
        return dict((subject, subject) for _, subject in g.missing(self.rows(), set(), classified))

    def test_reason_without_a_code_is_refused(self):
        out = self.problems({'I1': 'direct training signoff request'})
        self.assertTrue(any(k.startswith('Training plan sign-off') and g.CODE_NOTE in k for k in out), out)

    def test_unknown_code_is_refused(self):
        out = self.problems({'I1': 'REQUEST: direct training signoff request'})
        self.assertTrue(any(k.startswith('Training plan sign-off') and g.CODE_NOTE in k for k in out), out)

    def test_dup_needs_another_conversation_with_the_same_subject(self):
        out = self.problems({'I1': 'DUP: same as the other plan mail'})
        self.assertTrue(any('DUP needs' in k for k in out), out)

    def test_dup_is_fine_with_a_twin(self):
        res = self.rows()
        labels = {r['subject']: l for l, r in g.labelled(res) if l.startswith('I')}
        gaps = g.missing(res, set(), {labels['Audit evidence']: 'DUP: newer copy of the audit mail'})
        self.assertFalse(any('DUP needs' in s for _, s in gaps))

    def test_replied_needs_a_sent_message_after_the_newest_mail(self):
        out = self.problems({'I1': 'REPLIED: answered by mail already'})
        self.assertTrue(any('REPLIED needs' in k for k in out), out)

    def test_replied_is_fine_when_a_sent_message_is_newer(self):
        res = self.rows()
        labels = {r['subject']: l for l, r in g.labelled(res) if l.startswith('I')}
        gaps = g.missing(res, set(), {labels['Audit evidence']: 'REPLIED: answered by mail already'})
        self.assertFalse(any('REPLIED needs' in s for _, s in gaps))

    def test_auto_code_on_a_human_row_is_refused(self):
        out = self.problems({'I1': 'AUTO: automated product notice here'})
        self.assertTrue(any('AUTO needs' in k for k in out), out)

    def test_ack_and_info_need_no_fact(self):
        out = self.problems({'I1': 'ACK: only says thanks for the file'})
        self.assertFalse(any(k.startswith('Training plan sign-off') for k in out), out)


class RequestWordTests(unittest.TestCase):
    def gaps(self, reason):
        res = result_of(inbound('A', '2026-11-04T10:00:00Z', subject='Training plan sign-off'))
        return g.missing(res, set(), {'I1': reason})

    def test_info_reason_that_names_a_request_needs_a_card(self):
        for reason in ('INFO: direct training signoff request', 'ACK: asks for the file again', 'INFO: requests a call back'):
            self.assertTrue(any(g.REQUEST_NOTE in s for _, s in self.gaps(reason)), reason)

    def test_no_ask_wording_is_fine(self):
        for reason in ('INFO: no ask, outage notice only', 'ACK: thanks, without a request', 'INFO: nothing was asked here'):
            self.assertEqual(self.gaps(reason), [], reason)


class LaterCodeTests(unittest.TestCase):
    def gaps(self, **kw):
        res = result_of(inbound('A', '2026-11-04T10:00:00Z', subject='Training plan sign-off'))
        return g.missing(res, set(), {'I1': 'LATER: not overdue so end-of-day leaves it out'}, **kw)

    def test_later_is_refused_on_a_full_board(self):
        self.assertTrue(any(g.LATER_NOTE in s for _, s in self.gaps()))

    def test_later_is_fine_on_a_board_that_hides_on_purpose(self):
        self.assertEqual(self.gaps(scoped=True), [])

    def test_board_mode_end_of_day_and_partial_flag_count_as_scoped(self):
        self.assertTrue(g.is_scoped({'mode': 'end-of-day'}))
        self.assertTrue(g.is_scoped({'mode': 'morning', 'partial': True}))
        self.assertFalse(g.is_scoped({'mode': 'morning'}))


class AutomatedTests(unittest.TestCase):
    def auto_rows(self):
        return result_of(inbound('A', '2026-11-04T10:00:00Z', subject='Audit evidence'),
                         inbound('B', '2026-11-04T09:00:00Z', subject='Gemini is here', sender='noreply@glean.com'),
                         inbound('C', '2026-11-04T08:00:00Z', subject='Automatic reply: Request', sender='x@y.com'),
                         inbound('D', '2026-11-04T07:00:00Z', subject='Tips', sender='microsoftcopilotupdates@microsoft.com'))

    def test_automated_rows_are_flagged_in_the_result(self):
        flags = [r['auto'] for r in self.auto_rows()['conversations']]
        self.assertEqual(flags, [False, True, True, True])

    def test_automated_row_needs_no_card_and_no_reason(self):
        self.assertEqual(g.missing(self.auto_rows(), {'A'}, {}), [])

    def test_card_for_automated_row_is_reported(self):
        self.assertEqual(g.automated_cards(self.auto_rows(), {'A', 'B', 'C'}), [('I2', 'Gemini is here'), ('I3', 'Automatic reply: Request')])

    def test_table_line_carries_the_auto_word(self):
        lines = t.render(self.auto_rows(), 1)
        self.assertIn('|auto|', lines[2])
        self.assertIn('|human|', lines[1])


class CliTests(unittest.TestCase):
    def run_cli(self, d, board=None, classified=None, messages=None):
        mail_file(d, 'OUTLOOK_LIST_MESSAGES_a.json', messages if messages is not None else [
            inbound('A', '2026-11-04T10:00:00Z', subject='Audit evidence'), inbound('B', '2026-11-04T09:00:00Z', subject='Newsletter')])
        env = dict(os.environ, TRIAGE_MAIL_GLOB=os.path.join(d, 'OUTLOOK_LIST_MESSAGES_*.json'),
                   BOARD_GATE_BOARD=os.path.join(d, 'board.json'), BOARD_GATE_CLASSIFIED=os.path.join(d, 'classified.json'))
        if board is not None:
            with open(os.path.join(d, 'board.json'), 'w') as fh:
                json.dump(board, fh)
        if classified is not None:
            with open(os.path.join(d, 'classified.json'), 'w') as fh:
                json.dump(classified, fh)
        return subprocess.run([sys.executable, '-I', os.path.join(SCRIPTS, 'board_gate.py')], capture_output=True, text=True, env=env)

    def test_missing_rows_exit_1_and_list_them(self):
        with tempfile.TemporaryDirectory() as d:
            proc = self.run_cli(d, board={'must': [{'cid': 'A'}]})
        self.assertEqual(proc.returncode, 1)
        self.assertIn('missing 1 of 2 rows', proc.stdout)
        self.assertIn('I2|Newsletter', proc.stdout)

    def test_all_accounted_exit_0(self):
        with tempfile.TemporaryDirectory() as d:
            proc = self.run_cli(d, board={'must': [{'cid': 'A'}]}, classified={'I2': 'INFO: newsletter, no ask'})
        self.assertEqual(proc.returncode, 0, proc.stdout)
        self.assertEqual(proc.stdout.strip(), 'ok 2 of 2 rows accounted')

    def test_no_board_exits_2(self):
        with tempfile.TemporaryDirectory() as d:
            proc = self.run_cli(d)
        self.assertEqual(proc.returncode, 2)
        self.assertIn('board.json', proc.stdout)

    def test_no_saved_mail_exits_0(self):
        with tempfile.TemporaryDirectory() as d:
            env = dict(os.environ, TRIAGE_MAIL_GLOB=os.path.join(d, 'none_*.json'), BOARD_GATE_BOARD=os.path.join(d, 'board.json'))
            with open(os.path.join(d, 'board.json'), 'w') as fh:
                json.dump({}, fh)
            proc = subprocess.run([sys.executable, '-I', os.path.join(SCRIPTS, 'board_gate.py')], capture_output=True, text=True, env=env)
        self.assertEqual(proc.returncode, 0)
        self.assertEqual(proc.stdout.strip(), 'ok no saved mail')


if __name__ == '__main__':
    unittest.main()
