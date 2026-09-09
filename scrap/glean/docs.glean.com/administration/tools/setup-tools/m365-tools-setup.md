---
url: "https://docs.glean.com/administration/tools/setup-tools/m365-tools-setup"
canonical: "https://docs.glean.com/administration/tools/setup-tools/m365-tools-setup"
title: "Microsoft 365 tools and extension tools setup"
description: "Set up Microsoft 365 tools and Microsoft extension tools in Glean, including Entra ID OAuth, scopes, verification, and admin consent."
fetched_at: "2026-09-01T13:29:15.477Z"
---
On this page

Microsoft 365 tools let you complete multi-step workflows without leaving Glean. You can export responses or take action in Microsoft apps like updating Excel workbooks, managing Outlook tasks, or sending Teams messages.

Complete this setup before configuring [Outlook tools](/tools/connector/outlook-tools) or [Outlook Calendar Search](/tools/glean/calendar-search). This page covers the required connector, OAuth configuration, permissions, consent, and administrator steps for the full Microsoft 365 tool suite.

**Microsoft 365 tool setup depends on how and when your connector was deployed**

-   **[Microsoft 365](https://docs.glean.com/connectors/native/microsoft365/new-setup), [Outlook](https://docs.glean.com/connectors/native/outlook/new-setup), [SharePoint](https://docs.glean.com/connectors/native/sharepoint/new-setup), or [OneDrive](https://docs.glean.com/connectors/native/onedrive/new-setup) connectors deployed using the new setup flow on or after August 14, 2026:** Associated tools are enabled automatically during connector setup. No separate manual tool setup is required.
-   **Microsoft 365 connectors deployed before August 14, 2026, or using the previous setup flow:** Follow the instructions below to deploy Microsoft 365 tools manually.

The following setup instructions apply to:

-   Microsoft 365 tools
    
-   Extended Microsoft tools: Microsoft Teams, Microsoft Excel and Microsoft Outlook
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   You are a **Glean admin** with access to the **Admin Console** and the Tools page in Glean.
-   Your organization has an existing **Microsoft 365 (O365) connector** configured in Glean. During setup, you will select this connector as the instance where Word documents and Excel spreadsheets are created in OneDrive.
-   Your Microsoft 365 tenant allows registration and configuration of applications in **Microsoft Entra ID (Azure AD)**, and you or a collaborating Microsoft 365 admin can:
    -   Register a new app.
    -   Create and manage client secrets.
    -   Configure delegated API permissions.
    -   Configure redirect URIs and tenant-wide consent for enterprise applications.
-   If you plan to use the **Central** OAuth option, your tenant can authorize the default Glean OAuth app when users or admins are prompted to connect the tool.
-   If you plan to use a **Custom** OAuth app:
    -   You know or can obtain your **Tenant ID**.
    -   You can configure the tenant specific authorization and token URLs.
    -   You can grant admin consent for the app in **Enterprise applications** after saving the configuration in Glean.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

Follow these steps to set up Microsoft 365 tools and Microsoft Teams, Excel, and Outlook extension tools:

1.  In Glean, go to the **Admin console → Platform → Tools**.
    
2.  Click **Add**.
    
3.  From the list in the **Add pre‑set tools** section, select **Microsoft 365 Tools** under **Tool templates**.
    
4.  In the **Configuration** tab:
    
    1.  Add the **Instance Name**.
    2.  Select **Connector Instance** to link this tool to your Microsoft 365 instance.
    3.  Configure authentication using the tabs below. Microsoft 365 tools use *user OAuth* so that tools run as the signed‑in user and respect their permissions. You can either use a **central Glean‑managed app** (recommended where available) or configure a **custom OAuth app** in the Microsoft Entra admin center.
    
    -   Central authentication (Recommended)
    -   Custom authentication
    
    Use the **central** option if:
    
    -   Your organization is *Glean‑hosted*, and
    -   Central apps are available for *Microsoft 365* in your environment.
    
    Steps:
    
    1.  Select **Central** under the **Authenticate** section on the Microsoft 365 Tools setup page.
    2.  Click **Save**.
    
    End users are prompted to connect their Microsoft 365 account the first time they run a tool, and tokens are managed centrally thereafter.
    
    Use the **custom** option if:
    
    -   The central Microsoft 365 OAuth option is not available in your environment, or
    -   Your security model requires a **customer-owned Microsoft 365 OAuth app**.
    
    tip
    
    If you're switching an existing tool from central OAuth to custom OAuth, the recommended scopes stay pre-filled. Review them before saving and adjust only if your Microsoft app registration requires a different set.
    
    Steps:
    
    To set up OAuth for tools, follow these steps:
    
    **Step 1: Create a new OAuth app**
    
    1.  Navigate to the [Microsoft Entra admin center](https://entra.microsoft.com/).
    2.  Go to **App registrations** under **Entra ID** and click **New registration**.
    3.  Add **Name**.
    4.  Select *Accounts in this organizational directory only (Single tenant)*.
    
    note
    
    Use a single-tenant app for new custom OAuth configurations. If an existing Microsoft extension tool uses a multitenant app restricted to your tenant, no migration is required. The existing app continues to work, and you can switch it to single-tenant later.
    
    After you register the app:
    
    1.  Use your tenant-specific authorization and token URLs in Glean.
    2.  Grant admin consent for the app in your tenant before asking users to connect. For more information, see [One-time admin connection for Microsoft 365 extension tools](#one-time-admin-connection-for-teams-excel-and-outlook-extension-tools).
    
    5.  Leave **Redirect URI** field blank.
    6.  Click **Register** to register the app.
    7.  Copy the **Application (client) ID**.
    
    8.  Copy the **Directory (tenant) ID**.
    9.  Go to **Certificates & secrets**, create a new client secret, and copy the **client secret value**. The **client secret value** is shown only when you create the secret. Save it immediately, because you cannot view it again later.
    
    **Step 2: Set permissions**
    
    1.  Navigate to **API permissions** under **Manage**, select the API.
    2.  Select **Delegated permissions**.
    3.  Add scopes in the **Select permissions** field. These scopes are available in the Microsoft 365 tools configuration page on the Glean admin console.
    4.  CLick **Add permissions**.
    
    **Step 3: Fill the client ID and client secret**
    
    1.  Navigate to Microsoft 365 tools or to the Microsoft Excel extension tools configuration page (based on what you are configuring for) on the Glean admin console.
    2.  Select **custom** under the **Authenticate** section.
    3.  Add the **Client ID** and **Client secret** information. For **Client secret**, paste the **client secret value** copied earlier, not the client secret ID. 4.Paste the following values for **Authorization** and **Token** URL fields. Ensure to replace <tenant\_id> with the Tenant ID that was copied earlier:
    
    -   Authorization url: `https://login.microsoftonline.com/<tenant_id>/oauth2/v2.0/authorize`
    -   Token url: `https://login.microsoftonline.com/<tenant_id>/oauth2/v2.0/token`
    
    5.  Click **Save**.
    6.  Copy the **Callback URL**.
    
    **Step 5: Configure the callback URL in your OAuth App**
    
    1.  Go to the **Authentication tab** of your app configuration on the Microsoft Entra admin center.
    2.  Click **Add Redirect URI** under **Redirect URI configuration**.
    3.  Select **Web** and paste the callback URL into the **Redirect URI** field.
    4.  Click **Configure**.
    
    **Step 6 (Optional): Set consent and permissions**
    
    1.  Navigate to **Enterprise apps** under **Entra ID** in the Microsoft Entra admin console.
    2.  Click **Consent and permissions** under **Security**.
    
    -   If you want admins to allow consent for organization, click **Admin consent settings** and choose the first option.
    
    -   If you want to add user consent settings, , click **User consent settings** and choose the third option:
    -   For users to be able to consent individually the first time they use, choose the third option.
    -   If you want users to be able to consent but only for selected permissions, select the second option and add the above permissions added for the app, otherwise some users might be able to consent for more scopes than configured in the app.
    
    When the user/admin authenticates, you can see them along with the granted permissions on this page.
    

## Scopes for other Microsoft apps[​](#scopes-for-other-microsoft-apps "Direct link to Scopes for other Microsoft apps")

If you want to integrate with other Microsoft services, you can reuse the same Azure app. Add the required scopes in both Azure and Glean:

-   **OneDrive** - `Files.ReadWrite.All`, `Sites.Read.All`, `offline_access`
-   **Teams** - `Channel.Create`, `Channel.ReadBasic.All`, `ChannelMessage.Read.All`, `ChannelMessage.ReadWrite`, `ChannelMessage.Send`, `ChannelSettings.ReadWrite.All`, `Chat.Create`, `Chat.Read`, `Chat.ReadBasic`, `Chat.ReadWrite`, `Chat.ReadWrite.All`, `ChatMessage.Read`, `ChatMessage.Send`, `Directory.ReadWrite.All`, `Group.ReadWrite.All`, `offline_access`, `People.Read.All`, `Presence.ReadWrite`, `Team.Create`, `Team.ReadBasic.All`, `TeamMember.ReadWrite.All`, `TeamsActivity.Read`, `TeamsActivity.Send`, `User.Read`, `OnlineMeetings.ReadWrite`
-   **SharePoint** - `Files.ReadWrite.All`, `Sites.Read.All`, `offline_access`
-   **Excel** - `Files.ReadWrite`, `Sites.ReadWrite.All`, `offline_access`, `User.Read`

After scopes are added, you can configure additional auth configs in Glean for each service.

## Verification steps[​](#verification-steps "Direct link to Verification steps")

### Microsoft 365 tools[​](#microsoft-365-tools "Direct link to Microsoft 365 tools")

-   After you set up Microsoft 365 Tools, open Glean and export a response to Word, Excel, or an Outlook email draft. Choose **Connect** and sign in the first time. If **Connect** is blocked by policy, see [Admin approval for using the tool](#admin-approval-for-using-the-tool).
    
-   In Glean, try prompts such as "Draft an email summarizing …" or "Create a doc with …" and confirm Glean suggests the Microsoft 365 tools at the end of the response when they apply.
    

### Microsoft 365 extension tools[​](#microsoft-365-extension-tools "Direct link to Microsoft 365 extension tools")

-   After you set up Microsoft Teams, Microsoft Excel, or Microsoft Outlook extension tools, open Agent Builder, add a workflow step that uses Microsoft Teams, Excel, or Outlook, and run tools) before asking other users to run those steps.
    
-   In Glean, try requests that trigger Teams, Excel, or Outlook extension behavior, for example prompts about posting or replying in Teams, working with an Excel workbook, or Outlook tasks beyond a simple export-to-draft flow.
    

## Admin approval for using the tool[​](#admin-approval-for-using-the-tool "Direct link to Admin approval for using the tool")

Applies to *Microsoft 365 Tools* and to *Microsoft Teams*, *Microsoft Excel*, *Microsoft Outlook*, and *Microsoft SharePoint* extension tools. Extension tools may also need [One-time admin connection for Microsoft 365 extension tools](#one-time-admin-connection-for-teams-excel-and-outlook-extension-tools).

When using the tools for the first time, Glean prompts users to **Connect** and authorize the application.

Depending on your Microsoft Entra ID tenant policies, end users may be blocked until an administrator grants **admin consent** for the app. If a user sees a message that they must request approval from an admin when they choose **Connect**, a Microsoft 365 admin should complete [Grant admin consent in Enterprise applications](#grant-admin-consent-in-enterprise-applications). This is a one-time step for the whole organization.

If users still see an `Approval required` screen after connector consent, an admin must:

1.  Open enterprise applications in the Microsoft Entra admin center.
2.  Locate the application that corresponds to your specific extension toolpack. Note that this is a separate enterprise application from the Microsoft 365 connector.
3.  Go to **Security → Permissions** and select **Grant admin consent for the tenant**.

### Grant admin consent in Enterprise applications[​](#grant-admin-consent-in-enterprise-applications "Direct link to Grant admin consent in Enterprise applications")

1.  In the Azure portal, open **[Enterprise applications](https://portal.azure.com/#view/Microsoft_AAD_IAM/StartboardApplicationsMenuBlade/~/AppAppsPreview)**.

**Central (Glean-managed) OAuth app**

-   Search for **Glean**, open the enterprise application, and go to the **Permissions** tab.
-   Select **Grant admin consent for Glean Technologies**.

**Custom OAuth app**

-   Search for your registered application name, open it, and go to the **Permissions** tab.
-   Select **Grant admin consent for** your tenant (the exact label matches your directory name).

After admin consent is granted, users can usually connect without a separate admin approval step, unless other tenant policies still restrict consent.

### One-time admin connection for Microsoft 365 extension tools[​](#one-time-admin-connection-for-teams-excel-and-outlook-extension-tools "Direct link to One-time admin connection for Microsoft 365 extension tools")

If you use *Microsoft SharePoint*, *Microsoft Teams*, *Excel*, or *Outlook* extension tools, a Glean admin must complete OAuth once after the tools are created so permissions are allowed for your environment:

1.  Create an autonomous agent.
2.  Add a workflow step that uses **Microsoft SharePoint**, **Microsoft Teams**, **Excel**, or **Outlook**.
3.  Choose **Connect** and sign in as an admin to authenticate and approve the requested permissions on behalf of users, as prompted.

note

Each Microsoft extension toolpack registers as a distinct enterprise application in your Microsoft Entra ID tenant:

-   Microsoft SharePoint Extension Tools
-   Microsoft Teams Extension Tools
-   Microsoft Excel Extension Tools
-   Microsoft Outlook Extension Tools

Admin consent is not shared across applications. Consenting to the primary Microsoft 365 connector or one extension toolpack does not grant consent to others.

To enable a toolpack, a Microsoft 365 administrator must either:

-   Grant admin consent directly on the specific enterprise application in Microsoft Entra ID of the tool pack, or
    
-   Complete the one-time Connect flow once for each enabled extension tool pack.
    

## (Optional) Manage tenant restrictions for an existing multitenant app[​](#restrict-access-to-specific-tenants "Direct link to (Optional) Manage tenant restrictions for an existing multitenant app")

Existing multitenant custom OAuth apps continue to work and do not require migration. If you keep an existing multitenant app, restrict access to your organization or other approved tenants:

1.  Go to the [Azure portal](https://portal.azure.com).
2.  Click **App registrations**.
3.  Select your existing multitenant app registration.
4.  In **Supported account types**, select **Multiple Entra ID tenants** and **Allow only certain tenants (Preview)**.
    
    note
    
    Select *Allow all tenants* to permit authentication from any Microsoft organization. Only enable this option if your application is intended for public use.
    
5.  Click **Manage allowed tenants**.
    1.  Click **Add** and add the tenant ID or domain name of each organization you want to allow.
    2.  Click **Apply**.

note

You can find the tenant ID details on the **Overview** page of Microsoft Azure portal. Go to the **Microsoft Azure** homepage → **Microsoft Entra ID**.

## See also[​](#see-also "Direct link to See also")

-   Setup and integration
    
    -   [Set up Microsoft 365](https://docs.glean.com/connectors/native/microsoft365/new-setup)
    -   [Choose your Microsoft 365 setup](https://docs.glean.com/connectors/native/microsoft365/choose-your-setup)
    -   [Set up Outlook](https://docs.glean.com/connectors/native/outlook/new-setup)
    -   [Choose your Outlook setup](https://docs.glean.com/connectors/native/outlook/choose-your-setup)
    -   [SharePoint setup](https://docs.glean.com/connectors/native/sharepoint/new-setup)
    -   [Choose your SharePoint setup](https://docs.glean.com/connectors/native/sharepoint/choose-your-setup)
    -   [OneDrive setup](https://docs.glean.com/connectors/native/onedrive/new-setup)
    -   [Choose your OneDrive setup](https://docs.glean.com/connectors/native/onedrive/choose-your-setup)
    -   [Microsoft connectors](/connectors/native/azure-devops/)
    -   [Register an app](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app?tabs=certificate)
    -   [Test the Microsoft 365 agent](/tools/connector/microsoft-365)
-   Available Microsoft tools
    
    -   [Microsoft 365](/tools/connector/microsoft-365)
    -   [Microsoft Outlook](/tools/connector/outlook-tools)
    -   [Microsoft Teams](/tools/connector/ms-teams-tools)
    -   [Microsoft Excel](/tools/connector/ms-excel-tools)
    -   [Calendar search](/tools/glean/calendar-search)
