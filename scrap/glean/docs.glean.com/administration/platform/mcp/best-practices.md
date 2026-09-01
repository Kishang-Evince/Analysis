---
url: "https://docs.glean.com/administration/platform/mcp/best-practices"
canonical: "https://docs.glean.com/administration/platform/mcp/best-practices"
title: "MCP server best practices"
description: "Use this guide to design MCP servers that are easy for users to understand and easy for AI hosts to use well. For step-by-step setup instructions, see Create MCP servers."
fetched_at: "2026-09-01T13:29:12.376Z"
---
On this page

Use this guide to design MCP servers that are easy for users to understand and easy for AI hosts to use well. For step-by-step setup instructions, see [Create MCP servers](/administration/platform/mcp/create-mcp-servers).

## What servers should I create?[​](#what-servers-should-i-create "Direct link to What servers should I create?")

Create MCP servers around the job a user needs to do, not around every app your company uses. A purpose-built server gives the host a smaller and more relevant tool set, which helps it choose the right tool and keeps each server easier to explain to users.

The default Glean MCP server is a general knowledge server for your company. Use it for broadly useful tools that help most users find, read, and act on company knowledge. You can also enhance the default server with write tools that apply across the organization, such as tools for creating Google Docs or sending Slack messages.

Create audience-specific servers when a team needs tools that are only useful for that function. For example, an engineering server might include code search and Jira write tools, while a sales server might include Salesforce write tools. If a source or tool requires tighter governance, create a dedicated server with a clear name and only the tools that audience needs.

## What tools should I include in a server?[​](#what-tools-should-i-include-in-a-server "Direct link to What tools should I include in a server?")

Start with Glean tools for company knowledge. Glean search tools use the Knowledge Graph to retrieve relevant, permission-aware context across connected sources, and they typically use fewer tokens than source-specific MCP reads. For more background, see [How Glean Cowork scored on our MCP evaluation](https://www.glean.com/blog/cowork-mcp-eval).

For most servers, include these Glean tools:

-   `search`
-   `chat`
-   `read_document`
-   `employee_search`
-   `user_activity`
-   `memory`

If your server includes `memory`, keep `memory_schema` enabled so hosts can discover available memory categories and fields. For servers used by engineers, also include `code_search`. Add `gmail_search` or `outlook_search` when users need to search their mailbox from the host. Keep the tool set focused; if one server starts mixing unrelated workflows, split it into separate servers.

Add external write tools when they match the audience and purpose of the server. For example, a company-wide server might include tools for creating Google Docs or sending Slack messages. An engineering server might include Jira write tools, and a sales server might include Salesforce write tools.

## When should I include external read tools?[​](#when-should-i-include-external-read-tools "Direct link to When should I include external read tools?")

Prefer Glean read and search tools for most company knowledge workflows. Glean can search across sources, enforce user permissions, return linkable results, and fetch documents with `read_document`.

MCP Gateway

[MCP Gateway](/administration/platform/mcp/mcp-gateway) can expose granular read tools from connectors, remote MCP servers, and custom OpenAPI endpoints. Add those read tools only when Glean's built-in search and read tools don't cover the workflow, because larger tool lists use more context and can make the host model's tool choice less accurate.

External read tools can still be useful when the host needs highly structured queries against a specific system. For example, a workflow might need exact Salesforce fields, Jira issue metadata, or another source-specific query shape that Glean search is not designed to express. In those cases, include a curated set of read tools and keep them scoped to the server's purpose.

## How should I name servers?[​](#how-should-i-name-servers "Direct link to How should I name servers?")

Name each server by its purpose or audience so users can choose the right one in their host application. Names like `Glean - Engineering`, `Glean - Sales`, or `Glean - Company knowledge` are easier to understand than names based on internal implementation details.

Use short, readable server paths such as `engineering`, `sales`, or `company-knowledge`. For details about server names, paths, and URLs, see [Create MCP servers](/administration/platform/mcp/create-mcp-servers#server-urls).

## Which authentication method should I use?[​](#which-authentication-method-should-i-use "Direct link to Which authentication method should I use?")

Use the [Glean OAuth Authorization Server](/administration/oauth/authorization-server) when the host supports OAuth. OAuth gives users the most seamless setup experience and keeps access user-scoped through your existing Glean identity and permission model.

If your organization requires centralized token issuance through your identity provider, you can also use your IdP OAuth authorization server to authorize connections to Glean's MCP server.

Use API tokens only for hosts that cannot support OAuth or for specific unattended flows. For more information, see [Set up Glean MCP server](/administration/platform/mcp/enable-mcp-servers#how-oauth-fits).

## See also[​](#see-also "Direct link to See also")

-   [Create MCP servers](/administration/platform/mcp/create-mcp-servers)
-   [Set up Glean MCP server](/administration/platform/mcp/enable-mcp-servers)
-   [MCP security, data flow, and permissions](/administration/platform/mcp/security)
-   [MCP usage tracking and analytics](/administration/platform/mcp/analytics)
-   [How Glean Cowork scored on our MCP evaluation](https://www.glean.com/blog/cowork-mcp-eval)
-   [Build with Claude - Model Context Protocol](https://docs.claude.com/en/docs/build-with-claude/mcp)
-   [Model Context Protocol documentation](https://modelcontextprotocol.io/)
