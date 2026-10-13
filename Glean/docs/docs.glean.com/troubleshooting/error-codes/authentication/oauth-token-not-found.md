---
url: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-token-not-found"
canonical: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-token-not-found"
title: "OAUTH_TOKEN_NOT_FOUND"
description: "OAUTH_TOKEN_NOT_FOUND Error Code"
fetched_at: "2026-10-13T08:50:54.420Z"
---
On this page

## What this means[​](#what-this-means "Direct link to What this means")

Glean doesn't have stored credentials for this teammate and tool. This typically happens when:

-   The teammate hasn't connected their account to the tools yet.
-   Credentials were cleared.
-   The teammate disconnected the tool from their Glean settings, or Glean Support reset their stored token.
-   A previously stored token was removed because a background refresh failed.

## What to do as a teammate[​](#what-to-do-as-a-teammate "Direct link to What to do as a teammate")

1.  Run an agent that uses the tool, or trigger the tool directly.
2.  When prompted, click **Connect** to authorize Glean to access the source system on your behalf.
3.  Complete the OAuth flow in the source system and return to Glean.

## What to do as an admin[​](#what-to-do-as-an-admin "Direct link to What to do as an admin")

If teammates can't connect or keep seeing this error:

1.  Confirm the tools are set up in **Admin console → Platform → Tools** and that the authentication method, **Central** or **Custom**, is correctly configured.
2.  If the tools uses the **Central** app, verify that any required site-level or org-level approvals are in place. For example, Jira tools require a Jira site admin to authorize the OAuth app for the Atlassian site before other teammates can connect.
3.  If the tools uses a **Custom** OAuth app, verify the client ID, client secret, and callback URL are correct and that the app is still active in the source system.

Admins can't clear or reset a single teammate's stored credentials from the **Admin console**. If one teammate's connection is stuck, ask them to disconnect the tool and connect it again. See [Reset your own authorization](/troubleshooting/tools-authentication#reset-your-own-authorization). If that doesn't work, contact Glean Support with the teammate's email address.

If the teammate previously had a working connection that disappeared, a background token refresh likely failed and the stored token was removed. See [OAUTH\_TOKEN\_REFRESH\_FAILED](/troubleshooting/error-codes/authentication/oauth-token-refresh-failed) for common causes and a re-authorization runbook.

For more guidance, see [Troubleshooting tools authentication](/troubleshooting/tools-authentication).

For additional assistance, contact [Glean Support](https://support.glean.com).
