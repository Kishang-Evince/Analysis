# 4.9.2 Pre-Built Templates — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Pre-Built Templates.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Pre-Built%20Templates.md). The key finding clarifies that the 7-category framework belongs to the public Agent Library (33 examples, 6 departments), not the in-product Templates page (8 templates, 2 categories) — two separate catalogs. This guide's job is to confirm the in-product picker directly and resolve whether "Plan my day" is one template or two. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Agent Builder → Create → Templates
**Companion research doc:** [V2/Pre-Built Templates.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Pre-Built%20Templates.md)
**Base field doc (untouched, original):** [../Pre-Built Templates.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/Pre-Built%20Templates.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** Agent Builder access; Outlook Calendar connected (for the Plan-my-day test).

**Sr No mapping:** Sr No 1-5 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Pre-Built Templates.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Pre-Built%20Templates.md#claims-sr-no-1-5-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 — Confirming the in-product picker directly — Sr No 1, 3-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The in-product picker shows 8 templates in 2 categories | Open Agent Builder → Create → Templates and screenshot the full category/template list. | Confirmed. | | | ~10 min, Easy |
| 3 | "Weekly work report" is a real template | Confirm its presence in the picker. | Confirmed. | | | ~0 min extra, Easy |
| 4 | Resolve whether "Plan my day" is one template with a calendar-provider choice, or two separate named templates | Click into "Plan my day" and check whether it prompts for Outlook vs. Google Calendar, or whether two separately-named versions exist. | You get a definitive, hands-on answer. | | This closes research's flagged detail | ~10 min, Easy |

## Section 2 — Confirming the category-framework correction and the full library list — Sr No 2, 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | The 7-category framework belongs to the public Agent Library, not the in-product page | Compare the in-product picker's categories against `glean.com/agent-library/`'s categories directly. | Confirmed. | | | ~10 min, Easy |
| 5 | The 33-example public library list is accurate | Spot-check the count and a few named examples on the live page. | Confirmed. | | | ~10 min, Easy |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. In-product picker confirmed | 3 | | | | |
| 2. Category correction + library list confirmed | 2 | | | | |
