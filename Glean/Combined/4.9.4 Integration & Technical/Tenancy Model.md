# Field 4: Tenancy Model

**Category:** 4.9.4 - Integration & Technical  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 8 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for API latency, webhook latency, SSO/SCIM live config  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, custom Indexing SDK production deploy, Customer Hosted bootstrap (unless contracted).  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Tenancy Model.md](../../../test/Glean/4.9.4 Integration & Technical/Tenancy Model.md)

---

**Field definition:** Database tenant architecture (shared multi-tenant vs isolated single-tenant).  
**Prerequisites / Licensing:** Contract / About Glean deployment info.  
**Tenancy classification (Doc-Verified):** **Single-tenant** - isolated infrastructure per customer in both Glean Hosted and Customer Hosted models.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (confirm dedicated backend domain)  
**Validation Date:** September 3, 2026  
**Source URLs:** [About deployment](https://docs.glean.com/get-started/prepare/about-deployment) · [Outlook setup (Entra single-tenant app)](https://docs.glean.com/connectors/native/outlook/choose-your-setup) · [OneDrive new setup](https://docs.glean.com/connectors/native/onedrive/new-setup)

### Deployment models (both single-tenant)

| Model | Where infra runs | Customer responsibility |
|---|---|---|
| **Glean Hosted** | Glean-managed GCP SaaS | None (true SaaS) |
| **Customer Hosted** | Customer GCP or AWS account | Cloud account + networking allowlists; Glean still operates stack |

### Engineering observation (Doc-Verified)

- Docs: *"single-tenant infrastructure… isolates your data from other customers' data."*
- Microsoft connectors use **single-tenant Entra app registrations** - aligns with enterprise isolation pattern.
- `app.glean.com` is shared **frontend**; backend is tenant-specific `https://<instance>-be.glean.com` - logical single-tenant with shared UI shell.

### Verification steps / test case

1. Admin → About Glean - record dedicated Server URL / instance ID.
2. Azure portal - confirm Entra enterprise app is single-tenant (not multi-tenant).
3. Contract review - confirm single-tenant language vs multi-tenant SaaS competitors.

**Risk & Cost Impact:** Risk: Low | Cost: Customer Hosted premium if required

---
