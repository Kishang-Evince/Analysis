# Test gaps and open items, per stage (output-based tests only)

Written 2026-10-14. It records, for every stage of the agent build, which output-based tests are verified, which are blocked and why, and what would unblock them. Stage 1 has the longest section, because it is the stage in progress.

**What "output-based" means.** A test is output-based when you decide pass or fail by reading what the agent produces: the action board, the brief email, a draft. Examples: an item appears or does not, it sits in the right section, a field or label reads a certain way, the summary line has the right numbers. Tests decided from something else are left out of every count and table below. They are the trace (which calls ran, with which parameters), the schedule, run time, limits and tool approval. There are 26 of them and they are listed together near the end, with the reason, so nothing is hidden. The plan has 397 tests; 371 are output-based.

Stage numbers match the prompt files in `prompts/` (stage 0 = `EMAIL-01-prompt-0-parity.md`, stage 1 = `EMAIL-01-prompt-1-lookback-dates-replies.md`, and so on). Test ids are the ones in `test-plan.md`.

## Why there are gaps

**Update 2026-10-14 (later the same day):** causes 1 and 2 below are resolved. Brevo now sends from one `@evincedev.in` address per persona, so the "blocked" counts and tables in this file, which were written before the change, are out of date. Outlook-sent mail goes to yopmail addresses only. Each test's real outcome is in the Results log at the end.

Four causes. Almost every gap comes from one of them.

1. **The only sender we can use is a no-reply address.** The Brevo sender is `no-reply-closedtitle@evincedev.in`. The agent's Step 3 drops mail from a no-reply sender as noise, so a seeded email that is meant to appear as an ask never appears on the board. The mailer is set to send anyway (`ALLOW_NO_REPLY=true` in `test-mailer/.env`). Seeded mail is still useful for tests that expect mail to be dropped, and for volume and paging tests. It cannot show an ask, a thread, a date or a reply.
2. **Every persona sends from the same address.** Alice, Bob, Carol and Dana differ only by display name. Tests that depend on who a reply came from (per-recipient tracking) need each person's own address.
3. **Some fixtures can only be made in Outlook.** Sent mail, replies you send, read state, folders, flags, calendar events. The mailer cannot create these. The test plan says which ones.
4. **Some Glean behaviour is unknown.** Whether a scheduled run behaves like Preview, and whether Run now exists before publishing. Each is listed where it matters.

How the counts below were made. For each output-based test I looked at the emails the mailer would send for it. **Blocked** = the seed is an email from alice, bob, carol, dana or vendor (it needs a normal sender), or the test needs an inbound ask or bulk Outlook mail that we cannot create yet. **Testable now** = the seed comes from the automated personas (system, newsletter), or the fixture is a setting or mail you send from Outlook. For stages 2 to 10 the counts go by seed only, so some "testable now" tests may still need a fixture you make by hand in Outlook.

| Stage | What it adds | Output-based tests | Blocked | Testable now | Status |
|---|---|---|---|---|---|
| 0 | Parity with the existing agent | 104 | 67 (+1 needs a second user) | 36 | Text check passed; behaviour tests mostly not run |
| 1 | Lookback, dates, automatic replies, per-recipient, one card per thread | 56 | 49 | 6 (+1 passed) | Text check passed; paging passed; items 1 to 3 below open |
| 2 | Reply is not completion, commitments | 35 | 16 | 19 | Not started |
| 3 | Multiple and indirect asks | 22 | 21 | 1 | Not started |
| 4 | Reply quality and follow-up advice | 24 | 16 | 8 | Not started |
| 5 | Action type, due dates, meeting deadlines | 27 | 27 | 0 | Not started |
| 6 | Brief delivery, modes, safety | 18 | 4 | 14 | Not started |
| 7 | Drafts, follow-ups, weekly review | 26 | 3 | 23 | Not started |
| 8 | Writing style | 14 | 0 | 14 | Not started |
| 9 | VIP and topics | 25 | 11 | 14 | Not started |
| 10 | Meeting prep | 20 | 5 | 15 | Not started |

## Stage 0: parity with the existing agent

**Verified**
- The Instructions tab equals Prompt 0 (the existing prompt plus five stated changes): `npm run check:0` passes. This is a text check, not an output test, so it is not in the counts.
- Output seen: the sent-request card on the board, the existing board format, and the summary line.

**Blocked (67)**
- Anything where an inbound ask must appear on the board: A1-02 to A1-05, A1-12, A1-13, A1-15, A2-01 to A2-07 and A2-09, A3-01, A3-02, A3-04, A3-05, A4-01 to A4-14, A5-03, A5-06, A5-08 to A5-11, A7-01 to A7-05, A8-01 to A8-09, A9-02, A9-03, A10-01 to A10-03, A10-05, A11-09.
- Tests with no seed that also need inbound asks or bulk Outlook mail: A1-09, A1-14, A2-10, A9-04, A11-01, A11-03, A11-10.
- A12-04 (USER2 sees only USER2's mail) needs a second user.
- **Parity is not at risk.** Stage 0 is the existing agent's own text apart from the five stated changes. These tests check the existing agent's behaviour, not our changes. They can wait for a normal sender and then run as the regression pack (Part D).

**Testable now (36)**
- A5-01, A5-02, A5-04, A5-05, A5-07, A5-12: noise and exclusions that the mailer sends from the automated personas. The no-reply sender is exactly what these expect.
- A2-08, A3-03, A10-04, A11-02, A11-04 to A11-08: board checks on sent requests you make in Outlook (the summary line, the "inbox is clear" sentence, outbound fields, nothing invented).
- A6-01 to A6-16: sent-side include and exclude rules, and staleness. Each needs a sent mail made in Outlook. A6-12 to A6-16 are superseded by stage 1, so test them there (item 2 below).
- A12-01, A12-05, A12-06: the run completes and shows the board, two runs on an unchanged mailbox give the same items, a disconnected account gives a clear error.

Note: the agent has moved on to stage 1, so stage 0 behaviour can only be re-run as a regression check (Part D, with the changed expectations listed there), or after restoring `v0-parity`.

## Stage 1: lookback, dates, automatic replies, per-recipient, one card per thread

**Verified**
- **Paging (E13-07):** 80 unread bulk emails. The unread query hit its 50-message limit, the agent followed the continuation, and the board counted 91 inbound emails.
- The card shows the new fields (Original ask, Latest update, Messages, Responses), and the summary line is last with no stray note lines.
- The document itself: all 11 Prompt 1 edits are in, nothing else changed (`npm run check:1` passes). That is a text check, not counted here.

### Output tests you can run now: items 1 to 3

These need no new mail and no new sender. They use the "Delivery date" request you sent to Dharmesh Patt on Oct 14, which has had no reply. Run each in the Preview box. Start a **new chat** for each one, because Preview can reuse an earlier answer. Type exactly the text shown.

**Item 1: an invalid `LOOKBACK_DAYS` value (test E13-04)**
- *What it checks.* Prompt 1 says: if `LOOKBACK_DAYS` is blank, zero, negative or not a number, use 14 and tell the reader. Without that rule a typo would silently shrink the window to nothing.
- *What to type.* One message at a time, each in a new chat:
  ```
  Show my action board, LOOKBACK_DAYS 0
  Show my action board, LOOKBACK_DAYS -5
  Show my action board, LOOKBACK_DAYS abc
  ```
- *What you should see.* A normal board (the Dharmesh card), and directly above the last line (the "Inbound: … Outbound: …" summary), a line on its own: `LOOKBACK_DAYS was invalid; used 14.`
- *Pass if.* The note is present and on its own line above the summary in all three runs. Fail if it is missing, is inside the summary line, or appears below it.
- *Record.* E13-04 in `test-plan.md`.

**Item 2: the new staleness bands (A6-12 to A6-16)**
- *What it checks.* Prompt 1 changed how old a sent request must be to be Recent, Aging or Overdue. The old bands were 1 to 2 days, 2 to 3 days and 4 to 5 days, with gaps at day 0 and day 6. The new ones are 0 to 1, 2 to 3, and 4 or more days.
- *How the test works.* The request was sent on Oct 14. Typing "as of" a later date makes the agent behave as if it were that day, so the same email looks older.
- *What to type and what you should see.* One per new chat:

  | Type | Days waiting | Staleness |
  |---|---|---|
  | `Show my action board, as of 2026-10-15` | 1 | Recent |
  | `Show my action board, as of 2026-10-16` | 2 | Aging |
  | `Show my action board, as of 2026-10-17` | 3 | Aging |
  | `Show my action board, as of 2026-10-18` | 4 | Overdue |
  | `Show my action board, as of 2026-10-20` | 6 | Overdue |

- *Pass if.* Each row matches. The last row is the important one: stage 0 hid a request that was 6 days old. Now it must still show, as Overdue.
- *Record.* A6-12 to A6-16.

**Item 3: the lookback window on the sent request (the sent-side version of E13-01 and E13-02)**
- *What it checks.* Stage 0 looked back 5 days. Stage 1 looks back 14 (`LOOKBACK_DAYS`), and a chat message can change that for one run. A request older than the window must disappear, and one inside it must stay.
- *What to type and what you should see.* One per new chat:

  | Type | Request age | Expected |
  |---|---|---|
  | `Show my action board, as of 2026-10-27` | 13 days | Shown, Overdue |
  | `Show my action board, as of 2026-10-29` | 15 days | Not shown |
  | `Show my action board, LOOKBACK_DAYS 7, as of 2026-10-20` | 6 days | Shown |
  | `Show my action board, LOOKBACK_DAYS 7, as of 2026-10-22` | 8 days | Not shown |

- *Pass if.* Each row matches. When nothing is shown, the board says: "No emails currently waiting on you and no outstanding requests to others — inbox is clear.", followed by the excluded counts.
- *Why 13 and 15, not 14.* Day 14 sits on the boundary of the window, so the result could go either way and would prove nothing.
- *Record.* E13-01 and E13-02 as "sent side only". The inbound versions are blocked, see below.

### Blocked output tests (49)

| Group | Tests | Why blocked | What unblocks it |
|---|---|---|---|
| E13 lookback, inbound side | E13-01, E13-02, E13-05, E13-06, E13-09, E13-10, E13-11 | The seeded asks and replies are dropped as noise | A normal sender. E13-06 and E13-10 also need a reply you send from Outlook |
| E11 absolute dates | E11-01 to E11-13 | The dates are in the text of inbound asks, which never appear. E11-13 needs a date on a card | A normal sender. E11-12 also needs a send at about 11:30 pm Pacific |
| E05 one card per thread | E05-01 to E05-06 | Needs real conversations with several messages and an ask the agent keeps | A normal sender, plus replies from Outlook |
| E06 original ask and latest update | E06-01 to E06-04 | Same as E05 | A normal sender |
| E17 per-recipient tracking | E17-01 to E17-09 | Each reply must come from that recipient's own address. All our mail comes from one. E17-05, 07, 08 have no seed: they need a second address, 11 recipients and a distribution list | A request sent from Outlook to two or three real people, who reply. Or one verified sender address per persona |
| E19 out-of-office | E19-01 to E19-07 | The out-of-office reply must come from the person you wrote to | A colleague with an out-of-office on, or a second mailbox with one |
| E20 automatic replies | E20-05, E20-07, E20-08 | Need a human-looking sender, or an auto-reply addressed to you | A normal sender |

### Testable now with no new sender (6 tests)

- **E13-04:** item 1.
- **E20-01, E20-02, E20-03, E20-04, E20-06:** ticket acknowledgement, security gateway notice, delivery failure, read receipt, calendar response. The mailer sends these from the system persona, which is the no-reply sender, exactly as they should look. Send a request from Outlook first (the seed notes say which), then run `seed:e20`. The request must stay under Waiting on Others with `Auto-reply received` or `Delivery failed`. E20-07 in that group needs a human sender, so skip it.

**Watch for:** the "Counting:" rule sits below the summary line in the spec. Check it is not printed in the board (it was not in the paging run).

## Stages 2 to 10: gaps to expect

Not started, so nothing is verified. The pattern is the same everywhere: tests about asks, replies, dates or senders need a normal sender; tests about your own sent mail and settings do not. Counts are output-based tests only.

| Stage | Blocked by the no-reply sender | Testable now, and what you create by hand |
|---|---|---|
| 2 Commitments | Reply-is-not-completion (E01) and commitments by others (E03, E04): 16 tests | Your own commitments (E02, 19 tests): write the promises in mail you send from Outlook. Needs the **Get email message** tool added first |
| 3 Asks | Almost all (21 of 22): detecting several or indirect asks needs inbound mail that stays on the board | 1 test |
| 4 Reply quality | Substantive versus acknowledgement replies (E18, E21): 16 tests, need replies from real addresses | Follow-up advice (E22) on your own sent requests: 8 tests |
| 5 Dates and meetings | All 27: the dates are in inbound asks. Meeting deadlines also need calendar events and the **Get calendar view** tool | 0 tests |
| 6 Brief delivery | 4 tests | 14 tests: morning and end-of-day modes, the delivery email, the subject. Needs the **Send email** tool and the approval box ticked |
| 7 Drafts | Reply drafts (E24): 3 tests | 23 tests: follow-up drafts and the weekly review on your own sent mail. Needs **Create a draft reply** |
| 8 Writing style | None | 14 tests: needs 10 to 15 sent emails in your own style, made in Outlook |
| 9 VIP and topics | 11 tests: a VIP is matched by sender address, so senders must be distinct and normal | 14 tests: the "Agent VIP and Topics" document and its rules |
| 10 Meeting prep | 5 tests | 15 tests: calendar events and linked threads, made in Outlook |

## Not output-based (left out of all counts above)

These 26 tests are decided from the trace, the schedule, run time or limits, not from what the agent writes. They still need to be run, but they are not "gaps in output".

- **Decided from the trace (which calls ran, with which parameters):** A1-01, A1-10, A1-11, A9-01, A12-09, A12-10, A12-11, E01-07, E01-08, E02-14, E02-15 (sub-tasks), E12-09, E16-06, E25-01, E27-19.
- **Decided from the schedule, run time or limits:** A1-08 (the 50-message cap, replaced by paging in stage 1), A12-02, A12-03, A12-07, A12-08, E13-03, E13-08, E14-04, E14-09 (sends without a confirmation click), E15-05 (a second schedule), E27-17.

### Other open checks at stage 1 (not output tests): items 4 to 6

**Item 4: the failed continuation step (finishes E13-07)**
- *What happened.* In the paging run, the trace showed one List messages step marked "Error executing this step", right after the first three List messages calls. A later List messages step succeeded. So the paging worked, but only because the agent retried.
- *Why it matters.* The agent should get paging right the first time. The likely cause is that it passed the continuation token to the wrong input name. Prompt 1 currently says "pass the `next_page_token` from the response back to List messages", without naming the input.
- *What to do.* Open the paging run's trace (the one that took 92 seconds). Click the List messages step that shows "Error executing this step" and copy its **Input** and its **error message**. Then click the List messages step that comes after the Shell steps and succeeded, and copy its **Input**. Send both to me.
- *What I do with it.* Put the correct input name into Prompt 1, so it works on the first call.

**Item 5: the scheduled path (A12-08 to A12-11)**
- *What it checks.* A scheduled run has no chat message, so it cannot use "as of" or `LOOKBACK_DAYS` overrides. It uses the saved Settings block and the real date. If a scheduled run behaves differently from Preview, the 3:45 pm run would be wrong even though Preview looked right.
- *Where.* In Glean, open the Agents area, find "Outlook Action Board" in the Active agents list, and use **Run now**. The result appears in a chat under Automations. I have not seen this screen in your tenant. If Run now is missing, tell me, or send a screenshot.
- *Possible catch.* Run now may only work once the agent is published, and publishing makes this version live, so the 3:45 pm weekday schedule would run it. Publish only after items 1 to 3 pass.
- *What you should see.* The run finishes (we expect about two minutes), the board has the same shape as in Preview, and the date is the real today.
- *Also watch for.* The Preview trace had Shell and Todo Write steps that our instructions never mention; Glean's Auto mode adds them. If a scheduled run fails or is cut short, that is the first suspect.

**Item 6: save the version**
- *What.* A saved version is a checkpoint you can restore. Name it `v1-lookback-dates`. The earlier one, `v0-parity`, is the rollback target.
- *Where.* The history (clock) button at the top right, next to Preview. Do not click Publish until items 1 to 3 pass.
- *Do it when.* Items 1 to 5 are done and passed.

## What would remove most of the gaps

One-time setup, in order of value:
1. **A normal-looking sender in Brevo** (for example `tester@evincedev.in`), set as `SMTP_FROM`, then delete `ALLOW_NO_REPLY` from `test-mailer/.env`. This unblocks most of the 116 blocked tests in stages 0 and 1 (the ones that only need an ask to appear), and most of stages 3 and 5.
2. **One verified sender address per persona** (alice, bob, carol, dana), set through `SMTP_ACCOUNTS`. This unblocks the per-recipient and VIP tests, where the sender's identity matters.
3. **Two real people who will reply by hand**, or two spare mailboxes. They cover E17 (replies from each recipient) and E19 (out-of-office).
4. **A few calendar events** in the test mailbox, for stages 5 and 10.

Until then, record a blocked test as **N/T** in the Result column of `test-plan.md`, with the reason "no normal sender", rather than F. When the sender is fixed, run the stage's `seed:` script and fill the N/T rows.

## Results log

One row per test run. Result is `PASS`, `FAIL`, or `N/T` (unable to test, with the reason). A test is `N/T` when it could not be run, not when it failed.

| Stage | Test | Result | Reason or evidence | Date |
|---|---|---|---|---|
| 1 | E13-04 | PASS | `LOOKBACK_DAYS 0`, `-5` and `abc` each gave the Dharmesh card plus `LOOKBACK_DAYS was invalid; used 14.` on its own line directly above the summary line | 2026-10-14 |
| 1 | E13-07 | PASS | 80 unread bulk emails: the unread query hit its 50-message limit, the agent followed `next_page_token`, the board counted 91 inbound emails (92 s, 2.33 credits). A first continuation step failed and was retried; the input name was not captured | 2026-10-14 |
| 1 | E11-01 | PASS | "Deck for the steering call", "by COB tomorrow" sent Oct 14 -> Due Oct 15, 2026 (Thu) | 2026-10-14 |
| 1 | E11-03 | PASS | "Draft proposal", "next Monday" -> Due Oct 19, 2026 (Mon) | 2026-10-14 |
| 1 | E11-04 | PASS | "Training plan sign-off", "this Friday" -> Due Oct 16, 2026 (Fri) | 2026-10-14 |
| 1 | E11-07 | PASS | "Sample data", "in two days" -> Due Oct 16, 2026 (Fri) | 2026-10-14 |
| 1 | E11-09 | PASS | "Launch checklist", "before launch" -> "No due date (tied to: before launch)" | 2026-10-14 |
| 1 | E11-11 | PASS | "Annual planning inputs", "Jan 5" sent in October -> Jan 5, 2027 (Tue) | 2026-10-14 |
| 1 | E06-02 | PASS | "Launch plan v1": one card, 2 messages, original ask and latest update both shown, scope change noted | 2026-10-14 |
| 1 | E06-03 | PASS | Single-message thread ("confirm headcount"): one card, "1 message", no duplicated lines | 2026-10-14 |
| 1 | E13-10 | PASS | Request with a read reply older than READ_DAYS: excluded in both runs (reply found through the 14-day read query) | 2026-10-14 |
| 1 | E17-03 | PASS | Cc person replied: card stays, "Answered by Bob Singh" (both runs) | 2026-10-14 |
| 1 | E17-04 | PASS | Reply-all from one recipient: "Replied: Bob Singh. Waiting: Alice Morgan and Carol Reyes" (both runs) | 2026-10-14 |
| 1 | E17-02 | PASS (flaky) | Run 2: excluded because both To recipients replied. Run 1: card stayed with "Replied: Bob Singh. Waiting: alice" although Alice's reply was in the conversation | 2026-10-14 |
| 1 | E19-03 | PASS (flaky) | Run 2: real reply after an out-of-office excluded the request. Run 1: reply not counted, request still shown | 2026-10-14 |
| 1 | E19-01, E19-05 | PASS (run 1 only) | Run 1: "Out of office until Oct 19, 2026 (Mon); delegate Bob." and still awaiting. Run 2 excluded the request because E19-03 (a later real reply in the same conversation) was counted, so the two tests contradict each other and need separate conversations | 2026-10-14 |
| 1 | E19-02 | PASS | Run 2: "Out of office (no return date)." (run 1: reply not linked) | 2026-10-14 |
| 1 | E19-06, E19-06-b | PASS | German and French automatic replies recognised: "Out of office until Oct 19, 2026" | 2026-10-14 |
| 1 | E19-07 | PASS | Human reply mentioning being out is a real reply: request excluded | 2026-10-14 |
| 1 | E20-01 | PASS | Ticket acknowledgement: "Auto-reply received", request stays awaiting | 2026-10-14 |
| 1 | E20-02 | PASS (label differs) | Gateway quarantine notice is not a reply, request stays awaiting; shown as "Delivery failed" because the notice says the message was not delivered | 2026-10-14 |
| 1 | E20-03 | PASS | Delivery failure: "Delivery failed", request stays awaiting | 2026-10-14 |
| 1 | E20-07 | PASS | Short real reply "ok" counts as a reply at stage 1: request excluded | 2026-10-14 |
| 1 | Threading | NOTE | Replies from the mailer join an Outlook-sent request only when they carry In-Reply-To/References for its Message-ID (`test-mailer/request-ids.json`, found by asking the agent for `internetMessageId` on sentitems). After deleting and re-sending the 35 seed mails with those headers, E17, E19 and E20 became testable | 2026-10-14 |
| 1 | Run-to-run variation | NOTE | Two identical Preview runs differed on E17-02, E19-01 and E19-03. Treat a single run as indicative; rerun a test before calling it FAIL | 2026-10-14 |
| 1 | Backdated mail | NOTE | A mail sent with a `Date` header 10 days old still shows the arrival time in Outlook (Wed 10/14/2026 6:57 PM, not Oct 4), so mail cannot be made old by backdating. Age tests use the as-of override (Preview chat, manual run, or `AS_OF_DATE`), which tests the agent's date math but not real elapsed time. Real elapsed time can only be checked by waiting days or by a scheduled run later | 2026-10-14 |
| 1 | A6-12 | PASS | As of 2026-10-15, Delivery date request (sent Oct 14): Recent, 1 day waiting | 2026-10-14 |
| 1 | A6-13 | PASS | As of 2026-10-16: Aging, 2 days | 2026-10-14 |
| 1 | A6-14 | PASS | As of 2026-10-17: Aging, 3 days | 2026-10-14 |
| 1 | A6-15 | PASS | As of 2026-10-18: Overdue, 4 days | 2026-10-14 |
| 1 | A6-16 | PASS | As of 2026-10-20: Overdue, 6 days. Each run used a fresh Preview chat and the sent message text was checked first | 2026-10-14 |
| 1 | E13-01/E13-02 (sent side, 14 days) a | PASS | As of 2026-10-27 (13 days): request shown, Overdue, 13 days waiting | 2026-10-14 |
| 1 | E13-01/E13-02 (sent side, 14 days) b | PASS | As of 2026-10-29 (15 days): request not shown, board empty, window printed as Oct 15–29 | 2026-10-14 |
| 1 | E13-06 | N/T | Needs an ask and a reply on different days (ask D-13, reply D-12). All seeded mail arrives today, and mail cannot be backdated, so the one-day gap cannot be made | 2026-10-14 |
| 1 | Skip rule | NOTE | Skip any test that needs two seeded mails on different real days, or real elapsed time between them. Tests that only age one mail with the as-of override are valid and stay | 2026-10-14 |
| 1 | E13-01/E13-02 (sent side, LOOKBACK_DAYS 7) a | PASS | `LOOKBACK_DAYS 7`, as of 2026-10-20 (6 days): request shown, Overdue, 6 days waiting | 2026-10-14 |
| 1 | E13-01/E13-02 (sent side, LOOKBACK_DAYS 7) b | PASS | `LOOKBACK_DAYS 7`, as of 2026-10-22 (8 days): request not shown, board empty, window printed as Oct 15–22 | 2026-10-14 |
| 1 | Paging wording (item 4) | NOTE | Failed paging step input was not captured (trace gone, mailbox too small to page again). Prompt 1 now says to pass `next_page_token` in the tool's page-token input (probably `page_token`) and never in the query or filter. The input name is a guess: confirm it next time a run pages (80-mail seed) | 2026-10-14 |
| 1 | Item 5 (scheduled path, A12-08 to A12-11) | N/T | Skipped by choice: the agent is a draft and Run now needs a publish, which would put the 3:45 pm weekday schedule live | 2026-10-14 |
| 1 | Item 6 (save version) | DONE | Version `v1-lookback-dates` saved in the builder history (7:28 PM). It holds the Instructions as pasted, with the old paging sentence; it is not published. No earlier `v0-parity` version exists in history, so there is no rollback target before this one | 2026-10-14 |
| 1 | E06-01 (rerun) | PASS (flaky) | Vendor onboarding checklist, follow-up "Just checking": run 2 gave one card, "Original/latest Oct 14, Alice · 2 messages". Run 1 gave that card plus a second "Re: Vendor onboarding checklist" card ("Original outside window", 1 message), so the same ask showed twice | 2026-10-15 |
| 1 | E11-06 (rerun) | PASS | Weekly report, "by end of week", sent Wed Oct 14: Due Oct 16, 2026 (Fri), both runs | 2026-10-15 |
| 1 | E11-10 (rerun) | PASS | Audit evidence, "Oct 20 and 10/20": one card, Due Oct 20, 2026 (Tue), both runs | 2026-10-15 |
| 1 | E17-02 (rerun) | PASS | Both To recipients replied: request excluded in both reruns (earlier run 1 had kept it, so it is flaky overall: 3 of 4 runs correct) | 2026-10-15 |
| 1 | E19-01, E19-05 (rerun) | PASS | Out-of-office request stays on the board: "Out of office until Oct 19, 2026; delegate Bob", Recent, 1 day, both runs | 2026-10-15 |
| 1 | E19-03 (rerun) | PASS | Real reply after an out-of-office: request excluded in both runs. With E19-01 now a separate conversation, the two tests no longer contradict each other | 2026-10-15 |
