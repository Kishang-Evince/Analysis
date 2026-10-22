# Prompt 24: style-profiler applies the rule.ignore_sent_from date in the list pass (spike run 5, 2026-10-22)

Context: SHOW worked (30 seconds, nine plain lines and the ASK line) and EDIT worked ("Saved: 1 row changed." after the approval card, which showed only the changed row). The EDIT added the rule row rule.ignore_sent_from with the date 2026-10-15, the day the agent started to write drafts, so mails the user sent from a draft of the agent stay out of the style. Item a of step 3 applies that date only after a mail body has been read, and the list pass of step 2 stops after 5 times TARGET listed mails, so with a recent date the newest mails would use up the listing and nothing older would be read. Fixed: step 2 skips every mail sent on or after the date, and those mails do not count toward the 5 times TARGET. Main and the other sub-agents are unchanged (stage 24 main snapshot equals stage 23). Rollback: the version saved before prompt 20 (name starts with v22), the version v23 or the stage 23 snapshot of style-profiler.

## Block 0: main edit

None.

## Block 1: style-profiler text (Instructions of the sub-agent, edited by hand in its dialog, one replacement)

Replacement 1, in BUILD step 2. Replace this text:

```
(a missing or unknown label is never a reason to skip), and count each mail once, under the first reason that applied.
```

with this text:

```
(a missing or unknown label is never a reason to skip), or that was sent on or after the date in the rule row rule.ignore_sent_from (such mails do not count toward the 5 times TARGET), and count each mail once, under the first reason that applied.
```

After the edit, check that the sub-agent still has 22 paragraphs, save, reload the page and read the hash back with the snapshot method. It must equal the hash of the stage 24 snapshot of style-profiler.

Tools of style-profiler: unchanged (five tools).
