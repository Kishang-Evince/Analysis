---
url: "https://docs.glean.com/administration/actions/setup-actions/choose-central-or-custom-oauth"
canonical: "https://docs.glean.com/administration/actions/setup-actions/choose-central-or-custom-oauth"
title: "OAuth options for tools"
description: "Choose between central OAuth and custom OAuth for OAuth-based tools, review connector support, and understand default token lifetimes."
fetched_at: "2026-09-01T13:28:58.445Z"
---
On this page

Use this page to choose between **central OAuth** and **custom OAuth** for OAuth-based tools. This guide explains when to use each option, which connectors support them, and what token lifetimes to expect after setup.

After you choose your OAuth model, continue to the setup page for your connector under [Set up tools](/administration/tools).

note

Not all OAuth-based tools support both options. For example, Slack supports custom OAuth only.

## Choosing the right OAuth model[​](#choosing-the-right-oauth-model "Direct link to Choosing the right OAuth model")

OAuth-based tools support one or both of these options:

| Factor | Central OAuth | Custom OAuth |
| --- | --- | --- |
| Setup effort | Lower. Glean manages the OAuth application and ongoing maintenance. | Higher. Your organization registers, configures, and maintains the OAuth application. |
| Token management | Tokens are managed through Glean's central OAuth infrastructure. | Tokens are managed through your deployment configuration. |
| Scope changes | When Glean adds capabilities, the central OAuth application is updated for you. | Your team must add scopes and reauthorize users when capabilities change. |
| Consent screen | Shows Glean branding. | Shows your organization's branding. |
| Conditional Access compatibility | May require allowlisting the Glean application in your identity provider. | Uses an application in your tenant and follows your internal policies. |
| Isolation | Uses shared infrastructure. | Isolated to your tenant and application. |
| Best fit | Best if you want the fastest path to setup and are comfortable with Glean managing the OAuth application. | Best if your security or compliance team requires ownership of the OAuth application, or if your tenant policies block shared third-party applications. |

For example, choose custom OAuth if your Microsoft Entra policies require a tenant-owned app registration or block shared third-party apps. Choose central OAuth if you want a faster setup for connectors such as Google, Salesforce, or Atlassian and your security policies allow a Glean-managed app.

### Switching from central to custom OAuth[​](#switching-from-central-to-custom-oauth "Direct link to Switching from central to custom OAuth")

If you edit a saved tool and switch its authentication from central OAuth to custom OAuth, Glean keeps the recommended scopes pre-filled. Review the scopes before saving, and add or remove scopes only if your organization requires a different set.

## OAuth model availability by connector[​](#oauth-model-availability-by-connector "Direct link to OAuth model availability by connector")

| Connector | Central OAuth | Custom OAuth |
| --- | --- | --- |
| Microsoft 365 | Yes | Yes |
| Google | Yes | Yes |
| Jira and Confluence (Atlassian) | Yes | Yes |
| Salesforce | Yes | Yes |
| Zendesk | Yes | Yes |
| Slack | No | Yes (custom only) |

## Expected token lifetimes[​](#expected-token-lifetimes "Direct link to Expected token lifetimes")

When planning your deployment, it is important to understand how long user connections remain valid. Regardless of whether you choose central OAuth or custom OAuth, access and refresh tokens inherit the default lifetimes enforced by each identity provider.

The values below represent provider defaults. Your organization's identity, session, or Conditional Access policies can shorten these durations and require users to reauthenticate sooner.

| Provider | Access token lifetime | Refresh token lifetime | Notes |
| --- | --- | --- | --- |
| Microsoft Entra (Microsoft 365) | ~1 hour | 90 days by default | Conditional Access policies such as sign-in frequency, device compliance, or location restrictions can shorten these lifetimes. Review session controls in **Entra ID** > **Security** > **Conditional Access**. |
| Google | ~1 hour | Until revoked by default | Refresh tokens expire after 6 months of inactivity. Apps in **Testing** mode issue refresh tokens that expire after 7 days. Set the consent screen to **Internal** or **Production** for long-lived access. |
| Atlassian (Jira, Confluence) | ~1 hour | ~90 days, rotating | Atlassian uses rotating refresh tokens. Each successful refresh returns a new refresh token, which resets the 90-day inactivity window. |
| Salesforce | ~1 hour | Until revoked by default | Admins can configure refresh token policies in Salesforce Setup. Connected app policies can override the default. |
| Slack | Does not expire by default | Does not expire by default | Tokens remain valid unless the app is uninstalled or token rotation is enabled in the Slack app configuration. |
| Zendesk | ~2 hours | Until revoked | Tokens remain valid unless the OAuth client is deleted or the user's access is removed. |

## What happens when a token expires[​](#what-happens-when-a-token-expires "Direct link to What happens when a token expires")

If an access token expires, Glean uses the stored refresh token to get a new one automatically.

If the refresh token has expired or been revoked, the next refresh attempt fails and the saved connection becomes invalid.

## See also[​](#see-also "Direct link to See also")

-   [Tools overview](/administration/tools)
-   [OAUTH\_TOKEN\_REFRESH\_FAILED](/troubleshooting/error-codes/authentication/oauth-token-refresh-failed)
-   [OAUTH\_TOKEN\_EXPIRED](/troubleshooting/error-codes/authentication/oauth-token-expired)
-   [OAUTH\_TOKEN\_NOT\_FOUND](/troubleshooting/error-codes/authentication/oauth-token-not-found)
