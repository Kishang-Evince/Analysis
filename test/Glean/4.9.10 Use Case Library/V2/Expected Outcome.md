# 4.9.10 Expected Outcome - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Expected Outcome.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Expected%20Outcome.md). The key practical finding is that GCE log export delivers one unified, unfiltered stream - any per-use-case measurement (like UC-06's ticket deflection) needs a downstream filtering layer built by Stratos/the client, not a native Glean report. This guide's job is to confirm the Voting feedback chart, test the GCE export limitation directly, and formally attach the Confluent case study to UC-07. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Glean Admin Console → Insights → Assistant Insights (Voting feedback) · Admin Console → GCE log export settings
**Companion research doc:** [V2/Expected Outcome.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Expected%20Outcome.md)
**Base field doc (untouched, original):** [../Expected Outcome.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/Expected%20Outcome.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** Admin/Insights Moderator access.

**Sr No mapping:** Sr No 1-5 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Expected Outcome.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Expected%20Outcome.md#claims-sr-no-1-5-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 - Confirming the Voting feedback chart and GCE export limitation - Sr No 1-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The GCE data-dictionary-examples page loads fine in a real browser | Open the page directly in your browser. | The page loads normally, confirming the empty automated-fetch result was a rendering artifact. | | | ~5 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 2 | The Voting feedback chart and its three sub-metrics are real and visible in Insights | Open Admin Console → Insights → Assistant Insights and confirm the Voting feedback chart and its metrics. | Confirmed. | | | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 3 | GCE export delivers one unified, unfiltered stream | Check your GCE export configuration and confirm there's no event-type/connector/user filter available at the export step itself. | Confirmed, and plan a downstream filtering approach accordingly. | | This directly tests research's most practical finding | ~20 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 2 - Attaching the Confluent evidence and the Agent Lifecycle framework - Sr No 4-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | The Confluent case study is correctly attached to UC-07's Expected Outcome write-up | Confirm the Confluent figures are cited in the UC-07 row, distinct from the generic Vendor-Stated targets used elsewhere. | Confirmed. | | | ~5 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 5 | The Agent Development Lifecycle's "Monitor and Improve" stage is a real, usable reference for UC-05's outcome tracking | Read Glean's own agent-lifecycle documentation and confirm this stage's guidance is applicable to UC-05's measurement plan. | Confirmed. | | | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Voting chart + GCE export limitation | 3 | | | | |
| 2. Confluent evidence + Agent Lifecycle reference | 2 | | | | |
