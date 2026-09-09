**Glean Tier 3 Advanced Evaluation**
**Foundation Models Used - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `docs.glean.com` and `www.glean.com`. Field definition: "The specific large language or machine learning models driving the generative intelligence." Base file at [`../Foundation Models Used.md`](../Foundation%20Models%20Used.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-11 below map 1:1 to the same Sr No in the companion test guide [test/V2/Foundation Models Used.md](../../../../test/Glean/4.9.3%20AI%20Architecture%20&%20Models/V2/Foundation%20Models%20Used.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Glean is **multi-provider and multi-model by design**, mixing third-party frontier models with its own proprietary model, but exact naming/availability is a moving target the docs explicitly warn about - and there's no documented single admin screen that shows "here is the exact model currently serving each feature right now."

## Claims (Sr No 1-11, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Model Hub advertises 40+ open and proprietary LLMs available, with auto-routing across them | [glean.com/platform/model-hub](https://www.glean.com/platform/model-hub) | *"40+ open and proprietary LLMs"*; auto-routing *"selects from 40+ LLMs based on performance and cost."* |
| 2 | Specific OpenAI models are named, not just "OpenAI" as a provider | [docs.glean.com/administration/llms](https://docs.glean.com/administration/llms) | Named models include GPT-4.1, GPT-4.1 mini, GPT-5.1, GPT-5.2, GPT-5.4, GPT-5.5, GPT-5.6 (and named variants), GPT Realtime family, GPT-4o Transcribe, GPT Image 2. |
| 3 | Specific Google Gemini models are named | [docs.glean.com/administration/llms](https://docs.glean.com/administration/llms) | Gemini 3 Flash, 3.1/3.5/3.6/3.7/3.8 Flash variants, 3.1 Pro (+ "Custom Tools" variant), plus image models Nano Banana 2 / Nano Banana Pro. |
| 4 | Specific Anthropic Claude models are named | [docs.glean.com/administration/llms](https://docs.glean.com/administration/llms) | Claude Haiku 4.5, Claude Sonnet 4.6, Claude Sonnet 5, Claude Opus 4.6/4.7/4.8/5, Claude Fable 5/5.1. |
| 5 | Additional named providers beyond the "big 3": Amazon, and smaller inference providers | [docs.glean.com/administration/llms](https://docs.glean.com/administration/llms) | Amazon Nova Pro 1.0; GLM 5.2 (via Fireworks/Baseten); Nemotron 3 Ultra (via Baseten). |
| 6 | Glean's own proprietary model sits in the same catalog as third-party models, not a separate hidden system | [docs.glean.com/administration/llms](https://docs.glean.com/administration/llms) | "Waldo" is listed as a first-class Model Hub entry alongside OpenAI/Google/Anthropic/Amazon models. |
| 7 | Provider availability differs by key/deployment type - not every provider is available on every plan | [docs.glean.com/administration/llm-key-feature-availability](https://docs.glean.com/administration/llm-key-feature-availability) | Matrix: OpenAI and Azure OpenAI available on all 3 key types (Glean Universal, GCP Customer, AWS Customer); Google Vertex AI available on Universal + GCP Customer only (not AWS Customer); Amazon Bedrock available on Universal + AWS Customer only (not GCP Customer); **Anthropic is NOT available on Glean's own Universal Key at all - only via GCP Customer Key or AWS Customer Key.** |
| 8 | Specific Glean features are pinned to specific named model minimums, not "any model" | [docs.glean.com/administration/llm-key-feature-availability](https://docs.glean.com/administration/llm-key-feature-availability) | Deep Research reasoning requires GPT-5.1; Agent Sandbox requires Claude Sonnet 4.6 or Claude Opus 4.6+; agentic search uses NVIDIA Nemotron-3 Nano (30B-A3B) specifically; real-time voice requires GPT Realtime 2.1 + GPT Transcribe (OpenAI/Azure only); Customer Key Gemini path requires the "Custom Tools" variant specifically, not plain Gemini Pro 3.1. |
| 9 | Customer Key deployments must keep 4 model-role defaults on one single provider | [docs.glean.com/administration/llm-key-feature-availability](https://docs.glean.com/administration/llm-key-feature-availability) | Verbatim: *"For Customer Key deployments, the large, small, agentic, and fast agentic model defaults must come from the same provider."* Universal Key customers aren't bound by this - a real deployment-model tradeoff. |
| 10 | Admins can restrict which models are exposed to end users, including keeping some in limited rollout | [docs.glean.com/get-started/golive/model-choice](https://docs.glean.com/get-started/golive/model-choice) | *"Decide which models are available for users in Glean Chat and Builder Assistant"*; can *"keep some models in beta or limited rollout, and set Auto for everyone else."* |
| 11 | No documented single admin view shows exactly which model is live for each feature right now, and model availability is stated to shift over time | [docs.glean.com/get-started/golive/model-choice](https://docs.glean.com/get-started/golive/model-choice) | Verbatim: *"Model names and availability can change over time as providers release new versions or retire older ones."* No dedicated "current active model per feature" dashboard/report described anywhere found this pass - a real transparency gap for a buyer wanting a stable, auditable answer to "what model runs my agent." |

## Independent read

- The model list itself (claim 2-6) is not a fixed roster - it's explicitly a living catalog (claim 11), so any point-in-time list (including this one) should be treated as a snapshot, not a permanent spec.
- Provider-availability asymmetry (claim 7) is a genuine finding a buyer needs: choosing "Universal Key" specifically forecloses Anthropic models entirely, which matters if a client has an Anthropic-only compliance preference.
- Per-feature model pinning (claim 8) means "Foundation Models Used" isn't one answer - it's a matrix of feature -> minimum required model, and that matrix is more specific/restrictive than generic Model Hub marketing implies.

## Confidence

**Doc-Verified**, 4 independent sources, validation date 2026-09-09. No sandbox/tenant access used - everything above is publicly readable without login. Tenant verification of all 11 claims tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Total catalog size (advertised) | 40+ open and proprietary LLMs | 1 |
| Named model families | OpenAI, Google Gemini, Anthropic Claude, Amazon Nova, GLM, Nemotron, Glean's own Waldo | 2-6 |
| Provider availability is key-type-dependent | Anthropic excluded from Universal Key entirely | 7 |
| Feature-to-model pinning | Deep Research, Agent Sandbox, agentic search, real-time voice each require named minimums | 8 |
| Customer Key constraint | 4 model-role defaults must share one provider | 9 |
| Admin control | Can restrict/beta-gate models per deployment | 10 |
| Transparency gap | No documented live "current model per feature" admin view; catalog explicitly stated to shift over time | 11 |
