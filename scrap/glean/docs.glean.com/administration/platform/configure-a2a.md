---
url: "https://docs.glean.com/administration/platform/configure-a2a"
canonical: "https://docs.glean.com/administration/platform/configure-a2a"
title: "Configure the Glean A2A server"
description: "Turn on the Glean A2A server to connect Glean Assistant to an external AI platform such as Google Gemini Enterprise or Microsoft Copilot Studio. For how the A2A server works and how requests are authenticated, see Glean A2A server."
fetched_at: "2026-09-01T13:29:10.491Z"
---
On this page

Turn on the Glean A2A server to connect Glean Assistant to an external AI platform such as Google Gemini Enterprise or Microsoft Copilot Studio. For how the A2A server works and how requests are authenticated, see [Glean A2A server](/administration/platform/a2a-server).

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you turn on the A2A server, make sure:

-   You have an admin or super admin role.
-   The Glean OAuth authorization server is enabled. See [Enable the Glean OAuth authorization server](/administration/oauth/authorization-server#enable-the-glean-oauth-authorization-server).
-   The users who will reach Glean through A2A have access to Glean Assistant. See [Configure Glean Assistant](/get-started/golive/setup-glean-assistant) for details.

## Set up the A2A server[​](#set-up-the-a2a-server "Direct link to Set up the A2A server")

1

Enable the A2A server

Navigate to **Admin console → Platform → A2A server** and turn on the **Enable A2A server** toggle.

![A2A Server admin page showing the Enable A2A server toggle and the agent card section](/img/administration/a2a/a2a-server-admin-page.png)

The A2A Server admin page with the agent card URL and agent card contents

2

Copy the agent card URL

Once enabled, the page displays your deployment's agent card URL (ending in `/.well-known/agent-card.json`) along with the agent card contents. Copy the URL to share with the external platform.

## Connect an external platform[​](#connect-an-external-platform "Direct link to Connect an external platform")

1

Register Glean in the external platform

In the external A2A client (for example, Google Gemini Enterprise or Microsoft Copilot Studio), register Glean Assistant as a remote agent using your agent card URL. Refer to the external platform's documentation for its specific registration steps.

2

Complete the OAuth flow

When prompted, sign in to Glean to authorize the connection. Each user authorizes individually, so all requests run with their own Glean permissions.

3

Verify the connection

Ask a question through the external platform (for example, "Who is my manager?") and confirm that Glean Assistant responds.

## See also[​](#see-also "Direct link to See also")

-   [Glean A2A server](/administration/platform/a2a-server)
-   [Glean A2A host](/administration/platform/a2a-host)
-   [Configure the Glean A2A host](/administration/platform/configure-a2a-host)
-   [Glean OAuth authorization server](/administration/oauth/authorization-server)
-   [Configure Glean Assistant](/get-started/golive/setup-glean-assistant)
