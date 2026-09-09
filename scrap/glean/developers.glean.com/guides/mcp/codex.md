---
url: "https://developers.glean.com/guides/mcp/codex"
canonical: "https://developers.glean.com/guides/mcp/codex"
title: "Glean Plugin for Codex | Glean Developer"
description: "Install the official Glean plugin for Codex - enterprise knowledge, search, people, and code in your terminal."
fetched_at: "2026-09-01T13:23:02.537Z"
---
Official Glean plugin

×Codex

# Glean plugin for Codex

You use Codex. Glean brings the enterprise context.

Installation

1

Get your Glean MCP server details

The plugin requires a Glean MCP connection. Open the Glean MCP configurator to find your organization's server URL and server name - you'll use both in the last step.

[Open MCP Configurator](https://app.glean.com/settings/install?mcpConfigure=true&mcpHost=codex)

2

Add the Glean marketplace and install the plugin

Run these commands in your terminal to install the Glean enterprise-knowledge plugin.

Add the Glean marketplace

codex plugin marketplace add gleanwork/codex-plugins

Install the plugin

codex plugin add glean@glean-codex-plugins

3

Connect the Glean MCP server

Before starting Codex, connect the MCP server - substitute the server URL and name from step 1. Then start a new Codex task so the bundled skills and MCP tools are available.

Connect and sign in

codex mcp add glean --url <server-url>/mcp/<server-name>
codex mcp login glean
