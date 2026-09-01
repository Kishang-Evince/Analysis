---
url: "https://docs.glean.com/administration/platform/mcp/enable-mcp-servers"
canonical: "https://docs.glean.com/administration/platform/mcp/enable-mcp-servers"
title: "Set up Glean MCP server"
description: "The Glean MCP server is fully managed and built into your Glean instance. Glean enables the Glean MCP server for customers by default with OAuth, so users can access Glean in supported AI tools without an admin enabling the server manually."
fetched_at: "2026-09-01T13:29:12.587Z"
---
On this page

The **Glean MCP server** is fully managed and built into your Glean instance. Glean enables the Glean MCP server for customers by default with OAuth, so users can access Glean in supported AI tools without an admin enabling the server manually.

## What's enabled by default[​](#whats-enabled-by-default "Direct link to What's enabled by default")

Along with the MCP server, Glean turns on the supporting pieces needed to connect MCP hosts:

-   **Glean OAuth authorization server** — provides OAuth-based authentication for MCP, so supported AI tools can connect without manual OAuth setup.
-   **Approved-application greenlisting** — Dynamic Client Registration (DCR) is restricted to a Glean-managed list of vetted client applications, so only approved MCP hosts can register. See [Dynamic Client Registration](/administration/oauth/dynamic-client-registration) and the [MCP security overview](/administration/platform/mcp/security#client-identity-binding) for details.

This default-on configuration applies to customers who haven't already enabled MCP, and to all new customers. Customers who had previously configured MCP or their own OAuth keep their existing settings.

Glean plug-in for coding hosts

Glean also provides plug-ins for dynamic Skill and tool discovery in Cursor, Claude Code, and Codex. You can use a plug-in alongside a standard MCP server connection. See [Glean plug-in for coding hosts](/administration/platform/mcp/glean-plugin).

## Verify and manage OAuth[​](#verify-and-manage-oauth "Direct link to Verify and manage OAuth")

The Glean OAuth authorization server is enabled by default. To review or change it, go to **Admin Console → Users & permissions → Third-party access (OAuth)**.

![Glean OAuth Authorization Server](/img/administration/mcp/oauth-server.png)

### How OAuth fits[​](#how-oauth-fits "Direct link to How OAuth fits")

The **Glean OAuth authorization server** provides OAuth‑based authentication for MCP:

-   **Dynamic clients (DCR)** – MCP hosts (such as Cursor, Claude, VS Code) discover Glean at runtime and register themselves using OAuth Dynamic Client Registration.
-   **Static OAuth clients** – Admin‑managed OAuth applications with stable client IDs and redirect URIs, used for specific integrations or external MCP servers that require a fixed client configuration.

You can view and manage these OAuth clients in **Admin Console → Users & permissions → Third‑party access (OAuth)**.  
For details, see [Glean OAuth Authorization Server](/administration/oauth/authorization-server).

## Share the end-user guide[​](#share-the-end-user-guide "Direct link to Share the end-user guide")

Provide users the end-user guide for connecting from their host application: [Using the Glean MCP Server](/user-guide/mcp/usage).

## Next steps[​](#next-steps "Direct link to Next steps")

From here, you can:

[

### Create Custom Servers

Design MCP servers with specific tools for different use cases and teams.







](/administration/platform/mcp/create-mcp-servers)[

### Add Agents as Tools

Extend capabilities beyond built-in tools by exposing your Glean Agents as MCP tools.







](/administration/platform/mcp/agents-as-tools)[

### Best Practices

Review optimization strategies and configuration recommendations for MCP servers.







](/administration/platform/mcp/best-practices)
