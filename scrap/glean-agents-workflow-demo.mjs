#!/usr/bin/env node
/**
 * Glean Agents API - Workflow Engine demo
 * Evidence probe for 4.9.1 Features Confirmed item #16 ("Workflow engine, agent-side").
 *
 * What it proves, in order:
 *   1. agents/search        -> agents are addressable, first-class API objects
 *   2. agents/{id}          -> agent metadata comes back (name, description)
 *   3. agents/{id}/schemas  -> declared input/output schema == the "workflow" contract
 *   4. runs (wait)          -> ordered execution actually runs and returns a final result
 *   5. runs (stream)        -> same run over SSE, optional
 *
 * Zero dependencies. Node 18+ (global fetch). scrap/package.json is already
 * "type": "module", so .mjs needs no extra config.
 *
 * ---------------------------------------------------------------------------
 * ENDPOINT ACCURACY NOTE (checked against developers.glean.com on 2026-09-11)
 *
 *   POST /rest/api/v1/agents/search              Client API, current
 *   GET  /rest/api/v1/agents/{agent_id}          Client API, current
 *   GET  /rest/api/v1/agents/{agent_id}/schemas  Client API, current
 *   POST /rest/api/v1/agents/runs/wait           DEPRECATED 2026-08-25,
 *                                                removal after 2027-04-15
 *   POST /rest/api/v1/agents/runs/stream         SSE variant of the above
 *   POST /api/agents/{agent_id}/runs             stated replacement for runs/wait
 *
 * Glean's own deprecation notice says: "Use POST /api/agents/{agent_id}/runs
 * instead." The replacement's request schema was NOT published on a fetchable
 * page as of this writing, so runAgent() below tries the replacement first and
 * falls back to the deprecated path on 404/405. That fallback is deliberate -
 * it makes the deprecation observable instead of guessed. Watch which path the
 * log reports; that answer is itself a finding worth recording.
 * ---------------------------------------------------------------------------
 *
 * USAGE
 *   cd scrap
 *
 *   # 1. Dry run - no credentials needed, prints the exact calls it would make
 *   node glean-agents-workflow-demo.mjs --dry-run
 *
 *   # 2. Real run
 *   export GLEAN_INSTANCE=acme            # or: export GLEAN_BASE_URL=https://acme-be.glean.com
 *   export GLEAN_API_TOKEN=...            # user-scoped token, Admin -> API settings
 *   node glean-agents-workflow-demo.mjs --search "SOW"
 *
 *   # 3. Target one agent directly (ID is in the Agent Builder URL: /admin/agents/{agentId})
 *   node glean-agents-workflow-demo.mjs --agent-id abc123 --input '{"query":"Summarize the SOW"}'
 *
 *   # 4. Stream instead of wait
 *   node glean-agents-workflow-demo.mjs --agent-id abc123 --stream --input '{"query":"..."}'
 *
 *   # Point at a different .env
 *   node glean-agents-workflow-demo.mjs --env ../secrets/glean.env
 *   GLEAN_ENV_FILE=/abs/path/.env node glean-agents-workflow-demo.mjs
 *
 *   # 5. Impersonate another user (needs a GLOBAL token, not user-scoped)
 *   export GLEAN_ACT_AS=user-b@example.com
 *
 * GOTCHA that will bite you: if the agent uses an input-form trigger, `input`
 * must carry EVERY form field, including the optional ones, or the run 400s.
 * Text values only - the API takes no file/binary inputs. Run with --schemas-only
 * first and copy the field names straight out of the printed schema.
 */

import path from 'node:path';
import dotenv from 'dotenv';

// --- env loading ------------------------------------------------------------
// Default: scrap/.env, resolved relative to THIS file, so the script works no
// matter which cwd you launch it from.
// Override order (first wins):
//   --env <path>        CLI flag
//   GLEAN_ENV_FILE      shell env var
//   <script dir>/.env   default
// Real shell env vars beat .env values - dotenv does not override by default,
// so `GLEAN_API_TOKEN=xxx node script.mjs` still wins over the file.
const rawArgs = process.argv.slice(2);
// NOTE: the flag is --env, NOT --env-file. Node 20.6+ reserves --env-file as a
// built-in CLI flag and swallows it before the script ever sees it, even when
// it appears after the script name. If you prefer Node's native loader:
//   node --env-file=.env glean-script.mjs
// That works too, and makes this block a no-op (real env wins over .env).
const envFileFlagIdx = rawArgs.indexOf('--env');
const ENV_FILE =
  (envFileFlagIdx !== -1 &&
  rawArgs[envFileFlagIdx + 1] &&
  !rawArgs[envFileFlagIdx + 1].startsWith('--')
    ? rawArgs[envFileFlagIdx + 1]
    : null) ||
  process.env.GLEAN_ENV_FILE ||
  path.join(import.meta.dirname, '.env');

const ENV_RESULT = dotenv.config({ path: ENV_FILE, quiet: true });
const ENV_STATUS = ENV_RESULT.error
  ? `not loaded (${ENV_RESULT.error.code === 'ENOENT' ? 'no such file' : ENV_RESULT.error.message})`
  : `loaded ${Object.keys(ENV_RESULT.parsed ?? {}).length} key(s)`;

const args = rawArgs;

const flag = (name, fallback = undefined) => {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const next = args[i + 1];
  return next && !next.startsWith('--') ? next : true;
};

const OPTS = {
  dryRun: Boolean(flag('dry-run', false)),
  search: flag('search', null),
  agentId: flag('agent-id', null),
  input: flag('input', null),
  stream: Boolean(flag('stream', false)),
  schemasOnly: Boolean(flag('schemas-only', false)),
  timeoutMs: Number(flag('timeout', 120000)),
};

const TOKEN = process.env.GLEAN_API_TOKEN || '';
const ACT_AS = process.env.GLEAN_ACT_AS || '';
const BASE_URL =
  process.env.GLEAN_BASE_URL ||
  (process.env.GLEAN_INSTANCE ? `https://${process.env.GLEAN_INSTANCE}-be.glean.com` : '');

// ---------------------------------------------------------------------------

const log = (...a) => console.log(...a);
const section = (t) => log(`\n${'─'.repeat(72)}\n${t}\n${'─'.repeat(72)}`);

function headers() {
  const h = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  };
  // X-Glean-ActAs only works with a global/service token. Sending it with a
  // user-scoped token is the usual cause of a confusing 401.
  if (ACT_AS) h['X-Glean-ActAs'] = ACT_AS;
  return h;
}

/** Single call site for every request, so dry-run and retries stay honest. */
async function call(method, path, body, { raw = false } = {}) {
  const url = `${BASE_URL}${path}`;

  if (OPTS.dryRun) {
    log(`\n[dry-run] ${method} ${url}`);
    log(`[dry-run] headers: ${JSON.stringify({ ...headers(), Authorization: 'Bearer ***' })}`);
    if (body) log(`[dry-run] body: ${JSON.stringify(body, null, 2)}`);
    return { __dryRun: true };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), OPTS.timeoutMs);

  let res;
  try {
    res = await fetch(url, {
      method,
      headers: headers(),
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }

  if (raw) return res;

  const text = await res.text();
  if (!res.ok) {
    const err = new Error(`${method} ${path} -> HTTP ${res.status}\n${text.slice(0, 800)}`);
    err.status = res.status;
    throw err;
  }
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

// --- 1. discover ------------------------------------------------------------

async function searchAgents(query) {
  section(`1. Search agents matching "${query}"`);
  const out = await call('POST', '/rest/api/v1/agents/search', { query });
  if (out.__dryRun) return [];

  const agents = out.agents ?? out.results ?? (Array.isArray(out) ? out : []);
  if (!agents.length) {
    log('No agents matched. Publish a Workflow-mode agent in Agent Builder first.');
    return [];
  }
  for (const a of agents) {
    log(`  ${a.agentId ?? a.id ?? '(no id)'}  ${a.name ?? '(unnamed)'}`);
  }
  return agents;
}

// --- 2 + 3. the actual #16 evidence ----------------------------------------

async function inspectAgent(agentId) {
  section(`2. Agent metadata - ${agentId}`);
  const agent = await call('GET', `/rest/api/v1/agents/${encodeURIComponent(agentId)}`);
  if (!agent.__dryRun) log(JSON.stringify(agent, null, 2));

  section(`3. Declared schemas - ${agentId}`);
  log('This is the item #16 payload: the agent exposes a structured input/output');
  log('contract, which is what "workflow engine, agent-side" actually means at the');
  log('API layer. Ordered steps live server-side; the schema is the public surface.\n');

  const schemas = await call('GET', `/rest/api/v1/agents/${encodeURIComponent(agentId)}/schemas`);
  if (!schemas.__dryRun) {
    log(JSON.stringify(schemas, null, 2));
    const fields =
      schemas?.input?.properties ??
      schemas?.inputSchema?.properties ??
      schemas?.parameters?.properties ??
      null;
    if (fields) {
      log('\nInput fields to supply in --input (include optional ones too):');
      for (const [k, v] of Object.entries(fields)) {
        log(`  ${k}: ${v.type ?? 'unknown'}${v.description ? ` - ${v.description}` : ''}`);
      }
    }
  }
  return { agent, schemas };
}

// --- 4. run and wait -------------------------------------------------------

async function runAgent(agentId, input) {
  section(`4. Run agent (wait for final result) - ${agentId}`);

  // Replacement endpoint first, per the 2026-08-25 deprecation notice.
  try {
    const out = await call('POST', `/api/agents/${encodeURIComponent(agentId)}/runs`, { input });
    log('Path used: POST /api/agents/{agent_id}/runs  (current replacement)');
    if (!out.__dryRun) log(JSON.stringify(out, null, 2));
    return { out, pathUsed: 'replacement' };
  } catch (e) {
    if (e.status !== 404 && e.status !== 405) throw e;
    log(`Replacement path returned HTTP ${e.status}; falling back to the deprecated route.`);
    log('Record that: it means /api/agents/{id}/runs is not live on this instance yet.');
  }

  const out = await call('POST', '/rest/api/v1/agents/runs/wait', { agentId, input });
  log('Path used: POST /rest/api/v1/agents/runs/wait  (DEPRECATED 2026-08-25)');
  if (!out.__dryRun) log(JSON.stringify(out, null, 2));
  return { out, pathUsed: 'deprecated' };
}

// --- 5. run and stream -----------------------------------------------------

async function streamAgent(agentId, input) {
  section(`5. Run agent (SSE stream) - ${agentId}`);

  const res = await call('POST', '/rest/api/v1/agents/runs/stream', { agentId, input }, { raw: true });
  if (res?.__dryRun) return;

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`stream -> HTTP ${res.status}\n${body.slice(0, 800)}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffered = '';
  let chunks = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffered += decoder.decode(value, { stream: true });

    const lines = buffered.split('\n');
    buffered = lines.pop() ?? '';
    for (const line of lines) {
      if (!line.startsWith('data:')) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === '[DONE]') continue;
      chunks++;
      process.stdout.write(payload + '\n');
    }
  }
  log(`\nStream closed after ${chunks} data events.`);
}

// --- main ------------------------------------------------------------------

function preflight() {
  if (OPTS.dryRun) {
    if (!BASE_URL) log('[dry-run] No GLEAN_INSTANCE/GLEAN_BASE_URL set - using a placeholder host.\n');
    return;
  }
  const missing = [];
  if (!BASE_URL) missing.push('GLEAN_INSTANCE or GLEAN_BASE_URL');
  if (!TOKEN) missing.push('GLEAN_API_TOKEN');
  if (missing.length) {
    console.error(`Missing: ${missing.join(', ')}`);
    console.error('Run with --dry-run to see the calls without credentials.');
    process.exit(1);
  }
}

async function main() {
  preflight();

  log(`Base URL : ${BASE_URL || 'https://<instance>-be.glean.com  (placeholder)'}`);
  log(`Token    : ${TOKEN ? 'set' : 'not set'}${ACT_AS ? `   ActAs: ${ACT_AS}` : ''}`);
  log(`Env file : ${ENV_FILE}  (${ENV_STATUS})`);
  log(`Mode     : ${OPTS.dryRun ? 'DRY RUN' : 'live'}`);

  // let agentId = OPTS.agentId;

  // if (!agentId && OPTS.search) {
  //   const found = await searchAgents(OPTS.search);
  //   agentId = found[0]?.agentId ?? found[0]?.id ?? null;
  //   if (agentId) log(`\nUsing first match: ${agentId}`);
  // }

  // if (!agentId) {
  //   if (OPTS.dryRun) {
  //     agentId = 'DRY_RUN_AGENT_ID';
  //   } else {
  //     console.error('\nNeed --agent-id <id> or --search <name>.');
  //     console.error('Agent ID is in the Agent Builder URL: /admin/agents/{agentId}');
  //     process.exit(1);
  //   }
  // }

  // await inspectAgent(agentId);
  // if (OPTS.schemasOnly) {
  //   log('\n--schemas-only set; stopping before the run.');
  //   return;
  // }

  // let input = {};
  // if (OPTS.input) {
  //   try {
  //     input = JSON.parse(OPTS.input);
  //   } catch {
  //     console.error(`--input must be valid JSON. Got: ${OPTS.input}`);
  //     process.exit(1);
  //   }
  // } else {
  //   log('\nNo --input given; sending {}. An input-form agent will 400 - that is expected.');
  // }

  // if (OPTS.stream) {
  //   await streamAgent(agentId, input);
  // } else {
  //   const { pathUsed } = await runAgent(agentId, input);
  //   section('Result');
  //   log(`Run completed via the ${pathUsed} endpoint.`);
  //   log('For the eval record: note which path answered, plus whether the output');
  //   log('cites real indexed documents rather than generic prose.');
  // }
}

main().catch((e) => {
  console.error(`\nFAILED: ${e.message}`);
  if (e.status === 401) console.error('401 - bad token, or X-Glean-ActAs sent with a user-scoped token.');
  if (e.status === 403) console.error('403 - token lacks scope, or the agent is not shared with this user.');
  if (e.status === 429) console.error('429 - rate limited (~30 qpm). Back off and retry.');
  process.exit(1);
});
