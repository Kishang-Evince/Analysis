# 4.9.10 Industry Applicability — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Industry Applicability.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Industry%20Applicability.md). The key finding is a sourcing error: the "AI automation use cases" article cited for this field is generic industry content, not about Glean specifically, and should be removed from the citation list. This guide's job is to confirm that correction and verify the life-sciences use cases directly. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** `glean.com/perspectives/ai-automation-use-cases` · `glean.com/solutions/industries/life-sciences`
**Companion research doc:** [V2/Industry Applicability.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Industry%20Applicability.md)
**Base field doc (untouched, original):** [../Industry Applicability.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/Industry%20Applicability.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** None special.

**Sr No mapping:** Sr No 1-5 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Industry Applicability.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Industry%20Applicability.md#claims-sr-no-1-5-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 — Confirming the sourcing error and the life-sciences content — Sr No 1-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The "AI automation use cases" article is generic, not Glean-specific | Read the article and confirm it contains no Glean-product-specific claims. | Confirmed, and remove this citation from the field's source list. | | | ~10 min, Easy |
| 2 | Life sciences use cases match research | Open the industry page and confirm the four named use cases. | Confirmed. | | | ~10 min, Easy |
| 3 | No customer is named on the life sciences page | Read the full page for any customer/case-study mention. | Confirmed absent. | | | ~5 min, Easy |
| 4 | UC-02/UC-08 sourcing should be corrected to the healthcare page + 4.9.9 research | Update the field's internal citation list accordingly. | Corrected. | | | ~10 min, Easy |
| 5 | Cold-chain excursion use case is out of scope for Perimeter's likely profile | Confirm with internal discovery whether Perimeter Healthcare has any pharma-supply-chain/cold-chain component. | Confirmed out of scope (or flagged if relevant). | | | ~10 min, Easy |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Sourcing correction + life-sciences content confirmed | 5 | | | | |
