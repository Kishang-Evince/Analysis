---
url: "https://docs.glean.com/connectors/native/databricks/setup"
canonical: "https://docs.glean.com/connectors/native/databricks/setup"
title: "Databricks setup"
description: "Configure the Glean Databricks connector, including requirements, the Databricks service principal and OAuth credentials, and connector configuration in the Glean Admin console."
fetched_at: "2026-09-01T13:29:24.893Z"
---
On this page

The setup process involves two main phases: preparing your Databricks environment to get the credentials, and then configuring the connector in Glean.

## Requirements[​](#requirements "Direct link to Requirements")

To set up the Databricks connector, you must meet the following requirements:

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

Your Databricks account must have **AI/BI Dashboards** enabled. A **Databricks Premium Plan** is required for API access.

### Administrative requirements[​](#administrative-requirements "Direct link to Administrative requirements")

The requirements for the Databricks connector depend on the configuration mode you select.

-   **For Account-level configuration (Recommended)**:
    -   **User**: The person performing the setup must be a Databricks **Account Admin** or have credentials for an existing service principal that has the **Account Admin** role. This is required to authorize the connector and link the service principal at the account level.
    -   **Service principal**: Must be assigned the **Account Admin** role.
-   **For Workspace-level configuration (Non-Account Admin)**:
    -   **User**: Does not require the Account Admin role, but must be able to grant the service principal Workspace Admin access within each workspace being indexed and provide the required workspace details during setup.
    -   **Service principal**: Must be a **Workspace Admin** on every workspace you intend to index.

#### Configuration patterns[​](#configuration-patterns "Direct link to Configuration patterns")

The choice of configuration pattern significantly impacts how Glean resolves permissions and surfaces dashboards to your users.

-   **Account-level (Recommended)**: In this mode, the service principal provides a unified view of all users and groups across the entire Databricks account. This is essential for accurately resolving permissions when documents are shared with groups that span multiple workspaces.
-   **Workspace-level (Non-Account Admin)**: Use this mode only if your security policy prohibits granting the Account Admin role to a service principal. For details, see [Permission limitations in Non-Account Admin mode](#permission-limitations-in-non-account-admin-mode).

#### Permission limitations in Non-Account Admin mode[​](#permission-limitations-in-non-account-admin-mode "Direct link to Permission limitations in Non-Account Admin mode")

In this mode, the connector can only see groups that are members of the specific workspaces provided for indexing.

If a dashboard or Genie space is shared with a group that is not a member of the crawled workspaces, Glean cannot verify that group’s membership. Consequently, permissions will not be applied, and users in that group will be unable to find those documents in Glean, even if they have access in Databricks.

For more information, see [Databricks administration introduction](https://docs.databricks.com/aws/en/admin/).

### Credentials requirements[​](#credentials-requirements "Direct link to Credentials requirements")

The connector uses an **M2M OAuth** flow. You must provide the following credentials from your Service Principal:

-   Account URL
-   OAuth Client ID
-   OAuth Client Secret
-   **(For Azure Only):** All workspace URLs you wish to index.

## Step 1: Prepare Databricks[​](#step-1-prepare-databricks "Direct link to Step 1: Prepare Databricks")

This step requires you to obtain the three key credentials needed for the Glean connector: the **Account URL**, the **OAuth Client ID**, and the **OAuth Secret**.

1.  **Determine your account URL**
    -   Sign in to Databricks as an Account Admin by visiting the link that corresponds to your cloud provider:
        -   [Amazon Web Services (AWS)](https://accounts.cloud.databricks.com/login)
        -   [Google Cloud Platform (GCP)](https://accounts.gcp.databricks.com/login)
        -   [Microsoft Azure](https://accounts.azuredatabricks.net/login)
    -   After the page loads, copy the entire URL from your browser's address bar. This is your unique **Account URL**.
2.  **Generate a service principal**
    -   In Databricks, navigate to the **User management** page and click on the **Service principals** tab.
    -   Click **Add service principal**, enter `Glean` as the name, and press **Add**.
    -   Go to the new service principal's page:
        -   If you are using the account‑level configuration, ensure the **Account Admin** role is toggled on under the **Roles** tab.
        -   If you plan to use non‑Account‑Admin mode, you can skip assigning the **Account Admin** role; instead, make sure the service principal is an admin on each workspace you want Glean to crawl.
3.  **Generate OAuth credentials**
    -   While on your service principal's page, navigate to the **Credentials & secrets** tab.
    -   Under **OAuth secrets**, click **Generate secret**.
    -   Set the lifetime (720 days is recommended) and click **Generate**.
    -   The generated secret value is your OAuth Secret. Copy this value immediately as it will not be displayed again.
    -   The Client ID is the value in the **Client ID** field. Copy this value as well.

## Step 2: Configure in Glean[​](#step-2-configure-in-glean "Direct link to Step 2: Configure in Glean")

1.  In the Glean Admin Console, navigate to **Connectors**, select **Add Connector**, and select **Databricks**.
2.  In the **Databricks** connector setup page, enter the three credentials you just obtained from Databricks into their corresponding fields:
    -   Account URL
    -   OAuth Client ID
    -   OAuth Secret

## Step 3: Non account admin mode[​](#step-3-non-account-admin-mode "Direct link to Step 3: Non account admin mode")

Follow these steps only if you are configuring the connector without the **Account Admin** role. You must manually grant the service principal **Workspace Admin** access to every workspace you intend to index.

1.  In the Databricks Account Console, navigate to the **Workspaces** tab.
2.  For each workspace to be indexed, copy the **Workspace name**, **Workspace URL**, and **Workspace ID**, then enter them into the Glean setup page.
3.  Click **Add workspace** to include additional environments as needed.

## Step 4: Save and validate[​](#step-4-save-and-validate "Direct link to Step 4: Save and validate")

Click **Save** in the Glean Admin Console to complete the setup. The connector will automatically perform an initial crawl and validate the permissions.

## See also[​](#see-also "Direct link to See also")

-   [Databricks overview](/connectors/native/databricks/about)
-   [Databricks FAQs](/connectors/native/databricks/faqs)
