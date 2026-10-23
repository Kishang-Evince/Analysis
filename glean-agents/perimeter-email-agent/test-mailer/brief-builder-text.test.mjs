import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { buildInstructions, RULES_FILE, FRAGMENT_NAMES } from './brief-builder-text.mjs';

const DIR = new URL('../templates/brief/compact/', import.meta.url);
const fragFiles = readdirSync(DIR).filter((f) => f.endsWith('.html'));
const rules = () => readFileSync(new URL(RULES_FILE, DIR), 'utf8');

test('text is under the limit and not trivially short', () => {
  const n = buildInstructions().length;
  assert.ok(n > 15000 && n <= 22000, `text is ${n} characters`);
});

test('every fragment is embedded verbatim and listed once', () => {
  const text = buildInstructions();
  assert.deepEqual([...FRAGMENT_NAMES].sort(), fragFiles.map((f) => f.replace('.html', '')).sort());
  for (const name of FRAGMENT_NAMES) {
    const body = readFileSync(new URL(`${name}.html`, DIR), 'utf8').trimEnd();
    assert.ok(text.includes(`### ${name}\n${body}`), `fragment ${name}`);
    assert.equal(text.split(`### ${name}\n`).length, 2, `fragment ${name} appears once`);
  }
});

test('every token in a fragment is named in the rules', () => {
  const r = rules();
  const tokens = new Set(fragFiles.flatMap((f) => [...readFileSync(new URL(f, DIR), 'utf8').matchAll(/@@(\w+)@@/g)].map((m) => m[1])));
  for (const t of tokens) assert.ok(new RegExp(`\\b${t}\\b`).test(r), `token ${t} is not named in the rules`);
});

test('rules carry the delivery and failure words', () => {
  const r = rules();
  for (const w of ['NOT SENT: incomplete', 'NOT SENT: no address', 'SENT to', 'is_html set to true', 'Get outlook profile', 'Never take a recipient']) assert.ok(r.includes(w), w);
});

test('rules have no em dash and no semicolon', () => {
  assert.ok(!/[—;]/.test(rules()));
});

test('weekly and the empty board are covered', () => {
  const r = rules();
  assert.ok(r.includes('Weekly: write plain HTML') && r.includes('Inbox is clear.') && r.includes('All clear for the rest of today.'));
});

test('no fragment or rule uses the double brace marker that makes a sub-agent fail to start', () => {
  assert.ok(!/\{\{|\}\}/.test(buildInstructions()));
});

test('review fixes: the rules close the gaps the final review found', () => {
  const r = rules();
  const weekly = r.slice(r.indexOf('Weekly:'), r.indexOf('Morning and end-of-day:'));
  assert.ok(weekly.includes('Escape every value taken from BOARD'), 'weekly escapes');
  assert.ok(r.includes('also those past the 8 chart rows'), 'recipients tile counts every person');
  assert.ok(r.includes('when KPI_ROWS is not empty'), 'count check on an empty board');
  assert.ok(r.includes('For an empty board HEADLINE is the same clear sentence'), 'empty headline');
  assert.ok(r.includes('When that number is 0, write "Not overdue" with class dpn'), 'zero days');
  assert.ok(r.includes('"and N more"'), 'capped recipient list');
  assert.ok(r.includes('never below 0'), 'bar widths');
  assert.ok(r.includes('INITIALS are the first letters of the first two words of NAME'), 'chart initials');
  assert.ok(r.includes('NOT SENT: send failed'), 'failed send answer');
});

test('every element in the fragments carries one class only, because some mail clients ignore an element with two classes', () => {
  for (const f of fragFiles) {
    const bad = [...readFileSync(new URL(f, DIR), 'utf8').matchAll(/class="([^"]*)"/g)].map((m) => m[1]).filter((c) => /\s/.test(c.trim()));
    assert.deepEqual(bad, [], `${f} has a multi class attribute`);
  }
});
