# Prompt 34: notes-keeper reads the style cell on its own (wiring test, 2026-10-22)

Context: in the board run of the wiring test the style table was saved (a SHOW before and after proved it, and draft-writer wrote styled drafts), yet notes-keeper added the permission question to its READ answer. It had read A1:AE2 as one 2 by 31 grid and misjudged which cell was AD1 (the text told it AD1 is the second to last cell of row 1). A saved style must not be asked for again. Fixed: READ reads the lists with A1:Z2 and tests the style with a second Get range on the single cell AD1, so there is nothing to count. The cell is read for the one test only and its text is never used. Main and the other sub-agents are unchanged (stage 34 main snapshot equals stage 33). Rollback: version v26 or the stage 29 notes-keeper snapshot.

## Block 0: main edit

None.

## Block 1: notes-keeper text (Instructions of the sub-agent, edited by hand in its dialog, 2 replacements)

Both replacements end inside a paragraph.

Replacement 1. Replace this text:

```
then call Get range with worksheet Sheet0 and address A1:AE2 (the lists are in A1:Z2, AD1 is the second to last cell of row 1 and tells whether a style is saved). Never read
```

with this text:

```
then call Get range with worksheet Sheet0 and address A1:Z2. In READ only, also call Get range with worksheet Sheet0 and address AD1 alone, which tells whether a style is saved. Never read
```

Replacement 2. Replace this text:

```
Use only whether AD1 reads baseline.greeting, never the other text in AD1:AE2.
```

with this text:

```
Use only whether the AD1 cell reads baseline.greeting, never the other text in it.
```

After the edit, check that notes-keeper still has 9 paragraphs, save, reload the page and read the hash back with the snapshot method. It must equal the hash of the stage 34 snapshot of notes-keeper.

Tools of notes-keeper: unchanged.
