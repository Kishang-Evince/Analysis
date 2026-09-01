---
url: "https://docs.glean.com/get-started/setup/configure-sso"
canonical: "https://docs.glean.com/get-started/setup/configure-sso"
title: "Connect your SSO provider"
description: "Configure Single Sign-On (SSO) to provide seamless and secure employee access to Glean."
fetched_at: "2026-09-01T13:29:50.913Z"
---
On this page

Single sign-on (SSO) is mandatory for all Glean deployments. For an overview of how Glean uses SSO, the supported protocols, and Glean's recommendation on OIDC vs SAML, see [About Glean SSO](/administration/identity/sso/about).

## Set up SSO[​](#set-up-sso "Direct link to Set up SSO")

In the **Connect your SSO provider** section, select your SSO provider.

![Connect your SSO provider](/img/get-started/sso-connect-provider.webp)

Connect your SSO provider

Follow the in-product instructions to connect your SSO provider. Or, see the following topics for detailed instructions on how to configure SSO with common IdPs:

-   [Entra ID (Azure AD)](/administration/identity/sso/configuration/entra-id-oidc)
-   [Google Workspace](/administration/identity/sso/configuration/google-oidc)
-   [Okta SAML](/administration/identity/sso/configuration/okta-saml)
-   [Generic SAML](/administration/identity/sso/configuration/generic-saml)

## Enable SSO[​](#enable-sso "Direct link to Enable SSO")

Once you have configured SSO, switch from using magic links to SSO for user and administrator sign-in. In the **Switch to logging into Glean via SSO** section, select the switch-to-SSO control for your IdP.

Your page refreshes, and the IdP you connected is listed as **Connected** and **Active**.

note

If the **Switch to logging into Glean via SSO** section is not visible or the control is disabled, your Glean tenant is still provisioning and you will not be able to make the switch just yet.

You can skip ahead to the Add connectors step and return to this point later.

## Test the SSO configuration[​](#test-the-sso-configuration "Direct link to Test the SSO configuration")

After enabling SSO, test both the Glean-to-IdP and IdP-to-Glean redirects to confirm sign-in works end-to-end. For provider-specific test steps, see the **Test the configuration** section in your IdP guide:

-   [Entra ID (Azure AD)](/administration/identity/sso/configuration/entra-id-oidc#test-the-configuration)
-   [Google Workspace](/administration/identity/sso/configuration/google-oidc#test-the-configuration)
-   [Okta SAML](/administration/identity/sso/configuration/okta-saml#test-the-configuration)
-   [Generic SAML](/administration/identity/sso/configuration/generic-saml#test-the-configuration)
