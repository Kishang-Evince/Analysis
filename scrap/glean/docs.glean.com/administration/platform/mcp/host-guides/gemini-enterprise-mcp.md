---
url: "https://docs.glean.com/administration/platform/mcp/host-guides/gemini-enterprise-mcp"
canonical: "https://docs.glean.com/administration/platform/mcp/host-guides/gemini-enterprise-mcp"
title: "Gemini Enterprise MCP"
description: "Connect the Glean MCP server to Gemini Enterprise so users can ask questions grounded in company knowledge from Glean."
fetched_at: "2026-09-01T13:29:13.027Z"
---
On this page

Gemini Enterprise can connect to the Glean MCP server through a custom MCP server data store. Gemini uses Glean's search and knowledge tools to answer work questions, and Glean applies each user's permissions to every result.

## How Gemini Enterprise MCP works[​](#how-gemini-enterprise-mcp-works "Direct link to How Gemini Enterprise MCP works")

You register the Glean MCP server in Gemini Enterprise as a custom MCP server data store. When a user asks a work question, Gemini calls the Glean MCP server, authenticates the user with OAuth, and uses the returned context to answer.

The recommended default tool set is read only. It can search and synthesize company knowledge but does not create, update, or delete records in connected systems. If you enable write capable tools on the selected MCP server path, Gemini can surface those actions as well.

## What users get[​](#what-users-get "Direct link to What users get")

-   Ask Gemini questions that need company context and get answers grounded in Glean.
-   Receive answers with citations to the underlying internal sources.
-   Use the Glean tools enabled on the selected MCP server path as Gemini actions.
-   Receive results that reflect the user's existing Glean permissions.

## Set up Gemini Enterprise MCP[​](#set-up-gemini-enterprise-mcp "Direct link to Set up Gemini Enterprise MCP")

Before you start, gather the access, values, and platform requirements in [Prerequisites for Glean in Gemini chat](/administration/platform/embedded-integrations/glean-in-gemini-chat/prerequisites).

Follow the [Glean in Gemini chat installation guide](/administration/platform/embedded-integrations/glean-in-gemini-chat/installation-guide) to:

1.  Find the Glean MCP server URL and confirm the tools you want to expose.
2.  Create the Gemini OAuth client in Glean.
3.  Create the custom MCP server data store in Gemini Enterprise.
4.  Connect the data store to a Gemini app and publish the app.
5.  Share the app with users so they can authorize Glean and ask questions.

For the user authorization flow, see [Use Glean in Gemini chat](/administration/platform/embedded-integrations/glean-in-gemini-chat/get-started-user).

## Gemini MCP and Gemini Agents[​](#gemini-mcp-and-gemini-agents "Direct link to Gemini MCP and Gemini Agents")

Gemini Enterprise also supports connecting to Glean through A2A. With A2A, Gemini invokes Glean Assistant as a remote agent instead of calling individual Glean tools. See [Gemini Agents](/administration/platform/mcp/host-guides/gemini-agents) for that setup.
