---
url: "https://docs.glean.com/administration/platform/mcp/troubleshooting"
canonical: "https://docs.glean.com/administration/platform/mcp/troubleshooting"
title: "Troubleshoot MCP Connectivity"
description: "This guide provides troubleshooting steps for known issues when connecting to Glean MCP server."
fetched_at: "2026-09-01T13:29:13.358Z"
---
On this page

This guide provides troubleshooting steps for known issues when connecting to Glean MCP server.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before troubleshooting, verify:

1.  **MCP Server enabled**: **Admin Console → Platform → Glean MCP servers**
2.  **OAuth Server enabled**: **Admin Console → Users & permissions → Third-party access (OAuth)**
3.  **Correct instance name**: Found in **Admin Console → About Glean**
4.  **User has Glean access**: Active account with appropriate permissions

## Known Issues[​](#known-issues "Direct link to Known Issues")

### ChatGPT[​](#chatgpt "Direct link to ChatGPT")

See host-specific troubleshooting: [ChatGPT](/administration/platform/mcp/host-guides/chatgpt#troubleshooting)

### Glean plug-in for Cursor, Claude Code, and Codex[​](#glean-plug-in-for-cursor-claude-code-and-codex "Direct link to Glean plug-in for Cursor, Claude Code, and Codex")

For marketplace installation, authentication, tool availability, and host reload issues, see [Troubleshoot Glean plug-in deployment](/administration/platform/mcp/troubleshoot-glean-plugin) and [Troubleshoot the Glean plug-in](/user-guide/mcp/troubleshoot-glean-plugin).

## General Setup Requirements[​](#general-setup-requirements "Direct link to General Setup Requirements")

### Authentication[​](#authentication "Direct link to Authentication")

-   OAuth server must be enabled (**Admin Console → Users & permissions → Third-party access (OAuth)**)
-   User must have active Glean account with appropriate permissions
-   For API tokens: Use scopes MCP, AGENT, SEARCH, CHAT, DOCUMENTS, TOOLS, ENTITIES

### Network[​](#network "Direct link to Network")

-   Firewall must allow HTTPS traffic to `*.glean.com`
-   Check proxy settings if behind corporate firewall

### Host-Specific Configuration[​](#host-specific-configuration "Direct link to Host-Specific Configuration")

-   Refer to the MCP Configurator for user-facing host setup instructions: Navigate to **Settings** → **Install** → **MCP Configurator**
-   Conceptual overview: [What is an MCP Host?](/administration/platform/mcp/host-guides/what-is-a-host)

## Support[​](#support "Direct link to Support")

**During Beta:**

-   Post in the [Glean developer community](https://community.glean.com/groups/) on Gleaniverse
-   Include: Host application, error messages, reproduction steps

**Resources:**

-   MCP Configurator - Navigate to **Settings** → **Install** → **MCP Configurator**
-   [Setting up Glean MCP server](/administration/platform/mcp/enable-mcp-servers) - Initial setup guide
