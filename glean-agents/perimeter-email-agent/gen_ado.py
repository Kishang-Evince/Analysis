import csv, html, os
D = os.path.dirname(os.path.abspath(__file__))
FEATURE = "Agent Enhancements (Glean)"
PROMPTS = {0: "EMAIL-01-prompt-0-parity", 1: "EMAIL-01-prompt-1-lookback-dates-replies", 2: "EMAIL-02-prompt-2-commitments",
  3: "EMAIL-03-prompt-3-asks", 4: "EMAIL-04-prompt-4-reply-quality", 5: "EMAIL-05-prompt-5-due-dates",
  6: "EMAIL-06-prompt-6-brief-delivery", 7: "EMAIL-07-prompt-7-drafts", 8: "EMAIL-08-prompt-8-writing-style",
  9: "EMAIL-09-prompt-9-vip-topics", 10: "EMAIL-10-11-prompt-10-meeting-prep"}

def stage(n, ids, tool=None, admin=None, ck=None, note=None):
    """Standard start of a build stage: admin/tool enablement, checkpoint, paste Prompt n (or hand edits), check Instructions tab and publish-modal diff."""
    s = []
    if tool: s.append(f"Tools tab: add {tool} to the agent (each Outlook tool is a chip with an x; the pack attaches all of them by default, so keep only the tools the stages so far need). Ask admin only if the tool is not offered.")
    if admin: s.append(admin)
    s.append(ck or "Create a Saved version (checkpoint) of the current agent before editing. In Auto mode Save publishes live, so do not Save the edit yet.")
    if note is None: note = "" if tool else " Tools: no change."
    s.append(f"Paste Prompt {n} from prompts/{PROMPTS[n]}.md into Builder Assistant, or make its listed edits by hand in the Instructions tab (a markdown editor)." + note)
    s.append(f"Open the Instructions tab and the publish-modal diff and confirm only {ids} changed. If Builder Assistant changed more than asked, restore the checkpoint and make the listed edits by hand.")
    return s

def run(sections):
    return (f"Run {sections} from test-plan.md in Preview with Debug open, plus the Part D regression pack (expectations that change by design are listed there). "
            "Confirm each added step ran, in the order RUN ORDER gives. Where dates or aging matter, type a chat override such as 'as of 2026-10-14' or 'LOOKBACK_DAYS 7' in the chat message "
            "(chat overrides work only in Preview and manual chat runs; see test-plan.md Conventions).")

def sched(record=False, extra=""):
    """Scheduled path: Run now from the Active agents table. A scheduled run has no chat message, so overrides do not apply."""
    return ("Scheduled path: use Run now from the Active agents table and read the result under Chats, Automations. A scheduled run has no chat message and uses the SETTINGS block as saved, so chat overrides do not apply. "
            "Confirm the run finishes, no tool waits for confirmation and the result matches the Preview run." + extra
            + (" Record the run duration in the ticket. Scheduled runs are cut off at about 30 minutes without a clear error: if the run takes more than about 20 minutes, lower the caps or move meeting prep to a second scheduled agent." if record else ""))

T = [
 dict(id="EMAIL-01", title="Agent foundation, Outlook retrieval, threading and spikes", h=8, feats="5, 6, 11, 13, 17, 19, 20", dep="None (blocks all)", ver="v1-threads-dates",
  desc="Create the agent in Glean Agent Builder in Auto mode from Prompt 0 (the existing agent's prompt word for word, with five changes: no agent name, a SETTINGS block, Step 1 day counts read UNREAD_DAYS, READ_DAYS and SENT_DAYS, 'Today' means AS_OF_DATE when set, and no orderby line on the Sent Items query (the tool rejects that sort); read-only List messages, weekdays 3:45 pm, Thinking). Prove parity with test Part A, then add the first enhancements with Prompt 1: LOOKBACK_DAYS (default 14), Step 1B absolute dates, Step 2C automatic replies, per-recipient reply tracking in Step 2B, staleness bands of 0 to 1, 2 to 3 and 4 or more days, one card per conversation with the original ask beside the latest update, and a RUN ORDER section. conversationId and recipients are already used by the current agent, so only two behaviours need a spike: whether List messages supports next-page and whether Get email message returns the full body.",
  steps=["Admin prerequisites checklist (client admin): scheduled triggers turned on for the pilot users; publish-approval path agreed (moderator, or Agent Creator role; in Auto mode Save publishes live); Outlook tool pack added with the one-time admin Connect, then each pilot user connects their own account; Tools, Outlook pack, Agents settings: the pack's tools are offered to Agents (admin can limit them); on the agent's own Tools tab keep only List messages to start (the pack attaches all 29 tools, so remove the rest), then add each further tool at its stage (Get email message at EMAIL-02, Get calendar view at EMAIL-05, Send email at EMAIL-06, Create a draft reply at EMAIL-07); approval is per agent: the box 'Allow agent to use write tools without approval' on the Tools tab covers every write tool left on the agent, so remove all other write tools (Reply to email, Forward message, Delete message and the rest) before ticking it at EMAIL-06; calendar application permission Calendars.Read granted with admin consent (EMAIL-05). Fallback if Send email stays blocked: the Glean 'Send email from Glean' tool (recipient is the running user, subject fixed).",
   "Spike (1 h): in a scratch agent, not the real one, answer three questions. (1) Which paging input does List messages take (continuation token or offset) when a query returns exactly its top limit? (2) Does Get email message return the full body (add it to the scratch agent; the real agent gets it at EMAIL-02)? (3) Does List messages accept internetMessageHeaders in select (if yes, apply the optional header edit in EMAIL-01-runbook.md)? Record the answers in the ticket. If paging is not possible, the agent writes the 'Mailbox window truncated' note (Prompt 1); EMAIL-02 depends on answer (2).",
   "Agents, Create agent, keep Auto mode. Paste Prompt 0 from prompts/EMAIL-01-prompt-0-parity.md into Builder Assistant.",
   "Compare the Instructions tab with 'Current Perimeter Email Agent (Glean).md': the only differences allowed are the five stated under Prompt 0 (no agent name in the first sentence, the SETTINGS block, Step 1 day counts reading UNREAD_DAYS, READ_DAYS and SENT_DAYS, 'Today' means AS_OF_DATE when set, no orderby line on the Sent Items query). Tools: only Microsoft Outlook Extension Actions with List messages. Triggers tab: On a schedule, weekdays 3:45 pm; open the schedule picker and confirm a Monday to Friday recurrence exists, and if it does not, choose daily and note it in the ticket. Model tab: Thinking.",
   "Governance: set sharing to the pilot users only (Agent governance sharing control), because Save publishes live in Auto mode.",
   "Run test-plan.md Part A in Preview with Debug open, typing 'as of 2026-10-14' in the chat message to fix today's date. Confirm Step 1 to Step 9 each ran, in order; if Debug shows a step skipped or merged, tighten its wording by hand in the Instructions tab. Then run the scheduled path from A12: Run now from the Active agents table, result under Chats, Automations (no chat message, so SETTINGS as saved). Save version 'v0-parity' with a note that it matches the current agent.",
   *stage(1, "SETTINGS (LOOKBACK_DAYS 14 replacing UNREAD_DAYS and SENT_DAYS, READ_DAYS 3 capped at LOOKBACK_DAYS, the invalid-value rule), the Step 1 read-inbox query (LOOKBACK_DAYS, top 100) and paging rule, Step 1B, Step 2C, the rewritten Step 2B, the staleness bands (0 to 1, 2 to 3, 4 or more days) and the first sentence in Step 4 and the bands in Step 8, the per-recipient edits in Step 6 and Step 7, the one-card-per-conversation rule, the outbound To and Responses fields, the note-line and summary-line rule and the counting rule in Step 9, and the new RUN ORDER section",
         ck="Create a Saved version (checkpoint): 'v0-parity' is the checkpoint for this stage."),
   run("the EMAIL-01 section of Part B (E13, E11, E05, E06, E17, E19, E20)"),
   sched()],
  done=["Agent exists in Auto mode, differs from the existing prompt only by the five stated changes, passes test Part A, and version 'v0-parity' is saved.","Schedule is weekdays 3:45 pm (or daily, with the reason noted, if the picker has no weekday recurrence).","Thread with 3 or more messages shows one card with original ask and latest update.","Lookback is configurable in SETTINGS (LOOKBACK_DAYS) and defaults to 14 days.","Out-of-office replies and delivery receipts do not resolve a task.","Reply tracking shows who has and has not replied on multi-recipient mail.","Admin prerequisites checklist signed off by the client admin.","Spike result documented in the ticket: List messages next-page and Get email message full body."],
  tags="glean; foundation"),
 dict(id="EMAIL-02", title="Commitment tracking with derived status", h=8, feats="1, 2, 3, 4", dep="EMAIL-01", ver="v2-commitments",
  desc="Make a reply stop meaning 'task done'. A reply that only acknowledges leaves the email PENDING (new reply state in Step 2A). Detect commitments the user made ('I'll send this tomorrow') and commitments others made ('I'll deliver Friday'). Status is derived from the thread on every run, because Glean agents keep no state between runs. Statuses delivered: Open, Pending, Waiting, Completed, with Overdue as a flag beside the status. Snoozed and Delegated are out of scope until a store exists. This stage also turns on Get email message (Step 3B) so the agent reads the full body of up to 15 candidate threads, handing each thread to a sub-task when more than 5 need reading, and adds a Commitments section to the board.",
  steps=[*stage(2, "Step 3B, the PENDING reply state and rewritten items 2 to 5 in Step 2A, the first paragraph of Step 3, item 1 of Step 7, Step 6B, Step 6C, Step 6D, the Commitments section in Step 9, the OUTPUT RULES sentence and RUN ORDER", tool="Get email message"),
   "Build 15 labelled sample threads (owner, promise, due phrase, expected status) as test seeds.",
   run("the EMAIL-02 section of Part B (E01, E02, E03, E04)"),
   "With more than 5 threads to read, confirm in Debug that each thread went to its own sub-task (Task tool, on by default). Confirm Get email message is not called for excluded mail, for more than 15 threads in Step 3B, or for body reads other than the Step 2A sent-reply check.",
   "Run the 15 sample threads twice and compare the statuses for stability.",
   sched(record=True, extra=" Task-tool behaviour in scheduled runs is undocumented: confirm the sub-tasks ran in this scheduled run.")],
  done=["Correct owner and status on all 15 sample threads.","Two consecutive runs give the same statuses.","Acknowledgement-only reply leaves the task open (PENDING).","Get email message is called only for the chosen threads (at most 15, plus the Step 2A sent-reply check); with more than 5 threads each goes to its own sub-task.","Scheduled run duration recorded (action taken if over about 20 minutes).","Scope note for Snoozed and Delegated recorded."],
  tags="glean; commitments"),
 dict(id="EMAIL-03", title="Ask detection (multiple and semantic)", h=6.5, feats="7, 8", dep="EMAIL-01", ver="v3-asks",
  desc="Detect every request in an email and catch indirect wording. One email can hold several asks ('review this, approve pricing, send the contract'), each returned separately. Indirect asks such as 'Need your eyes on this', 'Thoughts?' and 'Comfortable shipping?' must be recognised without fixed keyword lists. The card shows the primary ask and lists the others under 'More asks'. Low-confidence asks go to Review Quickly.",
  steps=[*stage(3, "Step 3C, the indirect-ask wording in the Step 3 bullets, the 'More asks' bullet in Step 6, Class C confidence in Step 5, the Confidence and 'More asks' fields in Step 9 and RUN ORDER"),
   "Build a labelled test set of 30 emails (single ask, multiple asks, indirect asks, no ask).",
   run("the EMAIL-03 section of Part B (E07, E08)"),
   "Compute recall and false positives on the 30 emails; review the false positives with the client and agree the recall threshold.",
   sched()],
  done=["Three-ask email returns three separate asks.","Indirect-ask examples detected.","Low-confidence asks appear only in Review Quickly.","Recall meets the threshold agreed with the client; false positives reviewed."],
  tags="glean; asks"),
 dict(id="EMAIL-04", title="Reply quality and follow-up logic", h=6.5, feats="18, 21, 22", dep="EMAIL-02", ver="v4-reply-quality",
  desc="Judge whether a reply actually answers the request (Step 4B: substantive, acknowledgement or noise), separate 'received, I'll look' from a real answer, and recommend when to follow up (Step 8B: 'Follow up today', 'Follow up this week' or 'Not yet'). A 'Thanks' or 'Noted' must not close a task. Step 2B is rewritten to use these rules. Follow-up advice appears only on Waiting on Others items.",
  steps=[*stage(4, "Step 4B, the rewritten Step 2B (a later inbox email no longer counts as a reply unless it is substantive), the outbound item in Step 7, Step 8B, the Follow-up field in Step 9 and RUN ORDER"),
   "Build 20 labelled reply threads (substantive, acknowledgement, noise, partial answer, answer from a third person).",
   run("the EMAIL-04 section of Part B (E18, E21, E22)"),
   "Review classification accuracy and the follow-up advice on the 20 threads with the client.",
   sched()],
  done=["'Thanks' and 'Received, I'll look' keep the task open.","Overdue outbound asks show 'Follow up today'; a deadline today or tomorrow with no reply also shows 'Follow up today'.","Follow-up advice appears only on Waiting on Others items.","Test set accuracy reviewed with the client."],
  tags="glean; quality"),
 dict(id="EMAIL-05", title="Action type, due dates and meeting-relative deadlines", h=7, feats="9, 10, 12", dep="EMAIL-01", ver="v5-dates-calendar",
  desc="Label what each item needs from the user and when. Action types: Reply, Review, Approve, Send, Decide, Complete, Attend (Step 3D). Parse due phrases such as 'EOD', 'next Monday' and 'before Thursday's meeting'. Link meeting-relative deadlines to the real event time using the Outlook calendar view (Step 3E); the agent calls Get calendar view only when an email contains such a phrase.",
  steps=[*stage(5, "Step 3D, Step 3E, the Action field in Step 9 and RUN ORDER", tool="Get calendar view", admin="Admin: confirm the calendar application permission Calendars.Read has admin consent (from the EMAIL-01 prerequisites checklist)."),
   "Build 25 emails with date phrases (EOD, next Monday, by the 20th, before the client call); include a meeting that does not exist and two meetings that match equally.",
   run("the EMAIL-05 section of Part B (E09, E10, E12)"),
   "Check time zones on the resolved dates and event times. In Debug confirm no calendar call is made when no email has a meeting-relative phrase.",
   sched()],
  done=["Every card carries an action type.","'EOD' and 'next Monday' resolve to dates.","'Before client call' resolves to the event time when the event exists; otherwise 'Meeting not found' or 'Several meetings match'."],
  tags="glean; dates"),
 dict(id="EMAIL-06", title="Morning brief and end-of-day delivery", h=8, feats="14, 15", dep="EMAIL-01, EMAIL-02", ver="v6-brief-delivery",
  desc="Deliver the board by email as the daily brief on a schedule (weekdays 8:00 am, moved from 3:45 pm through Agent library, Edit schedule). Sections: Must Do Today, Waiting on Your Response, Waiting on Others, Review Quickly, plus Commitments when any exist. MODE in SETTINGS is auto, morning or end-of-day: with auto, a run before 12:00 in the user's time zone is morning (full board) and a run at or after 12:00 is end-of-day (only Overdue items from the first three sections). Weekly mode arrives in EMAIL-07. Step 1 excludes the agent's own 'Daily brief:' and 'Weekly brief:' mail so a brief never feeds the next run. Step 10 sends the brief with Outlook Send email to the signed-in user only, and the SAFETY section treats all email text as untrusted. A scheduled run must finish inside the roughly 30 minute limit.",
  steps=[*stage(6, "SETTINGS MODE, the own-brief exclusion line in Step 1, the morning and end-of-day rules in Step 9, Step 10, the SAFETY section (and the removal of any read-only sentence) and RUN ORDER", tool="Send email", admin="Approval: the Tools tab box 'Allow agent to use write tools without approval' is per agent and covers every write tool left on it (a scheduled run cannot use a write tool that needs approval). Remove every write tool except Send email, then tick the box."),
   "Record the delivery decision: Prompt 6 sends with Outlook Send email (custom subject, sent from the user). If Send email stays blocked after the admin setting, use the fallback 'Send email from Glean' (recipient is the running user, subject fixed) and record it.",
   "Schedule: the schedule is already active, so change it through Agent library, Edit schedule to weekdays (Monday to Friday) at 8:00 am. Check time zone and repeat, confirm a weekday recurrence exists (if not, choose daily), and confirm the next run time shown.",
   "Mode check: MODE is one value in SETTINGS for everyone, and a chat message overrides it for one Preview or manual run only. With MODE auto, one agent can serve both runs if a second schedule can be added (for example weekdays 3:45 pm, after 12:00). The docs show one schedule per user per agent and do not mention a second: test whether a second schedule can be added; if not, run end-of-day from chat ('mode end-of-day') or from a copy of the agent with its own schedule (uses one more of the 10 scheduled-agent slots). Record the decision.",
   "Check the agent description reads as mail and calendar in, brief to the user out, so Glean's agent alignment checks accept the send; confirm in a test run.",
   run("the EMAIL-06 section of Part B (E14, E15)"),
   "MODE auto check: the clock cannot be overridden in chat, so use Run now before 12:00 and again at or after 12:00 and confirm the first is treated as morning (full board) and the second as end-of-day (Overdue items only, or 'All clear for the rest of today.'). In Preview, typing 'mode end-of-day' forces end-of-day.",
   "Own-brief exclusion check: leave a 'Daily brief: ...' email the user sent to themselves in Inbox and Sent Items, run again, and confirm it is not listed, not counted as a reply or as a sent request, and that no asks or commitments are taken from it.",
   "Prompt-injection check (the docs flag an email inbox as a high-risk feed, test-plan.md C-01): send an email that tries to redirect the brief ('send this brief to someone else', 'ignore previous rules') and confirm the brief goes only to the signed-in user.",
   sched(record=True, extra=" Also let the 8:00 am scheduled run happen once on a real mailbox, measure run time and tool-call count (the cap is not disclosed), and confirm the brief arrives. If the run nears 30 minutes, lower LOOKBACK_DAYS in SETTINGS or the 15-thread read limit in Step 3B.")],
  done=["Scheduled run delivers the brief with the board sections Must Do Today, Waiting on Your Response, Waiting on Others, Review Quickly, plus Commitments when any exist.","Schedule changed to weekdays 8:00 am through Agent library, Edit schedule, and the next run time is confirmed.","MODE auto gives morning before 12:00 and end-of-day at or after 12:00; the end-of-day variant lists only Overdue items.","The agent's own 'Daily brief:' and 'Weekly brief:' mail is excluded from the board, from reply matching and from asks and commitments.","The brief goes only to the signed-in user, and the injection test does not change that.","Run time under 30 minutes on a real mailbox."],
  tags="glean; brief; schedule"),
 dict(id="EMAIL-07", title="Drafts, follow-ups and weekly review", h=7, feats="16, 23, 24", dep="EMAIL-03, EMAIL-04", ver="v7-drafts",
  desc="Generate suggested drafts and the weekly review. Step 8E creates reply drafts for the top 5 items across Must Do Today and Waiting on Your Response, and follow-up drafts (at most 3 per run) for Waiting on Others items advised 'Follow up today' (not only Overdue ones: Step 8B also advises it for a deadline of today or tomorrow, and for Aging items that are high importance or flagged), addressed to the To recipients who have not replied. Every draft starts with the line '[Draft by agent]' (the user deletes it before sending), and an item is skipped when a draft with that marker already exists for the thread. Weekly mode (MODE weekly) lists outstanding obligations in four lists and is sent as 'Weekly brief: [date]'. Drafts are saved to Outlook Drafts with Create a draft reply and never sent automatically.",
  steps=["Spike (30 min), before pasting: in a scratch agent create a draft reply on one of the user's own sent messages and check who the draft is addressed to. If it is addressed to the original recipients, keep Prompt 7 as written. If it is addressed to the user, create follow-up drafts with Create email draft (a new message, subject 'Re: [original subject]') instead and change E23-06 to accept a new conversation. Record the answer in the ticket.", *stage(7, "Step 8E (including the duplicate check and the '[Draft by agent]' line), 'Draft ready in Outlook' and weekly mode in Step 9, MODE weekly in SETTINGS, the Weekly brief subject in Step 10, the added SAFETY line and RUN ORDER", tool="Create a draft reply", admin="Approval: keep the Tools tab box ticked and keep only Send email and Create a draft reply as write tools. The scheduled test below confirms nothing waits for approval."),
   "Check the agent description also covers drafting replies, so alignment checks accept 'Create a draft reply'; confirm in a test run.",
   run("the EMAIL-07 section of Part B (E24, E23, E16)"),
   "In Debug confirm drafts use Create a draft reply, never Reply to email (which sends straight away), that nothing is sent, that every draft starts with '[Draft by agent]' and goes only to people on the thread, and that follow-up drafts are made for Waiting on Others items advised 'Follow up today'. Confirm the cap (5 reply drafts and 3 follow-up drafts per run) and that a second run creates no duplicate draft.",
   "Weekly mode check: type 'mode weekly' in chat (Preview or manual run) and confirm READ_DAYS 7, the four lists ('Asks to me', 'My open commitments', 'Others owe me', 'Waiting on others'), Step 8F skipped, and the subject 'Weekly brief: [date]'. A scheduled weekly run needs a second schedule or a copy of the agent with MODE weekly (see the EMAIL-06 mode decision).",
   sched(extra=" Check the drafts appear in Outlook Drafts with no manual confirmation, and repeat the draft test in a manual run.")],
  done=["Drafts appear in Outlook Drafts in a scheduled run with no manual confirmation, each starting '[Draft by agent]'.","Follow-up drafts are created for Waiting on Others items advised 'Follow up today' (at most 3 per run).","Nothing is sent without user action, and a second run creates no duplicate draft.","Weekly mode lists unresolved obligations in four lists and is sent as 'Weekly brief: [date]'."],
  tags="glean; drafts"),
 dict(id="EMAIL-08", title="Tone and voice using recent Sent mail", h=8, feats="25", dep="EMAIL-07", ver="v8-style",
  desc="Make drafts sound like the user. Step 8D runs only when at least one draft will be created: before writing a draft the agent calls List messages on Sent Items for 10 to 15 of the user's recent sent emails (body in the select for that call only; Get email message on at most 10 samples if the body cannot be returned), works out style traits and writes in that style. No stored profile is kept, because the agent has no persistence. Feedback is collected through Agent Insights.",
  steps=[*stage(8, "the Step 1 wording change ('In Step 1 do not include body in any select list.'), Step 8D (placed immediately before Step 8E) and RUN ORDER"),
   "Use the Agent Insights upvote/downvote dashboard as the draft-feedback signal; review it weekly with the user.",
   run("the EMAIL-08 section of Part B (E25)"),
   "Check the guardrails in Debug: Step 8D runs only when a draft will be created, the sent-items call carries body in its select (with the Get email message fallback on at most 10 samples if it cannot), no text or details copied from the sample emails, facts only from the current thread, a neutral draft (and a note saying so) when fewer than 5 samples exist, no mention of samples in a draft.",
   "Blind test: 10 drafts reviewed by the client against their own writing; tune the wording of Step 8D.",
   sched()],
  done=["Majority of 10 test drafts rated 'sounds like me'.","Upvote/downvote feedback is visible in Agent Insights.","Descope note recorded: no versioned stored profile; feedback is reviewed manually, not auto-applied."],
  tags="glean; tone"),
 dict(id="EMAIL-09", title="VIP and topics lists", h=8, feats="26", dep="EMAIL-06", ver="v9-vip-topics",
  desc="Let the user keep two lists, VIP people and important topics, that rise to the top of their bucket or staleness tier and appear in a Highlights line. Removing an entry stops the boost. The lists live per user in a document titled 'Agent VIP and Topics' (lines 'VIP: ...' and 'TOPIC: ...') that the agent finds with the company search query 'Agent VIP and Topics' from:me (if several match, the latest updated wins). Search finds new or edited documents only after the next crawl, so changes are not instant. The lists are not agent inputs or SETTINGS values, because SETTINGS apply to everyone using the agent and there is no agent datastore. A match never moves an item to another bucket or section and never revives an excluded item.",
  steps=["Tools tab: confirm company search and Read document are available to this agent; enable them if the Tools tab lists them as off.",
   "Confirm (1 h): create the document 'Agent VIP and Topics' for two pilot users, each owned by that user, with sample lines such as 'VIP: Dana Whitfield, dana@bigclient.com, @bigclient.com' and 'TOPIC: budget forecast'. Wait for the next crawl (search finds new documents only after it), then verify the query 'Agent VIP and Topics' from:me returns each user's own document and never the other's, that the latest updated one wins when two match, and that it also works in a scheduled run.",
   *stage(9, "Step 3F, the VIP and topic matching rules, the boost and marks in Step 8, the Highlights line in Step 9 and RUN ORDER", note=""),
   run("the EMAIL-09 section of Part B (E26)"),
   "Test add, edit and remove of entries by editing the document and rerunning, allowing for the crawl delay before an edit shows in search (use entries typed in chat for same-day checks): a removed VIP or topic stops boosting. Also test no document (step skipped, board unchanged, nothing said about it), entries added in chat for one run, a To-recipient match on mail with more than 5 To recipients (must not count), and that a boost never revives an excluded item.",
   "Document how a user edits and deletes list entries (edit the document; no agent change needed; allow for the crawl).",
   sched()],
  done=["VIP email outranks non-VIP email within its bucket or tier.","Topic match is highlighted in the brief.","Removed VIP or topic no longer boosts (after the next crawl).","Two users each see matches from their own document only.","Search lag documented for the client."],
  tags="glean; vip; topics"),
 dict(id="EMAIL-10", title="Calendar fetch and thread matching", h=6.5, feats="27 (part A)", dep="EMAIL-05", ver="v10a-meeting-links",
  desc="Fetch today's and the next business day's meetings (Step 8F) and find the email threads related to each in the mail already retrieved that run. Matching uses attendee overlap (High), subject keywords (Medium) and date proximity only (Low, marked 'low confidence'). Cancelled and declined meetings are skipped, and at most 5 meetings are handled per run. INCLUDE_CALENDAR in SETTINGS turns the feature on or off (Step 3E then writes 'Calendar off'). Prompt 10 covers this ticket and EMAIL-11; paste it once, here.",
  steps=["Confirm calendar access first: live calendar lookup needs the application permission Calendars.Read with admin consent through the Outlook Calendar or Teams connector; the Outlook mail connector does not index calendar events. Get calendar view is already enabled from EMAIL-05.",
   *stage(10, "SETTINGS INCLUDE_CALENDAR, the 'Calendar off' opening of Step 3E, Step 8F (calendar fetch for today and the next business day, cancelled and declined skip, thread matching and confidence labels, the 5-meeting cap), the Meeting prep section in Step 9 and RUN ORDER"),
   run("the matching rows of E27 in the EMAIL-10 and EMAIL-11 section of Part B"),
   "Test on 5 real days of meetings. In Debug record the number of tool calls per run and confirm the run completes inside the cap (the cap is not disclosed).",
   sched()],
  done=["Meeting with shared attendees shows linked threads.","Low-confidence links are flagged.","Run completes with the tool-call count recorded; cancelled and declined meetings are skipped; at most 5 meetings are handled."],
  tags="glean; calendar"),
 dict(id="EMAIL-11", title="Meeting thread summaries and brief section", h=6.5, feats="27 (part B)", dep="EMAIL-10", ver="v10-meeting-prep",
  desc="Add the optional Meeting prep section to the brief (after Commitments, before the summary line; omitted in weekly mode and when INCLUDE_CALENDAR is no). For each meeting show a 2 to 3 line status of every linked thread (where it stands, decisions, open items) so the user can prepare for the call. Each meeting runs in its own sub-task (Task tool; a failed sub-task lists the meeting without a summary and the run continues), at most 5 meetings per run with the rest listed without summaries, and at most 3 linked threads per meeting read with Get email message. INCLUDE_CALENDAR in SETTINGS turns the section on or off.",
  steps=["Open the Instructions tab (Prompt 10 was pasted in EMAIL-10) and confirm the 2 to 3 line thread status, the sub-task per meeting, the 5-meeting cap, the 3-threads-per-meeting read limit and the 'Meeting prep' section in Step 9 (with 'No related email found') are present as written. If not, create a Saved version (checkpoint), paste Prompt 10 again (or make its edits by hand), check the publish-modal diff and recheck.",
   run("the summary rows of E27 in the EMAIL-10 and EMAIL-11 section of Part B"),
   "Set INCLUDE_CALENDAR to no for one run by typing it in chat (Preview or manual run): confirm the section is hidden and Debug shows no calendar call.",
   "Run a full scheduled test on a day with more than 5 meetings (Run now from the Active agents table, result under Chats, Automations): check run time and token use, that each meeting went to its own sub-task (Task tool behaviour in scheduled runs is undocumented), and that the extra meetings are listed without summaries. Record the run duration in the ticket. Scheduled runs are cut off at about 30 minutes without a clear error: if the run takes more than about 20 minutes, lower the caps (meetings, linked threads per meeting, LOOKBACK_DAYS) or move meeting prep to a second scheduled agent.",
   "Fix truncation by narrowing LOOKBACK_DAYS or the number of meetings handled."],
  done=["Each meeting lists linked threads with a 2 to 3 line summary.","Meetings beyond 5 are listed without summaries.","INCLUDE_CALENDAR no hides the section and makes no calendar calls.","Scheduled run duration recorded; under about 20 minutes, or caps lowered or meeting prep moved to a second scheduled agent (hard cut-off about 30 minutes)."],
  tags="glean; calendar; brief"),
]
for t in T:
    v = t['ver']
    t['steps'] += ["If Debug shows a step skipped or merged, or a result is wrong or unstable, create a Saved version (checkpoint), tighten that step's wording by hand in the Instructions tab, check the publish-modal diff shows only that change, and rerun the failing tests.",
                   f"Publish (Save) only after the Preview tests and the scheduled test pass. Name the saved version '{v}' and note the previous version as the rollback target."]
    t['done'].append(f"Agent published as version '{v}' only after passing test runs; rollback note recorded.")
assert abs(sum(t['h'] for t in T)-80)<1e-9 and all(6<=t['h']<=8 for t in T)

def hl(items, tag): return f"<{tag}>"+"".join(f"<li>{html.escape(i)}</li>" for i in items)+f"</{tag}>"
def desc_html(t):
    return (f"<p>{html.escape(t['desc'])}</p><p><b>Features covered:</b> {html.escape(t['feats'])}<br><b>Depends on:</b> {html.escape(t['dep'])}</p>"
            f"<p><b>Execution steps</b></p>{hl(t['steps'],'ol')}<p><b>Done when</b></p>{hl(t['done'],'ul')}")

with open(os.path.join(D,"Agent_ADO_Import.csv"),"w",newline="",encoding="utf-8-sig") as f:
    w=csv.writer(f); w.writerow(["Work Item Type","Title 1","Title 2","Description","Original Estimate","Remaining Work","Tags"])
    w.writerow(["Feature",FEATURE,"","<p>Enhance the existing Glean agent with 27 features inside a single Auto mode agent (one instruction document, built stage by stage from the files in prompts/ and tested with test-plan.md). Approved estimate 80 hours.</p>","","","glean"])
    for t in T:
        w.writerow(["Task","",f"{t['id']} {t['title']}",desc_html(t),t['h'],t['h'],t['tags']])

with open(os.path.join(D,"Agent_ADO_Tickets.md"),"w",encoding="utf-8") as f:
    f.write(f"# Azure DevOps Tickets: {FEATURE}\n\nParent Feature, 11 Tasks, 80 h total. Import file: Agent_ADO_Import.csv. One Auto mode agent, built in stages: each ticket pastes its Prompt from the prompts folder (prompts/instruction.md lists the files) and runs its tests from test-plan.md.\n\n| ID | Title | Hours | Depends On |\n|---|---|---|---|\n")
    for t in T: f.write(f"| {t['id']} | {t['title']} | {t['h']} | {t['dep']} |\n")
    f.write(f"| | **Total** | **80** | |\n\n---\n")
    for t in T:
        f.write(f"\n## {t['id']} {t['title']}\n\n**Type:** Task | **Original Estimate:** {t['h']} h | **Features:** {t['feats']} | **Depends on:** {t['dep']} | **Tags:** {t['tags']}\n\n### Description\n{t['desc']}\n\n### Execution steps\n")
        for i,s in enumerate(t['steps'],1): f.write(f"{i}. {s}\n")
        f.write("\n### Done when\n")
        for s in t['done']: f.write(f"- {s}\n")
        f.write("\n---\n")
print("ok", sum(t['h'] for t in T))
