---
url: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-1"
title: "OAUTH-1"
description: "OAUTH-1 Error Code"
fetched_at: "2026-09-01T13:30:09.235Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The email address used to authenticate during the OAuth flow belongs to a domain that isn't registered with your Glean deployment. Glean validates that the OAuth account's email domain matches one of the company domains configured for your organization. For example, authenticating with a personal email address instead of a corporate one triggers this error.

## Resolution[​](#resolution "Direct link to Resolution")

1.  Retry the OAuth flow using an email address that belongs to your organization's registered domain (for example, `@yourcompany.com` instead of `@gmail.com`).
2.  If the email domain is correct but not yet registered with your Glean deployment, contact [Glean Support](https://support.glean.com) to have the domain added. Adding email domains is not currently self-serve.

For additional assistance, contact [Glean Support](https://support.glean.com).
