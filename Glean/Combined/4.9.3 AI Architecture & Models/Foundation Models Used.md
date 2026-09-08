# Field 1: Foundation Models Used

**Category:** 4.9.3 - AI Architecture & Models  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 12 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for Model Hub inventory, context limits, Protect+ triggers  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Snowflake/BigQuery, custom fine-tuning, on-prem appliance.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Foundation Models Used.md](../../../test/Glean/4.9.3 AI Architecture & Models/Foundation Models Used.md)

---

**Field definition:** Specific large language or machine learning models driving generative intelligence.  
**Prerequisites / Licensing:** Admin → Platform → Models (Model Hub); Enterprise Flex or Core Suite with model tier entitlements.  
**Model catalog summary (Doc-Verified):** **40+ models** across OpenAI, Google (Gemini), Anthropic (Claude), Amazon (Nova), Glean (Waldo), Fireworks/Baseten (GLM, Nemotron).  
**Tenant-enabled set (Pending Sandbox):** _TBD — screenshot Model Hub enabled list_  
**Confidence Level:** **Doc-Verified** (catalog) · **Pending Sandbox** (tenant enablement)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Supported LLMs / Model Hub](https://docs.glean.com/administration/llms) · [Configure LLMs](https://docs.glean.com/administration/configure-llms) · [Enterprise Flex pricing tiers](https://docs.glean.com/glean-enterprise-flex-pricing) · [Adaptive reasoning / Waldo](https://docs.glean.com/administration/assistant/features/adaptive-reasoning)

### Documented model families (representative)

| Provider | Example models (docs) | Tier class | Glean-native notes |
|---|---|---|---|
| OpenAI | GPT-4.1, GPT-5.x family, o-series | Basic / Standard / Premium | BYOK via Azure OpenAI or OpenAI |
| Google | Gemini 3.x Flash/Pro | Tiered | Vertex AI BYOK |
| Anthropic | Claude Haiku/Sonnet/Opus 4.5–5 | Tiered | Direct API key (cross-cloud) |
| Amazon | Nova Pro | Tiered | Bedrock BYOK (AWS deployments) |
| Glean | **Waldo** (agentic search) | Glean-managed | Nemotron-3 Nano (30B-A3B) RL fine-tuned by Glean |
| Open models | GLM 5.2, Nemotron 3 Ultra | Varies | Via Fireworks/Baseten |

### Engineering observation (Doc-Verified)

- Model Hub is curated catalog — admins enable/disable per Assistant and Agents.
- **Waldo** is Glean's proprietary agentic retrieval model; runs on Glean-managed Vertex/SageMaker in deployment region — not a third-party chat endpoint.
- Flex pricing maps models to **Basic / Standard / Premium** credit tiers; tier per model can change per contract.

### Verification steps / test case

1. Admin → **Platform → Models** — export enabled model list with tier badges.
2. Assistant: select GPT, Claude, Gemini in separate sessions; note picker availability.
3. Thinking/Fast mode — confirm Waldo or frontier routing in usage logs (`LLM_CALL` event).
4. Record tenant-enabled set in Pending Sandbox column.

**Risk & Cost Impact:** Risk: Low | Cost: FlexCredits tier-dependent

---
