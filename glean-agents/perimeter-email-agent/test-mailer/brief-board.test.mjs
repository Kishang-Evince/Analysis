import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderBoard } from './brief-board.mjs';
import { skeleton } from './board-skeleton.mjs';

const load = (f) => JSON.parse(readFileSync(new URL(`./fixtures/${f}`, import.meta.url), 'utf8'));
const big = load('brief-morning-43.json');
const mixed = load('brief-mixed.json');
const INBOUND = ['Ask', 'Action', 'Why included', 'Due', 'Confidence', 'Ownership', 'Original ask', 'Latest update', 'Messages', 'More asks', 'Also waiting on'];
const WAITING = ['What you asked', 'Sent', 'Staleness', 'Days waiting', 'Follow-up', 'Responses'];
const isSubsequence = (sub, full) => { let i = 0; for (const x of full) if (x === sub[i]) i += 1; return i === sub.length; };

test('board layout matches the skill', () => {
  const sk = skeleton(renderBoard(mixed));
  assert.deepEqual(sk.headings, [
    '# Outlook Action Board: Morning, as of Oct 23, 2026', '## 🔴 Must Do Today', '## 🟡 Waiting on Your Response', '## 🟠 Waiting on Others',
    '## 🔵 Review Quickly', '## Commitments', '## Meeting prep', 'SUMMARY',
  ]);
  const shapes = sk.cardShapes.filter(Boolean).map((s) => s.split('|'));
  assert.ok(shapes.length >= 2);
  for (const shape of shapes) {
    const inbound = shape[0] === 'Ask';
    assert.ok(isSubsequence(shape, inbound ? INBOUND : WAITING), `shape ${shape.join('|')} breaks the skill order`);
    assert.ok(shape.length >= (inbound ? 9 : 4)); // board-skeleton cannot see the hyphenated label Follow-up
  }
});

test('every data field is on the board in the skill order', () => {
  const md = renderBoard(big);
  for (const c of big.must) for (const v of [c.person, c.subject, c.ask, c.why, c.due, c.original, c.latest]) assert.ok(md.includes(v), v);
  for (const c of big.waiting) for (const v of [c.recipients, c.subject, c.asked, c.sent, c.followUp]) assert.ok(md.includes(v), v);
  const lines = renderBoard(mixed).split('\n');
  const card = lines.slice(lines.findIndex((l) => l.startsWith('**Dana Whitfield | R&D')));
  const labels = card.slice(1, 12).map((l) => l.match(/^- ([A-Za-z ]+):/)?.[1]);
  assert.deepEqual(labels, INBOUND);
});

test('marks go inside the bold header', () => {
  assert.ok(renderBoard(mixed).includes('**Dana Whitfield | R&D <budget> "final" | VIP | Topic: renewal**'));
  assert.ok(renderBoard(mixed).includes('**Dana Whitfield | Renewal terms | VIP | Topic: renewal**'));
});

test('days are derivable from the due line and the as of date', () => {
  for (const d of [big, mixed]) {
    const asOf = Date.parse(`${d.asOf} 00:00 UTC`);
    for (const c of d.must) {
      if (!c.due.endsWith('passed')) continue;
      const due = Date.parse(`${c.due.match(/^[A-Za-z]+ \d+, \d{4}/)[0]} 00:00 UTC`);
      assert.equal(Math.round((asOf - due) / 86400000), c.days, `${c.subject}`);
    }
  }
});

test('commitments, meetings, notes and the summary line follow the skill', () => {
  const md = renderBoard(mixed);
  assert.ok(md.includes('**Mine**') && md.includes('**Others owe me**'));
  assert.ok(md.includes('- Dana Whitfield | Send the revised forecast | Due: Oct 21, 2026 (Wed) | Status: Open | Overdue'));
  assert.ok(md.includes('- Team sync, 4:00 PM: not summarized'));
  const lines = md.trimEnd().split('\n');
  assert.ok(lines.at(-1).startsWith('Inbound:'));
  assert.equal(lines.at(-2), 'Calendar: 3 meetings today.');
});

test('empty board gives the clear sentence and no sections', () => {
  const md = renderBoard({ mode: 'end-of-day', asOf: 'Oct 23, 2026', summary: 'Inbound: 0 emails excluded (0 already replied to, 0 noise). Outbound: 0 sent emails excluded (informational, no ask).' });
  assert.ok(md.includes('# Outlook Action Board: End-of-day, as of Oct 23, 2026'));
  assert.ok(md.includes('All clear for the rest of today.') && !md.includes('## '));
});

test('no em dash or semicolon in the board', () => {
  for (const d of [big, mixed]) assert.ok(!/[—;]/.test(renderBoard(d)));
});
