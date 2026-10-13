---
url: "https://docs.glean.com/connectors/native/teams/about"
canonical: "https://docs.glean.com/connectors/native/teams/about"
title: "Microsoft Teams"
description: "Understand indexed Microsoft Teams messages, membership-based permissions, and the separate Outlook Calendar connection"
fetched_at: "2026-10-13T08:50:21.444Z"
---
On this page

The Microsoft Teams connector brings channel discussions and chat messages into Glean for permission-aware search and AI assistance.

For new calendar and meeting transcript connections, use the separate Outlook Calendar connector. See [Outlook Calendar](/connectors/native/outlook-calendar/). Existing Teams-based calendar connections can continue to use their current configuration. See [Teams transcripts](/connectors/native/teams/teams-transcripts) for that setup.

Standalone connector

The Microsoft Teams connector uses its own Azure app registration — it is not part of the [Microsoft 365](/connectors/native/microsoft365/) parent connector suite. Set it up independently from OneDrive, SharePoint, and Outlook.

## What gets indexed[​](#what-gets-indexed "Direct link to What gets indexed")

| Content type | Support | Notes |
| --- | --- | --- |
| Channel messages | Full | Messages and replies in public and private channels, plus channel name, description, settings, authorship, and timestamps. |
| Group chat messages | Full | Messages in group chats. |
| Private and meeting chat messages | Full | Private (direct) messages and meeting chats. Self-serve opt-in during setup. |
| Team and channel membership | Full | Team and channel membership and settings, which Glean uses to enforce access. |

## Set up Teams[​](#set-up-teams "Direct link to Set up Teams")

-   **[Connector setup](/connectors/native/teams/setup):** Register the Azure app, grant Microsoft Graph permissions, and configure the connector in Glean. Covers required permissions, optional private chats, and setup steps.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

Glean mirrors Teams membership and access — users see only the teams, channels, and chats they belong to in Microsoft Teams. Glean evaluates permissions at query time. The connector uses read-only, application-level access through your Entra ID app registration.
