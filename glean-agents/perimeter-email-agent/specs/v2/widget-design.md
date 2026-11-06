# Chat widget with Ignore buttons (phase 2), design for approval

The reader-facing summary of this build is in release-notes-chat-widget.md.

Status: draft 2026-11-05, nothing applied. V2 draft agent only, never the published Board. Follows ignore-design.md (section 10 and the probe results in section 12).

## 1. Goal

In an agent chat the brief is shown as an interactive HTML artifact: one card per item with an Ignore button. A click sends the chat message `Ignore N`, which runs the command path that is already built and tested (approval card, category set on the email, redraw). The emailed brief and the typed commands stay as they are.

## 2. Proven and not proven

Proven (2026-11-05): the contract `GleanBridge.postMessage({actionId, type: 'glean-send-message', metadata: {displayLabel, context}})` works in a regular Glean chat. The user clicked a test button, the chat received the context text word for word and the agent redrew the card with an Undo button.

Not proven, each has a test in section 8:
- U1 A file the V2 agent writes with Shell shows in chat as an interactive artifact (the probe artifact was made through Glean's Make interactive artifact flow).
- U2 The bridge exists in the V2 agent chat. The builder Preview has none (buttons are greyed), so the click is only provable in Preview in new tab (user click) or a live chat.
- U3 The Open email link works inside the sandbox (iframe sandbox allow-scripts only, no allow-popups).
- U4 The sandbox keeps files between chat turns (decides how Ignore and Undo redraw, section 5).
- U5 The admin setting Inline artifacts is on for this workspace (the test chat showed the inline card, so it is on).

## 3. Decisions

| # | Decision | Choice |
|---|---|---|
| W1 | Who makes the HTML | A script in a new skill board-widget, attached to the main agent only. The model writes JSON, never HTML. Same pattern as the email brief-render. |
| W2 | What the chat shows | The artifact replaces the markdown board in the chat reply. The VIP and topics line, note lines and summary line are inside the artifact. If the script fails the reply shows the markdown board as today. |
| W3 | Email | Unchanged. Step 10 still gets the markdown board text as BOARD. |
| W4 | Button message | Only `Ignore N` or `Undo N` (context), never an id. displayLabel is the readable form, for example Ignore "Audit evidence". One actionId per button (ignore-N, undo-N). |
| W5 | Card detail | The card shows number, sender, subject, ask, action, due, why included (with "New reply since ignored." marked), Open email link, Ignore button. Every other card line (confidence, ownership, original ask, latest update, messages, more asks, also waiting on, draft status) sits in a Details fold. Nothing is dropped. |
| W6 | Other sections | Commitments, Meeting prep, notes and the summary line are plain blocks without buttons. |
| W7 | Ignored area | "Ignored this session" block with one row and one Undo button per item, drawn by the script from the JSON. |
| W8 | Fallbacks | Typed `Ignore N` and `Undo N` keep working. No bridge means the button is off and the typed command is the way. |

## 4. The script and its JSON

Skill board-widget, files: SKILL.md, scripts/render_widget.py, references/data_schema.md, assets (one CSS block, one card, one waiting card, one row), tests. Run: `python3 scripts/render_widget.py board.json /home/user/output/action-board.html`. It prints one summary line of JSON and exits 2 with "error: <path>: <message>" on a structural error.

The JSON is the schema of the email brief-render (mode, asOf, highlights, must, waitingYou, review, waiting, commitments, meetings, notes, summary) with these additions:
- `vipLine` text, shown above the title.
- on every card and waitingCard: `n` (the number printed in chat), `link` (webLink of the key message, optional).
- `ignored`: list of `{n, subject}` for the "Ignored this session" block, numbered from 1 in the order ignored.
- card.why may end with "New reply since ignored." and the script marks that sentence.

The script escapes every value, writes "not given" for a missing value, computes nothing (no days, ranks or counts), and uses no external file, form or network call. Buttons are `type="button"` and call `GleanBridge.postMessage` only. If `GleanBridge` is missing the script's small inline code turns the buttons off and shows one note "Ignore buttons need the Glean chat, type Ignore N instead."

Card sketch (one inbound card):

```
<div class="card" data-n="1">
  <div class="top"><span class="num">1</span>
    <div class="title"><b>Alice Morgan | Audit evidence</b> <span class="pill">VIP</span></div>
    <button type="button" class="ig" data-n="1" data-subject="Audit evidence">Ignore</button></div>
  <div class="ask">Send the audit evidence.</div>
  <div class="meta"><span class="pill act">Send</span> <span class="due late">Due Oct 20, 2026 (Tue), passed</span></div>
  <div class="why">Direct request with a past deadline.</div>
  <a href="WEBLINK" target="_blank" rel="noopener noreferrer">Open email</a>
  <details><summary>Details</summary> ...remaining lines... </details>
</div>
```

The click handler builds the message from data-n and the subject: actionId `ignore-1`, displayLabel `Ignore "Audit evidence"`, context `Ignore 1`. Subjects are set with textContent and escaped in attributes, never concatenated into script text.

## 5. How the chat flow changes

- Step 9 (chat): the model writes the markdown board as now (it is the BOARD for Step 10), then writes board.json and runs the script. Reply: the artifact only. The model does not copy HTML.
- Step 1 select lists add `"webLink"`: main text edit ` Every select list also has "categories".` becomes ` Every select list also has "categories" and "webLink".` (+15 characters, 165 left).
- All other widget rules live in the skills, not in the main text: board-layout-v2 gets a paragraph "In a chat show the board with the skill board-widget, show the markdown board only when the script fails" (read at Step 9 on every run, so no main text characters). ignore-actions Ignore and Undo replies change from "the brief again" to "run the script again with the card removed (or put back), the new numbers, the ignored list, and the notes line Ignored items hidden: N". The three part reply order is kept: confirmation line, widget, then the ignored list is inside the widget.
- Redraw data: if the sandbox keeps board.json (U4) the script gets `--ignore N` and `--undo N` options that edit the stored JSON, so the model does not write the board again. If it does not keep files the model writes the JSON again from the cards in the chat.

## 6. Out of scope

Reply button (dropped by the user), changes to the email, any change to the published agent, widget for weekly mode (weekly has no numbers or Ignore), editing the artifact by the user.

## 7. Risks

- Model writes the JSON for about 16 cards on every run: slower and more tokens than the markdown alone. Measure it in test T11.
- The model may still write the markdown board in the reply next to the artifact. Test T11 checks the reply shows only the artifact.
- Ids stay out of the page: the page only knows N, subject and webLink. A changed order between draw and click is handled by the existing find-by-card step.
- Glean may change the artifact contract. No public docs exist, the source is Glean's built-in guidance quoted by the assistant.

## 8. Apply order and tests

1. Script and skill locally with tests first (escape, one actionId per button, Ignore N equals the card number, no external resource, missing value, bridge missing note, ignored list, JSON with 0 cards). Zip like brief-render.
2. Probe U1 and U4 in V2 Preview with the uploaded skill and a small fixed JSON (no mailbox access).
3. Upload board-widget to the main agent of V2 only, edit board-layout-v2 and ignore-actions, apply the +15 character main text edit. Each one verified by hash as before.
4. Tests: T11 run shows the artifact and no markdown board, layout checked by screenshot. T12 the user clicks Ignore in Preview in new tab: approval card, redraw with the card gone and the ignored list. T13 typed `Ignore N` still works. T14 emailed brief unchanged. T15 script failure falls back to the markdown board. T16 Undo button.
5. Record results in ignore-design.md section 12. Nothing is published.

## 9. Fallback

If U1 or U2 fails (no artifact from the agent, or no bridge in the agent chat), the numbered markdown cards and typed `Ignore N` stay as the whole feature, as decided in ignore-design.md section 10.

## 10. Build notes (2026-11-05, script and skill built, tests first)

Built in the skills folder as the skill board-widget (SKILL.md, scripts/render_widget.py, references/data_schema.md, tests, zip from build_zip.py board-widget). 29 tests, all green with warnings as errors: escaping, numbering, details fold, late due, pills, new reply mark, waiting card, link filter (https only), one button per card, hostile subject, ignored block with Undo, title modes, order of vip line, highlights, cards, notes and summary, commitments, meetings, empty board, no external resource, structural errors with paths, CLI exit codes, schema example renders, and the click handler run in Node (posts the contract message, every button off after one click, no bridge turns buttons off and shows the note). Three mutation checks fail as they should (escape without the quote, no button off after a click, any link scheme).

Deviations from sections 3 and 4, all small:
- Numbers: the script numbers the cards (must, waitingYou, waiting, review) and prints them in its summary line, the model no longer writes n on the cards. This removes a way for the board and the buttons to disagree.
- Assets: the CSS and the click code are inside the script instead of separate asset files (one file less to upload and keep in step).
- After one click every button is switched off until the chat draws the board again, so a second click cannot hit a shifted number.
- Weekly runs are refused with an error, the model shows the markdown board.
- Ignored block sits below the summary line, as in the markdown reply.

Visual check: a realistic sample board (five cards, commitments, one ignored item) rendered in the browser pane, layout and details fold read well, buttons show the faded no-bridge state on localhost as designed. Not done yet: upload to V2, edits to board-layout-v2, ignore-actions and the main text, the Preview probes (U1 to U4) and tests T11 to T16.

## 11. Added card content (2026-11-05)

Three optional fields on the cards, added at the user's request: `email` (sender address of the key message, the recipient addresses on a waiting card), `received` (when it arrived) and `preview` (its bodyPreview). Shown under the title as one muted line "From address, Received date" (waiting card: "To address") and the preview as a quoted muted block under the ask. Each is left out when empty, the address is text and never a mailto link, all values escaped. No main text change is needed, Step 1 already selects from, receivedDateTime and bodyPreview. 34 tests green (5 new, written first and failing first), a mutation check on the preview escaping fails as it should, and a visual check of the sample board in the browser pane looked right.

## 12. Upload and probes (2026-11-05)

Upload: skill board-widget uploaded to V2 only (Skills, plus, Upload a skill, zip carried through window.name, set on the dialog input). It lists three files (SKILL.md, references/data_schema.md, scripts/render_widget.py). The ten run-form defaults and the instruction counter (180 left) were not changed by the upload. board-layout-v2, ignore-actions and the main text are not edited yet, so the agent only uses the skill when told to in a message.

Probe run: cheapest Preview run (end-of-day, 3 days, calendar off, drafts off, chat only, about 80 s), then one chat message with a fixed two-card JSON and "do not call any mailbox tool".
- U1 pass. The agent read the skill, wrote board.json, ran the script and then called its own tool Open File In Canvas. Glean created an artifact "Action Board" (Interactive), opened in the side panel (frame mode contained). 15.2 s and 0.68 credits for two cards. The agent reported "2 cards and 2 Ignore buttons", the same as the script summary. Cards, sender line, received date, preview, details fold, red late due and the highlighted "New reply since ignored." all rendered as in the local check.
- U5 pass (inline and canvas artifacts are on).
- U2 partly. In this artifact panel the Ignore buttons are enabled (blue). The script only leaves them on when window.GleanBridge exists, so the bridge is present here, unlike the first probe widget in the inline chat Preview where the button was greyed. The actual click is not proven (automation cannot click inside the sandboxed frame), the user has to click.
- U4 pass. In the next turn /home/user/output still held action-board.html and board.json (written in the earlier turn). So the Ignore N and Undo N redraw can edit the stored board.json instead of the model writing the whole board again. A test of that is still to do.
- U3 open. The Open email link needs the user's click (the pane blocks new tabs from automation).

Follow-ups found: SKILL.md should say to open the page with the tool Open File In Canvas (the agent worked it out, but it should not have to). The editor shows the placeholder in "error: <path>: <message>" as stripped HTML, change the text to "error: PATH: MESSAGE" at the next edit.

## 13. Click test result (2026-11-05)

The user clicked Ignore on card 1 of the probe widget in the Preview artifact panel. The click posted the chat message "Ignore 1", so U2 is proven in the V2 Preview: button, chat message, command path, approval card, write, reply all ran.

Unplanned side effect: the agent resolved N against the earlier markdown board of the first run (card 1 was "Late-night schedule request", two same-day emails), not against the widget JSON, and the user approved the card. Two dummy "Late-night schedule request" mails (Alice Morgan) now carry Brief: Ignored, with their other categories kept (they had none). The probe plan wrongly assumed the probe subjects match no mail. The reply then drew the markdown board again, as the ignore skill still says.

Design consequence (to be built in the ignore-actions edit):
- "Ignore N" and "Undo N" mean the card numbered N in the latest widget. The skill reads board.json in /home/user/output (kept between turns, U4) or the numbers list printed by render_widget.py, takes sender, subject and date from that card, and only then runs the find step. When a widget was drawn after a markdown board, the widget wins.
- After the command the agent edits board.json (remove the card, add to ignored, note Ignored items hidden: N) and runs the script again, so the reply is the widget again, not markdown.

Mailbox state to clean up: the two Late-night schedule request mails (marked now) and the older Board deck inputs message of Dana Whitfield (marked during T5). Undo goes through the chat, each with an approval card.

## 14. Applied to V2 (2026-11-05)

Script: render_widget.py gained the optional board key `hidden` (note "Ignored items hidden: N" above the summary, managed by the script) and the options `--ignore N[,N]` and `--undo N`. They rewrite board.json after the page is made, one ignored row per item (duplicates are several cards of one row), cards saved in the row for undo. 48 tests green (14 new, written first), three more mutation checks caught (hidden not raised, undo at the front, no renumber). The weekly refusal, https-only links and one-click button lock are unchanged.

Live V2 texts, all verified by hash after upload and after a reload:
- board-widget skill (zip, 9488 bytes): script file byte identical to the local copy (sha a1f8c641). SKILL.md editor hash 36fff18c, 23 blocks, equal to the source apart from the editor keeping a newline and one space where the source has an indented continuation line (two places). Lesson: no indented continuation lines in skill files.
- board-layout-v2 (stage-4-board-layout-skill.md): hash f5583ff5, 4299 characters, 20 blocks. New paragraph "Chat widget" and the first sentence says the markdown layout is for the brief and for a chat without the widget.
- ignore-actions (stage-4-ignore-actions-skill.md): hash ccd5d24e, 6721 characters, 35 blocks. Filter writes N in hidden. Ignore N and Undo N mean card N of the widget board (board.json), even when a markdown board was written earlier in the chat. The card is read from board.json, then the existing find step runs. The reply is the confirmation line and then the page redrawn with --ignore or --undo, nothing else. Markdown boards keep the old three part reply.
- main text (stage-4.md): one edit, Step 1 now says Every select list also has "categories" and "webLink". It is +14 characters (not 15), counter 166 left, editor hash 33814ca0, 30651 characters, same after a reload. Typed directly in the editor, not through the Builder Assistant, so the ten run-form defaults were not touched (read back: auto, 14, 3, yes six times, chat and email).

Skill hash method (matches the earlier live hashes): body after the front matter, every line trimmed, blank lines dropped, heading marks, list numbers, bullet marks, ** and backticks removed, joined with a newline, SHA-256, first 8 hex. Editor side: leaf blocks (p, h1 to h6, li without block children), textContent trimmed.

Skills were replaced by removing the old copy from V2 (trash icon, no prompt) and uploading the new file (window.name carrier, DataTransfer on the dialog input). The published agent was not touched. Version saved: "Widget skills wired" (the Save popup hung with both buttons off, the version exists after a reload).

Not run yet: tests T11 to T16 of section 8. Mailbox marks still to undo: two Late-night schedule request mails and the older Board deck inputs message.

## 15. T11 result (2026-11-05): pass after one main text edit

Run 1 (morning, 14 days, calendar off, drafts off, chat only, 86 s): FAIL. The agent wrote the numbered markdown board and never opened board-widget. The trace shows 11 Shell steps and none read a skill file. Cause: Step 9 of the main text still said to write the board "in the chat reply" and the main text outranks the skill paragraph. The filter did work (the two Late-night schedule request mails from the click probe were left out, hidden counted).

Fix (main text, V2 draft only): in Step 9 the phrase "in the chat reply and in the brief, never in another layout." became "in the brief, and in the chat reply only when the skill board-widget cannot show it, never in another layout. In a chat, show the board with the skill board-widget." That is +104 characters, 62 left, stage-5.md, editor hash c599f8b9, 30755 characters, same after a reload.

Run 2 (same form, 224 s): PASS. The agent built the board JSON, ran the script and opened the artifact "Action Board" (Interactive). Reply: one sentence ("3 must-do, 13 waiting on your response, 2 waiting on others, 1 ignored item hidden"), no markdown board. The page shows 18 numbered cards with sender line, received date, preview, details fold, enabled Ignore buttons, commitments, "Ignored items hidden: 1" and the summary line. Time is about 2.5 minutes longer than run 1, the extra work is writing the JSON for 18 cards.

Findings for the next edit round (skill text, no main text):
- vipLine came out with literal ** marks and semicolons. The schema and SKILL.md must say plain text, no markdown marks, no semicolons.
- The reply sentence is fine but the card counts there are the model's own words, not the script summary.
- Cost per run not measured (debug trace loaded only for run 1).

Still to run: T12 (user clicks Ignore on a card, approval, redraw), T13 typed Ignore N, T14 emailed brief, T15 fallback, T16 Undo click. Mailbox marks still set from earlier tests: two Late-night schedule request mails and the older Board deck inputs message (they cannot be undone from this chat because they are not in its ignored list, remove the category in Outlook).

## 16. T12 result (2026-11-05, finished 2026-11-06): pass after a retry

The user clicked Ignore on a card in the artifact (the button posted `Ignore "Agent Delivery Date Update"`, card 17, a Waiting on Others card, not card 1 as first said). First attempt: the agent read board.json, found the sent mail (List messages on sentitems), read its categories (Get email message), requested the update (PendingApproval), then the response failed with "An error occurred while generating a response". The approval card never showed and no Update ran. A second `Ignore 17` only got "Approval is pending" (stale request, no new card). A normal message asking for a new approval request produced a fresh card. After approval: Update email message Completed (`Categories: Brief: Ignored`, the mail had none), reply `Ignored "Agent Delivery Date Update". It will not appear in future briefs.`, and the artifact was redrawn through the script (a new artifact version): 17 cards, the Dharmesh Patt Re:Delivery date card renumbered from 18 to 17, "Ignored items hidden: 2" (was 1), the summary line unchanged, and the block "Ignored this session: 1. Agent Delivery Date Update" with an Undo button.

Correct: the sent message was marked (Waiting on Others uses the newest sent message), the right card was removed, numbers and notes came from the script, the reply had no markdown board.

Risk found: a generation error right after PendingApproval hides the approval card and leaves a pending request the agent will not renew. Fix for the next skill edit round: in ignore-actions say that when an approval is said to be pending but no card has been shown in this turn, call Update email message again to send a new request. Also still to fix: vipLine plain text (no ** and no semicolons).

State: the sent mail "Agent Delivery Date Update" (to Dharmesh Patt) now carries Brief: Ignored. T16 (Undo click) will remove it. Other marks still set: two Late-night schedule request mails and the older Board deck inputs message.

## 17. T16 result (2026-11-06): pass

The user clicked Undo on "Agent Delivery Date Update" in the Ignored this session block. The agent found the ignored row, checked the sent message and its category, and showed one approval card ("Update email message: Restore ignored email", `Categories: Brief: Ignored -> none`). No generation error this time. After the approval: Update completed, reply `Restored "Agent Delivery Date Update". It will appear in future briefs.`, and the artifact was redrawn through the script with --undo: the card is back in its original place (number 17, Re:Delivery date is 18 again), the Ignored this session block is gone, "Ignored items hidden: 1" (back from 2), the summary line unchanged. The mail has no Brief: Ignored category again.

Status of the section 8 tests: T11 pass (after the Step 9 edit), T12 pass (after a retry), T16 pass. T13 (typed Ignore N) is covered in part: the typed `Ignore 17` was read as the command and resolved to card 17 from board.json (it answered that the approval was pending), a full typed cycle was not run. T14 (emailed brief unchanged, needs a chat and email run that sends one mail to the user) and T15 (script failure falls back to markdown) are not run.

Marks still set from earlier tests: two Late-night schedule request mails (Alice Morgan) and the older Board deck inputs message (Dana Whitfield). They are not in this chat's ignored list, remove the category in Outlook. The main text edit of Step 9 has no saved version yet.

## 18. Skill edit round and version (2026-11-06)

Two small skill changes from the T11 and T12 findings, applied to V2 only:
- ignore-actions (stage-5-ignore-actions-skill.md): new rule "Say that an approval is pending only when its card is shown in this turn. When an earlier request has no card now, call Update email message again to send a new one." Editor hash bf865371, 6887 characters, 36 blocks, equal to the prediction.
- board-widget: SKILL.md says to write vipLine as plain text with no markdown marks and no semicolons, the schema line for vipLine says the same, and the two indented continuation lines were joined so the editor text equals the file (hash 314a4307, 2645 characters, 23 blocks). The script file is unchanged (sha a1f8c641). Zip 9543 bytes.

The old copies were removed from V2 and the new ones uploaded (published agent untouched). After a reload: main text c599f8b9 (30755, 62 left), the three skills listed, the ten run-form defaults unchanged. Version saved: "Step 9 widget and skill fixes", editor shows no new changes.

The new ignore-actions rule and the plain text vipLine are not exercised by a test yet (they need a fresh run and an Ignore click).

## 19. T15 result (2026-11-06): pass

Setup: the cheapest Preview run (end-of-day, 3 days, calendar off, drafts off, chat only, 88 s, widget shown), then one probe message: follow the skill board-widget exactly for a board whose second card is a string ("BROKEN") instead of an object, do not repair the JSON, no mailbox calls.

Result: the agent wrote board.json and ran the script in one Shell step. The script printed `error: must[1]: must be an object` and exited with code 2 (the step shows as failed). The agent did not retry or repair the JSON. Its reply was the markdown board in the board-layout-v2 layout (title, section Must Do Today, card "1. Probe Sender | Probe card one" with the ask, action, why included, due, confidence, ownership, original ask, latest update, messages, then the summary line). The malformed card was left out, the valid one kept. No artifact was opened and the reply said nothing about the script or an error, as the skill requires.

Not covered by this probe: the other fallback trigger, the page failing to open after a successful script run.

Test status of section 8: T11 pass, T12 pass (after a retry), T15 pass, T16 pass, T13 partial (typed Ignore recognised as the command, full typed cycle not run), T14 not run (chat and email run, mails the user, needs approval). Marks still set from earlier tests: two Late-night schedule request mails and the older Board deck inputs message.

## 20. T14 result (2026-11-06): pass, with the mail itself not seen

Run: morning, 3 days, calendar off, drafts off, DELIVERY chat and email, 88 s. One brief mail went to the user's own mailbox.

From the trace (one run, the page lists it twice):
- Chat: the main agent opened the widget with Open File In Canvas, the reply was one sentence ("The morning action board is open in the chat canvas. The brief was also emailed to your mailbox."), no markdown board in the reply, no "Brief not delivered." note.
- Step 10: brief-builder was called once with MODE morning, TODAY Nov 6, 2026 and BOARD as markdown that starts with the title line and has no item numbers and no VIP and topics line (cards read "**Alice Morgan | Audit evidence**", no "1."). So the markdown board is still written as a tool parameter, but not shown in the chat.
- brief-builder: Shell steps for the render, Get outlook profile, then exactly one Send email: to kisha.gajipara@perimeterhealthcare.com (the signed-in user), subject "Daily brief: morning, Nov 6, 2026", is_html true, status 202 sent. The body begins with the brief-render email shell (doctype, x-apple-disable-message-reformatting). The body is cut off in the trace, so its full text and the absence of buttons were not read. The email renderer was not changed, so the mail has no script by construction.
- Cost: brief-builder 0.40 credits.

Not verified here: how the mail looks in Outlook (Outlook web is blocked in the browser pane). The user can open the mail "Daily brief: morning, Nov 6, 2026" and confirm no numbers and no buttons.

Test status of section 8: T11, T12 (after a retry), T14, T15, T16 pass, T13 partial (typed Ignore recognised as the command, full typed cycle not run). Marks still set from earlier tests: two Late-night schedule request mails and the older Board deck inputs message. Test mail added: one "Daily brief: morning, Nov 6, 2026" in the user's inbox.

## 21. T13 result (2026-11-06): pass

Full typed cycle in the T14 chat (morning board, 11 cards, widget in the artifact panel, board.json saved in the sandbox).

- Typed `Ignore 4`: the agent read card 4 from the saved board (Bob Singh, Launch plan v1), found the key message (the newest inbox message of the thread, "Re: Launch plan v1") with one List messages call, read its categories, and showed one approval card (`Categories: Brief: Ignored`). The first typed attempt did not reach the chat (the click missed the input, the editor stayed empty), the second worked. After the approval: Update completed, reply `Ignored "Launch plan v1". It will not appear in future briefs. The board is updated.`, and the artifact was redrawn through the script: 10 cards, "Ignored items hidden: 1", summary line unchanged, block "Ignored this session: 1. Launch plan v1" with an Undo button.
- Typed `Undo 1`: one approval card (`Categories: Brief: Ignored -> none`), Update completed, reply `Restored "Launch plan v1". It will appear in future briefs. The board is updated.`, artifact redrawn: card 4 back, 11 cards, hidden note and ignored block gone.
- Read only probe of the saved file after the cycle: hidden 0, ignored 0, cards [2 must, 9 waitingYou, 0 waiting, 0 review], keys asOf, commitments, hidden, ignored, mode, must, review, summary, vipLine, waiting, waitingYou. So the file is clean and equals the first board.

Small deviations, not fixed: the reply adds the sentence "The board is updated." after the required line (the skill says nothing more after the line and the page). The model used curly quotes in the reply. The VIP line is now plain text (the vipLine fix worked, no ** and no semicolons). In this run the first board had hidden 0 although the two Late-night schedule request mails are still marked, they were probably not on this board as actionable mail, so this is not a script fault.

Test status of section 8: T11, T12 (after a retry), T13, T14, T15, T16 all pass. The mail Re: Launch plan v1 has no Brief: Ignored category again. Marks still set from earlier tests: two Late-night schedule request mails and the older Board deck inputs message (clear them in Outlook). Test mail in the inbox: Daily brief: morning, Nov 6, 2026.

## 22. Label fix, Step 7 script (2026-11-06): pass in a chat only run

Problem: the model skipped the cross message check for "New reply since ignored", so the markdown board and the emailed brief had no label. The widget path was already made deterministic (render_widget.py reads the saved mail and adds the label, live verified with the cid path).

Fix: the same check is now a script in the skill ignore-actions (scripts/ignore_filter.py, 10 tests, 4 mutations caught). Step 7 of the skill (v6, hash e0afd7b1) runs it. It prints one line of JSON with two lists, hidden (newest message of the conversation carries Brief: Ignored) and newReply (an older message carries it, the newest does not). The model then drops the hidden items and writes " New reply since ignored." at the end of Why included for the newReply items.

Live check, Preview, DELIVERY chat only, CREATE_DRAFTS no, Debug on (82 s, 2 credits):
- The trace shows the model ran python3 /home/user/skills/ignore-actions/scripts/ignore_filter.py (exit 0) in the same command that read the board-widget data schema.
- The render script then printed cards 17, hidden 2, labeled 0, dropped 0. Labeled 0 is expected here: the model had already put the label into the card text from the filter output, so the render script had nothing to add.
- Card 16, Dana Whitfield (VP), Re: Board deck inputs, shows "VP follow-up confirms the section is still outstanding. New reply since ignored." with the label highlighted. The note "Ignored items hidden: 2" shows above the summary.

Not yet checked: the emailed brief (needs a chat and email run, which mails the brief) and the markdown fallback (needs the widget to fail).

Draft note: when this fix was applied the V2 draft was found back at the Nov 5 state (main text 30637, no board-widget skill). It was restored from the saved version "Step 9 widget and skill fixes", then board-widget and ignore-actions v6 were uploaded again and checked by hash. Saved version "Step 7 filter script".

## 23. Chat and email check of the label (2026-11-06): found a path bug, fixed, pass

Run 1 (chat and email, CREATE_DRAFTS no, 127 s, 2.8 credits): the chat board card for Dana Whitfield had the label (added by the board script, labeled 1) but the emailed brief did not (label count 0 in the rendered brief). Cause from the trace: the skill text said `python3 scripts/ignore_filter.py`, the model ran it from /home/user and got "can't open file '/home/user/scripts/ignore_filter.py'", so it had no filter list and wrote the brief text without the label. In the earlier chat only run the model happened to use the full path.

Fix: ignore-actions v6.1 (hash 463314c2, 7311 chars, 36 blocks, zip 4353 bytes) says to run python3 /home/user/skills/ignore-actions/scripts/ignore_filter.py with exactly this full path, and to put the label in the board text given to brief-builder. Script file unchanged (sha accff040). Saved version "Step 7 full path".

Run 2 (same settings, 97 s, 2.1 credits): the rendered brief (read with a read only shell command in the same chat) shows label count 1 and for Dana Whitfield, Board deck inputs: "Why included VP follow-up says the section is still outstanding. New reply since ignored." The brief was sent (Send email status 202, subject "Daily brief: morning, Nov 6, 2026"). The chat board has the label too.

Method notes: Outlook on the web is blocked for this browser by an admin sign-in policy, so the mail itself was not opened. The brief was checked in the agent sandbox file instead (the brief-builder folder keeps the rendered brief.html between turns).

Still not checked: the written board fallback (widget fails) and a weekly run.

## 24. Drafts off by default, replies only (2026-11-06): pass

Decisions: items 2 and 3 of the queued priorities, replies only, drafts off by default.

Edits (main text stage-6.md, predicted hash 050a705c, 30672 in the editor, 145 characters left):
- Settings line CREATE_DRAFTS default (yes) became (no).
- Step 8E lost the clause "plus at most 3 Waiting on Others items advised Follow up today in Step 8 order", so only the first 5 Class A and Class B items are drafted.
- The run form input CREATE_DRAFTS default is no and its description reads "Prepare reply drafts in Outlook for you to review. Off by default."
- Edited directly in the instruction editor (select the text, Delete, type no). The ten dropdown defaults were not wiped this time. Hash, defaults and description were read back after a reload. Version saved as "Drafts off, replies only".

Schedule on the Triggers tab: on a schedule, 08:00 AM, every weekday, so a scheduled run is a morning run with the form defaults.

Test, Preview, chat only, CREATE_DRAFTS yes, Debug on (160 s, 3.3 credits): the main agent called draft-writer once with ITEM 1 to ITEM 5, every line "reply", no follow-up line, and the sub-agent described "the five reply threads". All five came back skipped-existing because drafts for them already existed from earlier runs, so no new drafts were made. The Waiting on Others item (Agent Delivery Date Update) was not drafted. Form defaults read in Preview: MODE auto, LOOKBACK_DAYS 14, READ_DAYS 3, INCLUDE_CALENDAR yes, CREATE_DRAFTS no, four SHOW yes, DELIVERY chat and email.

Drafts off and brief mail: the two chat and email runs of section 23 ran with CREATE_DRAFTS no (before this text change). They made no draft-writer call and the only mail created was the brief sent by the agent (Send email, 202). Not rerun after this edit. A real scheduled trigger has not been run.

Left alone: the draft-writer wording about follow-ups in Step 8E (the "reply or follow-up" field and the "recipients still waiting" field) stays, it is now unused. Conversation starter 8 ("Drafts in my voice") was not found on the V2 Triggers tab, so it was not changed.

## 25. Email button "Open the live board in Glean" (2026-11-06): pass

Decision: option A of live-link-spike.md. A button in the emailed brief that opens the agent run page.

Built test first in the brief-render skill. New fragment assets/live-link.html (email safe table button, single class per element, inline styles) and a new placeholder LIVE_ROW in assets/shell.html under the header and above the highlights. render_brief.py has the constant LIVE_LINK (V2 draft agent link) and live_row(empty). The button shows for morning and end-of-day when the board has items and LIVE_LINK starts with https, and never for weekly. The link is escaped. The JS oracle test-mailer/brief-render.mjs got the same rule (parity test), the asset count test went from 21 to 22. brief-builder text is unchanged, the model never writes the link.

Tests: Python 29 (8 new in LiveLinkTests), node 260 (one new oracle test). Six deliberate breaks of the Python code (button on empty board, no https check, no escape, button in weekly, wrong place, wrong label) were each caught, plus one of the oracle.

Upload: brief-render zip (16525 bytes, SKILL.md hash e4b69810 in the repo, render_brief.py sha 0f243d0d) replaced in the brief-builder sub-agent dialog only, remove old, upload new, Done. File list, script sha and the new rule line were checked in the dialog. Saved version "Live board button".

Live check, Preview with the form defaults (chat and email, drafts no): the brief mail at 10:44 AM in Outlook shows the purple button under the KPI tiles with the hint "Opens the agent in Glean. Choose delivery chat only, then Run agent, to get the interactive board in about 2 minutes." The link points to the agent (Outlook wraps it in a safelinks address that carries the Glean URL).

Open: publish time must change LIVE_LINK to the published agent and rebuild and upload the zip. The link opens the run form with DELIVERY chat and email by default, so a reader who forgets to pick chat only sends one more brief (the hint says what to choose). Whether the schedule can carry its own DELIVERY value so the form default could become chat only was not checked.
