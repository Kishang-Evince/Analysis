# Prompt 27: style-profiler skips a mail only for a named reason (spike run 8, 2026-10-22)

Context: run 8 (stage 26 text, same mailbox as run 7) listed 82 candidates and answered NOT ENOUGH MAIL (0 usable) with "Skipped: 64 automated or calendar subjects, 65 could not be safely read, 11 had no text written by the user, 5 held a passcode, 1 was a very short reply." Run 7 on the same mailbox had read 30 usable mails. The reason "could not be safely read" is not in the text. The model turned the long list of skip conditions of item a (secrets, medical, legal, HR, personal data of a third person) into a general doubt and dropped every mail it could not clear. Fixed: step 3 says that the reasons in item a are the only reasons to skip a mail, that a mail is never skipped because the model is unsure or cannot confirm that it is safe, and why that is acceptable: the notes hold counts and never message text, and the value scan runs before the write. Main and the other sub-agents are unchanged (stage 27 main snapshot equals stage 26). Rollback: the version saved before prompt 20 (name starts with v22), the version v23 or the stage 26 snapshot of style-profiler.

## Block 0: main edit

None.

## Block 1: style-profiler text (Instructions of the sub-agent, edited by hand in its dialog, one replacement)

Replacement 1, at the end of the BUILD step 3 paragraph before item a. Replace this text:

```
Finish all of the following for one round before you start the next round.
```

with this text:

```
The reasons in item a are the only reasons to skip a mail. Never skip a mail because you are unsure or cannot confirm that it is safe: keep it, because the notes hold counts and never message text. Finish all of the following for one round before you start the next round.
```

After the edit, check that the sub-agent still has 22 paragraphs, save, reload the page and read the hash back with the snapshot method. It must equal the hash of the stage 27 snapshot of style-profiler.

Tools of style-profiler: unchanged (five tools).
