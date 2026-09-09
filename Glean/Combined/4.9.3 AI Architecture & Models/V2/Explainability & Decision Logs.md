**Glean Tier 3 Advanced Evaluation**
**Explainability & Decision Logs — Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `docs.glean.com`. Field definition: "Human-readability of decision logs, system routing, and reasoning steps." Base file at [`../Explainability & Decision Logs.md`](../Explainability%20&%20Decision%20Logs.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-8 below map 1:1 to the same Sr No in the companion test guide [test/V2/Explainability & Decision Logs.md](../../../../test/Glean/4.9.3%20AI%20Architecture%20&%20Models/V2/Explainability%20&%20Decision%20Logs.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Glean logs *what happened* in real detail (structured, machine-readable traces of every tool call and LLM call) — but consistently does **not** document exporting or displaying *why* a decision was made, at either layer checked: agent tool/step selection, or model-routing selection. There is one internal reasoning mechanism (a "Think" step) that generates real chain-of-thought-style text, but by design that text is not shown to the end user.

## Claims (Sr No 1-8, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Agent execution traces are exported in a detailed, structured format capturing the full run lifecycle | [docs.glean.com/administration/agent-trace-export](https://docs.glean.com/administration/agent-trace-export) | OpenTelemetry Protocol (OTLP), protobuf-encoded, covering *"the full lifecycle of an agent run, from the initial request through tool calls and LLM interactions to the final response."* Tool spans carry name, call ID, error type, and (for exportable tools) description/arguments/results; redacted tools are masked as `GLEAN_INTERNAL_TOOL`. LLM call spans carry model name, provider, token usage, finish reasons, response time, and output messages. |
| 2 | The trace format is machine-structured and tool-viewable, not written as human-narrative prose | [docs.glean.com/administration/agent-trace-export](https://docs.glean.com/administration/agent-trace-export) | Follows *"OpenTelemetry semantic conventions for generative AI"*; viewable in Datadog, Grafana, Langfuse, Splunk. Genuinely detailed, but requires an observability-tool consumer to read — not a plain-English summary by default. |
| 3 | The trace documents what the agent *did*, not why it chose to do it — no decision-rationale field was found | [docs.glean.com/administration/agent-trace-export](https://docs.glean.com/administration/agent-trace-export) | The documentation lists concrete data fields (tool name, arguments, results, model, tokens, timing) but makes no mention anywhere of a field capturing the agent's reasoning or justification for a specific tool/step selection — this is a real, checkable absence, not an assumption. |
| 4 | The builder/admin-facing debug view shows per-step inputs, outputs, timing, and model metadata, but does not explicitly describe showing the agent's rationale for a choice | [docs.glean.com/agents/create-agents/debug-agent](https://docs.glean.com/agents/create-agents/debug-agent) | Debug panel shows *"detailed input and output payloads, execution time, and model metadata"* per step, with green/red success/error highlighting and an *"Only show errors"* filter. Documentation notes *"if a step does not display input/output, that may be by design for certain tools"* — some steps may show even less than the norm. No described field for tool-choice justification. |
| 5 | The model-routing dashboard (LLM Insights) is retrospective aggregate usage monitoring only — it does not explain why a specific query was routed to a specific model | [docs.glean.com/administration/insights/llm-insights](https://docs.glean.com/administration/insights/llm-insights) | Dashboard shows Peak/Avg TPM, Peak RPM, 429/5xx error rates, a *"Usage over time"* chart, and a per-model *"Usage breakdown"* table with health status — *"token throughput, request rates, and error patterns"* for *"provision capacity and troubleshoot issues."* Nothing in this dashboard ties a specific query to the reason a specific model handled it. |
| 6 | A distinct "Think" step exists that performs explicit, chain-of-thought-style reasoning as part of an agent's execution — but this reasoning text is not shown to the end user by design | Search-snippet-sourced only — direct fetch of [docs.glean.com/agents/actions/glean/think](https://docs.glean.com/agents/actions/glean/think) failed (empty response) this pass; content below is from a search-engine cached snippet of that page, not independently re-verified live | *"The Think step follows instructions to perform reasoning on the contents of the agent's memory... This text is not shown to the user, but it is added to the agent's memory so that later steps can reference it."* **Confidence caveat:** this specific quote should be re-verified with a working live fetch before being cited externally — flagged here as the one item in this field not confirmed against a directly-loaded page. |
| 7 | It is plausible, but not explicitly confirmed in any single source, that a Think step's reasoning text would appear as an admin-visible step "output" in the debug view (claim 4), even though it's never shown to the end user | Inference only, combining claims 4 and 6 | Claim 4 confirms step outputs are generally visible in the debug view; claim 6 states Think-step output goes into agent memory as text. No source directly states these two facts connect — this is a reasonable inference from this pass's research, not a confirmed finding, and should be tested directly rather than assumed true. |
| 8 | The explainability mechanism Glean actually documents and exposes to end users is citation-based grounding, not a reasoning-trace or decision-log view — consistent with findings already established for the RAG Implementation Quality field | Cross-reference to this project's own [RAG Implementation Quality V2 research](RAG%20Implementation%20Quality.md), not re-derived fresh this pass | Deep-linked citations (exact source snippets) are the end-user-facing "explain yourself" mechanism Glean ships — not a visible chain-of-thought or routing-rationale display. This cross-reference is stated for completeness of this field's picture, not counted as new independent evidence this pass. |

## Independent read

- Claims 1-2 are a genuine strength for a technically sophisticated buyer (SRE/security team piping traces into their own observability stack) — but claim 3 means those same traces won't answer an auditor's "why did the agent do X" question, only "what did the agent do."
- Claim 5 closes a specific gap this field's own methodology asks about ("routing decision logic") — the answer is a clean, checkable "no, the dashboard doesn't show per-query routing rationale," not a maybe.
- Claim 6 is flagged honestly as the weakest-sourced item in this doc — the page it should come from returned empty on two fetch attempts this pass. It should be re-fetched and re-confirmed before being treated as settled, and the test guide's Sr No 6 is built specifically to close that verification gap live in a tenant.
- Overall picture: Glean's explainability story is "cited answers, not narrated reasoning" — accurate framing for a client conversation, and a materially different (more limited) claim than "full decision-log transparency" might imply.

## Confidence

**Doc-Verified** for claims 1-5, 8. **Search-snippet-sourced, needs re-verification** for claim 6 (page fetch failed twice this pass). Claim 7 explicitly marked as **inference, not confirmed**. Validation date 2026-09-09. No sandbox/tenant access used — everything above is publicly readable without login (where fetch succeeded). Tenant verification, including a direct re-check of the Think-step page, tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Trace export detail | Rich, structured (OTLP), full run lifecycle | 1-2 |
| Reasoning/rationale in trace export | Not found — actions only, no "why" field | 3 |
| Debug view per-step detail | Input/output/timing/model metadata; no described rationale field | 4 |
| Model-routing dashboard | Retrospective aggregate stats only, no per-query "why this model" | 5 |
| Internal chain-of-thought mechanism | "Think" step exists, output not user-facing (source needs re-verification) | 6 |
| Admin visibility of Think output | Plausible, not confirmed — flagged as inference | 7 |
| Actual end-user-facing explainability mechanism | Citation-based grounding (cross-referenced from RAG field) | 8 |
