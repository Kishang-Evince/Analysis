---
url: "https://docs.glean.com/connectors/native/asana/setup"
canonical: "https://docs.glean.com/connectors/native/asana/setup"
title: "Set up Asana with the previous setup flow"
description: "Configure Asana on a Glean deployment that still uses the previous combined connector setup flow."
fetched_at: "2026-10-13T08:49:45.330Z"
---
On this page

You're reading the **previous setup**![Connecting Asana for the first time? →](/connectors/native/asana/new-setup)

These instructions apply when the Asana setup page shows one combined form with the connector name, access token, and Asana domain. If your setup page shows **Connect**, **Set up indexing**, and **Review setup**, use [New setup](/connectors/native/asana/new-setup) instead.

The Previous setup flow configures the indexing connection. Configure Asana tools or MCP access separately after you save the connector, if your deployment offers them.

## Requirements[​](#requirements "Direct link to Requirements")

Before you begin:

-   Confirm that you have Glean administrator rights to add and configure connectors.
-   The user setting up the data source must be an Asana administrator.
-   For Asana Enterprise accounts, prepare a service account with **Full permissions** and its access token.
-   For other Asana account types, prepare a dedicated Asana administrator account and its personal access token.
-   Prepare the case-sensitive Asana workspace name that Glean uses as the Asana domain.

## Step 1: Generate an access token[​](#step-1-generate-an-access-token "Direct link to Step 1: Generate an access token")

**For Asana Enterprise accounts:**

1.  Create a new service account using the [Asana service account documentation](https://help.asana.com/s/article/service-accounts?language=en_US).
2.  Name it **Glean Service Account**, or a similar name.
3.  Select **Full permissions** when creating the service account so it can access all data.
4.  Copy the access token listed for the service account.

**For other Asana account types:**

1.  Create a dedicated Asana administrator account named **Glean**, or a similar name.
2.  Create a personal access token for the Glean administrator using the [Asana personal access token documentation](https://developers.asana.com/docs/personal-access-token).
3.  Copy the personal access token.

## Step 2: Determine the Asana domain[​](#step-2-determine-the-asana-domain "Direct link to Step 2: Determine the Asana domain")

1.  While signed in as the indexing administrator or service account, open the [Asana workspaces API](https://app.asana.com/api/1.0/workspaces?opt_pretty).
2.  Find the workspace that you want to index.
3.  Use the value in the response's `name` field as the **Asana domain**.

The Asana domain is case-sensitive. Enter the workspace name exactly as Asana returns it; do not enter the Asana URL.

## Step 3: Add the Asana connector in Glean[​](#step-3-add-the-asana-connector-in-glean "Direct link to Step 3: Add the Asana connector in Glean")

1.  In Glean, go to **Admin console** > **Platform** > **Connectors** and select **Add connector**.
2.  Choose **Asana** from the list of connectors.
3.  Enter the connector **Name**.
4.  Enter the **Access token**.
5.  Enter the **Asana domain** using the workspace name from the `name` field.
6.  Select **Save**.

Glean uses the access token to index Asana content. For private projects, add the indexing administrator or service account explicitly to the project.

## Step 4: Monitor and validate indexing[​](#step-4-monitor-and-validate-indexing "Direct link to Step 4: Monitor and validate indexing")

1.  Monitor the initial crawl from the Asana connector page.
2.  After the crawl completes, verify that supported Asana tasks, comments, and projects appear in Glean search.
3.  Confirm that search results follow the user's Asana access permissions.

## Configure tools separately[​](#configure-tools-separately "Direct link to Configure tools separately")

If your deployment exposes Asana tools or an Asana MCP server separately from the connector setup form, configure them from the available **Tools** experience after saving the connector. Tool availability and navigation can vary by deployment.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

-   **Authentication fails:** Confirm that the access token is valid and belongs to an Asana administrator or service account with the required access.
-   **Indexing fails:** Confirm that the Asana domain exactly matches the workspace `name` field, including capitalization.
-   **Private project content is missing:** Add the indexing administrator or service account to the private project.
-   **Tasks are missing:** Glean indexes tasks in a project, and also indexes tasks without a project when that crawling is enabled for your deployment. Crawling tasks without a project requires a premium Asana workspace.
-   **Updates are delayed:** Asana applies two webhook limits: 1,000 webhooks per resource and 10,000 active webhooks per token. Projects outside the registered webhook set may not receive real-time updates, and tasks without a project never receive webhook updates.

## See also[​](#see-also "Direct link to See also")

-   [Choose your Asana setup](/connectors/native/asana/choose-your-setup)
-   [New setup](/connectors/native/asana/new-setup)
-   [Asana overview](/connectors/native/asana/about)
