---
url: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-unsupported-grant-type"
canonical: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-unsupported-grant-type"
title: "OAUTH_UNSUPPORTED_GRANT_TYPE"
description: "OAUTH_UNSUPPORTED_GRANT_TYPE Error Code"
fetched_at: "2026-09-01T13:30:10.212Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The identity provider does not support the grant type used in the token request. Glean uses the `authorization_code` grant type for OAuth flows, and the provider has rejected it.

## Resolution[​](#resolution "Direct link to Resolution")

1.  In the identity provider's admin console, verify that the OAuth app is configured to allow the **authorization code** grant type.
2.  Some providers require explicit enablement of specific grant types in the app registration settings.
3.  If the provider does not support the authorization code grant type, contact [Glean Support](https://support.glean.com) to discuss alternative authentication options.

For additional assistance, contact [Glean Support](https://support.glean.com).
