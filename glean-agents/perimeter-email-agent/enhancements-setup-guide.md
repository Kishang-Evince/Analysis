# Enhancements setup guide (27 enhancements)

One short section per enhancement: what it does, where it lives, what to configure, how to switch it on, how to check it.

All text lives in main agent text, stage 39 (hash 44d0cda3, same text as stage 37), and sub-agent texts listed in the writing style guide, section 5. Steps named like `Step 3C`. Find by name in main text.

## A. Shared setup (do once)

1. Open the Outlook Action Board agent in the Glean builder (Auto mode). Work in the draft and save a version before each edit.
2. Settings block at the top of the main text. Chat can override a value for one Preview or manual run.

| Setting | Value | Default | Used by |
|---|---|---|---|
| AS_OF_DATE | blank or YYYY-MM-DD | blank | 11 and every date test |
| LOOKBACK_DAYS | days | 14 | 13 |
| READ_DAYS | days, max LOOKBACK_DAYS | 3 | 13, 16 |
| MODE | auto, morning, end-of-day, weekly | auto | 14, 15, 16 |
| INCLUDE_CALENDAR | yes or no | yes | 12, 27 |

3. Tools on the main agent: Outlook List messages, Get email message and Get calendar view. Main holds no write tool, so it needs no approval box. Send email and Get outlook profile belong to the sub-agent brief-builder, which renders the brief with the skill brief-render.
4. Sub-agents: draft-writer, meeting-prep, notes-keeper, style-profiler, brief-builder. Tools per sub-agent are in the writing style guide, section 4. Write approval box "Allow agent to use write tools without approval" (checked 2026-10-23): unticked on notes-keeper and style-profiler, so approval card shows before workbook write. Ticked on draft-writer and brief-builder, no click. meeting-prep has no write tool.
5. Trigger: schedule weekdays at 8:00 am in the user's time zone, plus chat.
6. Test mail: in `test-mailer/` run `npm run send -- --group E01 --tag "[run1]"` (change E01 to the enhancement number, two digits). Preview first with `npm run dry-run -- --group E01`.
7. Enhancements 2, 22, 23, 25 have no script mail (outbound only). `Unknown: group E22` and 0 mail preview for E02 are normal. Group name only names test plan. User sends mail from Outlook first. Other groups print manual Outlook steps like "Reply from Outlook" (E01, E12, E17 to E21). `npm run dry-run -- --group E01` shows them.
8. Run the board in Preview. Open Debug and confirm the step ran. Publish only when you decide.

## B. Per enhancement

### 1. Reply Is Not Task Completion
- **Does:** a reply that only says "thanks" or "will look" does not close the ask.
- **Where:** Step 6B, Step 4B, Step 2A (PENDING state).
- **Config:** tool Get email message (Step 3B reads full text).
- **Steps:** keep the three steps as in the main text, add the tool, seed group E01.
- **Check:** "Thanks" and "Received, I'll look" keep the card open.

### 2. My Commitments
- **Does:** finds what the user promised in sent mail.
- **Where:** Step 6C, Commitments section in Step 9.
- **Config:** Get email message.
- **Steps:** send promise mails from Outlook first (test plan E02, no script mail), then run board.
- **Check:** each commitment shows the right owner and status.

### 3. Commitments by Others
- **Does:** finds what others promised the user.
- **Where:** Step 6C.
- **Config:** Get email message.
- **Steps:** seed group E03, run the board.
- **Check:** the promise appears with the promiser as owner.

### 4. Commitment Status Tracking
- **Does:** gives each commitment a status worked out again every run.
- **Where:** Step 6D.
- **Config:** none. No stored state, so Snoozed and Delegated are not offered.
- **Steps:** seed group E04, run the board twice.
- **Check:** two runs give the same result.

### 5. One Action Card per Thread
- **Does:** one card for each conversation.
- **Where:** Step 9 (one card per conversationId), grouping from Step 1.
- **Config:** none.
- **Steps:** seed group E05.
- **Check:** a thread with 3 or more messages gives one card.

### 6. Original Ask + Latest Update
- **Does:** each card shows the first ask and the newest update with dates.
- **Where:** Step 9 card fields "Original ask" and "Latest update".
- **Config:** none.
- **Steps:** seed group E06.
- **Check:** both lines are on the card.

### 7. Multiple Ask Extraction
- **Does:** splits one mail into separate asks, the main ask on top, the rest under "More asks".
- **Where:** Step 3C.
- **Config:** none.
- **Steps:** seed group E07.
- **Check:** a mail with three requests gives three asks.

### 8. Better Semantic Ask Detection
- **Does:** catches indirect asks such as "Need your eyes on this" or "Thoughts?".
- **Where:** Step 3 signals and Step 3C.
- **Config:** none.
- **Steps:** seed group E08.
- **Check:** indirect asks reach the board, plain FYI mail does not.

### 9. Action Type Detection
- **Does:** labels each card Reply, Review, Approve, Send, Decide, Complete or Attend.
- **Where:** Step 3D.
- **Config:** none. Default is Reply.
- **Steps:** seed group E09.
- **Check:** every card has an Action line.

### 10. Better Due-Date Extraction
- **Does:** reads phrases such as "EOD" and "next Monday" into a due date.
- **Where:** Step 3D, shown on the card Due line.
- **Config:** none.
- **Steps:** seed group E10.
- **Check:** the Due line shows a date and "passed" for old dates.

### 11. Convert Relative Dates
- **Does:** turns "tomorrow" or "Friday" into a date from the day the mail was sent.
- **Where:** Step 1B.
- **Config:** AS_OF_DATE for tests, or put AS_OF_DATE and a date in chat. Chat overrides a setting for one run.
- **Steps:** seed group E11, run with a fixed date.
- **Check:** the date matches the sent date plus the phrase.

### 12. Meeting-Dependent Deadlines
- **Does:** "before our client call" becomes the meeting start time.
- **Where:** Step 3E.
- **Config:** tool Get calendar view (next 7 days, only when a mail has such a phrase). INCLUDE_CALENDAR yes. Calendar needs the Calendars.Read permission through the admin.
- **Steps:** add the tool, seed group E12, create the matching meeting.
- **Check:** the Due line shows the meeting time. With INCLUDE_CALENDAR no it shows "Calendar off".

### 13. Longer Inbound Lookback
- **Does:** reads the last 14 days, paged when a query is full.
- **Where:** Step 1.
- **Config:** LOOKBACK_DAYS 14, READ_DAYS 3. A blank, zero or negative value falls back to 14 and the board says so.
- **Steps:** seed group E13. The bulk seeds `seed:e13-bulk80` and `seed:e13-bulk-topup` test paging.
- **Check:** older unread mail inside the window is listed.

### 14. Morning Briefing
- **Does:** before 12:00 the run is a morning brief, emailed to the user.
- **Where:** MODE, Step 9, Step 10 and the brief-builder sub-agent.
- **Config:** MODE auto or morning. Sub-agent brief-builder: tools Get outlook profile and Send email only, "Allow agent to use write tools without approval" ticked, no knowledge, text `specs/stage-38-brief-builder.md`, skill `brief-render` linked to brief-builder only (folder `skills/brief-render/`, zip `skills/brief-render.zip`, the fragments are in its `assets/`). The model writes a JSON file and the skill script makes the HTML. Schedule weekdays 8:00 am.
- **Steps:** set the schedule, run now once, read the result.
- **Check:** one brief arrives in the user's own inbox and nobody else gets mail.

### 15. End-of-Day Review
- **Does:** from 12:00 the run is an end-of-day review.
- **Where:** MODE, Step 9, Step 10.
- **Config:** MODE auto or end-of-day.
- **Steps:** run in Preview after noon, or type "MODE end-of-day".
- **Check:** the title says End-of-day, the brief arrives.

### 16. Weekly Outstanding Review
- **Does:** four lists for the past 7 days, unresolved items only.
- **Where:** MODE weekly in Step 9 and Step 10.
- **Config:** MODE weekly (auto never picks it). It sets READ_DAYS and LOOKBACK_DAYS to 7 for the run.
- **Steps:** type "MODE weekly" in chat.
- **Check:** lists "Asks to me", "My open commitments" and the others. No drafts and no calendar section.

### 17. Per-Recipient Response Tracking
- **Does:** checks each To recipient of a sent mail on its own.
- **Where:** Step 2B and Step 4.
- **Config:** none.
- **Steps:** seed group E17.
- **Check:** one of two recipients replied, the card stays open for the other.

### 18. Substantive Reply Detection
- **Does:** tells a real answer from noise.
- **Where:** Step 4B.
- **Config:** none.
- **Steps:** seed group E18.
- **Check:** a real answer closes the ask, "OK" does not.

### 19. Out-of-Office Detection
- **Does:** out-of-office replies do not resolve a task.
- **Where:** Step 2C, judged from the text.
- **Config:** none.
- **Steps:** seed group E19.
- **Check:** the sent ask stays open after an out-of-office reply.

### 20. Auto-Reply Detection
- **Does:** automatic replies and receipts do not resolve a task.
- **Where:** Step 2C, judged from the text.
- **Config:** none.
- **Steps:** seed group E20.
- **Check:** the ask stays open after an automatic reply.

### 21. Acknowledgement vs Answer
- **Does:** "got it" leaves an ask pending, an answer closes it.
- **Where:** Step 4B and Step 6B.
- **Config:** none.
- **Steps:** seed group E21.
- **Check:** an acknowledgement keeps the card, an answer removes it.

### 22. Smart Follow-Up Recommendation
- **Does:** advice for each sent ask: Follow up today, Follow up this week or Not yet.
- **Where:** Step 8B.
- **Config:** none.
- **Steps:** send asks from Outlook first (test plan E22, no script mail), run board.
- **Check:** an overdue sent ask shows "Follow up today".

### 23. Draft Follow-Up
- **Does:** writes a follow-up draft to the recipients still waiting.
- **Where:** Step 8E and the draft-writer sub-agent (tool Create email draft, subject with one "Re:").
- **Config:** draft-writer tools as in the writing style guide. Write approval ticked, no click. Drafts only, never sent. Max 5 items plus 3 follow-ups per run get a draft.
- **Steps:** send asks from Outlook first (test plan E23, no script mail), run board.
- **Check:** a draft appears in Outlook Drafts. A thread that already has a draft is skipped.

### 24. Draft Reply
- **Does:** writes a reply draft in the thread to the original sender only.
- **Where:** Step 8E and draft-writer (tool Create a draft reply).
- **Config:** same as 23.
- **Steps:** seed group E24, run the board.
- **Check:** a draft reply appears. A request for a password gets no draft.

### 25. Tone & Voice Profile
- **Does:** drafts sound like the user.
- **Where:** style-profiler, notes-keeper question, draft-writer, main routing in Step 3F.
- **Config:** workbook cells D1:E60 (the lists stay in A1:B2, A1:B100 is reserved for list values), tools and texts in `writing-style-setup-guide.md`.
- **Steps:** seed about 15 varied sent mails from Outlook first (test plan E25, no script mail). First chat shows question, user says yes, approve card to save table, then say what to change.
- **Check:** drafts use the saved greeting and sign-off. No style saved means a neutral draft and a note on the board.

### 26. VIP & Topics Lists
- **Does:** VIP and topic mail rises to the top of its section with a Highlights line.
- **Where:** Step 3F, notes-keeper, workbook cells B1 and B2.
- **Config:** B1 holds the VIP entries and B2 the topics, comma separated. A VIP match is by address, alias, domain or display name. A To-recipient match counts only for 5 or fewer To recipients.
- **Steps:** say "add X to my VIP list" or "add Y to my topics", approve the card. Seed group E26.
- **Check:** a VIP mail outranks a normal one, a removed VIP stops boosting.

### 27. Calendar Summary (Meeting Prep)
- **Does:** for today and the next business day, a short status of the threads linked to each meeting.
- **Where:** Step 8F and the meeting-prep sub-agent.
- **Config:** main reads calendar with tool Get calendar view (today and next business day). meeting-prep has no calendar tool, reads mail only (Get outlook profile, List messages, Get email message, max 3 threads). INCLUDE_CALENDAR yes. Max 5 meetings per run, rest listed with title and time only. Skipped in weekly and end-of-day runs.
- **Steps:** seed group E27 with a meeting that shares attendees, run a morning board.
- **Check:** the Meeting prep section lists each meeting with linked threads. With INCLUDE_CALENDAR no the section is gone.

## C. Limits

- A scheduled run is cut off after about 30 minutes. Caps in text: 15 full-message reads, 5 meetings, 5 drafted items plus 3 follow-ups.
- Snoozed and Delegated commitments need stored state and are not built.
- Tests that pass in Preview can differ in a scheduled run, because a scheduled run uses the saved settings and no chat message.
