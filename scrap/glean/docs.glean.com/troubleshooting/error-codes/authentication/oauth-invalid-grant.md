---
url: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-invalid-grant"
canonical: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-invalid-grant"
title: "OAUTH_INVALID_GRANT"
description: "OAUTH_INVALID_GRANT Error Code"
fetched_at: "2026-09-01T13:30:09.594Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The authorization code or refresh token provided to the identity provider is invalid, expired, revoked, or the redirect URI does not match the one used in the original authorization request.

## Resolution[​](#resolution "Direct link to Resolution")

1.  Re-run the OAuth flow from the Glean Admin Console to obtain a new authorization code.
2.  Ensure the **redirect URI** configured in Glean exactly matches the one registered with the identity provider, including the protocol and any trailing slashes.
3.  If the identity provider uses short-lived authorization codes, complete the OAuth flow promptly without delays.
4.  Check whether the refresh token has been revoked in the identity provider's admin console.

For additional assistance, contact [Glean Support](https://support.glean.com).
