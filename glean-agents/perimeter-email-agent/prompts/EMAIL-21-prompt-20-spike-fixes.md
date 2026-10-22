# Prompt 20: style-profiler fixes from the first Preview spike (2026-10-22)

Context: the first consented BUILD run in Preview (up to 20 mails) answered NOT ENOUGH MAIL (0 usable). The trace showed two causes. (a) The mail list call rejected the field sensitivity inside select (error: Invalid select fields: {'sensitivity'}), because the connector has a separate boolean input include_sensitivity_label and the page token input is named page_token. The agent then treated an unknown sensitivity as a reason to skip every mail. (b) The answer gave no reason, so the cause could not be seen. Fixed: select no longer names sensitivity and the call sets include_sensitivity_label true, a mail is skipped for its label only when the returned label names a confidential class, and a NOT ENOUGH MAIL answer adds one Skipped line with a count per reason. Main and the other sub-agents are unchanged (stage 20 main snapshot equals stage 19). Rollback: the version saved after the sub-agent was created (name starts with v22) or the stage 19 snapshot of style-profiler. The version saved after prompts 20 to 23 starts with v23.

## Block 0: main edit

None.

## Block 1: style-profiler text (Instructions of the sub-agent, edited by hand in its dialog, three replacements)

Each replacement ends in the middle of a paragraph, because a replacement that ends at the end of a list item merges two items.

Replacement 1, in BUILD step 3. Replace this text:

```
"ccRecipients", "importance", "sensitivity", "body"]. The signed-in user is
```

with this text:

```
"ccRecipients", "importance", "body"] and include_sensitivity_label true (sensitivity is not a select field). The signed-in user is
```

Replacement 2, in item a of BUILD step 3. Replace this text:

```
when its sensitivity is not normal, when it carries
```

with this text:

```
when the sensitivity label returned for it names confidential, highly confidential, restricted, secret, privileged or personal data (a mail with no label, or with another label, is not skipped for that), when it carries
```

Replacement 3, in the Answers paragraph. Replace this text:

```
"NOT ENOUGH MAIL (n usable)" (when fewer than 5 usable mails remain, write nothing),
```

with this text:

```
"NOT ENOUGH MAIL (n usable)" followed by one line "Skipped: " and a count for each skip reason that applied, in plain words (when fewer than 5 usable mails remain, write nothing to the workbook),
```

After the edit, save, reload the page and read the hash back with the snapshot method. It must equal the hash of the stage 20 snapshot of style-profiler.

Tools of style-profiler: unchanged (five tools).
