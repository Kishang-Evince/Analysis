---
url: "https://docs.glean.com/user-guide/mcp/glean-plugin-claude-code"
canonical: "https://docs.glean.com/user-guide/mcp/glean-plugin-claude-code"
title: "Set up the Glean plug-in in Claude Code"
description: "Install the Glean plug-in for yourself or everyone working in a Claude Code repository."
fetched_at: "2026-09-01T13:30:42.133Z"
---
On this page

Install the Glean plug-in for your Claude Code account or add it to a repository for everyone who works there.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Ask your Glean administrator to complete the [Glean plug-in prerequisites](/administration/platform/mcp/glean-plugin#prerequisites).

## Install for yourself[​](#install-for-yourself "Direct link to Install for yourself")

Run these commands in Claude Code:

```
/plugin marketplace add gleanwork/claude-plugins/plugin install glean@glean-plugins/reload-plugins
```

Confirm that `/glean_run` is available after the plug-in installs.

## Install for a repository[​](#install-for-a-repository "Direct link to Install for a repository")

To make the plug-in available to everyone who works in a repository, add the marketplace and plug-in to `.claude/settings.json`. Merge these settings with any existing configuration:

```
{  "extraKnownMarketplaces": {    "glean-plugins": {      "source": {        "source": "github",        "repo": "gleanwork/claude-plugins",        "ref": "main"      }    }  },  "enabledPlugins": {    "glean@glean-plugins": true  },  "env": {    "USE_CLAUDE_PROJECT_DIR": "1"  }}
```

`enabledPlugins` is optional and installs the plug-in automatically for everyone who works in the repository. Setting `USE_CLAUDE_PROJECT_DIR` to `1` prevents repeated file-read permission requests during local project workflows.

The plug-in can create files inside the repository during local workflows. Add its working path to `.gitignore`:

```
# Glean plug-in local files.claude/tmp/
```

For administrator guidance, see [Deploy the Glean plug-in in Claude Code](/administration/platform/mcp/glean-plugin-claude-code).

For current Claude Code requirements and commands, see [Glean Plugin for Claude Code](https://developers.glean.com/guides/mcp/claude-code) on the Developer Portal.

## Next steps[​](#next-steps "Direct link to Next steps")

Return to [Use the Glean plug-in](/user-guide/mcp/glean-plugin#authenticate-with-glean) to authenticate, verify the setup, and run your first request.

## See also[​](#see-also "Direct link to See also")

-   [Troubleshoot the Glean plug-in](/user-guide/mcp/troubleshoot-glean-plugin)
-   [Create an agent with the headless builder](/agents/create-agents/create-agent-via-headless-builder)
