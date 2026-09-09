# 4.9.11 Confidence Scoring — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Confidence Scoring.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/V2/Confidence%20Scoring.md). The key correction is that Protect+'s admin-visible numeric confidence scores were not actually confirmed — the source page only confirms internal scoring drives flagging, not that admins can see the raw number. This guide's job is to test that directly. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Client API (`client.chat.create()`) · Admin Console → Protect+ → Guardrails Insights
**Companion research doc:** [V2/Confidence Scoring.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/V2/Confidence%20Scoring.md)
**Base field doc (untouched, original):** [../Confidence Scoring.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/Confidence%20Scoring.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** API access; Protect+ license for the admin-visibility test.

**Sr No mapping:** Sr No 1-4 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Confidence Scoring.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/V2/Confidence%20Scoring.md#claims-sr-no-1-4-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 — Confirming the API schema and testing the Protect+ correction — Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | No confidence/score/similarity field exists in the Chat API response | Call `client.chat.create()` on a real query and inspect the raw JSON response for any of these fields. | Confirmed absent. | | | ~15 min, Easy |
| 2 | Test whether Protect+'s internal confidence score is actually visible to an admin anywhere | 1. Trigger a test injection/jailbreak attempt (if Protect+ licensed).<br>2. Check the Guardrails Insights dashboard and any Finding detail view for a raw numeric confidence score, not just a block/flag outcome. | You get a direct, definitive answer on admin visibility, resolving research's flagged correction. | | This is the single most important row in this guide | ~20 min, Easy (if licensed) |

## Section 2 — Reconfirming the qualitative signals — Sr No 3-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Answer ranking / badges / thumbs up-down remain qualitative only | Confirm no numeric score appears anywhere in the Assistant UI for these signals. | Confirmed. | | | ~10 min, Easy |
| 4 | The overall gap is real for regulated buyers | Document this finding explicitly for any Perimeter-Healthcare-facing gap analysis. | Documented. | | | ~10 min, Easy |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. API schema + Protect+ correction tested | 2 | | | | |
| 2. Qualitative signals reconfirmed | 2 | | | | |
