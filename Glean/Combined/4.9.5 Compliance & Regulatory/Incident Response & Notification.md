# Field 7: Incident Response & Notification

**Category:** 4.9.5 - Compliance & Regulatory  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 9 fields drafted (Doc-Verified baseline) · Contract artifacts Pending (Trust Portal, BAA, DPA PDFs, SOC 2 scope)  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Incident Response & Notification.md](../../../test/Glean/4.9.5 Compliance & Regulatory/Incident Response & Notification.md)

---

**Field definition:** SLA timelines and workflows for breach identification and customer reporting.  
**Prerequisites / Licensing:** Customer SLA PDF; status page subscription.  
**Incident comms (Doc-Verified):** Status page + admin email + in-product banners; support ticket workflow documented.  
**Breach notification SLA (Pending Contract):** _TBD — not in product docs; request SLA/DPA_  
**Confidence Level:** **Doc-Verified** (operational comms) · **Pending Contract** (notification timelines)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Status page](https://docs.glean.com/get-started/start/status-page) · [Customer SLA](https://glean.com/legal/sla) · [Support troubleshooting](https://docs.glean.com/troubleshooting/deployment/support-troubleshooting-in-restricted-glean-environments) · [SDLC security exercises](https://docs.glean.com/security/architecture/sdlc)

### Documented incident channels

| Channel | Scope | Notes |
|---|---|---|
| `status.glean.com` | Multi-customer incidents | Localized tenant issues may not appear |
| Email to admins | Org-specific issues | Confirm admin contact list with CSM |
| In-product banners | Active incidents | |
| `support.glean.com` | Ticket workflow | Include task, time, scope, URLs/errors |
| Customer SLA PDF | Uptime + support response | Breach notification likely here, not in docs |

### Engineering observation (Doc-Verified)

- SDLC doc: tabletop exercises + external pen tests; reports under NDA via account team.
- **No 72-hour GDPR breach notification** language found in scraped product docs — must pull from DPA/Security Standard.
- Restricted environments troubleshooting references Customer SLA PDF.

### Verification steps / test case

1. Subscribe to status.glean.com email alerts.
2. Confirm admin incident email recipients with Glean CSM.
3. File test support ticket — measure first response vs Customer SLA.
4. Legal: extract breach notification clause from DPA + Security Standard.

**Risk & Cost Impact:** Risk: Medium (contract-dependent) | Cost: Native

---
