---
url: "https://docs.glean.com/administration/platform/embedded-integrations/glean-in-teams/glean-in-microsoft-teams--admin-guide"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/glean-in-teams/glean-in-microsoft-teams--admin-guide"
title: "Glean in Microsoft Teams: Admin guide"
description: "Set up and deploy the Glean app in Microsoft Teams for your organization."
fetched_at: "2026-09-01T13:29:11.222Z"
---
On this page

Glean in Microsoft Teams brings Glean's enterprise search and generative AI experience directly into Teams, so users can find information, ask questions, and get personalized answers without leaving their flow of work.

This guide walks administrators through the requirements and setup process to deploy the Glean app in Microsoft Teams, publish it to their organization, and complete the integration in the Glean Admin Console.

If you want to set up a dedicated Microsoft Teams app for a specific agent, use the *Microsoft Teams service credential* flow instead. With service credentials, admins can create the credential in Admin console and connect it from agent builder.

Legacy setups configured through **Add Agent** on the Teams connector page will continue to work.

For the new dedicated agent flow, see [Set up Microsoft Teams service credential](/administration/agent-identity/teams).

## Requirements[​](#requirements "Direct link to Requirements")

You need admin access to each of the following portals to complete the setup:

-   **[Azure portal](https://portal.azure.com/#home)** - to create the Azure Bot and configure app permissions.
-   **[Teams Developer Portal](https://dev.teams.microsoft.com/home)** - to create and configure the Glean app package.
-   **[Teams Admin Center](https://admin.teams.microsoft.com)** - to publish the app and manage deployment to users.
-   **[Glean Admin Console](https://app.glean.com)** - to complete the integration by entering the credentials collected during setup.

## Setup overview[​](#setup-overview "Direct link to Setup overview")

Phase 1

Set up Azure Bot and Glean app

Create Azure Bot · Configure app · Set up Teams package

Collect: **Application (client) ID**, **Client secret**

→

Phase 2

Deploy via Teams Admin Center

Publish app · Manage access · Pin to sidebar

Collect: **Glean in Microsoft Teams App ID**

→

Phase 3

Enable in Glean Admin Console

Enter credentials · Save · Share user guide

Integration complete

## Phase 1: Set up Azure Bot and Glean app[​](#phase-1-set-up-azure-bot-and-glean-app "Direct link to Phase 1: Set up Azure Bot and Glean app")

### Create the Azure Bot[​](#create-the-azure-bot "Direct link to Create the Azure Bot")

1.  In the [Azure portal](https://portal.azure.com/#home), search for **Azure Bot** in the search bar and select it from the **Marketplace** results (not Services). Alternatively, go directly to the [Create an Azure Bot](https://portal.azure.com/#create/Microsoft.AzureBot) page.
    
2.  Click **Create**, then on the **Basics** tab, configure the following:
    
    | Field | Value |
    | --- | --- |
    | Bot handle | `Glean` |
    | Subscription | Your Azure subscription |
    | Resource group | Click **Create new** |
    | Region | Select the Azure region closest to your Glean deployment. For example, if your deployment is in GCP `europe-west4`, select **West Europe**; if it is in AWS `us-west-2`, select **West US 2**. |
    | Pricing tier | Select the **F0 (Free)** tier. Standard channels such as Microsoft Teams offer unlimited messaging at this tier. For a full breakdown of channel types and messaging limits, refer to the [Azure Bot Services pricing page](https://azure.microsoft.com/en-us/pricing/details/bot-services/). |
    | Type of App | **Single Tenant** |
    | Microsoft App ID | **Create new Microsoft App ID** |
    
3.  Click **Review + create**, review the configuration, then click **Create**.
    
4.  When the deployment completes, click **Go to resource**.
    

### Configure the bot[​](#configure-the-bot "Direct link to Configure the bot")

1.  In the bot resource, select **Bot profile** in the left navigation. Upload the [Glean color icon](/img/administration/platform/embed-integrate/getting-started-Glean-Microsoft-Teams-guide/images/icon-color.png) and set the display name to `Glean`.
    
2.  Select **Configuration** in the left navigation. In the **Messaging endpoint** field, enter your Glean backend URL followed by `/datasources/ms_teams/activity`. For example: `https://[your-instance]-be.glean.com/datasources/ms_teams/activity`.
    
    Verify that **Microsoft App Type** is set to **Single Tenant**, then click **Apply**.
    
3.  Select **Channels** in the left navigation. Under **Available channels**, click **Microsoft Teams**. Select **Microsoft Teams Commercial** and click **Apply**.
    
4.  Select **Configuration** again and click **Manage Password** (next to the Microsoft App ID field). On the **Certificates & secrets** page, click **New client secret**, add a description, then click **Add**.
    
    note
    
    Copy the client secret value immediately - you cannot retrieve it after navigating away. You will need this value in Phase 3.
    
5.  Select **Overview** in the left navigation and copy the **Application (client) ID**. You will need this value in Phase 3.
    

### Create the Glean app[​](#create-the-glean-app "Direct link to Create the Glean app")

1.  Go to the [Teams Developer Portal](https://dev.teams.microsoft.com/home). In the left navigation, select **Apps**, then click **\+ New app**.
    
2.  In the **Add app** dialog, enter `Glean` as the name and click **Add**.
    
    note
    
    This is the name that appears in the [Teams Admin Center](https://admin.teams.microsoft.com) and to end users in Microsoft Teams.
    
3.  In the **Basic information** tab, fill in the following fields:
    
    | Field | Value |
    | --- | --- |
    | Short description | Trusted search and generative AI for work. |
    | Long description | Glean unlocks your company's knowledge and enables powerful work AI for everyone. |
    | Developer or company name | Glean Work |
    | Website | [https://www.glean.com](https://www.glean.com) |
    | Privacy policy | [https://www.glean.com/privacy-policy](https://www.glean.com/privacy-policy) |
    | Terms of use | [https://www.glean.com/terms](https://www.glean.com/terms) |
    
4.  In the **Application (client) ID** field, paste the Application (client) ID you copied earlier, then click **Save**.
    

### Customize branding[​](#customize-branding "Direct link to Customize branding")

1.  In the left navigation, select **Branding**. Upload the [color icon](/img/administration/platform/embed-integrate/getting-started-Glean-Microsoft-Teams-guide/images/icon-color.png) and [outline icon](/img/administration/platform/embed-integrate/getting-started-Glean-Microsoft-Teams-guide/images/icon-outline.png), and set the accent color to `#343ced`.
    

### Configure app features[​](#configure-app-features "Direct link to Configure app features")

1.  In the left navigation, select **App features**, then click **Bot**.
    
2.  Select **Enter a bot ID** and paste the Application (client) ID you copied earlier. Under **Select the scopes where people can use your bot**, select **Personal** only (the current version supports personal DM only). Click **Save**.
    
3.  Click **Add a command** to add starter prompts. Starter prompts appear when users first open the Glean app in Teams. The following prompts are recommended:
    
    | Command title | Command |
    | --- | --- |
    | Summarize documents | Summarize `<linked documents>` and highlight key points on specific topics |
    | Help me write | Write an \[email, company announcement, etc\] on \[project explanation\] |
    | Who should I ask | Who is the subject matter expert on \[topic\] to ask about \[describe question\]? |
    | Learn more about a project | Research a new project. Identify insights, resources, and subject matter experts |
    | Ask about a company policy | Find and research company policies and answer specific questions. |
    | Learn about a team | Research a team's focus area and current projects. |
    | Prepare for an executive review | Identify questions that could be asked during a presentation to an executive. |
    | Explain acronym | Expand and provide a detailed explanation of the given acronym. |
    | Brainstorm | Brainstorm ideas for a presentation on \[Project Name\] |
    | Explain a technical term | Provide a clear and simple explanation of a technical term. |
    
4.  (Optional) If you plan to enable channel or group chat support in the future, select **Permissions** in the left navigation. Under **Team permissions**, select `ChannelMessage.Read.Group`. Under **Chat/Meeting permissions**, select `ChatMessage.Read.Chat`.
    
5.  Refresh the page and return to **App features**. If a **Personal app** entry was added automatically, open its menu and click **Delete**.
    

### Publish the app to your organization[​](#publish-the-app-to-your-organization "Direct link to Publish the app to your organization")

1.  In the left navigation, under **Publish**, select **Publish to org**. Click **Publish your app**, then select **Publish to your org**.
    
    note
    
    Deployment to specific groups or users is managed in the Teams Admin Center during Phase 2.
    

## Phase 2: Deploy via Teams Admin Center[​](#phase-2-deploy-via-teams-admin-center "Direct link to Phase 2: Deploy via Teams Admin Center")

### Publish the Glean app[​](#publish-the-glean-app "Direct link to Publish the Glean app")

1.  Go to the [Teams Admin Center](https://admin.teams.microsoft.com). In the left navigation, go to **Teams apps** > **Manage apps**. Search for `Glean`. The app status is **Blocked** by default.
    
2.  Click the Glean app to open its settings, then click **Publish** to allow it.
    
    After publishing, it takes approximately 24 hours for the Glean app to appear in the Teams store.
    
3.  Copy the **App ID** shown on the Glean app page - you will need this value in Phase 3.
    

### Manage access (optional)[​](#manage-access-optional "Direct link to Manage access (optional)")

1.  By default, the Glean app is available to everyone in your organization. To restrict access, go to the **Users and groups** tab within the Glean app settings and click **Edit availability**.
    

### Install and pin Glean in the Teams sidebar (optional, recommended)[​](#install-and-pin-glean-in-the-teams-sidebar-optional-recommended "Direct link to Install and pin Glean in the Teams sidebar (optional, recommended)")

Pinning the Glean app to the Teams sidebar makes it immediately accessible to users from the main Teams interface.

1.  In the Teams Admin Center left navigation, select **Teams apps** > **Setup policies**. Select the policy that applies to your target users, such as the **Global (Org-wide default)** policy.
    
2.  Enable **User pinning**. Under **Installed apps**, click **Add apps** and add Glean. Your policy may already have other apps installed.
    
3.  Under **Pinned apps**, click **Add apps**, search for **Glean**, click **Select**, and click **Add**. Glean is added to the existing list of pinned apps in the policy.
    
4.  To make Glean more discoverable, use the **Move up** button to reorder Glean to the top of the pinned apps list.
    
5.  Click **Save**.
    

tip

If your organization uses multiple setup policies for different user groups, repeat steps 1–5 for each policy that applies to users who should have Glean pinned.

## Phase 3: Enable Glean in Microsoft Teams in the Glean Admin Console[​](#phase-3-enable-glean-in-microsoft-teams-in-the-glean-admin-console "Direct link to Phase 3: Enable Glean in Microsoft Teams in the Glean Admin Console")

### Enter credentials in the Glean Admin Console[​](#enter-credentials-in-the-glean-admin-console "Direct link to Enter credentials in the Glean Admin Console")

1.  Open the Glean Admin Console. In the left navigation, select **Connectors**, then select **Microsoft Teams** > **Glean in Microsoft Teams**.
    
2.  Enter the values collected during setup:
    
    | Field | Source |
    | --- | --- |
    | Application (client) ID | Copied from Azure App Registration overview (Phase 1) |
    | Client secret | Generated from Azure Certificates & secrets (Phase 1) |
    | Glean in Microsoft Teams App ID | Copied from Teams Admin Center (Phase 2) |
    

3.  Click **Save**. Glean in Microsoft Teams is now enabled for your organization.
    
4.  Share the [Glean in Microsoft Teams: User guide](/administration/platform/embedded-integrations/glean-in-teams/glean-in-microsoft-teams--user-guide) with your users so they can get started.
    

## Set up dedicated Teams apps for agents[​](#set-up-dedicated-teams-apps-for-agents "Direct link to Set up dedicated Teams apps for agents")

The steps on this page explain how to configure the *Glean app for Microsoft Teams*.

If your deployment has opted into the [Agent Identity beta](/administration/agent-identity/overview), use service credentials to set up a dedicated Teams app for a specific agent:

1.  Complete the Microsoft app setup described on this page.
    
2.  Go to **Admin console → Tools → Service credentials** in Glean and create a **Microsoft Teams App credential**.
    
3.  Open your agent in Agent builder and navigate to **Share → Publishing → Microsoft Teams**.
    
4.  Select the credential created in Step 2 and publish the app.
    

If your deployment hasn't opted into the beta, continue adding dedicated agent apps using **Add Agent** on the Microsoft Teams connector page.

note

For existing setups: if you previously configured dedicated agents using **Add Agent** on the Microsoft Teams connector page, your existing setups will continue to function. They aren't migrated automatically when the beta is enabled-migration is rolled out on a per-deployment basis. After migration completes for your deployment, existing configurations automatically appear under **Tools → Service credentials** and within the Microsoft Teams publishing flow. All new dedicated agent apps must use the service credential flow.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### I don't see Add Agent on the Microsoft Teams connector page[​](#i-dont-see-add-agent-on-the-microsoft-teams-connector-page "Direct link to I don't see Add Agent on the Microsoft Teams connector page")

If Agent Identity beta is enabled for your deployment, **Add Agent** is hidden for new dedicated agent app setup. This is expected.

Continue using the connector page for the main **Glean in Microsoft Teams** app. For dedicated agent apps, use **Admin console → Tools → Service credentials** and **Agent builder → Share → Publishing → Microsoft Teams**.

### Bot installed but not responding (401 Authorization has been denied)[​](#bot-installed-but-not-responding-401-authorization-has-been-denied "Direct link to Bot installed but not responding (401 Authorization has been denied)")

If the Glean bot is installed in Microsoft Teams and appears to be correctly configured, but replies from the bot fail with a **401 "Authorization has been denied"** error (or similar) from Microsoft's Bot API, the issue is likely caused by an incorrect sign-in audience setting on the Azure app registration.

#### Symptoms[​](#symptoms "Direct link to Symptoms")

-   The Glean bot is installed in Microsoft Teams and visible to users.
-   The bot can receive user messages.
-   Graph API calls (such as fetching chat IDs) work correctly.
-   However, when the bot attempts to reply, the response fails with a 401 "Authorization has been denied for this request" error from the Bot Framework.

#### Cause[​](#cause "Direct link to Cause")

This error occurs when the Azure app registration used for the Glean Teams bot is configured as **multi-tenant** instead of **single-tenant**. The Bot Framework requires the app registration to use single-tenant authentication for proper authorization when sending replies.

#### Resolution[​](#resolution "Direct link to Resolution")

Follow the steps in [Migrate the Teams bot to Azure Bot Service](/administration/platform/embedded-integrations/glean-in-teams/migrate-bot-to-azure-bot-service) to switch the bot to single-tenant mode and resolve the authentication error. Allow up to 60 minutes for the change to propagate after completing the migration.
