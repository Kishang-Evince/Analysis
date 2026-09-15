# 4.9.1 UI/UX Quality — Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/UI-UX Quality.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/UI-UX%20Quality.md), plus the live cognitive walkthrough this field's own evaluation methodology actually requires.

**Tenant entry:** `https://app.glean.com` (Search, Assistant, Agent Builder)
**Companion research doc:** [V2/UI-UX Quality.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/UI-UX%20Quality.md)
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.
**Out of scope:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery, GitHub, etc.

**Prerequisites:**
- Complete [Pre-Flight](../Pre-Flight.md): the standard test content pack (`Stratos_Connector_Test_Doc` in Google Drive, `Stratos_Connector_Test_Sheet`, `Exhibit_A_SOW_Stratos.pdf`, a Notion page shared with the Glean integration, a Gmail message, an Outlook message, a Teams channel message — all referencing the same project name) must exist before starting.
- One volunteer colleague who is **not technical and has not seen Glean before**, for Sr No 5 — this is the row that actually matters most for this field.
- Trust Center access (or a contact who has it) to request the Accessibility Conformance Report.

**Sr No mapping:** Sr No 1-8 map 1:1 to the research doc's claims table (6-8 added 2026-09-14, closing a gap in `/assistant/glean-chat/` sub-feature coverage).
**How to record a result:** `Pass`/`Fail`/`Partial`/`Blocked` in Result, plus one line in Notes on exactly what you observed.
**Effort column:** minutes + `Easy`/`Hard` difficulty tag.

---

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | A first-party Accessibility Conformance Report (ACR) exists | 1. Go to `trust.glean.com/resources` (or ask your Glean account team for the link if it requires login).<br>2. Locate the accessibility/ACR resource and submit a request for a copy.<br>3. Confirm what format it comes back in. | You receive a document in VPAT 2.5 format covering WCAG 2.0/2.1/2.2. | | | ~15 min active + wait for reply, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 2 | The ACR is gated behind a request, not openly published | 1. Before requesting anything, try to find the ACR yourself via a plain web search for `glean.com accessibility conformance report` and by browsing `glean.com` directly (no login).<br>2. Note whether you can download it without asking anyone. | You cannot find a directly downloadable copy — it's confirmed request-only via Trust Center. | | | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 3 | Core screens are keyboard- and screen-reader-navigable | 1. Turn on your OS's built-in screen reader (e.g. VoiceOver on Mac, Narrator on Windows).<br>2. Without touching the mouse, use Tab/Shift+Tab and Enter only to: search for `Stratos_Connector_Test_Doc`, open Assistant and ask it to summarize that document, then open Agent Builder and start creating a new agent.<br>3. Note at each step whether the screen reader announces what's focused and whether you could complete the action with keyboard alone. | You can complete all three actions (search, ask Assistant, start building an agent) using only the keyboard, and the screen reader announces meaningful labels at each step (not silence or generic "button" announcements). | | | ~25 min, Hard (needs OS screen-reader familiarity) [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 4 | No independent usability score (SUS, task-completion benchmark) exists for Glean | 1. Search the web for `Glean SUS score` or `Glean usability study` from an independent (non-Glean, non-reseller) source.<br>2. Note whether any such benchmark exists. | No independent usability score found — accessibility conformance (Sr No 1-3) is the only formal UX-adjacent evidence available. | | | ~10 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 5 | Live cognitive walkthrough — the field's actual required deliverable | 1. Sit your non-technical volunteer down at Glean with no instructions beyond "find things and ask questions."<br>2. Task A: ask them to find `Stratos_Connector_Test_Doc` using Search.<br>3. Task B: ask them to use Assistant to summarize that document and the Notion project page together in one answer.<br>4. Task C: ask them to use Assistant to draft a short status email (they don't need to send it) referencing the Teams message and the Google Sheet.<br>5. Time each task, note where they hesitate or ask for help, and afterward ask them to rate layout, response speed, and overall friction from 1 (poor) to 5 (excellent). | You produce three completed tasks, a timing note for each, and a real 1-5 rating with specific observations — this is what the field's evaluation methodology actually asks for. | | This is the most important row in the whole file — everything else is supporting context for it | ~45 min, Hard (needs a volunteer tester + uninterrupted time) [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 6 | Browser notifications require Glean + browser + OS all enabled | 1. In Glean, enable **Preferences → Notifications**.<br>2. Allow the browser's own permission prompt when it appears.<br>3. Confirm OS-level notification permission for that browser is on, and Do Not Disturb is off.<br>4. Switch to a different tab, ask Glean a question that takes a few seconds, and confirm a notification appears with a working click-through back to the thread. | A notification appears only while the tab is inactive, across at least one of Fast/Thinking mode, and clicking it returns you to the right thread. | | Test with Do Not Disturb both off and on to confirm the documented block | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 7 | Chats can be renamed (80-char cap) and messages queued mid-response | 1. Rename any existing chat via its options menu; confirm the new title persists after a page refresh.<br>2. Start a query likely to take a while (e.g. a Thinking-mode multi-source question), then immediately send a second message.<br>3. Confirm the second message appears in a queue above the composer, not interrupting the first.<br>4. Before it runs, test Edit, then Delete on a fresh queued message, then Send now on another. | Rename persists across refresh; queued messages run in order automatically; Edit/Delete/Send now all work as documented before a queued item's turn arrives. | | | ~20 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 8 | Past chats are searchable, filterable, and the org/user chat-history settings behave as documented | 1. Confirm with your admin whether **Chat history** is enabled org-wide.<br>2. Press Cmd+K / Ctrl+K, search a keyword from an old chat's title or body, and confirm it surfaces with a snippet.<br>3. Use the filter icon to narrow by type (e.g. Documents only).<br>4. Go to **Settings → Preferences → Privacy** and confirm you can toggle chat history off for your own account even while it's on org-wide, and that **Delete** actually clears your history. | Search and filtering work as described; the per-user toggle overrides the org default for your own account; delete is real and confirmed. | | | ~20 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

---

## Result Rollup

| Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|
| 8 | | | | |

Copy results back into [V2/UI-UX Quality.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/UI-UX%20Quality.md).
