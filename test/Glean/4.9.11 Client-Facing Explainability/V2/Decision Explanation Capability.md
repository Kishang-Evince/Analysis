# 4.9.11 Decision Explanation Capability - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Decision Explanation Capability.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/V2/Decision%20Explanation%20Capability.md). The core finding is that Debug mode's transparency doesn't exist at all for Azure-hosted deployments - a real, hosting-dependent limitation - and Waldo's retrieval planning is confirmed, in Glean's own words, to be entirely invisible to end users. This guide's job is to confirm the Azure limitation directly (if relevant) and re-check the Debug-mode access-role claim research couldn't confirm. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Glean Agent Builder → Preview/Debug · Assistant chat UI
**Companion research doc:** [V2/Decision Explanation Capability.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/V2/Decision%20Explanation%20Capability.md)
**Base field doc (untouched, original):** [../Decision Explanation Capability.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/Decision%20Explanation%20Capability.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** Agent Builder access; knowledge of your tenant's hosting option (GCP/AWS/Azure/SaaS-default).

**Sr No mapping:** Sr No 1-5 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Decision Explanation Capability.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/V2/Decision%20Explanation%20Capability.md#claims-sr-no-1-5-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 - Confirming Debug mode and the Azure limitation - Sr No 1-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Debug mode shows steps/spans/I-O/model metadata | In Agent Builder, open Preview → Debug on a real agent and confirm the exposed detail. | Confirmed. | | | ~15 min, Easy |
| 2 | Debug mode is unavailable on Azure-hosted deployments | If your tenant is Azure-hosted, confirm Debug trace details are genuinely missing; if not Azure-hosted, note this as N/A. | Confirmed either way. | | | ~10 min, Easy |
| 3 | Debug mode access-role restriction | Try accessing Debug mode as a non-builder/non-admin user and confirm whether it's actually restricted. | You get a real, first-party answer closing research's flagged gap. | | | ~15 min, Easy |

## Section 2 - Confirming Waldo's invisibility and citation requirements - Sr No 4-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | Waldo's retrieval planning is never shown to the end user | Ask an Assistant query that would benefit from retrieval planning (Adaptive Reasoning) and confirm no intermediate search-plan text appears - only the final answer. | Confirmed. | | | ~15 min, Easy |
| 5 | Deep-linked citations require Thinking/Advanced mode explicitly | Compare citation format in Fast mode vs. Thinking/Advanced mode for the same query. | Confirmed. | | Same test as 4.9.3's own RAG field - reuse if recently run | ~15 min, Easy |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Debug mode + Azure limitation | 3 | | | | |
| 2. Waldo invisibility + citation requirements | 2 | | | | |
