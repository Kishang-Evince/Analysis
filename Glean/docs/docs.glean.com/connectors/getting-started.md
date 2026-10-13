---
url: "https://docs.glean.com/connectors/getting-started"
canonical: "https://docs.glean.com/connectors/getting-started"
title: "Get started with connectors"
description: "Use this guide to understand the end-to-end setup process before moving to connector setup guides."
fetched_at: "2026-10-13T08:49:43.033Z"
---
On this page

Use this guide to understand the end-to-end setup process before moving to connector setup guides.

## The connector journey[​](#the-connector-journey "Direct link to The connector journey")

1

Find your source

Browse the [Connectors hub](/connectors/) and open the page for the source you want to connect. Each connector page lists the supported content or tool capabilities, prerequisites, and setup instructions specific to that source.

Examples: Slack, Microsoft Teams, SharePoint, Affinity, Box, NetSuite, and Google Drive.

2

Review prerequisites

Check the connector page for required admin roles, credentials, API scopes, and source-side configurations. Always review these requirements before starting setup.

3

Configure the connector

In the Glean **Admin console**, go to **Connectors** > **Add connector** and add the new connector. Provide the required credentials and settings, then save.

Catalog entries can provide data indexing, live tools, or both. See [Set up tools and MCP integrations from Connectors](/connectors/configure-tools-in-connector/config-tools-mcp-from-connector) to choose the correct entry.

note

Some connectors with data indexing include a **Manage data** tab to define inclusion or exclusion rules after the initial save. See [Excluding content](/connectors/excluding-content).

4

Complete data indexing, when available

If the connector supports data indexing, start the crawl immediately or schedule it for later. During the initial sync, the **Admin console** displays two phases:

-   **Crawling:** Glean fetches content, metadata, and permissions from the source system.
-   **Indexing:** Glean processes the data and incorporates it into the Knowledge Graph.

Sync duration varies based on data volume, source API rate limits, and how much content and permissions are retrieved. Use the **Items synced** metric in the **Admin console** to monitor progress. It is normal for initial sync to take time, especially for large connectors or connectors with strict API rate limits. For a rough planning estimate before you start, see [Understand the initial crawl](/connectors/crawling-types#understand-the-initial-crawl).

Skip this step when **Data indexing** shows **Not available**. A tools-only connector doesn't crawl content.

To learn how indexed and live data power Glean Search, Chat, Assistant, and related experiences, see [How connectors power the Glean experience](/connectors/connectors-power-glean).

5

Validate the connection

For a connector with data indexing, verify that content appears as expected and Glean enforces source permissions. Use a test group for a controlled pilot. See [Connector settings and visibility](/connectors/connectors-settings-visibility).

For an MCP-only connector, confirm that the connector's **Tools** status is on and test an available tool with an account that has the required source permissions.

6

Monitor the connector

Monitor each configured capability independently. For indexed content, review sync progress and health signals. For live tools, review the **Tools** status and connection.

See [Sync progress](/connectors/connectors-monitoring) for indexing metrics. For crawl types and timing, see [Crawling strategy](/connectors/crawling-frequency) and [Crawling FAQ](/connectors/crawling-faq). For indexing alerts, see [Connector health and alerts](/connectors/connectors-health-index).

## See also[​](#see-also "Direct link to See also")

-   **[About connectors](/connectors/about):** Definitions, how data and permissions flow, security, and connector types.
-   **[Set up tools and MCP integrations from Connectors](/connectors/configure-tools-in-connector/config-tools-mcp-from-connector):** Choose and configure indexing, tools, or both.
-   **[Crawling FAQ](/connectors/crawling-faq):** Common questions about crawl timing, restrictions, and behavior.
-   **[Crawling strategy](/connectors/crawling-frequency):** Crawl types, update cadence, and freshness details by source.
-   **[Monitoring connectors](/connectors/monitoring):** **Admin console** setup, sync monitoring, and troubleshooting.
