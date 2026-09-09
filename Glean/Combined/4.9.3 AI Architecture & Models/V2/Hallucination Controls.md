**Glean Tier 3 Advanced Evaluation**
**Hallucination Controls — Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `docs.glean.com` and `www.glean.com`. Field definition: "Output validation engines, confidence thresholds, and toxicity/hallucination checks." Base file at [`../Hallucination Controls.md`](../Hallucination%20Controls.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-9 below map 1:1 to the same Sr No in the companion test guide [test/V2/Hallucination Controls.md](../../../../test/Glean/4.9.3%20AI%20Architecture%20&%20Models/V2/Hallucination%20Controls.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Glean has a real, rigorously-benchmarked internal QA engine ("AI Evaluator") that scores every answer for groundedness — but it is **internal-only, not a live confidence score shown to the end user**. The one confidence-gated safety behavior that *is* user-facing (clarifying questions) explicitly **does not apply to factual queries** — exactly the query type the field's own evaluation methodology tests with "false medical jargon or ungrounded queries." That is a real, precise gap, not an assumption.

## Claims (Sr No 1-9, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Glean runs an internal "AI Evaluator" that scores every generated answer on three generation-quality dimensions | [glean.com/blog/glean-ai-evaluator](https://www.glean.com/blog/glean-ai-evaluator) | *"Answer relevance"* (binary: relevant/irrelevant), *"Answer completeness"* (three-tier: complete, incomplete, no-answer), and *"Groundedness"* — *"evaluates whether the generated answer is grounded in factual information and evidence from the retrieved context."* Two retrieval-side metrics also scored: context relevance rate, context recall rate. |
| 2 | Groundedness is measured at the individual-claim level with a specific 3-way classification, not just a single answer-level yes/no | [glean.com/blog/glean-ai-evaluator](https://www.glean.com/blog/glean-ai-evaluator) | *"The LLM is first asked to generate all claims made in the answer, and for each claim must pick one of the following options: inferable, generic, or ungrounded."* This is a real, granular methodology — not a black-box single score. |
| 3 | The AI Evaluator is independently validated against human judgment, with specific, published agreement numbers | [glean.com/blog/glean-ai-evaluator](https://www.glean.com/blog/glean-ai-evaluator) | Human inter-rater agreement: **79%**. AI Evaluator's own agreement rate with human ratings: **74%**. Including AI Evaluator signals in a user-retention prediction model improved prediction accuracy by **18.8%**. Human judges independently identified low groundedness and "No Answer" outcomes as *"strong predictors of user churn."* |
| 4 | The AI Evaluator's score is not shown to the end user — it is an internal product/QA signal only | [glean.com/blog/glean-ai-evaluator](https://www.glean.com/blog/glean-ai-evaluator) | No mention anywhere in this source of the score being surfaced in the Assistant UI. It is framed entirely as *"an internal quality assurance mechanism for the Glean team to monitor assistant performance and guide development decisions."* |
| 5 | A self-correction loop exists for Code Search specifically, but it is explicitly scoped to fixing *search strategy*, not detecting or correcting a hallucinated/wrong final answer | [docs.glean.com/security/how-code-search-works](https://docs.glean.com/security/how-code-search-works) | Verbatim: the agentic engine *"surfaces structured errors and hints from tools (empty results, noisy matches, missing repos) and uses them to adjust course, rather than quietly failing or hallucinating."* It reacts to retrieval-level failures (empty results, noise, missing repos) by re-searching — the documentation does **not** state that it verifies or corrects the factual accuracy of the answer it eventually produces. |
| 6 | Toxic-content prevention exists as a named guardrail, but it is gated to a specific paid tier and is a content-safety control, not a factual-accuracy/hallucination control | [docs.glean.com/administration/protect/overview](https://docs.glean.com/administration/protect/overview) | Verbatim: *"Prevention against prompt injection, jailbreak attempts, malicious code, and toxic content"* — listed specifically as a **Glean Protect+** capability (same tier-gating pattern found for prompt-injection defense in the Prompt Engineering Access field). This defends against harmful/offensive output, not against confidently-stated false information. |
| 7 | A confidence-gated, user-facing behavior does exist — Glean asks clarifying questions before proceeding, when it judges the request too ambiguous to confidently handle | [docs.glean.com/user-guide/assistant/glean-chat/clarifying-questions](https://docs.glean.com/user-guide/assistant/glean-chat/clarifying-questions) | *"Glean evaluates whether key details such as audience, scope, format, or emphasis are missing or ambiguous"* and asks *"only when needed... only when Glean needs it to confidently infer the right path."* If skipped, *"Glean proceeds with reasonable defaults."* |
| 8 | Critically, this clarifying-question safety net explicitly does **not** apply to factual/information-seeking questions — only to task-execution requests | [docs.glean.com/user-guide/assistant/glean-chat/clarifying-questions](https://docs.glean.com/user-guide/assistant/glean-chat/clarifying-questions) | Verbatim distinction: clarifying questions appear for *"task-execution requests"* (drafts, presentations, analyses) — but for *"information-seeking requests"* (factual queries), *"Glean proceeds immediately with the best answer it can find."* No confidence-gated pause exists for the query type this field's own methodology is designed to stress-test. |
| 9 | No documented "I don't have enough information" or explicit refusal message was found for ungrounded/false-premise factual queries | Absence checked across sources 1, 5, 7 plus general web search | Consistent with claim 8: since factual queries always get *"the best answer it can find,"* and the AI Evaluator's "no-answer" classification (claim 1) is internal-only, there is no confirmed user-visible refusal or low-confidence disclaimer mechanism for this query type in any source checked. The primary user-facing hallucination mitigation for factual queries remains citation-based grounding (deep-linked citations, covered separately in the RAG Implementation Quality field) — not a confidence-based refusal. |

## Independent read

- Claims 1-4 show genuine engineering rigor behind the scenes — this is not a vague "we care about accuracy" marketing claim, it's a validated, quantified evaluation pipeline with real human-agreement benchmarks.
- Claim 5 is an important, precise limitation: "self-correcting, not hallucinating" language in Glean's own Code Search docs is about retrieval robustness, not answer-verification — an evaluator should not read it as a general hallucination-correction claim.
- Claims 7-9 are the field's central finding: the one real, user-facing, confidence-gated behavior in the product (clarifying questions) is architecturally excluded from exactly the scenario ("false medical jargon or ungrounded queries") the SOW's own evaluation methodology asks testers to probe. This should be reported plainly, not softened — a healthcare buyer asking "will Glean pause or hedge when asked something ungrounded" should be told the honest answer is no, for factual queries specifically, based on documented behavior.

## Confidence

**Doc-Verified**, 3 independent first-party sources (one confirming an absence — user-facing refusal behavior), validation date 2026-09-09. No sandbox/tenant access used — everything above is publicly readable without login. Tenant verification (including an actual false-premise query test) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Internal answer-quality scoring | Yes — Answer relevance, completeness (3-tier), groundedness (per-claim 3-way) | 1-2 |
| Validation rigor | 79% human inter-rater agreement, 74% AI Evaluator agreement, +18.8% churn-prediction lift | 3 |
| Visible to end user? | No — internal QA/product signal only | 4 |
| Code Search self-correction scope | Retrieval/search-strategy only, not answer-verification | 5 |
| Toxic-content prevention | Exists, Protect+ tier only, content-safety not accuracy-focused | 6 |
| User-facing confidence gate | Clarifying questions exist, but... | 7 |
| ...scoped to task-execution only | Factual/information-seeking queries get an immediate best-effort answer, no pause | 8 |
| Refusal/low-confidence disclaimer for factual queries | Not found — citation-based grounding is the only confirmed mitigation | 9 |
