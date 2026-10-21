# Personal memory for VIP lists and writing style (design, 2026-10-21)

Status: draft, approved to run the spike only. Nothing in the live agent changes before the spike result and a second yes.

## Intent

Store each user's VIP addresses, topics and writing style in the user's own Glean Personal Memory, so one shared agent behaves per user. Drafts and follow-ups must read like the user wrote them. Today the lists live in a mailbox draft kept by notes-keeper, and the style is rebuilt from sent mail on every run.

## What Glean documents

- Memory is stored per user and never shared across users.
- Agents can access the user's memories "subject to the agent's configuration and your memory settings". The docs do not say how.
- The `memory` and `memory_schema` tools (read, add, update, delete) are documented for MCP-connected apps. The docs do not say Auto-mode agents get them.
- Saved memories last until deleted. Extracted memories expire after 30 days.
- The agent "memory" concept in the agent docs is a per-run notebook and is not related.

## Design

1. New skill "Personal VIP and Writing Style" (costs 0 of the 32,000 Instructions characters). It holds the rules below.
2. Memory line format, one per line: `VIP: name, address or @domain`, `TOPIC: phrase`, `STYLE: description`.
3. The parent agent reads the memory lines before delegating. Sub-agents get only derived context: draft-writer gets the style text, never the VIP list.
4. Save flow for a VIP or style change:
   1. Prepare and show the proposed lines.
   2. Ask for explicit confirmation.
   3. If a Personal Memory write tool is available, write the confirmed lines only to the invoking user's memory.
   4. If no write tool is available, never claim a save. Return the exact lines to save through Glean Personalization.
5. Conversation start: the "VIP and topics" line stays in chat and never goes into the emailed brief. With no VIP saved, the agent asks, shows the proposed lines and follows the save flow.
6. Missing style: use a short, professional, neutral default and put the "neutral style" note on the board, not in the draft.
7. Drafts look like the user's own: the "[Draft by agent]" line goes away, and idempotency becomes "a draft already exists in the thread or "Re: subject" to the same recipient". The agent still never sends.
8. notes-keeper is detached and removed after the tests pass, unless the spike fails.

## Changes to the pasted Glean prompt

- Keep: user scope, no invented VIPs, case-insensitive addresses, default style, no memory write without a tool, confirmation before any write.
- Change: "never include the full VIP list in the final response" becomes "show it in chat, never in the emailed brief".
- Change: remove the semicolon in "the VIP list is missing, treat it as empty".
- Add: the fixed line format and the save flow above.

## Spike (before any change to the real agent)

Questions: can an Auto-mode agent read saved memories, and does it get a memory-write tool?

1. Save two test memories in the user's Glean Personalization: `VIP: test, spike@yopmail.com` and `STYLE: short, no greeting, signs Kishan`.
2. Create one throwaway agent. Ask it for the saved memory lines. Check its Tools tab for a memory tool.
3. Delete the throwaway agent and the two test memories after the result, with the user's yes.

Outcomes:

| Read works | Write tool | Result |
|---|---|---|
| yes | yes | memory only, notes-keeper removed |
| yes | no | memory read-only, agent asks and returns the lines to save |
| no | n/a | keep the mailbox drafts, use the skill for rules only |

## Tests after the build

- 5 draft items compared with the saved style, 2 runs with the same style, then a blind test with the user.
- Second user: needs a second Glean account, otherwise only the documented scoping is checked.
- Board layout still passes the skeleton check in 3 runs.

## Spike result (2026-10-21)

- Saved two test memories through Glean Assistant chat. Glean stored them as prose in Settings, Memory, "Mentioned by you": "VIP. test, spike@yopmail.com." and "Writing style. Keep messages short, use no greeting, and sign as Kishan." The exact `VIP:` and `STYLE:` line format is not kept.
- Throwaway agent (draft, no tools), two Preview probes ("Show my saved memory lines now." and "What do you remember about me, my VIP contacts and my writing style?"): both answered that no saved memories exist. The agent knew only the account profile (name, team, location).
- Tools tab picker: no memory tool. "By Glean" holds search, output and Enterprise Graph tools (read personal activity, search insights, chat insights). Searching "memory" returns no results.
- Settings, Memory has no agents toggle.
- Outcome: row 3 of the table. Auto agents cannot read saved Personal Memory today. Keep the mailbox drafts for VIP, topics and style. The skill carries rules only.

## OneDrive storage plan check (2026-10-21)

The user's downloaded plan stores a JSON file per user in OneDrive and stops if the builder has no OneDrive read and update tools. Checked in the tool picker of a throwaway agent (packs added to read their tool lists, then deleted again):

- "Microsoft 365 Actions": write tools only (Create Excel sheet, Create Word doc, Upload a Glean artifact to OneDrive). No read, no update. There is no standalone OneDrive pack.
- "Microsoft Excel Extension Actions": read tools Get range, List comments, List drive files, List worksheets. Write tools include Create excel session, Update range, Insert range, Add table row, Clear range. It can read and update a workbook in the signed-in user's OneDrive.
- "Microsoft SharePoint Extension Actions": site lists and folders (shared), not per user.

Result: the plan's JSON file cannot be read or updated (no tool for it), so its decision point says stop. An Excel workbook in the user's own OneDrive is the nearest match: two sheets (VIP and topics, style), Get range to read, Update range to write, Create Excel sheet to create. Open points: List drive files is broad (restrict by instruction and by the access policy if available), Update range needs a Create excel session first, and the workbook must be created once per user.

## Excel store spike (2026-10-21, user chose Excel with low token use)

Throwaway agent (draft, never published) with Excel pack trimmed to Get range, List drive files, Create excel session, Update range, Close excel session, plus Create Excel sheet from the Microsoft 365 pack. Write box ticked on the throwaway only.

- WRITE, workbook missing: Create Excel sheet made "Glean Personal Agent Data.xlsx" in the signed-in user's personal OneDrive, first sheet named `Sheet0`, with the text in A1 (read back and confirmed by Get range).
- READ, first try: failed with `ItemNotFound` because the agent guessed the worksheet. Four Get range retries, 65 s, 0.92 credits.
- READ, sheet name pinned in the instruction ("Sheet0", cell A1, find the file with List drive files once): 2 tool calls (List drive files, Get range), A1 returned exactly.
- UPDATE existing cell: Tool search, List drive files, Update range, no session needed, 22 s, 0.78 credits.
- Token-lean format: one cell A1 holds the whole store as plain lines (`VIP: ...`, `TOPIC: ...`, `STYLE: ...`), so one Get range returns everything. No JSON, no extra sheets.
- Rules to put in the skill: exact file name, worksheet `Sheet0`, cell A1, never List or read anything else, read once at conversation start and pass sub-agents only derived text, confirm before every write, report success only after Update range succeeds.
- Notes: Agent Builder has no tool that reads a .md or .json file from OneDrive, so Excel is the only readable store. The cell can still hold .md style text. Each run adds about 2 tool calls.

## Cleanup and .txt check (2026-10-21)

- Deleted on the user's yes: the first throwaway agent and the test workbook (sent to the OneDrive recycle bin). The two test memories were already removed by the user.
- User asked for .txt files instead of Excel. Test: second throwaway agent with SharePoint tools (Get site drive item by path, List drives via sharepoint rest api, Upload file to folder) plus Upload a Glean artifact to OneDrive.
- WRITE of "Glean Personal Agent Data.txt" failed: Upload file to folder rejected the personal site path ("invalid personal-site path"), and the tenant-root retry returned "access denied". No file was created. The SharePoint tools address site drives, not a user's personal OneDrive.
- No tool in Agent Builder reads or overwrites a .txt in a personal OneDrive. "Upload a Glean artifact to OneDrive" creates a file from a Glean artifact and cannot update one. The only read path is a knowledge base resource ("User's knowledge", search based), which is read-only and not an exact file read.
- Result: .txt cannot be the store. Excel (Get range, Update range) is the only per-user read and write path found.

## Decision and Plan B (2026-10-21)

Decision: build the Excel store (user: "2, build the real agent now with the Excel store"). Built as prompt 14: notes-keeper keeps VIP, TOPIC and STYLE entries in cell A1 of Sheet0 in "Glean Personal Agent Data.xlsx" in the signed-in user's own OneDrive, draft-writer reads the STYLE entry, "[Draft by agent]" is gone, drafts of an existing thread or "Re: subject" to the same recipient count as already drafted. No separate skill was added: the rules (exact file, one cell, confirm before write, say Saved only after the write succeeded) live in the notes-keeper text, which costs 0 of the main 32,000 characters.

Plan B (kept on request, not built): keep the entries in a .md file in the user's OneDrive (for example "Glean Personal Agent Data.md" with one entry per line) and read it through the knowledge base resource "User's knowledge" (search based, read only, may lag behind a new upload). Use it only if the Excel tools stop working. Limits found on 2026-10-21: no tool reads or overwrites a .md, .txt or .json file in a personal OneDrive, SharePoint tools reject the personal site path, and "Upload a Glean artifact to OneDrive" can create but not update a file. So under Plan B the agent can only show the lines to save and the user pastes them into the file by hand. Notes: a .txt named "Glean Email Agent's Resource.txt" already exists in the user's OneDrive (89 bytes, shared) and was not touched. Rollback for Plan B or for the whole change: the version "v16-before-excel-store" and the stage 13 snapshots.

## Three labelled rows (prompt 15, 2026-10-21)

User request: one entry per cell so a hand edit in Excel needs no commas, three rows to separate VIP, topics and style. Built as: sheet `Sheet0` of "Glean Personal Agent Data.xlsx", column A holds the labels (A1 VIP, A2 TOPIC, A3 STYLE), entries from column B (VIP in row 1, topics in row 2, the one style text in B3), at most 25 entries per row (B to Z). notes-keeper reads A1:Z3 with one Get range and rewrites the three rows with one Update range after the approval card. draft-writer reads only A3:B3. A sheet whose A1 is not exactly "VIP" (the old single-cell format) counts as empty and is overwritten on the next save.

Found in testing: on one run the agent put a header row ("Label, Entry 1, Entry 2") above the three rows in the Update range card, which would have moved VIP to row 2. The card was not approved. Fix: the notes-keeper text now says "exactly three rows of 26 cells (VIP, TOPIC, STYLE) ... and no header row". The next run wrote exactly three rows. Rollback: version "v17-before-excel-rows" and the stage 14 snapshots.
