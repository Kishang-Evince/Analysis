# 4.9.10 Implementation Complexity - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Implementation Complexity.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Implementation%20Complexity.md). The key finding is a potential complexity-reducing mitigation for UC-05/07: Glean's "Agent Identity" feature lets scheduled agents run independent of any individual user's OAuth session. This guide's job is to test that directly and log real configuration hours. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Glean Admin Console → Agent Builder / Agent Identity settings
**Companion research doc:** [V2/Implementation Complexity.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Implementation%20Complexity.md)
**Base field doc (untouched, original):** [../Implementation Complexity.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/Implementation%20Complexity.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** Admin access to Agent Builder.

**Sr No mapping:** Sr No 1-5 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Implementation Complexity.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Implementation%20Complexity.md#claims-sr-no-1-5-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here. Row 5 added 2026-09-14 - found via a full-corpus sweep of this project's local Glean documentation crawl, never cited by this field's original research pass (see scrap/GLEAN_RESEARCH_MEMORY.md).

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 - Testing Agent Identity and logging real hours - Sr No 1-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Agent Identity lets a scheduled agent survive the configuring user's OAuth token expiring/changing | 1. Confirm the Agent Identity option exists in your Admin Console for scheduled agents.<br>2. Set up a test scheduled agent using Agent Identity instead of a personal OAuth token.<br>3. If possible, simulate the configuring user's credential change and confirm the agent keeps running. | You confirm this mitigation works as described, directly reducing UC-05/07's OAuth-fragility complexity. | | This is the field's most valuable test | ~30 min, Hard |
| 2 | No vendor-published setup-hour figures exist - log your own real hours instead | Log actual admin/engineering hours spent configuring each use case during pilot setup. | You get real, tenant-specific hour figures to replace the estimate ranges. | | | Ongoing during pilot |
| 3 | Notion ACL / OAuth complexity drivers are accurately characterized | Cross-check against the 4.9.5 and 4.9.1 fields' own test results. | Confirmed. | | | ~10 min, Easy |
| 4 | UC-08 may not be achievable at all under strict per-user Notion ACL compliance requirements without Live Mode | If Perimeter Healthcare's compliance requirement is strict, confirm this constraint directly with your compliance/legal team before committing to UC-08 in its standard form. | A clear, documented decision on whether UC-08 proceeds via Live Mode, standard indexing with governance mitigation, or is deferred. | | | ~30 min discussion, Easy |

## Section 2 - Confirming the Agent Identity integration roster and per-app auth mechanisms - Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Agent Identity covers at least 19 named integrations, each with a distinct authentication mechanism (not one generic service account) - specifically confirm the Outlook and Teams mechanisms since both are in this evaluation's tenant stack | 1. Open `docs.glean.com/administration/agent-identity/overview` and confirm the full integration roster.<br>2. Open `docs.glean.com/administration/agent-identity/outlook` and `docs.glean.com/administration/agent-identity/teams` and confirm both use Microsoft Entra application identity (OAuth 2.0 client credentials), independent of any individual user.<br>3. If you have Admin Console access, confirm each configured Agent Identity credential is independently visible/revocable per app (not a single shared identity). | You confirm the roster and the Outlook/Teams mechanism, and (if applicable) that the Admin Console shows independently revocable per-app credentials. | | Only 3 of ~19 integration mechanism pages were read in depth during research (Outlook, Teams, AWS CloudWatch) - the rest of the roster is confirmed by name only and should be spot-checked if those integrations are in scope | ~20 min, Easy (doc read) + ~10 min if checking Admin Console |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Agent Identity test + real hours logged | 4 | | | | |
| 2. Agent Identity integration roster + per-app mechanisms | 1 | | | | |
