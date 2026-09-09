# 4.9.7 Implementation Costs — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Implementation Costs.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/Implementation%20Costs.md). The core finding there is a hard contractual line: native connectors are free to set up once, custom connectors require a paid SOW — confirmed from actual legal text. Everything past that line is either undisclosed or third-party estimate-only, including one specific $70K paid-POC claim that appeared only once, hedged, and should not be repeated as fact without direct confirmation. This guide's job is to get real SOW numbers for your own deployment and directly challenge the unconfirmed figures with your account team. Written so someone with no prior context on this project can pick it up and run it — mostly contract review and vendor/partner questions, no developer access needed.

**Tenant entry:** Your organization's Glean contract/SOW documents · your Glean account team and/or implementation partner · `glean.com/website-terms`
**Companion research doc:** [V2/Implementation Costs.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/Implementation%20Costs.md)
**Base field doc (untouched, original):** [../Implementation Costs.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/Implementation%20Costs.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Access to your organization's actual implementation SOW (if one exists) or the ability to request one.
- Contact with your Glean account team or implementation partner.
- Knowledge of whether your planned connector list is entirely native, or includes any custom/SDK-built connectors.

**Sr No mapping:** Sr No 1-9 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Implementation Costs.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/Implementation%20Costs.md#claims-sr-no-1-9-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it against your own contract/quote — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (a quick document check) or `Hard` (needs a written vendor/partner answer) — so you can plan which rows to tackle first.

---

## Section 1 — Confirming the contractual free/paid connector boundary — Sr No 1-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Native cloud-app connector setup is free, one time, in your own contract | 1. Find the equivalent of "Exhibit A, Section 3" in your organization's actual signed agreement (terms may be incorporated by reference from `glean.com/website-terms`).<br>2. Confirm the free one-time native-connector setup language applies to your deal. | You confirm this term applies to your organization specifically, not just the public template. | | | ~15 min, Easy |
| 2 | Custom connectors in your own deployment plan will trigger a separate, paid SOW | 1. List every connector your organization plans to use.<br>2. Confirm with your Glean account team which, if any, require a custom (non-native) build.<br>3. For any custom ones, request the SOW and its actual quoted cost. | You get a real, itemized answer on which connectors (if any) will cost extra, and what that cost actually is. | | | ~30 min + wait for SOW, Hard |
| 3 | If your team considers building a custom connector yourselves via the API/SDK instead of paying for Glean PS, get a realistic effort estimate directly since the docs don't provide one | Ask your Glean account team or a developer on your team: *"Realistically, how many engineering-hours does a typical self-built custom connector take using the API/SDK?"* | You get a real effort estimate to compare against the cost of a paid PS SOW for the same connector. | | Only relevant if self-build is being considered | ~15 min active + wait for reply, Hard |

## Section 2 — Confirming partner-led implementation structure and cost — Sr No 4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | The Architect/Deploy/Activate partner methodology is real, and partner PS pricing (undisclosed publicly) can be obtained directly | 1. If working with a Glean implementation partner, ask them to walk through their Architect/Deploy/Activate phases for your specific deployment.<br>2. Request an actual quote or cost range for their PS engagement. | You confirm the methodology matches research, and get a real, tenant-specific cost figure that the public partner page doesn't disclose. | | | ~30 min active + wait for reply, Hard |

## Section 3 — Making sure the "Comparing Costs" blog figures aren't mistaken for Glean's own quote — Sr No 5-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | The $15K-$500K+ figures in Glean's "Comparing Costs" blog article are general industry commentary, not Glean's own implementation pricing | 1. Open `glean.com/perspectives/comparing-costs-scaling-ai-search-solutions-in-2026` directly and read the surrounding context of these figures.<br>2. Confirm whether the article ever explicitly ties these numbers to Glean's own product specifically, or keeps them framed as general market commentary. | You confirm the figures are general market framing, and make sure nobody on your team cites this article as "Glean's implementation cost is $15K-$500K." | | Sanity-check row, prevents a real sourcing mistake | ~15 min, Easy |
| 6 | The 15-25% annual maintenance figure from the same article carries the same generic-industry caveat | Same read-through as Sr No 5, specifically checking this figure's context. | You confirm this figure is also general commentary, not a Glean-specific maintenance-fee disclosure. | | Included in Sr No 5's reading | ~0 min extra, Easy |

## Section 4 — Getting real numbers on the specific unconfirmed third-party claims — Sr No 7-9

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | Third-party estimates ($5K-$50K implementation range) should be replaced with your own actual quote rather than relied upon | Once you have a real implementation SOW quote (from Sr No 2 or 4), compare it against this range purely as a sanity check — not as a target. | You have a real number to compare against, and can judge whether the third-party estimate range was reasonably accurate for your organization's situation. | | | Uses Sr No 2/4's output, ~0 min extra, Easy |
| 8 | The specific $70,000 paid-POC-requiring-200+-seats claim should be directly challenged with your account team before being treated as real | Ask your Glean account team directly, in writing: *"Is there a paid proof-of-concept program, and if so, what does it cost and what's the minimum seat count?"* | You get a direct, first-party answer that either confirms, contradicts, or updates this specific unconfirmed claim. | | This closes research's most explicitly flagged low-confidence claim | ~10 min active + wait for reply, Hard |
| 9 | The ~10% mandatory support fee should be confirmed directly against your own contract line items | Review your own contract/quote for a specific support-fee line item and confirm its actual percentage or dollar amount. | You get a real, contract-specific number rather than relying on repeated-but-unconfirmed third-party figures. | | | ~10 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Implementation Costs.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/Implementation%20Costs.md), and specifically record the real SOW/quote figures obtained (Sr No 2, 4) and the account team's direct answer on the paid-POC claim (Sr No 8) — those give this field its most decisive, tenant-specific evidence.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Native/custom connector cost boundary | 3 | | | | |
| 2. Partner methodology + cost | 1 | | | | |
| 3. Blog-figure sourcing sanity check | 2 | | | | |
| 4. Unconfirmed third-party claims resolved | 3 | | | | |
