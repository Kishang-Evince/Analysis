---
url: "https://docs.glean.com/connectors/native/bigquery/"
canonical: "https://docs.glean.com/connectors/native/bigquery/"
title: "BigQuery"
description: "Connect BigQuery to Glean so Glean Assistant can query and analyze your BigQuery datasets on demand."
fetched_at: "2026-09-01T13:29:22.985Z"
---
On this page

BigQuery is Google Cloud's serverless data warehouse. The Glean BigQuery connector lets Glean Assistant query and analyze your BigQuery datasets on demand, so users can ask analytical questions in natural language and get answers computed against your warehouse at request time.

info

BigQuery is a tools-only connector. Glean does not crawl or index BigQuery tables, and BigQuery rows do not appear in Glean search results. Every request runs as a live query against BigQuery.

## How it works[​](#how-it-works "Direct link to How it works")

Glean connects to Google's BigQuery service at `https://bigquery.googleapis.com/mcp` over HTTP, using Glean-managed central OAuth. Admins do not need to create an OAuth client or provide a client ID, client secret, or callback URL.

Because authentication is per user, results always reflect the requesting user's own Google Cloud access. A user can only access the projects, datasets, and tables that their Google account and IAM roles allow. Glean does not build a separate permission index for BigQuery, and the connector does not accept service account keys or API keys.

## Supported tools[​](#supported-tools "Direct link to Supported tools")

After you connect, the setup page advances to the **Tools** step and lists the tools currently available for BigQuery:

| Tool | Purpose | Access |
| --- | --- | --- |
| `list_dataset_ids` | List the datasets in a project | Read-only |
| `list_table_ids` | List the tables in a dataset | Read-only |
| `get_dataset_info` | Inspect a dataset's metadata | Read-only |
| `get_table_info` | Inspect a table's schema | Read-only |
| `execute_sql_readonly` | Run read-only SQL, rejecting DML statements, DDL statements, and Python UDFs | Read-only |
| `execute_sql` | Run SQL, including statements that modify data | Read and write |

For per-tool behavior and the current tool list, see Google's [BigQuery documentation](https://cloud.google.com/bigquery/docs/use-bigquery-mcp).

note

`execute_sql` is the only tool that is not read-only. To keep Glean Assistant limited to reads, use a Google Cloud IAM deny policy to restrict the `execute_sql` tool by name or read/write attribute, or deny the relevant BigQuery write permissions.

Google may change the tools exposed through the BigQuery MCP server. Review the **Tools** step in the Admin Console to confirm the tools currently available.

## Requirements[​](#requirements "Direct link to Requirements")

### Google Cloud requirements[​](#google-cloud-requirements "Direct link to Google Cloud requirements")

-   A Google Cloud project. Enable the BigQuery API on each project where you want to use the BigQuery MCP server.
-   The BigQuery API is enabled by default for new projects. The administrator who enables it needs the Owner or Service Usage Admin role, which carries the `serviceusage.services.enable` permission.
-   The following roles, granted on the project to every end user who will query BigQuery through Glean:

| Role | Purpose |
| --- | --- |
| `roles/mcp.toolUser` | Make tool calls |
| `roles/bigquery.jobUser` | Run BigQuery jobs |
| `roles/bigquery.dataViewer` | Read BigQuery data |

These roles enable standard MCP access and read-only queries. DML or DDL operations may require additional BigQuery permissions on the target resources, such as `roles/bigquery.dataEditor` or equivalent granular permissions.

### Glean requirements[​](#glean-requirements "Direct link to Glean requirements")

-   Access to the Glean **Admin console**.

## Configuration and setup[​](#configuration-and-setup "Direct link to Configuration and setup")

Complete steps 1 and 2 in Google Cloud, then step 3 in the Glean **Admin console**.

### Step 1: Enable the BigQuery API[​](#step-1-enable-the-bigquery-api "Direct link to Step 1: Enable the BigQuery API")

Enable the [BigQuery API](https://console.cloud.google.com/flows/enableapi?apiid=bigquery) on the project you want to connect. The BigQuery remote MCP server is enabled automatically when you enable the BigQuery API. See Google's [Before you begin](https://cloud.google.com/bigquery/docs/use-bigquery-mcp#before-you-begin) for details.

### Step 2: Grant the required IAM roles[​](#step-2-grant-the-required-iam-roles "Direct link to Step 2: Grant the required IAM roles")

Grant `roles/mcp.toolUser`, `roles/bigquery.jobUser`, and `roles/bigquery.dataViewer` on the project to each user who will query BigQuery through Glean. You can do this from the [IAM page](https://console.cloud.google.com/iam-admin/iam) in the Google Cloud console, or from the command line:

```
gcloud projects add-iam-policy-binding PROJECT_ID \  --member="user:USER_EMAIL" --role="roles/mcp.toolUser"gcloud projects add-iam-policy-binding PROJECT_ID \  --member="user:USER_EMAIL" --role="roles/bigquery.jobUser"gcloud projects add-iam-policy-binding PROJECT_ID \  --member="user:USER_EMAIL" --role="roles/bigquery.dataViewer"
```

Replace `PROJECT_ID` with your project ID and `USER_EMAIL` with the user's email address.

### Step 3: Connect BigQuery in Glean[​](#step-3-connect-bigquery-in-glean "Direct link to Step 3: Connect BigQuery in Glean")

1.  In the Glean **Admin console**, go to **Connectors** → **Add connector** → **BigQuery**.
2.  Enter a **Display name**. This is what Glean Assistant calls the connection, for example `BigQuery`.
3.  Select **Save**, then **Authorize**. Glean opens Google's consent flow and requests the `https://www.googleapis.com/auth/bigquery` scope so that Glean Assistant can query datasets on your behalf.

After consent completes, the setup page advances to the **Tools** step and lists the BigQuery tools that Glean Assistant can use.

## Verify the connection[​](#verify-the-connection "Direct link to Verify the connection")

1.  As an end user with the three required IAM roles, open Glean Assistant.
2.  Ask a question that requires warehouse data, for example a count or an aggregation over a table you can read in BigQuery.
3.  Confirm that a BigQuery tool fires and that the answer reflects live data.
4.  Ask the same question as a user who does not have access to that dataset in BigQuery, and confirm that the query is rejected.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

-   **Per-user authentication:** Glean authenticates to BigQuery on each user's behalf. Every query runs under the requesting user's Google account, and BigQuery enforces that user's IAM roles and dataset access.
-   **No indexed copy:** BigQuery rows are not crawled or indexed into Glean Search. Query results may appear in the Assistant conversation and, when tool-trace externalization is enabled, tool descriptions, arguments, and results may be exported to a customer-configured OTLP endpoint.
-   **Authentication:** New connections use Glean-managed central OAuth. Service account keys and API keys are not supported.
-   **Restricting writes:** To keep Glean Assistant read-only, use a Google Cloud IAM deny policy to restrict the `execute_sql` tool by name or read/write attribute, or deny the relevant BigQuery write permissions.

## Limitations[​](#limitations "Direct link to Limitations")

-   BigQuery data is not indexed and does not appear in Glean search results.
-   Query results are limited to a maximum of 3,000 rows.
-   `execute_sql` and `execute_sql_readonly` limit query processing time to three minutes. Longer queries are canceled automatically.
-   Google Drive external tables cannot be queried through the SQL tools.
-   `execute_sql_readonly` rejects DML statements, DDL statements, and Python UDFs.

For current limits, see Google's [BigQuery documentation](https://cloud.google.com/bigquery/docs/use-bigquery-mcp).

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### A user gets a permission error when Glean Assistant queries BigQuery

Because access is per user, the error reflects that user's Google Cloud permissions rather than a connector misconfiguration. Confirm that the user has `roles/mcp.toolUser`, `roles/bigquery.jobUser`, and `roles/bigquery.dataViewer` on the project, and that their account can read the dataset the query targets.

### Results are truncated or a query is canceled

Google caps query results at 3,000 rows and query processing time at three minutes. Narrow the question, filter more aggressively, or pre-aggregate the data in a view so that the query returns fewer rows.

### A user needs to query a different Google Cloud project

A BigQuery connection is not pinned to a single Google Cloud project, so there is nothing to reconfigure in Glean. Access depends on the user's Google identity and IAM permissions for the relevant project. Grant the user `roles/mcp.toolUser`, `roles/bigquery.jobUser`, and `roles/bigquery.dataViewer` on the other project, confirm the BigQuery API is enabled there, and have the user name that project in their request. Custom OAuth is not supported for new BigQuery connections; they use Glean-managed central OAuth.

## See also[​](#see-also "Direct link to See also")

-   [Google Cloud tools](/tools/connector/googlecloud) — a separate integration, configured under **Admin console** → **Tools**, that includes SQL and analytics tools for BigQuery.
