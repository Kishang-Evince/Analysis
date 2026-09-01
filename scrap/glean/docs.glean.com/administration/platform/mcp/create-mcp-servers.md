---
url: "https://docs.glean.com/administration/platform/mcp/create-mcp-servers"
canonical: "https://docs.glean.com/administration/platform/mcp/create-mcp-servers"
title: "Create MCP servers"
description: "Once you've enabled Glean MCP server, you can create custom MCP servers tailored to specific use cases. Each server has its own URL and can be configured with a specific set of tools."
fetched_at: "2026-09-01T13:29:12.434Z"
---
On this page

Once you've [enabled Glean MCP server](/administration/platform/mcp/enable-mcp-servers), you can create custom MCP servers tailored to specific use cases. Each server has its own URL and can be configured with a specific set of tools.

note

Users with the **MCP Server Moderator** role can also create and manage individual Glean MCP servers here. Admins can manage these servers as well. This role does not grant permission to manage third party MCP host connections. Enabling MCP servers for your workspace still requires an Admin. See [MCP Server Moderator](/administration/identity/roles/user-roles#mcp-server-moderator).

## Default MCP server[​](#default-mcp-server "Direct link to Default MCP server")

Glean automatically provides a default MCP server for new deployments and deployments that haven't overridden Glean's suggested default server. The default server is designed as a general knowledge server for your company and includes the following tools:

-   `search`
-   `chat`
-   `read_document`
-   `employee_search`
-   `user_activity`
-   `memory`
-   `memory_schema`

You can customize the default server with broadly useful write tools, such as tools for creating Google Docs or sending Slack messages. Create additional servers when specific teams need their own tools, such as code search and Jira tools for engineering, or Salesforce tools for sales.

## Create a new MCP server[​](#create-a-new-mcp-server "Direct link to Create a new MCP server")

1

Navigate to MCP servers

Go to **Admin console → Platform → Glean MCP servers**, select the **MCP servers** tab, and click **Create server**.

![MCP servers admin page](/img/administration/mcp/create-mcp-server.png)

2

Configure server details

Fill in the server configuration form:

![MCP server configuration form](/img/administration/mcp/mcp-server-details.png)

**Server name:** Choose a short, user-friendly name to easily identify this server. Use descriptive names that indicate the server's purpose, such as "Engineering tools" or "Product research". This name is visible to users when they connect MCP host applications.

**Server path:** Define a simple path identifier for the server.

-   Use simple names like `sales` or `engineering-tools`
-   Avoid special characters or spaces

**Server URL:** This is automatically generated based on your path and cannot be edited.

-   Format: `https://{your-backend-domain}/mcp/[your-path]`. Find your backend domain at [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**. It typically follows the pattern `company-be.glean.com`, but may be different if your organization uses a custom domain.

3

Select tools

Choose which built-in Glean tools, agents, and managed toolsets to enable for this server. You can add:

-   Built-in Glean tools, such as search, chat, and code search
-   Glean agents as tools
-   The **Dynamic skills and tools** managed toolset, which adds `find_skills`, `read_skill_files`, and `run_tool`

See the sections below for details on available tools.

4

Select external tools

After you add connectors, remote MCP servers, or custom OpenAPI endpoints to Glean, you can add their external tools to your Glean MCP servers.

![External tools selection list](/img/administration/mcp/external-write-tools.png)

We recommend adding only external write tools that match the server's audience and purpose. For guidance, see [MCP server best practices](/administration/platform/mcp/best-practices).

If you need to add external read tools for a specific workflow, click **Show read tools** and add the read tools you want to include.

5

Enable the server

Toggle the server status to **Enabled** to make it active and available for connections.

## Server design best practices[​](#server-design-best-practices "Direct link to Server design best practices")

tip

Design each server for a single, specific purpose. Keep enabled tools to the minimum needed because some hosts cap the number of tools available per server.

### Examples of well-designed servers[​](#examples-of-well-designed-servers "Direct link to Examples of well-designed servers")

Use these examples as starting points:

-   **Company knowledge**: `search`, `chat`, `read_document`, `employee_search`, `user_activity`, `memory`, `memory_schema`
-   **Engineering**: `search`, `read_document`, `code_search`, `employee_search`, Jira write tools
-   **Sales**: `search`, `chat`, `read_document`, `employee_search`, Salesforce write tools

Avoid creating one server with all tools enabled. This can:

-   Overwhelm the LLM in the host application
-   Make tool selection less accurate
-   Hit host-specific tool limits

For more design guidance, see [MCP server best practices](/administration/platform/mcp/best-practices).

## Built-in tools[​](#built-in-tools "Direct link to Built-in tools")

Glean provides the following built-in tools that can be added to any MCP server. You can mix and match any combination of these tools based on your server's purpose:

### Search

Search across your entire knowledge base with permission-aware results.

**Tool name:** `search`

### Chat

Interactive conversations with Glean's AI assistant.

**Tool name:** `chat`

### Memory

Read, add, update, and delete user memories and personalization.

**Tool name:** `memory`

### Memory Schema

Discover available memory categories, payload schemas, storage limits, and filterable fields.

**Tool name:** `memory_schema`

### Read Document

Retrieve specific documents by ID or URL.

**Tool name:** `read_document`

### Code Search

Search your codebase and repositories.

**Tool name:** `code_search`

### Employee Search

Find people and expertise in your organization.

**Tool name:** `employee_search`

### User Activity

Retrieve the user's recent Glean activity to help summarize work, prepare status updates, or recover recently used documents.

**Tool name:** `user_activity`

### Gmail Search

Search Gmail messages and threads.

**Tool name:** `gmail_search`

### Meeting Lookup

Find meeting recordings and notes.

**Tool name:** `meeting_lookup`

### Outlook Search

Search Outlook emails and calendar.

**Tool name:** `outlook_search`

## Dynamic skills and tools[​](#dynamic-skills-and-tools "Direct link to Dynamic skills and tools")

The **Dynamic skills and tools** managed toolset (a Glean-managed bundle of MCP tools) lets a connected MCP host discover Glean Skills and call connected tools when it needs them. It keeps the host from loading every connected tool at the start of a session. The toolset includes:

-   `find_skills` finds Glean Skills that match the host's request.
-   `read_skill_files` reads the files for a Skill after the host finds it.
-   `run_tool` runs a connected tool selected by the Skill.

Select this toolset when users of the server need access to Glean Skills through MCP. Glean does not add it to every server automatically. Add it to each server that needs it.

## Adding agents as tools[​](#adding-agents-as-tools "Direct link to Adding agents as tools")

### Unlock Custom AI Capabilities

Transform your Glean Agents into reusable MCP tools that can be invoked from any MCP host application. This powerful feature lets you create specialized, company-specific capabilities that extend beyond standard search and retrieval.

**Example use cases:**

### PR Review Agent

Analyze pull requests and provide structured feedback on code quality, patterns, and best practices

### Competitive Analysis

Research competitors and synthesize insights from internal documents, market data, and customer feedback

### Onboarding Glean

Help new hires find relevant docs, team contacts, and setup guides tailored to their role

**Getting started:**

See the [Agents as tools](/administration/platform/mcp/agents-as-tools) guide for:

-   How to add an agent as a tool
-   Agent constraints and limitations
-   Best practices for agent design

## Search for a server[​](#search-for-a-server "Direct link to Search for a server")

When your deployment has many MCP servers, search with **Search by server name** box in the **MCP servers** tab of **Admin console → Platform → Glean MCP server** and filter the list by name.

![Search by server name box above the MCP servers list in the admin console](/img/administration/mcp/mcp-servers-search.png)

## Managing existing servers[​](#managing-existing-servers "Direct link to Managing existing servers")

To modify an existing server:

1.  Go to **Admin console → Platform → Glean MCP servers** and select the **MCP servers** tab.
2.  Click on the server name to view its configuration
3.  Make your changes, such as adding tools, removing tools, or renaming the server.
4.  Changes take effect immediately for new connections.

note

**Existing connections:** Users with active MCP connections may need to refresh or reconnect their host application to see updated tool availability.

## Deprecated tools[​](#deprecated-tools "Direct link to Deprecated tools")

Glean flags tools whose backing capability has been deprecated so you can move to a supported replacement. A deprecated tool stays visible in the server configuration and remains available to connected host applications, so it keeps working until you replace it. The deprecation flag and replacement guidance appear in the admin console.

When a server includes a deprecated tool, the configuration shows a warning banner: "This MCP server includes deprecated tools. Use replacement tools when possible." Each deprecated tool is listed with its replacement, or with "No replacement tool listed" when none is available.

In the tool list, a deprecated tool shows a **Deprecated** badge. Hover over the badge to see the suggested replacement.

When you add external tools, Glean hides deprecated tools from the picker by default. To review them, turn on **Show deprecated tools**. Glean turns this on for you when the server you're editing already includes a deprecated tool, so you can find it and swap in the replacement.

## Server URLs[​](#server-urls "Direct link to Server URLs")

Each server has a unique URL that is automatically generated based on the server path you provide:

```
https://{your-backend-domain}/mcp/[server-path]
```

Find your backend domain at [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**. It typically follows the pattern `company-be.glean.com`, but may be different if your organization uses a custom domain.

For example, a server with path `engineering` would automatically generate a URL like:

```
https://acme-be.glean.com/mcp/engineering
```

This URL is displayed in the configuration form (read-only) after you enter the server path. Share this URL with users who need to connect to this specific server from their MCP host applications.

## Next steps[​](#next-steps "Direct link to Next steps")

-   [Configure agents as tools](/administration/platform/mcp/agents-as-tools) to add custom capabilities to your servers
-   [Review MCP server best practices](/administration/platform/mcp/best-practices) for optimal configuration
-   Share the [end-user guide](/user-guide/mcp/usage) with your team
