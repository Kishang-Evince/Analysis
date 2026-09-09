---
url: "https://docs.glean.com/administration/tools/managing-tools/tool-visibility-scoping"
canonical: "https://docs.glean.com/administration/tools/managing-tools/tool-visibility-scoping"
title: "Manage tool access"
description: "Restrict which users, departments, or groups can invoke tools in Chat, Agents, and Glean MCP servers using visibility scoping."
fetched_at: "2026-09-01T13:29:14.780Z"
---
On this page

When you enable tools in **Admin console** → **Platform** → **Tools**, you can restrict which users or groups can invoke those tools in Chat, Agents, and through Glean MCP servers. This is called visibility scoping and is separate from who can configure tools in Agent Builder.

## Two distinct access controls[​](#two-distinct-access-controls "Direct link to Two distinct access controls")

Admin configurations control two entirely separate layers of access: who can use the tool versus who can build with it.

| Setting | What it controls | Where to configure |
| --- | --- | --- |
| Visibility scope | Dictates which end users can see and invoke the tool within Chat, Agents, or Glean MCP servers | **Admin console** → **Tools** → **Edit settings** → *Make available to* |
| Role-based access | Dictates which admins and builders can view and add this tool when constructing an agent | **Admin console** → **Tools** → *Manage role-based access* |

This page covers visibility scope only. For builder-level access, see [Managing tool access](/administration/tools/managing-tools/managing-role-based-access-tools).

## How visibility scoping works[​](#how-visibility-scoping-works "Direct link to How visibility scoping works")

By default, when you enable tools, they're available to **everyone** in your Glean workspace. You can restrict this to specific users, departments, or groups.

This setting also controls whether a tool is available through **Glean MCP servers**. If a tool is not enabled for a user or group here, that tool is also unavailable to them when they connect to Glean through an MCP host.

Glean plug-in

Tool visibility also applies when users invoke tools through the Glean plug-ins for Cursor, Claude Code, and Codex. The plug-ins don't bypass visibility settings, connector permissions, or connector data access rules. See [Manage Glean plug-in access and security](/administration/platform/mcp/manage-glean-plugin).

## End-user experience outside the visibility scope[​](#end-user-experience-outside-the-visibility-scope "Direct link to End-user experience outside the visibility scope")

If a user falls outside the visibility scope of a tool but attempts to trigger it, the system behavior depends on the interface:

-   In Glean: The tool is completely hidden. It does not appear as an available tool, and Glean will ignore explicit user requests to invoke it.
-   In Agents: If the agent is shared with the user, the specific tool step fails silently. The agent will bypass the step and attempt to complete the remaining workflow.
-   Through Glean MCP servers: The tool is not available to the user when they connect to Glean through an MCP host such as Cursor, Claude, or ChatGPT.

### Configure visibility scoping[​](#configure-visibility-scoping "Direct link to Configure visibility scoping")

1.  Navigate to Glean **Admin console**.
2.  Click **Tools**.
3.  Click the tool you want to configure and navigate to the **Configuration** tab.
4.  Click **Edit settings** under **Enable tools**.
5.  Under **Make tools visible for all or some teammates**, select either:
    -   **Agent**
    -   **Chat**
    -   **Glean MCP Server**
6.  Under **Access** change the scope to:
    -   **All teammates**
    -   **Specific department name**
    -   **Specific teammate name**
7.  Click **Save**. The changes take effect immediately.

## Recommended scoping by rollout stage[​](#recommended-scoping-by-rollout-stage "Direct link to Recommended scoping by rollout stage")

To ensure a secure and stable deployment, expand the visibility scope of your tool progressively using the following phased approach:

| Stage | Recommended scope |
| --- | --- |
| Initial pilot | Specific users - limit to your test group or IT and ops team |
| Departmental rollout | Specific departments - for example, Engineering only for Jira tools |
| Full rollout | Everyone |

## Visibility scope vs agent sharing[​](#visibility-scope-vs-agent-sharing "Direct link to Visibility scope vs agent sharing")

If an agent uses a tool that's scoped to specific users, the tool only executes successfully for users within that scope - even if the agent itself is shared more broadly.

warning

A Jira agent shared with the entire company but backed by Jira Extension Tools scoped to Engineering only will fail the Jira tool step for non-Engineering users. Either broaden the tool's visibility scope or narrow the agent's sharing scope to match.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool not appearing for some users

If a user reports that a tool is available for some colleagues but not for them, check these three settings in order:

1.  **Visibility scope** - the user's account or department isn't included in the **Make available to** setting.
2.  **Chat vs Agents toggle** - the tool is enabled for Agents only, not Chat. See [Enabling tools for Chat vs Agents](/administration/tools/managing-tools/tools-chat-vs-agents).
3.  **Individual tool disabled** - the specific tool they need is unchecked. See [Per-tool enable/disable](/administration/tools/managing-tools/per-tool-enable-disable).

For questions and support, reach out to the [Glean support team](http://gleanwork.zendesk.com/).
