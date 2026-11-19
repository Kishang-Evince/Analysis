# T1 variance analysis: why one run drops most of the board (2026-11-06)

Same mailbox, same form defaults, five chat only runs.

| Run | Mode shown | Time, credits | Cards | Anchors | Note |
|---|---|---|---|---|---|
| R1 | morning | 96.8 s, 1.68 | 18 | 6 of 6 | full |
| R2 | morning | 57.5 s, 0.81 | 10 | 5 of 6 | partial, trace not kept |
| R3 | morning | 93.2 s, 1.75 | 18 | 6 of 6 | full, one thread split in two cards |
| R4 | end-of-day | not kept | 1 | 1 of 6 | picked end-of-day at 11:49 IST, trace not kept (debug view never loaded) |
| R5 | morning | 44.5 s, 0.74 | 1 | 1 of 6 | trace kept, below |

## R5 trace (the short run)
Order of the main agent:
1. Read the help of the list messages tool (shell).
2. Retrieve saved memory (personal knowledge vault).
3. One shell command that makes three List messages calls: unread inbox 33 messages (43 KB), sent items 24 messages (33 KB), read inbox 6 messages (8.5 KB). The results are saved to files in the sandbox.
4. **One shell step that prints two of the saved files with cat, 49 KB, described as "Reviewing recent email results".** The three results are never parsed one by one.
5. Read the three skills, then run the ignore filter script (it worked, nothing hidden, 3 files).
6. **One Get email message call** for a single message (the full runs make about 15).
7. notes-keeper, calendar, then render. The render summary says cards 1: Security training evidence in Must Do Today.
8. Open the board in the canvas. Final sentence: "One direct request needs your attention: send Alice proof of completed security training."

What it should have done (main text steps): classify every unread inbox message (Steps 3, 3B, 3C, 3D), look at the 24 sent items for waiting on others (Step 4) and read the full body of every candidate. The main text says to run the steps in order and not skip or merge any. The model skipped the per message reading and the sent items analysis.

## What the five runs show
- The data is complete in every run. The three List messages calls return the same 33, 24 and 6 messages.
- The depth of the model's reading is what varies. The full runs loop over every message and read about 15 bodies. The short runs print a large raw dump once and decide from a skim. The cheapest run is the one that dropped the board.
- R4 shows a second failure: the brief mode was end-of-day at 11:49 IST (auto should give morning before 12:00) and its summary line said 33 emails excluded as noise, so every unread message was dismissed at once.
- Section moves and split threads (T1 result) come from the same cause: the classification is done by the model judging free text.

## Options to remove the variance
1. **A triage script, like the ignore filter.** It reads the three saved List messages files and prints one compact table per conversation: id, subject, sender, dates, read state, categories, whether a later sent reply exists in the same conversation, and the sent items still without a reply. The model then reads a table of about 40 lines instead of 85 KB of raw JSON, and Step 3B reads the full body of every listed candidate. It also fixes thread splits, because conversations are grouped by conversationId in code.
2. **A completeness gate.** A short script that compares the number of cards on the board with the number of candidate conversations from the table and refuses to render when candidates are unclassified.
3. **A mode script.** One command that prints the mode (morning or end-of-day) from the clock in the user's time zone, so the model never decides it.
4. Prompt wording changes only (for example "never use cat on the saved results"). Cheapest, but the earlier fixes in this project show that wording alone does not hold, so I do not recommend relying on it.

Recommended: options 1 and 3 first, then option 2 if drops still happen. Each is a skill with a script and unit tests, the same pattern as the ignore filter.

## Round 2: triage script, morning mode (2026-11-18)

Same mailbox, chat only, form defaults except MODE morning and the test date November 6, 2026. The seed mail is 12 days old, so with today's date the read seed mails would fall outside READ_DAYS and the anchors could not appear for a reason that has nothing to do with variance.

| | R1 | R2 | R3 |
|---|---|---|---|
| Time, credits | 81 s, 2.29 | 92 s, 3.17 | 116 s, 2.53 |
| Cards | 18 | 12 | 17 |
| Must do / waiting on you / waiting on others / review | 4 / 13 / 1 / 0 | 2 / 6 / 1 / 3 | 4 / 12 / 1 / 0 |
| Anchors | 6 of 6 | 5 of 6, Vendor onboarding checklist only as a Re: card in Review quickly | 6 of 6 |
| Triage script | ran first, 38 conversations, 1 awaiting | printed the script source, then ran it, same table | skill read, script never run, the model wrote its own parsing |
| Full body reads | 15 | 15 and 2 more | 10 and 2 more |
| Failed steps | none | none | one Get email message error |

Left out by R2: Weekly report, Late-night schedule request, Compliance attestation, Security training evidence, Launch checklist, Partner agreement review. Left out by R3 compared with R1: Compliance attestation. R3 shows Launch plan v1 where R1 shows Re: Launch plan v1.

Cards that moved section: Weekly report (must in R1, waiting on you in R3, absent in R2), Deck for the steering call (waiting on you in R1 and R2, must in R3), Quick ask: confirm headcount (waiting on you in R1 and R2, must in R3), Training plan sign-off (must in R1 and R2, waiting on you in R3), Re: Launch plan v1 (waiting on you in R1, review in R2).

Result: FAIL, variance remains. The table helps only when the model runs it (R1 and R2), and R2 ran it and still dropped six cards. R3 skipped the script after reading its skill, so the Step 1C line is too weak to force the call.

## Round 3: stronger Step 1C and the completeness gate (2026-11-18)

Same setup as round 2 (morning mode, test date November 6, 2026, chat only), two runs after the Step 1C line became "Run the script of the skill triage-board and bucket every row it prints." and the gate was added to the skill.

| | A | B |
|---|---|---|
| Time, credits | 109 s, 2.14 | 98 s, 2.72 |
| Cards | 11 | 15 |
| Must do / waiting on you / waiting on others / review | 2 / 8 / 1 / 0 | 4 / 10 / 1 / 0 |
| Anchors | 5 of 6, Training plan sign-off missing | 6 of 6 |
| Triage script run | no, the model printed its source with sed and went on | no, the model wrote its own parsing |
| Gate run | no | yes, printed ok 39 of 39 rows accounted |

In run B the gate passed for the wrong reason. The model wrote classified.json with one generic reason ("not actionable or surfaced as a card") for all 38 inbound rows and a second one for the sent row, so every row counted as accounted for. Run A never called the gate.

Across the five morning runs since the triage skill exists (18, 12, 17, 11 and 15 cards) the spread is the same as before it (18, 10 and 18). Reading a skill does not make the model run its script, and a gate that accepts any non-blank reason can be passed without looking at a row.

Options: put the exact command in the Step 1C line (the 47 character body would become about 62, 42 characters are free), make the gate refuse repeated or very short reasons, or move the classification out of the single long run (a sub-agent that classifies the table in batches). None is built.

## Round 4: command in Step 1C, stricter gate, KPI tiles and FOCUS (2026-11-18)

Changes before this round: the Step 1C line names the exact command, the gate refuses a reason shorter than 15 characters or 3 words and a reason shared by more than 3 rows, the two Step 1 timestamps say UTC, the board shows KPI tiles and hover texts, and the run form has a FOCUS input (4 options, default full board). Same setup as before (morning mode, test date November 6, 2026, chat only).

| | Run 1 (flaky) | Run 2 | Run 3 (FOCUS commitments only) |
|---|---|---|---|
| Time, credits | 56 s, 0.91 | 111 s, 2.51 | not read |
| Result | empty board, "Inbox is clear" | 19 cards (3 / 14 / 1 / 1), 6 of 6 anchors | commitments only board, Others owe me: Alice Morgan, Open, no own commitments |
| Triage script run | yes, `files 3 conversations 0` | yes, 32 conversations and 1 awaiting | not read |
| Gate | not reached | ran 3 times: missing 20 of 39, missing 3 of 33, then ok 33 of 33 | not read |

Run 1 was a query problem and not a sorting problem. The model sent `received_date_time_ge='2026-10-23T00:00:00+05:30'` and all three mail queries came back empty, so the board was empty. This is the first time in about 15 runs. The two timestamp lines now say UTC to make the model use a Z time.

Run 2 is the first run where the gate did real work. It listed 20 conversations nobody had looked at, then 3, and the model wrote a specific reason for each (for example "Substantive approval response closes the budget request"). The board has 19 cards, the highest count so far, and all 6 anchors. The Vendor onboarding checklist thread is still shown twice (original and Re:), and Launch plan v1 sits in Review quickly.

One good run does not prove the spread is gone. Earlier rounds gave 18, 12, 17, 11 and 15 cards. Run it a few more times before calling the board stable.

## Round 5: three more morning runs (2026-11-19)

Same setup as round 4 (morning mode, test date November 6, 2026, chat only, FOCUS full board, no changes to the agent between runs).

| | Run 1 | Run 2 | Run 3 |
|---|---|---|---|
| Time, credits | 115 s, 2.40 | 132 s, 2.86 | 114 s, 2.88 |
| Cards | 18 | 18 | 15 |
| Must do / waiting on you / waiting on others / review | 3 / 14 / 1 / 0 | 4 / 13 / 1 / 0 | not read |
| Anchors | 6 of 6 | 6 of 6 | 5 of 6, Training plan sign-off missing |
| Gate | missing 23 of 41, then ok 41 of 41 | ok 41 of 41 | ok 33 of 33 |

Run 3 left out Training plan sign-off, Weekly report and Late-night schedule request, and the gate still passed, so the model had written a reason for each of them. The gate finds rows nobody looked at, it cannot tell that a reason is wrong.

Cards in the last four runs after the changes: 19, 18, 18 and 15 (anchors 6, 6, 6 and 5 of 6). Before the changes: 18, 12, 17, 11 and 15. The worst run is 15 instead of 11 and three of four runs hold every anchor. It is better, and it is not yet steady.

## Round 6: four more fixes and six runs (2026-11-19)

Same form every time: morning, 30 days, chat only, no AS_OF_DATE (today is Nov 19). The mailbox now also holds the test mails C-02 to C-04 and the Audit evidence pair, so these counts are not comparable with rounds 2 to 5.

What was built (all in scripts, tested, uploaded to V2):
1. Automated mail flag. The triage table marks a row `auto` (no-reply or newsletter sender, automatic reply, undeliverable). The gate counts such a row as handled and refuses a card for it.
2. Duplicate twin of an ignored mail is hidden too (same subject, sender and day).
3. The gate runs inside the render step. The board page is not drawn while the gate refuses, the script prints the missing rows and exits with code 3. Run 3 showed why: the model ran the gate before the board file existed, ignored "no board.json found" and drew the board anyway.
4. Reason codes. A reason for a row without a card must start with ACK, INFO, DUP, REPLIED or LATER. The script checks DUP (the row has a same-subject twin), REPLIED (a sent message is newer), refuses an ACK or INFO reason that names a request or an ask, and allows LATER only on a board that hides sections on purpose.
5. Age fact. The table shows `age Nd` and `old` or `new` (read and older than READ_DAYS). Run 5 had kept read mail from Nov 6 that the Step 1 rule says is handled.

Runs:

| Run | Version | Cards | Gate |
|---|---|---|---|
| 1 | automated flag, duplicate hide, free reasons | 22 | ok 48 of 48 first time |
| 2 | same | 19 | ok 48 of 48 (it ran before the board existed) |
| 3 | codes, gate still before the board | 16 | gate bypassed, "no board.json" |
| 4 | gate inside render | 18 | refused 1 card, then missing 18, 2, 1, then ok |
| 5 | same | 21 | ok at the first try |
| 6 | age fact added | 11 | missing 7, then ok |

Result: the gate now bites (run 4 and run 6 show it listing rows and the model fixing them), automated mail never becomes a card, and the ignored twin stays out. The card count is still not steady (11 to 22). Findings:
- Run 5 against run 4: the extra cards were old read mail (Training plan sign-off, Late-night schedule request, Weekly report). The age fact removes that cause.
- Run 6 went the other way. Under the gate the model reworded its reasons until the script accepted them and dropped real unread asks (Quick ask: confirm headcount, Draft proposal, Compliance attestation, Partner agreement review) with "DUP" and "INFO" reasons. DUP was refused first (no twin), then the model switched to INFO without the word request. The script cannot judge whether a human mail holds an ask, that stays a model judgment.
- So the spread from the choice of cards that need judgment is not fixed, and tighter gate rules push the model to bend its wording, not to look again.

Options for the remaining spread (user decision):
1. Accept 11 to 21 and show the full list of what was left out and why in a collapsed "Left out" section, so a missing card can be seen at once (cheap, honest).
2. Make the script decide the clear class: every unread, human, new mail with no sent message after it is a card, the model may only exclude it with REPLIED (checked) or ACK, and a second model pass reviews each exclusion (costs one more pass, about 20 s and 0.3 credits).
3. Wait for the model benchmark (a model that follows rules more steadily).
