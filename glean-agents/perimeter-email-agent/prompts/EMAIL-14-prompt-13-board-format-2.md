# Prompt 13: fixed board layout in a skill (user request 2026-10-21)

Context: two formatter sub-agent attempts (2026-10-19 and 2026-10-21) kept the emailed brief in the fixed layout but the chat reply was not reliably the formatter's answer: Glean sub-agents return results to the parent, which always writes the final reply (docs: "The parent agent uses the returned results to ... prepare the final response"), so chat rendering cannot move into a sub-agent. This attempt moves the whole layout into the skill `board-layout` (0 characters of the main text); main reads it and writes the board itself in chat and in the brief. Rollback: version `v15-before-formatter-2` (main 27c9df45); remove the skill from the agent.

## Block 0: main edit (made by hand in the Instructions editor)

```
Edit the Instructions of the agent in Step 9. Change only what is listed and keep every other line exactly as it is.

1. Replace the paragraph that starts "Organize the output into clearly labeled sections." (it ends "even if the board is clear.") with this paragraph:
Before writing anything for this step, read the skill board-layout, then write the board exactly in its layout, in the chat reply and in the brief, never in another layout. In a chat, write the "VIP and topics" line (the saved lines and any ASK line, even if the board is clear) above the title, and never put it in the brief.
2. Delete the lines from "For inbound items (Sections 1, 2, 4), show:" up to, not including, the line that starts "Show the primary ask on the card".
3. Delete the lines from "For outbound items (Section 3), show:" up to, not including, the line that starts "For Sections 1–4, use one card per conversationId."
4. Delete the lines from "After all sections:" up to, not including, the line that starts "Counting:".
```

## Block 1: the skill file `board-layout.md` (uploaded on the Tools tab, Skills)

```
---
name: board-layout
description: The one fixed layout of the Outlook action board, used for the chat reply and the emailed brief. Read it before writing the board in Step 9 of every run.
---

# Board layout

Write the board in exactly this layout, in the chat reply and in the brief. Never use another layout, never merge cards into a list, never shorten a card. Never use an em dash or a semicolon.

Order of the output:
1. In a chat only: one line "**VIP and topics:** " followed by the saved VIP and TOPIC lines and any ASK question (even when the board is clear). Leave out words such as none or no ASK. Never put this line in the brief.
2. The title line "# Outlook Action Board: Morning, as of TODAY" (Morning, End-of-day or Weekly by MODE).
3. When there are matched items, one line "**Highlights:** " followed by them.
4. The sections, each a "## " heading with exactly this title, in this order, left out when it has no items: 1 "🔴 Must Do Today", 2 "🟡 Waiting on Your Response", 3 "🟠 Waiting on Others", 4 "🔵 Review Quickly", 5 "Commitments", 6 "Meeting prep". Keep the item order of Step 8.
5. Every note line on its own line, directly above the summary line.
6. The last line, always: "Inbound: X emails excluded (Y already replied to, Z noise). Outbound: W sent emails excluded (informational, no ask)."

Inbound card (sections 1, 2 and 4): a bold line "**Sender | Subject**", then these bullet lines in this order: "Ask: ...", "Action: ...", "Why included: ...", "Due: ...", "Confidence: ...", "Ownership: ...", "Original ask: ...", "Latest update: ...", "Messages: n", "More asks: ...", "Also waiting on: names."

Outbound card (section 3): a bold line "**To names | Subject**", then these bullet lines in this order: "What you asked: ...", "Sent: ...", "Staleness: ...", "Days waiting: n", "Follow-up: ...", "Responses: ...".

Print every card line in the order shown and write "not given" when its value is missing. Leave out only the lines More asks, Also waiting on and Responses when they have no value. Responses is one of: "Replied: names. Waiting: names.", "Answered by [name]", "Out of office until DATE", "Out of office (no return date)", "Auto-reply received", "Delivery failed".

Commitments: the bold labels "Mine" and "Others owe me", each a list of bullet lines "who | what | Due: date | Status: status", with " | Overdue" added when flagged.

Meeting prep: write each entry returned by Step 8F unchanged, then one bullet line per unsummarized meeting: "title, time: not summarized".

Weekly runs: no sections 1 to 6. Use instead the headings "## Asks to me", "## My open commitments", "## Others owe me", "## Waiting on others" in that order, each a list of bullet lines "sender or thread | summary | date", left out when empty. When all four are empty write "Nothing unresolved this week."

Empty board: when sections 1 to 5 have no items, write "Inbox is clear." for morning or "All clear for the rest of today." for end-of-day, directly under the title line. A Meeting prep section still follows.
```
