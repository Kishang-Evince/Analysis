---
url: "https://docs.glean.com/connectors/native/autodesk-construction-cloud/setup"
canonical: "https://docs.glean.com/connectors/native/autodesk-construction-cloud/setup"
title: "Autodesk Construction Cloud setup"
description: "Requirements and step-by-step configuration for the Autodesk Construction Cloud connector in Glean."
fetched_at: "2026-09-01T13:29:22.501Z"
---
On this page

Setting up the Autodesk Construction Cloud connector has two phases: [set up and authorize Autodesk access](#phase-1-set-up-and-authorize-autodesk-access), then [select the ACC account and save](#phase-2-select-the-acc-account-and-save). Confirm the [requirements](#requirements) and [prerequisites](#prerequisites) first.

## Requirements[​](#requirements "Direct link to Requirements")

Before configuring the Autodesk Construction Cloud (ACC) connector, ensure you have the following:

-   **Glean permissions:** An active Glean deployment with **Glean administrator** privileges to manage connectors.
-   **ACC account access:** Access to Autodesk Construction Cloud with **Account Administrator** permissions for the specific target account.
-   **Autodesk developer access:** Access to create an Autodesk Platform Services (APS) application.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   The admin user has access to all ACC projects that you want Glean to index.
-   The required ACC modules are enabled on those projects:
    -   Build for RFIs, Issues, and Submittals
    -   Docs for Sheets

## Configure Autodesk Construction Cloud for Glean[​](#configure-autodesk-construction-cloud-for-glean "Direct link to Configure Autodesk Construction Cloud for Glean")

The connector setup has two phases:

1.  Set up and authorize Autodesk access
2.  Select the ACC account and save

Each connector instance connects to one ACC account. To index multiple ACC accounts, create a separate connector instance for each account.

### Phase 1: Set up and authorize Autodesk access[​](#phase-1-set-up-and-authorize-autodesk-access "Direct link to Phase 1: Set up and authorize Autodesk access")

#### Create and authorize the APS app[​](#create-and-authorize-the-aps-app "Direct link to Create and authorize the APS app")

Create an Autodesk Platform Services (APS) OAuth app for the ACC account that you want Glean to index.

**Step 1. Create an OAuth app on Autodesk Platform Services**

To connect Autodesk Construction Cloud to Glean, you must create an Autodesk Platform Services (APS) OAuth app and use that app's credentials during setup.

1.  Sign in to [Autodesk Platform Services](https://aps.autodesk.com/) with an admin user, then open **My apps** to manage OAuth applications.
2.  Click **Create Application** and select **Traditional Web App**.
3.  Set the application name to **Glean**.
4.  Set the **Callback URL** to the value shown in the Glean setup page, in the format `oauth/instance/verify_code`. Do not construct the callback URL manually.
5.  Add the following Autodesk APIs to the app so the OAuth flow can request the right scopes:
    1.  **Data Management API** for `data:read`
    2.  **BIM 360 API / Account Admin API** for `account:read`
    3.  **Forma API (formerly ACC)** for `data:read`
6.  Click **Create App**.
7.  Copy the **Client ID** and **Client Secret** shown by Autodesk. Copy the secret now because Autodesk may show it only once.

**Step 2. Add Glean as a Custom Integration in Autodesk Construction Cloud**

Before Glean can access your content, you must authorize the Client ID from Step 1 as a Custom Integration within each Autodesk account (ACC, Autodesk Forma, or BIM 360) you want to index. If you skip this step, Glean cannot access the account or hub that you want to crawl. For more information, see the [Autodesk ACC Custom Integration Tutorial](https://aps.autodesk.com/en/docs/acc/v1/tutorials/).

1.  Sign in to the Autodesk home page at [acc.autodesk.com/home](https://acc.autodesk.com/home) as an Account Administrator.
2.  From the app picker or left navigation, open **Hub Admin**. This may also be labeled **Account Admin**.
3.  Use the hub or account picker at the top of the page to select the hub that you want Glean to index.
4.  In the left navigation, click **Custom Integrations**, then click **Add custom integration**.
5.  Paste the **Client ID** from step 1 into the **Autodesk Platform Services Client ID** field.
6.  Set the custom integration name to **Glean** and optionally add a description.
7.  Click **Add**.
8.  Confirm that Autodesk shows the app as authorized for the selected hub or account.
9.  Repeat these steps for every hub or account that you want to connect to Glean.

**Step 3. Authorize Autodesk Construction Cloud in Glean**

1.  In the Glean Admin console, go to **Connectors** > **Add connector**, and search for **Autodesk Construction Cloud**.
2.  Enter a name for the connector.
3.  Paste the **Client ID** and **Client Secret** from the APS app into the setup page.
4.  Click **Authorize** to start the OAuth flow.
5.  Sign in as an Autodesk admin who has access to the ACC account that you want Glean to index.
6.  Approve the requested scopes: `data:read` and `account:read`.
7.  Return to Glean after the authorization flow completes.

### Phase 2: Select the ACC account and save[​](#phase-2-select-the-acc-account-and-save "Direct link to Phase 2: Select the ACC account and save")

**Step 4. Select the ACC account**

After authorization, Glean shows the ACC accounts available to the authorized admin.

-   If only one account is available, Glean selects it automatically.
-   If multiple accounts are available, select the account that you want this connector instance to index.

**Step 5. Save the connector**

1.  Review the configuration.
2.  Click **Save**.
3.  Wait for the initial crawl to finish.

Glean validates connectivity after you select the account and save the connector.
