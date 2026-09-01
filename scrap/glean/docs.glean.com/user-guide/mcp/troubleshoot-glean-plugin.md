---
url: "https://docs.glean.com/user-guide/mcp/troubleshoot-glean-plugin"
canonical: "https://docs.glean.com/user-guide/mcp/troubleshoot-glean-plugin"
title: "Troubleshoot the Glean plug-in"
description: "Resolve installation, authentication, approval, and tool availability problems with the Glean plug-in."
fetched_at: "2026-09-01T13:30:42.673Z"
---
On this page

Use these checks when the Glean plug-in doesn't appear, authenticate, or run the tool you need.

### The Glean plug-in doesn't appear

-   Confirm you installed or turned on the plug-in in the correct host
-   In Cursor, search for **Glean** in **Cursor Settings → Marketplace** and click **Add to Cursor**
-   In Codex, confirm the `gleanwork/codex-plugins` marketplace and `glean@glean-codex-plugins` plug-in are installed
-   In Claude Code, confirm the `gleanwork/claude-plugins` marketplace and `glean@glean-plugins` plug-in are installed, then run `/reload-plugins`
-   Start a new host session if the plug-in still doesn't appear

### /glean\_run is unavailable

-   Confirm the Glean plug-in for your host is active
-   Confirm no conflicting or older Glean plug-in is installed
-   In Cursor, restart the application after turning on the plug-in
-   In Claude Code, reload plug-ins and start a new session
-   In Codex, run `codex mcp list`, confirm the Glean server is active, and start a new task

### Authentication doesn't complete

-   Run the plug-in setup flow again
-   If setup asks for a server address, use the address your administrator provided
-   Confirm your organization has enabled OAuth and Dynamic Client Registration
-   Confirm your organization's OAuth policy permits the plug-in

### Sign-in loops

Reset the plug-in's stored credentials and authenticate again:

```
/glean_run Reset glean
```

The host then asks you to authenticate. Contact your Glean administrator if the loop continues.

### The approval prompt truncates the arguments

When a write tool's arguments are too long to display, the approval prompt may truncate them. Expand the prompt or copy the full arguments into a file before you approve the action.

### The host requests file-read permission repeatedly

Ask your repository owner to set `USE_CLAUDE_PROJECT_DIR` to `1` in `.claude/settings.json` and add the plug-in's working path to `.gitignore`. See [Set up the Glean plug-in in Claude Code](/user-guide/mcp/glean-plugin-claude-code#install-for-a-repository).

### A Skill or tool is unavailable

-   Confirm the Skill or tool is active for your organization
-   Confirm you have access to the required connector content
-   Confirm the tool is visible to you or your team
-   Try a more specific `/glean_run` request
-   Ask your administrator whether the Skill is restricted to a rollout group

### A write action is blocked or requests confirmation

The tool may require approval, you may not have permission, or the downstream application may require authorization.

Review the approval prompt and continue only if you intend to perform the action. Contact your Glean administrator if the action remains blocked.

## See also[​](#see-also "Direct link to See also")

-   [Use the Glean plug-in](/user-guide/mcp/glean-plugin)
-   [Troubleshoot Glean plug-in deployment](/administration/platform/mcp/troubleshoot-glean-plugin)
