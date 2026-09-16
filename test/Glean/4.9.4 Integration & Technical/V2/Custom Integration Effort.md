# 4.9.4 Custom Integration Effort - Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/Custom Integration Effort.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Custom%20Integration%20Effort.md). The core finding there is that Glean offers real SDKs (4 languages) and a concrete custom-datasource quickstart, but the SDKs are auto-generated/beta and API support issues fall under a "Normal" (not expedited) priority tier with no published time-to-build estimate anywhere. This guide's job is to have a developer actually attempt a minimal custom integration and time it, and to probe the support/community channels directly. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Admin Console → Platform → API/Indexing tokens; `developers.glean.com` for SDK docs; `support.glean.com` for ticketing; `community.glean.com` for the public forum.
**Companion research doc:** [V2/Custom Integration Effort.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Custom%20Integration%20Effort.md)
**Related section fields (do not re-test here):** [../Native Connectors.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Native%20Connectors.md) (native connector setup time) · [../API Depth & Writeback.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/API%20Depth%20&%20Writeback.md) · [../API Architecture Type.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/API%20Architecture%20Type.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- A developer (or someone comfortable running Python/Node) with sandbox access to a Glean Indexing API token.
- Admin access to generate an Indexing API token in the Glean Admin Console.
- Access to `support.glean.com` (to check ticket portal login) and `community.glean.com` (to check forum access).
- A stopwatch or timer for the timed build in Sr No 3.

**Sr No mapping:** Sr No 1-9 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Custom Integration Effort.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Custom%20Integration%20Effort.md#claims-sr-no-1-9-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally saw it happen - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine doc/portal check), `Medium` (some setup required), or `Hard` (needs a real timed build or a live support ticket) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming SDK availability and maturity - Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Official SDKs exist and actually install cleanly for at least one language (e.g. Python or TypeScript) | 1. Run `pip install glean-api-client` (or `npm install @gleanwork/api-client`) in a clean virtual environment.<br>2. Confirm it installs without error and check the installed version number.<br>3. Skim the package's own quickstart/README for a working code sample. | The SDK installs cleanly, a version number is visible, and the quickstart sample is runnable (syntactically, even without a live token). | | | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-15, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 2 | The SDK is genuinely auto-generated and beta-flagged, not a mature hand-maintained client - confirm this is still accurate and note the current version number | 1. Open the installed package's README/CHANGELOG (or the GitHub repo directly).<br>2. Look for the "generated programmatically" and "beta" language quoted in the research doc.<br>3. Note the current version number and whether it's pre-1.0. | You confirm the beta/auto-generated language is still present, and record the current version number for future reference. | | | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-15, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 2 - The core test: how long does a real minimal custom integration actually take? - Sr No 3-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | No effort/time estimate is published for building a custom datasource - measure a real one yourself | 1. Generate an Indexing API token in a sandbox/test Glean instance.<br>2. Start your timer, then follow the published quickstart to run the `/adddatasource` (or SDK equivalent `client.indexing.datasources.add(...)`) call from the research doc.<br>3. Stop your timer once the datasource is created and visible in Admin Console.<br>4. Note anything that slowed you down (token provisioning, unclear field definitions, auth errors). | You get a real, concrete time-to-first-datasource number (e.g. "took 35 minutes including token setup") - filling the gap the research doc flagged as unpublished. | | This directly closes Sr No 9's absence-check too - record the same number there | ~30-60 min, Hard [OPTIONAL - deprioritized 2026-09-15, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 4 | The documented per-endpoint rate limits (e.g. `/indexdocuments` at 600 docs/minute) are accurate in practice | 1. After the datasource from Sr No 3 exists, attempt to push a small batch of test documents via `indexdocuments`/`bulk-index-documents`.<br>2. If possible, push enough volume to approach the documented 600 docs/minute ceiling and confirm whether a 429 is returned at roughly that point.<br>3. If a 429 occurs, confirm the retry-with-backoff guidance actually resolves it. | The rate limit behaves roughly as documented (429 near the stated ceiling, resolved by backoff/retry), or you note a clear discrepancy if not. | | Safe to do with a very small batch - full-scale testing not required to get a Pass | ~20 min, Medium [OPTIONAL - deprioritized 2026-09-15, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 3 - Confirming developer support and community channels - Sr No 5-7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Developer support is ticket-portal-based (support.glean.com) plus a separate public community forum (community.glean.com), with no dedicated Slack/Discord | 1. Visit `support.glean.com` and confirm it's a ticket-submission portal (not chat).<br>2. Visit `community.glean.com` and confirm it's a web forum requiring sign-in, and look for any mention of a Slack/Discord channel.<br>3. Note what topics/categories are visible without needing to actually post. | Both channels match the documented description - ticket portal for support, web forum for community - and no Slack/Discord developer channel is found. | | | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-15, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 6 | A real support ticket for an API/integration issue gets classified and responded to per the "Normal" priority SLA (1 business week Standard / 1 business day Premium), not treated as Urgent | 1. If your organization has an active Glean support contract, file (or ask your Glean admin to file) a real, low-stakes API-related support ticket.<br>2. Note what priority the ticket is assigned by default or by the submitter.<br>3. Time the actual initial response and compare it to the documented SLA for your organization's support tier (Standard or Premium). | The ticket is classified in line with the "general interface issues, such as user interface or API" Normal-priority language, and the actual response time is roughly consistent with your tier's documented SLA. | | Mark `Blocked (no active support contract / declined to file a test ticket)` if this can't be done safely - the SLA PDF language itself can still be independently re-read even if a real ticket isn't filed | ~15 min active + up to 1 week waiting, Hard [OPTIONAL - deprioritized 2026-09-15, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 7 | The developer-docs MCP server (`developers.glean.com/mcp`) genuinely works with a real MCP-compatible AI coding tool (e.g. Claude Code, Cursor) | 1. Add `https://developers.glean.com/mcp` as an MCP server in a supported tool (Claude Code, Cursor, VS Code, etc.).<br>2. Ask the tool a real question about a Glean API detail (e.g. "what fields does adddatasource require?") and confirm it pulls from the live MCP server rather than guessing.<br>3. Note whether the answer matches the actual documentation. | The MCP server connects successfully and the AI tool's answer is grounded in real, current Glean docs content. | | | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-15, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 4 - GitHub activity and absence-check confirmation - Sr No 8-9

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 8 | The official SDK repos on github.com/gleanwork are still actively maintained, and star counts/activity roughly match what's reported in the research doc | 1. Visit github.com/gleanwork and open each of the four official SDK repos.<br>2. Check the "last updated" date and current star count for each.<br>3. Compare to the research doc's figures (5-20 stars, updated 2026-09-14) and note any material drift. | Repos are still actively updated (recent commits), and star counts are roughly in the same range (allowing for natural growth since the research date). | | | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-15, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 9 | No time-to-build benchmark exists anywhere - use the real number from Sr No 3 to close this gap | 1. Re-confirm no public Glean page states a time-to-build figure (quick re-search).<br>2. Record the real number measured in Sr No 3 as this project's own first data point. | You confirm the public absence still holds, and the Sr No 3 number is recorded as a project-specific benchmark for future evaluations. | | Same underlying test as Sr No 3 - just confirming the absence-check and cross-referencing the number | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-15, see scrap/GLEAN_RESEARCH_MEMORY.md] |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Custom Integration Effort.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Custom%20Integration%20Effort.md), and specifically add the real time-to-build number from Sr No 3 - that closes the field's most explicitly-requested gap.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. SDK availability and maturity | 2 | | | | |
| 2. Real timed custom-integration build + rate limits | 2 | | | | |
| 3. Developer support and community channels | 3 | | | | |
| 4. GitHub activity + absence-check confirmation | 2 | | | | |
