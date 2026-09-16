# 4.9.2 Trigger Types Supported - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Trigger Types Supported.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Trigger%20Types%20Supported.md). The key finding is that scheduled triggers are off by default tenant-wide and need an explicit admin enable - confirm this before any pilot depends on them. Also test the truncation-with-download-link mitigation. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Admin Console → Platform → Agents → Scheduled triggers · Agent Builder trigger picker
**Companion research doc:** [V2/Trigger Types Supported.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Trigger%20Types%20Supported.md)
**Base field doc (untouched, original):** [../Trigger Types Supported.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/Trigger%20Types%20Supported.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** Admin access; content-trigger admin gate; a large test file for the truncation test.

**Sr No mapping:** Sr No 1-5 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Trigger Types Supported.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Trigger%20Types%20Supported.md#claims-sr-no-1-5-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 - Confirming the scheduled-trigger admin default - Sr No 1

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Scheduled triggers are off by default and need an explicit admin enable | Check Admin Console → Platform → Agents → Scheduled triggers and confirm the current on/off state for your tenant, and whether it needed to be turned on. | You confirm the actual current state and, if off, turn it on before any scheduled-trigger pilot test. | | This is the single most important row in this guide | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 2 - Confirming timing, scope, and the truncation mitigation - Sr No 2-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | ~30-minute scheduled-run ceiling | Run a long scheduled agent and confirm it terminates around 30 minutes if not finished. | Confirmed. | | | ~30 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 3 | Scheduled-run timing varies with contention | Schedule several agents at the same time and note whether they all fire at the exact scheduled minute or with some variance. | Confirmed. | | | ~20 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 4 | The triggers concept page's scope is narrower than the full inventory | Confirm this directly by reading the page. | Confirmed. | | | ~5 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 5 | Truncated tool results include a download link | Trigger a large-Sheet/Doc retrieval that exceeds the size cap and confirm a download link appears rather than silent data loss. | Confirmed. | | | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Scheduled-trigger admin default confirmed | 1 | | | | |
| 2. Timing, scope, truncation confirmed | 4 | | | | |
