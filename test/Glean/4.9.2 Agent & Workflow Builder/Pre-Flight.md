# 4.9.2 Admin Test Guide — Glean Agent & Workflow Builder

**Purpose:** Hands-on verification of all 10 fields under `4.9.2 Agent & Workflow Builder`.  
**Tenant entry:** `https://app.glean.com` → Agents / Agent Builder  
**Companion eval log:** `Glean/Combined/4.9.2 Agent & Workflow Builder/Overview.md` (analysis deliverable — not in this folder)  
**Knowledge base:** `scrap/glean/docs.glean.com/agents/`, `scrap/glean/developers.glean.com/api/client-api/agents/`

**Tenant test stack (in scope):** Notion, Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope:** Salesforce, Slack, Jira, Gong, GitHub content triggers, etc.

---

## 0. Pre-Flight

1. Login Admin A at `https://app.glean.com`
2. Confirm **Agents** / **Agent Builder** in nav
3. Complete per-user OAuth: **Users & permissions → Third-party access** (Google + Microsoft + Notion)
4. Test artifacts ready: `Stratos_Connector_Test_Doc`, Notion SLA page (shared with integration), Gmail/Outlook test threads
5. API token + Server URL from **About Glean** (Field 5, 10 API trigger tests)

---

## Fields in this section

- [Field 1 — Builder Type](Builder Type.md)
- [Field 2 — Agent Autonomy Level](Agent Autonomy Level.md)
- [Field 3 — Workflow Complexity Ceiling](Workflow Complexity Ceiling.md)
- [Field 4 — Pre-Built Templates](Pre-Built Templates.md)
- [Field 5 — Custom Code Support](Custom Code Support.md)
- [Field 6 — Multi-Agent Orchestration](Multi-Agent Orchestration.md)
- [Field 7 — Testing & Debugging Tools](Testing & Debugging Tools.md)
- [Field 8 — Versioning & Rollback](Versioning & Rollback.md)
- [Field 9 — Human-in-the-Loop Design](Human-in-the-Loop Design.md)
- [Field 10 — Trigger Types Supported](Trigger Types Supported.md)

---

## Evidence → Eval Log Mapping

| Test block | Write into |
|---|---|
| Builder matrix | Field 1 Builder Type |
| Autonomy tests | Field 2 Agent Autonomy Level |
| Loop/branch stress | Field 3 Workflow Complexity Ceiling |
| Template inventory | Field 4 Pre-Built Templates |
| Export/import/API | Field 5 Custom Code Support |
| Sub-agent + parallel | Field 6 Multi-Agent Orchestration |
| Debug tooling | Field 7 Testing & Debugging Tools |
| Publish/restore | Field 8 Versioning & Rollback |
| HITL matrix | Field 9 Human-in-the-Loop Design |
| Trigger table + latency | Field 10 Trigger Types Supported |

After each session: update [`Glean/Combined/4.9.2 Agent & Workflow Builder/Pre-Flight.md`](../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/Pre-Flight.md) — change Pending → Tested where measured.

---

## Safety Rules

1. No production mailbox-wide unfiltered content triggers — always use subject/sender filters.
2. Stop parallel agent tests on sustained 429 or tenant policy block.
3. HITL opt-out writes only in disposable test accounts.
4. Do not commit API tokens.
