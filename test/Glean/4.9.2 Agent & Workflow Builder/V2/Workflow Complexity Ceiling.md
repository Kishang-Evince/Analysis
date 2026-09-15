# 4.9.2 Workflow Complexity Ceiling — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Workflow Complexity Ceiling.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Workflow%20Complexity%20Ceiling.md). The key finding is that setting a tool's result count to "As many as possible" can itself overload context and cause truncation — the fix for a suspected limit is batching, not requesting more. This guide's job is to run the actual stress test and confirm this counter-intuitive risk directly. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Agent Builder Workflow mode · OneDrive/Drive test content (20+ files)
**Companion research doc:** [V2/Workflow Complexity Ceiling.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Workflow%20Complexity%20Ceiling.md)
**Base field doc (untouched, original):** [../Workflow Complexity Ceiling.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/Workflow%20Complexity%20Ceiling.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** Workflow-mode agent; 20+ test files in Drive/OneDrive.

**Sr No mapping:** Sr No 1-5 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Workflow Complexity Ceiling.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Workflow%20Complexity%20Ceiling.md#claims-sr-no-1-5-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 — Testing the 500-cap and the counter-intuitive overload risk — Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Company Search caps at 500 results per step | Run a Company Search step against a broad query likely to exceed 500 hits and confirm the cap. | Confirmed. | | | ~20 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 2 | "As many as possible" can overload context and cause truncation | Set a tool's result count to the maximum/"as many as possible" setting on a broad query, and compare output quality/completeness against a batched, narrower-query approach. | You confirm the counter-intuitive risk directly. | | This is the field's most valuable test | ~30 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 2 — Confirming batching guidance and the cross-referenced limits — Sr No 3-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Batching (date-range or categorical-field) improves reliability | Build the stress test (loop over 20+ OneDrive files + branch + sub-agent summarize) once with a single broad query and once with date/status-batched queries; compare completion and failure points. | Batched version completes further or more reliably. | | This is the base test guide's own core exercise | ~1 hour, Easy |
| 4 | Scheduled-run ceiling + truncation download-link mitigation | Reuse the Trigger Types Supported field's test results if already run. | Confirmed via reuse. | | ~0 min if reused | |
| 5 | Supported logical constructs (branches, loops, sub-agents) work as documented | Reuse the Multi-Agent Orchestration field's test results if already run. | Confirmed via reuse. | | ~0 min if reused | |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. 500-cap + overload risk tested | 2 | | | | |
| 2. Batching + cross-referenced limits confirmed | 3 | | | | |
