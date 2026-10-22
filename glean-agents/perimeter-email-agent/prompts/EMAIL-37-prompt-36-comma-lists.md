# Prompt 36: VIP Contacts and VIP Topics as comma separated values in one cell (user request 2026-10-22)

Context: the user wants each list in one cell, like this in the workbook: VIP Contacts in A1 and its entries in B1 as "jane.vip@yopmail.com, ceo.vip@yopmail.com, dharmesh.patt@perimeterhealthcare.com", VIP Topics in A2 and "budget approval, renewal" in B2. The user also said no to a 50 entry cap and no to dropping a comma from an entry, and then asked to delete the old workbook and have it created again in this format. So: no entry cap (only the 32,000 character limit of a cell, then "Not saved: row full."), an entry that holds a comma is wrapped in double quotes and reading splits only at commas outside quotes, and the old one value per cell layout is not read any more (the workbook is recreated, B only is read). notes-keeper reads and writes A1:B2 only. style-profiler reads A1:B1 and splits B1 at the commas for its VIP test. Main, draft-writer and meeting-prep are unchanged because main still receives "VIP: entry" and "TOPIC: entry" lines (stage 36 main snapshot equals stage 35). Rollback: version v27 or the stage 34 notes-keeper snapshot and the stage 33 style-profiler snapshot.

## Block 0: main edit

None.

## Block 1: notes-keeper text (Instructions of the sub-agent, edited by hand in its dialog, 5 replacements)

All replacements end inside a paragraph or at the end of a plain paragraph (the text has no lists).

Replacement 1. Replace this text:

```
range A1:Z2 only for the lists. Column A holds the labels: A1 is VIP Contacts and A2 is VIP Topics. Row 1 holds one VIP entry per cell from B1 (name, address, alias or @domain) and row 2 holds one topic phrase per cell from B2. Never put several entries in one cell. A row holds at most 25 entries (B to Z). Row 3 and the columns from AA on belong to other agents: never change or clear them, and never list or count a cell there as a VIP or topic entry.
```

with this text:

```
range A1:B2 only for the lists. Column A holds the labels: A1 is VIP Contacts and A2 is VIP Topics. B1 holds all VIP entries (name, address, alias or @domain) and B2 holds all topic phrases, each cell as one text of entries separated by a comma and a space, for example "jane.vip@yopmail.com, ceo.vip@yopmail.com, @acme.com". An entry that holds a comma is wrapped in double quotes, for example "Smith, John". Put entries that start with @ after the others, so that no cell starts with @, =, + or -. A cell holds at most 32,000 characters. Row 3 and every column from C on belong to other agents: never change or clear them, and never list or count a cell there as a VIP or topic entry.
```

Replacement 2. Replace this text:

```
address A1:Z2. In READ only
```

with this text:

```
address A1:B2. In READ only
```

Replacement 3. Replace this text:

```
READ: answer only the VIP and topic entries from B1:Z1 and B2:Z2, one per line, as "VIP: entry" and "TOPIC: entry", trimmed, plus the ASK lines below. Skip blank cells.
```

with this text:

```
READ: answer only the VIP and topic entries from B1 and B2, split at the commas outside double quotes, one per line, as "VIP: entry" and "TOPIC: entry", trimmed and without the quotes, plus the ASK lines below. Skip blank pieces.
```

Replacement 4. Replace this text:

```
read A1:Z2 (empty when there is no file). ADD puts each entry that is not already in its row (compare ignoring case and spacing) in the next free cell of that row. REMOVE deletes every entry that matches and closes the gap in its row. If a row would pass 25 entries, change nothing and answer "Not saved: row full." Then write the two rows, with the labels in column A, into A1:Z2 in one call, as exactly two rows of 26 cells (VIP Contacts, VIP Topics) with blank cells for unused columns and no header row.
```

with this text:

```
read A1:B2 (empty when there is no file) and split B1 and B2 into entries as in READ. ADD appends each entry that is not already in its row (compare ignoring case and spacing). REMOVE deletes every entry that matches. If a row would pass 32,000 characters, change nothing and answer "Not saved: row full." Then write the two rows, with the labels in column A, into A1:B2 in one call, as exactly two rows of 2 cells (VIP Contacts and its entries, VIP Topics and its entries), each entries cell joined with a comma and a space, and no header row.
```

Replacement 5. Replace this text:

```
never write anywhere but A1:Z2 of this workbook
```

with this text:

```
never write anywhere but A1:B2 of this workbook
```

## Block 2: style-profiler text (Instructions of the sub-agent, edited by hand in its dialog, 2 replacements)

Replacement 1. Replace this text:

```
read only A1:Z1 and AD1:AE60 of Sheet0
```

with this text:

```
read only A1:B1 and AD1:AE60 of Sheet0
```

Replacement 2. Replace this text:

```
Then call Get range on Sheet0 A1:Z1. The VIP Contacts are B1 to Z1, and A1 is only their label. Use them only when A1 is exactly "VIP Contacts" and B1:Z1 is not blank.
```

with this text:

```
Then call Get range on Sheet0 A1:B1. The VIP Contacts are the comma separated entries in B1 (an entry in double quotes may hold a comma), and A1 is only their label. Use them only when A1 is exactly "VIP Contacts" and B1 is not blank.
```

After the edits, check that notes-keeper still has 9 paragraphs and style-profiler 22, save each dialog, reload the page and read both hashes back with the snapshot method. They must equal the hashes of the stage 36 snapshots.

Tools: unchanged for both.
