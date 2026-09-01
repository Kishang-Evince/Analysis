---
url: "https://docs.glean.com/administration/platform/embedded-integrations/glean-in-gemini-chat/prerequisites"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/glean-in-gemini-chat/prerequisites"
title: "Prerequisites for Glean in Gemini chat"
description: "Gather the access, values, and platform requirements you need before you set up Glean in Gemini chat."
fetched_at: "2026-09-01T13:29:11.076Z"
---
On this page

Use this page before you start the setup. It lists the people, access, settings, and values you need to gather before you connect Glean to Google Gemini Enterprise.

## Who is involved[​](#who-is-involved "Direct link to Who is involved")

This setup involves two admin personas and one end-user persona.

| Persona | Responsibilities |
| --- | --- |
| Glean admin | Provide the Glean MCP server URL, confirm the required MCP tools are enabled, and create the Glean OAuth client. |
| Google Cloud or Gemini Enterprise admin | Create the custom MCP server data store, enable actions, connect the data store to a Gemini app, and publish the app. |
| End user | Authorize Glean the first time they use the app, then ask questions in Gemini chat. |

The two admin roles are often handled by different people.

## Required access[​](#required-access "Direct link to Required access")

### Glean admin[​](#glean-admin "Direct link to Glean admin")

You need:

-   Glean admin access
-   Access to the MCP admin page
-   Access to the Third-party OAuth admin page

### Google Cloud or Gemini Enterprise admin[​](#google-cloud-or-gemini-enterprise-admin "Direct link to Google Cloud or Gemini Enterprise admin")

You need:

-   Google Cloud or Gemini Enterprise admin access
-   A Google Cloud project where you can create Gemini Enterprise resources
-   Permission to create and manage Gemini Enterprise data stores

## Google Cloud requirements[​](#google-cloud-requirements "Direct link to Google Cloud requirements")

Before you create the custom MCP server data store, make sure the following are in place:

-   The organization policy that blocks custom MCP data stores is overridden for the project.
-   The admin creating the data store has the `roles/discoveryengine.editor` role.
-   Gemini Enterprise is registered as an OAuth client application with the authorization redirect URL set to `https://vertexaisearch.cloud.google.com/oauth-redirect`.

For the exact org policy name and redirect URL registration steps, see Google's [Custom MCP Server setup guide](https://docs.cloud.google.com/gemini/enterprise/docs/connectors/custom-mcp-server/set-up-custom-mcp-server).

## Network and transport limitations[​](#network-and-transport-limitations "Direct link to Network and transport limitations")

Custom MCP server data stores currently have these limits:

-   Only StreamableHTTP transport is supported.
-   Server-Sent Events (SSE) transport is not supported.
-   Private Service Connect (PSC) is not supported.
-   VPC Service Controls (VPC-SC) are not supported.

## Required MCP tools[​](#required-mcp-tools "Direct link to Required MCP tools")

Confirm that the selected MCP server path exposes these tools before you continue. If any are missing, enable them in the Glean MCP admin page first. The default path (`/mcp/default`) loads 12 actions:

-   `search`
-   `read_document`
-   `chat`
-   `code_search`
-   `employee_search`
-   `user_activity`
-   `memory`
-   `gmail_search`
-   `meeting_lookup`
-   `knowledge_graph_query`
-   `knowledge_graph_schema`
-   `memory_schema`

## Values to collect before setup[​](#values-to-collect-before-setup "Direct link to Values to collect before setup")

Collect these values from Glean before you start the Gemini-side setup. Your Glean backend URL follows the pattern `https://<tenant_id>-be.glean.com`. You can find it in **[About Glean](https://app.glean.com/admin/about-glean)** under **Server instance (QE)**.

| Value | Where to get it | Example |
| --- | --- | --- |
| MCP server URL | Glean MCP admin page | `https://your-company-be.glean.com/mcp/default` |
| Authorization URL | Your Glean backend URL + `/oauth/authorize` | `https://your-company-be.glean.com/oauth/authorize` |
| Token URL | Your Glean backend URL + `/oauth/token` | `https://your-company-be.glean.com/oauth/token` |
| Client ID | Glean Third-party OAuth admin page | Generated when you create the client |
| Client secret | Glean Third-party OAuth admin page | Generated when you create the client |

If your team uses a non-default MCP server path, use the exact path shown in the Glean MCP admin page.

## OAuth client values[​](#oauth-client-values "Direct link to OAuth client values")

Create a static OAuth client for Gemini in Glean's Third-party OAuth admin page with these values.

| Field | Value |
| --- | --- |
| Client name | `Gemini MCP` |
| Grant type | `Authorization code` |
| Redirect URL | `https://vertexaisearch.cloud.google.com/oauth-redirect` |
| Scopes | `MCP, SEARCH, AGENTS, ADMIN, CHAT, TOOLS, PEOPLE` |

Store the client secret securely as soon as you create it. You need it during Gemini setup.

## Next step[​](#next-step "Direct link to Next step")

Continue to the [Installation guide](/administration/platform/embedded-integrations/glean-in-gemini-chat/installation-guide).
