# Prompt 23: style-profiler checks the sheet after the write and uses one "too few mails" text (spike run 4, 2026-10-22)

Context: the fourth consented BUILD run (up to 40 mails) worked end to end. It listed the sent mails, read the candidates, kept 28 usable mails and showed the approval card, and after the approval it answered "Saved: 28 mails read, 21 rows, 0 rule rows kept." with the ASK line. The run took 371 seconds and 7.84 credits. Three faults showed in the table and the trace. (a) The too-few-mails text for the peer cell was the thanks and urgent text ("use the peer cell, then the baseline"), which refers to itself. (b) meta.date_range held the window start and end, not the dates of the mails read. (c) The trace does not show the value array of the write, so the number of rows written (21 or 60) could not be confirmed, and a shorter new table would leave old rows below it. Fixed: all five cells use the same text "too few mails (n), use the baseline" (draft-writer will fall back from the urgent or thanks cell to the peer cell, then the baseline, in its own text), meta.date_range names the oldest and newest usable mail, and after the write the agent reads AD1:AE60 again and answers "Not saved: the sheet does not match the table" unless AD1 holds baseline.greeting, exactly m keys are not blank and no row below row m has a key or a value. Main and the other sub-agents are unchanged (stage 23 main snapshot equals stage 22). Rollback: the version saved before prompt 20 (name starts with v22) or the stage 22 snapshot of style-profiler. The version saved after this prompt starts with v23.

## Block 0: main edit

None.

## Block 1: style-profiler text (Instructions of the sub-agent, edited by hand in its dialog, three replacements)

Replacement 1, in BUILD step 5. Replace this text:

```
for authority, peer or close the key <cell>.notes with the value "too few mails (n), use the baseline", and for thanks or urgent the key <cell>.notes with the value "too few mails (n), use the peer cell, then the baseline", with n replaced by the number.
```

with this text:

```
the key <cell>.notes with the value "too few mails (n), use the baseline", with n replaced by the number, the same text for all five cells.
```

Replacement 2, in BUILD step 5. Replace this text:

```
meta.date_range, meta.refreshed
```

with this text:

```
meta.date_range (the dates of the oldest and newest usable mail as "yyyy-mm-dd to yyyy-mm-dd"), meta.refreshed
```

Replacement 3, in BUILD step 6. Replace this text:

```
with "" in both cells of every unused row and no header row. Answer "Saved: n mails read, m rows, k rule rows kept. Every other old row was replaced." Say Saved only after the write tool succeeded.
```

with this text:

```
with "" in both cells of every unused row and no header row. Then call Get range on Sheet0 AD1:AE60 once more and check that AD1 holds baseline.greeting, that exactly m keys are not blank and that no row below row m holds a key or a value. If a check fails, answer "Not saved: the sheet does not match the table" and stop. Otherwise answer "Saved: n mails read, m rows, k rule rows kept. Every other old row was replaced." Say Saved only after the write tool succeeded and the check passed.
```

After the edit, check that the sub-agent still has 22 paragraphs, save, reload the page and read the hash back with the snapshot method. It must equal the hash of the stage 23 snapshot of style-profiler.

Tools of style-profiler: unchanged (five tools).
