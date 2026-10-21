# Prompt 17: Highlights label as bold in the emailed brief (user report 2026-10-21)

Context: in the emailed end-of-day brief the line "**Highlights:** ..." showed literal asterisks, while every other bold label rendered. Step 10 says "bold text to <strong>" but the model skipped the Highlights label. Fix: name it in the rule. Sub-agents and the skill are unchanged. Rollback: the version saved before this change (name starts with v19) and the stage 16 main snapshot.

## Block 0: main edit (made by hand in the Instructions editor)

```
Edit the Instructions of the agent. Change only what is listed and keep every other line exactly as it is.

1. In Step 10 replace the words "bold text to <strong>, and any board table" with the words "bold text to <strong> (every pair of asterisks, including the Highlights label, so no asterisk stays in the body), and any board table".
```
