import json
import os
import subprocess
import sys
import tempfile
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))
SCRIPTS = os.path.join(HERE, '..', 'scripts')
sys.path.insert(0, SCRIPTS)
import triage as t  # noqa: E402


def addr(a):
    return {'emailAddress': {'address': a}}


def inbound(cid, when, subject='S', sender='a@x.com', read=False, cats=None, importance='normal', flagged=False, to=None):
    return {'id': f'{cid}-in-{when}', 'conversationId': cid, 'receivedDateTime': when, 'subject': subject,
            'from': addr(sender), 'toRecipients': [addr(a) for a in (to or ['me@x.com'])], 'isRead': read,
            'categories': cats or [], 'importance': importance,
            'flag': {'flagStatus': 'flagged' if flagged else 'notFlagged'}}


def sent(cid, when, to=('b@x.com',), subject='S', cc=()):
    return {'id': f'{cid}-out-{when}', 'conversationId': cid, 'sentDateTime': when, 'subject': subject,
            'toRecipients': [addr(a) for a in to], 'ccRecipients': [addr(a) for a in cc], 'categories': []}


def sent_with_received_time(cid, when, sender='me@x.com', to=('b@x.com',), subject='S'):
    """A sent message as the run really returns it: the select list asks for both times, so a sent message carries receivedDateTime too."""
    m = sent(cid, when, to=to, subject=subject)
    m['receivedDateTime'] = when
    m['from'] = addr(sender)
    return m


def mail_file(directory, name, messages, mtime=None):
    path = os.path.join(directory, name)
    with open(path, 'w', encoding='utf-8') as fh:
        json.dump([{'content': [{'type': 'text', 'text': {'successfull': True, 'data': {'value': messages}}}]}], fh)
    if mtime is not None:
        os.utime(path, (mtime, mtime))
    return path


class TriageTests(unittest.TestCase):
    def test_one_row_per_conversation(self):
        out = t.triage([inbound('A', '2026-11-04T09:00:00Z'), inbound('A', '2026-11-04T10:00:00Z'), inbound('B', '2026-11-04T08:00:00Z')])
        rows = {r['cid']: r for r in out['conversations']}
        self.assertEqual(sorted(rows), ['A', 'B'])
        self.assertEqual(rows['A']['count'], 2)

    def test_reply_in_conversation_not_split(self):
        out = t.triage([inbound('A', '2026-11-04T09:00:00Z', subject='Vendor onboarding checklist'),
                        inbound('A', '2026-11-04T10:00:00Z', subject='Re: Vendor onboarding checklist')])
        self.assertEqual(len(out['conversations']), 1)
        self.assertEqual(out['conversations'][0]['subject'], 'Re: Vendor onboarding checklist')

    def test_same_subject_other_cid_is_flagged_not_merged(self):
        out = t.triage([inbound('A', '2026-11-04T09:00:00Z', subject='Launch plan v1'),
                        inbound('B', '2026-11-04T10:00:00Z', subject='Re: Launch plan v1')])
        rows = {r['cid']: r for r in out['conversations']}
        self.assertEqual(len(rows), 2)
        self.assertEqual(rows['A']['sameSubjectAs'], ['B'])
        self.assertEqual(rows['B']['sameSubjectAs'], ['A'])

    def test_sent_after_flag(self):
        out = t.triage([inbound('A', '2026-11-04T09:00:00Z'), sent('A', '2026-11-04T10:00:00Z'), inbound('B', '2026-11-04T09:00:00Z')])
        rows = {r['cid']: r for r in out['conversations']}
        self.assertTrue(rows['A']['sentAfter'])
        self.assertFalse(rows['B']['sentAfter'])

    def test_awaiting_lists_every_sent_conversation_with_replies_after(self):
        out = t.triage([sent('W1', '2026-11-04T10:00:00Z', to=('b@x.com', 'c@x.com')),
                        sent('W2', '2026-11-04T10:00:00Z'),
                        inbound('W2', '2026-11-04T11:00:00Z', sender='d@x.com')])
        rows = {r['cid']: r for r in out['awaiting']}
        self.assertEqual(rows['W1']['to'], ['b@x.com', 'c@x.com'])
        self.assertEqual(rows['W1']['repliesAfter'], [])
        self.assertEqual(rows['W2']['repliesAfter'], [{'from': 'd@x.com', 'received': '2026-11-04T11:00:00Z'}])

    def test_reports_facts_only_automatic_reply_stays_listed(self):
        out = t.triage([sent('W1', '2026-11-04T10:00:00Z'),
                        inbound('W1', '2026-11-04T10:05:00Z', subject='Automatic reply: S', sender='b@x.com')])
        self.assertEqual([r['cid'] for r in out['awaiting']], ['W1'])
        self.assertEqual(out['awaiting'][0]['repliesAfter'][0]['from'], 'b@x.com')

    def test_sent_found_by_owner_when_received_time_is_present(self):
        out = t.triage([inbound('A', '2026-11-04T09:00:00Z', sender='a@x.com'), inbound('B', '2026-11-04T09:30:00Z', sender='c@x.com'),
                        sent_with_received_time('W1', '2026-11-04T10:00:00Z')])
        self.assertEqual([r['cid'] for r in out['awaiting']], ['W1'])
        self.assertEqual(sorted(r['cid'] for r in out['conversations']), ['A', 'B'])

    def test_sent_after_with_received_time_present(self):
        out = t.triage([inbound('A', '2026-11-04T09:00:00Z', sender='a@x.com'), inbound('B', '2026-11-04T09:30:00Z', sender='c@x.com'),
                        sent_with_received_time('A', '2026-11-04T10:00:00Z', to=('a@x.com',))])
        rows = {r['cid']: r for r in out['conversations']}
        self.assertTrue(rows['A']['sentAfter'])
        self.assertEqual([r['cid'] for r in out['awaiting']], ['A'])

    def test_own_brief_mail_is_left_out(self):
        own = inbound('D1', '2026-11-04T07:00:00Z', subject='Daily brief: Nov 4', sender='me@x.com', to=['me@x.com'])
        other = inbound('D2', '2026-11-04T07:00:00Z', subject='Daily brief: Nov 4', sender='news@x.com', to=['me@x.com'])
        out = t.triage([own, other])
        self.assertEqual([r['cid'] for r in out['conversations']], ['D2'])

    def test_row_facts(self):
        out = t.triage([inbound('A', '2026-11-04T10:00:00Z', read=True, cats=['Blue'], importance='high', flagged=True, sender='Boss@X.com')])
        row = out['conversations'][0]
        self.assertEqual((row['unread'], row['flag'], row['importance'], row['categories'], row['from']),
                         (False, True, 'high', ['Blue'], 'boss@x.com'))

    def test_rows_are_newest_first(self):
        out = t.triage([inbound('A', '2026-11-04T08:00:00Z'), inbound('B', '2026-11-04T11:00:00Z'), inbound('C', '2026-11-04T09:00:00Z')])
        self.assertEqual([r['cid'] for r in out['conversations']], ['B', 'C', 'A'])


class LoadTests(unittest.TestCase):
    def test_newer_file_overrides_a_stale_one_and_bad_files_are_skipped(self):
        with tempfile.TemporaryDirectory() as d:
            old = dict(inbound('C1', '2026-11-04T10:00:00Z'), id='m1', isRead=False)
            new = dict(old, isRead=True)
            mail_file(d, 'OUTLOOK_LIST_MESSAGES_a.json', [old], mtime=1000)
            mail_file(d, 'OUTLOOK_LIST_MESSAGES_b.json', [new], mtime=2000)
            with open(os.path.join(d, 'OUTLOOK_LIST_MESSAGES_bad.json'), 'w') as fh:
                fh.write('{nope')
            mail = t.load_mail(os.path.join(d, 'OUTLOOK_LIST_MESSAGES_*.json'))
            self.assertEqual(len(mail), 1)
            self.assertTrue(mail[0]['isRead'])


class CliTests(unittest.TestCase):
    def run_cli(self, glob_pattern):
        env = dict(os.environ, TRIAGE_MAIL_GLOB=glob_pattern)
        return subprocess.run([sys.executable, '-I', os.path.join(SCRIPTS, 'triage.py')], capture_output=True, text=True, env=env)

    def test_prints_header_then_one_line_per_row(self):
        with tempfile.TemporaryDirectory() as d:
            mail_file(d, 'OUTLOOK_LIST_MESSAGES_a.json', [inbound('C1', '2026-11-04T10:00:00Z', subject='Audit evidence'),
                                                         sent('W1', '2026-11-04T09:00:00Z', subject='Headcount')])
            proc = self.run_cli(os.path.join(d, 'OUTLOOK_LIST_MESSAGES_*.json'))
        self.assertEqual(proc.returncode, 0, proc.stderr)
        lines = proc.stdout.strip().splitlines()
        self.assertEqual(lines[0], 'files 1 conversations 1 awaiting 1')
        self.assertTrue(lines[1].startswith('I1|2026-11-04T10:00:00Z|unread|'))
        self.assertIn('Audit evidence', lines[1])
        self.assertTrue(lines[1].endswith('cid C1'))
        self.assertTrue(lines[2].startswith('W1|2026-11-04T09:00:00Z|to b@x.com|'))

    def test_empty_folder_prints_files_0_exit_0(self):
        with tempfile.TemporaryDirectory() as d:
            proc = self.run_cli(os.path.join(d, 'OUTLOOK_LIST_MESSAGES_*.json'))
        self.assertEqual(proc.returncode, 0)
        self.assertEqual(proc.stdout.strip(), 'files 0')


if __name__ == '__main__':
    unittest.main()
