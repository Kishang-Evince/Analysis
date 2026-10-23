import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { renderBrief } from './brief-render.mjs';
import { checkBrief, factsOf } from './brief-check.mjs';

const dataFile = fileUrl('fixtures/brief-morning-43.json');
function fileUrl(f) { return new URL(`./${f}`, import.meta.url); }
const big = JSON.parse(readFileSync(dataFile, 'utf8'));
const html = renderBrief(big);
const golden = factsOf(html);

test('facts of the golden render hold tiles, chart rows, pills and heads', () => {
  assert.equal(golden.kpis.length, 9);
  assert.ok(golden.kpis.includes('Drafts ready=7@#5B62D6'));
  assert.equal(golden.chart.length, 7);
  assert.equal(golden.pills.length, 43);
  assert.deepEqual(golden.heads, ['Must Do Today=13', 'Waiting on Others=30']);
});

test('a clean brief has no problems with the golden facts', () => {
  assert.deepEqual(checkBrief(html, big, golden), []);
});

test('a wrong Drafts ready value is reported by tile name', () => {
  const bad = html.replace(/>7<\/b>(<\/td><\/tr><\/table><\/td><td valign="middle" class="l"[^>]*>Drafts ready)/, '>6</b>$1');
  const problems = checkBrief(bad, big, golden);
  assert.ok(problems.some((p) => p.includes('Drafts ready') && p.includes('expected 7') && p.includes('got 6')), problems.join('\n'));
});

test('a wrong chart percentage is reported', () => {
  const bad = html.replace('width="13%" height="12"', 'width="14%" height="12"');
  assert.ok(checkBrief(bad, big, golden).some((p) => p.startsWith('chart row 1')));
});

test('a wrong pill class is reported', () => {
  const bad = html.replace('class="dpr">6 days', 'class="dpa">6 days');
  assert.ok(checkBrief(bad, big, golden).some((p) => p.startsWith('pill 1')));
});

test('no golden means no facts comparison', () => {
  const bad = html.replace('class="dpr">6 days', 'class="dpa">6 days');
  assert.deepEqual(checkBrief(bad, big), []);
});

test('the snippet gives the same answer in a fresh function', () => {
  const snippet = execFileSync('node', [fileURLToPath(new URL('./brief-check.mjs', import.meta.url)), '--snippet', fileURLToPath(dataFile)], { encoding: 'utf8' });
  const run = (h) => new Function('window', `return ${snippet}`)({ __reply: h });
  assert.deepEqual(run(html), []);
  const bad = html.replace('class="dpr">6 days', 'class="dpa">6 days');
  assert.deepEqual(run(bad), checkBrief(bad, big, golden));
});

test('a shortened style block is reported', () => {
  const bad = html.replace(/<style>[\s\S]*?<\/style>/, '<style>body{margin:0}</style>');
  assert.ok(checkBrief(bad, big, golden).some((p) => p.includes('style block')));
});

test('a note paragraph that is not in the data is reported', () => {
  const bad = html.replace('<p style="margin:0">Inbound', '<p style="margin:0 0 6px 0">All clear for the rest of today.</p><p style="margin:0">Inbound');
  assert.ok(checkBrief(bad, big, golden).some((p) => p.includes('note paragraphs')));
});

test('tile label case is ignored', () => {
  const bad = html.replace('>Open items<', '>OPEN ITEMS<');
  assert.deepEqual(checkBrief(bad, big, golden), []);
});

test('whitespace changes in the style block are ignored', () => {
  const spaced = html.replace(/<style>([\s\S]*?)<\/style>/, (m, css) => `<style>${css.replace(/\n/g, '\n\n  ')}</style>`);
  assert.deepEqual(checkBrief(spaced, big, golden), []);
});

test('section head case is ignored', () => {
  const bad = html.replace('>Must Do Today · 13<', '>MUST DO TODAY · 13<').replace('>Waiting on Others · 30<', '>WAITING ON OTHERS · 30<');
  assert.deepEqual(checkBrief(bad, big, golden), []);
});

test('an empty board whose commitments lists are empty needs no tiles', () => {
  const d = { mode: 'morning', asOf: 'x', commitments: { mine: [], others: [] }, summary: 'Inbound: 0 emails excluded (0 already replied to, 0 noise). Outbound: 0 sent emails excluded (informational, no ask).' };
  assert.deepEqual(checkBrief(renderBrief(d), d), []);
});
