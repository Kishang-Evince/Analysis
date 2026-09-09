# 4.9.3 Explainability & Decision Logs - Independent Research Test Guide

**Purpose:** Hands-on tenant verification of every claim in the companion research doc [V2/Explainability & Decision Logs.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Explainability%20&%20Decision%20Logs.md). The core finding there is that Glean logs *what* an agent did in rich detail, but nowhere documents exporting or displaying *why* - at either the tool-selection level or the model-routing level. One source (the "Think" step page) could not be directly fetched this pass and needs live re-verification. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Admin Console → Insights (for LLM Insights dashboard) · Agent Builder → any agent run's trace/debug view
**Companion research doc:** [V2/Explainability & Decision Logs.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Explainability%20&%20Decision%20Logs.md)
**Base field doc (untouched, original):** [../Explainability & Decision Logs.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/Explainability%20&%20Decision%20Logs.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Admin access to the Glean Admin Console.
- An agent with a completed run available to inspect in the debug/trace view (build a simple 2-3 step agent and run it if none exists yet).
- If you want to complete Sr No 1-3 fully: an OTLP-compatible observability tool (Datadog, Grafana, Langfuse, or Splunk) already connected to your tenant's trace export - otherwise you can still confirm the trace *schema* from documentation and note the live-export portion as `Blocked (no observability tool connected)`.

**Sr No mapping:** Sr No 1-8 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Explainability & Decision Logs.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Explainability%20&%20Decision%20Logs.md#claims-sr-no-1-8-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally saw it happen - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine UI clicking, quick to judge) or `Hard` (needs an observability tool connected, or careful reading/judgment) - so you can plan which rows to tackle first.

---

## Section 1 - Is the exported trace detailed, and does it explain the "why"? - Sr No 1-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Agent traces exported to an observability tool contain detailed tool-call and LLM-call data (names, arguments, results, tokens, timing) | 1. Run an agent with at least 2 steps that include a tool call.<br>2. If your tenant has trace export connected to Datadog/Grafana/Langfuse/Splunk, open that tool and find the trace for this run.<br>3. Check for the specific fields: tool name, call arguments, results, model name, token usage, response time. | You find all (or most) of these fields populated in the exported trace. | | | ~20 min, Hard (needs a connected observability tool) |
| 2 | The trace is structured/machine-readable, not a plain-English narrative | 1. Look at the raw trace data (not a dashboard's pretty visualization, the underlying span data itself).<br>2. Judge whether it reads like structured key-value data or like a written explanation. | The raw data is clearly structured (spans, fields, IDs) - not sentences explaining what happened. | | | ~10 min, Easy (once Sr No 1's trace is open) |
| 3 | Nowhere in the exported trace is there a field explaining *why* a tool or step was chosen - only *what* was called and *what* it returned | 1. Look through the same trace from Sr No 1 for any field resembling "reasoning," "rationale," "justification," or similar.<br>2. Confirm its absence. | You find no such field - only action/result data. | | | ~10 min, Easy |

## Section 2 - Does the debug view show reasoning, or just inputs/outputs? - Sr No 4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | The Agent Builder's debug view shows each step's input/output/timing/model, but no explicit "why this tool was picked" field | 1. Open a completed agent run in Agent Builder's debug/trace view.<br>2. Click into one step and note everything shown (input payload, output payload, execution time, model metadata).<br>3. Look specifically for any explanation of *why* that step/tool was selected over alternatives. | You confirm input/output/timing/model are shown, and confirm no separate "why this was chosen" explanation exists in the panel. | | | ~15 min, Easy |

## Section 3 - Does the model-routing dashboard explain individual routing decisions? - Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | The LLM Insights dashboard shows aggregate usage stats (TPM, RPM, error rates) but does not tell you why a specific past query was routed to a specific model | 1. Go to **Admin Console → Insights → LLM** (or equivalent).<br>2. Note what's shown: peak/average TPM, RPM, error rates, usage-by-model table.<br>3. Try to find a way to click into one specific past query and see why it was routed to the model it used. | You confirm the dashboard is aggregate/retrospective only, with no per-query routing-rationale drill-down. | | | ~15 min, Easy |

## Section 4 - Closing the verification gap: does the "Think" step page actually say what we found? - Sr No 6-7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | The "Think" step's reasoning output is real but not shown to the end user by default - **this needs re-verification since the source page failed to load twice during research** | 1. Open `docs.glean.com/agents/actions/glean/think` yourself in a browser (this page failed to load twice via automated fetch during research - a real browser may succeed).<br>2. Read the page and confirm or correct the claim: is Think-step reasoning text hidden from the end user by default?<br>3. Separately, if your tenant's Agent Builder has a "Think" action available, add it to a test agent and run it - check whether its output text appears anywhere the end user would see. | You either confirm the page's content matches what research found, or you find it says something different (update the research doc either way) - plus a live confirmation of whether the Think step's text is genuinely hidden from the end user in your own tenant. | | This row exists specifically because the source couldn't be independently verified during research - don't skip it | ~20 min, Easy (page re-check) + ~15 min, Easy (live Think-step test if available) |
| 7 | If a Think step is used, its reasoning output should still be visible to an admin/builder in the debug view, as a normal step output - even though hidden from the end user | 1. Using the same test agent from Sr No 6 (with a Think step), open its run in the debug/trace view.<br>2. Check whether the Think step's reasoning text appears there as that step's "output," the same way any other step's output would. | The Think step's reasoning text does appear in the debug view as its output - confirming the inference from research was correct. If it does NOT appear there either, that's a more significant finding worth flagging (reasoning is genuinely inaccessible to anyone, not just the end user). | | This was flagged as an unconfirmed inference in research - this row turns it into a confirmed fact either way | ~15 min, Easy (builds on Sr No 6's test agent) |

## Section 5 - Confirming the real explainability mechanism is citations, not reasoning traces - Sr No 8

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 8 | The explainability mechanism an end user actually sees day-to-day is source citations, not a reasoning trace or decision log | 1. Ask Assistant a normal grounded question.<br>2. Note what "explanation" the end user actually gets - citations/links to source documents.<br>3. Confirm there is no parallel "here's my reasoning" panel shown alongside it by default. | You confirm citations are the extent of end-user-facing explainability, with no visible reasoning/decision-log panel in the normal chat experience. | | Same underlying finding as the RAG Implementation Quality guide - reuse that result if already confirmed | ~10 min, Easy (or ~0 min if reused from RAG Implementation Quality guide) |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Explainability & Decision Logs.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Explainability%20&%20Decision%20Logs.md). Sr No 6-7 are the priority - they close this doc's one flagged confidence gap.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Trace export detail + no "why" field | 3 | | | | |
| 2. Debug view: inputs/outputs, no rationale | 1 | | | | |
| 3. Routing dashboard is retrospective only | 1 | | | | |
| 4. Think-step verification (closes a research gap) | 2 | | | | |
| 5. Citations are the real explainability mechanism | 1 | | | | |
