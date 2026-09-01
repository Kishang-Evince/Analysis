---
url: "https://docs.glean.com/administration/identity/sso/configuration/google-oidc"
canonical: "https://docs.glean.com/administration/identity/sso/configuration/google-oidc"
title: "Google (OIDC)"
description: "Step-by-step guide for configuring Google Workspace as the SSO provider for Glean using OIDC authentication."
fetched_at: "2026-09-01T13:29:07.763Z"
---
On this page

This guide provides instructions for configuring Google Workspace as the SSO provider for Glean using the [OpenID Connect (OIDC)](https://developers.google.com/identity/openid-connect/openid-connect) protocol.

Single Sign-On (SSO) is a user authentication service that permits a user to use one set of login credentials to access multiple applications. Glean supports SSO through OIDC (preferred) or SAML 2.0, both of which enhance security and simplify the login process for end users. To learn more about using SAML with Glean, see [Generic SAML](/administration/identity/sso/configuration/generic-saml).

Complete SSO setup in both Google Cloud Console and the Glean **Admin console**.

info

Customized instructions for your Glean environment are available in the Admin Console:

 [Admin Console → Users & permissions → Single sign-on (SSO)](https://app.glean.com/admin/setup/auth)

## Requirements and prerequisites[​](#requirements-and-prerequisites "Direct link to Requirements and prerequisites")

Have the following requirements:

-   Have Google Workspace administrator access
-   Have Admin or Setup Admin role access to Glean
-   Obtain your tenant backend domain from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) from the **Server instance (QE)** field.
-   Have a basic understanding of SSO concepts

warning

Glean restricts SSO authentication to pre-approved domains. Notify Glean of all domains that will be used for user authentication or else SSO will fail.

For example: `company.com`, `company.co.jp`, and `subsidiary.co`

### Setting up SSO before workspace initialization[​](#setting-up-sso-before-workspace-initialization "Direct link to Setting up SSO before workspace initialization")

If you're configuring SSO through Central Workspace Settings (CWS), a service that allows admins to configure SSO before a dedicated workspace is provisioned, you'll receive a magic link from Glean to access CWS at [app.glean.com/admin](https://app.glean.com/admin).

## Google Cloud Console steps[​](#google-cloud-console-steps "Direct link to Google Cloud Console steps")

To set Google Workspace as your SSO provider in Google Cloud Console, complete the following steps.

### Set OAuth consent screen[​](#set-oauth-consent-screen "Direct link to Set OAuth consent screen")

Create a Google OAuth consent screen for your Glean users.

### What is the Google OAuth consent screen?

When a user signs in to Glean (or any other OAuth App) using Google SSO for the first time, they see a Google consent screen.

This screen informs the user about the app's functions and the specific data it will access. By presenting this information upfront, users can manage their privacy and data sharing preferences before proceeding with the authentication process. Here's an example of a consent screen:

![OAuth Consent Screen](/img/sso/google-oidc.20240217132130010.webp)

### How do I check if the Google OAuth consent screen has already been created?

If you are not sure if this has already been completed, you can check in the Google Cloud Console:

1.  Navigate to [**APIs and Services → Credentials**](https://console.cloud.google.com/apis/credentials).
    
2.  If you see a message that reminds you to configure a consent screen, you must configure the OAuth Consent Screen before proceeding. If you don't see this message, then you can skip this section and proceed to the next one.
    

1.  In Google Cloud Console, navigate to [**APIs and Services → OAuth consent screen**](https://console.cloud.google.com/apis/credentials/consent).
2.  Select **Internal** as the user type.
3.  Click **Create**.
4.  Add the following details:
    -   **App name**: `Glean`
    -   **User support email**: Email alias for your IT helpdesk (for example, `helpdesk@company.com`)
    -   **App logo**: [Download this Glean icon](https://app.glean.com/images/admin/glean-logo2-256.png)
    -   **App home page**: `https://app.glean.com`
    -   **App privacy policy link**: `https://www.glean.com/privacy-policy`
    -   **App Terms of Service link**: `https://www.glean.com/terms`
    -   **Authorized domain**: `glean.com`
    -   **Developer Contact Email**: Email alias for your IT team (for example, `it@company.com`)
5.  Click **Save and Continue**.
6.  On the Scopes page, click **Save and Continue**. No scopes are required.
7.  Review the summary and return to the dashboard.

See the Google Workspace documentation for more information on how to configure the OAuth consent screen: [Configure OAuth consent screen](https://developers.google.com/workspace/guides/create-credentials#configure-oauth-consent-screen).

### Create an OAuth client[​](#create-an-oauth-client "Direct link to Create an OAuth client")

1.  In Google Cloud Console, navigate to [**APIs and Services → Credentials**](https://console.cloud.google.com/apis/credentials).
    
2.  Select **Create Credentials → OAuth Client ID**.
    
3.  Add the following details:
    
    -   **Application type**: Web application
    -   **Name**: `Glean SSO`
    -   **Authorized Javascript origins**: `https://app.glean.com`
    -   **Authorized redirect URIs**: Add **both** redirect URIs:
        -   `https://<tenant_id-be.glean.com>/authorization-code/callback?isExtension=1`
        -   `https://<tenant_id-be.glean.com>/authorization-code/callback`
    
    Replace `<tenant_id-be.glean.com>` with your full backend domain.
    
4.  Click **Create**.
    
5.  Copy and note the **Client ID** and **Client secret**. You will input these into the Glean **Admin console** later.
    

Copy client secret

The client secret value shows only once. If you don't copy it, you cannot access it again and you will need to create a new OAuth client.

See the Google Workspace documentation for more information on how to create an OAuth client: [Create OAuth 2.0 client ID credentials](https://docs.cloud.google.com/sap/docs/abap-sdk/on-premises-or-any-cloud/latest/authentication-oauth-client-credentials#oauth_create_credentials).

#### CWS verification redirect URI[​](#cws-verification-redirect-uri "Direct link to CWS verification redirect URI")

If you are configuring SSO through **Central Workspace Settings (CWS)**, the service that allows admins to set up their deployment before a dedicated project is provisioned, you must add an additional redirect URI to test and verify your configuration: `https://apps-be.glean.com/central_sso/authorization-code/callback`

This redirect URI is required for the CWS verification step. Without it, SSO testing during CWS setup will fail. You may remove this URI after verification is complete.

## Glean Admin console steps[​](#glean-admin-console-steps "Direct link to Glean Admin console steps")

To configure Glean to use Google Workspace as your SSO provider, complete the following steps in the Glean **Admin console**:

### Configure Google SSO[​](#configure-google-sso "Direct link to Configure Google SSO")

1.  In the Glean UI, navigate to  [Admin Console → Users & permissions → Single sign-on (SSO)](https://app.glean.com/admin/setup/auth).
2.  Select **GSuite**.
3.  Paste the following values copied from Google Cloud Console into their respective fields in the Glean UI:

-   **Client ID**
-   **Client Secret**

4.  Click **Save**.

### Activate SSO[​](#activate-sso "Direct link to Activate SSO")

You must activate SSO in the **Admin console** before your users can sign in to Glean using SSO.

1.  Navigate to  [Admin Console → Users & permissions → Single sign-on (SSO)](https://app.glean.com/admin/setup/auth).
2.  In the *Switch to logging into Glean via SSO* section, click the **Switch to GSuite SSO** button. Glean prompts you to confirm the switch.

After SSO activates, GSuite displays in the Glean **Single sign-on (SSO)** page with a **Connected** status.

info

If you don't see the **Switch to GSuite SSO** button, it means that your Glean tenant is still provisioning and you must wait to switch to using SSO.

You can skip ahead to the [Add connectors](/get-started/setup/add-connectors) section and return to this step later.

## Test the configuration[​](#test-the-configuration "Direct link to Test the configuration")

Test your SSO configuration to ensure proper authentication flow between Glean and Google Workspace.

### Test Glean to Google redirect[​](#test-glean-to-google-redirect "Direct link to Test Glean to Google redirect")

1.  Open a new **Incognito** or **Private Browsing** window and navigate to [app.glean.com](https://app.glean.com).
2.  Enter your work email and click **Log In**.

Glean redirects you to Google SSO to complete the authentication flow.

tip

Test the configuration in an incognito or private browsing window to prevent existing cache, storage, sessions, and cookies from affecting the result.

### Test Google to Glean redirect[​](#test-google-to-glean-redirect "Direct link to Test Google to Glean redirect")

When redirected to Google SSO, sign in. Google SSO redirects you back to Glean as an authenticated user.

### CWS verification[​](#cws-verification "Direct link to CWS verification")

This verification step requires the `https://apps-be.glean.com/central_sso/authorization-code/callback` redirect URI configured in your OAuth client. See [CWS verification redirect URI](#cws-verification-redirect-uri) for details. After verification is complete, you may remove this URI from your OAuth client.

1.  In the CWS Google SSO setup page, click **Complete verification**.
2.  When prompted, sign in to Google to return to Glean.

Once your workspace initializes, Glean prompts you to switch to SSO for authentication.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

If any of the SSO flows fail, consult the following table If you have issues that persist or issues not mentioned below, contact Glean support.

| Issue | Description | Fix |
| --- | --- | --- |
| The code cannot be verified \[Error Code 13\] | The Client ID or Client Secret are incorrect. | Verify that you have copied the Client ID and Client Secret values correctly into the Glean UI. |
| The code cannot be verified \[Error Code 13\] | Glean cannot validate the email domain being used for sign-in. | Glean checks the email domain of every user that authenticates via SSO against a list of known company domains assigned to your tenant. If Glean is not aware of the email domain that your user is attempting to SSO with, it denies access to your Glean environment for security reasons. Notify Glean support of all email domains that your users will be authenticating from. |
| You do not have access to Glean. Please contact your IT administrator to get access. \[Error Code 15\] | A user receives this error if they are not included in the Google Group that manages access to Glean. | Add the user to the Google Group. If you are unsure which Google Group manages access, contact Glean support for help the Google Group email. |
| CWS SSO verification fails or does not redirect back to Glean | The `apps-be.glean.com` verification redirect URI is missing from your OAuth client. | Add `https://apps-be.glean.com/central_sso/authorization-code/callback` as a redirect URI in your OAuth client. See [CWS verification](#cws-verification) for details. |
