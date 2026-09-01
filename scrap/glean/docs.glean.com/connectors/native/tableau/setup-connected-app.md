---
url: "https://docs.glean.com/connectors/native/tableau/setup-connected-app"
canonical: "https://docs.glean.com/connectors/native/tableau/setup-connected-app"
title: "Connected App setup"
description: "Configure Tableau indexing and Tableau in Assistant with Connected App credentials."
fetched_at: "2026-09-01T13:29:44.880Z"
---
On this page

Use this setup to configure Tableau indexing and Tableau in Assistant with Tableau Connected App (Direct Trust) credentials. The setup is completed in the Tableau connector wizard in Glean.

Access

The Tableau Connected App setup isn't enabled by default. Contact your Glean representative or [Glean Support](https://support.glean.com) to confirm whether your deployment has access.

info

**Why use Connected App?** Use this setup when you want both indexed Tableau content in Glean Search and live Tableau data in Glean Assistant. End users do not need to enter Tableau credentials; Glean uses the Connected App to impersonate each user's Tableau identity.

## Requirements[​](#requirements "Direct link to Requirements")

In addition to the [shared Tableau indexing requirements](/connectors/native/tableau/connector#shared-requirements), you need:

-   A Tableau Connected App configured for **Direct Trust**.
-   A Tableau administrator's exact **Username** value.
-   The Connected App **Client ID**, **Secret ID**, and **Secret Value**.
-   On Tableau Server, Connected Apps enabled by a server administrator. Connected Apps require Tableau Server 2022.1 or later.

For Tableau-side requirements, see [Use Tableau Connected Apps for application integration](https://help.tableau.com/current/online/en-us/connected_apps_direct.htm).

## Create the Connected App in Tableau[​](#create-the-connected-app-in-tableau "Direct link to Create the Connected App in Tableau")

Complete these steps from a Tableau account with the **Server Administrator**, **Site Administrator Creator**, or **Site Administrator Explorer** site role.

1.  Sign in to Tableau and navigate to the homepage. Copy the full URL from your browser address bar. It should have this format: `https://<domain>/#/site/<site_content_URL>/home`. If you're on the default site, leave the site content URL empty in Glean.
2.  In Tableau, navigate to **Settings** → **Connected Apps**.
3.  Select **New Connected App** → **Direct Trust**, enter a descriptive app name such as `Glean`, and create it.
4.  Enable the new Connected App. Newly created Connected Apps are disabled by default.
5.  On the Connected App details page, copy the **Client ID**.
6.  Select **Generate New Secret**, then copy the **Secret ID** and **Secret Value**. Save the secret value securely because Tableau displays it only once.
7.  In Tableau, navigate to **My Account Settings** → **Settings**. Under **Account**, copy the **Username** value for the administrator who will authorize the connector. The username must match Tableau exactly, including case.

## Configure Connected App indexing in Glean[​](#configure-connected-app-indexing-in-glean "Direct link to Configure Connected App indexing in Glean")

1.  In the **Admin console**, navigate to **Connectors**, select **Add connector**, and choose **Tableau**.
2.  Enter a display name for the connector. This name identifies the Tableau connector instance in Glean.
3.  In **Set up indexing**, enter the following values:
    -   **Site domain**: the Tableau hostname, such as `abc.tableau.com`, from the Tableau URL. Enter the domain without the protocol or site path.
    -   **Site content URL**: the identifier in the `/site/<site_content_URL>/` portion of the Tableau URL. Leave this field empty when connecting the default site.
    -   **Webhook base URL**: pre-populated by Glean. Verify that the URL is correct; Tableau uses it to deliver workbook and data source change notifications to Glean.
    -   **Admin Tableau username**: the **Username** value copied from the Tableau administrator's account. This is not necessarily the administrator's email address. The value must match Tableau exactly, including case. Glean uses this account to index Tableau content and permissions.
    -   **Connected App client ID**: the **Client ID** copied from the Tableau Connected App details page.
    -   **Connected App secret ID**: the **Secret ID** generated for the Connected App.
    -   **Connected App secret value**: the **Secret Value** generated for the Connected App. Tableau displays this value only once.
4.  Select **Continue** to save the indexing configuration.
5.  In the same Tableau connector wizard, navigate to the **Connect** step and select **Connect** to enable Tableau tools.
6.  After setup completes, navigate to the Tableau connector's **Tools** tab to review tool access and enabled surfaces. Configure access for each tool as needed.

The **Connect** step reuses the Connected App credentials from **Set up indexing**. It does not require a separate end-user OAuth flow or additional Tableau credentials.

note

To connect additional Tableau sites, configure a separate Tableau connector instance in Glean for each site. Contact the Glean engineer helping with your deployment if you need assistance.

## Next step[​](#next-step "Direct link to Next step")

After completing the Connected App setup, see [Tableau in Assistant](/connectors/native/tableau/assistant) to learn how users can ask natural-language questions about live Tableau data.
