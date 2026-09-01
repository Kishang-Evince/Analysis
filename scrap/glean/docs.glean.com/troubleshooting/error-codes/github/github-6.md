---
url: "https://docs.glean.com/troubleshooting/error-codes/github/github-6"
canonical: "https://docs.glean.com/troubleshooting/error-codes/github/github-6"
title: "GITHUB_6"
description: "GITHUB_6 error code"
fetched_at: "2026-09-01T13:30:19.514Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

This error occurs when Glean cannot authenticate with your GitHub enterprise account. Glean was unable to mint a GitHub app installation token for the enterprise by using the configured GitHub app credentials.

## Possible causes and resolution[​](#possible-causes-and-resolution "Direct link to Possible causes and resolution")

-   The GitHub app may not have been [installed at the enterprise level](https://docs.github.com/en/enterprise-cloud@latest/apps/using-github-apps/installing-a-github-app-on-your-enterprise). Glean needs this in order to mint an installation token and access enterprise-level resources such as users, organizations and enterprise teams. Ensure you have added the "Enterprise people" and "Enterprise teams" scope to your Github app.
-   The GitHub app credentials (app ID and private key) may be invalid or don't match the app installed on the enterprise. Ensure that the app ID and private key configured on the Glean setup page match the corresponding values in the GitHub app.
-   The enterprise name (slug) configured in Glean may not match your GitHub enterprise. Ensure that the enterprise name on the Glean setup page matches the slug in your GitHub enterprise account URL.

If you are still having difficulty, contact [Glean Support](https://support.glean.com).
