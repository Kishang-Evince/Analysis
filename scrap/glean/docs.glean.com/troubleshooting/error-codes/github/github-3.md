---
url: "https://docs.glean.com/troubleshooting/error-codes/github/github-3"
canonical: "https://docs.glean.com/troubleshooting/error-codes/github/github-3"
title: "GITHUB_3"
description: "GITHUB_3 Error Code"
fetched_at: "2026-09-01T13:30:19.186Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean isn't able to generate an access token for a GitHub organization where the GitHub App is installed.

## Resolution[​](#resolution "Direct link to Resolution")

### Install GitHub for the organization[​](#install-github-for-the-organization "Direct link to Install GitHub for the organization")

The GitHub App isn't installed in the provided organization. We need the GitHub App to be installed in the organization so that we can validate whether repository and organization-specific endpoints are accessible.

### Allow Glean access to GitHub[​](#allow-glean-access-to-github "Direct link to Allow Glean access to GitHub")

Glean isn't able to connect to the GitHub server. Please allowlist the [IP addresses](/security/networking/glean-ip-ranges) of your Glean project on your GitHub instance.

### Slow down your request rate[​](#slow-down-your-request-rate "Direct link to Slow down your request rate")

You may have exceeded the request rate of the central Glean GitHub App, which enforces a limit of [2,000 requests per hour](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28#about-secondary-rate-limits). In that case, wait before trying again to slow your rate of requests.

For additional assistance, contact [Glean Support](https://support.glean.com).
