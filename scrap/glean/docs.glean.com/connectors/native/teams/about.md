---
url: "https://docs.glean.com/connectors/native/teams/about"
canonical: "https://docs.glean.com/connectors/native/teams/about"
title: "Microsoft Teams"
description: "Search Microsoft Teams channels, chats, and meeting transcripts in Glean."
fetched_at: "2026-09-01T13:29:45.149Z"
---
On this page

Microsoft Teams is a collaboration platform where teams hold conversations, share files, and meet across channels and chats. The Glean Microsoft Teams connector brings this content into Glean for permission-aware search and AI assistance, so users can find channel discussions, chat messages, and meeting transcripts without leaving Glean.

Standalone connector

The Microsoft Teams connector uses its own Azure app registration — it is not part of the [Microsoft 365](/connectors/native/microsoft365/) parent connector suite. Set it up independently from OneDrive, SharePoint, and Outlook.

## What gets indexed[​](#what-gets-indexed "Direct link to What gets indexed")

| Content type | Support | Notes |
| --- | --- | --- |
| Channel messages | Full | Messages and replies in public and private channels, plus channel name, description, settings, authorship, and timestamps. |
| Group chat messages | Full | Messages in group chats. |
| Private and meeting chat messages | Full | Private (direct) messages and meeting chats. Self-serve opt-in during setup. |
| Team and channel membership | Full | Team and channel membership and settings, which Glean uses to enforce access. |
| Meeting transcripts | Full | Microsoft Teams meeting transcripts. Self-serve opt-in with additional setup. See [Meeting transcripts](/connectors/native/teams/teams-transcripts). |

## Set up Teams[​](#set-up-teams "Direct link to Set up Teams")

-   **[Connector setup](/connectors/native/teams/setup):** Register the Azure app, grant Microsoft Graph permissions, and configure the connector in Glean. Covers required permissions, optional private chats, and setup steps.
-   **[Meeting transcripts](/connectors/native/teams/teams-transcripts):** Additional setup to index Teams meeting transcripts, including application access policy configuration.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

Glean mirrors Teams membership and access — users see only the teams, channels, and chats they belong to in Microsoft Teams. Glean evaluates permissions at query time. The connector uses read-only, application-level access through your Entra ID app registration.
