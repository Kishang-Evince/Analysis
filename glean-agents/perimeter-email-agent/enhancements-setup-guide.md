# Enhancements setup guide (27 enhancements)

One short section per enhancement: what it does, where it lives, what to configure, how to switch it on, how to check it.

All text lives in the main agent text `specs/stage-31.md` and the sub-agent texts listed in `writing-style-setup-guide.md` section 5. Steps are named like `Step 3C`. Find them by that name in the main text.

## A. Shared setup (do once)

1. Open the Outlook Action Board agent in the Glean builder (Auto mode). Work in the draft and save a version before each edit.
2. Settings block at the top of the main text. Chat can override a value for one Preview or manual run.

| Setting | Value | Used by |
|---|---|---|
| AS_OF_DATE | blank or YYYY-MM-DD | 11 and every date test |
| LOOKBACK_DAYS | 14 | 13 |
| READ_DAYS | 3 | 13, 16 |
| MODE | auto, morning, end-of-day, weekly | 14, 15, 16 |
| INCLUDE_CALENDAR | yes or no | 12, 27 |

3. Tools on the main agent: Outlook List messages, Get email message and Get calendar view. Main holds no write tool, so it needs no approval box. Send email and Get outlook profile belong to the sub-agent brief-builder.
4. Sub-agents: draft-writer, meeting-prep, notes-keeper, style-profiler, brief-builder. Tools per sub-agent are in `writing-style-setup-guide.md` section 4.
5. Trigger: schedule weekdays at 8:00 am in the user's time zone, plus chat.
6. Test mail: in `test-mailer/` run `npm run send -- --group E01 --tag "[run1]"` (change E01 to the enhancement number, two digits). Preview first with `npm run dry-run -- --group E01`.
7. Seeds for enhancements 2, 22, 23 and 25 are mail the user sends from Outlook first. The seed list prints the steps.
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
- **Steps:** send the promise mails from Outlook first (group E02), then run the board.
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
- **Config:** AS_OF_DATE for tests, or type "as of YYYY-MM-DD" in chat.
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
- **Config:** MODE auto or morning. Sub-agent brief-builder: tools Get outlook profile and Send email only, "Allow agent to use write tools without approval" ticked, no knowledge, text `specs/stage-37-brief-builder.md`, templates in `templates/brief/compact/`. Schedule weekdays 8:00 am.
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
- **Steps:** send the asks from Outlook first (group E22), run the board.
- **Check:** an overdue sent ask shows "Follow up today".

### 23. Draft Follow-Up
- **Does:** writes a follow-up draft to the recipients still waiting.
- **Where:** Step 8E and the draft-writer sub-agent (tool Create email draft, subject with one "Re:").
- **Config:** draft-writer tools as in the writing style guide. Drafts only, never sent.
- **Steps:** send the asks from Outlook first (group E23), run the board.
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
- **Config:** workbook cells AD1:AE60, tools and texts in `writing-style-setup-guide.md`.
- **Steps:** first chat shows the question, the user says yes, review the saved table, say what to change.
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
- **Config:** tool Get calendar view. INCLUDE_CALENDAR yes. At most 5 meetings per run. Skipped in weekly and end-of-day runs.
- **Steps:** seed group E27 with a meeting that shares attendees, run a morning board.
- **Check:** the Meeting prep section lists each meeting with linked threads. With INCLUDE_CALENDAR no the section is gone.

## C. Limits

- A scheduled run is cut off after about 30 minutes. Caps in the text: 15 full-message reads, 5 meetings.
- Snoozed and Delegated commitments need stored state and are not built.
- Tests that pass in Preview can differ in a scheduled run, because a scheduled run uses the saved settings and no chat message.
