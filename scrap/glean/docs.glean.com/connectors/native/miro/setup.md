---
url: "https://docs.glean.com/connectors/native/miro/setup"
canonical: "https://docs.glean.com/connectors/native/miro/setup"
title: "Miro setup"
description: "Configure the Glean Miro connector, including requirements, app registration, OAuth permissions, company ID lookup, and connector setup in the Glean Admin console."
fetched_at: "2026-09-01T13:29:35.346Z"
---
On this page

You'll do the setup in two places: Miro to create and configure the app, and the **Glean Admin console** to save the required values.

## Requirements[​](#requirements "Direct link to Requirements")

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   A Miro Enterprise plan.
-   Access to the **Glean Admin console**.
-   The list of Miro teams you want the connector to index.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   A Miro OAuth2 application with a **Client ID** and **Client Secret**.
-   The **access token** and **refresh token** used for the connector authorization flow.
-   Your Miro **Company ID**.

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   You must be a Miro **Company Admin** to set up the connector.
-   The user who creates the app should also have the **Content Admin** role.
-   The app must be installed in each Miro team you want Glean to index.

## Step 1: Create a developer team and app in Miro[​](#step-1-create-a-developer-team-and-app-in-miro "Direct link to Step 1: Create a developer team and app in Miro")

1.  [Create a developer team](https://help.miro.com/hc/en-us/articles/4766759572114-Enterprise-Developer-teams) if you do not already have one.
2.  In that developer team, [create a new app](https://developers.miro.com/docs/rest-api-build-your-first-hello-world-app#step-1-create-a-developer-team-in-miro) for Glean.
3.  Set the app name to **Glean**.
4.  Turn on **Expire user authorization token** for stronger token security.

## Step 2: Configure app permissions[​](#step-2-configure-app-permissions "Direct link to Step 2: Configure app permissions")

1.  In the Miro app settings, grant the permissions required by the Glean connector.
2.  Verify that the app can read board content and identity information for the teams you plan to index.

## Step 3: Install the app in the teams you want to index[​](#step-3-install-the-app-in-the-teams-you-want-to-index "Direct link to Step 3: Install the app in the teams you want to index")

1.  [Install the app](https://developers.miro.com/docs/rest-api-build-your-first-hello-world-app#step-3-install-the-app) in one of your Miro teams.
2.  Repeat the installation for each team whose boards Glean should index.

## Step 4: Find your Company ID[​](#step-4-find-your-company-id "Direct link to Step 4: Find your Company ID")

1.  In Miro, go to **Settings → Company Profile**.
2.  Copy the Company ID from the URL.

The URL looks like this:

`https://miro.com/app/settings/company/{company_id}/settings`

Copy only the ID value, not the full URL.

## Step 5: Enter the values in Glean[​](#step-5-enter-the-values-in-glean "Direct link to Step 5: Enter the values in Glean")

1.  In the **Glean Admin console**, go to **Connectors** and select **Add connector**.
2.  Select **Miro**.
3.  Enter a connector name.
4.  Paste the **access token**, **refresh token**, **Client ID**, and **Client Secret** into the corresponding fields.
5.  Paste the **Company ID** into the appropriate field.
6.  Select **Save**.

## What happens next[​](#what-happens-next "Direct link to What happens next")

After you save the connector, Glean begins crawling the boards and permission metadata it can access in the configured Miro teams. Freshness depends on your API access level and crawl cadence, because this connector does not rely on webhooks.

## See also[​](#see-also "Direct link to See also")

-   [Miro overview](/connectors/native/miro/about)
