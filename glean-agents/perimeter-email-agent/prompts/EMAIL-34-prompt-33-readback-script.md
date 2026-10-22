# Prompt 33: style-profiler checks the sheet in a script and names the first differing row (wiring test, 2026-10-22)

Context: in the wiring test a consented BUILD showed the approval card, the table was written and a SHOW afterwards read it back, yet the build answered "Not saved: the sheet does not match the table". The trace shows one Get range after the write, then the answer, with no script step, so the comparison was done by the model in its head and gave a false alarm without a reason. A false "Not saved" tells the user nothing was saved while the table is there. Fixed: the check runs in a script on the 120 cells (every written key and value against the returned cell, as trimmed text, the count of filled keys, and the rows below row m), and a failure names the first differing row. Main and the other sub-agents are unchanged (stage 33 main snapshot equals stage 32). Rollback: version v26 or the stage 32 snapshot of style-profiler.

## Block 0: main edit

None.

## Block 1: style-profiler text (Instructions of the sub-agent, edited by hand in its dialog, 2 replacements)

Both replacements end inside a paragraph.

Replacement 1. Replace this text:

```
check that every key and value you wrote comes back unchanged (compare as text), that exactly m keys are not blank, counted in a script and not by eye, and that no row below row m holds a key or a value.
```

with this text:

```
check, in a script and not by eye, that every key and value you wrote comes back unchanged (compare as trimmed text), that exactly m keys are not blank and that no row below row m holds a key or a value.
```

Replacement 2. Replace this text:

```
answer "Not saved: the sheet does not match the table" and stop.
```

with this text:

```
answer "Not saved: the sheet does not match the table at row n", with n the first row that differs, and stop.
```

After the edit, check that the sub-agent still has 22 paragraphs, save, reload the page and read the hash back with the snapshot method. It must equal the hash of the stage 33 snapshot of style-profiler.

Tools of style-profiler: unchanged (five tools).
