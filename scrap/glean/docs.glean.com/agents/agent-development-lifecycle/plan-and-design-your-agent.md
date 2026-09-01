---
url: "https://docs.glean.com/agents/agent-development-lifecycle/plan-and-design-your-agent"
canonical: "https://docs.glean.com/agents/agent-development-lifecycle/plan-and-design-your-agent"
title: "Plan and design your agent"
description: "Define the business problem, scope, behaviors, and success criteria before you build in Agent Builder."
fetched_at: "2026-09-01T13:29:15.992Z"
---
On this page

Before opening Agent Builder, you must define the problem your agent will solve, identify its users, and establish how you will measure success.

Doing the design work upfront makes your agent easier to test, more trustworthy for users, and simpler to maintain. The goal is to ensure you are implementing a plan, not discovering one.

## Start with the business problem[​](#start-with-the-business-problem "Direct link to Start with the business problem")

Always begin with the workflow, not the technology. Document the current process to identify exactly where an agent can add value.

*Ask yourself:*

-   What is the current manual process?
-   Who performs this work today?
-   Where is the process slow, repetitive, or prone to error?
-   What specific outcome should the agent improve?

Example of a strong problem statement: *Support managers need a faster way to summarize escalations across Jira tickets, Slack threads, and recent incidents before their weekly leadership review.*

## Decide if an agent is the right solution[​](#decide-if-an-agent-is-the-right-solution "Direct link to Decide if an agent is the right solution")

Not every problem requires a custom agent. Before building, verify that an agent is the most efficient tool for the job and choose the right Glean solution type.

| Use an Agent if... | Use Search or Assistant if... |
| --- | --- |
| The task requires multi-step reasoning. | The task is *find this one specific document.* |
| It involves orchestrating tools across multiple tools. | You need a quick answer from indexed company data. |
| You need structured, repeatable outputs (reports/forms). | The query is a one-off, *ad-hoc* question. |
| It requires specific automation or scheduled triggers. | The user just needs a summary of a single thread. |

## Define scope and boundaries[​](#define-scope-and-boundaries "Direct link to Define scope and boundaries")

A clear design brief prevents scope creep and ensures the agent remains reliable. Define your boundaries early:

-   In-scope: The specific tasks the agent must perform reliably.
-   Out-of-scope: Tasks the agent must not attempt to prevent hallucinations or unsafe tools.
-   Target users: The specific group this agent is designed to help.
-   Invocation model: How the agent starts, for example, on-demand by a user, on a schedule, or triggered by an event.

## Specify key behaviors[​](#specify-key-behaviors "Direct link to Specify key behaviors")

Instead of vague prompting, define how the agent must react in concrete scenarios. Use this pattern to map out your logic:

*The behavior pattern:*

-   When a user asks \[X\] in context \[Y\]...
-   The agent should do \[Z\]...
-   And return the result in format \[A\].

Mapping these behaviors early makes it much easier to create your evaluation (Eval) sets during the testing phase.

## Map inputs, outputs, and dependencies[​](#map-inputs-outputs-and-dependencies "Direct link to Map inputs, outputs, and dependencies")

List everything the agent needs to function and the constraints it must follow.

-   Inputs: Required user information or optional context the agent can infer.
-   Connectors: The specific Glean-indexed apps or sets the agent depends on.
-   Tools: Any external systems the agent will *write* to or call.
-   Constraints: High-stakes rules, for example, *Always include citations*, or *Never update a record without human confirmation*.

## Set success criteria[​](#set-success-criteria "Direct link to Set success criteria")

Define what *good* looks like before you start the build. This allows you to measure the impactof the agent post-launch.

-   Accuracy: The agent answers the top 10 most common use cases correctly.
-   Efficiency: The agent reduces manual triage time by 30%.
-   Format: The agent consistently produces the specific JSON or Markdown report required.

### Example: Customer escalation agent[​](#example-customer-escalation-agent "Direct link to Example: Customer escalation agent")

-   In-scope: Summarize the latest context from Jira, Slack, and Zendesk.
-   Out-of-scope: Making customer-facing commitments or automatically changing ticket priority.
-   Primary output: A three-paragraph executive summary with recommended next steps.
-   Success criteria: Saves managers 2 hours per week and achieves a 90% accuracy rate in *summary sentiment* reviews.
