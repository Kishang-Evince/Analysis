---
url: "https://docs.glean.com/administration/assistant/warehouse-data/connect-bigquery-to-glean-assistant"
canonical: "https://docs.glean.com/administration/assistant/warehouse-data/connect-bigquery-to-glean-assistant"
title: "Connect BigQuery to Glean"
description: "Set up Google Cloud OAuth and Google Cloud Identity and Access Management (IAM) roles so Glean can query your BigQuery data through the BigQuery MCP server."
fetched_at: "2026-09-01T13:29:00.425Z"
---
On this page

Glean can query and analyze your BigQuery data on demand through the Google BigQuery MCP server. When a user asks a data question in Glean, Glean routes the query to BigQuery and returns results directly in the conversation.

This integration gives users governed access to the BigQuery project you connect in Glean. Within that project scope, queries run with each user's Google Cloud permissions, so users see only the datasets and tables they can access.

After you enable BigQuery in Glean, users can:

-   Query BigQuery data with natural language
-   Run read-only SQL queries directly in Glean
-   View results as tables in the conversation
-   Review citations that show which BigQuery resource the response used

## How it works[​](#how-it-works "Direct link to How it works")

Glean connects to BigQuery through Google's official BigQuery MCP server. You configure the connection with a Google Cloud project ID, and each user authenticates with their own Google account via OAuth. Queries run under each user's individual permissions, so data access in Glean follows your existing BigQuery access controls with no additional permission mapping required.

Glean does not maintain a separate dataset allowlist for this integration. BigQuery controls access within the connected project based on each user's permissions.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you begin, make sure you have:

-   Administrative privileges in both Glean and Google Cloud
-   A Google Cloud project with BigQuery data that you want to make available in Glean
-   Google accounts for end users with the required Google Cloud Identity and Access Management (IAM) roles on the project (see [Grant required access](#grant-required-access))

## Set up BigQuery in Glean[​](#set-up-bigquery-in-glean "Direct link to Set up BigQuery in Glean")

The setup has two main parts: configuring your Google Cloud project and connecting BigQuery in the Glean **Admin console**.

### Enable the BigQuery MCP server[​](#enable-the-bigquery-mcp-server "Direct link to Enable the BigQuery MCP server")

Enable the BigQuery MCP server in your Google Cloud project by running the following command:

gcloud CLI

```
gcloud services mcp enable bigquery.googleapis.com --project=PROJECT_ID
```

Replace `PROJECT_ID` with the Google Cloud project ID you want to connect, for example `my-company-analytics`.

If the BigQuery API is not already enabled, enable it from the [Google Cloud console](https://console.cloud.google.com/flows/enableapi?apiid=bigquery).

note

The user running this command needs the `roles/serviceusage.serviceUsageAdmin` role on the project

### Grant required access[​](#grant-required-access "Direct link to Grant required access")

End users who query BigQuery through Glean need the following Google Cloud Identity and Access Management (IAM) access:

| Access | Purpose |
| --- | --- |
| `roles/mcp.toolUser` | Make MCP tool calls on the connected project |
| `roles/bigquery.jobUser` | Run BigQuery jobs on the connected project |
| BigQuery read access | Read the datasets or tables they can query |

Grant project-level roles from the [IAM page](https://console.cloud.google.com/iam-admin/iam) or with the gcloud CLI:

gcloud CLI

```
gcloud projects add-iam-policy-binding PROJECT_ID \  --member="user:USER_EMAIL" \  --role="roles/mcp.toolUser"gcloud projects add-iam-policy-binding PROJECT_ID \  --member="user:USER_EMAIL" \  --role="roles/bigquery.jobUser"
```

Then grant BigQuery read access in Google Cloud to the datasets or tables each user should be able to query, typically with `roles/bigquery.dataViewer`.

Replace `PROJECT_ID` with your Google Cloud project ID and `USER_EMAIL` with the user's email address.

note

Glean does not provide a separate dataset-level allowlist for BigQuery. To narrow access, scope the Glean connection to the appropriate project ID and use BigQuery IAM to control which datasets and tables each user can read

### Create or select an OAuth client[​](#create-or-select-an-oauth-client "Direct link to Create or select an OAuth client")

1.  In the [Google Cloud console](https://console.cloud.google.com/), go to **APIs & Services → Credentials**
2.  Create a new **OAuth client ID** for a **Web application**, or select an existing web application client that you want to use with Glean
3.  Add the callback address shown on the BigQuery setup page in Glean as an **Authorized redirect URI**
4.  Copy the **Client ID** and **Client Secret** for the next step

### Connect BigQuery in Glean[​](#connect-bigquery-in-glean "Direct link to Connect BigQuery in Glean")

1.  In the Glean **Admin console**, go to **Platform → Connectors**
2.  Click **Add connector**, then select **BigQuery**
3.  Enter a display name, the Google Cloud project ID, the OAuth Client ID, and the OAuth Client Secret
4.  Click **Save and Authorize**, then complete the Google OAuth flow
5.  Click **Assistant** and define visibility settings to choose who can use BigQuery in Glean Assistant and agents

After you finish setup, the BigQuery connection is available in Glean wherever you enable it through visibility settings.

note

Only one BigQuery connection can be active per workspace. To reconnect with a different project or OAuth client, delete the existing connection first

### Test the integration[​](#test-the-integration "Direct link to Test the integration")

Verify the setup by asking Glean questions about your data.

Example prompts:

-   Natural language: "Show revenue by region for last quarter"
-   Direct SQL: "Run this SQL in BigQuery: `SELECT region, SUM(revenue) FROM sales.summary GROUP BY region;`"

## Customize the BigQuery skill[​](#customize-the-bigquery-skill "Direct link to Customize the BigQuery skill")

Glean uses a built-in skill called `query-bigquery` to control how it generates queries, formats results, and interprets user questions.

You can customize this skill to match your organization's needs. For example, you can tell it to prefer specific tables, follow naming conventions, or summarize results in a specific format.

To customize the skill:

1.  Go to **Settings → Skills** and find the `query-bigquery` skill
2.  Clone the skill to create an editable copy
3.  Modify the instructions as needed
4.  Upload the modified skill with the same title (`query-bigquery`) to replace the default version

For more details on creating and managing skills, see [Skills](/user-guide/assistant/skills).

## Permissions and access control[​](#permissions-and-access-control "Direct link to Permissions and access control")

Data access in Glean follows your existing Google Cloud permissions:

-   Users authenticate with their own Google accounts via OAuth
-   Query results respect the roles and BigQuery permissions configured in Google Cloud
-   Users can only query data in the connected project that their Google account can access
-   BigQuery controls access to individual datasets and tables, and Glean does not maintain a separate allowlist

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### BigQuery MCP server fails to enable

Confirm that the user running the `gcloud` command has the `roles/serviceusage.serviceUsageAdmin` role on the project and is using a current version of the Google Cloud CLI

### Permission denied errors

Confirm that the user has `roles/mcp.toolUser` and `roles/bigquery.jobUser` on the connected Google Cloud project, plus BigQuery read access to the datasets or tables they are trying to query

### OAuth authorization fails

Confirm that the OAuth client in Google Cloud includes the exact redirect address shown on the Glean BigQuery setup page

## See also[​](#see-also "Direct link to See also")

-   [BigQuery data in Glean](/user-guide/assistant/query-bigquery-data-in-glean-assistant)
-   [Skills](/user-guide/assistant/skills)
