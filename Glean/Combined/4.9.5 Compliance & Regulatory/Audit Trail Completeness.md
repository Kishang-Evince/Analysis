# Field 3: Audit Trail Completeness

**Category:** 4.9.5 - Compliance & Regulatory  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 9 fields drafted (Doc-Verified baseline) · Contract artifacts Pending (Trust Portal, BAA, DPA PDFs, SOC 2 scope)  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Audit Trail Completeness.md](../../../test/Glean/4.9.5 Compliance & Regulatory/Audit Trail Completeness.md)

---

**Field definition:** Log immutability and detail level for administrative and AI actions.  
**Prerequisites / Licensing:** Admin audit log access; optional GCE log export to BigQuery/S3/SIEM.  
**Audit completeness rating (Doc-Verified):** **Split architecture** - strong admin config trail + GCE user/AI events; not one unified immutable log.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (GCE export provisioned?)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Admin audit logs](https://docs.glean.com/administration/management/audit-logs/admin-audit-logs) · [GCE data dictionary](https://docs.glean.com/administration/gce-logs/data-dictionary) · [Security principles](https://docs.glean.com/security/security-principles) · [Chat history config](https://docs.glean.com/administration/assistant/configuration/chat-history)

### Log type matrix

| Log type | Captures | Does NOT capture | Retention (doc) |
|---|---|---|---|
| **Admin audit logs** | Connector setup/delete, crawl changes, feature toggles, global config, agent subscriptions, action executions | End-user search/chat content | **30 days** default; extended via account team |
| **GCE logs** | `SEARCH`, `CHAT`, `CHAT_CITATIONS`, `WORKFLOW_RUN`, `LLM_CALL`, `MCP_USAGE`, `WORKFLOW_CONVERSATION` | Admin config changes | Per export pipeline |
| **Protect Findings** | Sensitive + AI security events | - | Dashboard + export |
| **Chat history** | User-visible chat threads (if enabled) | Independent of GCE `CHAT` events | Org setting: Off, 30d, 90d, 6mo, 1yr |

### Engineering observation (Doc-Verified)

- Admin audit logs explicitly **exclude** end-user activity, connector crawl telemetry, API rate metrics.
- Disabling chat history does **not** stop GCE `CHAT` event logging - important for privacy vs audit tradeoff clarity.
- SIEM streaming available on request; Customer Hosted AWS has `audit-log` CloudWatch group.

### Verification steps / test case

1. Change Outlook connector setting - verify Admin audit log entry + CSV export.
2. Run Assistant query citing Drive doc - query GCE `CHAT` + `CHAT_CITATIONS` (if export provisioned).
3. Run agent with Notion tool - verify `WORKFLOW_RUN` in GCE.
4. Confirm 30-day admin window; request extended retention if compliance requires >30 days.

**Risk & Cost Impact:** Risk: Medium (fragmented logs) | Cost: SIEM export may be add-on

---
