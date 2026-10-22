# Prompt 22: style-profiler counts each skipped mail once and never skips for a missing label (spike run 3, 2026-10-22)

Context: the third consented BUILD run (up to 20 mails) listed the newest 100 sent mails, kept about 19 candidates, read them with Get email message and answered NOT ENOUGH MAIL (0 usable) with the line Skipped: subject prefix 64, sent only to self 60, unknown sensitivity label 19, no user-written text 11, passcode 6. The mailbox is a test mailbox, so its newest sent mails are briefs, notes to self and meeting invites. Two wording faults showed. The counts overlap (they add up to more than the 100 mails listed), and a count named "unknown sensitivity label" suggests that a missing label was treated as a reason to skip. Fixed: each mail is counted once under the first reason that applied, and a missing or unknown label is never a reason to skip. Main and the other sub-agents are unchanged (stage 22 main snapshot equals stage 21). Rollback: the version saved before prompt 20 (name starts with v22) or the stage 21 snapshot of style-profiler.

## Block 0: main edit

None.

## Block 1: style-profiler text (Instructions of the sub-agent, edited by hand in its dialog, two replacements)

Replacement 1, in BUILD step 2. Replace this text:

```
or whose sensitivity label names a class listed in item a, and count each skip by reason.
```

with this text:

```
or whose sensitivity label names a class listed in item a (a missing or unknown label is never a reason to skip), and count each mail once, under the first reason that applied.
```

Replacement 2, in the Answers paragraph. Replace this text:

```
a count for each skip reason that applied, in plain words
```

with this text:

```
a count for each skip reason that applied, each mail counted once under the first reason, in plain words
```

After the edit, check that the sub-agent still has 22 paragraphs, save, reload the page and read the hash back with the snapshot method. It must equal the hash of the stage 22 snapshot of style-profiler.

Tools of style-profiler: unchanged (five tools).
