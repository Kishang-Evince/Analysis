---
url: "https://docs.glean.com/administration/identity/sso/configuration/okta-oidc-tokenless"
canonical: "https://docs.glean.com/administration/identity/sso/configuration/okta-oidc-tokenless"
title: "Okta OIDC SSO tokenless setup"
description: "Configure Okta as your SSO provider for Glean without using an API Token"
fetched_at: "2026-09-01T13:29:07.719Z"
---
On this page

This guide provides step-by-step instructions for configuring Okta with OIDC as your SSO provider for Glean, by manually setting up client credentials.

tip

If the **Glean OIN integration** is available to you, it's a simpler way to set up the same client-credential connection: you install the preconfigured **Glean SSO** app from the Okta Integration Network (OIN) instead of building the OIDC app by hand. See [Okta (OIDC)](/administration/identity/sso/configuration/okta-oidc). Use this guide when you need to create the OIDC app yourself.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Before beginning the setup process, ensure that Glean support has enabled the tokenless setup flow for Okta.
-   Ensure that you have:
    -   An active Okta administrator account
    -   Access to your Glean admin account with **Admin** or **Setup Admin** roles

## Create the SSO app in Okta[​](#create-the-sso-app-in-okta "Direct link to Create the SSO app in Okta")

1.  Sign in to Okta as a **super admin**. Navigate to **Applications → Create App Integration**
    
2.  Select "OIDC - OpenID Connect" and configure the following:
    
    -   **Application Platform**: Web
    -   **Sign-on Method**: OpenID Connect
    -   **Application Name**: Glean
    -   **Application Logo**: [Link](https://app.glean.com/images/logo3-512.png)
    -   **Sign-in Redirect URIs**:
        -   `https://tenant_id-be.glean.com/authorization-code/callback?isExtension=1`
        -   `https://tenant_id-be.glean.com/authorization-code/callback`
    
    Copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, and replace [https://tenant\_id-be.glean.com](https://tenant_id-be.glean.com) with it.
    
3.  Under **Allowed Grant Types**, make sure that both `Authorization Code` and `Refresh Token` are checked.
    
4.  Under **Assignments**, assign the application according to who you want to have access to Glean.
    

### Set up Okta SSO in Glean admin console[​](#set-up-okta-sso-in-glean-admin-console "Direct link to Set up Okta SSO in Glean admin console")

1.  Navigate to the [Authentication page in Glean admin console](https://app.glean.com/admin/setup/auth) and click **Okta SSO**.
    
2.  Copy the **Client ID** from Okta and paste it in the corresponding field on the setup page in Glean Admin Console.
    
3.  Copy the **Client secret** of the app you just created from Okta and paste it in the corresponding field on the setup page in Glean Admin Console.
    
4.  Check the URL of your Okta instance. Copy the {yourOktaDomain} part of the URL: `https://{'{yourOktaDomain}'}-admin.okta.com`. Paste it into the **Okta Domain** field in Glean.
    
5.  Click **Save**.
    

### Grant access to Glean in Okta[​](#grant-access-to-glean-in-okta "Direct link to Grant access to Glean in Okta")

1.  In the Okta app, assign the employees who need access to Glean.
    
2.  A bookmark app adds a webpage link to the Okta home screen.
    
    -   Follow [Okta’s guide](https://support.okta.com/help/s/article/create-a-bookmark-app?language=en_US) to create one. Use [https://app.glean.com](https://app.glean.com) as the URL.
    -   Assign it to the same users as the SSO app to ensure seamless access.
