---
url: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-invalid-request"
canonical: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-invalid-request"
title: "OAUTH_INVALID_REQUEST"
description: "OAUTH_INVALID_REQUEST Error Code"
fetched_at: "2026-09-01T13:30:09.319Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The OAuth authorization request sent to the identity provider is malformed. This can happen when the request is missing a required parameter, includes an invalid parameter value, or contains a malformed redirect URI or token endpoint URL.

## Resolution[​](#resolution "Direct link to Resolution")

1.  In the Glean Admin Console, go to the connector or tool configuration that triggered this error.
2.  Verify that the **client ID**, **redirect URI**, and **scopes** are correctly configured and match the values registered with the identity provider.
3.  Check that the **authorization URL** and **token endpoint URL** are valid and properly formatted.
4.  Re-run the OAuth flow from the Admin Console.

For additional assistance, contact [Glean Support](https://support.glean.com).
