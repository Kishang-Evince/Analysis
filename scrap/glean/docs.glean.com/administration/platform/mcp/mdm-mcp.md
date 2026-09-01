---
url: "https://docs.glean.com/administration/platform/mcp/mdm-mcp"
canonical: "https://docs.glean.com/administration/platform/mcp/mdm-mcp"
title: "Deploy MCP server with MDM (Mobile Device Management)"
description: "Deploy your Glean MCP remote server to devices using your organization's MDM server."
fetched_at: "2026-09-01T13:29:13.257Z"
---
On this page

You can deploy a Glean MCP remote server to devices using your organization's MDM (Mobile Device Management) server. This lets you push configuration changes to devices so that users don't need to manually set up the Glean MCP remote server.

Here's a high-level overview of the process:

1.  Create an MDM installer
2.  Add the installer to your organization's MDM server
3.  End users connect in the host application

Glean plug-in for coding hosts

MDM deployment applies to the standard Glean MCP remote server. Deploy the Cursor plug-in through the Cursor administration settings. Plug-in setup for Claude Code and Codex follows each host's marketplace installation flow. See [Glean plug-in for coding hosts](/administration/platform/mcp/glean-plugin).

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Complete the following prerequisites before you deploy a Glean MCP remote server using MDM:

-   Enable the Glean MCP remote server in **Admin Console → Platform → Glean MCP servers**.
    
-   Have MCP servers configured in Glean. See [Set up Glean MCP server](/administration/platform/mcp/enable-mcp-servers) for instructions.
    
-   Use a supported MDM provider. Glean supports most MDM providers. Glean has tested and validated this feature with [Iru](https://kandji.io/) (previously known as Kandji).
    
-   Your users use a supported host application to connect to the Glean MCP remote server. Glean supports the following host applications:
    
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

note

For Claude for Desktop, Glean installs the Glean MCP remote server onto the Claude Code component. The Glean MCP remote server does not impact the Claude Chat Application or Claude Cowork.

## Steps to deploy a Glean MCP server using MDM[​](#steps-to-deploy-a-glean-mcp-server-using-mdm "Direct link to Steps to deploy a Glean MCP server using MDM")

Here's how to deploy a Glean MCP server using MDM:

1

Create an MDM installer

1.  Navigate to **Admin Console → Platform → Glean MCP Servers**.
2.  Click **Create MDM Installer**.
3.  Choose which Glean MCP remote server you want to deploy.
4.  Select an operating system for the installer.
5.  Click **Download installer**. An script file downloads to your computer.

2

Add the installer to your organization's MDM server

Upload the script to your organization's MDM server. Use your MDM provider to deploy your Glean MCP remote server to your organization's devices. Refer to your MDM provider's documentation for instructions on how to upload the script. Here are some popular MDM providers and their documentation:

-   [Iru](https://support.kandji.io/kb/custom-scripts-overview)
-   [Jamf](https://learn.jamf.com/r/en-US/jamf-pro-documentation-current/Scripts)
-   [Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/apps/powershell-scripts)

3

End users connect in the host application

After your MDM deployment completes, the script installs the Glean MCP remote server on end user devices. End users open a supported host application on their device, authenticate to use the Glean MCP remote server, and connect to the Glean MCP remote server using the configuration you pushed to their device.

Here's an example of how users connect to a Glean MCP remote server in Cursor:

![Cursor Settings, Tools and MCP, showing the Glean MCP remote server with Needs authentication and the Connect button](/img/administration/mcp/glean-mcp-cursor-tools-connect.png)

## Configure automatic updates[​](#configure-automatic-updates "Direct link to Configure automatic updates")

By default, updates to Glean MCP servers automatically sync with your organization's MDM server. This means when the MCP remote server has a new desktop host or bug fixes, you do not have to re-deploy the script to the MDM provider. Those changes automatically apply to the devices in your organization.

When you reach the **Create MDM Installer** page, click **Advanced settings**. The **Update automatically** toggle determines the automatic update behavior.

tip

Keep automatic updates on so that your end users' devices always have the latest improvements and bug fixes for the Glean MCP remote server.

### (Not recommended) Turn off automatic updates

When you turn off **Update automatically**, any updates to the installer script, such as newly supported hosts or bug fixes, do not automatically apply to your organization's devices.

### (Recommended) Turn on automatic updates

When you turn on **Update automatically**, Glean automatically updates the Glean MCP remote server so that your end users' devices maintain the latest improvements and bug fixes.

Keep this toggle on to ensure your organization's devices always have the latest version of Glean MCP remote servers.
