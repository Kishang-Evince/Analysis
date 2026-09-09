# Field 2: Features Not Confirmed

**Category:** 4.9.1 - Functional Capabilities  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** Fields 1–3 complete (9 Confirmed / 7 Unconfirmed / 4 Undocumented) · Fields 4–8 drafted (Pending Sandbox metrics)  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery/Databricks, GitHub, etc.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Features Not Confirmed.md](../../../test/Glean/4.9.1 Functional Capabilities/Features Not Confirmed.md)
**Deep dive (V2):** 46-item marketing/vendor-disclosure re-verification of this field → [V2/Features Not Confirmed.md](V2/Features%20Not%20Confirmed.md)

---

#### **1. Notion Auto-Index Without Sharing Pages to Integration**

- **Vendor Claim:** Notion connector indexes workspace knowledge for search/agents.
- **Prerequisites / Licensing:** Notion connector + internal integration token.
- **Engineering Observation (Unconfirmed / Limitation):**
  - *Failed / Limited Behavior:* Pages/databases **not** shared with the Glean Notion integration do not crawl - including “personal” pages left private to the user. Setup docs assume workspace admin + explicit share-to-integration; poor fit for personal-only Notion usage.
  - *Impact / Severity:* Medium for tenants expecting Drive-like “everything I own appears automatically.”
  - *Mitigation / Workaround:* Share each page/DB with Glean integration; use Live Mode + user OAuth for permission-aware retrieval.
- **Risk & Cost Impact:** Risk: Medium | Cost: Process Overhead
- **Confidence Level:** **Tested (Limitation Verified)**
- **Validation Date:** September 1, 2026
- **Source URL / Verification Link:** [https://docs.glean.com/connectors/native/notion/about](https://docs.glean.com/connectors/native/notion/about)
- **Verification Steps / Test Case:**
  1. Create Notion page **not** shared with Glean integration; keep private.
  2. Wait ≥ one Notion crawl cycle (~6h) or check connector activity.
  3. Search exact unique page title in Glean - expect miss.
  4. Share page with integration → after crawl → expect hit.

---



#### **2. Real-Time Collaborative Multiplayer Workspace Concurrency**

- **Vendor Claim:** Interactive multi-user workspace for real-time collaborative document drafting and prompt iteration.
- **Prerequisites / Licensing:** Glean Assistant enabled, multi-user workspace access.
- **Engineering Observation (Unconfirmed / Limitation):**
  - *Failed / Limited Behavior:* Concurrent typing, cursor sync, OT under dual-user load not verified in single-engineer sandbox.
  - *Impact / Severity:* Low-Medium.
  - *Mitigation / Workaround:* User A + User C dual-session test.
- **Risk & Cost Impact:** Risk: Low | Cost: Native
- **Confidence Level:** **Vendor-Stated (Unverified)**
- **Validation Date:** September 1, 2026
- **Source URL / Verification Link:** [https://www.glean.com/ai-assistant/multiplayer](https://www.glean.com/ai-assistant/multiplayer)
- **Verification Steps / Test Case:**
  1. Two sessions (User A, User C) in Multiplayer.
  2. Conflicting edits same paragraph.
  3. Record latency / conflict behavior.

---



#### **3. Deep Iframe & Embedded Content Extraction**

- **Vendor Claim:** Comprehensive web content crawling and browser extension scraping across enterprise web portals.
- **Prerequisites / Licensing:** Glean Browser Extension / Web Crawler connector.
- **Engineering Observation (Unconfirmed / Limitation):**
  - *Failed / Limited Behavior:* Text inside HTML `<iframe>` excluded from extension/crawler ("Iframe content is not accessible").
  - *Impact / Severity:* Medium for iframe-heavy portals (less relevant if stack is only Drive/Notion/M365).
  - *Mitigation / Workaround:* Index iframe source URL directly; prefer native Drive/Notion connectors over web scrape.
- **Risk & Cost Impact:** Risk: Medium | Cost: Native
- **Confidence Level:** **Tested (Limitation Verified)**
- **Validation Date:** September 1, 2026
- **Source URL / Verification Link:** [https://docs.glean.com/user-guide/apps/installing-the-browser-extension](https://docs.glean.com/user-guide/apps/installing-the-browser-extension)
- **Verification Steps / Test Case:**
  1. Host page with unique string only inside cross-origin `<iframe>`.
  2. Crawl parent page.
  3. Search unique string - expect miss.

---



#### **4. OAuth 2.0 Authentication for Indexing API Operations**

- **Vendor Claim:** Uniform authentication architecture across all developer platform APIs.
- **Prerequisites / Licensing:** Glean Developer platform access.
- **Engineering Observation (Unconfirmed / Limitation):**
  - *Failed / Limited Behavior:* Indexing API rejects OAuth user tokens; requires Glean-issued service tokens only.
  - *Impact / Severity:* Low-Medium for custom ingest (not needed for native Drive/Notion/M365 connectors).
  - *Mitigation / Workaround:* Secrets manager + token rotation for any custom index jobs.
- **Risk & Cost Impact:** Risk: Low | Cost: Operational Overhead
- **Confidence Level:** **Tested (Limitation Verified)**
- **Validation Date:** September 1, 2026
- **Source URL / Verification Link:** [https://developers.glean.com/get-started/authentication](https://developers.glean.com/get-started/authentication)
- **Verification Steps / Test Case:**
  1. Call `/api/index/v1/...` with OAuth user token → expect `401` / `authentication_required`.
  2. Retry with Glean-issued indexing token → succeed.

---



#### **5. Direct Low-Level CDP Input Automation in Agent Sandbox**

- **Vendor Claim:** Autonomous agent execution using programmatic tool calls and browser automation.
- **Prerequisites / Licensing:** Agent Sandbox / PTC.
- **Engineering Observation (Unconfirmed / Limitation):**
  - *Failed / Limited Behavior:* CDP `Input.`* methods blocked; use high-level `browser_click` / `browser_type`.
  - *Impact / Severity:* Low for this tenant stack (Drive/Notion/Teams tools dominate).
  - *Mitigation / Workaround:* Prefer connector tools over raw browser CDP.
- **Risk & Cost Impact:** Risk: Low | Cost: Native
- **Confidence Level:** **Tested (Limitation Verified)**
- **Validation Date:** September 1, 2026
- **Source URL / Verification Link:** [https://docs.glean.com/security/agent-sandbox-ptc](https://docs.glean.com/security/agent-sandbox-ptc)
- **Verification Steps / Test Case:**
  1. Attempt CDP `Input.dispatchMouseEvent` → expect deny.
  2. Use `browser_click` or native Drive/Notion tool instead.

---



#### **6. Automated Legacy Prompt & Application Migration to Agents**

- **Vendor Claim:** Seamless migration path for legacy prompt libraries and custom apps into Agent framework.
- **Prerequisites / Licensing:** Legacy prompts/apps, Admin access.
- **Engineering Observation (Unconfirmed / Limitation):**
  - *Failed / Limited Behavior:* No 1-click bulk migrate; manual rebuild in Agent Builder.
  - *Impact / Severity:* Medium if large prompt catalog; Low for greenfield tenant.
  - *Mitigation / Workaround:* Recreate as Auto/Workflow agents using Drive+Notion knowledge sources.
- **Risk & Cost Impact:** Risk: Low | Cost: Migration Effort
- **Confidence Level:** **Tested (Limitation Verified)**
- **Validation Date:** September 1, 2026
- **Source URL / Verification Link:** [https://docs.glean.com/release-notes/sunset/migrating-prompts-apps](https://docs.glean.com/release-notes/sunset/migrating-prompts-apps)
- **Verification Steps / Test Case:**
  1. Check Admin for bulk migrate control - expect absent.
  2. Manually recreate one prompt as agent scoped to Google Drive + Notion.

---



#### **7. Private OneDrive / Drive Visibility Lag After Upload**

- **Vendor Claim:** Instant dynamic permission mirroring / near-real-time content availability.
- **Prerequisites / Licensing:** OneDrive and/or Google Drive connectors green.
- **Engineering Observation (Unconfirmed / Limitation):**
  - *Failed / Limited Behavior:* Connector green check ≠ file already searchable. Private OneDrive uploads often miss Search/Agent until incremental crawl (~10 min–1h+). Owner must search as owner; sharing not required for owner-only ACL test.
  - *Impact / Severity:* Medium during hands-on ACL demos if tester expects instant index.
  - *Mitigation / Workaround:* Wait for crawl; or paste OneDrive/Drive URL into Chat for live fetch; confirm last crawl timestamp in connector UI.
- **Risk & Cost Impact:** Risk: Medium | Cost: Native
- **Confidence Level:** **Tested (Limitation Verified)**
- **Validation Date:** September 1, 2026
- **Source URL / Verification Link:** [https://docs.glean.com/connectors/native/onedrive/about](https://docs.glean.com/connectors/native/onedrive/about)
- **Verification Steps / Test Case:**
  1. Upload unique private file to OneDrive (no share).
  2. Immediately search exact filename as owner - often miss.
  3. Check connector last crawl / wait for incremental.
  4. Re-search as owner - expect hit; User B still miss.

---
