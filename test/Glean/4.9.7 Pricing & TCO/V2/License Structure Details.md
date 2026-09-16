# 4.9.7 License Structure Details - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/License Structure Details.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/License%20Structure%20Details.md). The core finding there is that Glean's Model Hub page publishes real, specific per-million-token dollar rates - a genuine exception to the "no public pricing" pattern - and that a specific prior-research detail (the ">30 FlexCredits" rule, an 80% alert threshold) could not be re-confirmed on the page that should document it. This guide's job is to confirm your actual contract model and get a direct, first-party answer on the unconfirmed rule. Written so someone with no prior context on this project can pick it up and run it - mostly Admin Console checks and a contract review, no developer access needed.

**Tenant entry:** Glean Admin Console → Usage/Billing · your organization's signed contract/order form · your Glean account team
**Companion research doc:** [V2/License Structure Details.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/License%20Structure%20Details.md)
**Base field doc (untouched, original):** [../License Structure Details.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/License%20Structure%20Details.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Access to your organization's actual Glean contract/order form (or whoever owns vendor contracts - procurement, finance, or your Glean account executive).
- Admin access to the Glean Admin Console's Usage/Billing dashboards.

**Sr No mapping:** Sr No 1-9 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/License Structure Details.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/License%20Structure%20Details.md#claims-sr-no-1-9-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it against your own contract/console - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (a quick console/contract check) or `Hard` (needs a written account-team answer or contract-owner access) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming which commercial model applies to your tenant - Sr No 1, 4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Your organization is on Enterprise Flex (per-seat + FlexCredits) - confirm directly from the contract, not assumption | 1. Review your signed contract/order form.<br>2. Confirm whether it names "Enterprise Flex," "FlexCredits," a base credit pool size, and the "100/user/week" Thinking/Adaptive allowance. | You confirm your actual commercial model and the specific numbers in your own contract. | | If your tenant is on Core Suite instead, do Sr No 4 first and treat this row as N/A | ~20 min, Easy |
| 4 | Your organization is on Core Suite + Model Hub instead - confirm directly if Sr No 1 doesn't apply | 1. If your contract instead names "Core Suite" and "Model Hub," confirm the seat structure and whether an upfront Model Hub token commit is specified. | You confirm your actual commercial model. | | Only one of Sr No 1 / Sr No 4 should apply - confirm which | ~10 min, Easy |

## Section 2 - Confirming the FlexCredit rate card against your own real usage - Sr No 2-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | FlexCredits are pooled org-wide, not allocated per individual seat | 1. In Admin Console → Usage/Billing, confirm the FlexCredits balance is shown as one organization-wide number, not broken out per user. | You confirm the pooled structure directly in the console. | | | ~10 min, Easy |
| 3 | The published rate-card ranges (Fast Mode ~3-15, Thinking ~35-120, Slides ~45-142, Agent runs ~7-114) roughly match your tenant's actual consumption | 1. Run 5-10 real queries across Fast Mode, Thinking Mode, and (if available) an agent run and a slide generation.<br>2. Check the Usage dashboard's per-action FlexCredit consumption and compare against the published ranges. | Your actual consumption falls within (or reasonably close to) the published ranges - a real-world sanity check on the rate card. | | | ~30 min, Easy |

## Section 3 - Confirming the Model Hub dollar rates and Flexible Model Management - Sr No 5-7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Glean's Model Hub page publishes real per-million-token dollar rates for specific named models (Waldo, GPT-4o, Claude Opus 5, and others) | 1. Open `docs.glean.com/glean-core-suite-pricing` directly in your browser and confirm the specific rate table is visible and matches research.<br>2. If your tenant is on Core Suite, cross-check one of these rates against an actual invoice/usage line item if available. | You independently confirm the published rate table exists and, if possible, matches real billing. | | | ~15 min, Easy |
| 6 | Flexible Model Management's percentage fee is not published anywhere - confirm this gap directly with your account team | Ask your Glean account team, in writing: *"What percentage (or dollar structure) does Flexible Model Management actually charge for our contract?"* | You get a direct, contract-specific answer, closing this documented gap for your own tenant even if the public rate stays unpublished. | | | ~10 min active + wait for reply, Hard |
| 7 | API fair-use caveat (human-scale free, machine-scale extra fees) is a real distinction worth confirming applies to your own API usage plans | If your team plans any machine-scale/automated API usage (batch jobs, integrations calling the API programmatically at volume), ask your account team what threshold triggers additional fees and what those fees are. | You get a concrete, contract-specific answer before you accidentally trigger unexpected charges. | | Only relevant if you're planning API-heavy usage | ~10 min active + wait for reply, Hard |

## Section 4 - Resolving the discrepancy and the competitor-pricing caution - Sr No 8-9

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 8 | The ">30 FlexCredits counts as multiple queries" rule and an 80% alert-threshold default could not be re-confirmed this pass - get a direct answer | 1. In Admin Console → Usage limits and alerts, check what alert-threshold options are actually offered (confirm whether 50/75/90/100% matches, or whether 80% appears as an option/default).<br>2. Ask your Glean account team directly: *"Is there a specific FlexCredit threshold (e.g. 30 credits) at which a single query gets counted as multiple queries against our included allowance? If so, what is it exactly?"* | You resolve the discrepancy with a first-party, current answer - either confirming the earlier detail or updating it. | | This closes research's one flagged discrepancy | ~15 min console check + ~10 min active/wait for reply, Hard |
| 9 | Third-party dollar-figure pricing estimates online are largely competitor-sourced and should not be treated as validated - confirm by checking who's actually publishing them | Spend 10 minutes looking at 2-3 of the specific pricing-estimate articles/tools (e.g. a Glean cost calculator from a competing product) and note whether the publisher is itself a competing enterprise-search/AI-assistant vendor. | You confirm the sourcing-bias pattern firsthand, reinforcing that your own contract is the only reliable number for your organization. | | Sanity-check row, not a capability test | ~15 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/License Structure Details.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/License%20Structure%20Details.md), and specifically record which commercial model applies to your tenant (Sr No 1/4) and the account team's answer on the FlexCredit threshold rule (Sr No 8).

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Commercial model confirmed | 2 | | | | |
| 2. FlexCredit pooling + rate-card sanity check | 2 | | | | |
| 3. Model Hub rates + Flexible Model Management | 3 | | | | |
| 4. Discrepancy resolution + competitor-pricing caution | 2 | | | | |
