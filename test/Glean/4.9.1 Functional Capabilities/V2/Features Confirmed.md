# 4.9.1 Features Confirmed — Independent Research Test Guide

**Purpose:** Hands-on tenant verification of every claim in the companion research doc [V2/Features Confirmed.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Features%20Confirmed.md). All 49 claims there are doc-sourced only, publicly readable, no login — this guide upgrades each to `Tested` against a live tenant, using the real in-scope test stack so any tester can reproduce every step exactly. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** `https://app.glean.com` (regular use) · Admin Console for anything under Security/AI-LLM/Architecture sections · a terminal with `curl`/Python and an API token for developer-platform checks
**Companion research doc:** [V2/Features Confirmed.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Features%20Confirmed.md)
**Base field doc (untouched, original):** [../Features Confirmed.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/Features%20Confirmed.md)

**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.
**Out of scope for this eval:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery/Databricks, GitHub, etc.

**Prerequisites (complete [Pre-Flight](../Pre-Flight.md) once, reuse for every row below):**
- **Identities:** Admin A (you, Admin/Super Admin), User B (Member, no special access, and specifically **no** access to `FY27_Exec_Compensation.xlsx`), User C (Member, optional).
- **Standard test content pack**, all referencing the same project name so cross-source search actually finds them together:
  - `Stratos_Connector_Test_Doc` (Google Doc) + `Stratos_Connector_Test_Sheet` (Google Sheet), in a shared Google Drive folder
  - `Exhibit_A_SOW_Stratos.pdf`, same shared Drive folder
  - `FY27_Exec_Compensation.xlsx` — private, owner-only (Admin A), in OneDrive or Google Drive, **not shared with anyone**
  - A Notion page with the project name, **shared with the Glean Notion integration**
  - A Gmail message and an Outlook message, both with the project name in the subject line
  - A Microsoft Teams channel message referencing the project name
- All 8 in-scope connectors (Notion, Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets) showing **Healthy** in **Admin Console → Platform → Connectors** before you start.
- A Glean API token + terminal (Python or `curl`) for Sr No 5, 7-8, 16, 20-27.
- Python 3.10+ scratch venv for Sr No 17, 19, 21, 26.

**Sr No mapping:** Sr No 1-49 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Features Confirmed.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Features%20Confirmed.md#search--retrieval--sr-no-1-8).

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed in your own tenant — not that the public docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (routine UI/search use, quick to judge) or `Hard` (needs terminal/API work, admin access, or multi-step setup) — so you can plan which rows to tackle first.

---

## Section 1 — Search & Retrieval — Sr No 1-8

| Sr No | Feature | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Relevance ranking | 1. In Glean Search, type the shared project name (present in `Stratos_Connector_Test_Doc`, the Notion page, and the Teams message).<br>2. Look at which result appears first. | The most recently edited/most textually relevant item (typically `Stratos_Connector_Test_Doc`) ranks first — not simply alphabetical or oldest-first. | | | ~10 min, Easy |
| 2 | Faceted filtering | 1. Search the project name.<br>2. Apply a source filter for "Google Drive" only — confirm only Drive items (the Doc, Sheet, PDF) remain.<br>3. Clear it and apply a date filter instead. | Filtered result set correctly narrows to just the chosen facet each time. | | | ~10 min, Easy |
| 3 | Autocomplete | 1. In the search bar, type just the first 5-6 characters of "Stratos_Connector_Test_Doc" (e.g. "Strat").<br>2. Watch for a suggestion dropdown before pressing Enter. | A suggestion dropdown appears, listing `Stratos_Connector_Test_Doc` (and/or the Sheet) before you finish typing. | | | ~5 min, Easy |
| 4 | Federated search (multi-instance) | 1. If a second Glean tenant/instance is available to you, run the same project-name search against both instances via the Search API (`server_url` pointed at each).<br>2. Confirm both return results independently. | Both instances return results independently. | | Mark `Blocked (single-tenant)` if no second instance exists — this is expected for most evaluations | ~15 min, Hard (needs a second tenant) |
| 5 | Click-feedback loop | 1. Search the project name and click the `Stratos_Connector_Test_Doc` result.<br>2. Using your API token, call `POST /rest/api/v1/feedback` with that result's `trackingToken` and a `CLICK` event.<br>3. Confirm a `200 OK` response. | Feedback call succeeds with `200 OK`, confirming the click-tracking mechanism is live. | | | ~15 min, Hard (needs API access) |
| 6 | Permission-aware retrieval | 1. As **Admin A** (owner of `FY27_Exec_Compensation.xlsx`), search its unique content (e.g. a specific number or phrase from inside the file) — expect a hit.<br>2. As **User B** (no access), run the identical search — expect zero hits. | Admin A gets a hit; User B gets none. This is the core ACL test — do not skip it. | | | ~15 min, Easy |
| 7 | Cursor-based pagination | 1. Using the Search API, query the project name with a small `page_size` (e.g. 2) across the Doc, Sheet, PDF, Notion page, Gmail, Outlook, and Teams message (7 items).<br>2. Page through using the returned `cursor` until `has_more_results` is false.<br>3. Confirm no item appears twice and none are skipped. | Clean pagination across all pages — every one of the 7 items appears exactly once. | | | ~15 min, Hard (needs API access) |
| 8 | Rate-limit handling | 1. In a script, fire repeated Search API calls for the project name in a tight loop.<br>2. Stop as soon as you receive a `429`.<br>3. Confirm the response includes retry-friendly headers, not a raw crash. | A graceful `429` with usable retry information, not an unhandled failure. | | Stop immediately after confirming one `429` — don't sustain the burst | ~15 min, Hard (needs API access) |

## Section 2 — AI / LLM Capabilities — Sr No 9-14

| Sr No | Feature | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 9 | Model Hub multi-model support | 1. Go to **Admin Console → Platform → Models**.<br>2. Confirm at least 2 distinct providers (e.g. OpenAI + Anthropic, or + Google) are listed as available. | 2+ distinct providers present in your tenant's Model Hub. | | | ~10 min, Easy |
| 10 | Universal Key vs. BYOK | 1. In the same Model Hub settings, find which key type your tenant uses (Universal Model Key or a Customer Key).<br>2. Confirm this is clearly identifiable in the admin UI. | Key type is visible and identifiable, not hidden or ambiguous. | | | ~10 min, Easy |
| 11 | Regional governance of open models | 1. If on Universal Key, look for a region-based control on open-model availability in Model Hub settings.<br>2. Toggle it and confirm the list of selectable models changes. | Region control present and functional (Universal Key tenants only). | | Mark `Blocked` if on Customer Key | ~15 min, Hard |
| 12 | Protect / Protect+ tiers | 1. Go to **Admin Console → Glean Protect**.<br>2. Confirm which tier (base Protect or Protect+) your tenant has, based on which policy categories are visible. | Tier is clearly identifiable from what's shown/hidden in the Protect console. | | | ~10 min, Easy |
| 13 | Multiple model categories | 1. In Model Hub, confirm at least one text-generation model and one image-generation model both appear. | Both categories present in the catalog. | | | ~10 min, Easy |
| 14 | Glean's own model in the catalog | 1. In Model Hub, look for Glean's own proprietary model (may be labeled distinctly from third-party entries).<br>2. Confirm it's listed in the same view, not a separate screen. | Listed alongside third-party models in the same catalog view. | | | ~5 min, Easy |

## Section 3 — Agents & Automation — Sr No 15-19

| Sr No | Feature | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 15 | No-code Agent Builder | 1. Open **Agents → Agent Builder → Create new agent**.<br>2. Build a simple agent purely through UI forms (no code) that summarizes `Stratos_Connector_Test_Doc` and posts the summary as a reply in the Teams channel.<br>3. Run it and confirm it works end to end. | Agent created and run successfully without writing any code. | | | ~20 min, Easy |
| 16 | Direct API Integration | 1. Via `curl`/SDK (no framework installed), call the Agents API's `create_agent` endpoint to build an agent that reads `Stratos_Connector_Test_Sheet`.<br>2. Call `create-and-stream-run` to execute it.<br>3. Confirm a successful response containing real data from the Sheet. | Agent created and run successfully using only raw API calls. | | | ~20 min, Hard |
| 17 | LangChain integration | 1. In a scratch venv, `pip install glean-agent-toolkit[langchain]`.<br>2. Write a short script that uses the toolkit as a LangChain tool to search for `Stratos_Connector_Test_Doc`.<br>3. Run it and confirm real search results return (not a mock/stub). | No import errors, and a real result referencing the actual document comes back. | | | ~20 min, Hard |
| 18 | MCP integration | 1. In Cursor or Claude Desktop, add Glean's MCP server connection (URL/config from your admin).<br>2. Ask it: "Search Glean for Stratos_Connector_Test_Doc and summarize it."<br>3. Confirm the answer is grounded in the actual document content, not generic. | A real, tenant-specific answer referencing the document's actual content. | | | ~20 min, Hard |
| 19 | Agent Toolkit cross-framework | 1. Repeat Sr No 17's steps, but install `glean-agent-toolkit[crewai]` instead of `[langchain]`.<br>2. Use the same underlying retrieval tool to search `Stratos_Connector_Test_Doc` under CrewAI instead. | The same retrieval tool works correctly under this second, different framework. | | | ~15 min, Hard |

## Section 4 — APIs & Developer Platform — Sr No 20-27

| Sr No | Feature | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 20 | Three REST API surfaces | 1. Call `/rest/api/v1/search` (Client API) for the project name.<br>2. Call an agent endpoint under the Platform API.<br>3. Call an Indexing API endpoint (even if it 401s without the right token — that still proves the surface exists). | All three respond (success or an expected auth error) — no surface is missing entirely. | | | ~20 min, Hard |
| 21 | Python SDK | 1. In a scratch venv, `pip install glean-api-client`.<br>2. Write a 5-line script that searches for `Stratos_Connector_Test_Sheet` and prints the top result title. | Installs cleanly, imports cleanly, and prints the correct title. | | | ~10 min, Hard |
| 22 | TypeScript/JS SDK | 1. In a scratch Node project, `npm install @gleanwork/api-client`.<br>2. Write a short script that searches for `Stratos_Connector_Test_Doc`. | Installs cleanly, returns the correct document. | | | ~10 min, Hard |
| 23 | Java SDK | 1. Add `com.glean.api-client` to a scratch Maven/Gradle project.<br>2. Confirm the dependency resolves and a minimal search call compiles. | Dependency resolves, code compiles. | | | ~15 min, Hard |
| 24 | **Go SDK (newly found)** | 1. `go get github.com/gleanwork/api-client-go` in a scratch module.<br>2. Write a minimal client call searching for `Stratos_Connector_Test_Doc`.<br>3. Confirm it compiles and returns real data. | Module resolves, compiles, returns the correct document. | | This SDK wasn't in earlier catalogues — worth confirming it's genuinely usable, not just listed | ~15 min, Hard |
| 25 | Web SDK | 1. In a scratch frontend app, install `@gleanwork/web-sdk`.<br>2. Mount a `renderSearchBox` component pointed at your tenant's backend URL.<br>3. Search for the project name in the embedded box. | Component renders and returns real search results from your tenant. | | | ~20 min, Hard |
| 26 | Indexing SDK | 1. Walk through the Indexing SDK quickstart in a scratch venv.<br>2. Push one dummy document (not part of the real test pack) to a disposable custom datasource.<br>3. Confirm it becomes searchable. | Dummy document indexed and searchable. | | Use a disposable datasource — do not touch the real connectors/indices | ~25 min, Hard |
| 27 | Remote MCP server for coding assistants | 1. Add Glean's MCP server to Cursor or Claude Code.<br>2. Ask: "Search Glean for Stratos_Connector_Test_Doc." | Tenant-grounded answer, matching Sr No 18's result. | | Same underlying capability as Sr No 18 — reuse if already tested | ~15 min, Hard (or ~0 min if reused) |

## Section 5 — Connectors & Integrations — Sr No 28-30

| Sr No | Feature | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 28 | 275+ connectors | 1. Go to **Admin Console → Platform → Connectors → Add connector**.<br>2. Scroll through the full catalog and estimate the total count (rough visual confirmation, not exact). | Catalog is visibly, materially larger than 100 entries. | | | ~10 min, Easy |
| 29 | All 8 in-scope connectors are healthy | 1. In **Admin Console → Platform → Connectors**, check the status of Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, and Google Sheets. | All 8 show **Healthy** — this is the direct, tenant-specific version of "native connectors work." | | | ~10 min, Easy |
| 30 | Real-time sync + inherited permissions | 1. Edit `Stratos_Connector_Test_Doc` in Google Drive, adding a new unique sentence.<br>2. Search for that new sentence in Glean and note how long it takes to appear (this is the "real-time sync" claim).<br>3. Separately, share `FY27_Exec_Compensation.xlsx` with User B directly in OneDrive/Drive, wait for the next crawl, then confirm User B can now find it in Glean search (inherited-permission claim). | New content becomes searchable within the documented sync window; sharing in the source system correctly changes Glean-side visibility. | | | ~25 min, Hard (needs to wait for crawl) |

## Section 6 — Security, Compliance & Governance — Sr No 31-45

| Sr No | Feature | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 31 | SOC 2 Type II | 1. Request the report via Trust Portal (`trust.glean.com/resources`) — NDA likely required.<br>2. Note whether access was actually grantable. | Report requestable/grantable within the engagement. | | Procurement action item, not a UI test | ~15 min, Hard (external process) |
| 32 | ISO 27001 | Same Trust Portal request pattern as Sr No 31. | Same as above. | | | ~10 min, Hard |
| 33 | ISO 42001 | Same Trust Portal request pattern. | Same as above. | | | ~10 min, Hard |
| 34 | HIPAA | 1. Ask your account team for a BAA draft.<br>2. Confirm one is produced. | BAA draft produced. | | | ~15 min, Hard (external process) |
| 35 | GDPR | 1. Confirm the GDPR badge/statement on `glean.com/platform/security`.<br>2. Ask your account team to confirm applicability to your region. | Confirmed on the page and by your account team. | | | ~10 min, Easy |
| 36 | TX-RAMP Level 2 | 1. Confirm the TX-RAMP badge on the same security page.<br>2. Ask your account team whether this — not FedRAMP — is the current government-adjacent certification. | Confirmed TX-RAMP, not FedRAMP. | | | ~10 min, Easy |
| 37 | SSO-based identity verification | 1. Go to **Admin Console → Users & permissions → SSO**.<br>2. Confirm an SSO provider is configured.<br>3. Log out and log back in via SSO to test it. | SSO login succeeds. | | | ~15 min, Easy |
| 38 | Source-system permission enforcement | Same test as Sr No 6 (FY27_Exec_Compensation.xlsx, Admin A vs. User B) — reuse that result. | Same as Sr No 6. | | | ~0 min (reused) |
| 39 | Sensitive-content detection | 1. Go to **Admin Console → Glean Protect → Sensitive findings**.<br>2. Confirm the page is a live, configurable screen (not a placeholder). | Live, configurable screen with real settings. | | | ~10 min, Easy |
| 40 | Topic restrictions | 1. In the same Protect section, create a test topic-restriction policy (e.g. block discussion of a made-up sensitive topic).<br>2. Confirm it saves successfully. | Policy creation succeeds and persists. | | | ~15 min, Easy |
| 41 | Runtime threat protection | 1. Confirm the AI security policy category for prompt injection/malicious code/harmful content exists under Glean Protect. | Category present and configurable. | | | ~10 min, Easy |
| 42 | Action alignment | 1. Look for a policy/setting that checks agent actions against user intent/authority — distinct from a plain read/write permission check.<br>2. If found, review what it actually evaluates. | A genuinely distinct control is found, not just a rebadged permission check. | | | ~15 min, Hard |
| 43 | Prompt injection detection accuracy | 1. Open `glean.com/platform/security` and find the exact stated accuracy percentage for prompt injection detection. | Figure matches "96.9%" exactly as cited in research. | | Same check as the Prompt Engineering Access field's Sr No 7 — reuse if already done | ~10 min, Easy (or ~0 min if reused) |
| 44 | Always-on audit logging | 1. Go to **Admin Console → Management → Audit logs**.<br>2. Perform a distinctive test action (e.g. the Sr No 6 search, or editing a Protect policy from Sr No 40).<br>3. Confirm that exact action appears in the audit log shortly after. | Your own test action appears in the log, proving it captures real admin/user activity, not just a static demo. | | | ~15 min, Easy |
| 45 | "Zero Trust" absence check | 1. Open `docs.glean.com/security/security-principles`.<br>2. Use page-search (Ctrl/Cmd+F) for "Zero Trust" in the visible body text (not browser tab metadata). | Term does not appear in the visible body copy — confirms the finding rather than contradicts it. | | | ~10 min, Easy |

## Section 7 — Architecture & Infrastructure — Sr No 46-49

| Sr No | Feature | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 46 | Documented 3-stage pipeline | 1. Confirm the ingestion/processing/query architecture doc tree is live at `docs.glean.com/security/architecture/`. | Doc tree live, matching the 3 documented stages. | | | ~10 min, Easy |
| 47 | MCP context provisioning is "upcoming," not live | 1. Ask your account team directly whether MCP-based context provisioning (as a data-ingestion path, distinct from the MCP client/server integrations tested in Sr No 18/27) is available today in your tenant. | Account team confirms it's not yet available — matches the "upcoming feature" label found in research. | | | ~10 min active + wait for reply, Easy |
| 48 | **Correction: no structured warehouse ingestion** | 1. Ask your account team, in writing, to confirm whether any structured data (e.g. from a data warehouse) is ever ingested/indexed the same way `Stratos_Connector_Test_Sheet` is, or whether warehouse-type systems are only ever accessed via action-pack/tool calls at query time. | Account team confirms no structured-data indexing occurs the way it does for the in-scope connectors. | | This directly tests the correction found in research — get it in writing | ~10 min active + wait for reply, Easy |
| 49 | Per-tenant dedicated cloud project | 1. Ask your account team to confirm your tenant's connectors (Notion, Teams, Outlook, OneDrive, Gmail, Drive, Docs, Sheets) run inside a cloud project dedicated to your tenant, not a project shared with other Glean customers. | Confirmed dedicated, not shared. | | | ~10 min active + wait for reply, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Features Confirmed.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Features%20Confirmed.md): for each `Pass` row, append `+ Tested (tenant, 2026-XX-XX)` to that row's Confirmation Detail cell; for anything else, add a short note on what blocked it or what actually happened instead.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Search & Retrieval | 8 | | | | |
| 2. AI / LLM Capabilities | 6 | | | | |
| 3. Agents & Automation | 5 | | | | |
| 4. APIs & Developer Platform | 8 | | | | |
| 5. Connectors & Integrations | 3 | | | | |
| 6. Security, Compliance & Governance | 15 | | | | |
| 7. Architecture & Infrastructure | 4 | | | | |
