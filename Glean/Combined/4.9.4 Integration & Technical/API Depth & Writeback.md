# Field 2: API Depth & Writeback

**Category:** 4.9.4 - Integration & Technical  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 8 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for API latency, webhook latency, SSO/SCIM live config  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, custom Indexing SDK production deploy, Customer Hosted bootstrap (unless contracted).  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [API Depth & Writeback.md](../../../test/Glean/4.9.4 Integration & Technical/API Depth & Writeback.md)

---

**Field definition:** Scope of data mutations supported (Read-Only vs bidirectional CRUD).  
**Prerequisites / Licensing:** API token; agent tools enabled; per-user OAuth for write tools.  
**Writeback model (Doc-Verified):** **Layered** — connectors index read-only; writeback via agent tools + Glean API/index mutations, not connector CRUD to source systems.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (write tool latency + auth)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Outlook about](https://docs.glean.com/connectors/native/outlook/about) · [Teams about](https://docs.glean.com/connectors/native/teams/about) · [Gmail tools](https://docs.glean.com/tools/connector/gmail-tools) · [Google Docs tools](https://docs.glean.com/tools/connector/google-docs-tools) · [Google Sheets tools](https://docs.glean.com/tools/connector/google-sheets-tools) · [OneDrive about](https://docs.glean.com/connectors/native/onedrive/about) · [Indexing API overview](https://developers.glean.com/api/indexing-api/documents-overview)

### Read vs write matrix (tenant stack)

| System | Connector indexing | Agent write tools | Notes |
|---|---|---|---|
| **Outlook** | Read-only (Graph read scopes) | M365 email tools (draft/send with OAuth) | Connector never modifies mailbox |
| **Gmail** | Read-only indexing | Send, reply, draft, label tools (~28) | Per-user Google OAuth |
| **Google Drive/Docs/Sheets** | Read-only indexing | Docs create/update; Sheets batch/upsert; Drive read/write on connect | Docs/Sheets separate tool packs |
| **OneDrive** | Read-only indexing | M365 file create/move/share tools | Webhook scope may include `Files.ReadWrite.All` for subscriptions only |
| **Teams** | Read-only (channels, chats, transcripts) | Limited write via M365 tools where applicable | Indexing app-level read |
| **Notion** | Read-only crawl + optional Live Mode | Notion tools with per-user OAuth | No connector writeback |
| **Glean index (Indexing API)** | N/A | Full CRUD on **search index** documents | Does not write back to source app |

### Glean API mutation scope

| API | Read | Write |
|---|---|---|
| Search / Chat / Get document | Yes | No |
| Agents API (Beta) | Yes | Agent CRUD, runs |
| Platform Triggers | Subscribe | Create/delete triggers |
| Indexing API | Status queries | Index, update permissions, delete documents |
| Client governance | Reports | Policy/finding exports (admin) |

### Engineering observation (Doc-Verified)

- Architectural split is intentional: connectors preserve source-system integrity; agents perform governed writes with HITL defaults (4.9.2 Field 9).
- `tools_unauthorized` (422) until per-user OAuth complete — primary sandbox friction for writeback tests.
- Indexing API is **not** a shortcut to mutate Drive/Notion files — only Glean's index.

### Verification steps / test case

1. Confirm Outlook/Teams connector docs cite read-only Graph scopes.
2. Agent: *"Draft Gmail reply to test thread"* — measure time to draft + OAuth prompt.
3. Agent: *"Create Google Doc summary of Stratos SOW"* — verify doc in Drive.
4. Indexing API: index test doc then delete — confirm search hit removed; source app unchanged.

**Risk & Cost Impact:** Risk: Medium (unintended writes if HITL disabled) | Cost: Metered agent tool calls

---
