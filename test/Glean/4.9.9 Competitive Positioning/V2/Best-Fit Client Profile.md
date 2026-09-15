# 4.9.9 Best-Fit Client Profile — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Best-Fit Client Profile.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Best-Fit%20Client%20Profile.md). The core finding there is significant and directly relevant to Perimeter Healthcare specifically: Glean's own life-sciences marketing claims "a traceable audit trail for every query," but this project's own 4.9.5 research already found the default Admin Audit Log excludes end-user query activity. This guide's job is to test that exact gap directly in the sandbox and confirm the other healthcare-page claims. Written so someone with no prior context on this project can pick it up and run it — a mix of web checks and one important sandbox test.

**Tenant entry:** Glean Admin Console → Audit Log · `glean.com/solutions/industries/healthcare` · `glean.com/blog/ai-in-life-sciences`
**Companion research doc:** [V2/Best-Fit Client Profile.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Best-Fit%20Client%20Profile.md)
**Base field doc (untouched, original):** [../Best-Fit Client Profile.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/Best-Fit%20Client%20Profile.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Admin access to the Glean Admin Console's Audit Log.

**Sr No mapping:** Sr No 1-7 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Best-Fit Client Profile.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Best-Fit%20Client%20Profile.md#claims-sr-no-1-7-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (a quick page/console check) or `Hard` (needs a real query-then-audit-log check) — so you can plan which rows to tackle first.

---

## Section 1 — Confirming the healthcare page's claims and gaps — Sr No 1-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The five healthcare use cases match the live page | Open `glean.com/solutions/industries/healthcare` and confirm the five use-case descriptions. | You independently confirm them. | | | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 2 | The "HIPAA compliant" claim is a simplification of the actual, more nuanced BAA reality | Confirm the exact "HIPAA compliant" wording on the healthcare page, then compare it against the 4.9.5 HIPAA Readiness & BAAs field's actual BAA-execution and SLA findings. | You confirm the marketing simplification and understand what "HIPAA compliant" actually requires in practice (an executed BAA). | | | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 3 | No named healthcare/life-sciences customer appears on either page | Read both pages fully and confirm no specific organization is named as a customer. | You confirm the gap. | | | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 2 — Testing the audit-trail claim directly — Sr No 4-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | The GxP-readiness claims (permissions/RBAC, audit trail, version awareness) appear verbatim on the life-sciences blog | Open `glean.com/blog/ai-in-life-sciences` and confirm the three claims. | You independently confirm the quotes. | | | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 5 | **The field's central test**: run a real Assistant/Search query as a test user, then check the Admin Audit Log to see whether that specific query appears — directly testing the "audit trail for every query" claim against your own tenant's default configuration | 1. As a non-admin test user, run a distinctive, easily-searchable-for query in Glean Assistant or Search.<br>2. As an admin, open the Admin Audit Log and search for that specific query.<br>3. Note whether it appears by default, or whether a separate system (GCE/query logging) needs to be explicitly enabled first. | You get a real, direct answer: either the query IS logged by default (updating this field's finding), or it is NOT (confirming the contradiction with claim 4's marketing language). | | This is the single most important row in this guide | ~20 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 3 — Confirming the USDM connection — Sr No 6-7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | The life-sciences blog's only research citation is generic academic content, not a named customer | Confirm the "Tufts-led analysis" reference is not attached to any named Glean deployment. | You confirm the gap. | | | ~5 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 7 | If Sr No 5 confirms a real audit-trail gap, USDM Life Sciences (or a similar implementation partner) is worth a serious look for any GxP/audit-sensitive prospect | Based on your Sr No 5 result, discuss internally whether a specialized implementation partner would be necessary to close the gap for a real regulated-industry client. | You reach a documented, informed conclusion about whether native Glean alone is sufficient for Perimeter-Healthcare-type audit requirements. | | Decision-support row, depends on Sr No 5's real result | ~15 min discussion, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Best-Fit Client Profile.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Best-Fit%20Client%20Profile.md), and specifically record the real audit-log test result (Sr No 5) — that is this field's most consequential, directly-relevant finding.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Healthcare page claims + gaps | 3 | | | | |
| 2. Audit-trail claim tested directly | 2 | | | | |
| 3. USDM connection confirmed | 2 | | | | |
