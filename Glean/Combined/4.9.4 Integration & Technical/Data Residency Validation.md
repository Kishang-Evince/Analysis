# Field 5: Data Residency Validation

**Category:** 4.9.4 - Integration & Technical  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 8 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for API latency, webhook latency, SSO/SCIM live config  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, custom Indexing SDK production deploy, Customer Hosted bootstrap (unless contracted).  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Data Residency Validation.md](../../../test/Glean/4.9.4 Integration & Technical/Data Residency Validation.md)

---

**Field definition:** Physical region where data-at-rest and processing servers are located.  
**Prerequisites / Licensing:** Deployment model; DPA / contract for country-level guarantees.  
**Residency posture (Doc-Verified):** **Regional residency supported** - Glean Hosted multi-region; Customer Hosted full in-boundary.  
**Tenant region (Pending Sandbox):** _TBD - confirm from About Glean / contract_  
**Confidence Level:** **Doc-Verified** (options) · **Pending Sandbox** (exact tenant region + DPA)  
**Validation Date:** September 3, 2026  
**Source URLs:** [About deployment](https://docs.glean.com/get-started/prepare/about-deployment) · [Core Suite pricing residency](https://docs.glean.com/glean-core-suite-pricing) · [Cloud-Prem security](https://docs.glean.com/security/cloud-prem/) · [Supported GCP regions](https://docs.glean.com/get-started/prepare/self-hosted-deployment/gcp/supported-gcp-regions) · [Supported AWS regions](https://docs.glean.com/get-started/prepare/self-hosted-deployment/aws/supported-aws-regions)

### Residency options

| Deployment | Data location | Guarantee level |
|---|---|---|
| Glean Hosted | Selected GCP/AWS region (multi-region catalog) | Regional residency in Core Suite marketing |
| Customer Hosted | Customer's own GCP project or AWS account | *"Full data residency… data doesn't leave organizational boundaries"* |
| Frontier LLM calls | Provider endpoints (Universal Key or BYOK) | See 4.9.3 Field 2 - may egress to OpenAI/Vertex/Bedrock regions |

### Engineering observation (Doc-Verified)

- Index data for Customer Hosted stored in **customer cloud account** per connector docs.
- Country-level HIPAA/GDPR guarantees require **DPA + BAA** validation (4.9.5) - not fully enumerated in technical docs alone.
- Waldo inference runs in **same region as Glean deployment** (US/EU documented in 4.9.3).

### Verification steps / test case

1. Record deployment region from contract or Glean onboarding.
2. Customer Hosted: verify indexed storage in customer GCP/AWS project.
3. Request tenant-specific IP list for egress audit.
4. BYOK: document Azure OpenAI / Vertex region for LLM data path.

**Risk & Cost Impact:** Risk: Medium (LLM provider egress) | Cost: Regional / Cloud-Prem uplift

---
