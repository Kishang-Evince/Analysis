# 4.9.9 Honest Weaknesses — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Honest Weaknesses.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Honest%20Weaknesses.md). The core finding there is a precise, verbatim marketing quote — "strictly enforced," "reflected immediately" — that directly contradicts two of this project's own already-confirmed weaknesses (the Notion ACL gap and crawl lag). This guide's job is to run the actual honesty tests fresh and put the exact marketing quote in front of a real test result. Written so someone with no prior context on this project can pick it up and run it — mostly sandbox tests already established elsewhere in this evaluation.

**Tenant entry:** Glean Admin Console · Notion (a disposable test page) · OneDrive · `glean.com/platform/connectors`
**Companion research doc:** [V2/Honest Weaknesses.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Honest%20Weaknesses.md)
**Base field doc (untouched, original):** [../Honest Weaknesses.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/Honest%20Weaknesses.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- A disposable Notion test page and OneDrive test file.
- Admin access for the pricing/Admin-console check.

**Sr No mapping:** Sr No 1-6 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Honest Weaknesses.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Honest%20Weaknesses.md#claims-sr-no-1-6-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally saw it happen — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (a quick sandbox/page check) or `Hard` (needs a multi-hour timed test) — so you can plan which rows to tackle first.

---

## Section 1 — Confirming the exact marketing language — Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The "strictly enforced" permissions claim appears verbatim on the platform page | Open `glean.com/platform/connectors` and confirm the exact wording. | You independently confirm the quote. | | | ~5 min, Easy |
| 2 | The "reflected immediately" sync claim appears verbatim on the same page | Confirm the exact wording on the same page. | You independently confirm the quote. | | | ~0 min extra, Easy |

## Section 2 — Running the actual contradiction tests fresh — Sr No 3-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | The Notion ACL gap directly contradicts the "strictly enforced" claim — reconfirm with a fresh test | 1. Create a disposable Notion test page with a clearly fake "sensitive" phrase.<br>2. Share it with the Glean Notion integration, keeping its real Notion sharing restricted to a small group.<br>3. As a DIFFERENT Glean user not in that group, search for the phrase.<br>4. Delete the test page immediately after confirming. | The unauthorized user finds the content anyway — directly falsifying the "strictly enforced" claim for this connector. Use disposable content only. | | Same test as 4.9.5/4.9.6 Notion oversharing tests — reuse if recently run | ~20 min, Hard |
| 4 | Notion/OneDrive crawl lag directly contradicts the "reflected immediately" claim — reconfirm with a fresh timed test | 1. Upload a new file to OneDrive (or create a new Notion page) with a unique, searchable phrase.<br>2. Time exactly how long until it becomes searchable in Glean.<br>3. Compare against a Google Drive upload (webhook-driven, should be much faster) as a control. | You get a real, timed measurement showing lag inconsistent with "reflected immediately" for at least one connector. | | | ~2-6 hours elapsed (mostly waiting), Easy active work |

## Section 3 — Checking the lock-in claim's actual customer-facing status — Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | The "no vendor lock-in" language should be checked against actual customer-facing marketing, not just job postings | Search Glean's actual product/marketing pages (not job postings) for similar "no lock-in" or "avoid lock-in" language, and note whether it appears there too. | You confirm whether this is genuinely customer-facing positioning or specific to recruiting content. | | | ~15 min, Easy |

## Section 4 — Reconfirming the weakness catalog is still current — Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | All ten cataloged weaknesses remain valid — spot-check 2-3 in your own tenant to confirm nothing has changed since the underlying fields were researched | Pick 2-3 items from the ten-item catalog (e.g. Protect+ as a paid add-on, per-user OAuth friction) and quickly re-confirm each still holds in your own tenant. | You confirm the catalog is still accurate, or flag anything that has changed. | | | ~20 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Honest Weaknesses.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Honest%20Weaknesses.md), and specifically record the fresh timed crawl-lag measurement (Sr No 4) and the Notion ACL test result (Sr No 3) — those give this field its most concrete, quote-versus-fact evidence.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Marketing quotes confirmed | 2 | | | | |
| 2. Contradiction tests re-run fresh | 2 | | | | |
| 3. Lock-in claim sourcing check | 1 | | | | |
| 4. Weakness-catalog spot-check | 1 | | | | |
