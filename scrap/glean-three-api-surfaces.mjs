#!/usr/bin/env node
/**
 * Glean — Three REST API Surfaces prober
 * Evidence probe for 4.9.1 Features Confirmed item #27 ("Three REST APIs":
 * Client API, Platform API, Indexing API — no GraphQL/gRPC/SOAP).
 *
 * The claim is that Glean ships three SEPARATE REST surfaces. This script
 * proves it by hitting all three and printing a matrix of path prefix, auth
 * domain, and HTTP status.
 *
 *   1. Client API    POST /rest/api/v1/search              search the index
 *   2. Platform API  POST /api/agents/search               agents surface
 *   3. Indexing API  POST /api/index/v1/checkdocumentaccess   read-only probe
 *
 * BONUS TEST (the strongest single piece of evidence):
 * "agents" exists on BOTH the Client API and the Platform API, at two
 * different path prefixes:
 *   /rest/api/v1/agents/search   vs   /api/agents/search
 * Same capability, two surfaces. --compare-agents calls both and diffs the
 * status codes. If both answer, that is not a duplicate endpoint by accident —
 * it is two genuinely distinct API surfaces mid-migration, which is exactly
 * what item #27 asserts and what the Undocumented Features doc flagged as
 * "Platform API as a distinct third surface... overlaps, unexplained."
 *
 * Zero dependencies. Node 18+ (global fetch). scrap/package.json is already
 * "type": "module".
 *
 * ---------------------------------------------------------------------------
 * A 401 ON THE INDEXING API IS A PASS, NOT A FAILURE.
 *
 * Glean's Indexing API rejects OAuth/user-scoped tokens and accepts only
 * Glean-issued indexing (service) tokens. So calling it with your Client API
 * token SHOULD return 401. That 401 is the proof: it demonstrates the surface
 * exists AND that it sits in a separate auth domain from the other two. A 404
 * would be the bad result — that would mean no such surface. The summary table
 * scores it accordingly.
 * ---------------------------------------------------------------------------
 *
 * ENDPOINT ACCURACY (checked against developers.glean.com on 2026-09-11)
 *
 *   POST /rest/api/v1/search                      Client API, current
 *   POST /rest/api/v1/agents/search               Client API, current
 *   POST /api/agents/search                       Platform API, current
 *   GET  /api/agents/{agent_id}                   Platform API, current
 *   GET  /api/agents/{agent_id}/schemas           Platform API, current
 *   POST /api/agents/{agent_id}/runs              Platform API, current
 *   POST /api/index/v1/checkdocumentaccess        Indexing API, read-only
 *   POST /api/index/v1/getdocumentstatus          Indexing API, DEPRECATED
 *                                                 2026-02-03, removal after
 *                                                 2026-10-15 — use
 *                                                 /debug/{datasource}/document
 *
 * Deliberately NOT probed: POST /api/index/v1/indexdocuments. That one WRITES
 * to the index. Probing a write endpoint to prove a surface exists risks
 * indexing junk if a valid token happens to be present. checkdocumentaccess is
 * read-only and answers the same question safely.
 *
 * USAGE
 *   cd scrap
 *
 *   # No credentials needed — prints the exact calls it would make
 *   node glean-three-api-surfaces.mjs --dry-run
 *
 *   # Real run
 *   export GLEAN_INSTANCE=acme          # or GLEAN_BASE_URL=https://acme-be.glean.com
 *   export GLEAN_API_TOKEN=...          # user-scoped; covers Client + Platform
 *   node glean-three-api-surfaces.mjs --query "Stratos_Connector_Test_Doc"
 *
 *   # Optional: a real indexing token turns the expected 401 into a 200
 *   export GLEAN_INDEXING_TOKEN=...
 *
 *   # Point at a different .env
 *   node glean-three-api-surfaces.mjs --env ../secrets/glean.env
 *   GLEAN_ENV_FILE=/abs/path/.env node glean-three-api-surfaces.mjs
 *
 *   # The two-surface agents comparison
 *   node glean-three-api-surfaces.mjs --compare-agents
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
// Real shell env vars beat .env values — dotenv does not override by default,
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
  query: flag('query', 'Stratos_Connector_Test_Doc'),
  compareAgents: Boolean(flag('compare-agents', false)),
  pageSize: Number(flag('page-size', 5)),
  timeoutMs: Number(flag('timeout', 30000)),
  verbose: Boolean(flag('verbose', false)),
};

const TOKEN = process.env.GLEAN_API_TOKEN || '';
const INDEXING_TOKEN = process.env.GLEAN_INDEXING_TOKEN || '';
const ACT_AS = process.env.GLEAN_ACT_AS || '';
const BASE_URL =
  process.env.GLEAN_BASE_URL ||
  (process.env.GLEAN_INSTANCE ? `https://${process.env.GLEAN_INSTANCE}-be.glean.com` : '');

const log = (...a) => console.log(...a);
const rule = (c = '─') => log(c.repeat(74));
const section = (t) => {
  log('');
  rule();
  log(t);
  rule();
};

// --- the one function everything else calls ---------------------------------

/**
 * Single generic API caller. Every surface goes through here so the auth
 * domain and path prefix differences stay visible in one place.
 *
 * @param {object} o
 * @param {string} o.surface   'Client API' | 'Platform API' | 'Indexing API'
 * @param {string} o.path      full path, including its prefix
 * @param {object} [o.body]    JSON body
 * @param {string} [o.method]  defaults to POST
 * @param {string} [o.token]   defaults to GLEAN_API_TOKEN
 * @returns {Promise<{surface,path,status,ok,json,text,error}>}
 */
async function callGleanApi({ surface, path, body, method = 'POST', token = TOKEN }) {
  const url = `${BASE_URL}${path}`;
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  // Only meaningful with a global/service token; harmless to omit.
  if (ACT_AS) headers['X-Glean-ActAs'] = ACT_AS;

  if (OPTS.dryRun) {
    log(`[dry-run] ${method} ${url}`);
    log(`[dry-run]   surface: ${surface}`);
    log(`[dry-run]   auth:    ${token ? 'Bearer ***' : '(none set)'}`);
    if (body) log(`[dry-run]   body:    ${JSON.stringify(body)}`);
    return { surface, path, status: 0, ok: false, dryRun: true };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), OPTS.timeoutMs);

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    const text = await res.text();
    let json = null;
    try {
      json = JSON.parse(text);
    } catch {
      /* non-JSON body is fine — status is what we came for */
    }
    return { surface, path, status: res.status, ok: res.ok, json, text };
  } catch (e) {
    return { surface, path, status: -1, ok: false, error: e.message };
  } finally {
    clearTimeout(timer);
  }
}

function report(r, { expect401IsPass = false } = {}) {
  if (r.dryRun) return;
  const verdict = r.ok
    ? 'OK'
    : expect401IsPass && r.status === 401
      ? 'OK (401 expected — separate auth domain)'
      : r.status === 404
        ? 'SURFACE MISSING (404)'
        : `HTTP ${r.status}`;
  log(`  ${r.path}`);
  log(`    status: ${r.status < 0 ? `network error: ${r.error}` : verdict}`);
  if (OPTS.verbose && r.text) log(`    body:   ${r.text.slice(0, 400)}`);
}

// --- 1. Client API ----------------------------------------------------------

async function probeClientApiSearch(query) {
  section(`1. Client API — POST /rest/api/v1/search   (query: "${query}")`);
  const r = await callGleanApi({
    surface: 'Client API',
    path: '/rest/api/v1/search',
    body: { query, pageSize: OPTS.pageSize },
  });
  report(r);

  if (r.ok && r.json) {
    const results = r.json.results ?? [];
    log(`\n  ${results.length} result(s):`);
    for (const d of results.slice(0, OPTS.pageSize)) {
      const title = d.title ?? d.document?.title ?? '(untitled)';
      const url = d.url ?? d.document?.url ?? '';
      log(`    - ${title}${url ? `  ${url}` : ''}`);
    }
    if (!results.length) {
      log('    (none — check the doc is indexed and visible to this token\'s user)');
    }
  }
  return r;
}

// --- 2. Platform API --------------------------------------------------------

async function probePlatformApiAgents() {
  section('2. Platform API — POST /api/agents/search');
  log('  Note the prefix: /api/... not /rest/api/v1/... That prefix difference');
  log('  is the surface boundary.\n');

  const r = await callGleanApi({
    surface: 'Platform API',
    path: '/api/agents/search',
    body: {},
  });
  report(r);

  if (r.ok && r.json) {
    const agents = r.json.agents ?? r.json.results ?? (Array.isArray(r.json) ? r.json : []);
    log(`\n  ${agents.length} agent(s) visible to this token:`);
    for (const a of agents.slice(0, 10)) {
      log(`    - ${a.agentId ?? a.id ?? '(no id)'}  ${a.name ?? '(unnamed)'}`);
    }
  }
  return r;
}

// --- 3. Indexing API --------------------------------------------------------

async function probeIndexingApi() {
  section('3. Indexing API — POST /api/index/v1/checkdocumentaccess');
  log('  Read-only probe, chosen deliberately over indexdocuments (a write).');
  log('  With a user-scoped token this SHOULD 401 — that is the pass condition.');
  log('  Set GLEAN_INDEXING_TOKEN to turn it into a real 200.\n');

  const r = await callGleanApi({
    surface: 'Indexing API',
    path: '/api/index/v1/checkdocumentaccess',
    // Body fields are unpublished on the public page; auth is rejected before
    // body validation anyway when the token is wrong, which is the probe's point.
    body: { datasource: 'probe', objectType: 'probe', docId: 'probe', userEmail: 'probe@example.com' },
    token: INDEXING_TOKEN || TOKEN,
  });
  report(r, { expect401IsPass: true });

  if (r.status === 401) {
    log('\n  Confirms Features Not Confirmed #4: the Indexing API refuses');
    log('  OAuth/user-scoped tokens and wants a Glean-issued service token.');
  }
  return r;
}

// --- bonus: same capability, two surfaces -----------------------------------

async function compareAgentSurfaces() {
  section('BONUS — "agents" on two surfaces at once');
  log('  Client API:   POST /rest/api/v1/agents/search');
  log('  Platform API: POST /api/agents/search');
  log('  Both answering = two distinct surfaces, not one aliased path.\n');

  const [clientSide, platformSide] = await Promise.all([
    callGleanApi({ surface: 'Client API', path: '/rest/api/v1/agents/search', body: {} }),
    callGleanApi({ surface: 'Platform API', path: '/api/agents/search', body: {} }),
  ]);

  report(clientSide);
  report(platformSide);

  if (clientSide.dryRun) return { clientSide, platformSide };

  log('');
  if (clientSide.status === platformSide.status && clientSide.ok) {
    log('  Both surfaces answered. Two REST surfaces confirmed hands-on.');
  } else if (clientSide.ok && !platformSide.ok) {
    log('  Only the Client API answered — Platform API agents may not be live here.');
  } else if (!clientSide.ok && platformSide.ok) {
    log('  Only the Platform API answered — consistent with the Client API run');
    log('  endpoints being deprecated (2026-08-25) in favour of /api/agents/*.');
  } else {
    log(`  Neither answered cleanly (client ${clientSide.status}, platform ${platformSide.status}).`);
  }
  return { clientSide, platformSide };
}

// --- summary ---------------------------------------------------------------

function summarize(rows) {
  section('SUMMARY — three REST surfaces');
  log('  surface        prefix              status   verdict');
  rule('·');
  for (const r of rows) {
    if (r.dryRun) {
      log(`  ${r.surface.padEnd(14)} ${r.prefix.padEnd(19)} (dry-run)`);
      continue;
    }
    const pass = r.ok || (r.expect401IsPass && r.status === 401);
    const verdict = pass ? 'surface exists' : r.status === 404 ? 'NOT FOUND' : 'see above';
    log(`  ${r.surface.padEnd(14)} ${r.prefix.padEnd(19)} ${String(r.status).padEnd(8)} ${verdict}`);
  }
  rule('·');
  log('  No GraphQL, gRPC, or SOAP surface is documented — REST only.');
  log('  Copy this table into the item #27 test-guide row.');
}

// --- main ------------------------------------------------------------------

async function main() {
  if (!OPTS.dryRun) {
    const missing = [];
    if (!BASE_URL) missing.push('GLEAN_INSTANCE or GLEAN_BASE_URL');
    if (!TOKEN) missing.push('GLEAN_API_TOKEN');
    if (missing.length) {
      console.error(`Missing: ${missing.join(', ')}`);
      console.error('Run with --dry-run to see the calls without credentials.');
      process.exit(1);
    }
  }

  log(`Base URL : ${BASE_URL || 'https://<instance>-be.glean.com  (placeholder)'}`);
  log(`Token    : ${TOKEN ? 'set' : 'not set'}`);
  log(`Indexing : ${INDEXING_TOKEN ? 'separate token set' : 'none — expecting 401'}`);
  log(`Env file : ${ENV_FILE}  (${ENV_STATUS})`);
  log(`Mode     : ${OPTS.dryRun ? 'DRY RUN' : 'live'}`);

  if (OPTS.compareAgents) {
    await compareAgentSurfaces();
    return;
  }

  const client = await probeClientApiSearch(OPTS.query);
  const platform = await probePlatformApiAgents();
  const indexing = await probeIndexingApi();

  summarize([
    { ...client, surface: 'Client API', prefix: '/rest/api/v1/...' },
    { ...platform, surface: 'Platform API', prefix: '/api/...' },
    { ...indexing, surface: 'Indexing API', prefix: '/api/index/v1/...', expect401IsPass: true },
  ]);

  log('\nRun with --compare-agents for the two-surface agents diff.');
}

main().catch((e) => {
  console.error(`\nFAILED: ${e.message}`);
  process.exit(1);
});
