# Field 5: Fine-Tuning Capabilities

**Category:** 4.9.3 - AI Architecture & Models  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 12 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for Model Hub inventory, context limits, Protect+ triggers  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Snowflake/BigQuery, custom fine-tuning, on-prem appliance.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Fine-Tuning Capabilities.md](../../../test/Glean/4.9.3 AI Architecture & Models/Fine-Tuning Capabilities.md)

---

**Field definition:** Process and constraints for tuning models on custom corporate documents.  
**Prerequisites / Licensing:** N/A — feature not offered to customers.  
**Fine-tuning rating (Doc-Verified):** **Not offered** — no customer LLM fine-tuning UI or API documented.  
**Confidence Level:** **Doc-Verified**  
**Validation Date:** September 3, 2026  
**Source URLs:** [Adaptive reasoning / Waldo training](https://docs.glean.com/administration/assistant/features/adaptive-reasoning) · [OpenAI BYOK setup](https://docs.glean.com/administration/management/models/provider-setup/open-ai-setup) · [Vertex setup](https://docs.glean.com/administration/management/models/provider-setup/google-vertex-setup)

### What Glean tunes internally (not customer-configurable)

| Component | Tuning | Customer data used? |
|---|---|---|
| Waldo (Nemotron-3) | Glean RL fine-tune on internal query dataset | **No** customer data per docs |
| Hybrid search embeddings | Domain-adapted embedding model (Glean-managed) | Index content for retrieval, not LLM weight training |
| Frontier system prompts | Glean may tune vendor prompts on model launches | Vendor-side, not tenant UI |

### BYOK provider no-training claims (Doc-Verified)

- OpenAI ZDR option; Vertex/Bedrock default no foundation-model training on customer data per provider setup docs.

### Engineering observation (Doc-Verified)

- Quality improvements for tenant come from **RAG indexing + connectors + custom instructions**, not weight fine-tuning.
- Healthcare clients needing clinical fine-tune must use external pipeline + BYOK model they fine-tuned elsewhere — not native Glean feature.

### Verification steps / test case

1. Search Admin Console for fine-tune / training / adapter settings — expect **none**.
2. Confirm RAG improvement path: share Notion page, wait crawl, re-query.
3. Contract review: confirm no fine-tuning SKU in Enterprise Flex line items.

**Risk & Cost Impact:** Risk: Low (expectation gap) | Cost: N/A

---
