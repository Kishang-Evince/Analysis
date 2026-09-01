---
url: "https://docs.glean.com/troubleshooting/error-codes/bitbucket/bitbucket-5"
canonical: "https://docs.glean.com/troubleshooting/error-codes/bitbucket/bitbucket-5"
title: "BITBUCKET_5"
description: "BITBUCKET_5 Error Code"
fetched_at: "2026-09-01T13:30:10.725Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

We are unable to fetch permissions for any repository using the provided credentials.

## Resolution[​](#resolution "Direct link to Resolution")

### For Bitbucket Cloud:[​](#for-bitbucket-cloud "Direct link to For Bitbucket Cloud:")

This error occurs when the API token was created by a non-admin user or is missing one of the required scopes.

Please ensure that:

1.  The API token was created by a user with **admin** privileges.
2.  The API token has all of the required scopes that were requested during setup.

### For Bitbucket Server:[​](#for-bitbucket-server "Direct link to For Bitbucket Server:")

This error occurs when the HTTP access token does not have sufficient permissions.

Please ensure that the HTTP access token has **REPO\_ADMIN** access.

If you are still having difficulty please reach out to us: [https://support.glean.com](https://support.glean.com).
