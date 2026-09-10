# 4.9.1 Features Confirmed — Independent Research Test Guide

**Purpose:** Hands-on tenant verification of every claim in the companion research doc [V2/Features Confirmed.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Features%20Confirmed.md). All 49 claims there are doc-sourced only, publicly readable, no login — this guide upgrades each to `Tested` against a live tenant. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** `https://app.glean.com` (regular use) · Admin Console for anything under Security/AI-LLM/Architecture sections
**Companion research doc:** [V2/Features Confirmed.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Features%20Confirmed.md)
**Base field doc (untouched, original):** [../Features Confirmed.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/Features%20Confirmed.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Normal Glean Chat/Search access for Sr No 1-19.
- Admin access to the Admin Console (Models, Connectors, Glean Protect, Security) for Sr No 9-14, 28-49.
- A terminal with `curl`/Python and an API token for Sr No 20-27 (developer-platform checks).
- Two test documents in different source systems for Sr No 6, 30, 38 (permission/sync checks).

**Sr No mapping:** Sr No 1-49 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Features Confirmed.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Features%20Confirmed.md#search--retrieval--sr-no-1-8) — same number, same feature, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally saw it happen in your own tenant — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (routine UI/search use, quick to judge) or `Hard` (needs terminal/API work, admin access, or multi-step setup) — so you can plan which rows to tackle first.

---

## Section 1 — Search & Retrieval — Sr No 1-8

| Sr No | Feature | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Relevance ranking | Search a common term appearing in 3+ documents; confirm the most relevant/recent one ranks first, not just alphabetical order. | Most-relevant result ranks first. | | | ~10 min, Easy |
| 2 | Faceted filtering | In Search UI, apply a source/date filter and confirm the result set narrows correctly. | Filtered results match the chosen facet. | | | ~10 min, Easy |
| 3 | Autocomplete | Type the first 4-5 characters of a known document title into the search bar. | Suggestion dropdown appears before pressing Enter. | | | ~5 min, Easy |
| 4 | Federated search (multi-instance) | If a second Glean instance/tenant is available, run the same query against both and confirm both return independently. Otherwise mark `Blocked (single-tenant)`. | Both instances return results independently. | | | ~15 min, Hard (needs a second tenant) |
| 5 | Click-feedback loop | Click a search result, then check (via API/trace if visible) that a feedback event was recorded against its `trackingToken`. | A feedback/click event is recorded. | | | ~15 min, Hard (needs API/trace visibility) |
| 6 | Permission-aware retrieval | As a user with no access to a private test document, search its unique content — expect zero hits; as the owner, same search — expect a hit. | Non-owner gets no hits, owner does. | | Core ACL test — don't skip | ~15 min, Easy |
| 7 | Cursor-based pagination | Call search with a small page size across 3+ pages using the returned cursor; confirm no duplicate/skipped results. | Clean pagination, no dupes/gaps. | | | ~15 min, Hard (needs API access) |
| 8 | Rate-limit handling | Fire a burst of requests exceeding the documented rate limit; confirm a `429` with retry-friendly behavior, not a crash. | Graceful `429`, not an unhandled failure. | | Stop after confirming one `429` — don't sustain the burst | ~15 min, Hard (needs API access) |

## Section 2 — AI / LLM Capabilities — Sr No 9-14

| Sr No | Feature | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 9 | Model Hub multi-model support | **Admin Console → Platform → Models** — confirm multiple providers (OpenAI, Google, Anthropic, Amazon) are listed. | 2+ distinct providers present. | | | ~10 min, Easy |
| 10 | Universal Key vs. BYOK | Confirm which key type your tenant uses, and that the setting is visible/configurable in Model Hub settings. | Key type is identifiable in the admin UI. | | | ~10 min, Easy |
| 11 | Regional governance of open models | Look for a region-based control on open-model availability under Universal Key settings. | Region control is present (Universal Key tenants only). | | Mark `Blocked` if on Customer Key | ~15 min, Hard |
| 12 | Protect / Protect+ tiers | Confirm which tier (Protect vs Protect+) your tenant has under **Admin Console → Glean Protect**. | Tier is identifiable. | | | ~10 min, Easy |
| 13 | Multiple model categories | Confirm at least one text model and one image-generation model both appear in Model Hub. | Both categories present. | | | ~10 min, Easy |
| 14 | Glean's own model in the catalog | Confirm Glean's proprietary model appears as a normal Model Hub entry, not a separate screen. | Listed alongside third-party models. | | | ~5 min, Easy |

## Section 3 — Agents & Automation — Sr No 15-19

| Sr No | Feature | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 15 | No-code Agent Builder | Create a simple agent purely through UI forms, no code. | Agent created without writing code. | | | ~15 min, Easy |
| 16 | Direct API Integration | Via curl/SDK, call the Agents API directly to create/run a minimal agent, no framework. | Succeeds without any framework installed. | | | ~20 min, Hard |
| 17 | LangChain integration | `pip install glean-agent-toolkit[langchain]`; import and invoke as a LangChain tool. | No import errors, real results returned. | | | ~20 min, Hard |
| 18 | MCP integration | Add Glean's MCP server to Cursor/Claude Desktop; ask a tenant-specific question. | Tenant-grounded answer returned. | | | ~20 min, Hard |
| 19 | Agent Toolkit cross-framework | Repeat Sr No 17 with `[crewai]` or `[openai]` instead of `[langchain]`. | Same tool works under the second framework. | | | ~15 min, Hard |

## Section 4 — APIs & Developer Platform — Sr No 20-27

| Sr No | Feature | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 20 | Three REST API surfaces | Call one endpoint each from Client, Platform, and Indexing APIs; confirm all three respond (even a 401 proves the surface exists). | All 3 surfaces respond. | | | ~20 min, Hard |
| 21 | Python SDK | `pip install glean-api-client` in a scratch venv; confirm it installs and imports cleanly. | Clean install/import. | | | ~10 min, Hard |
| 22 | TypeScript/JS SDK | `npm install @gleanwork/api-client`; confirm clean install. | Clean install. | | | ~10 min, Hard |
| 23 | Java SDK | Add `com.glean.api-client` to a scratch Maven/Gradle project; confirm it resolves. | Dependency resolves. | | | ~15 min, Hard |
| 24 | **Go SDK (newly found)** | `go get github.com/gleanwork/api-client-go` in a scratch module; confirm it resolves. | Module resolves cleanly. | | This SDK wasn't in earlier catalogues — worth confirming it's genuinely usable, not just listed | ~15 min, Hard |
| 25 | Web SDK | Install `@gleanwork/web-sdk` in a scratch frontend app; mount a search box component. | Component renders and queries. | | | ~20 min, Hard |
| 26 | Indexing SDK | Walk through the Indexing SDK quickstart; push one dummy document to a disposable custom datasource. | Document indexed successfully. | | Use a disposable datasource — don't touch prod indices | ~25 min, Hard |
| 27 | Remote MCP server for coding assistants | Add Glean's MCP server to Cursor/Claude Code; confirm it connects and answers a tenant-specific query. | Tenant-grounded answer via MCP. | | Same underlying capability as Sr No 18 — reuse if already tested | ~15 min, Hard (or ~0 min if reused) |

## Section 5 — Connectors & Integrations — Sr No 28-30

| Sr No | Feature | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 28 | 275+ connectors | **Admin Console → Platform → Connectors → Add connector** — scroll/count to confirm the catalog is materially larger than 100. | Catalog visibly much larger than 100. | | Rough visual confirmation, not exact count | ~10 min, Easy |
| 29 | Named connector breadth | Confirm at least 3 of the named example connectors (e.g. GitHub, Gong, Asana) actually appear in the catalog. | 3+ named examples found. | | | ~10 min, Easy |
| 30 | Real-time sync + inherited permissions | Add/edit a test document in a connected source; confirm it appears in Glean search within the documented sync window, with the same permissions as the source. | Document appears, permissions match source. | | | ~20 min, Hard (needs a live connector + wait for sync) |

## Section 6 — Security, Compliance & Governance — Sr No 31-45

| Sr No | Feature | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 31 | SOC 2 Type II | Request the report via Trust Portal (NDA likely required) — confirm whether access was grantable. | Report requestable/grantable. | | Procurement action item, not a UI test | ~15 min, Hard (external process) |
| 32 | ISO 27001 | Same Trust Portal request pattern as Sr No 31. | Same as above. | | | ~10 min, Hard |
| 33 | ISO 42001 | Same Trust Portal request pattern. | Same as above. | | | ~10 min, Hard |
| 34 | HIPAA | Ask account team for a BAA draft; confirm one is produced. | BAA draft produced. | | | ~15 min, Hard (external process) |
| 35 | GDPR | Confirm GDPR badge/statement on the public security page and ask account team to confirm applicability to your region. | Confirmed on page + by account team. | | | ~10 min, Easy |
| 36 | TX-RAMP Level 2 | Confirm badge on public security page; ask account team whether this (not FedRAMP) is the current government-adjacent cert. | Confirmed TX-RAMP, not FedRAMP. | | | ~10 min, Easy |
| 37 | SSO-based identity verification | **Admin Console → Users & permissions → SSO** — confirm an SSO provider is configured and test one login. | Login via SSO succeeds. | | | ~15 min, Easy |
| 38 | Source-system permission enforcement | Same as Sr No 6 — reuse that result. | Same as Sr No 6. | | | ~0 min (reused) |
| 39 | Sensitive-content detection | **Admin Console → Glean Protect → Sensitive findings** — confirm the page is live/configurable, not a placeholder. | Live, configurable screen. | | | ~10 min, Easy |
| 40 | Topic restrictions | Same section — confirm a topic-restriction policy can be created. | Policy creation succeeds. | | | ~15 min, Easy |
| 41 | Runtime threat protection | Confirm the AI security policy category exists for prompt injection/malicious code/harmful content. | Category present. | | | ~10 min, Easy |
| 42 | Action alignment | Look for a policy or setting checking agent actions against user intent/authority, distinct from a plain permission check. | Distinct control found. | | | ~15 min, Hard |
| 43 | Prompt injection detection accuracy | Cross-check the 96.9% figure on the live security page — confirm it matches. | Figure matches exactly. | | Same check as Prompt Engineering Access field Sr No 7 — reuse if done | ~10 min, Easy (or ~0 min if reused) |
| 44 | Always-on audit logging | **Admin Console → Management → Audit logs** — confirm logs capture the actions taken during this test session. | Your own test actions appear in the log. | | | ~15 min, Easy |
| 45 | "Zero Trust" absence check | Search the security-principles page for "Zero Trust" in body copy (not meta/SEO tags). | Term absent from body copy. | | Confirms the finding rather than contradicts it | ~10 min, Easy |

## Section 7 — Architecture & Infrastructure — Sr No 46-49

| Sr No | Feature | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 46 | Documented 3-stage pipeline | Confirm the ingestion/processing/query architecture doc tree is live at `docs.glean.com/security/architecture/`. | Doc tree live and matches the 3 stages. | | | ~10 min, Easy |
| 47 | MCP context provisioning is "upcoming," not live | Ask your account team directly whether MCP-based context provisioning (as an ingestion path) is available today in your tenant. | Account team confirms it's not yet available. | | | ~10 min active + wait for reply, Easy |
| 48 | **Correction: no structured warehouse ingestion** | Ask your account team to confirm in writing whether Snowflake/Databricks data is ever ingested/indexed as structured data, or only accessed via action-pack/tool calls. | Account team confirms no structured-data indexing occurs. | | This directly tests the correction found in research — get it in writing | ~10 min active + wait for reply, Easy |
| 49 | Per-tenant dedicated cloud project | Ask your account team to confirm connectors run in your tenant's own dedicated cloud project, not a shared one. | Confirmed dedicated, not shared. | | | ~10 min active + wait for reply, Easy |

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
