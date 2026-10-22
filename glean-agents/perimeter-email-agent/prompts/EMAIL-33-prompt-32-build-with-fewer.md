# Prompt 32: style-profiler builds from fewer than TARGET usable mails (wiring test, 2026-10-22)

Context: in the first wiring test the user's plain "yes" reached style-profiler through the main agent with the consent line (the routing and the consent rule worked), but the sub-agent answered "NOT ENOUGH MAIL (17 usable)" with a Skipped line. Its own text says to answer that only when fewer than 5 usable mails remain. With the default TARGET of 30 it read 17 usable mails as too few, so no style was built. Fixed: step 3 says that when fewer than TARGET usable mails are kept the build goes on with what it has as long as there are 5 or more, and the Answers paragraph says that NOT ENOUGH MAIL is answered only below 5 usable mails and never because fewer than TARGET remain. Cells already fall back to the baseline when they are thin, so a smaller sample is safe. Main and the other sub-agents are unchanged (stage 32 main snapshot equals stage 31). Rollback: the version saved at stage 29 to 31 (v26) or the stage 29 snapshot of style-profiler.

## Block 0: main edit

None.

## Block 1: style-profiler text (Instructions of the sub-agent, edited by hand in its dialog, 2 replacements)

Both replacements end inside a paragraph.

Replacement 1. Replace this text:

```
Stop when TARGET usable mails are kept or no candidate is left.
```

with this text:

```
Stop when TARGET usable mails are kept or no candidate is left, and when fewer than TARGET are kept, build from what you have as long as there are 5 or more.
```

Replacement 2. Replace this text:

```
(when fewer than 5 usable mails remain, write nothing to the workbook)
```

with this text:

```
(only when fewer than 5 usable mails remain, never because fewer than TARGET remain, and then write nothing to the workbook)
```

After the edit, check that the sub-agent still has 22 paragraphs, save, reload the page and read the hash back with the snapshot method. It must equal the hash of the stage 32 snapshot of style-profiler.

Tools of style-profiler: unchanged (five tools).
