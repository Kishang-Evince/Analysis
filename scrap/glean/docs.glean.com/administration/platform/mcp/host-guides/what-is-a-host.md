---
url: "https://docs.glean.com/administration/platform/mcp/host-guides/what-is-a-host"
canonical: "https://docs.glean.com/administration/platform/mcp/host-guides/what-is-a-host"
title: "What is an MCP Host?"
description: "An MCP host is the application that runs an MCP client. It is where the user interacts with an assistant, and it is responsible for connecting to MCP servers (like Glean MCP server) and exposing those servers' tools to the model."
fetched_at: "2026-09-01T13:29:13.005Z"
---
On this page

An MCP host is the application that runs an MCP client. It is where the user interacts with an assistant, and it is responsible for connecting to MCP servers (like Glean MCP server) and exposing those servers' tools to the model.

## Host vs. Server[​](#host-vs-server "Direct link to Host vs. Server")

### MCP Host

The app that your users run (e.g., a desktop IDE or chat app). It discovers and invokes tools from connected MCP servers.

### MCP Server

Provides capabilities (tools) such as search, chat, and read document. Glean MCP servers are the providers of Glean's permission-aware capabilities.

## How hosts connect to Glean MCP server[​](#how-hosts-connect-to-glean-mcp-server "Direct link to How hosts connect to Glean MCP server")

Hosts differ in connection method and who configures them:

-   **Native HTTP**: Connects directly to Glean MCP server over HTTP.
-   **stdio-only (bridge required)**: Uses local process I/O. To reach remote HTTP servers like Glean, use a bridge (e.g., `mcp-remote`).
-   **Web-based/managed**: No local config; an administrator adds Glean MCP server centrally.

Glean plug-in

Cursor, Claude Code, and Codex support Glean plug-ins for dynamic Skill and tool discovery. You can use a plug-in alongside a standard MCP server connection. For more information, see [Glean plug-in for coding hosts](/administration/platform/mcp/glean-plugin).

## Admin-managed vs. end‑user configuration[​](#admin-managed-vs-enduser-configuration "Direct link to Admin-managed vs. end‑user configuration")

-   **Admin-managed**: An administrator configures Glean MCP server as remote URLs for the organization. Example: ChatGPT managed configuration; Claude for Teams/Enterprise.
-   **End‑user**: Individual users add Glean MCP server in their own app settings. Examples: Cursor, VS Code, Claude Code, Goose, Windsurf (with bridge where required).

## Supported hosts[​](#supported-hosts "Direct link to Supported hosts")

Install

AllUser-installableAdmin-managed

Type

AllCLIDesktopIDEWeb

Search

22 of 22

### Antigravity

IDE

[Vendor documentation](https://antigravity.google/docs/ide/mcp#antigravity-ide)

### Antigravity CLI

CLI

[Vendor documentation](https://antigravity.google/docs/cli-overview)

### ChatGPT

Web

[Glean documentation](/administration/platform/mcp/host-guides/chatgpt)[Vendor documentation](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server)

### Claude Code

CLI

[Vendor documentation](https://code.claude.com/docs/en/mcp)

### Claude for Desktop

Desktop

[Glean documentation](/administration/platform/mcp/host-guides/claude-desktop)[Vendor documentation](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp)

### Claude for Teams/Enterprise

Web

[Vendor documentation](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp)

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

### Cursor Team MCP Servers

Web

[Vendor documentation](https://cursor.com/docs/mcp#team-mcp-distribution)

### Gemini CLI

CLI

[Vendor documentation](https://geminicli.com/docs/tools/mcp-server/)

### Gemini Enterprise

Web

[Glean documentation](/administration/platform/mcp/host-guides/gemini-enterprise-mcp)[Vendor documentation](https://docs.cloud.google.com/gemini/enterprise/docs/connectors/custom-mcp-server/set-up-custom-mcp-server)

### Gemini Agents

Web

[Glean documentation](/administration/platform/mcp/host-guides/gemini-agents)

### Goose

DesktopCLI

[Vendor documentation](https://goose-docs.ai/docs/category/mcp-servers)

### JetBrains AI Assistant

IDE

[Vendor documentation](https://www.jetbrains.com/help/ai-assistant/mcp.html)

### Junie (JetBrains)

IDE

[Vendor documentation](https://junie.jetbrains.com/docs/junie-cli-mcp-configuration.html)

### LibreChat

Web

[Glean documentation](/administration/platform/mcp/host-guides/librechat)[Vendor documentation](https://www.librechat.ai/docs/configuration/librechat_yaml/object_structure/mcp_servers)

### Linear

Web

[Vendor documentation](https://linear.app/docs/mcp)

### Microsoft Copilot Studio

Web

[Glean documentation](/administration/platform/mcp/host-guides/copilot-studio)[Vendor documentation](https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent)

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

This list covers the hosts we've explicitly tested and documented. Glean also works with **any other MCP-compliant client** — in the MCP Configurator, choose **Custom** and use your Glean MCP server URL.

## Choosing a host[​](#choosing-a-host "Direct link to Choosing a host")

-   **Your users’ workflow**: Editors (VS Code, Cursor) vs. chat (Claude Desktop, ChatGPT).
-   **Connection model**: Native HTTP is simplest; stdio-only hosts need a bridge to reach remote servers.
-   **Admin requirements**: If you need central control, pick a managed host; otherwise enable end‑user installs.

## Next steps[​](#next-steps "Direct link to Next steps")

-   Admins: Configure managed hosts in the Host guides, or point users to the MCP Configurator: Navigate to **Settings** → **Install** → **MCP Configurator**
-   End‑users: See Using the Glean MCP Server: [/user-guide/mcp/usage](/user-guide/mcp/usage)
