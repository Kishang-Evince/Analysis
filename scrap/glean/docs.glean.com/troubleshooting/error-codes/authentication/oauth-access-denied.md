---
url: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-access-denied"
canonical: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-access-denied"
title: "OAUTH_ACCESS_DENIED"
description: "OAUTH_ACCESS_DENIED Error Code"
fetched_at: "2026-09-01T13:30:09.197Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The user or identity provider denied the OAuth authorization request. This typically occurs when the user declines the consent prompt or when an administrator has blocked the app at the organization level.

## Resolution[​](#resolution "Direct link to Resolution")

1.  Have the user retry the OAuth flow and accept all requested permissions on the consent screen.
2.  If admin consent is required, have an identity provider administrator approve the Glean OAuth app for the organization.
3.  In the identity provider's admin console, check whether the app has been explicitly blocked or restricted to specific users or groups.

For additional assistance, contact [Glean Support](https://support.glean.com).
