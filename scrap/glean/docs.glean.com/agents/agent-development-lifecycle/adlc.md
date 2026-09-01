---
url: "https://docs.glean.com/agents/agent-development-lifecycle/adlc"
canonical: "https://docs.glean.com/agents/agent-development-lifecycle/adlc"
title: "Agent development lifecycle (ADLC)"
description: "A framework for moving Glean Agents from experimentation to production with governance, safety, and ownership."
fetched_at: "2026-09-01T13:29:15.798Z"
---
On this page

Agents require a more deliberate development lifecycle than traditional software. As they produce non-deterministic outputs, interact with live enterprise data, and execute multi-step reasoning, a structured approach ensures they remain safe, accurate, and valuable.

## Why adopt the ADLC[​](#why-adopt-the-adlc "Direct link to Why adopt the ADLC")

The ADLC is a practical framework designed to help teams move from *experimentation* to *production* with confidence. Use this lifecycle to:

-   Solve the right problems: Start with clear business needs rather than vague automation ideas.
-   Define *success* early: Establish what good behavior looks like before you start building.
-   Ensure safety: Validate permissions, data boundaries, and *write* tools before a broad rollout.
-   Operationalize ownership: Ensure every agent has a clear maintainer and a path for long-term improvement.

## Matching process to risk[​](#matching-process-to-risk "Direct link to Matching process to risk")

Not every agent requires the same amount of effort. The level of process must scale with the impact and data access of the agent.

| Agent Type | Scope | Suggested Process |
| --- | --- | --- |
| Personal | Individual productivity | Lightweight: Basic testing and narrow scoping. |
| Team utility | Internal team workflows | Moderate: Basic design docs and peer review. |
| Enterprise | Department or Company-wide | Comprehensive: Rigorous testing, formal review, and launch planning. |

Apply a more robust process when the agent:

-   Will be shared with a broad audience.
-   Accesses sensitive or restricted data.
-   Performs *write tools*, for example, updating Jira tickets, sending emails.
-   Affects a high-value or high-risk business workflow.

## Core principles[​](#core-principles "Direct link to Core principles")

The ADLC is built on five foundational pillars:

1.  Value first: Every agent must solve a defined business problem tied to a measurable outcome.
2.  Governed innovation: Encourage experimentation, but require a more thorough review as distribution expands.
3.  Least privilege: Agents must always operate within the existing access boundaries of the user invoking them.
4.  Safety by design: Build guardrails and rollback plans into the agent from the start, especially for automated tools.
5.  Continuous improvement: Post-launch monitoring is essential to adapt to changing data and user feedback.

## The 6 stages of ADLC[​](#the-6-stages-of-adlc "Direct link to The 6 stages of ADLC")

The lifecycle consists of six fluid stages. Treat these as a practical guide for your development, not a series of rigid *stop-and-go* gates.

1.  Plan & design: Define the specific problem, target users, and intended scope.
2.  Define quality: Determine how you will measure success, for example, *The agent must correctly cite sources 100% of the time*.
3.  Build safely: Implement the workflow with clear boundaries, system prompts, and safeguards.
4.  Test & launch: Validate reliability and permissions. Ensure users have documentation on how to interact with the agent.
5.  Manage versions: Use drafts and versioning to update the agent without interrupting live workflows.
6.  Govern & monitor: Track adoption and accuracy. Review ownership regularly to ensure the agent remains relevant.

## Example scenarios[​](#example-scenarios "Direct link to Example scenarios")

-   *Lightweight process:* An agent that summarizes a user's own unread Slack messages for a daily recap.
    -   *Focus:* Personal utility and basic accuracy.
-   *Comprehensive process:* A *Support Triage Agent* that reads customer tickets and drafts responses in a public-facing CRM.
    -   *Focus:* Deep design review, multi-stage quality testing, and strict *Human-in-the-loop* safeguards.

Use ADLC as a helpful framework. The goal is to apply the right level of review to ensure your agent is an asset to your team.
