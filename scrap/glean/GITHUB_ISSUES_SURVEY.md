# Glean GitHub Issues Survey

*Pulled from the public `gleanwork` GitHub org via the Search Issues API, 2026-09-21. Covers all 6 public SDK/spec/MCP repos. 55 total issues, 11 open.*

## Summary

| Repo | Total | Open | Closed |
|---|---|---|---|
| api-client-typescript | 6 | 1 | 5 |
| api-client-python | 13 | 8 | 5 |
| api-client-go | 2 | 1 | 1 |
| api-client-java | 1 | 0 | 1 |
| open-api (spec repo) | 1 | 1 | 0 |
| mcp-server | 32 | 0 | 32 |
| **Total** | **55** | **11** | **44** |

`mcp-server` is by far the most active repo (32 issues, all closed — well-maintained). `api-client-python` has the worst open ratio (8 of 13 still open).

---

## gleanwork/api-client-typescript (6 issues, 1 open)

| # | State | Title | Created |
|---|---|---|---|
| 104 | open | feat: option to select LLM model in glean chat api | 2026-02-12 |
| 82 | closed | Allow File Upload Input on Agent Run Creation | 2025-11-20 |
| 52 | closed | "Response validation failed" on client.chat.create | 2025-07-26 |
| 45 | closed | Response missing from `/getdocuments` endpoint | 2025-06-16 |
| 31 | closed | agents.run returns empty response {} | 2025-05-26 |
| 29 | closed | client.agent run input validation issue | 2025-05-23 |

**Notable:** the one open issue (#104) asks for per-session model selection in the chat API — directly relevant to this project's 4.9.3 Model Selection - Flexibility field; confirms model choice isn't fully exposed in this SDK yet as of Feb 2026.

---

## gleanwork/api-client-python (13 issues, 8 open)

| # | State | Title | Created |
|---|---|---|---|
| 137 | open | Issue Obtaining Agent Schema | 2026-04-06 |
| 136 | open | upload_files()/upload_files_async() raises httpx.RequestNotRead | 2026-04-03 |
| 133 | open | Value model in AdditionalFieldDefinition is an empty class, thus silently drops all data | 2026-03-27 |
| 116 | closed | Missing CONTROL value in MessageType enum causing validation errors | 2026-02-13 |
| 115 | open | feat: Option to select model in glean chat api | 2026-02-12 |
| 105 | open | Model serialization drops keys | 2026-01-18 |
| 57 | open | PyCharm crash by Glean Python SDK | 2025-08-08 |
| 54 | closed | Issue with documentation | 2025-07-29 |
| 51 | closed | SDK rejects the server's response with a ValidationError on relatedDocument.0.relation | 2025-07-07 |
| 50 | open | `agents.retrieve` throwing 500 | 2025-07-02 |
| 49 | closed | glean.client.agents.retrieve(agent_id="<id>") returning 500 | 2025-07-02 |
| 47 | open | `AnswerLikes.likedBy` field validation error: Pydantic expects list but API returns null | 2025-06-15 |
| 44 | closed | CI Failures due to Upstream OpenAPI Spec Changes | 2025-06-11 |

**Notable:**
- #133 "silently drops all data" — a real, current data-integrity bug in the SDK's field-serialization layer.
- #50/#49: `agents.retrieve` throwing 500 has recurred (opened, closed, then reopened as #50) — consistent with the 500-on-write-op pattern we hit ourselves this session on the Indexing API (datasourceVisibility issue). Suggests 500s on edge-case/incomplete-config states are a recurring theme across Glean's APIs, not isolated to us.
- #115 mirrors #104 in the TS repo — same "let us pick the chat model" feature request, filed same day, still open in both SDKs as of the last pull.

---

## gleanwork/api-client-go (2 issues, 1 open)

| # | State | Title | Created |
|---|---|---|---|
| 84 | open | Debug endpoint returns an error despite successful API call | 2026-03-12 |
| 34 | closed | Glean Global Token Act-As support | 2025-09-18 |

**Notable:** #84 is directly relevant — "debug endpoint returns an error despite successful API call" is exactly the pattern we hit with the Indexing API (`debug/{datasource}/document` and `indexdocuments` both returning misleading errors on real successful writes). Confirms this is a known, recurring Glean-side response-shape issue, not something specific to our test setup.

---

## gleanwork/api-client-java (1 issue, 0 open)

| # | State | Title | Created |
|---|---|---|---|
| 30 | closed | New version in maven repository | 2025-07-23 |

---

## gleanwork/open-api (1 issue, 1 open)

| # | State | Title | Created |
|---|---|---|---|
| 79 | open | validate deployment steps 9..12 | 2026-01-14 |

Only issue on the spec repo itself — the specs we used this session (`indexing.yaml`, `client_rest.yaml`, `platform.yaml`) are otherwise unflagged.

---

## gleanwork/mcp-server (32 issues, 0 open — all closed)

| # | State | Title | Created | Labels |
|---|---|---|---|---|
| 360 | closed | @gleanwork/mcp-server-utils exports point to missing build files | 2026-06-09 | |
| 348 | closed | Security scan results for local-mcp-server - 90.1/100 | 2026-04-04 | |
| 347 | closed | Global token auth sends wrong header: X-Glean-Act-As instead of X-Glean-ActAs | 2026-03-12 | |
| 346 | closed | Your tool has been listed on the AEGIS Protocol skill registry | 2026-03-09 | |
| 345 | closed | [BUG] npx @gleanwork/local-mcp-server fails with EUNSUPPORTEDPROTOCOL for workspace:* | 2026-03-05 | bug |
| 341 | closed | [FEATURE] | 2026-02-22 | enhancement |
| 340 | closed | [FEATURE] | 2026-02-22 | enhancement |
| 339 | closed | [FEATURE] | 2026-02-22 | enhancement |
| 338 | closed | [FEATURE] | 2026-02-22 | enhancement |
| 337 | closed | [FEATURE] | 2026-02-22 | enhancement |
| 336 | closed | [FEATURE] | 2026-02-22 | enhancement |
| 335 | closed | [FEATURE] | 2026-02-22 | enhancement |
| 334 | closed | [FEATURE] | 2026-02-22 | enhancement |
| 333 | closed | [FEATURE] | 2026-02-22 | enhancement |
| 319 | closed | npm install fails: Unsupported workspace:* dependency in @gleanwork/local-mcp-server@0.9.0 | 2025-12-07 | |
| 318 | closed | Is ghcr.io/gleanwork/local-mcp-server a public container repository? | 2025-12-02 | |
| 271 | closed | [BUG] Docs link to nonexistent configuration README | 2025-09-05 | bug |
| 263 | closed | [BUG] GLEAN_ACT_AS header seems to be incorrect | 2025-08-19 | bug |
| 256 | closed | [BUG] Error installing @gleanwork/local-mcp-server@0.7.17 via NPM | 2025-08-08 | |
| 254 | closed | [FEATURE] Adopt provider-prefixed tool names for all exposed MCP tools | 2025-08-06 | enhancement |
| 222 | closed | Why are latest versions not published in npm? | 2025-07-08 | |
| 206 | closed | [FEATURE] claude-code project-specific mcp | 2025-06-24 | enhancement |
| 186 | closed | [BUG] Warnings in tests RE: requests without a request handler | 2025-06-18 | bug |
| 124 | closed | [FEATURE] add support for vscode MCP configuration via the configure command | 2025-05-20 | enhancement |
| 106 | closed | [FEATURE] Add ability to run via published docker image | 2025-05-14 | enhancement |
| 100 | closed | [FEATURE] | 2025-05-13 | enhancement |
| 83 | closed | [BUG] glean_chat fails but glean_search works | 2025-05-09 | bug |
| 82 | closed | Update docs re OAuth | 2025-05-09 | enhancement |
| 80 | closed | [BUG] Cant get glean chat to work on MCP. | 2025-05-09 | bug |
| 42 | closed | [FEATURE] Force overwriting MCP Server configuration | 2025-04-14 | enhancement |
| 21 | closed | [FEATURE] OAuth 2.1 Authorization Flow | 2025-03-27 | enhancement |
| 13 | closed | Tool call fails | 2025-03-21 | |

**Notable, directly relevant to our own setup:**
- **#347 and #263** — both about the `GLEAN_ACT_AS` / `X-Glean-ActAs` header being wrong or misnamed (`X-Glean-Act-As` vs `X-Glean-ActAs`). We have `GLEAN_ACT_AS` in our own `.env.example` — worth double-checking the exact header casing/name our scripts send matches Glean's actual expected header, since this has bitten other integrators twice.
- **#345 / #319** — recurring `workspace:*` / npm install failures on `@gleanwork/local-mcp-server`, unrelated to `@gleanwork/api-client` (the package we use), but shows Glean's own npm packaging has had repeat issues.
- All 32 are closed — mcp-server repo is actively maintained, turnaround looks fast (no long-open bugs).

---

## Takeaways for this project

1. **The 500-on-successful-write pattern is not unique to us.** api-client-go #84 and api-client-python #50/#49 both describe Glean APIs returning error-shaped responses for operations that actually succeeded — same category as our Indexing API `datasourceVisibility: NOT_ENABLED` finding. This is a known, recurring class of Glean-side response bug across multiple API surfaces, strengthening confidence in our own finding rather than it being a fluke of our test setup.
2. **Model-selection-in-chat is a genuinely open gap**, confirmed independently by both TS (#104) and Python (#115) SDK users, filed the same day — matches our own 4.9.3 Model Selection - Flexibility field notes.
3. **`X-Glean-ActAs` header naming has tripped up two other integrators** (#347, #263) — worth a sanity check on our `GLEAN_ACT_AS` env var usage if we ever exercise act-as testing.
4. No critical open security issues found in any repo; `open-api` spec repo itself has only one open, unrelated issue (deployment-steps validation), so the specs we relied on this session are not currently flagged as broken.
