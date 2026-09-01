---
url: "https://docs.glean.com/tools/connector/googlecloud"
canonical: "https://docs.glean.com/tools/connector/googlecloud"
title: "Google Cloud Tools"
description: "Query BigQuery, Looker, and Looker Studio data using tools."
fetched_at: "2026-09-01T13:30:02.391Z"
---
On this page

The Google Cloud tools let users query live data from Google BigQuery, Looker, and Looker Studio, or query pre-configured Gemini Data Agents:

-   **Search BigQuery with SQL**: BigQuery read-only, user OAuth, SQL text input.
-   **Gemini BigQuery Analytics with Context**: Natural-language analytics for BigQuery data, user OAuth (`cloud-platform` scope), background execution supported by default.
-   **Gemini Looker Analytics with Context**: Live, natural-language analytics for Looker Explores, using user OAuth. Provide the LookML model ID and Explore ID as context; this tool does not retrieve dashboard data from a dashboard name alone.
-   **Gemini Looker Studio Analytics with Context**: Natural-language analytics for Looker Studio connectors, using user OAuth.
-   **Gemini Analytics with Data Agent**: Natural-language analytics through pre-configured conversational data agents.

The Google Cloud tools are available in Glean Agents and Glean MCP Server. They aren't available in Glean Assistant (Chat).

note

BigQuery queries use user-level OAuth, so each user queries with their own Google Cloud permissions. If not everyone in your organization has BigQuery access, you can instead let agents query BigQuery through a [service credential](/administration/agent-identity/gcp-bigquery), which uses an admin-scoped service account rather than each user's credentials.

## Key features[​](#key-features "Direct link to Key features")

-   **Real-time warehouse access**: No extra indexing or data duplication required.
-   **Permission-aware search**: User-level OAuth ensures results match the caller’s existing BigQuery permissions.
-   **Read-only guarantees**: All write and DDL statements are [blocked](https://stackoverflow.com/a/25977261/30830908) by the `bigquery.readonly` OAuth scope.
-   **Unified intelligence**: Glean Agents combine BigQuery results with unstructured documents to generate contextual, unified answers.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

This tools requires the following Google APIs to be enabled:

-   In order to use the *Search BigQuery with SQL* or *Gemini BigQuery Analytics with Context* tools, the BigQuery API must be enabled in your Billing GCP Project from [Google APIs](https://console.cloud.google.com/flows/enableapi?apiid=bigquery.googleapis.com). Users who are using the tool must have the [BigQuery User](https://cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.user) role.
-   In order to use the Gemini tools, the [Data Analytics API with Gemini](https://console.cloud.google.com/flows/enableapi?apiid=geminidataanalytics.googleapis.com), the [Gemini for Google Cloud API](https://console.cloud.google.com/flows/enableapi?apiid=cloudaicompanion.googleapis.com) and the [BigQuery API](https://console.cloud.google.com/flows/enableapi?apiid=bigquery.googleapis.com) must be enabled for your GCP project. Users must have the [Gemini for Google Cloud](https://cloud.google.com/iam/docs/roles-permissions/cloudaicompanion#cloudaicompanion.user) role, the [BigQuery User](https://cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.user) role and the [Gemini Data Analytics Stateless Chat User](https://cloud.google.com/gemini/docs/conversational-analytics-api/access-control#data-analytics-stateless-user) role.

## Setup Google Cloud tools[​](#setup-google-cloud-tools "Direct link to Setup Google Cloud tools")

This tools needs the GCP Project ID that you want to bill your queries on. BigQuery determines the location to run the job based on the datasets referenced in the request.

1.  Open the Glean **Admin Console** → **Platform** → Tools.
2.  Click **Add** and select **Google Cloud Tools**.
3.  Enter the **GCP Project ID** in the *Configuration* section.
4.  In **Publish Settings**, choose the tools that you want to enable in Agents.
5.  Click **Save**.

### Authentication options[​](#authentication-options "Direct link to Authentication options")

Choose between using Glean's managed app or your own custom OAuth app:

#### Central App (Managed by Glean)[​](#central-app-managed-by-glean "Direct link to Central App (Managed by Glean)")

1.  In the authentication section, select OAuth User.
2.  Click **Save**. Glean uses a managed app/client ID; no additional setup is needed.

note

Glean's OAuth App is currently under review and should be verified soon. Until then admins have to [authorize the unverified app](https://knowledge.workspace.google.com/admin/apps/authorize-unverified-third-party-apps). Otherwise users will see a message that the app is unverified when authenticating with this option.

#### Custom App[​](#custom-app "Direct link to Custom App")

note

You will need sufficient permissions in Google Cloud Console to create OAuth credentials.

1.  Navigate to the [Google Cloud Console](https://console.cloud.google.com/) and go to **APIs & Services → Library**. Enable the **BigQuery API**, **Data Analytics API with Gemini**, and **Gemini for Google Cloud API**.
2.  Go to **APIs & Services → OAuth consent screen**, choose **Internal** or **External** as appropriate for your organization, complete any required fields, and click **Save** to publish the consent screen.
3.  Go to **APIs & Services → Credentials**, click **Create credentials → OAuth client ID**, select **Web application** as the application type, and give the client a descriptive name (for example, *Glean Google Cloud Tools OAuth Client*).
4.  Copy the **Callback URL** from the Google Cloud Tools setup page in the Glean Admin Console and add it to **Authorized redirect URIs** in your OAuth client.
5.  Copy the **Client ID** and **Client Secret** back into the Google Cloud Tools setup page in Glean and click **Save**.

### Additional setup for Gemini Looker Analytics with Context tool[​](#additional-setup-for-gemini-looker-analytics-with-context-tool "Direct link to Additional setup for Gemini Looker Analytics with Context tool")

You need to add the Looker Instance Qualifier and the Looker Client ID in the Looker Configuration section for the Tools.

The Looker Instance field takes the qualifier for your instance (the part before looker.com). For example, if your instance has a URI like `sampleinstance.cloud.looker.com`, provide `sampleinstance.cloud` in the field.

The Looker Client ID is the ID of the API Client that you have set up for Glean to access your instance.

To set up a Client for Glean:

1.  Install the [API Explorer](https://cloud.google.com/looker/docs/api-explorer#installing_the_api_explorer) in Looker.
2.  Register an [OAuth Client Application](https://cloud.google.com/looker/docs/api-cors#registering_an_oauth_client_application) with the API Explorer. The following parameters must be set:
    -   **client\_guid:** A globally unique ID for the application. For example, *company\_name*\-app-for-glean.
    -   **redirect\_uri:** Copy the redirect uri from the Tools configuration page.
    -   **display\_name:** The name of the application that is displayed to users of the application.
    -   **description:** A description of the application that is displayed to users on a disclosure and confirmation page when a user first logs in from the application.
    -   **enabled:** true
3.  Provide the client\_guid in the Client ID field in Glean.

### Additional setup for Gemini Analytics with Data Agent tool[​](#additional-setup-for-gemini-analytics-with-data-agent-tool "Direct link to Additional setup for Gemini Analytics with Data Agent tool")

Data Agents need to be set up with appropriate context and system instructions using the [Conversational Analytics API](https://cloud.google.com/gemini/docs/conversational-analytics-api/reference/rest/v1alpha/projects.locations.dataAgents).

Any user who wants to create a data agent must have the Gemini Data Analytics Data Agent Creator role.

## Usage instructions[​](#usage-instructions "Direct link to Usage instructions")

### Set Up in Agent Builder[​](#set-up-in-agent-builder "Direct link to Set Up in Agent Builder")

1.  Add a step and navigate to **Select Step → All tools → By connector → Google Cloud**.
2.  Select one of these tools:
    -   To execute direct SQL to BigQuery:
        -   Select **Search BigQuery with SQL**
        -   Enter the SQL that you wish to execute. Example: `select * from acmecorp.customers.dim_all_customers`
    -   To issue queries in natural language to BigQuery:
        -   Select **Gemini BigQuery Analytics with Context**
        -   Provide the fully-qualified table names to be used as context in a comma-separated list. Example: `acmecorp.orders.daily_sales,acmecorp.customers.dim_all_customers`
        -   Enter a natural language instruction. Example: `Which customer has the highest daily sales?`
    -   To issue queries in natural language to Looker:
        -   Select **Gemini Looker Analytics with Context**
        -   Provide the fully-qualified Looker Explores to be used as context. These can be obtained from the URL as you open an Explore. For example, if the URL is `https://acmecorp.cloud.looker.com/explore/LookML1/Explore1` then the Looker ML model is `LookML1.Explore1`
        -   Enter a natural language instruction. Example: `Use the connectors to answer this query: [[query]]`
    -   To issue queries in natural language to Looker Studio:
        -   Select **Gemini Looker Studio Analytics with Context**
        -   Provide the connector IDs to be used as context in a comma-separated list. For example, if the URL for a connector is `https://lookerstudio.google.com/connectors/c6b5b53c-c261-4a64-b136-0b96b5d9daab`, then the connector ID is: `c6b5b53c-c261-4a64-b136-0b96b5d9daab`
        -   Enter a natural language instruction. Example: `Analyze the following query with the connectors provided: [[query]]`
    -   To issue queries in natural language to a Data Agent:
        -   Select **Gemini Analytics with Data Agent**
        -   Provide the ID of the Data Agent. This is the last segment in the Data Agent name. For example, for `projects/acmecorp/locations/global/dataAgents/data-agent-1`, the ID is `data-agent-1`
        -   Enter a natural language instruction. Example: `Answer this query: [[query]]`

## Best practices and troubleshooting[​](#best-practices-and-troubleshooting "Direct link to Best practices and troubleshooting")

-   Always supply a valid Project ID; otherwise calls will fail with a 404 error.
-   If your queries time out, you can reach out to your Glean account team to raise it. We recommend keeping queries under 120 secs to avoid BigQuery cost spikes.
-   If a natural‑language question is ambiguous, include short hints like datasets, measures or filters to improve quality and reduce retries.
-   Specify the least-possible-sized ID list when using Gemini Analytics with inline context to ensure maximum quality.
-   Gemini Analytics currently require the broad cloud-platform scope.

## Known limitations[​](#known-limitations "Direct link to Known limitations")

-   Only SELECT statements are supported. Write statements (INSERT/UPDATE/DDL) will return "read-only scope" errors.
-   SQL results longer than 10 rows are truncated in the current UI. We advise adding a LIMIT or filter.
-   Multi-turn conversations are not preserved; each tool run is stateless.

### Gemini Conversational Analytics API (Public Preview)[​](#gemini-conversational-analytics-api-public-preview "Direct link to Gemini Conversational Analytics API (Public Preview)")

The following Gemini-powered tools utilize Google’s Conversational Analytics API, which is currently in Public preview:

-   Gemini BigQuery Analytics with Context
-   Gemini Looker Analytics with Context
-   Gemini Looker Studio Analytics with Context
-   Gemini Analytics with Data Agent

**Service stability** As a preview service, the API may exhibit inconsistent performance or unexpected behavior.

**Rate limits:** The Conversational Analytics API enforces the following usage thresholds:

| Metric | Limit |
| --- | --- |
| Queries Per Second (QPS) | 10 per user per project |
| Queries Per Minute (QPM) | 600 per user per project |

**Error handling:** Exceeding these limits triggers an HTTP 429 (RESOURCE\_EXHAUSTED) error. While Glean automatically retries these requests, sustained high usage that exceeds retry capacity may result in failed tools.

For more information, refer to the [Gemini for Google Cloud - Conversational Analytics API known limitations](https://docs.cloud.google.com/gemini/data-agents/conversational-analytics-api/known-limitations).

## See also[​](#see-also "Direct link to See also")

-   [BigQuery](https://docs.glean.com/connectors/native/bigquery)
