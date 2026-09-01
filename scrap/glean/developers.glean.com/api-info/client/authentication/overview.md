---
url: "https://developers.glean.com/api-info/client/authentication/overview"
canonical: "https://developers.glean.com/api-info/client/authentication/overview"
title: "Client API Authentication | Glean Developer"
description: "Choose the right authentication method for your Client API integration"
fetched_at: "2026-09-01T13:22:49.943Z"
---
On this page

This guide helps you choose and implement the right authentication method for Glean's **Client API**, which powers search, chat, collections, agents, and other user-facing functionality.

### OAuth (Recommended for per-user integrations)

**Glean Authorization Server or your IdP**

-   Tokens from the Glean OAuth Authorization Server or an external IdP
-   Works with Google, Azure, Okta, OneLogin
-   Glean-defined scopes (Authorization Server) or Client API access via your IdP
-   DCR subject to tenant policy, or admin-created static clients when DCR is unavailable or does not grant the required scopes

[Setup OAuth →](/api-info/client/authentication/oauth)

### Glean Tokens (Alternative)

**Granular control and flexibility**

-   Fine-grained scope control
-   User-scoped or global permissions
-   Manual token management
-   Best for specific use cases or testing

[Setup Glean Tokens →](/api-info/client/authentication/glean-issued)

* * *

## Quick Decision Guide[​](#quick-decision-guide "Direct link to Quick Decision Guide")

Choose your authentication method based on your needs:

### Choose OAuth if you:[​](#choose-oauth-if-you "Direct link to Choose OAuth if you:")

-   Are building a per-user Client API integration
-   Want users to authorize access without distributing Glean-issued API tokens
-   Can use the Glean OAuth Authorization Server (on by default; tenants that already used IdP OAuth may have it off) or already use supported OAuth tokens from your enterprise identity provider
-   Want the token issuer to manage expiration and refresh

### Choose Glean-issued tokens if you:[​](#choose-glean-issued-tokens-if-you "Direct link to Choose Glean-issued tokens if you:")

-   Call the Indexing API, which does not accept OAuth
-   Need a global token with `X-Glean-ActAs` to impersonate users
-   Have no OAuth path: the Glean OAuth Authorization Server is disabled and no external-IdP OAuth path is configured

* * *

## Authentication Headers Reference[​](#authentication-headers-reference "Direct link to Authentication Headers Reference")

Different authentication methods require different headers:

-   Glean OAuth Authorization Server
-   External IdP OAuth
-   User-Scoped Token
-   Global Token

```
Authorization: Bearer <oauth_access_token>
```

```
Authorization: Bearer <oauth_access_token>X-Glean-Auth-Type: OAUTH
```

```
Authorization: Bearer <user_scoped_token>
```

```
Authorization: Bearer <global_token>X-Glean-ActAs: user@company.com
```

* * *

## Quick Start[​](#quick-start "Direct link to Quick Start")

1

Choose your authentication method

Use the decision guide above to pick OAuth or Glean tokens

2

Follow the detailed setup guide

-   **OAuth**: [Complete OAuth Setup Guide](/api-info/client/authentication/oauth)
-   **Glean Tokens**: [Complete Glean Tokens Guide](/api-info/client/authentication/glean-issued)

3

Test your integration

Use the test commands in your chosen guide to verify authentication

4

Build your application

Start building with the [Client API Reference](/api/client-api)

* * *

## Testing Your Authentication[​](#testing-your-authentication "Direct link to Testing Your Authentication")

Use the [Search API Explorer](/api/client-api/search/search) to test a Client API request against your own tenant. API Explorer tests Client API authentication only. It is not production sample code. Implement the OAuth flow and token handling in your application before you deploy.

### Quick Test Commands[​](#quick-test-commands "Direct link to Quick Test Commands")

Replace `<instance>` with your Glean instance name ([how to find](/get-started/authentication#finding-your-server-url)):

-   Glean OAuth Authorization Server
-   External IdP OAuth
-   User-Scoped Token
-   Global Token

```
curl -X POST https://<instance>-be.glean.com/rest/api/v1/search \  -H 'Authorization: Bearer <OAUTH_TOKEN>' \  -H 'Content-Type: application/json' \  -d '{"query": "test", "pageSize": 1}'
```

```
curl -X POST https://<instance>-be.glean.com/rest/api/v1/search \  -H 'Authorization: Bearer <OAUTH_TOKEN>' \  -H 'X-Glean-Auth-Type: OAUTH' \  -H 'Content-Type: application/json' \  -d '{"query": "test", "pageSize": 1}'
```

```
curl -X POST https://<instance>-be.glean.com/rest/api/v1/search \  -H 'Authorization: Bearer <USER_TOKEN>' \  -H 'Content-Type: application/json' \  -d '{"query": "test", "pageSize": 1}'
```

```
curl -X POST https://<instance>-be.glean.com/rest/api/v1/search \  -H 'Authorization: Bearer <GLOBAL_TOKEN>' \  -H 'X-Glean-ActAs: your-email@company.com' \  -H 'Content-Type: application/json' \  -d '{"query": "test", "pageSize": 1}'
```

### Expected Response[​](#expected-response "Direct link to Expected Response")

Successful authentication returns a 200 status with search results:

```
{  "results": [...],  "trackingToken": "...",  "requestId": "..."}
```

* * *

## Common Authentication Errors[​](#common-authentication-errors "Direct link to Common Authentication Errors")

| Error | Likely Cause | Solution |
| --- | --- | --- |
| `401 Unauthorized` | Invalid or expired token | Verify token is correct and not expired |
| `403 Forbidden` | Insufficient permissions | Check token scopes or OAuth settings |
| `Missing X-Glean-Auth-Type header` / `Invalid Secret` | External-IdP OAuth token sent without the auth-type header | Add `X-Glean-Auth-Type: OAUTH` (external-IdP tokens only; not needed for Glean Authorization Server tokens) |
| `Required header missing: X-Glean-ActAs` | Global token header missing | Add `X-Glean-ActAs: user@email.com` |

For detailed troubleshooting, see your specific authentication guide.

* * *

## Best Practices[​](#best-practices "Direct link to Best Practices")

### Security[​](#security "Direct link to Security")

-   **Store tokens securely** - Never commit tokens to version control
-   **Use environment variables** for token storage in applications
-   **Implement proper error handling** for authentication failures
-   **Monitor token usage** through appropriate admin consoles

### Development[​](#development "Direct link to Development")

-   **Test authentication first** - Verify auth works before building features
-   **Create separate tokens** for development, staging, and production
-   **Use descriptive names** for tokens to track their purpose
-   **Plan your architecture** early - some settings cannot be changed later

* * *

## Implementation Guides[​](#implementation-guides "Direct link to Implementation Guides")

Ready to implement? Choose your path:

[

### OAuth Authentication

**Complete OAuth setup guide**

-   Provider-specific setup (Google, Azure, Okta, OneLogin)
-   Configuration in Glean admin console
-   Implementation examples and testing
-   OAuth-specific troubleshooting







](/api-info/client/authentication/oauth)[

### Glean-Issued Tokens

**Complete Glean tokens guide**

-   Token creation and management
-   Scope selection and planning
-   User-scoped vs global tokens
-   Token-specific troubleshooting







](/api-info/client/authentication/glean-issued)[

### Datasource OAuth Redirects

**Control post-auth redirects**

-   Per-request redirect URL for headless integrations
-   Tenant-level default redirect configuration
-   Full flow walkthrough







](/api-info/client/authentication/datasource-oauth)

* * *

## Next Steps[​](#next-steps "Direct link to Next Steps")

[

### Client API Reference

Explore available Client API endpoints







](/api/client-api)[

### Search Implementation

Learn advanced search techniques







](/guides/search/filtering-results)[

### Chat Integration

Build chat applications with Glean







](/api/client-api/chat/overview)

* * *

## Need Help?[​](#need-help "Direct link to Need Help?")

-   **Getting Started**: Use the decision guide above to choose your path
-   **Technical Issues**: Check the detailed guides linked above
-   **Admin Access**: Contact your Glean administrator for token creation or OAuth setup
-   **Community**: Join discussions at [community.glean.com](https://community.glean.com)
