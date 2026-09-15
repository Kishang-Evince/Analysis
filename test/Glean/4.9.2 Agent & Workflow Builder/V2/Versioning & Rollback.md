# 4.9.2 Versioning & Rollback — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Versioning & Rollback.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Versioning%20&%20Rollback.md). The key finding precisely names the moderator-gate admin toggle ("Can share and publish agents"). The claim that permissions are excluded from version diffs needs a direct hands-on test since no source confirmed it. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Agent Builder → version history · Admin Console → Agent Moderator settings
**Companion research doc:** [V2/Versioning & Rollback.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Versioning%20&%20Rollback.md)
**Base field doc (untouched, original):** [../Versioning & Rollback.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/Versioning%20&%20Rollback.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** Agent publish permission; admin access for the moderator-toggle check.

**Sr No mapping:** Sr No 1-4 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Versioning & Rollback.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Versioning%20&%20Rollback.md#claims-sr-no-1-4-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 — Confirming version retention and the moderator toggle — Sr No 1-2, 4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | 30 published versions retained, restore-as-draft works | Publish v1, edit and publish v2, then restore v1 and confirm it becomes a new draft. | Confirmed. | | | ~20 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 2 | The "Can share and publish agents" toggle controls the moderator gate | Find this exact setting in Admin Console and confirm its effect. | Confirmed. | | | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 4 | Moderator review covers inputs/actions/triggers, not just prompt text | If your tenant has a scheduled agent pending moderator approval, check what the moderator's review screen actually shows them. | Confirmed. | | | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 2 — Testing the permissions-versioning question directly — Sr No 3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Permissions/sharing-scope changes are excluded from version diffs | Change an agent's sharing scope, then check the version-history diff view to see whether that change appears. | You get a real, direct answer research couldn't confirm from documentation alone. | | This closes research's flagged gap | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Version retention + moderator toggle | 3 | | | | |
| 2. Permissions-versioning question tested | 1 | | | | |
