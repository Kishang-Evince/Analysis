---
url: "https://docs.glean.com/connectors/native/docusign/setup"
canonical: "https://docs.glean.com/connectors/native/docusign/setup"
title: "Docusign setup"
description: "Configure the Glean Docusign connector, including requirements, Docusign integration app setup, redirect URI configuration, and authorization."
fetched_at: "2026-09-01T13:29:25.819Z"
---
On this page

Glean integrates with Docusign using an integration app created within your Docusign tenant. This setup requires per-user authorization for live-fetching content.

## Requirements[​](#requirements "Direct link to Requirements")

-   Access to a Docusign account with eSignature admin privileges.
-   Ability to create and manage integration apps in your Docusign tenant.
-   Each user must authorize the connector individually to enable live fetch in chat.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

### Gather setup parameters[​](#gather-setup-parameters "Direct link to Gather setup parameters")

1.  Go to your Docusign account's home page. If you see the **Developer Environment** banner, check the **Developer Account** checkbox in the Glean setup.
2.  Check the browser URL bar when sending a document. The Base URL is the combined protocol and domain name (e.g., if you see `https://apps-d.docusign.com/...`, your Base URL is [`https://apps-d.docusign.com`](https://apps-d.docusign.com)).
3.  Copy the **redirect URL** provided in the Glean setup page. You need to enter this URL later in the Docusign integration app.

You need to enter the following details in Glean:

-   API account ID
-   Integration key
-   Secret key

Perform the following steps to gather these credentials.

### Obtain Docusign integration key[​](#obtain-docusign-integration-key "Direct link to Obtain Docusign integration key")

#### Step 1: Access the Apps and Keys page[​](#step-1-access-the-apps-and-keys-page "Direct link to Step 1: Access the Apps and Keys page")

1.  Log in to your DocuSign developer account. If you do not have an account, create one first, following the prompts to log in at the end of the process.
2.  Open the **Apps and Keys** page for your developer account.

#### Step 2: Create and configure a new app[​](#step-2-create-and-configure-a-new-app "Direct link to Step 2: Create and configure a new app")

1.  Select **Add App and Integration Key**.
2.  Enter a short, descriptive name for your app (e.g., "Glean HR Integration") in the dialog box.
3.  Select **ADD** to create the app. Your app is automatically assigned an Integration Key (GUID) value that cannot be changed.

For more information, see [How to get an integration key](https://developers.docusign.com/platform/configure-app/#how-to-get-an-integration-key).

### Add a secret key in Docusign integration app[​](#add-a-secret-key-in-docusign-integration-app "Direct link to Add a secret key in Docusign integration app")

Secret key is a GUID value that is only shared with your web server and the Docusign platform.

1.  Log into your Docusign account as an eSignature admin.
2.  Go to **Integration > Apps and Keys**.
3.  Click **Add App and Integration Key** for your developer account.
4.  On the list of your apps and integration keys, find the row of the app to configure, then select EDIT from its ACTIONS context menu. This will open the configuration page for that app.
5.  Under **Authentication**, select **Yes** for "Is your application able to securely store a client secret?"
6.  Under **Authentication**, add a **Secret Key** which creates a new, automatically generated GUID value that represents a secret key.
7.  Under **Additional settings**, add the **Redirect URI** copied from the Glean setup page.
8.  Click **Save**.

For more information, see [Configure your app](https://developers.docusign.com/platform/configure-app/).

### Set a Redirect URI in Docusign[​](#set-a-redirect-uri-in-docusign "Direct link to Set a Redirect URI in Docusign")

#### Step 1: Edit the integration app[​](#step-1-edit-the-integration-app "Direct link to Step 1: Edit the integration app")

1.  Open the **Apps and Keys** page for your developer account.
2.  Find the row for the app you created and select **EDIT** from its **ACTIONS** context menu. This opens the app configuration page.

#### Step 2: Configure the redirect URI[​](#step-2-configure-the-redirect-uri "Direct link to Step 2: Configure the redirect URI")

1.  Select **ADD URI**. A new text box appears.
2.  Paste the **Redirect URI** copied from the Glean setup page into the text box.
3.  Select **SAVE**. The newly configured integration key settings appear on the **Apps and Keys** page.

For more information, see [Configure your app](https://developers.docusign.com/platform/configure-app/).

### Obtain your API account ID[​](#obtain-your-api-account-id "Direct link to Obtain your API account ID")

A GUID that identifies your account. Most Docusign API calls include this value (also called account ID) as the `accountId` parameter in the call’s path. You can find your API Account ID on the [Apps and Keys](https://admindemo.docusign.com/authenticate?goTo=appsAndKeys) page.

For more information, see [Configure your app](https://developers.docusign.com/platform/configure-app/).

### Enter the integration app details in Glean[​](#enter-the-integration-app-details-in-glean "Direct link to Enter the integration app details in Glean")

1.  Paste the **API Account ID** into the corresponding field in Glean.
2.  Copy the **Integration Key** from the app you just created and paste it in the **Integration Key** field in Glean.
3.  Copy the **Secret Key** (Client Secret) from the app you just created and paste it in the **Client Secret** field in Glean.
4.  Click **Authorize** and authenticate.

Upon successful validation, you're set to use the Docusign connector.

## See also[​](#see-also "Direct link to See also")

-   [Docusign overview](/connectors/native/docusign/about)
