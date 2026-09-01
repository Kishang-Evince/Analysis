---
url: "https://docs.glean.com/administration/platform/mcp/about"
canonical: "https://docs.glean.com/administration/platform/mcp/about"
title: "About Glean MCP server"
description: "The Model Context Protocol (MCP) is an emerging open-source standard designed to act as a universal interface, enabling AI assistants to securely connect with external data and tools—without requiring custom integrations. Think of it as a \"USB for AI applications\", providing a standard way for large language models (LLMs) to discover and use capabilities in other tools."
fetched_at: "2026-09-01T13:29:12.211Z"
---
On this page

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro) is an emerging open-source standard designed to act as a universal interface, enabling AI assistants to securely connect with external data and tools—without requiring custom integrations. Think of it as a *"USB for AI applications"*, providing a standard way for large language models (LLMs) to discover and use capabilities in other tools.

How Glean's MCP servers connect your tools to AI, bringing your company's full context wherever your AI runs

## MCP architecture[​](#mcp-architecture "Direct link to MCP architecture")

MCP uses a client/server architecture:

-   MCP host application like Claude Desktop, Cursor, or a custom AI app:  
    The AI application a user interacts with. It uses an MCP client to communicate with servers.
-   MCP server like Glean MCP server:  
    Exposes tools that the LLM of the host application can invoke.

## Glean MCP server capabilities[​](#glean-mcp-server-capabilities "Direct link to Glean MCP server capabilities")

A Glean MCP server can expose three kinds of capabilities to connected AI hosts:

-   Glean tools: Glean's own platform tools, such as Search, Chat, Read Document, Code Search, and People.
-   Agents: Glean agents, surfaced as tools that hosts can invoke. See [Agents as tools](/administration/platform/mcp/agents-as-tools).
-   External tools: Everything outside Glean's platform, brought in through the [Glean MCP Gateway](/administration/platform/mcp/mcp-gateway). The gateway stands for anything external, in three flavors:
    -   Custom tools: Read and write tools your team builds and packages in Glean.
    -   External MCP servers: Third-party MCP servers you proxy securely through Glean.
    -   Connector tools: Read and write tools from your connectors.

## Choosing the right Glean interface[​](#choosing-the-right-glean-interface "Direct link to Choosing the right Glean interface")

Glean offers more than one way to retrieve enterprise knowledge. If you are building an application or integration, see [Choosing a retrieval interface](https://developers.glean.com/api-info/client/getting-started/choosing-a-retrieval-interface) on the Glean developer portal for guidance on when to use the REST API versus the Glean MCP tools.

## Glean plug-in for Cursor, Claude Code, and Codex[​](#glean-plug-in-for-cursor-claude-code-and-codex "Direct link to Glean plug-in for Cursor, Claude Code, and Codex")

Glean also provides plug-ins for Cursor, Claude Code, and Codex. The plug-ins discover skills and tools dynamically and run them through Glean's governed gateway.

You can use a plug-in alongside a standard Glean MCP connection. Glean uses the connection best suited to each request.

-   Admin setup: [Glean plug-in for coding hosts](/administration/platform/mcp/glean-plugin)
-   User guide: [Use the Glean plug-in](/user-guide/mcp/glean-plugin)
-   Codex installation: [Glean Plugin for Codex](https://developers.glean.com/guides/mcp/codex)

## Key benefits of Glean MCP integration[​](#key-benefits-of-glean-mcp-integration "Direct link to Key benefits of Glean MCP integration")

### Unified, High-Relevance Search

While individual native MCP servers restrict searches to a single application like Jira or Slack, the Glean MCP server leverages Glean’s unified Knowledge Graph. By querying this centralized graph, it delivers context-aware, permission-enforced results spanning all connected enterprise sources.

### Accessing Enterprise Context

Bring Glean's permission-aware enterprise context into your preferred MCP hosts. Tools like search, chat, and read\_document surface organization-specific content (documents, tickets, people, code) while enforcing user permissions, so users can act with the right context without leaving their workflow.

### Enhanced Security

While MCP's open standard has an evolving security model, Glean's integration is built on its permission-aware Knowledge Graph, enforcing strict user-level access control.

### Ecosystem Compatibility

As an industry standard, MCP reduces vendor lock-in. Glean's approach to MCP makes it a "plug-and-play" component for any compliant AI agent or app.

### Bring Glean to Any App

Developers and power users can access Glean's search, chat, and agents directly in preferred tools such as Cursor, VS Code, Claude Desktop, and ChatGPT — without switching context.

## Common use cases[​](#common-use-cases "Direct link to Common use cases")

### Enterprise Context in AI Tools

Enable permission-aware search and document retrieval within editors and chat apps.

### Developer Workflows

Use Glean context in IDEs (e.g., Cursor, VS Code) for debugging, PR reviews, and code navigation.

### Contextual Q&A

Run Glean Search and Chat inside hosts like Claude Desktop and ChatGPT to answer work-specific questions.

### Supported hosts[​](#supported-hosts "Direct link to Supported hosts")

The following hosts are supported for connecting to Glean MCP server.

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

## MCP configurator[​](#mcp-configurator "Direct link to MCP configurator")

Users can access the MCP Configurator for host-specific setup instructions:

### Access the MCP Configurator

The MCP Configurator provides tailored connection instructions, configuration snippets, and OAuth setup for each supported host application.

To access: Select your **profile icon → Your settings → Install tab → MCP Configurator section**

## Using tools effectively[​](#using-tools-effectively "Direct link to Using tools effectively")

LLMs choose tools based on your prompt and the tool schema of the server. To improve tool selection across hosts:

-   State the data or tool you want explicitly (e.g., "search Glean for …", "fetch the document …").
-   Reference tool-friendly inputs like document links or IDs when you have them.
-   Ask the assistant to explain which tool it plans to use when debugging behavior.

## Authentication[​](#authentication "Direct link to Authentication")

MCP servers support the following authentication methods, in order of preference:

### Glean OAuth Authorization Server

**Recommended**

Glean MCP server prefer using the Glean OAuth Authorization Server with the OAuth 2.1 Authorization Code flow and PKCE. This supports:

-   **Dynamic client registration (DCR)** for MCP hosts that discover and register with Glean at runtime.
-   **Static OAuth clients** that admins create for specific integrations or external MCP servers when DCR is not available.

MCP hosts authenticate users through your existing SSO (Google, Entra ID, Okta, etc.), then receive OAuth tokens from Glean for secure API access. This method **requires** the [Glean OAuth Authorization Server](/administration/oauth/authorization-server) to be enabled.

### Glean API Tokens

**Fallback**

User-scoped Client API tokens can be used when the MCP host doesn't support OAuth or for testing purposes.

Requires scopes: `MCP`, `AGENT`, `SEARCH`, `CHAT`, `DOCUMENTS`, `TOOLS`, and `ENTITIES`.

## Pricing[​](#pricing "Direct link to Pricing")

This feature is subject to usage-based pricing and these supplemental [FlexCredit terms](https://glean.com/enterprise-flex-terms).

## Usage metrics[​](#usage-metrics "Direct link to Usage metrics")

Glean tracks anonymized adoption metrics including:

-   Active user counts (daily, weekly, monthly)
-   Host application breakdown
-   Tool usage frequency

To view your metrics, contact your Glean account team. For a full overview of tracking capabilities and alternative methods to measure MCP usage, see [Usage tracking and analytics](/administration/platform/mcp/analytics).

## Technical support[​](#technical-support "Direct link to Technical support")

-   **Beta**: Support via [Developer Community group](https://community.glean.com) in Gleaniverse
-   **GA**: Support via standard Glean support channels

## Security and privacy[​](#security-and-privacy "Direct link to Security and privacy")

-   User session management: Your Admin can continue to sign a user out of all sessions including those from MCP host applications through the Glean Admin UI.
    
-   Privacy and data protection: Remote MCP servers inherit Glean platform privacy guarantees and are covered under the Data Processing Addendum (DPA) of Glean. All queries enforce user permissions through the Knowledge Graph of Glean.
    

For a detailed security overview covering deployment, authentication, authorization, and monitoring, see [MCP Security](/administration/platform/mcp/security).

## See also[​](#see-also "Direct link to See also")

-   Admin setup overview: [Setting up Glean MCP server](/administration/platform/mcp/enable-mcp-servers)
-   Managed installs:
    -   [ChatGPT](/administration/platform/mcp/host-guides/chatgpt)
    -   [Claude Desktop (Teams/Enterprise)](/administration/platform/mcp/host-guides/claude-desktop)
    -   [Gemini Enterprise MCP](/administration/platform/mcp/host-guides/gemini-enterprise-mcp)
    -   [Gemini Agents](/administration/platform/mcp/host-guides/gemini-agents)
-   Usage tracking: [Usage tracking and analytics](/administration/platform/mcp/analytics)
-   Troubleshooting: [MCP Connectivity](/administration/platform/mcp/troubleshooting)
-   OAuth configuration and token lifecycle: [Glean OAuth Authorization Server](/administration/oauth/authorization-server)
