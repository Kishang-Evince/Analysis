---
url: "https://docs.glean.com/docs-mcp"
canonical: "https://docs.glean.com/docs-mcp"
title: "Glean Docs MCP Server"
description: "Connect AI coding assistants to Glean documentation using the Model Context Protocol (MCP)."
fetched_at: "2026-09-01T13:29:48.905Z"
---
On this page

Use this MCP server to give your AI coding assistant access to Glean's documentation. It provides two tools for searching and retrieving docs content.

## Server URL[​](#server-url "Direct link to Server URL")

```
https://docs.glean.com/mcp
```

## Available tools[​](#available-tools "Direct link to Available tools")

| Tool | Description |
| --- | --- |
| `docs_search` | Search documentation with relevance ranking. Returns matching pages with URLs, snippets, and scores. |
| `docs_fetch` | Retrieve the full content of a documentation page as markdown. Use URLs from search results. |

## Connect your AI tool[​](#connect-your-ai-tool "Direct link to Connect your AI tool")

### Claude Code[​](#claude-code "Direct link to Claude Code")

```
claude mcp add --transport http glean-docs https://docs.glean.com/mcp
```

### Cursor and VS Code[​](#cursor-and-vs-code "Direct link to Cursor and VS Code")

Add to your MCP configuration (`.cursor/mcp.json` or VS Code MCP settings):

```
{  "mcpServers": {    "glean-docs": {      "url": "https://docs.glean.com/mcp"    }  }}
```

### Windsurf[​](#windsurf "Direct link to Windsurf")

Add to your `~/.codeium/windsurf/mcp_config.json`:

```
{  "mcpServers": {    "glean-docs": {      "serverUrl": "https://docs.glean.com/mcp"    }  }}
```

## Example usage[​](#example-usage "Direct link to Example usage")

After connecting, ask your AI assistant questions about Glean:

-   "How do I configure SSO for Glean?"
-   "What connectors does Glean support?"
-   "How do I set up a custom connector?"

The assistant uses the MCP tools to search and retrieve relevant documentation pages to answer your questions.
