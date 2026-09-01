---
url: "https://docs.glean.com/administration/oauth/oauth-overview"
canonical: "https://docs.glean.com/administration/oauth/oauth-overview"
title: "OAuth Overview"
description: "Glean supports OAuth 2.1 for authenticating requests to the Client API and for connecting Model Context Protocol (MCP) host applications to Glean's Remote MCP Servers."
fetched_at: "2026-09-01T13:29:10.304Z"
---
On this page

Glean supports OAuth 2.1 for authenticating requests to the Client API and for connecting Model Context Protocol (MCP) host applications to Glean's Remote MCP Servers.

note

This guidance doesn't apply to the Indexing API.

## Where OAuth applies at Glean[​](#where-oauth-applies-at-glean "Direct link to Where OAuth applies at Glean")

-   **Client API**: OAuth is supported for REST access to search, chat, agents, and related endpoints.
-   **Remote MCP Servers**: OAuth is supported and recommended. Use bearer token fallback only if the host application cannot perform OAuth.
-   **Indexing API**: OAuth isn't supported. The Indexing API uses a different authentication mechanism with Glean-issued tokens.

## Supported OAuth variants[​](#supported-oauth-variants "Direct link to Supported OAuth variants")

-   **IdP-based OAuth (Authorization Code)**: Use access tokens issued by your enterprise Identity Provider (IdP) such as Google Workspace, Microsoft Entra ID/Azure AD, Okta, or OneLogin. Best fit for REST integrations when you already operate OAuth in your IdP. See [OAuth with IdP‑issued tokens](/administration/oauth/oauth-idp).
-   **Glean OAuth Authorization Server (Authorization Code + PKCE)**: Glean issues OAuth tokens with Glean-defined scopes to users logged in to Glean. If necessary, users are seamlessly directed to log in with your SSO provider as part of the authorization process. Recommended for new REST integrations and required for the recommended MCP path. See [Glean OAuth Authorization Server](/administration/oauth/authorization-server).

Proof Key for Code Exchange (PKCE) is an OAuth 2.0 extension (and required in OAuth 2.1) to prevent authorization code injection attacks. [Learn more](https://oauth.net/2/pkce/). Admins can [configure redirect URI allowlisting](/administration/oauth/dynamic-client-registration) to control which redirect URIs are permitted for OAuth clients.

## Which OAuth approach should you choose?[​](#which-oauth-approach-should-you-choose "Direct link to Which OAuth approach should you choose?")

| Consideration | Glean OAuth Authorization Server | IdP-based OAuth |
| --- | --- | --- |
| **Setup complexity** | Simple. Configure entirely within Glean Admin Console. | Complex. Requires registering OAuth app in your IdP, then configuring Glean to accept those tokens. |
| **Who needs to be involved** | Only Glean admins. | Glean admins + IdP admins. If you don't manage your IdP directly, expect coordination delays. |
| **Time to get started** | Fast. Enable in Admin Console and register client apps immediately. | Slower. Depends on IdP team availability and approval processes. |
| **Best for** | New integrations, MCP connections, when you want quick deployment. | Existing OAuth infrastructure, centralized token governance, strict enterprise policies requiring all OAuth through IdP. |
| **MCP support** | Required for MCP Remote Servers. | Not suitable for MCP. |
| **Token lifecycle** | Managed by Glean. Issuance, expiry, and refresh handled by Glean's OAuth server. | Managed by your IdP. Aligns with existing enterprise token policies. |
| **Scopes** | Fine-grained Glean-defined scopes (SEARCH, CHAT, AGENTS, MCP, etc.). | User-scoped permissions; Glean enforces access based on user identity. |
| **User authentication** | **Glean does not replace your SSO.** Users authenticate via your existing SSO IdP (Google, Entra, Okta, etc. using OIDC/SAML). Glean reuses your existing SSO configuration and only issues OAuth access tokens after successful authentication. No changes to your SSO setup required. | Users authenticate via your IdP's OAuth flow. |

tip

**Recommendation**: Use Glean OAuth Authorization Server unless you have a specific requirement to centralize all OAuth token issuance in your IdP or existing IdP-based OAuth applications you want to extend to Glean.

## What’s supported vs. not supported[​](#whats-supported-vs-not-supported "Direct link to What’s supported vs. not supported")

| Category | Supported | Not supported |
| --- | --- | --- |
| Grant types | Authorization Code with PKCE (OAuth 2.1 compliant) | Implicit; Resource Owner Password Credentials (ROPC) |
| Client API auth | HTTP Bearer tokens (OAuth access tokens) with required headers | OAuth for Indexing API |
| MCP Remote Servers | OAuth via Authorization Code; bearer token fallback if host cannot do OAuth |  |

## Quick reference[​](#quick-reference "Direct link to Quick reference")

Based on your choice, see the following links for setup instructions:

-   **IdP-based OAuth**: See [OAuth with IdP‑issued tokens](/administration/oauth/oauth-idp) for configuration steps.
-   **Glean OAuth Authorization Server**: See [Glean OAuth Authorization Server](/administration/oauth/authorization-server) for setup instructions.
-   **MCP connections**: Require the Glean OAuth Authorization Server. Follow your MCP host's OAuth configuration guide.

### Static OAuth clients[​](#static-oauth-clients "Direct link to Static OAuth clients")

The Glean OAuth Authorization Server supports **static OAuth clients**: admin-created applications with a stable `client_id`, explicitly configured redirect URIs, and an allowed set of scopes. Use these for partner integrations and customer-built internal applications. See [Static OAuth clients](/administration/oauth/static-client-registration).

To use static clients **without** allowing dynamic client registration, see [Do not allow dynamic client registrations](/administration/oauth/dynamic-client-registration#do-not-allow-dynamic-client-registrations).

### Dynamic OAuth clients[​](#dynamic-oauth-clients "Direct link to Dynamic OAuth clients")

The Glean OAuth Authorization Server supports [Dynamic Client Registration (DCR)](/administration/oauth/dynamic-client-registration): clients register themselves at connection time instead of being pre-configured by an admin. DCR is the preferred approach for MCP host applications connecting to Glean, as defined by the [MCP Authorization specification](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization#dynamic-client-registration).

For admin controls and full configuration steps, see [Dynamic Client Registration](/administration/oauth/dynamic-client-registration).

## See also[​](#see-also "Direct link to See also")

-   [Client API authentication overview](https://developers.glean.com/api-info/client/authentication/overview)
-   [OAuth (IdP tokens) developer guide](https://developers.glean.com/api-info/client/authentication/oauth)
-   [Entra ID (OIDC) setup](/administration/identity/sso/configuration/entra-id-oidc)
-   [Google (OIDC) setup](/administration/identity/sso/configuration/google-oidc)
-   [Okta (SAML) setup](/administration/identity/sso/configuration/okta-saml)
-   [Generic SAML overview](/get-started/setup/configure-sso)
-   [About Glean OAuth Server](/administration/oauth/authorization-server)
-   [Dynamic Client Registration](/administration/oauth/dynamic-client-registration)
-   [Static OAuth clients](/administration/oauth/static-client-registration)
-   [MCP Remote Server (overview/host configurator)](https://developers.glean.com/guides/mcp/)
-   [MCP Server setup (admin enablement context)](/administration/tools/connect-remote-mcp-servers-to-glean)
