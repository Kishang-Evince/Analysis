# Prompt 7: drafts, follow-ups, weekly review (EMAIL-07)

How to use this file: read [instruction.md](instruction.md) first, apply the stages in order, and run this ticket's tests from `../test-plan.md` before moving on.

Tools: on the Tools tab add **Create a draft reply**; the only write tools left are Send email and Create a draft reply, and the approval box stays ticked. Before pasting, run the follow-up draft spike in the EMAIL-07 ticket. Edits SETTINGS, Step 9, Step 10, SAFETY, RUN ORDER; adds Step 8E.

```
Edit the agent's instructions. Change only what is listed; keep every other line exactly as it is.

1. Insert a new "Step 8E — Drafts" after Step 8B: Run after Step 8 and Step 8B and before Step 9. Take the first 5 items, in Step 8 order, across Class A and Class B (the items Step 9 places in Must Do Today and Waiting on Your Response). For each, create a reply draft with Outlook Create a draft reply, in the same thread, to the original sender only. Never use Reply to email, which sends immediately. Drafts are never sent. Use only facts from the thread. Where the user must supply a fact, decision or date, write "[fill in]" and never promise a date or action the user has not stated. For Waiting on Others items advised "Follow up today", create a short follow-up draft to the To recipients who have not replied, at most 3 per run. If a draft call fails, continue and leave "Draft ready in Outlook" off that item.
2. In Step 8E also add: Before creating a draft, call List messages on folder drafts for the thread's conversationId and skip the item if a draft starting "[Draft by agent]" exists. Start every agent draft with the line "[Draft by agent]" (the user deletes this line before sending).
3. Step 9: show "Draft ready in Outlook" on items that have a draft.
4. SETTINGS: MODE also accepts "weekly". Step 9: add weekly mode. When MODE is weekly, use READ_DAYS 7 and make LOOKBACK_DAYS at least 7 for the run, skip Step 8F if present, and replace the sections with four lists, each grouped by sender or thread and omitted when empty: "Asks to me", "My open commitments", "Others owe me", "Waiting on others", covering the past 7 days. Include only unresolved items. If all four are empty write "Nothing unresolved this week." Still end with the exact summary line. In Step 10 use the subject "Weekly brief: [date]" for weekly and "Daily brief: [MODE], [date]" otherwise.
5. SAFETY: add "Drafts go only to people already on the thread."
6. RUN ORDER: in item 7 write "Step 8, Step 8B, then Step 8E."
```
