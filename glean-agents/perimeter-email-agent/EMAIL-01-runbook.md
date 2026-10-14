# EMAIL-01 runbook: agent foundation, Prompt 0 and Prompt 1

Ticket: EMAIL-01 Agent foundation, Outlook retrieval, threading and spikes (8 h). Features 5, 6, 11, 13, 17, 19, 20. This file is the execution order for the day; the pass/fail results go in the Result column of `test-plan.md`.

Sources: ticket text in `Agent_ADO_Tickets.md`, prompts in `prompts/` (`EMAIL-01-prompt-0-parity.md`, `EMAIL-01-prompt-1-lookback-dates-replies.md`; usage in `prompts/instruction.md`), tests in `test-plan.md`, seeds in `test-mailer/`. Regenerate this file if any of them changes.

## Exit criteria (the ticket's Done when)
- Agent exists in Auto mode, differs from the existing prompt only by the five Prompt 0 changes, passes test Part A, and version `v0-parity` is saved.
- Schedule is weekdays 3:45 pm (or daily, with the reason noted, if the picker has no weekday recurrence).
- Thread with 3 or more messages shows one card with original ask and latest update.
- LOOKBACK_DAYS is configurable in SETTINGS and defaults to 14.
- Out-of-office replies and delivery receipts do not resolve a task.
- Reply tracking shows who has and has not replied on multi-recipient mail.
- Admin prerequisites checklist signed off by the client admin.
- Spike result recorded: List messages next-page, Get email message full body.
- Agent published as `v1-threads-dates` only after passing test runs; rollback note recorded.

## Day plan
| Block | Work | Time |
|---|---|---|
| 1 | Admin checklist and mailer setup (sections 1 and 2) | 0.5 h |
| 2 | Spike in a scratch agent (section 3) | 1 h |
| 3 | Create agent from Prompt 0, parity diff, schedule, Thinking (section 4) | 1 h |
| 4 | Part A tests in Preview, then Run now; save `v0-parity` (section 5) | 2 h |
| 5 | Prompt 1: checkpoint, paste, diff check (section 6) | 0.5 h |
| 6 | EMAIL-01 tests E13, E11, E05, E06, E17, E19, E20 plus Part D (section 7) | 2.25 h |
| 7 | Scheduled path, fixes, publish `v1-threads-dates`, sign-off (sections 8 and 9) | 0.75 h |

## 1. Admin prerequisites (client admin signs off)
- [ ] Scheduled triggers turned on for the pilot users.
- [ ] Publish-approval path agreed (moderator, or Agent Creator role). In Auto mode Save publishes live.
- [ ] Outlook tool pack added with the one-time admin Connect; each pilot user connects their own account.
- [ ] The Outlook pack tools are offered to Agents (Tools, Outlook pack, Agents settings). On the agent's own Tools tab you keep only **List messages** for now: the pack attaches all 29 tools, so you remove the rest. Get email message, Get calendar view, Send email and Create a draft reply are added at their tickets.
- [ ] Approval is per agent: the Tools tab box "Allow agent to use write tools without approval" stays unticked now. At EMAIL-06 and EMAIL-07 you remove every write tool except the stage's own and tick it.
- [ ] Sharing restricted to the pilot users (agent governance sharing control).

## 2. Mailer setup (once)
```bash
cd test-mailer && npm install
cp .env.example .env    # then fill in the values below
npm test                # 66 tests, all must pass
```
- `TEST_RECEIVER` must be the **Outlook mailbox the agent reads** (the signed-in Glean user). `SMTP_USER` and `SMTP_PASS` are the Brevo SMTP login and SMTP key, and `SMTP_FROM` is a sender verified in Brevo. Set `ALLOWED_RECIPIENT_DOMAINS` to the Outlook mailbox's domain.
- Optional: `SMTP_ACCOUNTS` gives alice, bob, carol, dana, system, newsletter and vendor their own verified sender addresses so senders differ (needed for E17-04, E17-05 and anything that depends on a second real sender).
- Send one two-step thread first and confirm Outlook threads it: `npm run send -- --scenario A2-07-orig`, then `npm run send -- --scenario A2-07`, and check both messages share a conversation in Outlook. If they do not, thread tests need the replies sent from Outlook.
- Every seed script ends with `--yes`; add `-- --dry-run` to preview instead (for example `npm run seed:e13 -- --dry-run`). `npm run seed:email-01` sends all seven EMAIL-01 groups at once; the per-group scripts are `seed:e13`, `seed:e11`, `seed:e05`, `seed:e06`, `seed:e17`, `seed:e19`, `seed:e20`.

## 3. Spike (1 h, scratch agent, not the real one)
1. Create a scratch Auto mode agent with the Outlook pack and keep List messages and Get email message on its Tools tab (remove the other tools).
2. Seed more than 50 unread emails: `npm run seed:e13-bulk80` (80 sends; the unread query limit is 50). Delete those emails from the mailbox when the spike is done.
3. **Question 1, paging:** ask the scratch agent to call List messages with `folder` inbox, `is_read` false, `top` 50 and report the result count and which input takes the `next_page_token` back (the response already carries `next_page_token`, null when there is no next page). Record the parameter name.
4. **Question 2, full body:** ask it to Get email message for one email id and report whether the full body text comes back. Record yes or no.
5. Question 3 (headers): ask it to call List messages with `internetMessageHeaders` in `select` and report whether headers such as `Auto-Submitted` come back. The mailer already sets them on the E19 and E20 seeds. If yes, apply the optional header edit below after Prompt 1. Write the answers in the ticket. If paging is not possible, Prompt 1 already tells the agent to write `Mailbox window truncated; older items may be missing.` above the summary line (E13-07 expects either outcome).

**Optional header edit, only if question 3 is yes.** After Prompt 1 passes, add `internetMessageHeaders` to the `select` list of queries 1 and 2 in Step 1, and add to Step 2C: "Also treat a message as automatic when its headers include Auto-Submitted with a value other than no, X-Auto-Response-Suppress, or Precedence set to bulk, junk or auto_reply." Then re-run E19, E20 and Part D; A1-10 (exact select lists) changes by design.

## 4. Create the agent from Prompt 0
1. Agents, Create agent, keep **Auto mode**. Paste the Prompt 0 block from `prompts/EMAIL-01-prompt-0-parity.md` into Builder Assistant.
2. Copy the Instructions tab text into `specs/stage-0.md` (this folder) and run the parity check from `test-mailer/`. It compares line by line with Prompt 0 and ignores markdown formatting; PASS means the agent holds exactly Prompt 0 (your existing prompt plus the five stated changes):
```bash
cd test-mailer && npm run check:0
```
To see the five changes against your original prompt:
```bash
awk '/^INSTRUCTIONS$/{f=1;next} f&&/^```$/{exit} f' prompts/EMAIL-01-prompt-0-parity.md > prompt0-expected.md
diff <(sed 's/[[:space:]]*$//' "Current Perimeter Email Agent (Glean).md") <(sed 's/[[:space:]]*$//' prompt0-expected.md)
```
3. Tools: only Microsoft Outlook Extension Actions, and only List messages: remove the other 28 tools from the Tools tab (each is a chip with an x), and leave "Allow agent to use write tools without approval" unticked. Model tab: Thinking. Triggers tab: On a schedule, weekdays 3:45 pm in the user's time zone; open the schedule picker and confirm a Monday to Friday recurrence exists. If it does not, choose daily and note it in the ticket.
4. Governance: share with the pilot users only.

## 5. Parity run (Part A) and checkpoint `v0-parity`
Part A has 116 tests; each group below is seeded alone. **Reset the mailbox (inbox and Sent Items) between groups** so earlier seeds do not leak in. Use `as of 2026-10-14` in the Preview chat for every run (stage 0 settings: UNREAD_DAYS 5, READ_DAYS 3, SENT_DAYS 5). Open Debug and confirm Step 1 to Step 9 ran in order.

| Group | Tests | Seed command | Manual steps in Outlook |
|---|---|---|---|
| A1 | A1-01 to A1-15 (15) | `npm run seed:a1` | 3 of 4 seeds |
| A2 | A2-01 to A2-10 (10) | `npm run seed:a2` | 6 of 9 seeds |
| A3 | A3-01 to A3-05 (5) | `npm run seed:a3` | 4 of 4 seeds |
| A4 | A4-01 to A4-14 (14) | `npm run seed:a4` | 1 of 21 seeds |
| A5 | A5-01 to A5-12 (12) | `npm run seed:a5` | 1 of 17 seeds |
| A6 | A6-01 to A6-16 (16) | no seed (settings, trace or schedule check) | none |
| A7 | A7-01 to A7-05 (5) | `npm run seed:a7` | none |
| A8 | A8-01 to A8-09 (9) | `npm run seed:a8` | none |
| A9 | A9-01 to A9-04 (4) | `npm run seed:a9` | 1 of 1 seeds |
| A10 | A10-01 to A10-05 (5) | no seed (settings, trace or schedule check) | none |
| A11 | A11-01 to A11-10 (10) | no seed (settings, trace or schedule check) | none |
| A12 | A12-01 to A12-11 (11) | no seed (settings, trace or schedule check) | none |

Print the exact manual steps for a group with `npm run seed:<group> -- --dry-run` (the manual list is at the end). A6, A7, A10, A11 reuse the seeds of the groups before them or need only Sent Items you create in Outlook; the plan row names the fixture.

Then the scheduled path (A12-08 to A12-11): Run now from the Active agents table, result under Chats, Automations. Part A passes when every row is P, or an F has a note and an agreed decision (Part E lists the known gaps). Then **Save a version named `v0-parity`** with the note "matches the current agent".

## 6. Apply Prompt 1
1. Create a Saved version (checkpoint) first: `v0-parity` is it.
2. Paste Prompt 1 from `prompts/EMAIL-01-prompt-1-lookback-dates-replies.md` into Builder Assistant, or make its 11 listed edits by hand in the Instructions tab (a markdown editor). Tools: no change.
3. Copy the new Instructions text to `specs/stage-1.md` and run the stage 1 check from `test-mailer/` (it lists every missing marker and every old phrase still there). Send me the file or the output:
```bash
cd test-mailer && npm run check:1
diff ../specs/stage-0.md ../specs/stage-1.md   # optional: see what changed
```
Expected changed areas: SETTINGS (LOOKBACK_DAYS 14 replaces UNREAD_DAYS and SENT_DAYS; READ_DAYS capped), new RUN ORDER section, Step 1 (LOOKBACK_DAYS; query 2 reaches back LOOKBACK_DAYS with top 100; paging rule), new Step 1B, 2B rewritten (heading kept), new Step 2C, Step 4 first sentence and staleness bands, Step 6 multiple-recipient bullet, Step 7 item 2, Step 8 outbound ranges, Step 9 (one card per conversation, Responses field, To field, note lines above the summary line, counting rule). Anything else: restore `v0-parity` and make the edits by hand.
4. Do not publish yet. Preview only until section 7 passes.

## 7. EMAIL-01 tests (Preview, Debug open) plus Part D
Today is the run date 2026-10-14, so seeds are sent on RUN_DATE; type `as of 2026-10-14` unless a row says otherwise. Reset the mailbox between groups. For each group: dry-run, send, do the manual Outlook steps, run, record P/F in `test-plan.md`.

### E13 Longer lookback

```bash
npm run seed:e13 -- --dry-run   # preview and manual steps, sends nothing
npm run seed:e13
```
Seeds (4): E13-01, E13-06, E13-10, E13-11.

Opt-in bulk seeds (never sent by `--group`):
```bash
npm run seed:e13-bulk80   # 80 emails: 80 unread asks (paging)
npm run seed:e13-bulk-topup   # 220 emails: Top-up to a 300-message mailbox
```

Manual steps and notes:
- **E13-01** note: Simulate D-13 / D-15 / D-6 / D-8 with chat "as of YYYY-MM-DD" and "LOOKBACK_DAYS N" in Preview or a manual run, or edit AS_OF_DATE and LOOKBACK_DAYS in the saved Settings block for a scheduled run (Run now).
- **E13-06** (Old ask, user replied inside window): Reply to this message in Outlook and send it (for E13-06 shift the date so ask is D-13 and reply D-12: chat "as of YYYY-MM-DD" in Preview or a manual run, or AS_OF_DATE in the saved Settings block for a scheduled run)
- **E13-10** (Read reply older than the read window): Send this request from Outlook first (to the bob test account): Subject "Q3 forecast inputs", body "Can you send me the Q3 forecast inputs?"
- **E13-10** (Read reply older than the read window): Mark this reply as read
- **E13-10** (Read reply older than the read window): Simulate age: the request and this reply are sent on the same day, so set chat "as of" to the real today plus 8 (or AS_OF_DATE in the saved Settings block for Run now); both are then 8 days old, older than READ_DAYS 3 and inside LOOKBACK_DAYS 14
- **E13-11** (Read ask older than the read window): Mark this message as read
- **E13-11** (Read ask older than the read window): Simulate age D-6 (chat "as of" with the real today plus 6, or AS_OF_DATE in the saved Settings block for Run now); READ_DAYS stays 3, LOOKBACK_DAYS stays 14

How to run:
- Default run: type `as of 2026-10-14` in the Preview chat (today is already 2026-10-14 if you seed today).
- E13-01/02/09: seed once, then re-run with `as of` set to today plus 13, plus 15 (D-13 / D-15 look-alikes) and with `LOOKBACK_DAYS 7`, `LOOKBACK_DAYS 5` (READ_DAYS stays 3).
- E13-04: type `LOOKBACK_DAYS 0`, `LOOKBACK_DAYS -5`, `LOOKBACK_DAYS abc`, and clear the value in SETTINGS (blank); each run must show the line `LOOKBACK_DAYS was invalid; used 14.` directly above the summary line.
- E13-07 and E13-08 need no manual steps: send the bulk seeds first (commands below), then run. E13-08: Run now from the Active agents table and record the duration under Chats, Automations.
- No mailer seed for: E13-04. Create these in Outlook or by changing a setting, as the row says.

| ID | Scenario and seed | Expected |
|---|---|---|
| E13-01 | Default LOOKBACK_DAYS 14; ask at D-13 and D-15 | D-13 shown, D-15 not |
| E13-02 | LOOKBACK_DAYS 7 (chat override "LOOKBACK_DAYS 7" in Preview or a manual run, or SETTINGS); asks at D-6 and D-8 | D-6 shown, D-8 not |
| E13-03 | LOOKBACK_DAYS 30 | Works; record run time |
| E13-04 | LOOKBACK_DAYS set to 0, -5, "abc", blank (chat override in Preview or a manual run, or SETTINGS) | Falls back to 14; the line "LOOKBACK_DAYS was invalid; used 14." is on its own line directly above the summary line |
| E13-05 | LOOKBACK_DAYS 2 | Read window becomes 2 (READ_DAYS never above LOOKBACK_DAYS) |
| E13-06 | Inbound ask D-13, user reply D-12 | Excluded (sent window covers the reply) |
| E13-07 | 80 unread in window | Next page fetched, or the line "Mailbox window truncated; older items may be missing." is on its own line directly above the summary line |
| E13-08 | 14-day window, mailbox of 300 messages | Finishes within the scheduled-run limit |
| E13-09 | LOOKBACK_DAYS 5, READ_DAYS 3 | Same results as A1-02 to A1-07 |
| E13-10 | Sent request and the recipient's reply both 8 days old ("as of" the real today plus 8); the reply has been read (older than READ_DAYS 3, inside LOOKBACK_DAYS 14) | Excluded: the read inbox query reaches back LOOKBACK_DAYS, so the reply is found and the request is not shown as Overdue |
| E13-11 | Read inbound ask at D-6, no reply (older than READ_DAYS, inside LOOKBACK_DAYS) | Not shown (READ_DAYS still limits which read emails are evaluated); not counted in the "Y already replied" figure |

### E11 Relative to absolute dates (dates relative to the SENT date)

```bash
npm run seed:e11 -- --dry-run   # preview and manual steps, sends nothing
npm run seed:e11
```
Seeds (9): E11-01, E11-03, E11-04, E11-06, E11-07, E11-09, E11-10, E11-11, E11-12.

Manual steps and notes:
- **E11-04** note: For E11-08 send this on a Friday.
- **E11-10** note: Absolute dates by design; send on a day before Oct 20.
- **E11-11** note: Absolute date by design; expected year rolls to next year when sent in October.
- **E11-12** (Late-night sent time zone): Send this email manually at about 11:30 pm Pacific (run the seed script at that time) so the sent date differs between time zones

How to run:
- `as of 2026-10-14` (the seeds are sent today). For E11-02 re-run with `as of 2026-10-17` so the resolved date shows as passed.
- No mailer seed for: E11-13. Create these in Outlook or by changing a setting, as the row says.

| ID | Scenario and seed | Expected |
|---|---|---|
| E11-01 | "tomorrow", sent Wed Oct 14 | Oct 15, 2026 (Thu) |
| E11-02 | "tomorrow", sent D-3 (Sun Oct 11) | Oct 12, 2026 (Mon), shown as passed |
| E11-03 | "next Monday", sent Wed Oct 14 | Oct 19, 2026 (Mon) |
| E11-04 | "this Friday", sent Wed Oct 14 | Oct 16, 2026 (Fri) |
| E11-05 | "EOD" | The sent date |
| E11-06 | "end of week" | Friday of the sent week |
| E11-07 | "in two days" | Sent date plus 2 |
| E11-08 | "Friday", sent on a Friday | Resolved date shown with the assumption stated |
| E11-09 | "before launch" | "No due date (tied to: before launch)" |
| E11-10 | "Oct 20" and "10/20" | Oct 20, 2026 |
| E11-11 | "Jan 5" sent in October | Jan 5, 2027 |
| E11-12 | Sent 11:30 pm Pacific, user in another zone | Date in the user's zone |
| E11-13 | Any resolved date | Format "Oct 15, 2026 (Thu)" |

### E05 One card per thread

```bash
npm run seed:e05 -- --dry-run   # preview and manual steps, sends nothing
npm run seed:e05
```
Seeds (1): E05-04.

How to run:
- `as of 2026-10-14`. The thread tests (E05-01, 02, 03, 05, 06) use the threads seeded from E06, A2-07, E17 and E19 plus the one forwarded email here; open the Debug trace and confirm one card per conversationId.

| ID | Scenario and seed | Expected |
|---|---|---|
| E05-01 | Thread of 4 messages | One card |
| E05-02 | Inbound, partial user reply, new inbound | One card, latest update shown |
| E05-03 | Two conversations, same subject | Two cards |
| E05-04 | Email forwarded into a new conversation | Separate card |
| E05-05 | Any thread card | Shows message count |
| E05-06 | Conversation with an inbound ask and a later sent follow-up | One card only (never two for one conversation); when it qualifies both ways the card is in the inbound section with the line "Also waiting on: names." |

### E06 Original ask and latest update

```bash
npm run seed:e06 -- --dry-run   # preview and manual steps, sends nothing
npm run seed:e06
```
Seeds (7): E06-01-orig, E06-01, E06-02-orig, E06-02, E06-03, E06-04-orig, E06-04.

Manual steps and notes:
- **E06-04-orig** (Original ask that will fall outside the window): Run the agent with the date shifted so this message is older than LOOKBACK_DAYS (chat "as of YYYY-MM-DD" in Preview or a manual run, or AS_OF_DATE in the saved Settings block for a scheduled run), after sending the follow-up below

How to run:
- `as of 2026-10-14`. For E06-04 re-run with `as of` set to today plus 15 so the original ask is older than LOOKBACK_DAYS while the follow-up is inside it.

| ID | Scenario and seed | Expected |
|---|---|---|
| E06-01 | Ask at D-5, follow-up at D-1 | Both shown with dates and senders |
| E06-02 | Scope changes mid-thread | Original ask and latest update differ and both show |
| E06-03 | Single-message thread | No duplicated lines |
| E06-04 | Original ask older than the window | Marked "original outside window" |

### E17 Per-recipient tracking

```bash
npm run seed:e17 -- --dry-run   # preview and manual steps, sends nothing
npm run seed:e17
```
Seeds (4): E17-02, E17-02-b, E17-03, E17-04.

Manual steps and notes:
- **E17-02** (All To recipients replied (1 of 2)): Send this request from Outlook first (to the alice and bob test account): Subject "Sign-off request", body "Please sign off on the release notes." (both in To)
- **E17-03** (Cc person replies only): Send this request from Outlook first (to the alice (To) with bob in Cc test account): Subject "Sign-off request", body "Please sign off on the release notes."
- **E17-04** (Reply-all from one recipient): Send this request from Outlook first (to the bob, alice and carol test account): Subject "Workshop agenda", body "Can you confirm the agenda works for you?" (all three in To)
- **E17-04** note: Send as reply-all so other recipients are also in To.

How to run:
- `as of 2026-10-14`. Check the outbound card for `Replied: names. Waiting: names.` (E17-01), and `Answered by [name]` (E17-03, E17-06). E17-01, 05, 07, 08, 09 have no mailer seed: send those requests from Outlook as the test plan rows describe, then reply from the test accounts.
- No mailer seed for: E17-05, E17-07, E17-08. Create these in Outlook or by changing a setting, as the row says.

| ID | Scenario and seed | Expected |
|---|---|---|
| E17-01 | Sent to A, B, C; only A replied | Awaiting; "Replied: A. Waiting: B, C" |
| E17-02 | All To recipients replied | Excluded |
| E17-03 | Cc person replies, no To recipient does | Still awaiting; "Answered by [name]" shown |
| E17-04 | B replies via reply-all, C silent | B replied, C waiting |
| E17-05 | B replies from a second address | Counted as B or flagged; record |
| E17-06 | Reply from a non-recipient | Not counted for recipients; "Answered by [name]" shown; item stays |
| E17-07 | 11 recipients (and a second seed with 10) | 11: first 10 names, then "and 1 more". 10: all 10 names, no "and N more" |
| E17-08 | Distribution list as recipient | Record how the list is treated |
| E17-09 | Single recipient replies | Excluded (same as A3-01) |

### E19 Out-of-office

```bash
npm run seed:e19 -- --dry-run   # preview and manual steps, sends nothing
npm run seed:e19
```
Seeds (6): E19-01, E19-02, E19-03, E19-06, E19-06-b, E19-07.

Manual steps and notes:
- **E19-01** (OOO with return date and delegate): Send this request from Outlook first (to the alice test account): Subject "Delivery confirmation request", body "Can you confirm the delivery date?"
- **E19-02** (OOO without return date): Send this request from Outlook first (to the bob test account): Subject "Budget question", body "Can you confirm the budget approval?"
- **E19-06** (German automatic reply): Send this request from Outlook first (to the alice test account): Subject "Delivery confirmation request", body "Can you confirm the delivery date?"
- **E19-06-b** (French automatic reply): Send this request from Outlook first (to the bob test account): Subject "Budget question", body "Can you confirm the budget approval?"
- **E19-07** (Human reply mentions being out): Send this request from Outlook first (to the bob test account): Subject "Budget question", body "Can you confirm the budget approval?"

How to run:
- `as of 2026-10-14`. After the manual request is sent from Outlook, the mailer sends the out-of-office reply; run the agent and look for `Out of office until DATE`, `(no return date)` and the delegate name on the card.

| ID | Scenario and seed | Expected |
|---|---|---|
| E19-01 | Recipient sends only an out-of-office | Still awaiting; "Out of office until DATE" |
| E19-02 | Out-of-office with no return date | "Out of office (no return date)" |
| E19-03 | Out-of-office, then a real reply | Excluded |
| E19-04 | Out-of-office addressed to the user (inbound) | Excluded from the board |
| E19-05 | Out-of-office naming a delegate | Delegate noted; still awaiting |
| E19-06 | "Automatische Antwort", "Réponse automatique" | Recognized as automatic |
| E19-07 | Human reply that mentions "I'm out next week" | Treated as a real reply |

### E20 Auto-replies

```bash
npm run seed:e20 -- --dry-run   # preview and manual steps, sends nothing
npm run seed:e20
```
Seeds (4): E20-01, E20-02, E20-03, E20-07.

Manual steps and notes:
- **E20-01** (Ticket acknowledgment): Send a request from Outlook first to the vendor test account: Subject "Access issue", body "Can you reset my access?"
- **E20-02** (Security gateway quarantine notice): Send this request from Outlook first (to the alice test account): Subject "Delivery confirmation request", body "Can you confirm the delivery date?"
- **E20-03** (Delivery failure (NDR)): Send a request from Outlook first to a non-existent address such as nobody@example.invalid: Subject "Delivery confirmation request", body "Can you confirm the delivery date?"
- **E20-07** (Short real reply: ok): Send this request from Outlook first (to the alice test account): Subject "Delivery confirmation request", body "Can you confirm the delivery date?"

How to run:
- `as of 2026-10-14`. After the manual request is sent from Outlook, the mailer sends the automatic message; the request must stay in Waiting on Others with `Auto-reply received` or `Delivery failed`. E20-04, 05, 06, 08 need a read receipt, an `Automatic reply:` subject, a calendar `Accepted:` response and an auto-reply to the user: create them in Outlook as the plan rows describe.

| ID | Scenario and seed | Expected |
|---|---|---|
| E20-01 | Ticket acknowledgment "We received your request #123" | Not a reply |
| E20-02 | Security gateway quarantine notice | Not a reply |
| E20-03 | Delivery failure (NDR) | Not a reply; "Delivery failed" noted |
| E20-04 | Read receipt | Not a reply |
| E20-05 | Subject prefixed "Automatic reply:" | Not a reply |
| E20-06 | Calendar "Accepted:" | Not a reply |
| E20-07 | Short real reply "ok" | Counts as a reply (changes in EMAIL-04) |
| E20-08 | Auto-reply addressed to the user | Excluded from the board |

### Part D regression pack
Run these after the EMAIL-01 groups, with the expectations that change at Prompt 1 (listed in the test plan, Part D, Prompt 1 row): A1-02, A1-06, A2-01, A2-07, A3-01, A4-01, A4-07, A5-01, A5-04, A5-08, A7-01, A7-02, A7-03, A8-02, A8-05, A9-01, A10-01, A10-04, A11-05, A11-06, A11-07, A12-05.

## 8. Scheduled path and stability
1. Publish nothing yet. In SETTINGS leave AS_OF_DATE blank, LOOKBACK_DAYS 14, then Run now from the Active agents table. Read the result under Chats, Automations: it must finish, nothing waits for confirmation, and the board matches the Preview run on the same mailbox (A12-05, A12-08).
2. A scheduled run has no chat message: to test a past date or another LOOKBACK_DAYS, change AS_OF_DATE or LOOKBACK_DAYS in the saved SETTINGS, publish, Run now, then change it back (A12-11, E13-02).
3. If Debug shows a step skipped or merged, or a result is unstable: create a checkpoint, tighten that step's wording by hand, check the diff shows only that change, rerun the failing tests.

## 9. Publish and sign off
1. All EMAIL-01 tests and Part D are P (or F with a note and a decision). Part D rows that change by design are updated, not counted as regressions.
2. Save the version as `v1-threads-dates`; note `v0-parity` as the rollback target.
3. Record in the ticket: spike answers, schedule recurrence result, run time of the 14-day window (E13-03, E13-08), and any F with its decision.
4. Admin signs off the prerequisites checklist.

## Known limits of this test setup
- One sender address unless `SMTP_ACCOUNTS` is set; reply-from-second-address (E17-05) cannot be simulated.
- Mail cannot be backdated; age is simulated with `as of` in Preview and manual runs, or AS_OF_DATE in SETTINGS for Run now.
- Anything in Sent Items (the requests, replies and forwards) and read state, flags and folders are created by hand in Outlook.
- Whether Outlook threads mailer messages into one conversation must be confirmed first (section 2).
