---
url: "https://docs.glean.com/connectors/getting-started"
canonical: "https://docs.glean.com/connectors/getting-started"
title: "Get started with connectors"
description: "Use this guide to understand the end-to-end setup process before moving to connector setup guides."
fetched_at: "2026-09-01T13:29:20.433Z"
---
On this page

Use this guide to understand the end-to-end setup process before moving to connector setup guides.

## The connector journey[​](#the-connector-journey "Direct link to The connector journey")

1

Find your source

Browse the [Connectors hub](/connectors/) and open the page for the source you want to connect. Each connector page lists supported content types, prerequisites, and setup instructions specific to that source.

Examples: Slack, Microsoft Teams, SharePoint, Affinity, Box, NetSuite, and Google Drive.

2

Review prerequisites

Check the connector page for required admin roles, credentials, API scopes, and source-side configurations. Always review these requirements before starting setup.

3

Configure the connector

In the Glean Admin console, go to **Connectors** > **Add connector** and add the new connector. Provide the required credentials and settings, then save.

note

Some connectors include a **Manage data** tab to define inclusion or exclusion rules after the initial save. See [Monitoring connectors](/connectors/monitoring).

4

Start the initial sync

Once you save the configuration, start the crawl immediately or schedule it for later. During the initial sync, the Admin console displays two phases:

-   **Crawling:** Glean fetches content, metadata, and permissions from the source system.
-   **Indexing:** Glean processes the data and incorporates it into the Knowledge Graph.

Sync duration varies based on data volume, source API rate limits, and how much content and permissions are retrieved. Use the **Items synced** metric in the Admin console to monitor progress. It is normal for initial sync to take time, especially for large connectors or connectors with strict API rate limits. For a rough planning estimate before you start, see [Understand the initial crawl](/connectors/crawling-types#understand-the-initial-crawl).

To learn how this data powers Glean Search, Chat, Assistant, and related experiences, see [How connectors power the Glean experience](/connectors/connectors-power-glean).

5

Validate results

Before a broad rollout, verify that content appears as expected and permissions are enforced. Use a test group for a controlled pilot. See [Connector settings and visibility](/connectors/connectors-settings-visibility).

6

Move to steady state

After the initial sync completes, the connector enters steady-state operation. The connector uses webhooks, incremental crawls, or activity-based detection to push updates to Glean. For crawl types, timing, and update cadence, see [Crawling strategy](/connectors/crawling-frequency) and [Crawling FAQ](/connectors/crawling-faq).

Use [Monitoring connectors](/connectors/monitoring) to monitor **Items synced** and **Change rate** over time. For alerts and health signals, see [Connector health and alerts](/connectors/connectors-health-index).

## See also[​](#see-also "Direct link to See also")

-   **[About connectors](/connectors/about):** Definitions, how data and permissions flow, security, and connector types.
-   **[Crawling FAQ](/connectors/crawling-faq):** Common questions about crawl timing, restrictions, and behavior.
-   **[Crawling strategy](/connectors/crawling-frequency):** Crawl types, update cadence, and freshness details by source.
-   **[Monitoring connectors](/connectors/monitoring):** Admin console setup, sync monitoring, and troubleshooting.
