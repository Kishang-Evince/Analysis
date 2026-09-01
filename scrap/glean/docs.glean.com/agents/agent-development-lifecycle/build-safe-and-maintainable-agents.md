---
url: "https://docs.glean.com/agents/agent-development-lifecycle/build-safe-and-maintainable-agents"
canonical: "https://docs.glean.com/agents/agent-development-lifecycle/build-safe-and-maintainable-agents"
title: "Build safe and maintainable agents"
description: "Scope agents narrowly, design safe write behavior, and keep workflows testable and easy for others to own."
fetched_at: "2026-09-01T13:29:15.825Z"
---
On this page

After you have defined your problem and quality bar, your goal is to build an agent that is easy to test, safe to operate, and straightforward for others to maintain.

## Start small and focused[​](#start-small-and-focused "Direct link to Start small and focused")

The most successful agents start with the narrowest possible version of a workflow. A small, well-scoped agent is easier to validate and faster for users to trust.

-   Solve one high-value scenario first: Do not try to build an *all-in-one* assistant immediately.
-   Limit tools and branches: Minimize the number of external calls and decision points.
-   Use explicit steps: Where predictability is critical, use structured steps rather than relying entirely on open-ended reasoning.

## Design for safe *write behavior*[​](#design-for-safe-write-behavior "Direct link to design-for-safe-write-behavior")

Tools that modify data like updating a CRM or sending an email require much stronger safeguards than *read-only* workflows.

Before adding a write tool, you must be able to answer:

-   Preconditions: What must be true before this tool runs?
-   Review: How does the user confirm the tool? The agent should propose; the user should approve.
-   Failure: What happens if the tool fails halfway through?
-   Rollback: How would we undo the result if needed?

For interactive workflows, follow the Glean model: The agent proposes the work, and the user reviews it before the tool executes.

## Align agent design with admin controls[​](#align-agent-design-with-admin-controls "Direct link to Align agent design with admin controls")

Ensuring safe agent behavior requires a combination of robust prompt engineering, sound workflow logic, and strict administrative controls. Admin controls govern who can execute specific actions and how those actions run.

When designing an agent, always review the administrative controls applied to the tools and actions within that specific workflow. For higher-risk workflows, apply the principle of least privilege and use the most restrictive configuration that still supports the business use case.

### Critical design questions[​](#critical-design-questions "Direct link to Critical design questions")

Evaluate your agent design against the following security and access questions:

-   Access control: Which actions must be restricted to specific users, roles, or groups?
-   Risk management: Does this workflow involve high-risk actions that require stricter guardrails?
-   User confirmation: Should this write action require explicit user confirmation before execution?
-   Impact radius: Is the current action configuration properly aligned with the intended audience and potential impact?

### Implementation best practices[​](#implementation-best-practices "Direct link to Implementation best practices")

Admin controls are critical when an agent writes to external systems, processes sensitive data, or scales beyond a small test environment. Implement the following guardrails before deployment:

-   Restrict sensitive actions: Limit access to actions that can modify records, alter configurations, or send external communications to authorized user groups only.
-   Enforce human-in-the-loop: Require explicit user confirmation for write actions by default, unless there is a verified, low-risk reason to automate them completely.
-   Audit configurations: Review all action settings, authentication mechanisms, and access boundaries prior to a broader organizational rollout.
-   Document prerequisites: Detail all required administrative configurations in your build notes so that builders, reviewers, and admins can validate the security setup before launch.

## Respect data boundaries[​](#respect-data-boundaries "Direct link to Respect data boundaries")

While Glean Agents inherently respect the permissions of the invoking user, you must still build with least privilege in mind.

-   Scoped sources: Prefer specific connectors over broad, company-wide access.
-   Graceful declines: Design the agent to handle *Permission Denied* errors clearly, rather than failing silently.
-   Clear documentation: Explicitly state which permissions a user needs to get the most out of the agent.

## Build for maintainability[​](#build-for-maintainability "Direct link to Build for maintainability")

The logic of an agent must be understandable to someone other than the original builder. If the design is too opaque, it becomes difficult to update.

-   Clear naming: Use descriptive names for the agent, its tools, and its instructions.
-   Modularize: If an agent becomes too complex, break major responsibilities into smaller, discrete steps or specialized sub-agents.
-   Change logs: Keep a lightweight record of meaningful changes to instructions or connectors so others can follow the evolution of the agent.

## Document dependencies[​](#document-dependencies "Direct link to Document dependencies")

Make it clear exactly what the agent needs to function. Your build notes must specify:

-   Read/Write systems: Which apps the agent interacts with, for example, Jira, Slack, Salesforce.
-   Tools: Which specific Glean tools are required.
-   Fallback behavior: What the agent should do if a specific system is offline or unreachable.

### Example: The *Renewal-Risk* Agent[​](#example-the-renewal-risk-agent "Direct link to example-the-renewal-risk-agent")

Instead of building a fully autonomous renewal assistant, follow an incremental path:

-   Version 1 (Read-Only): The agent reads account notes and support tickets, then generates a risk recommendation for the user to read.
-   Version 2 (Interactive Write): Once V1 is reliable, add a tool where the agent *drafts* a renewal plan and asks the user: *"Would you like me to save this draft to the CRM?"*
