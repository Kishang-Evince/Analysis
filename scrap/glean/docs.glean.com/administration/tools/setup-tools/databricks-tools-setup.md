---
url: "https://docs.glean.com/administration/tools/setup-tools/databricks-tools-setup"
canonical: "https://docs.glean.com/administration/tools/setup-tools/databricks-tools-setup"
title: "Databricks tools setup"
description: "Enable Databricks tools and configure OAuth authentication in Glean."
fetched_at: "2026-09-01T13:29:15.215Z"
---
On this page

Use Databricks tools to let Glean Assistant and agents query your Databricks data without leaving Glean. Users can ask questions in natural language against a Databricks Genie space or run read-only SQL against a Databricks warehouse, and combine the results with other connected apps and documents in Glean.

With this setup, you can:

-   Enable Databricks tools in Glean
-   Configure OAuth authentication between Glean and Databricks
-   Decide which agents and Glean surfaces can use these tools

tip

Databricks tools work in both Glean Assistant and agents. To use Databricks Genie in Glean Assistant, see [Connect Databricks Genie to Glean Assistant](/administration/assistant/warehouse-data/connect-databricks-genie-to-glean-assistant).

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before enabling Databricks tools:

-   You must have administrative privileges in both Glean and Databricks
-   You must provide a default Databricks Warehouse ID and Genie Space ID
-   You must be able to access the Glean **Admin console**

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

1.  In Glean, go to **Admin console → Platform → Tools**.
2.  Click **Add**.
3.  From **Add pre-set tools**, select **Databricks tools** under **Tool templates**.
4.  In the **Configuration** tab, add the following:
    1.  **Default Genie Space ID**: The default Genie space to query. To find it, open the Genie space in Databricks and copy the ID from the URL, for example, `https://<databricks-instance-id>.cloud.databricks.com/genie?rooms/<genie-space-id>/o=<number>`.
    2.  **Default Warehouse ID**: The default warehouse used for SQL execution.
    3.  **Host URL**: The full address of your Databricks instance. Replace `<databricks-instance-id>` with the ID for your instance:
        -   AWS: `https://<databricks-instance-id>.cloud.databricks.com/`
        -   GCP: `https://<databricks-instance-id>.gcp.databricks.com/`
        -   Azure: `https://adb-<databricks-instance-id>.<number>.azuredatabricks.net/`

### Configure authentication[​](#configure-authentication "Direct link to Configure authentication")

Databricks tools authenticate through a customer-managed Databricks OAuth app. Create the app in Databricks, add its credentials to Glean, and then return the generated callback URL to Databricks.

#### Step 1: Create a Databricks OAuth app[​](#step-1-create-a-databricks-oauth-app "Direct link to Step 1: Create a Databricks OAuth app")

1.  Sign in to your [Databricks account console](https://accounts.cloud.databricks.com/).
2.  Go to **Settings → App Connections**.
3.  Click **Add Connection**.
4.  Enter an **Application Name**, for example, `Glean Databricks Genie OAuth`.
5.  Add a placeholder URL in the **Redirect URL** field. You replace this with the Glean callback URL in Step 3.
6.  Set **Access Scopes** to **All APIs**.
7.  Select **Generate a Client Secret**.
8.  Adjust the access and refresh token lifetimes (TTLs) as needed. Databricks recommends about 6 hours for access tokens and 3 months for refresh tokens so background agents do not reauthenticate frequently.
9.  Save the application, then copy the **Client ID** and **Client Secret**.

#### Step 2: Enter credentials in Glean[​](#step-2-enter-credentials-in-glean "Direct link to Step 2: Enter credentials in Glean")

In the **Authenticate** section of the Databricks tool in Glean:

1.  Paste the **Client ID** and **Client Secret** from the Databricks OAuth app.
2.  Set the **Authorization URL** to `https://<host-url>/oidc/v1/authorize`.
3.  Set the **Token URL** to `https://<host-url>/oidc/v1/token`.
4.  Set the **Scope** to `all-apis,offline_access`.
5.  Click **Save**.

#### Step 3: Add the callback URL to Databricks[​](#step-3-add-the-callback-url-to-databricks "Direct link to Step 3: Add the callback URL to Databricks")

1.  After you save, Glean generates a **Callback URL** at the bottom of the **Authenticate** section. Copy it.
2.  In the Databricks account console, edit your OAuth app and replace the placeholder **Redirect URL** with the callback URL from Glean.
3.  Save the OAuth app.

#### Step 4: Enable the tools[​](#step-4-enable-the-tools "Direct link to Step 4: Enable the tools")

Click **Edit settings** under the **Enable Tools** section to make tools visible for all or some users within Glean and agents.

## See also[​](#see-also "Direct link to See also")

-   Full list of available Databricks tools and how to test them in Agent Builder: [Databricks tools](/tools/connector/databricks-tools)
-   Use Databricks Genie in Glean Assistant: [Connect Databricks Genie to Glean Assistant](/administration/assistant/warehouse-data/connect-databricks-genie-to-glean-assistant)
-   Troubleshoot authentication: [Troubleshooting tools authentication](/troubleshooting/tools-authentication)
