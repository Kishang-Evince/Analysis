---
url: "https://docs.glean.com/connectors/native/jira-onprem/non-admin-setup"
canonical: "https://docs.glean.com/connectors/native/jira-onprem/non-admin-setup"
title: "Jira Data Center: Non‑admin setup"
description: "Learn how to integrate Jira Data Center (Jira On-Prem) connector with Glean in non-admin setup."
fetched_at: "2026-09-01T13:29:33.190Z"
---
On this page

Jira Data Center supports a non‑admin setup; this mode allows the connector to run without the Jira Administrators global permission.

By default, the service account should have Jira Administrators, but a non‑admin setup for Jira DC exists as an alternative path with different permission requirements and limitations.

> Before proceeding with these steps, you must coordinate with the Glean Support team to complete the necessary actions, such as updating the configuration file and setting the webhook and plugin target URLs.

### 1\. Install the Webhook App[​](#1-install-the-webhook-app "Direct link to 1. Install the Webhook App")

1.  In the Jira UI, click on the **⚙️ icon** at the top right and select **System**.
2.  Under the **Advanced** section, select **Webhooks**.
3.  Click **Create a webhook**.
4.  Fill in the form as follows:
    -   **Name**: `Glean Search`
    -   **Status**: `Enabled`
    -   **URL**: *Webhook URL provided by the Glean representative*
    -   **Events**:
        -   Comment created
        -   Comment updated
        -   Comment deleted
        -   Issue created
        -   Issue updated
        -   Issue deleted
    -   **Exclude body**: Ensure the checkbox is **not selected**.
5.  Save the webhook configuration.

### 2\. Install the Glean Plugin[​](#2-install-the-glean-plugin "Direct link to 2. Install the Glean Plugin")

1.  Download the **Glean Activity Plugin** from the [Atlassian Marketplace](https://marketplace.atlassian.com/apps/1229097/glean-activity-plugin-for-jira-data-center-server?hosting=datacenter&tab=installation).
2.  Refer to the following table for proper version installation:

| Jira DC Version | Glean Plugin Version |
| --- | --- |
| < 9.0.0 | < = 1.6.1 |
| \>= 9.0.0 and < 10.0.0 | 1.7.0 |
| \>= 10.0.0 | \>= 2.0.0 |

3.  Follow the installation instructions provided on the marketplace page.

### 3\. Configure the Glean Plugin[​](#3-configure-the-glean-plugin "Direct link to 3. Configure the Glean Plugin")

1.  Go to the **Jira Administration Console** (⚙️ icon at the top right).
2.  Select **Manage apps**.
3.  In the left navigation pane, there should be **Other** section visible.

**a. Configure Events Target URL**

-   Go to **Configure events target URL for Glean Search Plugin**.
-   If the option is not visible, ensure the plugin was installed correctly.
-   Set the **Plugin Target URL** provided by the Glean representative.

**b. Configure Service Account**

-   Go to **Configure Service Account for Glean Search Plugin**.
-   Set the email of the **service account user** you want to use.

### 4\. Configure the Jira Connector in Glean[​](#4-configure-the-jira-connector-in-glean "Direct link to 4. Configure the Jira Connector in Glean")

1.  Go to the **Connectors** tab in the Glean Admin Console.
2.  Search for **Jira Server** and open the **Setup Page**.
3.  Configure the connector by providing the required details.  
    Ensure the **email** configured in the Glean plugin matches the **username/password** configured here. Both must belong to the same user.

### Caveats[​](#caveats "Direct link to Caveats")

-   The service account should still have Browse Issues permission to all the projects to be able to crawl all issues.
-   The service account should still have Browse users and groups [global](https://support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/) permission to be able to run the crawler.
