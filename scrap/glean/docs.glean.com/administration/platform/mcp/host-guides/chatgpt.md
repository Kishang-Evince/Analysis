---
url: "https://docs.glean.com/administration/platform/mcp/host-guides/chatgpt"
canonical: "https://docs.glean.com/administration/platform/mcp/host-guides/chatgpt"
title: "ChatGPT"
description: "This guide is for administrators to configure ChatGPT to connect to your company's Glean MCP server."
fetched_at: "2026-09-01T13:29:12.816Z"
---
On this page

This guide is for administrators to configure ChatGPT to connect to your company's Glean MCP server.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean OAuth authorization server enabled (**Admin Console → Users & permissions → Third-party access (OAuth)**)
-   MCP server enabled (**Admin Console → Platform → Glean MCP servers**)
-   ChatGPT admin access, to add or enable the Glean connector

If you encounter an error when setting up the ChatGPT connector, contact your Glean account team.

## Find Glean in the ChatGPT app marketplace[​](#find-glean-in-the-chatgpt-app-marketplace "Direct link to Find Glean in the ChatGPT app marketplace")

Glean is listed in the ChatGPT app marketplace, so you don't need to build a custom connector from scratch.

1

Open workspace settings

In ChatGPT, go to **Workspace settings**, then **Apps & plugins**.

2

Enable Glean

Search for **Glean** and select **Enable**. This makes the Glean app available to your workspace.

Continue with the steps below to connect Glean to your Glean MCP server.

## Add Glean MCP Server to ChatGPT[​](#add-glean-mcp-server-to-chatgpt "Direct link to Add Glean MCP Server to ChatGPT")

1

Open ChatGPT settings (admin)

Navigate to the ChatGPT admin area for connectors.

![ChatGPT Admin](/img/administration/mcp/chatgpt/connector-add.png)

2

Provide the server URL

Copy the ChatGPT server URL from [app.glean.com/admin/mcp](https://app.glean.com/admin/mcp), under **MCP servers**. Find the ChatGPT server in the list and copy its URL.

Enter this URL in ChatGPT. It follows the format `https://{your-backend-domain}/mcp/chatgpt`.

![Connector URL](/img/administration/mcp/chatgpt/connector-url.png)

3

Authenticate with Glean OAuth

Complete the sign-in flow.

![OAuth Consent](/img/administration/mcp/oauth-consent.png)

4

Confirmation

ChatGPT supports `search` and `fetch` tool equivalents.

![Confirmation](/img/administration/mcp/chatgpt/confirmation.png)

## ChatGPT MCP constraints[​](#chatgpt-mcp-constraints "Direct link to ChatGPT MCP constraints")

-   Web-based managed connector: configuration is performed in ChatGPT’s UI; there is no local config file support.
-   HTTP-only transport: stdio is not supported for remote servers.
-   Limited tool surface: only `search` and `fetch` equivalents are available when calling MCP servers.
-   Fixed endpoint format: `https://{your-backend-domain}/mcp/chatgpt` (admin-managed install).
-   Server-only marketplace listing: per OpenAI's marketplace requirements, the Glean listing has no custom UI of its own. Users interact with Glean only through ChatGPT's own tool-calling interface.

References:

-   OpenAI Developer Mode guide: [https://platform.openai.com/docs/guides/developer-mode](https://platform.openai.com/docs/guides/developer-mode)
-   Connectors in ChatGPT (OpenAI Help): [https://help.openai.com/en/articles/11487775-connectors-in-chatgpt](https://help.openai.com/en/articles/11487775-connectors-in-chatgpt)

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Initial connection error / cannot complete connection[​](#initial-connection-error--cannot-complete-connection "Direct link to Initial connection error / cannot complete connection")

If you encounter a connection error when setting up the ChatGPT connector:

1.  Refresh the page after the initial connection attempt
2.  Re-add the Glean MCP connector in ChatGPT settings
3.  Verify you are using the correct endpoint: `https://{your-backend-domain}/mcp/chatgpt`

If you continue to experience issues, contact your Glean account team.

* * *

-   For generic auth/network issues, see [Troubleshooting MCP Connectivity](/administration/platform/mcp/troubleshooting)

## Using the Glean Connector in ChatGPT[​](#using-the-glean-connector-in-chatgpt "Direct link to Using the Glean Connector in ChatGPT")

Once you've configured the Glean MCP connector, your users need to activate it in their ChatGPT conversations. The connector is not automatically enabled and is located in a submenu that can be easy to miss.

1

Open the tools menu

In a ChatGPT conversation, click the **plus (+)** icon to the left of the message input field to expand the tools menu.

2

Access the More menu

From the expanded menu, click **More** at the bottom of the list.

![Accessing Glean connector in ChatGPT](/img/administration/mcp/chatgpt/connector-usage.png)

3

Select Glean

In the More submenu, find and click **Glean** (labeled as CUSTOM) to activate it for the current conversation.

note

Users need to activate the Glean connector in each new conversation where they want to use it. The connector does not remain active across all conversations by default.

tip

Share this usage information with your users to ensure they can find and activate the connector. Many users report difficulty locating the connector in ChatGPT's nested menu structure without clear guidance.

## See also[​](#see-also "Direct link to See also")

-   [End-user configuration](/user-guide/mcp/end-user-configuration) - How individual users self-configure their own connection to Glean MCP server
