# 4.9.9 Worst-Fit Client Profile — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Worst-Fit Client Profile.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Worst-Fit%20Client%20Profile.md). The core finding there clarifies the pricing rationale behind the "M365-only shop" mismatch signal: Copilot's "$30/seat" is an add-on price on top of an already-owned base M365 license, while Glean's ~$65/seat is a full product cost — meaning the real comparison for a genuine M365-only shop actually favors Copilot even more clearly than a flat "$65 vs $30" headline suggests. This guide's job is to confirm both pricing figures independently and make sure the walk-away criteria reflect the clarified framing. Written so someone with no prior context on this project can pick it up and run it — mostly web verification, no developer access needed.

**Tenant entry:** `glean.com/perspectives/glean-vs-copilot-key-differences-in-enterprise-ai-tools` · Microsoft's own Copilot pricing page
**Companion research doc:** [V2/Worst-Fit Client Profile.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Worst-Fit%20Client%20Profile.md)
**Base field doc (untouched, original):** [../Worst-Fit Client Profile.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/Worst-Fit%20Client%20Profile.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** None special.

**Sr No mapping:** Sr No 1-5 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Worst-Fit Client Profile.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Worst-Fit%20Client%20Profile.md#claims-sr-no-1-5-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (a quick page check) — this field's checks are all straightforward web verification.

---

## Section 1 — Confirming both pricing figures independently — Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Glean's own comparison page states the figures matching research | Open the comparison page directly and confirm the $50+$15 Glean figure, the $30 Copilot figure, and the $600K-$780K vs $360K annual projection. | You independently confirm all figures. | | | ~10 min, Easy |
| 2 | Copilot's $30/seat is genuinely an add-on price requiring a base M365 license, not an all-in cost | Check Microsoft's own official Copilot pricing page directly and confirm the base-license requirement and the resulting true all-in cost range. | You independently confirm the add-on structure and the $42-$90 all-in range. | | | ~15 min, Easy |

## Section 2 — Confirming the fairness caveat and the clarified framing — Sr No 3-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Glean's page includes the efficiency-offset counter-argument | Confirm this specific language appears on the comparison page. | You confirm it, and make sure it's included alongside the raw dollar figures in any client material. | | | ~5 min, Easy |
| 4 | The clarified framing (incremental AI cost, not total product cost) should be the version used in Stratos's own walk-away criteria for M365-only prospects | Update any internal discovery/qualification script to state the pricing rationale as "incremental AI-add-on cost for shops already on a qualifying M365 tier," not a flat "$65 vs $30" comparison. | Stratos's own materials reflect the more accurate, defensible framing. | | | ~15 min, Easy |

## Section 3 — Spot-checking the remaining worst-fit signals — Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | The remaining worst-fit signals are still accurate | Pick 2-3 of the remaining signals (e.g. Notion oversharing, air-gap unavailability) and quickly re-confirm each against this project's own prior V2 findings. | You confirm nothing has changed. | | | ~15 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Worst-Fit Client Profile.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Worst-Fit%20Client%20Profile.md).

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Both pricing figures confirmed | 2 | | | | |
| 2. Fairness caveat + clarified framing | 2 | | | | |
| 3. Remaining signals spot-checked | 1 | | | | |
