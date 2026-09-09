---
url: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-token-refresh-failed"
canonical: "https://docs.glean.com/troubleshooting/error-codes/authentication/oauth-token-refresh-failed"
title: "OAUTH_TOKEN_REFRESH_FAILED"
description: "Troubleshoot and resolve OAuth token refresh failures for tools."
fetched_at: "2026-09-01T13:30:10.000Z"
---
On this page

## What this means[​](#what-this-means "Direct link to What this means")

This error indicates Glean can't refresh a teammate's OAuth credentials for a tool. Glean periodically refreshes tokens in the background. When the identity provider returns an authentication error during refresh, the stored token is automatically removed, which disconnects the teammate's account and requires re-authorization.

## Re-authorize tools (admin)[​](#re-authorize-tools-admin "Direct link to Re-authorize tools (admin)")

If you're a Glean admin and the tools need re-authorization:

1.  In the Glean Admin console, go to **Platform → Tools**.
2.  Open the affected tool.
3.  Under the **Authentication** section, click **Re-authorize** (or **Connect**, depending on the provider).
4.  Complete the OAuth sign-in flow in the provider's consent screen.
5.  Click **Save**.

After re-authorization, the tool's admin-level credentials are restored. Individual teammates may still need to reconnect their own accounts - see the next section.

## Reconnect an individual account[​](#reconnect-an-individual-account "Direct link to Reconnect an individual account")

When a teammate's personal OAuth token expires or is revoked, they'll see a **Connect** prompt the next time they run a tool in Assistant or an agent. To reconnect:

1.  Run a tool in Assistant or an agent.
2.  Click **Connect** when prompted.
3.  Complete the OAuth sign-in flow in the provider's consent screen.

An admin can't force re-authorization on behalf of an individual teammate - the teammate must complete the consent flow themselves.

## Common causes[​](#common-causes "Direct link to Common causes")

### Client secret rotation[​](#client-secret-rotation "Direct link to Client secret rotation")

If someone rotated the client secret in the identity provider's console without updating Glean, all tokens issued under the old secret stop refreshing. Update the client secret in the tool configuration: **Admin console → Platform → Tools → \[tool name\] → Authentication**.

### Scope changes[​](#scope-changes "Direct link to Scope changes")

When the OAuth app's required scopes change - for example, after a Glean update adds new capabilities - existing tokens may lack the new scopes and fail with a `403` error. Re-authorize the tools so the consent flow grants the updated scopes.

### OAuth app in testing or unverified state[​](#oauth-app-in-testing-or-unverified-state "Direct link to OAuth app in testing or unverified state")

Some providers limit tokens issued by apps that haven't been published or verified:

-   **Google**: apps in *Testing* mode issue refresh tokens that expire after 7 days. Move the OAuth consent screen to *Production* status, or set it to *Internal* for your Workspace domain. See [Google tools setup](/administration/tools/setup-tools/google-tools-setup) for details.
-   **Microsoft Entra**: unverified multi-tenant apps may be blocked by tenant policies. See [Microsoft 365 tools setup](/administration/tools/setup-tools/m365-tools-setup) for verification steps.

### User revoked app access[​](#user-revoked-app-access "Direct link to User revoked app access")

If a teammate removes the Glean app from their account settings in the identity provider - for example, removing it from **Third-party apps and services** in Google Account settings - their token is invalidated. The teammate must reconnect by completing the OAuth flow again in Glean.

To prevent accidental removal, admins can mark the Glean OAuth app as trusted:

-   **Google Workspace**: in the Google Admin Console, go to **Security → API controls → Manage third-party app access** and set the Glean app to *Trusted*.
-   **Microsoft Entra**: grant admin consent for the app in **Enterprise applications → Permissions** so that individual consent isn't required.

### Conditional Access or session policies[​](#conditional-access-or-session-policies "Direct link to Conditional Access or session policies")

Identity provider policies can force token expiration earlier than the provider's default lifetime:

-   **Microsoft Entra**: Conditional Access policies - such as sign-in frequency, device compliance, and location restrictions - can cause background token refresh to fail. Review your tenant's session controls under **Entra ID → Security → Conditional Access**. For details, see the [Microsoft 365 tools setup](/administration/tools/setup-tools/m365-tools-setup).
-   **Google Workspace**: if context-aware access policies block the Glean app, refresh fails silently. Ensure the Glean app is allowed in your context-aware access configuration.

### Token unused for an extended period[​](#token-unused-for-an-extended-period "Direct link to Token unused for an extended period")

Some providers expire refresh tokens that haven't been used within a window - for example, Google expires refresh tokens after 6 months of inactivity. If the tools haven't been used in a while, re-authorize it to obtain a fresh token.

## Expected token lifetimes by provider[​](#expected-token-lifetimes-by-provider "Direct link to Expected token lifetimes by provider")

Token lifetimes vary by provider and can be shortened by organization policies. For a full reference, see [OAuth options for action packs - Expected token lifetimes](/administration/actions/setup-actions/choose-central-or-custom-oauth#expected-token-lifetimes).

## Central or custom OAuth[​](#central-or-custom-oauth "Direct link to Central or custom OAuth")

If you're setting up a tool for the first time and deciding between central and custom OAuth, see [OAuth options for action packs - Central vs. custom OAuth](/administration/actions/setup-actions/choose-central-or-custom-oauth#choosing-the-right-oauth-model) for a comparison.

For more guidance across tool authentication issues, see [Troubleshooting tools authentication](/troubleshooting/tools-authentication).

## Still need help?[​](#still-need-help "Direct link to Still need help?")

If these steps don't resolve the issue, contact [Glean Support](https://support.glean.com).
