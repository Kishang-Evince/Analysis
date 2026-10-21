import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SCENARIOS, parseArgs, selectScenarios } from './send-test-emails.mjs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const scripts = pkg.scripts;
const argsOf = (name) => scripts[name].split(/\s+/).slice(scripts[name].split(/\s+/).indexOf('send-test-emails.mjs') + 1);

describe('package.json seed scripts', () => {
  const seeds = Object.keys(scripts).filter((k) => k.startsWith('seed:'));

  test('there is a seed script for every EMAIL ticket, every EMAIL-01 group and every parity group with seeds', () => {
    const wanted = [
      // EMAIL-08 (tone) has no script: its seeds are mail the user sends from Outlook, so the mailer has nothing to send.
      ...[1, 2, 3, 4, 5, 6, 7, 9, 10, 11].map((n) => `seed:email-${String(n).padStart(2, '0')}`),
      ...['e13', 'e11', 'e05', 'e06', 'e17', 'e19', 'e20'].map((g) => `seed:${g}`),
      ...['a1', 'a2', 'a3', 'a4', 'a5', 'a7', 'a8', 'a9'].map((g) => `seed:${g}`),
      'seed:e13-bulk80', 'seed:e13-bulk-topup', 'seed:c',
    ];
    for (const name of wanted) assert.ok(scripts[name], `missing script ${name}`);
  });

  test('every seed script parses, confirms itself, and selects at least one email within its --limit', () => {
    for (const name of seeds) {
      const opts = parseArgs(argsOf(name));
      assert.equal(opts.yes, true, `${name} should pass --yes`);
      const { list } = selectScenarios(SCENARIOS, opts);
      assert.ok(list.length > 0, `${name} selects nothing`);
      assert.ok(list.length <= opts.limit, `${name} sends ${list.length} emails but --limit is ${opts.limit}`);
    }
  });

  test('EMAIL-08 has no seed script because the mailer has no inbound mail for it', () => {
    assert.equal(scripts['seed:email-08'], undefined);
    assert.equal(selectScenarios(SCENARIOS, parseArgs(['--ticket', 'EMAIL-08'])).list.length, 0);
  });

  test('the bulk seeds send 80 and 220 emails', () => {
    const count = (name) => selectScenarios(SCENARIOS, parseArgs(argsOf(name))).list.length;
    assert.equal(count('seed:e13-bulk80'), 80);
    assert.equal(count('seed:e13-bulk-topup'), 220);
  });

  test('a ticket script sends exactly what --ticket selects', () => {
    const viaScript = selectScenarios(SCENARIOS, parseArgs(argsOf('seed:email-01'))).list.map((s) => s.id);
    const direct = selectScenarios(SCENARIOS, parseArgs(['--ticket', 'EMAIL-01'])).list.map((s) => s.id);
    assert.deepEqual(viaScript, direct);
  });
});

describe('package.json check scripts', () => {
  test('check:0 to check:18 run the spec checker for their stage', () => {
    for (let n = 0; n <= 18; n += 1) assert.match(scripts[`check:${n}`] ?? '', new RegExp(`check-spec\\.mjs ${n}$`), `check:${n}`);
  });
});
