---
url: "https://docs.glean.com/administration/identity/sso/configuration/okta-saml"
canonical: "https://docs.glean.com/administration/identity/sso/configuration/okta-saml"
title: "Okta (SAML)"
description: "Step-by-step guide to configuring Okta as the SSO provider for Glean using SAML 2.0 authentication."
fetched_at: "2026-09-01T13:29:07.938Z"
---
On this page

This guide provides instructions for configuring Okta as the SSO provider for Glean using SAML 2.0. You can set up the Okta side of the connection in one of two ways:

-   **Manual SAML app**: Build a SAML 2.0 app integration in Okta yourself and enter the SAML settings. Choose this when you want full control over the app configuration or need SCIM provisioning on the same app.
-   **Glean OIN integration**: Install the preconfigured **Glean** app from the Okta Integration Network (OIN) and choose SAML 2.0 as the sign-on method. Glean configures the SAML endpoints for you, so there are fewer settings to enter. Choose this for a faster setup.

Both methods result in the same SAML SSO connection. Either way, you finish the setup in the Glean **Admin console**.

Single Sign-On (SSO) is a user authentication service that permits a user to use one set of login credentials to access multiple applications. Glean supports SSO with Okta using OIDC (preferred) or SAML 2.0, both of which enhance security and simplify the login process for end users. To learn more about using OIDC with Okta, see [Okta (OIDC)](/administration/identity/sso/configuration/okta-oidc).

Complete SSO setup in both Okta and the Glean **Admin console**.

info

Customized instructions for your Glean environment are available in the Admin console:

 [Admin Console → Users & permissions → Single sign-on (SSO)](https://app.glean.com/admin/setup/auth)

## Supported features[​](#supported-features "Direct link to Supported features")

Glean's SAML integration with Okta supports the following features:

-   **SP-initiated SSO**: users begin the sign-in flow from Glean and are redirected to Okta to authenticate. See [SP-initiated SSO](#sp-initiated-sso).
-   **IdP-initiated SSO** (requires opt-in): users begin the sign-in flow from Okta. Contact [Glean support](https://support.glean.com) to enable IdP-initiated login for your tenant.
-   **SCIM deprovisioning** (optional): deactivated Okta users are blocked from authenticating to Glean. See [(Optional) SCIM provisioning](#optional-scim-provisioning).

For definitions of these features, see the [Okta glossary](https://help.okta.com/en-us/content/topics/reference/glossary.htm).

### Supported SAML attributes[​](#supported-saml-attributes "Direct link to Supported SAML attributes")

Glean requires the user's email address as the SAML **Name ID**, in `EmailAddress` format. Glean uses the **Name ID** as the user's email. The Glean OIN app also sends a single `Name` attribute for the user's display name:

| Name | Value |
| --- | --- |
| `Name` | `${user.firstName} ${user.lastName}` |

### SP-initiated SSO[​](#sp-initiated-sso "Direct link to SP-initiated SSO")

Glean supports SP-initiated SSO, in which the sign-in process starts from Glean:

1.  In a browser, navigate to [app.glean.com](https://app.glean.com).
2.  Enter your work email and click **Log In**. Glean redirects you to Okta.
3.  Enter your Okta credentials and sign in. With valid credentials, Okta redirects you back to Glean as an authenticated user.

## Requirements and prerequisites[​](#requirements-and-prerequisites "Direct link to Requirements and prerequisites")

Meet the following requirements:

-   An active Okta administrator account
-   Admin or Setup Admin role access to Glean
-   Your tenant backend domain, found in the **Server instance (QE)** field at [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean)
-   A basic understanding of SAML 2.0, SCIM 2.0, and SSO concepts

warning

Glean restricts SSO authentication to pre-approved domains. Notify Glean of all domains that will be used for user authentication or else SSO will fail.

For example: `company.com`, `company.co.jp`, and `subsidiary.co`

### Setting up SSO before workspace initialization[​](#setting-up-sso-before-workspace-initialization "Direct link to Setting up SSO before workspace initialization")

If you're configuring SSO through Central Workspace Settings (CWS), a service that allows admins to configure SSO before a dedicated workspace is provisioned, you'll receive a magic link from Glean to access CWS at [app.glean.com/admin](https://app.glean.com/admin).

## Set up with the Glean OIN integration[​](#set-up-with-the-glean-oin-integration "Direct link to Set up with the Glean OIN integration")

With this method, you install the preconfigured **Glean** app from the Okta Integration Network (OIN), choose SAML 2.0 as the sign-on method, then copy its metadata URL for the Glean **Admin console**. Glean configures the SAML endpoints for you, so you don't enter them manually. This method requires permission to add integrations from the Okta App Catalog.

### Add the Glean OIN integration[​](#add-the-glean-oin-integration "Direct link to Add the Glean OIN integration")

1.  Sign in to Okta as a **Super admin**. Navigate to **Applications → Applications**, then click **Browse App Catalog**.
2.  Search for **Glean** and select the **Glean** app.
3.  Click **Add Integration**.
4.  On the **General Settings** step, add the following details, then click **Next**:
    -   **Application label**: `Glean SSO (SAML)`
    -   **Tenant**: Your Glean tenant name, provided by Glean support or your Glean representative
5.  On the **Sign-On Options** step:
    -   Select **SAML 2.0**
    -   Under **Credentials Details**, set **Application username format** to **Email**
    -   Click **Done**
6.  Under the **Sign On** tab of the app, copy the **Metadata URL**. You'll paste this into the Glean **Admin console** later.
7.  Go to the **Assignments** tab and assign the app to the users and groups who need access to Glean. Only assigned users can authenticate through Okta.

info

Find your tenant name at [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean), or contact Glean support if you're unsure.

After you finish these steps in Okta, continue to [Glean Admin console steps](#glean-admin-console-steps).

## Set up with a manually created SAML app[​](#set-up-with-a-manually-created-saml-app "Direct link to Set up with a manually created SAML app")

To set Okta as your SSO provider, complete the following steps in the Okta admin dashboard:

1.  [Create the Glean SAML application](#create-the-glean-saml-application)
2.  [Configure SAML settings](#configure-saml-settings)
3.  [Copy the metadata URL](#copy-the-metadata-url)
4.  [Assign users and groups](#assign-users-and-groups)

### Create the Glean SAML application[​](#create-the-glean-saml-application "Direct link to Create the Glean SAML application")

Create a SAML 2.0 application in Okta for Glean.

1.  In the Okta admin dashboard, navigate to **Applications → Applications**.
2.  Click **Create App Integration**.
3.  Select **SAML 2.0** and click **Next**.
4.  Add the following details:
    -   **App name** (required): `Glean Search`
    -   **App logo**: [Download this Glean icon](https://app.glean.com/images/logo3-512.png)
    -   **App visibility**: Check **Do not display application icon to users**
5.  Click **Next**.

info

IdP-initiated SSO requires opt-in. Contact [Glean support](https://support.glean.com) to enable it for your tenant. If it isn't enabled, sign-in must start from Glean. Hide the app icon from users, and to include a Glean tile in the Okta App Library, create a [Bookmark App](https://support.okta.com/help/s/article/How-do-you-create-a-bookmark-app) linking to `https://app.glean.com`.

For more information on how to create a SAML app integration in Okta, see [Create SAML app integrations](https://help.okta.com/en-us/content/topics/apps/apps_app_integration_wizard_saml.htm).

### Configure SAML settings[​](#configure-saml-settings "Direct link to Configure SAML settings")

Configure the following SAML settings:

| Field | Value |
| --- | --- |
| Single sign-on URL | `https://<tenant_id-be.glean.com>/authorization-code/callback` |
| Use this for Recipient URL and Destination URL | ✓ |
| Audience URI (SP Entity ID) | `https://<tenant_id-be.glean.com>` |
| Default RelayState | Leave empty |
| Name ID format | `EmailAddress` |
| Application username | `Email` |
| Update application username on | `Create and update` |

Replace `<tenant_id-be.glean.com>` with your full backend domain.

Under **Attribute Statements**, add:

| Name | Name format | Value |
| --- | --- | --- |
| `Name` | `Unspecified` | `String.join(" ", user.firstName, user.lastName)` |

After completing the SAML settings page, finish the Okta setup:

1.  Select **I'm an Okta customer adding an internal app**.
2.  Skip the remaining sections and click **Finish**.

#### SAML settings for CWS[​](#saml-settings-for-cws "Direct link to SAML settings for CWS")

If you are configuring SSO through **Central Workspace Settings (CWS)** before your dedicated workspace has been provisioned, use the following values instead. During CWS setup, you will access Glean using a magic link provided by Glean. After your workspace is initialized, update these URLs to use your tenant-specific values from the previous section.

| Field | Value |
| --- | --- |
| Single sign-on URL | `https://apps-be.glean.com/central_sso/authorization-code/callback` |
| Use this for Recipient URL and Destination URL | ✓ |
| Audience URI (SP Entity ID) | `https://apps-be.glean.com` |

All other fields remain the same as in the previous section.

### Copy the metadata URL[​](#copy-the-metadata-url "Direct link to Copy the metadata URL")

Under the **Sign On** tab of the Glean Search app, copy the **Metadata URL**. You will paste this into the Glean **Admin console** later.

### Assign users and groups[​](#assign-users-and-groups "Direct link to Assign users and groups")

Assign users to the Glean Search app to grant them access via SSO. Glean recommends creating a dedicated group such as `Glean Users`.

1.  Select the **Assignments** tab.
2.  Click **Assign**.
3.  Choose **Assign to People** or **Assign to Groups**.

## Glean Admin console steps[​](#glean-admin-console-steps "Direct link to Glean Admin console steps")

To configure Glean to use Okta as your SSO provider, complete the following steps in the Glean **Admin console**:

### Configure Okta SAML[​](#configure-okta-saml "Direct link to Configure Okta SAML")

1.  In the Glean UI, navigate to  [Admin Console → Users & permissions → Single sign-on (SSO)](https://app.glean.com/admin/setup/auth).
2.  Select **Okta SAML**.
3.  Paste the Okta metadata URL.
4.  Click **Save**.

### Activate SSO[​](#activate-sso "Direct link to Activate SSO")

You must activate SSO in the **Admin console** before your users can sign in to Glean using SSO.

1.  Navigate to  [Admin Console → Users & permissions → Single sign-on (SSO)](https://app.glean.com/admin/setup/auth).
2.  Click **Switch to Okta SAML SSO**. Glean prompts you to confirm the switch.

After SSO activates, Okta SAML displays in the Glean **Single sign-on (SSO)** page with a **Connected** status.

info

If you don't see the **Switch to Okta SAML SSO** button, it means that your Glean tenant is still provisioning and you must wait to switch to using SSO.

You can skip ahead to the [Add connectors](/get-started/setup/add-connectors) section and return to this step later.

## (Optional) SCIM provisioning[​](#optional-scim-provisioning "Direct link to (Optional) SCIM provisioning")

Glean supports user deprovisioning via SCIM 2.0. When configured, deactivated users are blocked from authenticating to Glean.

To set up SCIM provisioning, complete the following steps:

1.  [Configure Glean for SCIM](#configure-glean-for-scim)
2.  [Configure Okta SCIM](#configure-okta-scim)
3.  [Configure provisioning](#configure-provisioning)
4.  [Push initial users](#push-initial-users)
5.  [Save the Glean SCIM configuration](#save-the-glean-scim-configuration)

### Configure Glean for SCIM[​](#configure-glean-for-scim "Direct link to Configure Glean for SCIM")

1.  Go to [**Admin Console → Platform → Connectors**](https://app.glean.com/admin/setup/apps).
2.  Add **Okta SCIM**.
3.  Copy the **bearer token**.
4.  Note the **SCIM connector base URL**, which has the format `https://<tenant_id-be.glean.com>/instance/api/scim/v2`.
5.  Click **Enable SCIM-based user deprovisioning check**.

warning

Don't click **Save** yet. Leave this page open and continue to the next step.

If you did click **Save**, you may have received an error. Ignore it and continue.

### Configure Okta SCIM[​](#configure-okta-scim "Direct link to Configure Okta SCIM")

1.  In your Okta admin dashboard, select your Glean SAML app (**Glean Search** if you created it manually, or **Glean SSO (SAML)** if you used the OIN integration).
2.  Enable SCIM provisioning under **App Settings**.
3.  Configure the **Provisioning** tab with:
    -   **SCIM connector base URL**: From Glean
    -   **Unique identifier field for users**: `email`
    -   **Supported provisioning actions**: Enable all
    -   **Authentication mode**: HTTP Header with Bearer Token
4.  Test the connection.

### Configure provisioning[​](#configure-provisioning "Direct link to Configure provisioning")

Enable the following provisioning options:

-   Create Users
-   Update User Attributes
-   Deactivate Users

Keep only the following attribute mappings:

-   Username
-   Given name
-   Family name
-   Email
-   Manager
-   Department

### Push initial users[​](#push-initial-users "Direct link to Push initial users")

1.  Push initial users using the **Provision User** button.
2.  Verify SCIM events in Okta's System Log.

### Save the Glean SCIM configuration[​](#save-the-glean-scim-configuration "Direct link to Save the Glean SCIM configuration")

1.  Return to the **Okta SCIM** page in the Glean Admin console.
2.  Click **Save**.

## Test the configuration[​](#test-the-configuration "Direct link to Test the configuration")

Test your SSO configuration to ensure proper authentication flow between Glean and Okta.

### Test Glean to Okta redirect[​](#test-glean-to-okta-redirect "Direct link to Test Glean to Okta redirect")

1.  Open a new **Incognito** or **Private Browsing** window and navigate to [app.glean.com](https://app.glean.com).
2.  Enter your work email and click **Log In**.

Glean redirects you to Okta to complete the authentication flow.

tip

Test the configuration in an incognito or private browsing window to prevent existing cache, storage, sessions, and cookies from affecting the result.

### Test Okta to Glean redirect[​](#test-okta-to-glean-redirect "Direct link to Test Okta to Glean redirect")

When redirected to Okta, sign in. Okta redirects you back to Glean as an authenticated user.

### Test SCIM provisioning[​](#test-scim-provisioning "Direct link to Test SCIM provisioning")

If you configured SCIM, verify the following:

1.  Bearer Token and SCIM URL are correct.
2.  Provisioning options are enabled.
3.  Users and groups are assigned to the Glean Search app.
4.  System logs show successful sync events.

### CWS verification[​](#cws-verification "Direct link to CWS verification")

This verification step requires the `https://apps-be.glean.com/central_sso/authorization-code/callback` Single sign-on URL configured in your Okta application. See [SAML settings for CWS](#saml-settings-for-cws) for details. After verification is complete, you may remove this URL from your app registration.

1.  In the CWS Okta SAML setup page, click **Complete verification**.
2.  When prompted, sign in to Okta to return to Glean.

Once your workspace initializes, Glean prompts you to switch to SSO for authentication.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

If any of the SSO flows fail, consult the following table. If you have issues that persist or issues not mentioned below, contact [Glean support](https://support.glean.com).

| Issue | Description | Fix |
| --- | --- | --- |
| Redirect to Okta fails | The SAML application is misconfigured. | Create a new Okta application and carefully follow the configuration steps. Contact Glean support if issues persist. |
| User not assigned | The user isn't assigned to the Glean Search app. | Add the user to the Glean Search app from the **Assignments** tab. |
| Login fails after Okta redirect | Mismatch in **Single sign-on URL**, **Audience URI**, **Name ID format**, **Application username**, or **Attribute Statements**. | Verify the SAML settings against [Configure SAML settings](#configure-saml-settings). |
| Domain not approved | One or more authentication domains haven't been pre-approved by Glean. | Notify Glean support of all email domains that your users will be authenticating from. |
| Found empty SCIM users! | Okta isn't pushing users to Glean. | Verify the Okta SCIM configuration, confirm user synchronization, and retry saving the Glean SCIM configuration. |
| CWS SSO verification fails or does not redirect back to Glean | The `apps-be.glean.com` Single sign-on URL is missing from your Okta application. | Add `https://apps-be.glean.com/central_sso/authorization-code/callback` as the Single sign-on URL in your Okta application. See [SAML settings for CWS](#saml-settings-for-cws) for details. |
