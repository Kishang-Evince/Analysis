# 4.9.10 Problem Solved — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Problem Solved.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Problem%20Solved.md). The key finding is a sourcing correction: the "20% of week searching" statistic doesn't actually appear on the specific IDC page cited, and more precisely traces to McKinsey Global Institute research — an independent source, distinct from and more credible than a bare vendor claim. This guide's job is to confirm both the correction and reuse the Confluent case study for UC-07. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** The cited IDC page · general web search for the McKinsey source
**Companion research doc:** [V2/Problem Solved.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Problem%20Solved.md)
**Base field doc (untouched, original):** [../Problem Solved.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/Problem%20Solved.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** None special.

**Sr No mapping:** Sr No 1-4 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Problem Solved.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Problem%20Solved.md#claims-sr-no-1-4-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 — Confirming the sourcing correction and cross-referenced evidence — Sr No 1-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The IDC page doesn't contain the "20%" statistic | Open the cited page and search for the figure. | Confirmed absent. | | | ~5 min, Easy |
| 2 | The statistic traces to McKinsey Global Institute | Search for the original McKinsey research and confirm. | Confirmed, and update the citation. | | | ~15 min, Easy |
| 3 | "10+ systems daily" remains Vendor-Stated only | Confirm no independent source exists for this specific figure. | Confirmed. | | | ~10 min, Easy |
| 4 | Confluent case study is cross-referenced correctly for UC-07 | Confirm the figures match the Department/Function field's findings. | Confirmed. | | | ~5 min, Easy |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Sourcing correction + cross-referenced evidence | 4 | | | | |
