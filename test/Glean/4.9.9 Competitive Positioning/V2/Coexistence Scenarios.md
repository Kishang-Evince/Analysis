# 4.9.9 Coexistence Scenarios — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Coexistence Scenarios.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Coexistence%20Scenarios.md). The core findings there are that Glean's MCP servers (the mechanism underpinning "technical coexistence" with dev tools) are confirmed to be in public beta, not GA, and that describing connectors as "read-only" understates the real Create/Update writeback capability this project already confirmed elsewhere. This guide's job is to make sure any client-facing architecture diagram reflects both corrections. Written so someone with no prior context on this project can pick it up and run it — mostly document review plus one architecture-diagram exercise.

**Tenant entry:** `glean.com/blog/mcp-servers-septdrop-2025` · `glean.com/blog/ai-in-life-sciences` · any Stratos client architecture diagram templates
**Companion research doc:** [V2/Coexistence Scenarios.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Coexistence%20Scenarios.md)
**Base field doc (untouched, original):** [../Coexistence Scenarios.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/Coexistence%20Scenarios.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** None special.

**Sr No mapping:** Sr No 1-6 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Coexistence Scenarios.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Coexistence%20Scenarios.md#claims-sr-no-1-6-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (a quick page check) — this field's checks are all straightforward web verification and document updates.

---

## Section 1 — Confirming positioning language and MCP's real status — Sr No 1-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The "system of context" quote appears exactly as described | Confirm the quote and its section heading on the life-sciences blog. | You independently confirm it. | | | ~5 min, Easy |
| 2 | MCP servers are still in public beta — check if this has changed since research was done | Open `glean.com/blog/mcp-servers-septdrop-2025` (or a more current MCP status page if one exists) and confirm current status. | You confirm beta status, or discover it has since gone GA (which would itself be a useful update). | | | ~10 min, Easy |
| 3 | MCP's named integration points (Claude Desktop, ChatGPT, Cursor) match research | Confirm the specific tools named. | You independently confirm them. | | | ~5 min, Easy |

## Section 2 — Confirming the integration-path and writeback corrections — Sr No 4-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | GitHub/Confluence integration routes through the Atlassian MCP server, not a direct connection | Confirm this specific architecture detail on the MCP blog post. | You independently confirm it, and update any client diagram to show the intermediate component. | | | ~10 min, Easy |
| 5 | Agent Toolkit and LangChain are real, named alternatives to MCP | Confirm this language on the MCP blog post. | You independently confirm the alternatives exist. | | | ~5 min, Easy |
| 6 | Connectors support real Create/Update writeback (no Delete), not flat "read-only" — update any coexistence diagram to reflect this accurately | Cross-check this project's 4.9.4 API Depth & Writeback field's findings and confirm any Stratos architecture diagram describes connector writeback accurately (Create/Update capability, no Delete), not as "read-only." | Your client-facing materials accurately represent this capability. | | | ~15 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Coexistence Scenarios.md](../../../../Glean/Combined/4.9.9%20Competitive%20Positioning/V2/Coexistence%20Scenarios.md), and specifically record whether MCP's status has changed (Sr No 2) and whether Stratos's diagrams have been corrected (Sr No 4, 6).

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Positioning + MCP status confirmed | 3 | | | | |
| 2. Integration-path + writeback corrections applied | 3 | | | | |
