# Field 3: Webhook Support Quality

**Category:** 4.9.4 - Integration & Technical  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 8 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for API latency, webhook latency, SSO/SCIM live config  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, custom Indexing SDK production deploy, Customer Hosted bootstrap (unless contracted).  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Webhook Support Quality.md](../../../test/Glean/4.9.4 Integration & Technical/Webhook Support Quality.md)

---

**Field definition:** Inbound/outbound webhook event reliability and trigger configurations.  
**Prerequisites / Licensing:** Connector health; optional Platform Triggers experimental header; allowlisted IPs for inbound.  
**Webhook quality rating (Doc-Verified):** **Connector-dependent inbound**; **experimental outbound** via Platform Triggers (Standard Webhooks, HMAC-SHA256).  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (measured latency per connector)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Crawling and learning](https://docs.glean.com/get-started/review/crawling-and-learning) · [Platform Triggers overview](https://developers.glean.com/api/platform-api/triggers-overview) · [Glean IP ranges](https://docs.glean.com/security/networking/glean-ip-ranges) · Connector setup: [Teams](https://docs.glean.com/connectors/native/teams/setup), [OneDrive](https://docs.glean.com/connectors/native/onedrive/setup), [GDrive](https://docs.glean.com/connectors/native/gdrive/about), [Gmail](https://docs.glean.com/connectors/native/gmail/about), [Notion](https://docs.glean.com/connectors/native/notion/about)

### Inbound (source → Glean index)

| Connector | Mechanism | Typical freshness | Quality tier |
|---|---|---|---|
| **Google Drive** | Webhooks + 10-min activity reports | Minutes | Good |
| **OneDrive** | Microsoft Graph change notifications | Near real-time (subscription) | Good |
| **Teams** | Graph webhooks for channels | Near real-time + incremental crawl | Good |
| **Gmail** | **History API polling** (no webhooks) | Few minutes | Moderate |
| **Outlook** | Indexed batch + optional federated fetch | Incremental | Moderate |
| **Notion** | **Scheduled crawl only** (no webhooks) | Full crawl ~6 hours | Weak |

- General doc pattern: most connectors support webhooks processed in **1–5 minutes** with **24-hour incremental crawl** safety net — but Notion/Gmail deviate.

### Outbound (Glean → customer endpoint)

- **Platform Triggers API:** subscribe to presets (e.g., calendar events, reviews); delivers Standard Webhooks signed HMAC-SHA256; scoped to subscriber permissions.
- Marked **experimental** — requires `X-Glean-Include-Experimental: true`.
- Distinct from agent **content triggers** (4.9.2 Field 10) which run agents, not arbitrary webhook URLs.

### Networking

- Each tenant gets dedicated **inbound webhook IP** plus crawler egress and load balancer IPs — request from Glean Support for allowlisting.

### Verification steps / test case

1. Edit Teams channel message — search Glean within 5 min.
2. Upload Drive doc — measure index appearance time.
3. Edit Notion page — measure crawl lag (expect up to ~6h) vs Live Mode fetch.
4. Platform Trigger: create preset → test endpoint — verify signature + payload.
5. Log Gmail thread change — note polling delay vs Drive webhook speed.

**Risk & Cost Impact:** Risk: Medium (Notion/Gmail staleness) | Cost: Native

---
