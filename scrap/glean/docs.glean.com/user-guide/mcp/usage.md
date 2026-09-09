---
url: "https://docs.glean.com/user-guide/mcp/usage"
canonical: "https://docs.glean.com/user-guide/mcp/usage"
title: "Using the Glean MCP Server"
description: "Connect supported MCP host applications to Glean and use Glean tools from your AI apps."
fetched_at: "2026-09-01T13:30:42.768Z"
---
On this page

This page helps end users connect supported MCP host applications to Glean and understand what they can do once connected.

## What is MCP?[​](#what-is-mcp "Direct link to What is MCP?")

The Model Context Protocol (MCP) lets AI apps ("hosts" like Cursor, Claude, ChatGPT) securely connect to company tools and data. Glean provides an MCP server so your AI can use Glean’s permission-aware knowledge graph directly in those apps.

* * *

## Glean tools available through MCP[​](#glean-tools-available-through-mcp "Direct link to Glean tools available through MCP")

Once connected, a host can call Glean's built-in tools - including search, chat, document retrieval, code search, and people lookup - as well as Glean agents and external tools brought in through the [Glean MCP Gateway](/administration/platform/mcp/mcp-gateway). The exact set of tools available depends on your Glean configuration and the connecting host.

## Use skills through MCP[​](#use-skills-through-mcp "Direct link to Use skills through MCP")

An administrator must add the **Dynamic skills and tools** managed toolset (a prepackaged set of MCP tools) to the MCP server you use. Once the toolset is available, your MCP host can discover Glean Skills when it needs them instead of loading the full tool catalog at the start of a session.

The host starts by calling `find_skills` to find Glean Skills that match the request. Depending on the response, the host can call `read_skill_files` to read additional Skill files. When the selected Skill needs to use a connected tool, the host calls `run_tool`.

-   `find_skills` finds Glean Skills that match the request.
-   `read_skill_files` reads additional files when the response does not include the content the host needs.
-   `run_tool` runs a connected tool when the selected Skill needs one.

This flow lets the host load the relevant Skill content and tools only when it needs them. If the toolset is not available on your server, ask your administrator to add it in the server settings.

note

If you're building an LLM-based application instead of using an MCP host, the Glean MCP server is a good fit when you want tool-based access to capabilities such as search, chat, and document retrieval. For direct, programmatic access to Glean beyond these tools, use the Glean REST APIs. For guidance on choosing between these interfaces, see [Choosing the right Glean interface](/administration/platform/mcp/about#choosing-the-right-glean-interface).

* * *

## MCP Configurator[​](#mcp-configurator "Direct link to MCP Configurator")

note

Before the MCP Configurator is available, a Glean Administrator must enable at least one Glean MCP server.

[Administrator MCP Server Setup Guide](/administration/platform/mcp/enable-mcp-servers)

You can open the MCP Configurator for setup instructions tailored to your host:

### Access the MCP Configurator

The MCP Configurator gives you connection instructions, configuration snippets, and OAuth setup for each host.

To access: Select your profile icon → **Your settings** → **Third party apps and MCP** tab → **Connect to your AI apps with Glean MCP** card. Or go straight to [app.glean.com/settings/connected-apps](https://app.glean.com/settings/connected-apps).

![The Connect to your AI apps with Glean MCP card in the Third party apps and MCP tab, showing the server dropdown, endpoint, and host options.](/img/administration/mcp/mcp-connect-card.png)

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

A Glean administrator must enable at least one Glean MCP server before the MCP Configurator is available. See the [Administrator MCP Server Setup Guide](/administration/platform/mcp/enable-mcp-servers).

## How to install via MCP Configurator[​](#how-to-install-via-mcp-configurator "Direct link to How to install via MCP Configurator")

Follow these steps to connect your AI app to Glean's MCP server. Each host gets its own setup instructions and server URL.

1

Open the connect card

To find the connect card:

1.  Select your profile icon in the lower-left corner of the home page
2.  Select **Your settings**
3.  Go to the **Third party apps and MCP** tab
4.  Find the **Connect to your AI apps with Glean MCP** card

2

Choose a server

Most people can keep the default server, which is marked *recommended*. If your organization has more than one server, pick the one you need from the server dropdown. The card shows the server's URL with a copy button.

You can copy the server URL and use it to connect from any MCP host, including hosts that aren't in the list below.

3

Pick your host and set up the connection (optional)

Selecting a host from the list is optional. If you've copied the server URL, you can set up any host with it directly. To get setup instructions tailored to your app, select it from the host list (for example, Cursor, VS Code, or Claude Desktop). Select **Show more** to see the rest of your available hosts.

A setup window opens for your host. Choose the method that fits:

-   **Quick Setup**: a one-click install for hosts that support it, such as Cursor
-   **CLI Command**: a command you run in your host's terminal
-   **Manual Config**: copy the server URL or configuration and paste it into your host's MCP settings

If your admin manages setup for a host, you'll see an **Administrator Setup Required** panel with the server URL instead.

4

Sign in to Glean

Complete sign-in with your organization's SSO when prompted. Your host then receives the OAuth tokens it needs to reach Glean's MCP server.

5

Verify the connection

Ask your assistant to “Search Glean for …” or “Read this document in Glean …” to confirm the connection works.

Some hosts are *stdio-only* and can't connect directly over HTTP. In those cases, use a bridge (for example, `mcp-remote`) to reach Glean's remote HTTP MCP server.

## Manage your connected apps[​](#manage-your-connected-apps "Direct link to Manage your connected apps")

The **Third party apps and MCP** tab also lists every app you've authorized to access Glean on your behalf. That includes MCP hosts and other apps you've signed into with Glean. Apps are grouped by name, and for each one you can see the access you granted, when it expires, and when it was last used.

To review or remove an app:

1.  Go to **Your settings → Third party apps and MCP**.
2.  Find the app, then select it to see the access you granted.
3.  To disconnect it, select **Revoke**. The app loses access to Glean right away.

## Supported hosts[​](#supported-hosts "Direct link to Supported hosts")

Install

AllUser-installableAdmin-managed

Type

AllCLIDesktopIDEWeb

Search

22 of 22

### Antigravity

IDE

[Vendor documentation](https://antigravity.google/docs/ide/mcp#antigravity-ide)

### Antigravity CLI

CLI

[Vendor documentation](https://antigravity.google/docs/cli-overview)

### ChatGPT

Web

[Glean documentation](/administration/platform/mcp/host-guides/chatgpt)[Vendor documentation](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server)

### Claude Code

CLI

[Vendor documentation](https://code.claude.com/docs/en/mcp)

### Claude for Desktop

Desktop

[Glean documentation](/administration/platform/mcp/host-guides/claude-desktop)[Vendor documentation](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp)

### Claude for Teams/Enterprise

Web

[Vendor documentation](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp)

Codex

### Codex

CLI

[Vendor documentation](https://developers.openai.com/codex/mcp)

### Cursor

IDE

[Vendor documentation](https://cursor.com/docs/context/mcp)

### Cursor Agent

CLI

[Vendor documentation](https://cursor.com/docs/context/mcp)

### Cursor Team MCP Servers

Web

[Vendor documentation](https://cursor.com/docs/mcp#team-mcp-distribution)

### Gemini CLI

CLI

[Vendor documentation](https://geminicli.com/docs/tools/mcp-server/)

### Gemini Enterprise

Web

[Glean documentation](/administration/platform/mcp/host-guides/gemini-enterprise-mcp)[Vendor documentation](https://docs.cloud.google.com/gemini/enterprise/docs/connectors/custom-mcp-server/set-up-custom-mcp-server)

### Gemini Agents

Web

[Glean documentation](/administration/platform/mcp/host-guides/gemini-agents)

### Goose

DesktopCLI

[Vendor documentation](https://goose-docs.ai/docs/category/mcp-servers)

### JetBrains AI Assistant

IDE

[Vendor documentation](https://www.jetbrains.com/help/ai-assistant/mcp.html)

### Junie (JetBrains)

IDE

[Vendor documentation](https://junie.jetbrains.com/docs/junie-cli-mcp-configuration.html)

### LibreChat

Web

[Glean documentation](/administration/platform/mcp/host-guides/librechat)[Vendor documentation](https://www.librechat.ai/docs/configuration/librechat_yaml/object_structure/mcp_servers)

### Linear

Web

[Vendor documentation](https://linear.app/docs/mcp)

### Microsoft Copilot Studio

Web

[Glean documentation](/administration/platform/mcp/host-guides/copilot-studio)[Vendor documentation](https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent)

### OpenCode

CLI

[Vendor documentation](https://opencode.ai/docs/mcp-servers/)

### VS Code

IDE

[Vendor documentation](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)

### Windsurf

IDE

[Vendor documentation](https://docs.windsurf.com/windsurf/cascade/mcp)

info

We also support other MCP-compatible applications that are not listed here. You'll typically configure these applications using the URL of your Glean MCP server, for example `https://{your-backend-domain}/mcp/[your-mcp-server-name]`. Find your backend domain at [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**. It typically follows the pattern `company-be.glean.com`, but may be different if your organization uses a custom domain.

* * *

## Glean plug-in for Cursor, Claude Code, and Codex[​](#glean-plug-in-for-cursor-claude-code-and-codex "Direct link to Glean plug-in for Cursor, Claude Code, and Codex")

If you use Cursor, Claude Code, or Codex, you can install a Glean plug-in for dynamic skill and tool discovery. Your existing permissions, connector access, tool visibility, and skills access still apply.

You can use the plug-in alongside a standard Glean MCP connection. Glean uses the connection best suited to each request.

[Set up the Glean plug-in](/user-guide/mcp/glean-plugin)

* * *

## Examples by Role[​](#examples-by-role "Direct link to Examples by Role")

Looking for specific examples of what you can do with Glean's MCP server? Check out our role-based guides with real prompts you can use:

[

### Engineering

Debug errors, review PRs, understand code history







](/user-guide/mcp/engineering)[

### Product Management

Draft PRDs, track projects, analyze feedback







](/user-guide/mcp/product-management)[

### Support

Triage tickets, find solutions, draft responses







](/user-guide/mcp/support)[

### Sales

Research accounts, prepare for calls, track deals







](/user-guide/mcp/sales)[

### Data Analytics

Query databases, identify trends, generate reports







](/user-guide/mcp/data-analytics)[

### Operations

IT troubleshooting, HR policies, meeting prep







](/user-guide/mcp/operations)

[View all examples →](/user-guide/mcp/overview)

* * *

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

**Assistant not using Glean?**

-   Be explicit: “Use Glean to …”
-   Check the host is connected via the Configurator

**Missing results or context?**

-   Verify the relevant connectors are enabled
-   Remember: results respect your permissions in Glean

**Host-specific issues?**

-   Some hosts require bridges (for example, stdio via mcp-remote) or have limited tools. See host setup guides from the Supported hosts section

## Tips for effective prompts[​](#tips-for-effective-prompts "Direct link to Tips for effective prompts")

To help your AI assistant choose the right tools, be explicit about the tool and input:

-   "search Glean for …" when you need enterprise search
-   "fetch the document …" when you have a URL or ID

See general guidance on tool selection patterns in your host's documentation.
