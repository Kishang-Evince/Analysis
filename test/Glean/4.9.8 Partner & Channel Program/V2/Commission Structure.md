# 4.9.8 Commission Structure — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Commission Structure.md](../../../../Glean/Combined/4.9.8%20Partner%20&%20Channel%20Program/V2/Commission%20Structure.md). The core finding there is that referral economics (5%/10%) are real but come with three specific eligibility exclusions not previously documented, while the Commercial/VAR margin — the track actually relevant to Stratos's implementation revenue model — remains completely unpublished. This guide's job is to read the actual referral 1-pager PDF (which resisted automated extraction) and get a real Commercial/VAR margin figure. Written so someone with no prior context on this project can pick it up and run it — a document download plus a partner-team conversation, no developer access needed.

**Tenant entry:** `glean.com/partners/referral` · the linked Google Drive PDF · your Glean partner manager (post-application)
**Companion research doc:** [V2/Commission Structure.md](../../../../Glean/Combined/4.9.8%20Partner%20&%20Channel%20Program/V2/Commission%20Structure.md)
**Base field doc (untouched, original):** [../Commission Structure.md](../../../../Glean/Combined/4.9.8%20Partner%20&%20Channel%20Program/Commission%20Structure.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Ability to download and open a Google-Drive-hosted PDF.
- Progress on (or completion of) the Partner Program Details field's application step, since the Commercial/VAR margin likely requires partner-manager contact.

**Sr No mapping:** Sr No 1-7 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Commission Structure.md](../../../../Glean/Combined/4.9.8%20Partner%20&%20Channel%20Program/V2/Commission%20Structure.md#claims-sr-no-1-7-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (a quick page check) or `Hard` (needs a document download or a partner-manager conversation) — so you can plan which rows to tackle first.

---

## Section 1 — Confirming referral eligibility and clawback mechanics — Sr No 1-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The 5% commission scope (net-new, private-sector, closed-won) matches the live page | Open `glean.com/partners/referral` and confirm the exact wording. | You confirm the scope language matches research. | | | ~5 min, Easy |
| 2 | The three eligibility exclusions (not an existing customer, no active opportunity, no recent sales engagement) are real and would apply to any specific referral Stratos might make | 1. Confirm the exclusion language on the live page.<br>2. If Stratos has a specific referral target in mind, ask your Glean contact directly whether that account would pass all three exclusion checks BEFORE making the introduction. | You confirm the language, and — if applicable — get a real, pre-checked answer for your actual referral target. | | Checking before making the intro avoids wasted effort on a disqualified referral | ~10 min + optional pre-check, Easy |
| 3 | Clawback is pro-rated, not all-or-nothing | Confirm the exact clawback language on the live page. | You confirm the pro-rated mechanic. | | | ~5 min, Easy |

## Section 2 — Reading the actual referral 1-pager — Sr No 4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | The referral 1-pager PDF contains real content beyond what's on the webpage | 1. Open the Google Drive link from `glean.com/partners/referral` in a real browser.<br>2. Download and read the actual PDF.<br>3. Note anything in it not already captured from the webpage itself. | You get the real document content, closing research's one flagged "confirmed real but unreadable" gap. | | | ~15 min, Easy |

## Section 3 — Getting the real Commercial/VAR margin — Sr No 5-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | The Commercial/VAR reseller margin percentage is genuinely unpublished and requires direct partner-manager contact | Once you have partner-portal access (or a partner-manager contact), ask directly: *"What is the actual reseller margin percentage for the Commercial/VAR track, and does it vary by deal size or tier?"* | You get a real number, closing this field's most consequential gap. | | This is the field's central deliverable | ~15 min active + wait for reply, Hard |
| 6 | No multi-year renewal commission exists for any track — confirm this directly rather than assuming | In the same conversation, ask: *"Is there any commission on Year 2/3 renewals for a referred or resold customer, for any track?"* | You get a clear, direct answer — either confirming the absence or revealing a previously-undocumented renewal mechanic. | | | ~0 min extra (same conversation), Easy |

## Section 4 — Sanity-checking the Glean.ai sourcing caution — Sr No 7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | Glean.ai's partner program is a completely separate program with its own, unrelated commission terms | If anyone on the team is researching commission figures independently, have them briefly check `glean.ai/partner` and confirm it's clearly a different company/program before citing any numbers from it. | You confirm the two are unrelated, preventing a real dollar-figure mix-up. | | Sanity-check row, not a capability test | ~5 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Commission Structure.md](../../../../Glean/Combined/4.9.8%20Partner%20&%20Channel%20Program/V2/Commission%20Structure.md), and specifically record the real Commercial/VAR margin percentage (Sr No 5) — that closes this field's most important open question.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Referral eligibility + clawback | 3 | | | | |
| 2. Referral 1-pager content | 1 | | | | |
| 3. Real Commercial/VAR margin | 2 | | | | |
| 4. Glean.ai sourcing caution | 1 | | | | |
