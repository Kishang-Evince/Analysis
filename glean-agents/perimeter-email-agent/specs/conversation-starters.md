# Conversation starters for the 27 enhancements

Added to the draft agent on 2026-10-19 (not published). Each starter is a Label and a Prompt on the Triggers tab. The agent allows at most 10 starters, so the 27 enhancements are grouped by theme into 10. Starters do not use the Instructions character budget. Every board run emails the brief and may create drafts, so each starter that runs the board does the same.

Words in `[[double brackets]]` become fill-in boxes: the user types a value before the starter runs.

| Sr | Label | Prompt | Enhancements covered |
|---|---|---|---|
| 1 | Show my action board | Show my Outlook action board for today. | E05, E06, E14 (the default run: one card per conversation with the first ask and the latest update, and the morning brief) |
| 2 | Review as of a date or look back | Show my Outlook action board with AS_OF_DATE=[[as_of_date]] and LOOKBACK_DAYS=[[lookback_days]] | E13 (plus the as-of-date override that existed before) |
| 3 | End of day or weekly review | Set MODE to [[mode]] (end-of-day or weekly) and show my action board. | E15, E16 |
| 4 | My commitments | Show my action board with the commitments I made, what others owe me, and each one's status (Open, Pending, Waiting, Completed). | E02, E03, E04 |
| 5 | Asks and action types | Show my action board, including indirect asks and every ask in emails that have more than one, with the action type on each card (Reply, Review, Approve, Send, Decide, Complete, Attend). | E07, E08, E09 |
| 6 | Due dates | Show my action board with the due date of every ask. Turn relative dates like "tomorrow" into real dates and check deadlines like "before our client call" against my calendar. | E10, E11, E12 |
| 7 | Waiting on others | Show my action board. Keep requests I only acknowledged, promised later or answered in part. Ignore automatic replies and out-of-office mails. Show who replied and who is still waiting, with follow-up advice. | E01, E17, E18, E19, E20, E21, E22 |
| 8 | Drafts in my voice | Show my action board and draft follow-ups for my overdue requests and replies for my top items, in my own writing style. | E23, E24, E25 |
| 9 | Meetings | Show my action board with prep for today's and tomorrow's meetings. | E27 |
| 10 | VIPs and topics | Show my saved VIP and topic lists. If I have no VIP email addresses saved, ask me for them. | E26 |

All 27 enhancements are covered: 3 + 1 + 2 + 3 + 3 + 3 + 7 + 3 + 1 + 1.

## Checks done

- Reloaded the agent after saving: all 10 starters, labels and prompts are stored as typed, and the three fill-in boxes (`as_of_date`, `lookback_days`, `mode`) are kept.
- The Add button is disabled at 10, so the cap holds.
- Preview, starter 3: the chip loads the prompt and asks for the `mode` value before "Run agent".
- Preview, starter 10: the agent answered "no saved VIP addresses or topics" and asked for VIP email addresses (nothing saved for the test user).
- Preview, starter 4: the agent ran the whole board (all 4 steps) and sent it to the signed-in user. It ran as an end-of-day board because the run started after 12:00.
- The other starters (1, 2, 5 to 9) were not run: each one runs the same board with a different request, and each run emails a brief and may create drafts.

## VIP and topics on every conversation start (done 2026-10-19)

In a chat, the agent puts a "VIP and topics" line above the board with the user's saved lines. When no VIP is saved it shows the question from notes-keeper ("No VIP email addresses are saved. Which VIP email addresses (people or @domains) should I save?") and a reply with addresses is saved through notes-keeper. The line is not in the emailed brief. The lists are stored per user, so a new user has none and is asked. Edit text and tests: `../prompts/EMAIL-12-prompt-11-vip-at-start.md` and `../test-gaps.md`.
