---
url: "https://docs.glean.com/agents/agent-development-lifecycle/govern-monitor-and-maintain-agents"
canonical: "https://docs.glean.com/agents/agent-development-lifecycle/govern-monitor-and-maintain-agents"
title: "Govern, monitor, and maintain agents"
description: "Apply governance that matches risk, monitor usage and quality, and keep ownership clear as your agents and organization change."
fetched_at: "2026-09-01T13:29:16.006Z"
---
On this page

A successful agent is not just launched; it is managed. Ongoing governance and monitoring ensure that your agents continue to provide value safely as your data, workflows, and team structure change.

## Scale governance to match risk[​](#scale-governance-to-match-risk "Direct link to Scale governance to match risk")

Governance must apply a level of process that matches the potential impact of the agent.

| Risk Level | Characteristics | Suggested Controls |
| --- | --- | --- |
| Low | Read-only, limited audience, non-sensitive data. | Individual ownership; informal testing. |
| Medium | Shared with teams, internal data, moderate impact. | Peer review; documented connectors. |
| High | Sensitive data, department-wide, or high-risk workflows. | Formal design review; strict *Write* safeguards. |
| Critical | Regulated data or high-consequence automation. | Continuous monitoring; executive/IT oversight. |

## Monitor for adoption and trust[​](#monitor-for-adoption-and-trust "Direct link to Monitor for adoption and trust")

Data-driven monitoring helps you understand if your agent is actually solving the problem it was designed for. Track these key areas:

-   Adoption: Weekly active users (WAU) and total runs per week.
-   Trust: The ratio of positive to negative user feedback.
-   Health: Technical error rates and *permission denied* occurrences.
-   Accuracy: Periodic *spot checks* of outputs against your Golden Test Set.

A steady decline in usage often signals that the connectors of the agent are outdated or the workflow has shifted.

To review these trends in practice, use your agent analytics surfaces to monitor usage, feedback, and performance over time. Analytics can help you identify which agents are being adopted, where trust is improving or declining, and which workflows may need updates, tighter guardrails, or deprecation.

If you are responsible for shared or business-critical agents, review analytics regularly as part of your maintenance process.

## Establish clear ownership[​](#establish-clear-ownership "Direct link to Establish clear ownership")

Every shared agent must have a *human-in-the-loop* responsible for its upkeep. This is especially important for enterprise-wide tools.

Define the following for every shared agent:

-   Primary owner: Who is responsible for updates and bug fixes?
-   Succession plan: Who takes over if the original builder changes roles?
-   Feedback loop: How do users report hallucinations or errors?
-   Documentation: Are the build notes clear enough for a new owner to understand the logic?

## Put guardrails in the right places[​](#put-guardrails-in-the-right-places "Direct link to Put guardrails in the right places")

Effective governance translates into a few practical operational questions:

-   Publishing rights: Who is authorized to publish an agent to the Company Library?
-   Data access: Are we using the most restricted connectors possible for this task?
-   Write safeguards: Which tools *always* require a manual *Confirm* click from the user?

## Know when to deprecate[​](#know-when-to-deprecate "Direct link to Know when to deprecate")

Part of healthy maintenance is knowing when to retire an agent. Removing low-value or outdated agents keeps your Agent Library trustworthy.

Consider deprecation if:

-   The agent solves a problem that no longer exists.
-   Adoption has dropped below a useful threshold.
-   A newer, more capable agent has replaced it.
-   The underlying connectors are no longer maintained.

### Example: Maintaining a *CRM Write-Agent*[​](#example-maintaining-a-crm-write-agent "Direct link to example-maintaining-a-crm-write-agent")

For a high-impact agent that updates customer records, governance must include:

1.  Quarterly reviews: Verify that the *Write* logic still aligns with company CRM policies.
2.  Audit logs: Regularly monitor who is using the agent and what changes are being made.
3.  Rollback readiness: Ensure the owner knows exactly how to revert to a previous version if a CRM API update breaks the logic of the agent.
