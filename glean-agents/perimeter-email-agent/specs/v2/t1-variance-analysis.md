# T1 variance analysis: why one run drops most of the board (2026-11-06)

Same mailbox, same form defaults, five chat only runs.

| Run | Mode shown | Time, credits | Cards | Anchors | Note |
|---|---|---|---|---|---|
| R1 | morning | 96.8 s, 1.68 | 18 | 6 of 6 | full |
| R2 | morning | 57.5 s, 0.81 | 10 | 5 of 6 | partial, trace not kept |
| R3 | morning | 93.2 s, 1.75 | 18 | 6 of 6 | full, one thread split in two cards |
| R4 | end-of-day | not kept | 1 | 1 of 6 | picked end-of-day at 11:49 IST, trace not kept (debug view never loaded) |
| R5 | morning | 44.5 s, 0.74 | 1 | 1 of 6 | trace kept, below |

## R5 trace (the short run)
Order of the main agent:
1. Read the help of the list messages tool (shell).
2. Retrieve saved memory (personal knowledge vault).
3. One shell command that makes three List messages calls: unread inbox 33 messages (43 KB), sent items 24 messages (33 KB), read inbox 6 messages (8.5 KB). The results are saved to files in the sandbox.
4. **One shell step that prints two of the saved files with cat, 49 KB, described as "Reviewing recent email results".** The three results are never parsed one by one.
5. Read the three skills, then run the ignore filter script (it worked, nothing hidden, 3 files).
6. **One Get email message call** for a single message (the full runs make about 15).
7. notes-keeper, calendar, then render. The render summary says cards 1: Security training evidence in Must Do Today.
8. Open the board in the canvas. Final sentence: "One direct request needs your attention: send Alice proof of completed security training."

What it should have done (main text steps): classify every unread inbox message (Steps 3, 3B, 3C, 3D), look at the 24 sent items for waiting on others (Step 4) and read the full body of every candidate. The main text says to run the steps in order and not skip or merge any. The model skipped the per message reading and the sent items analysis.

## What the five runs show
- The data is complete in every run. The three List messages calls return the same 33, 24 and 6 messages.
- The depth of the model's reading is what varies. The full runs loop over every message and read about 15 bodies. The short runs print a large raw dump once and decide from a skim. The cheapest run is the one that dropped the board.
- R4 shows a second failure: the brief mode was end-of-day at 11:49 IST (auto should give morning before 12:00) and its summary line said 33 emails excluded as noise, so every unread message was dismissed at once.
- Section moves and split threads (T1 result) come from the same cause: the classification is done by the model judging free text.

## Options to remove the variance
1. **A triage script, like the ignore filter.** It reads the three saved List messages files and prints one compact table per conversation: id, subject, sender, dates, read state, categories, whether a later sent reply exists in the same conversation, and the sent items still without a reply. The model then reads a table of about 40 lines instead of 85 KB of raw JSON, and Step 3B reads the full body of every listed candidate. It also fixes thread splits, because conversations are grouped by conversationId in code.
2. **A completeness gate.** A short script that compares the number of cards on the board with the number of candidate conversations from the table and refuses to render when candidates are unclassified.
3. **A mode script.** One command that prints the mode (morning or end-of-day) from the clock in the user's time zone, so the model never decides it.
4. Prompt wording changes only (for example "never use cat on the saved results"). Cheapest, but the earlier fixes in this project show that wording alone does not hold, so I do not recommend relying on it.

Recommended: options 1 and 3 first, then option 2 if drops still happen. Each is a skill with a script and unit tests, the same pattern as the ignore filter.
