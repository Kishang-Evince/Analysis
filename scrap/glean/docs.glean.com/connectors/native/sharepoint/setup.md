---
url: "https://docs.glean.com/connectors/native/sharepoint/setup"
canonical: "https://docs.glean.com/connectors/native/sharepoint/setup"
title: "Previous SharePoint setup"
description: "Configure the SharePoint indexing connector using the Microsoft 365 parent app registration, for deployments set up before the new setup was introduced."
fetched_at: "2026-09-01T13:29:41.796Z"
---
On this page

You're reading the **previous setup**![Connecting SharePoint for the first time? →](/connectors/native/sharepoint/new-setup)

Which setup is this?

These instructions apply to Glean deployments created before **August 14, 2026**, including when you are connecting SharePoint to Glean for the first time. Connectors configured this way keep working, and there is no migration to run. To confirm which setup applies to you, see [Choose your setup](/connectors/native/sharepoint/choose-your-setup).

Prerequisite

Set up the [Microsoft 365 parent connector](/connectors/native/microsoft365/) before configuring SharePoint. SharePoint inherits the client ID, tenant ID, and credentials from the Microsoft 365 suite and only requires SharePoint-specific configuration below.

## Required permissions for setup[​](#required-permissions-for-setup "Direct link to Required permissions for setup")

-   The user setting up this connector must be the [Global Admin](https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles).

## Add SharePoint-specific permissions to the parent app[​](#add-sharepoint-specific-permissions-to-the-parent-app "Direct link to Add SharePoint-specific permissions to the parent app")

Using the app created during [Microsoft 365 setup](/connectors/native/microsoft365/), add the following permissions. For why Glean needs each scope and what breaks without it (useful when briefing your security team), see [Required permissions](/connectors/native/sharepoint/set-up-indexing-connector#required-permissions).

1.  Sign into the [Azure portal](https://portal.azure.com/).
2.  Navigate to **Microsoft Entra ID** > **Manage** > **App registrations** and select the app created for the Microsoft 365 suite.
3.  Select **Manage** > **API Permissions** > **Add a permission**.
4.  Select **Microsoft Graph**. Choose **Application permissions** and add the following:

-   `User.Read.All`
-   `GroupMember.Read.All`
-   `Files.ReadWrite.All` (for [subscriptions over drives](https://learn.microsoft.com/en-us/graph/api/subscription-post-subscriptions?view=graph-rest-1.0&tabs=http))
-   `Reports.Read.All`
-   `Sites.FullControl.All`
-   `Member.Read.Hidden`

5.  Select **Add a permission**, then choose **SharePoint**.
6.  Choose **Application permissions** and add the following:

-   `Sites.FullControl.All`

![](/img/azure-2-configure-permissions.png)

## Grant admin consent[​](#grant-admin-consent "Direct link to Grant admin consent")

1.  Ensure you are signed into Azure as a Global, Application, or Cloud Application Administrator.
    
2.  Use the search box to navigate to **Enterprise applications**.
    
3.  Select the **Glean** app from the list of applications.
    
4.  Select **Permissions** under **Security**. Review the permissions shown, and select **Grant admin consent**.
    

![](/img/onedrive-sharepoint-grant-admin-consent-glean.svg)

You must have the following permissions provisioned on the **API Permissions** page:

![](/img/sharepoint-api-permissions-v2.png)

## Configure SharePoint in Glean[​](#configure-sharepoint-in-glean "Direct link to Configure SharePoint in Glean")

1.  In the Glean Admin Console, select the SharePoint child connector under the Microsoft 365 suite. The client ID and tenant ID are inherited from the parent.
    
2.  Enter your SharePoint domain in Glean. Your SharePoint domain must end with *sharepoint.com*.
    
3.  Glean recommends 1–10 additional applications with the same permission settings to increase full crawl indexing speed. Repeat the permission setup for each additional app and enter its client ID in Glean.
    

![](/img/onedrive-sharepoint-upload-keys-glean.svg)

4.  Select **Save** in Glean to save the configuration.

### OAuth setup[​](#oauth-setup "Direct link to OAuth setup")

Glean displays a redirect URI on the SharePoint setup page. Add it as a redirect URI on the application registration used for indexing, otherwise Microsoft rejects the authorization request. The URI follows this pattern, where the host is specific to your deployment:

```
https://<your-company-be.glean.com>/instance/o365/oauth/verify_code
```

Use the value shown in the **Admin console** rather than constructing it by hand, and do not confuse it with the callback URL used for read and write tools, which ends in `/tools/oauth/verify_code`.

## SharePoint REST API permissions[​](#sharepoint-rest-api-permissions "Direct link to SharePoint REST API permissions")

Glean uses the [SharePoint REST API](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service?tabs=csom) for some SharePoint-specific scenarios that are not covered by Microsoft Graph, such as site page permissions.

Use the certificate-based authentication flow in [Microsoft 365 setup](/connectors/native/microsoft365/setup#set-up-certificate-authentication) and complete the SharePoint-specific application permissions described in [Add SharePoint-specific permissions to the parent app](#add-sharepoint-specific-permissions-to-the-parent-app).

If you are migrating an older SharePoint setup that used client-secret authentication, see [Switch from secret to certificate authentication](/connectors/native/sharepoint/secrets-to-certificate-migration).

## See also[​](#see-also "Direct link to See also")

-   [Choose your setup](/connectors/native/sharepoint/choose-your-setup): How this setup differs from the new setup, and which applies to your deployment.
-   [Set up the indexing connector](/connectors/native/sharepoint/set-up-indexing-connector): What Glean crawls, and the indexing options available once credentials are in place.
-   [SharePoint overview](/connectors/native/sharepoint/about): What the SharePoint connector indexes and how it fits into the Microsoft 365 suite.
-   [Microsoft 365 connector](/connectors/native/microsoft365/): The parent connector that SharePoint inherits credentials from.
