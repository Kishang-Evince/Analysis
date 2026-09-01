---
url: "https://docs.glean.com/administration/oauth/authorization-server"
canonical: "https://docs.glean.com/administration/oauth/authorization-server"
title: "Glean OAuth Authorization Server"
description: "Glean can act as an OAuth 2.1 Authorization Server (issuing access tokens) and as the Resource Server (validating them), while delegating user authentication to your configured Single Sign-On (SSO) Identity Provider (IdP) using OpenID Connect (OIDC) or Security Assertion Markup Language (SAML)."
fetched_at: "2026-09-01T13:29:10.330Z"
---
On this page

Glean can act as an OAuth 2.1 Authorization Server (issuing access tokens) and as the Resource Server (validating them), while delegating user authentication to your configured Single Sign-On (SSO) Identity Provider (IdP) using OpenID Connect (OIDC) or Security Assertion Markup Language (SAML).

**Glean does not replace your SSO.** When you enable the Glean OAuth Authorization Server, Glean only acts as the authorization server that issues OAuth access tokens. User authentication continues to happen through your existing SSO Identity Provider (Google Workspace, Microsoft Entra ID, Okta, etc.) using the same OIDC or SAML configuration you already have. Glean reuses your existing SSO for authentication and adds OAuth token issuance on top.

note

The Indexing API uses a separate authentication model with Glean-issued tokens and does not accept OAuth.

## Overview[​](#overview "Direct link to Overview")

### When to choose this approach[​](#when-to-choose-this-approach "Direct link to When to choose this approach")

-   You are connecting MCP host applications to Glean's remote MCP server. This is the recommended authentication path for MCP and requires enabling the Glean OAuth Authorization Server.
-   You want faster setup without coordinating with your IdP team for new integrations.
-   You want Glean-defined, fine-grained scopes for Client API integrations.

### What Glean does and does not do[​](#what-glean-does-and-does-not-do "Direct link to What Glean does and does not do")

-   **Does**: Act as OAuth 2.1 Authorization Server (issue access tokens); define and enforce scopes; validate tokens at the Resource Server.
-   **Does not**: Replace or modify your SSO setup. User authentication continues via your existing SSO IdP (OIDC or SAML). Glean reuses your SSO, it doesn't reinvent it.

### Where it applies[​](#where-it-applies "Direct link to Where it applies")

-   **MCP Remote Servers**: Fully supported and recommended. This is the primary use case for the Glean OAuth Authorization Server. Note that host OAuth support may vary by MCP client application.
-   **Client API**: Supported for all Client API operations.

## Enable the Glean OAuth authorization server[​](#enable-the-glean-oauth-authorization-server "Direct link to Enable the Glean OAuth authorization server")

The Glean OAuth Authorization Server is disabled by default. To enable it, follow the steps below:

1.  Navigate to **Admin Console → Settings → Third‑party access (OAuth)**.
2.  Toggle on **Enable Glean OAuth Server**.

Once the Glean OAuth Authorization Server is enabled, you can start using it immediately, without any additional configuration.

tip

Admins who want to restrict which applications can connect via DCR (e.g. MCP host applications) can configure redirect URI restrictions—including blocking **all** dynamic registration while using only static clients. See [Dynamic Client Registration](/administration/oauth/dynamic-client-registration).

## User authorized applications[​](#user-authorized-applications "Direct link to User authorized applications")

Glean keeps track of which OAuth applications a user has approved so they can review and revoke access later.

At a high level:

-   When a user approves an OAuth client, Glean records a **consent snapshot** for that user and client.
-   Users can view the list of **authorized applications** for their account and see when each application was last used.
-   If a user **revokes** an application:
    -   Glean deletes the associated consents and refresh tokens for that user and client.
    -   The next time the application tries to use OAuth with Glean, the user will be prompted to sign in and approve access again.

### Use OAuth with MCP remote servers[​](#use-oauth-with-mcp-remote-servers "Direct link to Use OAuth with MCP remote servers")

Once enabled, MCP host applications can authenticate using the following flow:

-   The MCP host initiates the Authorization Code flow (opening a browser for IdP login and user consent)
-   The host obtains tokens through the Glean OAuth server
-   The host connects to Remote MCP endpoints using the OAuth token
-   Bearer token fallback: If an MCP host does not support OAuth, a user-scoped bearer token can be used as a fallback (less preferred than OAuth)

## Technical Reference[​](#technical-reference "Direct link to Technical Reference")

### Supported flows and endpoints[​](#supported-flows-and-endpoints "Direct link to Supported flows and endpoints")

-   Authorization Code with Proof Key for Code Exchange (PKCE).
-   Endpoints: Authorization, token, and OAuth authorization server metadata discovery for standard endpoint discovery and token acquisition.

#### OAuth endpoint URLs[​](#oauth-endpoint-urls "Direct link to OAuth endpoint URLs")

Replace `<instance>` with your Glean tenant name. For example, if your Glean URL is `https://app.glean.com`, your instance name is typically the subdomain of your backend host.

| Endpoint | URL |
| --- | --- |
| Authorization | `https://<instance>-be.glean.com/oauth/authorize` |
| Token | `https://<instance>-be.glean.com/oauth/token` |
| Dynamic Client Registration | `https://<instance>-be.glean.com/oauth/register` |
| OAuth Server Metadata | `https://<instance>-be.glean.com/.well-known/oauth-authorization-server` |

tip

You can fetch the OAuth Server Metadata document to programmatically discover all endpoint URLs for your tenant.

Static and dynamic OAuth clients use the same authorization and token endpoints. Only dynamic clients use the registration endpoint.

### Scopes and permissions[​](#scopes-and-permissions "Direct link to Scopes and permissions")

Glean-defined scopes govern API capabilities. Request the minimum scopes needed for your integration. Examples include `SEARCH`, `CHAT`, `AGENTS`, `MCP`, `DOCUMENTS`, `TOOLS`, and `ENTITIES`.

For **static OAuth clients**, you manage the allowed scopes directly in the Admin Console. To learn how to create and manage static OAuth clients, see [Static OAuth clients](/administration/oauth/static-client-registration).

For **dynamically registered clients**, Glean applies a configurable restricted scope set. Contact your Glean representative if you need to change that set for your tenant. See [Dynamic Client Registration](/administration/oauth/dynamic-client-registration) for more information on dynamic client registration.

For MCP remote servers, the relevant scopes (particularly `MCP` and related resource scopes) are automatically managed during the OAuth flow. The Indexing API uses a separate authentication model and does not accept OAuth.

### Troubleshooting and cautions[​](#troubleshooting-and-cautions "Direct link to Troubleshooting and cautions")

-   Ensure the Glean OAuth server is enabled; otherwise token acquisition or validation will fail.
-   Redirect URIs must match exactly; the PKCE verifier must match the original challenge.
-   Do not use OAuth for the Indexing API, which requires Glean-issued tokens.
-   MCP host client authentication failures or unknown client errors: Clear the host's stored MCP credentials and re-authenticate.

### Common OAuth issues[​](#common-oauth-issues "Direct link to Common OAuth issues")

| Issue | Possible cause | Resolution |
| --- | --- | --- |
| Frequent re‑authentication (every hour) | Access tokens are expiring and the refresh token flow is failing | Verify the OAuth client configuration (client ID/secret, token endpoint) and ensure the integration supports refresh token grants. Re‑authenticate from scratch to obtain a new refresh token. |
| “Invalid redirect\_uri” from identity provider or Glean | Redirect URI configured in the OAuth client does not exactly match the URI used in the flow | Confirm the redirect URI in the OAuth client configuration matches the callback URL used by your integration, including scheme, hostname, path, and case. Update either the client or the integration so they match. |
| Unknown client or authentication failure for an integration that used to work | Static client was deleted or had its secret rotated without updating the integration | In the Admin Console, verify that the static client still exists and is enabled. If the secret was regenerated, update the integration with the new client configuration or create a new static client. |
| MCP host DCR fails with HTTP 500 `server_error`: "OAuth Dynamic Client Registration disabled." on `POST /oauth/register` | The Glean OAuth Authorization Server is disabled on the tenant. Enabling the MCP server alone does not enable DCR — the OAuth Authorization Server is a separate toggle. | In the Admin Console, go to **Settings → Third‑party access (OAuth)** and enable the Glean OAuth Authorization Server. See [Enable the Glean OAuth authorization server](#enable-the-glean-oauth-authorization-server). After enabling, retry the DCR flow from the MCP host. |

## See also[​](#see-also "Direct link to See also")

-   [Back to Overview](/administration/oauth/oauth-overview)
-   [Dynamic Client Registration](/administration/oauth/dynamic-client-registration)
-   [IdP-based OAuth](/administration/oauth/oauth-idp)
-   [Client API authentication overview](https://developers.glean.com/api-info/client/authentication/overview)
-   [OAuth (IdP tokens) developer guide](https://developers.glean.com/api-info/client/authentication/oauth)
-   [MCP Remote Server (overview/host configurator)](https://developers.glean.com/guides/mcp/)
-   [MCP Server setup (admin enablement context)](/administration/tools/connect-remote-mcp-servers-to-glean)
