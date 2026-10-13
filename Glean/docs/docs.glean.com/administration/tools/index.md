---
url: "https://docs.glean.com/administration/tools/"
canonical: "https://docs.glean.com/administration/tools/"
title: "Tools overview"
description: "Configure and manage tools in the Admin console so Glean Assistant and agents can perform read and write operations in connected connectors."
fetched_at: "2026-10-13T08:49:31.028Z"
---
On this page

Tools enable Glean Assistant and agents to perform operations such as creating tickets, posting comments, searching records, and updating fields directly within your connected connectors on behalf of users.

After configured, tools are available across these surfaces:

-   Assistant: Users invoke tools conversationally, for example, typing *Create a Jira ticket for this*.
-   Agents: Tools serve as functional steps within multi-step agent workflows.
-   Glean MCP Server: Tools are exposed in Glean MCP servers for all or some teammates.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To configure and manage tools, ensure you have the following:

-   **Admin console** access: You must have access to the Glean **Admin console**. For an overview, see [About the Admin console](/administration/about).
-   Required administrator role: You must be assigned either the **Admin** or **Setup Admin** role. For detailed role capabilities, see [Administrator roles](/administration/identity/roles/admin-roles).
-   Connected connectors: For tools that extend an existing indexed connector, first connect and verify the underlying connector in Glean. Catalog MCP-only integrations establish their tool connection during connector setup.

## Tools console overview[​](#tools-console-overview "Direct link to Tools console overview")

Use **Admin console → Connectors → Add connector** to discover and set up catalog MCP integrations. See [Set up tools and MCP integrations from Connectors](/connectors/configure-tools-in-connector/config-tools-mcp-from-connector) to choose an entry. Use **Admin console → Platform → Tools** to manage tools, continue an existing MCP configuration, or import a custom server that isn't in the catalog.

The Tools dashboard has three primary areas:

-   **Enabled tools:** Displays live tools available to your users, including their connection status and enabled surfaces (**Assistant**, **Agents**, or **Glean MCP Server**).
-   **Add tool:** A catalog of pre-built, native tools for supported external connectors.
-   **Import from MCP server:** A utility to connect a custom Model Context Protocol (MCP) server and import custom tools not covered by native tools.

## Understand tools[​](#understand-tools "Direct link to Understand tools")

Tools are grouped by connector. For example, the *Jira Extension Tools* bundle search, create, edit, comment, and Jira Service Management (JSM) operations under a single connection framework.

Each tool grouping provides granular administrative control, including:

-   An independent OAuth connection to the target connector.
-   Dedicated activation toggles for Assistant and Agents availability.
-   Per-tool controls to enable or disable specific operational endpoints.
-   Visibility scoping to restrict which users or groups can invoke the tools.

After you add tools, authenticate them, choose whether they are available in Assistant, Agents, or both, then configure per-tool controls and visibility.

## Setup guides by tool[​](#setup-guides-by-tool "Direct link to Setup guides by tool")

To find and configure a specific tool, browse the [Set up tools](/administration/tools/setup-tools) catalog. Search by name or filter by category (**By Glean**, **By connector**, or **Custom tools**), then open a guide to connect and configure the tool.

note

For custom or proprietary integrations, see [Importing tools from an MCP server](/administration/tools/connect-remote-mcp-servers-to-glean).

## Advanced configuration topics[​](#advanced-configuration-topics "Direct link to Advanced configuration topics")

After adding tools, optimize their deployment using these detailed configuration guides:

[

### Enabling tools for Chat vs Agents

Control which interface surface can access specific tools.







](/administration/tools/managing-tools/tools-chat-vs-agents)[

### Per-tool enable/disable

Turn off specific risk-heavy operations, such as delete or archive.







](/administration/tools/managing-tools/per-tool-enable-disable)[

### Tool visibility scoping

Restrict tool availability to specific users, teams, or departments.







](/administration/tools/managing-tools/tool-visibility-scoping)[

### Run tools without user confirmation

Allow background agents to execute write tools autonomously.







](/administration/tools/managing-tools/run-without-user-confirmation)[

### Managing tool access

Restrict which agent builders can provision specific tools.







](/administration/tools/managing-tools/managing-role-based-access-tools)[

### Allowing in-line execution of write tools

Remove confirmation steps for a seamless user experience in interactive agents.







](/administration/tools/managing-tools/allowing-in-line-execution-of-write-tools)[

### Custom MCP headers

Request custom HTTP headers for third-party MCP servers and API gateways.







](/administration/tools/mcp-custom-headers)
