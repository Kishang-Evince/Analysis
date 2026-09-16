# 4.9.2 Multi-Agent Orchestration - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Multi-Agent Orchestration.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Multi-Agent%20Orchestration.md). The key finding is that the 10-active-background-agents cap is a soft limit with an explicit path to request more, while the "0.5 rps" figure couldn't be reconfirmed anywhere and needs a direct question to Glean. This guide's job is to confirm the sub-agent canvas UI and get a real answer on the rate limit. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Agent Builder Workflow mode · Agent Debug traces
**Companion research doc:** [V2/Multi-Agent Orchestration.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Multi-Agent%20Orchestration.md)
**Base field doc (untouched, original):** [../Multi-Agent Orchestration.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/Multi-Agent%20Orchestration.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** Two+ published agents; sub-agent library access.

**Sr No mapping:** Sr No 1-5 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Multi-Agent Orchestration.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Multi-Agent%20Orchestration.md#claims-sr-no-1-5-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 - Confirming sub-agent behavior and its canvas presentation - Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Sub-agent output reaches parent memory | Build a Workflow with an explicit Sub-agent step, run it, and confirm the parent references the sub-agent's output. | Confirmed. | | | ~20 min, Easy |
| 2 | Confirm how this actually looks in the Workflow canvas | Inspect the canvas UI directly for the sub-agent step's visual representation and data-flow indication. | You get the real visual answer documentation didn't provide. | | | ~15 min, Easy |

## Section 2 - Confirming permission preservation and the rate-limit questions - Sr No 3-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Task-tool delegation preserves permissions, no escalation | Have a low-permission user's Auto agent delegate to a sub-agent task and confirm it cannot access content the parent user couldn't see. | Confirmed. | | | ~20 min, Easy |
| 4 | The 10-agent cap is a soft limit - confirm the escalation path is real | If relevant, ask your Glean account team what's actually involved in requesting more than 10 active background agents per user. | You get a real answer on the escalation process. | | | ~10 min active + wait for reply, Easy |
| 5 | Get a real answer on the "0.5 rps" rate limit | Ask your Glean account team directly: *"Is there a requests-per-second rate limit on agent runs, and if so, what is it exactly?"* | You get a definitive, first-party number, closing this flagged gap. | | | ~10 min active + wait for reply, Hard |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Sub-agent behavior + canvas UI | 2 | | | | |
| 2. Permission preservation + rate-limit questions | 3 | | | | |
