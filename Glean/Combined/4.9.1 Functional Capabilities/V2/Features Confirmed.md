**Glean Tier 3 Advanced Evaluation**
**Features Confirmed - Re-Verified (v2)**

*Re-verification of every row in [`features-Confirmed.docx.md`](../../../cloude/features-Confirmed.docx.md) against live, global web sources (`www.glean.com`, `docs.glean.com`, `developers.glean.com`, GitHub, PyPI, third-party analyses), cross-checked 2026-09-01 through 2026-09-08. Companion hands-on test guide: [V2/Features Confirmed.md](../../../../test/Glean/4.9.1%20Functional%20Capabilities/V2/Features%20Confirmed.md). Sibling field doc (broader 7-area sandbox sweep): [../Features Confirmed.md](../Features%20Confirmed.md). Sister deep dives: [Features Not Confirmed.md](Features%20Not%20Confirmed.md) (46-item re-verification) · [Undocumented Features.md](Undocumented%20Features.md) (12-item re-verification).*

## Methodology

- **Source** = live, global (web-reachable) URL only - never a local/cached file path. Every citation below is an actual `https://` address anyone can open and re-check. Where the underlying page was first read from a local cache during research, the cache's own frontmatter `url:` was used to resolve the real address, and that address is what's listed - the cache itself is never the citation of record.
- **Confidence tags** (denote *when* a source was checked, not *where* it lives - every source is a URL either way):
  - `Confirmed-Both` - page checked both in an earlier cache pass and re-hit live this pass; content matches.
  - `Confirmed-Live-Only` - confirmed via a fresh live fetch/search this pass (net-new, or the cache didn't cover it - e.g. GitHub/PyPI/third-party pages).
  - `Confirmed-Cache-Verified` - content matches a page read from cache during this research pass; not independently re-fetched live this pass because it's a structurally static first-party doc page (low drift risk). **Action item: re-open the URL live before citing externally.**
  - `Confirmed (drift)` - the underlying page confirms the *concept*, but a specific number/detail has since changed. Old and new values both given.
  - `Unverifiable` - could not independently confirm from any live URL this pass; downgraded from the original doc.
- **Validation date** for every row: 2026-09-08.

> **Rule going forward:** never cite a local scrap/cache path as a Source in this or any vendor-analysis doc. Local caches are a research aid only - always resolve and cite the real global URL, and re-verify it live before treating a claim as final. See `.cursor/rules/vendor-analysis-web-sourcing.mdc`.

---

# Search & Retrieval (9)

| # | Feature | Confirmation Detail | Source | Confidence |
|---|---|---|---|---|
| 1 | **Hybrid search (semantic + keyword/BM25)** | "Glean's hybrid search architecture" cited directly as part of the system-of-context. | https://www.glean.com/blog/knowledge-graph-agentic-engine | Confirmed-Cache-Verified |
| 2 | **AI-powered relevance ranking** | "Intelligent Ranking: AI-powered relevance scoring and result ranking" listed as a Search API key feature. | https://developers.glean.com/guides/search/overview | Confirmed-Cache-Verified |
| 3 | **Faceted filtering** | `facet_filters` / `FacetFilter` / `facet_bucket_size` shown in working Python SDK code samples (filter by `app`, `type`, `last_updated_at`). | https://developers.glean.com/guides/search/overview | Confirmed-Cache-Verified |
| 4 | **Autocomplete / search suggestions** | Dedicated `/rest/api/v1/autocomplete` endpoint + `glean.client.search.autocomplete()` SDK call. | https://developers.glean.com/api/client-api/search/autocomplete ; https://developers.glean.com/guides/search/overview | Confirmed-Cache-Verified |
| 5 | **Federated search across multiple Glean instances** | Official dev guide has a dedicated "Federated Search" section with a working code sample querying two separate Glean `server_url`s (primary + secondary instance) and merging results. **Caveat:** "federated search" is an overloaded term in Glean's docs - it *also* means live/real-time query-time retrieval from a connected source (e.g., O365 SharePoint) without indexing, which is a different feature. This item specifically matches the multi-instance meaning. | https://developers.glean.com/guides/search/overview (§ Federated Search) | Confirmed-Cache-Verified |
| 6 | **Click-feedback loop** | `trackingToken` on every result + `POST /rest/api/v1/feedback` (`activity.feedback`) reports clicks back into ranking - shown hands-on in SDK sample. | https://developers.glean.com/api/client-api/activity/feedback ; https://developers.glean.com/guides/search/overview | Confirmed-Cache-Verified |
| 7 | **Permission-aware retrieval** | Explicit Search API feature ("Permission Awareness") *and* a dedicated security-principles page: "Search results: Only documents the user can access in the source system appear in results." | https://developers.glean.com/guides/search/overview ; https://docs.glean.com/security/security-principles | Confirmed-Both (two independent first-party pages) |
| 8 | **Knowledge Graph** | Dedicated architecture blog post: triplet structure (subject/predicate/object), personal graph layer, fine-grained access control baked into the graph itself. | https://www.glean.com/blog/knowledge-graph-agentic-engine | Confirmed-Cache-Verified |
| 9 | **Real-time / "Live Mode" indexing** | "Live mode" cited by name for O365 connectors (real-time container-scoped queries); crawl-rate/change-rate settings referenced separately for standard scheduled crawls. | https://docs.glean.com/release-notes/releases/2026-07-01-july-release ; https://docs.glean.com/connectors/connectors-settings-visibility | Confirmed-Cache-Verified |

# AI / LLM Capabilities (10)

| # | Feature | Confirmation Detail | Source | Confidence |
|---|---|---|---|---|
| 10 | **Multi-model support** | Model Hub / Platform → LLM admin config lets admins add OpenAI, Anthropic, Google Vertex AI (Gemini), and AWS Bedrock-hosted models as selectable providers. | https://docs.glean.com/release-notes/releases/2025-09-24-september-release ; https://docs.glean.com/administration/management/models/provider-setup/amazon-bedrock-setup | Confirmed-Both |
| 11 | **Model Hub / LLM routing (existence)** | A model-selection layer exists (Admin Console → Platform → LLM); the automated routing *logic* itself is not independently confirmed - still tracked in the Not-Confirmed list. | https://docs.glean.com/release-notes/releases/2025-09-24-september-release | Confirmed-Cache-Verified (existence only, scope unchanged from original) |
| 12 | **Guardrails** | Dedicated Protect product surface with topic-restriction policies, sensitive-content scanning, and prompt-injection detection ("96.9% accuracy" claim). | https://docs.glean.com/administration/protect/overview ; https://www.glean.com/platform/security | Confirmed-Both |
| 13 | **Citation generation / grounding** | Inline citations via `ChatMessageFragment.citation` / `ChatMessageCitation.referenceRanges`, confirmed as a current (non-deprecated) chat API field. | https://developers.glean.com/api/client-api/chat/chat | Confirmed-Cache-Verified |
| 14 | **Tool calling / function calling** | Tools API (`/rest/api/v1/tools/call`, `/rest/api/v1/tools/list`) lets agents/chat invoke external tools/functions, including Glean's own built-in tools (`serverId=native`) and MCP-backed tools. | https://developers.glean.com/api/client-api/tools/overview | Confirmed-Cache-Verified |
| 15 | **RAG implementation** | Full retrieval-augmented pipeline documented across search + chat + citation APIs; original doc's own dedicated RAG research tab still stands unchanged. | https://developers.glean.com/guides/chat/overview ; https://developers.glean.com/api/client-api/chat/chat | Confirmed-Cache-Verified |
| 16 | **Workflow engine (agent-side)** | Agent Specification guide references structured, ordered "workflows" as part of agent instruction design; Agents API resource still exposes agent metadata consistent with workflow objects. | https://developers.glean.com/guides/agents/specification | Confirmed-Cache-Verified |
| 17 | **Explainability & decision logs (citation-based)** | Citation-based explanation confirmed (see #13); deeper decision-log/audit-trail mechanism beyond citations remains unconfirmed, unchanged from original. | https://developers.glean.com/api/client-api/chat/chat | Confirmed-Cache-Verified (citation-based scope only) |
| 18 | **Streaming chat responses** | Dedicated `/rest/api/v1/chat/stream` endpoint plus the Agents API's SSE streaming run endpoint. | https://developers.glean.com/api/client-api/chat/chat-stream ; https://developers.glean.com/api/client-api/agents/create-and-stream-run | Confirmed-Cache-Verified |
| 19 | **Agent memory (session-level)** | Chatbot example SDK code persists a `chat_id` across `send_message()` calls to maintain conversation history within a session; long-term/cross-session memory remains unconfirmed (flagged "coming soon" for security-scanning purposes elsewhere). | https://developers.glean.com/guides/chat/chatbot-example ; https://www.glean.com/platform/security (memory "coming soon") | Confirmed-Cache-Verified (session-level only; long-term memory explicitly still "coming soon" per vendor's own security page) |

# Agents & Automation (7)

| # | Feature | Confirmation Detail | Source | Confidence |
|---|---|---|---|---|
| 20 | **No-code Agent Builder UI** | Referenced by name with screenshot in Agents API docs ("Agents are created and configured through Glean's Agent Builder interface"). | https://developers.glean.com/api/client-api/agents/overview | Confirmed-Cache-Verified |
| 21 | **Code-based Agents API** | Full CRUD + run set confirmed: create-agent, edit-agent, get-agent, import-agent, get-agent-schemas, create-and-stream-run, create-and-wait-run, search-agents. | https://developers.glean.com/api/client-api/agents/overview | Confirmed-Cache-Verified |
| 22 | **Cross-framework Agent Toolkit** | `glean-agent-toolkit` pip package with explicit extras for OpenAI Agents SDK, LangChain/LangGraph, and CrewAI - genuinely framework-agnostic, not LangChain-exclusive. | https://developers.glean.com/guides/agents/toolkit | Confirmed-Cache-Verified |
| 23 | **Direct API Integration path** | Dedicated guide documents building custom agents against the API without a framework dependency. | https://developers.glean.com/guides/agents/direct-api | Confirmed-Cache-Verified |
| 24 | **NVIDIA NIM integration example** | Dedicated official example guide integrating Glean agents with NVIDIA NIM inference microservices. | https://developers.glean.com/guides/agents/nvidia-example | Confirmed-Cache-Verified |
| 25 | **Formal Agent Specification document** | Dedicated spec document covering agent instruction/behavior structure (Markdown workflows, role statements, tool-description conventions). | https://developers.glean.com/guides/agents/specification | Confirmed-Cache-Verified |
| 26 | **Webhook / Triggers system** | Platform Triggers API: preset-based, signed (HMAC-SHA256) Standard Webhooks delivery, permission-scoped to the subscribing user. **Correction carried forward:** endpoints are explicitly marked **experimental** - require `X-Glean-Include-Experimental: true` header or they 404. | https://developers.glean.com/api/platform-api/triggers-overview | Confirmed-Cache-Verified (experimental flag re-confirmed, unchanged) |

# APIs & Developer Platform (9)

| # | Feature | Confirmation Detail | Source | Confidence |
|---|---|---|---|---|
| 27 | **Three REST APIs** | Client API, Platform API, and Indexing API confirmed as three distinct, separately-documented REST surfaces; no GraphQL/gRPC/SOAP found. | https://developers.glean.com ; https://developers.glean.com/api/platform-api/getting-started ; https://developers.glean.com/api/indexing-api/index-documents | Confirmed-Cache-Verified |
| 28 | **"Skills" API resource** | Platform Skills API: discover, validate, import, sync, version, and manage "skills" - existence re-confirmed; functional depth (runtime execution semantics) still not fully explored. | https://developers.glean.com/api/platform-api/skills-overview | Confirmed-Cache-Verified |
| 29 | **OAuth2 + API key authentication** | Platform API authentication guide documents both Glean OAuth Authorization Server (+ external-IdP) and Glean-issued token (API key) modes, incl. `X-Glean-ActAs` for the token path. | https://developers.glean.com/api/platform-api/authentication ; https://developers.glean.com/api/platform-api/agents-overview | Confirmed-Cache-Verified |
| 30 | **Documented rate limiting** | Client search guide's own error-handling sample explicitly retries on `429` with exponential backoff (`2 ** attempt`) - matches the 30 qpm token-bucket + 429 behavior from the original doc. | https://developers.glean.com/guides/search/overview (§ Error Handling) | Confirmed-Cache-Verified |
| 31 | **Typed error handling** | `errors.GleanError` with `status_code`/`raw_response` attributes shown in a working retry-loop sample; `GleanDataError` structured payload previously confirmed hands-on in SDK source (unchanged). | https://developers.glean.com/guides/search/overview | Confirmed-Cache-Verified |
| 32 | **Bulk indexing / bulk operations endpoints** | Indexing API's bulk endpoints confirmed present and documented. | https://developers.glean.com/api/indexing-api/bulk-index-external-shortcuts ; https://developers.glean.com/api/indexing-api/index-documents | Confirmed-Cache-Verified |
| 33 | **Pagination (cursor-based)** | `cursor` / `has_more_results` pattern shown in a working paginated-search SDK sample; dedicated invalid-cursor error page confirms cursor validation exists server-side. | https://developers.glean.com/guides/search/overview ; https://developers.glean.com/errors/invalid-cursor | Confirmed-Cache-Verified |
| 34 | **Deprecation policy + changelog** | `exclude_deprecated_after` / `include_experimental` SDK parameters previously confirmed hands-on in SDK source; deprecations/changelog re-confirmed present as living documents. | https://developers.glean.com/deprecations ; https://developers.glean.com/changelog | Confirmed-Cache-Verified |
| 35 | **Open-source SDKs with active release cadence** | Python SDK (`gleanwork/api-client-python`) re-confirmed live: repo created 2025-04-23, actively tagging releases through at least Jan 2026, current PyPI version `0.17.5` as of 2026-09-08, explicitly labeled **beta** ("breaking changes without a major version bump" - pin your version). TypeScript/Java SDKs unchanged from original citation. | https://developers.glean.com/libraries/api-clients/python ; https://github.com/gleanwork/api-client-python ; https://pypi.org/project/glean-api-client | Confirmed-Both (drift on exact release count: original cited "80 Python releases" - not recounted exactly this pass, but cadence and beta status independently re-confirmed live) |

# Connectors & Integrations (9)

| # | Feature | Confirmation Detail | Source | Confidence |
|---|---|---|---|---|
| 36 | **100+ native search connectors (advertised) → now 275+** | Vendor's own connectors page has moved the advertised figure up since the original doc was written. | https://www.glean.com/platform/connectors | **Confirmed (drift, upgraded): 100+ → 275+** |
| 37 | **Salesforce, Microsoft 365/SharePoint/Teams/Outlook, Google Workspace, Slack** | All re-confirmed present as native connectors with dedicated setup docs. | https://docs.glean.com/connectors/native/sharepoint/choose-your-setup ; https://docs.glean.com/connectors/native/onedrive/new-setup ; https://docs.glean.com/connectors/native/notion/about | Confirmed-Cache-Verified |
| 38 | **Jira, Confluence, GitHub, Zendesk, ServiceNow** | GitHub connector re-confirmed with both MCP-path and API-fallback auth modes documented in detail. | https://docs.glean.com/connectors/native/github/about | Confirmed-Cache-Verified |
| 39 | **Snowflake, Databricks, Box/Dropbox/Notion** | Re-confirmed via native connector docs and dedicated action packs (Databricks action pack now supports direct SQL execution). | https://docs.glean.com/release-notes/releases/2025-05-20-may-release | Confirmed-Cache-Verified |
| 40 | **Open-source Indexing SDK** | Dedicated Indexing SDK doc tree (architecture, push/pull, batching, testing, deployment) confirms this is a full, documented SDK, not a stub. | https://developers.glean.com/libraries/indexing-sdk | Confirmed-Cache-Verified |
| 41 | **MCP client (gateway outward)** | Re-confirmed and **updated**: page shows **178** supported remote MCP servers on last cache pass (2026-09-01); live check (2026-09-08, third-party analysis citing docs updated 2026-06-01) shows **176-177**. Count is actively growing month over month - concept fully confirmed, exact figure is a moving target. | https://docs.glean.com/administration/tools/supported-mcp-servers ; https://www.stackone.com/blog/best-mcp-gateway-for-glean/ | Confirmed-Both (drift: 176 → 177 → 178, all within 2026; re-open the docs URL for the current count before citing externally) |
| 42 | **MCP server (Glean hosts its own)** | Dual MCP posture re-confirmed: Glean both consumes external MCP servers (Gateway, #41) and exposes its own MCP servers to hosts like Claude Desktop, Cursor, ChatGPT, Copilot Studio. | https://docs.glean.com/administration/platform/mcp/about ; https://docs.glean.com/administration/platform/mcp/host-guides/claude-desktop ; https://docs.glean.com/administration/platform/mcp/host-guides/chatgpt | Confirmed-Cache-Verified |
| 43 | **LangChain integration** | Re-confirmed at four independent layers: dedicated LangChain guide, Python SDK's built-in LangChain section, Agent Toolkit's `[langchain]` extra, Agents API explicitly modeled on the LangChain Agent Protocol. | https://developers.glean.com/guides/agents/langchain ; https://developers.glean.com/libraries/api-clients/python ; https://developers.glean.com/guides/agents/toolkit ; https://developers.glean.com/api/client-api/agents/overview | Confirmed-Cache-Verified (strongest-evidenced item in this category - 4 independent citations) |
| 44 | **12 first-party "action packs"** | **Re-confirmed live with an exact independent match.** A third-party analysis (dated June 5, 2026) lists the identical 12 action packs by name. **Caveat found this pass:** release notes show many *additional* named action packs beyond this "first-party 12" list (Zendesk Extension Tools, OpenAI web search, Brave, NetSuite MCP, Email automation, etc.) - the "12" figure appears to specifically mean a narrower "core" tier, not the full current catalog. Flag for admin follow-up in test guide. | https://docs.glean.com/release-notes/releases/2026-08-12-august-release ; https://www.stackone.com/blog/best-mcp-gateway-for-glean/ | Confirmed-Both (drift/caveat: "12" is a first-party-core subset; total action-pack catalog is larger and growing) |

# Security, Compliance & Governance (14)

| # | Feature | Confirmation Detail | Source | Confidence |
|---|---|---|---|---|
| 45 | **SOC 2 Type II** | Badge shown on official public marketing security page. | https://www.glean.com/platform/security | Confirmed-Cache-Verified |
| 46 | **ISO 27001** | Badge shown on official public marketing security page. | https://www.glean.com/platform/security | Confirmed-Cache-Verified |
| 47 | **ISO 42001 (AI Management)** | Badge shown on official public marketing security page - genuinely present, still a notable bonus finding. | https://www.glean.com/platform/security | Confirmed-Cache-Verified |
| 48 | **HIPAA + BAA availability** | HIPAA badge shown on the official security page; BAA availability referenced generally for healthcare buyers in Glean's own blog content. | https://www.glean.com/platform/security | Confirmed-Cache-Verified |
| 49 | **FedRAMP (in progress / targeted)** | **Re-confirmed live, with an important correction.** Glean's own careers listing states verbatim: *"Glean is actively working toward FedRAMP, but we are not yet FedRAMP-authorized."* **New finding:** Glean's actual current compliance badge for government/state work is **TX-RAMP Level 2** (Texas state program), not FedRAMP - the public security page badges do NOT include FedRAMP, only TX-RAMP. No FedRAMP Marketplace listing exists for Glean as of 2026-09-08. | https://www.glean.com/platform/security (TX-RAMP badge; FedRAMP absent) ; https://jobs.generalcatalyst.com/companies/glean/jobs/78343276-strategic-federal-account-executive-public-sector-dib ; https://www.exploreagentic.ai/insights/glean-alternatives-for-regulated-industries/ | Confirmed-Live-Only (status re-confirmed accurate; TX-RAMP vs. FedRAMP distinction is new and should be called out explicitly in the eval, not conflated) |
| 50 | **GDPR, PCI DSS** | GDPR badge confirmed on the official security page. **PCI DSS badge NOT found** anywhere - only GDPR, HIPAA, SOC2, ISO27001, ISO42001, TX-RAMP are shown. | https://www.glean.com/platform/security | **Split: GDPR = Confirmed-Cache-Verified; PCI DSS = Unverifiable (downgraded - no badge or explicit statement found)** |
| 51 | **Encryption at rest & in transit** | Standard control; referenced generally across security/deployment docs (CMEK, private endpoints) and explicitly in the Bedrock setup doc ("all data is encrypted in transit"). | https://docs.glean.com/security/architecture ; https://docs.glean.com/administration/management/models/provider-setup/amazon-bedrock-setup | Confirmed-Cache-Verified |
| 52 | **RBAC** | Explicitly named as a core control in Glean's own enterprise-rollout guidance blog; permission mirroring (ACLs, group memberships, role assignments) documented in detail on the security-principles page. | https://www.glean.com/blog/the-enterprise-ai-copilot-playbook-for-business-leaders ; https://docs.glean.com/security/security-principles | Confirmed-Cache-Verified |
| 53 | **SSO support** | Dedicated SSO doc tree with named Okta OIDC and generic SAML configuration guides. | https://docs.glean.com/administration/identity/sso/about ; https://docs.glean.com/administration/identity/sso/configuration/okta-oidc-tokenless ; https://docs.glean.com/administration/identity/sso/configuration/generic-saml | Confirmed-Cache-Verified |
| 54 | **SIEM integration, DLP** | Admin audit logs explicitly documented as exportable to CSV or streamable to a third-party SIEM; sensitive-content/DLP-style scanning documented under Protect. | https://docs.glean.com/security/security-principles ; https://docs.glean.com/administration/protect/sensitive-findings/about | Confirmed-Cache-Verified |
| 55 | **Data residency options** | Cloud/self-hosted deployment docs (AWS, GCP customer-hosted) confirm flexible single-tenant/customer-managed deployment for residency needs. | https://docs.glean.com/security/cloud-prem/aws ; https://docs.glean.com/security/cloud-prem/gcp | Confirmed-Cache-Verified |
| 56 | **Customer-managed encryption keys** | Referenced explicitly ("Customer-managed encryption keys mean the vendor cannot decrypt your data even if compelled") in Glean's own comparative security-features blog content. | https://www.glean.com/perspectives/how-claude-stacks-up-against-leading-secure-ai-solutions | Confirmed-Cache-Verified |
| 57 | **Zero Trust architecture** | **Downgraded from original.** Could not find "Zero Trust" used by Glean to describe its *own* architecture - the term only appears in general industry-context blog posts, not as a named Glean architectural principle. Glean's own security-principles page instead names three specific principles: permission mirroring, centralized administration, traceability - no "Zero Trust" branding. | https://docs.glean.com/security/security-principles (no "Zero Trust" mention anywhere on page) | **Unverifiable (downgraded from Confirmed - term not used self-referentially by vendor)** |
| 58 | **Glean Protect / AWARE AI-governance framework** | Protect re-confirmed as a full, named product surface: sensitive-content detection, prompt-injection detection (96.9% accuracy claim), topic restrictions, agent guardrails, action alignment. | https://www.glean.com/platform/security ; https://docs.glean.com/administration/protect/overview | Confirmed-Cache-Verified |

# Architecture & Infrastructure (7)

| # | Feature | Confirmation Detail | Source | Confidence |
|---|---|---|---|---|
| 59 | **Documented end-to-end architecture** | Indexing → embeddings → ranking → serving pipeline still documented at a high level across the security architecture doc tree. | https://docs.glean.com/security/architecture/data-flow/ingestion ; https://docs.glean.com/security/architecture/data-flow/processing ; https://docs.glean.com/security/architecture/data-flow/query | Confirmed-Cache-Verified |
| 60 | **Connector framework** | Indexing SDK's architecture and connector-types pages confirm a distinct, documented architectural layer underlying all connectors. | https://developers.glean.com/libraries/indexing-sdk/concepts/architecture ; https://developers.glean.com/libraries/indexing-sdk/concepts/connector-types | Confirmed-Cache-Verified |
| 61 | **Inference infrastructure (AWS Bedrock path)** | **Upgraded from original.** The original doc's dated 2023 AWS Marketplace blog citation is replaced with Glean's own **current, first-party official doc**, which includes a live architecture diagram: query flows through tool-selection/query-planning/execution modules, hits the Glean Index + Knowledge Graph, then calls Amazon Bedrock (Claude models) for inference. Confirms IAM auto-provisioning and in-transit/at-rest encryption for the Bedrock path specifically. | https://docs.glean.com/administration/management/models/provider-setup/amazon-bedrock-setup ; https://aws.amazon.com/blogs/awsmarketplace/transform-enterprise-search-knowledge-discovery-glean-amazon-bedrock/ (2026-09-08 live check) | **Confirmed-Live-Only (upgraded: dated 2023 blog → current official Glean doc with architecture diagram)** |
| 62 | **Document processing pipeline** | Existence confirmed at a conceptual level only; specific OCR/multimodal handling claims remain individually unconfirmed, unchanged from original - still tracked in the Not-Confirmed list. | https://developers.glean.com/libraries/indexing-sdk (general pipeline docs, no OCR/multimodal specifics found) | Confirmed-Cache-Verified (conceptual only, scope unchanged) |
| 63 | **Caching layer** | Existence confirmed only via the client SDK's own documented example implementation of an application-side cache wrapper - shows caching is a supported *pattern*, not proof of Glean's internal server-side caching architecture. Specific internal cache behavior remains unconfirmed, unchanged from original. | https://developers.glean.com/guides/search/overview (§ Caching Search Results) | Confirmed-Cache-Verified (client-side pattern confirmed; server-side internals still unconfirmed) |
| 64 | **Multi-tenant / single-tenant / customer-hosted deployment options** | All three re-confirmed via dedicated deployment doc trees: standard multi-tenant SaaS, AWS/GCP customer-hosted ("cloud-prem"), and self-hosted deployment guides. | https://docs.glean.com/security/cloud-prem ; https://docs.glean.com/get-started/prepare/self-hosted-deployment/aws/deploy-aws | Confirmed-Cache-Verified |
| 65 | **SSO & identity integration (Okta, Microsoft)** | Re-confirmed by name directly in official docs this pass (stronger than original's third-party-tool sourcing): Okta OIDC config guide + generic SAML guide (covers Microsoft/Entra ID via SAML). | https://docs.glean.com/administration/identity/sso/configuration/okta-oidc-tokenless ; https://docs.glean.com/administration/identity/sso/configuration/generic-saml | **Confirmed-Cache-Verified (upgraded from original: now first-party docs instead of third-party security-profile tool)** |

---

# Summary

## Counts by confidence tag (65 items)

| Tag | Count | Items |
|---|---|---|
| Confirmed-Both | 6 | #7, #10, #12, #35, #41, #44 |
| Confirmed-Live-Only | 2 | #49, #61 |
| Confirmed-Cache-Verified | 55 | All remaining items with clean re-confirmation |
| Confirmed (drift) | 3 | #36 (100+→275+, upgrade), #41 (176→178, upgrade), #44 (12 = core subset, catalog larger) |
| Unverifiable (downgraded) | 2 | #50 (PCI DSS half), #57 (Zero Trust) |

*(Note: #36, #41, #44 are counted once each under "drift" and also reflected as Confirmed-Both/Cache-Verified depending on whether a live check ran - see each row's exact tag above; this table is a simplified rollup, treat the per-row Confidence column as authoritative.)*

## Downgrades vs. the original 65

1. **#50 PCI DSS** - original listed as "confirmed as part of the compliance posture." No PCI DSS badge or statement found on Glean's public security page (https://www.glean.com/platform/security). **Downgraded to Unverifiable.** GDPR half of the pairing remains confirmed.
2. **#57 Zero Trust architecture** - original listed as "confirmed as a stated architectural principle." Glean's own security-principles page (https://docs.glean.com/security/security-principles) names three different principles (permission mirroring, centralized administration, traceability) and does not use "Zero Trust" self-referentially anywhere found. **Downgraded to Unverifiable.**

## Upgrades / corrections vs. the original 65

1. **#36 connector count**: 100+ → **275+** (vendor's own current marketing page, https://www.glean.com/platform/connectors).
2. **#41 MCP gateway**: 176 → **178** (per https://docs.glean.com/administration/tools/supported-mcp-servers) - confirmed actively growing.
3. **#44 action packs**: "12" independently re-confirmed by name via a third-party source, but release notes show the *total* action-pack catalog is materially larger than 12 - the original "12" is a narrower "first-party core" subset, not the full current catalog.
4. **#49 FedRAMP**: original hedge ("in progress/targeted") holds up, now backed by a first-party careers-page statement rather than inference. **New finding:** the actual current government-adjacent certification Glean holds is **TX-RAMP Level 2** (Texas state), not any federal program.
5. **#61 AWS Bedrock inference**: original's dated 2023 AWS Marketplace blog replaced with Glean's own **current** official doc + architecture diagram at https://docs.glean.com/administration/management/models/provider-setup/amazon-bedrock-setup.
6. **#5 federated search**: confirmed, but flagged that "federated search" is an overloaded term in Glean's own docs (multi-instance query fan-out vs. live query-time retrieval from one connected source).
7. **#65 SSO/Okta/Microsoft**: upgraded from a third-party security-profile tool citation to direct first-party Glean docs.

## Newly-found items while re-checking (not on the original 65, informational only - not added to the count)

- **Triggers API experimental flag**: re-confirmed the Platform Triggers API requires `X-Glean-Include-Experimental: true` - same finding as the original "Undocumented Features" doc, still true.
- **Agent memory "coming soon"**: Glean's own security page lists memory scanning as "(coming soon)" for skills/agents - confirms session-level memory (#19) is real today but cross-session/long-term memory genuinely isn't shipped yet.
- **Human-in-the-loop write confirmations**: security-principles page documents a formal write-action confirmation UX (pause-for-approval, editable, admin-configurable "Run without confirmation" opt-in) - relevant context for Field 7/8 in the main eval log.

## What wasn't independently re-verified this pass

The specific numeric SDK release counts in #35 (80 Python / 86 TypeScript releases) were not re-counted exactly - cadence and beta status were re-confirmed live, but the precise historical release count wasn't recomputed. Treat that sub-detail as inherited from the original doc rather than freshly re-verified; re-open https://github.com/gleanwork/api-client-python/releases before citing an exact count externally.
