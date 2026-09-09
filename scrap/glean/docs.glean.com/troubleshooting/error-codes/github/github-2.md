---
url: "https://docs.glean.com/troubleshooting/error-codes/github/github-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/github/github-2"
title: "GITHUB_2"
description: "GITHUB_2 Error Code"
fetched_at: "2026-09-01T13:30:19.155Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

We're unable to fetch GitHub resources such as members, issues, or repositories from the GitHub organization.

## Resolution[​](#resolution "Direct link to Resolution")

### Validate custom GitHub App scopes[​](#validate-custom-github-app-scopes "Direct link to Validate custom GitHub App scopes")

Ensure that the correct scopes have been granted as described in the documentation so that Glean can fetch the resources:

-   **GitHub** and **GitHub Server:** confirm the [GitHub App scopes](/connectors/native/github-server/setup#step-1-create-a-github-app)
-   **GitHub Enterprise Server:** confirm both the [GitHub App permissions](/connectors/native/github-enterprise-server/setup#step-1-create-a-github-app) and the [required admin token scopes](/connectors/native/github-enterprise-server/setup#required-admin-token-scopes) - `user:email`, `read:enterprise`, and `read:org`

### Verify resources in the GitHub organization[​](#verify-resources-in-the-github-organization "Direct link to Verify resources in the GitHub organization")

Ensure that there is at least one resource of each type in the GitHub organization (members, repositories, and issues).

note

Issues also include pull requests according to the GitHub API documentation.

### Allow Glean access to GitHub[​](#allow-glean-access-to-github "Direct link to Allow Glean access to GitHub")

Glean isn't able to connect to your GitHub instance. Please allowlist the [IP addresses](/security/networking/glean-ip-ranges) of your Glean project on your GitHub instance.

For additional assistance, contact [Glean Support](https://support.glean.com).
