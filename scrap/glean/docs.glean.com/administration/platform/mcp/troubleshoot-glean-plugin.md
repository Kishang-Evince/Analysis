---
url: "https://docs.glean.com/administration/platform/mcp/troubleshoot-glean-plugin"
canonical: "https://docs.glean.com/administration/platform/mcp/troubleshoot-glean-plugin"
title: "Troubleshoot Glean plug-in deployment"
description: "Resolve installation, authentication, permission, and tool availability problems with the Glean plug-in."
fetched_at: "2026-09-01T13:29:13.208Z"
---
On this page

Use these checks when users can't load, authenticate, or run tools through the Glean plug-in.

### The plug-in doesn't appear in Cursor

-   Confirm your organization uses Cursor 3.8.11 or later
-   In **Cursor Settings → Marketplace**, search for **Glean** and confirm the plug-in is available
-   Install the plug-in by clicking **Add to Cursor**
-   Restart Cursor after installing or updating the plug-in

### Codex doesn't load the plug-in

-   Confirm the `gleanwork/codex-plugins` marketplace and the `glean@glean-codex-plugins` plug-in are installed
-   Run `codex mcp list` and confirm the Glean MCP server is active
-   Run `codex mcp login glean` if authentication is required
-   Start a new Codex task after installing the plug-in or changing the MCP configuration

### Claude Code doesn't load the plug-in

-   Confirm the `gleanwork/claude-plugins` marketplace and the `glean@glean-plugins` plug-in are installed
-   Confirm `.claude/settings.json` is valid JSON
-   Merge the repository-level configuration with existing Claude Code settings instead of replacing them
-   Ask users to run `/reload-plugins` and start a new session

### Users can't authenticate

-   Confirm the OAuth authorization server is active
-   Confirm Dynamic Client Registration is set to **Allow any application**, or that **Glean CLI** is in your approved applications list
-   If setup requests a Glean server address, provide your organization's Glean instance address
-   Confirm the user completed any required application authorization
-   If sign-in loops, ask the user to run `/glean_run Reset glean` and authenticate again

### Users receive repeated file-read permission requests

Set `USE_CLAUDE_PROJECT_DIR` to `1` in `.claude/settings.json`, and add the plug-in's working path to `.gitignore`. See [Deploy the Glean plug-in in Claude Code](/administration/platform/mcp/glean-plugin-claude-code#ignore-plug-in-working-files).

### Approval prompts truncate tool arguments

When a write tool's arguments are too long to display, the host may truncate the approval prompt. Tell users to expand the prompt or copy the full arguments into a file before approving the action.

### A tool or Skill is unavailable

-   Confirm the tool or Skill is active for the organization
-   Confirm it's shared with the intended users or groups
-   Confirm the user has access to the required connector content
-   Confirm [tool visibility settings](/administration/tools/managing-tools/tool-visibility-scoping) include the intended users or groups

## See also[​](#see-also "Direct link to See also")

-   [Glean plug-in for coding hosts](/administration/platform/mcp/glean-plugin)
-   [Manage Glean plug-in access and security](/administration/platform/mcp/manage-glean-plugin)
-   [Troubleshoot the Glean plug-in](/user-guide/mcp/troubleshoot-glean-plugin)
