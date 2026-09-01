---
url: "https://docs.glean.com/user-guide/mcp/glean-plugin-codex"
canonical: "https://docs.glean.com/user-guide/mcp/glean-plugin-codex"
title: "Set up the Glean plug-in in Codex"
description: "Install the Glean plug-in and connect Codex to your Glean MCP server."
fetched_at: "2026-09-01T13:30:42.105Z"
---
On this page

Install the Glean plug-in, connect your organization's Glean MCP server, and authenticate from Codex.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Ask your Glean administrator to complete the [Glean plug-in prerequisites](/administration/platform/mcp/glean-plugin#prerequisites).

## Install and connect the plug-in[​](#install-and-connect-the-plug-in "Direct link to Install and connect the plug-in")

1.  Open the [Glean MCP configurator](https://app.glean.com/settings/install?mcpConfigure=true&mcpHost=codex) and copy your organization's server address and server name.
    
2.  Add the Glean marketplace and install the plug-in:
    
    ```
    codex plugin marketplace add gleanwork/codex-pluginscodex plugin add glean@glean-codex-plugins
    ```
    
3.  Connect and authenticate the Glean MCP server. Substitute the server address and name from the configurator:
    
    ```
    codex mcp add glean --url <server-url>/mcp/<server-name>codex mcp login glean
    ```
    
4.  Start a new Codex task so the bundled Glean Skills and MCP tools are available.
    

For current Codex-specific requirements and commands, see [Glean Plugin for Codex](https://developers.glean.com/guides/mcp/codex) on the Developer Portal.

## Verify the setup[​](#verify-the-setup "Direct link to Verify the setup")

Start a new Codex task and ask:

```
Search for my company onboarding docs in Glean.
```

Setup is complete when the bundled Glean Skills and MCP tools are available and the search succeeds.

## See also[​](#see-also "Direct link to See also")

-   [Use the Glean plug-in](/user-guide/mcp/glean-plugin)
-   [Troubleshoot the Glean plug-in](/user-guide/mcp/troubleshoot-glean-plugin)
