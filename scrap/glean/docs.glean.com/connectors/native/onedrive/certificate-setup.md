---
url: "https://docs.glean.com/connectors/native/onedrive/certificate-setup"
canonical: "https://docs.glean.com/connectors/native/onedrive/certificate-setup"
title: "Setup (Certificate)"
description: "Learn how to set up the Certificate OneDrive connector"
fetched_at: "2026-09-01T13:29:36.944Z"
---
On this page

Prerequisite

Set up the [Microsoft 365 parent connector](/connectors/native/microsoft365/) before configuring OneDrive. The Microsoft 365 setup covers app registration, certificate generation, and uploading the certificate to Azure. OneDrive inherits the client ID, tenant ID, and certificate credentials from the parent suite and only requires the child-specific steps below.

## Required permissions for setup[​](#required-permissions-for-setup "Direct link to Required permissions for setup")

-   The user setting up this connector must be the [Global Admin](https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles).

## Add content permissions to the parent app[​](#add-content-permissions-to-the-parent-app "Direct link to Add content permissions to the parent app")

The identity permissions (`User.Read.All`, `GroupMember.Read.All`, `Member.Read.Hidden`, `Reports.Read.All`) are already granted on the shared app during [Microsoft 365 setup](/connectors/native/microsoft365/) — they cover the parent connector and don't need to be re-added here. This step adds the content permissions OneDrive uses on the same app.

1.  Sign in to the [Azure portal](https://portal.azure.com/). Navigate to **Microsoft Entra ID** → **Manage** → **App registrations** and select the app created for the Microsoft 365 suite.
    
2.  Click **Manage** → **API Permissions** → **Add a permission** and select **Microsoft Graph**. Choose **Application permissions** and add the following:
    
    -   `Files.ReadWrite.All` (for [subscriptions over drives](https://learn.microsoft.com/en-us/graph/api/subscription-post-subscriptions?view=graph-rest-1.0&tabs=http))
    -   `Sites.FullControl.All`
3.  Click **Add a permission** and select **SharePoint**. Choose **Application permissions** and add the following:
    
    -   `Sites.FullControl.All`

## Grant admin consent[​](#grant-admin-consent "Direct link to Grant admin consent")

1.  Ensure you are signed in to Azure as a Global, Application, or Cloud Application Administrator.
    
2.  Use the search box to navigate to **Enterprise applications**. Select the **Glean** app from the list of applications.
    
3.  Click **Permissions** under **Security**. Review the permissions shown, then click **Grant admin consent**.
    

By this step, you should have the following permissions provisioned on the **API Permissions** page:

## Configure OneDrive in Glean[​](#configure-onedrive-in-glean "Direct link to Configure OneDrive in Glean")

1.  In the **Admin console**, select the OneDrive child connector under the Microsoft 365 suite. The client ID, tenant ID, and certificate credentials are inherited from the parent.
    
2.  To increase full crawl indexing speed, Glean recommends 1–10 additional applications with the same permission settings as the parent app. For each additional app, repeat the steps from **Register a new app** through **Upload certificate to Azure** in [Microsoft 365 setup](/connectors/native/microsoft365/) and the **Add content permissions to the parent app** steps on this page, then paste each additional **Application (client) ID** into Glean. You do not need to re-upload the certificate in Glean.
    

3.  Click **Save**. If the credentials save, you're all set!
