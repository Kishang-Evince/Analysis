# 4.9.12 Product Release Velocity — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Product Release Velocity.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Product%20Release%20Velocity.md). The core finding there is that Glean ships on a fast, sustained cadence (32 dated release-note entries in the trailing 12 months, ~2.7/month), corroborated independently by this project's own prior research finding substantive shipped capability in 5 separate 2026 months. This field is **not hands-on-testable in a Glean tenant sandbox** — it is a vendor-trajectory question, not a product-behavior question — so every row below is a public-source re-check (the release-notes index, the product-drop archive, individual release pages), not an `app.glean.com` UI test. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** N/A for this field — public sources only: `docs.glean.com/release-notes`, `glean.com/product-drop`
**Companion research doc:** [V2/Product Release Velocity.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Product%20Release%20Velocity.md)
**Section overview:** [../../Overview.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/Overview.md)

**Prerequisites (what you need before starting):**
- Public internet access only — no sandbox login required for any row in this guide.

**Sr No mapping:** Sr No 1-7 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Product Release Velocity.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Product%20Release%20Velocity.md#claims-sr-no-1-7-mapped-to-test-guide) — same number, same claim, doc-sourced there / re-checked here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally re-checked the source and it matches — not that the doc says so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (a quick public page check) or `Hard` (needs careful counting or a search that may not resolve) — so you can plan which rows to tackle first.

---

## Section 1 — Re-confirming the release-notes cadence count — Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The release-notes index lists 44 dated entries from Apr 2025 through Sep 2026 | Open `docs.glean.com/release-notes` and count every dated entry listed. | Count lands at or near 44 (allow for entries added since 2026-09-14). | | Note the exact count and date range you see — cadence pages update over time | ~15 min, Easy |
| 2 | 32 of those entries fall within the trailing 12 months (Sep 2025-Sep 2026), a rate of ~2.7/month | From the same index, count only entries dated within the 12 months prior to your test date. | Your count is close to 32 (adjust proportionally if your test date is later than 2026-09-14). | | | ~15 min, Easy |

## Section 2 — Confirming the most recent release's substance — Sr No 3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | The most recent indexed release shipped a real capability (at test time, GPT-6 Astra into Assistant/Agents), not a cosmetic update | Open the most recent entry on `docs.glean.com/release-notes` and read what it describes. | The entry describes a genuine new capability or model, not just a bug-fix note. | | If a newer entry than GPT-6 Astra now exists, describe what it shipped instead — the point is confirming *some* substantive recent shipment exists | ~10 min, Easy |

## Section 3 — Checking for burst-cadence months — Sr No 4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | At least one month in the trailing 12 carried 4+ separate dated entries | From the index, group entries by calendar month and find the densest month. | You find at least one month with 3+ entries, confirming cadence isn't evenly smoothed. | | | ~10 min, Easy |

## Section 4 — Cross-checking against this project's own prior research — Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | This project's own prior research (4.9.1, 4.9.3) independently found substantive Glean features shipped in 5 separate 2026 months | Open `Glean/Combined/4.9.3 AI Architecture & Models/V2/Foundation Models Used.md` and `Glean/Combined/4.9.1 Functional Capabilities/V2/Features Confirmed.md` and confirm the dated feature claims referenced (Feb/Mar/May/Jul/Sep 2026). | You find dated, sourced feature claims in those months, corroborating the cadence finding from a second angle. | | | ~15 min, Easy |

## Section 5 — Confirming the secondary "product drop" cadence signal — Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | The `glean.com/product-drop` archive independently shows a monthly recap cadence, Aug 2025-Jul 2026 (or later) | Open `glean.com/product-drop` and count the monthly entries listed. | You find a roughly monthly cadence of past-tense recap entries. | | | ~10 min, Easy |

## Section 6 — Confirming the stated limitation is honest, not overstated — Sr No 7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | The release-notes index itself does not classify entries by magnitude/impact | Open 3-4 entries at random from the index (not just the ones cited in the research doc) and check whether the index page (not the entry itself) shows any severity/size label. | You confirm the index lists titles/dates only, with no built-in major/minor classification — validating the doc's stated caveat rather than letting it overstate cadence-as-proof-of-magnitude. | | | ~15 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Product Release Velocity.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Product%20Release%20Velocity.md).

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Cadence count re-confirmation | 2 | | | | |
| 2. Most recent release substance | 1 | | | | |
| 3. Burst-cadence month check | 1 | | | | |
| 4. Cross-project corroboration | 1 | | | | |
| 5. Product-drop secondary signal | 1 | | | | |
| 6. Limitation honesty check | 1 | | | | |
