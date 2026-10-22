# Prompt 26: style-profiler writes dates as text and checks every written cell (spike run 7, 2026-10-22)

Context: run 7 (stage 25 text, rule date 2026-10-22) read 30 usable mails and the approval card showed the table as exactly 60 data rows of 2 cells (24 filled, 36 blank) under the card's own header, with meta.version 2, the rule row kept, the same "too few mails (n), use the baseline" text for every thin cell and meta.date_range 2026-10-15 to 2026-10-21. After the approval the answer was "Saved: 30 mails read, 23 rows, 1 rule row kept." Two faults showed. (a) The rule row came back from Get range as the number 46317, because Excel turns a bare date written as text into a date cell, and the agent carried that number into the new table. A kept rule would then drift from a date to a number. (b) The row count in the answer was 23 while the table had 24 filled rows, so the check "exactly m keys are not blank" is only as good as the model's own count. Fixed: a date value is written as the word on, a space and the date as yyyy-mm-dd (text that Excel leaves alone), item a accepts that form or an Excel date number, and the read-back check compares every key and value that was written, as text, counts the filled keys in a script and checks that no row below row m holds anything. Main and the other sub-agents are unchanged (stage 26 main snapshot equals stage 25). Rollback: the version saved before prompt 20 (name starts with v22), the version v23 or the stage 25 snapshot of style-profiler.

## Block 0: main edit

None.

## Block 1: style-profiler text (Instructions of the sub-agent, edited by hand in its dialog, three replacements)

Replacement 1, in the EDIT paragraph. Replace this text:

```
Write the whole table back as in the saving step. Answer "Saved: 1 row changed."
```

with this text:

```
Write the whole table back as in the saving step, with a date value written as the word on, a space and the date as yyyy-mm-dd, never as a bare date, because Excel turns a bare date into a number. Answer "Saved: 1 row changed."
```

Replacement 2, in item a of BUILD step 3 (the replaced text stops before the full stop, so it ends inside the paragraph). Replace this text:

```
has a date and the mail was sent on or after it
```

with this text:

```
has a date (written as on yyyy-mm-dd, or as an Excel date number) and the mail was sent on or after it
```

Replacement 3, in BUILD step 6. Replace this text:

```
check that AD1 holds baseline.greeting, that exactly m keys are not blank and that no row below row m holds a key or a value.
```

with this text:

```
check that every key and value you wrote comes back unchanged (compare as text), that exactly m keys are not blank, counted in a script and not by eye, and that no row below row m holds a key or a value.
```

After the edit, check that the sub-agent still has 22 paragraphs, save, reload the page and read the hash back with the snapshot method. It must equal the hash of the stage 26 snapshot of style-profiler.

Tools of style-profiler: unchanged (five tools).
