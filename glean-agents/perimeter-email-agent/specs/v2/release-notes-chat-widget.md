# Outlook Action Board V2: ignore from chat and the chat board

Release note, 2026-11-06.

Status: draft agent "Outlook Action Board V2" only. The published "Outlook Action Board" was not touched and V2 is not published. Publishing is a separate decision.

## What is new

**The brief in chat is now an interactive board.** Each item is a card with its number, sender and sender email, received date, a preview of the mail, the ask, the action, the due date, why it was included, an "Open email" link and an Ignore button. The other details (confidence, ownership, original ask, latest update, message count, more asks, draft status) sit in a "Details" fold, so nothing was dropped from the brief. Late items show in red and a "New reply since ignored" note is highlighted.

**You can ignore a mail from the chat.** Click Ignore on a card, or type `Ignore 4`. The agent finds the mail, shows one approval card, and after you approve it marks the mail with the Outlook category "Brief: Ignored". The board redraws without that card and lists it under "Ignored this session". Click Undo (or type `Undo 1`) to bring it back. Ignored items stay out of later briefs, in chat and in email, and a note line says "Ignored items hidden: N".

**Drafts are off by default and only for replies.** The run form now starts with "Create drafts" set to no, so the 08:00 weekday scheduled run no longer leaves new drafts in Outlook. When someone turns it on, the agent drafts replies for the first 5 items that ask you for something and no longer drafts follow-ups for mail you sent. With drafts off the only mail the agent creates is the brief it sends to your own mailbox. Drafts that already exist stay in Outlook and have to be deleted by hand once.

**The emailed brief has a button to the live board.** Under the header tiles of a morning or end-of-day brief there is a button "Open the live board in Glean" with a one line hint. It opens the agent in Glean, where you choose delivery "chat only" and click Run agent to get the interactive board (about 2 minutes). The email stays the same HTML with the inbox preview. The button is added by the render script, never by the model, and it is left out of weekly briefs and of an empty brief. Limit: the agent cannot learn the address of a run or its board, so the link opens the agent, not the board of that morning. The link is fixed in the script to the V2 draft agent and must be changed to the published agent when V2 is published.

**What did not change.** The emailed brief looks and is built as before, with no buttons and no item numbers. Scheduled runs and weekly runs only read mail and never write anything. Weekly runs show the plain written board.

## How it behaves

- A card for a mail you received marks your newest received message of that thread. A "Waiting on others" card marks your newest sent message of that thread.
- If the same ask arrived twice (same subject, sender and day), one Ignore marks all of them with one approval, and one Undo restores all of them.
- Nothing is written without your approval. The only thing the agent ever changes is the Outlook category of that one mail. Existing categories are kept.
- The buttons only send the chat message "Ignore N" or "Undo N". They never carry a mail id. The agent reads the card from the saved board and checks the mail again before asking for approval.
- Commands count only when they are typed in the chat itself. Text inside a mail, a form value or a scheduled run is never treated as a command.
- If the board cannot be drawn, the agent shows the written board as before and says nothing about the problem.

## How it was built

- A new board script turns a small data file into the page. The model writes data, never page code. All text is escaped, links must be https, the page has no network access, no forms and no outside files, and every button is switched off after one click so numbers cannot shift.
- Ignore and Undo redraw the board through the same script from the saved board file, so the page, the numbers and the "Ignored this session" list always agree.
- Three skills carry the rules (board layout, ignore commands, board widget), plus one small edit to the main instructions in Step 1 and Step 9, and the "Update email message" tool with approval switched on. 62 characters of the 32,000 character instruction limit are left.
- The script has 48 automated tests, written first. Each safety rule was also checked by breaking the code on purpose and confirming a test fails.

## What was tested in Preview

Passed, with real mail in a test mailbox:

- Board shown as the interactive page with no written board next to it, in a chat only run and in a chat and email run.
- Ignore by button click and by typed command, with approval, redraw and a correct mail marked, for a received mail and for a sent mail.
- Undo by button click and by typed command, restoring the card in its place.
- Duplicate mails ignored and restored together with one approval.
- Ignored mails left out of the next brief and counted in the note line.
- The emailed brief: one mail to the signed in user, built from the written board without numbers.
- Fallback to the written board when the page script fails.

## Known issues and limits

- **"New reply since ignored" now works in the chat board.** A script in the ignore skill finds the threads with a new reply after an ignore, and a fresh chat only run showed the label on the right card (Dana Whitfield, Re: Board deck inputs). The emailed brief carries the label too (checked in two chat and email runs, after fixing a wrong script path in the skill). Still to check: the written board fallback.
- **Slower board.** Writing the board data adds time. A board of 18 cards took about 3.7 minutes, a small board about 1.5 minutes. An Ignore or Undo costs about 1 credit.
- **Lost approval card.** Once, an error while the agent was answering hid the approval card, and the agent kept saying "pending". A rule now tells it to send a new request when no card is shown. That rule has not been tested under a repeat of the error.
- **Replies are slightly wordier.** After the required line the agent sometimes adds "The board is updated."
- **Counts can vary.** The "Ignored items hidden" number and some summary counts depend on what the model judged actionable in that run.
- **Not tested yet:** the "Open email" link inside the board, a scheduled run after ignoring, a weekly run after ignoring, a command carrying a changed or wrong mail id, a mail whose text pretends to be a command, and how the emailed brief looks in Outlook.
- **Test leftovers.** Three test mails still carry "Brief: Ignored" (two "Late-night schedule request" mails and one older "Board deck inputs" message). The category can be removed in Outlook. One test brief mail ("Daily brief: morning, Nov 6, 2026") is in the inbox.

## Before publishing

1. Open the test brief mail and confirm it has no numbers and no buttons.
2. The "New reply since ignored" label is checked in the chat board and in the emailed brief. The written board fallback is not.
3. Run the not tested items above, at least the scheduled run and the wrong id check.
4. Publish V2 yourself when ready. It was never published during this work.
