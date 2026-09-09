# 4.9.10 Implementation Complexity — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Implementation Complexity.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Implementation%20Complexity.md). The key finding is a potential complexity-reducing mitigation for UC-05/07: Glean's "Agent Identity" feature lets scheduled agents run independent of any individual user's OAuth session. This guide's job is to test that directly and log real configuration hours. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Glean Admin Console → Agent Builder / Agent Identity settings
**Companion research doc:** [V2/Implementation Complexity.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Implementation%20Complexity.md)
**Base field doc (untouched, original):** [../Implementation Complexity.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/Implementation%20Complexity.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** Admin access to Agent Builder.

**Sr No mapping:** Sr No 1-4 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Implementation Complexity.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Implementation%20Complexity.md#claims-sr-no-1-4-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 — Testing Agent Identity and logging real hours — Sr No 1-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Agent Identity lets a scheduled agent survive the configuring user's OAuth token expiring/changing | 1. Confirm the Agent Identity option exists in your Admin Console for scheduled agents.<br>2. Set up a test scheduled agent using Agent Identity instead of a personal OAuth token.<br>3. If possible, simulate the configuring user's credential change and confirm the agent keeps running. | You confirm this mitigation works as described, directly reducing UC-05/07's OAuth-fragility complexity. | | This is the field's most valuable test | ~30 min, Hard |
| 2 | No vendor-published setup-hour figures exist — log your own real hours instead | Log actual admin/engineering hours spent configuring each use case during pilot setup. | You get real, tenant-specific hour figures to replace the estimate ranges. | | | Ongoing during pilot |
| 3 | Notion ACL / OAuth complexity drivers are accurately characterized | Cross-check against the 4.9.5 and 4.9.1 fields' own test results. | Confirmed. | | | ~10 min, Easy |
| 4 | UC-08 may not be achievable at all under strict per-user Notion ACL compliance requirements without Live Mode | If Perimeter Healthcare's compliance requirement is strict, confirm this constraint directly with your compliance/legal team before committing to UC-08 in its standard form. | A clear, documented decision on whether UC-08 proceeds via Live Mode, standard indexing with governance mitigation, or is deferred. | | | ~30 min discussion, Easy |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Agent Identity test + real hours logged | 4 | | | | |
