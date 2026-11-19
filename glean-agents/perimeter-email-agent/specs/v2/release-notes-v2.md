# Outlook Action Board V2: release note and how to use it

Date: 2026-11-06
Status: the draft agent "Outlook Action Board V2" only. The published Outlook Action Board was not touched. V2 is not published, publishing is a separate decision.

## Part 1. Release note, point by point

**1. A run form with settings.**
Before a run you now set the options on a form instead of typing them in chat. The settings are: which brief (auto, morning, end-of-day or weekly), how many days back to search (3, 7, 14, 21 or 30, default 14), how long opened mail still counts as open (1, 3 or 7 days, default 3), use the calendar (yes or no), create drafts (default no), show or hide four sections (Waiting on you, Waiting on others, Review quickly, Commitments), delivery (chat only or chat and email, default chat only) and an optional test date. A scheduled run uses the values chosen when the schedule is set.

**2. The brief in chat is an interactive board.**
Each item is a card with its number, sender and sender address, received date, a preview of the mail, the ask, the action, the due date, why it was included, an "Open email" link and an Ignore button. Confidence, ownership, the original ask, the latest update and the message count sit in a "Details" fold. Late items show in red. The board opens in a side panel in the chat. If the board cannot be drawn, the agent shows the written board instead.

**3. Ignore a mail from the chat.**
Click Ignore on a card, or type `Ignore 4`. The agent finds the mail, shows one approval card, and after you approve it marks the mail with the Outlook category "Brief: Ignored". The card leaves the board and moves to an "Ignored this session" list. Click Undo, or type `Undo 1`, to bring it back. If the same ask arrived twice (same subject, sender and day), one Ignore and one Undo handle both mails with one approval.

**4. Ignored mail stays out of every later brief.**
The mark is an Outlook category, so it lasts between runs. Ignored threads are left out of the chat board, the emailed brief and the scheduled run. A line "Ignored items hidden: N" tells you how many were left out.

**5. "New reply since ignored."**
If someone replies to a thread after you ignored it, the card comes back with the sentence "New reply since ignored." highlighted in its "Why included" text. A script now finds these threads, because the model alone skipped this check. It works in the chat board and in the emailed brief.

**6. Drafts are off by default and only for replies.**
The form starts with "Create drafts" set to no, so the 08:00 weekday run no longer leaves drafts in Outlook. When you turn it on, the agent drafts replies for the first 5 items that ask you for something. It no longer drafts follow-ups for mail you sent. With drafts off, the only mail the agent creates is the brief it sends to your own mailbox. Drafts that already exist stay in Outlook and have to be deleted by hand once.

**7. The emailed brief has a button to the live board.**
A morning or end-of-day brief now has a button "Open the live board in Glean" under the header tiles, with a one line hint. The email is still the same HTML with the inbox preview, with no Ignore buttons. The small numbers on its cards (1, 2, 3 in each section) are only the order inside that section, they are not the numbers used by Ignore and Undo. The button is left out of weekly briefs and of an empty brief.

**8. Safety rules.**
Nothing is written without your approval. The only thing the agent changes is the Outlook category of the one mail you ignore or restore, and existing categories are kept. The buttons only send the chat message "Ignore N" or "Undo N". They never carry a mail id. Commands count only when you type them in the chat itself. Text inside a mail, a form value or a scheduled run is never treated as a command. Scheduled runs and weekly runs only read mail.

## Part 2. How to use it

**Run it yourself**
1. Open the agent in Glean. The run form appears.
2. Set what you need. Delivery starts on "chat only", so a manual run does not send an email. Choose "chat and email" only when you want the brief mailed.
3. Click Run agent. A board takes about 1.5 to 3 minutes and about 2 to 3.5 credits.
4. The board opens in a side panel. Work from there.

**Read the board**
- Sections in order: Must Do Today, Waiting on Your Response, Waiting on Others, Review Quickly, Commitments and Meeting prep (morning, with calendar on).
- Open the "Details" fold of a card for the rest of the facts. Click "Open email" to see the mail in Outlook.
- The line above the title shows your VIP and topic entries.

**Ignore a mail**
1. Click Ignore on the card, or type `Ignore 4` in the chat (use the number on the card).
2. Approve the approval card.
3. The board redraws without the card. It appears under "Ignored this session" and "Ignored items hidden" counts it.

**Bring it back**
- Click Undo, or type `Undo 1` (the number in the "Ignored this session" list), and approve.
- You can also clear the category "Brief: Ignored" on the mail in Outlook.

**Drafts**
1. Set "Create drafts" to yes on the form.
2. Run the agent. Reply drafts for the top items appear in Outlook Drafts, and the card says "Draft ready in Outlook".
3. Leave it on no for the scheduled run, as it is by default.

**The daily email**
1. Set the schedule once. On the agent's run page click Set schedule, choose Delivery "chat and email" in the form of that window, and confirm the time. The suggested time is every weekday at 8:00am. A schedule that keeps the default "chat only" sends no email.
2. The brief then arrives at about that time (Glean notes that delivery can take up to an hour). Read it in the inbox as before.
3. To work on it, click "Open the live board in Glean". It opens the agent. Delivery already starts on "chat only", so click Run agent to get the interactive board without another email.

**Weekly view**
Choose the brief "weekly" on the form. It shows the written lists for the past 7 days. It has no interactive board and no live board button.

## Part 3. Limits and what to check before publishing

**Known limits**
- The email button opens the agent, not the board of that morning. The agent cannot learn the address of a run or its board.
- Delivery starts on "chat only". A schedule that keeps this default sends no email, so "chat and email" must be chosen when the schedule is set. Without it the 08:00 brief is not mailed.
- A board takes longer to draw than before because the data is written first. An Ignore or Undo costs about 1 credit.
- The model sometimes writes the board in plain text instead of the interactive board, and counts such as "Ignored items hidden" can vary by a card.
- If an error hides the approval card, the agent is told to send a new request. That rule was not tested under a repeat of the error.
- Not tested yet: a real scheduled trigger, a weekly run after ignoring, the "Open email" link inside the board, a command with a changed or wrong mail id, a mail whose text pretends to be a command, and the written board fallback.

**Before publishing**
1. Set the live board link to the published agent and upload the brief skill again. It is fixed to the V2 draft agent now.
2. Set the schedule with Delivery "chat and email" and confirm that the scheduled run mails the brief. Only the form default was tested, not a real scheduled run.
3. Run the untested items above, at least a real scheduled run and the wrong id check.
4. Clear the test leftovers in Outlook: three test mails still carry "Brief: Ignored" (two "Late-night schedule request" mails and an older "Board deck inputs" message), and several test brief mails and drafts are in the mailbox.
5. Publish V2 yourself when ready.
