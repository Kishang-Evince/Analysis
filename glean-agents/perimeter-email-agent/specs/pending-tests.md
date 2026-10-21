# Pending tests per enhancement (E01 to E27)

Written 2026-10-19 from the results log. "Pending" means the test has no PASS: it is N/T (unable to test), FAIL, PARTIAL, has no recorded result, or passed only in part (the qualifier in the log is kept). Owner "user" needs you or a second mailbox; owner "me" needs a seed mail or a run I can do.

## Enhancements

| Sr | Enhancement number | Details |
|---|---|---|
| 1 | E01 | Reply Is Not Task Completion (EMAIL-02): A reply closes a request only when it answers or delivers. An acknowledgement, a promise, a forward or a partial answer leaves the request open. |
| 2 | E02 | My Commitments (EMAIL-02): Finds promises the user made in sent mail (for example "I'll send it tomorrow") with who, what, due date and confidence. |
| 3 | E03 | Commitments by Others (EMAIL-02): Finds promises others made to the user and lists them under "Others owe me". |
| 4 | E04 | Commitment Status Tracking (EMAIL-02): Gives each commitment one status: Open, Pending, Waiting or Completed. Overdue is a flag next to the status. |
| 5 | E05 | One Action Card per Thread (EMAIL-01): Shows one card per conversation, with the message count, not one card per message. |
| 6 | E06 | Original Ask + Latest Update (EMAIL-01): The card shows the earliest ask and the latest update in the window, each with date and sender. |
| 7 | E07 | Multiple Ask Extraction (EMAIL-03): Finds several asks in one email: one primary ask on the card, the others under "More asks". |
| 8 | E08 | Better Semantic Ask Detection (EMAIL-03): Detects indirect asks such as "Need your eyes on this" or "Thoughts?" and ignores rhetorical questions, FYI and thanks. |
| 9 | E09 | Action Type Detection (EMAIL-05): Labels each ask with an action: Reply, Review, Approve, Send, Decide, Complete or Attend. |
| 10 | E10 | Better Due-Date Extraction (EMAIL-05): Reads due dates from the text (EOD, COB, by Friday, next week, ranges), keeps urgent wording and "tied to" dates. |
| 11 | E11 | Convert Relative Dates (EMAIL-01): Turns "tomorrow", "next Monday" and "this Friday" into real dates counted from the email's sent date. |
| 12 | E12 | Meeting-Dependent Deadlines (EMAIL-05): For "before our client call" looks up the calendar event and uses its start as the due date; shows "Meeting not found" or "Several meetings match". |
| 13 | E13 | Longer Inbound Lookback (EMAIL-01): Reads the last 14 days (setting LOOKBACK_DAYS), pages past 50 messages, and notes an invalid value. |
| 14 | E14 | Morning Briefing (EMAIL-06): Sends the board as an HTML brief to the user's own mailbox, in morning mode, on a weekday schedule. |
| 15 | E15 | End-of-Day Review (EMAIL-06): End-of-day mode shows only overdue Must Do Today items and overdue waiting items, or "All clear for the rest of today." |
| 16 | E16 | Weekly Outstanding Review (EMAIL-07): Weekly mode lists four things for 7 days: Asks to me, My open commitments, Others owe me, Waiting on others; subject "Weekly brief". |
| 17 | E17 | Per-Recipient Response Tracking (EMAIL-01): For a request sent to several people, tracks who replied and who still waits ("Replied: ... Waiting: ..."). |
| 18 | E18 | Substantive Reply Detection (EMAIL-04): Classifies each reply as substantive, acknowledgement or noise; only a substantive reply closes the request. |
| 19 | E19 | Out-of-Office Detection (EMAIL-01): Recognises out-of-office replies, keeps waiting and shows "Out of office until DATE". |
| 20 | E20 | Auto-Reply Detection (EMAIL-01): Recognises ticket acknowledgements, security gateway notices, delivery failures, read receipts and calendar responses, and does not count them as replies. |
| 21 | E21 | Acknowledgement vs Answer (EMAIL-04): A reply like "received, I'll look at it" does not close the request; it stays pending. |
| 22 | E22 | Smart Follow-Up Recommendation (EMAIL-04): On Waiting on Others items shows "Follow up today", "Follow up this week" or "Not yet" with a short reason from age, deadline, importance and flag. |
| 23 | E23 | Draft Follow-Up (EMAIL-07): Creates follow-up drafts (new drafts, to the recipients still waiting) for overdue sent requests; never sent. |
| 24 | E24 | Draft Reply (EMAIL-07): Creates reply drafts for the first 5 items, in the same thread, starting "[Draft by agent]" with "[fill in]" where a fact is missing; never sent; no draft for secret requests. |
| 25 | E25 | Tone & Voice Profile (EMAIL-08): Drafts follow the user's own style (greeting, closing, length, formality) learned from recent sent mail; neutral with fewer than 5 samples. |
| 26 | E26 | VIP & Topics Lists (EMAIL-09): A saved list of VIP people, addresses, domains and topics marks matching items "VIP" or "Topic: x", adds a Highlights line, and is managed by chat. |
| 27 | E27 | Calendar Summary (EMAIL-10 and EMAIL-11): Meeting prep for today and the next business day: up to 5 meetings summarised with their related email threads, a confidence word and a VIP mark; the others are listed. |

Total: 281 tests in 27 enhancements, 184 passed, 97 pending.

## Summary

| Enhancement | Name | Tests | Passed | Pending |
|---|---|---|---|---|
| E01 | Reply is not completion | 9 | 7 | 2 |
| E02 | My commitments | 15 | 14 | 1 |
| E03 | Commitments by others | 8 | 8 | 0 |
| E04 | Status tracking | 7 | 7 | 0 |
| E05 | One card per thread | 6 | 0 | 6 |
| E06 | Original ask and latest update | 4 | 2 | 2 |
| E07 | Multiple asks | 10 | 8 | 2 |
| E08 | Semantic asks | 12 | 11 | 1 |
| E09 | Action type | 9 | 9 | 0 |
| E10 | Due-date extraction | 9 | 5 | 4 |
| E11 | Relative to absolute dates (dates relative to the SENT date) | 13 | 8 | 5 |
| E12 | Meeting-dependent deadlines | 10 | 7 | 3 |
| E13 | Longer lookback | 11 | 5 | 6 |
| E14 | Morning brief | 15 | 9 | 6 |
| E15 | End-of-day | 6 | 4 | 2 |
| E16 | Weekly review | 6 | 5 | 1 |
| E17 | Per-recipient tracking | 9 | 3 | 6 |
| E18 | Substantive reply | 10 | 6 | 4 |
| E19 | Out-of-office | 7 | 6 | 1 |
| E20 | Auto-replies | 8 | 4 | 4 |
| E21 | Acknowledgement versus answer | 6 | 3 | 3 |
| E22 | Follow-up advice (only on Waiting on Others items) | 8 | 3 | 5 |
| E23 | Follow-up drafts | 7 | 5 | 2 |
| E24 | Draft replies | 14 | 11 | 3 |
| E25 | Tone and voice | 15 | 9 | 6 |
| E26 | VIP and topics lists | 25 | 11 | 14 |
| E27 | Meeting prep | 22 | 14 | 8 |

## Pending tests by enhancement

### E01 Reply is not completion: 2 pending of 9

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E01-07 | PASS (count only) | Get email message calls | Run A: 6 Get email message calls; run E (20 extra threads): 16 calls with 4 errors/retries, so no more than 15 distinct threads. Step inputs not opened, so "newest message only" is unchecked | me (a seed or a run) |
| E01-08 | N/T | Excluded emails | Still needs the Get email message step inputs opened to see which message ids were fetched | me (a seed or a run) |

### E02 My commitments: 1 pending of 15

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E02-15 | N/T | Seed A: 5 threads to read. Seed B: 8 threads to read. Run B in Preview and again with Run now (Task-tool behaviour in scheduled runs is undocumented: record it) | Needs a publish (Run now); skipped by choice | user |

### E03 Commitments by others: 0 pending of 8

Nothing pending.

### E04 Status tracking: 0 pending of 7

Nothing pending.

### E05 One card per thread: 6 pending of 6

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E05-01 | No result recorded | Thread of 4 messages | The early gap list says: Needs real conversations with several messages and an ask the agent keeps: a normal sender plus replies from Outlook. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E05-02 | No result recorded | Inbound, partial user reply, new inbound | The early gap list says: Needs real conversations with several messages and an ask the agent keeps: a normal sender plus replies from Outlook. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E05-03 | No result recorded | Two conversations, same subject | The early gap list says: Needs real conversations with several messages and an ask the agent keeps: a normal sender plus replies from Outlook. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E05-04 | No result recorded | Email forwarded into a new conversation | The early gap list says: Needs real conversations with several messages and an ask the agent keeps: a normal sender plus replies from Outlook. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E05-05 | No result recorded | Any thread card | The early gap list says: Needs real conversations with several messages and an ask the agent keeps: a normal sender plus replies from Outlook. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E05-06 | No result recorded | Conversation with an inbound ask and a later sent follow-up | The early gap list says: Needs real conversations with several messages and an ask the agent keeps: a normal sender plus replies from Outlook. Later runs may have covered it; this was not logged. | me (a seed or a run) |

### E06 Original ask and latest update: 2 pending of 4

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E06-02 | N/T | Scope changes mid-thread | The relay delivered "Launch plan v1" and its follow-up as two separate conversations (Outlook inbox shows two unthreaded messages), so "one card, 2 messages" cannot be tested with the seeded pair; needs a real reply sent from Outlook (owner: user or me with the user's yes) | user |
| E06-04 | No result recorded | Original ask older than the window | The early gap list says: Same as E05: a normal sender. Later runs may have covered it; this was not logged. | me (a seed or a run) |

### E07 Multiple asks: 2 pending of 10

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E07-01 | N/T | "Review this, approve pricing, send the contract" | E07-01 ("review this, approve pricing, send the contract") is covered by E07-07 and E07-02; no exact seed. E07-08 fields (requester, quote, direct or indirect) are internal, not on the board | me (a seed or a run) |
| E07-08 | N/T | Any ask | E07-01 ("review this, approve pricing, send the contract") is covered by E07-07 and E07-02; no exact seed. E07-08 fields (requester, quote, direct or indirect) are internal, not on the board | me (a seed or a run) |

### E08 Semantic asks: 1 pending of 12

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E08-10 | N/T | 30 labelled emails (10 direct, 10 indirect, 10 no ask) | Needs 30 labelled mails (10 direct, 10 indirect, 10 no ask); not built | me (a seed or a run) |

### E09 Action type: 0 pending of 9

Nothing pending.

### E10 Due-date extraction: 4 pending of 9

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E10-01 | N/T | "next Monday" | Not seeded in this run (next Monday, EOD, by COB tomorrow, ASAP). The "passed" rule for a date before Today was also not seeded | me (a seed or a run) |
| E10-02 | N/T | "EOD" | Not seeded in this run (next Monday, EOD, by COB tomorrow, ASAP). The "passed" rule for a date before Today was also not seeded | me (a seed or a run) |
| E10-03 | N/T | "by COB tomorrow" | Not seeded in this run (next Monday, EOD, by COB tomorrow, ASAP). The "passed" rule for a date before Today was also not seeded | me (a seed or a run) |
| E10-07 | N/T | "ASAP" | Not seeded in this run (next Monday, EOD, by COB tomorrow, ASAP). The "passed" rule for a date before Today was also not seeded | me (a seed or a run) |

### E11 Relative to absolute dates (dates relative to the SENT date): 5 pending of 13

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E11-02 | No result recorded | "tomorrow", sent D-3 (Sun Oct 11) | The early gap list says: Dates sit in the text of inbound asks, which need a normal sender; E11-12 needs a send at about 11:30 pm Pacific. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E11-05 | No result recorded | "EOD" | The early gap list says: Dates sit in the text of inbound asks, which need a normal sender; E11-12 needs a send at about 11:30 pm Pacific. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E11-08 | No result recorded | "Friday", sent on a Friday | The early gap list says: Dates sit in the text of inbound asks, which need a normal sender; E11-12 needs a send at about 11:30 pm Pacific. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E11-12 | No result recorded | Sent 11:30 pm Pacific, user in another zone | The early gap list says: Dates sit in the text of inbound asks, which need a normal sender; E11-12 needs a send at about 11:30 pm Pacific. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E11-13 | No result recorded | Any resolved date | The early gap list says: Dates sit in the text of inbound asks, which need a normal sender; E11-12 needs a send at about 11:30 pm Pacific. Later runs may have covered it; this was not logged. | me (a seed or a run) |

### E12 Meeting-dependent deadlines: 3 pending of 10

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E12-02 | N/T | Phrase present, no matching event | The seed "Vendor review summary" now resolves to the "Vendor review" event the user created for E12-06 (Oct 15, 9:00 AM), so "Meeting not found" can no longer be shown with this seed | me (a seed or a run) |
| E12-08 | N/T | Event in another time zone | All-day, recurring, cancelled and other-time-zone events not created: editing events in Outlook web through this browser is slow and error-prone, and a cancelled invitation needs a second attendee. E12-09 not run | me (a seed or a run) |
| E12-09 | No result recorded | No meeting phrase in any email | The early gap list says: no cause recorded Later runs may have covered it; this was not logged. | me (a seed or a run) |

### E13 Longer lookback: 6 pending of 11

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E13-03 | No result recorded | LOOKBACK_DAYS 30 | The early gap list says: The seeded inbound asks were dropped as noise (all seeds came from one sender); needs a normal sender; E13-06 and E13-10 also need a reply sent from Outlook. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E13-05 | No result recorded | LOOKBACK_DAYS 2 | The early gap list says: The seeded inbound asks were dropped as noise (all seeds came from one sender); needs a normal sender; E13-06 and E13-10 also need a reply sent from Outlook. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E13-06 | N/T | Inbound ask D-13, user reply D-12 | Needs an ask and a reply on different days (ask D-13, reply D-12). All seeded mail arrives today, and mail cannot be backdated, so the one-day gap cannot be made | me (a seed or a run) |
| E13-08 | No result recorded | 14-day window, mailbox of 300 messages | The early gap list says: The seeded inbound asks were dropped as noise (all seeds came from one sender); needs a normal sender; E13-06 and E13-10 also need a reply sent from Outlook. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E13-09 | No result recorded | LOOKBACK_DAYS 5, READ_DAYS 3 | The early gap list says: The seeded inbound asks were dropped as noise (all seeds came from one sender); needs a normal sender; E13-06 and E13-10 also need a reply sent from Outlook. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E13-11 | No result recorded | Read inbound ask at D-6, no reply (older than READ_DAYS, inside LOOKBACK_DAYS) | The early gap list says: The seeded inbound asks were dropped as noise (all seeds came from one sender); needs a normal sender; E13-06 and E13-10 also need a reply sent from Outlook. Later runs may have covered it; this was not logged. | me (a seed or a run) |

### E14 Morning brief: 6 pending of 15

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E14-04 | PASS (configuration) | Triggers tab schedule weekdays 8:00 am (if the schedule was already active, change it through Agent library, Edit schedule and confirm the next run time) | Triggers tab: On a schedule, October 16, 2026, 08:00 AM, Every weekday (Monday to Fri). Actual firing needs the agent to be published, which is not allowed: firing is N/T | user |
| E14-08 | N/T | Send tool fails (for example Send email still blocked by admin) | A failing Send email cannot be forced without removing the tool or blocking it as admin; owner: user/admin | user |
| E14-09 | N/T | Scheduled run (Run now from the Active agents table) | Run now from the Active agents table needs the agent published, which is not allowed | user |
| E14-11 | N/T (web only) | Open in Outlook desktop, web, mobile | The HTML brief reads correctly in Outlook web; desktop and mobile need screenshots from the user | me (a seed or a run) |
| E14-13 | PASS (after-noon half) | MODE auto in SETTINGS. Two scheduled tests with Run now, one clicked before 12:00 in the user's time zone and one at or after 12:00 | MODE auto at 17:48: end-of-day, subject "Daily brief: end-of-day, Sep 1, 2026". The before-12:00 half (morning) needs a run before noon: N/T until then (owner: me, in the next morning session) | me (a seed or a run) |
| E14-15 | No result recorded | Send yourself from Outlook a mail with subject "Weekly brief: Oct 14, 2026" and body "Please send me the budget by Friday; I'll update you Monday". Same seed as C-14, other subject | The early gap list says: no cause recorded Later runs may have covered it; this was not logged. | me (a seed or a run) |

### E15 End-of-day: 2 pending of 6

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E15-03 | N/T (user decision) | New ask arrives in the afternoon: once Overdue or due today, once with no deadline | User said the afternoon request test is not needed: not run. E15-02 (morning ask answered at noon) also needs manual Outlook replies and a timed run; left for later | me (a seed or a run) |
| E15-05 | No result recorded | Can the Triggers tab hold a second schedule (for example weekdays 4:00 pm, which MODE auto treats as end-of-day) | The early gap list says: no cause recorded Later runs may have covered it; this was not logged. | me (a seed or a run) |

### E16 Weekly review: 1 pending of 6

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E16-03 | N/T | Nothing unresolved | Needs a mailbox with nothing unresolved; not possible with this seed set | me (a seed or a run) |

### E17 Per-recipient tracking: 6 pending of 9

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E17-01 | No result recorded | Sent to A, B, C; only A replied | The early gap list says: Each reply must come from that recipient's own address; E17-05, 07, 08 also need a second address, 11 recipients and a distribution list. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E17-05 | No result recorded | B replies from a second address | The early gap list says: Each reply must come from that recipient's own address; E17-05, 07, 08 also need a second address, 11 recipients and a distribution list. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E17-06 | No result recorded | Reply from a non-recipient | The early gap list says: Each reply must come from that recipient's own address; E17-05, 07, 08 also need a second address, 11 recipients and a distribution list. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E17-07 | No result recorded | 11 recipients (and a second seed with 10) | The early gap list says: Each reply must come from that recipient's own address; E17-05, 07, 08 also need a second address, 11 recipients and a distribution list. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E17-08 | No result recorded | Distribution list as recipient | The early gap list says: Each reply must come from that recipient's own address; E17-05, 07, 08 also need a second address, 11 recipients and a distribution list. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E17-09 | No result recorded | Single recipient replies | The early gap list says: Each reply must come from that recipient's own address; E17-05, 07, 08 also need a second address, 11 recipients and a distribution list. Later runs may have covered it; this was not logged. | me (a seed or a run) |

### E18 Substantive reply: 4 pending of 10

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E18-02 | N/T | "Noted" | No seed for "Noted" alone, "Will check" alone or an automatic reply on this thread (E18-02 and E18-09 are partly inside E18-01 and E21-01) | me (a seed or a run) |
| E18-05 | N/T | "Here's the file" with attachment | The mailer cannot attach a file. The text-only reply "Here is the file." left the request waiting | me (a seed or a run) |
| E18-09 | N/T | "Will check" | No seed for "Noted" alone, "Will check" alone or an automatic reply on this thread (E18-02 and E18-09 are partly inside E18-01 and E21-01) | me (a seed or a run) |
| E18-10 | N/T | Automatic reply | No seed for "Noted" alone, "Will check" alone or an automatic reply on this thread (E18-02 and E18-09 are partly inside E18-01 and E21-01) | me (a seed or a run) |

### E19 Out-of-office: 1 pending of 7

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E19-04 | No result recorded | Out-of-office addressed to the user (inbound) | The early gap list says: The out-of-office reply must come from the person written to: a colleague with an out-of-office on, or a second mailbox. Later runs may have covered it; this was not logged. | me (a seed or a run) |

### E20 Auto-replies: 4 pending of 8

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E20-04 | No result recorded | Read receipt | The early gap list says: Needs a human-looking sender or an auto-reply addressed to the user. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E20-05 | No result recorded | Subject prefixed "Automatic reply:" | The early gap list says: Needs a human-looking sender or an auto-reply addressed to the user. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E20-06 | No result recorded | Calendar "Accepted:" | The early gap list says: Needs a human-looking sender or an auto-reply addressed to the user. Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E20-08 | No result recorded | Auto-reply addressed to the user | The early gap list says: Needs a human-looking sender or an auto-reply addressed to the user. Later runs may have covered it; this was not logged. | me (a seed or a run) |

### E21 Acknowledgement versus answer: 3 pending of 6

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E21-02 | No result recorded | "On it" | The early gap list says: no cause recorded Later runs may have covered it; this was not logged. | me (a seed or a run) |
| E21-04 | N/T (seed mismatch) | "Approved" | "Approved." and "Done." answer a delivery-date question, so the agent kept the requests waiting. The seed request should be an approval or an action request. Needs a new seed (request "Please approve the vendor" and "Please send the report") | me (a seed or a run) |
| E21-05 | N/T (seed mismatch) | "Done" | "Approved." and "Done." answer a delivery-date question, so the agent kept the requests waiting. The seed request should be an approval or an action request. Needs a new seed (request "Please approve the vendor" and "Please send the report") | me (a seed or a run) |

### E22 Follow-up advice (only on Waiting on Others items): 5 pending of 8

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E22-01 | N/T | Overdue, importance high | All sent items are 0 or 1 day old. Needs Aging or Overdue sent mail (Exchange ignores a backdated Date header) or a request with a deadline of today or tomorrow sent from Outlook (E22-02) | me (a seed or a run) |
| E22-02 | N/T | Deadline of today or tomorrow, no reply | All sent items are 0 or 1 day old. Needs Aging or Overdue sent mail (Exchange ignores a backdated Date header) or a request with a deadline of today or tomorrow sent from Outlook (E22-02) | me (a seed or a run) |
| E22-03 | N/T | Aging, normal importance, not flagged | All sent items are 0 or 1 day old. Needs Aging or Overdue sent mail (Exchange ignores a backdated Date header) or a request with a deadline of today or tomorrow sent from Outlook (E22-02) | me (a seed or a run) |
| E22-05 | FAIL | Overdue, normal importance, no deadline | Waiting on Others collapsed to one sentence ("21 overdue sent requests require follow-up today, including ...") instead of cards; no per-item "Follow up today" line is visible, so the Overdue rule cannot be read per item. Same collapse as the board in run C (long lists shortened by the model) | me (a seed or a run) |
| E22-07 | N/T | Same Aging item, normal importance: once flagged, once not flagged | All sent items are 0 or 1 day old. Needs Aging or Overdue sent mail (Exchange ignores a backdated Date header) or a request with a deadline of today or tomorrow sent from Outlook (E22-02) | me (a seed or a run) |

### E23 Follow-up drafts: 2 pending of 7

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E23-04 | N/T | Item advised "Not yet" or "Follow up this week" | No "Not yet" or "Follow up this week" item in the 14-day window at this AS_OF_DATE; needs a date where recent sent mail exists | me (a seed or a run) |
| E23-07 | N/T | Recipient out of office | No out-of-office reply seeded | me (a seed or a run) |

### E24 Draft replies: 3 pending of 14

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E24-01 | PARTIAL | Top items qualify | 5 reply items were handed to draft-writer (Budget / Q3 "final" numbers, Client deck, Board slides, Vendor quote comments, Invoice summary); 2 drafts were created (Budget / Q3, Client deck), Vendor quote got "Secret requested; no draft.", Board slides and Invoice summary got no draft and no flag. A p | me (a seed or a run) |
| E24-08 | N/T | User edits the draft (marker line kept), agent runs again | Needs the user to edit a draft and keep its first line; not done | user |
| E24-10 | N/T | Draft content | Not run as its own check. The draft-writer text says to use only facts from the thread; no draft read in stages 7 and 8 held details from another thread (E25-08 checked the same rule for the style drafts) | me (a seed or a run) |

### E25 Tone and voice: 6 pending of 15

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E25-05 | PARTIAL | Length | Drafts are one short sentence (about 15 words); the samples are two sentences (about 25 to 30 words). Within 30% only for the casual pair; the "promise nothing, use [fill in]" rule keeps drafts short | me (a seed or a run) |
| E25-09 | N/T | Fewer than 5 sent emails | Needs a mailbox with fewer than 5 usable sent emails; the neutral-style rule is in the text | me (a seed or a run) |
| E25-11 | N/T | USER2 runs it | Needs USER2 (second user) | user |
| E25-13 | N/T | Blind test: 10 drafts against the user's own writing | Blind rating of 10 drafts needs the user (owner: user) | user |
| E25-14 | N/T | Samples in another language | Samples in another language: not seeded; record only | me (a seed or a run) |
| E25-15 | N/T | Sensitive samples (legal, HR) | No legal or HR sample mail seeded | me (a seed or a run) |

### E26 VIP and topics lists: 14 pending of 25

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E26-01 | PARTIAL | VIP by exact address | First board run (saved list: VIP Dana Whitfield, TOPIC budget; 384.6 s, 16.61 credits): Dana's items are marked VIP and stay in their buckets. Order inside the tier was not judged because the due dates differ | me (a seed or a run) |
| E26-02 | N/T | VIP by second address (alias) | Not seeded (no mail from a second address of a listed person). Owner: me, after the user agrees to a seed | user |
| E26-03 | N/T | VIP by domain "@bigclient.com" | Domain entries exist in the saved list (@client01 to @client48.example.com) but no mail from those domains was seeded. Owner: me | me (a seed or a run) |
| E26-04 | N/T | VIP by display name only | Display-name-only entry not isolated: Bob matched through the entry "Singh, Bob" plus his address. Owner: me | me (a seed or a run) |
| E26-05 | N/T | Different letter case | Different letter case not seeded. Owner: me | me (a seed or a run) |
| E26-07 | N/T | VIP only in Cc | VIP only in Cc not seeded. Owner: me | me (a seed or a run) |
| E26-09 | FAIL | Topic phrase in body | Bob's "Q3 sheet check" has the topic word only in the body and was not marked "Topic: budget" in that run | me (a seed or a run) |
| E26-10 | N/T | Topic by meaning ("forecast" for "budget") | The run used topic "forecast": the two sent threads with "forecast" in the subject were marked "Topic: forecast", but the budget items were not (a meaning match in the reverse direction). The plan's case (topic "budget", mail that says "forecast") was not run | me (a seed or a run) |
| E26-13 | PARTIAL | 50 entries in a list | List of 52 lines (Dana, "Singh, Bob", Bob's address, 48 @domains, TOPIC forecast; one entry per line after Prompt 9c): the run read the whole list (Dana, Bob and the topic all matched). One false mark: Carol's "Admin access" shows VIP although she is not on the list (not in Highlights); Highlights a | me (a seed or a run) |
| E26-14 | N/T | VIP email already answered | E26-14 needs an answered VIP mail (not seeded), E26-18 needs USER2, E26-23 does not exist for drafts (a draft cannot be owned by someone else) | user |
| E26-17 | PARTIAL | Brief | First run: Highlights listed exactly the 4 matches. One-run Bob run: Highlights listed the VIP items plus one unmarked item, "Budget review for Q3" (Alice, no VIP, no topic) | me (a seed or a run) |
| E26-18 | N/T | USER and USER2 each own an "Agent VIP and Topics" document with different lines | E26-14 needs an answered VIP mail (not seeded), E26-18 needs USER2, E26-23 does not exist for drafts (a draft cannot be owned by someone else) | user |
| E26-22 | N/T | Document with malformed lines (no colon, "VIPS:", blank value, stray text, "TOPIC:" with only spaces) next to one valid VIP line | Needs a hand-written draft with malformed lines; the notes-keeper never writes such lines. READ keeps only lines that start with "VIP:" or "TOPIC:" and skips blank values (text rule) | me (a seed or a run) |
| E26-23 | N/T | A document titled "Agent VIP and Topics" owned by someone else (shared with USER), none owned by USER | E26-14 needs an answered VIP mail (not seeded), E26-18 needs USER2, E26-23 does not exist for drafts (a draft cannot be owned by someone else) | user |

### E27 Meeting prep: 8 pending of 22

| Test | Status | What it checks | Why pending | Owner |
|---|---|---|---|---|
| E27-02 | N/T | Cancelled and declined meetings | E27-02 needs another organiser's cancelled and declined events; E27-13 is the user's accuracy rating of summaries against threads; E27-14 needs a 50-message thread; E27-18 needs USER2 | user |
| E27-03 | PARTIAL | Thread with shared attendees | "Vendor access review" (attendee vendor.sales.test@yopmail.com) was linked with high confidence in run 2 but "No related email found" in run 3 (same mailbox, same text); linking by attendee is flaky | me (a seed or a run) |
| E27-12 | PARTIAL (run 3) | Linked thread | After prompts 10c and 10d the entries show at most 3 threads with a confidence word and one or two lines each ("High — Planning sync: Invitation sent to Nirali; no decisions or open items in the message body."); not always 2 to 3 lines | me (a seed or a run) |
| E27-13 | N/T | Summary versus thread | E27-02 needs another organiser's cancelled and declined events; E27-13 is the user's accuracy rating of summaries against threads; E27-14 needs a 50-message thread; E27-18 needs USER2 | user |
| E27-14 | N/T | Thread of 50 messages | E27-02 needs another organiser's cancelled and declined events; E27-13 is the user's accuracy rating of summaries against threads; E27-14 needs a 50-message thread; E27-18 needs USER2 | user |
| E27-18 | N/T | USER2 runs it | E27-02 needs another organiser's cancelled and declined events; E27-13 is the user's accuracy rating of summaries against threads; E27-14 needs a 50-message thread; E27-18 needs USER2 | user |
| E27-19 | PARTIAL | Per-meeting sub-task (Task tool), in Preview and again with Run now | One meeting-prep call per meeting is visible in every trace (5 per run); the forced-failure case (one call fails, that meeting is listed without a summary) was not run | me (a seed or a run) |
| E27-20 | PARTIAL | Unrelated email containing the word "meeting" | "Meeting room repaint" was linked to "Late call" as a Low (date-proximity) thread in run 5, not by the word "meeting"; the keyword rule itself did not link it | me (a seed or a run) |

