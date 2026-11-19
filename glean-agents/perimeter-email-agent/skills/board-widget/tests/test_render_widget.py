import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))
SCRIPTS = os.path.join(HERE, '..', 'scripts')
sys.path.insert(0, SCRIPTS)
import render_widget as rw  # noqa: E402


def card(**over):
    base = dict(person='Carol Reyes', subject='Q3 numbers', ask='Confirm the numbers.', action='Reply', confidence='High',
                ownership='Owned', messages='2', why='Direct ask.', due='Oct 16, 2026 (Fri), passed',
                original='Oct 15, 2026, Carol Reyes', latest='Oct 16, 2026, Carol Reyes')
    base.update(over)
    return base


def waiting(**over):
    base = dict(recipients='Bob Singh', subject='Quote', daysWaiting=3, asked='Send the quote.', sent='Oct 20, 2026',
                staleness='Aging', followUp='Follow up this week.', responses='Replied: none. Waiting: Bob Singh.')
    base.update(over)
    return base


def board(**over):
    base = dict(mode='morning', asOf='Nov 5, 2026', must=[card()], summary='Inbound: 3 emails excluded (0 already replied to, 3 noise). Outbound: 1 sent email excluded (informational, no ask).')
    base.update(over)
    return base


def buttons(html):
    return re.findall(r'<button\b[^>]*>', html)


def run_cli(data):
    with tempfile.TemporaryDirectory() as d:
        src, out = os.path.join(d, 'b.json'), os.path.join(d, 'w.html')
        with open(src, 'w', encoding='utf-8') as f:
            f.write(json.dumps(data))
        proc = subprocess.run([sys.executable, '-I', os.path.join(SCRIPTS, 'render_widget.py'), src, out], capture_output=True, text=True)
        html = None
        if os.path.exists(out):
            with open(out, encoding='utf-8') as f:
                html = f.read()
        return proc, html


class EscapeTests(unittest.TestCase):
    def test_four_characters_escaped(self):
        self.assertEqual(rw.esc('<a href="x">Tom & Jerry</a>'), '&lt;a href=&quot;x&quot;&gt;Tom &amp; Jerry&lt;/a&gt;')

    def test_missing_value_is_not_given(self):
        self.assertEqual(rw.esc(None), 'not given')
        self.assertEqual(rw.esc('  '), 'not given')
        html, _ = rw.render(board(must=[{'person': 'Ann'}]))
        self.assertIn('not given', html)
        self.assertNotIn('@@', html)


class CardTests(unittest.TestCase):
    def test_cards_numbered_in_section_order(self):
        data = board(must=[card(subject='A'), card(subject='B')], waitingYou=[card(subject='C')], waiting=[waiting(subject='D')], review=[card(subject='E')])
        html, summary = rw.render(data)
        order = [int(n) for n in re.findall(r'<div class="card" data-n="(\d+)"', html)]
        self.assertEqual(order, [1, 2, 3, 4, 5])
        self.assertEqual([(x['n'], x['subject'], x['section']) for x in summary['numbers']],
                         [(1, 'A', 'must'), (2, 'B', 'must'), (3, 'C', 'waitingYou'), (4, 'D', 'waiting'), (5, 'E', 'review')])
        self.assertEqual(summary['cards'], 5)

    def test_section_headings_in_layout_order_and_left_out_when_empty(self):
        html, _ = rw.render(board(must=[card()], review=[card()]))
        heads = re.findall(r'<h2>([^<]+)</h2>', html)
        self.assertEqual(heads, ['\U0001F534 Must Do Today', '\U0001F535 Review Quickly'])

    def test_main_lines_and_details_fold(self):
        html, _ = rw.render(board(must=[card(more='Also send comments.', also='Dana Whitfield.', draft='Draft ready in Outlook')]))
        main, _, fold = html.partition('<details')
        for text in ('Carol Reyes | Q3 numbers', 'Confirm the numbers.', 'Reply', 'Oct 16, 2026 (Fri), passed', 'Direct ask.'):
            self.assertIn(text, main)
        for text in ('High', 'Owned', 'Oct 15, 2026, Carol Reyes', 'Oct 16, 2026, Carol Reyes', 'Also send comments.', 'Dana Whitfield.', 'Draft ready in Outlook'):
            self.assertIn(text, fold)
        self.assertIn('Messages', fold)

    def test_late_due_is_marked(self):
        html, _ = rw.render(board(must=[card(due='Oct 16, 2026 (Fri), passed'), card(due='Nov 9, 2026 (Mon)')]))
        self.assertEqual(html.count('class="due late"'), 1)

    def test_pills(self):
        html, _ = rw.render(board(must=[card(vip=True, topic='Launch plan'), card(vip='false', topic='')]))
        self.assertEqual(html.count('>VIP<'), 1)
        self.assertEqual(html.count('Topic: Launch plan'), 1)

    def test_new_reply_sentence_is_marked(self):
        html, _ = rw.render(board(must=[card(why='Direct ask. New reply since ignored.')]))
        self.assertIn('<mark>New reply since ignored.</mark>', html)

    def test_waiting_card(self):
        html, summary = rw.render(board(must=[], waiting=[waiting(vip=True)]))
        for text in ('Bob Singh | Quote', 'Send the quote.', 'Oct 20, 2026', 'Aging', 'Follow up this week.', 'Replied: none. Waiting: Bob Singh.'):
            self.assertIn(text, html)
        self.assertIn('Days waiting', html)
        self.assertEqual(len(buttons(html)), 1)
        self.assertEqual(summary['sections'], {'must': 0, 'waitingYou': 0, 'waiting': 1, 'review': 0})


class LinkTests(unittest.TestCase):
    def test_https_link_kept_with_rel(self):
        html, _ = rw.render(board(must=[card(link='https://outlook.office.com/mail/id/AAA=')]))
        self.assertIn('<a href="https://outlook.office.com/mail/id/AAA=" target="_blank" rel="noopener noreferrer">Open email</a>', html)

    def test_other_schemes_and_missing_link_are_dropped(self):
        for link in ('javascript:alert(1)', 'data:text/html,x', 'ftp://x', '', None):
            html, _ = rw.render(board(must=[card(link=link)]))
            self.assertNotIn('Open email', html, link)
            self.assertNotIn('javascript:', html)


class ButtonTests(unittest.TestCase):
    def test_one_ignore_button_per_card_with_number_and_subject(self):
        html, _ = rw.render(board(must=[card(subject='A'), card(subject='B')], waiting=[waiting(subject='C')]))
        bs = buttons(html)
        self.assertEqual(len(bs), 3)
        for i, (b, subject) in enumerate(zip(bs, ('A', 'B', 'C')), start=1):
            self.assertIn('type="button"', b)
            self.assertIn('data-act="ignore"', b)
            self.assertIn(f'data-n="{i}"', b)
            self.assertIn(f'data-subject="{subject}"', b)

    def test_hostile_subject_cannot_break_out(self):
        hostile = '"><img src=x onerror=alert(1)></script><script>alert(2)</script>'
        html, _ = rw.render(board(must=[card(subject=hostile, person='<b>x</b>')]))
        self.assertNotIn('<img', html)
        self.assertNotIn('<b>x</b>', html)
        self.assertEqual(html.count('<script>'), 1)
        self.assertEqual(html.count('</script>'), 1)
        self.assertIn('data-subject="&quot;&gt;&lt;img src=x onerror=alert(1)&gt;&lt;/script&gt;&lt;script&gt;alert(2)&lt;/script&gt;"', html)

    def test_ignored_block_has_one_undo_per_row_numbered_from_one(self):
        html, summary = rw.render(board(ignored=[{'n': 1, 'subject': 'Audit evidence'}, {'n': 2, 'subject': 'Deck'}]))
        self.assertIn('Ignored this session', html)
        undo = [b for b in buttons(html) if 'data-act="undo"' in b]
        self.assertEqual(len(undo), 2)
        self.assertIn('data-n="1"', undo[0])
        self.assertIn('data-subject="Audit evidence"', undo[0])
        self.assertIn('data-n="2"', undo[1])
        self.assertEqual(summary['ignored'], 2)

    def test_no_ignored_block_when_empty(self):
        html, summary = rw.render(board())
        self.assertNotIn('Ignored this session', html)
        self.assertEqual(summary['ignored'], 0)


class PageTests(unittest.TestCase):
    def test_title_modes(self):
        self.assertIn('Outlook Action Board: Morning, as of Nov 5, 2026', rw.render(board())[0])
        self.assertIn('Outlook Action Board: End-of-day, as of Nov 5, 2026', rw.render(board(mode='end-of-day'))[0])

    def test_vip_line_highlights_notes_summary_in_order(self):
        html, _ = rw.render(board(vipLine='VIP: carol.reyes@evincedev.in', highlights='Carol is a VIP.', notes=['Ignored items hidden: 2'], summary='SUMMARY LINE'))
        positions = [html.index(t) for t in ('VIP: carol.reyes@evincedev.in', 'Outlook Action Board: Morning', 'Carol is a VIP.', 'Q3 numbers', 'Ignored items hidden: 2', 'SUMMARY LINE')]
        self.assertEqual(positions, sorted(positions))

    def test_commitments_and_meetings(self):
        html, _ = rw.render(board(commitments={'mine': [{'who': 'Me', 'what': 'Send plan', 'due': 'Nov 9, 2026', 'status': 'Open', 'overdue': True}], 'others': [{'who': 'Alice', 'what': 'Deliver', 'due': 'Nov 10, 2026', 'status': 'Open'}]},
                                  meetings={'entries': ['Sync, 10:00. Status: on track.'], 'unsummarized': ['Standup, 9:00: not summarized']}))
        for text in ('Commitments', 'Mine', 'Others owe me', 'Send plan', 'Overdue', 'Alice | Deliver', 'Meeting prep', 'Sync, 10:00. Status: on track.', 'Standup, 9:00: not summarized'):
            self.assertIn(text, html)

    def test_empty_board_messages(self):
        self.assertIn('Inbox is clear.', rw.render(board(must=[]))[0])
        self.assertIn('All clear for the rest of today.', rw.render(board(mode='end-of-day', must=[]))[0])
        self.assertNotIn('Inbox is clear.', rw.render(board())[0])

    def test_no_external_resources_or_forms(self):
        html, _ = rw.render(board(must=[card(link='https://outlook.office.com/x')], waiting=[waiting()], ignored=[{'n': 1, 'subject': 'S'}]))
        for bad in ('<form', '<iframe', '<img', '<link', 'src=', '@import', 'url(', 'fetch(', 'XMLHttpRequest'):
            self.assertNotIn(bad, html, bad)
        self.assertEqual(len(re.findall(r'href="([^"]+)"', html)), 1)

    def test_page_is_a_full_document_without_unfilled_slots(self):
        html, _ = rw.render(board())
        self.assertTrue(html.startswith('<!doctype html>'))
        self.assertIn('<meta charset="utf-8">', html)
        self.assertNotIn('@@', html)


class StructuralTests(unittest.TestCase):
    def test_errors_carry_the_path(self):
        cases = [({'mode': 'weekly', 'asOf': 'x'}, 'mode'), ({'mode': 'noon', 'asOf': 'x'}, 'mode'), (board(must='x'), 'must'), (board(must=['x']), 'must[0]'),
                 (board(waiting=[1]), 'waiting[0]'), (board(ignored=[{'subject': 'a'}]), 'ignored[0]'), ([], 'board'), (board(asOf=''), 'asOf')]
        for data, path in cases:
            with self.assertRaises(rw.StructuralError) as ctx:
                rw.render(data)
            self.assertTrue(str(ctx.exception).startswith(path + ':'), (str(ctx.exception), path))


class SenderLineTests(unittest.TestCase):
    FULL = dict(email='alice.morgan@evincedev.in', received='Nov 4, 2026, 7:17 PM', preview='Kishan, please send the audit evidence by Oct 20.')

    def test_inbound_card_shows_sender_email_received_date_and_preview(self):
        html, _ = rw.render(board(must=[card(**self.FULL)]))
        main = html.partition('<details')[0]
        self.assertIn('<div class="from">From alice.morgan@evincedev.in \u00b7 Received Nov 4, 2026, 7:17 PM</div>', main)
        self.assertIn('<div class="preview">Kishan, please send the audit evidence by Oct 20.</div>', main)

    def test_order_title_sender_ask_preview_meta(self):
        html, _ = rw.render(board(must=[card(**self.FULL)]))
        marks = ['Carol Reyes | Q3 numbers', 'class="from"', 'Confirm the numbers.', 'class="preview"', 'class="meta"', 'Direct ask.']
        positions = [html.index(m) for m in marks]
        self.assertEqual(positions, sorted(positions))

    def test_left_out_when_missing_and_partial_values_work(self):
        html, _ = rw.render(board(must=[card()]))
        self.assertNotIn('class="from"', html.partition('</style>')[2])
        self.assertNotIn('class="preview"', html.partition('</style>')[2])
        only_email = rw.render(board(must=[card(email='a@b.com')]))[0]
        self.assertIn('<div class="from">From a@b.com</div>', only_email)
        only_date = rw.render(board(must=[card(received='Nov 4, 2026')]))[0]
        self.assertIn('<div class="from">Received Nov 4, 2026</div>', only_date)

    def test_values_are_escaped_and_the_email_is_not_a_link(self):
        html, _ = rw.render(board(must=[card(email='<b>x</b>@evil.com', received='<i>now</i>', preview='<script>alert(1)</script> hi')]))
        self.assertNotIn('<b>x</b>', html)
        self.assertNotIn('<i>now</i>', html)
        self.assertEqual(html.count('<script>'), 1)
        self.assertNotIn('mailto:', html)
        self.assertIn('&lt;script&gt;alert(1)&lt;/script&gt; hi', html)

    def test_waiting_card_shows_recipient_email_and_preview(self):
        html, _ = rw.render(board(must=[], waiting=[waiting(email='bob.singh@evincedev.in', preview='Could you send the quote by Friday?')]))
        self.assertIn('<div class="from">To bob.singh@evincedev.in</div>', html)
        self.assertIn('<div class="preview">Could you send the quote by Friday?</div>', html)
        self.assertNotIn('Received', html.partition('</style>')[2])


class HiddenNoteTests(unittest.TestCase):
    def test_hidden_note_after_other_notes_and_before_the_summary(self):
        html, summary = rw.render(board(hidden=2, notes=['Mailbox window truncated.'], summary='SUMMARY LINE'))
        positions = [html.index(t) for t in ('Mailbox window truncated.', 'Ignored items hidden: 2', 'SUMMARY LINE')]
        self.assertEqual(positions, sorted(positions))
        self.assertEqual(summary['hidden'], 2)

    def test_no_note_when_zero_or_absent(self):
        for data in (board(), board(hidden=0)):
            html, summary = rw.render(data)
            self.assertNotIn('Ignored items hidden', html)
            self.assertEqual(summary['hidden'], 0)

    def test_hidden_must_be_a_whole_number(self):
        for bad in ('x', -1, 1.5, None, True):
            with self.assertRaises(rw.StructuralError) as ctx:
                rw.render(board(hidden=bad))
            self.assertTrue(str(ctx.exception).startswith('hidden:'), bad)


def three():
    return board(must=[card(subject='A'), card(subject='B')], waiting=[waiting(subject='D')])


class IgnoreUndoTests(unittest.TestCase):
    def test_ignore_removes_the_card_and_records_it(self):
        data = three()
        out = rw.apply_ignore(data, [2])
        self.assertEqual([c['subject'] for c in out['must']], ['A'])
        self.assertEqual(out['hidden'], 1)
        self.assertEqual(out['ignored'][0]['n'], 1)
        self.assertEqual(out['ignored'][0]['subject'], 'B')
        self.assertEqual(len(data['must']), 2, 'input must not change')

    def test_numbers_run_across_sections(self):
        out = rw.apply_ignore(three(), [3])
        self.assertEqual(out['waiting'], [])
        self.assertEqual(out['ignored'][0]['subject'], 'D')

    def test_duplicates_make_one_ignored_row_and_raise_hidden_by_both(self):
        out = rw.apply_ignore(three(), [1, 2])
        self.assertEqual(out['must'], [])
        self.assertEqual(len(out['ignored']), 1)
        self.assertEqual(out['ignored'][0]['subject'], 'A')
        self.assertEqual(out['hidden'], 2)

    def test_unknown_number_is_a_structural_error(self):
        for ns in ([9], [0], [1, 9]):
            with self.assertRaises(rw.StructuralError) as ctx:
                rw.apply_ignore(three(), ns)
            self.assertTrue(str(ctx.exception).startswith('ignore:'), ns)

    def test_ignore_then_undo_gives_the_same_page(self):
        original = three()
        for ns in ([1], [2], [3], [1, 2], [2, 3]):
            ignored = rw.apply_ignore(original, ns)
            restored = rw.apply_undo(ignored, 1)
            self.assertEqual(rw.render(restored)[0], rw.render(original)[0], ns)
            self.assertEqual(restored['hidden'], 0)
            self.assertEqual(restored['ignored'], [])

    def test_undo_renumbers_the_rest_and_lowers_hidden(self):
        out = rw.apply_ignore(rw.apply_ignore(three(), [1]), [1])
        self.assertEqual([(x['n'], x['subject']) for x in out['ignored']], [(1, 'A'), (2, 'B')])
        back = rw.apply_undo(out, 1)
        self.assertEqual([(x['n'], x['subject']) for x in back['ignored']], [(1, 'B')])
        self.assertEqual(back['hidden'], 1)
        self.assertEqual([c['subject'] for c in back['must']], ['A'])

    def test_unknown_undo_number_is_a_structural_error(self):
        with self.assertRaises(rw.StructuralError) as ctx:
            rw.apply_undo(three(), 1)
        self.assertTrue(str(ctx.exception).startswith('undo:'))

    def test_ignored_rows_render_with_undo_buttons(self):
        html, summary = rw.render(rw.apply_ignore(three(), [2]))
        self.assertIn('Ignored this session', html)
        self.assertIn('Ignored items hidden: 1', html)
        self.assertEqual(summary['cards'], 2)
        self.assertEqual(summary['numbers'][1]['subject'], 'D')


class StateCliTests(unittest.TestCase):
    def run_state(self, data, *flags):
        with tempfile.TemporaryDirectory() as d:
            src, out = os.path.join(d, 'board.json'), os.path.join(d, 'w.html')
            with open(src, 'w', encoding='utf-8') as f:
                json.dump(data, f)
            proc = subprocess.run([sys.executable, '-I', os.path.join(SCRIPTS, 'render_widget.py'), src, out, *flags], capture_output=True, text=True)
            with open(src, encoding='utf-8') as f:
                state = json.load(f)
            html = None
            if os.path.exists(out):
                with open(out, encoding='utf-8') as f:
                    html = f.read()
            return proc, state, html

    def test_cli_ignore_updates_the_board_file_and_the_page(self):
        proc, state, html = self.run_state(three(), '--ignore', '1,2')
        self.assertEqual(proc.returncode, 0, proc.stderr)
        self.assertEqual(state['must'], [])
        self.assertEqual(state['hidden'], 2)
        self.assertEqual(json.loads(proc.stdout)['cards'], 1)
        self.assertIn('Ignored this session', html)

    def test_cli_undo_restores(self):
        _, ignored, _ = self.run_state(three(), '--ignore', '2')
        proc, state, html = self.run_state(ignored, '--undo', '1')
        self.assertEqual(proc.returncode, 0, proc.stderr)
        self.assertEqual([c['subject'] for c in state['must']], ['A', 'B'])
        self.assertNotIn('Ignored this session', html)

    def test_cli_bad_number_exits_2_and_leaves_the_file_alone(self):
        original = three()
        for flags in (('--ignore', '9'), ('--ignore', 'x'), ('--ignore', ''), ('--undo', '1'), ('--ignore',), ('--bogus', '1')):
            proc, state, html = self.run_state(original, *flags)
            self.assertEqual(proc.returncode, 2, flags)
            self.assertTrue(proc.stderr.startswith('error:'), flags)
            self.assertEqual(state, original, flags)
            self.assertIsNone(html, flags)


def msg(cid, when, cats, mid=None, **extra):
    m = {'id': mid or f'{cid}-{when}', 'conversationId': cid, 'receivedDateTime': when, 'categories': cats, 'subject': 'S'}
    m.update(extra)
    return m


def mail_file(directory, name, messages, mtime=None):
    """Writes messages the way the agent's List messages results are saved (nested content, text, data, value)."""
    path = os.path.join(directory, name)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump([{'content': [{'type': 'text', 'text': {'successfull': True, 'data': {'value': messages}}}]}], f)
    if mtime is not None:
        os.utime(path, (mtime, mtime))
    return path


IGN = 'Brief: Ignored'


def kpi_block(html):
    m = re.search(r'<div class="kpis">.*?</div></div>', html)
    return m.group(0) if m else ''


def tiles(html):
    return re.findall(r'<div class="kpi"[^>]*><b>([^<]*)</b><span>([^<]*)</span></div>', kpi_block(html))


class FocusPageTests(unittest.TestCase):
    def test_meeting_prep_alone_is_not_called_an_empty_inbox(self):
        html, _ = rw.render(board(must=[], meetings={'entries': ['09:00 Standup, prep: none'], 'unsummarized': []}))
        self.assertIn('Meeting prep', html)
        self.assertNotIn('Inbox is clear.', html)

    def test_commitments_alone_are_not_called_an_empty_inbox(self):
        html, _ = rw.render(board(must=[], commitments={'mine': [{'who': 'Me', 'what': 'Send the plan', 'due': 'Nov 9', 'status': 'Open'}], 'others': []}))
        self.assertNotIn('Inbox is clear.', html)


class KpiTests(unittest.TestCase):
    def test_tiles_show_the_counts_of_the_sections_that_have_cards(self):
        html, _ = rw.render(board(must=[card(), card(subject='B')], waitingYou=[card(subject='C')], waiting=[waiting()], review=[]))
        self.assertEqual(tiles(html), [('4', 'Open items'), ('2', 'Must do today'), ('1', 'Waiting on you'), ('1', 'Waiting on others'), ('3', 'Longest wait (days)')])

    def test_a_hidden_or_empty_section_has_no_tile(self):
        html, _ = rw.render(board(must=[card()], waitingYou=[], waiting=[], review=[card(subject='R')]))
        labels = [label for _, label in tiles(html)]
        self.assertEqual(labels, ['Open items', 'Must do today', 'Review quickly'])

    def test_drafts_tile_only_when_a_card_has_a_draft(self):
        html, _ = rw.render(board(must=[card(draft='Draft ready in Outlook')]))
        self.assertIn(('1', 'Drafts ready'), tiles(html))
        html, _ = rw.render(board(must=[card()]))
        self.assertNotIn('Drafts ready', kpi_block(html))

    def test_longest_wait_is_the_largest_days_waiting(self):
        html, _ = rw.render(board(must=[], waiting=[waiting(daysWaiting=2), waiting(subject='B', daysWaiting=9), waiting(subject='C', daysWaiting='not a number')]))
        self.assertIn(('9', 'Longest wait (days)'), tiles(html))

    def test_end_of_day_wording(self):
        html, _ = rw.render(board(mode='end-of-day', must=[card()]))
        self.assertIn(('1', 'Must do overdue'), tiles(html))

    def test_no_tiles_on_an_empty_board(self):
        html, _ = rw.render(board(must=[]))
        self.assertEqual(kpi_block(html), '')

    def test_tiles_are_static_and_sit_between_the_title_and_the_first_section(self):
        html, _ = rw.render(board(highlights='Focus on Carol.'))
        self.assertNotIn('<button', kpi_block(html))
        self.assertLess(html.index('<h1>'), html.index('class="kpis"'))
        self.assertLess(html.index('class="kpis"'), html.index('<section>'))
        self.assertEqual(len(buttons(html)), 1)


class PillHelpTests(unittest.TestCase):
    def test_every_action_pill_has_a_plain_title(self):
        for action in ('Reply', 'Review', 'Approve', 'Send', 'Decide', 'Complete', 'Attend'):
            html, _ = rw.render(board(must=[card(action=action)]))
            m = re.search(r'<span class="pill act" title="([^"]+)">' + action + '</span>', html)
            self.assertIsNotNone(m, action)
            self.assertGreater(len(m.group(1)), 10)

    def test_staleness_pill_has_a_title(self):
        for tier, words in (('Recent', '0 to 1'), ('Aging', '2 to 3'), ('Overdue', '4 or more')):
            html, _ = rw.render(board(must=[], waiting=[waiting(staleness=tier)]))
            m = re.search(r'<span class="pill act" title="([^"]+)">' + tier + '</span>', html)
            self.assertIsNotNone(m, tier)
            self.assertIn(words, m.group(1))

    def test_unknown_value_has_no_title_and_the_pill_is_not_a_button(self):
        html, _ = rw.render(board(must=[card(action='Escalate')]))
        self.assertIn('<span class="pill act">Escalate</span>', html)
        self.assertNotIn('class="pill act"', ''.join(buttons(html)))

    def test_pills_with_a_title_get_the_help_cursor(self):
        self.assertIn('.pill.act[title]{cursor:help}', rw.CSS)


class MailMarkTests(unittest.TestCase):
    def render_cards(self, cards, mail, **kw):
        return rw.render(board(must=cards, **kw), mail=mail)

    def test_older_marked_newest_unmarked_adds_the_label_once(self):
        mail = [msg('C1', '2026-11-04T13:48:12Z', [IGN]), msg('C1', '2026-11-04T13:49:08Z', [])]
        html, summary = self.render_cards([card(cid='C1', why='Follow-up says it is outstanding.')], mail)
        self.assertEqual(html.count('<mark>New reply since ignored.</mark>'), 1)
        self.assertIn('Follow-up says it is outstanding. <mark>', html)
        self.assertEqual(summary['labeled'], 1)
        html2, _ = self.render_cards([card(cid='C1', why='Follow-up says it is outstanding. New reply since ignored.')], mail)
        self.assertEqual(html2.count('New reply since ignored.'), 1, 'must not be added twice')

    def test_label_when_why_is_missing(self):
        mail = [msg('C1', '2026-11-04T13:48:12Z', [IGN]), msg('C1', '2026-11-04T13:49:08Z', [])]
        c = card(cid='C1')
        del c['why']
        html, _ = self.render_cards([c], mail)
        self.assertIn('<mark>New reply since ignored.</mark>', html)

    def test_newest_marked_drops_the_card_and_counts_it_hidden(self):
        mail = [msg('C1', '2026-11-04T13:48:12Z', []), msg('C1', '2026-11-04T13:49:08Z', [IGN, 'Blue category'])]
        html, summary = self.render_cards([card(cid='C1', subject='Gone'), card(cid='C2', subject='Stays')], mail, hidden=1)
        self.assertNotIn('Gone', html)
        self.assertIn('Stays', html)
        self.assertEqual(summary['dropped'], 1)
        self.assertEqual(summary['hidden'], 2)
        self.assertEqual(summary['cards'], 1)
        self.assertEqual(summary['numbers'][0]['n'], 1)

    def test_no_mark_or_no_cid_or_no_mail_changes_nothing(self):
        mail = [msg('C1', '2026-11-04T13:48:12Z', []), msg('C1', '2026-11-04T13:49:08Z', [])]
        base = rw.render(board(must=[card(cid='C1')]))[0]
        self.assertEqual(rw.render(board(must=[card(cid='C1')]), mail=mail)[0], base)
        marked = [msg('C9', '2026-11-04T13:48:12Z', [IGN]), msg('C9', '2026-11-04T13:49:08Z', [])]
        self.assertEqual(rw.render(board(must=[card()]), mail=marked)[0], rw.render(board(must=[card()]))[0])
        self.assertEqual(rw.render(board(must=[card(cid='C1')]), mail=[])[0], base)

    def test_sent_time_counts_and_waiting_cards_work(self):
        mail = [msg('W1', '2026-11-01T09:00:00Z', [IGN]), {'id': 'w', 'conversationId': 'W1', 'sentDateTime': '2026-11-02T09:00:00Z', 'categories': []}]
        html, summary = rw.render(board(must=[], waiting=[waiting(cid='W1')]), mail=mail)
        self.assertIn('<mark>New reply since ignored.</mark>', html)
        self.assertEqual(summary['labeled'], 1)

    def test_only_exact_category_name_counts(self):
        mail = [msg('C1', '2026-11-04T13:48:12Z', ['brief: ignored', 'Brief: Ignored later']), msg('C1', '2026-11-04T13:49:08Z', [])]
        self.assertNotIn('New reply since ignored', self.render_cards([card(cid='C1')], mail)[0])

    def test_load_mail_reads_saved_results_and_newest_file_wins(self):
        with tempfile.TemporaryDirectory() as d:
            mail_file(d, 'OUTLOOK_LIST_MESSAGES_a.json', [msg('C1', '2026-11-04T13:48:12Z', [], mid='m1'), msg('C1', '2026-11-04T13:49:08Z', [], mid='m2')], mtime=1000)
            mail_file(d, 'OUTLOOK_LIST_MESSAGES_b.json', [msg('C1', '2026-11-04T13:48:12Z', [IGN], mid='m1')], mtime=2000)
            with open(os.path.join(d, 'OUTLOOK_LIST_MESSAGES_bad.json'), 'w') as f:
                f.write('{not json')
            mail = rw.load_mail(os.path.join(d, 'OUTLOOK_LIST_MESSAGES_*.json'))
            by_id = {m['id']: m for m in mail}
            self.assertEqual(by_id['m1']['categories'], [IGN], 'the newer file must override the stale one')
            self.assertEqual(by_id['m2']['categories'], [])
            html, _ = self.render_cards([card(cid='C1')], mail)
            self.assertIn('<mark>New reply since ignored.</mark>', html)
            self.assertEqual(rw.load_mail(os.path.join(d, 'nothing_*.json')), [])

    def test_cli_uses_the_mail_glob_and_rewrites_the_board_with_the_label(self):
        with tempfile.TemporaryDirectory() as d:
            mail_file(d, 'OUTLOOK_LIST_MESSAGES_a.json', [msg('C1', '2026-11-04T13:48:12Z', [IGN]), msg('C1', '2026-11-04T13:49:08Z', [])])
            src, out = os.path.join(d, 'board.json'), os.path.join(d, 'w.html')
            with open(src, 'w', encoding='utf-8') as f:
                json.dump(board(must=[card(cid='C1', why='Still open.')]), f)
            env = dict(os.environ, BOARD_WIDGET_MAIL_GLOB=os.path.join(d, 'OUTLOOK_LIST_MESSAGES_*.json'))
            proc = subprocess.run([sys.executable, '-I', os.path.join(SCRIPTS, 'render_widget.py'), src, out], capture_output=True, text=True, env=env)
            self.assertEqual(proc.returncode, 0, proc.stderr)
            self.assertEqual(json.loads(proc.stdout)['labeled'], 1)
            with open(out, encoding='utf-8') as f:
                self.assertIn('<mark>New reply since ignored.</mark>', f.read())
            with open(src, encoding='utf-8') as f:
                self.assertEqual(json.load(f)['must'][0]['why'], 'Still open. New reply since ignored.')


    def test_cli_refuses_to_draw_when_the_gate_fails(self):
        with tempfile.TemporaryDirectory() as d:
            src, out, gate = os.path.join(d, 'board.json'), os.path.join(d, 'w.html'), os.path.join(d, 'gate.py')
            with open(src, 'w', encoding='utf-8') as f:
                json.dump(board(must=[card(cid='C1')]), f)
            with open(gate, 'w') as f:
                f.write("import os, sys\nprint('missing 1 of 2 rows ' + os.environ['BOARD_GATE_BOARD'])\nsys.exit(1)\n")
            env = dict(os.environ, BOARD_WIDGET_GATE=gate, BOARD_WIDGET_MAIL_GLOB=os.path.join(d, 'none_*.json'))
            proc = subprocess.run([sys.executable, '-I', os.path.join(SCRIPTS, 'render_widget.py'), src, out], capture_output=True, text=True, env=env)
            self.assertEqual(proc.returncode, 3, proc.stderr)
            self.assertIn('missing 1 of 2 rows ' + src, proc.stdout)
            self.assertIn('board was not drawn', proc.stdout)
            self.assertFalse(os.path.exists(out))

    def test_cli_draws_when_the_gate_passes_or_is_absent(self):
        with tempfile.TemporaryDirectory() as d:
            src, out, gate = os.path.join(d, 'board.json'), os.path.join(d, 'w.html'), os.path.join(d, 'gate.py')
            with open(src, 'w', encoding='utf-8') as f:
                json.dump(board(must=[card(cid='C1')]), f)
            with open(gate, 'w') as f:
                f.write("print('ok 2 of 2 rows accounted')\n")
            for gate_path in (gate, os.path.join(d, 'no_such_gate.py')):
                env = dict(os.environ, BOARD_WIDGET_GATE=gate_path, BOARD_WIDGET_MAIL_GLOB=os.path.join(d, 'none_*.json'))
                proc = subprocess.run([sys.executable, '-I', os.path.join(SCRIPTS, 'render_widget.py'), src, out], capture_output=True, text=True, env=env)
                self.assertEqual(proc.returncode, 0, proc.stderr)
                self.assertTrue(os.path.exists(out))
                os.remove(out)

    def test_ignore_and_undo_do_not_run_the_gate(self):
        with tempfile.TemporaryDirectory() as d:
            src, out, gate = os.path.join(d, 'board.json'), os.path.join(d, 'w.html'), os.path.join(d, 'gate.py')
            with open(src, 'w', encoding='utf-8') as f:
                json.dump(board(must=[card(cid='C1')]), f)
            with open(gate, 'w') as f:
                f.write("import sys\nprint('missing 1 of 2 rows')\nsys.exit(1)\n")
            env = dict(os.environ, BOARD_WIDGET_GATE=gate, BOARD_WIDGET_MAIL_GLOB=os.path.join(d, 'none_*.json'))
            proc = subprocess.run([sys.executable, '-I', os.path.join(SCRIPTS, 'render_widget.py'), src, out, '--ignore', '1'], capture_output=True, text=True, env=env)
            self.assertEqual(proc.returncode, 0, proc.stderr)


def frm(address):
    return {'from': {'emailAddress': {'address': address}}}


class InferCidTests(unittest.TestCase):
    OLD, NEW = '2026-11-04T13:48:12Z', '2026-11-04T13:49:08Z'

    def thread(self, cid, subject, address='dana@x.com', old_cats=(IGN,)):
        return [msg(cid, self.OLD, list(old_cats), subject=subject, **frm(address)), msg(cid, self.NEW, [], subject='Re: ' + subject, **frm(address))]

    def test_card_without_cid_is_matched_by_subject_ignoring_re_prefix(self):
        html, summary = rw.render(board(must=[card(subject='Board deck inputs', email='dana@x.com')]), mail=self.thread('C1', 'Board deck inputs'))
        self.assertIn('<mark>New reply since ignored.</mark>', html)
        self.assertEqual(summary['labeled'], 1)

    def test_subject_match_ignores_case_and_fwd_prefixes(self):
        html, _ = rw.render(board(must=[card(subject='FWD: board DECK inputs')]), mail=self.thread('C1', 'Board deck inputs'))
        self.assertIn('<mark>New reply since ignored.</mark>', html)

    def test_two_conversations_with_the_same_subject_are_not_guessed(self):
        mail = self.thread('C1', 'Audit evidence') + self.thread('C2', 'Audit evidence')
        html, summary = rw.render(board(must=[card(subject='Audit evidence')]), mail=mail)
        self.assertNotIn('since ignored', html)
        self.assertEqual(summary['labeled'], 0)

    def test_sender_address_picks_the_right_conversation(self):
        mail = self.thread('C1', 'Plan', address='a@x.com') + self.thread('C2', 'Plan', address='b@x.com', old_cats=())
        html, _ = rw.render(board(must=[card(subject='Plan', email='a@x.com')]), mail=mail)
        self.assertIn('<mark>New reply since ignored.</mark>', html)
        html2, _ = rw.render(board(must=[card(subject='Plan', email='b@x.com')]), mail=mail)
        self.assertNotIn('since ignored', html2)

    def test_waiting_card_is_matched_by_subject_alone(self):
        mail = [msg('W1', '2026-11-01T09:00:00Z', [IGN], subject='Quote'), {'id': 'w', 'conversationId': 'W1', 'sentDateTime': '2026-11-02T09:00:00Z', 'categories': [], 'subject': 'Re: Quote'}]
        html, _ = rw.render(board(must=[], waiting=[waiting(subject='Quote')]), mail=mail)
        self.assertIn('<mark>New reply since ignored.</mark>', html)

    def test_inferred_card_whose_newest_message_is_marked_is_dropped(self):
        mail = [msg('C1', self.OLD, [], subject='Gone', **frm('a@x.com')), msg('C1', self.NEW, [IGN], subject='Re: Gone', **frm('a@x.com'))]
        html, summary = rw.render(board(must=[card(subject='Gone', email='a@x.com'), card(subject='Stays')]), mail=mail)
        self.assertNotIn('Gone', html)
        self.assertEqual(summary['dropped'], 1)
        self.assertEqual(summary['hidden'], 1)

    def test_a_given_cid_wins_over_the_subject(self):
        mail = self.thread('C1', 'Plan') + self.thread('C2', 'Other', old_cats=())
        html, _ = rw.render(board(must=[card(subject='Plan', cid='C2')]), mail=mail)
        self.assertNotIn('since ignored', html)


class SchemaTests(unittest.TestCase):
    def test_example_in_the_schema_renders(self):
        with open(os.path.join(HERE, '..', 'references', 'data_schema.md'), encoding='utf-8') as f:
            doc = f.read()
        example = re.findall(r'```\n(\{.*\})\n```', doc)[-1]
        html, summary = rw.render(json.loads(example))
        self.assertEqual(summary['cards'], 1)
        self.assertIn('Audit evidence', html)
        self.assertIn('class="from"', html)
        self.assertIn('class="preview"', html)


class CliTests(unittest.TestCase):
    def test_cli_writes_file_and_prints_summary(self):
        proc, html = run_cli(board(must=[card(), card(subject='B')]))
        self.assertEqual(proc.returncode, 0, proc.stderr)
        summary = json.loads(proc.stdout)
        self.assertEqual(summary['cards'], 2)
        self.assertEqual(summary['buttons'], 2)
        self.assertEqual(summary['bytes'], len(html.encode('utf-8')))
        self.assertEqual(len(summary['numbers']), 2)

    def test_cli_structural_error_exits_2_and_writes_nothing(self):
        proc, html = run_cli(board(must='x'))
        self.assertEqual(proc.returncode, 2)
        self.assertTrue(proc.stderr.startswith('error: must:'), proc.stderr)
        self.assertIsNone(html)

    def test_cli_bad_json_exits_2(self):
        with tempfile.TemporaryDirectory() as d:
            src = os.path.join(d, 'b.json')
            with open(src, 'w') as f:
                f.write('{not json')
            proc = subprocess.run([sys.executable, '-I', os.path.join(SCRIPTS, 'render_widget.py'), src, os.path.join(d, 'o.html')], capture_output=True, text=True)
        self.assertEqual(proc.returncode, 2)
        self.assertTrue(proc.stderr.startswith('error:'))


NODE = shutil.which('node')
HARNESS = r'''
const fs = require('fs');
const html = fs.readFileSync(process.argv[2], 'utf8');
const bridge = process.argv[3] === 'bridge';
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const mk = (act, n, subject) => ({ dataset: { act, n, subject }, disabled: false, handlers: {}, addEventListener(e, f) { this.handlers[e] = f; } });
const bs = [mk('ignore', '3', 'Audit "evidence"'), mk('ignore', '4', 'Deck'), mk('undo', '1', 'Old item')];
const note = { hidden: true };
const calls = [];
global.document = { querySelectorAll: () => bs, getElementById: () => note };
global.window = bridge ? { GleanBridge: { postMessage: m => calls.push(m) } } : {};
eval(script);
if (bridge) bs[0].handlers.click();
if (bridge) bs[2].handlers.click();
console.log(JSON.stringify({ calls, disabled: bs.map(b => b.disabled), noteHidden: note.hidden }));
'''


@unittest.skipUnless(NODE, 'node not installed')
class ClickHandlerTests(unittest.TestCase):
    def run_harness(self, mode):
        html, _ = rw.render(board())
        with tempfile.TemporaryDirectory() as d:
            page, harness = os.path.join(d, 'w.html'), os.path.join(d, 'h.js')
            with open(page, 'w', encoding='utf-8') as f:
                f.write(html)
            with open(harness, 'w') as f:
                f.write(HARNESS)
            out = subprocess.run([NODE, harness, page, mode], capture_output=True, text=True, check=True)
        return json.loads(out.stdout)

    def test_click_posts_the_contract_message(self):
        res = self.run_harness('bridge')
        first, second = res['calls']
        self.assertEqual(first, {'actionId': 'ignore-3', 'type': 'glean-send-message',
                                 'metadata': {'displayLabel': 'Ignore “Audit "evidence"”', 'context': 'Ignore 3'}})
        self.assertEqual(second, {'actionId': 'undo-1', 'type': 'glean-send-message',
                                  'metadata': {'displayLabel': 'Restore “Old item”', 'context': 'Undo 1'}})

    def test_all_buttons_off_after_a_click_so_numbers_cannot_shift(self):
        res = self.run_harness('bridge')
        self.assertEqual(res['disabled'], [True, True, True])

    def test_no_bridge_turns_buttons_off_and_shows_the_note(self):
        res = self.run_harness('none')
        self.assertEqual(res['calls'], [])
        self.assertEqual(res['disabled'], [True, True, True])
        self.assertFalse(res['noteHidden'])
        self.assertIn('Ignore buttons need the Glean chat, type Ignore N instead.', rw.render(board())[0])


if __name__ == '__main__':
    unittest.main()
