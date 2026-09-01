---
url: "https://docs.glean.com/administration/tools/managing-tools/tools-chat-vs-agents"
canonical: "https://docs.glean.com/administration/tools/managing-tools/tools-chat-vs-agents"
title: "Enable tools for Glean Assistant, Agents, and the Glean MCP server"
description: "Learn when and how to enable tools for Glean Assistant, Agents, and the Glean MCP server from the Admin console."
fetched_at: "2026-09-01T13:29:15.037Z"
---
On this page

When you add a tool in the Glean Admin console, you must define the specific surfaces where teammates can interact with the tool: Glean Assistant, Agents, the Glean MCP server, or any combination.

note

In the Admin console, this setting is still labeled **Chat**. In this article, **Assistant** refers to that same capability.

## What the toggles control[​](#what-the-toggles-control "Direct link to What the toggles control")

| Toggle | What it enables |
| --- | --- |
| Chat | Users can invoke the tools conversationally in Glean by typing a request like "Create a Jira ticket for this." |
| Agents | The tool is available as a step when building or running agents. |
| Glean MCP Server | The tool is available in Glean MCP servers for all or some teammates. |

You can enable one without the other. For example, you might enable Jira tools for Agents only while you pilot the feature with a small group, before opening it up in Assistant.

## Why the Chat toggle may be unavailable[​](#why-the-chat-toggle-may-be-unavailable "Direct link to Why the Chat toggle may be unavailable")

Not all tools are supported in Glean Assistant. The **Chat** toggle is only available for tools that are validated for conversational, single-turn use. Tools designed specifically for multi-step agent workflows may only expose the **Agents** toggle.

If the **Chat** toggle is dimmed for a tool, that tool is **Agents**\-only and cannot be invoked directly from the Glean Assistant interface.

## Configuration steps[​](#configuration-steps "Direct link to Configuration steps")

To configure tool availability for Glean Assistant or agents:

1.  Open the Glean **Admin console**.
    
2.  Go to **Platform** → **Tools**.
    
3.  Select the tool you want to configure, then open the **Configuration** tab.
    
4.  Under **Enable tools**, click **Edit settings**.
    
5.  Choose where to make the tools available:
    
    -   **Agents**: Use this to enable or disable the tools in agents.
    -   **Chat**: Use this to enable or disable the tools in Glean Assistant.
    -   **Glean MCP Server**: Use this to make the tools available in Glean MCP servers for all or some teammates.
    
    note
    
    Tools must be assigned to at least one member or team. If a tool is unassigned, it is automatically disabled in both Glean Assistant and Agents.
    
6.  Click **Save**. Changes take effect immediately. You do not need to re-crawl or restart anything.
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool works in an agent but not in Glean Assistant

If a user reports that a tool works when run inside an agent but isn't available in Glean Assistant, the most likely cause is that the **Chat** toggle is turned off for that tool. Check **Admin console** → **Platform** → **Tools** → **Edit settings** and verify the **Chat** toggle is enabled.

note

This is separate from user-level visibility. Even if the tool is enabled for **Chat**, individual users may not see it if their user group is not included in the access scope. See [Managing tool access](/administration/tools/managing-tools/managing-role-based-access-tools) for more information.

### Tool is missing from agent builder

If an agent creator cannot find a specific tool in the agent builder, confirm the **Agents** toggle is enabled for that tool and that the creator is included in the access scope.

For any further issues or questions, reach out to the [Glean support team](http://gleanwork.zendesk.com/).
