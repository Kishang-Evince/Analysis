---
url: "https://docs.glean.com/connectors/native/asana/new-setup"
canonical: "https://docs.glean.com/connectors/native/asana/new-setup"
title: "Set up Asana"
description: "Connect Asana's MCP server, configure indexing credentials, and choose who can use Asana in Glean."
fetched_at: "2026-10-13T08:49:45.367Z"
---
On this page

You're reading the **new setup**[Already have Asana connected? →](/connectors/native/asana/setup)

New setup separates the Asana connection for live fetch and tools from the credentials used for search indexing. The setup flow has three steps:

1.  **Connect:** Choose an authorization method for Asana's MCP server and authorize Glean to use Asana's read and write tools.
2.  **Set up indexing:** Provide an Asana access token and the Asana domain that Glean uses to index content.
3.  **Review setup:** Choose who can use the connector and begin indexing.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you begin:

-   Confirm that you are a Glean administrator who can add connectors.
-   Confirm that you are an Asana administrator. If you are not, grant an Asana administrator access to Glean to complete setup.

## Step 1: Connect Asana[​](#step-1-connect-asana "Direct link to Step 1: Connect Asana")

The Connect step authorizes Glean to use Asana's MCP server for live fetch and read and write tools.

Asana MCP apps do not use configurable scopes. If the **User authorization** choice appears, select one of these methods:

-   **Each user connects their own account:** Each user authenticates with Asana, and Asana limits that user's actions to the workspaces and data they can access. Follow the interactive authorization steps below.
-   **Cross App Access:** Your identity provider issues each user's token, so users are not asked to connect an Asana account. Follow [Cross App Access](#cross-app-access) instead.

**Interactive authorization:**

If you choose **Each user connects their own account**, complete the following steps. If you choose **Cross App Access**, skip to [Cross App Access](#cross-app-access).

**In Glean:**

1.  Go to **Admin console** > **Platform** > **Connectors**, select **Add connector**, then choose **Asana**.
2.  Enter a connector **Name**.
3.  Under **OAuth app setup**, copy the **Callback URL**. You need this value to create the app in Asana.

**In Asana:**

4.  Create an MCP app, register the callback URL, and configure workspace access, as described in the following sections.
5.  Copy the app's **Client ID** and **Client secret**.

**Back in Glean:**

6.  Paste the values into **Client ID** and **Client secret**.
7.  Select **Connect**, then approve access with your Asana account.

### Create an MCP app[​](#create-an-mcp-app "Direct link to Create an MCP app")

Use an **MCP app**, not a standard **API app**.

1.  Sign in to the [Asana developer console](https://app.asana.com/0/my-apps).
2.  Select **Create new app**.
3.  Enter an app name, such as `Glean Asana MCP`.
4.  For **App type**, select **MCP app**. Do not select **API app**.
5.  Select **Create app**.

### Register the callback URL[​](#register-the-callback-url "Direct link to Register the callback URL")

1.  In the Asana app's left sidebar, select **OAuth**.
2.  Under **Redirect URLs**, select **Add redirect URL**.
3.  Paste the **Callback URL** shown on the Glean Asana setup page.
4.  Select **Save changes**.

The redirect URL must exactly match the scheme, host, and path shown in Glean. Do not hard-code a callback URL from another Glean deployment or environment.

### Configure workspace access[​](#configure-workspace-access "Direct link to Configure workspace access")

1.  In the Asana app's left sidebar, select **Manage distribution**.
2.  Choose how the app is available:
    -   **Any workspace:** Users can authorize the app in any workspace they belong to.
    -   **Specific workspaces:** Limit the app to selected workspaces. Select at least one workspace.
3.  Select **Save changes**.

If you choose **Specific workspaces** but select no workspaces, users see: *"This app is not available to your Asana workspace or organization."*

After you save, copy the **Client ID** and **Client secret** from the app overview or **OAuth** page, then return to Glean to finish Step 1.

### Cross App Access[​](#cross-app-access "Direct link to Cross App Access")

If the Connect step shows **Cross App Access**, choose it instead of **Each user connects their own account** and follow these steps. Your Glean administrator must configure Cross App Access for the deployment before you begin.

#### 1\. Enable Cross App Access in Asana[​](#1-enable-cross-app-access-in-asana "Direct link to 1. Enable Cross App Access in Asana")

You must be an Asana Organization Admin.

1.  In the [Asana Admin Console](https://app.asana.com/admin), go to **Security** → **Cross-app access**.
2.  Turn on Cross-app access.
3.  Enter your identity provider's issuer and JWKS URI. For Okta, use the organization authorization server, not a custom authorization server:
    -   **Issuer URL:** `https://your-org.okta.com`
    -   **JWKS URI:** `https://your-org.okta.com/oauth2/v1/keys`
4.  Save.

Do not use a custom authorization server path such as `/oauth2/default`; it causes token exchange to fail.

See [Asana's Cross-app access article](https://help.asana.com/s/article/cross-app-access) for field-by-field detail.

#### 2\. Create an Asana MCP app[​](#2-create-an-asana-mcp-app "Direct link to 2. Create an Asana MCP app")

1.  Sign in to the [Asana developer console](https://app.asana.com/0/my-apps).
2.  Select **Create new app**.
3.  Enter an app name, such as `Glean Asana MCP`.
4.  For **App type**, select **MCP app**. Do not select **API app**.
5.  Select **Create app**.
6.  If Asana requires a redirect URL before it lets you save the app, add the Callback URL shown in Glean. Glean does not send users through Asana sign-in for Cross App Access.
7.  On the app overview or **OAuth** page, copy the **Client ID**. You do not need the client secret.

#### 3\. Add a resource connection in your identity provider[​](#3-add-a-resource-connection-in-your-identity-provider "Direct link to 3. Add a resource connection in your identity provider")

In Okta, on the AI Agent registered for this Glean deployment:

1.  Add a **Resource Connection** for Asana.
2.  Set **Client ID at resource** to the Asana **Client ID** from the previous step.
3.  Set **Scope Condition** to **Allow all**.
4.  Activate the agent. Confirm that every check on its page is green first.

#### 4\. Paste the Client ID into Glean[​](#4-paste-the-client-id-into-glean "Direct link to 4. Paste the Client ID into Glean")

1.  Paste the same Asana **Client ID** into **Resource client ID** on the Connect step.
2.  Select **Connect**.

Cross App Access does not require each user to sign in to Asana or approve access individually.

## Step 2: Set up indexing[​](#step-2-set-up-indexing "Direct link to Step 2: Set up indexing")

Authorizing Asana on the Connect step covers tools only. Glean needs a separate access token to index Asana content for search.

### Generate an Asana access token[​](#generate-an-asana-access-token "Direct link to Generate an Asana access token")

**For Asana Enterprise accounts:**

1.  Create a new service account using the [Asana service account documentation](https://help.asana.com/s/article/service-accounts?language=en_US).
2.  Name it **Glean Service Account**, or a similar name.
3.  Select **Full permissions** when creating the service account so it can access all data.
4.  Copy the access token listed for the service account.

**For other Asana account types:**

1.  Create a dedicated Asana administrator account named **Glean**, or a similar name.
2.  Create a personal access token for the Glean administrator using the [Asana personal access token documentation](https://developers.asana.com/docs/personal-access-token).
3.  Copy the personal access token.

### Determine the Asana domain[​](#determine-the-asana-domain "Direct link to Determine the Asana domain")

1.  While signed in as the indexing administrator or service account, open the [Asana workspaces API](https://app.asana.com/api/1.0/workspaces?opt_pretty).
2.  Find the workspace you want to index.
3.  Use the value in the response's `name` field as the **Asana domain**.

The Asana domain is case-sensitive. Enter the workspace name exactly as Asana returns it; do not enter the Asana URL.

### Enter the indexing credentials[​](#enter-the-indexing-credentials "Direct link to Enter the indexing credentials")

1.  Enter the **Access token**.
2.  Enter the **Asana domain** using the workspace name from the `name` field.
3.  Select **Continue**.

The indexing account must be able to access every project and task that you want Glean to index. For private projects, add the indexing administrator or service account explicitly to the project.

## Step 3: Review setup[​](#step-3-review-setup "Direct link to Step 3: Review setup")

Review the connection and indexing configuration. The review screen also explains that:

-   Your team can search Asana content and take action through Glean once they authenticate.
-   Glean continuously indexes, stores, and keeps Asana content up to date.
-   Glean uses Asana data to power search and provide relevant information.

Under **User access**, choose who can use the connector:

-   **All users:** Anyone in your organization can access Asana content and tools in Glean.
-   **Test group only:** Only users in your [test group](/administration/feature-rollouts) can access Asana content and tools in Glean. Use this option to pilot the connector before opening it to everyone.
-   **None:** No one can access Asana content or tools in Glean. Choose this option to finish indexing before you grant access, then change it later from the connector's [Tools tab](/connectors/configure-tools-in-connector/config-tools-mcp-from-connector).

Select **Begin indexing** to start the initial crawl. If you are not ready to provide indexing credentials, select **Skip for now** instead.

## Manage tools[​](#manage-tools "Direct link to Manage tools")

After you complete the initial connector setup, edit the Asana connector and open the [**Tools** tab](/connectors/configure-tools-in-connector/config-tools-mcp-from-connector). The tab lists the available read and write tools and includes [**Advanced settings**](/administration/tools/managing-tools/per-tool-enable-disable).

Asana provides these tools through its own MCP server, so the inventory comes from Asana rather than from Glean. The **Tools** tab shows what your deployment currently has. Glean groups tools that preview a change, such as project and task previews, with the read tools because they do not write to Asana on their own.

### Tool settings you can change after setup[​](#tool-settings-you-can-change-after-setup "Direct link to Tool settings you can change after setup")

-   **Which tools are on.** Review and enable available [read and write tools](/administration/tools/managing-tools/per-tool-enable-disable#read-vs-write-tools--recommended-starting-point) from the connector's **Tools** tab. Read tools retrieve Asana data; write tools change Asana data.
-   **Where tools appear.** Use Advanced settings to enable tools and set access for each surface: [**Chat**, **Agents**, and **Glean MCP Server**](/administration/tools/managing-tools/tools-chat-vs-agents). Agents support is in beta.
-   **Who can use the tools.** Use the **User access** choice in Review setup and [visibility scoping](/administration/tools/managing-tools/tool-visibility-scoping) to limit tools to all users, specific departments, or specific teammates.
-   **Who can configure tools.** Use [role-based tool access](/administration/tools/managing-tools/managing-role-based-access-tools) to control which admins and agent builders can add or configure tools.

Changes to Advanced settings apply immediately; you do not need to re-crawl or restart the connector. For the complete configuration model, see the [Tools overview](/administration/tools/). Every tool call remains limited to the workspaces and data that the authenticated Asana user can access.

## See also[​](#see-also "Direct link to See also")

-   [Choose your Asana setup](/connectors/native/asana/choose-your-setup)
-   [Previous setup](/connectors/native/asana/setup)
-   [Asana overview](/connectors/native/asana/about)
-   [Troubleshooting and FAQs](/connectors/native/asana/troubleshooting)
