# Instruction document snapshots

After each stage, copy the Instructions tab text of the agent into `stage-N.md` here (`stage-0.md` after Prompt 0, `stage-1.md` after Prompt 1, and so on), then run `npm run check:N` in `../test-mailer/`. Send the file, or the check output, for review.

- Design for the targeted sub-agent rework: `subagent-rework-design.md` (draft, awaiting review). Supersedes the option table in `budget-plan-stages-7-10.md`.
- Implementation plan for that design: `subagent-rework-plan.md` (11 tasks, awaiting review).
- Conversation starters (10, grouped from the 27 enhancements): `conversation-starters.md`.
- VIP lists at conversation start (prompt 11, 2026-10-19): main text `stage-11.md` (hash a23636e7) and sub-agent text `stage-11-notes-keeper.md` (277f8a00); edit text in `../prompts/EMAIL-12-prompt-11-vip-at-start.md`; `npm run check:11` in `../test-mailer/`.
- Personal memory for VIP lists and writing style (design, spike results and Plan B, 2026-10-21): `personal-memory-design.md`.
- Punctuation rule and fixed board layout (prompts 12 and 13): main text `stage-12.md` and `stage-13.md` (live before the Excel store, hash 4ee40d78), sub-agent texts `stage-12-draft-writer.md`, `stage-12-meeting-prep.md`, `stage-12-notes-keeper.md`, skill text `stage-13-board-layout-skill.md`.
- VIP, topic and writing style entries in an Excel cell in the user's OneDrive (prompt 14, 2026-10-21): main text `stage-14.md` (hash 2504db26), sub-agent texts `stage-14-notes-keeper.md` (8107c7fe) and `stage-14-draft-writer.md` (226e4f96, meeting-prep is unchanged from `stage-12-meeting-prep.md`); edit text in `../prompts/EMAIL-15-prompt-14-excel-store.md`; `npm run check:14` in `../test-mailer/`.
- Three labelled rows instead of one cell (prompt 15, 2026-10-21): main text `stage-15.md` (hash 6416d48b), sub-agent texts `stage-15-notes-keeper.md` (2e785e9f) and `stage-15-draft-writer.md` (2860aa0f); edit text in `../prompts/EMAIL-16-prompt-15-excel-rows.md`; `npm run check:15` in `../test-mailer/`.
- Row labels VIP Contacts, VIP Topics and Writing Styles (prompt 16, 2026-10-21): main text `stage-16.md` (unchanged, hash 6416d48b), sub-agent texts `stage-16-notes-keeper.md` (165fb0e4) and `stage-16-draft-writer.md` (0d0483e2); edit text in `../prompts/EMAIL-17-prompt-16-row-labels.md`; `npm run check:16` in `../test-mailer/`.
- Highlights label bold in the emailed brief (prompt 17, 2026-10-21): main text `stage-17.md` (hash 67603dec, sub-agents unchanged from stage 16); edit text in `../prompts/EMAIL-18-prompt-17-brief-bold.md`; `npm run check:17` in `../test-mailer/`.
- draft-writer rules for the marker line, existing drafts and the "Re:" subject (prompt 18, 2026-10-21): main text `stage-18.md` (unchanged, hash 67603dec), sub-agent text `stage-18-draft-writer.md` (62f00c09); edit text in `../prompts/EMAIL-19-prompt-18-draft-rules.md`; `npm run check:18` in `../test-mailer/`.
- Budget plan for stages 9 and 10: `budget-plan-stages-9-10.md` (33 verified text trims, no commitments sub-agent; replaces `budget-plan-stages-7-10.md` and `trim-proposal-stage6.md` for those stages).
- Sub-agent texts live next to the main snapshot of their stage: `stage-7-draft-writer.md`, `stage-8-draft-writer.md`, `stage-9-notes-keeper.md` and `stage-10-meeting-prep.md`. `npm run check:N` compares both the main text (`stage-N.md`) and every sub-agent text of that stage.
