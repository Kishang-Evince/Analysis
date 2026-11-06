# Live Glean link in the emailed brief: spike result (2026-11-06)

Question: can the agent put a link in the brief email that opens the live, interactive board in Glean?

## What was tried (V2 draft, Preview chat after a normal run, read only)
1. The agent was asked to print sandbox environment names and ids, the tool_sdk names and help for open_file_in_canvas. It declined: it will not expose environment variables, sandbox metadata or raw runtime internals. Not pushed further.
2. The agent was asked to reopen /home/user/output/action-board.html with open_file_in_canvas and report the return value. The tool returned only the text "File action-board.html opened in canvas." The agent confirmed there is no artifact id, version id, link or URL in it.

## Findings
- The agent cannot learn the URL of the artifact or of the run it is in. A link to the exact live board of a run cannot be built from inside the run.
- A scheduled run (08:00 weekdays on the Triggers tab) has no chat to open anyway.
- A link to the agent itself works: https://app.glean.com/chat/agents/AGENT_ID (with the ?qe=https%3A%2F%2Fperimeterhealthcare-be.glean.com suffix the pane uses) opens the run page with the form and a Run agent button. Verified for the V2 draft id 9953ac0a90ab49c9b72298bfd3b89815. The published agent has its own id.
- That run page shows the form with its defaults. With DELIVERY chat and email, clicking Run agent sends another brief. Pre-filling inputs through the URL is not documented (a web search found nothing for Glean) and was not tried.
- The Set schedule dialog sits on the same form and shows Starts on, time zone and frequency under the inputs, with the note that delivery can take up to an hour. It looks like a schedule takes the input values chosen in that form. Not changed or saved.
- Outlook on the web opens in the in-app browser now (the user fixed access), the brief mail renders with no buttons and the Dana Whitfield card shows "New reply since ignored."

## Options
A. Email button "Open the live board in Glean" pointing at the agent. The reader clicks it, sets DELIVERY to chat only, clicks Run agent and gets the interactive board in about 1.5 to 2 minutes. Cheapest, honest about the extra click.
B. A with the form default DELIVERY changed to chat only, so a manual run from the link does not email again. The schedule then has to carry DELIVERY chat and email. Needs a check of how the schedule stores its inputs before it is changed.
C. Try URL pre-filling guesses first. Low odds, not documented.

## Where the work lands for A or B
- brief-render skill (template and script, tests first): one email safe button, https only.
- brief-builder instructions: pass the link in.
- Main text Step 10: no change if the link is a constant inside brief-builder. The constant is the agent id, so it must be set to the right agent when V2 is published.
