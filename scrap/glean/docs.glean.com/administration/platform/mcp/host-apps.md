---
url: "https://docs.glean.com/administration/platform/mcp/host-apps"
canonical: "https://docs.glean.com/administration/platform/mcp/host-apps"
title: "Host apps"
description: "The Host apps tab in Admin console → Platform → Glean MCP server gives you a single place to see every supported AI assistant and coding tool, understand which ones your users are already connected from, and push setup to devices so users don't have to configure anything manually."
fetched_at: "2026-09-01T13:29:12.928Z"
---
On this page

The **Host apps** tab in **Admin console → Platform → Glean MCP server** gives you a single place to see every supported AI assistant and coding tool, understand which ones your users are already connected from, and push setup to devices so users don't have to configure anything manually.

![The Host apps tab in the Glean Admin console showing AI assistant and coding tool setup options](/img/mcp-hosts/mcp-host.png)

The Host apps tab in the Glean Admin console

## Supported host applications[​](#supported-host-applications "Direct link to Supported host applications")

Glean supports the following MCP host applications:

-   Antigravity
-   Antigravity CLI
-   Claude Code
-   Codex
-   Cursor
-   Cursor Agent
-   Gemini CLI
-   Goose
-   JetBrains AI Assistant
-   Junie (JetBrains)
-   OpenCode
-   VS Code
-   Windsurf

## What the Host apps tab shows[​](#what-the-host-apps-tab-shows "Direct link to What the Host apps tab shows")

Open **Admin console → Platform → Glean MCP server** to view the **Host apps** tab, which opens by default. It shows:

-   The **Host apps** tab displays cards for supported AI assistants and coding tools that are available in your organization. Coding tools appear only when they are allowlisted and have current or prior usage.
-   The **Connection setup** section lets you select an MCP server and copy the configuration that users need to connect manually. Use **Connect via MDM** to download scripts for managed devices.

## Set up a host app manually[​](#set-up-a-host-app-manually "Direct link to Set up a host app manually")

Use this to share configuration with users and have them connect themselves.

1.  Go to **Admin console → Platform → Glean MCP server** and select the **Host apps** tab.
2.  Choose the host app and click **Connect** to set up.
3.  Save the Glean MCP server URL.
4.  Continue to the host app to set up.

Paste the configuration into the host app settings to connect to Glean.

## Deploy a host app with MDM[​](#deploy-a-host-app-with-mdm "Direct link to Deploy a host app with MDM")

Use this to push MCP configuration to managed devices so users don't need to do anything manually.

1.  Go to **Admin console → Platform → Glean MCP servers** and select the **Host apps** tab.
2.  In the **Coding tools & CLIs** section, click **Connect via MDM**.
3.  In the **Create MDM installer** modal, **Choose a MCP server**. Choose a platform.
4.  Click **Download installer** to download the installer script for your selected platform and provider.
5.  Upload the downloaded script to your MDM provider.

See [Deploy MCP servers with MDM](/administration/platform/mcp/mdm-mcp) for details.

note

Claude for Desktop must be configured separately using its dedicated host guide. This does not affect the Claude Chat Application or Claude Cowork.

## Next steps[​](#next-steps "Direct link to Next steps")

-   [Deploy MCP servers with MDM](/administration/platform/mcp/mdm-mcp) for the full MDM deployment walkthrough
-   [Create MCP servers](/administration/platform/mcp/create-mcp-servers) to create and configure custom MCP servers
-   [Set up Glean MCP server](/administration/platform/mcp/enable-mcp-servers) to review OAuth and default-on settings
