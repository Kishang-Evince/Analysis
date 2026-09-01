---
url: "https://docs.glean.com/connectors/native/tableau/assistant"
canonical: "https://docs.glean.com/connectors/native/tableau/assistant"
title: "Tableau in Assistant"
description: "Set up Tableau in Glean Assistant so users can ask natural-language questions about Tableau data."
fetched_at: "2026-09-01T13:29:44.376Z"
---
On this page

Tableau in Assistant lets users ask natural-language questions about Tableau data from Glean. Unlike [Tableau indexing](/connectors/native/tableau/connector), which indexes Tableau metadata for discovery, this integration connects to Tableau in real time so Glean Assistant can query workbooks, views, datasources, and metrics on behalf of each user.

Access

Tableau in Assistant isn't enabled by default. Contact your Glean representative or [Glean Support](https://support.glean.com) to confirm whether your deployment has access.

Use Tableau in Assistant when:

-   You want users to ask natural-language questions about Tableau data from Glean, without switching to Tableau.
-   You want Assistant responses to reflect each user's own Tableau access.
-   You want to bring live Tableau data into Glean Assistant and agent workflows alongside other connected tools.

## How it works[​](#how-it-works "Direct link to How it works")

After you configure Tableau Connected App credentials in Glean, the integration uses per-user impersonation to query Tableau on behalf of each user. When someone asks a question that involves Tableau data, Glean authenticates to Tableau as that user through the Connected App, retrieves the relevant data, and returns results scoped to that user's Tableau permissions.

This means users don't need to provide their own credentials for Assistant. Access is handled automatically through the Connected App, and users only see data they can access in Tableau itself.

The integration supports the following capabilities:

-   **Content exploration**: search and browse Tableau workbooks, views, datasources, and projects.
-   **Datasource querying**: run queries against Tableau datasources to retrieve specific data.
-   **View and dashboard retrieval**: get data and images from Tableau views and custom views.
-   **Pulse metrics**: access Tableau Pulse metrics and insights.

## Requirements[​](#requirements "Direct link to Requirements")

### Tableau requirements[​](#tableau-requirements "Direct link to Tableau requirements")

-   A Tableau connector instance configured with **Connected App (Direct Trust)** credentials. Use [Set up indexing using a Connected App](/connectors/native/tableau/setup-connected-app) to configure the indexing and Assistant-capable path. A Personal Access Token (PAT) connector instance does not support Assistant; use the Connected App setup instead.
-   A Tableau Connected App configured with Direct Trust. See [Use Tableau Connected Apps for application integration](https://help.tableau.com/current/online/en-us/connected_apps_direct.htm) in the Tableau documentation.
-   An admin account with one of the following Tableau site roles: **Server Administrator**, **Site Administrator Creator**, or **Site Administrator Explorer**. On Tableau Server, a server administrator must enable connected apps, which require Tableau Server 2022.1 or later.

### Glean requirements[​](#glean-requirements "Direct link to Glean requirements")

-   Access to the **Admin console** with permission to manage connector settings.
-   A Tableau connector instance configured with Connected App credentials.

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

Tableau tools are set up as part of the Tableau connector setup. Complete the **Set up indexing** step, select **Continue**, and then complete the **Connect** step in the same connector wizard. You do not start Tableau tool setup from the generic Tools page.

### Step 1: Create a Connected App in Tableau[​](#step-1-create-a-connected-app-in-tableau "Direct link to Step 1: Create a Connected App in Tableau")

Complete these steps from an account with the **Server Administrator**, **Site Administrator Creator**, or **Site Administrator Explorer** site role.

1.  In Tableau, navigate to **Settings → Connected Apps**.
2.  Click **New Connected App** and select **Direct Trust**.
3.  Give the app a name (for example, "Glean") and create it.
4.  Newly created connected apps are disabled by default. Enable the app by clicking the three dots next to the app name.
5.  From the app's detail page, copy the **Client ID**.
6.  Click **Generate New Secret**, then copy the **Secret ID** and **Secret Value**.

warning

The Secret Value is shown only once. Save it in a secure location before closing the dialog.

### Step 2: Set up indexing in Glean[​](#step-2-set-up-indexing-in-glean "Direct link to Step 2: Set up indexing in Glean")

1.  In the **Admin console**, navigate to **Connectors**, select **Add connector**, and choose **Tableau**.
2.  In **Set up indexing**, enter the following values:
    -   **Site domain**: your Tableau instance domain.
    -   **Site content URL**: the site identifier, if you are not using the default site.
    -   **Webhook base URL**: pre-populated by Glean. Verify that it is correct.
    -   **Admin Tableau username**: the **Username** value for a Tableau account with the **Server Administrator**, **Site Administrator Creator**, or **Site Administrator Explorer** site role. The value must match Tableau exactly, including case. Glean uses this account for read-only indexing and permissions operations.
    -   **Connected App client ID**
    -   **Connected App secret ID**
    -   **Connected App secret value**
3.  Select **Continue**.

The Connected App secret value is shown only once when it is generated in Tableau. Store it securely before closing the Tableau dialog.

### Step 3: Connect Tableau MCP in the same connector setup[​](#step-3-connect-tableau-mcp-in-the-same-connector-setup "Direct link to Step 3: Connect Tableau MCP in the same connector setup")

After you complete **Set up indexing**, the Tableau connector wizard displays a **Connect** step. This step uses the Connected App credentials from the previous step to connect the Glean-hosted Tableau MCP server. It does not require a separate end-user OAuth flow or additional Tableau credentials.

1.  On the **Connect** step, select **Connect**.
2.  Wait for Glean to confirm that Tableau MCP is connected and the read-only tools are available.

After the connector setup is complete, navigate to the Tableau connector's **Tools** tab to review available tools and their **Enabled surfaces**. To change who can use a tool, select **Advanced settings** and set **Access** for each tool and surface, such as **Chat**, to **All teammates**, a specific department, or a specific teammate. Use **Copy to all tools** to apply the same access to every tool, then select **Save**.

If you scope a tool to specific users or groups, only those users can invoke it in Assistant. For more on scoping, see [Manage tool access](/administration/tools/managing-tools/tool-visibility-scoping) and [Configure tools in connector setup](/connectors/configure-tools-in-connector/config-tools-mcp-from-connector).

### Step 4: Verify the connection[​](#step-4-verify-the-connection "Direct link to Step 4: Verify the connection")

1.  As an end user with Tableau access, navigate to Glean Assistant.
    
2.  Ask a question about Tableau data. For example:
    
    `What are the top-performing regions in last quarter's sales dashboard?`📋
    
3.  Confirm that Assistant returns relevant results from Tableau.
    

## See also[​](#see-also "Direct link to See also")

-   [Indexing](/connectors/native/tableau/connector): set up the Tableau connector that Assistant builds on
-   [Troubleshooting and FAQs](/connectors/native/tableau/troubleshooting): common issues and questions for Tableau in Glean
