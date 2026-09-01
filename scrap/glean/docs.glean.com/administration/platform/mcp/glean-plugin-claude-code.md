---
url: "https://docs.glean.com/administration/platform/mcp/glean-plugin-claude-code"
canonical: "https://docs.glean.com/administration/platform/mcp/glean-plugin-claude-code"
title: "Deploy the Glean plug-in in Claude Code"
description: "Add the Glean marketplace and plug-in to a repository for Claude Code users."
fetched_at: "2026-09-01T13:29:12.566Z"
---
On this page

Add the marketplace and plug-in to a repository to make the Glean plug-in available to everyone who works in that repository. Users can also install it individually.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you begin:

-   Complete the [Glean plug-in prerequisites](/administration/platform/mcp/glean-plugin#prerequisites)
-   Make sure you can update `.claude/settings.json` and `.gitignore` in the repository

## Install at the repository level[​](#install-at-the-repository-level "Direct link to Install at the repository level")

Add the marketplace and plug-in to `.claude/settings.json`. Merge these settings with any existing configuration:

```
{  "extraKnownMarketplaces": {    "glean-plugins": {      "source": {        "source": "github",        "repo": "gleanwork/claude-plugins",        "ref": "main"      }    }  },  "enabledPlugins": {    "glean@glean-plugins": true  },  "env": {    "USE_CLAUDE_PROJECT_DIR": "1"  }}
```

`extraKnownMarketplaces` makes the plug-in available. `enabledPlugins` is optional and installs the plug-in automatically for everyone who works in the repository.

Setting `USE_CLAUDE_PROJECT_DIR` to `1` prevents repeated file-read permission requests during local project workflows.

## Ignore plug-in working files[​](#ignore-plug-in-working-files "Direct link to Ignore plug-in working files")

The plug-in can create files inside the repository during local workflows. Add its working path to `.gitignore`:

```
# Glean plug-in local files.claude/tmp/
```

For per-user installation, see [Set up the Glean plug-in in Claude Code](/user-guide/mcp/glean-plugin-claude-code).

For current Claude Code requirements and commands, see [Glean Plugin for Claude Code](https://developers.glean.com/guides/mcp/claude-code) on the Developer Portal.

## See also[​](#see-also "Direct link to See also")

-   [Manage Glean plug-in access and security](/administration/platform/mcp/manage-glean-plugin)
-   [Troubleshoot Glean plug-in deployment](/administration/platform/mcp/troubleshoot-glean-plugin)
