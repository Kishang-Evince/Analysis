# 4.9.7 Total Cost Projection — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Total Cost Projection.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/Total%20Cost%20Projection.md). This field's core job is synthesis — pulling together real quotes and figures from the other four Pricing & TCO fields into one model. The research doc constructs a rough, heavily-caveated Year 1 range (~$110K-$170K) purely to show what triangulation from currently-available information looks like — it explicitly must NOT be treated as a real estimate. This guide's job is to replace every "Pending" cell with a real number from your own quotes and usage, and resolve the 100-vs-150-seat-minimum discrepancy directly. Written so someone with no prior context on this project can pick it up and run it — this is fundamentally a spreadsheet-completion exercise once the other four fields' quotes are in hand.

**Tenant entry:** Completed quotes/answers from this section's other four fields · Google Sheets/Excel for the TCO model · your Glean sales contact
**Companion research doc:** [V2/Total Cost Projection.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/Total%20Cost%20Projection.md)
**Base field doc (untouched, original):** [../3-Year Projected TCO.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/3-Year%20Projected%20TCO.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Completed test guides (or at least their key answers) from License Structure Details, Implementation Costs, Hidden Costs Identified, and Actual Partner Pricing — this field cannot be meaningfully completed without them.
- A shared Google Sheet or Excel workbook to hold the running TCO model.

**Sr No mapping:** Sr No 1-6 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Total Cost Projection.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/Total%20Cost%20Projection.md#claims-sr-no-1-6-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you populated the model with a real, confirmed number — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (a quick doc check) or `Hard` (needs completed answers from the other four fields' test guides) — so you can plan which rows to tackle first.

---

## Section 1 — Confirming the Forrester study's limits and the seat-minimum discrepancy — Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The Forrester 141% ROI figure has no usable cost-side data — confirm this directly rather than assuming | Open `glean.com/resources/guides/forrester-study-the-total-economic-impact-of-glean` (and the full underlying Forrester PDF if a link to it is available) and confirm whether any cost breakdown, payback period, or composite-org profile is disclosed anywhere in the full study, not just the summary page. | You confirm whether the full study (not just the landing page) discloses any cost-side figures — if it does, that would meaningfully update this field's findings. | | Check the FULL study PDF if you can find/request it — the landing page alone may be incomplete | ~20 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 2 | The seat minimum (100 vs. 150) discrepancy needs a direct answer for your specific deal | Ask your Glean account team directly, in writing: *"What is the actual minimum seat count for our organization's contract?"* | You get a real, deal-specific answer, resolving the discrepancy for your own situation (even if the general public answer stays ambiguous). | | | ~10 min active + wait for reply, Hard [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 2 — Confirming the FlexCredit and Model Hub line-item corrections apply to your model — Sr No 3-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Your organization's TCO model should include real FlexCredit usage costs from Year 1, not treat them as deferred/free | Confirm with your account team (or from the Hidden Costs Identified field's own test results) that your organization's usage-based billing is active, and update your TCO spreadsheet's "FlexCredit overage packs" row accordingly for every year, not just Year 2-3. | Your TCO model correctly reflects real, non-zero Year 1 usage costs. | | Depends on Hidden Costs Identified Sr No 2 | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 4 | If your organization is on Core Suite, the real Model Hub token rates can now populate that TCO line item with an actual formula instead of "Pending" | Using your organization's projected monthly token volume (or a reasonable estimate) and the real published rates (Waldo, GPT-4o, Claude Opus 5, etc.), build an actual formula-based estimate for the Model Hub Usage row. | Your TCO spreadsheet has a real, formula-driven Model Hub estimate instead of a blank "Pending" cell. | | Only relevant if on Core Suite | ~20 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 3 — Building the real TCO model and comparing against the triangulated range — Sr No 5-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---| ---|
| 5 | Vendr's real-transaction median ($98,890/year) is a reasonable anchor to sanity-check your own actual quote's seat+FlexCredit component against | Once you have a real quote (from the Actual Partner Pricing field's Sr No 6), compare its annual seat+FlexCredit total against this benchmark. | You get a realistic sense of whether your quote is in line with real market data. | | | Uses Actual Partner Pricing's output, ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 6 | The research doc's rough ~$110K-$170K Year 1 triangulated range should be replaced entirely by your organization's real, completed TCO table — never quoted to a client as-is | 1. Build the full 3-year TCO table (from the base test guide's formula) using ONLY real numbers obtained from the other four fields' test guides — leave a cell blank rather than filling it with an estimate if a real number isn't yet available.<br>2. Once populated, compare your real total against the research doc's rough range purely as a sanity check.<br>3. Explicitly confirm in your final write-up that the rough range was NOT used as a substitute for real numbers anywhere in your final model. | You have a real, defensible 3-year TCO built from actual quotes, and can confirm the rough estimate was retired once real data arrived. | | This is the field's ultimate deliverable | Depends on all prior fields being complete, Hard |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Total Cost Projection.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/Total%20Cost%20Projection.md), and specifically record your organization's real, completed 3-year TCO total (Sr No 6) — that is this field's actual deliverable, not the rough triangulated range.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Forrester limits + seat-minimum discrepancy | 2 | | | | |
| 2. FlexCredit + Model Hub line-item corrections | 2 | | | | |
| 3. Real TCO model built and compared | 2 | | | | |
