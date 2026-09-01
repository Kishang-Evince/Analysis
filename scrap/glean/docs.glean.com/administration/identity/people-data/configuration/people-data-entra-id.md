---
url: "https://docs.glean.com/administration/identity/people-data/configuration/people-data-entra-id"
canonical: "https://docs.glean.com/administration/identity/people-data/configuration/people-data-entra-id"
title: "Sync people data from Entra ID"
description: "Configure Microsoft Entra ID as your people connector for Glean"
fetched_at: "2026-09-01T13:29:01.992Z"
---
On this page

Use this workflow to sync people data from Microsoft Entra ID.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you begin, make sure you have the following:

-   Global, Application or Cloud Application Administrator access in Microsoft Entra ID
-   Admin or Setup Admin access in Glean
-   The following user fields populated in Entra ID:
    -   First name
    -   Last name
    -   Email
    -   Title
    -   Department
    -   Manager (optional, but recommended if you want to build org charts and improve people data quality)

## Configure Entra ID as the people connector in Glean[​](#configure-entra-id-as-the-people-connector-in-glean "Direct link to Configure Entra ID as the people connector in Glean")

Complete the following steps to configure Entra ID as the people connector in Glean:

1.  [Create an app registration in Entra ID](#1-create-an-app-registration-in-entra-id)
2.  [Configure Microsoft Graph application permissions](#2-configure-microsoft-graph-application-permissions)
3.  [Grant admin consent](#3-grant-admin-consent)
4.  [Create a client secret](#4-create-a-client-secret)
5.  [Get application and directory IDs](#5-get-application-and-directory-ids)
6.  [Upload keys to Glean](#5-upload-keys-to-glean)

### 1\. Create an app registration in Entra ID[​](#1-create-an-app-registration-in-entra-id "Direct link to 1. Create an app registration in Entra ID")

1.  In Microsoft Azure, navigate to the **App registrations** page.
2.  Create a new app registration.
3.  Register a new application with the following details:
    -   **Name**: `Glean People`
    -   **Supported account types**: Single tenant only
    -   **Redirect URI**: Leave blank
4.  Click **Register**.

For more information on how to register an application in Entra ID, see [Register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#register-an-application) in the Microsoft documentation.

### 2\. Configure Microsoft Graph application permissions[​](#2-configure-microsoft-graph-application-permissions "Direct link to 2. Configure Microsoft Graph application permissions")

1.  In Microsoft Azure, navigate to the **App registrations** page.
2.  In **All applications**, find and select the `Glean People` app registration you created.
3.  Navigate to the **Manage → API permissions** page.
4.  Add the folllowing API permissions for the **Microsoft Graph** API as **Application permissions**:
    -   `User.Read.All`
    -   `GroupMember.Read.All`

For more information on how to add permissions to an application, see [Add permissions to an application](https://learn.microsoft.com/en-us/entra/identity-platform/howto-update-permissions?pivots=portal#add-permissions-to-an-application) in the Microsoft documentation.

### 3\. Grant admin consent[​](#3-grant-admin-consent "Direct link to 3. Grant admin consent")

1.  In Microsoft Azure, navigate to the **Enterprise applications** page.
2.  Find and select the `Glean People` app registration you created.
3.  Navigate to the **Manage → Permissions** page.
4.  Review the permission and click **Grant admin consent**.
5.  Complete the authentication prompt to grant admin consent.

For more information on how to grant admin consent, see [Grant tenant-wide admin consent in Enterprise apps pane](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent?pivots=portal#grant-tenant-wide-admin-consent-in-enterprise-apps-pane) in the Microsoft documentation.

### 4\. Create a client secret[​](#4-create-a-client-secret "Direct link to 4. Create a client secret")

1.  In Microsoft Azure, navigate to the **App registrations** page.
2.  In **All applications**, find and select the `Glean People` app registration you created.
3.  Navigate to the **Manage → Certificates & secrets** page.
4.  Create a new client secret with the description `Glean People`.
5.  Add the secret.
6.  Copy the secret **Value**.

important

The client secret value shows only once. If you don't copy it, you cannot access it again and you will need to create a new client secret.

For more information on how to create a client secret, see [Certificates and client secrets](https://learn.microsoft.com/en-us/azure/healthcare-apis/register-application#certificates-and-client-secrets) in the Microsoft documentation.

### 5\. Get application and directory IDs[​](#5-get-application-and-directory-ids "Direct link to 5. Get application and directory IDs")

1.  In Microsoft Azure, navigate to the **App registrations** page.
2.  In **All applications**, find and select the `Glean People` app registration you created.
3.  On the **Overview** page, note the **Application (client) ID** and **Directory (tenant) ID**.

### 5\. Upload keys to Glean[​](#5-upload-keys-to-glean "Direct link to 5. Upload keys to Glean")

1.  In Glean, navigate to **Admin console → Users & permissions → People data**.
2.  Select **Manage connector**.
3.  Under **Select a connector to sync people data from**, select **Azure**.
4.  With the keys you obtained in the previous steps, paste the following into the corresponding fields in Glean:

-   Client secret
-   Application (client) ID
-   Directory (tenant) ID

5.  (Optional) Provide a comma-separated list of user fields to crawl in addition to the default fields:

-   `id`
-   `createdDateTime`
-   `userType`
-   `displayName`
-   `givenName`
-   `surname`
-   `jobTitle`
-   `manager`
-   `department`
-   `officeLocation`
-   `city`
-   `mobilePhone`
-   `businessPhones`
-   `onPremisesExtensionAttributes`
-   `imAddresses`
-   `mail`
-   `mailNickname`
-   `otherMails`
-   `proxyAddresses`
-   `usageLocation`
-   `userPrincipalName`

6.  Click **Save**. Glean prompts you to schedule a crawl.
7.  Select **Enable crawl** and click **Save**.

note

To populate *Department* from an Entra ID attribute other than the default `department` attribute, such as `onPremisesExtensionAttributes.extensionAttribute4`, contact [Glean support](https://support.glean.com).

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

If you encounter issues, see the following troubleshooting steps.

### Missing permissions error[​](#missing-permissions-error "Direct link to Missing permissions error")

If you encounter a "Missing permissions" error, check that the app registration has the correct Microsoft Graph permissions and that you've granted admin consent for the required permissions.

Review [Configure Microsoft Graph application permissions](#2-configure-microsoft-graph-application-permissions) and [Grant admin consent](#3-grant-admin-consent) for more information.

### Users are missing from Glean[​](#users-are-missing-from-glean "Direct link to Users are missing from Glean")

If you notice that users are missing from Glean, check that:

-   The required user fields are populated in Entra ID
-   The app registration has the correct Microsoft Graph permissions
-   Admin consent has been granted
-   The client ID, tenant ID, and client secret are correct

### People data looks incomplete[​](#people-data-looks-incomplete "Direct link to People data looks incomplete")

If names, titles, departments, or managers are missing, review the corresponding fields in Entra ID and confirm they're populated for affected users.

## See also[​](#see-also "Direct link to See also")

-   [Sync people data](/get-started/setup/sync-people-data)
-   [Attribute mapping](/administration/identity/people-data/attribute-mapping)
-   [User aliases and identity stitching](/administration/identity/people-data/user-aliases)
-   [Difference between SSO and people data](/administration/identity/people-data/troubleshooting/sso-vs-people-data)
-   [Entra ID (OIDC)](/administration/identity/sso/configuration/entra-id-oidc)
