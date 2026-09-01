---
url: "https://docs.glean.com/administration/platform/mcp/host-guides/claude-desktop"
canonical: "https://docs.glean.com/administration/platform/mcp/host-guides/claude-desktop"
title: "Claude Desktop (Teams/Enterprise)"
description: "This guide is for administrators to configure Anthropic's Claude Desktop (with Teams/Enterprise plans) to connect to your company's Glean MCP server."
fetched_at: "2026-09-01T13:29:12.751Z"
---
On this page

This guide is for administrators to configure Anthropic's Claude Desktop (with Teams/Enterprise plans) to connect to your company's Glean MCP server.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean OAuth authorization server enabled (Admin Console → Users & permissions → Third-party access (OAuth))
-   MCP server enabled (**Admin Console → Platform → Glean MCP servers**)
-   Firewall configured to allow connections from Anthropic to your Glean instance (see [Anthropic's IP addresses documentation](https://platform.claude.com/docs/en/api/ip-addresses))

## Add Glean MCP Server to Claude Desktop[​](#add-glean-mcp-server-to-claude-desktop "Direct link to Add Glean MCP Server to Claude Desktop")

1

Open your Anthropic admin console

Navigate to the place where you manage Claude Desktop integrations for your organization.

![Claude Admin Console](/img/administration/mcp/claude/admin-console.png)

2

Add remote MCP server URL

Provide your Glean MCP server remote URL from your instance.

![Add Remote MCP Server](/img/administration/mcp/claude/connector-add.png)

3

Authenticate with Glean OAuth

Complete the sign-in flow.

![OAuth Consent](/img/administration/mcp/oauth-consent.png)

4

Validate tools

Run a quick search to confirm connectivity and verify the available tools.

## Claude Desktop MCP Constraints[​](#claude-desktop-mcp-constraints "Direct link to Claude Desktop MCP Constraints")

-   Admin-managed install: Configuration is performed at the organization level in the Anthropic admin console
-   HTTP transport: Supports remote MCP servers over HTTP
-   Tools: Full support for search, chat, and read\_document
-   Authentication: OAuth 2.1 via Glean's authorization server

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Connection Issues[​](#connection-issues "Direct link to Connection Issues")

If users report connection failures:

1.  Verify the MCP server URL is correct
2.  Ensure OAuth authentication completed successfully
3.  Check that users have active Glean accounts with appropriate permissions

### Tool Availability[​](#tool-availability "Direct link to Tool Availability")

If tools aren't appearing in Claude Desktop:

1.  Confirm the server is enabled in Admin Console
2.  Verify tools are enabled on the specific server configuration
3.  Have users restart Claude Desktop to refresh the connection

* * *

-   For generic auth/network issues, see [Troubleshooting MCP Connectivity](/administration/platform/mcp/troubleshooting)

## See also[​](#see-also "Direct link to See also")

-   [End-user configuration](/user-guide/mcp/end-user-configuration) - How individual users self-configure their own connection to Glean MCP server
