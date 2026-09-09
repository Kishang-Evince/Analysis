# 4.9.2 Human-in-the-Loop Design — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Human-in-the-Loop Design.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Human-in-the-Loop%20Design.md). The key finding is a precise, two-layer reading of the admin tool-eligibility default: it controls builder *permission* to skip confirmation, not whether confirmation is on by default for end users (it still is). The Teams/Slack-unchanged gap is reconfirmed as the field's most consequential risk. This guide's job is to test both directly. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Glean web app · Teams-embedded Glean sidebar · Admin Console tool-eligibility settings
**Companion research doc:** [V2/Human-in-the-Loop Design.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Human-in-the-Loop%20Design.md)
**Base field doc (untouched, original):** [../Human-in-the-Loop Design.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/Human-in-the-Loop%20Design.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** Write-capable tools (Google Docs create, Outlook send); admin access; Teams-embedded Glean if available.

**Sr No mapping:** Sr No 1-5 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Human-in-the-Loop Design.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Human-in-the-Loop%20Design.md#claims-sr-no-1-5-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 — Testing the Teams gap and the pause/preview flow — Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Teams/Slack get no HITL confirmation | Run the same write-capable agent from the web app and from Teams; confirm the pause appears only in the web app. | Confirmed. | | This is the field's most important row | ~30 min, Easy |
| 2 | Pause + editable preview + grouped review work as described | Run an agent with 2+ write tools and confirm the grouped review UI. | Confirmed. | | | ~20 min, Easy |

## Section 2 — Testing the two-layer confirmation-default distinction — Sr No 3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Confirmation is on by default at the step level, even though admins default to permitting builders to disable it for new tools | 1. Add a new tool to your tenant (or check a recently-added one) and confirm its admin-level "Run without confirmation" eligibility defaults to Yes.<br>2. Separately, build a fresh agent step using that tool and confirm the confirmation pause still appears to the end user unless you, the builder, explicitly disable it. | You confirm both halves of the two-layer distinction hold as described. | | This directly tests research's precise correction | ~20 min, Easy |

## Section 3 — Confirming the design principle and re-sourcing the Wait-for-input claim — Sr No 4-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | The "confirm by default" design principle is stated in Glean's own docs | Confirm the quote on the build-safe-agents page. | Confirmed. | | | ~5 min, Easy |
| 5 | The "Wait for user input" step name comes from the schedule-triggers/Flow docs, not the safety-design page | Check `docs.glean.com/agents/concepts/schedule-triggers` or the Flow concepts page for this specific step name, and add a Wait-for-user-input step to a real test agent. | Confirmed, and state survives the pause. | | | ~15 min, Easy |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Teams gap + pause/preview flow | 2 | | | | |
| 2. Two-layer confirmation-default distinction | 1 | | | | |
| 3. Design principle + Wait-for-input re-sourced | 2 | | | | |
