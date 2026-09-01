---
url: "https://docs.glean.com/connectors/connectors-monitoring"
canonical: "https://docs.glean.com/connectors/connectors-monitoring"
title: "Monitor connectors sync progress"
description: "Configure and monitor your connectors through the Glean admin console"
fetched_at: "2026-09-01T13:29:17.977Z"
---
On this page

The connectors page provides an overview of your connected sources and their current status. Use this page to confirm that initial sync is progressing and that ongoing updates continue to flow after setup.

-   For setup steps, see [Getting started with connectors](/connectors/getting-started).
-   For connector tabs, visibility controls, and test groups, see [Connector settings and visibility](/connectors/connectors-settings-visibility).
-   For inclusion and exclusion rules, see [Excluding content](/connectors/excluding-content).

## Sync progress[​](#sync-progress "Direct link to Sync progress")

The connectors page groups sources by where they are in the connector lifecycle.

-   Initial sync
-   All connectors

### Initial sync[​](#initial-sync "Direct link to Initial sync")

Initial sync is split into two phases to help you understand where each connector is in the sync process:

1

**Crawling**

The connector is actively fetching content, metadata, and permissions from the source system. A connector typically remains in this phase while Glean retrieves the initial corpus of data.

It's normal for a connector to remain in this phase for a while, especially for large connectors or connectors with strict API rate limits. As long as **Items synced** continues to increase (even slowly), the crawler is making healthy progress.

2

**Indexing**

The connector is processing crawled content and incorporating it into the Knowledge Graph. A connector moves to this phase as crawling completes or nears completion.

Indexing can take time for large volumes of content or during periods of high system load. You can monitor **Items synced** to confirm that indexing is progressing. Steady increases indicate healthy operation.

### All connectors[​](#all-connectors "Direct link to All connectors")

Once crawling and indexing are complete, the connector moves from **Initial sync** to **All connectors**. At this point, the connector has completed its initial sync and is in steady-state operation, processing incremental updates through webhooks and periodic crawls.

Return to this section to monitor **Change rate (items/day)** and confirm that ongoing updates are flowing.

## Use metrics for troubleshooting[​](#use-metrics-for-troubleshooting "Direct link to Use metrics for troubleshooting")

You can use **Items synced** and **Change rate (items/day)** together with the sync status to troubleshoot connector health:

### During Initial Sync (Crawling/Indexing phases)

-   **Items synced** should increase over time. Metrics refresh on an **hourly** cadence.
-   If **Items synced** stops increasing for 24+ hours, verify connector permissions,API throttling, or potential configuration issues.
-   For sources in **Crawling**, slow but steady growth in **Items synced** is typically normal, especially for large sources or those with API rate limits.
-   If **Items synced** is stagnant and the source remains in **Indexing (step 2/2)** for multiple days, contact Glean support for assistance.

### After Initial Sync (All connectors)

-   **Change rate (items/day)** shows recent edits, additions, and deletions synced in the past 24 hours.
-   A **Change rate** of 0 may be normal if no changes occurred, but sustained 0 values when activity is expected could indicate webhook or incremental crawl issues.
-   High **Change rate** with flat **Items synced** may indicate heavy edit activity on existing content rather than new content being added.

## Best practices[​](#best-practices "Direct link to Best practices")

-   During onboarding, monitor the **Initial sync** section and the **Items synced** metric to spot stalls early and confirm that work is progressing.
-   In steady state, monitor **Change rate (items/day)** in **All connectors** to ensure that day-to-day updates are flowing. You can sort by the column to surface the most or least active sources.
-   Investigate sustained 0 values in **Items synced** or **Change rate** when you expect activity, such as after configuration changes, scope changes, or known source activity.

info

Status indicators like crawl status, document count, and content crawl may not always reflect real-time information. When you see "Crawl in progress", content should still be searchable as long as:

-   There is a document count displayed
-   The connector is set as visible

warning

If content isn't appearing in search results despite meeting these conditions, please submit a support ticket.

note

These metrics and status indicators provide visibility into connector activity and health, but don't represent a complete health verdict. Use them alongside other status indicators and error surfacing for comprehensive monitoring.
