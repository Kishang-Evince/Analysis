---
url: "https://docs.glean.com/get-started/setup/configure-sso"
canonical: "https://docs.glean.com/get-started/setup/configure-sso"
title: "Connect your SSO provider"
description: "Configure Single Sign-On (SSO) to provide seamless and secure employee access to Glean."
fetched_at: "2026-10-13T08:50:27.638Z"
---
On this page

Single sign-on (SSO) is mandatory for all Glean deployments. For an overview of how Glean uses SSO, the supported protocols, and Glean's recommendation on OIDC vs SAML, see [About Glean SSO](/administration/identity/sso/about).

SSO setup has two stages. First you configure and verify SSO, which you can do in Central Workspace Setup (CWS) before Glean provisions your dedicated workspace. Then you activate SSO, which switches sign-in from magic links to your identity provider.

Configuring SSO in CWS doesn't activate SSO sign-in

Configuring or verifying SSO in Central Workspace Setup (CWS) doesn't activate SSO for sign-in. Continue using magic links until Glean provisions your dedicated workspace.

Once the workspace is ready, return to the SSO page, complete any tenant-specific configuration updates, and switch the deployment to SSO. See [Activate SSO](/get-started/setup/configure-sso#activate-sso).

Glean uses the following terms for these stages:

-   **Configured**: You saved the required identity provider settings in Glean.
-   **Verified**: Glean completed the CWS verification flow with your identity provider.
-   **Active**: Glean provisioned your dedicated workspace, and you switched sign-in from magic links to SSO.

## Set up SSO[​](#set-up-sso "Direct link to Set up SSO")

In the **Connect your SSO provider** section, select your SSO provider.

![Connect your SSO provider](/img/get-started/sso-connect-provider.webp)

Connect your SSO provider

Follow the in-product instructions to connect your SSO provider. Or, see the following topics for detailed instructions on how to configure SSO with common IdPs:

-   [Entra ID (Azure AD)](/administration/identity/sso/configuration/entra-id-oidc)
-   [Google Workspace](/administration/identity/sso/configuration/google-oidc)
-   [Okta SAML](/administration/identity/sso/configuration/okta-saml)
-   [Generic SAML](/administration/identity/sso/configuration/generic-saml)

## Activate SSO[​](#activate-sso "Direct link to Activate SSO")

Once you have configured SSO and Glean has provisioned your workspace, switch from using magic links to SSO for user and administrator sign-in. In the **Switch to logging into Glean via SSO** section, select the switch-to-SSO control for your IdP.

If you configured SSO during CWS, first replace the central `apps-be.glean.com` callback, redirect, ACS, or entity ID values in your identity provider with your tenant-specific values. Your IdP guide lists which values to replace.

Your page refreshes, and the IdP you connected is listed as **Connected** and **Active**. SSO is now active for administrator and end-user sign-in.

note

If the **Switch to logging into Glean via SSO** section is not visible or the control is disabled, your Glean tenant is still provisioning and you will not be able to make the switch just yet.

Continue to sign in with magic links, skip ahead to the Add connectors step, and return to this point later.

## Test the SSO configuration[​](#test-the-sso-configuration "Direct link to Test the SSO configuration")

After activating SSO, test both the Glean-to-IdP and IdP-to-Glean redirects to confirm sign-in works end-to-end. For provider-specific test steps, see the **Test the configuration** section in your IdP guide:

-   [Entra ID (Azure AD)](/administration/identity/sso/configuration/entra-id-oidc#test-the-configuration)
-   [Google Workspace](/administration/identity/sso/configuration/google-oidc#test-the-configuration)
-   [Okta SAML](/administration/identity/sso/configuration/okta-saml#test-the-configuration)
-   [Generic SAML](/administration/identity/sso/configuration/generic-saml#test-the-configuration)
