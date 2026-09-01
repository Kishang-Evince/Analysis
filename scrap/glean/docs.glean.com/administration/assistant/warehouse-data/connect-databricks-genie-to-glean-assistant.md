---
url: "https://docs.glean.com/administration/assistant/warehouse-data/connect-databricks-genie-to-glean-assistant"
canonical: "https://docs.glean.com/administration/assistant/warehouse-data/connect-databricks-genie-to-glean-assistant"
title: "Connect Databricks Genie to Glean Assistant"
description: "Set up the Databricks connector and tools so Glean Assistant can route natural-language questions to your Databricks Genie spaces."
fetched_at: "2026-09-01T13:29:00.475Z"
---
On this page

Glean Assistant can query Databricks data using natural language through Databricks Genie spaces. When a user asks a data question in Assistant, Glean identifies the best-matching Genie space from indexed metadata and routes the question to Databricks Genie for execution. Databricks SQL is available as an explicit fallback when no Genie space matches.

## How it works[​](#how-it-works "Direct link to How it works")

Unlike direct SQL integrations, the Databricks experience in Assistant is **Genie-first**. Glean's Databricks connector crawls and indexes your Genie spaces, including titles, descriptions, sample questions, and table metadata. When a user asks a question, Assistant uses this indexed metadata to select the most relevant Genie space and sends the natural-language question directly to Databricks Genie.

Databricks SQL is not the primary query path. Assistant uses SQL only when a user explicitly requests it or when no suitable Genie space can be found.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you begin, ensure you have the following:

-   Administrative privileges in both Glean and Databricks.
-   The [Databricks connector](/connectors/native/databricks) configured and actively indexing Genie spaces. This is required so that Assistant can discover and route to the correct Genie space.
-   The Databricks Genie spaces you want to expose are properly configured in Databricks with descriptive titles, descriptions, and sample questions.

## Set up Databricks Genie in Assistant[​](#set-up-databricks-genie-in-assistant "Direct link to Set up Databricks Genie in Assistant")

The setup has two main parts: configuring the Databricks tools (if not already done) and enabling them in Assistant.

### Step 1: Set up the Databricks tools[​](#step-1-set-up-the-databricks-tools "Direct link to Step 1: Set up the Databricks tools")

If you haven't already configured the Databricks tools, follow the instructions in [Databricks tools setup](/administration/tools/setup-tools/databricks-tools-setup). This includes two tools:

-   **Search Databricks with Genie** — routes natural-language questions to a Genie space.
-   **Search Databricks with SQL** — runs direct SQL queries against a Databricks warehouse.

The tools setup involves creating an OAuth app in Databricks and registering the credentials in Glean.

### Step 2: Verify Databricks connector indexing[​](#step-2-verify-databricks-connector-indexing "Direct link to Step 2: Verify Databricks connector indexing")

Ensure that your Databricks connector is indexing Genie spaces. Assistant relies on the indexed Genie space metadata to identify which Genie space can best answer a user's question.

1.  Navigate to **Admin console → Connectors**.
2.  Locate the Databricks connector and verify it shows a healthy status.
3.  Confirm that Genie spaces appear in Glean search results.

note

If your Genie spaces don't appear in search, verify that the connector has completed at least one full crawl and that the Genie spaces have proper permissions configured in Databricks.

### Step 3: Enable Databricks in Glean Assistant[​](#step-3-enable-databricks-in-glean-assistant "Direct link to Step 3: Enable Databricks in Glean Assistant")

After the tools and connector are configured, enable tools for Assistant:

1.  Navigate to **Admin console → Platform → Tools**.
2.  Search for the Databricks tools.
3.  Under **Configuration**, go to the **Enable tools** section.
4.  Click **Edit settings**.
5.  Click **Chat** and define visibility settings to choose who can use Databricks in Glean Assistant and agents.

### Step 4: Test the integration[​](#step-4-test-the-integration "Direct link to Step 4: Test the integration")

Verify the setup by asking Glean Assistant questions about your data.

Example prompts:

-   Natural language: "What was our revenue by region last quarter?"
-   Direct SQL: "Run this SQL against Databricks: `SELECT region, SUM(revenue) FROM sales GROUP BY region;`"

For a natural-language question, Assistant should indicate that it used Databricks Genie and show which Genie space it selected.

## How Genie space routing works[​](#how-genie-space-routing-works "Direct link to How Genie space routing works")

When a user asks a data question, Assistant performs the following steps:

1.  **Determines relevance** — decides whether Databricks is the right connector for the question.
2.  **Selects a Genie space** — searches the indexed Genie space metadata (titles, descriptions, sample questions, and table information) to find the best match.
3.  **Sends the question** — forwards the natural-language question to the selected Genie space via the Databricks Genie API.
4.  **Returns results** — displays the Genie response, including any generated tables, directly in Assistant.

If no Genie space matches, Assistant falls back to Databricks SQL only when the user explicitly requests a SQL query.

## Permissions and access control[​](#permissions-and-access-control "Direct link to Permissions and access control")

Data access in Assistant follows your existing Databricks permissions:

-   Users authenticate with their own Databricks credentials via OAuth.
-   Query results respect the permissions configured on Genie spaces and underlying tables in Databricks.
-   The Databricks connector enforces permission-aware access to indexed Genie space metadata, so users only see Genie spaces they have access to.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Genie spaces don't appear in Assistant routing

Verify that the Databricks connector is configured and has completed a full crawl. Genie spaces must be indexed before Assistant can route questions to them. Check **Admin console → Connectors** for the connector status.

### Queries return permission errors

Ensure the user has authenticated with Databricks via OAuth and has the necessary permissions on the Genie space and its underlying tables.

### Assistant uses SQL instead of Genie

Assistant routes to Genie only when it finds a matching indexed Genie space. Improve routing accuracy by adding descriptive titles, sample questions, and table metadata to your Genie spaces in Databricks, then wait for the connector to re-crawl.

### Feature not visible to users

Confirm that the Databricks tools are enabled for **Chat** in the tools settings, and that the target users are included in the visibility configuration.

## See also[​](#see-also "Direct link to See also")

-   [Databricks data in Assistant](/user-guide/assistant/query-databricks-data-in-glean-assistant)
-   [Databricks tools setup](/administration/tools/setup-tools/databricks-tools-setup)
-   [Databricks tools](/tools/connector/databricks-tools)
-   [Databricks connector](/connectors/native/databricks)
