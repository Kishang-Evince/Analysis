---
url: "https://docs.glean.com/connectors/native/microsoft365/new-setup"
canonical: "https://docs.glean.com/connectors/native/microsoft365/new-setup"
title: "Set up Microsoft 365"
description: "A guided walkthrough for connecting the Microsoft 365 suite to Glean. Register one Glean app in Microsoft Entra ID, add certificate authentication, and connect the suite so SharePoint and OneDrive inherit it."
fetched_at: "2026-09-01T13:29:34.898Z"
---
On this page

You're reading the **new setup**[Already have Microsoft 365 connected? →](/connectors/native/microsoft365/setup)

Setting up Microsoft 365 is a one-app job. You register a single Glean app in Microsoft Entra ID and connect it to Glean. Two things follow.

-   **One shared app.** The app you register handles identity crawling for your Microsoft 365 tenant and holds the certificate-based credentials.
-   **SharePoint and OneDrive inherit it fully.** Each inherits the parent app's client ID, tenant ID, and certificate, and only asks for child-specific configuration.
-   **Outlook inherits part of it.** Outlook inherits the tenant ID, but you still register its own client ID and certificate.

1.  Log in to the Admin consoletoday — current step
2.  Register the Glean app in Azuretoday — current step
3.  Connect the suite in Gleantoday — current step
4.  Identity crawl runs in the backgrounda few days — happens automatically
5.  SharePoint, OneDrive, and Outlook join the suitea few days — happens automatically

## Connector setup[​](#connector-setup "Direct link to Connector setup")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Confirm the following before you begin.

| Requirement | Why it is needed |
| --- | --- |
| A Glean admin who can add and configure connectors | Adds the Microsoft 365 suite and enters its credentials in the Admin console |
| A Microsoft 365 [Global Administrator](https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles) | Registers the app, grants admin consent, and uploads the certificate in Azure |

### Step 1. Log in to the Admin console[​](#step-1-log-in-to-the-admin-console "Direct link to Step 1. Log in to the Admin console")

1.  Sign in to Glean and open the **Admin console**.
2.  Go to **Connectors**.
3.  Add the **Microsoft 365** connector.
4.  Keep this page open. You return to it in step 3 to enter the app credentials.

### Step 2. Register the Glean app in Microsoft Entra ID[​](#step-2-register-the-glean-app-in-microsoft-entra-id "Direct link to Step 2. Register the Glean app in Microsoft Entra ID")

This step creates the single app that the whole suite uses.

1.  Sign in to the [Azure portal](https://portal.azure.com/) as a Global Administrator.
2.  Select **Microsoft Entra ID → Manage → App registrations → New registration**.
3.  Register an app named **Glean**, with **Accounts in this organizational directory only (Single tenant)** and no redirect URI, then select **Register**.
4.  Add identity permissions.
    -   Open **Manage → API Permissions**.
    -   Select **Add a permission → Microsoft Graph → Application permissions**.
    -   Add `User.Read.All`, `GroupMember.Read.All`, `Reports.Read.All`, and `Member.Read.Hidden`.
5.  Grant admin consent.
    -   For this step you can be signed in to Azure as a Global, Application, or Cloud Application Administrator.
    -   Use the search box to go to **Enterprise applications**, then select the **Glean** app you created.
    -   Open **Security**, then **Permissions**.
    -   Review the permissions shown, then select **Grant admin consent**.
6.  Add certificate authentication.
    -   Generate a certificate and private key.
    -   Upload the certificate to the app under **Manage → Certificates and secrets**.
    -   For the exact commands and the private-key format, follow [Set up certificate authentication](/connectors/native/microsoft365/setup#set-up-certificate-authentication) in the reference.

Request all suite permissions upfront

SharePoint and OneDrive add their content permissions to **this same app**. If you already know you will run those child connectors, add their permissions now so your security team can approve everything in a single admin-consent step. See [Request all suite permissions upfront](/connectors/native/microsoft365/setup#request-all-suite-permissions-upfront).

### Step 3. Connect the suite in Glean[​](#step-3-connect-the-suite-in-glean "Direct link to Step 3. Connect the suite in Glean")

Back on the Microsoft 365 page in the Admin console, connect the app you registered. This is the step that saves the suite and makes its credentials available to the child connectors.

1.  In Azure, open the app's **Overview** page and copy the **Application (client) ID** and the **Directory (tenant) ID** from the Essentials panel.
2.  In Glean, paste the **Application (client) ID** and **Directory (tenant) ID**.
3.  Upload the certificate under **Client Certificate** and the private key under **Private Key**. Copy each value from the files you generated in step 2.
4.  Select your **tenant size**.
5.  (Optional) On tenants larger than 1,000 users, add one or more additional apps to speed up full crawls. Glean recommends between 1 and 10 apps with the same permissions. Register each extra app as in step 2, then paste its **Application (client) ID** here.
6.  Select **Save** to create the Microsoft 365 suite.

Once you save, Glean begins identity crawling with the parent app, and the suite credentials are ready for the child connectors to inherit.

### Step 4. Set up SharePoint, OneDrive, and Outlook[​](#step-4-set-up-sharepoint-onedrive-and-outlook "Direct link to Step 4. Set up SharePoint, OneDrive, and Outlook")

With the suite saved, set up the child connectors. SharePoint and OneDrive inherit the parent app's client ID, tenant ID, and certificate, so you only provide child-specific configuration. Outlook inherits only the tenant ID, so you still register its own client ID and certificate.

-   SharePoint setup guide (coming soon).
-   [OneDrive setup](/connectors/native/onedrive/new-setup)
-   [Outlook setup](/connectors/native/outlook/new-setup)

If SharePoint or OneDrive needs additional content permissions later, add them to the same parent app (and any additional apps), then grant admin consent again.

## After setup[​](#after-setup "Direct link to After setup")

-   **Check progress** any time from the Microsoft 365 connector page in the Admin console.
-   **Speed up large tenants** by adding more apps with the same permissions.
-   **Extend coverage** by setting up SharePoint and OneDrive, which reuse the suite credentials, or Outlook, which joins the suite but registers its own credentials.

## See also[​](#see-also "Direct link to See also")

-   [Choose your Microsoft 365 setup](/connectors/native/microsoft365/choose-your-setup) shows which setup is yours and how the suite fits together.
-   [Microsoft 365 overview](/connectors/native/microsoft365/about) explains how the suite works and which child connectors it covers.
-   [Set up Microsoft 365](/connectors/native/microsoft365/setup) is the full configuration reference, including certificate generation.
