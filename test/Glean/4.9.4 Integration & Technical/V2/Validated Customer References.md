# 4.9.4 Validated Customer References - Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/Validated Customer References.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Validated%20Customer%20References.md). The core finding there is that Glean's published customer stories split into two tiers - named, quantified full case studies vs. logo-only placements with no published detail - and that the "willing to speak with prospects" sub-question of the SOW definition cannot be answered from public research at all. This guide's job is to confirm that split still holds, chase down the healthcare/health-insurance-adjacent references specifically, and actually ask Glean for a live reference call - the one step no amount of web research can substitute for.

**Tenant entry:** N/A (no Glean Admin Console access required for this field) - this field is vendor-conversation and public-web based, not tenant-config based.
**Companion research doc:** [V2/Validated Customer References.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Validated%20Customer%20References.md)
**Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- A web browser (no login needed - all research doc sources are public pages).
- Contact information for this deal's Glean Account Executive (AE) or sales contact, for Sr No 6 and 8.
- LinkedIn access (or equivalent), for Sr No 5's outreach-based verification.
- 30-45 minutes total, plus elapsed calendar time waiting on the AE's reference-call response (Sr No 6, likely multi-day turnaround).

**Sr No mapping:** Sr No 1-9 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Validated Customer References.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Validated%20Customer%20References.md#claims-sr-no-1-9-mapped-to-test-guide) - same number, same claim, doc-sourced there / verified here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally confirmed it - not that the research doc says so. For the vendor-contact rows, "Pass" means the AE actually responded with the requested information, not just that you sent the ask.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (a page check), `Medium` (requires outreach or a short wait), or `Hard` (needs a live vendor reference call scheduled and held) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming the published case-study tiering - Sr No 1

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Glean's customer-stories page still shows the same two-tier split (named full case studies vs. logo-only placements) at the time you check | 1. Go to [glean.com/resources/customer-stories](https://www.glean.com/resources/customer-stories).<br>2. Count roughly how many logos link out to an actual written case study page vs. how many are logo-only with no linked story.<br>3. Note any new full case studies added since 2026-09-14 (the research doc's validation date), especially any new healthcare or health-insurance names. | The two-tier split is still visible, and you've noted whether any new healthcare-relevant case study has been published since the research pass. | | | ~10 min, Easy |

## Section 2 - Spot-checking the quantified case studies for currency - Sr No 2-4, 7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | The Confluent case study's quantified metrics (15,000+ hours/month saved, 70% active usage, 5-10 min/ticket) are still live and unchanged on the page | 1. Open [glean.com/resources/customer-stories/confluent](https://www.glean.com/resources/customer-stories/confluent).<br>2. Confirm the specific figures and named-quote attributions match what's recorded in the research doc. | Figures and quotes match (or you note exactly what changed, e.g. a newer/updated metric). | | | ~5 min, Easy |
| 3 | The McCarthy Holdings case study's figures ($2.7M+ change orders, 90% engagement) and all four named-individual quotes are still live and unchanged | 1. Open [glean.com/resources/customer-stories/mccarthy-holdings-inc](https://www.glean.com/resources/customer-stories/mccarthy-holdings-inc).<br>2. Confirm figures and quotes match the research doc. | Figures and quotes match (or you note exactly what changed). | | | ~5 min, Easy |
| 4 | The Covered California case study (this project's strongest health-sector-adjacent reference) is still live, still named, and its four named executives are still current employees per LinkedIn | 1. Open [glean.com/resources/customer-stories/covered-california](https://www.glean.com/resources/customer-stories/covered-california) and confirm the figures/quotes match.<br>2. Search LinkedIn for Shilpa Akunuri, Austin Walls-Barcellos, Gloria Simas, and Pa Vue - confirm they still list Covered California as current employer and the title matches. | Page content matches, and at least the CTO (Shilpa Akunuri) is confirmed as a current Covered California employee on LinkedIn - meaning this reference is not stale/departed. | | If any named individual has left, note it - it doesn't invalidate the case study but weakens the "can this specific person be reached" angle | ~15 min, Medium |
| 7 | The SafetyCulture case study's 90%-would-recommend figure and named quotes are still live and unchanged | 1. Open [glean.com/resources/customer-stories/safetyculture](https://www.glean.com/resources/customer-stories/safetyculture).<br>2. Confirm figures and quotes match the research doc. | Figures and quotes match (or you note exactly what changed). | | | ~5 min, Easy |

## Section 3 - Chasing the anonymized healthcare reference and the vendor's own healthcare page - Sr No 5-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | The WWT/Glean healthcare case study (3,000+ outpatient centers, customer anonymized) can be identified by name through outreach, even though the published page doesn't name the organization | 1. Open [wwt.com/case-study/streamlining-healthcare-operations-with-glean-and-wwt](https://www.wwt.com/case-study/streamlining-healthcare-operations-with-glean-and-wwt) directly (it may show a browser/bot-check interstitial on first load - retry or wait a moment).<br>2. If it loads, check for any identifying detail (specialty, region, headcount) not captured in the research doc.<br>3. Separately, ask your WWT or Glean contact directly whether they can name this customer or connect you with them as a reference. | Either the page loads with additional identifying detail, or the vendor/partner contact confirms (or declines to confirm) the customer's identity - either way, this is resolved rather than left as an open question. | | Mark `Blocked` if the page never loads and no contact responds - that's still a valid, informative outcome for this field | ~15 min active + wait time, Medium |
| 6 | Glean's healthcare industry page has not quietly added named customers or case study links since the research pass (it currently has none - HIPAA compliance claim only) | 1. Open [glean.com/industries/healthcare](https://www.glean.com/industries/healthcare).<br>2. Check whether any named customer, case study link, or SOC 2 mention has been added since 2026-09-14. | The page still has no named customers/case studies (confirming the gap persists), or you note exactly what was added. | | | ~5 min, Easy |

## Section 4 - The step web research cannot substitute for: asking the vendor directly - Sr No 8-9

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 8 | No public page names which reference customers are willing to speak with prospects - this can only be resolved by directly asking the Glean AE, and the AE should be able to name at least one, ideally in healthcare or a regulated/health-insurance-adjacent segment | 1. Email or call this deal's Glean AE and ask directly: "Can you connect us with a reference customer, ideally in healthcare or a regulated/government segment, who is willing to take a call with us?"<br>2. Record whether the AE provides a name, whether that name matches one of the public case studies above (Covered California, or another), and how long the AE took to respond. | The AE names at least one willing reference customer and, ideally, sets up or offers to set up a call - closing the field's one genuine, vendor-conversation-only gap. | | This is the single most important row in this guide - it's the only way to close the SOW's "willing to speak with prospects" sub-question | ~15 min to send + up to several business days for AE response, Hard |
| 9 | If a reference call happens (Sr No 8), the reference customer's own account of deployment maturity (active/satisfied vs. minimal/legacy usage) can be directly compared against what's published in their own case study, if they have one | 1. During or after the reference call, ask the customer directly: how long have you been live, how broad is adoption today, would you say usage is active and growing or has it plateaued/shrunk?<br>2. Compare their live answer against the case study's published figures (if they are also one of the named case studies above). | You get a direct, first-person account of current deployment health, not just a point-in-time marketing case study - and can note whether it still matches the published figures or has changed (up or down). | | Skip/mark `Blocked (no reference call obtained)` if Sr No 8 did not produce a live reference | ~20-30 min call, Hard |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Validated Customer References.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Validated%20Customer%20References.md), and specifically add whatever the AE provides in Sr No 8 - that closes the field's most explicitly-requested, vendor-conversation-only gap.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Case-study tiering currency check | 1 | | | | |
| 2. Quantified case study spot-checks | 4 | | | | |
| 3. Anonymized healthcare reference + healthcare page | 2 | | | | |
| 4. Direct vendor/reference-call outreach | 2 | | | | |
