---
url: "https://docs.glean.com/security/agents/background-agents"
canonical: "https://docs.glean.com/security/agents/background-agents"
title: "Security Best Practices for Scheduled Triggers Agents"
description: "Learn about security best practices to safely run agents in the background"
fetched_at: "2026-09-01T13:29:54.760Z"
---
On this page

Scheduled triggers agents run on a schedule without user manually initiating or approving each execution. In **Workflow mode**, agent creators enable scheduling by selecting **Input form trigger** and the **Allow agent to run on a schedule** checkbox; after publishing, each subscriber activates the schedule from the **Agent library**. In **Auto mode**, creators configure the schedule directly in the **Agent builder** under **Triggers → On a schedule**, and the agent begins running once published. (Refer to the [Schedule triggers](/agents/concepts/schedule-triggers) article to learn more.)

Since schedule triggers fire and execute the agent end‑to‑end with no per‑run confirmation, security control shifts left to governance: who may create and publish agents, how inputs are constrained, and which tools can run without user confirmation. These controls are implemented through Default Member permissions and Agent/Tool roles administered in the Admin Console.

## Roles and responsibilities[​](#roles-and-responsibilities "Direct link to Roles and responsibilities")

[

### Agent Permissions

Refer to the Managing agent access article for more information on Agent Roles and Permissions.







](/administration/managing-agents/agent-access#agent-roles)

## Trusted inputs and least privilege[​](#trusted-inputs-and-least-privilege "Direct link to Trusted inputs and least privilege")

### What the platform enforces[​](#what-the-platform-enforces "Direct link to What the platform enforces")

-   The platform guarantees that agent access is enforced at execution time based on the executor’s identity (the signed‑in user running the agent), regardless of who created or published the agent.

### Agent creator responsibilities[​](#agent-creator-responsibilities "Direct link to Agent creator responsibilities")

-   Prefer greenlisted, organization‑trusted sources first (for example, curated knowledge bases, vetted repositories, and internal sites with established ownership and review). This reduces exposure to unvetted or hostile content.
-   Avoid high‑risk feeds such as the email inbox unless you are confident in your company’s spam and malware filtering posture; inboxes routinely contain unsolicited and potentially dangerous content.
-   Be cautious with web search as an input. If you must use it, constrain to known‑good domains or site greenlists and avoid broad, open‑web retrieval that could surface untrusted instructions or compromised pages.
-   Exclude personal spaces and ad‑hoc shares from background runs unless they are explicitly reviewed and required for the use case; favor content that is public‑to‑org or comes from governed collections.
-   Document the input allowlist inside the agent specification so reviewers and moderators can verify that only trusted sources are in scope for background execution.

### Optional admin safeguards[​](#optional-admin-safeguards "Direct link to Optional admin safeguards")

-   If you are an Admin, use Protect policies to harden source permissions before enabling background runs. This helps ensure permissions are correct at the source and reduces the chance that background agents read overshared or misclassified content.

## Tool safety[​](#tool-safety "Direct link to Tool safety")

### Controls for background writes[​](#controls-for-background-writes "Direct link to Controls for background writes")

-   Admin gate: Admins can explicitly choose which write tools are allowed to run without user confirmation. All other write tools remain interactive (confirmation required) or are blocked from background runs.
-   Moderator gate: With “Can share and publish agents” set to Off for Default Members, Agent Moderators review, publish, and can limit who may subscribe. This serves as the approval checkpoint before any background writes can occur.

### Operational guidance[​](#operational-guidance "Direct link to Operational guidance")

-   **Deny destructive operations**: Disable or keep interactive any high‑impact tools (for example, delete projects, bulk deletes, permission changes, force pushes). Only enable background writes after a deliberate review and a clear rollback path.
-   **Deterministic destinations**: Hard‑code precise targets in the agent configuration to avoid misrouting. Use exact identifiers such as Jira project keys, GitHub repo names, Google Drive folder IDs, Slack channel IDs, Salesforce objects/record types, and the intended environment. Prefer fixed allowlists over dynamically computed destinations. Do not use dynamic destinations such as “all email addresses in the thread”.
-   **Least privilege**: Scope each write tool to the minimum permissions and resources required. Use narrow, per‑tool tokens; avoid global/admin scopes; restrict to specific projects/folders/repos; and remove unused permissions.
-   **Bounded impact**: Cap the blast radius by setting limits (for example, max items changed per run, max concurrency, strict timeouts).
-   **Avoid deep reasoning**: Keep background flows simple and predictable to reduce cost and risk. Reserve complex planning or ambiguous interpretation for interactive agents with a human in the loop.
-   **Restrict custom tools**: Prioritize Product tools that can run without user confirmation as opposed to custom tools which are configured with API KEYs.

## Observability, audit logs, and SIEM export[​](#observability-audit-logs-and-siem-export "Direct link to Observability, audit logs, and SIEM export")

### What you see in product[​](#what-you-see-in-product "Direct link to What you see in product")

-   Agent run history and traces are visible for executions in the **View run history**.
-   Admin Audit Logs record agent subscriptions, workflow runs, workflow traces, and action executions (for example, /api/v1/createagentsubscription, /api/v1/listagentsubscriptions, /api/v1/runagentsubscription, /api/v1/getworkflowtrace, /api/v1/executeactiontool).
-   Customer Event Logs provide a WorkflowRun event that captures each top‑level workflow invocation across Agents and other AI features for analytics.
-   Traces are instrumented with OpenTelemetry and stored in Tempo to help debug multi‑step runs.

### How to export[​](#how-to-export "Direct link to How to export")

-   Audit logs remain in your deployment and can be streamed to third‑party SIEM tools if you choose to export them.
-   Admins can export filtered audit logs to CSV directly from the Admin Console.

### What to alert on[​](#what-to-alert-on "Direct link to What to alert on")

-   Creation, edits, or deletion of agent subscriptions.
-   Unexpected bursts of background writes or unusually high volumes of executeactiontool calls.
-   Workflow runs or trace patterns that deviate from normal behavior.

## Putting it all together[​](#putting-it-all-together "Direct link to Putting it all together")

### Scope and design[​](#scope-and-design "Direct link to Scope and design")

-   Define a tight, specific objective for the background agent; include only admin‑enabled tools and keep inputs to trusted, allowlisted sources.
-   Start in a read‑only mode or with preview/dry‑run outputs; plan to introduce writes later only if necessary and predictable.
-   Document the input allowlist in the agent spec so moderators can verify scope before publishing.

### Build[​](#build "Direct link to Build")

-   Admins enable only the specific tools permitted for autonomous use.
-   Agent Creators wire a Schedule or Content trigger and include a terminal output step appropriate for background runs.
-   Keep retrieval bounded (caps on items/size) and add tests that probe behavior on untrusted or adversarial content (needs to be verified if can be effective).

### Review and publish[​](#review-and-publish "Direct link to Review and publish")

-   Keep “Can share and publish agents” Off for Default Members so Agent Moderators serve as the publish gate.
-   Moderators verify trusted inputs, enabled tools, and trigger choices; then publish or request changes.
-   Note there is no separate approval workflow UI today; moderator gating is the practical approval pattern.

### Subscribe and run[​](#subscribe-and-run "Direct link to Subscribe and run")

-   Limit who can subscribe initially, for example, moderators or a pilot cohort.
-   Subscriptions are required for autonomous execution and remain active across routine edits, for example, updating an input field's description or default value, minimizing disruption.
-   Certain configuration changes automatically deactivate existing subscriptions. In these cases, each subscriber must manually re-activate the agent. These changes include adding or renaming a required input field, changing the trigger type away from **Input form**, removing a user's access, turning off the schedule-enabled setting, or deactivating the agent. See [Schedule triggers - Changes that deactivate subscriptions](/agents/concepts/schedule-triggers#changes-that-deactivate-subscriptions) for the full list.

### Observe and improve[​](#observe-and-improve "Direct link to Observe and improve")

-   Use run history and OpenTelemetry‑backed traces in Builder/Triggers to debug multi‑step executions.
-   Monitor Admin Audit Logs (and Customer Event Logs where available) for subscriptions, runs, traces, and tool calls; export to SIEM if desired.
-   Alert on new/changed subscriptions, unexpected write bursts, policy‑denial spikes, or unusual run/trace patterns; pause by unsharing or removing subscriptions if anomalies appear.

### When you enable writes[​](#when-you-enable-writes "Direct link to When you enable writes")

-   Confirm the two gates: the Admin gate (only explicitly allowed write tools run in background) and the Moderator gate (publish/subscription control before any background writes occur).
-   Use deterministic destinations (exact Jira project keys, GitHub repo names, Drive folder IDs, Slack channel IDs, Salesforce objects/record types, and target environment) to prevent misrouting.
-   Enforce least privilege with narrowly scoped tokens and resource allowlists; avoid global/admin scopes.
-   Keep destructive operations disabled or interactive until deliberately reviewed.
-   Avoid deep reasoning in background flows to keep cost and risk low; reserve complex planning for interactive agents.
