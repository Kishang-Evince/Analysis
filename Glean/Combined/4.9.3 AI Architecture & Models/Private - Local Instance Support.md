# Field 3: Private / Local Instance Support

**Category:** 4.9.3 - AI Architecture & Models  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 12 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for Model Hub inventory, context limits, Protect+ triggers  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Snowflake/BigQuery, custom fine-tuning, on-prem appliance.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Private - Local Instance Support.md](../../../test/Glean/4.9.3 AI Architecture & Models/Private - Local Instance Support.md)

---

**Field definition:** Feasibility of dedicated or local LLMs/SLMs within private clouds.  
**Prerequisites / Licensing:** Customer Hosted contract; optional BYOK keys.  
**Private instance rating (Doc-Verified):** **Private cloud yes** (Customer Hosted) · **True on-prem / air-gap no** · **BYOK for provider isolation yes**.  
**Confidence Level:** **Doc-Verified**  
**Validation Date:** September 3, 2026  
**Source URLs:** [About deployment](https://docs.glean.com/get-started/prepare/about-deployment) · [Configure LLMs / BYOK](https://docs.glean.com/administration/configure-llms) · [Cloud-Prem index](https://docs.glean.com/security/cloud-prem/) · [Universal Model Key / ZDR](https://www.glean.com/platform/model-hub)

### Deployment options matrix

| Option | Supported? | What you get |
|---|---|---|
| Glean Hosted (multi-tenant SaaS on GCP) | Yes | Single-tenant logical isolation; Glean-operated |
| Customer Hosted (Cloud-Prem in your GCP/AWS) | Yes | Full stack in customer account; Glean still manages |
| BYOK (Customer Key) | Yes | Your OpenAI/Azure/Vertex/Bedrock/Anthropic contracts |
| On-prem appliance / air-gapped | **No evidence** | Not in deployment docs |
| Customer-run local SLM only | **No** | Must use Model Hub providers or Waldo |

### Engineering observation (Doc-Verified)

- Customer Hosted is **not** DIY patching - Glean operates integrated architecture inside your cloud boundary.
- **Universal Model Key** marketed as ZDR-compliant with no training on enterprise data.
- Tenant sandbox (`app.glean.com`) is likely Glean Hosted - Cloud-Prem not verifiable without separate contract.

### Verification steps / test case

1. Confirm tenant URL pattern (shared SaaS vs customer-hosted QE).
2. Admin → Models → attempt **Add LLM** with BYOK key (if licensed).
3. Ask Glean rep for Cloud-Prem quote if residency requires customer account boundary.
4. Document: Hosted / Cloud-Prem / BYOK for Stratos eval record.

**Risk & Cost Impact:** Risk: Low (Hosted) / Medium (regulated workloads need Cloud-Prem) | Cost: High for Cloud-Prem

---
