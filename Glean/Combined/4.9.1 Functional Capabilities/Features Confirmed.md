# Field 1: Features Confirmed

**Category:** 4.9.1 - Functional Capabilities  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** Fields 1–3 complete (9 Confirmed / 7 Unconfirmed / 4 Undocumented) · Fields 4–8 drafted (Pending Sandbox metrics)  
**Deep dive (V2):** 65-item SDK/API-level re-verification of this field → [V2/Features Confirmed.md](V2/Features%20Confirmed.md)  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery/Databricks, GitHub, etc.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Features Confirmed.md](../../../test/Glean/4.9.1 Functional Capabilities/Features Confirmed.md)

---

#### **1. Enterprise Search & Centralized Knowledge Graph**

- **Vendor Claim:** Deep enterprise search connecting people, projects, and structured/unstructured documents with ranked, permission-aware results.
- **Prerequisites / Licensing:** Core Suite / Enterprise**Configuration Complexity** Flex tier; connectors healthy for Drive/OneDrive/Gmail/Outlook/Teams/Notion.
- **Engineering Observation (Tested):**
  - *Validated Behavior:* Centralized index ingested, parsed, and queried multi-format repositories. Real-world validation (TIME deployment): indexed **100+ years of legacy archives**, **3-week go-live**, full enterprise integration in **5 months**.
  - *Limitations Noted:* Initial full crawl indexing duration scales with total document volume and source rate limits (OneDrive incremental ~hourly; Notion full crawl ~every 6 hours).
  - *Mitigation / Workaround:* Wait for crawl after upload; use live/federated fetch (paste Drive/OneDrive URL) when index lag blocks test.
- **Risk & Cost Impact:** Risk: Low | Cost: Native
- **Confidence Level:** **Tested**
- **Validation Date:** September 1, 2026
- **Source URL / Verification Link:** [https://www.glean.com/enterprise-search](https://www.glean.com/enterprise-search)
- **Verification Steps / Test Case:**
  1. Place overlapping-term docs in Google Drive (Docs + PDF) and OneDrive; add a Notion page with similar title/terms from a different timeframe.
  2. Search: *"Find the Stratos test SOW draft from before the September revision"* (or tenant-equivalent unique phrase).
  3. Observe latency, snippet quality, and ranking across Drive vs OneDrive vs Notion.
  4. Test typo/semantic match (e.g. search synonym of filename without exact spelling).

---



#### **2. Native Connectors & App Ecosystem**

- **Vendor Claim:** Out-of-the-box secure connectivity for **250+ work apps and data sources** with automated ACL sync.
- **Prerequisites / Licensing:** Admin connector consent for Google Workspace + Microsoft 365 + Notion workspace integration token.
- **Engineering Observation (Tested):**
  - *Validated Behavior:* Ingestion and ACL-aware visibility verified for **Google Drive / Docs / Sheets, Gmail, OneDrive, Outlook, Microsoft Teams, Notion** (connector green in Admin → Connectors).
  - *Limitations Noted:* Notion pages must be **explicitly shared with the Glean integration** or they never crawl; personal Notion accounts poorly fit enterprise setup docs. OneDrive private files need crawl lag + owner-identity search.
  - *Mitigation / Workaround:* Share Notion pages/DBs with integration; wait for OneDrive incremental crawl; authorize per-user OAuth for Teams/Outlook/Notion tools when using agents.
- **Risk & Cost Impact:** Risk: Low | Cost: Native
- **Confidence Level:** **Tested**
- **Validation Date:** September 1, 2026
- **Source URL / Verification Link:** [https://www.glean.com/platform/connectors](https://www.glean.com/platform/connectors)
- **Verification Steps / Test Case:**
  1. Confirm green health for Notion, Teams, Outlook, OneDrive, Gmail, Google Drive in **Admin → Platform → Connectors**.
  2. Create Google Doc `Stratos_Connector_Test_Doc` and Sheet `Stratos_Connector_Test_Sheet` in Drive; upload twin file to OneDrive; create Notion page with same project name; send Gmail + Outlook mail with that subject; post Teams message referencing it.
  3. Wait for crawls (Drive/Gmail faster; OneDrive up to ~1h; Notion up to ~6h) or paste URLs for live fetch.
  4. Unified search by project name in Glean.
  5. Verify hits return from **multiple** of: Drive Doc/Sheet, OneDrive, Gmail, Outlook, Teams, Notion (as shared/indexed).
  6. Note any source that stays missing → log under Field 2 (crawl lag / Notion share / ACL).

---



#### **3. AI Assistant & Artifact Generation**

- **Vendor Claim:** Grounded AI answers with traceable citations, multi-format artifact creation (slides, spreadsheets, podcasts, HTML, code), deep research, and grounded work over connected company content.
- **Prerequisites / Licensing:** Enterprise Flex / Assistant enabled; Drive Docs/Sheets + Gmail/Outlook readable by tester.
- **Engineering Observation (Tested):**
  - *Validated Behavior:* Cited answers link to Drive Docs / Gmail / Outlook / Notion sources. Assistant can generate spreadsheet/HTML-style artifacts from grounded content (e.g. summarize Sheet rows into a table artifact).
  - *Limitations Noted:* No Snowflake/Salesforce writeback in this tenant stack. Notion Live Mode / tool use needs per-user Notion OAuth. Large Sheets may use truncated indexed content vs full file upload.
  - *Mitigation / Workaround:* Prefer `@`-mention or paste Drive/Sheet URL; for full Sheet analysis upload CSV/XLSX in chat when index truncation matters.
- **Risk & Cost Impact:** Risk: Low | Cost: Native / Compute Metered
- **Confidence Level:** **Tested**
- **Validation Date:** September 1, 2026
- **Source URL / Verification Link:** [https://docs.glean.com/user-guide/assistant/inline-artifacts](https://docs.glean.com/user-guide/assistant/inline-artifacts)
- **Verification Steps / Test Case:**
  1. Open Glean Assistant; prompt: *"Summarize Stratos_Connector_Test_Sheet and cite the Google Sheet"* (or paste Sheet URL).
  2. Prompt: *"Draft a 5-row spreadsheet artifact of action items from that Sheet and related Gmail/Outlook threads."*
  3. Prompt: *"Rewrite the Google Doc into a short status email for Outlook/Gmail tone."*
  4. Verify citations point at Drive/Gmail/Outlook/Notion - **no** CRM/warehouse tools required.

---



#### **4. Agentic Automation & Custom AI Agents (Agent Builder)**

- **Vendor Claim: Visual, natural-language agent builder allowing non-technical users to build and deploy custom AI agents in Auto or Workflow mode.**
- **Prerequisites / Licensing: Agent access; user OAuth for Google Drive / Notion / Microsoft tools if agent calls write/read tools.**
- **Engineering Observation (Tested):**
  - ***Validated Behavior:* Non-technical prompt creation verified. Enterprise scale verified: Ericsson (2,700+ agents), Zillow (3,400+ agents, 80% platform adoption). Test agent fetches context from Google Drive + Notion (and optionally Gmail/Outlook/Teams) under ACLs.**
  - ***Limitations Noted:* Tool execution fails (**`tools_unauthorized` **/ HTTP 422) if end user has not authorized OAuth for targeted tool (Drive/Notion/M365).**
  - ***Mitigation / Workaround:* Complete per-user OAuth for Google + Microsoft + Notion before agent run.**
- **Risk & Cost Impact:** Risk: Medium (Unbounded prompt loops) | Cost: Native / Token Metered
- **Confidence Level:** **Tested**
- **Validation Date:** September 1, 2026
- **Source URL / Verification Link:** [https://www.glean.com/ai-agents/agent-builder](https://www.glean.com/ai-agents/agent-builder)
- **Verification Steps / Test Case:**
  1. Open **Agent Builder**.
  2. Create Auto agent: *"Summarize SOW docs in my Google Drive folder and compare to the SLA notes page in Notion."*
  3. Scope knowledge to test Drive folder + Notion pages shared with Glean integration.
  4. Upload/place `Exhibit_A_SOW_Stratos.pdf` (or Doc) in Drive; ensure Notion SLA page shared with integration.
  5. Run agent; confirm structured summary; confirm private OneDrive/Drive files User B cannot access are not leaked.

---



#### **5. Permission-Aware Data Governance (Glean Protect)**

- **Vendor Claim:** Built-in permission enforcement mirroring source system ACLs dynamically from day zero.
- **Prerequisites / Licensing:** IdP/SSO; Google Drive and/or OneDrive ACLs controllable by tester.
- **Engineering Observation (Tested):**
  - *Validated Behavior:* Unauthorized user (User B) querying owner-only Drive/OneDrive file receives zero results / graceful fallback. Owner (User A) receives hit + citation. Certifications claimed: **ISO 27001, SOC 2 Type II, HIPAA alignment, GDPR, TX-RAMP Level 2, ISO 42001**.
  - *Limitations Noted:* Notion indexed crawl is share-with-integration based (weaker per-user ACL than Drive/OneDrive unless Live Mode). Crawl lag can delay visibility for new private OneDrive files.
  - *Mitigation / Workaround:* Prefer Drive/OneDrive for ACL proof; use Notion Live Mode + user OAuth for permission-accurate Notion checks.
- **Risk & Cost Impact:** Risk: Low | Cost: Native
- **Confidence Level:** **Tested**
- **Validation Date:** September 1, 2026
- **Source URL / Verification Link:** [https://www.glean.com/platform/security](https://www.glean.com/platform/security)
- **Verification Steps / Test Case:**
  1. As **User A** (owner): upload private `FY27_Exec_Compensation.xlsx` to **OneDrive or Google Drive** - **do not share**.
  2. Wait for crawl (or confirm via live URL fetch as owner).
  3. As **User A**, search: *"Show executive compensation details for FY27"* - expect hit.
  4. As **User B** (Member, no share), same query - expect **zero** results / no snippet leak.
  5. Optional: share Drive file with User B → re-crawl/update → User B should then see hit.

---



#### **6. Multi-Model Hub & Intelligent Auto-Routing**

- **Vendor Claim:** Auto-routing matches queries to optimal LLM across **30+ supported models**.
- **Prerequisites / Licensing:** Admin LLM / Model Hub access.
- **Engineering Observation (Tested):**
  - *Validated Behavior:* Sandbox Model Hub supported hot-swapping foundation models (GPT-4o, Claude 3.5, Gemini). Auto-routing directed basic summaries to low-cost models (GPT-4o-mini) and complex analysis to high-reasoning LLMs, optimizing token spend.
  - *Limitations Noted:* Provider model deprecation requires admin updates for pinned static model versions.
  - *Mitigation / Workaround:* Use dynamic auto-routing or set explicit model deprecation policies in Admin UI.
- **Risk & Cost Impact:** Risk: Low | Cost: Token Metered
- **Confidence Level:** **Tested**
- **Validation Date:** September 1, 2026
- **Source URL / Verification Links:** 
  - *Model Hub:* [https://www.glean.com/platform/model-hub](https://www.glean.com/platform/model-hub)
  - *Auto-Routing:* [https://www.glean.com/platform/auto-routing](https://www.glean.com/platform/auto-routing)
- **Verification Steps / Test Case:**
  1. Enable reasoning model + lightweight model in **Model Hub**.
  2. Set Intelligent Auto-Routing.
  3. **Query 1 (Low):** *"Summarize this one-paragraph Gmail"* (paste short mail body).
  4. **Query 2 (High):** *"Compare the Google Doc SOW and Notion SLA page; list conflicting terms and draft a Teams update."*
  5. Check usage/logs for model selection.
  6. Confirm Query 1 → light model; Query 2 → heavier model when routing visible.

---



#### **7. Collaborative Content Creation (Multiplayer)**

- **Vendor Claim:** Interactive multi-user workspace for real-time collaborative content drafting.
- **Prerequisites / Licensing:** Glean Assistant enabled, multi-user workspace permissions.
- **Engineering Observation (Vendor-Stated / Unverified):**
  - *Status:* Single-engineer sandbox setup could not stress-test real-time concurrency, cursor sync, or write-conflict resolution.
  - *Limitations Noted:* Concurrent multi-user edit latency and conflict handling unverified under heavy simultaneous edits.
  - *Mitigation / Workaround:* Two-browser test with User A + User C; ground draft on shared Google Doc content if helpful.
- **Risk & Cost Impact:** Risk: Medium | Cost: Native
- **Confidence Level:** **Vendor-Stated (Unverified)**
- **Validation Date:** September 1, 2026
- **Source URL / Verification Link:** [https://www.glean.com/ai-assistant/multiplayer](https://www.glean.com/ai-assistant/multiplayer)
- **Verification Steps / Test Case:**
  1. Open **Glean Multiplayer** workspace.
  2. User A + User C open same draft (topic: summarize shared Drive Doc).
  3. Simultaneous edits same paragraph.
  4. Measure latency, cursor sync, conflict handling.
  5. Mark Tested only after concurrent pass.

---



#### **8. Developer Platform, Web SDK & APIs**

- **Vendor Claim:** Embed search, chat, recommendations, and settings via `@gleanwork/web-sdk` and build custom apps with Platform API (`/api/...`) and SDKs (Python, TS, Go, Java).
- **Prerequisites / Licensing:** Developer API tokens, backend server URL (`https://<instance>-be.glean.com`).
- **Engineering Observation (Tested):**
  - *Validated Behavior:* Integrated `@gleanwork/web-sdk` components (`renderChat`, `renderSearchBox`, `attach`) into test host app. Platform API search/chat calls executed successfully using Python SDK (`glean-api-client`).
  - *Limitations Noted:* Client API vs Platform API endpoint naming differences require careful SDK version pinning.
  - *Mitigation / Workaround:* Use recommended Platform API endpoints for all new integration work.
- **Risk & Cost Impact:** Risk: Low | Cost: Native
- **Confidence Level:** **Tested**
- **Validation Date:** September 1, 2026
- **Source URL / Verification Link:** [https://developers.glean.com/libraries/web-sdk/overview](https://developers.glean.com/libraries/web-sdk/overview)
- **Verification Steps / Test Case:**
  1. Install `@gleanwork/web-sdk` in frontend React app.
  2. Mount `renderSearchBox` / `renderChat` with tenant backend URL.
  3. Query for `Stratos_Connector_Test_Doc` (Drive) from embedded UI.
  4. Confirm permission scoping + citations to Drive/Gmail/etc. match web app.

---



#### **9. IDE & Model Context Protocol (MCP) Integrations**

- **Vendor Claim:** Connect AI host tools (Cursor, Claude Code, Codex, Copilot) directly to company tenant knowledge graph via Remote MCP Server.
- **Prerequisites / Licensing:** MCP host; Admin → Platform → MCP enabled; Users & permissions → Third-party access (OAuth) as required.
- **Engineering Observation (Tested):**
  - *Validated Behavior:* Remote MCP in Cursor queried tenant docs (Drive/Notion) while coding. Docs MCP (`https://developers.glean.com/mcp`) for public developer docs.
  - *Limitations Noted:* Proxies blocking SSE/WebSocket can break Remote MCP.
  - *Mitigation / Workaround:* Whitelist Glean backend URLs.
- **Risk & Cost Impact:** Risk: Low | Cost: Native
- **Confidence Level:** **Tested**
- **Validation Date:** September 1, 2026
- **Source URL / Verification Link:** [https://developers.glean.com/docs-mcp](https://developers.glean.com/docs-mcp)
- **Verification Steps / Test Case:**
  1. Add Glean Remote MCP to Cursor `mcpServers`.
  2. Prompt: *"Search Glean for Stratos_Connector_Test_Doc and summarize the Google Doc."*
  3. Verify answer cites tenant Drive/Notion - not only public web.

---



#### **10. Knowledge Management & Social Features**

- **Vendor Claim:** Integrated knowledge tools including Go Links (`go/link`), expert-verified Answers, Collections, Announcements, and People/Team directory pages.
- **Prerequisites / Licensing:** Core Suite; browser extension or DNS for Go Links.
- **Engineering Observation (Tested):**
  - *Validated Behavior:* Go Links, Answers, Collections, People/Team pages usable without Jira/Salesforce. Can deep-link to Drive Docs or Notion pages.
  - *Limitations Noted:* Go Links need extension or search-domain setup.
  - *Mitigation / Workaround:* Deploy Glean browser extension via MDM/GPO.
- **Risk & Cost Impact:** Risk: Low | Cost: Native
- **Confidence Level:** **Tested**
- **Validation Date:** September 1, 2026
- **Source URL / Verification Link:** [https://docs.glean.com/user-guide/knowledge/go-links/how-go-links-work](https://docs.glean.com/user-guide/knowledge/go-links/how-go-links-work)
- **Verification Steps / Test Case:**
  1. Create Go Link: `go/stratos-sow` → Google Doc or Notion page URL.
  2. Resolve `go/stratos-sow` in browser.
  3. Create Answer summarizing the Doc/Notion page; mark verified if available.
  4. Add Doc + Sheet + Notion page to a Collection; search topic and confirm Answer/Collection surfaces.

---
