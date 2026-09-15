# 4.9.3 Model Selection - Flexibility - Independent Research Test Guide

**Purpose:** Hands-on tenant verification of every claim in the companion research doc [V2/Model Selection - Flexibility.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Model%20Selection%20-%20Flexibility.md). The core finding there splits the claim in two: Glean genuinely supports swapping models per step/agent (well-documented), but provides no tooling to measure or prevent the workflow breakage that a swap can cause (a real, undocumented gap, backed by a live example). This guide's job is to confirm both halves, and to actually measure what happens to a workflow's output quality when you swap its model. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** `https://app.glean.com` → Agents → Agent Builder → open any existing agent's step settings
**Companion research doc:** [V2/Model Selection - Flexibility.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Model%20Selection%20-%20Flexibility.md)
**Base field doc (untouched, original):** [../Model Agnosticism.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/Model%20Agnosticism.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Agent Builder access, with at least 2 different model providers enabled in your tenant's Model Hub (e.g. one OpenAI model and one Anthropic or Google model) so you have something to actually swap between.
- One existing agent (or willingness to build a simple test one) with a task specific enough that you can judge whether the output quality changed after a model swap (e.g. "summarize this document in exactly 3 bullet points").
- No special technical access needed beyond normal Agent Builder use - this guide is entirely UI-based.

**Sr No mapping:** Sr No 1-6 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Model Selection - Flexibility.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Model%20Selection%20-%20Flexibility.md#claims-sr-no-1-6-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine UI clicking, quick to judge) or `Hard` (needs subjective quality judgment or historical/date-dependent checking) - so you can plan which rows to tackle first.

---

## Section 1 - Can you actually swap the model for one specific step, without it being an all-or-nothing setting? - Sr No 1

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | You can set a different model for each individual step of an agent, not just one model for the whole agent or the whole tenant | 1. Open an existing multi-step agent (or build one with at least 2 steps).<br>2. Open Step 1's settings and find its model selector; note which model it's currently set to.<br>3. Open Step 2's settings and set its model to a **different** provider (e.g. if Step 1 uses an OpenAI model, set Step 2 to an Anthropic or Google model).<br>4. Save and run the agent. | The agent runs successfully with two different steps genuinely using two different underlying models - confirmed either by the run trace showing which model handled each step, or by the settings screen for each step showing a different selection that was actually saved. | | | ~10 min, Easy |

## Section 2 - Are there two different "pick a model" screens that don't affect each other? - Sr No 2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | The model picker inside a normal Glean Chat conversation only affects that one conversation - it does not change which model your agents are actually configured to use | 1. Open a normal Glean Chat/Assistant conversation (not an agent).<br>2. Find the model picker for that conversation and switch it to a different model.<br>3. Now go back to Agent Builder and open the same agent/step you checked in Sr No 1.<br>4. Check whether that step's configured model changed at all. | The agent step's configured model is completely unaffected by what you picked in the separate chat conversation - proving these are two independent settings, not one shared setting. | | | ~10 min, Easy |

## Section 3 - Is there any built-in way to tell if a model swap made output quality worse? - Sr No 3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Glean provides no built-in comparison tool for "before vs. after" output quality when you swap a step's model - you have to do this manually yourself | 1. Pick one agent step with a task specific enough to judge quality (e.g. "summarize this document in exactly 3 bullet points").<br>2. Run it once with its current model and save the output.<br>3. Switch that step to a different model, run it again with the *same* input, and save that output.<br>4. Compare the two outputs side by side yourself.<br>5. While doing this, look around the Agent Builder UI for any built-in "compare model outputs" or "regression test" feature. | You find no built-in feature for this comparison - you had to do the entire before/after comparison manually, copying outputs yourself. Also record what you actually observed: did the output noticeably change in quality, format, or accuracy between the two models? | | This directly tests the research doc's flagged gap - write down both "is there a tool" (expected: no) and "did quality actually change" (your own observation) | ~20 min, Hard (subjective before/after quality judgment) |

## Section 4 - Has this actually happened for real - a model change breaking something, without warning? - Sr No 4-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | There's a real, dated example of this exact risk: Anthropic retired a 1-million-token context option for Claude Sonnet on April 30, 2026, and anything sending more than 200,000 tokens started failing after that date | 1. Check today's date against April 30, 2026.<br>2. If your tenant has ever used Claude Sonnet 4.5 or Claude Sonnet 4 with a large-document workflow (something that would send more than 200,000 tokens in one request), ask whoever manages your agents whether they noticed any failures around that date.<br>3. If you can, try sending a very large document (over 200,000 tokens' worth of text) through a Claude Sonnet-powered step today and see what happens. | Either you find confirmation that a workflow broke around that date (matching the research finding), or - if testing today - you confirm that an over-200,000-token request to Claude Sonnet now fails/errors, proving the limit is real and currently enforced. | | If nobody in your organization uses Claude Sonnet or large documents, mark `Blocked (not applicable to this tenant)` | ~20 min, Hard (needs a large test document + historical follow-up) |
| 5 | Glean did not proactively tell customers which of their specific agents were at risk from this change - it only posted a general release note saying what to migrate to | 1. Check your tenant's notification history (email, in-app alerts, admin announcements) around April 2026 for anything specifically calling out *your* agents as being affected by this change.<br>2. Separately, check whether the release note itself (or any admin screen) offers a way to search/filter "show me which of my agents use the old context setting." | You find a general release note about the change, but no tenant-specific alert or search/filter tool that would have told you exactly which of your own agents were affected - confirming the customer has to self-audit. | | | ~15 min, Easy |

## Section 5 - Is model-version deprecation guidance mixed in with general API deprecation guidance, or is it its own thing? - Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | The official "deprecations" page only lists deprecated API endpoints/fields - it does not also serve as a model-version deprecation tracker | 1. Open Glean's public deprecations page (`developers.glean.com/deprecations`).<br>2. Read through everything listed there.<br>3. Confirm whether any entry relates to an LLM model itself being deprecated/retired, versus only API endpoints and response fields. | Everything on that page is about API endpoints/fields - no model-version deprecations appear there, confirming model lifecycle information lives only in scattered release notes instead of one dedicated tracker. | | | ~10 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Model Selection - Flexibility.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Model%20Selection%20-%20Flexibility.md), and specifically record your real before/after quality comparison from Sr No 3 - that's the field's most concrete new finding.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Per-step model swap works | 1 | | | | |
| 2. Two independent model-selection surfaces | 1 | | | | |
| 3. No built-in quality-comparison tool | 1 | | | | |
| 4. Real breaking-change precedent | 2 | | | | |
| 5. Model deprecation tracking | 1 | | | | |
