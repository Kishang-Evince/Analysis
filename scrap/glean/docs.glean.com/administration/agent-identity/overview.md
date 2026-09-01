---
url: "https://docs.glean.com/administration/agent-identity/overview"
canonical: "https://docs.glean.com/administration/agent-identity/overview"
title: "Agent identity"
description: "Run Glean agents on scoped, admin-managed service credentials instead of borrowed user credentials in connected apps."
fetched_at: "2026-09-01T13:28:59.187Z"
---
On this page

By default, a Glean agent runs under the identity of the user who invokes it. It uses the permissions and tokens of that user, and in connected systems it appears as that user. This model works well for many use cases. But after an agent begins taking meaningful action, it creates ambiguity as its actions are indistinguishable from that of the user, it has no recognizable presence of its own, and its access is determined by the permissions of the invoking user rather than by the needs of the task.

With agent identity, the agent appears as its own bot or user in connected apps and runs on scoped service credentials instead of borrowed user credentials. As a result, the agent acts as itself and operates with permissions that an admin defines intentionally.

You configure agent identity by attaching a service credential to the agent. An admin first creates the credential in the target platform and scopes it to the access the agent must have. The admin then registers that credential in Glean’s Admin console and controls who can use it. A builder can attach the credential to an agent, and the agent will then run with that fixed permission set for every invoker.

## Why run agents on service credentials[​](#why-run-agents-on-service-credentials "Direct link to Why run agents on service credentials")

This default model creates three problems for admins, and a service credential solves each one:

-   Accurate attribution: Actions are authored by the own account of the agent rather than the invoking user, so audit logs keep automated activity separate from human activity while still recording who or what triggered the run.
-   Right-sized permissions, in both directions:
    -   *Auth sprawl:* the workaround for *the agent needs access* is often *give more people direct access*, spreading credentials across the org for outcomes an agent could handle with one scoped, governed path.
    -   *Over-permissioned:* without a scope boundary, an agent can inherit more than intended for example, entire access of an executive rather than only what the task requires. An admin sets the scope of the credential, which defines the maximum level of access the agent will ever have.
-   Reliable unattended runs: Scheduled and background agents don't depend on a person's OAuth token, so they don't fail silently when that token expires.

How the two approaches compare:

|  | Invoking user's identity (default) | Service Credentials |
| --- | --- | --- |
| Attribution | Actions in audit logs appear as the person who triggered them. | Actions are authored by the agent's own account; the triggering user or schedule is logged separately. |
| Permissions | Agent inherits whatever access the invoking user has. | Agent runs with only the access an admin scopes to the credential. |
| Presence | Agent shows up as the invoking user, everywhere. | Agent shows up as itself and has its own bot, its own account, in every connected app. |
| Unattended runs | Depends on the token of the user who invokes it; fails silently when it expires. | Runs on a credential that doesn't depend on anyone's session. |

## How agent identity works[​](#how-agent-identity-works "Direct link to How agent identity works")

1.  An admin creates a service credential, scoped to the access the agent must have.
2.  A builder attaches the credential to an agent.
3.  The agent runs and shows up as itself everywhere it is used as its own named Slack or Teams bot, its own Jira, Confluence, or ServiceNow account, its own GitHub App instead of as the invoking user.

## When to use agent identity[​](#when-to-use-agent-identity "Direct link to When to use agent identity")

Agent identity applies per credential and tool, not per agent. A single agent can have one step approved by a person while every other step runs under a fixed service account, which decouples who can invoke a step from what that step is trusted to do. Common patterns:

-   Combine human and machine steps in one workflow: An incident response agent reads logs and opens a GitHub pull request under its own GCP and GitHub accounts, links it to a Jira ticket, and posts status to Slack and steps that need no human approval. A person still reviews and merges the pull request. Agent identity covers the steps that don't need a human gate, alongside the one that does.
-   Give agents their own presence across surfaces: A company sets up an HR agent as its own named Slack bot, with its own name and icon in the workspace. Employees DM it directly with HR questions, the same way they would message a colleague, and get an answer back in that same conversation.
-   Keep automated actions separated for audit and compliance: The comments, edits, and approvals of an agent need to be distinguishable from those of a person. Agent identity attributes every action in the audit log to the account of the agent, with the triggering user or schedule recorded alongside it.
-   Keep scheduled work running without depending on a login session: A Jira ticket autoresponder that categorizes new tickets, comments with the relevant Confluence runbook, and posts a daily digest to Slack runs on its own schedule. Because it isn't using an OAuth token of any person, it keeps working through vacations, role changes, and password resets.

## Roles and responsibilities[​](#roles-and-responsibilities "Direct link to Roles and responsibilities")

| Role | Responsibility |
| --- | --- |
| IT and security admins | Register, scope, rotate, and revoke service credentials across third-party platforms. |
| Glean admins | Register the credential in Glean and control who can use it while building agents. |
| Agent builders | Attach scoped credentials to an agent so it works for everyone who can invoke it, not just the builder. |
| End users | Get scoped, admin-approved outcomes by running agents that use service credentials. |

## Security model[​](#security-model "Direct link to Security model")

-   Credentials are injected server-side: The agent runtime never receives the raw secret, it's never placed in the LLM context or the sandbox of the agent. Glean adds the authentication header only to requests bound for the app's approved domain.
    -   Every invoker gets the same credentials and permissions, so the agent behaves consistently no matter who runs it.
    -   Glean records the triggering principal, the invoking user or schedule that started the run in the audit log, alongside the authored action of the agent.
    -   Scope narrowly: Service accounts are often high privilege. Grant each credential only the access the agent needs, and set its audience deliberately.
-   Rotate periodically: To rotate, issue new credentials in the third-party app, update the values on the credential in Glean, then revoke the old ones in the app.
-   Revoke to cut access: If you revoke a credential for a specific system, the agent immediately loses access to it. Revoking all of its credentials completely cuts off its access across the board.

## Set up agent identity[​](#set-up-agent-identity "Direct link to Set up agent identity")

1

Create and scope the credential

In the **Admin console**, choose the service-credential template for the app you want to connect, enter the values it asks for, and scope it to the connectors and tools the agent needs. Secret values are stored encrypted and are never shown again.

2

Set the audience

Decide who can use the credential. This controls which people can attach it to agents and run agents that rely on it.

3

Attach it to an agent

A builder adds the credential to an autonomous agent. When that agent calls the app's API, Glean injects the authentication automatically and gives the agent a matching skill that explains how to call the API.

Each app has its own setup steps, for example, creating a Connected App in Salesforce or a service account in GCP. See the guide for your integration below.

## Available integrations[​](#available-integrations "Direct link to Available integrations")

[

### Coda

**Authentication:** MCP-restricted Personal API token (Bearer)

  

**Access:** Read and write (governed by sharing, account role, and token access level)







](/administration/agent-identity/coda)[

### GCP BigQuery

**Authentication:** Service account impersonation (short-lived tokens)

  

**Access:** Read-only







](/administration/agent-identity/gcp-bigquery)[

### GCP service account

**Authentication:** Service account impersonation (short-lived tokens)

  

**Access:** Determined by IAM roles (for example, read-only log access)







](/administration/agent-identity/gcp-service-account)[

### GCP Storage

**Authentication:** Service account impersonation (short-lived tokens)

  

**Access:** Read-only







](/administration/agent-identity/gcp-storage)[

### GitHub app

**Authentication:** GitHub app (private key signs a JWT for installation tokens)

  

**Access:** Read-only







](/administration/agent-identity/github-app)[

### Gong

**Authentication:** Workspace API key (Access Key + Access Key Secret)

  

**Access:** Read-only







](/administration/agent-identity/gong)[

### Salesforce

**Authentication:** OAuth 2.0 Client Credentials (Connected App)

  

**Access:** Determined by Connected App permissions







](/administration/agent-identity/salesforce)[

### Slack app

**Authentication:** Slack app bot token

  

**Access:** Read and post messages, reply in threads, add reactions







](/administration/agent-identity/slack-app)[

### Snowflake

**Authentication:** Service user with RSA key-pair (short-lived JWT)

  

**Access:** Read-only SQL (SELECT, SHOW, DESCRIBE)







](/administration/agent-identity/snowflake)[

### Microsoft Teams

**Authentication:** Microsoft Entra app identity (OAuth 2.0 client credentials)

  

**Access:** Determined by Microsoft Graph permissions







](/administration/agent-identity/teams)[

### Microsoft Outlook

**Authentication:** Microsoft Entra application identity (OAuth 2.0 client credentials)

  

**Access:** Determined by Microsoft Graph permissions and Exchange mailbox scope







](/administration/agent-identity/outlook)[

### Atlassian (Jira / Confluence)

**Authentication:** Service-account API key (Bearer, via Rovo MCP server)

  

**Access:** Read and write (governed by service account permissions and token scopes)







](/administration/agent-identity/atlassian)[

### Sentry

**Authentication:** Internal Integration auth token (Bearer)

  

**Access:** Read-only







](/administration/agent-identity/sentry)[

### Datadog

**Authentication:** API key + Application key (via remote MCP server)

  

**Access:** Read and write (governed by MCP permissions)







](/administration/agent-identity/datadog)[

### Grafana

**Authentication:** Service account API key (Bearer, via Grafana MCP server)

  

**Access:** Read and write (governed by service account role)







](/administration/agent-identity/grafana)[

### Intercom

**Authentication:** Workspace Access Token (Bearer, via hosted MCP server)

  

**Access:** Read and write (governed by app scopes)







](/administration/agent-identity/intercom)[

### AWS CloudWatch Logs

**Authentication:** Workload Identity Federation (`sts:AssumeRoleWithWebIdentity`)

  

**Access:** Read-only







](/administration/agent-identity/aws-cloudwatch)[

### Linear

**Authentication:** OAuth 2.0 client credentials (Linear OAuth application)

  

**Access:** Read and write for public teams (governed by configured scopes)







](/administration/agent-identity/linear)[

### ServiceNow

**Authentication:** OAuth 2.0 password grant (ServiceNow service account)

  

**Access:** Read and write (governed by the service account's roles)







](/administration/agent-identity/servicenow)[

### Zendesk MCP

**Authentication:** OAuth client credentials (via Zendesk MCP server)

  

**Access:** Read-only (governed by Zendesk permissions)







](/administration/agent-identity/zendesk)

info

Service-credential templates are enabled per deployment. If a template you expect is not available in the **Admin console**, contact your Glean representative to turn it on.
