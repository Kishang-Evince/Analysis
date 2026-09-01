---
url: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-unsupported-response-type"
canonical: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-unsupported-response-type"
title: "OAUTH_UNSUPPORTED_RESPONSE_TYPE"
description: "OAUTH_UNSUPPORTED_RESPONSE_TYPE Error Code"
fetched_at: "2026-09-01T13:30:10.398Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The identity provider does not support the response type used in the authorization request. Glean uses `response_type=code` for the standard authorization code flow, and the provider has rejected it.

## Resolution[​](#resolution "Direct link to Resolution")

1.  In the identity provider's admin console, verify that the OAuth app is configured to support the **code** response type for the authorization code flow.
2.  Confirm that the **authorization URL** in the Glean Admin Console matches the provider's documentation.

For additional assistance, contact [Glean Support](https://support.glean.com).
