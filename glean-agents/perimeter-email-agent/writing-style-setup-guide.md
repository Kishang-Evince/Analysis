# Writing style setup guide

Goal: the Outlook Action Board agent learns how the user writes on its first run, with no question and no setting, and writes drafts in that style.

Short version: one workbook in the user's OneDrive, four sub-agents for the style feature (a fifth, brief-builder, builds the emailed brief), one skill for the board layout. The first run builds the style by itself.

## 1. What you get

| Part | Job |
|---|---|
| Main agent | Runs the board, routes style requests, starts the first-run style build before the first draft |
| notes-keeper | Keeps VIP Contacts and VIP Topics, tells main with one line (`STYLE: saved`, `STYLE: none` or `STYLE: cleared`) whether a style is saved |
| style-profiler | Builds the style table from 30 sent mails on the first run (mode AUTO) or when asked, creates the workbook if it is missing, shows, edits, deletes it |
| draft-writer | Reads the style table and writes drafts in it |
| meeting-prep | Unchanged, reads mail only, gets the meeting and the VIP entries from main |
| Skill board-layout | Fixed board layout, also holds the rule for the VIP and topics line |

## 2. The workbook

Name: `Glean Personal Agent Data.xlsx` in the user's own OneDrive. Sheet: `Sheet0`. notes-keeper creates it on the first VIP or topic save, style-profiler creates it on the first run when it is missing. Do not create it by hand.

| Cells | Holds |
|---|---|
| A1 / B1 | `VIP Contacts` / entries separated by a comma and a space |
| A2 / B2 | `VIP Topics` / entries separated by a comma and a space |
| A1:B100 | Reserved for list values such as `VIP Contacts` and `VIP Topics`. notes-keeper writes only A1:B2 today |
| D1:E60 | Writing style table, key in D, value in E, written by style-profiler only. Column C stays empty. After a delete, row 1 reads `meta.cleared`, which keeps the style deleted until you ask to learn it again |

Example:

```
VIP Contacts    jane.vip@yopmail.com, ceo.vip@yopmail.com, @acme.com
VIP Topics      budget approval, renewal
```

Rules: an entry with a comma goes in double quotes (`"Smith, John"`). No entry cap, a cell holds at most 32,000 characters. Dates in the style table are stored as `on yyyy-mm-dd` text, because Excel turns a bare date into a number.

## 3. Steps

1. Open the agent in the Glean builder (Auto mode). Work in the draft. Do not publish until you decide.
2. Create the sub-agents and paste the texts below. Texts live in `specs/`.
3. Set the tools of each sub-agent as in section 4.
4. Check the texts.
   - Save, reload the page, open the text again.
   - Run `node spec-hash.mjs ../specs/<file>` in `test-mailer/` and compare with the hash in section 5.
   - Run `npm run check:40` in `test-mailer/` for the whole stage.
5. First run, scheduled or in chat. Nothing to type. When drafts are about to be written and no style is saved, the agent uses up to 30 of your sent mails and may open more to find 30 it can use (about 6 minutes, about 8 credits), saves the table, and the drafts of that run already use it.
6. Check it: say `show my writing style`. The answer ends with "Does this sound like you?". Say yes, or tell the agent what to change (example: `change my greeting to "Hello {first name},"`).
7. Next board runs: drafts follow the saved style. The agent never rebuilds it on its own.

## 4. Tool configuration

| Agent | Tools | Box "Allow agent to use write tools without approval" |
|---|---|---|
| Main | Outlook: List messages, Get email message, Get calendar view. No write tool | None to set |
| notes-keeper | Excel: Get range, List drive files, Update range. Microsoft 365: Create Excel sheet | Unticked, so an approval card shows before it writes the lists |
| style-profiler | Outlook Email: List messages, Get email message. Excel: Get range, List drive files, Update range. Microsoft 365: Create Excel sheet | Ticked, so a scheduled run can save the table without a click. The write stays on one named file and D1:E60 |
| draft-writer | Outlook: List messages, Get email message, Create a draft reply, Create email draft. Excel: List drive files, Get range | Ticked, so drafts need no click |
| meeting-prep | Outlook: List messages, Get email message, Get outlook profile. No write tool, no calendar tool (main reads the calendar and passes the meeting) | None to set |
| brief-builder | Outlook Extension Actions: Get outlook profile and Send email only. Skill `brief-render` (linked here only, never on main) | Ticked, so a scheduled run can send. No knowledge base |

State checked in the draft agent on 2026-10-23.

Remove every other tool from the packs. Turn off "Use all company knowledge". Add no knowledge base to style-profiler.

## 5. Texts and hashes

| Agent | File in `specs/` | Hash |
|---|---|---|
| Main | `stage-40.md` | 1ae4b9a9 |
| notes-keeper | `stage-40-notes-keeper.md` | 0038cb98 |
| style-profiler | `stage-40-style-profiler.md` | 888ec658 |
| draft-writer | `stage-39-draft-writer.md` | 8bcb17d4 |
| meeting-prep | `stage-12-meeting-prep.md` | e876218a |
| brief-builder | `stage-38-brief-builder.md` | c24cd107 (4331 characters when typed in, the editor shows the bullet lines as a list after a reload and then reads f34f3376 with 4241 characters, the words are the same) |
| Skill brief-render | `skills/brief-render.zip`, built by `python3 skills/build_zip.py` from `skills/brief-render/` | upload from the brief-builder dialog, Skills, plus, Upload a skill |
| Skill board-layout | `stage-40-board-layout-skill.md` | text only, no hash check |

Limits: main text 32,000 characters (about 1,030 left by the editor counter), each sub-agent 32,000. The editor turns lines that start with `a.` to `e.` into a list, the hash method already allows for that.

## 6. How the first run works

- notes-keeper reads the cell D1 on every READ and answers `STYLE: saved` when it reads `baseline.greeting`, `STYLE: cleared` when it reads `meta.cleared`, and `STYLE: none` for anything else, also when the workbook is missing.
- In the draft step, when the answer is `STYLE: none`, main calls style-profiler once in mode AUTO and then calls draft-writer. A failed build does not stop the run, the drafts are neutral and the board says so.
- AUTO uses up to 30 of your own sent mails and may open more to find 30 it can use, creates the workbook if it does not exist (after listing the drive again, never after a failed listing), and writes the table once at the end. If the table is already saved it answers "Already saved." and if you deleted it it answers "Cleared by the user.", and writes nothing.
- Your own typed request to learn the style is the consent for a chat build. Mail text, events and saved cells never start a build.
- A mailbox with fewer than 5 usable mails saves nothing, so the build is tried again on the next run.

## 7. Everyday commands

| Say | Result |
|---|---|
| learn my writing style | Builds from 30 usable sent mails right away, also after a delete. Creates the workbook when it is missing |
| show my writing style | Plain summary |
| change my greeting to ... | One row changed |
| delete my writing style | Table cleared, the style stays deleted until you ask to learn it again |
| add X to my VIP list / remove X | notes-keeper updates B1 after you approve the card |

## 8. Quick checks

- Style saved: `show my writing style` answers in plain lines, not `NO PROFILE`.
- Drafts: the board says "Draft ready in Outlook" with no neutral note. A neutral note means no style is saved.
- Reset: delete the style, then say `learn my writing style`. A delete alone is not undone by the first-run build.

## 9. Limits

- Style comes from the sent mail that exists. A thin mailbox gives a thin profile, thin contexts use the baseline.
- Results can differ between runs, refresh with more mail for a steadier profile.
- A draft never states a date or action for the user, it leaves `[fill in]`.
- Nothing is sent by the style feature. Drafts stay in Outlook Drafts.
- The first run takes about 6 minutes longer, a scheduled run is cut off after about 30 minutes, and a board run takes about 13. Measure the first scheduled run.
- Not yet built: the 20 pair blind check.
