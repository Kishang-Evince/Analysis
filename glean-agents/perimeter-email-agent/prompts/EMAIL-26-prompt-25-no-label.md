# Prompt 25: style-profiler no longer uses the sensitivity label (spike run 6, 2026-10-22)

Context: run 4 (stage 22 text) read 28 usable mails. Two runs later (stage 24 text, rule date moved to today) the same mailbox gave NOT ENOUGH MAIL (0 usable) with "Skipped: automated subject: 64, unknown sensitivity label: 65, password or passcode: 17". The model counted 65 mails as skipped for an unknown label although the text says a missing or unknown label is never a reason to skip. The mail tools return no usable label (the trace showed the list and read calls with include_sensitivity_label true, and the model still called the label unknown), so the clause only gives the model a reason to skip everything when it feels unsure. Fixed: the label is removed from the text. The calls no longer ask for it and no rule mentions it. The guards that stay are the text based ones: subject prefixes, mails to oneself, secrets, medical, legal, HR and salary matters, personal data of a third person, confidential or privileged markers in the text, other languages and the rule date. Limit to state in the docs: a mail that carries a sensitivity label but no marker in its text and no sensitive topic is read for style only, and no sentence of it is saved. Main and the other sub-agents are unchanged (stage 25 main snapshot equals stage 24). Rollback: the version saved before prompt 20 (name starts with v22), the version v23 or the stage 24 snapshot of style-profiler.

## Block 0: main edit

None.

## Block 1: style-profiler text (Instructions of the sub-agent, edited by hand in its dialog, four replacements)

Replacement 1, in BUILD step 2. Replace this text:

```
Call List messages with folder sentitems, include_sensitivity_label true, sent_date_time_gt
```

with this text:

```
Call List messages with folder sentitems, sent_date_time_gt
```

Replacement 2, in BUILD step 2. Replace this text:

```
"sentDateTime"] only (sensitivity is not a select field), and page with
```

with this text:

```
"sentDateTime"] only, and page with
```

Replacement 3, in BUILD step 2. Replace this text:

```
or whose sensitivity label names a class listed in item a (a missing or unknown label is never a reason to skip), or that was sent on or after
```

with this text:

```
or that was sent on or after
```

Replacement 4, in item a of BUILD step 3. Replace this text:

```
when the sensitivity label returned for it names confidential, highly confidential, restricted, secret, privileged or personal data (a mail with no label, or with another label, is not skipped for that), when it carries a confidential or privileged marker, when
```

with this text:

```
when it carries a confidential or privileged marker in its text, when
```

After the edit, check that the sub-agent still has 22 paragraphs, save, reload the page and read the hash back with the snapshot method. It must equal the hash of the stage 25 snapshot of style-profiler.

Tools of style-profiler: unchanged (five tools).
