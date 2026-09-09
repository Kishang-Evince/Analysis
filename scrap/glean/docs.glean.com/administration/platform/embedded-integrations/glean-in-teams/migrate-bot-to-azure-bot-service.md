---
url: "https://docs.glean.com/administration/platform/embedded-integrations/glean-in-teams/migrate-bot-to-azure-bot-service"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/glean-in-teams/migrate-bot-to-azure-bot-service"
title: "Migrate the Teams bot to Azure Bot Service"
description: "Move an existing Glean Teams bot from the Bot Framework Portal to Azure Bot Service to enable Single tenant configuration."
fetched_at: "2026-09-01T13:29:11.406Z"
---
On this page

The [Glean in Teams setup guide](/administration/platform/embedded-integrations/glean-in-teams/glean-in-microsoft-teams--admin-guide) registers the bot through the [Teams Developer Portal](hhttps://dev.teams.cloud.microsoft/home) and [Bot Framework Portal](https://dev.botframework.com/bots). Bots registered this way have their app type locked to Multi tenant - a limitation of the Bot Framework Portal that cannot be changed from within it. In Single tenant environments, this can cause 401 authentication errors when users try to interact with the bot.

This guide walks you through migrating your existing bot registration to [Azure Bot Service](https://learn.microsoft.com/en-us/azure/bot-service/bot-service-overview?view=azure-bot-service-4.0), where you can switch the bot to Single tenant mode and resolve the authentication errors.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you begin, make sure you have:

-   An existing Glean Teams bot registered in the [Bot Framework Portal](https://dev.botframework.com/bots)
-   Access to the [Azure Portal](https://portal.azure.com)
-   Permissions to create Azure resources and manage app registrations

## Steps to migrate[​](#steps-to-migrate "Direct link to Steps to migrate")

This migration takes approximately 15–20 minutes to complete. Allow up to an hour after finishing for changes to propagate in Teams.

### 1\. Confirm the current bot configuration[​](#1-confirm-the-current-bot-configuration "Direct link to 1. Confirm the current bot configuration")

1.  Navigate to the [Teams Developer Portal](https://dev.teams.cloud.microsoft/home).
2.  From the left-hand navigation, select **Tools**, then click **Bot management**.
3.  Locate and click on your previously configured bot from the list.
4.  Under the **Configure** tab, click the link to the **Bot Framework Portal**. This will open a new window in the Azure portal environment.
5.  In **Bot profile**, navigate to the **Configuration** section and verify the **App type**. Locate the **App type** field and verify that it is set to **Multi Tenant** and cannot be edited.

### 2\. Start the migration[​](#2-start-the-migration "Direct link to 2. Start the migration")

1.  In the [Bot Framework Portal](https://dev.botframework.com/bots), locate and click on the bot you intend to migrate.
2.  Click the **Migrate** button located in the top-right corner. The system will automatically redirect you to the Azure Portal deployment template.

### 3\. Deploy the Azure Bot Service resource[​](#3-deploy-the-azure-bot-service-resource "Direct link to 3. Deploy the Azure Bot Service resource")

1.  In the Azure Portal deployment template, configure the following details under the **Basics** tab:
    -   **Subscription:** Select your Azure subscription.
    -   **Resource group:** Click **Create new**.
    -   **Region:** Select the Azure region closest to your Glean deployment. For example, if your deployment is in GCP `europe-west4`, select **West Europe**; if it is in AWS `us-west-2`, select **West US 2**.
    -   **SKU:** \*Select the F0 (Free) tier.
        -   **Standard vs. premium channels:** Standard channels, such as Microsoft Teams, offer **unlimited messaging** at this tier. This differs from premium channels, which operate on a pay-as-you-go model.
        -   **Cost efficiency:** Choosing the **F0** tier ensures the bot resource is provisioned at no cost, with no hidden or additional fees (note that Azure Resource Groups are also provided free of charge).
        -   For a complete breakdown of channel types and messaging limits, refer to the [official Azure Bot Services pricing page](https://azure.microsoft.com/en-us/pricing/details/bot-services/).
2.  Click **Review + create**.
3.  After validation completes, click **Create**.

### 4\. Access the New Azure Bot Resource[​](#4-access-the-new-azure-bot-resource "Direct link to 4. Access the New Azure Bot Resource")

1.  Wait for the process to finish. A **Your deployment is complete** notification will appear.
2.  In **Next steps**, click **Go to resource**.
3.  In **Resources**, select the newly created Azure Bot resource.
4.  In the Azure Bot resource, in the left-hand sidebar, navigate to to **Settings** > **Configuration**.
5.  Verify that the **Bot Type** is currently set to **Multi Tenant**.

### 5\. Switch the bot type to single tenant[​](#5-switch-the-bot-type-to-single-tenant "Direct link to 5. Switch the bot type to single tenant")

1.  Change the **Bot Type** dropdown selection to **Single Tenant**.
2.  Note that the **App Tenant ID** field will now appear as a required field.

### 6\. Retrieve the App Tenant ID[​](#6-retrieve-the-app-tenant-id "Direct link to 6. Retrieve the App Tenant ID")

1.  Open a new browser tab and navigate to the [Azure Portal](https://portal.azure.com),
2.  Go to **Microsoft Entra ID** → **App registrations**.
3.  Search for and select the app registration for your bot.
4.  In the left panel, select **Overview**. Then copy the **Directory (tenant) ID** from the **Essentials** section.

### 7\. Save the Single tenant configuration[​](#7-save-the-single-tenant-configuration "Direct link to 7. Save the Single tenant configuration")

1.  Return to the Azure Bot resource.
2.  In **Settings** > **Configuration** paste the **Directory (tenant) ID** into the **App Tenant ID** field.
3.  Click **Apply**.
4.  Wait for the **Saved Configuration** notification to appear in the top-right corner.

### 8\. Update the app registration[​](#8-update-the-app-registration "Direct link to 8. Update the app registration")

1.  In the [Azure Portal](https://portal.azure.com), return to **Microsoft Entra ID** → **App registrations**.
2.  Search for and open the app registration for the bot.
3.  Click **Supported account types**.
4.  In the **Authentication (Preview)** go to **Supported accounts**.
5.  From the **Supported account types** dropdown change the setting to **Single tenant only**.
6.  Click **Save**.

## What's next[​](#whats-next "Direct link to What's next")

Allow up to an hour for the changes to propagate, then test the bot in Teams. If errors persist, contact [Glean Support](https://support.glean.com/hc/en-us).
