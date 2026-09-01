---
url: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-invalid-scope"
canonical: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-invalid-scope"
title: "OAUTH_INVALID_SCOPE"
description: "OAUTH_INVALID_SCOPE Error Code"
fetched_at: "2026-09-01T13:30:09.578Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

One or more of the requested OAuth scopes are invalid, unknown, or not supported by the identity provider. The scopes configured in Glean do not match what the identity provider accepts for this app.

## Resolution[​](#resolution "Direct link to Resolution")

1.  Review the scopes configured for the connector or tool in the Glean Admin Console.
2.  Compare them against the scopes listed in the identity provider's documentation for the APIs Glean needs to access.
3.  Remove any unsupported, deprecated, or misspelled scopes.
4.  For apps that manage scopes through a manifest (such as Slack, Google, or Jira), update the app manifest and reinstall the app if needed.

For additional assistance, contact [Glean Support](https://support.glean.com).
