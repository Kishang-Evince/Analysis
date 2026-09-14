# 4.9.3 Context Window & Memory - Independent Research Test Guide

**Purpose:** Hands-on tenant verification of every claim in the companion research doc [V2/Context Window & Memory.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Context%20Window%20&%20Memory.md). Two real gaps were flagged there: silent truncation with no stated user warning, and an undisclosed exact token cap per chat turn. This guide's job is to observe both directly. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Agent Builder (for memory-mode tests) · Glean Chat/Assistant (for context-overflow tests)
**Companion research doc:** [V2/Context Window & Memory.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Context%20Window%20&%20Memory.md)
**Base field doc (untouched, original):** [../Context Window & Memory.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/Context%20Window%20&%20Memory.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Agent Builder access, with a multi-step agent available (or willingness to build a simple 3-step one) for the memory-mode tests.
- A very large test document (or several large documents combined) - large enough to plausibly approach a model's context limit when summarized in one request. A few hundred pages of text, or several long PDFs combined, is a good starting point.
- Two hours of elapsed real time available at some point, to test the 2-hour memory ceiling properly (this can be started and left running in the background while you do other rows).

**Sr No mapping:** Sr No 1-9 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Context Window & Memory.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Context%20Window%20&%20Memory.md#claims-sr-no-1-9-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally saw it happen - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine UI clicking, quick to judge) or `Hard` (needs waiting, large test data, or subjective judgment) - so you can plan which rows to tackle first.

---

## Section 1 - Do the three memory modes actually behave differently? - Sr No 1

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | A step set to "No prior step outputs" genuinely cannot see earlier steps' results, while "All previous steps" genuinely can | 1. Build a 3-step agent where Step 1 produces a distinctive piece of text (e.g. "the secret code is BANANA42").<br>2. Set Step 3's memory mode to **"No prior step outputs"** and ask it to repeat the secret code - confirm it cannot.<br>3. Change Step 3's memory mode to **"All previous steps"**, re-run, and confirm it now can correctly repeat the code. | Step 3 fails to know the code under "No prior step outputs" and succeeds under "All previous steps" - proving the modes are real, not cosmetic labels. | | | ~15 min, Easy |

## Section 2 - Does the 2-hour memory ceiling really hold, even with history off? - Sr No 2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | With conversation history turned off, a follow-up tool can still recall something from up to 2 hours ago, but not from well beyond that | 1. Turn off conversation history for a chat/agent session (if this setting is available in your tenant).<br>2. Say something memorable early in the session (e.g. "remember this number: 7391").<br>3. Wait roughly 1 hour, then ask a follow-up that would need that number - confirm it's still recalled.<br>4. Wait past the 2-hour mark from the original message, then ask again - confirm it is no longer recalled. | The number is recalled within the 2-hour window and not recalled after it - confirming the hard ceiling. | | Start this row early and do other rows while waiting | ~2.5 hrs elapsed (mostly waiting), Hard |

## Section 3 - Does the `[[ ]]` manual reference syntax actually let you skip ahead/back? - Sr No 3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | You can use `[[ ]]` to pull a specific earlier step's output into a later step, even when normal sequential memory wouldn't carry it there | 1. Build a 3+ step agent where Step 3 is set to **"No prior step outputs"** (so it normally can't see anything earlier).<br>2. In Step 3's instructions, use the `[[ ]]` syntax to explicitly reference Step 1's output by name.<br>3. Run the agent and confirm Step 3 successfully accesses Step 1's output despite its memory mode. | Step 3 successfully retrieves Step 1's specific output via `[[ ]]`, proving the manual override works even against the default memory scoping. | | | ~15 min, Easy |

## Section 4 - Is a sub-agent's memory really walled off from its parent? - Sr No 4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | A sub-agent's internal working memory (its own intermediate steps) never reaches the parent agent - only its final output does | 1. Build an agent that calls a sub-agent with 2+ internal steps of its own.<br>2. Have the sub-agent produce an intermediate value in Step 1 that is *not* part of its final output.<br>3. In the parent agent, after the sub-agent call, try to reference that intermediate value.<br>4. Confirm the parent cannot access it - only the sub-agent's actual final output is visible. | The parent agent has no access to the sub-agent's intermediate step data, only its returned final output. | | | ~20 min, Easy |

## Section 5 - Does context overflow actually happen silently, with no warning? - Sr No 5-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | When a request's content is large enough to approach the model's token limit, Glean reads only part of the document(s) - and does so without a clearly visible warning to the user | 1. Feed your large test document(s) into a summarization request (Chat or an agent step) - large enough to plausibly exceed a typical context window.<br>2. Compare the summary's coverage against the full document - check whether content from the later parts of the document is missing or under-represented.<br>3. Look carefully at the UI/response for any visible truncation notice, warning icon, or disclaimer. | The summary shows evidence of partial coverage (later content missing/thin), and you find no clear, visible warning telling you truncation occurred. | | This is the field's most important gap-closing test - document exactly what you saw, including screenshots if possible | ~30 min, Hard (needs a genuinely large test document and careful before/after comparison) |
| 6 | The exact numeric token limit for a single chat turn is not shown anywhere in the product - you can only find it by hitting it | 1. Search the Admin Console and any chat/agent settings screens for a numeric token limit displayed anywhere.<br>2. If none is found, try sending progressively larger single messages until one is rejected or clearly truncated, to at least estimate where the real limit sits for your tenant/model. | You find no published number in the UI, and optionally arrive at your own estimated real-world limit through direct testing. | | | ~20 min, Easy (search) + optional ~30 min, Hard (binary-search testing for the real limit) |

## Section 6 - Does context window size really vary by model, in both directions? - Sr No 7-8

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | If your tenant has GPT-4.1 enabled via the Glean (Universal) Key, large-document requests automatically get the full 1-million-token window instead of being capped at 128K | 1. Confirm your tenant uses the Glean Universal Key (not Customer Key) and has GPT-4.1 available.<br>2. Send a request large enough to exceed 128K tokens but under 1 million, using GPT-4.1.<br>3. Confirm it succeeds rather than erroring/truncating at the 128K mark. | The large request succeeds, consistent with the documented automatic 1M-token expansion for this model on the Universal Key. | | If your tenant uses Customer Key instead, mark `Blocked (Customer Key tenant - scope of this claim unconfirmed for this setup)` | ~20 min, Hard (needs a large enough test payload) |
| 8 | For Claude Sonnet 4.5/4, requests over 200,000 tokens now fail, following the retirement of its 1M-token beta on April 30, 2026 | 1. Check today's date against April 30, 2026.<br>2. If your tenant uses Claude Sonnet 4.5 or 4, send a request exceeding 200,000 tokens through it. | If today is after April 30, 2026, the over-200K request fails/errors as documented. If your tenant doesn't use this model, mark `Blocked (model not in use)`. | | | ~20 min, Hard (needs a large enough test payload) |

## Section 7 - Does the new persistent Memory & Personalization layer actually work as documented? - Sr No 10-14

*Added 2026-09-14 after a full-corpus sweep of this project's local Glean documentation crawl surfaced memory-personalization.md, a page no field's original research ever cited. This is a genuinely separate system from the agent-step memory tested in Sections 1-6 above — test it as its own feature, not a variant of the 2-hour ceiling.*

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 10 | Glean Assistant remembers a stated fact/preference across separate chat sessions (not just within one 2-hour window) | 1. In one chat session, tell Glean an explicit preference (e.g. "I prefer concise answers with no headers").<br>2. Start a completely new chat session on a different day (or at least after closing/reopening the app).<br>3. Ask a question and observe whether the stated preference is applied without repeating it. | The new session reflects the earlier stated preference without being re-told, proving persistence beyond a single session/2-hour window. | | If your tenant is not on GCP + Universal Key, this may be `Blocked (Memory not available on this deployment)` — check Sr No 13 first. | ~15 min, Easy |
| 11 | Both "saved" (explicit) and "extracted" (automatic) memories appear somewhere in a user-visible Memory settings screen, organized into distinct categories | 1. Explicitly tell Glean to remember something ("remember that I lead the EHR migration project").<br>2. Have a few normal work-related chat conversations.<br>3. Go to Settings → Memory (or equivalent) and check whether both the explicit fact and any auto-extracted insights appear, and whether they're grouped into categories. | Both memory types are visible in a settings UI, with the explicit fact clearly present and at least some auto-extracted content categorized (e.g. active projects, work style). | | | ~20 min, Easy |
| 12 | Memory never surfaces content from documents the user cannot otherwise access, and an admin cannot view another user's individual memories | 1. As a regular user, check whether anything in your Memory settings references document content you know you don't have access to (should be none — memory is facts/preferences only).<br>2. As an admin, attempt to locate a setting or report that shows an individual user's specific memory contents. | No document-content leakage observed in Memory; admin console has no way to view another named user's individual memory entries. | | Important governance test given healthcare/PHI context | ~20 min, Medium |
| 13 | Memory is either present and on-by-default (if this tenant is GCP + Universal Key), or absent entirely (if Customer Key / non-GCP) — with no org-level admin toggle to disable it if present | 1. Determine this tenant's deployment type (GCP + Universal Key, or Customer Key/BYOK).<br>2. If GCP + Universal Key: confirm Memory is on by default for a new user, and search Admin Console for any org-wide toggle to disable it (expect none found).<br>3. If Customer Key/non-GCP: confirm Memory is simply unavailable in the product. | Result matches the documented deployment-gated availability, with no org-level disable control found on supported deployments. | | | ~15 min, Easy |
| 14 | A third-party MCP-connected tool (e.g. Claude Desktop, Cursor, ChatGPT via Glean's MCP server) can read or write this tenant's Glean memories | 1. Connect a supported MCP client (Cursor, Claude Desktop, or similar) to this tenant's Glean MCP server, per this project's existing MCP setup notes.<br>2. From that MCP client, attempt to read or add to Glean memory for the connected user. | The MCP client can successfully read/add memory entries, confirming the cross-tool memory bridge works as documented. | | Skip if MCP is not yet connected for this tenant; mark `Blocked (MCP not connected)` | ~20 min, Medium (needs MCP already set up) |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Context Window & Memory.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Context%20Window%20&%20Memory.md). Sr No 5's before/after document-coverage comparison is the single most valuable piece of evidence this guide can produce.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Memory modes behave differently | 1 | | | | |
| 2. 2-hour ceiling holds | 1 | | | | |
| 3. Manual `[[ ]]` override works | 1 | | | | |
| 4. Sub-agent memory isolation | 1 | | | | |
| 5. Silent truncation + undisclosed token cap | 2 | | | | |
| 6. Context window varies by model, both directions | 2 | | | | |
| 7. Memory & Personalization (NEW, 2026-09-14) | 5 | | | | |
