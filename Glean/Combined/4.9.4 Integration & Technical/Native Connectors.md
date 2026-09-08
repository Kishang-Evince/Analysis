# Field 7: Native Connectors

**Category:** 4.9.4 - Integration & Technical  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 8 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for API latency, webhook latency, SSO/SCIM live config  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, custom Indexing SDK production deploy, Customer Hosted bootstrap (unless contracted).  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Native Connectors.md](../../../test/Glean/4.9.4 Integration & Technical/Native Connectors.md)

---

**Field definition:** Pre-built out-of-the-box integrations; setup time and reliability.  
**Prerequisites / Licensing:** Admin connector consent; Notion workspace integration token + page share.  
**In-scope connector rating (Doc-Verified):** **All 7 surfaces have native connectors** — maturity varies (Notion share model, Gmail/Notion crawl lag).  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (setup minutes per connector)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Connectors catalog](https://www.glean.com/platform/connectors) · Per-connector: [Notion](https://docs.glean.com/connectors/native/notion/about), [Teams](https://docs.glean.com/connectors/native/teams/about), [Outlook](https://docs.glean.com/connectors/native/outlook/about), [OneDrive](https://docs.glean.com/connectors/native/onedrive/about), [Gmail](https://docs.glean.com/connectors/native/gmail/about), [GDrive](https://docs.glean.com/connectors/native/gdrive/about)

### Tenant connector inventory

| Connector | Native | Objects indexed | Freshness | Setup friction | Write tools |
|---|---|---|---|---|---|
| **Google Drive / Docs / Sheets** | Yes | Docs, Sheets, Slides, folders, shared drives | Webhooks + activity reports | Google Workspace admin consent | Docs/Sheets/Drive tools |
| **Gmail** | Yes | Inbox + sent (~6mo / 5K threads default) | History API polling | Domain-wide delegation | Gmail tools (28) |
| **Outlook** | Yes | Mail + calendar metadata | Batch + federated fetch | M365 cert / Entra app | M365 email tools |
| **OneDrive** | Yes | Files, folders, permissions | Graph webhooks | M365 parent + cert auth | M365 file tools |
| **Teams** | Yes | Channels, chats, optional transcripts | Graph webhooks | Standalone connector (not only M365 parent) | Read index; limited M365 writes |
| **Notion** | Yes | Pages, DBs, blocks (recursive) | **~6h crawl**; Live Mode MCP beta | Workspace admin + **share to integration** | Notion tools + OAuth |

### Engineering observation (Doc-Verified + tested in 4.9.1)

- Green connector check **≠** immediately searchable — crawl lag documented (OneDrive ~hourly incremental; Notion ~6h).
- Notion personal-account path poorly fits enterprise setup docs.
- Teams transcript indexing may need extra admin setup — verify in tenant.

### Verification steps / test case

1. Admin → Connectors — confirm green health for all six connector families.
2. Create `Stratos_Connector_Test_*` artifacts across each source — unified search test (4.9.1 F1.2).
3. Time connector setup from Admin Test Guide Field 6 checklist.
4. Log any source still missing after crawl wait → Field 2 limitations.

**Risk & Cost Impact:** Risk: Medium (Notion/OneDrive ops friction) | Cost: Native

---
