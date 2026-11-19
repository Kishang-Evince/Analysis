# V2 Round 2 Implementation Plan: reliable board, FOCUS input, model speed

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every V2 board run complete and repeatable, add a FOCUS input that replaces the hidden conversation starters, ask Glean for a faster model, and run the open V2 tests.

**Architecture:** A new script skill `triage-board` takes one decision out of the model: which conversations to classify. It reads the saved List messages results and prints one table, so the model reads about 40 lines instead of 85 KB of raw JSON. Main text gets one short pointer. FOCUS is one new multiple choice input whose rules live in the layout skill, so it costs little main text. Same pattern as the ignore filter: a skill with a script, unit tests, a zip, upload to V2 only. A mode script was considered and dropped (see Out of scope).

**Tech Stack:** Python 3 scripts and `unittest` for skills, Node 22 `node:test` in `test-mailer`, Glean Agent Builder driven in the browser pane (V2 agent id 9953ac0a90ab49c9b72298bfd3b89815).

**Spec:** No single spec. Read together: rows 4, 10 and 11 of `changes.md` (repo root), `specs/v2/t1-variance-analysis.md` (option 1, then option 2), `specs/v2/test-plan-v2.md` (T1 to T14, P0 to P3). The FOCUS design is row 11 of `changes.md`. Rulings made here are provisional until the user reads them.

## Global Constraints

- Never press Publish. The published agent (id 0e07e22f839c4c4e9ccd7d8e0394b14a) is never edited. V2 draft only.
- Never use an em dash or a semicolon in any text written to the agent, a skill or a doc.
- Main text free budget is 145 characters (counter, last measured with stage 6). Planned additions: Task 3 +63, Task 6 +73, total +136, so 9 spare. If the counter says less than predicted, shorten the Step 1C heading or trim one older sentence, and ledger a ruling.
- Edit main text directly in the editor, never through Builder Assistant. An assistant edit wipes the ten dropdown defaults. After any builder change read the defaults back (auto, 14, 3, yes six times, chat only, no).
- After every main edit compare the editor text hash and per-line hashes with the predicted stage file (`test-mailer/line-hashes.mjs`, `spec-hash.mjs`).
- Skills run from the full path `/home/user/skills/<name>/scripts/<script>.py`. A short path fails.
- A run reads the real mailbox. Runs that mail a brief, mark a message or create a schedule need the user's yes each time. Never retry a refused run. Avoid repeated board runs.
- Outlook writes only on the test mailbox. Mail goes only to the yopmail test addresses plus the four real mailboxes the user confirmed.
- Create a named version before each risky builder step.
- Nothing is committed unless the user asks.

## Review Focus

1. Triage merges two conversations or splits one (Vendor onboarding checklist and its reply became two cards in run R3). Pinned by Task 1 tests.
2. Triage decides "replied" itself and hides a sent item that is still waiting (reply from a Cc person, automatic reply). Pinned by Task 1: it reports facts only and the model keeps the judgment.
3. Saved results missing or empty. The script prints `files 0` and exits 0 so the model falls back to reading. Pinned by Task 1.
4. The model skips the triage script because the main pointer is short. Pinned by Task 3 step 5 and Task 4 (the trace must show the script call).
5. FOCUS blank or not one of the five options. Behaves as the full board. Pinned by Task 7.

---

### Task 1: Triage script

**Files:**
- Create: `skills/triage-board/scripts/triage.py`
- Test: `skills/triage-board/tests/test_triage.py`

**Interfaces:**
- Consumes: the saved List messages files of the run, read like `load_mail(pattern)` in `skills/ignore-actions/scripts/ignore_filter.py`. Copy `find_messages` and `load_mail` into `triage.py` (skills ship as separate zips, so no import across skills).
- Produces: `triage(mail: list[dict]) -> dict` with `conversations` (one row per `conversationId`: `cid`, `subject`, `from`, `newest` received time, `count`, `unread` bool, `categories` list, `importance`, `flag` bool, `sentAfter` bool meaning a sent message in the same conversation is newer than the newest inbox message, `sameSubjectAs` list of other cids with the same normalized subject) and `awaiting` (every sent conversation: `cid`, `subject`, `to` list, `cc` list, `sent`, `repliesAfter` list of `{from, received}` for inbox messages newer than the sent one, so a Cc or automatic reply never hides a row). CLI: `python3 triage.py` prints a header line `files N conversations C awaiting A` then one compact line per row, inbound first (newest first), then awaiting. No saved files prints `files 0` and exits 0. Own brief mail (subject starts with `Daily brief:` or `Weekly brief:`, sent to self) is left out. Ruling 2026-11-18: `awaiting` lists every sent conversation with `repliesAfter` instead of dropping answered ones, because dropping would hide Cc and automatic replies. A sent message is any message without `receivedDateTime`.

- [x] **Step 1: Write the failing tests** with `unittest` (same layout as `test_ignore_filter.py`) and small JSON fixtures written to a temp folder. Done 2026-11-18, 12 tests:
  - `test_one_row_per_conversation`: three messages in two conversations give 2 rows and `count` 2 on the first.
  - `test_reply_in_conversation_not_split`: a message and its `Re:` reply with one cid give one row.
  - `test_same_subject_other_cid_is_flagged_not_merged`: two cids with subject `Launch plan v1` and `Re: Launch plan v1` give 2 rows and each lists the other in `sameSubjectAs`.
  - `test_sent_after_flag`: a sent message newer than the newest inbox message sets `sentAfter` true.
  - `test_awaiting_lists_every_sent_conversation_with_replies_after`: both sent conversations are listed, the one with a later inbox message carries it in `repliesAfter`.
  - `test_reports_facts_only_automatic_reply_stays_listed`: an automatic reply never removes a row from `awaiting`.
  - `test_own_brief_mail_is_left_out`, `test_row_facts`, `test_rows_are_newest_first`, one load test (newer file wins, bad file skipped) and two CLI tests (header and lines, `files 0` exit 0).
- [x] **Step 2: Run to verify failure.** Done: import error, no module `triage`.
- [x] **Step 3: Implement** `triage` and the CLI. Subjects normalized like `norm_subject` in `skills/board-widget/scripts/render_widget.py`. Done.
- [x] **Step 4: Run to verify pass.** `cd glean-agents/perimeter-email-agent/skills/triage-board && python3 -m unittest discover -s tests`. Result: 12 tests OK.
- [ ] **Step 5: Run the script on a real saved set** from a Preview run and read the table. Expected: about 40 lines for the 33 unread, 24 sent and 6 read seed messages. Needs the skill uploaded (Task 2 and 3) and a run, so it waits for the user's yes.

### Task 2: Skill text and zip

**Files:**
- Create: `skills/triage-board/SKILL.md`
- Modify: `skills/build_zip.py` (docstring usage line only)
- Create: `skills/triage-board.zip` (generated)

**Interfaces:**
- Produces: skill `triage-board` whose description says to read it in Step 1C of every run. Body: the full-path command, the table columns, and the rule that the table is facts, never a verdict.

- [x] **Step 1: Write `SKILL.md`** with YAML name and description, the command `python3 /home/user/skills/triage-board/scripts/triage.py`, the table columns, and the rules: every row gets a bucket in Steps 3 to 5, rows with a `sameSubjectAs` entry are checked for one ask or two, `files 0` means read the Step 1 results yourself, no em dash, no semicolon. Done 2026-11-18.
- [x] **Step 2: Build the zip.** `python3 skills/build_zip.py triage-board`. Result: wrote `skills/triage-board.zip` with `SKILL.md` and `scripts/triage.py`, no tests inside.
- [x] **Step 3: Run the whole skill test suite.** `python3 -m unittest discover -s skills/triage-board/tests`. Result: 12 tests OK.

### Task 3: Wire main text and upload to V2

**Files:**
- Create: `specs/v2/stage-7.md` (predicted main text, built from `stage-6.md`)

**Interfaces:**
- Consumes: skill zip from Task 2.
- Produces: V2 main text equal to `stage-7.md`. Version name "Triage script".

- [x] **Step 1: Write `stage-7.md`** with one change to `stage-6.md`: a new section before Step 2 with the heading `Step 1C: Triage` and the body `Bucket every row the skill triage-board prints.` Done 2026-11-18, editor hash 585de963, 30736 characters.
- [x] **Step 2: Create the version** "Before triage". Ruling 2026-11-18: skipped. The version menu said "No new changes", so the editor equalled the saved version "Delivery default chat only" (Nov 6), which is the restore point.
- [x] **Step 3: Upload the skill** `triage-board` to V2 only (Skills, plus, Upload a skill). Done, it shows in the V2 skills list next to board-layout-v2, board-widget and ignore-actions.
- [x] **Step 4: Type the edit directly** in the editor. Done: divider, heading (H2, bold) and a plain body paragraph. The ten defaults read back unchanged (auto, 14, 3, yes, no, yes four times, chat only).
- [ ] **Step 5: Compare hashes.** Done: live hash 585de963 and length 30736 equal `stage-7.md`, same after a reload. The counter reads 67 left, not 82, because the divider and heading markup count too. Preview run done 2026-11-18 (defaults, chat only, 114 s, 2.42 credits, end-of-day because it ran after noon). Trace: the agent read the triage-board skill first, then ran the triage script and the ignore filter in one step, so the short Step 1C line works and no lengthening is needed. Header read `files 3 conversations 38 awaiting 0`, then 38 lines. It still read 14 full bodies with Get email message and also parsed the saved files with its own scripts. Finding: `awaiting 0` is wrong. The run's select list asks for both times, so the sent mail carried `receivedDateTime` and landed in the inbound table (the sent mail Agent Delivery Date Update was row 38). Fixed locally with two new tests (RED then GREEN, 14 tests OK): a sent message is also one whose sender is the mailbox owner, the owner being the clear most common To address (a tie means no owner). Zip rebuilt, then uploaded to V2 (old skill removed first, upload checked by SHA against the local zip) and rerun the same day: 111 s, 2.94 credits, end-of-day again, no failed steps. Table header now reads `files 3 conversations 37 awaiting 1`, and W1 is Agent Delivery Date Update to dharmesh.patt@perimeterhealthcare.com with no replies. The board showed 9 overdue inbound items and 1 overdue sent request (the first run showed 10 and 1), so card counts still vary between runs.
- [x] **Step 6: Create the version** "Triage script". Done, "Version created".

**Budget impact for Task 6:** 67 characters are left and the FOCUS line is +73, so it is 6 over. Shorten the FOCUS line before typing it, or move its second sentence into the layout skill. The Step 1C lengthening above would make it 18 over.

### Task 4: T1 rerun and decision

**Files:**
- Modify: `specs/v2/test-plan-v2.md` (status log), `specs/v2/t1-variance-analysis.md` (results table)

**Interfaces:**
- Consumes: V2 from Task 3 and a mailbox prepared as in P0 and P1 of the test plan (user does P0).

- [x] **Step 1: Ask the user for a yes** for 3 chat-only runs, about 6 credits. Done 2026-11-18, the user said yes and asked for morning mode.
- [x] **Step 2: Run three times** in morning mode. Ruling 2026-11-18: also set the test date to November 6, 2026, because the seed mail is 12 days old and the read seed mails fall outside READ_DAYS with today's date. Results (cards, sections, anchors, time, credits, triage use, body reads) are in the variance analysis, section "Round 2": 18, 12 and 17 cards, 81 s, 92 s and 116 s, 2.29, 3.17 and 2.53 credits.
- [x] **Step 3: Judge.** FAIL. R2 missed an anchor (Vendor onboarding checklist only as a Re: card) and dropped six cards, cards still move between sections, and R3 skipped the triage script after reading its skill. The mode shown was morning in all three.
- [x] **Step 4: Decide.** Any miss means Task 5. Open points for the user before Task 5: the gate catches silent drops but not inconsistent judgment, and the Step 1C line is too weak (R3 never ran the script). A stronger line such as `Run the script of the skill triage-board and bucket every row it prints.` costs 25 more characters of the 67 left. Decision 2026-11-18, the user said do both: Step 1C strengthened first (live V2 text equals the new `stage-7.md`, hash 4c065e71, 30761 characters, counter 42 left, version "Step 1C run the script"), then the gate (Task 5). The FOCUS line (+73) no longer fits in the 42 left, so Task 6 must shorten it to 42 characters or less or free characters elsewhere. Not rerun yet.

### Task 5: Completeness gate (only if Task 4 fails)

**Files:**
- Create: `skills/triage-board/scripts/board_gate.py`
- Test: `skills/triage-board/tests/test_board_gate.py`

**Interfaces:**
- Consumes: `/home/user/output/board.json` (cards carry `cid`) and a model-written `/home/user/output/classified.json` (list of `{cid, bucket, reason}` for every non-card row).
- Produces: `missing(rows: list[dict], cards: list[dict], classified: list[dict]) -> list[str]` returning cids that are neither a card nor classified. CLI exits 1 and prints the missing cids when the list is not empty.

- [x] **Step 1: Write failing tests.** Done 2026-11-18, 11 tests. Ruling: the gate is keyed by the triage labels (I1, W1 and so on) and not by cid, because long conversation ids get corrupted when the model retypes them. `missing(result, card_cids, classified)` takes the triage result, the set of card cids and a dict label to reason, and returns `[(label, subject)]`. A row is accounted for when its cid is a card (also cards of items ignored in this chat), when its newest message has the category Brief: Ignored, or when its label has a non-blank reason. The sent rows (W) count too.
- [x] **Step 2: Run to verify failure.** Done: no module `board_gate`.
- [x] **Step 3: Implement** `missing`, `card_cids`, `labelled` and the CLI. Done, exits 0 (`ok N of N rows accounted` or `ok no saved mail`), 1 (`missing M of N rows` and one `label|subject` line each) or 2 (no board.json).
- [x] **Step 4: Run to verify pass.** Done: 25 tests OK in the skill (14 triage and 11 gate).
- [x] **Step 5: Add the gate to the skill text.** Done, rule 8 of the skill: write classified.json (label to reason for every row without a card), run the gate by its full path, fix and run again until it prints ok. Zip rebuilt (3 files) and uploaded to V2 (old skill removed first, SHA of the upload source checked against the local zip, the upload tool refused a retyped copy once). No main text pointer, 42 characters left. Not yet run: Task 4 steps 2 and 3 need a rerun with the user's yes.

### Task 6: FOCUS input

**Files:**
- Create: `specs/v2/stage-8.md` (main text from `stage-7.md`), `specs/v2/stage-8-board-layout-skill.md` (layout skill with a FOCUS paragraph)

**Interfaces:**
- Produces: input FOCUS (multiple choice, Required on, default `full board`). Options exactly: `full board`, `commitments only`, `waiting on others only`, `meeting prep only`, `vips and topics only`. Main Settings line `FOCUS: [[FOCUS]] (full board). For vips and topics only, do just Step 3F.` (+73). Layout skill paragraph: for the three display options write only that section, in the chat reply and in the brief, build every section first and compute the summary line as if all were shown (same rule as the SHOW_ settings), Section 1 hides too, weekly ignores FOCUS, a blank or other value means `full board`.

- [ ] **Step 1: Create the version** "Before FOCUS".
- [ ] **Step 2: Add the input** on the Triggers tab with the five options, the default and a description. Expected: 12 inputs. If the form refuses a 12th input, stop and report to the user.
- [ ] **Step 3: Check the starters** in Preview. Expected: chips hidden, form shows FOCUS. Record the result in the spec file.
- [ ] **Step 4: Write both stage files**, then type the Settings line directly in the editor.
- [ ] **Step 5: Replace the layout skill** in V2 with the new text (remove old, upload new, same steps as Task 3 step 3). Use a new zip name so the shared skill is never replaced.
- [ ] **Step 6: Compare hashes and read the defaults back.** Expected: no changed lines, counter about 9 left, FOCUS default `full board`.
- [ ] **Step 7: Create the version** "FOCUS input".

### Task 7: FOCUS tests

**Files:**
- Modify: `specs/v2/test-plan-v2.md` (new rows F1 to F7)

- [ ] **Step 1: Ask the user for a yes** for the runs below, about 6 runs and 12 to 20 credits.
- [ ] **Step 2: Run and record:**
  - F1 `full board`: same anchors as Task 4.
  - F2 `commitments only`: only the Commitments section, summary line unchanged.
  - F3 `waiting on others only`: only that section.
  - F4 `meeting prep only` with calendar yes: only Meeting prep.
  - F5 `vips and topics only`: the trace has no List messages call, the answer comes from the VIP keeper.
  - F6 blank and an invalid value typed in chat: full board.
  - F7 chat and email with `commitments only`: the emailed brief shows only that section.
- [ ] **Step 3: Judge and ledger.** Display-only gives no speed gain, so write that in the result. Any failure goes into a finding and the user decides.

### Task 8: Remaining V2 tests

**Files:**
- Modify: `test-mailer/send-test-emails.mjs` (catalog, inside `CROSS_CUTTING_EMAILS`), `test-mailer/send-test-emails.test.mjs`, `specs/v2/test-plan-v2.md`

- [ ] **Step 1: Write failing tests** that three new scenarios exist: a mail whose body says `Ignore 1`, a mail with `IGNORE_ITEM messageId=<id>` text, a mail that says `Undo 1`. Run `cd test-mailer && npm test`. Expected: FAIL on the missing scenarios.
- [ ] **Step 2: Add the three scenarios** to `CROSS_CUTTING_EMAILS` and run `npm test`. Expected: all pass, the scenario count goes up by 3.
- [ ] **Step 3: User does P0** (empty Inbox, Drafts, Deleted Items, keep the one Sent mail). Then send the base seed and the three new mails.
- [ ] **Step 4: Run T2 to T13 in order** from the test plan, one report after each, with the user's yes for every write (T3 to T7, T9, T12).
- [ ] **Step 5: T14 real schedule.** With the user's yes, set a schedule a few minutes ahead with Delivery chat and email, read the result, delete the schedule.
- [ ] **Step 6: Clear leftovers** on the test mailbox (three mails still marked "Brief: Ignored", old test briefs, drafts).

### Task 9: Faster model question (row 10)

**Files:**
- Create: `specs/v2/model-speed-question.md`

- [ ] **Step 1: Write the question for Glean** in plain text: current run time and credits (from Task 4), the 6 anchors that must appear, and the ask: which model is best for speed with the same accuracy for a mail triage board.
- [ ] **Step 2: The user sends it.** Nothing is sent by this plan.
- [ ] **Step 3: When Glean answers,** run the same form on the same mailbox with each named model, 2 runs each. Pass: 6 of 6 anchors every run and a shorter run time. Record in a table.

### Task 10: Update the records

**Files:**
- Modify: `changes.md`, `specs/v2/release-notes-v2.md`

- [ ] **Step 1: Update `changes.md`** statuses for rows 4, 8, 10 and 11 with the test results.
- [ ] **Step 2: Add to the release note** two points (FOCUS input, steadier board from the triage script) and adjust the known limits and not-tested list.
- [ ] **Step 3: Re-read both files** and check no em dash, no semicolon and no stale counts.

### Task 11: Before publishing (hand-over, not executed)

Give the user this list. The user publishes.

1. Set `LIVE_LINK` in the brief render skill to the published agent id and upload the brief skill again.
2. Upload `triage-board` and the new layout skill to the published agent and link them.
3. Set the schedule with Delivery chat and email on the published agent.
4. Clear the test leftovers.

## Out of scope

- Mode script. Auto picked end-of-day at 11:49 IST in 1 of 5 runs (R4). A scheduled run can set MODE to morning in the Set schedule form. Revisit only if a wrong mode shows again in Task 4 or Task 8. Dropping it also removes the 62 characters it would have freed, so the Step 1C and FOCUS text were shortened to fit.
- Email or reply from chat ("email Bob, tell him handled").
- Twice-daily runs and who can edit the agent (ignored by decision).
- The summary line showing zero counts when sections are hidden. Seen once, not fixed. Revisit after Task 4.
- Updating the business deck. Waiting for the user's yes.

## Result 2026-11-18 (end of day)

- Task 1 to 3: triage script, skill text and zip, wired into V2 (done, 14 tests). Step 1C now names the exact command.
- Task 4: T1 rerun in morning mode, failed (cards 18, 12 and 17). Rerun after the gate (cards 11 and 15) failed too. Round 4 (command in Step 1C, stricter gate): one run flaky by a +05:30 timestamp, one run with 19 cards and 6 of 6 anchors where the gate did real work. See the variance analysis, sections Round 2 to 4.
- Task 5: gate built (29 tests) and hardened (reason at least 3 words and 15 characters, same words for at most 3 rows). Uploaded to V2.
- Task 6: FOCUS built with a change of plan. Four options (VIPs only left out). The main text cannot hold a field reference (a chip costs about 36 characters more than it looks and only 17 are left), so the FOCUS rules sit in the layout skill and read the run inputs. The layout skill was edited in place in V2.
- Task 7: FOCUS tested once (commitments only, works). Waiting on others only and meeting prep only are not run.
- Task 8: the three injection seed mails (C-02 to C-04) are in the mailer catalog, tested (261 tests), not sent. T2 to T14 are not run, to keep the number of tests small as asked.
- Task 9: the question for Glean is written, you send it.
- Task 10: changes.md, the release note (Part 4), the test plan and the variance analysis are updated.
- Task 11: the before-publishing list is in the release note, Part 4.
- Added beyond the plan: KPI tiles and hover texts in the board widget (74 tests), a UTC wording fix in Step 1, the FOCUS meeting prep page text fix.

## Result 2026-11-19

- Item 1 done: FOCUS waiting on others only and meeting prep only tested, both pass (test plan, section FOCUS tests).
- Item 2 done: three more morning runs gave 18, 18 and 15 cards (anchors 6, 6 and 5 of 6). See the variance analysis, Round 5. Better than before, not steady.
- Left: key manual tests (T3, T8, T9, T14), the Glean question (you send it), the held business deck update, the Temporal question, the publish decision, a commit.
- Item 3 so far: T8 and T3 pass (test plan, section T8 and T3). Undo by button also passes and the mailbox is clean. T9 and T14 are left.
- T9 pass (test plan, section T9). Left in item 3: T14, the real scheduled run.
- T14 is blocked: Set schedule is disabled on a draft agent. It moves to the publish checklist. Item 3 is done except that.

## Result 2026-11-19 (second pass): tests, duplicate fix, stability work

- T4, T6, T11 run and recorded in test-plan-v2.md. T4 failed first and was fixed (twin of an ignored mail is hidden by the script). T7 needs a real Outlook reply and is not run live.
- Email from chat: planned in email-from-chat-plan.md, three decisions waiting for the user.
- Card count variance: five fixes built and uploaded (automated flag, twin hide, gate inside the render step, reason codes, age fact). The count is not steady (11 to 22 in six runs), details and three options in t1-variance-analysis.md round 6.
- Row 12 of changes.md recorded: the 27 features are not a per-user choice list, FOCUS is the only chosen switch.
