---
url: "https://docs.glean.com/administration/platform/mcp/glean-plugin-codex"
canonical: "https://docs.glean.com/administration/platform/mcp/glean-plugin-codex"
title: "Deploy the Glean plug-in in Codex"
description: "Prepare Glean for Codex users and validate the per-user plug-in installation."
fetched_at: "2026-09-01T13:29:12.596Z"
---
On this page

Prepare your Glean environment for Codex, then validate the plug-in with a pilot user before sharing the setup instructions with your organization.

The documented Codex setup is per user. Administrators configure and govern Glean access, but each user runs the Codex marketplace and MCP commands on their device.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you begin:

-   Complete the [Glean plug-in prerequisites](/administration/platform/mcp/glean-plugin#prerequisites)
-   Confirm that pilot users have a Glean account and access to the tools and Skills they need
-   Make sure the Glean MCP server is available to the intended users
-   Install Codex with plug-in support on the pilot user's device

## Prepare Glean for Codex[​](#prepare-glean-for-codex "Direct link to Prepare Glean for Codex")

1.  Enable the [Glean OAuth authorization server](/administration/oauth/authorization-server).
2.  Configure [Dynamic Client Registration](/administration/oauth/dynamic-client-registration). If you allow only approved applications, include **Glean CLI**.
3.  Enable the Glean MCP server and make it available to the intended users. See [Enable Glean MCP servers](/administration/platform/mcp/enable-mcp-servers).
4.  Configure access to the tools and Skills you want users to invoke. See [Manage Glean plug-in access and security](/administration/platform/mcp/manage-glean-plugin).

## Validate with a pilot user[​](#validate-with-a-pilot-user "Direct link to Validate with a pilot user")

Run the complete setup with a pilot user before rolling it out more broadly:

1.  Open the [Glean MCP configurator](https://app.glean.com/settings/install?mcpConfigure=true&mcpHost=codex) and copy your organization's server address and server name.
    
2.  Add the Glean marketplace and install the plug-in:
    
    ```
    codex plugin marketplace add gleanwork/codex-pluginscodex plugin add glean@glean-codex-plugins
    ```
    
3.  Connect and authenticate the Glean MCP server. Substitute the server address and name from the configurator:
    
    ```
    codex mcp add glean --url <server-url>/mcp/<server-name>codex mcp login glean
    ```
    
4.  Complete the browser-based Glean authentication flow.
    
5.  Start a new Codex task so the bundled Glean Skills and MCP tools are available.
    
6.  Ask Codex to search for content the pilot user can access in Glean.
    
7.  Confirm that:
    
    -   The search succeeds and respects the pilot user's Glean permissions
    -   The expected tools and Skills are available
    -   Codex asks the user for approval before a write tool runs

For current Codex-specific requirements and commands, see [Glean Plugin for Codex](https://developers.glean.com/guides/mcp/codex) on the Developer Portal.

## Roll out to users[​](#roll-out-to-users "Direct link to Roll out to users")

Share [Set up the Glean plug-in in Codex](/user-guide/mcp/glean-plugin-codex) with your users. Each user must install the plug-in, connect the Glean MCP server, and authenticate with their own Glean account.

## See also[​](#see-also "Direct link to See also")

-   [Manage Glean plug-in access and security](/administration/platform/mcp/manage-glean-plugin)
-   [Troubleshoot Glean plug-in deployment](/administration/platform/mcp/troubleshoot-glean-plugin)
-   [Use the Glean plug-in](/user-guide/mcp/glean-plugin)
