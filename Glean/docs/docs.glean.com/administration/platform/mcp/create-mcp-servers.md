---
url: "https://docs.glean.com/administration/platform/mcp/create-mcp-servers"
canonical: "https://docs.glean.com/administration/platform/mcp/create-mcp-servers"
title: "Create and manage MCP servers"
description: "Create custom MCP servers, each with its own URL and configured set of tools."
fetched_at: "2026-10-13T08:49:25.707Z"
---
On this page

Create custom MCP servers tailored to specific use cases. Each server has its own URL and can be configured with a specific set of tools.

## Default MCP server[​](#default-mcp-server "Direct link to Default MCP server")

Glean automatically provides a default MCP server for new deployments and deployments that haven't overridden Glean's suggested default server. The default server includes the **Glean managed toolset**:

-   `search`
-   `read_document`
-   `code_search`
-   `employee_search`
-   `user_activity`
-   `memory`
-   `memory_schema`
-   `web_search`

Glean owns this toolset and updates it automatically, so you can't remove its tools from the default server. Glean serves each tool only when the deployment supports it. For example, `code_search` requires at least one connected code repository. See [View available tools](#view-available-tools).

The default server can search and read Library content, including Canvas, through `search` and `read_document`. To upload new content to the Library, update an existing artifact or share one from an MCP host. Then, add the [Artifacts](/administration/platform/mcp/built-in-glean-tools#artifacts) managed toolset.

You can customize the default server with broadly useful write tools, such as tools for creating Google Docs or sending Slack messages. Create additional servers when specific teams need their own tools, such as code search and Jira tools for engineering, or Salesforce tools for sales.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you create or manage MCP servers, complete the following prerequisites:

-   Turn on the Glean MCP server for your workspace. See [Set up Glean MCP server](/administration/platform/mcp/enable-mcp-servers).
-   Sign in as an Admin, or as a user with the MCP Server Moderator role.

Users with the MCP Server Moderator and Admin roles can create and manage individual Glean MCP servers. The MCP Server Moderator role does not grant permission to manage third party MCP host connections. Glean requires the Admin role to turn on MCP servers for your workspace. See [MCP Server Moderator](/administration/identity/roles/user-roles#mcp-server-moderator).

## Create a MCP server[​](#create-a-mcp-server "Direct link to Create a MCP server")

Design each MCP server for a single, specific purpose. Some hosts cap the number of tools available per server, so add the **Dynamic skills and tools** managed toolset to let hosts load tools on demand instead of enabling a large fixed set. See [Dynamic skills and tools](/administration/platform/mcp/built-in-glean-tools#dynamic-skills-and-tools).

Use these examples as starting points:

-   **Company knowledge**: `search`, `chat`, `read_document`, `employee_search`, `user_activity`, `memory`, `memory_schema`
-   **Engineering**: `search`, `read_document`, `code_search`, `employee_search`, Jira write tools
-   **Sales**: `search`, `chat`, `read_document`, `employee_search`, Salesforce write tools

Avoid creating one server with all tools enabled. One server with all tools enabled can overwhelm the LLM in the host application, make tool selection less accurate, and hit host-specific tool limits.

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
-   Managed toolsets, which are Glean-maintained sets of built-in tools, such as **Dynamic skills and tools**, **Memory**, **Artifacts**, and **Image generation**

Glean preselects a starting set of tools for a new server: `chat`, `search`, `read_document`, `code_search`, `employee_search`, `user_activity`, and the **Artifacts** and **Image generation** managed toolsets. Clear the tools that don't fit the server's purpose.

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

For more design guidance, see [MCP server best practices](/administration/platform/mcp/best-practices).

### View available tools[​](#view-available-tools "Direct link to View available tools")

The tool picker shows only the tools your deployment supports, so your list may be shorter than the full set of [built-in Glean tools](/administration/platform/mcp/built-in-glean-tools). Glean also checks availability again when it serves a tool, so a server can serve fewer tools than it lists.

If a tool you expect is missing, confirm its requirements using this table. Contact your Glean representative if requirements are met but the tool is still missing.

| Tool | Requirement |
| --- | --- |
| `chat` | Glean Assistant enabled for the user |
| `code_search` | At least one connected code repository |
| `gmail_search`, `outlook_search` | The matching connector, plus federated search |
| `memory`, `memory_schema` | Memory or personalization enabled for the user |
| `knowledge_graph_query`, `knowledge_graph_schema` | Knowledge Graph setup complete, plus Knowledge Graph access for the user |
| `data_analysis` | An eligible BI tool or data warehouse for the user |
| `gemini_web_search` | Gemini web search setup complete |
| Artifacts, Image generation | The matching managed toolset setting. `share_artifact` also requires [Chat Sharing](/administration/assistant/features/chat-sharing), and image tools require image generation eligibility |
| Dynamic skills and tools | Skill tools enabled for the deployment |

## Manage existing MCP servers[​](#manage-existing-mcp-servers "Direct link to Manage existing MCP servers")

To modify an existing server:

1.  Go to **Admin console → Platform → Glean MCP servers** and select the **MCP servers** tab.
2.  Click on the server name to view its configuration
3.  Make your changes, such as adding tools, removing tools, or renaming the server.
4.  Changes take effect immediately for new connections.

note

**Existing connections:** Users with active MCP connections may need to refresh or reconnect their host application to see updated tool availability.

## Search for a MCP server[​](#search-for-a-mcp-server "Direct link to Search for a MCP server")

When your deployment has many MCP servers, search with **Search by server name** box in the **MCP servers** tab of **Admin console → Platform → Glean MCP server** and filter the list by name.

![Search by server name box above the MCP servers list in the Admin console](/img/administration/mcp/mcp-servers-search.png)

## Add agents as tools[​](#add-agents-as-tools "Direct link to Add agents as tools")

Add a Glean agent to a server as a tool, so any connected MCP host can invoke it. Agents let you offer company-specific capabilities that go beyond search and retrieval.

See the following example use cases:

### PR review agent

Analyze pull requests and provide structured feedback on code quality, patterns, and best practices.

### Competitive analysis

Research competitors and synthesize insights from internal documents, market data, and customer feedback.

### Onboarding

Help new hires find relevant docs, team contacts, and setup guides tailored to their role.

See the [Agents as tools](/administration/platform/mcp/agents-as-tools) guide for:

-   How to add an agent as a tool
-   Agent constraints and limitations
-   Best practices for agent design

## Find MCP server URLs[​](#find-mcp-server-urls "Direct link to Find MCP server URLs")

This URL is displayed in the configuration form (read-only) after you enter the server path. Share this URL with users who need to connect to this specific server from their MCP host applications.

Each server has a unique URL that is automatically generated based on the server path you provide:

```
https://{your-backend-domain}/mcp/[server-path]
```

Find your backend domain at [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**. It typically follows the pattern `company-be.glean.com`, but may be different if your organization uses a custom domain.

For example, a server with path `engineering` would automatically generate a URL like:

```
https://acme-be.glean.com/mcp/engineering
```

## See also[​](#see-also "Direct link to See also")

-   [Built-in Glean tools](/administration/platform/mcp/built-in-glean-tools) for the tools and managed toolsets you can add to a server
-   [Configure agents as tools](/administration/platform/mcp/agents-as-tools) to add custom capabilities to your servers
-   [Review MCP server best practices](/administration/platform/mcp/best-practices) for optimal configuration
-   Share the [end-user guide](/user-guide/mcp/usage) with your team
