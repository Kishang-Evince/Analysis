---
url: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-invalid-client"
canonical: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-invalid-client"
title: "OAUTH_INVALID_CLIENT"
description: "OAUTH_INVALID_CLIENT Error Code"
fetched_at: "2026-09-01T13:30:09.620Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Client authentication failed at the identity provider's token endpoint. The client ID or client secret configured in Glean does not match what is registered with the identity provider, or the client secret has expired.

## Resolution[​](#resolution "Direct link to Resolution")

1.  In the Glean Admin Console, go to the connector or tool configuration that triggered this error.
2.  Verify that the **client ID** matches the value shown in the identity provider's app registration.
3.  Verify that the **client secret** is correct and has not expired or been rotated.
4.  Confirm that the **token endpoint URL** is correct for your environment (some providers require region-specific URLs).
5.  Re-run the OAuth flow from the Admin Console.

For additional assistance, contact [Glean Support](https://support.glean.com).
