# Design: run-form inputs for Outlook Action Board V2 (V2 stage 1)

Date: 2026-11-05. Status: draft for approval. Path: architectural (changes how settings reach the agent and edits the main instructions).
Agent: "Outlook Action Board V2", a draft clone. The published agent is not touched. Restore point: version "Initial Draft".

## 1. Goal

Let each user set their own options on the agent's run form and run the agent without editing it. This answers the client call of 2026-11-04 (configuration on the start screen, drafts on or off, section choice, delivery in Glean).

Success: with every input at its default, V2 writes the same board and brief as the published agent. With inputs changed, the run follows them.

## 2. Scope

In: the 11 trigger inputs, the Settings block, Step 8E, Step 10, and a V2-only copy of the board-layout skill named board-layout-v2.
Out: sub-agents (no change needed), the schedule, the tools, the published agent, closing items, the Glean side panel view, model speed.

## 3. Decisions to approve

| # | Decision | Recommendation |
|---|---|---|
| D1 | DELIVERY options | Two options: "chat and email" (default) and "chat only". The planned "both" would behave exactly like "email", so drop it. The field in the builder is renamed to match. |
| D2 | Required toggle | Leave Required on for ten inputs (each has a default that is pre-selected) and off for AS_OF_DATE. |
| D3 | Conversation starters | They are hidden once the trigger is Input fields. If a test shows they are lost, fall back to Plan B in section 9. |
| D4 | How the edits are applied | Main text through Builder Assistant with a per-line check against `stage-1.md` (it once dropped a space in an unrelated line). The skill copy is uploaded for V2 only. |
| D5 | Test runs | Two full board runs, about 13 minutes and 10 credits each. Each needs your yes first. |

## 4. Inputs (already created in V2, defaults set)

| Input | Type | Options | Default | Used in |
|---|---|---|---|---|
| MODE | Multiple choice | auto, morning, end-of-day, weekly | auto | Settings, Steps 8E, 8F, 9, 10 |
| LOOKBACK_DAYS | Multiple choice | 3, 7, 14, 21, 30 | 14 | Step 1 queries |
| READ_DAYS | Multiple choice | 1, 3, 7 | 3 | Step 1 read-mail cutoff |
| INCLUDE_CALENDAR | Multiple choice | yes, no | yes | Steps 3E, 8F |
| AS_OF_DATE | Date | any date | blank | Settings "Today" |
| CREATE_DRAFTS | Multiple choice | yes, no | yes | Step 8E |
| DELIVERY | Multiple choice | chat and email, chat only | chat and email | Step 10 |
| SHOW_WAITING_ON_YOU | Multiple choice | yes, no | yes | Step 9, skill board-layout-v2 |
| SHOW_WAITING_ON_OTHERS | Multiple choice | yes, no | yes | Step 9, skill board-layout-v2 |
| SHOW_REVIEW_QUICKLY | Multiple choice | yes, no | yes | Step 9, skill board-layout-v2 |
| SHOW_COMMITMENTS | Multiple choice | yes, no | yes | Step 9, skill board-layout-v2 |

Descriptions are already filled in. The DELIVERY field still has the options email, chat only, both and needs the D1 change.

## 5. Edits

The full predicted main text is `stage-1.md` (built from `../stage-40.md`, the last stage of the published agent). The skill text is `stage-1-board-layout-skill.md`, named board-layout-v2.

1. **Settings block.** The sentence about a chat message overriding settings is replaced by "The run form sets these settings. A blank value uses the default in brackets." Each setting line becomes `NAME: [[NAME]] (default)`. New lines for CREATE_DRAFTS, DELIVERY and the four SHOW_ settings. AS_OF_DATE accepts any date format. The MODE, weekly and invalid-value rules stay.
2. **Step 8E.** "Skip this step when MODE is weekly" becomes "Skip this step when MODE is weekly or CREATE_DRAFTS is no". "When MODE is end-of-day, select only items the brief shows" becomes "When MODE is end-of-day or a SHOW_ setting is no, select only items the brief shows", so no draft is made for an item the user cannot see.
3. **Step 10.** It starts with "When DELIVERY is chat only, skip this step. Otherwise call the sub-agent brief-builder". The rest is unchanged.
4. **Skill board-layout-v2 (V2 copy).** One new paragraph: a SHOW_ setting of no leaves that section out in the chat and in the brief, the summary line is computed as if all sections were shown, Section 1 and Meeting prep do not depend on these settings, weekly ignores them.

## 6. Sub-agents and skill

- brief-builder: no change. It builds only from the sections in the board, and empty sections are already left out.
- draft-writer and style-profiler: no change. Main does not call them when CREATE_DRAFTS is no.
- notes-keeper and meeting-prep: no change.
- board-layout: a skill link applies to every agent that links it. Editing the shared skill would change the published agent, so V2 gets its own uploaded copy under a new name, board-layout-v2, so a same-name upload cannot replace the shared skill. Step 9 and the Settings line then name board-layout-v2, and the old link is removed from V2.

## 7. Instruction budget

Main text grows by 523 characters (30,101 to 30,624). V2 shows 1,036 characters left, so about 513 remain. The SHOW_ rules live in the skill, which costs nothing from the budget.

## 8. Apply order

1. Create a version named "Before instruction edits".
2. Fix DELIVERY options (D1).
3. Apply the three main edits through Builder Assistant, then read the live text back and compare every line with `stage-1.md`. Repair any difference by hand.
4. Upload `stage-1-board-layout-skill.md` as a skill for V2 only, link it, remove the old link.
5. Check the character counter, that no em dash or semicolon exists, and that the published agent is unchanged.
6. Create a version "Inputs wired".

## 9. Tests and fallback

Static: counter, per-line match with `stage-1.md`, published agent unchanged, no em dash or semicolon.

Run tests (Preview, nothing published). T1 also proves delivery: with DELIVERY at its default the brief must arrive.

| Test | Inputs | Expected |
|---|---|---|
| T1 defaults | all defaults | Same board structure and brief as the published agent for the same mailbox. |
| T2 everything changed | MODE morning, LOOKBACK_DAYS 7, READ_DAYS 1, INCLUDE_CALENDAR no, CREATE_DRAFTS no, four SHOW_ no, DELIVERY chat only, AS_OF_DATE set | Chat shows Must Do Today only. No meeting prep. No draft-writer call and Drafts folder unchanged. Sent Items unchanged. Query dates are 7 days before AS_OF_DATE. |

T2 also proves that the `[[NAME]]` references reach the agent. If they do not, stop and report before any other edit.

Plan B if the starters are lost or the references fail: keep the Chat message trigger, put the same settings back in the Settings block as text lines, and let the user change them by chat message. No per-user form, but no loss of starters.

## 10. Unknowns that the tests settle

Settled by T1 and T2 (section 12):

- Capital letter `[[NAME]]` references work in Auto mode. The agent receives the run form values as a `<user_inputs>` block of `<field_value name="NAME">value</field_value>` elements and followed them (T2 used MODE morning, 7 days, AS_OF_DATE).
- The Date input passes `2026-11-04` (ISO, year first). The form shows "November 04, 2026". The settings line "in any date format" is safe and the old "(YYYY-MM-DD)" is also what arrives.

Still open (the tests cannot settle them):

- How a scheduled run treats required inputs, and whether each user can save their own values for the schedule (the docs describe this for Workflow mode, not Auto mode).
- Whether the conversation starters survive.

## 11. Rollback

Restore version "Initial Draft", or delete V2. Nothing else depends on V2.

## 12. Test results

### T1: Preview run, every input at its default (2026-11-05)

Run form had all ten defaults selected and AS_OF_DATE blank, Debug on. The run took 745 s (12.4 minutes) and 2.18 credits, not the 10 credits estimated.

- **Inputs received: pass.** The debug view lists "10 answers" (CREATE_DRAFTS yes, DELIVERY chat and email, INCLUDE_CALENDAR yes, LOOKBACK_DAYS 14, MODE auto, READ_DAYS 3, the four SHOW_ settings yes). The first LLM call receives them as a `<user_inputs>` block of `<field_value name="NAME" label="NAME">value</field_value>` elements, AS_OF_DATE as an empty element.
- **Capital letter references: no failure seen.** The run used MODE auto correctly (a run after 12:00, so end-of-day, "as of Nov 5, 2026") and the 14 day window, and no `[[` appears in the chat or the brief. Because the defaults equal the old built-in values, T2 is the real proof that the form values drive the run.
- **Board layout: pass.** VIP and topics line above the title, title "Outlook Action Board: End-of-day, as of Nov 5, 2026", Must Do Today (1 card) and Waiting on Others (1 card) in the card layout of the skill, empty sections left out, summary line "Inbound: 78 emails excluded (0 already replied to, 78 noise). Outbound: 15 sent emails excluded (informational, no ask)." The outbound card shows "Draft ready in Outlook". The inbound card says "Draft generation failed". It was not compared with a published-agent board for the same mailbox (that is another 13 minute run), only with the layout of the skill.
- **Brief email: arrived.** Outlook shows "Daily brief: end-of-day, Nov 5, 2026" at 2:53 PM with the heading "Outlook Action Board End-of-day brief, Nov 5, 2026".
- **Finding: false "Brief not delivered."** The chat ended with the note "Brief not delivered." although the mail was sent. In the trace the brief-builder run called Send email (3 s), then its next LLM call hung for 600 s and ended in "Error executing this step", so main received no answer starting with SENT. The sub-agent text was not changed by V2 and earlier runs of it alone took 65 to 94 s, so this looks like a platform stall, but one run cannot confirm that. Watch for it in T2 (DELIVERY chat only skips the step).
- **Unknowns still open:** date format of the Date input (T2 sets it), scheduled runs with required inputs, whether the conversation starters survive.

Result: pass for wiring and layout, one open finding (false "Brief not delivered.").

### T2: Preview run, everything changed (2026-11-05)

Form: MODE morning, LOOKBACK_DAYS 7, READ_DAYS 1, INCLUDE_CALENDAR no, CREATE_DRAFTS no, the four SHOW_ settings no, DELIVERY chat only, AS_OF_DATE November 4, 2026. The run took 59 s and 0.77 credits.

- **Inputs received: pass.** The debug view lists "11 answers" with AS_OF_DATE `2026-11-04` and every other value as set.
- **Query dates: pass.** The inbox query used `received_date_time_ge` 2026-10-28T00:00:00+05:30, seven days before AS_OF_DATE. The board is titled "Morning, as of Nov 4, 2026".
- **Only Must Do Today: pass.** The chat shows the VIP and topics line, the title, one Must Do Today card (Alice Morgan) and the summary line. No Waiting on Your Response, Waiting on Others, Review Quickly, Commitments or Meeting prep. The Oct 22 sent ask is outside the 7 day window, so its absence is expected.
- **No drafts, no mail: pass.** The trace has no draft-writer, style-profiler, meeting-prep or brief-builder run and no Send email or draft step. DELIVERY chat only skipped Step 10 and there is no "Brief not delivered." note.
- **Summary line: fail.** The line reads "Inbound: 0 emails excluded (0 already replied to, 0 noise). Outbound: 0 sent emails excluded". The inbox query returned 50 seeded mails in that window (many automatic replies and undeliverable notices) and T1 counted 78 noise and 15 sent excluded over 14 days, so the real counts are well above zero. The skill paragraph says the summary line is computed as if all sections were shown, and the run did not follow it. It is not known whether the published agent prints real counts for the same settings, because this was not run. Suggested fix to try: put the sentence "Compute the Inbound and Outbound counts from the full classification, never from the sections shown." into Step 9 of V2, then run T2 again.
- **Side effect note:** the trace shows one "Personal Knowledge Vault Store" call. It is Glean's own tool-learning memory (predicate `assistantMemory:mcpServerLearning`), not agent logic.

Result: pass for every input and setting, one fail (summary line counts with all sections hidden).

### T2 rerun after the Step 9 counting sentence (2026-11-05)

Added at the end of the Step 9 "Counting:" paragraph through the Builder Assistant: "A SHOW_ setting of no hides a section but never changes X, Y, Z or W: count from the full classification as if every section were shown." The live main text then equals `stage-2.md` (hash cad46e85, length 30460). The Builder Assistant edit again wiped all ten dropdown defaults, so it is the cause (it also happened after the first edit). They were set again by hand before the run.

Same form as T2. The run took 44 s and 0.59 credits, with 11 answers as before.

- **Summary line: changed but still wrong.** It now reads "Inbound: 13 emails excluded (0 already replied to, 9 noise). Outbound: 0 sent emails excluded". The numbers do not add up (13 is not 0 plus 9) and are far below the 50 seeded mails the inbox query returns for that window.
- **Must Do Today card: lost.** The first T2 showed the Alice Morgan card. This run shows no card, no "Inbox is clear." line and nothing but the title and the summary line. Section 1 must never depend on the SHOW_ settings, so this is a new failure.
- **Run shape:** the trace shows three List messages, three Get email message calls and notes-keeper, then the answer. It did not do the reply matching that T1 did.
- **Reading:** the sentence did not fix the counts and the board is unstable with all four sections hidden, so the two T2 runs differ for the same form. One more run of the same form would show how much is random variation.

Result: not fixed. Options: revert the sentence (restore the version "Inputs wired" and set the defaults again), or keep it and run the same form again to measure the variation.

### Decision on the Step 9 counting sentence (2026-11-05)

Reverted. The sentence did not fix the summary line and the board lost its Must Do card on the rerun, so keeping it only added a confound and used 137 of the 498 free characters. V2 was restored to the version "Inputs wiredInputs wired" through version history (Replace, no new version saved). After the restore the live text equals `stage-1.md` (hash 8f7e71cd, length 30323), the counter reads 498 left, only board-layout-v2 is linked, and all ten dropdown defaults and the Required switches came back with the restore, so a restore does not wipe them. `stage-2.md` stays in the folder as the record of the reverted experiment.

Still open from T2: with all four SHOW_ settings no, the summary line counts were wrong (0, then 13 that did not add up) and the second run lost the Must Do card. A baseline T2 on the reverted text would show how much is random variation. It was not run.
