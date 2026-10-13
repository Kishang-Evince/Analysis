---
url: "https://docs.glean.com/agents/independent-agents"
canonical: "https://docs.glean.com/agents/independent-agents"
title: "Independent agents overview"
description: "Learn how independent agents run shared workflows, use service credentials, and automate tasks across connected applications."
fetched_at: "2026-10-13T08:49:37.514Z"
---
On this page

Independent agents run shared workflows without depending on an individual user session. Each agent has its own profile and uses admin-approved identities in connected apps like Slack, Jira, or ServiceNow.

Use an independent agent when a workflow needs to monitor events, respond in a shared channel, or continue running until work resolves. For a one-time question or a workflow that a user starts and supervises directly, use an interactive or scheduled agent instead.

Independent agent describes the workflow and execution model. A service credential describes how an agent authenticates to a connected system. An independent agent can operate without a service credential, and an agent that is not an independent agent can still use a service credential. See [Agent identity](/administration/agent-identity/overview) for credential setup and management.

Availability

Independent agents are in beta. Available templates, triggers, channels, and administrative controls depend on your deployment.

## What makes an agent independent[​](#what-makes-an-agent-independent "Direct link to What makes an agent independent")

An independent agent owns a workflow instead of acting as a temporary extension of the user who starts it. An independent agent includes:

-   A dedicated profile and agent principal for attribution
-   A persistent presence in Slack
-   Triggers that start work from events, messages, or schedules
-   Knowledge sources and tools selected specifically for the workflow
-   Scoped service credentials for connected apps
-   Approval and publishing controls that administrators manage

The agent still records the user, schedule, or event that triggers a run. When the workflow uses a service credential, connected apps attribute its actions directly to the agent's configured identity.

## Standard and independent agents[​](#standard-and-independent-agents "Direct link to Standard and independent agents")

|  | Standard agent | Independent agent |
| --- | --- | --- |
| Identity | Inherits the identity of the user who invokes it | Uses a dedicated agent profile |
| Permissions | Limited to what the active user can access | Scoped to administrator-defined boundaries |
| Execution | Reactive: responds when prompted or triggered | Proactive: can monitor channels and run background workflows |
| External actions | Uses the user's authorization | Uses a governed service credential when required |

Use an interactive agent for a one-time question or a task completed for one person. Use a scheduled agent for a recurring workflow initiated by each user. Use an independent agent when the workflow needs to monitor a shared Slack channel or continue running without a user session.

Agent identity is a capability that independent agents can use, but it is distinct from the agent itself. A service credential gives an agent access to one connected system; it does not create the agent or define its workflow.

## Building blocks[​](#building-blocks "Direct link to Building blocks")

Configure the core components below to define your agent's identity, communication channels, execution triggers, tools, and access controls.

### Agent profile[​](#agent-profile "Direct link to Agent profile")

The profile gives the agent a name, description, and recognizable presence. Choose a name that describes the role the agent owns, such as `On-call triage`, rather than the name of the person who built it.

### Channels and presence[​](#channels-and-presence "Direct link to Channels and presence")

Independent agents communicate through supported Slack channels and conversations. Configure the channels where the agent listens or responds, and explain which messages the agent handles.

### Triggers[​](#triggers "Direct link to Triggers")

A trigger starts a run. Depending on your deployment, an independent agent can start from a channel message, a connected-system event, or a schedule. Define event conditions narrowly so the agent does not respond to unrelated activity.

### Tools and credentials[​](#tools-and-credentials "Direct link to Tools and credentials")

Tools let the agent read information or take action in connected systems. When the agent acts on its own behalf, an administrator creates and scopes a [service credential](/administration/agent-identity/overview). The builder can then use the approved credential with the relevant agent tool.

Administrators scope credentials per connected system. For example, an agent might use a Slack credential for channel communication, a Jira credential for ticket updates, and a GCP credential for log access.

### Knowledge[​](#knowledge "Direct link to Knowledge")

Add only the knowledge sources the workflow requires. For example, an on-call agent might use runbooks, service ownership information, and recent incident records. Keep the source list small enough to review and maintain. By default, Independent Agents use data in your company's public domain; administrators can define the approved access boundaries for the deployment.

### Memory and persistent learning[​](#memory-and-persistent-learning "Direct link to Memory and persistent learning")

An independent agent can use approved interaction history and workflow outcomes to improve how it handles recurring issues. Use human-in-the-loop approval before adding new procedures, escalation paths, or other durable knowledge to the agent's knowledge base.

### Governance[​](#governance "Direct link to Governance")

Independent agents require an owner and an operating plan. Administrators control who can create, publish, and run agents, which credentials are available, and which write tools can execute without user confirmation.

## Common use cases[​](#common-use-cases "Direct link to Common use cases")

-   On-call triage: Monitor an escalation channel, gather context, identify the likely owner, and track follow-up.
-   Help desk support: Classify incoming requests, find the relevant procedure, and update the request with the next step.
-   Customer support: Gather context from tickets and knowledge sources, then prepare a response or escalation summary.
-   Incident correlation: Relate alerts, incident conversations, and tickets, then post a digest to an operations channel.

Start with a narrow workflow. Add write actions only after the agent produces reliable results with read-only tools.

### On-call Assist[​](#on-call-assist "Direct link to On-call Assist")

On-call Assist exemplifies an independent agent that owns an engineering escalation workflow. It can:

1.  Monitors an approved escalation channel.
2.  Gathers context from approved runbooks, ownership records, and incident data.
3.  Identifies the likely owner and recommends next steps.
4.  Tracks SLA and follow-up information.
5.  Posts status updates to the shared channel.
6.  Updates related tickets when required tools and credentials are available.
7.  Escalates to a human when the workflow requires approval or cannot proceed safely.

Start with read-only or shadow-mode execution before enabling automated write tools.

## Security and attribution[​](#security-and-attribution "Direct link to Security and attribution")

Independent agents must use the least privilege required for their workflow:

-   Scope each service credential to the exact systems, resources, and actions the agent needs.
-   Keep write actions behind human approval until you review and validate the workflow.
-   Use a dedicated service identity instead of a personal user account.
-   Review channels and knowledge sources before publishing the agent.
-   Rotate or revoke credentials when access is no longer required.
-   Monitor runs and audit events after launch.
-   Make sure administrators can pause or unpublish the agent and revoke its external access when needed.

Refer to [Agent identity](/administration/agent-identity/overview) for guidance on credential storage, audience configuration, rotation, and revocation.

## See also[​](#see-also "Direct link to See also")

-   [Create an independent agent](/agents/create-agents/create-independent-agent)
-   [Set up and manage independent agents](/administration/managing-agents/independent-agents)
-   [How agents work](/agents/how-agents-work)
-   [Schedule triggers](/agents/concepts/schedule-triggers)
-   [Security best practices for scheduled trigger agents](/security/agents/background-agents)
