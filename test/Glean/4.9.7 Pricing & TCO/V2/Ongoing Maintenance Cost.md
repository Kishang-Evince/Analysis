# 4.9.7 Ongoing Maintenance Cost - Independent Research Test Guide

**Purpose:** Hands-on tenant verification of every claim in the companion research doc [V2/Ongoing Maintenance Cost.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/Ongoing%20Maintenance%20Cost.md). The core finding there is a newly-confirmed, Glean-authored contractual figure - Premium Support costs 12% of license fee - found in Glean's website-terms contract (Exhibit A), directly resolving a gap this project's own Hidden Costs Identified.md left open. This guide's job is to confirm that figure, and the other contract mechanics, against your organization's own actual signed terms rather than the standard public website-terms language.
**Tenant entry:** Your organization's signed Glean Order Form/contract and any attached Exhibits · Admin Console → Usage/Billing · your Glean account team
**Companion research doc:** [V2/Ongoing Maintenance Cost.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/Ongoing%20Maintenance%20Cost.md)
**Sr No mapping:** Sr No 1-8 below map 1:1 to the same Sr No in the companion research doc's claims table.
**How to record a result:** Pass/Fail/Partial/Blocked + Notes. "Pass" means you personally confirmed it against your own contract/console - not that the docs say so.
**Effort column:** time estimate + Easy/Hard tag - `Easy` (a quick console/contract check) or `Hard` (needs a written account-team answer or contract-owner access).

---

## Section 1 - Confirming the 12% Premium Support figure and standard-tier inclusions against your own contract - Sr No 1-2, 4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Premium Support costs an additional 12% of license fee, per Glean's standard website-terms contract | 1. Review your organization's actual signed Order Form/contract for a Premium Support clause.<br>2. Confirm whether it states 12% of license fee, a different negotiated percentage, or a flat dollar amount. | You confirm the actual percentage or dollar figure that applies to your specific contract - it may match the standard 12%, or may have been negotiated differently. | | This is the field's single most important row - the 12% figure comes from Glean's public standard terms, not necessarily your negotiated terms | ~20 min, Easy (if you have contract access) [OPTIONAL - deprioritized 2026-09-15, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 2 | Standard support is free, with a 1-business-day response SLA | 1. Review your contract or Admin Console for confirmation of the Standard Support tier's cost (should be $0 beyond license) and response-time commitment. | You confirm baseline support costs nothing extra and response times match. | | | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-15, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 4 | A dedicated CSM and Solutions Architect are included at no additional charge | 1. Confirm with your account team whether you have (or are entitled to) a dedicated CSM and Solutions Architect as part of your base relationship, with no separate fee. | You confirm this inclusion applies to your organization specifically. | | | ~10 min active + wait for reply, Easy [OPTIONAL - deprioritized 2026-09-15, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 2 - Confirming no hidden upgrade fees or mandatory managed-services charges - Sr No 3, 8

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Platform updates/upgrades are bundled into the base service with no separate fee | Ask your account team, in writing: *"Are there any circumstances under which a platform upgrade or major version change would incur a separate fee for us?"* | You get a direct, contract-specific answer closing this absence-check for your own deployment. | | | ~10 min active + wait for reply, Hard [OPTIONAL - deprioritized 2026-09-15, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 8 | No vendor-managed-services requirement is mandatory beyond the standard SaaS license/support terms | Confirm with your account team whether your deployment (SaaS vs. Customer-Hosted) requires any additional mandatory managed-services engagement beyond what's already covered by claims 1-4. | You confirm the standard SaaS path carries no forced managed-services line item for your organization. | | Only relevant in depth if you're considering Customer-Hosted/self-host | ~10 min active + wait for reply, Hard [OPTIONAL - deprioritized 2026-09-15, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 3 - Confirming renewal mechanics and the actual price-escalation percentage - Sr No 5-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Contract auto-renews unless 30 days' notice of non-renewal is given; term changes require mutual agreement | 1. Review your contract's renewal/term section (Sections 7.2 and 9 in the standard website-terms).<br>2. Confirm the actual notice period and renewal mechanism in your own Order Form. | You confirm the exact notice window that applies to your organization, so it can be tracked on a renewal calendar. | | | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-15, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 6 | Annual renewal price increases default to roughly 7-12%, negotiable with an upfront cap - not stated in the standard contract itself | Ask your account team directly, in writing, ideally 90+ days before your renewal date: *"What is our actual contracted (or expected) annual price escalation at renewal, and can we negotiate a cap now?"* | You get a real, contract-specific answer and, ideally, a negotiated cap - closing this field's one genuinely unconfirmed number for your organization. | | Do this well before renewal, per the research doc's own timing note | ~10 min active + wait for reply, Hard [OPTIONAL - deprioritized 2026-09-15, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 4 - Connecting the confirmed fee to what it actually buys - Sr No 7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | Premium Support's 12% fee buys a 99.9% uptime SLA with 10%/20% service credits (cross-ref finding from Hidden Costs Identified.md) | If your organization is on or considering Premium Support, confirm with your account team that the 99.9% uptime commitment and service-credit remedy actually apply to your contract as written. | You confirm the uptime SLA/credit terms apply concretely to your own agreement, not just the standard published SLA. | | Cross-check row, not a new capability test | ~10 min active + wait for reply, Hard [OPTIONAL - deprioritized 2026-09-15, see scrap/GLEAN_RESEARCH_MEMORY.md] |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Ongoing Maintenance Cost.md](../../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/V2/Ongoing%20Maintenance%20Cost.md), and specifically record: (a) your organization's actual Premium Support percentage/dollar figure (Sr No 1), and (b) your actual or expected renewal escalation percentage (Sr No 6).

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Support-tier costs and inclusions | 3 | | | | |
| 2. Upgrade fees and managed-services requirement | 2 | | | | |
| 3. Renewal mechanics and escalation percentage | 2 | | | | |
| 4. Premium Support value confirmation | 1 | | | | |
