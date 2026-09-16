# 4.9.6 Adoption Friction Signals - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Adoption Friction Signals.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/V2/Adoption%20Friction%20Signals.md). The core finding there is that Glean's own docs admit default access causes poor adoption, define a real (if unbenchmarked) friction-metric framework, and that Glean's flagship case-study numbers (82% Nextdoor stickiness, 80% Zillow adoption) run well ahead of Glean's own company-wide average engagement ratio. This guide's job is to run an actual pilot and independently measure where this tenant lands. Written so someone with no prior context on this project can pick it up and run it - uses this tenant's existing stack (Google Workspace, Teams, Outlook, Notion, OneDrive) wherever the underlying capability can genuinely be tested that way.

**Tenant entry:** Glean Admin Console → Insights · Assistant chat UI · Gleaniverse Support Center · Google Sheets/Forms, Microsoft Teams, Outlook (for pilot logistics)
**Companion research doc:** [V2/Adoption Friction Signals.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/V2/Adoption%20Friction%20Signals.md)
**Base field doc (untouched, original):** [../Adoption Friction Signals.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/Adoption%20Friction%20Signals.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Insights Moderator role in the Glean Admin Console.
- A pilot cohort of 100-300 users across multiple departments, per Glean's own documented guidance.
- Ability to send a pre-access survey (Google Forms or Microsoft Forms both work) and a Week-4 follow-up survey.
- A Designated Support Contact on your team, or knowledge of who that is, for the support-ticket test (Sr No 7).

**Sr No mapping:** Sr No 1-11 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Adoption Friction Signals.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/V2/Adoption%20Friction%20Signals.md#claims-sr-no-1-11-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally measured it - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine console check) or `Hard` (needs a real multi-week pilot or written external replies) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming the access-friction claim directly, with an A/B test - Sr No 1

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Default SSO-tile/direct-URL access genuinely produces lower adoption than browser-extension/desktop-app deployment | 1. Split your pilot cohort into two groups: Cohort A gets the Glean browser extension + Teams app pushed to their devices; Cohort B gets SSO-tile/direct-URL access only.<br>2. At Week 4, export each cohort's Stickiness (WAU/MAU) from Admin Console → Insights.<br>3. Compare. | Cohort A (extension-deployed) shows meaningfully higher Stickiness than Cohort B, independently confirming the docs' own admission. | | This is the field's central, most testable claim | ~4 weeks elapsed, ~2 hrs active work, Hard |

## Section 2 - Confirming pilot structure and the survey gate - Sr No 2-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | A 100-300 user, multi-department pilot cohort is the documented right size | 1. Confirm your actual pilot cohort size and department spread against this guidance.<br>2. If your pilot is outside this range, note why (smaller org, different constraints). | You confirm your pilot matches or reasonably adapts this guidance. | | | ~10 min, Easy |
| 3 | A pre-access survey gate is real, and a Week-4 follow-up survey response-rate target should be independently confirmed (research could not re-verify the ~80% figure this pass) | 1. Send a short pre-access survey (Google Forms or Microsoft Forms) to your pilot cohort before granting Glean access; confirm 100% completion is enforced or tracked.<br>2. At Week 4, send a follow-up survey and track the actual response rate you get.<br>3. Separately, re-check the live `docs.glean.com/get-started/golive/launch-preparation` page yourself for any stated response-rate target and note what you find. | You confirm the pre-access gate works as designed, get a real Week-4 response-rate number for your own pilot, and resolve whether the ~80% target is a real documented figure or not. | | Closes research's one flagged unconfirmed sub-detail | ~4 weeks elapsed, ~1 hr active, Hard |

## Section 3 - Measuring your own Coverage/Activity/Stickiness, since no benchmark is published - Sr No 4-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | Coverage, Activity, and Stickiness are real metrics you can pull today, but Glean publishes no numeric pass/fail benchmark - you must set your own | 1. In Admin Console → Insights, pull current Coverage, Activity, and Stickiness for your org (or pilot cohort).<br>2. Record the actual numbers in a shared Google Sheet or Excel file for tracking over time.<br>3. Confirm the Insights UI itself does not show a "target" or "benchmark" line - only your own raw numbers. | You get real baseline numbers logged, and confirm no built-in benchmark exists - you're deciding what "good" means for your organization. | | | ~20 min, Easy |
| 5 | The Departments/Managers Insights view flags low-activity teams but doesn't proactively alert managers | 1. In Insights, switch to the Managers view and identify at least one team with high Coverage but low Activity or Stickiness.<br>2. Confirm this requires you to actively go look - check whether any email/Teams notification was sent to that team's manager automatically. | You confirm the view is useful for identifying friction but is pull-based, not push-based. | | | ~15 min, Easy |

## Section 4 - Testing the downvote feedback loop and support access friction firsthand - Sr No 6-7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | A downvote on an Assistant answer notifies admins but does not automatically retrain or fix future answers | 1. In Glean Assistant chat, ask a question likely to get a mediocre answer, then click downvote and (if prompted) leave a reason.<br>2. Confirm (via Settings > Help > Feedback, or with an admin) that a notification was actually routed somewhere.<br>3. Ask the same or a very similar question again a few minutes later and note whether the answer changed at all. | You confirm the downvote reaches an admin channel, and confirm the answer does not self-correct without manual admin action. | | | ~15 min, Easy |
| 7 | Support access has real friction: a separate Gleaniverse login is required, legacy support history wasn't migrated, and formal tickets are restricted to Designated Support Contacts | 1. Log into `Gleaniverse`/the Glean Support Center with a normal (non-designated) user account and confirm whether you can file a formal ticket, or only start a "conversation."<br>2. If your organization is a pre-existing Glean customer, ask your Designated Support Contact whether any prior ticket history carried over from the legacy portal.<br>3. Confirm who your organization's actual Designated Support Contact(s) are, and whether that's documented somewhere your team can find (e.g. a pinned Teams channel post or Notion page). | You confirm the ticket restriction firsthand, get a real answer on legacy-history migration, and confirm your Designated Contacts are actually known/documented internally. | | | ~20 min, Easy |

## Section 5 - Putting the flagship case-study numbers in perspective - Sr No 8-9

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 8 | Nextdoor (82% stickiness) and Zillow (80% adoption) are real published case studies, but represent top-performing outliers, not typical results | 1. Independently pull up Glean's published case studies for Nextdoor and Zillow (search `glean.com` press/customers pages) and confirm the headline numbers.<br>2. Compare against your own pilot's actual Stickiness/Activity numbers from Sr No 4. | You confirm the case-study numbers are real and public, and get a concrete sense of how your own pilot compares - without assuming you should expect to match them immediately. | | | ~20 min, Easy |
| 9 | Glean's own company-wide average engagement ratio (40% Dec 2025 → 45% May 2026, wDAU/wMAU) is a different metric from Stickiness (WAU/MAU) - don't conflate the two when reporting your own numbers | 1. Re-read Glean's own press releases (`glean.com/press/...`) citing the wDAU/wMAU figures and confirm the exact metric name used.<br>2. When you report your own pilot's Stickiness (Sr No 4), make sure your write-up doesn't accidentally compare it directly to the wDAU/wMAU figure as if they were the same ratio. | You confirm the two metrics are named and defined differently, and your own reporting keeps them distinct. | | Accuracy sanity-check, not a capability test | ~10 min, Easy |

## Section 6 - Checking for independent, non-Glean friction signals relevant to your own users - Sr No 10-11

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 10 | Response-time/consistency complaints (found in an independent G2 review) are worth checking against your own pilot users' actual experience | 1. In your Week-4 follow-up survey (Sr No 3), include a specific question about response speed and answer consistency.<br>2. Review responses for any pattern matching the independent complaint found in research. | You get real feedback confirming or contradicting this specific independent complaint, for your own tenant. | | | Included in Sr No 3's survey work, ~0 min extra, Easy |
| 11 | Your organization may want independent adoption-tracking visibility beyond what Glean's native Insights provides - worth a deliberate decision, not a default assumption | 1. After completing Sr No 4's baseline pull, discuss internally (with IT/analytics) whether native Insights is sufficient for your ongoing reporting needs, or whether a third-party analytics layer would add real value. | You reach a deliberate, documented decision either way - not by default, but because your team actually weighed it. | | Decision-support row, not a pass/fail capability test | ~15 min discussion, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Adoption Friction Signals.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/V2/Adoption%20Friction%20Signals.md), and specifically log your own pilot's real Coverage/Activity/Stickiness numbers (Sr No 4) and the A/B extension-deployment comparison (Sr No 1) - those give this field its most decisive, tenant-specific evidence.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Access-friction A/B test | 1 | | | | |
| 2. Pilot structure + survey gate | 2 | | | | |
| 3. Coverage/Activity/Stickiness baseline | 2 | | | | |
| 4. Downvote loop + support access friction | 2 | | | | |
| 5. Case-study numbers in perspective | 2 | | | | |
| 6. Independent friction signals for this tenant | 2 | | | | |
