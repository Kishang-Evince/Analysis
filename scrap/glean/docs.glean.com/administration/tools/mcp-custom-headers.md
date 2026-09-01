---
url: "https://docs.glean.com/administration/tools/mcp-custom-headers"
canonical: "https://docs.glean.com/administration/tools/mcp-custom-headers"
title: "Custom HTTP headers for remote MCP servers"
description: "Learn when and how to use custom HTTP headers when Glean connects to third-party MCP servers"
fetched_at: "2026-09-01T13:29:14.994Z"
---
On this page

When Glean acts as an MCP host, it sends outbound HTTP requests to your remote MCP servers on behalf of users. Most servers authenticate with standard OAuth flows or a Bearer token in the `Authorization` header, which you configure in the **Admin console**.

Some third-party MCP servers and API gateways require additional HTTP headers beyond standard authentication. Glean supports custom HTTP headers on outbound MCP requests so you can connect servers that need tenant specific metadata, vendor specific headers, or request time user identity.

## When to configure custom headers[​](#when-to-configure-custom-headers "Direct link to When to configure custom headers")

You may need custom headers when your MCP server or the gateway in front of it requires more than standard OAuth or Bearer authentication. Common scenarios include:

| Scenario | Example need |
| --- | --- |
| API gateway or reverse proxy | A gateway requires routing or authentication headers in addition to OAuth |
| Tenant specific metadata | Your server expects a fixed tenant or environment identifier on every request |
| Vendor specific headers | The MCP server documents proprietary header names beyond `Authorization` |
| Request time user identity | Your server needs the calling user's email or ID for auditing, authorization, or per-user routing |
| Non standard API key placement | The server expects an API key in a custom header instead of `Authorization: Bearer` |

tip

If your server only needs standard Bearer token authentication, configure the API key authentication method in the **Admin console** instead of requesting custom headers. Glean sends the key in the `Authorization` header as `Bearer <token>`. For service-to-service OAuth, use **OAuth Client Credentials**. See [Authentication methods](/administration/tools/connect-remote-mcp-servers-to-glean#authentication-methods) in the remote MCP setup guide.

## Supported header types[​](#supported-header-types "Direct link to Supported header types")

Glean supports two categories of custom headers on outbound MCP requests:

| Type | Description |
| --- | --- |
| Static headers | Fixed name and value pairs configured for your tenant, sent on every request to the MCP server |
| Dynamic headers | Populated at request time from runtime context |

Glean can populate dynamic headers from the following values:

-   **User email**: The email address of the Glean user who runs the tool
-   **User ID**: The ID of Glean user at request time
-   **API key**: The API key configured for the MCP server connection

## Request custom headers[​](#request-custom-headers "Direct link to Request custom headers")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before requesting custom headers, establish your base Model Context Protocol (MCP) server connection and standard authentication in the **Admin console**:

1.  Navigate to **Admin console** → **Platform** → **Tools**.
2.  Add the MCP server using a verified template or click **Import tools from MCP server**.
3.  Configure the MCP server URL, transport type, and authentication method.
4.  Connect to the server and enable the required tools.
5.  *Optional:* If headers are required for the initial connection handshake, configure the MCP URL with API key authentication, save the settings, and share this URL with Glean Support.

For the comprehensive setup procedure, see [Connect remote MCP servers to Glean](/administration/tools/connect-remote-mcp-servers-to-glean).

note

Custom headers are applied on top of your existing MCP connection. They complement, but do not replace, the OAuth or API key authentication configured in the **Admin console**.

### Process workflow[​](#process-workflow "Direct link to Process workflow")

Custom headers cannot be configured natively via self-service in the **Admin console**. To enable them for your tenant, complete the following steps:

#### Prepare your header specification[​](#prepare-your-header-specification "Direct link to Prepare your header specification")

Document the exact headers your MCP server or gateway requires. For each header, specify:

-   Header name (for example, `x-api-key` or `x-tenant-id`)
-   Type: whether the header is static (fixed value) or dynamic (runtime value)
-   Value or source: the fixed value for static headers, or the required runtime context for dynamic headers (such as user email, user ID, or API key)

#### Submit a support request[​](#submit-a-support-request "Direct link to Submit a support request")

Contact your Glean account team or [submit a support request](https://support.glean.com/hc/en-us/requests/new). Your ticket must include the following details:

-   The MCP server name (as configured in **Admin console** → **Platform** → **Tools**)
-   The MCP server URL
-   Your completed header specification
-   Relevant gateway or vendor documentation describing the header requirements

info

If your MCP server runs within a private network or VPC, coordinate with your Glean Solutions Engineer during this step to manage network connectivity and allowlisting.

#### Verify the configuration[​](#verify-the-configuration "Direct link to Verify the configuration")

After Glean confirms your custom headers are active, validate the connection:

1.  From **Agent Builder**, create a test agent that uses the MCP server and run a sample query.
2.  Enter a query in Glean that explicitly invokes the MCP tool.
3.  Monitor your MCP server or gateway logs to confirm the expected headers are successfully received.

## Example header specifications[​](#example-header-specifications "Direct link to Example header specifications")

Use fictional values when planning your configuration. Glean configures the exact header mapping for your tenant.

**Static headers** (same value on every request):

```
{  "x-api-key": "gw-key-acme-prod-7f3a",  "x-tenant-id": "contoso-east-01",  "x-routing-target": "mcp-internal-backend"}
```

**Dynamic headers** (populated per request):

| Header name (example) | Value source |
| --- | --- |
| `x-user-email` | Glean user's email at request time |
| `x-user-id` | Glean user's ID at request time |
| `x-api-key` | API key from the MCP connection's configured credentials |

## See also[​](#see-also "Direct link to See also")

-   [Connect remote MCP servers to Glean](/administration/tools/connect-remote-mcp-servers-to-glean)
-   [Supported remote MCP servers](/administration/tools/supported-mcp-servers)
-   [Tools overview](/administration/tools)
