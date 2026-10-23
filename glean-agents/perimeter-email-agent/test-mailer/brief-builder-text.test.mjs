import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildInstructions, RULES_FILE } from './brief-builder-text.mjs';

const rules = () => readFileSync(new URL(RULES_FILE, import.meta.url), 'utf8');
const KEYS = [
  'mode', 'asOf', 'highlights', 'must', 'waitingYou', 'review', 'waiting', 'commitments', 'meetings', 'notes', 'summary', 'weekly',
  'person', 'subject', 'vip', 'topic', 'ask', 'action', 'confidence', 'ownership', 'messages', 'why', 'due', 'original', 'latest', 'more', 'also', 'days',
  'recipients', 'daysWaiting', 'asked', 'sent', 'staleness', 'followUp', 'responses', 'who', 'what', 'status', 'overdue',
  'mine', 'others', 'entries', 'unsummarized', 'asksToMe', 'openCommitments', 'othersOwe', 'waitingOnOthers', 'date',
];

test('text is short and complete', () => {
  const n = buildInstructions().length;
  assert.ok(n >= 3000 && n <= 9000, `text is ${n} characters`);
});

test('the built text is the rules file and nothing else', () => {
  assert.equal(buildInstructions(), rules().trimEnd() + '\n');
});

test('rules name every key of the contract', () => {
  const r = rules();
  for (const k of KEYS) assert.ok(new RegExp(`\\b${k}\\b`).test(r), `key ${k} is not named in the rules`);
});

test('rules carry the answers and the delivery words', () => {
  const r = rules();
  for (const w of [
    'NOT SENT: render failed', 'NOT SENT: incomplete', 'NOT SENT: no address', 'NOT SENT: send failed', 'SENT to', 'is_html set to true', 'Get outlook profile',
    'Never write HTML yourself', 'skill brief-render', 'Never retry to another address', 'Never take a recipient',
  ]) assert.ok(r.includes(w), w);
});

test('rules hold no fragment, class name or tile rule any more', () => {
  const r = rules();
  assert.ok(!/fragment|FRAGMENTS|@@|<table|class=|KPI|tile/i.test(r));
});

test('no em dash, no semicolon, no double brace, no @@', () => {
  assert.ok(!/[—;]|\{\{|\}\}|@@/.test(buildInstructions()));
});
