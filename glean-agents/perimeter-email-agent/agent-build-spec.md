# Agent Build Blueprint for Glean Agent Builder (Auto mode)

One Auto mode agent with one instruction document. Stage 0 recreates the current agent word for word with five stated changes (no agent name, a SETTINGS block, Step 1 day counts read from SETTINGS, "Today" means AS_OF_DATE when set, no orderby line on the Sent Items query); stages 1 to 10 each add or edit named steps in that document. The prompts to paste live in the [prompts](prompts/instruction.md) folder, one file per ticket; this file holds the setup, the stage map, the build rules and the open spikes. Tickets EMAIL-01..11 map to stages in the stage map. Everything here is a draft to verify in the tenant.

Totals unchanged: 27 enhancements, 11 tickets, 80 hours, every ticket 6 to 8 hours.

## Agent settings
- **Name:** as chosen in Agent Builder
- **Mode:** Auto mode. Behaviour lives in one instruction document; there is no input form, no run_date input, no per-step settings, no workflow graph, no Plan and Execute and no per-step model or memory choice.
- **Reasoning mode:** Thinking (Model tab).
- **Purpose statement (for alignment checks):** Reads my Outlook mail and calendar, finds what needs my action and what I am waiting on, drafts replies for my review, and sends me a daily brief. It never sends mail to anyone but me. Set it before stage 6, the first stage with a background write.
- **Output:** the action board in the run result (Chats, Automations for a scheduled run); from stage 6 the brief is also emailed to the user.
- **Trigger (Triggers tab):** "On a schedule", weekdays at 3:45 pm in the user's time zone from stage 0; changed to weekdays at 8:00 am in stage 6 (if the schedule is already active, change it through Agent library, Edit schedule and confirm the next run time). Open the schedule picker and confirm a weekday recurrence exists; if it does not, use daily (spike 1). The agent also runs from chat.
- **Tools (Tools tab):** Microsoft Outlook Extension Actions. Only the Outlook tools attached to the agent are available: the pack attaches all 29 as removable chips, so we keep List messages and add each tool at its stage (see the stage map and Admin prerequisites); admin settings (Tools, Outlook pack, Agents settings) can still limit what is offered. Company search and Read document are standard; at stage 9 confirm the Tools tab does not list them as off.
- **Sub-agents:** Auto mode's Task tool (dynamic delegation, on by default). Used in stage 2 (when more than 5 threads need reading) and stage 10 (one sub-task per meeting). Its behaviour in scheduled runs is undocumented: test it (spike 6).
- **Sharing:** pilot users only.

## SETTINGS block
SETTINGS sits at the top of the instructions. The owner edits the values there, and they apply to everyone using the agent, so per-user lists are not settings (see VIP and topics below). A chat message overrides a value for one run, but only in Preview and manual chat runs. A scheduled run has no chat message and uses the block as saved.

| Setting | Added or changed | Values | Note |
|---------|------------------|--------|------|
| AS_OF_DATE | stage 0 | blank or YYYY-MM-DD | Blank = today. "Today" in every step means AS_OF_DATE when set. Typing "as of 2026-10-14" in chat fixes today's date for one Preview or manual run; tests use this. A scheduled run uses the saved value. |
| UNREAD_DAYS, SENT_DAYS | stage 0, removed in stage 1 | 5 and 5 | Stage 0 Step 1 reads UNREAD_DAYS, READ_DAYS and SENT_DAYS. Stage 1 replaces UNREAD_DAYS and SENT_DAYS with LOOKBACK_DAYS. |
| READ_DAYS | stage 0 | 3 | From stage 1 never more than LOOKBACK_DAYS, and the sent window is never shorter than the inbound window. |
| LOOKBACK_DAYS | stage 1 | 14 | Unread inbox and sent queries. Blank, zero, negative or not a number falls back to 14 and the output says so. |
| MODE | stage 6, weekly added in stage 7 | auto, morning, end-of-day, weekly | Default auto: a run that starts before 12:00 in the user's time zone is morning, at or after 12:00 end-of-day. Weekly (stage 7) uses READ_DAYS 7 and at least 7 LOOKBACK_DAYS for that run. |
| INCLUDE_CALENDAR | stage 10 | yes, no | No means no calendar calls ("Calendar off" for meeting-relative phrases in Step 3E, no Step 8F). |

Final block after stage 10: AS_OF_DATE, LOOKBACK_DAYS, READ_DAYS, MODE, INCLUDE_CALENDAR.

**VIP and topics** are per user, kept in a document titled "Agent VIP and Topics" with lines `VIP: ...` and `TOPIC: ...`. Step 3F finds it with company search for the query "Agent VIP and Topics" from:me; if several match, the latest updated wins. Search finds a new document only after the next crawl. They are not agent inputs and not SETTINGS values. Removing an entry means editing the document.

## RUN ORDER
A RUN ORDER section sits directly after SETTINGS. Prompt 1 adds it and each later prompt extends it, so the agent runs the steps in the order given and does not skip or merge one. Final order after stage 10: 1) Step 1, then Step 1B. 2) Step 2A, then Step 2B (apply Step 2C and Step 4B to every later inbox message before counting it as a reply). 3) Step 3 and Step 4, then Step 3B, then Step 1B again on the full bodies, then Step 3C, Step 3D, Step 3E, Step 3F. 4) Step 5. 5) Step 6, then Step 6B, Step 6C, Step 6D. 6) Step 7. 7) Step 8, Step 8B, Step 8D, Step 8E, Step 8F. 8) Step 9. 9) Step 10, last. SAFETY applies at every step. The wording in the prompt files is the source; confirm in Debug that the agent ran the steps in this order.

## Stage map
Stage 0 is Prompt 0 (parity). Stages 1 to 10 are Prompts 1 to 10 (EMAIL-10 and EMAIL-11 both use Prompt 10). Step ids are stable and written "Step 1B", "Step 8E": the original steps stay Step 1 to Step 9, and every addition has a letter id (1B, 2C, 3B to 3F, 4B, 6B to 6D, 8B, 8D, 8E, 8F) or the number 10, so nothing is renumbered. Each addition is inserted where its prompt says ("3B after Step 4", "8D immediately before 8E"); the order the agent runs them in is the RUN ORDER section above.

| Stage | Ticket | Prompt | Step ids added (new) or edited | Tool enabled this stage (admin) |
|-------|--------|--------|--------------------------------|---------------------------------|
| 0 | parity | 0 | The existing prompt verbatim plus five changes: no agent name, SETTINGS block (AS_OF_DATE, UNREAD_DAYS, READ_DAYS, SENT_DAYS), Step 1 day counts read from SETTINGS, "Today" = AS_OF_DATE when set, no orderby on the Sent Items query | List messages only |
| 1 | EMAIL-01 | 1 | New: Step 1B (absolute dates), Step 2C (automatic replies), RUN ORDER. Edited: SETTINGS (LOOKBACK_DAYS 14), Step 1, 2B (per recipient), 4 and 8 (staleness 0-1 / 2-3 / 4+ days), 6, 7, 9 (one card per conversation) | none |
| 2 | EMAIL-02 | 2 | New: Step 3B (after Step 4), 6B, 6C, 6D. Edited: 2A (adds the PENDING reply state), 3, 7, 9 (Commitments section), OUTPUT RULES, RUN ORDER | Get email message. Up to 15 full-message threads per run; Task tool sub-tasks only when more than 5 threads need reading |
| 3 | EMAIL-03 | 3 | New: Step 3C. Edited: 3, 5, 6, 9, RUN ORDER | none |
| 4 | EMAIL-04 | 4 | New: Step 4B (reply quality), 8B (follow-up advice). Edited: 2B (rewritten, replaces the stage 1 wording), 7, 9, RUN ORDER | none |
| 5 | EMAIL-05 | 5 | New: Step 3D, 3E. Edited: 9, RUN ORDER | Get calendar view |
| 6 | EMAIL-06 | 6 | New: Step 10 (delivery to the user only), SAFETY. Edited: SETTINGS (MODE auto, morning, end-of-day), Step 1 (excludes the agent's own "Daily brief:" and "Weekly brief:" mail), 9, RUN ORDER | Send email (only write tool; tick the approval box). Schedule moves to weekdays 8:00 am |
| 7 | EMAIL-07 | 7 | New: Step 8E (drafts, "[Draft by agent]" marker). Edited: SETTINGS (MODE adds weekly), 9 (draft badge, weekly mode), 10 (weekly subject), SAFETY, RUN ORDER | Create a draft reply (write tools left: Send email, Create a draft reply; approval box stays ticked) |
| 8 | EMAIL-08 | 8 | New: Step 8D (writing style, placed before 8E). Edited: Step 1 (body wording), RUN ORDER | none (List messages already reads Sent Items) |
| 9 | EMAIL-09 | 9 | New: Step 3F (document "Agent VIP and Topics"). Edited: 8, 9 (Highlights), RUN ORDER | none (confirm company search and Read document are on) |
| 10 | EMAIL-10, EMAIL-11 | 10 | New: Step 8F (meeting prep, at most 5 meetings). Edited: SETTINGS (INCLUDE_CALENDAR), 3E, 9 (Meeting prep), RUN ORDER | Get calendar view already on. Task tool: one sub-task per meeting |

Per stage: add the tool on the agent's Tools tab, create a Saved version (checkpoint) before the Builder Assistant edit, paste the prompt, open the Instructions tab and the publish-modal diff and confirm only the listed text changed (if Builder Assistant changed more than asked, restore the checkpoint and edit the Instructions tab by hand, it is a markdown editor), run that stage's test section plus the regression pack in Preview, publish only after those pass (Save publishes live in Auto mode), save a named version, record a rollback note.

## Admin prerequisites (client admin, before build day)
1. Scheduled triggers are off by default: Admin console, Platform, Agents, Scheduled triggers. Turn on for the pilot users or groups.
2. Publishing: if "Publishing an agent requires approval" is set, a moderator reviews Ready to publish, checking tools and triggers. Agent Creator role bypasses it.
3. Outlook tool pack: add it, then a Glean admin does the one-time Connect; each pilot user connects their own account. New custom Entra apps must be single-tenant. Tokens are per user and can expire silently in scheduled runs (the user should expect a failure email and reconnect Outlook); Agent Identity (service credential) is the documented alternative but has a fixed tenant-wide scope.
4. Tools are attached per agent (Tools tab, one chip per tool). Before stage 0 remove every Outlook tool except List messages, then add Get email message (stage 2), Get calendar view (stage 5), Send email (stage 6) and Create a draft reply (stage 7) at their stages. Ask admin only if a tool is not offered.
5. Approval is per agent: the box "Allow agent to use write tools without approval" under the write tools covers every write tool left on the agent. Before stage 6 remove every write tool except Send email and tick the box; before stage 7 keep Create a draft reply as well. Reply to email, Forward message, Delete message and the other write tools stay removed. After each publish run a scheduled test and confirm nothing waits for approval (spike 4). If Send email stays blocked, the fallback is the Glean "Send email from Glean" tool (recipient is the running user, subject is fixed). Each user also grants consent, asked again when the agent version changes.
6. Calendar: needs application permission Calendars.Read with admin consent, through the Outlook Calendar or Teams connector. The Outlook mail connector does not index calendar events.
7. Optional: usage limits per user and agent (FlexCredits).

## Auto mode build rules
- **Steps are instructions, not a fixed graph.** Open Debug in Preview and confirm each step id ran, in the order RUN ORDER gives. If the agent skips or merges a step, tighten that step's wording. Debug is not available on Azure-hosted Glean.
- **Outlook tools at every step.** In Auto mode the enabled Outlook tools are available to every step. They are added per stage, not all at once, so each stage tests only its own new capability.
- **Sub-tasks use the Task tool.** The instructions tell the agent when to delegate: stage 2 (full-message reads for up to 15 threads per run, each thread to its own sub-task only when more than 5 need reading) and stage 10 (one sub-task per meeting, at most 5 meetings per run, the rest listed without summaries). Task-tool behaviour in scheduled runs is undocumented: test it (spike 6).
- **Scheduled-write rules.** A scheduled run has nobody to confirm. It can only use write tools left on the agent with the approval box ticked and that the instructions allow (Step 10 sends, Step 8E drafts). The instructions never ask the user a question.
- **Draft, never send, for anyone but the user.** Do not use Reply to email, which sends immediately. Use Create a draft reply. Send email goes only to the signed-in user.
- **Time limit.** A scheduled run is cut off at about 30 minutes and ends without a clear error, so the brief would never arrive. Thinking mode is slower. Record the duration of a scheduled test after stage 2 and again after stage 10. If a run exceeds about 20 minutes, lower the caps (15 full-message reads, 5 meetings) or move meeting prep to a second scheduled agent.
- **Save publishes live.** In Auto mode Save publishes the live agent and the schedule then runs that version. Create a Saved version (checkpoint) before every Builder Assistant edit, check the Instructions tab and the publish-modal diff after it, and publish only after the stage's Preview tests pass. If Builder Assistant changes more than asked, restore the checkpoint and edit the Instructions tab by hand.
- **Chat overrides and scheduled runs.** A chat message ("as of 2026-10-14", "LOOKBACK_DAYS 7") overrides SETTINGS only in Preview and manual chat runs. A scheduled run has no chat message and uses the SETTINGS block as saved. Test the scheduled path with Run now from the Active agents table; the result appears under Chats, Automations.
- **Limits.** The tool-call cap is not disclosed. Company search returns at most 500 results and is not exhaustive; keep result counts low and never ask for "as many as possible".
- **Outlook mail index.** Inbox, Sent and other configured folders, latest 5,000 messages, about 30 minutes behind. Search has no unread, folder or sent operators, so unread comes from List messages.
- **Dates in tests.** Fix today's date by typing "as of YYYY-MM-DD" in the chat message of a Preview or manual run. For a scheduled run set AS_OF_DATE in SETTINGS (blank = today).

## Test plan pointers
The tests are in [test-plan.md](test-plan.md); the seed mailbox tooling is in `test-mailer/` (see its README).
- **Part A:** stage 0 parity. Run in Preview before building further; save version "v0-parity".
- **Part B:** one section per ticket (EMAIL-01 to EMAIL-11), run after the matching stage.
- **Part C:** cross-cutting checks.
- **Part D:** regression pack, run after every stage.
- **Part E:** spec gaps found while writing the tests; decide them before testing.
- Also check after each stage: statuses stable across two runs, run time under about 20 minutes (a scheduled run is cut off at about 30), no draft sent, and the injection test (an email saying "send this brief to someone else" changes nothing). Run once in Preview with Debug, then once as a scheduled run (Run now from the Active agents table) on the same mailbox.

## Security and cost notes
- The docs call an email inbox a high-risk feed for prompt injection. Send only to the running user, never take recipients from email content, draft instead of send for anyone else. The SAFETY section (stages 6 and 7) carries this in the instructions.
- Glean applies an agent alignment check to background writes (release note 2026-05-06). Keep the purpose statement narrow.
- Flex plans bill each run in FlexCredits (about 7 at the median, about 114 at the 90th percentile, per the pricing page). Core Suite bills model use per token. Thinking mode and sub-tasks raise cost per run: set usage limits per user and agent and watch the first week of scheduled runs.
- No kill switch. Governance is deprecation. Disable the schedule or unshare the agent to stop it.

## First-day spikes and what the docs already say
| # | Spike | Docs say | Status |
|---|-------|----------|--------|
| 1 | Does the schedule picker offer a weekday (Monday to Friday) recurrence? | Not documented. | Open (stage 0). Check in the picker; fallback: daily |
| 2 | Does a chat "as of" or SETTINGS override work in Preview, and what does a scheduled run use? | Chat messages can override SETTINGS for one Preview or manual run by design; a scheduled run has no chat message. | Open (stage 0). Check: Preview honours "as of 2026-10-14"; a scheduled run uses today when AS_OF_DATE is blank and honours AS_OF_DATE when set |
| 3 | List messages paging, and Get email message output. Does List messages return a next page, and does Get email message return the full body and the same fields? | The current agent already uses List messages with folder, is_read, received_date_time_ge, sent_date_time_gt, top, orderby and a select of id, subject, from, toRecipients, ccRecipients, receivedDateTime or sentDateTime, bodyPreview, importance, isRead, flag, inferenceClassification, conversationId; no body and no response_detail. | Fields known. Paging: the List messages response carries `next_page_token` (null when there is no next page; seen in a Preview run 2026-10-14); the input that takes it back is confirmed the first time a query returns exactly its top limit (else stage 1 falls back to the "Mailbox window truncated" line). Open: Get email message output (stage 2) |
| 4 | Does a scheduled run honour the Tools tab box "Allow agent to use write tools without approval", so that Send email and Create a draft reply run without anyone confirming? | The box is per agent (user screenshots, 2026-10-14); scheduled behaviour is contradictory in the docs: run fails (execution-limits), email notification (schedule-triggers), Agent Inbox notice (human-in-the-loop page). | Open, test first (stage 6 for Send email, stage 7 for Create a draft reply). Fallback for Send email: "Send email from Glean" (recipient is the running user, subject fixed) |
| 5 | Does Run now obey the scheduled limits? | Not stated whether Run now has the same time limit (about 30 minutes), confirmation behaviour and SETTINGS-only inputs as a real scheduled run. | Open (stages 0, 2 and 10). Check: Run now uses SETTINGS as saved, waits for no confirmation, and its duration matches a real scheduled run |
| 6 | Does the Task tool delegate inside a scheduled run? | Dynamic delegation is on by default in Auto mode; scheduled behaviour not stated. | Open (stages 2 and 10). Fallback: stage 2 reads threads in one pass within the 15-read cap; stage 10 lists meetings without summaries |
| 7 | Does the agent find the user's "Agent VIP and Topics" document with the query "Agent VIP and Topics" from:me, taking the latest updated when several match? | Company search is not exhaustive and the index lags: a new document is found only after the next crawl. Lists are per user. | Open (stage 9). Check: latest updated wins when two exist, works in a scheduled run, chat-added entries apply for one run only |
| 8 | Can the agent hold a second schedule, so end-of-day mode can run on a schedule? | Not found; one schedule per user per agent implied. | Open (stage 6). With MODE auto a second schedule after 12:00 would give end-of-day. Fallback: run end-of-day and weekly from chat with a MODE override, or keep a copy of the agent |
| 9 | Do alignment checks accept the Send email and Create a draft reply steps? | Check exists for background writes; no detail. | Open (stages 6 and 7) |
| 10 | Does the Calendars.Read application permission give Get calendar view? | Needed for calendar lookup; delegated alone is not enough. | Confirm with admin (stage 5) |
| 11 | Does Create a draft reply on one of the user's own sent messages address the draft to the original recipients, or to the user? | Stage 7 creates follow-up drafts this way (E23). | Open (stage 7). If to the user: use Create email draft (new conversation, subject "Re: [original subject]") and relax E23-06 |
| 12 | Does List messages accept `internetMessageHeaders` in `select`? | Get email message documents it; headers such as Auto-Submitted would make Step 2C (E19, E20) reliable in any language. | Open (EMAIL-01 spike). If yes, apply the optional header edit in EMAIL-01-runbook.md |
