---
url: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-network-error"
canonical: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-network-error"
title: "OAUTH_NETWORK_ERROR"
description: "OAUTH_NETWORK_ERROR Error Code"
fetched_at: "2026-09-01T13:30:09.795Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean could not establish a network connection to the identity provider's token endpoint. This can be caused by DNS resolution failures, firewall rules blocking outbound traffic, proxy misconfiguration, or the provider being temporarily unreachable.

## Resolution[​](#resolution "Direct link to Resolution")

1.  Wait a few minutes and retry the OAuth flow from the Glean Admin Console.
2.  Verify that the **token endpoint URL** configured in Glean is correct and reachable.
3.  Check that firewall rules and network policies allow outbound connections from Glean to the identity provider.
4.  For on-premise or private network deployments, confirm that proxy settings are correctly configured to allow traffic to the provider's OAuth endpoints.

For additional assistance, contact [Glean Support](https://support.glean.com).
