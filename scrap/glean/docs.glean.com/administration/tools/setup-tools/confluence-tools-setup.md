---
url: "https://docs.glean.com/administration/tools/setup-tools/confluence-tools-setup"
canonical: "https://docs.glean.com/administration/tools/setup-tools/confluence-tools-setup"
title: "Confluence tools setup"
description: "Use Confluence tools to let Glean Assistant and Glean Agents search, create, and update content in Confluence Cloud including spaces, pages, and blog posts without leaving Glean."
fetched_at: "2026-09-01T13:29:15.260Z"
---
On this page

Use Confluence tools to let Glean Assistant and Glean Agents search, create, and update content in Confluence Cloud including spaces, pages, and blog posts without leaving Glean.

With this setup, you can:

-   Enable a Confluence tools for a tenant.
-   Authenticate using either a central Confluence OAuth app or a customer-managed OAuth app.
-   Decide which agents and surfaces can use these tools.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before enabling Confluence tools:

-   The Confluence connector must be configured and successfully crawling content.
-   You must be able to access the Glean Admin Console.
-   Your Confluence admin can approve an OAuth app:
    -   For central or custom OAuth, your Atlassian / Confluence admin must be able to create or approve an OAuth integration and grant the scopes shown in the Confluence Tools setup screen.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

Follow these steps to setup the Confluence tools:

1.  In Glean, go to **Admin Console → Platform → Tools**.
2.  Click **Add**.
3.  From the list in the **Add pre‑set tools** section, select **Confluence Tools** under **Tool templates**.
4.  In the **Configuration** tab:
    
    1.  Add the **Instance Name**.
    
    note
    
    If you have multiple Confluence Cloud instances, create a separate tools per connector instance and name them accordingly, for example, *Confluence Tools – Corp Wiki*, *Confluence Tools – Engineering*.
    
    2.  Select **Connector Instance** to link this tool to your Confluence instance.
    3.  Configure authentication using the tabs below, based on your requirements.

### Configure authentication[​](#configure-authentication "Direct link to Configure authentication")

Confluence tools use *user OAuth* so that tools run as the signed‑in user and respect their permissions. You can either use a **central Glean‑managed app** (recommended where available) or configure a **custom OAuth app** in Atlassian.

-   Central authentication (Recommended)
-   Custom authentication

Use the **central** option if:

-   Your organization is *Glean‑hosted*, and
-   Central apps are available for *Confluence* in your environment.

1.  Select **Central** under the **Authenticate** section on the Confluence Tools setup page.
2.  Click **Save**.
3.  Click **Edit settings** under the **Enable Tools** section to make tools visible for all or some users within Glean Assistant and Glean Agents.

note

End users are prompted to connect their Confluence account the first time they run a tool, and tokens are managed centrally thereafter.

Use the **custom** option if:

-   You are *self‑hosted*, or
-   Your security model requires a *customer‑owned* Atlassian OAuth app.

#### Step 1: Create a new OAuth app[​](#step-1-create-a-new-oauth-app "Direct link to Step 1: Create a new OAuth app")

1.  Navigate to the [Atlassian Developer Console](https://developer.atlassian.com/console/myapps) and create a new app of type OAuth 2.0 integration.
2.  Click **Save** to create the OAuth app.
3.  Copy the **Client ID**.
4.  Copy the **Client Secret**.

#### Step 2: Set permissions[​](#step-2-set-permissions "Direct link to Step 2: Set permissions")

1.  Go to the **Permissions** tab of your app configuration.
2.  Add **Scopes**. These scopes are available in the Confluence tools configuration page on the Glean admin console.

#### Step 3: Update distribution settings[​](#step-3-update-distribution-settings "Direct link to Step 3: Update distribution settings")

1.  Go to the **Distribution** tab of your app configuration in the Atlassian Developer Console.
2.  Click **Edit**.
3.  Change the **Distribution Status** to *Sharing*.
4.  Add a privacy policy. You can use [Glean privacy policy](https://www.glean.com/privacy-policy).
5.  Click **Save Changes**.

#### Step 4: Fill the client ID and client secret[​](#step-4-fill-the-client-id-and-client-secret "Direct link to Step 4: Fill the client ID and client secret")

1.  Navigate to the Confluence tools configuration page in the Glean admin console.
2.  Select **custom** under the **Authenticate** section.
3.  Add the **Client ID** and **Client secret** information.
4.  Click **Save**.
5.  Copy the **Callback URL**.

#### Step 5: Configure the callback URL in your OAuth app[​](#step-5-configure-the-callback-url-in-your-oauth-app "Direct link to Step 5: Configure the callback URL in your OAuth app")

1.  Go to the **Authorization tab** of your app configuration on the Atlassian developer console.
2.  Paste the callback URL into the **Callback URL** field.
3.  Click **Save** your OAuth app.

#### Step 6: Configure surface visibility[​](#step-6-configure-surface-visibility "Direct link to Step 6: Configure surface visibility")

Click **Edit settings** under the **Enable Tools** section to make tools visible for all or some users within Glean Assistant and Glean Agents.
