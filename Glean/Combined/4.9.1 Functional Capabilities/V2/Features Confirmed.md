**Glean Tier 3 Advanced Evaluation**
**Features Confirmed — Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-10 against `www.glean.com` and `developers.glean.com`. Field definition: "The validated list of core feature assertions made by the vendor." Base file at [`../Features Confirmed.md`](../Features%20Confirmed.md) left untouched — this replaces the prior V2 pass with a fresh, independently-sourced one, organized by category with Sr No mapping to the companion test guide.*

**Sr No mapping:** rows 1-62 below map 1:1 to the same Sr No in the companion test guide [test/V2/Features Confirmed.md](../../../../test/Glean/4.9.1%20Functional%20Capabilities/V2/Features%20Confirmed.md) — same number, same feature, doc-sourced here / tenant-tested there. Rows 50-52 added 2026-09-14 (see Confidence note) — found via a full-corpus sweep of this project's local Glean documentation crawl, never cited by this field's original research pass. Rows 53-61 also added 2026-09-14 — found via the same full-corpus sweep, never cited by this field's original research pass (see scrap/GLEAN_RESEARCH_MEMORY.md). Row 62 added 2026-09-14 — found via a full-corpus sweep of this project's local Glean documentation crawl plus a live post-crawl web check, never cited by this field's original research pass (see scrap/GLEAN_RESEARCH_MEMORY.md).

---

## Headline

49 distinct, freshly-verified feature claims across 7 categories, each with a live source read today (plus 3 Knowledge Management rows and 9 Assistant Chat Surface Extension rows added 2026-09-14 from a documentation-crawl sweep, bringing the total to 61 across 9 categories). Two findings actively correct rather than just re-confirm assumptions from earlier passes: a **Go SDK** exists that wasn't previously catalogued, and Glean's own architecture docs **explicitly state structured warehouse data (Snowflake/Databricks) is not ingested/indexed** — directly at odds with treating "Snowflake, Databricks" as standard indexed-connector confirmations. Both are called out below rather than silently folded in.

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

## Knowledge Management — Sr No 50-52

| Sr No | Feature | Confirmation Detail | Source |
|---|---|---|---|
| 50 | **Correction: "Projects" is actively replacing "Collections" as Glean's knowledge-organization primitive — not merely a rename** | Verbatim: *"Projects help you organize chats and content in Glean so related work is easier to group, revisit, and share. You can think of a project as a workspace where you keep relevant chats, documents, and artifacts together in one place."* Content types explicitly supported: *"Chats... Documents... Interactive content [canvases, slide decks, spreadsheets]... Files... URLs."* Materially broader than Collections, which only held documents/links — Projects natively include AI-chat history and generated artifacts. Rolling out gradually and feature-flagged: *"Projects are rolling out gradually and might not be enabled for every deployment."* | [docs.glean.com/user-guide/knowledge/projects/how-projects-work](https://docs.glean.com/user-guide/knowledge/projects/how-projects-work) |
| 51 | Existing Collections auto-migrate to Projects with content/permissions preserved; Collections pages are now marked "Deprecated" in Glean's own docs | Verbatim: *"Existing Collections automatically migrate to Projects. All content and permissions are preserved during the migration... your existing Collections appear as projects with the same content, structure, and access controls."* All Collections sub-feature pages (headers, subcollections, permissions) carry a "Deprecated" banner and note that Projects "are replacing Collections." **Flag for follow-up:** any existing project claim describing Collections as Glean's current org-content primitive should be checked for staleness — specifically `License Structure Details.md`, `Switching Cost Assessment.md`, the Use Case Library files, `Displacement Scenarios.md`, and `API Architecture Type.md` (not edited in this pass). | [docs.glean.com/user-guide/knowledge/projects/how-projects-work](https://docs.glean.com/user-guide/knowledge/projects/how-projects-work) |
| 52 | Projects default to private with per-user/group sharing — a materially different default-visibility model than Collections (company-wide-viewable by default) | Verbatim: *"Projects are private by default. You can share a project with specific people or groups when you're ready."* Contrast with Collections: *"All Collections will always be viewable by the entire company."* Governance-relevant distinction for a healthcare client — Projects support genuinely private, non-company-visible workspaces, which Collections structurally could not. | [docs.glean.com/user-guide/knowledge/projects/how-projects-work](https://docs.glean.com/user-guide/knowledge/projects/how-projects-work) |

## Admin Console & Platform Features — Sr No 62

| Sr No | Feature | Confirmation Detail | Source |
|---|---|---|---|
| 62 | Natural-language "Insights chat" and "Admin chat" in the admin console — genuinely new capabilities not previously named anywhere in this project's Features Confirmed or Agent & Workflow Builder research | Verbatim: *"we've developed insights chat and admin chat, two new Glean features that help you understand how Glean is being adopted across your company and receive real-time help managing your deployment, simply by asking questions in natural language."* Insights chat *"translates your natural-language questions into the right data requests, executes them using Python and SQL tools"*; Admin chat *"answers questions using Glean's public documentation and Gleaniverse content"* for admin-console self-service. Distinct from the already-covered Agent Library/Actions catalog — an admin-facing conversational analytics/help layer. | [glean.com/blog/insights-admin-chat](https://www.glean.com/blog/insights-admin-chat) |

---

## Assistant Chat Surface Extensions — Sr No 53-61

| Sr No | Feature | Confirmation Detail | Source |
|---|---|---|---|
| 53 | AI Answers — distinct generative feature from curated Answers | *"AI Answers shows a direct answer to your query. When appropriate, answers appear at the top of your search results. Each answer draws from your organization's documents and includes citations."* Generated per-query from retrieved documents (RAG-style), permission-aware. Distinct from the human-curated Answers feature (admin-written, manually maintained) — avoid conflating the two under one "Answers" umbrella in any client-facing writeup. | [docs.glean.com/user-guide/assistant/ai-answers](https://docs.glean.com/user-guide/assistant/ai-answers) |
| 54 | Chat sharing — per-recipient permission re-evaluation, 30-day expiry, rescindable | *"Recipients will only see documents and citations that they can access."* And: *"Automatic permission checking: The system automatically checks if recipients have access to cited documents. Users without permissions see redacted placeholders instead of sensitive content."* Retention: *"Glean conversations are retained for 30 days. As a result, a shared chat is only available for 30 days after it was first created, after which the link will no longer work."* Sharer can *"Rescind shared links at any time"* and *"Review who has access to your shared chats."* | [docs.glean.com/user-guide/assistant/chat-sharing](https://docs.glean.com/user-guide/assistant/chat-sharing) |
| 55 | Contextual images in chat — permission-gated, quantified self-hosted cost model | User guide: *"You will only see images if you have access to the underlying source document."* Admin guide (cost): *"Captioning Cost: $220 per 1M images (one-time per image)... Storage Cost: $2 per 1M images (Monthly)."* Also: *"For Glean hosted customers, there is no additional cost... For self-hosted customers, Glean implements monthly cost caps."* Supported sources: Google Drive, SharePoint/OneDrive, custom connectors (per-connector opt-in); NOT supported: Google Drawings, user-uploaded images in chat. Worth a cross-reference note in Pricing/TCO since it's a real, quantified line item for self-hosted deployments — not edited here, flagged for that field's own pass. | [docs.glean.com/user-guide/assistant/contextual-images](https://docs.glean.com/user-guide/assistant/contextual-images) ; [docs.glean.com/administration/assistant/features/contextual-images](https://docs.glean.com/administration/assistant/features/contextual-images) |
| 56 | Real-time voice — web/desktop/mobile, no raw audio retained, deployment-dependent default | *"Real-time voice is available on web, in the Glean desktop app, and on mobile."* Privacy: *"No raw audio is stored. Audio streams are routed from your browser to the model provider your organization has configured and back. No audio recordings are retained."* Permissions: *"Glean's existing security model and document-level permissions apply to all voice interactions."* Deployment: *"On the Glean Universal Model Key, real-time voice is on by default, but your admin can turn it off. On Customer Key, your admin must set it up first."* And: *"Real-time voice usage may be subject to usage-based pricing."* | [docs.glean.com/user-guide/assistant/real-time-voice](https://docs.glean.com/user-guide/assistant/real-time-voice) |
| 57 | Browser history search — private, individual-only, ~25 named apps | *"Results from your browser history are completely secure and private to you. Only you will see these results. Your coworkers and company will not see these results."* Scope: *"Glean will search across the titles of the pages you've visited"* for apps like Aha, Airtable, Datadog, DocuSign, Jenkins, Trello, Workday, etc. — requires the Glean browser extension. Genuinely client-side/browser-history-derived, not server-indexed — a different data flow than Glean's normal connector-based indexing, worth explicit scoping in any data-flow diagram/DPA review. | [docs.glean.com/user-guide/search/browser-history-apps](https://docs.glean.com/user-guide/search/browser-history-apps) |
| 58 | Glean Companion — highlight-triggered overlay, explicit-invoke-only | *"Glean companion does not automatically read the content of webpages. It only accesses content when you explicitly highlight text and invoke the feature."* Six functions: Explain, Find related documents, Find experts, Improve writing, Summarize, Translate (13 languages). Auto-enabled domains include Salesforce, ServiceNow, Slack, Workday, GitHub, Google Docs/Drive, Office, Confluence/Atlassian. Per-site or global disable available. Real privacy posture (explicit-invoke-only) worth documenting precisely for a healthcare client concerned about incidental PHI capture from highlighted text. | [docs.glean.com/user-guide/apps/glean-companion](https://docs.glean.com/user-guide/apps/glean-companion) |
| 59 | Desktop Quick Chat / Quick Entry — floating window, screenshot attachment | *"Quick Chat opens a floating chat window that stays on top of other apps"* and *"Take screenshot attaches a screenshot to your message so Glean can use it as context."* Default shortcut Cmd+Shift+J / Ctrl+Shift+J. Screenshot capture requires explicit macOS Screen Recording permission grant — a real data-capture surface not previously documented anywhere in the project. | [docs.glean.com/user-guide/apps/chat-first-experience](https://docs.glean.com/user-guide/apps/chat-first-experience) |
| 60 | Three named knowledge sources blended per response; no citations when both toggles off | *"Glean combines three knowledge sources in every response: Company knowledge... Web knowledge... LLM knowledge."* And: *"When both toggles are off, Glean relies only on the LLM's pre-trained knowledge. Responses generated this way don't include citations because no sources are retrieved."* Useful, concrete confirmation of when hallucination risk is highest (uncited, LLM-knowledge-only mode). | [docs.glean.com/user-guide/assistant/how-glean-accesses-info](https://docs.glean.com/user-guide/assistant/how-glean-accesses-info) |
| 61 | Advanced search filter syntax — people/org-chart filters, documented platform limits | Verbatim syntax includes `reportsto:"Manager Name"`, `level:[ic\|manager\|director]`, `employmenttype:[fulltime\|contractor\|intern]` — a real people-search capability worth noting for an HR/adoption angle. Also documents real platform limits: *"No complex boolean... No same-field AND... No regex"* and *"Glean Search returns a ranked set of top results per query, not an exhaustive list."* | [docs.glean.com/user-guide/advanced/advanced-search-filter](https://docs.glean.com/user-guide/advanced/advanced-search-filter) |

## Independent read

- This pass is broad (7 categories, 49 items) but not claimed to be exhaustive — it reflects what was verified fresh today, not a mechanical re-derivation of every item a prior pass may have listed.
- Two findings actively **correct** rather than just re-confirm prior assumptions: the Go SDK (Sr No 24, an addition) and the Snowflake/Databricks non-ingestion statement (Sr No 48, a real contradiction of a natural-sounding assumption). Both should be treated as higher-value than the routine re-confirmations around them.
- Sr No 45 (Zero Trust) is deliberately reported as unconfirmed rather than silently dropped — the term's absence from body copy is itself a finding worth keeping visible.

## Confidence

**Doc-Verified**, 7 independent first-party pages, validation date 2026-09-10. No sandbox/tenant access used — everything above is publicly readable without login. Tenant verification tracked in the companion test guide.

**Update, 2026-09-14:** Rows 53-61 (Assistant Chat Surface Extensions) added this pass — **Doc-Verified**, but crawl-only (2026-09-01), not independently re-fetched live this pass. Sourced from this project's local Glean documentation crawl rather than a fresh live fetch; recommend a live spot-check of the 9 cited docs.glean.com pages before this rows range is treated as equivalent-confidence to rows 1-49.

Rows 50-52 (Knowledge Management: Projects replacing Collections) were added 2026-09-14, live-refetched 2026-09-14 from `docs.glean.com/user-guide/knowledge/projects/how-projects-work`. Tracking record: `scrap/GLEAN_RESEARCH_MEMORY.md`. This is a correction rather than a plain addition — Sr No 51 specifically flags that any other field in this project describing Collections as Glean's current org-content primitive (candidates: `License Structure Details.md`, `Switching Cost Assessment.md`, Use Case Library files, `Displacement Scenarios.md`, `API Architecture Type.md`) should be checked for staleness in a follow-up pass; none of those files were edited in this pass.

Row 62 (Admin Console & Platform Features: Insights chat / Admin chat) added 2026-09-14 — crawl-only (2026-09-01), first-party Glean blog dated Feb 19 2026, not independently re-fetched live this pass.

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
| Knowledge Management | 3 | 50-52 |
| Assistant Chat Surface Extensions | 9 | 53-61 |
| Admin Console & Platform Features | 1 | 62 |
| **Total** | **62** | |
