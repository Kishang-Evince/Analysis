# 4.9.2 Testing & Debugging Tools — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Testing & Debugging Tools.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Testing%20&%20Debugging%20Tools.md). The key finding is a new precondition: the content-trigger sample-event test silently does nothing if the agent isn't saved or has validation errors. The Azure-hosted Debug mode limitation is now resolved via cross-reference to the 4.9.11 field. This guide's job is to confirm both directly. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Agent Builder → Preview/Debug · Content trigger configuration
**Companion research doc:** [V2/Testing & Debugging Tools.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Testing%20&%20Debugging%20Tools.md)
**Base field doc (untouched, original):** [../Testing & Debugging Tools.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/Testing%20&%20Debugging%20Tools.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** Agent Builder edit access; sample Drive/Notion content.

**Sr No mapping:** Sr No 1-4 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Testing & Debugging Tools.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Testing%20&%20Debugging%20Tools.md#claims-sr-no-1-4-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 — Confirming re-run-from-step mechanics — Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | ~2-hour session window, requires full run after | Preview an agent, wait past 2 hours, and confirm re-run-from-step stops working until a fresh full run. | Confirmed. | | Time-intensive — can be done passively over other work | ~2+ hours elapsed |
| 2 | Cached vs. re-executed steps are visually distinguished | Break a step mid-flow, use Play from this step, and confirm the UI shows which steps were cached vs. re-run. | Confirmed. | | | ~15 min, Easy |

## Section 2 — Testing the new precondition and the Azure cross-reference — Sr No 3-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | An unsaved or error-containing agent silently fails the sample-event test | Deliberately leave a content-trigger agent unsaved (or introduce a validation error), then click the sample-event play button and confirm nothing happens with no clear error shown. | Confirmed. | | This directly tests research's new, practical finding | ~15 min, Easy |
| 4 | Confirm your tenant's hosting option and whether Debug mode is actually available | Check whether your Glean tenant is Azure-hosted, and if so, confirm Debug mode is genuinely unavailable. | Confirmed either way. | | Same cross-referenced test as the 4.9.11 field | ~10 min, Easy |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Re-run-from-step mechanics | 2 | | | | |
| 2. New precondition + Azure cross-reference | 2 | | | | |
