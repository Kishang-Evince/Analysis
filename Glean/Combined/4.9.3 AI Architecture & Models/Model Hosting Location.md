# Field 2: Model Hosting Location

**Category:** 4.9.3 - AI Architecture & Models  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 12 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for Model Hub inventory, context limits, Protect+ triggers  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Snowflake/BigQuery, custom fine-tuning, on-prem appliance.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Model Hosting Location.md](../../../test/Glean/4.9.3 AI Architecture & Models/Model Hosting Location.md)

---

**Field definition:** Confirmed physical/cloud hosting location for model inference.  
**Prerequisites / Licensing:** Know deployment type (Glean Hosted vs Customer Hosted); BYOK provider contracts if applicable.  
**Hosting classification (Doc-Verified):** **Cloud SaaS** - Glean Hosted (GCP) or Customer Hosted (customer GCP/AWS account); frontier models via provider endpoints in aligned region.  
**Tenant deployment (Pending Sandbox):** _TBD - confirm Hosted vs Cloud-Prem + region from About Glean / contract_  
**Confidence Level:** **Doc-Verified** (architecture) · **Pending Sandbox** (exact tenant region + BYOK endpoint map)  
**Validation Date:** September 3, 2026  
**Source URLs:** [About deployment](https://docs.glean.com/get-started/prepare/about-deployment) · [Cloud-Prem security](https://docs.glean.com/security/cloud-prem/) · [LLMs availability by environment](https://docs.glean.com/administration/llms#availability-by-hosting-environment-and-provider) · [Adaptive reasoning regional inference](https://docs.glean.com/administration/assistant/features/adaptive-reasoning)

### Hosting topology

| Layer | Location | Tenant data path |
|---|---|---|
| Glean index + app | Glean Hosted GCP **or** Customer Hosted GCP/AWS | Stays in tenant environment per deployment model |
| Waldo inference | Same region as Glean deployment (US/EU documented) | Glean-managed Vertex/SageMaker |
| Frontier LLMs (Universal Key) | Provider endpoints (OpenAI, Vertex, Bedrock, Anthropic) | Glean-routed with ZDR claims on Universal Key |
| Frontier LLMs (BYOK) | **Your** Azure OpenAI / Vertex / Bedrock region | Cross-cloud restricted: GCP tenant cannot use Bedrock; AWS cannot use Vertex |

### Engineering observation (Doc-Verified)

- No on-prem appliance documented - Customer Hosted is **managed SaaS in customer cloud**, not self-operated VMs.
- BYOK gives contractual control over provider region via your Azure/Vertex/Bedrock deployment names.
- Exact frontier-model region per Universal Key call is **opaque** without contract addendum - log network egress in sandbox if HIPAA residency is hard requirement.

### Verification steps / test case

1. Confirm deployment model from onboarding / Admin → About Glean.
2. If BYOK: document Azure OpenAI or Vertex **deployment name + region**.
3. Run Assistant query; check GCE `LLM_CALL` for provider + model metadata.
4. Map whether tenant is `app.glean.com` Glean Hosted vs customer QE domain.

**Risk & Cost Impact:** Risk: Medium (residency audits) | Cost: Cloud-Prem premium if required

---
