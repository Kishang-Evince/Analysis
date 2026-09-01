---
url: "https://docs.glean.com/connectors/native/outlook/federated"
canonical: "https://docs.glean.com/connectors/native/outlook/federated"
title: "Real-time access: Set up client ID and secret"
description: "Learn how to configure the Outlook connector for real-time access using a client secret to retrieve live email data without native indexing."
fetched_at: "2026-09-01T13:29:37.474Z"
---
On this page

### Required permissions for setup[​](#required-permissions-for-setup "Direct link to Required permissions for setup")

-   The user setting up this connector must be the [**Global Admin**](https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles).

### Register a new app[​](#register-a-new-app "Direct link to Register a new app")

1.  Sign into the [Azure portal](https://portal.azure.com/). Select **Microsoft Entra ID**, then **Manage → App registrations → New registration**.
    
2.  On the **Register an application** page, register an app with the following:
    
    | Field | Value |
    | --- | --- |
    | Name | `Glean for Outlook Domain-Delegated` |
    | Supported account types | Accounts in this organizational directory only (Single tenant) |
    | Redirect URI | (Leave this field blank) |
    
3.  Click **Register**.
    

### Configure permissions[​](#configure-permissions "Direct link to Configure permissions")

1.  In the left sidebar of the app **Overview** page, click on **Manage → API Permissions**.
    
2.  Under **Add a permission → Microsoft Graph → Application permissions**, add the following permissions:
    
    -   `Mail.Read`
    -   `Calendars.Read`

### Grant admin consent[​](#grant-admin-consent "Direct link to Grant admin consent")

1.  Ensure you are signed into Azure as a Global, Application or Cloud Application Administrator.
2.  Use the search box to navigate to **Enterprise applications**. Select the **Glean** app you just created from the list of applications.
3.  Click on **Security → Permissions**. Review the permissions shown, and then click **Grant admin consent**.

### Generate secret[​](#generate-secret "Direct link to Generate secret")

1.  Navigate back to **Microsoft Entra ID → Manage → App registrations** and click on the app you created earlier. Then click on **Manage → Certificates & secrets** in the left sidebar.
2.  Click on **New client secret**. Enter a description and select **24 months** for expiry time, then click **Add**.
3.  Under **Client secrets**, copy the **Value** (not the **Secret ID**) you generated and enter it in Glean as the **Client secret**. The **Value** will only be shown once.

### Upload keys[​](#upload-keys "Direct link to Upload keys")

1.  Scroll to the top of the left sidebar and click **Overview**.
2.  Copy the following content from the center Essentials panel and enter it in Glean:

-   Application (client) ID
-   Directory (tenant) ID

### Additional steps[​](#additional-steps "Direct link to Additional steps")

1.  Fill out the email used for setting up the application, which will only be used to validate the setup. The email must have exchange enabled and mailbox accessible by the application. Any user email with Outlook enabled will work to validate the configuration.

### Manage users (optional)[​](#manage-users-optional "Direct link to Manage users (optional)")

1.  To limit who can connect to Outlook, use the search box to navigate to **Enterprise Applications**.
2.  Select the **Glean for Outlook Domain-Delegated** app you just created, then in the left navigation click on **Properties** under **Manage**.
3.  Toggle **User assignment required?** to **Yes**.
4.  Go to **Users and groups** in the left navigation and add whichever users and groups you’d like to access Outlook.
