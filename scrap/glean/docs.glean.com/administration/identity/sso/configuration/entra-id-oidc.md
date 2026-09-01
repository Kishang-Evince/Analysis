---
url: "https://docs.glean.com/administration/identity/sso/configuration/entra-id-oidc"
canonical: "https://docs.glean.com/administration/identity/sso/configuration/entra-id-oidc"
title: "Entra ID (OIDC)"
description: "Step-by-step guide for configuring Microsoft Entra ID as the SSO provider for Glean using OIDC authentication."
fetched_at: "2026-09-01T13:29:07.525Z"
---
On this page

This guide provides instructions for how to configure Microsoft Entra ID (Azure AD) as the SSO provider for Glean using OpenID Connect (OIDC).

Single Sign-On (SSO) is a user authentication service that permits a user to use one set of login credentials to access multiple applications. Glean supports SSO through OIDC (preferred) or SAML 2.0, both of which enhance security and simplify the login process for end users.

You must complete SSO setup in both Microsoft Azure and the Glean **Admin console**.

info

For instructions customized for your Glean environment, navigate to the **Admin console**:

 [Admin Console → Users & permissions → Single sign-on (SSO)](https://app.glean.com/admin/setup/auth)

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Complete the following prerequisites:

-   Have Global Administrator, Application Administrator, or Cloud Application Administrator access to Microsoft Entra ID
-   Have Admin or Setup Admin roles access to Glean
-   Obtain your tenant backend domain from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) from the **Server instance (QE)** field.
-   Have a basic understanding of SSO concepts

warning

Glean restricts SSO authentication to pre-approved domains. Notify Glean of all domains that will be used for user authentication or else SSO will fail.

For example: `company.com`, `company.co.jp`, and `subsidiary.co`

### Setting up SSO before workspace initialization[​](#setting-up-sso-before-workspace-initialization "Direct link to Setting up SSO before workspace initialization")

If you're configuring SSO through Central Workspace Settings (CWS), a service that allows admins to configure SSO before a dedicated workspace is provisioned, you'll receive a magic link from Glean to access CWS at [app.glean.com/admin](https://app.glean.com/admin).

## Microsoft Azure steps[​](#microsoft-azure-steps "Direct link to Microsoft Azure steps")

To set Entra ID as your SSO provider in Microsoft Azure, complete the following steps:

1.  [Create an app registration in Entra ID](#create-an-app-registration-in-entra-id)
2.  [Add a redirect URI to the app registration](#add-a-redirect-uri-to-the-app-registration)
3.  [Configure permissions](#configure-permissions)
4.  [Grant admin consent](#grant-admin-consent)
5.  [Create a client secret](#create-a-client-secret)
6.  [Get application and directory IDs](#get-application-and-directory-ids)
7.  [Upload icon](#upload-icon)
8.  [Restrict users](#optional-restrict-users)

### Create an app registration in Entra ID[​](#create-an-app-registration-in-entra-id "Direct link to Create an app registration in Entra ID")

1.  In Microsoft Azure, navigate to the **App registrations** page.
    
2.  Create a new app registration.
    
3.  Register a new application with the following details:
    
    -   **Name**: `Glean SSO`
    -   **Supported account types**: Single tenant only
    -   **Redirect URI (platform)**: Web
    -   **Redirect URI**: `https://<tenant_id-be.glean.com>/authorization-code/callback?isExtension=1`
    
    Replace `<tenant_id-be.glean.com>` with your full backend domain.
    
4.  Click **Register**.
    

For more information on how to register an application in Entra ID, see [Register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#register-an-application) in the Microsoft documentation.

### Add a redirect URI to the app registration[​](#add-a-redirect-uri-to-the-app-registration "Direct link to Add a redirect URI to the app registration")

1.  In Microsoft Azure, navigate to the **App registrations** page.
2.  In **All applications**, find and select the `Glean People` app registration you created.
3.  Navigate to the **Manage → Authentication** page.
4.  Add another redirect URI: `https://<tenant_id-be.glean.com>/authorization-code/callback`. Replace `<tenant_id-be.glean.com>` with your full backend domain.
5.  Add another redirect URI: `https://<tenant_id-be.glean.com>/authorization-code/callback`. Replace `<tenant_id-be.glean.com>` with your full backend domain. You now have 2 redirect URIs listed:

```
https://<tenant_id-be.glean.com>/authorization-code/callback?isExtension=1https://<tenant_id-be.glean.com>/authorization-code/callback
```

Glean requires both redirect URIs in Microsoft Azure to redirect back to Glean.

For more information on how to add a redirect URI in Entra ID, see [How to add a redirect URI to your application](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-redirect-uri) in the Microsoft documentation.

#### CWS Verification Redirect URI[​](#cws-verification-redirect-uri "Direct link to CWS Verification Redirect URI")

If you're configuring SSO through **Central Workspace Settings (CWS)**, the service that allows you to set up your deployment before Glean provisions your tenant, you must add an additional redirect URI to test and verify your configuration:

```
https://apps-be.glean.com/central_sso/authorization-code/callback
```

This redirect URI is required for the CWS verification step. Without it, SSO testing during CWS setup will fail. After your workspace initializes, replace this central URI with the tenant-specific callback URLs from the previous section.

### Configure permissions[​](#configure-permissions "Direct link to Configure permissions")

Configure the delegated permissions required for OIDC authentication with Glean:

1.  In Microsoft Azure, navigate to the **App registrations** page.
2.  In **All applications**, find and select the `Glean People` app registration you created.
3.  Navigate to the **Manage → API permissions** page.
4.  Add the folllowing API permissions for the **Microsoft Graph** API as **Delegated permissions**:
5.  Add the following API permissions for the **Microsoft Graph** API as **Delegated permissions**:

-   `openid`
-   `email`
-   `offline_access`
-   `profile`

These permissions allow Glean to validate user request information and authorize login. Glean only fetches this information on user login and re-authentication.

For more information on these permissions, see [Microsoft Graph Permissions Reference](https://learn.microsoft.com/en-us/graph/permissions-reference) and search for the permission names.

### Grant admin consent[​](#grant-admin-consent "Direct link to Grant admin consent")

Grant admin consent for the permissions required for OIDC authentication with Glean:

1.  In Microsoft Azure, navigate to the **Enterprise applications** page.
2.  Find and select the **Glean SSO** app registration you created.
3.  Navigate to **Security → Permissions**.
4.  Review the permissions and click **Grant admin consent**.
5.  Complete the authentication prompt.

For more information, see [Grant tenant-wide admin consent in Enterprise apps pane](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent?pivots=portal#grant-tenant-wide-admin-consent-in-enterprise-apps-pane) in the Microsoft documentation.

### Create a client secret[​](#create-a-client-secret "Direct link to Create a client secret")

Create a client secret for the `Glean SSO` app registration:

1.  In Microsoft Azure, navigate to the **App registrations** page.
2.  In **All applications**, find and select the `Glean SSO` app registration you created.
3.  Navigate to the **Manage → Certificates & secrets** page.
4.  Create a new client secret with the description `Glean SSO`.
5.  Set the expiry time to 24 months.
6.  Add the secret.
7.  Copy and note the secret **Value** and expiration date. You will input the secret and expiration date into the Glean **Admin console** later.

important

The client secret value shows only once. If you don't copy it, you cannot access it again and you will need to create a new client secret.

### Get application and directory IDs[​](#get-application-and-directory-ids "Direct link to Get application and directory IDs")

Get the application and directory IDs for the `Glean SSO` app registration:

1.  Navigate to the the `Glean SSO` app registration **Overview** page.
2.  Copy and note the **Application (client) ID** and **Directory (tenant) ID**. You will input these IDs into the Glean **Admin console** later.

### Upload icon[​](#upload-icon "Direct link to Upload icon")

Upload the Glean icon to the `Glean SSO` app registration:

1.  In the `Glean SSO` app registration page, navigate to \*\* Manage → Branding & Properties\*\*.
2.  Add the following properties:

-   **Logo**: Download this [Glean icon](https://app.glean.com/images/logo3-512.png) to set as the app logo.
-   (Optional) **Home page URL**: `https://glean.com`
-   (Optional) **Terms of service URL**: `https://www.glean.com/terms`
-   (Optional) **Privacy statement URL**: `https://www.glean.com/privacy-policy`

3.  Leave all other fields blank and click **Save**.

### (Optional) Restrict users[​](#optional-restrict-users "Direct link to (Optional) Restrict users")

By default, using SSO allows any valid user in your organization to sign into Glean. To promote the growth and adoption of Glean, Glean recommends you do not restrict access to the app.

If you need to restrict access to only approved users, add all approved users to a group called **Glean Users** and restrict access based on this group.

### Create a new group in Entra ID

To create a new group in Entra ID and add users to it:

1.  In Microsoft Azure, navigate to the **Groups** page.
2.  Add a new group with the following details:

-   **Group type**: Security
-   **Group name**: Glean Users
-   **Group description**: Users that are permitted to access the Glean Enterprise Search app.
-   **Entra ID roles**: No
-   **Membership type**: Assigned
-   **Owners**: Leave blank
-   **Members**: Select users as group members.

3.  Click **Create**.

important

Microsoft Entra ID does not support nested groups for app user assignment.

For more information on how to create a group in Entra ID, see [Manage Microsoft Entra groups and group membership](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-groups) in the Microsoft documentation.

### Specify which users can log in to Glean

To specify which users can log in to Glean:

1.  In Microsoft Azure, navigate to the **Enterprise applications** page.
2.  Find and select the **Glean SSO** enterprise application.
3.  Navigate to **Manage → Users and groups**.
4.  Add the groups or individual users you want to allow access to Glean.
5.  Click **Assign**.
6.  In the **Glean SSO** enterprise application page, navigate to **Manage → Properties**.
7.  Set **Assignment required?** to **Yes**.
8.  Click **Save**. This restricts access to only the assigned users and groups.

important

Microsoft Entra ID does not support nested groups for enterprise application user assignment.

For more information on how to assign users and groups to an enterprise application, see [Assign users and groups to an application using the Microsoft Entra admin center](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/assign-user-or-group-access-portal?pivots=portal#assign-users-and-groups-to-an-application-using-the-microsoft-entra-admin-center) in the Microsoft documentation.

## Glean Admin console steps[​](#glean-admin-console-steps "Direct link to Glean Admin console steps")

To configure Glean to use Entra ID as your SSO provider, complete the following steps in the Glean **Admin console**:

1.  [Configure Azure SSO](#configure-azure-sso)
2.  [Activate SSO](#activate-sso)
3.  [Sync People Data](#sync-people-data)

### Configure Azure SSO[​](#configure-azure-sso "Direct link to Configure Azure SSO")

Configure Azure SSO in the Glean **Admin console**:

1.  Navigate to  [Admin Console → Users & permissions → Single sign-on (SSO)](https://app.glean.com/admin/setup/auth).
2.  Select **Azure SSO**.
3.  Paste the following values copied from Entra ID into their respective fields in the Glean UI:

-   **Client Secret**
-   **Client Secret Expiration Date**
-   **Application (Client) ID**
-   **Directory (Tenant) ID**

4.  Click **Save**.

### Activate SSO[​](#activate-sso "Direct link to Activate SSO")

You must activate SSO in the **Admin console** before your users can sign in to Glean using SSO.

1.  Navigate to  [Admin Console → Users & permissions → Single sign-on (SSO)](https://app.glean.com/admin/setup/auth).
2.  In the *Switch to logging into Glean via SSO* section, click the **Switch to Azure SSO** button. Glean prompts you to confirm the switch.

After SSO activates, Azure SSO displays in the Glean **Single sign-on (SSO)** page with a **Connected** status.

info

If you don't see the **Switch to Azure SSO** button, wait until Glean provisions your tenant before you switch to using SSO.

You can skip ahead to the [Add connectors](/get-started/setup/add-connectors) section of the Getting Started guide and return to this point later.

### Sync People Data[​](#sync-people-data "Direct link to Sync People Data")

If you have not already configured people data, you can do so now. See the following documentation to set up people data:

-   [Sync people data from Okta](/connectors/native/okta/setup)
-   [Sync people data from Workday](/connectors/native/workday)

Glean synchronizes your directory so it can map and honor user permissions when displaying search results.

## Test the configuration[​](#test-the-configuration "Direct link to Test the configuration")

Test the following redirect phases for SSO:

1.  Glean to Entra ID redirect
2.  Entra ID to Glean redirect

### Redirect Glean to Entra ID[​](#redirect-glean-to-entra-id "Direct link to Redirect Glean to Entra ID")

Use an incognito or private browsing window to test the Glean to Entra ID redirect to prevent existing browser cache, storage, sessions, and cookies from affecting the test.

1.  Open a new incognito or private browsing window.
2.  Navigate to [https://app.glean.com](https://app.glean.com).
3.  Enter your work email and click **Log In**.

Glean redirects you to your SSO platform.

### Redirect Entra ID to Glean[​](#redirect-entra-id-to-glean "Direct link to Redirect Entra ID to Glean")

Once Glean redirects you to Entra ID, sign in. Entra ID redirects you back to Glean as an authenticated user.

### CWS verification[​](#cws-verification "Direct link to CWS verification")

Complete this step if you're configuring SSO through **Central Workspace Settings (CWS)**.

This verification step requires the `https://apps-be.glean.com/central_sso/authorization-code/callback` redirect URI configured in your app registration. See [CWS Verification Redirect URI](#cws-verification-redirect-uri) for details. After your workspace initializes, replace this central URI with the tenant-specific callback URLs from the previous section.

Verify the configuration in CWS:

1.  In the CWS setup Azure SSO setup page, click **Complete verification**.
2.  When prompted, sign in to Azure to return to Glean.

Once your workspace initializes, Glean prompts you to switch to SSO for authentication.

## Troubleshooting SSO issues[​](#troubleshooting-sso-issues "Direct link to Troubleshooting SSO issues")

If the SSO flows fail, consult the following table. If you have issues that persist, or issues not mentioned in this table, contact Glean support.

| Issue | Description | Fix |
| --- | --- | --- |
| SSO code exchange failed \[Error Code 13\] | The Directory ID, Application ID, or Client Secret token is/are incorrect. | Double check that you have copied the Directory ID, Application ID, and Client Secret values correctly into the Glean UI. |
| Cannot authenticate user from access token \[Error Code 14\] | A key field that Glean needs to authenticate the user is missing from the access token provided by them on sign-in. | Check the profile of the user in Entra ID. Ensure that the Email attribute is populated, along with First Name, Last Name, Display Name, Department, and Title. |
| Cannot authenticate user from access token \[Error Code 14\] | In addition to the above, this error code may indicate that Glean cannot validate the email domain being used for sign-in. | Glean checks the email domain of every user that authenticates via SSO against a list of known company domains that are assigned to your tenant. If Glean is not aware of the email domain that your user is attempting to SSO with, it denies access to your Glean environment for security reasons. Notify your Glean engineer or Glean support of all email domains that your users will be authenticating from. |
| Microsoft error: "You can't get there from here" | User authentication to Glean is being blocked by a Conditional Access policy. | Amend your Conditional Access policy to include and permit the Glean SSO Enterprise App. |
| Microsoft error: "Need admin approval" | Admin consent has not been granted to the permissions requested by the Glean SSO App Registration. | Ensure that you have granted admin consent for the Application and Delegated permissions requested under "API permissions" of the Glean SSO App Registration. |
| Users are being asked to approve permissions when signing in to Glean | The delegated permissions have not been granted admin consent. | Ensure that the `User.Read.All` (and `GroupMember.Read.All` if you are using groups) **Application** permission is assigned to the Glean SSO app registration and is of **Application** type. Also ensure that admin consent has been granted for the `email`, `openid`, `offline_access`, and `profile` **Delegated** permissions in the Glean SSO app registration. See [Grant Admin Consent](#grant-admin-consent) for details. |
| SSO is successful, but the Glean is stuck at the login page | Glean cannot validate the email domain being used for sign-in. | Glean checks the email domain of every user that authenticates via SSO against a list of known company domains that are assigned to your tenant. If Glean is not aware of the email domain that your user is attempting to SSO with, it denies access to your Glean environment for security reasons. Notify your Glean engineer or Glean support of all email domains that your users will be authenticating from. |
| SSO is successful, but Glean returns an internal server error or some other error. | You likely have IP restrictions assigned to your Azure/Entra ID tenant which are preventing the access token from being validated. | Contact your Glean engineer or Glean support who can advise you on the static IP addresses assigned to your Glean tenant that you will need to allowlist. |
| CWS SSO verification fails or does not redirect back to Glean | The `apps-be.glean.com` verification redirect URI is missing from your App Registration. | Add `https://apps-be.glean.com/central_sso/authorization-code/callback` as a redirect URI in your App Registration. See [CWS Verification](#cws-verification) for details. |
