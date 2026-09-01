---
url: "https://docs.glean.com/administration/identity/sso/about"
canonical: "https://docs.glean.com/administration/identity/sso/about"
title: "About Glean SSO"
description: "Learn about Single Sign-On (SSO) implementation and configuration options in Glean"
fetched_at: "2026-09-01T13:29:07.540Z"
---
On this page

Single Sign-On (SSO) is mandatory for Glean and will be the first thing configured when setting up your organization's Glean environment. Integrating your directory service with Glean automatically synchronizes user information so that your organization's document access controls are accurately reflected in search results.

info

SSO allows users to securely authenticate with multiple applications and websites by using just one set of credentials. This simplifies the login process for end-users, as they can navigate between services seamlessly without the need to manage multiple passwords.

## Understanding Glean SSO[​](#understanding-glean-sso "Direct link to Understanding Glean SSO")

Glean SSO utilizes standard authentication protocols such as OpenID Connect (OIDC) and Security Assertion Markup Language (SAML) to establish a secure communication channel between Glean and an organization's identity provider (IdP). The IdP could be services like Okta, Entra ID, OneLogin, or Google.

tip

Glean recommends the use of OIDC over SAML due to the more granular control over permissioning that it provides.

When a user attempts to access Glean, they are redirected to their IdP to authenticate. Upon successful authentication, the IdP sends a response back to Glean, which then grants the user access. Glean further ensures that the user's email domain matches the expected customer domain before issuing a login cookie.

OIDC also enables Glean to asynchronously synchronize directory information from your IdP. If you choose to implement SAML instead, you are responsible for maintaining your directory information in Glean. For a detailed comparison of the two protocols, see [About OIDC & SAML](/administration/identity/sso/oidc-saml).

## User Access Control[​](#user-access-control "Direct link to User Access Control")

All user access to Glean is controlled via your IdP.

You can choose to restrict the users that can access Glean to only those users or groups assigned to the Glean configuration within your IdP.

warning

Glean recommends that you configure an appropriately secure conditional access or conditional authentication policy that includes the use of Multi-Factor Authentication (MFA).

## Configuring SSO[​](#configuring-sso "Direct link to Configuring SSO")

Please see the articles below for detailed instructions on how to configure Glean SSO for your IdP:

[

### Microsoft Entra ID

Configure SSO with Microsoft Entra ID (formerly Azure AD)







](/administration/identity/sso/configuration/entra-id-oidc)[

### Google

Configure SSO with Google Workspace







](/administration/identity/sso/configuration/google-oidc)[

### Okta

Configure SSO with Okta Identity Provider







](/administration/identity/sso/configuration/okta-saml)[

### Other SAML

Configure SSO with other SAML providers







](/administration/identity/sso/configuration/generic-saml)
