import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderBrief, stats, inboundDays, waitingDays } from './brief-render.mjs';
import { checkBrief } from './brief-check.mjs';

const big = JSON.parse(readFileSync(new URL('./fixtures/brief-morning-43.json', import.meta.url), 'utf8'));
const card = (o = {}) => ({ person: 'Ann Lee', subject: 'S', days: 2, ask: 'A', action: 'Reply', confidence: 'High', ownership: 'Owned', messages: 1, why: 'W', due: 'D', original: 'O', latest: 'L', ...o });

test('43 item morning fixture renders complete and compact', () => {
  const html = renderBrief(big);
  assert.deepEqual(checkBrief(html, big), []);
  assert.equal((html.match(/class="rk"/g) ?? []).length, 13);
  assert.equal((html.match(/class="rw"/g) ?? []).length, 30);
  assert.ok(html.length < 90000, `brief is ${html.length} characters`);
});

test('email text is escaped so it cannot inject markup', () => {
  const d = { mode: 'morning', asOf: 'Oct 22, 2026', must: [card({ person: '<script>x</script>', ask: 'Fix "a" & b' })] };
  const html = renderBrief(d);
  assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('&lt;script&gt;') && html.includes('Fix &quot;a&quot; &amp; b'));
  assert.deepEqual(checkBrief(html, d), []);
});

test('optional rows and pills appear only when the item has them', () => {
  const plain = renderBrief({ mode: 'morning', asOf: 'x', must: [card()] });
  assert.ok(!plain.includes('More asks') && !plain.includes('Also waiting on') && !plain.includes('>VIP<'));
  const rich = renderBrief({ mode: 'morning', asOf: 'x', must: [card({ more: 'M', also: 'Bob', vip: true, topic: 'budget' })] });
  assert.ok(rich.includes('More asks') && rich.includes('Also waiting on') && rich.includes('VIP') && rich.includes('Topic: budget'));
});

test('day pill classes follow the thresholds', () => {
  assert.deepEqual(inboundDays(5), ['5 days', 'dpr']);
  assert.deepEqual(inboundDays(1), ['1 day', 'dpa']);
  assert.deepEqual(inboundDays(0), ['Not overdue', 'dpn']);
  assert.deepEqual([waitingDays(8)[1], waitingDays(4)[1], waitingDays(1)[1]], ['dpr', 'dpa', 'dpn']);
});

test('chart counts to do per sender and waiting per recipient', () => {
  const s = stats(big);
  assert.deepEqual(s.rows[0], { name: 'Alice Morgan', todo: 3, wait: 20, total: 23 });
  assert.equal(s.open, 43);
  assert.equal(s.drafts, 7);
});

test('end of day has six tiles and an empty board gives the clear sentence', () => {
  const eod = renderBrief({ ...big, mode: 'end-of-day' });
  assert.equal((eod.match(/class="kpi"/g) ?? []).length, 6);
  assert.ok(eod.includes('End-of-day brief, Oct 22, 2026'));
  const empty = renderBrief({ mode: 'end-of-day', asOf: 'x' });
  assert.ok(empty.includes('All clear for the rest of today.') && !empty.includes('class="kpi"'));
});

test('checker reports a dropped card, a wrong section count and a leftover token', () => {
  const html = renderBrief(big);
  const dropped = html.replace(/<table role="presentation" class="card"[\s\S]*?<\/table><\/td><\/tr><\/table>/, '');
  assert.ok(checkBrief(dropped, big).length > 0);
  assert.ok(checkBrief(html.replace('Must Do Today · 13', 'Must Do Today · 12'), big).some((p) => p.includes('says 12')));
  assert.ok(checkBrief(html + '@@X@@', big).some((p) => p.includes('token')));
});

test('duplicates are counted from inbound cards', () => {
  assert.equal(stats(big).duplicates, 3);
  const d = { mode: 'morning', asOf: 'x', must: [card(), card()], waiting: [{ recipients: 'Ann Lee', subject: 'S', daysWaiting: 1, asked: 'a', sent: 's', staleness: 'Recent', followUp: 'f' }] };
  assert.equal(stats(d).duplicates, 1);
});

test('duplicate pairs tile ignores a duplicatePairs field', () => {
  const html = renderBrief({ ...big, duplicatePairs: 9 });
  assert.ok(/>3<\/b><\/td><\/tr><\/table><\/td><td valign="middle" class="l"[^>]*>Duplicate pairs/.test(html));
});

test('overdue commitment shows the pill fragment', () => {
  const d = { mode: 'morning', asOf: 'x', commitments: { mine: [{ who: 'A', what: 'B', due: 'C', status: 'Open', overdue: true }, { who: 'D', what: 'E', due: 'F', status: 'Open' }] } };
  const html = renderBrief(d);
  assert.equal((html.match(/class="dpr" style="margin-left:4px">Overdue</g) ?? []).length, 1);
});

test('a capped recipient list "and N more" is not a person', () => {
  const w = { recipients: 'Ann Lee, Bob Roy and 11 more', subject: 'S', daysWaiting: 2, asked: 'a', sent: 's', staleness: 'Recent', followUp: 'f' };
  const s = stats({ mode: 'morning', asOf: 'x', waiting: [w] });
  assert.deepEqual(s.rows.map((r) => r.name), ['Ann Lee', 'Bob Roy']);
  assert.equal(s.recipients, 2);
});

test('the Recipients tile counts every person, also past the 8 chart rows', () => {
  const names = Array.from({ length: 11 }, (_, i) => `P${i} Q`).join(', ');
  const w = { recipients: names, subject: 'S', daysWaiting: 2, asked: 'a', sent: 's', staleness: 'Recent', followUp: 'f' };
  const html = renderBrief({ mode: 'morning', asOf: 'x', waiting: [w] });
  assert.equal(stats({ mode: 'morning', asOf: 'x', waiting: [w] }).recipients, 11);
  assert.equal((html.match(/width="46%"/g) ?? []).length, 8);
  assert.ok(/>11<\/b><\/td><\/tr><\/table><\/td><td valign="middle" class="l"[^>]*>Recipients</.test(html));
});
