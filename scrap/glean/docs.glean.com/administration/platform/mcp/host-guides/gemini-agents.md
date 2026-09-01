---
url: "https://docs.glean.com/administration/platform/mcp/host-guides/gemini-agents"
canonical: "https://docs.glean.com/administration/platform/mcp/host-guides/gemini-agents"
title: "Gemini Agents"
description: "Connect Glean Assistant to Gemini Enterprise as a remote agent through the Agent2Agent protocol."
fetched_at: "2026-09-01T13:29:13.016Z"
---
On this page

Gemini Enterprise can connect to Glean Assistant through the Glean A2A server. With this integration, Gemini invokes Glean Assistant as a remote agent instead of calling individual Glean MCP tools.

Every request runs as the signed in Glean user. Glean Assistant respects that user's document permissions and access to Glean Assistant.

## Use A2A in Gemini Enterprise[​](#use-a2a-in-gemini-enterprise "Direct link to Use A2A in Gemini Enterprise")

An administrator can connect Glean Assistant to Gemini Enterprise through the Glean A2A server:

1.  Enable the A2A server in **Admin console → Platform → A2A server**.
2.  Copy the deployment's agent card URL from the A2A Server admin page. The URL ends with `/.well-known/agent-card.json`.
3.  In Gemini Enterprise, register Glean Assistant as a remote agent using the agent card URL.
4.  Complete the Glean OAuth flow when prompted. Each user authorizes the connection individually.
5.  Ask a question in Gemini and confirm that Glean Assistant responds.

For the complete administrator setup, see [Configure the Glean A2A server](/administration/platform/configure-a2a).

## How Gemini Agents differ from Gemini Enterprise MCP[​](#how-gemini-agents-differ-from-gemini-enterprise-mcp "Direct link to How Gemini Agents differ from Gemini Enterprise MCP")

The Glean MCP server exposes tools that Gemini can call, such as search and document retrieval. The Glean A2A server exposes Glean Assistant as a remote agent. Choose [Gemini Enterprise MCP](/administration/platform/mcp/host-guides/gemini-enterprise-mcp) when you want Gemini to call Glean tools directly.

For more information about the server, authentication, permissions, and limitations, see [Glean A2A server](/administration/platform/a2a-server).
