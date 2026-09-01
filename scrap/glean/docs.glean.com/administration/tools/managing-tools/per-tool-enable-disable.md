---
url: "https://docs.glean.com/administration/tools/managing-tools/per-tool-enable-disable"
canonical: "https://docs.glean.com/administration/tools/managing-tools/per-tool-enable-disable"
title: "Enabling or disabling individual tools"
description: "Control which specific operations are available to Assistant, agents, and Glean MCP servers by enabling or disabling individual tools."
fetched_at: "2026-09-01T13:29:14.805Z"
---
On this page

When you add tools in **Admin console** → **Platform** → **Tools**, all tools are enabled by default. You can selectively disable individual tools to control exactly which operations are available to users in Assistant, to agents, and through Glean MCP servers.

## Why you'd do this[​](#why-youd-do-this "Direct link to Why you'd do this")

Tools bundle related operations together, but not every operation may be appropriate to expose. For example, the Jira tools include both read tools (`Search issues`, `Get issue details`) and write tools (`Create issue`, `Create comment`, `Edit issue`). You might want to enable read tools immediately while holding off on write tools until your team has tested them.

Common scenarios:

-   Enable search and read tools only during a pilot rollout.
-   Disable destructive tools (delete, close, archive) permanently.
-   Enable a subset of tools for **Assistant** but a broader set for **agents**.
-   Temporarily disable a specific tool while a bug is being resolved.

## Configuration steps[​](#configuration-steps "Direct link to Configuration steps")

1.  Navigate to Glean **Admin console**.
2.  Click **Platform** → **Tools**.
3.  Click the tools you want to configure and go to the **Configuration** tab.
4.  Click **Edit settings** under **Enable tools**.
5.  Expand the **Agents** section to see the full list of individual tools available to agents.
6.  Expand the **Assistant** section to see the list available in Assistant.
7.  Expand the **Glean MCP Server** section to see the list available in Glean MCP servers.
8.  Uncheck any tools you want to disable.
9.  Click **Save**.

note

The **Agents**, **Assistant**, and **Glean MCP Server** sections are configured independently. Disabling a tool in one section doesn't automatically disable it in the others. For more on this distinction, see [Enabling tools for Assistant vs Agents](/administration/tools/managing-tools/tools-chat-vs-agents).

## Read vs. write tools — recommended starting point[​](#read-vs-write-tools--recommended-starting-point "Direct link to Read vs. write tools — recommended starting point")

| Tool type | Examples | Recommended default |
| --- | --- | --- |
| **Read** | Search, Get, List, Fetch | Enable immediately |
| **Write** | Create, Update, Edit, Post | Enable after testing |
| **Destructive** | Delete, Close, Archive, Remove | Disable unless explicitly needed |

## Changes take effect immediately[​](#changes-take-effect-immediately "Direct link to Changes take effect immediately")

Enabling or disabling an individual tool takes effect immediately — No re-crawl, restart, or re-authentication is needed. Active agent runs that have already started a step complete it; the change applies to new invocations only.

## Difference from tools-level enable/disable[​](#difference-from-tools-level-enabledisable "Direct link to Difference from tools-level enable/disable")

Disabling an individual tool is different from disabling all tools:

| Scope | What it affects |
| --- | --- |
| **Individual tool disabled** | Only that specific operation is unavailable; the rest of the tools continue to work. |
| **All tools disabled** | All tools become unavailable across Assistant, agents, and Glean MCP servers. |

To disable all tools, use the toggle at the top of the tools card rather than unchecking individual tools.

For any further issues or queries, reach out to the [Glean support team](http://gleanwork.zendesk.com/).
