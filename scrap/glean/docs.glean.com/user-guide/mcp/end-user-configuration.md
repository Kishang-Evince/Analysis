---
url: "https://docs.glean.com/user-guide/mcp/end-user-configuration"
canonical: "https://docs.glean.com/user-guide/mcp/end-user-configuration"
title: "Configure the Glean MCP server"
description: "For organizations where your Glean administrator has enabled the Glean MCP server, you can configure your own connection to the Glean MCP server in most MCP host applications."
fetched_at: "2026-09-01T13:30:42.221Z"
---
On this page

For organizations where your Glean administrator has enabled the Glean MCP server, you can configure your own connection to the Glean MCP server in most MCP host applications.

## MCP Configurator[​](#mcp-configurator "Direct link to MCP Configurator")

Use the MCP Configurator to get host-specific setup instructions:

### Access the MCP Configurator

The MCP Configurator gives you tailored connection instructions, configuration snippets, and OAuth setup for each supported host application.

To open it, select your profile icon → **Your settings** → **Install** tab → **MCP Configurator** section.

### Install with the MCP Configurator[​](#install-with-the-mcp-configurator "Direct link to Install with the MCP Configurator")

Follow these steps to connect your AI app to Glean's MCP server. Each host gets its own setup instructions and server URL.

1

Open the connect card

To find the connect card:

1.  Select your profile icon in the lower-left corner of the home page
2.  Select **Your settings**
3.  Go to the **Third party apps and MCP** tab
4.  Find the **Connect to your AI apps with Glean MCP** card

2

Choose a server

Most people can keep the default server, which is marked *recommended*. If your organization has more than one server, pick the one you need from the server dropdown. The card shows the server's URL with a copy button.

You can copy the server URL and use it to connect from any MCP host, including hosts that aren't in the list below.

3

Pick your host and set up the connection (optional)

Selecting a host from the list is optional. If you've copied the server URL, you can set up any host with it directly. To get setup instructions tailored to your app, select it from the host list (for example, Cursor, VS Code, or Claude Desktop). Select **Show more** to see the rest of your available hosts.

A setup window opens for your host. Choose the method that fits:

-   **Quick Setup**: a one-click install for hosts that support it, such as Cursor
-   **CLI Command**: a command you run in your host's terminal
-   **Manual Config**: copy the server URL or configuration and paste it into your host's MCP settings

If your admin manages setup for a host, you'll see an **Administrator Setup Required** panel with the server URL instead.

4

Sign in to Glean

Complete sign-in with your organization's SSO when prompted. Your host then receives the OAuth tokens it needs to reach Glean's MCP server.

5

Verify the connection

Ask your assistant to “Search Glean for …” or “Read this document in Glean …” to confirm the connection works.

Some hosts are *stdio-only* and can't connect directly over HTTP. In those cases, use a bridge (for example, `mcp-remote`) to reach Glean's remote HTTP MCP server.

Glean plug-in for coding hosts

Cursor, Claude Code, and Codex support Glean plug-ins for dynamic Skill and tool discovery. You can use a plug-in alongside the standard Glean MCP server connection described on this page. See [Use the Glean plug-in](/user-guide/mcp/glean-plugin).

## Supported hosts[​](#supported-hosts "Direct link to Supported hosts")

You can self-configure connections in the following host applications:

Install

AllUser-installableAdmin-managed

Type

AllCLIDesktopIDEWeb

Search

14 of 22

### Antigravity

IDE

[Vendor documentation](https://antigravity.google/docs/ide/mcp#antigravity-ide)

### Antigravity CLI

CLI

[Vendor documentation](https://antigravity.google/docs/cli-overview)

### Claude Code

CLI

[Vendor documentation](https://code.claude.com/docs/en/mcp)

### Claude for Desktop

Desktop

[Glean documentation](/administration/platform/mcp/host-guides/claude-desktop)[Vendor documentation](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp)

Codex

### Codex

CLI

[Vendor documentation](https://developers.openai.com/codex/mcp)

### Cursor

IDE

[Vendor documentation](https://cursor.com/docs/context/mcp)

### Cursor Agent

CLI

[Vendor documentation](https://cursor.com/docs/context/mcp)

### Gemini CLI

CLI

[Vendor documentation](https://geminicli.com/docs/tools/mcp-server/)

### Goose

DesktopCLI

[Vendor documentation](https://goose-docs.ai/docs/category/mcp-servers)

### JetBrains AI Assistant

IDE

[Vendor documentation](https://www.jetbrains.com/help/ai-assistant/mcp.html)

### Junie (JetBrains)

IDE

[Vendor documentation](https://junie.jetbrains.com/docs/junie-cli-mcp-configuration.html)

### OpenCode

CLI

[Vendor documentation](https://opencode.ai/docs/mcp-servers/)

### VS Code

IDE

[Vendor documentation](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)

### Windsurf

IDE

[Vendor documentation](https://docs.windsurf.com/windsurf/cascade/mcp)

info

Glean also supports other MCP-compatible applications that aren't listed here. To connect one, use your Glean MCP server URL, for example `https://{your-backend-domain}/mcp/[your-mcp-server-name]`. You can find your connection details in the MCP Configurator, or ask your Glean administrator for your server's backend URL.

## What you need[​](#what-you-need "Direct link to What you need")

To connect to the Glean MCP server, you need:

1.  **A Glean account** - Access to your organization's Glean instance
2.  **A supported MCP host application** - Installed on your machine or accessible via web
3.  **Your Glean MCP server URL** - Available in the MCP Configurator, or from your Glean administrator
4.  **OAuth authentication** - You authenticate through your organization's identity provider the first time you connect

## Before you start[​](#before-you-start "Direct link to Before you start")

Your Glean administrator must enable the Glean MCP server and OAuth for your instance before you can connect. If you can't connect, ask your administrator to confirm that:

-   The Glean MCP server is enabled
-   OAuth (third-party access) is enabled
-   You know which MCP server name and tools are available to you

## Get the most out of the MCP server[​](#get-the-most-out-of-the-mcp-server "Direct link to Get the most out of the MCP server")

For a full walkthrough with examples, see the end-user guide:

[

### Using the Glean MCP Server

A complete guide to connecting MCP hosts to Glean, including setup instructions, examples, and troubleshooting.







](/user-guide/mcp/usage)

## Support and troubleshooting[​](#support-and-troubleshooting "Direct link to Support and troubleshooting")

If you have trouble connecting:

-   See [Troubleshooting MCP Connectivity](/administration/platform/mcp/troubleshooting) for common authentication and network issues
-   Confirm you have an active Glean account with the right permissions
-   Check that you're using the correct MCP server URL
-   Make sure you completed the OAuth sign-in

## See also[​](#see-also "Direct link to See also")

-   [What is an MCP Host?](/administration/platform/mcp/host-guides/what-is-a-host)
-   [Using the Glean MCP Server](/user-guide/mcp/usage)
