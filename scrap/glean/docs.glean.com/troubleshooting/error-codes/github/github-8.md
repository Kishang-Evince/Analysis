---
url: "https://docs.glean.com/troubleshooting/error-codes/github/github-8"
canonical: "https://docs.glean.com/troubleshooting/error-codes/github/github-8"
title: "GITHUB_8"
description: "GITHUB_8 error code"
fetched_at: "2026-09-01T13:30:19.627Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

This error occurs when Glean cannot fetch teams or team memberships from your GitHub Enterprise instance. Glean reads enterprise teams and their members to build identity and permissions, and the request to do so failed.

## Possible causes and resolution[​](#possible-causes-and-resolution "Direct link to Possible causes and resolution")

-   The GitHub app installed on the enterprise may be missing the permissions required to read enterprise teams. Ensure that you have added the "Enterprise Teams" scope to your GitHub app and that the app is [installed at the enterprise level](https://docs.github.com/en/enterprise-cloud@latest/apps/using-github-apps/installing-a-github-app-on-your-enterprise).

If you are still having difficulty, contact [Glean Support](https://support.glean.com).
