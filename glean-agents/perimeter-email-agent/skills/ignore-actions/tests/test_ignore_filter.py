import json
import os
import subprocess
import sys
import tempfile
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))
SCRIPTS = os.path.join(HERE, '..', 'scripts')
sys.path.insert(0, SCRIPTS)
import ignore_filter as f  # noqa: E402

IGN = 'Brief: Ignored'


def msg(cid, when, cats, mid=None, subject='S', sender='a@x.com', key='receivedDateTime'):
    return {'id': mid or f'{cid}-{when}', 'conversationId': cid, key: when, 'categories': cats, 'subject': subject,
            'from': {'emailAddress': {'address': sender}}}


def mail_file(directory, name, messages, mtime=None):
    path = os.path.join(directory, name)
    with open(path, 'w', encoding='utf-8') as fh:
        json.dump([{'content': [{'type': 'text', 'text': {'successfull': True, 'data': {'value': messages}}}]}], fh)
    if mtime is not None:
        os.utime(path, (mtime, mtime))
    return path


class ClassifyTests(unittest.TestCase):
    def test_newest_marked_is_hidden(self):
        out = f.classify([msg('C1', '2026-11-04T10:00:00Z', []), msg('C1', '2026-11-04T11:00:00Z', [IGN, 'Blue'], subject='Re: Gone', sender='B@X.com')])
        self.assertEqual(out['hidden'], [{'cid': 'C1', 'subject': 'Re: Gone', 'from': 'b@x.com'}])
        self.assertEqual(out['newReply'], [])

    def test_older_marked_newest_unmarked_is_new_reply(self):
        out = f.classify([msg('C1', '2026-11-04T10:00:00Z', [IGN]), msg('C1', '2026-11-04T11:00:00Z', [], subject='Re: Plan')])
        self.assertEqual(out['newReply'], [{'cid': 'C1', 'subject': 'Re: Plan', 'from': 'a@x.com'}])
        self.assertEqual(out['hidden'], [])

    def test_unmarked_conversations_are_not_listed(self):
        out = f.classify([msg('C1', '2026-11-04T10:00:00Z', []), msg('C1', '2026-11-04T11:00:00Z', ['Blue'])])
        self.assertEqual(out, {'hidden': [], 'newReply': []})

    def test_sent_time_counts_as_the_time(self):
        out = f.classify([msg('W1', '2026-11-01T09:00:00Z', [IGN]), msg('W1', '2026-11-02T09:00:00Z', [], key='sentDateTime')])
        self.assertEqual([x['cid'] for x in out['newReply']], ['W1'])

    def test_only_the_exact_category_counts(self):
        out = f.classify([msg('C1', '2026-11-04T10:00:00Z', ['brief: ignored', 'Brief: Ignored later'])])
        self.assertEqual(out, {'hidden': [], 'newReply': []})

    def test_two_conversations_are_kept_apart(self):
        out = f.classify([msg('A', '2026-11-04T10:00:00Z', [IGN]), msg('B', '2026-11-04T10:00:00Z', []), msg('B', '2026-11-04T11:00:00Z', [IGN])])
        self.assertEqual([x['cid'] for x in out['hidden']], ['A', 'B'])

    def test_unmarked_duplicate_of_a_hidden_item_is_hidden_too(self):
        out = f.classify([msg('A', '2026-11-19T06:00:21Z', [IGN], subject='Audit evidence'),
                          msg('B', '2026-11-19T06:00:18Z', [], subject='Audit evidence')])
        self.assertEqual([x['cid'] for x in out['hidden']], ['A', 'B'])

    def test_same_subject_on_another_day_or_sender_is_not_a_duplicate(self):
        out = f.classify([msg('A', '2026-11-19T06:00:21Z', [IGN], subject='Audit evidence'),
                          msg('B', '2026-11-18T06:00:18Z', [], subject='Audit evidence'),
                          msg('C', '2026-11-19T06:00:18Z', [], subject='Audit evidence', sender='z@x.com')])
        self.assertEqual([x['cid'] for x in out['hidden']], ['A'])

    def test_output_is_sorted_by_cid_for_a_stable_answer(self):
        out = f.classify([msg('Z', '2026-11-04T10:00:00Z', [IGN]), msg('M', '2026-11-04T10:00:00Z', [IGN])])
        self.assertEqual([x['cid'] for x in out['hidden']], ['M', 'Z'])


class LoadTests(unittest.TestCase):
    def test_newer_file_overrides_a_stale_one_and_bad_files_are_skipped(self):
        with tempfile.TemporaryDirectory() as d:
            mail_file(d, 'OUTLOOK_LIST_MESSAGES_a.json', [msg('C1', '2026-11-04T10:00:00Z', [], mid='m1')], mtime=1000)
            mail_file(d, 'OUTLOOK_LIST_MESSAGES_b.json', [msg('C1', '2026-11-04T10:00:00Z', [IGN], mid='m1')], mtime=2000)
            with open(os.path.join(d, 'OUTLOOK_LIST_MESSAGES_bad.json'), 'w') as fh:
                fh.write('{nope')
            mail = f.load_mail(os.path.join(d, 'OUTLOOK_LIST_MESSAGES_*.json'))
            self.assertEqual(len(mail), 1)
            self.assertEqual(f.classify(mail)['hidden'][0]['cid'], 'C1')
            self.assertEqual(f.load_mail(os.path.join(d, 'none_*.json')), [])


class CliTests(unittest.TestCase):
    def run_cli(self, glob_pattern):
        env = dict(os.environ, IGNORE_FILTER_MAIL_GLOB=glob_pattern)
        return subprocess.run([sys.executable, '-I', os.path.join(SCRIPTS, 'ignore_filter.py')], capture_output=True, text=True, env=env)

    def test_prints_one_json_line(self):
        with tempfile.TemporaryDirectory() as d:
            mail_file(d, 'OUTLOOK_LIST_MESSAGES_a.json', [msg('C1', '2026-11-04T10:00:00Z', [IGN]), msg('C1', '2026-11-04T11:00:00Z', [])])
            proc = self.run_cli(os.path.join(d, 'OUTLOOK_LIST_MESSAGES_*.json'))
        self.assertEqual(proc.returncode, 0, proc.stderr)
        self.assertEqual(len(proc.stdout.strip().splitlines()), 1)
        out = json.loads(proc.stdout)
        self.assertEqual(out['hidden'], [])
        self.assertEqual(out['newReply'][0]['cid'], 'C1')
        self.assertEqual(out['files'], 1)

    def test_no_saved_mail_gives_empty_lists_and_zero_files(self):
        with tempfile.TemporaryDirectory() as d:
            proc = self.run_cli(os.path.join(d, 'OUTLOOK_LIST_MESSAGES_*.json'))
        self.assertEqual(proc.returncode, 0)
        self.assertEqual(json.loads(proc.stdout), {'hidden': [], 'newReply': [], 'files': 0})


if __name__ == '__main__':
    unittest.main()
