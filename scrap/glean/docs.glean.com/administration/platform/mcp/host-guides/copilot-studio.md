---
url: "https://docs.glean.com/administration/platform/mcp/host-guides/copilot-studio"
canonical: "https://docs.glean.com/administration/platform/mcp/host-guides/copilot-studio"
title: "Microsoft Copilot Studio"
description: "This guide is for administrators to configure Microsoft Copilot Studio to connect to your company's Glean MCP server."
fetched_at: "2026-09-01T13:29:12.790Z"
---
On this page

This guide is for administrators to configure Microsoft Copilot Studio to connect to your company's Glean MCP server.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean OAuth authorization server enabled (Admin Console → Users & permissions → Third-party access (OAuth))
-   Glean MCP server enabled (**Admin Console → Platform → Glean MCP servers**)
-   Microsoft Copilot Studio access with System Customizer or System Administrator role
-   [Generative Orchestration](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-generative-actions) enabled in your Copilot Studio environment

## Add Glean MCP Server to Copilot Studio[​](#add-glean-mcp-server-to-copilot-studio "Direct link to Add Glean MCP Server to Copilot Studio")

1

Navigate to Tools page

In Copilot Studio, go to your agent and select **Tools** from the left navigation.

![Copilot Studio Tools page](/img/administration/mcp/copilot-studio/tools-page.png)

2

Add a new MCP tool

Click **Add a tool**, then select the **Model Context Protocol** filter tab.

![Click Add a tool](/img/administration/mcp/copilot-studio/add-mcp-tool-1.png)

Click **New tool** to add a new MCP server, then select **Glean** from the list.

![Click New tool](/img/administration/mcp/copilot-studio/add-mcp-tool-3.png)

![Select Glean](/img/administration/mcp/copilot-studio/add-mcp-tool-4.png)

3

Configure the MCP server

Enter the following details:

-   **Server name**: Glean
-   **Server description**: Provides tools to work with Glean Enterprise Knowledge
-   **Server URL**: `https://{your-backend-domain}/mcp/[server-name]`
    -   Find your backend domain at [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**. It typically follows the pattern `company-be.glean.com`, but may be different if your organization uses a custom domain. Replace `[server-name]` with the MCP server name configured in your Glean Admin Console.
-   **Authentication**: Select **OAuth 2.0** and choose a type:
    -   **Dynamic discovery** (recommended): Automatically discovers OAuth endpoints from the server
    -   **Dynamic**: Discovers some settings, requires manual token URL
    -   **Manual**: All OAuth settings configured manually

![MCP server configuration](/img/administration/mcp/copilot-studio/server-config.png)

4

Create a new connection

In the **Add tool** dialog, click the **Connection** dropdown and select **Create new connection**.

![Create new connection](/img/administration/mcp/copilot-studio/create-connection.png)

This triggers the OAuth flow. Sign in with your Glean credentials and authorize the connection on the Glean OAuth page.

![Glean OAuth authorize page](/img/administration/mcp/copilot-studio/oauth-consent.png)

Once authenticated, the connection shows as connected with a green checkmark. Click **Add and configure** to complete setup.

![Connection confirmed with green checkmark](/img/administration/mcp/copilot-studio/connection-created.png)

The Glean tool configuration page displays with the server connected.

![Glean tool configured with server connected](/img/administration/mcp/copilot-studio/use-server.png)

5

Validate tools

Test the connection by asking your agent a question that requires Glean data. Verify the available tools are working correctly.

## Authorization Options[​](#authorization-options "Direct link to Authorization Options")

Copilot Studio supports multiple OAuth 2.0 configuration types:

| Type | Description | Recommended For |
| --- | --- | --- |
| **Dynamic discovery** | Automatically discovers OAuth endpoints from the server | Most deployments (recommended) |
| **Dynamic** | Discovers some settings, requires manual token URL | Custom configurations |
| **Manual** | All OAuth settings configured manually | Advanced/custom setups |

tip

Use **Dynamic discovery** when possible. It simplifies configuration by automatically retrieving OAuth endpoints from your Glean instance.

## Copilot Studio MCP Constraints[​](#copilot-studio-mcp-constraints "Direct link to Copilot Studio MCP Constraints")

-   **Transport**: Streamable HTTP (SSE transport is deprecated after August 2025)
-   **Generative Orchestration required**: MCP tools require Generative Orchestration to be enabled
-   **Endpoint format**: `https://{your-backend-domain}/mcp/[server-name]`
-   **Authorization**: OAuth 2.0 with PKCE support

References:

-   Microsoft Copilot Studio MCP documentation: [https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent](https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent)
-   MCP General Availability announcement: [https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/model-context-protocol-mcp-is-now-generally-available-in-microsoft-copilot-studio/](https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/model-context-protocol-mcp-is-now-generally-available-in-microsoft-copilot-studio/)

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### OAuth authorization failures[​](#oauth-authorization-failures "Direct link to OAuth authorization failures")

If OAuth authorization fails:

1.  Verify the Authorization URL and Token URL are correct for your Glean instance
2.  Ensure the Glean OAuth authorization server is enabled in Admin Console
3.  Check that the user has an active Glean account with appropriate permissions
4.  Try using Manual configuration if Dynamic Discovery is not working

### Missing or unavailable tools[​](#missing-or-unavailable-tools "Direct link to Missing or unavailable tools")

If MCP tools aren't appearing in your agent:

1.  Confirm Generative Orchestration is enabled in your Copilot Studio environment
2.  Verify the MCP server is enabled in Glean Admin Console
3.  Check that tools are enabled on the specific server configuration
4.  Ensure the Server URL format is correct

### Connection errors[​](#connection-errors "Direct link to Connection errors")

If you encounter connection errors:

1.  Verify the Server URL includes both your instance name and server name
2.  Check firewall settings allow connections from Microsoft to your Glean instance
3.  Ensure the MCP server is properly configured and running

* * *

-   For generic auth/network issues, see [Troubleshooting MCP Connectivity](/administration/platform/mcp/troubleshooting)

## Using Glean Tools in Copilot Studio[​](#using-glean-tools-in-copilot-studio "Direct link to Using Glean Tools in Copilot Studio")

Once the Glean MCP server is configured, users can interact with Glean data through your Copilot Studio agent. The agent will automatically use Glean tools when relevant queries are made.

note

The specific tools available depend on your Glean MCP server configuration. Common tools include search, chat, and read\_document capabilities.

## See also[​](#see-also "Direct link to See also")

-   [End-user configuration](/user-guide/mcp/end-user-configuration) - How individual users self-configure their own connection to Glean MCP server
