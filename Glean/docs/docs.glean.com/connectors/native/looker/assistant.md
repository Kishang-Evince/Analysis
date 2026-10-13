---
url: "https://docs.glean.com/connectors/native/looker/assistant"
canonical: "https://docs.glean.com/connectors/native/looker/assistant"
title: "Looker in Assistant"
description: "Connect the managed Looker MCP server so users can ask natural-language questions about governed Looker data in Glean Assistant."
fetched_at: "2026-10-13T08:50:02.437Z"
---
On this page

Looker in Assistant lets users ask natural-language questions about governed Looker data. Glean uses indexed Looks, dashboards, Models, and Explores for discovery and routing, then uses the managed Looker MCP server for live, read-only operations under the requesting user’s Looker authorization.

## How it works[​](#how-it-works "Direct link to How it works")

1.  Glean uses indexed Looker metadata to identify a saved Look, dashboard, Model, or Explore that may answer the question.
2.  Assistant selects a saved-content operation when an existing Look or dashboard matches the requested measure, grouping, filters, and time range.
3.  For a derived question, Assistant uses a Model and Explore as the semantic target and retrieves the live field schema needed to construct the query.
4.  The managed Looker MCP server runs the read-only operation using the requesting user’s Looker access.
5.  Looker applies the user’s roles, content access, field visibility, access grants, and other runtime restrictions before returning the result.
6.  Assistant explains the result and links back to the relevant Looker asset when a link is available.

Indexed metadata helps Assistant route the request; it does not replace live Looker authorization or provide cached numeric answers.

## Requirements[​](#requirements "Direct link to Requirements")

Before you configure Looker MCP, [set up Looker indexing](/connectors/native/looker/connector) and confirm the following additional requirements:

-   A hosted Looker (original) or Looker (Google Cloud core) instance. Customer-hosted or on-premises instances are not supported by the Looker-managed MCP server.
-   A Looker administrator who can enable MCP tools and register an OAuth client application.
-   A Glean administrator who can configure tools in **Admin console** > **Tools**.
-   End users who can sign in to Looker and authorize access with their own Looker credentials.
-   A Looker MCP OAuth client ID and the Glean callback URL used when you register the OAuth client.

Semantic indexing improves routing but is not required for the managed MCP connection. If semantic indexing is not enabled, Assistant can use saved-content search and bounded live discovery when available.

## Configure Looker MCP[​](#configure-looker-mcp "Direct link to Configure Looker MCP")

### 1\. Enable the allowed tools in Looker[​](#1-enable-the-allowed-tools-in-looker "Direct link to 1. Enable the allowed tools in Looker")

1.  In Looker, open the Admin settings for the managed MCP server.
2.  Enable the read-only tools that your organization wants to expose to AI agents. Looker disables MCP tools by default.

note

Glean’s Looker integration exposes a fixed read-only allowlist. Enabling a tool in Looker does not add it to Glean if it is outside that allowlist.

### 2\. Add Looker MCP in Glean[​](#2-add-looker-mcp-in-glean "Direct link to 2. Add Looker MCP in Glean")

Add the vendor-provided **Looker MCP** tool in Glean before registering the OAuth client in Looker. This lets you enter the Looker instance host, provide an OAuth client ID, and copy the deployment-specific callback URL.

1.  In Glean, navigate to **Admin console** > **Tools**.
2.  Select **Add tools**, open **Vendor provided tools (via MCP)**, find **Looker MCP**, and open its configuration.
3.  Confirm the **MCP server name**, and select the Looker connector instance.
4.  Under **MCP server URL**, enter the full Looker instance host in **Looker instance host**, such as `acme.looker.com` or `acme.cloud.looker.com`. Do not enter `https://`. Glean constructs the server URL as `https://<your-instance-host>/mcp`.
5.  Under **Authentication method**, enter a unique OAuth client ID in **Client ID**. Use this same value when you register the OAuth client in Looker. Do not enter a client secret; the managed MCP configuration uses a public-client OAuth flow with Proof Key for Code Exchange (PKCE).
6.  Confirm that Glean has populated the **Authorization URL**, **Token URL**, and `cors_api` **Scopes** values, then copy the **Callback URL**. Keep this value for the Looker OAuth registration step.

The indexing connector's **Instance name** field takes the qualifier before `.looker.com`, such as `acme.cloud`, or the full `.looker.app` hostname, such as `acme.looker.app`. The MCP **Looker instance host** field always takes the full hostname.

### 3\. Register the OAuth client in Looker[​](#3-register-the-oauth-client-in-looker "Direct link to 3. Register the OAuth client in Looker")

Looker’s managed MCP preview does not support Dynamic Client Registration. A Looker administrator must register the client manually through the Looker API Explorer or the `oauth_client_apps` API:

1.  Open the Looker API Explorer. For Looker (Google Cloud core) private connections instances that use Private Service Access, call the API endpoint directly because the Marketplace and API Explorer are not supported there.
2.  Use the **Register OAuth App** operation.
3.  Set the OAuth client ID to the same value entered in Glean’s **Client ID** field.
4.  Set `redirect_uri` to the **Callback URL** copied from Glean. The values must match exactly.
5.  Provide a display name and description, then register the app.
6.  Do not create or enter a client secret. The managed MCP configuration uses the public-client OAuth flow with PKCE.

The managed server uses OAuth 2.1 and the Looker `cors_api` scope. For the provider’s current setup details, see [Looker-managed MCP server](https://docs.cloud.google.com/looker/docs/mcp) and [Registering an OAuth client application](https://cloud.google.com/looker/docs/api-cors#registering_an_oauth_client_application).

### 4\. Complete the connection in Glean[​](#4-complete-the-connection-in-glean "Direct link to 4. Complete the connection in Glean")

After registering the OAuth client in Looker, return to the Looker MCP configuration in Glean:

1.  In **Connect to server**, select **Initiate connection**.
2.  Complete the Looker authorization flow when prompted.
3.  After the tools are synced, open **Edit settings** under **Enable tools**.
4.  Enable the tools your organization wants to expose and set visibility to **All teammates**, **Specific departments**, or **Specific teammates**. These Glean settings control who can see and invoke the tools; they do not change the user’s underlying Looker permissions. For more information, see [Manage tool access](/administration/tools/managing-tools/tool-visibility-scoping).
5.  Save the tool configuration.

### 5\. Authorize Looker as a user[​](#5-authorize-looker-as-a-user "Direct link to 5. Authorize Looker as a user")

When a user first invokes Looker in Assistant, Glean starts the Looker OAuth flow. The user signs in to Looker and grants the registered application access. The MCP server then inherits that user’s Looker roles and content access.

If an administrator changes the enabled tool list, wait about 30 seconds, then have users reconnect to Looker so the MCP client refreshes its tool manifest.

## Available read-only tools[​](#available-read-only-tools "Direct link to Available read-only tools")

Glean’s managed Looker integration exposes the following 13 read-only tools for live Assistant workflows. A tool must be enabled in Looker and included in Glean’s fixed allowlist before users can invoke it. For descriptions of Looker’s available AI tools, see [Use AI tools](https://docs.cloud.google.com/looker/docs/connect-ide-to-looker-using-mcp-toolbox#ai-tools) in the [Looker-managed MCP server documentation](https://docs.cloud.google.com/looker/docs/mcp).

Glean admins can control who can see and invoke these tools by setting access to **All teammates**, **Specific departments**, or **Specific teammates**. See [Manage tool access](/administration/tools/managing-tools/tool-visibility-scoping) for configuration details.

| Tool | Purpose |
| --- | --- |
| `run_look` | Run a saved Look |
| `run_dashboard` | Run a saved dashboard |
| `query` | Query a Looker Explore |
| `query_sql` | Return the SQL generated for a semantic query |
| `query_url` | Generate a shareable Explore URL |
| `get_models` | Discover available Looker Models |
| `get_explores` | Discover Explores in a Model |
| `get_measures` | Retrieve measure metadata for an Explore |
| `get_dimensions` | Retrieve dimension metadata for an Explore |
| `get_filters` | Retrieve filter metadata for an Explore |
| `get_parameters` | Retrieve parameter metadata for an Explore |
| `get_looks` | Discover saved Looks |
| `get_dashboards` | Discover saved dashboards |

The allowlist excludes mutation, development-mode, warehouse-introspection, administration, project-file, and test-runner operations. Glean does not create, edit, delete, or publish Looks, dashboards, Models, Explores, or LookML through this integration.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

Search and live querying use separate authorization decisions:

-   **Indexed visibility:** Glean applies the permissions crawled from Looker for saved content and semantic documents.
-   **MCP access:** Looker authorizes each live operation using the user’s Looker OAuth session and roles.
-   **Tool access:** Looker administrators control which MCP tools are enabled, while Glean administrators control which users can see and invoke the configured tool. Glean’s verified template enforces its fixed read-only allowlist.
-   **Semantic routing:** Glean publishes Model and Explore routing documents only for the configured query-access audience. Looker remains authoritative for fields, access grants, row restrictions, and live values.

A user may be able to discover a Looker asset in Glean but still be unable to run it or query its underlying Explore. Assistant should report the authorization failure rather than infer or substitute values.

## Limitations[​](#limitations "Direct link to Limitations")

-   The managed Looker MCP server is in preview and may experience timeouts during periods of peak usage.
-   Dynamic Client Registration and fine-grained OAuth scopes are not supported by the managed server preview.
-   Changes to the Looker MCP tool list require users to reconnect their MCP client.
-   Live tool calls consume the Looker instance’s standard administrative and query-based API quotas.
-   Live query rows are not part of the connector-indexed content.
-   The integration is read-only; write operations are not supported.
