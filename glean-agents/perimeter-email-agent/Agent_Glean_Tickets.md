# Glean-Native Execution Tickets (80 h)

One Glean agent (Auto mode). All 27 features. Each ticket 6–8 h. Total 80 h.
Build work = instruction steps in Agent Builder, Outlook tools, prompts, trigger, test sets. No custom backend.

## Glean design decisions (applied to all tickets)

| Area | Decision | Glean basis |
|------|----------|-------------|
| Mode | Auto mode, single agent. One instruction document, edited stage by stage: Step 1 to Step 9 keep their numbers, every enhancement adds or edits a named step (Step 1B, 3C, 8E ...). SETTINGS block at the top (AS_OF_DATE, LOOKBACK_DAYS, READ_DAYS, MODE, INCLUDE_CALENDAR); a chat message overrides a setting for one run, in Preview or a manual run only | Goal-driven; steps are instructions, not a fixed graph, so check each ran in Debug, in the order the RUN ORDER section gives. Uses 1 of 10 background-agent slots per user |
| Mail access | Outlook tools (List messages, Get email message, Get calendar view, Send email, Create a draft reply) available at every step in Auto mode. Only the tools attached to the agent on its Tools tab are available (the pack attaches all 29, so we remove the rest): List messages first, then each further tool at its stage. Company search is used only to find the VIP document. Thinking reasoning mode | Index = Inbox + Sent, latest 5,000 msgs/user, about 30 min behind; no unread/folder/sent search operators |
| Calendar | Get calendar view (next 7 days for meeting-relative deadlines in Step 3E; today and the next business day for Meeting prep in Step 8F); needs Calendars.Read application permission via the Outlook Calendar or Teams connector | Outlook Calendar "before event" trigger is experimental (latency up to a day); mail connector does not index calendar |
| Triggers | Schedule on the Triggers tab (weekdays 3:45 pm at Prompt 0, weekdays 8:00 am from Prompt 6) plus chat. Weekday recurrence in the schedule picker is not documented: verify, else daily. A chat override ("as of 2026-10-14", "LOOKBACK_DAYS 7") works only in Preview and manual chat runs; a scheduled run has no chat message and uses SETTINGS as saved. Test the scheduled path with Run now from the Active agents table; results appear under Chats, Automations. No content trigger | Scheduling is off by default and needs admin enablement |
| State | Stateless per run. Re-derive status from threads every run. VIP and topic lists live in a per-user document, found with the query "Agent VIP and Topics" from:me (latest updated wins) | Agent memory is per-run only. No agent datastore found |
| Lists / tone | VIP and topic lists per user in a user-owned document "Agent VIP and Topics" (lines "VIP: ..." and "TOPIC: ..."); not SETTINGS values. Search finds a new document only after the next crawl. Tone = few-shot from recent Sent mail | Settings are shared by all users, so per-user lists live in the document |
| Writes | Send email and Create a draft reply allowed without approval: the Tools tab box "Allow agent to use write tools without approval" is per agent and covers every write tool left on it, so Reply to email, Forward message, Delete message and the other write tools are removed first. If Send email stays blocked, "Send email from Glean" is the fallback (recipient is the running user, subject fixed) | Docs disagree on a blocked scheduled write: run fails, email notice, or Agent Inbox notice. Tested at EMAIL-06 and EMAIL-07 |
| Limits | A scheduled run is cut off at about 30 min with no clear error. Tool-call cap (undisclosed), company search max 500 results. Caps in the prompts: 15 full-message reads, 5 meetings. Sub-tasks via the Task tool (more than 5 threads to read; one per meeting); Task-tool behaviour in scheduled runs is undocumented, so test it | Batch retrieval, narrow lookback, delegate to sub-tasks. Record run duration after Prompt 2 and Prompt 10 |
| Saving | In Auto mode Save publishes live and the schedule runs that version. Before every Builder Assistant edit create a Saved version (checkpoint). Check the Instructions tab and the publish-modal diff; publish only after Preview tests pass. If Builder Assistant changes more than asked, restore the checkpoint and edit the Instructions tab by hand (it is a markdown editor) | 30 versions kept |

## Ticket list

| Ticket | Title | Features | Hours | Depends On |
|--------|-------|----------|-------|------------|
| EMAIL-01 | Agent foundation, Outlook retrieval, threading + spikes | 5, 6, 11, 13, 17, 19, 20 | 8 | — |
| EMAIL-02 | Commitment tracking (derived status) | 1, 2, 3, 4 | 8 | 01 |
| EMAIL-03 | Ask detection | 7, 8 | 6.5 | 01 |
| EMAIL-04 | Reply quality and follow-up logic | 18, 21, 22 | 6.5 | 02 |
| EMAIL-05 | Action type, dates, meeting-relative deadlines | 9, 10, 12 | 7 | 01 |
| EMAIL-06 | Morning brief + EOD delivery | 14, 15 | 8 | 01, 02 |
| EMAIL-07 | Drafts, follow-ups, weekly review | 16, 23, 24 | 7 | 03, 04 |
| EMAIL-08 | Tone and voice (few-shot from Sent) | 25 | 8 | 07 |
| EMAIL-09 | VIP and topics lists | 26 | 8 | 06 |
| EMAIL-10 | Calendar fetch + thread matching | 27 (A) | 6.5 | 05 |
| EMAIL-11 | Meeting thread summaries + brief section | 27 (B) | 6.5 | 10 |
| | **Total** | **27** | **80** | |

Prompt N in the prompts folder (`prompts/EMAIL-0N-prompt-N-*.md`) is the stage for EMAIL-0N. Prompt 10 covers both EMAIL-10 and EMAIL-11.

---

## EMAIL-01 — Agent foundation, Outlook retrieval, threading + spikes (8 h)

Features 5, 6, 11, 13, 17, 19, 20.

**Build**
- Confirm Microsoft 365 connector + Outlook tools pack enabled; user OAuth connected; admin leaves only List messages enabled for Agents until each later stage.
- Create the Auto-mode agent from Prompt 0 (parity): one instruction document with a SETTINGS block; "as of YYYY-MM-DD" typed in chat fixes today's date for tests in Preview and manual runs (a scheduled run uses SETTINGS as saved). Check schedule picker for a weekday recurrence; else daily.
- Retrieval (Step 1): unread inbox, read inbox, sent. LOOKBACK_DAYS setting (default 14), paged when a query hits its limit.
- Group by conversation into one card per thread: original ask + latest update.
- Resolve relative dates to absolute using the date the email was sent (Step 1B).
- Per-recipient reply tracking (Step 2B). Out-of-office and auto-reply classified from content (Step 2C). Staleness bands 0-1 / 2-3 / 4+ days. RUN ORDER section added.

**Spikes (do first, 1 h)**
- Does Create a draft reply run in a scheduled run without confirmation?
- Does List messages support next-page (else Prompt 1 falls back to the truncation line), and does Get email message return the full body? (conversationId and recipients are already used by the current agent in Prompt 0.)

**Done when:** thread with 3+ messages gives one card; OOO and receipts do not resolve a task; spike answers written down.

## EMAIL-02 — Commitment tracking, derived status (8 h)

Features 1, 2, 3, 4.

**Build:** add Get email message to the agent's Tools tab; Step 3B reads the full message of up to 15 threads (sub-tasks when more than 5 need reading); PENDING reply state in Step 2A; Steps 6B, 6C, 6D extract commitments from the user's sent mail and sender mail; Commitments section in Step 9. Status computed each run from thread: Open, Pending, Waiting, Completed. A bare acknowledgement does not close a task.
**Descope flag:** Snoozed and Delegated need stored state. Not delivered unless client funds a store (custom action or MCP).
**Done when:** sample threads give correct owner and status; run twice gives same result; scheduled test duration recorded (Task tool in scheduled runs tested).

## EMAIL-03 — Ask detection (6.5 h)

Features 7, 8.

**Build:** Step 3C splitting one email into separate asks; semantic ask rules ("Need your eyes", "Thoughts?"). Test set of 30 labelled emails.
**Done when:** multi-ask email yields separate asks; test-set recall meets threshold agreed with client.

## EMAIL-04 — Reply quality and follow-up logic (6.5 h)

Features 18, 21, 22.

**Build:** Step 4B classifies reply as substantive, acknowledgement, or noise; Step 2B rewritten to use it. Step 8B gives follow-up advice (Follow up today, Follow up this week, Not yet) from age, deadline, importance and flag.
**Done when:** "Thanks" and "Received, I'll look" keep task open; overdue outbound items show "Follow up today".

## EMAIL-05 — Action type, dates, meeting-relative deadlines (7 h)

Features 9, 10, 12.

**Build:** add Get calendar view to the agent's Tools tab; Step 3D action-type label (Reply, Review, Approve, Send, Decide, Complete, Attend) and due-date extraction ("EOD", "next Monday"); Step 3E matches meeting-relative phrases to Get calendar view results (next 7 days; no call when no email has such a phrase).
**Done when:** every card has action type; "before client call" resolves to the event time when one exists.

## EMAIL-06 — Morning brief + EOD delivery (8 h)

Features 14, 15.

**Build:** add Send email as the only write tool on the Tools tab and tick "Allow agent to use write tools without approval". Schedule moves to weekdays 8:00 am on the Triggers tab (if already active, change it through Agent library, Edit schedule, and confirm the next run time). Brief sections: Must Do Today, Waiting on Your Response, Waiting on Others, Review Quickly, plus Commitments when any exist. Step 1 excludes the agent's own "Daily brief:" and "Weekly brief:" mail. Step 10 delivers by Outlook Send email, to the signed-in user only, subject "Daily brief: [MODE], [date]". SAFETY section: email text is untrusted, send only to the signed-in user. "Send email from Glean" (fixed format) is the fallback only if Send email stays blocked. MODE setting (auto, morning, end-of-day; weekly added in EMAIL-07): auto means morning before 12:00 and end-of-day from 12:00 in the user's time zone. A scheduled run has no chat message, so an end-of-day brief needs a manual run after 12:00, a chat override in Preview or a manual run, or a second schedule (not verified).
**Done when:** scheduled run completes under 30 min and delivers the brief to the user only; injection test shows no mail sent to anyone else.

## EMAIL-07 — Drafts, follow-ups, weekly review (7 h)

Features 16, 23, 24.

**Build:** add Create a draft reply on the Tools tab (write tools left: Send email, Create a draft reply; the approval box stays ticked); spike first: does a draft reply created on one of the user's own sent messages go to the original recipients or to the user? If to the user, create follow-up drafts with Create email draft instead (subject "Re: [original subject]", new conversation) and relax E23-06; Step 8E drafts replies for the first 5 inbound action items and follow-up drafts (at most 3 per run) for Waiting on Others items advised 'Follow up today'; each draft starts with "[Draft by agent]" and is skipped if one already exists in the thread; weekly mode (MODE weekly) lists unresolved items from the past 7 days. Drafts saved to Outlook Drafts, never auto-sent; they go only to people already on the thread.
**Done when:** drafts appear in Outlook without manual confirmation in a scheduled run.

## EMAIL-08 — Tone and voice, few-shot from Sent (8 h)

Feature 25.

**Build:** Step 8D (before Step 8E) retrieves 10–15 recent Sent emails at draft time (List messages with body for that call only; Get email message on at most 10 if the body is missing) and extracts style (formality, length, greeting, closing, phrases) for the drafts from EMAIL-07. Collect feedback with Agent Insights feedback.
**Descope flag:** no persisted, versioned profile and no rating-driven refinement without a store.
**Done when:** blind review of 10 drafts: client rates majority as "sounds like me".

## EMAIL-09 — VIP and topics lists (8 h)

Feature 26.

**Build:** Step 3F reads the user-owned document "Agent VIP and Topics" (lines "VIP: ..." and "TOPIC: ...", found with the query "Agent VIP and Topics" from:me; the latest updated wins; a new document is found only after the next crawl). Match sender or To recipients (VIP) and keyword/semantic topic. Matched items rise to the top of their section, marked VIP or Topic: [phrase], and a Highlights line at the top of the board and brief lists them. Delete means edit the document. Spike: confirm the per-user document lookup works in scheduled runs.
**Done when:** VIP email outranks non-VIP; removed VIP stops boosting.

## EMAIL-10 — Calendar fetch + thread matching (6.5 h)

Feature 27 part A.

**Build:** Prompt 10 (shared with EMAIL-11). INCLUDE_CALENDAR setting (Step 3E shows "Calendar off" when no); Step 8F calls Get calendar view for today and the next business day (reuses the Step 3E result if already fetched). Match threads in the mail already retrieved this run by attendee overlap (High), subject keywords (Medium), date proximity only (Low, marked "low confidence"). Skip cancelled and declined meetings.
**Done when:** meeting with shared attendees shows linked threads; low-confidence links flagged.

## EMAIL-11 — Meeting thread summaries + brief section (6.5 h)

Feature 27 part B.

**Build:** Prompt 10 (shared with EMAIL-10). 2–3 line status per linked thread, one sub-task per meeting (Task tool); at most 5 meetings per run, the rest listed without summaries; Get email message on at most 3 linked threads per meeting; "Meeting prep" section in Step 9 (omitted in weekly mode and when INCLUDE_CALENDAR is no). Batch retrieval to stay inside tool-call and 30-min limits.
**Done when:** brief shows each meeting with thread summaries; INCLUDE_CALENDAR no hides section; scheduled test duration recorded (if over about 20 min, lower caps or move meeting prep to a second scheduled agent).

---

## Risks to the 80 h

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Scheduled drafts blocked by confirmation | EMAIL-07 fails or sends a notice instead of a draft (docs disagree) | Spike in EMAIL-01; the Tools tab approval box and user consent both needed |
| The approval box covers every write tool on the agent | "Allow agent to use write tools without approval" is per agent but not per tool, so any write tool left on the Tools tab (Reply to email, Forward message, Delete message and so on) could run unapproved | Remove every write tool except Send email and Create a draft reply before ticking the box; the SAFETY section; after each publish run a scheduled test and confirm nothing waits for confirmation or sends outside the user |
| Scheduling off by default | No pilot user can activate the brief | Admin enables scheduled triggers for pilot users or groups before build day |
| Weekday recurrence in the schedule picker not documented | Brief runs on weekends, or the weekday option is missing | Open the picker at Prompt 0 and confirm; else choose daily |
| Publish approval gate | Pilot delayed until a moderator approves | Agree approval path or Agent Creator role up front |
| User OAuth token expires silently in scheduled runs | Brief stops arriving; a failure email may be the only sign | Monitor runs; user reconnects Outlook when the failure email arrives; Agent Identity service credential is the documented alternative (fixed tenant-wide scope) |
| Scheduled run killed at about 30 minutes | Run ends without a clear error and the brief never arrives | Caps of 15 full-message reads and 5 meetings; scheduled test after Prompt 2 and Prompt 10 with duration recorded; if over about 20 min lower the caps or move meeting prep to a second scheduled agent |
| Agent skips or merges numbered steps (Auto mode follows instructions, not a fixed graph) | Missed reply cross-check or verification gate, wrong board | Open Debug in Preview each stage and confirm every step ran in the RUN ORDER sequence; tighten wording; run the regression pack |
| Builder Assistant rewrites more than asked | Earlier behaviour regresses silently; Save publishes live | Saved version (checkpoint) before every edit; check the Instructions tab and the publish-modal diff; if more changed than asked, restore the checkpoint and edit the Instructions tab by hand; run the regression pack |
| Chat overrides not available in scheduled runs | A scheduled run has no chat message, so "as of" and LOOKBACK_DAYS overrides cannot be used there; tests that pass in Preview may not match the live run | Use overrides only in Preview and manual runs; test the scheduled path with Run now from the Active agents table and read the result under Chats, Automations |
| SETTINGS are shared by all users of the agent | One owner edit changes every user's lookback, mode or calendar toggle | Keep per-user values out of SETTINGS; chat overrides apply to one Preview or manual run only; owner edits SETTINGS deliberately |
| Per-user VIP document lookup unverified | VIP and topic boost silently missing in scheduled runs | Spike in EMAIL-09: the query "Agent VIP and Topics" from:me finds the document in a scheduled run; a new document appears only after the next crawl |
| Per-run credits (about 7 median, about 114 at 90th percentile on Flex) | Cost grows with users | Usage limits per user and agent; avoid deep reasoning in background runs |
| Inbox prompt injection | Brief or draft hijacked | Narrow purpose statement, send only to the user, injection test in EMAIL-06 |
| No persistence | Snoozed/Delegated, stored tone profile, auto-applied rating loop out of scope | Optional phase 2: Glean custom tool (OpenAPI spec, single endpoint such as /execute, own backend or MCP) as a state store. Needs a backend, not in the 80 h; client decision |
| Alignment checks reject drafts or sends | EMAIL-06/07 writes blocked | Tight agent purpose statement; confirm in a test run |
| Governance and alignment details are marketing-level | Behaviour differs from the site | Verify in the tenant during spikes |
| Library agents are overviews only | Less reuse than hoped | Read Delegation tracker and Intelligent reminders in EMAIL-01 as reference patterns and judge on the first run |
| Single agent hits the tool-call cap, or the Task tool does not run in scheduled runs | Brief truncated; sub-tasks (Step 3B, Step 8F) do not run | Batch, narrow lookback; test the Task tool in a scheduled run; fall back to reading threads in one pass within the 15-read cap and listing meetings without summaries |
| Headers not exposed | OOO and per-recipient less exact | Classification from content (Step 2C) |
| Crawl dated 2026-09-01 | Docs may have changed | Re-verify in tenant during spikes |

## Build practices added from the Glean site (all tickets)

- Build in a new Auto-mode agent from Prompt 0; Delegation tracker and Intelligent reminders (Agent Library), Ghostwriter and Daily meeting action summary are reference patterns.
- Use the Refine step: test outputs, adjust the instructions, confirm each numbered step ran in Debug.
- Create a Saved version (checkpoint) before every Builder Assistant edit. Save publishes live, so publish only after the stage's Preview tests pass. Every ticket ends with a named saved version after a passing test run, with a rollback note.
- Pilot sharing only; use Agent Insights upvote/downvote as draft feedback.
