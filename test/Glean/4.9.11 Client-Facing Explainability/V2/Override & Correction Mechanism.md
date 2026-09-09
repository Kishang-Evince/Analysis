# 4.9.11 Override & Correction Mechanism — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Override & Correction Mechanism.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/V2/Override%20&%20Correction%20Mechanism.md). Verification and deprecation are reconfirmed as display-only (no effect on AI text). A new, unexplored feature — "Canvas" — surfaced and needs follow-up to determine if it's relevant to correcting wrong AI outputs. This guide's job is to time the actual correction-latency tests and investigate Canvas. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Glean sandbox · Google Drive/Notion/OneDrive test docs · Canvas feature (if available in your tenant)
**Companion research doc:** [V2/Override & Correction Mechanism.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/V2/Override%20&%20Correction%20Mechanism.md)
**Base field doc (untouched, original):** [../Override & Correction Mechanism.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/Override%20&%20Correction%20Mechanism.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** Content-owner edit rights on a test doc; admin access for Answers/deprecation.

**Sr No mapping:** Sr No 1-5 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Override & Correction Mechanism.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/V2/Override%20&%20Correction%20Mechanism.md#claims-sr-no-1-5-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 — Confirming Verification/Deprecation scope directly — Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Verification only shows a badge, doesn't change AI text | Verify a test document, then ask Assistant a question sourced from it — confirm the answer text is unchanged, only the search-result badge appears. | Confirmed. | | | ~15 min, Easy |
| 2 | Deprecation keeps the doc searchable with a warning symbol | Deprecate a test document and confirm it still appears in search, with the deprecated symbol shown. | Confirmed. | | | ~15 min, Easy |

## Section 2 — Investigating the Canvas lead — Sr No 3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Canvas may or may not be relevant to correcting a wrong AI answer | Check whether Canvas is available in your tenant, and if so, explore whether it offers any mechanism to annotate, correct, or override a specific Assistant output. | You get a clear answer on Canvas's actual relevance to this field. | | | ~20 min, Easy |

## Section 3 — Timing the correction-latency tests and confirming the review-queue absence — Sr No 4-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | No correction queue/notification exists for downvoted answers | Downvote an Assistant answer with "incorrect citation" feedback and confirm no automated notification reaches a specific content owner. | Confirmed absent. | | | ~15 min, Easy |
| 5 | Remaining mechanisms (Answers, source-edit lag, agent republish, custom instructions, Protect+ autohide) work as documented | Run the base test guide's 5 timed tests (wrong answer → Answer creation, deprecate, edit+re-crawl timing, thumbs-down, agent edit+republish). | Confirmed, with real latency numbers logged. | | | ~2-6 hours (mostly waiting on crawl), Easy active work |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Verification/Deprecation scope confirmed | 2 | | | | |
| 2. Canvas investigated | 1 | | | | |
| 3. Correction-latency tests + queue absence confirmed | 2 | | | | |
