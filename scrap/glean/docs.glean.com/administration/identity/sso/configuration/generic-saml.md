---
url: "https://docs.glean.com/administration/identity/sso/configuration/generic-saml"
canonical: "https://docs.glean.com/administration/identity/sso/configuration/generic-saml"
title: "Generic SAML"
description: "Step-by-step guide for configuring any SAML 2.0 identity provider as the SSO provider for Glean."
fetched_at: "2026-09-01T13:29:07.706Z"
---
On this page

This guide provides instructions for configuring any SAML 2.0 identity provider as the SSO provider for Glean. Use it when your provider isn't explicitly listed in Glean's [supported SSO providers](/administration/identity/sso/supported-sso-providers).

Single Sign-On (SSO) is a user authentication service that permits a user to use one set of login credentials to access multiple applications. Glean supports SSO through OIDC (preferred) or SAML 2.0, both of which enhance security and simplify the login process for end users. If your provider also supports OIDC, Glean recommends OIDC.

Complete SSO setup in both your identity provider and the Glean **Admin console**.

info

Customized instructions for your Glean environment are available in the Admin console:

 [Admin Console → Users & permissions → Single sign-on (SSO)](https://app.glean.com/admin/setup/auth)

## Requirements and prerequisites[​](#requirements-and-prerequisites "Direct link to Requirements and prerequisites")

Complete the following requirements:

-   Have administrator access to your SAML 2.0 identity provider
-   Have Admin or Setup Admin role access to Glean
-   Obtain your tenant backend domain from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) from the **Server instance (QE)** field
-   Have a basic understanding of SAML 2.0 and SSO concepts

warning

Glean restricts SSO authentication to pre-approved domains. Notify Glean of all domains that will be used for user authentication, or SSO will fail.

For example: `company.com`, `company.co.jp`, and `subsidiary.co`

### Setting up SSO before workspace initialization[​](#setting-up-sso-before-workspace-initialization "Direct link to Setting up SSO before workspace initialization")

If you're configuring SSO through Central Workspace Settings (CWS), a service that allows admins to configure SSO before a dedicated workspace is provisioned, you'll receive a magic link from Glean to access CWS at [app.glean.com/admin](https://app.glean.com/admin).

## SAML provider steps[​](#saml-provider-steps "Direct link to SAML provider steps")

To set your identity provider as your SSO provider, complete the following steps.

### Create a SAML application[​](#create-a-saml-application "Direct link to Create a SAML application")

Create a new SAML application in your identity provider's management console.

info

You'll need your tenant backend domain for this step. Find it at [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**. To find your tenant ID, see [Locate your Tenant ID](/administration/about#locate-your-tenant-id), or contact Glean support if you're unsure.

Configure the following fields (some may not be required by your provider):

| Field | Value |
| --- | --- |
| Single Sign-On (SSO) URL | `https://tenant_id-be.glean.com/authorization-code/callback` |
| Recipient / Destination URL | `https://tenant_id-be.glean.com/authorization-code/callback` |
| ACS (Consumer) URL | `https://tenant_id-be.glean.com/authorization-code/callback` |
| Audience URI (SP Entity ID) | `https://tenant_id-be.glean.com` |
| Default RelayState | Leave blank |
| Login URL | `https://tenant_id-be.glean.com/login` |
| Logout URL | `https://tenant_id-be.glean.com/logout` |
| SAML initiator | Service Provider (Glean) |
| SAML signature element | Assertion |
| Name ID format | emailAddress |
| Sign requests? | False |
| X.509 signature | Standard Strength Certificate (2048-bit) |
| X.509 signature algorithm | SHA-512 |

Replace `tenant_id-be.glean.com` with your full backend domain from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**.

info

Glean doesn't sign SAML authentication requests, so your identity provider must not require signed requests.

#### SAML settings for CWS[​](#saml-settings-for-cws "Direct link to SAML settings for CWS")

If you're configuring SSO through **Central Workspace Settings (CWS)** before your dedicated workspace has been provisioned, configuration URLs for your tenant ID don't exist yet. Direct your SSO configuration to Glean's central URLs instead. During CWS setup, you access Glean using a magic link provided by Glean.

| Field | Value |
| --- | --- |
| Single Sign-On (SSO) URL | `https://apps-be.glean.com/central_sso/authorization-code/callback` |
| Recipient / Destination URL | `https://apps-be.glean.com/central_sso/authorization-code/callback` |
| ACS (Consumer) URL | `https://apps-be.glean.com/central_sso/authorization-code/callback` |
| Audience URI (SP Entity ID) | `https://apps-be.glean.com` |

All other fields remain the same as in the previous table. After your workspace is initialized, update these URLs to your tenant-specific values.

### Copy the IdP metadata URL[​](#copy-the-idp-metadata-url "Direct link to Copy the IdP metadata URL")

Glean requires a publicly accessible IdP metadata XML URL to configure SSO. Direct XML file uploads are not supported.

### What if my SSO provider doesn't provide an accessible metadata URL?

If your SSO provider doesn't offer a publicly accessible URL, host the file at a location within your organization that Glean can access. If this isn't feasible, contact Glean support via a ticket in the [Support Center](https://community.glean.com) and have them coordinate with the Glean Platforms team.

### What if my SSO provider doesn't provide a metadata XML file or URL?

If your provider doesn't supply an IdP metadata file or URL, create one manually. Here's a sample template:

```
<md:EntityDescriptor entityID="http://www.your-sso-provider.com/exkn1czW8bjf9XXYb5dl">    <md:IDPSSODescriptor WantAuthnRequestsSigned="false" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">        <md:KeyDescriptor use="signing">            <ds:KeyInfo>                <ds:X509Data>                    <ds:X509Certificate>                        MIIDqDCCApCgAwIBAgIGAY2L4lsNMA0GCSqGSIb3DQEBCwUAMIGUMQswCQYDVQQGEwJVUzETMBEG                        <!-- Replace with your certificate -->                    </ds:X509Certificate>                </ds:X509Data>            </ds:KeyInfo>        </md:KeyDescriptor>        <md:NameIDFormat>            urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress        </md:NameIDFormat>        <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"            Location="https://www.your-sso-provider.com/app/gleansearchsaml_1/exkn1czW8bjf9XXYb5dl/sso/saml"/>        <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"            Location="https://www.your-sso-provider.com/app/gleansearchsaml_1/exkn1czW8bjf9XXYb5dl/sso/saml"/>    </md:IDPSSODescriptor></md:EntityDescriptor>
```

Replace the `entityID`, `X509Certificate`, and `Location` fields with your SAML IdP details.

## Glean Admin console steps[​](#glean-admin-console-steps "Direct link to Glean Admin console steps")

To configure Glean to use your identity provider as your SSO provider, complete the following steps in the Glean **Admin console**.

### Configure SAML[​](#configure-saml "Direct link to Configure SAML")

1.  Navigate to  [Admin Console → Users & permissions → Single sign-on (SSO)](https://app.glean.com/admin/setup/auth).
    
2.  Select **Okta SAML** from the SSO providers list.
    
    info
    
    Select **Okta SAML** for any SAML 2.0 provider, not just Okta. It's the option Glean uses for all SAML identity providers.
    
3.  Paste your IdP metadata URL into the **Okta metadata URL** field.
    
4.  Click **Save**.
    

warning

The metadata URL must be publicly accessible. Contact Glean support if you need assistance with hosting.

### Activate SSO[​](#activate-sso "Direct link to Activate SSO")

You must activate SSO in the **Admin console** before your users can sign in to Glean using SSO.

1.  Navigate to  [Admin Console → Users & permissions → Single sign-on (SSO)](https://app.glean.com/admin/setup/auth).
2.  In the *Switch to logging into Glean via SSO* section, click **Switch to Okta SAML SSO**. Glean prompts you to confirm the switch.
3.  Confirm the switch.

After SSO activates, Okta SAML displays in the Glean **Single sign-on (SSO)** page with a **Connected** status.

If you completed SSO setup before workspace initialization, you can now replace the central Glean URLs in your identity provider with the tenant-specific URLs from [Create a SAML application](#create-a-saml-application).

info

If you don't see the **Switch to Okta SAML SSO** button, your Glean tenant is still provisioning and you must wait to switch to using SSO.

You can skip ahead to the [Add connectors](/get-started/setup/add-connectors) section and return to this step later.

## Test the configuration[​](#test-the-configuration "Direct link to Test the configuration")

Test your SSO configuration to ensure proper authentication flow between Glean and your identity provider.

### Test Glean to provider redirect[​](#test-glean-to-provider-redirect "Direct link to Test Glean to provider redirect")

1.  Open a new **incognito** or **private browsing** window and navigate to [app.glean.com](https://app.glean.com).
2.  Enter your work email and click **Log In**.

Glean redirects you to your SSO provider to complete the authentication flow.

tip

Test the configuration in an incognito or private browsing window to prevent existing cache, storage, sessions, and cookies from affecting the result.

### Test provider to Glean redirect[​](#test-provider-to-glean-redirect "Direct link to Test provider to Glean redirect")

When redirected to your SSO provider, sign in. Your provider redirects you back to Glean as an authenticated user.

### CWS verification[​](#cws-verification "Direct link to CWS verification")

This verification step requires the `https://apps-be.glean.com/central_sso/authorization-code/callback` SAML URL configured in your identity provider. See [SAML settings for CWS](#saml-settings-for-cws) for details. After your workspace is initialized, you can update to tenant-specific URLs.

1.  In the CWS setup wizard, click **Complete verification**.
2.  When prompted, sign in to your identity provider to return to Glean.

Once your workspace initializes, Glean prompts you to switch to SSO for authentication.

## Troubleshoot SSO issues[​](#troubleshoot-sso-issues "Direct link to Troubleshoot SSO issues")

If issues persist or you encounter issues not mentioned below, contact Glean support.

| Issue | Description | Fix |
| --- | --- | --- |
| Redirect to your provider fails | Glean can't reach your identity provider, or the metadata URL is incorrect or unreachable. | Verify that the IdP metadata URL is publicly accessible and that the Single Sign-On (SSO) URL and Audience URI (SP Entity ID) match your tenant backend domain. |
| Sign-in fails after authenticating with your provider | The SAML assertion is missing required attributes, or the Name ID format is incorrect. | Confirm that the Name ID format is `emailAddress` and that the assertion includes the user's email. |
| You can sign in, but Glean denies access | Glean can't validate the email domain being used for sign-in. | Glean checks the email domain of every user that authenticates via SSO against the list of known company domains assigned to your tenant. Notify Glean support of all email domains that your users will authenticate from. |
| CWS SSO verification fails or does not redirect back to Glean | The central `apps-be.glean.com` SAML URL is missing from your identity provider. | Add `https://apps-be.glean.com/central_sso/authorization-code/callback` as the Single Sign-On (SSO), Recipient, Destination, and ACS URL in your provider. See [SAML settings for CWS](#saml-settings-for-cws) for details. |
