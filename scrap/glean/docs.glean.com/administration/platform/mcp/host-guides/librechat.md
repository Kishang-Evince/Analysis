---
url: "https://docs.glean.com/administration/platform/mcp/host-guides/librechat"
canonical: "https://docs.glean.com/administration/platform/mcp/host-guides/librechat"
title: "LibreChat"
description: "This guide is for administrators to configure LibreChat to connect to your company's Glean MCP server."
fetched_at: "2026-09-01T13:29:13.048Z"
---
On this page

This guide is for administrators to configure LibreChat to connect to your company's Glean MCP server.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean OAuth authorization server enabled (**Admin Console → Users & permissions → Third-party access (OAuth)**)
-   MCP server enabled (**Admin Console → Platform → MCP**)
-   LibreChat instance with MCP server support enabled

## Add Glean MCP Server to LibreChat[​](#add-glean-mcp-server-to-librechat "Direct link to Add Glean MCP Server to LibreChat")

1

Open your LibreChat configuration

Navigate to your LibreChat deployment and locate the `librechat.yaml` configuration file.

2

Add the Glean MCP server configuration

Add the following configuration to the `mcpServers` section of your `librechat.yaml` file:

```
mcpServers:  glean_[server-name]:    type: streamable-http    url: https://{your-backend-domain}/mcp/[server-name]    serverInstructions: true    timeout: 60000    requiresOAuth: true    oauth:      authorization_url: "https://{your-backend-domain}/oauth/authorize"      token_url: "https://{your-backend-domain}/oauth/token"      scope: ""      redirect_uri: "http://localhost:3080/api/mcp/glean_[server-name]/oauth/callback"
```

Replace the following placeholders:

-   `{your-backend-domain}`: Your Glean backend domain. Find it at [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**. It typically follows the pattern `company-be.glean.com`, but may be different if your organization uses a custom domain.
-   `[server-name]`: The name of your MCP server as configured in Glean (e.g., `default`)

For more details on MCP server configuration options, see the [LibreChat MCP Servers documentation](https://www.librechat.ai/docs/configuration/librechat_yaml/object_structure/mcp_servers).

3

Restart LibreChat

After saving the configuration file, restart your LibreChat instance to apply the changes. Initialization happens at startup, and the app must be restarted for changes to take effect.

4

Authenticate with Glean OAuth

When users first interact with the Glean MCP server, they will be prompted to complete the OAuth sign-in flow.

![OAuth Consent](/img/administration/mcp/librechat/oauth.png)

5

Validate tools

Run a quick search to confirm connectivity and verify the available tools.

![Tool Validation](/img/administration/mcp/librechat/librechat.png)

## Configuration Options[​](#configuration-options "Direct link to Configuration Options")

| Option | Description | Default |
| --- | --- | --- |
| `type` | Transport type. Use `streamable-http` for Glean MCP server. | Required |
| `url` | The Glean MCP server endpoint URL. | Required |
| `serverInstructions` | Whether to fetch and display server-provided instructions. | `true` |
| `timeout` | Request timeout in milliseconds. | `60000` |
| `requiresOAuth` | Enable OAuth authentication flow. | `true` |
| `oauth.authorization_url` | Glean OAuth authorization endpoint. | Required |
| `oauth.token_url` | Glean OAuth token endpoint. | Required |
| `oauth.scope` | OAuth scopes (leave empty for default Glean scopes). | `""` |
| `oauth.redirect_uri` | OAuth callback URL for your LibreChat instance. | Required |

note

The `redirect_uri` must match the URL where your LibreChat instance is hosted. For local development, use `http://localhost:3080/api/mcp/glean_[server-name]/oauth/callback`. For production deployments, replace `localhost:3080` with your actual LibreChat domain.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Connection Issues[​](#connection-issues "Direct link to Connection Issues")

If users report connection failures:

1.  Verify the MCP server URL is correct and uses the proper instance name
2.  Ensure OAuth endpoints are correctly configured
3.  Check that the `redirect_uri` matches your LibreChat deployment URL
4.  Verify that users have active Glean accounts with appropriate permissions

### OAuth Errors[​](#oauth-errors "Direct link to OAuth Errors")

If authentication fails:

1.  Confirm the Glean OAuth authorization server is enabled in Admin Console
2.  Verify the `authorization_url` and `token_url` use the correct instance name
3.  Check that the redirect URI is properly configured and accessible

### Tool Availability[​](#tool-availability "Direct link to Tool Availability")

If tools aren't appearing in LibreChat:

1.  Confirm the MCP server is enabled in Admin Console
2.  Verify tools are enabled on the specific server configuration
3.  Check the LibreChat logs for any MCP connection errors
4.  Restart LibreChat to refresh the connection

* * *

-   For generic auth/network issues, see [Troubleshooting MCP Connectivity](/administration/platform/mcp/troubleshooting)

## See also[​](#see-also "Direct link to See also")

-   [End-user configuration](/user-guide/mcp/end-user-configuration) - How users configure their own connection to Glean MCP server
