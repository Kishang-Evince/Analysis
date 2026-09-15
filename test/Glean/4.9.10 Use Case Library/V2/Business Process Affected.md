# 4.9.10 Business Process Affected — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Business Process Affected.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Business%20Process%20Affected.md). The key finding is a correction to the section Overview: MCP-based ticket triage doesn't strictly require ServiceNow/Zendesk, so it may be partially achievable on the actual tenant stack. This guide's job is to test that directly and confirm Deep Research's real constraints. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Glean Admin Console (Deep Research enablement) · MCP-compatible client (Claude Desktop/Cursor/ChatGPT)
**Companion research doc:** [V2/Business Process Affected.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Business%20Process%20Affected.md)
**Base field doc (untouched, original):** [../Business Process Affected.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/Business%20Process%20Affected.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** Admin access for Deep Research enablement check.

**Sr No mapping:** Sr No 1-6 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Business Process Affected.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Business%20Process%20Affected.md#claims-sr-no-1-6-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

**Effort column:** each row lists an estimated time and difficulty tag.

---

## Section 1 — Confirming Deep Research's real constraints — Sr No 1-3, 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Deep Research is web-app-only and admin-gated | Check Admin Console for the Deep Research enablement toggle, and confirm it's absent from Teams/desktop/mobile clients. | You confirm both constraints. | | | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 2 | Report generation takes 5-30 minutes | If enabled, run one real Deep Research query and time it. | You confirm the real timeline. | | | ~30 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 3 | Web search uses Brave exclusively | Confirm this in the docs or via a query that surfaces web citations. | You confirm. | | | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 5 | Track/Learn/Analyze patterns are real, reusable templates | Try reframing one pattern (e.g. "Track") using tenant-stack sources (Notion/Drive/Teams) instead of the documented examples. | You confirm the pattern generalizes. | | | ~20 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 2 — Testing the MCP ticket-triage correction directly — Sr No 4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | MCP-based ticket-triage-style assistance is achievable without ServiceNow/Zendesk, using tenant-stack sources instead | Via an MCP-compatible client, try a query analogous to "find similar past issues and recommended resolution" using Notion/Teams/Drive as the knowledge source instead of a ticketing system. | You get a real answer on whether this pattern works reasonably well without a dedicated ticketing connector. | | This directly tests research's key correction | ~30 min, Hard [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 3 — Reconfirming the core 8 use-case mappings — Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | The 8 baseline-to-automated mappings remain accurate | Spot-check 2-3 of the 8 mappings against your own recent sandbox experience. | You confirm no changes needed. | | | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Deep Research constraints | 4 | | | | |
| 2. MCP ticket-triage correction tested | 1 | | | | |
| 3. Core 8 mappings spot-checked | 1 | | | | |
