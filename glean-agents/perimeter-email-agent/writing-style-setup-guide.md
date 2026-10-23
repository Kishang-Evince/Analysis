# Writing style setup guide

Goal: the Outlook Action Board agent learns how the user writes, asks first, and writes drafts in that style.

Short version: one workbook in the user's OneDrive, four sub-agents, one skill, one consent question.

## 1. What you get

| Part | Job |
|---|---|
| Main agent | Runs the board, routes style requests, shows the permission question once per chat |
| notes-keeper | Keeps VIP Contacts and VIP Topics, tells main when no style is saved |
| style-profiler | Reads sent mail after a yes, saves the style table, shows, edits, deletes it |
| draft-writer | Reads the style table and writes drafts in it |
| meeting-prep | Unchanged, gets VIP entries from main |
| Skill board-layout | Fixed board layout, also holds the rule for the question line |

## 2. The workbook

Name: `Glean Personal Agent Data.xlsx` in the user's own OneDrive. Sheet: `Sheet0`. notes-keeper creates it on the first ADD. Do not create it by hand.

| Cells | Holds |
|---|---|
| A1 / B1 | `VIP Contacts` / entries separated by a comma and a space |
| A2 / B2 | `VIP Topics` / entries separated by a comma and a space |
| A1:B100 | Reserved for list values such as `VIP Contacts` and `VIP Topics`. notes-keeper writes only A1:B2 today |
| D1:E60 | Writing style table, key in D, value in E, written by style-profiler only. Column C stays empty |

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
   - Run `npm run check:37` in `test-mailer/` for the whole stage.
5. First chat. Ask for the board. The question line appears above the board.
6. Say yes. The agent reads up to 30 sent mails (about 6 minutes, about 8 credits).
7. Review the table on the approval card. Approve to save it.
8. Reply to "Does this sound like you?". Say yes, or tell the agent what to change (example: `change my greeting to "Hello {first name},"`).
9. Next board run: drafts follow the saved style.

## 4. Tool configuration

| Agent | Tools | Write approval |
|---|---|---|
| Main | Outlook pack (calendar view, email read, profile, Send email) | Leave as set |
| notes-keeper | Excel: Get range, List drive files, Update range. Microsoft 365: Create Excel sheet | On |
| style-profiler | Outlook Email: List messages, Get email message. Excel: Get range, List drive files, Update range | Off, so the card shows the whole table |
| draft-writer | Outlook: List messages, Get email message, Create a draft reply, Create email draft. Excel: List drive files, Get range | Leave as set |
| meeting-prep | Calendar read tools | Unchanged |
| brief-builder | Outlook Extension Actions: Get outlook profile and Send email only. Skill `brief-render` (linked here only, never on main) | Ticked, so a scheduled run can send. No knowledge base |

Remove every other tool from the packs. Turn off "Use all company knowledge". Add no knowledge base to style-profiler.

## 5. Texts and hashes

| Agent | File in `specs/` | Hash |
|---|---|---|
| Main | `stage-39.md` (same text as `stage-37.md`) | 44d0cda3 |
| notes-keeper | `stage-39-notes-keeper.md` | 0ed5c62a |
| style-profiler | `stage-39-style-profiler.md` | 3cfa363a |
| draft-writer | `stage-39-draft-writer.md` | 8bcb17d4 |
| meeting-prep | `stage-12-meeting-prep.md` | e876218a |
| brief-builder | `stage-38-brief-builder.md` | c24cd107 (4331 characters when typed in, the editor shows the bullet lines as a list after a reload and then reads f34f3376 with 4241 characters, the words are the same) |
| Skill brief-render | `skills/brief-render.zip`, built by `python3 skills/build_zip.py` from `skills/brief-render/` | upload from the brief-builder dialog, Skills, plus, Upload a skill |
| Skill board-layout | `stage-37-board-layout-skill.md` | text only, no hash check |

Limits: main text 32,000 characters (about 1,070 left by the editor counter), each sub-agent 32,000. The editor turns lines that start with `a.` to `e.` into a list, the hash method already allows for that.

## 6. How the question works

- notes-keeper reads the cell D1 on its own. If it does not read `baseline.greeting`, there is no style.
- Main shows the question once per chat, and never after a no or a delete.
- Main sends the consent line to style-profiler only when the user says yes to that question. A request to learn the style, a question, or a yes to another question is no consent.
- The question text:

```
May I read your recent sent mails (I use up to 30 and may open more to find 30 I can use) to learn how you write, so drafts sound like you? Nothing is sent or shared, and you can see and edit what I save. Reply yes to start.
```

## 7. Everyday commands

| Say | Result |
|---|---|
| learn my writing style | Question, then build after yes |
| show my writing style | Plain summary |
| change my greeting to ... | One row changed after you approve the card |
| delete my writing style | Table cleared after you approve the card |
| add X to my VIP list / remove X | notes-keeper updates B1 |

## 8. Quick checks

- Style saved: `show my writing style` answers in plain lines, not `NO PROFILE`.
- Drafts: the board says "Draft ready in Outlook" with no neutral note. A neutral note means no style is saved.
- Reset: delete the style, then start a new chat. The question comes back.

## 9. Limits

- Style comes from the sent mail that exists. A thin mailbox gives a thin profile, thin contexts use the baseline.
- Results can differ between runs, refresh with more mail for a steadier profile.
- A draft never states a date or action for the user, it leaves `[fill in]`.
- Nothing is sent by the style feature. Drafts stay in Outlook Drafts.
- Not yet built: the 20 pair blind check.
