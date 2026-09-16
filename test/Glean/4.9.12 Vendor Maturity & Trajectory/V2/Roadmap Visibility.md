# 4.9.12 Roadmap Visibility - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Roadmap Visibility.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Roadmap%20Visibility.md). The core finding there is an absence-check: no public Glean product roadmap was found anywhere, and the only forward-looking language found in the entire project is two narrow single-feature "coming soon" notes. This field is **not hands-on-testable in a Glean tenant sandbox** - every row below is a public-source search/check, since the whole point is confirming (or overturning) an absence. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** N/A for this field - public sources only: `docs.glean.com`, `glean.com`, general web search
**Companion research doc:** [V2/Roadmap Visibility.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Roadmap%20Visibility.md)
**Section overview:** [../../Overview.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/Overview.md)

**Prerequisites (what you need before starting):**
- Public internet access only. No sandbox login required.
- Important: this guide's "Pass" condition for the absence-check rows means **you also failed to find a roadmap** - that confirms the finding. If you *do* find a public roadmap page, that's a genuine correction to research and should be marked `Fail` with the URL noted, not silently ignored.

**Sr No mapping:** Sr No 1-6 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Roadmap Visibility.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Roadmap%20Visibility.md#claims-sr-no-1-6-mapped-to-test-guide) - same number, same claim, doc-sourced there / re-checked here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (a quick page/search check) or `Hard` (a search that may not resolve cleanly) - so you can plan which rows to tackle first.

---

## Section 1 - Re-confirming no public roadmap exists - Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | No dedicated public roadmap page exists on docs.glean.com | Search `site:docs.glean.com roadmap` and review every result page directly - confirm none of them is a Glean product roadmap itself (vs. pages about a customer's own roadmap use case). | You find no Glean-authored roadmap page among the results. | | If you find one, note the exact URL - this would overturn the finding | ~15 min, Easy |
| 2 | No dedicated public roadmap page exists on glean.com generally | Search "Glean AI roadmap public" and separately browse glean.com's main navigation/footer for any "Roadmap" link. | You find no public roadmap page anywhere on the site. | | | ~15 min, Easy |

## Section 2 - Confirming the retrospective-only nature of the two cadence pages - Sr No 3-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | The release-notes index is purely retrospective - no forward-dated or "planned" entries | Open `docs.glean.com/release-notes` and scan every entry date and description. | Every entry is past-dated and describes something already shipped; none says "planned for" or carries a future date. | | | ~15 min, Easy |
| 4 | The product-drop archive is purely retrospective too | Open `glean.com/product-drop` and scan entries for any forward-looking language. | You find only past-tense recap language, no future-feature previews. | | | ~10 min, Easy |

## Section 3 - Confirming the only forward-looking language found is narrow - Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | The only forward-looking commitments found anywhere in this project's research are two narrow single-feature notes (Cost Controls "coming soon" items, Azure support for GPT-6 Astra) | Open `Glean/Combined/4.9.7 Pricing & TCO/V2/Hidden Costs Identified.md` (Sr No 11-12) and `Glean/Combined/4.9.3 AI Architecture & Models/V2/Foundation Models Used.md` (Sr No 12) and confirm these are the only "coming soon"/future-dated items referenced. | You confirm these two narrow items and find no broader forward-looking roadmap content anywhere else in the corpus. | | | ~15 min, Easy |

## Section 4 - Checking the Glean:GO conference as a roadmap-adjacent (but non-persistent) channel - Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | Glean:GO is an annual conference with roadmap-adjacent sessions, but not a persistently-available public roadmap document | Open `glean.com/events/glean-go-2026` directly (research doc flagged this as search-snippet-only, not independently fetched) and check what access it requires and whether any session content/recordings are freely, persistently accessible without attending. | You confirm it's an event (registration/attendance-gated or time-boxed), not an ongoing self-service roadmap page - this either confirms or corrects the research doc's unconfirmed-detail flag. | | This closes research's one explicitly unconfirmed detail in this field | ~15 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Roadmap Visibility.md](../../../../Glean/Combined/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Roadmap%20Visibility.md), and specifically flag any row where a roadmap page *was* found - that would be a correction to research, not just a confirmation.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. No public roadmap confirmation | 2 | | | | |
| 2. Retrospective-only cadence pages | 2 | | | | |
| 3. Narrow forward-looking language check | 1 | | | | |
| 4. Glean:GO conference detail | 1 | | | | |
