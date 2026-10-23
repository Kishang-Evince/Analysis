import json
import os
import re
import subprocess
import sys
import tempfile
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))
SCRIPTS = os.path.join(HERE, '..', 'scripts')
sys.path.insert(0, SCRIPTS)
import render_brief as rb  # noqa: E402


def card(**over):
    base = dict(person='Carol Reyes', subject='Q3 numbers', ask='Confirm.', action='Reply.', confidence='High', ownership='Direct',
                messages='1', why='Direct ask.', due='Oct 16, 2026 (Fri), passed', original='Oct 15', latest='Oct 16')
    base.update(over)
    return base


def waiting(**over):
    base = dict(recipients='Bob Singh', subject='Quote', daysWaiting=3, asked='Send it.', sent='Oct 20', staleness='Quiet', followUp='Nudge.')
    base.update(over)
    return base


def board(**over):
    base = dict(mode='morning', asOf='Oct 23, 2026', must=[card()], notes=[], summary='ok')
    base.update(over)
    return base


def run_cli(data, raw=None):
    with tempfile.TemporaryDirectory() as d:
        src, out = os.path.join(d, 'b.json'), os.path.join(d, 'b.html')
        with open(src, 'w', encoding='utf-8') as f:
            f.write(raw if raw is not None else json.dumps(data))
        proc = subprocess.run([sys.executable, '-I', os.path.join(SCRIPTS, 'render_brief.py'), src, out], capture_output=True, text=True)
        html = None
        if os.path.exists(out):
            with open(out, encoding='utf-8') as f:
                html = f.read()
        return proc, html


class RenderTests(unittest.TestCase):
    def test_escape_four_characters_only(self):
        self.assertEqual(rb.esc('<a href="x">Tom & Jerry\'s</a>'), '&lt;a href=&quot;x&quot;&gt;Tom &amp; Jerry\'s&lt;/a&gt;')

    def test_missing_values_are_not_given(self):
        self.assertEqual(rb.esc(None), 'not given')
        self.assertEqual(rb.esc(''), 'not given')
        html, _ = rb.render(board(must=[{'person': 'Ann'}]))
        self.assertIn('not given', html)
        self.assertNotIn('@@', html)

    def test_days_from_due(self):
        self.assertEqual(rb.days_from_due('Oct 16, 2026 (Fri), passed', 'Oct 22, 2026'), 6)
        self.assertEqual(rb.days_from_due('Oct 30, 2026 (Fri)', 'Oct 23, 2026'), 0)
        self.assertEqual(rb.days_from_due('not given', 'Oct 23, 2026'), 0)
        self.assertEqual(rb.days_from_due('Oct 16, 2026, passed', 'garbage'), 0)
        self.assertEqual(rb.days_from_due('Oct 30, 2026, passed', 'Oct 23, 2026'), 0)
        self.assertEqual(rb.days_from_due(None, None), 0)

    def test_value_with_placeholder_text_is_not_expanded(self):
        html, _ = rb.render(board(must=[card(person='@@RANK@@')]))
        self.assertIn('@@RANK@@', html)

    def test_chart_widths_round_half_up_and_never_negative(self):
        html, _ = rb.render(board(must=[card(person='Ann')], waiting=[waiting(recipients='Ann')] * 7))
        self.assertIn('width="13%"', html)
        self.assertIn('width="88%"', html)
        self.assertIn('width="0%"', html)

    def test_and_n_more_is_not_a_person(self):
        _, summary = rb.render(board(must=[], waiting=[waiting(recipients='Ann, Bob and 3 more')]))
        self.assertEqual(summary['chart_rows'], 2)

    def test_empty_morning_and_end_of_day_boards(self):
        html, summary = rb.render({'mode': 'morning', 'asOf': 'Oct 23, 2026'})
        self.assertIn('Inbox is clear.', html)
        self.assertEqual((summary['cards'], summary['tiles'], summary['chart_rows']), (0, 0, 0))
        html, _ = rb.render({'mode': 'end-of-day', 'asOf': 'Oct 23, 2026'})
        self.assertIn('All clear for the rest of today.', html)

    def test_unknown_mode_exits_2(self):
        proc, html = run_cli({'mode': 'monthly', 'asOf': 'Oct 23, 2026'})
        self.assertEqual(proc.returncode, 2)
        self.assertTrue(proc.stderr.startswith('error: mode:'), proc.stderr)
        self.assertIsNone(html)

    def test_malformed_json_exits_2(self):
        proc, _ = run_cli(None, raw='{not json')
        self.assertEqual(proc.returncode, 2)
        self.assertTrue(proc.stderr.startswith('error: '), proc.stderr)

    def test_section_not_a_list_names_the_path(self):
        proc, _ = run_cli(board(must='oops'))
        self.assertEqual(proc.returncode, 2)
        self.assertIn('must: not a list', proc.stderr)
        proc, _ = run_cli(board(must=[card(), 'x']))
        self.assertEqual(proc.returncode, 2)
        self.assertIn('must[1]: not an object', proc.stderr)

    def test_no_at_marker_and_no_multi_class_element_left(self):
        html, _ = rb.render(board(must=[card(vip=True, topic='Budget', more='x', also='y')], waiting=[waiting(responses='1 reply')],
                                  commitments={'mine': [{'who': 'Me', 'what': 'Do', 'due': 'Oct 1', 'status': 'Open', 'overdue': True}]},
                                  meetings={'entries': ['A\nB'], 'unsummarized': ['C']}, highlights='h', notes=['n']))
        self.assertNotRegex(html, r'@@\w+@@')
        for value in re.findall(r'class="([^"]*)"', html):
            self.assertNotRegex(value.strip(), r'\s')

    def test_numbers_as_strings_and_extra_keys(self):
        data = board(must=[card(days='6', extra='ignored')], waiting=[waiting(daysWaiting='9')], surprise={'a': 1})
        html, summary = rb.render(data)
        self.assertEqual(summary['cards'], 2)
        self.assertIn('9 days', html)

    def test_marks_written_as_not_given_or_false_show_no_pill(self):
        html, _ = rb.render(board(must=[card(vip='not given', topic='not given')], waiting=[waiting(vip='false', topic='')],
                                  commitments={'mine': [{'who': 'Me', 'what': 'Do', 'due': 'Oct 1', 'status': 'Open', 'overdue': 'false'}]}))
        self.assertNotIn('VIP', html)
        self.assertNotIn('Topic:', html)
        self.assertNotIn('Overdue', html)
        html, _ = rb.render(board(must=[card(vip=True, topic='Budget')], commitments={'mine': [{'who': 'Me', 'what': 'Do', 'due': 'Oct 1', 'status': 'Open', 'overdue': True}]}))
        self.assertIn('VIP', html)
        self.assertIn('Topic: Budget', html)
        self.assertIn('Overdue', html)

    def test_commitment_is_a_card_like_the_other_sections(self):
        html, _ = rb.render(board(must=[], commitments={
            'mine': [{'who': 'Dana Whitfield', 'what': 'Send the forecast', 'due': 'Oct 21, 2026 (Wed)', 'status': 'Open', 'overdue': True}],
            'others': [{'who': 'Meena Iyer', 'what': 'Send notes', 'due': 'Oct 24, 2026 (Sat)', 'status': 'Waiting'}]}))
        self.assertIn('class="rk" align="center" valign="middle">DW<', html)
        self.assertIn('class="rw" align="center" valign="middle">MI<', html)
        self.assertIn('You owe', html)
        self.assertIn('Owes you', html)
        self.assertEqual(html.count('<span class="al">Commitment</span>'), 2)
        self.assertEqual(html.count('<span class="l">Due</span><br><span class="b">Oct'), 2)
        self.assertNotIn('class="gt"', html)

    def test_meeting_is_a_numbered_card_with_time_prep_and_pill(self):
        html, summary = rb.render(board(must=[], meetings={'entries': ['Design review, 9:00 AM\nThread: Planning notes\nThread: R&D budget'], 'unsummarized': ['Vendor call, 2:00 PM']}))
        self.assertIn('<b class="nm">Design review</b><br><span class="sb">9:00 AM</span>', html)
        self.assertIn('<span class="al">Prep</span><br>Thread: Planning notes<br>Thread: R&amp;D budget', html)
        self.assertIn('class="rk" align="center" valign="middle">2<', html)
        self.assertIn('<b class="nm">Vendor call</b><br><span class="sb">2:00 PM</span>', html)
        self.assertEqual(html.count('Not summarized'), 1)
        self.assertEqual(html.count('<span class="al">Prep</span>'), 1)
        self.assertEqual(summary['meeting_cards'], 2)

    def test_utf8_survives_the_cli(self):
        proc, html = run_cli(board(must=[card(person='Zoë 🚀', ask='naïve café')]))
        self.assertEqual(proc.returncode, 0, proc.stderr)
        self.assertIn('Zoë 🚀', html)
        self.assertIn('naïve café', html)
        self.assertEqual(json.loads(proc.stdout)['bytes'], len(html.encode('utf-8')))


def week(**lists):
    return {'mode': 'weekly', 'asOf': 'Oct 23, 2026', 'weekly': lists, 'notes': ['n1'], 'summary': 'Week done.'}


def row(who='Ann', what='Send it', date='Oct 24, 2026'):
    return {'who': who, 'what': what, 'date': date}


class WeeklyTests(unittest.TestCase):
    def test_weekly_lists_and_counts(self):
        html, _ = rb.render(week(asksToMe=[row(), row()], openCommitments=[row()], othersOwe=[], waitingOnOthers=[row()]))
        heads = re.findall(r'class="(sh\d)">([^<]*)<', html)
        self.assertEqual(heads, [('sh1', 'Asks to me · 2'), ('sh2', 'My open commitments · 1'), ('sh4', 'Waiting on others · 1')])
        self.assertIn('Unresolved this week: 4.', html)
        self.assertIn('Weekly', html)
        self.assertEqual(html.count('<table role="presentation" class="card"'), 3)

    def test_weekly_escapes_a_link(self):
        html, _ = rb.render(week(asksToMe=[row(who='<a href="http://x">Reset</a>')]))
        self.assertIn('&lt;a href=&quot;http://x&quot;&gt;Reset&lt;/a&gt;', html)
        self.assertNotIn('<a ', html)

    def test_weekly_all_empty(self):
        html, summary = rb.render(week())
        self.assertIn('Nothing unresolved this week.', html)
        self.assertNotIn('class="gt"', html)
        self.assertEqual(summary['weekly'], {'asksToMe': 0, 'openCommitments': 0, 'othersOwe': 0, 'waitingOnOthers': 0})
        html, _ = rb.render({'mode': 'weekly', 'asOf': 'Oct 23, 2026'})
        self.assertIn('Nothing unresolved this week.', html)

    def test_weekly_summary_line_keys(self):
        proc, html = run_cli(week(asksToMe=[row()], othersOwe=[row(), row()]))
        self.assertEqual(proc.returncode, 0, proc.stderr)
        line = json.loads(proc.stdout)
        self.assertNotIn('sections', line)
        self.assertEqual(line['weekly'], {'asksToMe': 1, 'openCommitments': 0, 'othersOwe': 2, 'waitingOnOthers': 0})
        self.assertEqual((line['mode'], line['cards'], line['tiles'], line['bytes']), ('weekly', 3, 0, len(html.encode('utf-8'))))

    def test_weekly_list_not_a_list_names_the_path(self):
        proc, _ = run_cli(week(asksToMe='oops'))
        self.assertEqual(proc.returncode, 2)
        self.assertIn('weekly.asksToMe: not a list', proc.stderr)


if __name__ == '__main__':
    unittest.main()
