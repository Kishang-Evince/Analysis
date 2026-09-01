---
url: "https://docs.glean.com/connectors/native/powerbi/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/powerbi/troubleshooting"
title: "Power BI troubleshooting"
description: "Troubleshoot Power BI setup, indexing, permissions, routing, freshness, and live queries in Glean."
fetched_at: "2026-09-01T13:29:38.845Z"
---
On this page

Use this page to troubleshoot the Power BI connector and live Assistant integration.

## Setup and authentication[​](#setup-and-authentication "Direct link to Setup and authentication")

### Connector validation fails[​](#connector-validation-fails "Direct link to Connector validation fails")

**Symptoms:**

-   Validation returns an error instead of completing the connector setup.
-   The connector cannot start its first crawl.

| Cause | Fix |
| --- | --- |
| **Credential mismatch:** The connector app’s client ID and client secret come from different Microsoft Entra app registrations. | In Microsoft Entra ID, confirm that both values belong to the same connector service principal app. Enter those values in **Set up indexing**. |
| **Missing service principal access:** The connector service principal app is not in the security group used for the Power BI service-principal tenant settings. | Add the connector service principal app to that security group. In the Power BI admin portal, confirm that you applied the group to **Service principals can call Fabric public APIs** and **Service principals can access read-only admin APIs**. |
| **Expired client secret:** The connector app’s client secret has expired. | Create a new client secret in Microsoft Entra ID and update the connector configuration in **Set up indexing**. |

If the read-only admin API check fails, Glean cannot perform tenant-wide discovery or permission crawling.

### Rich report or semantic-model definitions are missing[​](#rich-report-or-semantic-model-definitions-are-missing "Direct link to Rich report or semantic-model definitions are missing")

**Symptoms:**

-   Glean finds a workspace or report but does not show rich report or semantic-model definitions.
-   Basic catalog metadata may still appear in Search.

| Cause | Fix |
| --- | --- |
| **Missing workspace access:** The connector service principal or its security group does not have **Contributor** access to the workspace. | In Power BI, open **Manage access** for the workspace, add the connector service principal or its security group, and assign the **Contributor** role. Repeat for every workspace that Glean should index. |
| **Crawl has not completed:** Glean has not finished a crawl and indexing pipeline after you changed workspace access. | Run or wait for a successful crawl, then check the workspace again. |

### The Power BI tools setup does not initialize[​](#the-power-bi-tools-setup-does-not-initialize "Direct link to The Power BI tools setup does not initialize")

**Symptoms:**

-   The **Connect tools** step does not open the Microsoft authorization flow.
-   The setup remains on the same step after you enter the delegated app credentials.
-   The **Connect tools** step does not display a Redirect URI.
-   Microsoft Entra ID requires a redirect URI before you can finish the delegated app setup.

| Cause | Fix |
| --- | --- |
| **Delegated app configuration is incomplete:** The app does not include the required delegated permissions or its **Redirect URI** does not match the value shown in Glean. | Add the required permissions to the app registration and make the Web redirect URI match the current value shown in Glean. |
| **Tools setup has not initialized:** The setup page has not completed the indexing step or loaded the tools configuration. | Complete **Set up indexing**, refresh the setup page, and reopen **Connect tools**. |
| **Setup UI issue:** The field remains blank after you complete the indexing step. | Do not enter a guessed value. Contact your Glean administrator or Glean Support. |

If the issue persists after you complete the indexing setup, contact your Glean administrator or Glean Support.

## Search and indexing[​](#search-and-indexing "Direct link to Search and indexing")

### Users cannot find expected Power BI content[​](#users-cannot-find-expected-power-bi-content "Direct link to Users cannot find expected Power BI content")

**Symptoms:**

-   A supported workspace, report, semantic model, or dashboard does not appear in Search.
-   Other Power BI content from the same tenant appears as expected.

| Cause | Fix |
| --- | --- |
| **Unsupported content:** The missing item is not a supported workspace, report, semantic model, or dashboard. | Confirm that the item belongs to a supported Power BI Service or Microsoft Fabric workspace. |
| **Missing workspace access:** The connector service principal cannot access the workspace. | Grant the connector service principal or its security group the **Contributor** role in the workspace. |
| **Identity mapping issue:** The linked Microsoft 365 identity integration cannot resolve the relevant user or group. | Confirm that the user’s Microsoft 365 identity and group membership appear in the linked identity integration. |
| **Indexing delay:** A successful crawl and indexing pipeline has not completed after the content or permission change. | Wait for the next successful crawl or run a content crawl, then search again. |

Glean does not index Power BI table rows. Search finds indexed metadata and definitions, such as report pages, visual metadata, tables, columns, measures, and relationships where available.

### Recent Power BI changes are not showing in Glean[​](#recent-power-bi-changes-are-not-showing-in-glean "Direct link to Recent Power BI changes are not showing in Glean")

**Symptoms:**

-   A recently created or updated Power BI item does not appear in Glean.
-   A permission change does not affect indexed visibility yet.

| Cause | Fix |
| --- | --- |
| **Crawl delay:** The connector relies on periodic full crawls instead of incremental crawls based on Power BI timestamps. | Wait for a successful crawl and indexing pipeline to complete. |
| **Live and indexed data differ:** A live Assistant query uses current Power BI data, while Search uses the connector’s indexed metadata and definitions. | Use Assistant for current table values. Check the connector crawl status when you need updated Search results. |

### A pasted Power BI link does not route to the expected asset[​](#a-pasted-power-bi-link-does-not-route-to-the-expected-asset "Direct link to A pasted Power BI link does not route to the expected asset")

**Symptoms:**

-   Assistant does not identify the workspace, report, semantic model, or dashboard from a pasted link.
-   Assistant asks for more context before it can answer the question.

| Cause | Fix |
| --- | --- |
| **Unsupported link:** The link does not identify a supported Power BI asset. | Search for the Power BI asset in Glean, open the matching result, and ask the question from that context. |
| **Insufficient context:** The question does not include the report, dashboard, workspace, or semantic-model name. | Include the asset name in the question and specify the metric, time, and filters you need. |

## Assistant and live queries[​](#assistant-and-live-queries "Direct link to Assistant and live queries")

The **Semantic Model Execute Queries REST API** setting enables Data Analysis Expressions (DAX) queries through the Power BI Representational State Transfer (REST) API. DAX is the query language used for live semantic-model queries.

### Assistant cannot run a live query[​](#assistant-cannot-run-a-live-query "Direct link to Assistant cannot run a live query")

**Symptoms:**

-   Assistant finds the Power BI asset but cannot return current data.
-   A live query fails after the user asks a question about a semantic model.

| Cause | Fix |
| --- | --- |
| **Delegated authorization is incomplete:** The user has not authorized the delegated Power BI OAuth app, or the app credentials are incorrect. | Complete **Connect tools** and authorize the delegated OAuth app with the user’s Microsoft identity. |
| **Required tenant setting is off:** The Power BI tenant does not enable one or both of **Users can use the Power BI Model Context Protocol server endpoint (preview)** and **Semantic Model Execute Queries REST API**. | In the Power BI admin portal, enable both settings for the organization or the security groups that should use Power BI tools. |
| **Missing semantic-model access:** The user does not have **Build** permission on the target semantic model. | Grant the user **Build** permission on the semantic model. |
| **Unsupported workspace:** The semantic model is in **My Workspace**. | Move or publish the semantic model to a standard Power BI workspace. |
| **Missing model relationship:** The report or dashboard does not link to the semantic model that Assistant selected. | Confirm that the report or dashboard uses the expected semantic model, then include that asset’s name in the question. |

The connector service principal’s workspace access does not replace the end user’s delegated Power BI authorization.

### Generate Query is unavailable[​](#generate-query-is-unavailable "Direct link to Generate Query is unavailable")

**Symptoms:**

-   Assistant cannot use the **Generate Query** tool.
-   Assistant can still retrieve schema or execute DAX when the required permissions are available.

| Cause | Fix |
| --- | --- |
| **Missing Copilot license or capacity:** Power BI **Generate Query** requires the applicable Copilot license or capacity. | Provide the required Copilot access, or use schema-based DAX generation with **Execute Query** instead. |
| **Tool is not enabled:** The MCP client configuration does not enable **Generate Query**. | Enable the tool if your organization wants to use Power BI Copilot for query generation. |

### Two users receive different answers[​](#two-users-receive-different-answers "Direct link to Two users receive different answers")

**Symptoms:**

-   Two users ask the same question but receive different results.
-   One user can query a semantic model while another user cannot.

| Cause | Fix |
| --- | --- |
| **Different Power BI access:** Live queries run with each user’s delegated Power BI identity. | Confirm that both users have the expected workspace, report, and semantic-model permissions. |
| **Row-level security:** Power BI applies row-level security to the user at query time. | Review the semantic model’s row-level security roles and the affected user’s Power BI membership. |

Users may receive different answers when they have different Power BI access or row-level security results.

### The answer does not match a dashboard tile[​](#the-answer-does-not-match-a-dashboard-tile "Direct link to The answer does not match a dashboard tile")

**Symptoms:**

-   Assistant returns a value that differs from a dashboard or report tile.
-   The answer changes when you change the metric, time, or grouping.

| Cause | Fix |
| --- | --- |
| **Different query context:** A tile may represent a predefined slice of data, while Assistant runs a live query for the question you asked. | Check the selected semantic model and include the intended metric, time, grouping, and filters in the question. |
| **Different permissions:** Power BI applies the requesting user’s access and row-level security to the live query. | Confirm that the user has the expected Power BI permissions and row-level security membership. |
