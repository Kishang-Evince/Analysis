# 4.9.7 Hidden Costs Identified - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Hidden Costs Identified.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/Hidden%20Costs%20Identified.md). The standout finding there - read directly from Glean's own FlexCredit Terms PDF - is that Glean's free-usage grace period for usage-based Services expired March 31, 2026, meaning any tenant is now genuinely being billed for FlexCredit consumption. This guide's job is to confirm your own contract reflects this, get the actual Premium Support fee percentage (which the primary SLA document itself doesn't state), and check your own FlexCredit balance for the expiration risk. Written so someone with no prior context on this project can pick it up and run it - mostly contract/console review and vendor questions, no developer access needed.

**Tenant entry:** Your organization's signed Order Form/contract · Glean Admin Console → Usage/Billing · your Glean account team
**Companion research doc:** [V2/Hidden Costs Identified.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/Hidden%20Costs%20Identified.md)
**Base field doc (untouched, original):** [../Hidden Costs Identified.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/Hidden%20Costs%20Identified.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Access to your organization's actual signed Order Form (this is where the specific Premium Support fee and FlexCredit pool size are stated - the public legal templates deliberately don't include them).
- Admin access to Usage/Billing dashboards.
- Knowledge of whether your organization piloted or contracted with Glean before or after April 1, 2026, for the grace-period check.

**Sr No mapping:** Sr No 1-12 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Hidden Costs Identified.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/Hidden%20Costs%20Identified.md#claims-sr-no-1-12-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here. Rows 11-12 added 2026-09-14.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it against your own contract/console - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (a quick console/document check) or `Hard` (needs a written account-team answer or careful contract reading) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming the FlexCredit grace-period and expiration risk directly - Sr No 2-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | The free-usage grace period for usage-based Services ended March 31, 2026 - confirm your organization is (or isn't) now being billed for FlexCredit usage | 1. Check your Admin Console → Usage/Billing for any FlexCredit spend or invoice line items dated after April 1, 2026.<br>2. Ask your Glean account team directly, in writing: *"Can you confirm whether our organization is currently being charged for FlexCredit usage under the standard post-grace-period terms?"* | You confirm real billing is (or should be) active, and reconcile this against your own budget expectations if your pilot predates the grace period's end. | | This is the single most important row in this guide | ~15 min console check + ~10 min active/wait for reply, Hard |
| 3 | Your organization's FlexCredits expire one year after purchase if unused | 1. In Admin Console → Usage/Billing, check whether your FlexCredit balance shows a purchase/issuance date and an expiration date.<br>2. If your organization has a large unused balance approaching one year old, flag this to your admin team before it's forfeited. | You confirm the expiration mechanic is visible in your own console, and catch any at-risk balance before it lapses. | | Real, actionable finding - a lapsed balance is a real forfeited cost | ~15 min, Easy |
| 4 | FlexCredits cannot be refunded, transferred, or sold - confirm your organization's purchasing decisions account for this | Before your organization's next FlexCredit pack purchase, confirm with whoever owns the budget that this "no refund, no transfer, expires in 1 year" policy is understood and factored into how much to buy at once. | Your organization makes an informed purchase decision rather than over-buying based on an assumption of flexibility that doesn't exist. | | Process/awareness check, not a technical test | ~10 min discussion, Easy |

## Section 2 - Getting the real Premium Support fee percentage - Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | The specific Premium Support fee percentage (10-12% of license, per third-party sources) is not stated in Glean's own public SLA document - get the real number for your contract | 1. Check your organization's actual signed Order Form for the Premium Support line item and its fee (percentage or flat dollar).<br>2. If not on Premium Support, ask your account team what it would cost to upgrade. | You get a real, contract-specific number, resolving what the primary legal document itself left unstated. | | This closes research's most explicitly flagged "not confirmed" figure | ~15 min, Easy |

## Section 3 - Confirming the Premium-tier uptime SLA and response-time differences firsthand - Sr No 6-7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | If your organization is on Premium Support, the 99.9% uptime commitment and Service Credit remedy (10%/20% of monthly fees) is a real, claimable right - not just marketing language | 1. Confirm with your account team or contract whether your organization is on Premium Support and therefore covered by this specific uptime commitment.<br>2. If you've experienced any recent Glean downtime, check `status.glean.com` for the incident and consider whether a Service Credit claim applies - note the SLA requires a request within 30 days of the affected month. | You confirm whether this protection applies to your organization, and if relevant, whether you're actually exercising the claim right when downtime occurs. | | | ~15 min, Easy |
| 7 | The specific response-time figures (1 hour Urgent under Premium vs. 1 business day under Standard, etc.) match what your organization actually experiences | 1. If you've filed a support ticket recently, check how long the actual response took against the tier your organization is on.<br>2. If your organization hasn't yet tested this, note it as something to track the next time a ticket is filed. | You confirm real response times match (or don't match) the documented SLA. | | | ~10 min (or ongoing tracking), Easy |

## Section 4 - Confirming the AWS cost-avoidance guidance and Protect/Protect+ split - Sr No 8-9

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 8 | If your organization uses Cloud-Prem/Customer Hosted on AWS, AWS Config can genuinely be disabled to avoid an unnecessary cost, and Savings Plans guidance is real and actionable | 1. If applicable, check your AWS account for whether AWS Config is enabled on the Glean environment and whether it's required by your own org's broader AWS policy (vs. just inherited by default).<br>2. Check whether Compute/RDS Savings Plans have been applied per the 70%/80% guidance. | You confirm a real, avoidable cost opportunity (or confirm it's already been addressed). | | Only relevant for Cloud-Prem/Customer Hosted deployments - mark Blocked/N/A if on Glean Hosted | ~20 min (or N/A), Easy |
| 9 | Base Protect gives you manual, point-in-time tools; Protect+ gives continuous, automated protection - confirm this distinction is clear to whoever owns AI governance at your organization | 1. In Admin Console → Protect, confirm which tier your organization has.<br>2. If on base Protect only, confirm your team understands that sensitive-content scanning is a manual, periodic process (CSV-based) rather than continuous - and decide whether that's sufficient for your risk tolerance. | Your organization makes an informed decision about whether base Protect or Protect+ actually matches your governance needs. | | Cross-references this project's 4.9.5 Access Control Granularity findings | ~15 min, Easy |

## Section 5 - Confirming the overage-pack pricing gap - Sr No 10

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 10 | The dollar price of an additional FlexCredit pack is quote-only - get a real number for your organization before you need it urgently | Ask your Glean account team, in writing, for current FlexCredit pack pricing so you have it on hand before your base pool runs low (rather than negotiating under time pressure). | You get a real, current price, removing this as a surprise if/when you need to buy more. | | | ~10 min active + wait for reply, Hard |

## Section 6 - Confirming the two Cost Controls roadmap items are not yet available - Sr No 11-12

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 11 | The in-product "request additional usage" self-service feature is not yet available - confirm it's still "coming soon" in your own tenant | 1. In Admin Console → Usage/Billing (or wherever your tenant shows usage-limit warnings), check whether an option to request additional usage directly in-product exists.<br>2. If not found, ask your account team to confirm it remains unshipped. | You confirm the feature is not yet available in your tenant, matching Glean's own "coming soon" label. | | | ~10 min, Easy |
| 12 | The spend-forecasting feature for admins is not yet available - confirm it's still "coming soon" in your own tenant | 1. In Admin Console → Usage/Billing, look for any forecast/projected-spend view.<br>2. If not found, ask your account team to confirm it remains unshipped. | You confirm the feature is not yet available in your tenant, matching Glean's own "coming soon" label. | | | ~10 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Hidden Costs Identified.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/Hidden%20Costs%20Identified.md), and specifically record the actual Premium Support fee percentage (Sr No 5) and the FlexCredit billing confirmation (Sr No 2) - those give this field its most decisive, tenant-specific evidence.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. FlexCredit grace period + expiration risk | 3 | | | | |
| 2. Real Premium Support fee percentage | 1 | | | | |
| 3. Uptime SLA + response-time confirmation | 2 | | | | |
| 4. AWS cost avoidance + Protect/Protect+ split | 2 | | | | |
| 5. Overage-pack pricing | 1 | | | | |
| 6. Cost Controls roadmap items (self-service usage requests, spend forecasting) | 2 | | | | |
