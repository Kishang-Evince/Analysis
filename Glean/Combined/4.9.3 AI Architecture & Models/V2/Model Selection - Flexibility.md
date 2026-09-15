**Glean Tier 3 Advanced Evaluation**
**Model Selection - Flexibility - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `docs.glean.com`. Field definition: "Ability to swap underlying LLM providers or models without breaking workflows." Base file at [`../Model Agnosticism.md`](../Model%20Agnosticism.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-6 below map 1:1 to the same Sr No in the companion test guide [test/V2/Model Selection - Flexibility.md](../../../../test/Glean/4.9.3%20AI%20Architecture%20&%20Models/V2/Model%20Selection%20-%20Flexibility.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Glean is architecturally model-agnostic - swapping is a real, supported, per-step configuration action, not a workaround. But **"can swap" and "swapping won't break anything" are two different claims**, and only the first one is well-supported. There is a documented real-world case where a provider-side model change silently breaks any workflow relying on the old behavior, and no tooling or guidance was found anywhere for detecting or preventing that before it happens.

## Claims (Sr No 1-6, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Model selection is genuinely per-step and per-agent, not a single global setting - this is the structural basis for model agnosticism | [docs.glean.com/agents/concepts/agent-builder](https://docs.glean.com/agents/concepts/agent-builder) | *"The Glean Model Hub enables you to experiment with and select the most suitable model for each agent and its respective steps."* Further: *"This selection of models allows organizations to flexibly experiment with, choose, and combine leading AI models for each step of their workflows."* |
| 2 | There are actually two separate, easily-confused "model selection" surfaces - a chat-session picker and an agent/step configuration - and changing one does not change the other | [docs.glean.com/get-started/golive/model-choice](https://docs.glean.com/get-started/golive/model-choice) | Verbatim: *"The selection applies to a particular chat session. You can pick a model for a conversation, but you cannot change the global default models used by Assistant for your organization."* Separately, for Builder Assistant specifically: *"Chat-only for Builder Assistant: Builder Assistant model selection controls the model used for chat interactions. It does not change the models configured for the agent or individual agent steps."* |
| 3 | No documentation found anywhere describes a built-in way to measure prompt/output quality degradation when swapping a model - this would be an entirely manual, customer-run exercise | [docs.glean.com/agents/agent-development-lifecycle/build-safe-and-maintainable-agents](https://docs.glean.com/agents/agent-development-lifecycle/build-safe-and-maintainable-agents) | Best-practices doc covers scoping, safe write behavior, admin controls, data boundaries, and maintainability - but contains **no mention** of model-switching risk, before/after regression testing, or prompt-portability guidance across models. |
| 4 | There is at least one real, documented, dated case of a provider-side model change breaking any workflow that depended on the old behavior - proving the risk isn't theoretical | [docs.glean.com/release-notes/releases/2026-05-06-may-release](https://docs.glean.com/release-notes/releases/2026-05-06-may-release) | Verbatim: *"Anthropic is retiring the 1M token context window beta for Claude Sonnet 4.5 and Claude Sonnet 4 on April 30, 2026. After this date, the `context-1m-2025-08-07` beta header will have no effect and requests exceeding the standard 200k-token context window will return an error."* Any agent built assuming the 1M window (e.g. summarizing very large document sets in one call) breaks on this date unless proactively migrated. |
| 5 | Glean's own release note tells customers what to migrate *to*, but does not proactively identify *which* of their existing agents are actually at risk | [docs.glean.com/release-notes/releases/2026-05-06-may-release](https://docs.glean.com/release-notes/releases/2026-05-06-may-release) | *"Users should migrate to Claude Sonnet 4.6 or Claude Opus 4.6, which support 1M context at standard pricing with no beta header required."* No mention of an audit tool, notification, or dashboard that flags specifically which agents in a given tenant use the retiring beta header - the burden of finding at-risk agents falls entirely on the customer. |
| 6 | Model deprecation/lifecycle guidance that does exist is scoped to API endpoints and fields, not to LLM model versions themselves - the two are separate, unrelated deprecation tracks | [developers.glean.com/deprecations](https://developers.glean.com/deprecations) | Page is explicitly *"a Deprecation List for Glean's APIs"* - covers deprecated endpoints/fields (e.g. `/api/index/v1/bulkindexemployees`, a retiring `citations` chat-response field). Contains nothing about model version deprecation, auto-migration, or agent-impact warnings - that information lives only in scattered release notes (claim 4), not a dedicated lifecycle/deprecation page. |

## Independent read

- Claims 1-2 support the "agnostic by design" half of the field cleanly - Glean is not architecturally locked to one provider, and the platform correctly separates chat-session model choice from an agent's actual configured model.
- Claims 3-6 are the more important half for a buyer: the platform *supports* swapping, but provides **no tooling, no audit trail, and no proactive warning system** for the actual risk this field asks about - workflows breaking as a side effect of a swap (whether customer-initiated or vendor-forced, as in claim 4). "Model Agnosticism" as marketed is a capability statement about flexibility, not a guarantee about safety during a swap.
- The Claude Sonnet context-window case (claim 4) is a strong, dated, falsifiable example to cite rather than a hypothetical - worth using directly in the client-facing writeup as evidence this is a live operational concern, not a theoretical one.

## Confidence

**Doc-Verified**, 4 independent sources (one confirming an absence of guidance), validation date 2026-09-09. No sandbox/tenant access used - everything above is publicly readable without login. Tenant verification (including an actual before/after swap test) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Structural agnosticism | Real - per-step, per-agent model selection, provider-flexible | 1 |
| Two separate model-selection surfaces | Chat-session picker ≠ agent/step config - changing one doesn't change the other | 2 |
| Degradation-measurement tooling | Not found - fully manual/customer-run if desired | 3 |
| Real-world breaking-change precedent | Yes - Claude Sonnet 1M context retiring 2026-04-30, over-limit requests error afterward | 4 |
| Proactive at-risk-agent detection | Not found - customer must self-audit | 5 |
| Dedicated model-deprecation lifecycle doc | Does not exist - only scattered release notes; formal deprecation list covers APIs only | 6 |
