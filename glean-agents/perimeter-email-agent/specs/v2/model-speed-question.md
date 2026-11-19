# Question for Glean support: best model for a faster Outlook action board

Date: 2026-11-18. Agent: Outlook Action Board V2 (draft, Auto mode). Send this text to Glean support. Nothing is sent by the team without you.

## The question

Which model setting do you recommend for this agent so that a run is faster and the result stays as accurate as today?

## What the agent does

It reads about 40 Outlook conversations (unread inbox, read inbox, sent items of the last 14 days), reads the full body of up to 15 of them, sorts every conversation into Must Do Today, Waiting on Your Response, Waiting on Others or Review Quickly, and shows an interactive board in the chat. It uses sub-agents and skills with scripts, and it calls Outlook, Excel and calendar tools.

## What we measured (same mailbox, same form, chat only)

- Run time: 81 s to 116 s per run, mostly 100 s.
- Cost: 2.1 to 3.2 credits per run.
- The model today is the default model picked by Glean for this agent ("GPT-5.6 Luna" in the run traces).
- The same input gives a different number of cards from run to run (11 to 19 cards, the real mailbox holds about 19 actionable conversations).

## What a better model must keep

- All 6 reference conversations must appear on the board in every run: Audit evidence, Quick ask: confirm headcount, Deck for the steering call, Training plan sign-off, Vendor onboarding checklist, Board deck inputs.
- The tool calls and the skill scripts must keep working (the agent runs Python scripts from skills and reads their output).

## What we ask

1. Which model do you suggest for speed with the same accuracy, and does "Always use the latest default model" need to stay on?
2. Is there a setting that fixes the reasoning effort or the thinking mode for an Auto mode agent, and what is its effect on run time?
3. Do different models change how reliably the agent follows an instruction to run a skill script?

## How we will test the answer

Run the same form on the same mailbox with each model you name, 2 runs each. A model passes when all 6 reference conversations appear in both runs and the run time is shorter. The results go into one table.
