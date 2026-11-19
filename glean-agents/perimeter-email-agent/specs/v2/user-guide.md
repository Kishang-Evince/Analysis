# Outlook Action Board: user guide for a new person

Version covered: the draft agent "Outlook Action Board V2" (state of 2026-11-19, after the full regression run). The published agent is older and does not have the run form, the live board, Ignore, the KPI tiles, the FOCUS choice or the completeness check. Where this guide says "V2", it means the draft.

---

## 1. Your first run, step by step

1. Open the agent in Glean. A **run form** appears with the settings (section 2).
2. Leave everything at its default for the first try. The defaults are safe: no drafts, no email, chat only.
3. Click **Run agent**.
4. Wait. You will see short progress lines in the chat. When it finishes, the **board opens in a side panel** next to the chat.
5. Read the board from the top (section 3). Click **Open email** on any card to see the mail in Outlook.

If the board does not open in the side panel, the agent writes the board as plain text in the chat instead. The content is the same.

A run takes about 1.5 to 2 minutes in Fast reasoning mode and about 4 minutes in Thinking mode (see section 10). Before the board is drawn, the agent checks that every mail it found is either a card, an ignored mail, or has a short written reason for being left out. If that check fails, the board waits until the agent fixes it.

---

## 2. The run form: every setting

| Setting | Choices | Default | What it does |
|---|---|---|---|
| MODE | auto, morning, end-of-day, weekly | auto | Which brief to build. Auto picks morning before 12:00 and end-of-day from 12:00. Auto never picks weekly. |
| LOOKBACK_DAYS | 3, 7, 14, 21, 30 | 14 | How many days back the agent searches your inbox and sent mail. Longer finds slow asks and gives a bigger board. |
| READ_DAYS | 1, 3, 7 | 3 | How long a mail you already opened still counts as open. An opened mail older than this counts as handled. Unread mail is never aged out. |
| INCLUDE_CALENDAR | yes, no | yes | Use your calendar for meeting prep and for deadlines such as "before the 2pm call". |
| CREATE_DRAFTS | yes, no | no | Write reply drafts into Outlook Drafts for the first 5 mails that ask you for something. |
| DELIVERY | chat only, chat and email | chat only | Whether the brief is also mailed to you. |
| SHOW_WAITING_ON_YOU | yes, no | yes | Show or hide the section "Waiting on Your Response". |
| SHOW_WAITING_ON_OTHERS | yes, no | yes | Show or hide "Waiting on Others". |
| SHOW_REVIEW_QUICKLY | yes, no | yes | Show or hide "Review Quickly". |
| SHOW_COMMITMENTS | yes, no | yes | Show or hide "Commitments". |
| FOCUS | full board, commitments only, waiting on others only, meeting prep only | full board | Show only one part of the board. This changes what you see, not what is read, so it is not faster. |
| AS_OF_DATE | any date, or empty | empty | Run as if today were this date. For testing only. Leave empty. |

Hiding a section never changes the counts in the summary line. The counts are always computed as if every section were shown.

---

## 3. Reading the board

### The top of the board

- A line with your **VIP and topic** entries (people and subjects the agent treats as extra important).
- The title, for example "Outlook Action Board: Morning, as of Nov 19, 2026".
- **KPI tiles**: Open items, Must do today (Must do overdue at end of day), Waiting on you, Waiting on others, Review quickly, Drafts ready, Longest wait in days. They are display only. A section with no cards has no tile.

### The sections, in order

| Section | What is in it |
|---|---|
| **Must Do Today** | Mail that asks you for something with a deadline of today or earlier, plus VIP asks. Late items are shown in red. |
| **Waiting on Your Response** | Mail that asks you for something with no deadline yet, or a later one. |
| **Waiting on Others** | Mail you sent that still has no answer. Each is marked Recent (0 to 1 days), Aging (2 to 3 days) or Overdue (4 days or more). |
| **Review Quickly** | Mail where the agent is not sure it holds an ask. Glance at it. |
| **Commitments** | Things you promised in your sent mail, and things others promised you. |
| **Meeting prep** | Today's and the next business day's meetings, with prep notes (morning brief, calendar on). |

### A card

Each card shows its number, the sender and address, the received date, a short preview, the **ask**, the **action**, the due date, and **why it was included**. Open the **Details** fold for confidence, ownership, the original ask, the latest update and the message count.

The action word is a label with a hover text. Hover over it to read what it means: Reply, Review, Approve, Send, Decide, Complete, Attend (mail you must handle) and Recent, Aging, Overdue (mail you sent). Only **Ignore** and **Undo** are buttons.

### The footer

- "Ignored items hidden: N" tells you how many items were left out because you ignored them earlier.
- A line with excluded counts tells you how many mails were looked at and not shown (already answered, noise).

### What never becomes a card

- **Automated mail:** no-reply senders, newsletters, undeliverable notices and automatic replies ("Automatic reply:", out of office).
- **Mail you already answered**, and acknowledgements that only say thanks.
- **Opened mail older than READ_DAYS.** It counts as handled. Unread mail never ages out.
- **Mail you ignored**, and the twin of an ignored mail (same subject, sender and day).
- **Your own briefs** (the "Daily brief" and "Weekly brief" mails the agent sends you).

---

## 4. Ignore and Undo

Use Ignore for a card you never want to see again.

**Ignore**

1. Click **Ignore** on the card, or type `Ignore 4` in the chat (4 is the number on the card).
2. An **approval card** appears. Approve it. Nothing happens before you approve.
3. The agent marks that mail with the Outlook category "Brief: Ignored". Your other categories stay.
4. The board redraws without the card. The item moves to the list "Ignored this session".

**Undo**

1. Click **Undo** in that list, or type `Undo 1` (the number in the list).
2. Approve. The category is removed and the card returns.

You can also remove the category "Brief: Ignored" by hand in Outlook.

Good to know:

- The mark is an Outlook category, so it **lasts between runs**. Ignored mail stays out of later boards, the emailed brief and scheduled runs.
- If the same ask arrived twice (same subject, same sender, same day), the board shows one card. Ignore may show one approval card that lists both mails ("Approve all (2)"), and Undo restores both. If the approval card lists only one, the other copy stays out of later boards anyway, because a copy of an ignored mail is hidden too.
- If someone **replies after you ignored** a thread, the card comes back with "New reply since ignored." in its "Why included" text.
- Typing a wrong number, such as `Ignore 99` or `Ignore 0`, only answers "Could not find card N." and changes nothing. `Ignore` alone answers "Please specify the card number to ignore." and `Undo 5` with nothing ignored answers "Could not find ignored item 5."
- Commands work only when you type them in the chat yourself, or click the buttons. Text inside an email can never trigger a command.

---

## 5. The four brief types (MODE)

- **Morning**: the full board. Must Do Today, Waiting on You, Waiting on Others, Review Quickly, Commitments and Meeting prep.
- **End-of-day**: only what is already late. Must Do items past their date and Waiting on Others items that are Overdue. If nothing qualifies you see "All clear for the rest of today."
- **Weekly**: written lists for the last 7 days of unresolved items only: Asks to me, My open commitments, Others owe me, Waiting on others. There is no interactive board and no Ignore button.
- **Auto**: morning before 12:00, end-of-day from 12:00.

---

## 6. Drafts and the emailed brief

### Drafts

1. Set CREATE_DRAFTS to **yes**.
2. Run the agent. Reply drafts for the first 5 mails that ask you for something appear in **Outlook Drafts**, and the card says "Draft ready in Outlook".
3. Read, edit and send them yourself. The agent never sends a draft.

It does not draft follow-ups to mail you sent. Drafts written in the past stay in Outlook until you delete them.

Keep this on **no** for the scheduled run, so your Drafts folder does not fill up every morning.

### The emailed brief

1. Set DELIVERY to **chat and email**.
2. The brief arrives in your inbox as a normal HTML email with the same sections as the board, and a button **Open the live board in Glean** under the header tiles. The small numbers on the email cards are only the order inside each section. They are not the numbers used by Ignore and Undo.
3. The email has no Ignore buttons. To act on items, click the button, then click **Run agent** in Glean to get the interactive board (its delivery starts on chat only, so it will not mail you again).
4. Weekly briefs and empty briefs have no button.

### A schedule

On the agent's run page click **Set schedule**, choose delivery **chat and email** in that window, and confirm the time. The suggested time is every weekday at 8:00 am. Glean notes that delivery can take up to an hour. A schedule that keeps "chat only" sends no email. The schedule uses the form values you chose when you set it, so a scheduled run cannot read what you type in the chat.

*Not yet proven:* a real scheduled run has not been tested, because the button is switched off while the agent is a draft. Test it after the agent is published.

---

## 7. VIPs, topics and your writing style

**VIP list and topics.** A VIP is a person or a whole domain (for example `@bigclient.com`) whose mail counts as more urgent. A topic is a phrase (for example "Launch plan") that raises the priority of mail about it. Both lists are kept in a small Excel file in your own OneDrive and shown on the line at the top of the board. To change them, tell the agent in the chat, for example "add VIP: Carol Reyes" or "remove topic: Launch plan". The agent shows what it will save and asks you to confirm before writing.

**Writing style.** When drafts are on, the agent drafts replies in your voice. The first time it needs a style it reads about 30 of your sent mails and writes a style table into the same Excel file. You can ask it to learn again ("learn my writing style") or to clear it. The agent does not invent VIPs and writes nothing to your file without your confirmation.

---

## 8. What the agent will and will not do

It will:

- Read your inbox and sent items and your calendar for the chosen days.
- Build the board and, if you ask, the email and the drafts.
- Mark or unmark one mail with "Brief: Ignored" after you approve.

It will not:

- Send mail to anyone else, reply for you or forward anything.
- Delete, move or flag mail.
- Follow instructions written inside an email. Mail text is treated as data. A mail that says "ignore this" or "reply yes" does nothing.
- Change anything in a scheduled or weekly run. Those only read.

You approve every change in Outlook with an approval card.

---

## 9. Troubleshooting

| What you see | What to do |
|---|---|
| The board is empty or says "Inbox is clear." | Raise LOOKBACK_DAYS, check that you are not in end-of-day mode (it shows only late items), and check READ_DAYS. Opened mail older than READ_DAYS is treated as handled. |
| An item you expected is missing. | It may be opened mail older than READ_DAYS, an automatic reply, mail you already answered, or an ignored mail. Raise READ_DAYS, or run again, because the board can differ between runs (section 10). |
| The board came as plain text, not a side panel. | The agent could not draw the page. The text holds the same cards. Run again if you need the buttons. |
| An approval card never appears, or Ignore says it cannot find the mail. | Type the command again (`Ignore 4`). Once, in testing, ignoring a mail failed with an Outlook not-found error and it did not happen again. If a chat shows "Stopped generating a response" after a command, start a new run, because that chat is stuck. If it repeats, remove the mark by hand in Outlook and tell the owner of the agent. |
| The approval card lists two mails. | Two copies of the same ask arrived. Approve both, they are one item. |
| The board has far fewer cards than last time. | The board can change size between runs, mostly in Fast mode (section 10). Run again, or ask the owner to use Thinking mode. |
| No brief email arrived. | DELIVERY must be "chat and email", and for a schedule it must be chosen in the schedule window. Allow up to an hour after the scheduled time. |
| Drafts piled up in Outlook. | They were made on earlier runs with CREATE_DRAFTS on. Delete them by hand. |
| A card came back after Ignore. | Someone replied in that thread ("New reply since ignored."), or the mail is a different thread with the same subject. |

---

## 10. Known limits

- **The number of cards is not always steady.** Whether a human mail holds an ask is decided by a language model. The automatic checks (automated mail, copies of ignored mail, age of opened mail, and the completeness check on every row) narrow the spread but do not remove it. In the latest test on the default model (GPT-5.6 Luna) three runs in Thinking mode gave the same 17 cards, while runs in Fast mode gave 15, 10 and 8 cards after ignores, because the model sometimes leaves out a real ask and rewords its reason. If a card you rely on is missing, run again or open the mail in Outlook. The model Gemini 4 Neon gave the same 16 cards in three runs, in both modes, but needs 3.5 to 4.5 minutes.
- **Speed against steadiness.** On Luna a Fast run takes about 1.5 to 2 minutes and 2.5 to 3.5 credits, a Thinking run about 4 minutes and 4.7 to 6.1 credits. The owner of the agent chooses the model and the reasoning mode in the builder (Model tab). An Ignore or Undo takes about 1 credit.
- **The email button opens the agent, not that morning's board.** The agent cannot learn the address of a past board.
- **FOCUS does not make a run faster.** It only filters the display.
- **Not yet proven in real use:** a real scheduled run (not possible on a draft), the Open email link inside the board, and a new reply inside an ignored thread (it worked in an earlier test, the latest test mails did not join the thread, so it could not be checked).
- **Not part of the agent:** sending email from the chat. The agent only reads mail, writes reply drafts when you ask, and mails the brief to you.

---

## 11. Quick reference

**Typed commands** (only in the chat, you type them yourself):

| Type | Effect |
|---|---|
| `Ignore N` | Hide card N and mark its mail "Brief: Ignored", after you approve. |
| `Undo N` | Bring back item N of "Ignored this session". |

**Safe first-run settings:** MODE auto, LOOKBACK_DAYS 14, READ_DAYS 3, CREATE_DRAFTS no, DELIVERY chat only, FOCUS full board.

**Morning routine:** the brief arrives at 8:00. Click "Open the live board in Glean", click Run agent, work top down: Must Do Today first, then Waiting on Your Response, then chase Waiting on Others. Ignore what you will never act on.

**Words:** *card* is one item on the board. *Board* is the whole page. *Brief* is the emailed version. *Ask* is what the sender wants from you. *Overdue* on a sent mail means no answer after 4 days or more.
