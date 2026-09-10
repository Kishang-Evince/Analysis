**Glean Tier 3 Advanced Evaluation**
**Features Confirmed — Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-10 against `www.glean.com` and `developers.glean.com`. Field definition: "The validated list of core feature assertions made by the vendor." Base file at [`../Features Confirmed.md`](../Features%20Confirmed.md) left untouched — this replaces the prior V2 pass with a fresh, independently-sourced one, organized by category with Sr No mapping to the companion test guide.*

**Sr No mapping:** rows 1-49 below map 1:1 to the same Sr No in the companion test guide [test/V2/Features Confirmed.md](../../../../test/Glean/4.9.1%20Functional%20Capabilities/V2/Features%20Confirmed.md) — same number, same feature, doc-sourced here / tenant-tested there.

---

## Headline

49 distinct, freshly-verified feature claims across 7 categories, each with a live source read today. Two findings actively correct rather than just re-confirm assumptions from earlier passes: a **Go SDK** exists that wasn't previously catalogued, and Glean's own architecture docs **explicitly state structured warehouse data (Snowflake/Databricks) is not ingested/indexed** — directly at odds with treating "Snowflake, Databricks" as standard indexed-connector confirmations. Both are called out below rather than silently folded in.

## Search & Retrieval — Sr No 1-8

| Sr No | Feature | Confirmation Detail | Source |
|---|---|---|---|
| 1 | Intelligent/AI-powered relevance ranking | *"AI-powered relevance scoring and result ranking."* | [developers.glean.com/guides/search/overview](https://developers.glean.com/guides/search/overview) |
| 2 | Faceted filtering | *"Filter results by source, type, date, and custom attributes."* | [developers.glean.com/guides/search/overview](https://developers.glean.com/guides/search/overview) |
| 3 | Autocomplete / search suggestions | *"Implement search suggestions and autocomplete"* — queryable on partial text. | [developers.glean.com/guides/search/overview](https://developers.glean.com/guides/search/overview) |
| 4 | Federated search (multi-instance) | *"Search across multiple instances or systems"* — combines results from different Glean deployments. | [developers.glean.com/guides/search/overview](https://developers.glean.com/guides/search/overview) |
| 5 | Click-feedback loop | Every result carries a `trackingToken`; events reported back via `/feedback`. | [developers.glean.com/guides/search/overview](https://developers.glean.com/guides/search/overview) |
| 6 | Permission-aware retrieval | *"Results respect user permissions and data access controls."* | [developers.glean.com/guides/search/overview](https://developers.glean.com/guides/search/overview) |
| 7 | Cursor-based pagination | `cursor` / `has_more_results` parameters documented for paging through results. | [developers.glean.com/guides/search/overview](https://developers.glean.com/guides/search/overview) |
| 8 | Rate-limit handling + sub-second response claim | *"Fast search with sub-second response times"* (marketing claim, not independently timed this pass); documented retry guidance for `429` and `5xx` responses. | [developers.glean.com/guides/search/overview](https://developers.glean.com/guides/search/overview) |

## AI / LLM Capabilities — Sr No 9-14

| Sr No | Feature | Confirmation Detail | Source |
|---|---|---|---|
| 9 | Model Hub — multi-model support | *"Use the Model Hub to securely configure and manage access to commercial and open-source LLMs for Glean Assistant and Agents."* Curated set from OpenAI, Google, Anthropic, Amazon. | [docs.glean.com/administration/llms](https://docs.glean.com/administration/llms) |
| 10 | Two key models: Universal Model Key vs. BYOK | *"Bring your own keys for providers or use Glean's Universal Model Key to access pre-procured models with guardrails."* | [docs.glean.com/administration/llms](https://docs.glean.com/administration/llms) |
| 11 | Regional governance of open models on Universal Key | Open models *"are controlled by creator region on Glean Universal Model Key deployments"* — a real, specific admin governance lever. | [docs.glean.com/administration/llms](https://docs.glean.com/administration/llms) |
| 12 | Protect / Protect+ guardrail tiers | Referenced as distinct governance layers (consistent with the tier-gating found independently in the Prompt Engineering Access and Hallucination Controls fields). | [docs.glean.com/administration/llms](https://docs.glean.com/administration/llms) |
| 13 | Multiple model categories, including image generation | Text models (GPT-5.x, Claude Opus/Sonnet, Gemini 3.x variants) and image-generation models (e.g. an image-flavored GPT variant) both present in the same catalog. | [docs.glean.com/administration/llms](https://docs.glean.com/administration/llms) |
| 14 | Glean's own proprietary model listed alongside third parties | Glean's own model (Waldo) appears as a normal catalog entry, not walled off separately — consistent with the independent finding in the Foundation Models Used field. | [docs.glean.com/administration/llms](https://docs.glean.com/administration/llms) |

## Agents & Automation — Sr No 15-19

| Sr No | Feature | Confirmation Detail | Source |
|---|---|---|---|
| 15 | No-code Agent Builder | *"Create agents with drag-and-drop interface, pre-built templates, and custom instructions."* | [developers.glean.com/guides/agents/overview](https://developers.glean.com/guides/agents/overview) |
| 16 | Direct API Integration path | *"Use Glean's REST APIs directly for maximum control and customization."* | [developers.glean.com/guides/agents/overview](https://developers.glean.com/guides/agents/overview) |
| 17 | LangChain integration | *"Python LangChain integration for Glean's search and chat capabilities."* | [developers.glean.com/guides/agents/overview](https://developers.glean.com/guides/agents/overview) |
| 18 | MCP integration | *"Connect AI models and IDEs to Glean via standardized protocol."* | [developers.glean.com/guides/agents/overview](https://developers.glean.com/guides/agents/overview) |
| 19 | Agent Toolkit (cross-framework) | *"Pre-built Glean tools that work across multiple agent frameworks."* | [developers.glean.com/guides/agents/overview](https://developers.glean.com/guides/agents/overview) |

## APIs & Developer Platform — Sr No 20-27

| Sr No | Feature | Confirmation Detail | Source |
|---|---|---|---|
| 20 | Three distinct REST API surfaces | Platform API (*"Build search experiences and run Glean agents in your applications"*), Client API (chat/search/agents/user-facing), Indexing API (document ingestion/datasource config). | [developers.glean.com](https://developers.glean.com) |
| 21 | Python SDK | `pip install glean-api-client`. | [developers.glean.com](https://developers.glean.com) |
| 22 | TypeScript/JavaScript SDK | `npm install @gleanwork/api-client`. | [developers.glean.com](https://developers.glean.com) |
| 23 | Java SDK | `com.glean.api-client`. | [developers.glean.com](https://developers.glean.com) |
| 24 | **Go SDK — newly found this pass, not in the prior V2 list** | `go get github.com/gleanwork/api-client-go`. This SDK was not previously catalogued in earlier research passes — a genuine addition, not a re-confirmation. | [developers.glean.com](https://developers.glean.com) |
| 25 | Web SDK | `@gleanwork/web-sdk` for embedding search/chat components directly into a host app. | [developers.glean.com](https://developers.glean.com) |
| 26 | Indexing SDK | Open-source connector framework, described as bringing *"any data into Glean."* | [developers.glean.com](https://developers.glean.com) |
| 27 | Remote MCP server for coding assistants | `https://developers.glean.com/mcp` — supports Claude Code, Cursor, VS Code, JetBrains AI Assistant, Windsurf, and other MCP hosts. | [developers.glean.com](https://developers.glean.com) |

## Connectors & Integrations — Sr No 28-30

| Sr No | Feature | Confirmation Detail | Source |
|---|---|---|---|
| 28 | 275+ advertised native connectors | *"275+ out-of-the-box connectors"* — page does not break out how many are native-indexed vs. MCP/API/action-pack-based. | [glean.com/platform/connectors](https://www.glean.com/platform/connectors) |
| 29 | Broad category breadth, named examples | Documents (Airtable, Confluence, Coda, Box, Dropbox); Engineering & Analytics (GitHub, GitLab, Azure DevOps, Databricks, Amazon S3); Sales & Marketing (Gong, ActiveCampaign, Adobe); Project Management (Asana, Aha!, ClickUp); Communication (Gmail, Google Chat); Calendar (Google Calendar); HR (BambooHR); Support (FreshDesk, Freshservice); Design (Canva, Cloudinary); Learning (15Five). | [glean.com/platform/connectors](https://www.glean.com/platform/connectors) |
| 30 | Real-time sync + inherited source-system permissions | Page claims connectors support *"real-time data sync"* and inherit *"source-system permissions."* | [glean.com/platform/connectors](https://www.glean.com/platform/connectors) |

## Security, Compliance & Governance — Sr No 31-45

| Sr No | Feature | Confirmation Detail | Source |
|---|---|---|---|
| 31 | SOC 2 Type II | Badge shown on public security page. | [glean.com/platform/security](https://www.glean.com/platform/security) |
| 32 | ISO 27001 | Badge shown on public security page. | [glean.com/platform/security](https://www.glean.com/platform/security) |
| 33 | ISO 42001 (AI management) | Badge shown on public security page. | [glean.com/platform/security](https://www.glean.com/platform/security) |
| 34 | HIPAA | Badge shown on public security page. | [glean.com/platform/security](https://www.glean.com/platform/security) |
| 35 | GDPR | Badge shown on public security page. | [glean.com/platform/security](https://www.glean.com/platform/security) |
| 36 | TX-RAMP Level 2 | Badge shown on public security page — confirms this remains the government-adjacent certification (not FedRAMP), consistent with prior findings elsewhere in this research. | [glean.com/platform/security](https://www.glean.com/platform/security) |
| 37 | SSO-based identity verification | *"Verify who is making the request via your SSO provider."* | [glean.com/platform/security](https://www.glean.com/platform/security) |
| 38 | Source-system permission enforcement on read/write | *"Enforce source-system permissions on every read and write."* | [glean.com/platform/security](https://www.glean.com/platform/security) |
| 39 | Sensitive-content detection/blocking | *"Detects and blocks sensitive content for both structured and unstructured data."* | [glean.com/platform/security](https://www.glean.com/platform/security) |
| 40 | Topic restrictions | *"Check requests against acceptable use and industry-specific policies."* | [glean.com/platform/security](https://www.glean.com/platform/security) |
| 41 | Runtime threat protection | *"Screen for prompt injection, malicious code, and harmful content."* | [glean.com/platform/security](https://www.glean.com/platform/security) |
| 42 | Action alignment | *"Check agent actions against the user's intent and authority"* — a distinct control from permission checks. | [glean.com/platform/security](https://www.glean.com/platform/security) |
| 43 | Prompt injection detection accuracy | *"Detect prompt injection attacks with 96.9% accuracy"* — matches the same figure independently found and cross-checked in the Prompt Engineering Access field. | [glean.com/platform/security](https://www.glean.com/platform/security) |
| 44 | Always-on audit logging | *"Every control point is logged to an end-to-end audit trail."* | [glean.com/platform/security](https://www.glean.com/platform/security) |
| 45 | "Zero Trust" — weak/unconfirmed as a body claim | Only surfaced in the page's SEO meta description this pass, not in visible body copy — consistent with the earlier independent finding that Glean does not use "Zero Trust" as a self-referential named principle in its actual security-principles content. Not counted as a confirmed product claim. | [glean.com/platform/security](https://www.glean.com/platform/security) |

## Architecture & Infrastructure — Sr No 46-49

| Sr No | Feature | Confirmation Detail | Source |
|---|---|---|---|
| 46 | Documented 3-stage pipeline | Ingestion → Processing → Query/serving, named and described at a high level. | [docs.glean.com/security/architecture/data-flow/ingestion](https://docs.glean.com/security/architecture/data-flow/ingestion) |
| 47 | Three distinct ingestion paths, one still unshipped | **Indexing** (unstructured docs/wikis), **Tools** (business logic/dynamic retrieval), and **Context provisioning (MCP)** — this third path is explicitly labeled *"an upcoming feature,"* not yet live. Any claim treating MCP-based context provisioning as already-shipped ingestion would be inaccurate as of this pass. | [docs.glean.com/security/architecture/data-flow/ingestion](https://docs.glean.com/security/architecture/data-flow/ingestion) |
| 48 | **Correction: structured warehouse data is explicitly NOT ingested/indexed** | Verbatim: *"Glean does not need to ingest or index structured data from systems like Snowflake, Databricks, or other data warehouses."* This directly conflicts with treating "Snowflake, Databricks" as standard indexed-connector confirmations elsewhere — any Databricks/Snowflake integration Glean offers is evidently scoped to something other than structured-data indexing (e.g. action-pack/tool-level access), and should not be cited as a search-index connector without that caveat. | [docs.glean.com/security/architecture/data-flow/ingestion](https://docs.glean.com/security/architecture/data-flow/ingestion) |
| 49 | Per-tenant dedicated cloud project for connectors | Connectors run as *"specialized connectors deployed within your tenant's dedicated cloud project"* — an isolation-by-design claim. | [docs.glean.com/security/architecture/data-flow/ingestion](https://docs.glean.com/security/architecture/data-flow/ingestion) |

---

## Independent read

- This pass is broad (7 categories, 49 items) but not claimed to be exhaustive — it reflects what was verified fresh today, not a mechanical re-derivation of every item a prior pass may have listed.
- Two findings actively **correct** rather than just re-confirm prior assumptions: the Go SDK (Sr No 24, an addition) and the Snowflake/Databricks non-ingestion statement (Sr No 48, a real contradiction of a natural-sounding assumption). Both should be treated as higher-value than the routine re-confirmations around them.
- Sr No 45 (Zero Trust) is deliberately reported as unconfirmed rather than silently dropped — the term's absence from body copy is itself a finding worth keeping visible.

## Confidence

**Doc-Verified**, 7 independent first-party pages, validation date 2026-09-10. No sandbox/tenant access used — everything above is publicly readable without login. Tenant verification tracked in the companion test guide.

---

## Summary

| Category | Items | Sr No range |
|---|---|---|
| Search & Retrieval | 8 | 1-8 |
| AI / LLM Capabilities | 6 | 9-14 |
| Agents & Automation | 5 | 15-19 |
| APIs & Developer Platform | 8 | 20-27 |
| Connectors & Integrations | 3 | 28-30 |
| Security, Compliance & Governance | 15 | 31-45 |
| Architecture & Infrastructure | 4 | 46-49 |
| **Total** | **49** | |
