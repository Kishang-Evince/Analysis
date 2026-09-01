---
url: "https://developers.glean.com/guides/mcp/claude-code"
canonical: "https://developers.glean.com/guides/mcp/claude-code"
title: "Glean Plugin for Claude Code | Glean Developer"
description: "Install the official Glean plugin for Claude Code — enterprise knowledge as native skills in your terminal."
fetched_at: "2026-09-01T13:23:02.510Z"
---
Official Glean plugin

×

# Glean plugin for Claude Code

You use Claude Code. Glean brings the enterprise context.

Installation

1

Set up the Glean MCP Server

The plugins require a Glean MCP connection. Use the Glean configurator to connect Claude Code to your organization's Glean instance. Authentication uses Glean's OAuth server where enabled, or a Glean API token as a fallback.

[Open MCP Configurator](https://app.glean.com/settings/install?mcpConfigure=true&mcpHost=claude-code)

2

Add the Glean marketplace and install the plugin

Run these commands inside Claude Code to install the Glean enterprise-knowledge plugin. Its skills — search, code exploration, people, meetings, onboarding, productivity — auto-trigger by task.

Add the Glean marketplace

/plugin marketplace add gleanwork/claude-plugins

Install the plugin

/plugin install glean@glean-plugins
