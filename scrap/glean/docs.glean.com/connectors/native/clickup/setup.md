---
url: "https://docs.glean.com/connectors/native/clickup/setup"
canonical: "https://docs.glean.com/connectors/native/clickup/setup"
title: "ClickUp setup"
description: "Configure the Glean ClickUp connector, including requirements, admin OAuth against the ClickUp MCP server, and per-user authorization."
fetched_at: "2026-09-01T13:29:24.415Z"
---
On this page

## Requirements[​](#requirements "Direct link to Requirements")

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

To use the ClickUp connector, you need:

-   Access to Glean Admin Console with permission to add and configure connectors.
-   A ClickUp workspace whose users can complete an OAuth 2.0 with DCR flow against the ClickUp MCP server, authorizing Glean’s MCP client for that workspace.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

The connector uses OAuth tokens obtained from ClickUp rather than long‑lived admin passwords or API tokens:

-   Admin‑level OAuth: A Glean admin initiates OAuth against the ClickUp MCP server from Glean Admin Console during setup, establishing the MCP server configuration for the deployment.
-   Per‑user OAuth: Each end user authenticates individually with ClickUp via OAuth; the connector uses those per‑user tokens for all MCP calls on that user’s behalf.

## Step 1: Admin setup in Glean[​](#step-1-admin-setup-in-glean "Direct link to Step 1: Admin setup in Glean")

1.  In the Glean Admin Console, go to **Connectors** → **Add connector** and select **ClickUp**.
2.  Enter a Name and optional Icon. This label appears to users in search results and configuration views.
3.  Click **Save**. This stores the ClickUp MCP server configuration for your deployment using the built‑in ClickUp MCP server URL and metadata.
4.  After saving, click **Authorize** and complete the ClickUp OAuth flow in the popup window using an account that has access to the relevant ClickUp workspace(s).

After the admin completes this flow successfully, the ClickUp MCP server is registered for your Glean deployment, and the connector is ready for end‑user authorization and use.

## Step 2: End‑user authorization[​](#step-2-enduser-authorization "Direct link to Step 2: End‑user authorization")

Because the connector relies on per‑user OAuth, each user who wants to use ClickUp data in Glean must authorize ClickUp for their own account:

1.  When a user first triggers a ClickUp tool (for example, by running a search or Glean query that needs ClickUp data), Glean initiates the ClickUp OAuth flow for that user.
2.  The user signs in to ClickUp (if not already signed in) and approves access for the requested workspace(s).
3.  Glean stores the resulting OAuth token in its encrypted per‑user token store and uses it for subsequent MCP calls until it expires or is revoked, at which point Glean prompts the user to re‑authenticate.

## See also[​](#see-also "Direct link to See also")

-   [ClickUp overview](/connectors/native/clickup/about)
-   [ClickUp troubleshooting and FAQs](/connectors/native/clickup/troubleshooting)
