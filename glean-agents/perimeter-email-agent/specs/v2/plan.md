# V2 Run-Form Inputs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the 11 run-form inputs of Outlook Action Board V2 drive the agent, and prove it in two test runs.

**Architecture:** The 11 inputs already exist in the V2 trigger. This plan edits the main instructions (Settings block, Step 8E, Step 9 name, Step 10), uploads a V2-only skill copy named board-layout-v2, then checks the live text against `stage-1.md` and runs two Preview tests. A small hash helper in test-mailer makes the line-by-line check repeatable.

**Tech Stack:** Glean Agent Builder driven in the browser pane (tab-3, agent 9953ac0a90ab49c9b72298bfd3b89815), Node 22 helpers in `glean-agents/perimeter-email-agent/test-mailer`.

**Spec:** `specs/v2/inputs-design.md`. Predicted texts: `specs/v2/stage-1.md` (main) and `specs/v2/stage-1-board-layout-skill.md` (skill, named board-layout-v2).

## Global Constraints

- Never press Publish. The published agent "Outlook Action Board" is never edited.
- Edit V2 only. Before any step in the builder, resize the tab to 1400x900 and reload (a narrow pane loses edits).
- Never use an em dash or a semicolon in any text written to the agent, a skill or a doc.
- The live main text must equal `stage-1.md` after the edits. Budget: 523 characters added, 1,036 left before, about 513 after.
- DELIVERY options are exactly "chat and email" (default) and "chat only".
- Required is on for ten inputs and off for AS_OF_DATE. Every multiple choice input keeps its default.
- A full board run (about 13 minutes, 10 credits, reads the real mailbox, creates drafts, may send mail) needs a separate yes from the user each time. Never retry a refused run.
- Create a named version before each risky stage: "Before instruction edits" and "Inputs wired".
- Builder Assistant has dropped a space in an unrelated line before. Never trust its summary, always compare hashes.

## Review Focus

1. A `[[NAME]]` reference that does not resolve, or resolves in a different case, so the agent reads the literal text. Pinned by Task 6 (the debug view shows the values main received, and no `[[` appears in the board).
2. AS_OF_DATE arrives in a format the date rules cannot read. Pinned by Task 7 (query dates are 7 days before the chosen date).
3. A same-name skill upload replaces the shared board-layout used by the published agent. Pinned by Task 4 (the skill is named board-layout-v2 and the published agent's skill list is unchanged).
4. Builder Assistant changes an unrelated line. Pinned by Task 3 (full-text hash and per-line comparison).
5. A hidden section still counts as noise in the summary line, or a draft is made for an item the user cannot see. Pinned by Task 7 (summary counts equal Task 6, Drafts folder unchanged).

---

### Task 1: Line hash helper

**Files:**
- Create: `glean-agents/perimeter-email-agent/test-mailer/line-hashes.mjs`
- Test: `glean-agents/perimeter-email-agent/test-mailer/line-hashes.test.mjs`

**Interfaces:**
- Consumes: `editorText(text: string): string` and `specHash(text: string): string` from `spec-hash.mjs`.
- Produces: `lineHashes(text: string): string[]` (one 8 hex hash per line of `editorText`, in order) and `changedLines(expected: string[], live: string[]): number[]` (0-based indexes where the lists differ, including every index past the shorter list). CLI: `node line-hashes.mjs <spec file> <file with live hashes, one per line>` prints `line N: <expected line text>` for each changed index and exits 1 when any exist.

- [ ] **Step 1: Write the failing tests** in `line-hashes.test.mjs` with `node:test`:
  - `lineHashes returns one 8 hex hash per non-blank line`: `lineHashes('a\n\nb')` has length 2 and each entry matches `/^[0-9a-f]{8}$/`.
  - `lineHashes drops list numbers like editorText`: `lineHashes('1. a')` equals `lineHashes('a')`.
  - `changedLines reports the differing index`: `changedLines(['x','y'], ['x','z'])` equals `[1]`.
  - `changedLines reports extra live lines`: `changedLines(['x'], ['x','y'])` equals `[1]`.
- [ ] **Step 2: Run to verify failure.** Run `cd glean-agents/perimeter-email-agent/test-mailer && node --test line-hashes.test.mjs`. Expected: FAIL, cannot find `line-hashes.mjs`.
- [ ] **Step 3: Implement both functions and the CLI** in `line-hashes.mjs` by mapping `editorText(text).split('\n')` through `specHash`, and comparing by index. Mirror the `main(argv, deps)` and `fileURLToPath` entry pattern of `spec-hash.mjs`.
- [ ] **Step 4: Run to verify pass.** Same command. Expected: 4 tests pass.
- [ ] **Step 5: Record the browser snippet** that produces the same list from the live editor, in a comment at the top of `line-hashes.mjs`: take the longest `.ProseMirror` element's `innerText`, split on newline, trim, strip the same list-number prefix, drop blanks, SHA-256 each line with `crypto.subtle.digest`, keep the first 8 hex characters.

### Task 2: Preflight, checkpoint and DELIVERY options

**Files:**
- Modify (builder): Triggers tab of V2, field DELIVERY.

**Interfaces:**
- Consumes: `node spec-hash.mjs <file>` output `<hash> <length>`.
- Produces: V2 with baseline confirmed, a version "Before instruction edits", DELIVERY options "chat and email" and "chat only" with default "chat and email".

- [ ] **Step 1: Confirm the baseline.** Run `node spec-hash.mjs ../specs/stage-40.md`. In the V2 builder compute the same hash of the live main text (Task 1 snippet, whole-text form). Expected: equal. If not equal, stop and report: the edits were written against `stage-40.md`.
- [ ] **Step 2: Create the version** "Before instruction edits" (version history button, Create version, name field only, Save). Expected: the name appears in the history list and "Version created" shows.
- [ ] **Step 3: Rename DELIVERY options.** Edit option "email" to "chat and email", delete option "both" with its × button, then set the default to "chat and email" from the "Select default" dropdown. Reload the page and read the field back. Expected: two options, default "chat and email".
- [ ] **Step 4: Check the published agent is untouched.** Open it read-only in a second tab and compare its main text hash with `stage-40.md`. Expected: equal.

### Task 3: Main instruction edits

**Files:**
- Modify (builder): Instructions of V2.
- Compare against: `specs/v2/stage-1.md`.

**Interfaces:**
- Consumes: the version from Task 2.
- Produces: live main text equal to `stage-1.md`.

- [ ] **Step 1: Send one Builder Assistant request** that lists the four edits with exact before and after text copied from `inputs-design.md` section 5 (Settings block, Step 8E two sentences, Step 9 skill name board-layout-v2, Step 10 opening), and ends with "Change only these lines. Do not touch tools, skills, sub-agents, triggers or any other text." Approve its confirmation card.
- [ ] **Step 2: Compare the whole text.** Run `node spec-hash.mjs ../specs/v2/stage-1.md` and the browser whole-text hash. Expected: equal hash and equal length.
- [ ] **Step 3: If they differ,** compute the live per-line hashes with the Task 1 snippet, save them one per line to `/tmp/live-hashes.txt`, run `node line-hashes.mjs ../specs/v2/stage-1.md /tmp/live-hashes.txt`, and repair each reported line by hand in the editor (select the line, retype it exactly). Repeat Step 2. Expected: equal.
- [ ] **Step 4: Check the counter.** Reload the builder and read the character counter. Expected: about 513 left (at least 500).

### Task 4: Skill board-layout-v2

**Files:**
- Upload (builder): `specs/v2/stage-1-board-layout-skill.md`.

**Interfaces:**
- Consumes: Step 9 of the main text now says "read the skill board-layout-v2".
- Produces: skill board-layout-v2 linked to V2 only, the old link removed from V2.

- [ ] **Step 1: Upload the skill** from V2's Skills panel (plus, Upload a skill). Chooser cannot be driven, so set the file on the modal's single `input[type=file]` from a `DataTransfer` built from the file text, then dispatch `change`. Expected: a skill named board-layout-v2 appears in V2's skill list.
- [ ] **Step 2: Remove the old link from V2** with the trash icon on board-layout. Expected: V2 lists only board-layout-v2.
- [ ] **Step 3: Check the published agent.** Open its Skills panel. Expected: board-layout still linked, no board-layout-v2.
- [ ] **Step 4: Open the skill in V2** and confirm the new paragraph "Section settings:" is present and the file has no em dash or semicolon.

### Task 5: Static checks and checkpoint

- [ ] **Step 1: Check the text.** In the live main text: no em dash, no semicolon, `[[` appears exactly 11 times (one per input). Expected: all true.
- [ ] **Step 2: Check the triggers.** Read back the 11 inputs: defaults as in `inputs-design.md` section 4, Required off only for AS_OF_DATE.
- [ ] **Step 3: Create the version** "Inputs wired".

### Task 6: Test run T1, all defaults (needs the user's yes)

- [ ] **Step 1: Ask the user** for a yes to one full run, naming the cost (about 13 minutes, 10 credits).
- [ ] **Step 2: Run** from the Preview form with every input at its default. Wait for the final message.
- [ ] **Step 3: Check.** Expected: the board has the same sections and card layout as a published-agent board for the same mailbox, no `[[` anywhere, the brief arrives with the heading "Morning brief" or "End-of-day brief" for the time of day, and the debug view shows the input values main received.
- [ ] **Step 4: Write the result** (pass or fail with the evidence) into `inputs-design.md` section 12. If the references did not resolve, stop and report before Task 7.

### Task 7: Test run T2, everything changed (needs the user's yes)

- [ ] **Step 1: Ask the user** for a yes to one full run, naming the cost.
- [ ] **Step 2: Run** with MODE morning, LOOKBACK_DAYS 7, READ_DAYS 1, INCLUDE_CALENDAR no, CREATE_DRAFTS no, the four SHOW_ settings no, DELIVERY chat only, AS_OF_DATE a date inside the seeded mail window.
- [ ] **Step 3: Check.** Expected: only Must Do Today in the chat, no Meeting prep, no draft-writer call in the debug view, Drafts folder and Sent Items unchanged, query dates 7 days before AS_OF_DATE, summary line counts equal Task 6 for the shared mail.
- [ ] **Step 4: Write the result** into `inputs-design.md` section 12 and create the version "Tested".

### Task 8: Close

- [ ] **Step 1: Answer the open unknowns** in `inputs-design.md` section 10 with what the runs showed (case of `[[NAME]]`, date format passed, starters, scheduled runs not tested).
- [ ] **Step 2: Report** to the user: results, what stays untested, how to roll back (restore "Initial Draft" or delete V2).
