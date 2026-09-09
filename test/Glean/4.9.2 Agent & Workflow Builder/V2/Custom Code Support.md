# 4.9.2 Custom Code Support — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Custom Code Support.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Custom%20Code%20Support.md). The core finding is that the headless builder is prompt-driven, not code-authoring, and Auto mode's sandboxed execution scope is genuinely undocumented (not confirmed either capable or limited). This guide's job is to test the headless builder directly and probe the sandbox's real capability. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** A coding environment with the `/glean_run` command available · Agent Builder → Auto mode
**Companion research doc:** [V2/Custom Code Support.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Custom%20Code%20Support.md)
**Base field doc (untouched, original):** [../Custom Code Support.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/Custom%20Code%20Support.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** Agents API token (Beta) or headless builder access.

**Sr No mapping:** Sr No 1-4 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Custom Code Support.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Custom%20Code%20Support.md#claims-sr-no-1-4-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 — Testing the headless builder and the sandbox's real scope — Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The headless builder is prompt-driven, not code-authoring | Use `/glean_run` in a coding environment to create a test agent, and confirm the workflow is natural-language prompt input, not writing agent logic in a programming language. | Confirmed. | | | ~30 min, Easy |
| 2 | Auto mode's sandbox can (or can't) run genuinely arbitrary computation | Give an Auto-mode agent a task requiring real intermediate computation (e.g., "calculate the median of these 50 numbers from this Sheet") and observe whether it succeeds, and if possible, how. | You get a real, first-hand answer to what the documentation left vague. | | This directly tests research's flagged documentation gap | ~20 min, Easy |

## Section 2 — Reconfirming the no-code-block finding and remaining paths — Sr No 3-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | No code-block step exists in the Workflow canvas | Open Agent Builder's Workflow mode and confirm the full list of available step/action types contains no code/script option. | Confirmed. | | | ~15 min, Easy |
| 4 | Remaining customization paths (Agents API, Git ADLC, MCP) are accurate | Spot-check one (e.g., export/import an agent via API). | Confirmed. | | | ~15 min, Easy |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Headless builder + sandbox scope tested | 2 | | | | |
| 2. No-code-block + remaining paths confirmed | 2 | | | | |
