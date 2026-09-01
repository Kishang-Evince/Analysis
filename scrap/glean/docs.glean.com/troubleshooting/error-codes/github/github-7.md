---
url: "https://docs.glean.com/troubleshooting/error-codes/github/github-7"
canonical: "https://docs.glean.com/troubleshooting/error-codes/github/github-7"
title: "GITHUB_7"
description: "GITHUB_7 error code"
fetched_at: "2026-09-01T13:30:19.639Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

This error occurs when Glean cannot fetch users from your GitHub enterprise. Glean lists the members of the enterprise to build identity and permissions, and the request to do so failed.

## Possible causes and resolution[​](#possible-causes-and-resolution "Direct link to Possible causes and resolution")

-   **GitHub Enterprise Cloud:** The GitHub app installed on the enterprise may be missing the permissions required to read enterprise members. Ensure that you have added the "Enterprise people" scope to your GitHub app and that the app is [installed at the enterprise level](https://docs.github.com/en/enterprise-cloud@latest/apps/using-github-apps/installing-a-github-app-on-your-enterprise).
-   **GitHub Enterprise Server (on-prem):** The admin personal access token (PAT) configured in Glean may be missing the scopes required to list enterprise members, or its owner is not an enterprise owner. Ensure that the PAT is a classic token owned by an enterprise owner with the `user:email`, `read:enterprise`, and `read:org` scopes.

If you are still having difficulty, contact [Glean Support](https://support.glean.com).
