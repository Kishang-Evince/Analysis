**Glean Tier 3 Advanced Evaluation**
**Human-in-the-Loop Design — Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `docs.glean.com/tools/human-in-the-loop-experience-for-tools` and `docs.glean.com/agents/agent-development-lifecycle/build-safe-and-maintainable-agents`. Field definition: "Handoff efficiency, pausing, and operator approval checkpoints." Base file at [`../Human-in-the-Loop Design.md`](../Human-in-the-Loop%20Design.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-5 below map 1:1 to the same Sr No in the companion test guide [test/V2/Human-in-the-Loop Design.md](../../../../test/Glean/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Human-in-the-Loop%20Design.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The base research's HITL behavior matrix is reconfirmed directly and precisely, with one genuinely new, subtle detail: the admin-level tool-eligibility toggle for **newly added tools defaults to "Run without confirmation = Yes"** — but this default only controls whether an agent *builder* is permitted to disable the confirmation step for that tool, not whether the confirmation pause itself is on or off by default for end users (which remains on by default per-step, unless a builder explicitly opts out). This two-layer distinction is worth stating precisely rather than collapsing into a single "opt-out" bullet.

## Claims (Sr No 1-5, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Write confirmation is confirmed directly to apply only in interactive Glean web app sessions, explicitly leaving Slack and Microsoft Teams unchanged | [docs.glean.com/tools/human-in-the-loop-experience-for-tools](https://docs.glean.com/tools/human-in-the-loop-experience-for-tools) | Verbatim: the feature *"applies by default to write tools in Agents that run in the Glean web app"* and *"is available only in interactive web app sessions"* — critically, it *"leaves Slack and Microsoft Teams behavior unchanged."* This directly reconfirms the base research's most consequential finding for Stratos's tenant stack, which is heavily Teams-based. |
| 2 | The two-phase pause-then-editable-preview flow and grouped batch review are confirmed directly, matching prior research | [docs.glean.com/tools/human-in-the-loop-experience-for-tools](https://docs.glean.com/tools/human-in-the-loop-experience-for-tools) | Confirmed: a pause shows *"the target app and planned action with allow/deny options,"* followed by an editable preview where *"users can review and update fields or content before the change is saved."* Multiple write tools are consolidated into a *"grouped review"* supporting individual audit, selective approval, bulk execution, or skip. |
| 3 | **New, subtle finding worth precise framing**: the admin-level tool-eligibility default for newly added tools is "Run without confirmation = Yes" — but this controls builder *permission* to disable the pause, not the pause's actual default-on state for end users, which remains separate and still on by default per step | [docs.glean.com/tools/human-in-the-loop-experience-for-tools](https://docs.glean.com/tools/human-in-the-loop-experience-for-tools) | Verbatim: *"Admins manage baseline tool eligibility through admin settings, where new tools default to 'Run without confirmation = Yes,' though agent builders must separately opt in at the step level."* Read carefully, this is a two-layer control: the admin toggle sets whether builders are *allowed* to skip confirmation for a given tool (defaulting to allowed for new tools) — but each individual agent step's actual confirmation pause remains a separate, per-step builder choice, and claim 1's "applies by default" language means the pause is still the default end-user experience unless a builder has explicitly disabled it for that step. This nuance should not be collapsed into "confirmation is off by default" — it isn't; only the *permission to turn it off* defaults open. |
| 4 | The core design philosophy is confirmed directly with a strong, quotable principle: explicit confirmation is the default stance for any write action, with automation-without-confirmation requiring a verified, low-risk justification | [docs.glean.com/agents/agent-development-lifecycle/build-safe-and-maintainable-agents](https://docs.glean.com/agents/agent-development-lifecycle/build-safe-and-maintainable-agents) | Verbatim: *"Require explicit user confirmation for write actions by default, unless there is a verified, low-risk reason to automate them completely."* And: *"The agent proposes the work, and the user reviews it before the tool executes."* |
| 5 | **Needs a different source**: this specific "build safe agents" page does not itself name a "Wait for user input" step by that specific term — this claim should be re-sourced from the schedule-triggers documentation (already in the base research's source list) rather than assumed confirmed by this page | Absence-check against [docs.glean.com/agents/agent-development-lifecycle/build-safe-and-maintainable-agents](https://docs.glean.com/agents/agent-development-lifecycle/build-safe-and-maintainable-agents) | This page discusses the general human-review philosophy (claim 4) but does not use the specific "Wait for user input" step name. The base research's claim about this specific step type remains plausible (it's likely documented on the Flow/schedule-triggers pages instead) but should be checked against that source directly rather than this one. |

## Independent read

- Claim 1 remains this field's single most consequential finding for Stratos specifically — a Teams-heavy tenant gets no HITL safety net at all for agent write actions performed through that surface, which is a real, material risk difference from the web app experience.
- Claim 3's precise two-layer framing matters because it would be easy to misread the "Run without confirmation = Yes" default as "confirmation is off by default" — that's not what the source says. The correct, careful reading is that admins default to *permitting* builders to disable confirmation for new tools, while the confirmation itself remains the default active behavior at the step level until a builder deliberately turns it off. Getting this backward would materially misstate the platform's actual default safety posture.
- Claim 4's quotable design principle is useful for any client conversation about Glean's approach to agentic risk — it directly states the vendor's own default-safe philosophy, in Glean's own words.

## Confidence

**Doc-Verified** for claims 1, 2, 3, 4 (direct fresh fetches, verbatim quotes, with claim 3 given careful interpretive framing). **Absence-check, needs re-sourcing** for claim 5. Validation date 2026-09-09. Tenant/hands-on verification (an actual Teams-surface write test, an actual admin tool-eligibility toggle check) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Web-app-only confirmation, Teams/Slack unchanged | Reconfirmed — the field's most consequential finding | 1 |
| Pause + editable preview + grouped review | Reconfirmed | 2 |
| Admin tool-eligibility default | **New, precise framing**: controls builder permission, not the pause's own default-on state | 3 |
| Core "confirm by default" design principle | Confirmed, strong quotable language | 4 |
| "Wait for user input" step name | Not found on this page — re-source from schedule-triggers docs | 5 |
