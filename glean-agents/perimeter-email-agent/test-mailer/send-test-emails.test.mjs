import { test, describe, mock } from 'node:test';
import assert from 'node:assert/strict';
import * as mailer from './send-test-emails.mjs';
import {
  PERSONAS, SCENARIOS, USAGE, isEmail, validateCatalog, parseArgs, selectScenarios, loadConfig,
  resolveAccount, buildMessage, formatList, collectManualSteps, runScenarios, main, isFatalSendError,
} from './send-test-emails.mjs';

const scenario = (over = {}) => ({
  id: 'T-01', tests: ['T-01'], group: 'T', title: 'Title', from: 'alice', recipients: 'to',
  subject: 'Subject', body: 'Body', ...over,
});

const CATALOG = [
  scenario({ id: 'T-01', group: 'G1', tests: ['T-01', 'X-9'] }),
  scenario({ id: 'T-02', group: 'G1', replyTo: 'T-01', manual: ['Reply as USER'], title: 'Follow-up' }),
  scenario({ id: 'T-03', group: 'G2', from: 'dana', recipients: 'cc', importance: 'high' }),
  scenario({ id: 'T-04', group: 'G2', from: 'system', recipients: 'bcc', headers: { 'Auto-Submitted': 'auto-replied' } }),
  scenario({ id: 'T-05', group: 'G3', recipients: 'to-multi' }),
];

const ENV = { TEST_RECEIVER: 'user@company.test', GMAIL_USER: 'sender@gmail.test', GMAIL_APP_PASSWORD: 'abcd efgh ijkl mnop' };
const opts = (over = {}) => ({ ...parseArgs([]), ...over });
const quiet = () => {
  const lines = [];
  const errors = [];
  return { log: (m) => lines.push(m), errorLog: (m) => errors.push(m), lines, errors };
};
const fakeTransport = (behaviour = {}) => ({
  verify: mock.fn(behaviour.verify ?? (async () => true)),
  sendMail: mock.fn(behaviour.sendMail ?? (async (m) => ({ messageId: m.messageId }))),
});

describe('isEmail', () => {
  test('accepts a normal address and rejects junk', () => {
    assert.equal(isEmail('a@b.co'), true);
    assert.equal(isEmail(' a@b.co '), true);
    assert.equal(isEmail('nope'), false);
    assert.equal(isEmail(''), false);
    assert.equal(isEmail(null), false);
  });
});

describe('validateCatalog', () => {
  test('shipped catalog is valid', () => {
    assert.deepEqual(validateCatalog(), []);
    assert.ok(SCENARIOS.length >= 1);
  });

  test('catches missing fields, duplicates and bad values', () => {
    const errors = validateCatalog([
      scenario({ id: 'A' }),
      scenario({ id: 'A' }),
      scenario({ id: 'B', from: 'nobody' }),
      scenario({ id: 'C', recipients: 'everyone' }),
      scenario({ id: 'D', importance: 'urgent' }),
      scenario({ id: 'E', subject: '' }),
      scenario({ id: 'F', tests: [] }),
      scenario({ id: 'G', replyTo: 'missing' }),
      scenario({ id: 'H', replyTo: 'I' }),
      scenario({ id: 'I' }),
    ]);
    const text = errors.join('\n');
    assert.match(text, /A: duplicate id/);
    assert.match(text, /B: unknown persona nobody/);
    assert.match(text, /C: bad recipients everyone/);
    assert.match(text, /D: bad importance urgent/);
    assert.match(text, /E: missing subject/);
    assert.match(text, /F: tests must be a non-empty array/);
    assert.match(text, /G: replyTo missing must be an earlier scenario/);
    assert.match(text, /H: replyTo I must be an earlier scenario/);
  });

  test('handles a non-object entry without throwing', () => {
    assert.ok(validateCatalog([null]).length > 0);
  });
});

describe('parseArgs', () => {
  test('defaults', () => {
    const o = parseArgs([]);
    assert.equal(o.delayMs, 1500);
    assert.equal(o.limit, 200);
    assert.equal(o.verify, true);
    assert.deepEqual(o.scenarios, []);
  });

  test('parses every flag, including --flag=value', () => {
    const o = parseArgs([
      '--list', '--all', '--dry-run', '-y', '--no-verify', '-h',
      '--scenario', 'A,B', '--scenario=C', '--group', 'g1', '--test', 't1,t2',
      '--to', 'u@x.co', '--other=o@x.co', '--tag', '[r]', '--delay', '0', '--limit=5',
    ]);
    assert.equal(o.list && o.all && o.dryRun && o.yes && o.help, true);
    assert.equal(o.verify, false);
    assert.deepEqual(o.scenarios, ['A', 'B', 'C']);
    assert.deepEqual(o.groups, ['g1']);
    assert.deepEqual(o.tests, ['t1', 't2']);
    assert.equal(o.to, 'u@x.co');
    assert.equal(o.other, 'o@x.co');
    assert.equal(o.tag, '[r]');
    assert.equal(o.delayMs, 0);
    assert.equal(o.limit, 5);
  });

  test('rejects bad input', () => {
    assert.throws(() => parseArgs(['--scenario']), /needs a value/);
    assert.throws(() => parseArgs(['--scenario', '--all']), /needs a value/);
    assert.throws(() => parseArgs(['--delay', 'abc']), /--delay/);
    assert.throws(() => parseArgs(['--delay', '-1']), /--delay/);
    assert.throws(() => parseArgs(['--limit', '0']), /--limit/);
    assert.throws(() => parseArgs(['--limit', '1.5']), /--limit/);
    assert.throws(() => parseArgs(['--bogus']), /Unknown option --bogus/);
    assert.throws(() => parseArgs(['stray']), /Unexpected argument stray/);
  });
});

describe('selectScenarios', () => {
  test('requires a selector', () => {
    assert.throws(() => selectScenarios(CATALOG, opts()), /Nothing selected/);
  });

  test('selects by scenario, group, test and all, case-insensitively', () => {
    assert.deepEqual(selectScenarios(CATALOG, opts({ scenarios: ['t-03'] })).list.map((s) => s.id), ['T-03']);
    assert.deepEqual(selectScenarios(CATALOG, opts({ groups: ['g2'] })).list.map((s) => s.id), ['T-03', 'T-04']);
    assert.deepEqual(selectScenarios(CATALOG, opts({ tests: ['x-9'] })).list.map((s) => s.id), ['T-01']);
    assert.equal(selectScenarios(CATALOG, opts({ all: true })).list.length, 5);
  });

  test('pulls in earlier thread parents and reports them', () => {
    const r = selectScenarios(CATALOG, opts({ scenarios: ['T-02'] }));
    assert.deepEqual(r.list.map((s) => s.id), ['T-01', 'T-02']);
    assert.deepEqual(r.addedDependencies, ['T-01']);
  });

  test('walks multi-level reply chains', () => {
    const chain = [scenario({ id: 'A' }), scenario({ id: 'B', replyTo: 'A' }), scenario({ id: 'C', replyTo: 'B' })];
    const r = selectScenarios(chain, opts({ scenarios: ['C'] }));
    assert.deepEqual(r.list.map((s) => s.id), ['A', 'B', 'C']);
  });

  test('lists every unknown selector', () => {
    assert.throws(() => selectScenarios(CATALOG, opts({ scenarios: ['nope'], groups: ['zz'], tests: ['q'] })),
      /scenario nope, group zz, test q/);
  });
});

describe('loadConfig', () => {
  test('reads receiver and default account, stripping spaces from the app password', () => {
    const c = loadConfig(ENV);
    assert.equal(c.receiver, 'user@company.test');
    assert.deepEqual(c.defaultAccount, { user: 'sender@gmail.test', pass: 'abcdefghijklmnop' });
    assert.equal(c.otherRecipient, null);
  });

  test('--to and --other override the environment', () => {
    const c = loadConfig({ ...ENV, OTHER_RECIPIENT: 'env@x.co' }, { to: 'cli@x.co', other: 'cli-other@x.co' });
    assert.equal(c.receiver, 'cli@x.co');
    assert.equal(c.otherRecipient, 'cli-other@x.co');
    assert.equal(loadConfig({ ...ENV, OTHER_RECIPIENT: 'env@x.co' }).otherRecipient, 'env@x.co');
  });

  test('fails clearly when settings are missing or malformed', () => {
    assert.throws(() => loadConfig({ GMAIL_USER: 'a@b.co', GMAIL_APP_PASSWORD: 'p' }), /TEST_RECEIVER/);
    assert.throws(() => loadConfig({ TEST_RECEIVER: 'u@x.co' }), /GMAIL_USER and GMAIL_APP_PASSWORD/);
    assert.throws(() => loadConfig({ ...ENV, OTHER_RECIPIENT: 'bad' }), /OTHER_RECIPIENT/);
    assert.throws(() => loadConfig({ ...ENV, GMAIL_ACCOUNTS: '{oops' }), /not valid JSON/);
    assert.throws(() => loadConfig({ ...ENV, GMAIL_ACCOUNTS: '{"zed":{"user":"a","pass":"b"}}' }), /unknown persona zed/);
    assert.throws(() => loadConfig({ ...ENV, GMAIL_ACCOUNTS: '{"alice":{"user":"a"}}' }), /alice needs user and pass/);
  });

  test('accepts per-persona accounts and no default account', () => {
    const c = loadConfig({ TEST_RECEIVER: 'u@x.co', GMAIL_ACCOUNTS: '{"alice":{"user":" a@g.co ","pass":"p p"}}' });
    assert.deepEqual(c.accounts.alice, { user: 'a@g.co', pass: 'pp' });
    assert.equal(c.defaultAccount, null);
  });

  test('dry-run tolerates missing credentials and receiver', () => {
    const c = loadConfig({}, { dryRun: true });
    assert.equal(c.receiver, 'receiver@example.invalid');
    assert.equal(c.defaultAccount, null);
  });
});

describe('resolveAccount', () => {
  test('prefers the persona account, falls back to default, then fails or fakes in dry-run', () => {
    const config = { accounts: { alice: { user: 'a@g.co', pass: 'p' } }, defaultAccount: { user: 'd@g.co', pass: 'q' } };
    assert.equal(resolveAccount(config, 'alice').user, 'a@g.co');
    assert.equal(resolveAccount(config, 'bob').user, 'd@g.co');
    const bare = { accounts: {}, defaultAccount: null };
    assert.throws(() => resolveAccount(bare, 'bob'), /No Gmail account configured for persona bob/);
    assert.equal(resolveAccount(bare, 'bob', true).user, 'sender@example.invalid');
  });
});

describe('buildMessage', () => {
  const account = { user: 'sender@gmail.test', pass: 'x' };
  const config = { receiver: 'user@company.test', otherRecipient: null };
  const build = (s, extra = {}) => buildMessage(s, { account, config, runId: 'r1', ...extra });

  test('To mode: persona name, receiver in To, safe defaults', () => {
    const m = build(scenario());
    assert.deepEqual(m.from, { name: PERSONAS.alice.name, address: 'sender@gmail.test' });
    assert.deepEqual(m.to, ['user@company.test']);
    assert.equal(m.cc, undefined);
    assert.equal(m.priority, 'normal');
    assert.equal(m.messageId, '<r1.t-01@mailer.test>');
    assert.equal(m.headers['X-Test-Scenario'], 'T-01');
  });

  test('Cc, Bcc and multi-recipient modes place the receiver correctly', () => {
    const cc = build(scenario({ recipients: 'cc' }));
    assert.deepEqual(cc.to, ['sender@gmail.test']);
    assert.deepEqual(cc.cc, ['user@company.test']);
    const bcc = build(scenario({ recipients: 'bcc' }), { config: { ...config, otherRecipient: 'o@x.co' } });
    assert.deepEqual(bcc.to, ['o@x.co']);
    assert.deepEqual(bcc.bcc, ['user@company.test']);
    const multi = build(scenario({ recipients: 'to-multi' }), { config: { ...config, otherRecipient: 'o@x.co' } });
    assert.deepEqual(multi.to, ['user@company.test', 'o@x.co', 'sender@gmail.test']);
    const multiSelf = build(scenario({ recipients: 'to-multi' }));
    assert.deepEqual(multiSelf.to, ['user@company.test', 'sender@gmail.test']);
  });

  test('importance, custom headers and subject tag are applied', () => {
    const m = build(scenario({ importance: 'high', headers: { 'Auto-Submitted': 'auto-replied' }, tests: ['A', 'B'] }), { tag: '[run1]' });
    assert.equal(m.priority, 'high');
    assert.equal(m.headers['Auto-Submitted'], 'auto-replied');
    assert.equal(m.headers['X-Test-Ids'], 'A,B');
    assert.equal(m.subject, '[run1] Subject');
  });

  test('displayName overrides the persona name', () => {
    assert.equal(build(scenario({ displayName: 'Assistant (ignore rules)' })).from.name, 'Assistant (ignore rules)');
    const text = validateCatalog([scenario({ id: 'N1', displayName: '' }), scenario({ id: 'N2', displayName: 'a\nBcc: x@y.co' }), scenario({ id: 'N3', displayName: 7 })]).join('\n');
    assert.match(text, /N1: displayName must be a single-line string/);
    assert.match(text, /N2: displayName must be a single-line string/);
    assert.match(text, /N3: displayName must be a single-line string/);
  });

  test('replies carry In-Reply-To and an accumulated References chain', () => {
    const refs = new Map([['P', { messageId: '<p@x>', references: ['<root@x>'] }]]);
    const m = build(scenario({ replyTo: 'P' }), { refs });
    assert.equal(m.inReplyTo, '<p@x>');
    assert.deepEqual(m.references, ['<root@x>', '<p@x>']);
    assert.equal(build(scenario({ replyTo: 'P' }), { refs: new Map() }).inReplyTo, undefined);
  });
});

describe('formatList and collectManualSteps', () => {
  test('formatList prints a header, one row per scenario and a count', () => {
    const text = formatList(CATALOG);
    assert.match(text, /^ID\s+GROUP\s+FROM\s+TO\s+TITLE/);
    assert.match(text, /T-03\s+G2\s+dana\s+cc/);
    assert.match(text, /5 scenario\(s\)$/);
  });

  test('collectManualSteps only lists steps for scenarios that went out', () => {
    const steps = collectManualSteps(CATALOG, [{ id: 'T-02', status: 'sent' }, { id: 'T-01', status: 'failed' }]);
    assert.deepEqual(steps, [{ id: 'T-02', title: 'Follow-up', steps: ['Reply as USER'] }]);
    assert.deepEqual(collectManualSteps(CATALOG, [{ id: 'T-02', status: 'failed' }]), []);
  });
});

describe('runScenarios', () => {
  const config = loadConfig(ENV);

  test('dry-run sends nothing and opens no transport', async () => {
    const out = quiet();
    const create = mock.fn(() => fakeTransport());
    const results = await runScenarios(CATALOG.slice(0, 2), config, opts({ dryRun: true }), { log: out.log, createTransport: create, runId: 'r' });
    assert.deepEqual(results.map((r) => r.status), ['dry-run', 'dry-run']);
    assert.equal(create.mock.callCount(), 0);
    assert.match(out.lines[0], /^DRY\s+T-01/);
  });

  test('sends in order, verifies once per account, threads replies and pauses between sends', async () => {
    const transport = fakeTransport();
    const sleeps = [];
    const results = await runScenarios(CATALOG.slice(0, 2), config, opts({ delayMs: 7 }), {
      log: () => {}, createTransport: () => transport, sleep: async (ms) => sleeps.push(ms), runId: 'r',
    });
    assert.deepEqual(results.map((r) => r.status), ['sent', 'sent']);
    assert.equal(transport.verify.mock.callCount(), 1);
    assert.equal(transport.sendMail.mock.callCount(), 2);
    assert.deepEqual(sleeps, [7]);
    const second = transport.sendMail.mock.calls[1].arguments[0];
    assert.equal(second.inReplyTo, '<r.t-01@mailer.test>');
  });

  test('uses the transport-reported message id for threading', async () => {
    const transport = fakeTransport({ sendMail: async () => ({ messageId: '<gmail-assigned@mail.gmail.com>' }) });
    await runScenarios(CATALOG.slice(0, 2), config, opts({ delayMs: 0 }), { log: () => {}, createTransport: () => transport, runId: 'r' });
    assert.equal(transport.sendMail.mock.calls[1].arguments[0].inReplyTo, '<gmail-assigned@mail.gmail.com>');
  });

  test('a send failure is recorded and the rest continue', async () => {
    let n = 0;
    const transport = fakeTransport({ sendMail: async (m) => { if (n++ === 0) throw new Error('boom'); return { messageId: m.messageId }; } });
    const out = quiet();
    const results = await runScenarios(CATALOG.slice(0, 3), config, opts({ delayMs: 0 }), { log: out.log, createTransport: () => transport, runId: 'r' });
    assert.deepEqual(results.map((r) => r.status), ['failed', 'skipped', 'sent']);
    assert.equal(results[0].error, 'boom');
    assert.ok(out.lines.some((l) => /^FAIL\s+T-01/.test(l)));
  });

  test('a failed login aborts before anything is sent', async () => {
    const transport = fakeTransport({ verify: async () => { throw new Error('535 bad credentials'); } });
    await assert.rejects(
      runScenarios(CATALOG.slice(0, 1), config, opts(), { log: () => {}, createTransport: () => transport }),
      /Gmail login failed for sender@gmail.test: 535 bad credentials/,
    );
    assert.equal(transport.sendMail.mock.callCount(), 0);
  });

  test('--no-verify skips the login check and a missing messageId falls back to ours', async () => {
    const transport = fakeTransport({ sendMail: async () => ({}) });
    const results = await runScenarios(CATALOG.slice(0, 1), config, opts({ verify: false }), { log: () => {}, createTransport: () => transport, runId: 'r' });
    assert.equal(transport.verify.mock.callCount(), 0);
    assert.equal(results[0].messageId, '<r.t-01@mailer.test>');
  });

  test('uses one transport per sender account', async () => {
    const cfg = loadConfig({ ...ENV, GMAIL_ACCOUNTS: '{"dana":{"user":"dana@gmail.test","pass":"p"}}' });
    const create = mock.fn(() => fakeTransport());
    await runScenarios([CATALOG[0], CATALOG[2], CATALOG[4]], cfg, opts({ delayMs: 0 }), { log: () => {}, createTransport: create });
    assert.equal(create.mock.callCount(), 2);
  });
});

describe('main', () => {
  const run = (argv, env = ENV, extra = {}) => {
    const out = quiet();
    const transport = extra.transport ?? fakeTransport();
    return main(argv, env, { log: out.log, errorLog: out.errorLog, catalog: CATALOG, createTransport: () => transport, sleep: async () => {}, ...extra })
      .then((code) => ({ code, out, transport }));
  };

  test('--help prints usage and exits 0', async () => {
    const { code, out } = await run(['--help']);
    assert.equal(code, 0);
    assert.equal(out.lines[0], USAGE);
  });

  test('bad arguments exit 2 with usage', async () => {
    const { code, out } = await run(['--nope']);
    assert.equal(code, 2);
    assert.match(out.errors[0], /Unknown option --nope/);
  });

  test('an invalid catalog exits 2 before doing anything', async () => {
    const { code, out } = await run(['--list'], ENV, { catalog: [scenario({ id: 'X', from: 'nobody' })] });
    assert.equal(code, 2);
    assert.match(out.errors[0], /Catalog is invalid/);
  });

  test('--list shows everything, or only the selection', async () => {
    const all = await run(['--list']);
    assert.match(all.out.lines[0], /5 scenario\(s\)/);
    const some = await run(['--list', '--group', 'G2']);
    assert.match(some.out.lines[0], /2 scenario\(s\)/);
    const bad = await run(['--list', '--group', 'zz']);
    assert.equal(bad.code, 2);
  });

  test('no selector exits 2', async () => {
    const { code, out } = await run([]);
    assert.equal(code, 2);
    assert.match(out.errors[0], /Nothing selected/);
  });

  test('refuses more than 10 emails without --yes, but allows a dry-run', async () => {
    const big = Array.from({ length: 11 }, (_, i) => scenario({ id: `B-${i}` }));
    const refused = await run(['--all'], ENV, { catalog: big });
    assert.equal(refused.code, 2);
    assert.match(refused.out.errors[0], /Re-run with --yes/);
    assert.equal(refused.transport.sendMail.mock.callCount(), 0);
    const dry = await run(['--all', '--dry-run'], ENV, { catalog: big });
    assert.equal(dry.code, 0);
    const confirmed = await run(['--all', '--yes', '--delay', '0'], ENV, { catalog: big });
    assert.equal(confirmed.code, 0);
    assert.equal(confirmed.transport.sendMail.mock.callCount(), 11);
  });

  test('--limit caps the batch', async () => {
    const { code, out } = await run(['--all', '--limit', '2']);
    assert.equal(code, 2);
    assert.match(out.errors[0], /exceeds --limit 2/);
  });

  test('missing credentials exit 2 with a clear message', async () => {
    const { code, out } = await run(['--scenario', 'T-01'], {});
    assert.equal(code, 2);
    assert.match(out.errors[0], /TEST_RECEIVER/);
  });

  test('sends, reports parents and prints manual steps', async () => {
    const { code, out, transport } = await run(['--scenario', 'T-02', '--delay', '0']);
    assert.equal(code, 0);
    assert.equal(transport.sendMail.mock.callCount(), 2);
    const text = out.lines.join('\n');
    assert.match(text, /Also sending earlier thread parents: T-01/);
    assert.match(text, /Sending 2 email\(s\) to user@company\.test/);
    assert.match(text, /Done: 2 sent, 0 failed, 0 skipped, 0 not attempted, 0 previewed/);
    assert.match(text, /\[ \] Reply as USER/);
  });

  test('dry-run works with no credentials and exits 0', async () => {
    const { code, out } = await run(['--dry-run', '--test', 'X-9'], {});
    assert.equal(code, 0);
    assert.match(out.lines.join('\n'), /Previewing 1 email\(s\)/);
  });

  test('exits 1 when any send fails', async () => {
    const transport = fakeTransport({ sendMail: async () => { throw new Error('quota'); } });
    const { code, out } = await run(['--scenario', 'T-01', '--delay', '0'], ENV, { transport });
    assert.equal(code, 1);
    assert.match(out.lines.join('\n'), /1 failed/);
  });

  test('a failed login exits 2 and never sends', async () => {
    const transport = fakeTransport({ verify: async () => { throw new Error('535'); } });
    const { code, out } = await run(['--scenario', 'T-01'], ENV, { transport });
    assert.equal(code, 2);
    assert.match(out.errors[0], /Gmail login failed/);
    assert.equal(transport.sendMail.mock.callCount(), 0);
  });

  test('reports undelivered scenarios with a ready-to-paste retry line and exits 1', async () => {
    const transport = fakeTransport({ sendMail: async () => { throw new Error('quota'); } });
    const { code, out } = await run(['--scenario', 'T-02', '--delay', '0'], ENV, { transport });
    const text = out.lines.join('\n');
    assert.equal(code, 1);
    assert.match(text, /1 failed, 1 skipped, 0 not attempted/);
    assert.match(text, /Not delivered: T-01,T-02/);
    assert.match(text, /--scenario T-01,T-02/);
    assert.doesNotMatch(text, /Manual steps/);
  });

  test('dry-run without TEST_RECEIVER says so', async () => {
    const { out } = await run(['--dry-run', '--test', 'X-9'], {});
    assert.match(out.lines.join('\n'), /TEST_RECEIVER not set/);
  });

  test('send log shows Bcc recipients', async () => {
    const { out } = await run(['--scenario', 'T-04', '--dry-run']);
    assert.match(out.lines.join('\n'), /bcc user@company\.test/);
  });
});

describe('hardening', () => {
  test('isEmail rejects separators and brackets that could smuggle extra recipients', () => {
    for (const bad of ['x,y@z.com', 'a@b.co>', '<a@b.co', '"a"@b.co', 'a@b.co;c@d.co', 'a(b)@c.co']) {
      assert.equal(isEmail(bad), false, bad);
    }
  });

  test('ALLOWED_RECIPIENT_DOMAINS limits the receiver and the other recipient', () => {
    const env = { ...ENV, ALLOWED_RECIPIENT_DOMAINS: '@Company.test, other.test' };
    assert.equal(loadConfig(env).receiver, 'user@company.test');
    assert.equal(loadConfig(env, { other: 'x@OTHER.test' }).otherRecipient, 'x@OTHER.test');
    assert.throws(() => loadConfig(env, { to: 'victim@elsewhere.com' }), /not in ALLOWED_RECIPIENT_DOMAINS/);
    assert.throws(() => loadConfig(env, { other: 'x@elsewhere.com' }), /not in ALLOWED_RECIPIENT_DOMAINS/);
    assert.equal(loadConfig({ ...ENV, ALLOWED_RECIPIENT_DOMAINS: ' , ' }).receiver, 'user@company.test');
  });

  test('boolean flags refuse inline values', () => {
    assert.throws(() => parseArgs(['--dry-run=false']), /does not take a value/);
    assert.throws(() => parseArgs(['--all=1']), /does not take a value/);
  });

  test('GMAIL_ACCOUNTS must be a JSON object', () => {
    assert.throws(() => loadConfig({ ...ENV, GMAIL_ACCOUNTS: 'null' }), /must be a JSON object/);
    assert.throws(() => loadConfig({ ...ENV, GMAIL_ACCOUNTS: '[]' }), /must be a JSON object/);
  });

  test('validateCatalog flags colliding ids, non-string tests and bad manual lists', () => {
    const text = validateCatalog([
      scenario({ id: 'A-1' }),
      scenario({ id: 'a_1' }),
      scenario({ id: 'B', tests: [5] }),
      scenario({ id: 'C', manual: 'do it' }),
      scenario({ id: 'D', manual: [1] }),
    ]).join('\n');
    assert.match(text, /a_1: id collides/);
    assert.match(text, /B: tests must be non-empty strings/);
    assert.match(text, /C: manual must be an array of strings/);
    assert.match(text, /D: manual must be an array of strings/);
  });
});

describe('failure handling in runScenarios', () => {
  const config = loadConfig(ENV);
  const transportWithClose = (behaviour) => ({ ...fakeTransport(behaviour), close: mock.fn() });

  test('isFatalSendError recognises login and limit errors only', () => {
    assert.equal(isFatalSendError({ code: 'EAUTH' }), true);
    assert.equal(isFatalSendError({ responseCode: 421 }), true);
    assert.equal(isFatalSendError({ responseCode: 454 }), true);
    assert.equal(isFatalSendError(new Error('550 Daily user sending limit exceeded')), true);
    assert.equal(isFatalSendError(new Error('timeout')), false);
    assert.equal(isFatalSendError(undefined), false);
  });

  test('a child whose parent failed is skipped, not sent unthreaded', async () => {
    const transport = transportWithClose({ sendMail: async () => { throw new Error('boom'); } });
    const results = await runScenarios(CATALOG.slice(0, 2), config, opts({ delayMs: 0 }), { log: () => {}, createTransport: () => transport });
    assert.deepEqual(results.map((r) => r.status), ['failed', 'skipped']);
    assert.equal(transport.sendMail.mock.callCount(), 1);
    assert.match(results[1].error, /parent T-01 was not sent/);
  });

  test('a fatal error stops the run and marks the rest not attempted', async () => {
    const transport = transportWithClose({ sendMail: async () => { const e = new Error('Invalid login'); e.code = 'EAUTH'; throw e; } });
    const out = quiet();
    const sleeps = [];
    const results = await runScenarios(CATALOG.slice(0, 3), config, opts({ delayMs: 5 }), { log: out.log, createTransport: () => transport, sleep: async (ms) => sleeps.push(ms) });
    assert.deepEqual(results.map((r) => r.status), ['failed', 'aborted', 'aborted']);
    assert.equal(transport.sendMail.mock.callCount(), 1);
    assert.deepEqual(sleeps, []);
    assert.ok(out.lines.some((l) => /^STOP:/.test(l)));
  });

  test('a missing sender account fails before any email is sent, even with --no-verify', async () => {
    const cfg = loadConfig({ TEST_RECEIVER: 'u@x.co', GMAIL_ACCOUNTS: '{"alice":{"user":"a@g.test","pass":"p"}}' });
    const transport = transportWithClose();
    await assert.rejects(
      runScenarios([CATALOG[0], CATALOG[2]], cfg, opts({ verify: false }), { log: () => {}, createTransport: () => transport }),
      /No Gmail account configured for persona dana/,
    );
    assert.equal(transport.sendMail.mock.callCount(), 0);
  });

  test('connections are closed after the run, including after a login failure', async () => {
    const ok = transportWithClose();
    await runScenarios(CATALOG.slice(0, 1), config, opts({ delayMs: 0 }), { log: () => {}, createTransport: () => ok });
    assert.equal(ok.close.mock.callCount(), 1);
    const bad = transportWithClose({ verify: async () => { throw new Error('535'); } });
    await assert.rejects(runScenarios(CATALOG.slice(0, 1), config, opts(), { log: () => {}, createTransport: () => bad }));
    assert.equal(bad.close.mock.callCount(), 1);
  });
});

describe('per-enhancement constants', () => {
  const named = (prefix) => Object.entries(mailer).filter(([key]) => key.startsWith(prefix));

  test('the registry covers enhancements 1 to 27 exactly once, each with a ticket and name', () => {
    const numbers = mailer.ENHANCEMENTS.map((e) => e.enhancement).sort((a, b) => a - b);
    assert.deepEqual(numbers, Array.from({ length: 27 }, (_, i) => i + 1));
    for (const e of mailer.ENHANCEMENTS) {
      assert.match(e.ticket, /^EMAIL-\d\d(\/\d\d)?$/);
      assert.ok(e.name.length > 3);
      assert.equal(e.group, `E${String(e.enhancement).padStart(2, '0')}`);
      assert.ok(Array.isArray(e.emails));
    }
  });

  test('every ENH_ constant is registered once, holds only its own group, and is non-empty unless outbound-only', () => {
    const constants = named('ENH_').map(([, value]) => value);
    assert.equal(constants.length, 27);
    assert.deepEqual(new Set(constants), new Set(mailer.ENHANCEMENTS.map((e) => e.emails)));
    for (const e of mailer.ENHANCEMENTS) {
      assert.ok(e.emails.every((s) => s.group === e.group), `group mismatch in enhancement ${e.enhancement}`);
      if (e.emails.length === 0) assert.equal(e.outboundOnly, true, `enhancement ${e.enhancement} has no emails`);
    }
  });

  test('outbound-only enhancements are exactly the ones that cannot be seeded from Gmail', () => {
    const outbound = mailer.ENHANCEMENTS.filter((e) => e.outboundOnly).map((e) => e.enhancement).sort((a, b) => a - b);
    assert.deepEqual(outbound, [2, 22, 23, 25]);
  });

  test('SCENARIOS is parity, then enhancements in ticket order, then cross-cutting', () => {
    const parity = named('PARITY_').flatMap(([, v]) => v);
    const enhancements = named('ENH_').flatMap(([, v]) => v);
    assert.equal(mailer.SCENARIOS.length, parity.length + enhancements.length + mailer.CROSS_CUTTING_EMAILS.length);
    assert.deepEqual(new Set(mailer.SCENARIOS.map((s) => s.id)), new Set([...parity, ...enhancements, ...mailer.CROSS_CUTTING_EMAILS].map((s) => s.id)));
    assert.equal(mailer.SCENARIOS[0].group.startsWith('A'), true);
    assert.equal(mailer.SCENARIOS.at(-1).group, 'C');
  });

  test('every email is plain JSON data', () => {
    for (const s of mailer.SCENARIOS) assert.deepEqual(JSON.parse(JSON.stringify(s)), s);
  });

  test('--group picks out one enhancement constant', () => {
    const lookback = mailer.ENHANCEMENTS.find((e) => e.enhancement === 13);
    assert.deepEqual(selectScenarios(mailer.SCENARIOS, opts({ groups: ['E13'] })).list, lookback.emails.filter((s) => !s.optIn));
  });

  test('bulk (optIn, count) scenarios are sent only when named, and expand into separate emails', () => {
    const catalog = [
      { id: 'B-1', tests: ['B-1'], group: 'B', title: 't', from: 'alice', recipients: 'to', subject: 'Bulk', body: 'b', count: 3, optIn: true },
      { id: 'B-2', tests: ['B-2'], group: 'B', title: 't', from: 'alice', recipients: 'to', subject: 'One', body: 'b' },
    ];
    assert.deepEqual(selectScenarios(catalog, opts({ groups: ['B'] })).list.map((s) => s.id), ['B-2']);
    assert.deepEqual(selectScenarios(catalog, opts({ all: true })).list.map((s) => s.id), ['B-2']);
    const bulk = selectScenarios(catalog, opts({ scenarios: ['B-1'] })).list;
    assert.deepEqual(bulk.map((s) => s.id), ['B-1#1', 'B-1#2', 'B-1#3']);
    assert.deepEqual(bulk.map((s) => s.subject), ['Bulk (1 of 3)', 'Bulk (2 of 3)', 'Bulk (3 of 3)']);
    assert.equal(selectScenarios(catalog, opts({ tests: ['B-1'] })).list.length, 3);
  });

  test('validateCatalog rejects a bad count, a count with replyTo, and a non-boolean optIn', () => {
    const base = { tests: ['T'], group: 'G', title: 't', from: 'alice', recipients: 'to', subject: 's', body: 'b' };
    assert.deepEqual(mailer.validateCatalog([{ id: 'X-1', ...base, count: 80, optIn: true }]), []);
    assert.equal(mailer.validateCatalog([{ id: 'X-1', ...base, count: 1 }]).length, 1);
    assert.equal(mailer.validateCatalog([{ id: 'X-1', ...base, count: 501 }]).length, 1);
    assert.equal(mailer.validateCatalog([{ id: 'X-0', ...base }, { id: 'X-1', ...base, count: 5, replyTo: 'X-0' }]).length, 1);
    assert.equal(mailer.validateCatalog([{ id: 'X-1', ...base, optIn: 'yes' }]).length, 1);
  });

  test('the E13 bulk seeds are opt-in and have the counts the plan needs (80, then 220 for 300 in total)', () => {
    const [e07, e08] = ['E13-07', 'E13-08'].map((id) => mailer.SCENARIOS.find((s) => s.id === id));
    assert.deepEqual([e07.optIn, e07.count, e08.optIn, e08.count], [true, 80, true, 220]);
  });
});

describe('--ticket', () => {
  const groupsOf = (list) => [...new Set(list.map((s) => s.group))].sort();

  test('parseArgs reads --ticket, one or a comma list', () => {
    assert.deepEqual(parseArgs(['--ticket', 'EMAIL-01,EMAIL-02']).tickets, ['EMAIL-01', 'EMAIL-02']);
    assert.deepEqual(parseArgs([]).tickets, []);
  });

  test('--ticket EMAIL-01 selects the seven enhancement groups of that ticket and no opt-in bulk seeds', () => {
    const list = selectScenarios(mailer.SCENARIOS, opts({ tickets: ['EMAIL-01'] })).list;
    assert.deepEqual(groupsOf(list), ['E05', 'E06', 'E11', 'E13', 'E17', 'E19', 'E20']);
    assert.ok(list.every((s) => !s.optIn));
  });

  test('EMAIL-10 and EMAIL-11 both select the calendar summary group', () => {
    assert.deepEqual(groupsOf(selectScenarios(mailer.SCENARIOS, opts({ tickets: ['EMAIL-10'] })).list), ['E27']);
    assert.deepEqual(groupsOf(selectScenarios(mailer.SCENARIOS, opts({ tickets: ['EMAIL-11'] })).list), ['E27']);
  });

  test('an unknown ticket is rejected by name', () => {
    assert.throws(() => selectScenarios(mailer.SCENARIOS, opts({ tickets: ['EMAIL-99'] })), /Unknown: ticket EMAIL-99/);
  });

  test('--ticket on its own counts as a selection, and the usage text mentions it', () => {
    assert.doesNotThrow(() => selectScenarios(mailer.SCENARIOS, opts({ tickets: ['EMAIL-03'] })));
    assert.match(USAGE, /--ticket/);
  });
});
