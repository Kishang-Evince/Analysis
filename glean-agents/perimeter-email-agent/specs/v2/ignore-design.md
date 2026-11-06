# Design: ignore items from chat for Outlook Action Board V2 (V2 stage 3)

Date: 2026-11-05. Status: approved 2026-11-05. Path: architectural (new write tool, new skill, edits to the main text and the layout skill).
Agent: "Outlook Action Board V2", a draft clone. The published agent is not touched. Restore point: the version "Inputs wiredInputs wired" (V2 is restored to it, the Step 9 counting sentence is gone).

## 1. Goal

The client asked on the call of 2026-11-04 that a user can close an item from chat so it does not show again, and that the agent keeps the user in Glean. This stage covers the ignore half only. A user ignores an item in chat, and the item stays out of later briefs, scheduled and emailed. The Reply button is dropped for now.

Success: after "Ignore 2" and one approval, the email carries the category Brief: Ignored with its other categories kept, the next run leaves the item out and says how many items are hidden, and Undo brings it back. A scheduled run never writes to the mailbox.

## 2. Scope

In (phase 1): the tool Update email message, the skill ignore-actions, four small edits to the main text, one paragraph in the V2 copy of the layout skill (numbers and the hidden count).
In (phase 2, only after a probe passes): an inline HTML widget in chat with an Ignore button per card. See section 10.
Out: the Reply button, buttons or scripts in the email, an email footer (D4), sub-agents, the brief-render skill, the schedule, the published agent, an Excel store of closed items.

## 3. Decisions to approve

| # | Decision | Recommendation |
|---|---|---|
| D1 | Where the ignore mark lives | The Outlook category "Brief: Ignored" on one message. No new store, it survives edits of the agent, the user can see and undo it in Outlook. Cost: the agent writes to the mailbox and needs the Update tool. |
| D2 | Filter in the emailed brief | Kept (approved 2026-11-05). The email stays static with no buttons. It changes in three ways: ignored items are missing, a note line "Ignored items hidden: N" appears, and a returned item says "New reply since ignored." in its "Why included" line. |
| D3 | The hidden count line | Only when N is more than 0. The client plan wrote it on every brief, which adds a line nobody needs. |
| D4 | Email footer | None in phase 1. It needs a changed copy of brief-render for the sub-agent brief-builder and a new upload, and the note line already tells the reader. Revisit with phase 2. |
| D5 | Showing the brief again after Ignore | Print it again from the board already in the chat, without the card and with new numbers. Do not run the agent again, a run takes up to 13 minutes. |
| D6 | How the agent finds the message | From the card (sender, subject, date) it lists the folder again and checks the subject. It does not carry message ids through buttons or typed text, because long Outlook ids get corrupted when passed as text. Several matches (same subject, same sender or recipients, same day) are duplicates of the same ask and are all marked together, decided 2026-11-05 after T3. |
| D7 | Instruction budget | The Step 9 counting sentence was reverted first (it did not fix the T2 summary line). V2 has 498 characters free, the main edits cost 314, so 184 are left. |
| D8 | Accepted invitation test | Dropped. The client plan tests it but defines no rule for invitations. |

## 4. Behaviour

**Key message.** The ignore mark sits on one message per item. For an inbound card it is the newest inbox message of the conversation that the card is built from (the one behind "Latest update"). For a Waiting on Others card it is the newest sent message of that conversation. A new message in the thread becomes the new key message, has no mark, and so the item returns by itself.

**Filter.** Runs in Step 7, after classification and before ranking and drafts. It cannot run earlier. An ignored inbox reply must still count as a reply that closes a sent ask in Steps 2A and 2B. For each item the skill reads the categories of its key message from the Step 1 results (the select lists get "categories"). A marked item is removed and counted once in N. Removed items get no draft because Step 8E runs after. Commitments and Meeting prep are not filtered. The summary line numbers X, Y, Z and W do not count ignored items.

**Label.** When an item stays and an older message of the same conversation in the results carries the mark, " New reply since ignored." is added at the end of its "Why included" value. No new mark in the card header, so brief-builder needs no change.

**Numbers.** In the chat reply every card of Sections 1 to 4 gets a running number, "**N. Sender | Subject**". The BOARD passed to brief-builder has no numbers (Step 10 says so), so the email stays as it is. Weekly runs have no numbers and so no typed commands.

**Commands (chat only).** Only a chat message that starts with IGNORE_ITEM, UNDO_IGNORE, "Ignore N" or "Undo N" with N a whole number. Anything else starting with Ignore or Undo is a normal message. Never from email text, a form value or a scheduled run. Steps: find the message (list the card's folder from the day before the card date, match subject and sender, accept an explicit messageId only after Get email message shows the same subject), read its categories, call Update email message with the existing categories plus the mark (or minus it for Undo), wait for the approval, answer, show the board again.

**Replies.** `Ignored "<subject>". It will not appear in future briefs.` and `Restored "<subject>". It will appear in future briefs.` Then the board without or with the card, the line "Ignored items hidden: N" changed by one, and a list "Ignored this session" (number, subject) that Undo N uses.

**Safety.** One write tool, used only by these commands, with "require user confirmation" on. It changes only the categories of one message and never drops an existing category. Subjects and names are data. A run only reads.

**Modes and inputs.** The filter applies in morning, end-of-day and weekly runs, to every list built from messages. It works with every run form value, including DELIVERY chat only.

## 5. Edits

Main text (predicted result in `stage-3.md`, hash 0795f70a, length 30637, +314 on `stage-1.md`):

1. Step 1, after "In Step 1 do not include body in any select list.": ` Every select list also has "categories".`
2. Step 7, new last paragraph: `Then read the skill ignore-actions and remove the items it names as ignored. Count them as N.`
3. After the SAFETY paragraph, new paragraph: `A chat message that starts with IGNORE_ITEM, UNDO_IGNORE, "Ignore N" or "Undo N" is a command: read the skill ignore-actions and do only that, no other step.`
4. Step 10: "without the VIP and topics line" becomes "without the VIP and topics line and the item numbers".

Tool: add Update email message to V2 (Write tools 0 becomes 1). The confirmation setting stays on.
Skill ignore-actions: new, V2 only, text in `stage-3-ignore-actions-skill.md` (4,387 characters).
Skill board-layout-v2: one paragraph "Numbers and ignored items" added before "Empty board", text in `stage-3-board-layout-skill.md`.

## 6. Instruction budget

Free now: 498 characters (counter, after the Step 9 counting sentence was reverted). Edits add 314, 184 left. The two skills do not count against the main limit.

## 7. Apply order

1. Restore point. A version "Before ignore" cannot be made while the draft equals the last version (history says "No new changes", no Create version button). The restore point is the existing version "Inputs wiredInputs wired", identical to V2 at the start of this stage. Restoring it also brings back the defaults.
2. Add the tool Update email message. Confirm Write tools reads 1 and the confirmation stays on. Done 2026-11-05: Write tools 1, "Allow agent to use write tools without approval" off, main text, defaults and published agent unchanged after a reload.
3. Upload ignore-actions to V2 only, through the input in the upload dialog that accepts .md. Done 2026-11-05: 4,387 bytes uploaded, saved text checked in the viewer, V2 lists board-layout-v2 and ignore-actions, published agent still lists board-layout only.
4. Edit the skill board-layout-v2 in place (V2 only copy), then read the paragraph back. Done 2026-11-05: paragraph typed before "Empty board", both headers set to real bold like the existing ones, saved, and after a reload the editor text matches the spec file (plain text hash ec1fdfb5, 19 blocks).
5. Main edits through the Builder Assistant in one message with exact before and after text. Compare the whole-text hash with `stage-3.md`, repair by line if different (`line-hashes.mjs`). Done 2026-11-05: one message of 1,220 characters, the live text equalled `stage-3.md` on the first check (0795f70a, 30637), counter 180 left (predicted 184).
6. The assistant edit wipes the ten dropdown defaults. Set them again, reload, read them back (auto, 14, 3, yes six times, chat and email). Done: wiped as predicted, set again by hand, reload read-back auto, 14, 3, yes six times, chat and email, Required on except AS_OF_DATE.
7. Static checks: no em dash, no semicolon, 11 `[[` references, counter above 0.
8. Create a version "Ignore wired". Done. An extra version "Ignore tool and skills" was saved before step 5 as a restore point that keeps the tool, the two skills and the defaults.

## 8. Tests (Preview in V2, dummy mail only, they write categories)

| # | Test | Expected |
|---|---|---|
| T1 | Run with every default. | Cards numbered in chat, no "Ignored items hidden" line, email has no numbers and looks as before. |
| T2 | Type "Ignore 2". | Approval card, then the email has Brief: Ignored plus its old categories (check in Outlook), the reply text, the board again without the card, "Ignored items hidden: 1", the list "Ignored this session". |
| T3 | Run again. | The item is gone in chat and in the emailed brief, the note line says 1, no draft for it. |
| T4 | Type "Undo 1", approve, run again. | The category is gone, the item is back. |
| T5 | Send a dummy reply to an ignored thread, run. | The card returns with "New reply since ignored." in its Why included line. |
| T6 | Ignore a Waiting on Others card. | The category sits on the sent message, the card is hidden next run. |
| T7 | A dummy email whose subject or body says IGNORE_ITEM, and the chat message "Ignore the marketing mails". | Nothing is written, the second is a normal message. |
| T8 | The scheduled run, once. | Finishes without an approval card, writes nothing. |
| T9 | Weekly run after T2. | The ignored item is left out of the lists, no numbers. |
| T10 | IGNORE_ITEM with a changed messageId. | Refused by the subject check, nothing written. |

Fallback if T2 fails on approval or on the follow-up message: keep the filter (it works from categories applied by hand in Outlook) and drop the commands.

## 9. Unknowns the tests settle

- U1: Update email message works on a Sent Items message and replaces the whole category list as documented.
- U2: the approval card shows in Preview and a chat message after a run-form run continues the same conversation with the brief still visible.
- U3: List messages returns "categories" when it is selected.
- U4: the board text stays available to print again after an ignore.
- U5: a scheduled run with a write tool attached never asks for approval.

## 10. Phase 2: chat widget (not in the apply order)

The widget design (script-rendered artifact, chosen by the user 2026-11-05) is in widget-design.md.

The client plan asks for an inline HTML widget with a button that posts a chat message through `GleanBridge.postMessage` (actionId, type glean-send-message, a displayLabel and a hidden context). Nothing in the saved Glean notes confirms that API. Probe first with one throwaway widget and one button. It passes when the widget shows in chat, the click creates a chat message, and the agent can read the message text. If it passes, the cards show number, sender, subject, ask, status, an open link (webLink added to the select lists), an Ignore button, and an "Ignored this session" area with Undo. Each button sends only "Ignore N" or "Undo N", never an id. Buttons are type button, subjects are escaped, no forms, no external scripts or styles, no call to Outlook from the widget. If the probe fails, phase 1 stays as the whole feature (numbered list and typed commands).

## 11. Rollback

Restore the version "Before ignore", or remove the Update tool and unlink the skill ignore-actions. Remove any Brief: Ignored categories that the tests set on dummy mail.

## 12. Test results

### T1: baseline run, every input at its default (2026-11-05)

133 s, 2.25 credits, no errors in the trace. Sub-agents run: notes-keeper, draft-writer, brief-builder, and one Send email.

- **Chat: pass.** Cards are numbered "1. Alice Morgan | Audit evidence" and "2. Dharmesh Patt | Re:Delivery date". No "Ignored items hidden" line. Summary "Inbound: 92 emails excluded (0 already replied to, 92 noise). Outbound: 1 sent email excluded", and 92 equals 0 plus 92.
- **Email: pass.** The brief at 5:20 PM looks as before: same KPI tiles, same cards, no "1." or "2." in front of the names (the round badge is the old rank design), no hidden-items line.
- **New note line:** the chat shows "Brief delivered to your mailbox." above the summary. The spec only defines a note for failure ("Brief not delivered."), so this is extra wording from the model. Harmless, but not specified.
- **The false "Brief not delivered." did not recur** (it did on the first T1 before the ignore edits, a 600 s hang in brief-builder).

### T2: "Ignore 1" in the same chat (2026-11-05)

Item 1 was the inbound mail "Audit evidence" from Alice Morgan (dummy mail).

- **Command recognised: pass.** The agent said it would locate the exact inbox message behind item 1, verify it, then ask for approval. It listed the inbox again and matched the message (no id typed by hand).
- **Approval card: pass.** One card, "Update email message", showing the subject and "Categories: none -> Brief: Ignored". Approved once.
- **Mailbox: pass.** In Outlook the 7:18 PM message of that thread has the category Brief: Ignored. The other messages of the thread have none. The mail had no other category, so "keeps its other categories" was not exercised.
- **Board again: pass.** Re-printed from the chat without the card, Dharmesh renumbered to 1, "Ignored items hidden: 1" above the summary, and an "Ignored this session" line. No new run.
- **Fail 1:** the confirmation sentence `Ignored "Audit evidence". It will not appear in future briefs.` is not in the reply.
- **Fail 2:** the list reads "Ignored this session: Audit evidence" with no number, so "Undo 1" has nothing to point at (spec: number and subject).
- **Fail 3:** the summary line changed from 92 to 91 excluded after the ignore. Ignoring must not change X, Y, Z or W, so the model took one off the count.

Unknowns settled: U2 yes (the approval card shows in Preview and a chat message after a run-form run continues the same conversation with the brief visible), U3 yes (categories were read), U4 yes (the board stays available to print again). U1 (a Sent Items message) is still open, it needs T6.

The dummy mail now carries the category, which T3 and T4 use. Remove it in Outlook after T4 if it is still there.

### Revision of the skill ignore-actions after T2 (2026-11-05)

The three T2 failures are fixed in the text of the skill (spec file `stage-3-ignore-actions-skill.md` updated, same name):

1. The reply now has a fixed order. Step 3 of Ignore (and the Undo paragraph) says: first one line exactly `Ignored "<subject>". It will not appear in future briefs.` (or `Restored "<subject>". It will appear in future briefs.`), second the board again, third the list "Ignored this session".
2. The list is written as numbered lines, one per item ignored in this chat, such as "1. Audit evidence", numbered from 1 in the order ignored (after an Undo, numbered again from 1). Undo N points at these numbers.
3. The summary line is copied unchanged because ignoring or restoring never changes its numbers. The hidden count line goes directly above it.

The skill was edited in place (V2 only). The editor text equals the spec file before saving and after a reload (plain text hash 8f213ec9, length 4513, no em dash, no semicolon). The main text (0795f70a, 30637) and the ten defaults were not touched. Not run again yet: T4 (Undo) exercises the same three rules on the restore side, and a new Ignore on another dummy mail is needed to prove them on the ignore side.

### T3: fresh run after the ignore (2026-11-05)

169 s, 2.66 credits, one brief email sent.

- **Filter: pass on the mechanism.** The first List messages result shows the 7:18 PM "Audit evidence" message (conversation ending i4LXYQvdUQs=) with the category Brief: Ignored, and the board says "Ignored items hidden: 1".
- **Email: pass.** The 5:37 PM brief carries the line "Ignored items hidden: 1" directly above the summary and has no numbers.
- **Data caveat, not a failure of the filter:** the mailbox holds two separate "Audit evidence" mails from Alice Morgan in different conversations, 7:17 PM (oSjeqq8Cfgw=) and 7:18 PM (i4LXYQvdUQs=), same sender, subject and day. T2 ignored the 7:18 PM one, so after T3 the 7:17 PM one still shows as card 1. Nothing was wrongly hidden.
- **Finding (matching):** the skill step 2 says to stop with "More than one email matches, use IGNORE_ITEM with the messageId." when several conversations match, but the agent took the newest instead. The card carries only the day, so it cannot tell two same-day duplicates apart. Options for the user: add the time to the card ("Latest update" with time), ignore all matching duplicates with one approval card that names the count, or keep the stop rule and make the agent obey it.
- **Draft:** the visible Alice card had no "Draft ready" line in T3 although T1 had one. Not investigated.
- **Summary numbers move from run to run** (92, 91, 80 excluded over four runs, and in the T4 run 80 equals 0 plus 78, which does not add up). This is the old instability of the counts, not the ignore feature.

### T4: "Undo 1", approve, run again (2026-11-05)

- **Command: pass.** In the same chat as T3 there was no "Ignored this session" list. The agent took "Undo 1" as card 1 of the latest board, read the categories first, and asked for approval: "Remove the Brief: Ignored category" on "Audit evidence". After approval the reply was in the fixed order.
- **Reply: pass for the three T2 fixes on the restore side.** First line exactly `Restored "Audit evidence". It will appear in future briefs.`, then the board with the card back and new numbers (two Alice cards, then Dharmesh as 3), the note line left out because N is 0, and the summary line copied unchanged (80 excluded, 1 already replied to, 79 noise). No "Ignored this session" list because it is empty.
- **Run again: pass.** Both Alice cards are back as 1 and 2, no "Ignored items hidden" line, and in the trace no message carries a category any more (48 messages in the first query, none with Brief: Ignored). So the mailbox is clean, nothing to remove in Outlook.
- **Gap:** "Undo N" works from a later chat only because the agent re-reads the marker. The spec defines N by the "Ignored this session" list of the same chat, which a new chat does not have.
- **Brief not delivered in this run: infrastructure, not the feature.** The brief-builder shell step failed with `python3: can't open file '.../scripts/render_brief.py': No such file or directory`, so no email was sent and the main agent printed "Brief not delivered." as designed. The BOARD it received had no numbers. This is the second brief-builder failure in V2 (the first was a 600 s hang). Both runs before it delivered.

Not run yet: T5 to T10, and a new Ignore on a different dummy mail to prove the three T2 fixes on the ignore side.


### Duplicates: ignore all matching messages (2026-11-05)

Decision after T3 and T4: when several messages match the card (same subject, same sender or recipients, same date as the card), Ignore and Undo act on all of them, not on the newest one. The old rule "stop and ask" is gone. The skill ignore-actions now says:

- Find the message step 2 keeps every matching message and calls their number M. A given messageId still means exactly one message (M is 1).
- Ignore step 1 leaves out messages that already have the category and answers "Already ignored" only when none is left. Step 2 says in one line how many emails it will mark when M is more than 1, then calls Update email message once per message, all in the same step, each with that message's own categories plus the mark.
- The first reply line is `Ignored "<subject>" (M emails). They will not appear in future briefs.` when M is more than 1. The board is printed again without the card of the item and without the cards of its duplicates, and the hidden count is raised by the number of cards left out. Undo mirrors this (`Restored "<subject>" (M emails). They will appear in future briefs.`, hidden count lowered by the cards put back).
- A failed or declined update leaves the cards of the emails that were not marked in the brief.

The client wording was "one approval card". Update email message takes one message id per call, so the agent makes one call per message in the same step. Whether Glean shows those as one card or one card per message is not known yet, the test will show. If it shows one per message, the user approves each.

Edited in place (V2 only). Editor text equals the spec file before saving and after a reload (plain text hash 397d6fee, length 5282, no em dash, no semicolon). The main text and the defaults were not touched. Not tested yet: with both "Audit evidence" mails unmarked, "Ignore 1" in a fresh run must mark both and remove both cards (one approval or two), and the three T2 fixes on the ignore side are tested in the same run.

### Duplicates test (2026-11-05): fail

Run at defaults except DELIVERY chat only, then "Ignore 1" with both "Audit evidence" mails unmarked. The run printed 8 or more cards (more than the earlier runs), with "Audit evidence" as item 1.

- **Approval:** one card, "Update email message: Ignore this item", "Add category: Brief: Ignored" on "Audit evidence". There was no line "2 emails match ... Marking all 2." and no second card.
- **Mailbox:** a category search in Outlook returns only the 7:18 PM message. The 7:17 PM duplicate was not marked. So the agent treated M as 1 and the duplicate rule was not applied.
- **Reply:** only the first line, `Ignored "Audit evidence". It will not appear in future briefs.` The board was not printed again, there is no hidden count line and no "Ignored this session" list. The three T2 fixes are therefore still unproven on the ignore side, and the second part of the reply order was skipped (possibly because the board was long).
- **Not known why one message:** the search for matches was not inspected in detail (the debug trace holds nine List messages calls). Likely causes: the 7:17 PM mail was not in the 50 results of the find query (which lists the whole folder, newest first), or the model did not follow the duplicate rule.
- **Approval card count:** with one message there was one card, so the question "one card or one per message" is still open.

State left in the mailbox: the 7:18 PM "Audit evidence" message carries Brief: Ignored again. Undo it (or run T4 again) before the next test.

### Fix of the duplicate lookup (2026-11-05)

Cause found in the debug trace of the failed duplicates test: the agent's search of the inbox (received since 2026-11-03, top 50) returned exactly 50 messages, newest first, from 2026-11-05 12:07Z back to 2026-11-04 13:47:49Z. The 7:17 PM duplicate (13:47:36Z) was 13 seconds outside that window, so only one "Audit evidence" message was in the results and M was 1. The skill never paged.

Fix: Find the message step 2 of ignore-actions now says the result is newest first, that when it has a next_page_token the agent calls List messages again with that token until there is none, and never to stop at the first 50 messages. This is the same paging rule Step 1 of the main text already uses. Edited in place (V2 only). Editor text equals the spec file before saving and after a reload (plain text hash 2d857af0, length 5457, no em dash, no semicolon). The main text and the defaults were not touched.

Not tested yet: a fresh run followed by "Ignore 1" must now report two matches and mark both. Still open from the failed test: the reply stopped after the first line (no board, hidden count or "Ignored this session" list), and the question of one approval card or one per message. The 7:18 PM mail still carries Brief: Ignored from that test.

### Duplicates retest after the paging fix (2026-11-05): fail, skill hardened again

The mark on the 7:18 PM mail was removed in Outlook (Categorize, uncheck Brief: Ignored), and a category search then returned no messages. A fresh run (DELIVERY chat only) gave 12 cards, with "Audit evidence" as item 4 (item 1 was Carol Reyes's headcount mail), so "Ignore 4" was typed instead of "Ignore 1".

- **Lookup: still one message.** One approval card, "Categories: none -> Brief: Ignored" on "Audit evidence", no "2 emails match" line. The trace shows one List messages call for the search: top 50, received since 2026-11-03, 50 messages back to 13:47:49Z, and the response carried a next_page_token. The agent did not call again. So the paging sentence of the previous fix was ignored by the model, and the 7:17 PM duplicate was again outside the first page.
- **Reply: better.** First line `Ignored "Audit evidence". It will not appear in future briefs.`, the board again without the card and renumbered, "Ignored items hidden: 1" above the summary. The third part, the "Ignored this session" list, was missing.
- **Mailbox after the test:** the 7:18 PM message carries Brief: Ignored again (it was the only one in the first page).

Change made (spec file updated, same name): the search asks for top 100 per page (the same size Step 1 uses for read mail, which covers this mailbox in one page) and now says the agent must call again with the token until there is none and never decide from the first page alone. Ignore step 3 ends with "Always write all three parts, the list included, even when it has one line." Edited in place (V2 only). Editor text equals the spec file before saving and after a reload (plain text hash 032bc99b, length 5568, no em dash, no semicolon). Main text and defaults untouched.

Not tested: another Undo of the 7:18 PM mark and one more fresh run with "Ignore" on the Audit evidence card.

### Duplicates retest after top 100 and mandatory paging (2026-11-05): pass

Both Audit evidence mails (Alice Morgan, Nov 4) were unmarked (category search empty). A fresh run (DELIVERY chat only, Debug on) gave a short board of 3 cards: two separate "Audit evidence" cards (items 1 and 2) and Dharmesh Patt, Re:Delivery date (item 3). Typed "Ignore 1".

- **Lookup: both messages found.** One approval card titled "2 action items" with a single "Approve all (2)" button and two Update email message entries, each "Categories: [] -> Brief: Ignored". This answers the open question: Glean shows one card for several messages, not one card per message. After the approval both calls completed.
- **Reply: all three parts.** Line one `Ignored "Audit evidence" (2 emails). They will not appear in future briefs.`, then the board again with only the Dharmesh Patt card renumbered as 1, "Ignored items hidden: 2" above the summary line (raised by both cards left out), the summary line unchanged (Inbound 78 excluded, Outbound 1 excluded), then "Ignored this session: 1. Audit evidence".
- **Small miss:** the one line before the approval ("2 emails match ... Marking all 2.") was not written. Only the generic opening sentence appeared. The result is still correct, so it is left as is.
- **Undo with duplicates:** typed "Undo 1". One card "Approve all (2)", each "Categories: Brief: Ignored -> removed", which also proves both messages carried the category. After approval: `Restored "Audit evidence" (2 emails). They will appear in future briefs.`, the board with both cards back (items 1 to 3), no hidden count line (N is 0), summary line unchanged, "Ignored this session: (none)".

State left in the mailbox: clean, no message carries Brief: Ignored. Skill text and main text not changed in this test (skill hash 032bc99b, main text 0795f70a).

Still not run: T5 to T10 (new reply since ignored, Waiting on Others, injection, scheduled run, weekly, wrong id), one more Ignore on a different dummy mail, phase 2 widget probe, the "Brief not delivered" infrastructure flakes.

### T5 attempt (2026-11-05): fail so far

Outlook web was blocked by a Conditional Access policy in the browser pane, so the setup went through Glean only. A fresh morning run showed the Dana Whitfield thread "Board deck inputs" as one card with Messages 2. The command IGNORE_ITEM with the id of the older message (read from the debug trace, subject "Board deck inputs") passed the id check (Get email message), gave one approval card with an Update button, and the reply had all three parts. Finding: the reply drew the board again without the whole Dana card, although only the older message carried the category (the card was matched by subject).

Next fresh run (retry after one partial board where the agent said it could not finish verification): the Dana card was back with Messages 2, but its Why included line had no "New reply since ignored." and no hidden count showed. The summary line was also not the standard one ("counts could not be reliably calculated"). So T5 fails for now. Not yet known whether the older message was missing from the Step 1 results or the model skipped filter rule 3. Mailbox state: the older Board deck inputs message carries Brief: Ignored, undo it after T5.

### Phase 2 widget probe (2026-11-05): inline HTML shows, button is dead

Probe 1: one chat message asked the V2 agent (Preview chat) to reply with one inline HTML widget, a card with a button whose onclick calls GleanBridge.postMessage with type glean-send-message. Result: Glean showed it inline in chat as a card with a disabled (greyed) Ignore button, inside a sandboxed frame (canvas page, sandbox allow-scripts allow-modals, mode inline). Clicking it created no chat message. "Make interactive artifact" under the card created an artifact in the side panel (mode contained), and the agent reported the button "remains disabled, matching the existing artifact". The click did nothing there either.

Probe 2: the same widget with a script (listener by id instead of inline onclick) that writes typeof GleanBridge and the disabled flag into the card. The card came back as a title and a disabled button, with none of the script text visible.

Conclusions: inline HTML in agent chat works for display. A live button that sends a chat message was not shown to work in the builder Preview. No public Glean documentation mentions GleanBridge, the client prompt is the only source. Unknown: whether buttons are disabled only in the builder Preview, whether the renderer strips scripts and handlers, or whether the contract needs something else. Next options: ask the client for their working example, try the draft agent in a normal chat outside the builder, or ship the read-only HTML cards with the typed Ignore N.

Side effects of the probe: two throwaway artifacts named Probe Card exist in the Preview chat of the draft agent (private, nothing written to the mailbox).

### Widget probe, outside the builder (2026-11-05)

- **Draft cannot run outside the builder.** On the agent's own page (marked Draft) the Run agent button stays aria-disabled with every input set, no reason shown. Running it there would need a publish, which is not done.
- **Contract confirmed by Glean's own guidance.** Asked the Glean assistant in a regular chat. It found no public docs for GleanBridge, but its built-in artifact guidance gives the same contract as the client prompt: GleanBridge.postMessage with actionId (required, one per button), type glean-send-message (required), metadata.displayLabel (required, shown as the user's chat message) and metadata.context (what the model receives, falls back to displayLabel). Works in inline chat widgets and full HTML artifacts, in Auto mode agent chats (not in Workflow agents). A click only sends a chat message, the widget stays stale until the agent redraws it. The frame is sandbox allow-scripts with a null origin and a CSP that blocks all network. Inline widgets need the admin setting Inline artifacts on. If the bridge is not available the button turns off and a note appears. Builder Preview is not covered by the docs, they suggest Preview in new tab and say to test the button there.
- **Observation.** The same kind of button is active (blue) in a regular chat and greyed in the builder Preview. So the builder Preview has no bridge, which matches the greyed buttons of both probes.
- **Not confirmed.** The actual post on click. Automated clicks and keys do not get into the sandboxed frame, in either place, so a click in a regular chat has to be done by hand. Preview in new tab is blocked for automation (new tabs only from the user's own click).
- **Consequence for the build.** The cards can be built to the contract and the typed Ignore N stays as the fallback. The click can only be proven in a live chat, or by the user clicking in a regular chat and in Preview in new tab. Throwaway test chat left in the user's Glean: "Glean artifact messaging support" with a test card.

### Widget click confirmed in a regular chat (2026-11-05)

The user clicked the Ignore button of the test card in the regular Glean chat. Result: the chat received the message "Ignore 1" (the context text, word for word), the assistant answered, and redrew the card struck through with the note "Ignored in this chat" and an Undo button, which in turn sends "Undo 1". So the contract works: button, chat message, agent redraws the card. The redraw is done by the agent, the widget does not update itself. Still open: the same button inside the V2 agent chat. The builder Preview greys the button (no bridge), the draft cannot run outside the builder, so only Preview in new tab (user click) or a live chat can show it.

Design choice for the real brief: (a) the model writes the HTML widget in its reply (simple, but 16 cards of HTML by hand is long and error prone) or (b) a script skill renders the cards from JSON into an HTML file that Glean shows as an interactive artifact (same pattern as the email brief-render, no retyping). Recommendation: (b).
