# Field 1 — Features Confirmed

**Section pre-flight & reference:** [Pre-Flight.md](Pre-Flight.md)
**Companion eval log:** [Features Confirmed.md](../../../Glean/Combined/4.9.1 Functional Capabilities/Features Confirmed.md)
**Deep dive:** 65-item SDK/API hands-on checklist → [Features Confirmed - SDK Deep Dive.md](Features%20Confirmed%20-%20SDK%20Deep%20Dive.md)

---

Run these to **confirm** vendor claims. Pass → keep in Field 1. Fail → move evidence to Field 2.

### F1.1 Enterprise Search & Knowledge Graph
**Where:** App home search bar / Chat  
**Steps:**
1. Confirm connectors green: Notion, Teams, Outlook, OneDrive, Gmail, Google Drive in **Admin → Platform → Connectors**
2. Search unique phrase from `Stratos_Connector_Test_Doc` / Notion page
3. Search synonym/typo of filename
4. Open result → verify citation / snippet / source icon (Drive vs OneDrive vs Notion vs mail)

**Pass criteria:** Relevant docs return; snips match source; latency usable (<3–5s typical)  
**Log:** query text, top 3 URLs, latency

### F1.2 Native Connectors & App Ecosystem
**Where:** `Admin → Platform → Connectors` (`https://app.glean.com/admin/setup/apps`)  
**Steps:**
1. List connected apps. Note status (Healthy / Crawling / Error) for **in-scope stack only**
2. Open Google Drive, OneDrive, Gmail, Outlook, Teams, Notion — check last crawl
3. Unified search by project name
4. Verify hits from multiple sources (Doc/Sheet, OneDrive, Gmail, Outlook, Teams, Notion)
5. Notion miss? Confirm page shared with Glean integration. OneDrive miss? Wait crawl / search as owner

**Pass criteria:** In-scope apps index; ACL-aware visibility for Drive/OneDrive  
**Log:** connector list, health, which sources returned

### F1.3 AI Assistant & Artifact Generation
**Where:** Chat / Assistant  
**Steps:**
1. Prompt: `"Summarize Stratos_Connector_Test_Doc with citations"` (@mention or paste Drive URL)
2. Prompt: `"Generate a 5-row spreadsheet artifact of action items from Stratos_Connector_Test_Sheet"`
3. Prompt: `"Draft a short status email from that Doc for Gmail/Outlook tone"`
4. Optional: paste OneDrive URL for live fetch if index lag
5. Inspect citations + artifact — **no** Salesforce/Snowflake required

**Pass criteria:** Cited answer from Drive/Gmail/Outlook/Notion; artifact renders  
**Log:** chat link, artifact type, any `tools_unauthorized`

### F1.4 Agent Builder (Auto + Workflow)
**Where:** Agents → Agent Builder / Agent Library  
**Steps:**
1. Create Auto-mode agent: `"Summarize SOWs in Google Drive and compare to SLA notes in Notion"`
2. Scope knowledge to test Drive folder + Notion pages shared with Glean integration
3. Run agent on `Exhibit_A_SOW_Stratos.pdf` / Doc
4. Authorize Google / Notion / M365 user OAuth if tools prompt `tools_unauthorized`
5. Optionally build tiny Workflow-mode agent with 2 steps + human checkpoint

**Pass criteria:** Agent runs; respects ACL; produces structured output  
**Log:** agent ID, mode (Auto/Workflow), pass/fail, trace ID

### F1.5 Permission-Aware Governance (Glean Protect)
**Where:** Search as User B + `Admin → Protect`  
**Steps:**
1. As owner: private `FY27_Exec_Compensation.xlsx` on **OneDrive or Google Drive** (no share) — wait for crawl
2. Login as **User B**
3. Query: `"Show executive compensation details for FY27"`
4. Expect: zero results or graceful denial — **no snippet leak**
5. Repeat as owner — expect hit + citation
6. Browse Protect / content restriction settings if visible

**Pass criteria:** User B never sees restricted content  
**Log:** both query results, screenshots

### F1.6 Model Hub & Auto-Routing
**Where:** `Admin → Configure LLMs / Model Hub`  
**Steps:**
1. List enabled models (count toward 30+ claim if visible)
2. Enable 1 heavy + 1 light model if not already
3. Set Intelligent Auto-Routing (or equivalent)
4. Run low-complexity chat: `"What is today's date?"`
5. Run high-complexity chat: long SOW analysis prompt
6. Check usage / token dashboard which model served each

**Pass criteria:** Multiple models available; routing preference observable in logs/usage  
**Log:** model list, routing evidence

### F1.7 Multiplayer Collaboration
**Where:** Assistant Multiplayer workspace (if enabled)  
**Steps:**
1. Open same draft with Admin A + User C
2. Simultaneous edits same paragraph
3. Observe cursor/sync/conflict behavior

**Pass criteria:** Real-time collab works under concurrent edit  
**If blocked / flaky:** mark Field 1 Partial; evidence → Field 2 item #2

### F1.8 Developer Platform / Web SDK / APIs
**Where:** Outside UI — use Server URL from About Glean + API token  
**Steps:**
1. Create Client/Platform token in Admin (API tokens / developer settings)
2. Call Search API with Python/`curl` against `https://<instance>-be.glean.com`
3. (Optional) Embed `renderSearchBox` from `@gleanwork/web-sdk` in local HTML page

**Pass criteria:** Auth works; search returns permission-aware results  
**Log:** endpoint, HTTP status, sample title

### F1.9 MCP / IDE Integration
**Where:** Admin MCP settings + Cursor/Claude Code  
**Steps:**
1. `Admin → Platform → MCP` — confirm Remote MCP enabled
2. Add Glean MCP to Cursor `mcpServers`
3. Prompt IDE: `"Search Glean for our onboarding guide"`
4. Confirm tenant docs (not only public marketing) returned

**Pass criteria:** IDE returns tenant-grounded answer  
**Log:** MCP host, sample answer + citation

### F1.10 Knowledge Management (Go Links / Answers / Collections / People)
**Where:** App knowledge surfaces  
**Steps:**
1. Create Go Link `go/stratos-sow` → Google Doc or Notion page URL
2. Resolve link in browser (extension may be required)
3. Create Answer summarizing Doc/Notion; mark verified if option exists
4. Create Collection with Doc + Sheet + Notion page
5. Open People/Team page; search `"Who knows about <topic>?"`

**Pass criteria:** Go Link resolves; Answer ranks; Collection visible; people search works  
**Log:** go-link URL, answer ID

---
