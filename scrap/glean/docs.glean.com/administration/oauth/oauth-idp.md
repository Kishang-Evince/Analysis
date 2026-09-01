---
url: "https://docs.glean.com/administration/oauth/oauth-idp"
canonical: "https://docs.glean.com/administration/oauth/oauth-idp"
title: "OAuth with IdP-issued tokens"
description: "Customers can register an OAuth 2.1 (OAuth) application in their enterprise Identity Provider (IdP) and enable Glean to accept those IdP-issued access tokens for Client API calls. Glean validates and enforces permissions for user-scoped tokens; token lifecycle (issuance, expiry, refresh) is governed by your IdP."
fetched_at: "2026-09-01T13:29:10.414Z"
---
On this page

Customers can register an OAuth 2.1 (OAuth) application in their enterprise Identity Provider (IdP) and enable Glean to accept those IdP-issued access tokens for Client API calls. Glean validates and enforces permissions for user-scoped tokens; token lifecycle (issuance, expiry, refresh) is governed by your IdP.

note

OAuth authentication is only supported for the Client API and MCP Remote Servers. Indexing API operations require Glean-issued tokens and do not accept OAuth.

## When to choose IdP-based OAuth (REST)[​](#when-to-choose-idp-based-oauth-rest "Direct link to When to choose IdP-based OAuth (REST)")

-   You already operate enterprise OAuth in your IdP and want to reuse those tokens for Client API access.

### How this compares to the Glean OAuth Authorization Server[​](#how-this-compares-to-the-glean-oauth-authorization-server "Direct link to How this compares to the Glean OAuth Authorization Server")

This page covers **IdP‑issued tokens** only: your identity provider (for example, Google Workspace, Microsoft Entra ID, Okta, OneLogin) acts as the OAuth authorization server, and Glean validates those tokens.

In contrast, the **Glean OAuth Authorization Server**:

-   Issues OAuth tokens directly from Glean, while still delegating user sign‑in to your existing SSO IdP.
-   Is the recommended path for:
    -   MCP Remote Servers.
    -   Admin‑managed static OAuth clients (for partner integrations or custom internal apps).
-   Provides Glean‑defined scopes and centralized controls for which applications can access Glean.

If you are deciding between IdP‑based OAuth and the Glean OAuth server for a new integration, see:

-   [OAuth Overview](/administration/oauth/oauth-overview)
-   [Glean OAuth Authorization Server](/administration/oauth/authorization-server)

## Set up IDP-Configured OAuth[​](#set-up-idp-configured-oauth "Direct link to Set up IDP-Configured OAuth")

Here's how to set up IDP-configured OAuth:

1.  Register an OAuth client in your IdP using the Authorization Code flow. Add Proof Key for Code Exchange (PKCE) for public/native clients if required by your IdP.
2.  Navigate to **Admin Console → Settings → Third‑party access (OAuth)**.
3.  Toggle on **Enable IDP OAuth for API access**.
4.  Select **Manage Settings**
5.  Enter the **Issuer subdomain**, **Allowed clientID(s)**, and **MCP Device Flow client ID**.
6.  Select **Save**.

After you set up IDP-configured OAuth, your application can call the Glean Client API using OAuth tokens issued by your IdP. Your application calls the Glean Client API, and passing the bearer token in the `Authorization` header and includes the header `X-Glean-Auth-Type: OAuth`.

## Token characteristics[​](#token-characteristics "Direct link to Token characteristics")

-   User-scoped; permissions are enforced by Glean at request time.
-   Validation includes issuer and client\_id (and optional audience if configured by your admin).
-   Expiry and refresh are controlled by your IdP.

## Common pitfalls and troubleshooting[​](#common-pitfalls-and-troubleshooting "Direct link to Common pitfalls and troubleshooting")

-   401/403 due to OAuth not enabled in Glean or missing `X-Glean-Auth-Type` header.
-   Mismatch between registered client\_id/issuer in Glean Admin and the token presented.
-   IdP-side assignments/policies preventing user token issuance.
-   Attempting to call the Indexing API with OAuth tokens.

## MCP note[​](#mcp-note "Direct link to MCP note")

MCP Remote Servers typically rely on the Glean OAuth Authorization Server path with Dynamic Client Registration (DCR). Do not attempt to wire MCP hosts directly to IdP-based REST OAuth unless your host’s guidance explicitly supports that model.

## IdP setup references[​](#idp-setup-references "Direct link to IdP setup references")

Use your IdP's standard application registration and policy configuration. We recommend OpenID Connect (OIDC).

-   [Entra ID (OIDC) setup](/administration/identity/sso/configuration/entra-id-oidc)
-   [Google (OIDC) setup](/administration/identity/sso/configuration/google-oidc)
-   [Okta (SAML) setup](/administration/identity/sso/configuration/okta-saml)
-   [Generic SAML overview](/get-started/setup/configure-sso)

### Canonical IdP references[​](#canonical-idp-references "Direct link to Canonical IdP references")

-   Microsoft Entra ID (Azure AD): [Authorization code flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow) · [Register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)
-   Google Identity Platform: [OAuth 2.0 for Web Server Applications](https://developers.google.com/identity/protocols/oauth2/web-server) · [OAuth 2.0 for Mobile & Desktop Apps (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app)
-   Okta: [Implement the Authorization Code flow](https://developer.okta.com/docs/guides/implement-grant-type/authcode/main/) · [OIDC and OAuth 2.0 overview](https://developer.okta.com/docs/concepts/oauth-openid/)
-   OneLogin: [OpenID Connect (developer docs)](https://developers.onelogin.com/openid-connect)

## See also[​](#see-also "Direct link to See also")

-   [Back to Overview](/administration/oauth/oauth-overview)
-   [Forward to Glean OAuth Authorization Server](/administration/oauth/authorization-server)
-   [Client API authentication overview](https://developers.glean.com/api-info/client/authentication/overview)
-   [OAuth (IdP tokens) developer guide](https://developers.glean.com/api-info/client/authentication/oauth)
-   [MCP Remote Server (overview/host configurator)](https://developers.glean.com/guides/mcp/)
-   [MCP Server setup (admin enablement context)](/administration/tools/connect-remote-mcp-servers-to-glean)
