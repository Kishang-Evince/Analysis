# 4.9.12 Customer Retention Signals — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Customer Retention Signals.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Customer%20Retention%20Signals.md). The core finding there is mixed: G2/Gartner review data is real and consistently strong, but every figure was sourced from search-engine snippets only because both G2 and Gartner returned HTTP 403 to direct automated fetches this pass — and no published NPS or churn/NRR figure was found anywhere. This field is **not hands-on-testable in a Glean tenant sandbox** — every row below is a public-source re-check, and several specifically require a live browser session (not an automated fetch) to get past the 403s the research pass hit. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** N/A for this field — public sources only: `g2.com`, `gartner.com`, `glean.com/press`, general web search
**Companion research doc:** [V2/Customer Retention Signals.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Customer%20Retention%20Signals.md)
**Section overview:** [../../Overview.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/Overview.md)

**Prerequisites (what you need before starting):**
- Public internet access, with a real browser (not an automated scraper) for the G2/Gartner rows — this research pass's automated WebFetch tool was blocked with HTTP 403 on both domains, so this guide's whole purpose for those rows is getting a human-verified number where the tooling couldn't.

**Sr No mapping:** Sr No 1-8 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Customer Retention Signals.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Customer%20Retention%20Signals.md#claims-sr-no-1-8-mapped-to-test-guide) — same number, same claim, doc-sourced there / re-checked here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally saw the live page — not that a search snippet said so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (a quick page check) or `Hard` (needs a live browser session past a block, or a search that may not resolve) — so you can plan which rows to tackle first.

---

## Section 1 — Getting a live-verified G2 review count and rating — Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | G2 shows 162 reviews for Glean (seller aggregation page) | Using a real browser, open `g2.com/sellers/glean-technologies-...` (search "Glean G2 reviews" if the URL has changed) and read the live review count directly off the page. | You get a live-page-confirmed review count, replacing the search-snippet-only figure in research. | | This is the single most important row in this section — it converts an unconfirmed snippet into a directly observed figure | ~15 min, Hard (browser needed, page may require scroll/load) |
| 2 | The 4.7/5, 116-review figure is stale (Oct 2023) and should not be cited as current | Note today's live rating/review count from Sr No 1 and compare it against the 2023 figure. | You confirm the current figure differs from and supersedes the 2023 one. | | | ~5 min, Easy |

## Section 2 — Getting live-verified Gartner Peer Insights figures — Sr No 3-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Gartner Peer Insights shows Glean at 4.5 stars / 115 reviews in "Insight Engines" | Using a real browser, open the Gartner Peer Insights page for Glean under the Insight Engines market and read the live rating/count. | You get a live-page-confirmed figure. | | | ~10 min, Hard (browser needed) |
| 4 | Gartner Peer Insights shows Glean at 4.5 stars / 126 reviews in "Generative AI Knowledge Management Apps / General Productivity" | Same as Sr No 3, for this market category. | You get a live-page-confirmed figure. | | | ~10 min, Hard |
| 5 | Gartner Peer Insights shows Glean at 4.4 stars / 132 reviews in "Enterprise AI Search" | Same as Sr No 3, for this market category. | You get a live-page-confirmed figure. | | | ~10 min, Hard |

## Section 3 — Confirming the NPS and churn/NRR absence-checks — Sr No 6-7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | No published NPS exists anywhere for Glean | Search "Glean NPS score" and variants (e.g. "Glean net promoter score enterprise search"); check glean.com press/investor pages directly. | You find no Glean-specific NPS figure from any source. | | If found, note source/figure — this would overturn the finding | ~15 min, Easy |
| 7 | No published churn rate or NRR percentage exists anywhere for Glean | Search "Glean churn rate" and "Glean net revenue retention"; check press/funding coverage directly. | You find no churn or NRR figure from any source. | | If found, note source/figure — this would overturn the finding | ~15 min, Easy |

## Section 4 — Re-checking the ARR growth figures used as a retention proxy — Sr No 8

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 8 | Glean's ARR grew from ~$100M to ~$200M to ~$300M over roughly 16 months (early 2025-May 2026) | Open `glean.com/press` directly and find the Series F announcement; separately search for the TechCrunch "$300M" article and open it directly. | You independently confirm both the $150M/$7.2B Series F figures and the ARR growth trajectory from the original sources (not just search snippets). | | Also note explicitly that this is being used as an *inferred* retention/expansion proxy, not a disclosed NRR figure — don't let it get cited as if Glean published a retention number | ~15 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Customer Retention Signals.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Customer%20Retention%20Signals.md), and specifically record the live-verified G2/Gartner figures (Sr No 1, 3-5) since research could only source those via search snippet.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Live G2 verification | 2 | | | | |
| 2. Live Gartner verification | 3 | | | | |
| 3. NPS/churn absence-checks | 2 | | | | |
| 4. ARR growth re-check | 1 | | | | |
