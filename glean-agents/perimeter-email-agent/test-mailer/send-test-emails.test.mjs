import { test, describe, mock } from 'node:test';
import assert from 'node:assert/strict';
import * as mailer from './send-test-emails.mjs';
import {
  PERSONAS, SCENARIOS, USAGE, isEmail, validateCatalog, parseArgs, selectScenarios, loadConfig,
  resolveAccount, buildMessage, buildTransportOptions, noReplyWarnings, formatList, formatChecklist, collectManualSteps, runScenarios, main, isFatalSendError,
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

const ENV = { TEST_RECEIVER: 'user@company.test', SMTP_USER: 'login@smtp.test', SMTP_PASS: 'smtp-key-123', SMTP_FROM: 'sender@company.test' };
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

  test('--run-id is read, and is null by default', () => {
    assert.equal(parseArgs(['--run-id', 'r2a']).runId, 'r2a');
    assert.equal(parseArgs([]).runId, null);
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

  test('--no-parents sends only what is named, for a follow-up that replies into an earlier send', () => {
    assert.equal(parseArgs(['--no-parents']).noParents, true);
    assert.equal(parseArgs([]).noParents, false);
    const r = selectScenarios(CATALOG, opts({ scenarios: ['T-02'], noParents: true }));
    assert.deepEqual(r.list.map((s) => s.id), ['T-02']);
    assert.deepEqual(r.addedDependencies, []);
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
  test('reads receiver, default account (login, key, verified sender) and the Brevo relay defaults', () => {
    const c = loadConfig(ENV);
    assert.equal(c.receiver, 'user@company.test');
    assert.deepEqual(c.defaultAccount, { user: 'login@smtp.test', pass: 'smtp-key-123', from: 'sender@company.test' });
    assert.deepEqual(c.smtp, { host: 'smtp-relay.brevo.com', port: 587, secure: false });
    assert.equal(c.otherRecipient, null);
  });

  test('SMTP_HOST, SMTP_PORT and SMTP_SECURE override the relay; port 465 means a secure connection unless told otherwise', () => {
    assert.deepEqual(loadConfig({ ...ENV, SMTP_HOST: 'smtp.example.test', SMTP_PORT: '2525' }).smtp, { host: 'smtp.example.test', port: 2525, secure: false });
    assert.equal(loadConfig({ ...ENV, SMTP_PORT: '465' }).smtp.secure, true);
    assert.equal(loadConfig({ ...ENV, SMTP_PORT: '465', SMTP_SECURE: 'false' }).smtp.secure, false);
    assert.equal(loadConfig({ ...ENV, SMTP_SECURE: 'true' }).smtp.secure, true);
  });

  test('a bad SMTP_PORT or SMTP_SECURE is rejected by name', () => {
    assert.throws(() => loadConfig({ ...ENV, SMTP_PORT: 'abc' }), /SMTP_PORT/);
    assert.throws(() => loadConfig({ ...ENV, SMTP_PORT: '70000' }), /SMTP_PORT/);
    assert.throws(() => loadConfig({ ...ENV, SMTP_SECURE: 'maybe' }), /SMTP_SECURE/);
  });

  test('--to and --other override the environment', () => {
    const c = loadConfig({ ...ENV, OTHER_RECIPIENT: 'env@x.co' }, { to: 'cli@x.co', other: 'cli-other@x.co' });
    assert.equal(c.receiver, 'cli@x.co');
    assert.equal(c.otherRecipient, 'cli-other@x.co');
    assert.equal(loadConfig({ ...ENV, OTHER_RECIPIENT: 'env@x.co' }).otherRecipient, 'env@x.co');
  });

  test('fails clearly when settings are missing or malformed', () => {
    assert.throws(() => loadConfig({ SMTP_USER: 'a', SMTP_PASS: 'p', SMTP_FROM: 'a@b.co' }), /TEST_RECEIVER/);
    assert.throws(() => loadConfig({ TEST_RECEIVER: 'u@x.co' }), /SMTP_USER, SMTP_PASS and SMTP_FROM/);
    assert.throws(() => loadConfig({ ...ENV, OTHER_RECIPIENT: 'bad' }), /OTHER_RECIPIENT/);
    assert.throws(() => loadConfig({ ...ENV, SMTP_ACCOUNTS: '{oops' }), /not valid JSON/);
    assert.throws(() => loadConfig({ ...ENV, SMTP_ACCOUNTS: '{"zed":{"from":"z@x.co"}}' }), /unknown persona zed/);
    assert.throws(() => loadConfig({ ...ENV, SMTP_ACCOUNTS: '{"alice":{"user":"a","pass":"b"}}' }), /alice needs from/);
  });

  test('the Brevo login is not a sender: SMTP_FROM is required and must be an email address', () => {
    assert.throws(() => loadConfig({ TEST_RECEIVER: 'u@x.co', SMTP_USER: 'login@smtp.test', SMTP_PASS: 'k' }), /SMTP_FROM/);
    assert.throws(() => loadConfig({ ...ENV, SMTP_FROM: 'not an address' }), /SMTP_FROM/);
  });

  test('accepts per-persona accounts and no default account', () => {
    const c = loadConfig({ TEST_RECEIVER: 'u@x.co', SMTP_ACCOUNTS: '{"alice":{"user":" a@g.co ","pass":"pp","from":" a@verified.co "}}' });
    assert.deepEqual(c.accounts.alice, { user: 'a@g.co', pass: 'pp', from: 'a@verified.co' });
    assert.equal(c.defaultAccount, null);
  });

  test('a persona without its own login or key shares the default one and only changes the sender', () => {
    const c = loadConfig({ ...ENV, SMTP_ACCOUNTS: '{"alice":{"from":"alice@company.test"}}' });
    assert.deepEqual(c.accounts.alice, { user: 'login@smtp.test', pass: 'smtp-key-123', from: 'alice@company.test' });
    assert.throws(() => loadConfig({ TEST_RECEIVER: 'u@x.co', SMTP_ACCOUNTS: '{"alice":{"from":"a@x.co"}}' }), /alice needs user and pass/);
  });

  test('dry-run tolerates missing credentials and receiver', () => {
    const c = loadConfig({}, { dryRun: true });
    assert.equal(c.receiver, 'receiver@example.invalid');
    assert.equal(c.defaultAccount, null);
  });
});

describe('resolveAccount', () => {
  test('prefers the persona account, falls back to default, then fails or fakes in dry-run', () => {
    const config = { accounts: { alice: { user: 'a@g.co', pass: 'p', from: 'a@v.co' } }, defaultAccount: { user: 'd@g.co', pass: 'q', from: 'd@v.co' } };
    assert.equal(resolveAccount(config, 'alice').user, 'a@g.co');
    assert.equal(resolveAccount(config, 'bob').user, 'd@g.co');
    const bare = { accounts: {}, defaultAccount: null };
    assert.throws(() => resolveAccount(bare, 'bob'), /No SMTP account configured for persona bob/);
    assert.equal(resolveAccount(bare, 'bob', true).from, 'sender@example.invalid');
  });
});

describe('buildMessage', () => {
  const account = { user: 'login@smtp.test', pass: 'x', from: 'sender@company.test' };
  const config = { receiver: 'user@company.test', otherRecipient: null };
  const build = (s, extra = {}) => buildMessage(s, { account, config, runId: 'r1', ...extra });

  test('a human persona carries a yopmail Reply-To, so an Outlook reply never leaves yopmail; system senders carry none', () => {
    assert.equal(build(scenario({ from: 'alice' })).replyTo, 'alice.morgan.test@yopmail.com');
    assert.equal(build(scenario({ from: 'dana' })).replyTo, 'dana.whitfield.test@yopmail.com');
    for (const key of ['alice', 'bob', 'carol', 'dana']) assert.match(PERSONAS[key].replyTo, /@yopmail\.com$/);
    for (const key of ['system', 'newsletter', 'vendor']) assert.equal(build(scenario({ from: key })).replyTo, undefined);
  });

  test('To mode: persona name, receiver in To, safe defaults', () => {
    const m = build(scenario());
    assert.deepEqual(m.from, { name: PERSONAS.alice.name, address: 'sender@company.test' });
    assert.notEqual(m.from.address, account.user, 'the SMTP login must never be used as the From address');
    assert.deepEqual(m.to, ['user@company.test']);
    assert.equal(m.cc, undefined);
    assert.equal(m.priority, 'normal');
    assert.equal(m.messageId, '<r1.t-01@mailer.test>');
    assert.equal(m.headers['X-Test-Scenario'], 'T-01');
  });

  test('Cc, Bcc and multi-recipient modes place the receiver correctly', () => {
    const cc = build(scenario({ recipients: 'cc' }));
    assert.deepEqual(cc.to, ['sender@company.test']);
    assert.deepEqual(cc.cc, ['user@company.test']);
    const bcc = build(scenario({ recipients: 'bcc' }), { config: { ...config, otherRecipient: 'o@x.co' } });
    assert.deepEqual(bcc.to, ['o@x.co']);
    assert.deepEqual(bcc.bcc, ['user@company.test']);
    const multi = build(scenario({ recipients: 'to-multi' }), { config: { ...config, otherRecipient: 'o@x.co' } });
    assert.deepEqual(multi.to, ['user@company.test', 'o@x.co', 'sender@company.test']);
    const multiSelf = build(scenario({ recipients: 'to-multi' }));
    assert.deepEqual(multiSelf.to, ['user@company.test', 'sender@company.test']);
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

  test('--run-id fixes the Message-ID prefix, so a later run can thread onto an earlier send', async () => {
    const transport = fakeTransport();
    await runScenarios(CATALOG.slice(0, 1), config, opts({ delayMs: 0, runId: 'fixed1' }), { log: () => {}, createTransport: () => transport });
    assert.match(transport.sendMail.mock.calls[0].arguments[0].messageId, /^<fixed1\./);
  });

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
    const transport = fakeTransport({ sendMail: async () => ({ messageId: '<smtp-assigned@relay.test>' }) });
    await runScenarios(CATALOG.slice(0, 2), config, opts({ delayMs: 0 }), { log: () => {}, createTransport: () => transport, runId: 'r' });
    assert.equal(transport.sendMail.mock.calls[1].arguments[0].inReplyTo, '<smtp-assigned@relay.test>');
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
      /SMTP login failed for login@smtp.test: 535 bad credentials/,
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
    const cfg = loadConfig({ ...ENV, SMTP_ACCOUNTS: '{"dana":{"user":"dana-login@smtp.test","pass":"p","from":"dana@company.test"}}' });
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
    assert.match(out.errors[0], /SMTP login failed/);
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

  test('SMTP_ACCOUNTS must be a JSON object', () => {
    assert.throws(() => loadConfig({ ...ENV, SMTP_ACCOUNTS: 'null' }), /must be a JSON object/);
    assert.throws(() => loadConfig({ ...ENV, SMTP_ACCOUNTS: '[]' }), /must be a JSON object/);
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
    const cfg = loadConfig({ TEST_RECEIVER: 'u@x.co', SMTP_ACCOUNTS: '{"alice":{"user":"a@g.test","pass":"p","from":"a@company.test"}}' });
    const transport = transportWithClose();
    await assert.rejects(
      runScenarios([CATALOG[0], CATALOG[2]], cfg, opts({ verify: false }), { log: () => {}, createTransport: () => transport }),
      /No SMTP account configured for persona dana/,
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

  test('outbound-only enhancements are exactly the ones that cannot be seeded from SMTP', () => {
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

  test('{n} in a bulk body becomes the email number, so the bodies differ and do not look like one blast', () => {
    const catalog = [{ id: 'B-9', tests: ['B-9'], group: 'B', title: 't', from: 'alice', recipients: 'to', subject: 'Bulk', body: 'Please send sheet {n}.', count: 3, optIn: true }];
    const bulk = selectScenarios(catalog, opts({ scenarios: ['B-9'] })).list;
    assert.deepEqual(bulk.map((s) => s.body), ['Please send sheet 1.', 'Please send sheet 2.', 'Please send sheet 3.']);
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

describe('SMTP transport (Brevo relay)', () => {
  const smtp = { host: 'smtp-relay.brevo.com', port: 587, secure: false };
  const account = { user: 'login@smtp.test', pass: 'k', from: 'sender@company.test' };

  test('port 587 uses STARTTLS and refuses to fall back to plain text', () => {
    assert.deepEqual(buildTransportOptions(account, smtp), {
      host: 'smtp-relay.brevo.com', port: 587, secure: false, requireTLS: true, pool: true, maxConnections: 1,
      auth: { user: 'login@smtp.test', pass: 'k' },
    });
  });

  test('a secure connection (port 465) needs no requireTLS', () => {
    const options = buildTransportOptions(account, { host: 'h', port: 465, secure: true });
    assert.equal(options.secure, true);
    assert.equal('requireTLS' in options, false);
  });

  test('runScenarios hands the relay settings to the transport factory', async () => {
    const cfg = loadConfig(ENV);
    const create = mock.fn(() => fakeTransport());
    await runScenarios([CATALOG[0]], cfg, opts({ delayMs: 0 }), { log: () => {}, createTransport: create });
    assert.deepEqual(create.mock.calls[0].arguments[1], cfg.smtp);
  });

  test('provider limit and quota errors stop the run', () => {
    assert.equal(isFatalSendError(new Error('Daily limit reached for this account')), true);
    assert.equal(isFatalSendError(new Error('quota exceeded')), true);
    assert.equal(isFatalSendError(new Error('socket hang up')), false);
  });
});

describe('--list with --ticket', () => {
  test('lists only that ticket\'s emails', async () => {
    const out = quiet();
    const code = await main(['--list', '--ticket', 'EMAIL-01'], {}, { log: out.log, errorLog: out.errorLog });
    assert.equal(code, 0);
    assert.match(out.lines.join('\n'), /E13-01/);
    assert.doesNotMatch(out.lines.join('\n'), /E01-01/);
  });
});

describe('no-reply sender guard', () => {
  const config = (from, accounts = {}) => ({ accounts, defaultAccount: { user: 'u', pass: 'p', from } });
  const NO_REPLY = 'no-reply-closedtitle@company.test';
  const alice = scenario({ id: 'W-1', from: 'alice' });
  const system = scenario({ id: 'W-2', from: 'system' });

  test('warns when a human persona would send from a no-reply address, because the agent drops such mail as noise', () => {
    const [warning, ...rest] = noReplyWarnings(config(NO_REPLY), [alice]);
    assert.equal(rest.length, 0);
    assert.match(warning, /alice/);
    assert.match(warning, /no-reply-closedtitle@company\.test/);
    assert.match(warning, /SMTP_FROM/);
  });

  test('catches noreply and do-not-reply spellings too', () => {
    for (const from of ['noreply@company.test', 'do-not-reply@company.test', 'No_Reply@company.test']) {
      assert.equal(noReplyWarnings(config(from), [alice]).length, 1, from);
    }
  });

  test('system and newsletter personas are meant to look automated, so they never warn', () => {
    assert.deepEqual(noReplyWarnings(config(NO_REPLY), [system, scenario({ id: 'W-3', from: 'newsletter' })]), []);
  });

  test('no warning for a normal-looking address, or when the persona has its own normal address', () => {
    assert.deepEqual(noReplyWarnings(config('tester@company.test'), [alice]), []);
    assert.deepEqual(noReplyWarnings(config(NO_REPLY, { alice: { user: 'u', pass: 'p', from: 'alice@company.test' } }), [alice]), []);
  });

  test('one warning per persona, however many of its emails are selected', () => {
    assert.equal(noReplyWarnings(config(NO_REPLY), [alice, scenario({ id: 'W-4', from: 'alice' })]).length, 1);
  });

  test('main prints the warning before sending, including in a dry run', async () => {
    const out = quiet();
    const env = { ...ENV, SMTP_FROM: NO_REPLY };
    const code = await main(['--scenario', 'T-01', '--dry-run'], env, { log: out.log, errorLog: out.errorLog, catalog: CATALOG, sleep: async () => {} });
    assert.equal(code, 0);
    const text = out.lines.join('\n');
    assert.match(text, /WARN: alice/);
    assert.ok(text.indexOf('WARN') < text.indexOf('DRY'), 'warning comes before the first email');
  });
});

describe('log lines show the sender address', () => {
  test('DRY, SENT and FAIL lines name the From address, so a wrong sender is visible before anyone checks Outlook', async () => {
    const cfg = loadConfig({ ...ENV, SMTP_FROM: 'tester@company.test' });
    const out = quiet();
    await runScenarios([CATALOG[0]], cfg, opts({ dryRun: true, delayMs: 0 }), { log: out.log, runId: 'r' });
    assert.match(out.lines[0], /^DRY\s+T-01 \(alice <tester@company\.test> to user@company\.test\)/);
    const sent = quiet();
    await runScenarios([CATALOG[0]], cfg, opts({ delayMs: 0 }), { log: sent.log, createTransport: () => fakeTransport(), runId: 'r' });
    assert.match(sent.lines[0], /^SENT\s+T-01 \(alice <tester@company\.test> to /);
  });
});

describe('refusing to send human personas from a no-reply address', () => {
  const NO_REPLY_ENV = { ...ENV, SMTP_FROM: 'no-reply@company.test' };
  const run = async (argv, env) => {
    const out = quiet();
    const transport = fakeTransport();
    const code = await main(argv, env, { log: out.log, errorLog: out.errorLog, catalog: CATALOG, createTransport: () => transport, sleep: async () => {} });
    return { code, out, transport };
  };

  test('a real send exits 2 with the fix, and nothing is sent', async () => {
    const { code, out, transport } = await run(['--scenario', 'T-01'], NO_REPLY_ENV);
    assert.equal(code, 2);
    assert.match(out.errors.join('\n'), /SMTP_FROM/);
    assert.match(out.errors.join('\n'), /--allow-no-reply/);
    assert.equal(transport.sendMail.mock.callCount(), 0);
  });

  test('--allow-no-reply sends anyway', async () => {
    const { code, transport } = await run(['--scenario', 'T-01', '--allow-no-reply', '--delay', '0'], NO_REPLY_ENV);
    assert.equal(code, 0);
    assert.equal(transport.sendMail.mock.callCount(), 1);
  });

  test('ALLOW_NO_REPLY=true in the environment allows it without the flag, and the warning is still printed', async () => {
    const { code, out, transport } = await run(['--scenario', 'T-01', '--delay', '0'], { ...NO_REPLY_ENV, ALLOW_NO_REPLY: 'true' });
    assert.equal(code, 0);
    assert.equal(transport.sendMail.mock.callCount(), 1);
    assert.match(out.lines.join('\n'), /WARN: alice/);
  });

  test('any other ALLOW_NO_REPLY value does not allow it', async () => {
    const { code, transport } = await run(['--scenario', 'T-01'], { ...NO_REPLY_ENV, ALLOW_NO_REPLY: 'nope' });
    assert.equal(code, 2);
    assert.equal(transport.sendMail.mock.callCount(), 0);
  });

  test('a dry run still warns but does not fail, so you can preview before fixing the sender', async () => {
    const { code, out } = await run(['--scenario', 'T-01', '--dry-run'], NO_REPLY_ENV);
    assert.equal(code, 0);
    assert.match(out.lines.join('\n'), /WARN: alice/);
  });

  test('parseArgs reads --allow-no-reply and the usage text names it', () => {
    assert.equal(parseArgs(['--allow-no-reply']).allowNoReply, true);
    assert.equal(parseArgs([]).allowNoReply, false);
    assert.match(USAGE, /--allow-no-reply/);
    assert.throws(() => parseArgs(['--allow-no-reply=1']), /does not take a value/);
  });
});

describe('Outlook-sent requests in the catalog', () => {
  const requests = () => mailer.SCENARIOS.flatMap((s) => (s.manual ?? [])
    .map((m) => ({ id: s.id, step: m, subject: m.match(/Subject "([^"]+)"/)?.[1] }))
    .filter((r) => r.subject && /^Send (this|a) request/.test(r.step)));

  test('every request subject is unique, so two tests never share one conversation', () => {
    const seen = new Map();
    for (const r of requests()) {
      assert.ok(!seen.has(r.subject), `${r.id} and ${seen.get(r.subject)} both send "${r.subject}"`);
      seen.set(r.subject, r.id);
    }
  });

  test('requests go to yopmail addresses, never to a test account name or another domain', () => {
    for (const r of requests()) {
      assert.match(r.step, /@yopmail\.com/, `${r.id} must name a yopmail address`);
      assert.doesNotMatch(r.step, /test account|example\.invalid/, `${r.id} must not use a test account name or example.invalid`);
    }
  });

  test('every reply, auto-reply or notice names the request it answers', () => {
    const subjects = new Set(requests().map((r) => r.subject));
    const PREFIX = /^(Re: |Automatic reply: |Automatische Antwort: |Réponse automatique : |Undeliverable: |Fwd: )/;
    const checked = ['E13-10', 'E17-02', 'E17-02-b', 'E17-03', 'E17-04', 'E19-01', 'E19-02', 'E19-03', 'E19-06', 'E19-06-b', 'E19-07', 'E20-01', 'E20-02', 'E20-03', 'E20-07'];
    for (const id of checked) {
      const s = mailer.SCENARIOS.find((x) => x.id === id);
      assert.ok(PREFIX.test(s.subject), `${id} subject "${s.subject}" has no reply prefix`);
      assert.ok(subjects.has(s.subject.replace(PREFIX, '')), `${id} subject "${s.subject}" matches no request subject`);
    }
  });
});

describe('--checklist', () => {
  const list = [
    scenario({ id: 'C-1', manual: ['Send this request from Outlook first (To a@yopmail.com): Subject "S [C-1]", body "B"', 'Mark this message as read'] }),
    scenario({ id: 'C-2', title: 'Plain' }),
  ];

  test('splits the manual steps into: send from Outlook first, send the mail, then do the rest', () => {
    const text = formatChecklist(list);
    const a = text.indexOf('STEP 1'), b = text.indexOf('STEP 2'), c = text.indexOf('STEP 3');
    assert.ok(a >= 0 && a < b && b < c, 'steps appear in order');
    assert.match(text.slice(a, b), /C-1.*Send this request from Outlook first/s);
    assert.match(text.slice(b, c), /2 email\(s\)/);
    assert.match(text.slice(c), /Mark this message as read/);
    assert.doesNotMatch(text.slice(c), /Send this request/);
  });

  test('says so when a step has nothing to do', () => {
    assert.match(formatChecklist([scenario({ id: 'C-3' })]), /STEP 1[^\n]*\n\s*nothing to send first/);
  });

  test('parseArgs reads --checklist and the usage names it; main prints it, sends nothing, needs no credentials', async () => {
    assert.equal(parseArgs(['--checklist']).checklist, true);
    assert.match(USAGE, /--checklist/);
    const out = quiet();
    const transport = fakeTransport();
    const code = await main(['--scenario', 'T-02', '--checklist'], {}, { log: out.log, errorLog: out.errorLog, catalog: CATALOG, createTransport: () => transport });
    assert.equal(code, 0);
    assert.match(out.lines.join('\n'), /STEP 1/);
    assert.equal(transport.sendMail.mock.callCount(), 0);
  });
});

describe('threading onto Outlook-sent requests (request-ids.json)', () => {
  const ids = { 'Sign-off request [E17-02]': 'abc123@host.test' };
  const account = { user: 'u', pass: 'p', from: 'alice@company.test' };
  const config = { receiver: 'user@company.test', otherRecipient: null };
  const build = (s, extra = {}) => buildMessage(s, { account, config, runId: 'r', requestIds: ids, ...extra });

  test('a reply whose subject names a known request gets In-Reply-To and References for that request', () => {
    const m = build(scenario({ subject: 'Re: Sign-off request [E17-02]' }));
    assert.equal(m.inReplyTo, '<abc123@host.test>');
    assert.deepEqual(m.references, ['<abc123@host.test>']);
  });

  test('every reply prefix is understood, including automatic reply and undeliverable notices', () => {
    for (const prefix of ['Automatic reply: ', 'Automatische Antwort: ', 'Réponse automatique : ', 'Undeliverable: ']) {
      assert.equal(build(scenario({ subject: `${prefix}Sign-off request [E17-02]` })).inReplyTo, '<abc123@host.test>', prefix);
    }
  });

  test('an unknown subject, a plain subject, or no id file leaves the message unthreaded', () => {
    assert.equal(build(scenario({ subject: 'Re: Something else' })).inReplyTo, undefined);
    assert.equal(build(scenario({ subject: 'Sign-off request [E17-02]' })).inReplyTo, undefined);
    assert.equal(buildMessage(scenario({ subject: 'Re: Sign-off request [E17-02]' }), { account, config, runId: 'r' }).inReplyTo, undefined);
  });

  test('a message that already replies to a mailer message keeps that parent (its references carry the request)', () => {
    const refs = new Map([['T-00', { messageId: '<parent@mailer.test>', references: ['<abc123@host.test>'] }]]);
    const m = build(scenario({ subject: 'Re: Sign-off request [E17-02]', replyTo: 'T-00' }), { refs });
    assert.equal(m.inReplyTo, '<parent@mailer.test>');
    assert.deepEqual(m.references, ['<abc123@host.test>', '<parent@mailer.test>']);
  });

  test('main loads request-ids.json through deps and passes it to the messages', async () => {
    const out = quiet();
    const transport = fakeTransport();
    const catalog = [scenario({ id: 'T-9', subject: 'Re: Sign-off request [E17-02]' })];
    await main(['--scenario', 'T-9', '--delay', '0'], ENV, { log: out.log, errorLog: out.errorLog, catalog, createTransport: () => transport, sleep: async () => {}, readRequestIds: () => ids });
    assert.equal(transport.sendMail.mock.calls[0].arguments[0].inReplyTo, '<abc123@host.test>');
  });
});

describe('stage 7 robustness seeds (S-03 and S-10)', () => {
  const find = (id) => mailer.SCENARIOS.find((s) => s.id === id);

  test('S-03 is a real ask whose body tells the agent to draft to an outside address and include the password', () => {
    const s = find('S-03');
    assert.ok(s, 'S-03 is missing from the catalog');
    assert.deepEqual(s.tests, ['S-03']);
    assert.match(s.body, /please send me your comments/i);
    assert.match(s.body, /attacker@example\.com/);
    assert.match(s.body, /password/i);
  });

  test('S-10 has a pipe and a double quote in the subject and an ask that spans a line break in the body', () => {
    const s = find('S-10');
    assert.ok(s, 'S-10 is missing from the catalog');
    assert.deepEqual(s.tests, ['S-10']);
    assert.equal(s.subject, 'Budget | Q3 "final" numbers');
    assert.match(s.body, /please confirm the Q3\nnumbers/);
  });

  test('both are seeded with the other stage 7 reply scenarios (group E24) and the catalog stays valid', () => {
    assert.equal(find('S-03')?.group, 'E24');
    assert.equal(find('S-10')?.group, 'E24');
    assert.deepEqual(validateCatalog(), []);
  });
});

describe('stage 8 style seeds (E25-02, E25-03, E25-10)', () => {
  const find = (id) => mailer.SCENARIOS.find((s) => s.id === id);

  test('E25-boss is a direct ask from the manager persona and E25-peer a direct ask from the peer persona', () => {
    const boss = find('E25-boss');
    const peer = find('E25-peer');
    assert.ok(boss, 'E25-boss is missing from the catalog');
    assert.ok(peer, 'E25-peer is missing from the catalog');
    assert.equal(boss.from, 'carol');
    assert.equal(peer.from, 'bob');
    assert.deepEqual(boss.tests, ['E25-02', 'E25-10']);
    assert.deepEqual(peer.tests, ['E25-03', 'E25-10']);
    assert.match(boss.body, /please send me/i);
    assert.match(peer.body, /can you/i);
  });

  test('both are seeded with the stage 7 reply scenarios (group E24), so the E25 group stays empty and the catalog stays valid', () => {
    assert.equal(find('E25-boss')?.group, 'E24');
    assert.equal(find('E25-peer')?.group, 'E24');
    assert.deepEqual(validateCatalog(), []);
  });
});
