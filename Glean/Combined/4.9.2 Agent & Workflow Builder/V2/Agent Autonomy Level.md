**Glean Tier 3 Advanced Evaluation**
**Agent Autonomy Level - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-08 against `docs.glean.com`. Field definition: "Limit of independent decision-making, automated guardrails, and human check-points." Base file at [`../Agent Autonomy Level.md`](../Agent%20Autonomy%20Level.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-15 below map 1:1 to the same Sr No in the companion test guide [test/V2/Agent Autonomy Level.md](../../../../test/Glean/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Agent%20Autonomy%20Level.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Autonomy is **tiered by mode, capped by hard execution limits, and gated by a default-on human confirmation step for write actions.** Not open-ended - every dimension checked has a stated ceiling or an explicit human checkpoint.

## Claims (Sr No 1-15, mapped to test guide)

### Autonomy by mode - Sr No 1-2

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Auto mode plans its own steps and picks its own tools at runtime | [docs.glean.com/agents/auto-mode-agent](https://docs.glean.com/agents/auto-mode-agent) | *"the agentic engine of Glean automatically architectures the logic, selects the necessary tools, and generates a refined draft for you"*; *"Glean uses the tools it needs within those apps at runtime."* |
| 2 | Workflow mode is deterministic - fixed step sequence, no runtime re-planning | [docs.glean.com/agents/auto-mode-agent](https://docs.glean.com/agents/auto-mode-agent) | Auto mode explicitly contrasted against Workflow mode's *"strict determinism"* and manual step control on the same page. |

### Automated guardrails - hard limits - Sr No 3-5

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 3 | Tool-call budget exists but exact number is undisclosed | [docs.glean.com/agents/concepts/limits-and-best-practices](https://docs.glean.com/agents/concepts/limits-and-best-practices) | *"a maximum number of tool calls it can make"* - stated to exist, never quantified on this page. Genuine documentation gap, not a research miss (checked two separate docs, neither discloses the number). |
| 4 | Tool response payload has a size cap, truncates silently | [docs.glean.com/agents/concepts/limits-and-best-practices](https://docs.glean.com/agents/concepts/limits-and-best-practices) | Results can be *"truncated even though the underlying system has more matches"* - cap exists, exact size not published. |
| 5 | Scheduled runs cap at ~30 minutes, terminate without a clear application error | [docs.glean.com/agents/concepts/execution-limits](https://docs.glean.com/agents/concepts/execution-limits) | Only hard number found in this pass: **~30 minutes** end-to-end. On hit: *"Terminated mid-run without a clear application error"* - a real UX gap, not graceful. |

### Human checkpoint - write-action confirmation - Sr No 6-8

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 6 | Write actions pause for user approval by default | [docs.glean.com/security/security-principles](https://docs.glean.com/security/security-principles) | *"Write actions in agents running in the Glean web app pause for user approval before executing. When a write step starts, the user sees a confirmation panel showing the target application and the planned change."* |
| 7 | Confirmation panel supports inline edit before approval | [docs.glean.com/security/security-principles](https://docs.glean.com/security/security-principles) | User can *"review, edit (for actions that support inline editing), and then approve or cancel."* |
| 8 | Admin can opt a specific action out of confirmation, per-action not global | [docs.glean.com/security/security-principles](https://docs.glean.com/security/security-principles) ; [govern-monitor-and-maintain-agents](https://docs.glean.com/agents/agent-development-lifecycle/govern-monitor-and-maintain-agents) | *"Administrators can selectively mark specific actions as **Run without user confirmation** when the action is safe, repeatable, and low-risk. This is an explicit opt-in... not the default."* Governance checklist independently asks builders to define *"Write safeguards: Which tools always require a manual Confirm click"* per agent - confirms per-action, not all-or-nothing. |

### Admin runtime policy layer - Sr No 9-12

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 9 | Pre-execution block on unsafe tool calls | [docs.glean.com/administration/protect/ai-security/agent-access-policies](https://docs.glean.com/administration/protect/ai-security/agent-access-policies) | Policy engine evaluates tool identity + input params before the call runs; can **block** it entirely. |
| 10 | Post-execution filter (removes only flagged items, not whole result) | [agent-access-policies](https://docs.glean.com/administration/protect/ai-security/agent-access-policies) | *"Removes only the items in the payload that trigger the rule"* - filter is narrower than block, applies to tool-output phase only. |
| 11 | Flag-for-review mode (logs, doesn't block) | [agent-access-policies](https://docs.glean.com/administration/protect/ai-security/agent-access-policies) | Third enforcement option: permits execution while logging findings for auditor inspection. |
| 12 | Access policies stack on top of source RBAC, don't replace it | [agent-access-policies](https://docs.glean.com/administration/protect/ai-security/agent-access-policies) | Explicit: *"Agent access policies do not replace existing source permissions or Role-Based Access Control (RBAC)."* Rules use CEL, scoped by user group/agent/tool, up to 20 rules/policy. |

### Unknown / edge-case input handling - Sr No 13

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 13 | No documented retry/clarify/fail-gracefully policy for unexpected input | [docs.glean.com/agents/create-agents/debug-agent](https://docs.glean.com/agents/create-agents/debug-agent) | **Genuine documentation gap.** Debug page covers inspecting failed steps after the fact (*"Only show errors"* filter, span review) but never states the agent's own behavior on unexpected input. |

### Post-deployment governance - Sr No 14-15

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 14 | Monitored on 4 metric categories: adoption, trust, health, plus periodic accuracy checks | [govern-monitor-and-maintain-agents](https://docs.glean.com/agents/agent-development-lifecycle/govern-monitor-and-maintain-agents) | *"Adoption: Weekly active users (WAU) and total runs per week. Trust: The ratio of positive to negative user feedback. Health: Technical error rates and permission denied occurrences."* |
| 15 | No kill-switch - governance is deprecation-based, risk-tiered by criticality | [govern-monitor-and-maintain-agents](https://docs.glean.com/agents/agent-development-lifecycle/govern-monitor-and-maintain-agents) | *"Consider deprecation if: The agent solves a problem that no longer exists. Adoption has dropped below a useful threshold."* No emergency-stop mechanism found. Oversight scales from *"Individual ownership; informal testing"* (low-risk) to *"Continuous monitoring; executive/IT oversight"* (critical). |

---

## Summary

| Dimension | Ceiling / checkpoint | Quantified? | Sr No |
|---|---|---|---|
| Step/tool planning | Auto mode = autonomous; Workflow mode = deterministic, human-authored | Qualitative (mode choice) | 1-2 |
| Tool-call budget per run | Hard cap exists | **Not disclosed** (gap) | 3 |
| Tool response payload size | Hard cap exists, truncates | **Not disclosed** (gap) | 4 |
| Scheduled run duration | ~30 min | Quantified | 5 |
| Write-action approval | Default-on pause-for-approval; admin opt-out per action | Behavioral, not numeric | 6-8 |
| Admin runtime policy | Block / filter / flag-for-review, pre- and post-execution, CEL rules | Up to 20 rules/policy | 9-12 |
| Unknown-input behavior | Not documented | **Undocumented** (gap) | 13 |
| Post-deploy control | Deprecation-based; no kill-switch found | Qualitative | 14-15 |

**Confidence:** Doc-Verified, 6 independent sources, validation date 2026-09-08. No sandbox/tenant access used - everything above is publicly readable without login. Tenant verification of all 15 claims tracked in the companion test guide.
