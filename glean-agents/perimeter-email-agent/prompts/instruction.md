# Instructions: how to use the prompts

The agent runs in **Auto mode**, so its behaviour lives in one instruction document. Prompt 0 creates that document: it is your existing agent's prompt, word for word, with five stated changes. Each later prompt **adds a step or replaces named text** in it. Step ids are stable: the original steps are Step 1 to Step 9, and every addition gets a letter (Step 1B, Step 8E and so on) so nothing is renumbered. A RUN ORDER section, added in Prompt 1 and extended by each later prompt, tells the agent the order to run them in.

Use the files **in the order below**, one ticket at a time. Each file holds one prompt. `EMAIL-01` has two: Prompt 0 creates the agent, Prompt 1 is its first enhancement stage.

## Files

| Ticket | Prompt file | Tools at this stage | Tests (`../test-plan.md`) |
|---|---|---|---|
| EMAIL-01 | [EMAIL-01-prompt-0-parity.md](EMAIL-01-prompt-0-parity.md) | List messages only (set in the AGENT SETUP lines of the prompt) | Part A (existing behaviour), run at stage 0 |
| EMAIL-01 | [EMAIL-01-prompt-1-lookback-dates-replies.md](EMAIL-01-prompt-1-lookback-dates-replies.md) | no change | Part A (stage 0), then Part B EMAIL-01 (E13, E11, E05, E06, E17, E19, E20) |
| EMAIL-02 | [EMAIL-02-prompt-2-commitments.md](EMAIL-02-prompt-2-commitments.md) | enable **Get email message** | Part B EMAIL-02 |
| EMAIL-03 | [EMAIL-03-prompt-3-asks.md](EMAIL-03-prompt-3-asks.md) | no change | Part B EMAIL-03 |
| EMAIL-04 | [EMAIL-04-prompt-4-reply-quality.md](EMAIL-04-prompt-4-reply-quality.md) | no change | Part B EMAIL-04 |
| EMAIL-05 | [EMAIL-05-prompt-5-due-dates.md](EMAIL-05-prompt-5-due-dates.md) | enable **Get calendar view** | Part B EMAIL-05 |
| EMAIL-06 | [EMAIL-06-prompt-6-brief-delivery.md](EMAIL-06-prompt-6-brief-delivery.md) | add **Send email** as the only write tool and tick the approval box on the Tools tab; the schedule moves to weekdays 8:00 am | Part B EMAIL-06 |
| EMAIL-07 | [EMAIL-07-prompt-7-drafts.md](EMAIL-07-prompt-7-drafts.md) | add **Create a draft reply** (write tools left: Send email, Create a draft reply; approval box stays ticked) | Part B EMAIL-07 |
| EMAIL-08 | [EMAIL-08-prompt-8-writing-style.md](EMAIL-08-prompt-8-writing-style.md) | no change (List messages already reads Sent Items) | Part B EMAIL-08 |
| EMAIL-09 | [EMAIL-09-prompt-9-vip-topics.md](EMAIL-09-prompt-9-vip-topics.md) | confirm company search and Read document are available; each user needs the **Agent VIP and Topics** document (setup is in the prompt file) | Part B EMAIL-09 |
| EMAIL-10-11 | [EMAIL-10-11-prompt-10-meeting-prep.md](EMAIL-10-11-prompt-10-meeting-prep.md) | **Get calendar view** already enabled (Prompt 5) | Part B EMAIL-10 and EMAIL-11 |
| all | [RUN-ORDER-final.md](RUN-ORDER-final.md) | none | the reference RUN ORDER after Prompt 10; compare it with the RUN ORDER section the agent ends up with |

## Commands for each stage

Run these in `test-mailer/` after `npm install` and filling `.env` (see its README). Add `-- --dry-run` to any seed script to preview it and read its manual Outlook steps without sending (for example `npm run seed:email-02 -- --dry-run`).

| Stage | Prompt file | Send the test mail | Check the spec |
|---|---|---|---|
| 0 (EMAIL-01) | EMAIL-01-prompt-0-parity.md | `npm run seed:a1` … `seed:a9`, one group at a time (reset the mailbox between groups) | `npm run check:0` |
| 1 (EMAIL-01) | EMAIL-01-prompt-1-lookback-dates-replies.md | `npm run seed:email-01`, or per group: `seed:e13`, `seed:e11`, `seed:e05`, `seed:e06`, `seed:e17`, `seed:e19`, `seed:e20`; bulk: `seed:e13-bulk80`, `seed:e13-bulk-topup` | `npm run check:1` |
| 2 (EMAIL-02) | EMAIL-02-prompt-2-commitments.md | `npm run seed:email-02` | `npm run check:2` |
| 3 (EMAIL-03) | EMAIL-03-prompt-3-asks.md | `npm run seed:email-03` | `npm run check:3` |
| 4 (EMAIL-04) | EMAIL-04-prompt-4-reply-quality.md | `npm run seed:email-04` | `npm run check:4` |
| 5 (EMAIL-05) | EMAIL-05-prompt-5-due-dates.md | `npm run seed:email-05` | `npm run check:5` |
| 6 (EMAIL-06) | EMAIL-06-prompt-6-brief-delivery.md | `npm run seed:email-06` | `npm run check:6` |
| 7 (EMAIL-07) | EMAIL-07-prompt-7-drafts.md | `npm run seed:email-07` | `npm run check:7` |
| 8 (EMAIL-08) | EMAIL-08-prompt-8-writing-style.md | none: the style samples are mail you send from Outlook (test plan E25) | `npm run check:8` |
| 9 (EMAIL-09) | EMAIL-09-prompt-9-vip-topics.md | `npm run seed:email-09` | `npm run check:9` |
| 10 (EMAIL-10, EMAIL-11) | EMAIL-10-11-prompt-10-meeting-prep.md | `npm run seed:email-10` (same seeds for EMAIL-11) | `npm run check:10` |

The loop for each stage:
1. Save a checkpoint, then set the Tools tab as the table above says.
2. Paste the prompt into Builder Assistant (or make its edits by hand).
3. Copy the Instructions tab text into `specs/stage-N.md` and run `npm run check:N`. It lists every missing marker and every old phrase still there; send me the file or the output.
4. Send the test mail with the seed script, do the manual Outlook steps it prints, and run the ticket's tests from `../test-plan.md` in Preview with Debug open.
5. Record P or F in the test plan, then publish only on a pass.

## How to use
1. Agents, Create agent, keep **Auto mode**. Paste **Prompt 0** (`EMAIL-01-prompt-0-parity.md`) into Builder Assistant.
2. Check the result: the Instructions tab matches the existing prompt apart from the five changes listed under Prompt 0; the trigger is a schedule on weekdays at 3:45 pm (open the schedule picker and confirm a weekday recurrence exists; if it does not, choose daily); the Model tab is Thinking.
3. **Testing:** Preview and manual chat runs accept chat overrides (for example "as of 2026-10-14" or "LOOKBACK_DAYS 7"). A scheduled run has **no chat message**: it uses the SETTINGS block as saved. Test the scheduled path with Run now from the Active agents table and read the result under Chats, Automations.
4. **Saving:** in Auto mode Save publishes the live agent, and the schedule then runs that version. Before every Builder Assistant edit create a Saved version (checkpoint). After the edit, open the Instructions tab and the publish-modal diff and confirm only the listed text changed. Publish only after the stage's Preview tests pass. If Builder Assistant changes more than asked, restore the checkpoint and make the edit by hand: the Instructions tab is a markdown editor and each prompt below is a list of exact edits.
5. After each stage run its test section and the regression pack (test plan Part D).

## Auto mode notes
- The numbered steps are instructions, not a fixed graph. Open Debug in Preview and confirm each step ran, in the order RUN ORDER gives. Tighten the wording if the agent skips or merges one.
- Outlook tools are available at every step in Auto mode, but only the ones attached to the agent. Adding the Outlook pack attaches all 29 tools (11 read, 18 write), each a chip with an x on the agent's Tools tab. Remove every tool the stage does not need: List messages only at Prompt 0, then add Get email message (Prompt 2), Get calendar view (Prompt 5), Send email (Prompt 6) and Create a draft reply (Prompt 7) at their stages. If a tool you need is not offered, ask admin (Tools, Outlook pack, Agents settings). Re-adding a removed tool is done with the + on the Tools tab; confirm that the first time you remove one.
- **SETTINGS** is a block at the top of the instructions. The owner edits the values there; they apply to everyone who uses the agent. A chat message overrides a value for one Preview or manual run only.
- Sub-tasks use the Task tool (on by default). How it behaves in scheduled runs, and its limits, are not documented: test it before relying on it.
- **Time limit:** a scheduled run is cut off at about 30 minutes and ends without a clear error, so the brief would never arrive. Caps in these prompts are deliberately low (15 full-message reads, 5 meetings). After Prompt 2 and again after Prompt 10 run a scheduled test and record the duration. If a run exceeds about 20 minutes, lower the caps or move meeting prep to a second scheduled agent.
- Where the agent's output goes: a scheduled run shows its result under Chats, Automations until Prompt 6 adds email delivery. If Outlook sign-in expires a scheduled run can fail; the user should expect a failure email and reconnect Outlook.

## Admin before pasting
Outlook tool pack added and connected (one-time admin Connect, then each user connects); scheduled triggers enabled for the pilot user. On the agent's Tools tab, remove every Outlook tool except List messages before testing Prompt 0. Approval is per agent: the box "Allow agent to use write tools without approval" under the write tools covers every write tool left on the agent, so before Prompt 6 remove every write tool except Send email and tick the box; before Prompt 7 also keep Create a draft reply. Reply to email, Forward message, Delete message and the other write tools stay removed. After each publish run a scheduled test and confirm nothing waits for approval (whether a scheduled run honours the box is unverified). If Send email stays blocked, the Glean "Send email from Glean" tool is the fallback (recipient is the running user, subject is fixed).
