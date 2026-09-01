---
url: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-unauthorized-client"
canonical: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-unauthorized-client"
title: "OAUTH_UNAUTHORIZED_CLIENT"
description: "OAUTH_UNAUTHORIZED_CLIENT Error Code"
fetched_at: "2026-09-01T13:30:10.187Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The OAuth app (client) is not authorized to use the requested grant type or scopes. The identity provider recognizes the client but has not approved it for the type of request Glean is making.

## Resolution[​](#resolution "Direct link to Resolution")

1.  In the identity provider's admin console, verify that the OAuth app is configured to allow the **authorization code** grant type.
2.  Confirm that the app has been approved or trusted for the tenant or organization.
3.  Check whether admin consent is required and, if so, have an administrator grant consent for the app.
4.  Verify that no access restrictions (such as user or group assignments) are blocking the request.

For additional assistance, contact [Glean Support](https://support.glean.com).
