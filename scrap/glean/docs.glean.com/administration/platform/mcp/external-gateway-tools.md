---
url: "https://docs.glean.com/administration/platform/mcp/external-gateway-tools"
canonical: "https://docs.glean.com/administration/platform/mcp/external-gateway-tools"
title: "Set up external tools with MCP Gateway"
description: "The Glean MCP Gateway lets you securely expose external tools connected to Glean-custom tools, external MCP servers, and external connector tools-to AI clients like Cursor, Claude Code, ChatGPT, Claude Desktop, and more."
fetched_at: "2026-09-01T13:29:12.618Z"
---
On this page

The Glean MCP Gateway lets you securely expose external tools connected to Glean-custom tools, external MCP servers, and external connector tools-to AI clients like Cursor, Claude Code, ChatGPT, Claude Desktop, and more.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before configuring the MCP Gateway, ensure you have:

-   Admin access to the Glean Admin console.
-   An Identity Provider (IdP), for example, Google, Microsoft Entra ID, or Okta already connected to Glean for single sign-on (SSO).
-   A deployment strategy regarding which tools to expose, such as custom tools, connector tools, or external MCP servers.
-   (Optional) An MDM provider like Jamf, Kandji, or Microsoft Intune if you plan to scale the rollout to managed devices. See [Deploy MCP servers with MDM](/administration/platform/mcp/mdm-mcp).

### Recommended deployment workflow[​](#recommended-deployment-workflow "Direct link to Recommended deployment workflow")

For a successful production rollout, execute the setup in the following order:

1.  Enable the gateway: Turn on the Glean MCP server functionality in the Admin Console.
2.  Configure auth: Enable the Glean OAuth authorization server and create static OAuth clients.
3.  Connect external infrastructure: Register any external MCP servers you want Glean to proxy.
4.  Define access control: Choose which tools to expose per server and apply group- and role-based access controls.
5.  Provision clients: Generate the MDM installer script and distribute it via your MDM provider.
6.  Maintain & monitor: Keep auto-update enabled and monitor performance via MCP Insights and audit logs.

### Quick start: Connect a client in 5 minutes[​](#quick-start-connect-a-client-in-5-minutes "Direct link to Quick start: Connect a client in 5 minutes")

Use this streamlined process to spin up a basic server and link it to a local AI client.

1.  Log in to the Glean Admin Console and navigate to **Platform** → **Glean MCP servers** or visit [app.glean.com/admin/mcp](https://app.glean.com/admin/mcp).
2.  Click **Create MCP server**.
3.  Click **Add tools** and select **External tools**.
4.  Select the specific tools you want to make available and click **Create server**.
5.  Copy the generated **MCP URL path** for the server.
6.  Paste that URL into your preferred client, for example, Cursor, Claude Code, ChatGPT, or Claude Cowork to establish the connection.

For a deep dive into comprehensive server customization options, see the [Create MCP servers](/administration/platform/mcp/create-mcp-servers) guide.

### Configure authentication[​](#configure-authentication "Direct link to Configure authentication")

The MCP Gateway requires secure token exchange to validate client requests.

1.  Enable the **Glean OAuth authorization server** which utilizes OAuth 2.1 authorization code grant with PKCE.
2.  Establish your client registration strategy:
    -   Managed deployments: Manually create **static OAuth clients**.
    -   Supported environments: Rely on **dynamic client registration** where available.

For detailed implementation steps, see:

-   [Set up Glean MCP server](/administration/platform/mcp/enable-mcp-servers)
-   [Glean OAuth authorization server](/administration/oauth/authorization-server)
-   [Authentication options](/administration/platform/mcp/about#authentication)

## Deploy to managed devices via MDM[​](#deploy-to-managed-devices-via-mdm "Direct link to Deploy to managed devices via MDM")

To push the MCP server configuration to managed endpoints at scale, use your Mobile Device Management (MDM) software.

1.  In the Glean Admin Console, navigate to **Platform** → **Glean MCP servers**.
2.  Click **Create MDM installer**.
3.  Select the target **Glean MCP remote server** you want to deploy.
4.  Select the target **operating system** for your end-user devices.
5.  Click **Download installer**. Glean will download a setup script file to your local machine.
6.  Upload the script to your MDM provider (**Jamf**, **Kandji**, or **Microsoft Intune**) and assign it to your target device groups.

For more details on endpoint management, see [Deploy MCP servers with MDM](/administration/platform/mcp/mdm-mcp).

## Next steps: Manage and monitor[​](#next-steps-manage-and-monitor "Direct link to Next steps: Manage and monitor")

After your MCP Gateway is deployed, use the following guides to extend access and monitor usage.

-   Proxy external servers: To connect third-party or custom internal toolsets, see [Connect remote MCP servers](/administration/tools/connect-remote-mcp-servers-to-glean).
-   Analyze usage: To audit queries, track tool adoption, and troubleshoot connection issues post-launch, see [MCP Insights](/administration/insights/mcp-insights).
