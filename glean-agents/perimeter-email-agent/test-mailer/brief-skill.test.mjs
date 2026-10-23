import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, writeFileSync, mkdtempSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { renderBrief } from './brief-render.mjs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SKILLS = new URL('../skills/', import.meta.url);
const SKILL = new URL('brief-render/', SKILLS);
const path = (u) => fileURLToPath(u);
const KEYS = [
  'mode', 'asOf', 'highlights', 'must', 'waitingYou', 'review', 'waiting', 'commitments', 'meetings', 'notes', 'summary', 'weekly',
  'person', 'subject', 'vip', 'topic', 'ask', 'action', 'confidence', 'ownership', 'messages', 'why', 'due', 'original', 'latest', 'more', 'also', 'days',
  'recipients', 'daysWaiting', 'asked', 'sent', 'staleness', 'followUp', 'responses', 'who', 'what', 'status', 'overdue',
  'mine', 'others', 'entries', 'unsummarized', 'asksToMe', 'openCommitments', 'othersOwe', 'waitingOnOthers', 'date',
];

test('skill folder holds the files of the spec', () => {
  for (const f of ['SKILL.md', 'scripts/render_brief.py', 'references/data_schema.md', 'assets/week-row.html']) assert.ok(existsSync(new URL(f, SKILL)), f);
  const md = readFileSync(new URL('SKILL.md', SKILL), 'utf8');
  assert.ok(md.startsWith('---\n') && /^name: brief-render$/m.test(md) && /^description: .{40,}/m.test(md));
  const assets = readdirSync(new URL('assets/', SKILL)).filter((f) => f.endsWith('.html'));
  assert.equal(assets.length, 21);
  for (const f of assets) {
    const t = readFileSync(new URL(`assets/${f}`, SKILL), 'utf8');
    assert.ok(!/\{\{|\}\}/.test(t), `${f} has a double brace`);
    assert.deepEqual([...t.matchAll(/class="([^"]*)"/g)].map((m) => m[1]).filter((c) => /\s/.test(c.trim())), [], `${f} has a multi class attribute`);
  }
});

test('zip has SKILL.md at the root and no tests', () => {
  execFileSync('python3', [path(new URL('build_zip.py', SKILLS))]);
  const zip = path(new URL('brief-render.zip', SKILLS));
  const names = execFileSync('python3', ['-m', 'zipfile', '-l', zip], { encoding: 'utf8' }).split('\n').map((l) => l.split(/\s+/)[0]).filter(Boolean);
  for (const n of ['SKILL.md', 'scripts/render_brief.py', 'references/data_schema.md']) assert.ok(names.includes(n), n);
  assert.ok(names.filter((n) => n.startsWith('assets/')).length >= 21);
  assert.ok(!names.some((n) => n.startsWith('tests/') || n.includes('__pycache__')));
});

test('schema doc names every key of the contract', () => {
  const doc = readFileSync(new URL('references/data_schema.md', SKILL), 'utf8');
  for (const k of KEYS) assert.ok(new RegExp(`\\b${k}\\b`).test(doc), k);
});

const fixture = (name) => JSON.parse(readFileSync(new URL(`./fixtures/${name}.json`, import.meta.url), 'utf8'));
const withoutDays = (d) => {
  const copy = structuredClone(d);
  for (const k of ['must', 'waitingYou', 'review']) for (const c of copy[k] ?? []) delete c.days;
  return copy;
};
const python = (data) => {
  const dir = mkdtempSync(join(tmpdir(), 'brief-'));
  const input = join(dir, 'board.json'), output = join(dir, 'brief.html');
  writeFileSync(input, JSON.stringify(data));
  const line = execFileSync('python3', ['-I', path(new URL('scripts/render_brief.py', SKILL)), input, output], { encoding: 'utf8' });
  return { html: readFileSync(output, 'utf8'), summary: JSON.parse(line), size: statSync(output).size };
};
const BOARDS = {
  'morning 43': fixture('brief-morning-43'),
  mixed: fixture('brief-mixed'),
  empty: fixture('brief-empty'),
  edge: fixture('brief-edge'),
  'end-of-day 43': { ...fixture('brief-morning-43'), mode: 'end-of-day' },
};

test('parity: python equals the oracle', () => {
  for (const [name, data] of Object.entries(BOARDS)) {
    assert.equal(python(data).html, renderBrief(data), name);
    assert.equal(python(withoutDays(data)).html, renderBrief(withoutDays(data)), `${name} without days`);
  }
});

test('parity: the summary line counts match the fixture', () => {
  const morning = python(BOARDS['morning 43']);
  assert.equal(morning.summary.cards, 43);
  assert.deepEqual(morning.summary.sections, { must: 13, waitingYou: 0, waiting: 30, review: 0 });
  assert.equal(morning.summary.tiles, 9);
  assert.equal(morning.summary.mode, 'morning');
  assert.equal(morning.summary.bytes, morning.size);
  const eod = python(BOARDS['end-of-day 43']);
  assert.equal(eod.summary.tiles, 6);
  assert.equal(eod.summary.mode, 'end-of-day');
  assert.equal(eod.summary.bytes, eod.size);
});
