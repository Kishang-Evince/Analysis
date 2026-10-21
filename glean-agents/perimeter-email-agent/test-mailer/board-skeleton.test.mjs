import { test } from 'node:test';
import assert from 'node:assert/strict';
import { skeleton, sameLayout } from './board-skeleton.mjs';

const card = (name, extra = '') => `**${name} — Subject**\n- Ask: x\n- Action: y\n- Due: z${extra}\n`;
const board = (cards, summary = 'Inbound: 1 emails excluded (0 already replied to, 1 noise). Outbound: 0 sent emails excluded (informational, no ask).') =>
  `# Outlook Action Board — Morning — As of Oct 19, 2026 (Mon)\n## 🔴 Must Do Today\n${cards}\n${summary}\n`;

test('same headings and card fields in the same order count as the same layout, whatever the values', () => {
  assert.ok(sameLayout([board(card('A')), board(card('B') + card('C'), 'Inbound: 9 emails excluded (1 already replied to, 8 noise). Outbound: 2 sent emails excluded (informational, no ask).')]));
});
test('a missing field line is a different layout', () => {
  assert.equal(sameLayout([board(card('A')), board('**A — Subject**\n- Ask: x\n- Due: z\n')]), false);
});
test('a card in list format instead of card format is a different layout', () => {
  assert.equal(sameLayout([board(card('A')), board('1. A — Subject: Ask x\n')]), false);
});
test('the VIP line and the date in the title do not change the layout', () => {
  const withVip = board(card('A')).replace('## 🔴', '**VIP and topics:** VIP: a\n## 🔴');
  assert.ok(sameLayout([board(card('A')), withVip.replace('Oct 19, 2026 (Mon)', 'Oct 20, 2026 (Tue)')]));
});
test('skeleton lists the headings and the summary marker', () => {
  assert.deepEqual(skeleton(board(card('A'))).headings, ['# Outlook Action Board — Morning — As of DATE', '## 🔴 Must Do Today', 'SUMMARY']);
});
