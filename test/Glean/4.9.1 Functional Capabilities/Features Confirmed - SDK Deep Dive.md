# 4.9.1 Features Confirmed — SDK Deep Dive Admin Test Guide

**Purpose:** Hands-on tenant/API verification for all 65 re-verified features in the companion research doc [Features Confirmed - SDK Deep Dive.md](../../../Glean/Combined/4.9.1%20Functional%20Capabilities/Features%20Confirmed%20-%20SDK%20Deep%20Dive.md). This guide upgrades any `Confirmed-Local-Only`, `Confirmed-Live-Only`, or `Unverifiable` item to fully `Tested` against a live tenant, and re-confirms everything else.

**Tenant entry:** `https://app.glean.com` → Admin Console
**Companion research doc:** [Features Confirmed - SDK Deep Dive.md](../../../Glean/Combined/4.9.1%20Functional%20Capabilities/Features%20Confirmed%20-%20SDK%20Deep%20Dive.md)
**Related guide (broader Field 1 sweep):** [Features Confirmed.md](Features%20Confirmed.md) · **Section pre-flight:** [Pre-Flight.md](Pre-Flight.md)

**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.
**Out of scope for UI walkthroughs (API/SDK-only checks still apply where noted):** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery, GitHub.

---

## 0. Pre-Flight (do once — same setup as the main Admin Test Guide)

1. Login `https://app.glean.com` → Admin Console. Confirm access to **Platform**, **Assistant**, **Users & permissions**, **Glean Protect**, **Management**, **About Glean**.
2. Copy **Server instance URL** from **Admin Console → About Glean** (e.g. `https://<instance>-be.glean.com`) — needed for every API/curl step below.
3. Generate a **user-scoped API token** (Admin → developer/API settings) and, separately, a **Glean-issued (service) token** for `X-Glean-ActAs` tests.
4. Identities: **Admin A** (Super Admin), **User B** (Member, no special access — permission-negative tests), **User C** (Member, optional).
5. Test content pack (reuse from main guide, add items marked *new for this guide*):
   - Private OneDrive/Drive file, owner-only: `FY27_Exec_Compensation.xlsx`
   - Shared: `Stratos_Connector_Test_Doc` (Google Doc), `Stratos_Connector_Test_Sheet` (Sheet), `Exhibit_A_SOW_Stratos.pdf`
   - Notion page shared with Glean integration, same project name
   - Gmail + Outlook messages, Teams channel message referencing the project name
   - *New:* a second Notion page **not yet shared** with the integration (for #5/#9 federated vs. indexed contrast, and #2/#42 MCP checks)
   - *New:* a Jira or Salesforce sandbox login if available (Actions/action-pack checks, #44) — otherwise mark those steps `Blocked (no sandbox)`

**Scorecard for every row below:** `Pass | Fail | Partial | Blocked` + latency/trace-ID + notes → paste into the research doc's per-item Confidence column (upgrade to `Tested`).

---

## Section 1 — Search & Retrieval (items #1–#9)

| # | Feature | Test Step | Result | Notes |
|---|---|---|---|---|
| 1 | Hybrid search (semantic+BM25) | Search an exact phrase from `Stratos_Connector_Test_Doc`, then search a paraphrase/synonym of the same phrase. Both should return the doc. | | Exact-match-only = keyword-only, not hybrid |
| 2 | AI-powered relevance ranking | Search a common term appearing in 3+ test docs; confirm the most-recently-edited/most-relevant one ranks first, not just alphabetical/oldest | | |
| 3 | Faceted filtering | In Search UI, apply a source/app filter (e.g. "Google Drive only") and a date filter; confirm result set narrows correctly | | Or via API: `facet_filters` on `app`/`type`/`last_updated_at` |
| 4 | Autocomplete / search suggestions | Type first 4–5 characters of a test doc title into the search bar; confirm suggestion dropdown appears before pressing Enter | | Or `curl .../autocomplete` |
| 5 | Federated search (multi-instance) | **API-only:** call `search.query()` against two different `server_url`s (prod + sandbox instance, if a second tenant exists) with the same query; confirm both return independently. If only one tenant available, mark `Blocked (single-tenant)` and instead verify the code path compiles against the SDK sample. | | See research doc #5 caveat on overloaded term |
| 6 | Click-feedback loop | Run a search, click a result, then `POST /rest/api/v1/feedback` with that result's `tracking_token` and `event: CLICK` via curl/SDK; confirm `200 OK` | | |
| 7 | Permission-aware retrieval | As **User B** (no access to `FY27_Exec_Compensation.xlsx`), search its unique content string — expect zero hits. As owner, same search — expect a hit. | | Core ACL test — do not skip |
| 8 | Knowledge Graph | Open **People** page, search a known colleague; confirm related docs/activity/expertise surface (not just a directory entry) | | |
| 9 | Real-time / Live Mode indexing | Edit a test doc, then immediately re-search the new content. Note the lag. For O365 connectors, check **Admin → Connectors → SharePoint/OneDrive → Live Mode** toggle state. | | Live Mode ≠ instant for all connectors — record actual lag |

## Section 2 — AI / LLM Capabilities (items #10–#19)

| # | Feature | Test Step | Result | Notes |
|---|---|---|---|---|
| 10 | Multi-model support | **Admin → Platform → Models (Model Hub)** — list all enabled providers/models; confirm ≥2 distinct providers (e.g. OpenAI + Anthropic or + Gemini) present | | |
| 11 | Model Hub / LLM routing (existence) | Run a trivial chat (`"What is today's date?"`) and a complex chat (long SOW analysis); check usage/token dashboard for which model served each | | Routing *logic* itself stays unconfirmed if dashboard doesn't expose it |
| 12 | Guardrails | In **Admin → Glean Protect**, locate topic-restriction/content policy settings; attempt a chat prompt that should trip a configured policy (if any is enabled) and confirm a block/warning | | |
| 13 | Citation generation / grounding | Ask Assistant to summarize `Stratos_Connector_Test_Doc`; confirm inline citation links back to the exact source doc | | |
| 14 | Tool calling / function calling | Trigger an agent/chat action that calls an external tool (e.g. "create a Google Doc from this summary"); confirm a tool-call step is visible in the trace | | |
| 15 | RAG implementation | Same as #13 — confirm the answer text is grounded in retrieved content, not a hallucinated summary (spot-check one fact against the source doc) | | |
| 16 | Workflow engine (agent-side) | In Agent Builder, create a Workflow-mode agent with 2+ ordered steps; run it; confirm steps execute in order | | |
| 17 | Explainability (citation-based) | Same as #13 — confirm this is the extent of "explainability" (no separate decision-log UI should be expected) | | |
| 18 | Streaming chat responses | Call `/rest/api/v1/chat/stream` (or SDK `create_stream`) via curl/SDK; confirm chunked/SSE response instead of single blocking reply | | |
| 19 | Agent memory (session-level) | Send 2 chat messages with the same `chat_id`; confirm the 2nd response references context from the 1st (e.g. "as I mentioned above"). Then start a **new** chat_id and confirm no memory carries over. | | Confirms session-only, not long-term |

## Section 3 — Agents & Automation (items #20–#26)

| # | Feature | Test Step | Result | Notes |
|---|---|---|---|---|
| 20 | No-code Agent Builder UI | Open **Agents → Agent Builder**; create a simple agent purely through UI forms (no code) | | |
| 21 | Code-based Agents API | Via curl/SDK: `create_agent`, `get_agent`, `edit_agent` (draft), `search_agents` — confirm each returns expected status codes | | |
| 22 | Cross-framework Agent Toolkit | `pip install glean-agent-toolkit[langchain]` (or `[crewai]`/`[openai]`) in a scratch venv; import `search.as_langchain_tool()`; confirm no import errors | | |
| 23 | Direct API Integration path | Build a minimal custom script calling Agents API directly (no toolkit/framework) to run an existing agent | | |
| 24 | NVIDIA NIM integration example | Read-through check only (no NIM sandbox expected): confirm the official example guide's code is internally consistent/runnable against the current SDK version | | Mark `Blocked (no NIM env)` if no infra |
| 25 | Formal Agent Specification | Draft one agent's instructions following the spec guide's conventions (role statement, ordered steps); confirm Agent Builder accepts it without validation errors | | |
| 26 | Webhook / Triggers system | Call `platform-trigger-presets-list` with header `X-Glean-Include-Experimental: true`; confirm preset list returns. Retry **without** the header; confirm it 404s/is hidden. | | Confirms experimental-flag gating |

## Section 4 — APIs & Developer Platform (items #27–#35)

| # | Feature | Test Step | Result | Notes |
|---|---|---|---|---|
| 27 | Three REST APIs | Call one endpoint each from Client API (`/rest/api/v1/search`), Platform API (`/api/agents/search`), and Indexing API (`/api/index/v1/...`); confirm all three respond (even if 401 without proper token — proves the surface exists) | | |
| 28 | "Skills" API resource | Call `platform-skills-list`; confirm a (possibly empty) skills array returns, not a 404 | | |
| 29 | OAuth2 + API key auth | Call the same endpoint once with a Glean-issued API token, once via OAuth bearer token; confirm both succeed | | |
| 30 | Documented rate limiting | Fire ~35 requests/minute at `/search` (exceeding the 30 qpm doc'd limit) from a scratch script; confirm a `429` appears with backoff-friendly headers | | Stop on sustained 429 — see Safety Rules |
| 31 | Typed error handling | Force a `422` (e.g. call an agent tool requiring OAuth the test user hasn't granted) via SDK; confirm the exception object exposes `.status_code` / `.raw_response`, not just a generic string | | |
| 32 | Bulk indexing endpoints | Call the Indexing API's bulk-index/bulk-shortcut endpoint with 2–3 dummy documents against a test datasource; confirm batch acceptance | | Use a disposable custom datasource — do not touch prod indices |
| 33 | Pagination (cursor-based) | Call `search.query()` with `page_size=1` across 3+ pages using the returned `cursor`; confirm no duplicate/skipped results | | |
| 34 | Deprecation policy + changelog | Call an endpoint with `include_experimental`/`exclude_deprecated_after` params set; confirm behavior changes vs. the default call | | |
| 35 | SDK release cadence | `pip install --upgrade glean-api-client` in a scratch venv; confirm the installed version matches the latest PyPI release found live (re-check exact version against [pypi.org/project/glean-api-client](https://pypi.org/project/glean-api-client/)) | | Note beta status — pin in real projects |

## Section 5 — Connectors & Integrations (items #36–#44)

| # | Feature | Test Step | Result | Notes |
|---|---|---|---|---|
| 36 | 275+ connectors (current) | **Admin → Platform → Connectors → Add connector** — open the full catalog list and spot-count/scroll to confirm the catalog is materially larger than 100 (rough visual confirmation, not exact count) | | Research doc already confirms 275+ live; this is a tenant-side sanity check |
| 37 | Salesforce/M365/Teams/Outlook/Google Workspace/Slack | Confirm each in-scope connector (Teams, Outlook, OneDrive, Gmail, Drive) shows **Healthy** status; for out-of-scope (Salesforce/Slack) just confirm they exist in the catalog list even if not connected | | |
| 38 | Jira/Confluence/GitHub/Zendesk/ServiceNow | Confirm presence in connector catalog (existence only — out of tenant test-stack scope for a live connect) | | |
| 39 | Snowflake/Databricks/Box/Dropbox/Notion | Confirm Notion connector **Healthy**; confirm others present in catalog | | |
| 40 | Open-source Indexing SDK | `pip install glean-indexing-sdk` (or equivalent) in a scratch venv; walk through the quickstart to push one dummy document to a disposable custom datasource | | |
| 41 | MCP client (gateway, ~178 servers) | **Admin → Platform → MCP → External MCP servers** — open the supported-servers picker; confirm the live count roughly matches the ~176–178 range found in research, and spot-connect one (e.g. Atlassian or GitHub) via the gateway | | |
| 42 | MCP server (Glean hosts its own) | Add Glean's MCP server URL to Cursor/Claude Desktop `mcpServers` config; prompt `"Search Glean for our onboarding guide"`; confirm tenant-grounded (not generic) answer returns | | Dual-direction MCP: this tests the "Glean as MCP server" half; #41 tests "Glean as MCP client" half |
| 43 | LangChain integration | Same as Section 3 #22 — reuse that test; additionally confirm the Agents API's LangChain Agent Protocol compatibility by pointing a generic LangChain-protocol client at `/rest/api/v1/agents` | | |
| 44 | 12 first-party action packs | **Admin → Platform → Actions** — list all configured action packs; count and compare against the "first-party 12" list (Jira, Confluence, Salesforce, Slack, GitHub, Zendesk, Google Workspace, Microsoft 365, Snowflake, Databricks, Calendar Search, Code Writer) vs. the full catalog (which research found is larger). Enable one write action (e.g. Google Docs) end-to-end: ask Assistant to draft a doc, confirm human-in-the-loop confirmation prompt appears before it executes. | | Confirms both the count caveat AND the write-confirmation UX from the research doc's "newly-found" section |

## Section 6 — Security, Compliance & Governance (items #45–#58)

| # | Feature | Test Step | Result | Notes |
|---|---|---|---|---|
| 45 | SOC 2 Type II | Request the SOC 2 report via `trust.glean.com` (Trust Portal, requires NDA) — log whether access was grantable within the engagement, not the report contents | | Cannot be tenant-tested; procurement/legal action item |
| 46 | ISO 27001 | Same Trust Portal request pattern as #45 | | |
| 47 | ISO 42001 (AI Management) | Same Trust Portal request pattern as #45 | | |
| 48 | HIPAA + BAA availability | Ask Glean account team directly for a BAA draft; log whether one was produced | | Procurement action item, not a UI test |
| 49 | FedRAMP (in progress) vs. TX-RAMP | **Do not** rely on marketing claims — ask the Glean account team directly: "What is your current FedRAMP status, and is TX-RAMP Level 2 your only current government-adjacent certification?" Log the verbatim answer. | | Research doc found TX-RAMP ≠ FedRAMP — verify this distinction is understood by the sales/security team you're working with |
| 50 | GDPR / PCI DSS | Ask account team to confirm PCI DSS status explicitly (research found no public PCI DSS badge — likely N/A for a non-payment-processing product, but get it in writing) | | |
| 51 | Encryption at rest & in transit | Ask Trust Portal / security team for the specific encryption standards (e.g. AES-256, TLS 1.2+) in writing | | |
| 52 | RBAC | **Admin → Users & permissions → User roles** — confirm at least 2 distinct roles exist (Admin, Member) and that a Member cannot access Admin Console pages | | |
| 53 | SSO support | **Admin → Users & permissions → SSO** — confirm Okta or SAML config screen is present and (if you have a test IdP) walk through one login | | |
| 54 | SIEM integration, DLP | **Admin → Management → Audit logs** — confirm CSV export works and check for a SIEM-streaming config option. For DLP: check **Admin → Glean Protect → Sensitive findings** for any populated findings | | |
| 55 | Data residency options | Ask account team which region(s) your tenant is hosted in and whether alternate regions are available | | |
| 56 | Customer-managed encryption keys | Ask account team if CMEK is available for your deployment tier/plan | | Often Enterprise-tier-only |
| 57 | Zero Trust architecture | **Downgraded in research** — do not accept "Zero Trust" as a Glean-branded term. Instead verify the three actual named principles (permission mirroring, centralized administration, traceability) via a live walkthrough: confirm #7's ACL test, confirm Admin Console is the single control plane, confirm audit logs capture the actions taken during this test session. | | |
| 58 | Glean Protect / AWARE framework | **Admin → Glean Protect** — walk through sensitive-content findings, topic restrictions, and agent guardrail settings screens; confirm they are live, configurable pages (not "coming soon" placeholders) | | |

## Section 7 — Architecture & Infrastructure (items #59–#65)

| # | Feature | Test Step | Result | Notes |
|---|---|---|---|---|
| 59 | Documented end-to-end architecture | Documentation review only — no tenant UI exposes internal pipeline. Confirm the security architecture doc tree (ingestion/processing/query) is still live at `docs.glean.com/security/architecture/`. | | |
| 60 | Connector framework | Documentation review — confirm `developers.glean.com` Indexing SDK's architecture/connector-types pages are still live | | |
| 61 | Inference infra (AWS Bedrock path) | Ask account team if your specific deployment uses AWS Bedrock, and whether a current (non-2023) architecture reference exists | | Flagged as dated in research — worth a direct question |
| 62 | Document processing pipeline (OCR/multimodal) | Upload a scanned-image PDF and a native PDF with the same text to a test connector; search for unique text; confirm whether OCR extraction actually works (this is the specific unconfirmed sub-claim) | | This directly tests the still-open gap noted in research |
| 63 | Caching layer | Run the identical search query twice in quick succession; compare latency (2nd call should be faster if server-side caching exists) — note this only tests observable behavior, not internals | | |
| 64 | Multi/single-tenant/customer-hosted options | Ask account team to confirm which deployment model your contract uses, and whether alternates were offered during procurement | | |
| 65 | SSO & identity (Okta, Microsoft) | Same as #53 — additionally confirm SAML config screen explicitly supports Microsoft Entra ID/ADFS metadata upload | | |

---

## Result Rollup

After completing all sections, copy the Pass/Fail/Partial/Blocked tally back into [Features Confirmed - SDK Deep Dive.md](../../../Glean/Combined/4.9.1%20Functional%20Capabilities/Features%20Confirmed%20-%20SDK%20Deep%20Dive.md) by upgrading each row's Confidence tag:

- `Pass` → append `+ Tested (tenant, 2026-XX-XX)` to the existing tag
- `Fail` → move the item to a new "Regressed on live tenant" note; do not silently delete from the 65-count
- `Partial`/`Blocked` → keep existing tag, add the blocker reason (e.g. "no NIM sandbox", "Trust Portal NDA required")

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Search & Retrieval | 9 | | | | |
| 2. AI/LLM | 10 | | | | |
| 3. Agents & Automation | 7 | | | | |
| 4. APIs & Dev Platform | 9 | | | | |
| 5. Connectors & Integrations | 9 | | | | |
| 6. Security/Compliance/Governance | 14 | | | | |
| 7. Architecture & Infrastructure | 7 | | | | |
| **Total** | **65** | | | | |

---

## Safety Rules

1. Do not exceed the documented rate limit (30 qpm search token-bucket) intentionally beyond one controlled 429-trigger test (#30) — stop on first sustained 429.
2. Use disposable custom datasources for bulk-indexing tests (#32, #40) — never point at production indices.
3. Do not share the private ACL test file (`FY27_Exec_Compensation.xlsx`) beyond the intended owner — this breaks #7 and #57's negative test.
4. `X-Glean-ActAs` and Glean-issued service tokens are break-glass credentials — store in a secrets manager, never commit.
5. Security/compliance items #45–#51, #55–#56, #61, #64 are **procurement/account-team questions**, not self-serve UI tests — route them accordingly and log the answers as evidence, not as a UI pass/fail.
6. Section 6 items requiring Trust Portal access need an NDA — confirm this is in place before the engagement, or expect those rows to stay `Blocked`.
