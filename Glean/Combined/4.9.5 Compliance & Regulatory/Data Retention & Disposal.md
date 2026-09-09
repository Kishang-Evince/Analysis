# Field 4: Data Retention & Disposal

**Category:** 4.9.5 - Compliance & Regulatory  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 9 fields drafted (Doc-Verified baseline) · Contract artifacts Pending (Trust Portal, BAA, DPA PDFs, SOC 2 scope)  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Data Retention & Disposal.md](../../../test/Glean/4.9.5 Compliance & Regulatory/Data Retention & Disposal.md)

---

**Field definition:** Controls governing customer data purge limits and post-termination scrubbing.  
**Prerequisites / Licensing:** Admin Assistant settings; connector admin for disposal tests.  
**Retention controls (Doc-Verified):** Org-level chat retention; connector index disposal on delete; source deletion via webhooks/crawl reconciliation.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (termination scrub SLA)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Chat history retention](https://docs.glean.com/administration/assistant/configuration/chat-history) · [Crawling FAQ](https://docs.glean.com/connectors/crawling-faq) · [Outlook restrictions / lookback](https://docs.glean.com/connectors/native/outlook/restrictions) · [Limited Retention Addendum](https://www.glean.com/legal/limited-retention-addendum)

### Retention mechanisms

| Data class | Control | Disposal behavior |
|---|---|---|
| **Chat history** | Org setting: Off, 30d, 90d, 6mo, 1yr | Decreasing retention **immediately purges** out-of-window chats |
| **Indexed connector data** | Connector instance lifecycle | Delete connector removes index in background (~5 min search disappearance) |
| **Source deletions** | Webhooks (Drive) + full-crawl reconcile | Removed from index per connector SLA |
| **Outlook mail** | Lookback window = crawl scope + retention bound | Reducing lookback drops older mail on next crawl |
| **Contract termination** | Limited Retention Addendum referenced | Legal review required - text not in product docs |

### Engineering observation (Doc-Verified)

- Chat retention is org-wide - affects all users immediately on change.
- Index disposal on connector delete is fast (~5 min) but **not instant**.
- Post-contract data scrubbing timelines require **Limited Retention Addendum / DPA** - not enumerated in Admin UI.

### Verification steps / test case

1. Set chat retention 30 days - create test chat - verify retention message.
2. Delete test Drive doc - confirm removal from search within connector SLA.
3. Delete test connector instance - confirm docs vanish from search within ~5 min.
4. Legal: review Limited Retention Addendum for termination scrub SLA.

**Risk & Cost Impact:** Risk: Low | Cost: Native

---
