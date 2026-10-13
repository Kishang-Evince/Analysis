---
url: "https://docs.glean.com/administration/tools/connect-remote-mcp-servers-to-glean"
canonical: "https://docs.glean.com/administration/tools/connect-remote-mcp-servers-to-glean"
title: "Connect remote MCP servers to Glean"
description: "Learn how to connect MCP servers to Glean Assistant and Glean Agents"
fetched_at: "2026-10-13T08:49:31.087Z"
---
On this page

Glean as an MCP host enables you to connect remote Model Context Protocol (MCP) servers so end users can securely discover and invoke third‑party tools (such as Notion, Asana, Canva) directly from Glean Assistant and Glean Agents experience. Glean offers centralized control over which MCP servers and tools are available to users in your organization. With this feature, users can automate workflows, fetch live data, and complete tasks through Glean's unified interface.

Use Glean as an MCP host when:

-   You already expose business workflows or data through MCP servers and want to reuse them inside Glean.
-   You need to support any MCP‑compatible model provider, not just a single LLM or vendor.
-   You want to keep sensitive logic or data access inside your own network or VPC, while still enabling Glean to invoke those tools.

Glean as an MCP host has the following capabilities:

-   Admin‑gated connection to remote MCP servers for Glean Assistant and Glean Agents.
-   Centralized control of available MCP servers and tools at the tenant level.
-   Users can engage with connected MCP servers through Glean Assistant and Glean Agents, with human‑in‑the‑loop experiences for write tools.

If you primarily want to bring the knowledge graph of Glean into other MCP hosts such as Cursor, Claude, or ChatGPT, use the Glean MCP server instead. See [About Glean MCP server](/administration/platform/mcp/about) for more information.

note

Glean fully supports remote MCP servers in Glean and currently offers beta support for servers in agents.

Check the Connectors catalog first

Glean deployments created on or after September 22, 2026, use **Connectors** to set up catalog-backed MCP integrations. For earlier deployments, check **Connectors** first. If the integration isn't listed there, use **Platform → Tools**. Existing configurations remain in their current setup flow and aren't moved automatically. If you find the integration in **Connectors**, use the [catalog setup flow](/connectors/configure-tools-in-connector/config-tools-mcp-from-connector). Use this page for a custom or unlisted remote MCP server, or for an existing configuration managed from **Platform → Tools**.

## Key concepts[​](#key-concepts "Direct link to Key concepts")

-   **Glean as an MCP host**: Glean runs the assistant experience (chat, agents) and invokes tools from remote MCP servers on behalf of users.
-   **Your remote MCP server**: Your server implements the [Model Context Protocol](https://modelcontextprotocol.io/). It exposes tools (for example, `search_tickets`, `run_report`) that the Glean MCP host can discover and call.
-   **MCP tools in Glean**: A configuration in the **Admin console** that connects Glean to a specific MCP server and publishes its tools to Glean Assistant and Glean Agents.
-   **Verified MCP servers**: Pre‑built templates for specific third‑party MCP servers that Glean has validated for connectivity and workflow quality. These include pre‑filled URLs, scopes, and recommended tool selections to simplify setup.
-   **Custom MCP servers**: Any MCP server you host yourself in your own VPC or infrastructure, exposed securely to Glean via allowlisted endpoints. You can register a custom MCP server in Glean by providing its URL and OAuth details.

## Supported MCP servers[​](#supported-mcp-servers "Direct link to Supported MCP servers")

Glean supports remote MCP servers that comply with the [Model Context Protocol](https://modelcontextprotocol.io/) specification. The [verified remote MCP servers](/administration/tools/supported-mcp-servers) list includes servers known to work with Glean.

## Authentication methods[​](#authentication-methods "Direct link to Authentication methods")

Glean supports multiple authentication methods for remote MCP servers. You do not need to use Dynamic Client Registration (DCR) or CIMD — choose the method that matches your MCP server's requirements.

| Method | Description | When to use |
| --- | --- | --- |
| **None** (No authentication) | The remote MCP server doesn't require any token or API key. | Internal servers on a trusted network with no auth requirement. |
| **OAuth Admin** | The remote MCP server requires a one-time authentication by the developer or admin to authorize the use of the action for all end users. After the one-time authorization, Glean sends the token for all requests from authorized users. | Servers where a single admin credential grants access on behalf of all users (for example, shared service accounts). |
| **OAuth User** | The remote MCP server requires an initial OAuth connection setup by the developer or admin. After users authorize the action on first use, Glean uses the token for subsequent requests. | Servers that require per-user authorization (for example, personal access to third-party tools). |
| **API Key** | You provide your own API key to Glean, and are responsible for managing usage capacity. By default, Glean sends the key as a Bearer token in the `Authorization` header. | Servers that authenticate with a static API key, API token, or Bearer token. |
| **OAuth Client Credentials** | Glean acquires and refreshes access tokens using a client ID and client secret, without requiring interactive user authorization. This is a service-to-service (machine-to-machine) flow. | Servers that authenticate via service-to-service OAuth rather than user-authorized OAuth flows (for example, enterprise gateways or internal APIs). |

tip

If your MCP server uses Bearer token authentication (for example, `Authorization: Bearer <token>`), select the **API Key** method and provide the token value. Glean passes the key in the `Authorization` header as a Bearer token, which is compatible with most token-based MCP server implementations.

### API key header formats[​](#api-key-header-formats "Direct link to API key header formats")

For custom MCP servers that use **API Key** authentication, Glean sends `Authorization: Bearer <key>` by default. If your server expects a different API-key placement, use **Use a different header** in the API key configuration when that control is available.

| Header format | Outbound header |
| --- | --- |
| `Authorization: Bearer <key>` | Sends the credential in the `Authorization` header with the `Bearer` scheme |
| `Authorization: Token <key>` | Sends the credential in the `Authorization` header with the `Token` scheme |
| `Authorization: ApiKey <key>` | Sends the credential in the `Authorization` header with the `ApiKey` scheme |
| `X-API-Key: <key>` | Sends the credential in the `X-API-Key` header and doesn't send an `Authorization` header |

These header formats apply to **API Key** authentication only. OAuth-authenticated MCP servers use Bearer tokens. For MCP server templates, the template manages the vendor-specific authentication behavior, so custom header selection isn’t available. If you don't see **Use a different header** for a custom server, contact Glean Support.

note

Glean supports PKCE (Proof Key for Code Exchange) for all MCP server OAuth flows. If you choose an OAuth method where the authorization client is public and doesn't provide a client secret, Glean uses PKCE to complete the token exchange. Glean sends PKCE parameters for all OAuth flows regardless of the authentication method.

### Custom HTTP headers[​](#custom-http-headers "Direct link to Custom HTTP headers")

Some third-party MCP servers and API gateways require HTTP headers beyond standard OAuth or Bearer authentication, for example, gateway API keys, tenant routing metadata, or request time user identity. Glean supports custom static and dynamic headers on outbound MCP requests.

If your server needs headers that are not covered by the authentication methods above, see [Custom HTTP headers for remote MCP servers](/administration/tools/mcp-custom-headers) for more information.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you connect a remote MCP server to Glean, meet the following prerequisites:

-   Admin access to Glean:
    -   You must be able to open the **Admin console** and access **Platform → Tools**.
-   A running MCP server that:
    -   Implements the Model Context Protocol.
    -   Exposes an HTTPS URL reachable from Glean directly or via allowed proxy.
    -   Supports OAuth 2.0 with authorization code flow, with or without Dynamic Client Registration (DCR).
-   OAuth details for the MCP server. For authorization code flow, provide the Authorization URL, Token URL, Client ID, client secret (not required for public authorization clients, Glean uses Proof Key for Code Exchange (PKCE) to complete the token exchange), and scopes.
-   Private network or VPC deployments
    -   If your MCP server is hosted in a private network or VPC, you must add it to the allowlist so that Glean can reach it.
    -   Coordinate with your Glean Solutions Engineer or account team to:
        -   Confirm the proxy endpoints and IP ranges to allowlist.
        -   Validate connectivity and TLS requirements.
-   (Optional) Role-based access to actions
    -   If you plan to restrict who can add or configure MCP‑backed tools in agents, familiarize yourself with role‑based access to tools in the **Admin console**. See [Role-based access to tools](/administration/tools/managing-tools/managing-role-based-access-tools) for more information.
-   Vendor-specific token requirements
    -   Some remote MCP servers only share their tools with Glean if the token you connect with has the right vendor license. Without it, the connection succeeds but Glean receives no tools to display.
    -   For ZoomInfo, the user who creates the ZoomInfo developer or OAuth token for [https://mcp.zoominfo.com/mcp](https://mcp.zoominfo.com/mcp) must have a ZoomInfo Copilot license or ZoomInfo Copilot Bundle product assigned. An admin-only ZoomInfo license isn't enough. Without one of these licenses, Glean connects to the server successfully, but ZoomInfo rejects the request to list tools. No ZoomInfo tools appear in the Glean tools list, so you can't add them to agents. If you connect the server and no tools appear, check which license is assigned to the user who created the token.
-   Vendor-specific OAuth application requirements
    -   Some remote MCP servers require you to configure the OAuth application for production before other users can authorize it.
    -   For Airtable, if only the admin who created the connection can use it, open **Builder Hub → Integrations → OAuth integrations** and review the **Support information** section. Enter the OAuth application owner’s email address in **Support email**. Add the application owner’s privacy policy and terms of service URLs to the corresponding fields, then select **Save changes**. For a Glean-owned application, use `https://www.glean.com/privacy` for the privacy policy URL and `https://www.glean.com/legal/terms` for the terms of service URL. Ask the other users to retry the connection after you save the changes.
    -   If Airtable still limits the application to development use, other users may receive an `access_denied` error even when the redirect URI, scopes, and credentials are correct.

## Configure a custom or unlisted remote MCP server[​](#configure-a-custom-or-unlisted-remote-mcp-server "Direct link to Configure a custom or unlisted remote MCP server")

Follow this flow when the server is not available in the Connectors catalog or when an existing configuration remains under **Platform → Tools**.

### Open the Tools page[​](#open-the-tools-page "Direct link to Open the Tools page")

1.  In Glean, open the **Admin console**.
2.  Go to **Platform → Tools**.
3.  Open the **Vendor Provided Tools (via MCP)** tab.

![Tools page with the Vendor Provided Tools (via MCP) tab open](/img/administration/tools/mcp/mcp-tools-tab.png)

### Add MCP tools[​](#add-mcp-tools "Direct link to Add MCP tools")

1.  Click **Add**.
2.  In the **Add tools** dialog, open the **Vendor provided tools (via MCP)** tab.

![Add tools dialog with the Vendor provided tools (via MCP) tab open](/img/administration/tools/mcp/add-tools-dialog.png)

3.  Choose a **Glean certified** template under **Browse built-in servers**, or select **Import tools from MCP server** to connect a server from scratch.

### Use a Glean-certified template

1.  Under **Browse built-in servers**, select the template for your MCP server (for example, **Confluence MCP**).
2.  Review the pre‑filled configuration:
    -   MCP server name
    -   Description
    -   MCP server URL
    -   Transport type
    -   Authentication method. See [Authentication methods](#authentication-methods) for more information.

![Add MCP server configuration for a built-in template](/img/administration/tools/mcp/add-mcp-server-template.png)

3.  **Connect to server** using the provided instructions.
4.  **Enable tools**.
    -   Click **Edit settings**.
    -   Adjust the settings for Agents and Tools as per your requirements.

![Edit settings for enabling MCP tools](/img/administration/tools/mcp/enable-mcp-tool-settings.png)

5.  Click **Save**.

note

Some templates need setup in the third-party app before you connect. Depending on the server, you might need to create an OAuth client manually when the server doesn't support dynamic client registration. You might also need to select the correct environment or regional endpoint. Follow the setup instructions that the template links to in the **Admin console**.

note

Override defaults only if directed by your Glean team or the MCP server owner. Verified servers are pre‑validated by Glean for connectivity and core workflows, which reduces setup time and configuration errors.

### Use Import tools from MCP server

1.  Under **Add tools**, select **Import tools from MCP server**. Fill out the server configuration:
    -   MCP server name
        
    -   Description
        
    -   MCP server URL: the HTTPS or SSE endpoint where your MCP server exposes its API (for example, [https://example.com/mcp/sse](https://example.com/mcp/sse)).
        
    -   Transport type: choose SSE or Streaming HTTP, depending on how your MCP server is implemented.
        
    -   Authentication method: See [Authentication methods](#authentication-methods) for more information. Choose **Dynamic Client Registration** when the MCP server supports automatic OAuth client registration. In the **Admin console**, **OAuth** uses the per-user OAuth flow.
        
        For **Dynamic Client Registration**, Glean registers the OAuth client automatically when the MCP server supports it. You don't need to create an OAuth client manually.
        
        For **OAuth**, provide:
        
        -   Authorization URL
        -   Token URL
        -   Client ID
        -   Client secret. Client secret isn't required for public authorization clients. Glean uses PKCE to complete the token exchange for public authorization clients.
        -   Scopes for the tools you plan to expose
        
        note
        
        **Important:** An admin must connect to the MCP server first so Glean can retrieve the server's tool list. This admin connection is only for tool discovery, publishing, and permission configuration. It does **not** authorize end users. When using **OAuth**, each end user must authorize the tool before using it.
        
        After you save the configuration, Glean discovers tools from the MCP server and makes them available for publishing as tools.
        

![Add MCP server configuration for a custom server](/img/administration/tools/mcp/add-mcp-server-custom.png)

2.  **Connect to server** using the provided instructions.
    
3.  **Enable tools**. Click **Edit settings**, review the **list of tools** the MCP server exposes, then for each tool you want to make available:
    
    -   Enable it for **Agents** so agent creators can use it in Agent Builder.
    -   Optionally, enable it for **Glean**, so it can call the tool in conversational flows.
    -   Optionally, apply **role-based access** so only specific creators or departments can add or configure sensitive tools in agents.
    
    Save your changes.
    
    note
    
    The tools you enable are available to agents and Glean.
    
4.  Click **Save**.
    

### Test the connection[​](#test-the-connection "Direct link to Test the connection")

Complete the following steps to validate that your MCP server is wired correctly:

From **Agent Builder**:

1.  Create a test agent.
2.  Add a **Plan and execute** step and use one of the available MCP servers.
3.  Run the agent with a sample query and confirm the MCP tool is invoked and returns expected output.

From **Glean**:

1.  Ask a query that should use the MCP tool (for example, “Use the \[MCP tool name\] tool to …”).
2.  Verify the assistant calls the tool and that results look correct.

If calls fail, check your internal MCP logs and any dedicated troubleshooting articles for MCP hosts, or contact your Glean account team.

## Upgrade Zoom MCP permissions[​](#upgrade-zoom-mcp-permissions "Direct link to Upgrade Zoom MCP permissions")

Use this guidance for connections created from the Zoom MCP template under **Platform → Tools** and still managed there. Older connections may show meeting tools but return `401 Unauthorized` when you try to create, update, or delete a meeting.

If you manage Zoom MCP through **Connectors**, contact Glean Support to confirm the appropriate update path before replacing the connection. This guidance does not apply to the native Zoom indexing connector.

The meeting tools require the following OAuth scopes.

| Operation | Required scope |
| --- | --- |
| Create a meeting | `meeting:write:meeting` |
| Update a meeting | `meeting:update:meeting` |
| Delete a meeting | `meeting:delete:meeting` |

These **Platform → Tools** connections don't automatically inherit later template scope changes. Reauthorizing an unchanged saved configuration doesn't add scopes missing from that configuration.

Plan the upgrade with Support

Contact Glean Support before removing or replacing an existing connection. Confirm that the updated Zoom MCP template is available for your organization and agree on an upgrade plan. The plan may require recreating the connection and having users authorize it again.

Deleting the connection and adding it again as a new server creates new Glean server and tool IDs. Before an approved replacement, record dependent agents (including drafts and subagents), enabled tools, and access settings. Work with Support to confirm how to restore affected references and settings.

### Verify the upgraded Zoom MCP connection[​](#verify-the-upgraded-zoom-mcp-connection "Direct link to Verify the upgraded Zoom MCP connection")

After completing the Support-approved upgrade, follow Support's reauthorization instructions for affected users. An admin's setup connection doesn't authorize other users.

Use a non-admin Glean test user with the required Zoom permissions and tool access:

1.  Confirm that the user grants the required meeting permissions during OAuth authorization.
2.  Use the meeting tools to create a disposable meeting with no attendees. Update that meeting, then delete only that meeting. Confirm that each operation succeeds.
3.  Check that affected agents use the upgraded connection and that tool enablement and access settings match your intended configuration.

If a check fails, contact Glean Support before changing scopes or replacing the connection again.

## Use MCP-backed tools in agents[​](#use-mcp-backed-tools-in-agents "Direct link to Use MCP-backed tools in agents")

After MCP tools are configured and published, agent creators can:

-   Open **Agent Builder** and add MCP tools as steps in their workflows in the *Plan + Execute* step, just like any other tool.
-   Chain MCP tools with other Glean tools, for example, use an MCP tool to fetch data, then pass results to another tool for summarization.

note

MCP servers are only available in **Plan and execute** steps and in autonomous agents. MCP servers are not available in single step selections.

You can set up access controls for MCP-backed tools in agents. Role‑based access ensures only approved creators can wire certain MCP tools into agents. End users running agents still experience permission‑aware behavior based on downstream app permissions and credentials. See [Role-based access to tools](/administration/tools/managing-tools/managing-role-based-access-tools) for more information.

This lets you reuse your existing MCP capabilities inside complex, multi‑step agent workflows without duplicating integration logic.

## Use MCP-backed tools in Assistant[​](#use-mcp-backed-tools-in-assistant "Direct link to Use MCP-backed tools in Assistant")

If you publish MCP tools to Glean, users can invoke them using natural language, for example:

-   “Use the \[MCP server name\] tool to run the monthly usage report for ACME.”
-   “Ask the internal ticketing MCP server for open Sev-1 incidents this week.”

Glean chooses MCP tools similarly to other tools, based on the tool schema exposed by your MCP server and the user’s query and context.

All calls respect the underlying authentication and permissions defined by your MCP server and any downstream systems.

## Security and hosting considerations for MCP servers[​](#security-and-hosting-considerations-for-mcp-servers "Direct link to Security and hosting considerations for MCP servers")

Note the following security and hosting considerations for MCP servers:

-   **Any model provider**: Glean as an MCP host is compatible with any MCP‑compliant server regardless of which LLM or provider it uses internally.
-   **Customer‑hosted servers**: You control where the MCP server runs (cloud, on‑prem, or VPC). Glean only needs network access to the server endpoint (directly or via an allowlisted proxy).

## Best practices[​](#best-practices "Direct link to Best practices")

-   **Least‑privilege OAuth**: Use the smallest necessary scopes when configuring OAuth. Rotate client secrets according to your internal policies.
-   **Auditing and observability**: Use your MCP server’s logs to monitor tool invocations and troubleshoot failures. Use Glean’s existing audit and insights capabilities to understand Glean Assistant and Glean Agents usage patterns where relevant.
-   **Start with a narrow server**: Begin with a small set of high‑value tools so that LLMs can reliably pick the right tool.
-   **Align naming with jobs-to-be-done**: Name MCP tools after clear outcomes, for example, “Run billing report”, “Lookup internal user” to improve tool selection.
-   **Coordinate with Glean SEs for VPC setups**: Involve your Glean Solutions Engineer early when you plan to expose MCP servers from private networks, so they can help design and validate the allowlist/proxy configuration.
