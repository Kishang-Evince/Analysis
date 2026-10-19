# Instruction document snapshots

After each stage, copy the Instructions tab text of the agent into `stage-N.md` here (`stage-0.md` after Prompt 0, `stage-1.md` after Prompt 1, and so on), then run `npm run check:N` in `../test-mailer/`. Send the file, or the check output, for review.

- Design for the targeted sub-agent rework: `subagent-rework-design.md` (draft, awaiting review). Supersedes the option table in `budget-plan-stages-7-10.md`.
- Implementation plan for that design: `subagent-rework-plan.md` (11 tasks, awaiting review).
- Budget plan for stages 9 and 10: `budget-plan-stages-9-10.md` (33 verified text trims, no commitments sub-agent; replaces `budget-plan-stages-7-10.md` and `trim-proposal-stage6.md` for those stages).
- Sub-agent texts live next to the main snapshot of their stage: `stage-7-draft-writer.md`, `stage-8-draft-writer.md`, `stage-9-notes-keeper.md` and `stage-10-meeting-prep.md`. `npm run check:N` compares both the main text (`stage-N.md`) and every sub-agent text of that stage.
