# Prompt 29: notes-keeper stops handling the writing style and asks the permission question, style-profiler asks a truthful question (wiring step 1, 2026-10-22)

Context: the user approved wiring the style table into main, notes-keeper and draft-writer. A four-lens read-only review of the planned edits (mechanics, behaviour, safety, drafting) found the points fixed here. notes-keeper keeps only the two lists now (A1:Z2, two rows of 26 cells) and no longer touches row 3, so the old Writing Styles row in A3 is retired and left alone. It reads A1:AE2 only to see whether AD1 reads baseline.greeting, adds the permission question to its READ answer when the workbook exists and no style is saved, and never lists or counts a cell from column AA on as a VIP or topic entry (once a style is saved, AD1:AE2 hold style keys and values). When List drive files or Get range fails, or two files have the workbook name, it writes nothing and never calls Create Excel sheet, because a failed read taken for "no file" could create a second workbook. The ASK line no longer offers a check afterwards, because the 20 pair check does not exist (the question "Does this sound like you?" follows every build), and it says that the agent uses up to 30 mails and may open more to find 30 it can use, because skipped mails are opened before they are skipped. The same sentence is changed in style-profiler so the two lines stay equal. style-profiler also says what to do after NO WORKBOOK and NO PROFILE, and a habit named without a cell in an EDIT means the baseline key. Main, draft-writer and meeting-prep are unchanged (stage 29 main snapshot equals stage 28). Rollback: version v24 (name starts with v24), the stage 16 notes-keeper snapshot and the stage 28 style-profiler snapshot.

## Block 0: main edit

None.

## Block 1: notes-keeper text (Instructions of the sub-agent, edited by hand in its dialog, 14 replacements)

Every replacement ends inside a paragraph or at the end of a plain paragraph (the text has no lists).

### notes-keeper

Replacement 1. Replace this text:

```
keep the user's VIP, topic and writing style entries in one Excel sheet
```

with this text:

```
keep the user's VIP and topic entries in one Excel sheet
```

Replacement 2. Replace this text:

```
range A1:Z3 only. Column A holds the labels: A1 is VIP Contacts, A2 is VIP Topics, A3 is Writing Styles. Row 1 holds one VIP entry per cell from B1 (name, address, alias or @domain), row 2 holds one topic phrase per cell from B2, and B3 holds the one style description. Never put several entries in one cell.
```

with this text:

```
range A1:Z2 only for the lists. Column A holds the labels: A1 is VIP Contacts and A2 is VIP Topics. Row 1 holds one VIP entry per cell from B1 (name, address, alias or @domain) and row 2 holds one topic phrase per cell from B2. Never put several entries in one cell.
```

Replacement 3. Replace this text:

```
A row holds at most 25 entries (B to Z).
```

with this text:

```
A row holds at most 25 entries (B to Z). Row 3 and the columns from AA on belong to other agents: never change or clear them, and never list or count a cell there as a VIP or topic entry. The writing style lives in AD1:AE60 and only style-profiler writes it. You only test whether AD1 reads baseline.greeting.
```

Replacement 4. Replace this text:

```
then call Get range with worksheet Sheet0 and address A1:Z3. Never read
```

with this text:

```
then call Get range with worksheet Sheet0 and address A1:AE2 (the lists are in A1:Z2, AD1 is the second to last cell of row 1 and tells whether a style is saved). Never read
```

Replacement 5. Replace this text:

```
treat the sheet as empty.
```

with this text:

```
treat the sheet as empty. If List drive files or Get range fails, or two files have that exact name, write nothing, never call Create Excel sheet, and answer "Not saved: cannot read the workbook" (READ answers NO LISTS).
```

Replacement 6. Replace this text:

```
READ: answer only the VIP and topic entries, one per line,
```

with this text:

```
READ: answer only the VIP and topic entries from B1:Z1 and B2:Z2, one per line,
```

Replacement 7. Replace this text:

```
plus the ASK line below.
```

with this text:

```
plus the ASK lines below.
```

Replacement 8. Replace this text:

```
Skip blank cells and the style. If there is no file
```

with this text:

```
Skip blank cells. If there is no file
```

Replacement 9. Replace this text:

```
should I save?
```

with this text:

```
should I save? When the file exists, the read worked and AD1 does not read baseline.greeting, add one more last line: ASK: May I read your recent sent mails (I use up to 30 and may open more to find 30 I can use) to learn how you write, so drafts sound like you? Nothing is sent or shared, and you can see and edit what I save. Reply yes to start. Use only whether AD1 reads baseline.greeting, never the other text in AD1:AE2.
```

Replacement 10. Replace this text:

```
, then the same lines, then "Writing Styles: " plus the style if there is one.
```

with this text:

```
, then the same lines.
```

Replacement 11. Replace this text:

```
ADD or REMOVE: read A1:Z3 (empty when there is no file).
```

with this text:

```
ADD or REMOVE: read A1:Z2 (empty when there is no file).
```

Replacement 12. Replace this text:

```
, and a new style replaces the old one. REMOVE deletes
```

with this text:

```
. REMOVE deletes
```

Replacement 13. Replace this text:

```
Then write the three rows, with the labels in column A, into A1:Z3 in one call, as exactly three rows of 26 cells (VIP Contacts, VIP Topics, Writing Styles) with blank cells for unused columns and no header row. Use Update range when the file exists. Use Create Excel sheet with the three rows when it does not. Answer one line: "Saved: n VIP, m TOPIC and s STYLE entries."
```

with this text:

```
Then write the two rows, with the labels in column A, into A1:Z2 in one call, as exactly two rows of 26 cells (VIP Contacts, VIP Topics) with blank cells for unused columns and no header row. Use Update range when the file exists. Use Create Excel sheet with the two rows when it does not. Answer one line: "Saved: n VIP and m TOPIC entries."
```

Replacement 14. Replace this text:

```
never write anywhere but A1:Z3 of this workbook
```

with this text:

```
never write anywhere but A1:Z2 of this workbook
```

## Block 2: style-profiler text (Instructions of the sub-agent, edited by hand in its dialog, 6 replacements)

### style-profiler

Replacement 1. Replace this text:

```
(up to TARGET of them)
```

with this text:

```
(I use up to TARGET and may open more to find TARGET I can use)
```

Replacement 2. Replace this text:

```
Reply yes to start, and say if you also want a check afterwards.
```

with this text:

```
Reply yes to start.
```

Replacement 3. Replace this text:

```
answer NO WORKBOOK and stop.
```

with this text:

```
answer "NO WORKBOOK: save one VIP or topic first, that creates the workbook." and stop.
```

Replacement 4. Replace this text:

```
If the range is empty, answer NO PROFILE.
```

with this text:

```
If the range is empty, answer "NO PROFILE: say learn my writing style to build one."
```

Replacement 5. Replace this text:

```
The key must already exist in the table, or start with
```

with this text:

```
A habit named without a cell means the baseline key, for example greeting means baseline.greeting. The key must already exist in the table, or start with
```

Replacement 6. Replace this text:

```
NO WORKBOOK, AMBIGUOUS WORKBOOK, NO PROFILE,
```

with this text:

```
"NO WORKBOOK: save one VIP or topic first, that creates the workbook.", AMBIGUOUS WORKBOOK, "NO PROFILE: say learn my writing style to build one.",
```

After the edits, check that notes-keeper and style-profiler still have their paragraph counts (notes-keeper 8, style-profiler 22), save each dialog, reload the page and read both hashes back with the snapshot method. They must equal the hashes of the stage 29 snapshots.

Tools: unchanged for both (notes-keeper keeps Get range, List drive files, Update range and Create Excel sheet).
