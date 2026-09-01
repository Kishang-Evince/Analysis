---
url: "https://docs.glean.com/troubleshooting/error-codes/github/github-9"
canonical: "https://docs.glean.com/troubleshooting/error-codes/github/github-9"
title: "GITHUB_9"
description: "GITHUB_9 Error Code"
fetched_at: "2026-09-01T13:30:19.692Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean isn't able to list the organizations where the GitHub App is installed.

## Resolution[​](#resolution "Direct link to Resolution")

### Install the GitHub App for the organization[​](#install-the-github-app-for-the-organization "Direct link to Install the GitHub App for the organization")

Ensure the GitHub App is installed in at least one organization. Glean requires the app to be installed at the organization level to discover and validate that resources in organizations are accessible.

### Allow Glean access to GitHub[​](#allow-glean-access-to-github "Direct link to Allow Glean access to GitHub")

Glean may not be able to connect to the GitHub server. Allowlist the [IP addresses](/security/networking/glean-ip-ranges) of your Glean project on your GitHub instance.

### Verify app credentials[​](#verify-app-credentials "Direct link to Verify app credentials")

Ensure that the App ID and private key configured in Glean are correct. Invalid credentials prevent Glean from authenticating and listing installations.

For additional assistance, contact [Glean Support](https://support.glean.com).
