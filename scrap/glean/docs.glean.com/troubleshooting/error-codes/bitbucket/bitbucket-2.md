---
url: "https://docs.glean.com/troubleshooting/error-codes/bitbucket/bitbucket-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/bitbucket/bitbucket-2"
title: "BITBUCKET_2"
description: "BITBUCKET_2 Error Code"
fetched_at: "2026-09-01T13:30:10.806Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

-   We are unable to fetch Bitbucket repositories using the OAuth consumer credentials (cloud) or access token (server) that were provided.
-   Onboarded Bitbucket instance doesn't have any repositories for crawling.

## Resolution[​](#resolution "Direct link to Resolution")

Make sure the onboarded instance has at least one repository for crawling.

### For Bitbucket Cloud:[​](#for-bitbucket-cloud "Direct link to For Bitbucket Cloud:")

Please ensure that the Bitbucket OAuth consumer was given the permissions "Account:Read" and "Account:Email".

### For Bitbucket Server:[​](#for-bitbucket-server "Direct link to For Bitbucket Server:")

Please ensure that the access token was given the permissions "Project: Read" and "Repository: Admin".

If you are still having difficulty please reach out to us: [https://support.glean.com](https://support.glean.com).
