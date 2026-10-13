---
url: "https://docs.glean.com/connectors/connectors-monitoring"
canonical: "https://docs.glean.com/connectors/connectors-monitoring"
title: "Monitor connectors sync progress"
description: "Configure and monitor your connectors through the Glean Admin console"
fetched_at: "2026-10-13T08:49:39.011Z"
---
On this page

The connectors page provides an overview of your connected sources and their current status. Use this page to confirm that initial sync is progressing and that ongoing updates continue to flow after setup.

-   For setup steps, see [Getting started with connectors](/connectors/getting-started).
-   For connector tabs, visibility controls, and test groups, see [Connector settings and visibility](/connectors/connectors-settings-visibility).
-   For inclusion and exclusion rules, see [Excluding content](/connectors/excluding-content).

note

This page applies to connectors that support data indexing. A tools-only connector shows **Not available** under **Data indexing** and doesn't have crawl or sync metrics. Monitor its **Tools** status on the **Connectors** page instead.

## Sync progress[​](#sync-progress "Direct link to Sync progress")

The connectors page groups sources by where they are in the connector lifecycle.

-   Initial sync
-   All connectors

### Initial sync[​](#initial-sync "Direct link to Initial sync")

During initial sync, Glean discovers, crawls, and indexes content. The status labels and progress details depend on the connector and the progress features enabled for it. The connectors list shows crawling and indexing activity:

1

**Crawling**

The connector is actively fetching content, metadata, and permissions from the source system. A connector typically remains in this phase while Glean retrieves content from the source.

It's normal for a connector to remain in this phase for a while, especially for large connectors or connectors with strict API rate limits. As long as **Items synced** continues to increase (even slowly), the crawler is making healthy progress.

2

**Indexing**

The connector is processing crawled content and incorporating it into the Knowledge Graph. A connector moves to this phase as crawling completes or nears completion.

Indexing can take time for large volumes of content or during periods of high system load. You can monitor **Items synced** to confirm that indexing is progressing. Steady increases indicate healthy operation.

### Monitor initial sync readiness[​](#monitor-initial-sync-readiness "Direct link to Monitor initial sync readiness")

Supported connectors, such as Google Drive and Box, can show an **Index readiness** progress bar during their first sync. The bar appears only when the progress feature is enabled for that connector instance.

To check priority-content progress:

1.  Go to **Admin console → Platform → Connectors**.
2.  Click your connector and open its **Overview** tab.
3.  Under **Data indexing**, look for **Index readiness**. After discovery finishes, the bar shows a percentage with a label such as **72% of priority content indexed**.

It applies to the first sync, not later periodic crawls.

#### Interpret the percentage[​](#interpret-the-percentage "Direct link to Interpret the percentage")

The percentage estimates how much of the higher-priority content Glean has crawled and indexed. Glean calculates it from a sample of that content, not from every document in the source. It isn't an exact document count or a percentage of the full corpus.

The estimate refreshes periodically. An unchanged percentage alone doesn't mean that the crawl has stopped.

Check the initial sync status for completion rather than waiting for the bar to reach 100%. Glean can mark the initial sync complete before the percentage reaches 100%, and content can continue indexing afterward. Completion means the connector has met its initial readiness criteria, not that every source document is indexed.

#### Check why the progress bar is missing[​](#check-why-the-progress-bar-is-missing "Direct link to Check why the progress bar is missing")

Glean doesn't show the bar while it is discovering content, after the first sync finishes, or when the connector requires attention. The bar is also absent if the connector doesn't support initial sync progress or the feature isn't enabled for that connector instance.

Continue to use the connector's status and crawl metrics to monitor activity. Review any issues reported under **Data indexing**. If initial sync fails or requires attention, resolve the reported issues before relying on progress metrics. A missing progress bar alone doesn't indicate a failed sync.

### All connectors[​](#all-connectors "Direct link to All connectors")

When Glean marks the initial sync complete, the connector moves from **Initial sync** to **All connectors**. Glean continues to index content and process updates.

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
