---
url: "https://docs.glean.com/administration/managing-agents/independent-agents"
canonical: "https://docs.glean.com/administration/managing-agents/independent-agents"
title: "Set up and manage independent agents"
description: "Configure access, identities, credentials, and safeguards for independent agents."
fetched_at: "2026-10-13T08:49:19.273Z"
---
On this page

Use this guide to prepare independent agents for your organization. Independent agents run shared workflows using their own profile and act in connected apps through scoped service credentials. This guide focuses on independent agent governance. Use [Agent identity](/administration/agent-identity/overview) to manage service credentials.

info

Independent agents are currently in beta. Controls and templates in your deployment may differ from the examples in this guide.

Glean controls access per deployment. If independent agents or the required templates are unavailable, contact your Glean administrator or account representative to enable the beta.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Complete the following prerequisites:

-   Roles: Admin role or another permission level that manages agents and tools.
-   Feature access: Independent agents enabled for your deployment.
-   Ownership: A designated owner for each agent and its workflow.
-   Integrations: An approved Slack setup if the agent requires a channel presence.
-   Credentials: A service identity in each external system where the agent acts (optional for Glean-only workflows).
-   Oversight: A plan to review the write actions and monitor the agent after launch.

Review [Managing agent access](/administration/managing-agents/agent-access) for details on agent roles and publishing permissions.

## Plan agent boundaries[​](#plan-agent-boundaries "Direct link to Plan agent boundaries")

Document these decisions before creating credentials or publishing an agent:

| Decision | What to define |
| --- | --- |
| Workflow | The specific process the agent owns |
| Inputs | The events, messages, or records that start a run |
| Knowledge | The sources the agent uses to make decisions |
| Tools | The connected systems the agent reads or updates |
| Identity | The account or bot that represents the agent in each system |
| Audience | The users, groups, channels, or workspaces with access to use the agent |
| Writes | Actions that require human approval versus those that run automatically |
| Owner | The individual responsible for maintenance and incident response |

Start with read-only tools and a limited test audience. Expand access after the workflow passes initial testing.

## Configure an independent agent[​](#configure-an-independent-agent "Direct link to Configure an independent agent")

1.  Confirm that Glean enabled independent agents for your deployment and that builders have the required permissions.
2.  Open the relevant [Agent identity](/administration/agent-identity/overview) to create and govern service credentials if the workflow acts in an external system.
3.  Configure the agent's profile, Slack channels, knowledge, tools, credentials, and triggers. Refer to [Create an independent agent](/agents/create-agents/create-independent-agent) for detailed steps.
4.  Review the agent's inputs, sources, tools, audience, and write behavior before publishing.

## Manage access and publishing[​](#manage-access-and-publishing "Direct link to Manage access and publishing")

Use existing agent roles and sharing controls to limit who creates, edits, publishes, and runs agents.

For high-impact workflows:

-   Restrict publishing rights to Agent Creators, Agent Moderators, or Admins.
-   Test with a limited audience before company-wide publishing.
-   Review connected channels and knowledge sources before expanding the audience.
-   Assign one individual as the owner for each business-critical workflow. Use group sharing to give teams the access they need.

note

Independent agent access does not override permissions in connected systems. A service credential defines what the agent does in an external system, while Glean access controls who configures or uses the agent.

## Control automated writes[​](#control-automated-writes "Direct link to Control automated writes")

Independent agents can run without a person present. Treat every write tool as an operational change.

Complete these steps before allowing a write action to run without user confirmation:

1.  Define the exact destination, such as a Slack channel, Jira project, or ServiceNow queue.
2.  Restrict the service identity to required resources and actions.
3.  Test malformed, duplicate, and unexpected inputs.
4.  Set a clear failure response and assign an owner for follow-up.
5.  Confirm that you can reverse or correct the action.
6.  Launch to a small audience and review early runs.

Require human approval for destructive operations, permission changes, bulk updates, and external communications unless your organization approves a specific risk and rollback plan.

Refer [Run tools without user confirmation](/administration/tools/managing-tools/run-without-user-confirmation) to configure administrative controls for write tools. This setting allows write actions to execute automatically; it does not expand the underlying service credential permissions.

## Monitor and maintain agents[​](#monitor-and-maintain-agents "Direct link to Monitor and maintain agents")

Review the agent after launch and whenever you modify its tools, credentials, triggers, or knowledge sources.

Track the following health signals and events:

-   Failed runs and permission errors
-   Unexpected messages or updates in connected systems
-   Credential expiration and rotation schedules
-   Changes to audience and publishing settings
-   User feedback on outputs

Maintain an active record of the agent owner, connected systems, credential names, approved channels, and rollback procedures.

## Disable an agent during an incident[​](#disable-an-agent-during-an-incident "Direct link to Disable an agent during an incident")

Use the agent management controls as a centralized kill switch if an agent behaves unexpectedly. Take these steps:

1.  Pause execution: Pause or unpublish the agent using agent management controls. Check your deployment settings to see if active runs finish automatically.
2.  Revoke access: Remove the affected service credential from the agent or revoke it in the connected system.
3.  Audit activity: Review the agent run history and connected system audit logs. The run history separates the triggering user, schedule, or event from actions authored through the agent identity.
4.  Fix configuration: Correct the trigger, tool, credential scope, or knowledge source that caused the issue.
5.  Re-test: Verify the revised configuration with a limited audience before republishing.

Revoking a service credential cuts access to that specific system without deleting the agent or removing its other credentials.
