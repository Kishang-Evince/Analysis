---
url: "https://docs.glean.com/security/security-principles"
canonical: "https://docs.glean.com/security/security-principles"
title: "Core security principles"
description: "Core security principles that govern how Glean enforces permissions, centralizes administration, and provides operational traceability across the platform."
fetched_at: "2026-09-01T13:29:58.546Z"
---
On this page

Glean's security model is built on three core principles:

-   **Permission mirroring**: Mirror source-system permissions so users never see data they shouldn't
-   **Centralized administration**: Set policy once and enforce it everywhere
-   **Traceability**: Make every sensitive operation auditable and controllable

This article describes how those principles work in practice and where to find deeper technical detail.

## Permission mirroring and least privilege[​](#permission-mirroring-and-least-privilege "Direct link to Permission mirroring and least privilege")

Glean mirrors the access controls of every connected source system. When a connector crawls content, it also ingests the permission model from that source (ACLs, group memberships, role assignments). At query time, Glean evaluates the signed-in user's identity against those mirrored permissions before returning any results.

This enforcement applies uniformly across all Glean surfaces, including:

-   **Search results**: Only documents the user can access in the source system appear in results.
-   **AI answers and citations**: Glean generates responses only from content the querying user is authorized to access. Citations link to source documents that the user already has permission to open.
-   **Agents and actions**: Agents execute with the identity and permissions of the signed-in user who triggered the run, regardless of who created or published the agent.
-   **MCP servers**: Results returned through the Model Context Protocol respect the authenticated user's permissions.
-   **Embedded integrations**: Agent tiles, suggested next steps, and search results in ServiceNow, Zendesk, and Salesforce are permission-aware. If a user doesn't have access to an agent or document, it doesn't appear.

### No privilege escalation[​](#no-privilege-escalation "Direct link to No privilege escalation")

If a user can't open a document in the source system, that document can't be used as context, returned as a search result, or surfaced as a citation. Glean never grants broader access than the source system provides.

### Permission-aware sharing[​](#permission-aware-sharing "Direct link to Permission-aware sharing")

When a user shares a chat conversation, each recipient still only sees the sources they're individually authorized to access. Sharing a conversation doesn't transfer the original asker's permissions to the viewer.

## Centralized administration[​](#centralized-administration "Direct link to Centralized administration")

All platform configuration is managed through the **Admin console**, a single control plane for policy, access, and observability. This lets a small team of administrators set policy once and have it apply consistently across Search, Glean, Agents, Actions, MCP servers, embedded integrations, and more.

## Traceability and control[​](#traceability-and-control "Direct link to Traceability and control")

Glean provides two layers of operational control: human-in-the-loop confirmations for write operations, and comprehensive audit logging for administrative actions.

### Human-in-the-loop confirmations for write actions[​](#human-in-the-loop-confirmations-for-write-actions "Direct link to Human-in-the-loop confirmations for write actions")

Write actions in agents running in the Glean web app pause for user approval before executing. When a write step starts, the user sees a confirmation panel showing the target application and the planned change. The user can review, edit (for actions that support inline editing), and then approve or cancel.

This confirmation behavior applies by default to all write actions in interactive web app sessions. It doesn't apply to read-only actions such as search or lookup, and it doesn't change behavior in Slack or Microsoft Teams.

Administrators can selectively mark specific actions as **Run without user confirmation** when the action is safe, repeatable, and low-risk. This is an explicit opt-in to remove the confirmation step, not the default.

For agents with scheduled triggers that run in the background, control shifts to governance: who may create and publish agents, which actions are enabled for autonomous use, and how inputs are constrained. See [Security best practices for scheduled triggers agents](/security/agents/background-agents) for detailed guidance.

### Audit logs[​](#audit-logs "Direct link to Audit logs")

Admin audit logs capture administrative actions performed within your Glean instance, including changes to connectors, roles, global configuration, agent subscriptions, and action executions. Logs support time-range, user, and action-type filtering, and can be exported to CSV or streamed to a third-party SIEM.

Customer event logs provide a structured record of user-facing events (searches, chats, workflow runs, citation clicks) for engagement analysis, compliance reporting, and custom dashboards.
