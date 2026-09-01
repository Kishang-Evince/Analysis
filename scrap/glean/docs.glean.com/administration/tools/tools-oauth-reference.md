---
url: "https://docs.glean.com/administration/tools/tools-oauth-reference"
canonical: "https://docs.glean.com/administration/tools/tools-oauth-reference"
title: "Tools OAuth reference"
description: "Compare central and custom OAuth options, and review expected token lifetimes for each connector."
fetched_at: "2026-09-01T13:29:15.848Z"
---
On this page

This page covers two topics that apply across all tools that use OAuth: choosing between central and custom OAuth, and understanding expected token lifetimes per provider.

For step-by-step setup instructions, see the setup page for the specific tools you're configuring. For troubleshooting token refresh failures, see [OAUTH\_TOKEN\_REFRESH\_FAILED](/troubleshooting/error-codes/authentication/oauth-token-refresh-failed).

## Central vs. custom OAuth[​](#central-vs-custom-oauth "Direct link to Central vs. custom OAuth")

When you set up tools, most connectors offer two authentication options: **central** (Glean-managed) and **custom** (customer-managed). The right choice depends on your security model, operational preferences, and deployment type.

| Factor | Central OAuth | Custom OAuth |
| --- | --- | --- |
| **Setup effort** | Lower — Glean manages the OAuth app registration and maintenance | Higher — you register, configure, and maintain the OAuth app in your identity provider |
| **Token routing** | Tokens are managed through Glean's central infrastructure | Tokens are managed through your deployment |
| **Scope updates** | Automatic — when Glean adds new tool capabilities, the central app's scopes are updated for you | Manual — you must add new scopes to your OAuth app and re-authorize |
| **Consent screen branding** | Glean-branded consent screen | Your organization's branding |
| **Conditional Access compatibility** | Shared app — may require allowlisting in your identity provider's policies | Full control — the app is registered in your tenant and subject to your own policies |
| **Isolation from other customers** | Shared infrastructure | Fully independent — your tokens and app are isolated |
| **Availability** | Most connectors (not all) | All connectors that support OAuth |

### When to use central OAuth[​](#when-to-use-central-oauth "Direct link to When to use central OAuth")

Use central OAuth when:

-   You want the fastest path to a working tools.
-   You're comfortable with Glean managing the OAuth app on your behalf.
-   Your identity provider doesn't have restrictive Conditional Access policies that block third-party apps.

### When to use custom OAuth[​](#when-to-use-custom-oauth "Direct link to When to use custom OAuth")

Use custom OAuth when:

-   Your security team requires full ownership and control of the OAuth app.
-   Your identity provider's Conditional Access or tenant policies block shared third-party apps.
-   You need the consent screen to display your organization's branding instead of Glean's.
-   You want tokens to stay within your own deployment infrastructure.

### Switching from central to custom OAuth[​](#switching-from-central-to-custom-oauth "Direct link to Switching from central to custom OAuth")

If you edit a saved tool and switch its authentication from central OAuth to custom OAuth, Glean keeps the recommended scopes pre-filled. Review the scopes before saving, and add or remove scopes only if your organization requires a different set.

### Availability by connector[​](#availability-by-connector "Direct link to Availability by connector")

Not every connector offers both options. The table below summarizes what's available:

| Connector | Central OAuth | Custom OAuth |
| --- | --- | --- |
| Microsoft 365 | Yes | Yes |
| Google | Yes | Yes |
| Jira and Confluence (Atlassian) | Yes | Yes |
| Salesforce | Yes | Yes |
| Zendesk | Yes | Yes |
| Slack | No | Yes (custom only) |

For setup instructions, see the connector-specific pages under [Set up tools](/administration/tools).

## Expected token lifetimes[​](#expected-token-lifetimes "Direct link to Expected token lifetimes")

The table below lists the default token lifetimes for each provider. Organization-level policies — such as Conditional Access in Microsoft Entra or session controls in Google Workspace — can shorten these defaults.

| Provider | Access token lifetime | Refresh token lifetime | Notes |
| --- | --- | --- | --- |
| **Microsoft Entra** (Microsoft 365) | ~1 hour | 90 days (default) | Conditional Access policies (sign-in frequency, device compliance, location restrictions) can shorten the refresh token lifetime or require re-authentication sooner. Review session controls under **Entra ID → Security → Conditional Access**. |
| **Google** | ~1 hour | Until revoked (default) | Expires after 6 months of inactivity. Apps in *Testing* mode issue refresh tokens that expire after 7 days — set the consent screen to *Internal* or *Production*. |
| **Atlassian** (Jira, Confluence) | ~1 hour | ~90 days (rotating) | Atlassian uses rotating refresh tokens — each refresh returns a new refresh token, so the 90-day window resets with each use. |
| **Salesforce** | ~1 hour | Until revoked (default) | Admins can configure refresh token policies in Salesforce Setup. Connected app policies may override the default. |
| **Slack** | Doesn't expire | Doesn't expire (default) | Tokens persist unless the app is uninstalled or token rotation is enabled in the Slack app configuration. |
| **Zendesk** | ~2 hours | Until revoked | Tokens persist unless the OAuth client is deleted or the user's access is removed. |

### What happens when a token expires[​](#what-happens-when-a-token-expires "Direct link to What happens when a token expires")

When a refresh token expires or is revoked, Glean detects the failure during its next background refresh cycle and removes the stored token. The teammate sees a **Connect** prompt the next time they use the tool. For re-authorization steps, see [OAUTH\_TOKEN\_REFRESH\_FAILED](/troubleshooting/error-codes/authentication/oauth-token-refresh-failed).

## See also[​](#see-also "Direct link to See also")

-   [Tools overview](/administration/tools)
-   [OAUTH\_TOKEN\_REFRESH\_FAILED](/troubleshooting/error-codes/authentication/oauth-token-refresh-failed)
-   [OAUTH\_TOKEN\_EXPIRED](/troubleshooting/error-codes/authentication/oauth-token-expired)
-   [OAUTH\_TOKEN\_NOT\_FOUND](/troubleshooting/error-codes/authentication/oauth-token-not-found)
