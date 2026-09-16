# 4.9.7 Actual Pricing Details - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Actual Pricing Details.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/Actual%20Pricing%20Details.md). The core finding there is that no channel (direct, Carahsoft, marketplace) has real self-service pricing - the AWS Marketplace listing even shows an obvious placeholder price. The most credible outside data point found is Vendr.com's real-transaction-based benchmark ($98,890/year median, ~20% average negotiated savings). This guide's job is to get your own real quote across multiple channels and compare. Written so someone with no prior context on this project can pick it up and run it - mostly procurement/sales conversations, no developer access needed.

**Tenant entry:** Glean direct sales · Carahsoft (or your reseller of choice) · AWS/Google Cloud Marketplace · your procurement team
**Companion research doc:** [V2/Actual Pricing Details.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/Actual%20Pricing%20Details.md)
**Base field doc (untouched, original):** [../Actual Partner Pricing.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/Actual%20Partner%20Pricing.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Your organization's procurement/vendor-management contact.
- A clear, specific seat count and term length to request quotes against (e.g. 100 seats, 3 years) for an apples-to-apples comparison across channels.

**Sr No mapping:** Sr No 1-7 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Actual Pricing Details.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/Actual%20Pricing%20Details.md#claims-sr-no-1-7-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally obtained or confirmed it - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (a quick page check) or `Hard` (needs a real sales conversation and a wait for quotes) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming referral economics and marketplace placeholder pricing - Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Referral partner economics (5% standard / up to 10% tiered, 45-day payout, clawback) are confirmed as described - relevant if any partner is referring your organization to Glean | 1. Open `glean.com/partners/referral` and confirm the figures match research.<br>2. If your organization was referred by a partner, ask that partner to confirm their actual reward structure matches. | You independently confirm the referral mechanics. | | Only directly relevant if a referral partner is involved in your deal | ~10 min, Easy |
| 2 | The AWS Marketplace listing shows a placeholder price, not a real one, and directs buyers to request a private offer | Open the AWS Marketplace listing for "Glean Work AI Platform" directly and check the displayed price for the Seats dimension. | You see the same obviously-placeholder figure (or a corrected real one, which would itself be newsworthy) and confirm "Request private offer" is the real path. | | | ~10 min, Easy |

## Section 2 - Getting real, comparable quotes across channels - Sr No 3, 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | BYOK/self-host discounts exist but their magnitude is unpublished - get a real percentage for your specific situation | If your organization is considering BYOK (Customer Key) or self-hosting, ask your Glean account team directly: *"What discount, specifically, applies to Enterprise Flex Seats and FlexCredits if we bring our own LLM keys or self-host?"* | You get a real percentage or dollar figure for your own deal, closing this confirmed gap. | | | ~10 min active + wait for reply, Hard |
| 6 | No published discount schedule exists on any channel - confirm this holds by requesting quotes through at least two different channels | 1. Request a formal quote through Glean's direct sales team for a specific seat count/term.<br>2. Separately, request a quote for the same seat count/term through Carahsoft or a cloud marketplace private offer.<br>3. Compare the two - note any difference in price, terms, or payment mechanics. | You get two real quotes to compare, confirming (or updating) the finding that no standard discount schedule exists. | | This is the field's central verification task | ~1-2 weeks (sales cycle), Hard |

## Section 3 - Benchmarking your quote against the Vendr real-transaction data - Sr No 4-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | Your organization's actual quote can be sanity-checked against Vendr's real-transaction median ($98,890/year, ~20% average negotiated savings, 100-250 seat minimum) | Once you have a real quote (from Sr No 6), compare its annual value and any discount you negotiated against these benchmark figures. | You get a realistic sense of whether your quote is in line with, above, or below what real buyers have reported paying - useful context for negotiation, not a target to demand. | | | Uses Sr No 6's output, ~15 min, Easy |
| 5 | Multi-year commitment and 500+ seat volume tend to unlock further discounts per real transaction data - test this directly in your own negotiation | If your seat count or term is flexible, ask your Glean sales contact directly what discount a 2-3 year term or a higher seat count would unlock, and compare the two offers. | You get a real, first-party data point on how much term/volume actually moves the price for your specific negotiation. | | | Part of the same sales conversation as Sr No 6 | ~0 min extra, Easy |

## Section 4 - Sanity-checking the cross-field pricing-estimate sourcing - Sr No 7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | The similar-sounding dollar figures across this project's pricing fields largely trace back to the same handful of sites, not independent confirmations | Briefly cross-check 2-3 of the specific pricing estimates cited across this section's fields (License Structure Details, Implementation Costs, this field) and note whether they cite the same underlying source sites. | You confirm the sourcing overlap, reinforcing that these numbers shouldn't be treated as five separate confirmations of the same fact. | | Sanity-check row, not a capability test | ~15 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Actual Pricing Details.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/Actual%20Pricing%20Details.md), and specifically record the actual quotes obtained (Sr No 6) and how they compare to the Vendr benchmark (Sr No 4) - those give this field its most decisive, real-world evidence.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Referral economics + marketplace placeholder | 2 | | | | |
| 2. Real multi-channel quotes | 2 | | | | |
| 3. Benchmark comparison | 2 | | | | |
| 4. Sourcing-overlap sanity check | 1 | | | | |
