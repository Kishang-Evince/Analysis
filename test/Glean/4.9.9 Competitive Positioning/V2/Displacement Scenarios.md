# 4.9.9 Displacement Scenarios — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Displacement Scenarios.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Displacement%20Scenarios.md). The standout finding there is a second, independent instance of the audit-trail overstatement already found in the Best-Fit Client Profile field — Glean's ChatGPT-Enterprise comparison article claims audit logging covers "every" query, action, and interaction, which two separate Glean marketing pages now claim, while this project's own 4.9.5 research found the default Admin Audit Log excludes end-user queries. This guide's job is to confirm both comparison articles' exact language and re-run the audit-trail test (if not already done via the Best-Fit field) to nail this down conclusively. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Both Glean comparison articles · Glean Admin Console → Audit Log
**Companion research doc:** [V2/Displacement Scenarios.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Displacement%20Scenarios.md)
**Base field doc (untouched, original):** [../Displacement Scenarios.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/Displacement%20Scenarios.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** Admin access to the Audit Log (or reuse the result from the Best-Fit Client Profile field's Sr No 5 if already run).

**Sr No mapping:** Sr No 1-6 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Displacement Scenarios.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Displacement%20Scenarios.md#claims-sr-no-1-6-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (a quick page check) or `Hard` (needs the audit-log test, or a real client workshop) — so you can plan which rows to tackle first.

---

## Section 1 — Confirming both comparison articles' positioning language — Sr No 1, 5-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The ChatGPT-Enterprise article frames Glean as a different category, not a replacement | Open the article and confirm the "Work AI platform" vs. "general-purpose enterprise chat tool" framing. | You independently confirm it. | | | ~10 min, Easy |
| 5 | The Copilot/Google-native article states the exact decision-rule quote | Open the article and confirm the decision-rule language. | You independently confirm it. | | | ~10 min, Easy |
| 6 | Stratos's own displacement narrative should match Glean's own non-displacement framing | Review any existing Stratos discovery/pitch materials for displacement language and confirm they don't oversell Glean as a Copilot/ChatGPT replacement. | You confirm (or correct) Stratos's own materials to match the accurate framing. | | | ~15 min, Easy |

## Section 2 — Confirming the repeated audit-trail and sync overstatements — Sr No 2-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | The "audit logging covers every query" claim appears verbatim on this second comparison article | Open the ChatGPT-Enterprise comparison article and confirm the exact quote. | You independently confirm the quote. | | | ~5 min, Easy |
| 3 | The real-time permission-sync claim also appears verbatim on this article, a third confirmed instance of the pattern | Confirm the exact quote on the same article. | You independently confirm it. | | | ~0 min extra, Easy |

## Section 3 — Confirming the ZDR differentiator and closing the audit-trail question — Sr No 4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | The zero-day data retention (ZDR) claim is real and consistent with the 4.9.3 finding | Confirm the exact ZDR quote on the ChatGPT-Enterprise article, and cross-check against the 4.9.3 Data Leakage Protections field's OpenAI ZDR finding. | You confirm the claim is real and consistent across both sources. | | | ~10 min, Easy |

---

## Section 4 — Running (or reusing) the definitive audit-trail test

If the Best-Fit Client Profile field's Sr No 5 test (running a query as a test user, then checking whether it appears in the Admin Audit Log) has already been completed, reuse that result here rather than re-running it — it directly answers claim 2 in this field as well.

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| — | Definitive test: does the Admin Audit Log actually capture "every" query by default? | Reuse the Best-Fit Client Profile field's Sr No 5 result, or re-run it fresh if not yet done. | A clear Pass/Fail on whether "covers every query" is accurate for your tenant's default configuration. | | Cross-reference row — same test, two fields' claims depend on it | ~0 min if reused, ~20 min if fresh |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Displacement Scenarios.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Displacement%20Scenarios.md), and specifically cross-reference the audit-trail test result from the Best-Fit Client Profile field.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Positioning language confirmed | 3 | | | | |
| 2. Repeated overstatement pattern confirmed | 2 | | | | |
| 3. ZDR differentiator confirmed | 1 | | | | |
