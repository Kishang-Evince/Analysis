# Prompt 21: style-profiler reads only candidate mails and counts usable mails (spike run 2, 2026-10-22)

Context: the second consented BUILD run (up to 20 mails) answered NOT ENOUGH MAIL (0 usable) and, with the new Skipped line, showed why: the 20 newest sent mails were all "Daily brief:" mails sent to the user, so every one was skipped. Two design faults follow. TARGET counted listed mails, not usable ones, and every body was read before the cheap skip rules ran. The mail list tool has no subject filter (its inputs are folder, is_read, received_date_time_ge, sent_date_time_gt, top, orderby, select and page_token, plus include_sensitivity_label on the email pack), so briefs cannot be left out at the source. Fixed: step 2 becomes a cheap list pass (id, conversation, subject, sender, recipients, time, with the sensitivity label) over up to 5 times TARGET mails, at least 100, that drops briefs, mails to oneself and confidential labels and keeps the candidates, step 3 reads only the candidates with Get email message in rounds of 10, and TARGET is the number of usable mails wanted. Main and the other sub-agents are unchanged (stage 21 main snapshot equals stage 20). Rollback: the version saved before prompt 20 (name starts with v22) or the stage 20 snapshot of style-profiler.

## Block 0: main edit

None.

## Block 1: style-profiler text (Instructions of the sub-agent, edited by hand in its dialog, four replacements)

Replacement 1, in the Input paragraph. Replace this text:

```
TARGET is the number of mails named, at most 200, or 30 when none is named. The default window is the last 12 months. Leave out N means ignore the N newest mails before any skip rule, then read the mails after them.
```

with this text:

```
TARGET is the number of usable mails wanted, as named in the request, at most 200, or 30 when none is named. The default window is the last 12 months. Leave out N means set aside the N newest candidate mails of step 2 before the tallies and before anything is read, then use the candidates after them.
```

Replacement 2, the whole paragraph of BUILD step 2. Replace this text:

```
BUILD, step 2, the tallies. Call List messages with folder sentitems, sent_date_time_gt set to an ISO 8601 timestamp for the start of the window, orderby ["sentDateTime desc"], top 100 and select ["conversationId", "toRecipients", "sentDateTime"] only, and page with the returned next page token in the tool's page-token input (never in the query or filter) until TARGET mails after the leave-out have been listed or no page is left. Keep only two tallies from it: the number of mails per To address, and the number of mails per conversationId in any 3 days. Drop everything else.
```

with this text:

```
BUILD, step 2, the list pass. Call List messages with folder sentitems, include_sensitivity_label true, sent_date_time_gt set to an ISO 8601 timestamp for the start of the window, orderby ["sentDateTime desc"], top 100 and select ["id", "conversationId", "subject", "from", "toRecipients", "sentDateTime"] only (sensitivity is not a select field), and page with the returned token in the page_token input (never in the query or filter) until 5 times TARGET mails, and at least 100, have been listed or no page is left. The signed-in user is the address in the from field of most of these mails. Skip every mail whose subject starts with one of the prefixes of item a of step 3, that was sent only to the signed-in user, or whose sensitivity label names a class listed in item a, and count each skip by reason. The mails left are the candidates, newest first. Set aside the N newest candidates when the request says to leave out N. Keep only the id and sentDateTime of each candidate and, for the candidates, the number of mails per To address and the number of mails per conversationId in any 3 days. Drop everything else, subjects included.
```

Replacement 3, the whole paragraph of BUILD step 3 before item a. Replace this text:

```
BUILD, step 3, one page at a time. Call List messages with the same filters, orderby ["sentDateTime desc"], top 10 and select ["id", "sentDateTime", "subject", "from", "toRecipients", "ccRecipients", "importance", "body"] and include_sensitivity_label true (sensitivity is not a select field). The signed-in user is the address in the from field of most mails. Page with the returned next page token as in step 2 until TARGET mails after the leave-out have been listed, or no page is left. If a List messages call fails after one retry, stop paging and go on with the mails already read, and add the line "Note: stopped early at n mails." to the answer. Finish all of the following for one page before you call the next page.
```

with this text:

```
BUILD, step 3, the candidates. Read the candidates newest first with Get email message, using the id from step 2, in rounds of at most 10 calls at once. Stop when TARGET usable mails are kept or no candidate is left. If a Get email message call fails after one retry, skip that mail and count it as "could not be read". If 3 calls in a row fail, stop, go on with the mails already read and add the line "Note: stopped early at n mails." to the answer. Finish all of the following for one round before you start the next round.
```

Replacement 4, in item e. Replace this text:

```
After each page, update
```

with this text:

```
After each round, update
```

Each replacement is applied by selecting the old text inside its paragraph and inserting the new text. After the four edits, check that the sub-agent still has 22 paragraphs, save, reload the page and read the hash back with the snapshot method. It must equal the hash of the stage 21 snapshot of style-profiler.

Tools of style-profiler: unchanged (five tools).
