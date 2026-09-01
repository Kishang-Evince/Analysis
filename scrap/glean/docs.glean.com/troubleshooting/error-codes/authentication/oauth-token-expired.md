---
url: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-token-expired"
canonical: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-token-expired"
title: "OAUTH_TOKEN_EXPIRED"
description: "OAUTH_TOKEN_EXPIRED Error Code"
fetched_at: "2026-09-01T13:30:10.062Z"
---
On this page

## What this means[​](#what-this-means "Direct link to What this means")

The stored OAuth credentials for a tool or connector have expired, and Glean can't refresh them automatically. This typically happens when the source system's access token has a short lifetime and the refresh token is either missing or has also expired.

## What to do as a teammate[​](#what-to-do-as-a-teammate "Direct link to What to do as a teammate")

1.  Re-run the agent or tool that triggered the error.
2.  When prompted, click **Connect** to re-authenticate with the source system.
3.  After re-authenticating, retry your original request.

## What to do as an admin[​](#what-to-do-as-an-admin "Direct link to What to do as an admin")

If teammates are repeatedly hitting this error:

1.  Confirm which authentication method the tools uses, **Central** or **Custom**, in **Admin console → Platform → Tools**.
2.  If the tools uses a **Custom** OAuth app, verify that the app's refresh token policy in the source system allows long-lived refresh tokens. Short-lived refresh tokens cause frequent re-authentication prompts.
3.  Verify that the custom OAuth app's client secret hasn't been rotated or revoked in the source system.

If this error recurs frequently, the identity provider may have policies that shorten token lifetimes. See [OAUTH\_TOKEN\_REFRESH\_FAILED](/troubleshooting/error-codes/authentication/oauth-token-refresh-failed) for a full troubleshooting runbook, including common causes like Conditional Access policies, app verification status, and expected token lifetimes.

For more guidance, see [Troubleshooting tools authentication](/troubleshooting/tools-authentication).

For additional assistance, contact [Glean Support](https://support.glean.com).
