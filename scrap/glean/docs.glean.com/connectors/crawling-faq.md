---
url: "https://docs.glean.com/connectors/crawling-faq"
canonical: "https://docs.glean.com/connectors/crawling-faq"
title: "Frequently asked questions (FAQ)"
description: "A list of frequently asked questions regarding Glean connectors and the crawling of connectors."
fetched_at: "2026-09-01T13:29:18.105Z"
---
On this page

tip

To monitor your deployment's crawl health, go to **Admin console → Platform → Connectors** and review **Status**, **Items synced**, **Crawl rate**, and **Change rate**. See [Managing connectors](/connectors/monitoring) for details on interpreting these metrics.

### How long will my crawl take?

Initial crawl duration varies significantly based on:

1

Connector size

The total volume of content — number of documents, messages, and their sizes — directly impacts crawl time.

2

API rate limits

The connector's API rate limit affects how quickly Glean can retrieve items. Lower rate limits result in longer crawl times.

#### Estimating crawl completion time[​](#estimating-crawl-completion-time "Direct link to Estimating crawl completion time")

For select connectors, you can enter an estimated document count during setup to receive a projected time range based on historical crawl data. See [Understand the initial crawl](/connectors/crawling-types#understand-the-initial-crawl) for a step-by-step guide. You can also monitor **Crawl rate** in the Admin console for a live view of initial sync progress.

### How do I use initial crawl estimates?

For select connectors, Glean shows an optional crawl time estimate during setup, based on historical crawl data. For the step-by-step walkthrough and which connectors support it, see [Understand the initial crawl](/connectors/crawling-types#understand-the-initial-crawl).

### What if my crawl is taking a long time?

Crawl duration is primarily determined by your connector's size. Larger datasets or applications with low API rate limits naturally require more time to process. If your crawl duration exceeds expectations, we recommend contacting Glean support for assistance.

### How can I monitor crawl progress?

Monitor crawl status under **Admin console → Platform → Connectors**:

-   **Initial sync in progress**: Indicates an active crawl
    -   **Crawling**: Indicates content collection
    -   **Indexing**: Indicates making the content searchable
-   **All connectors → Items synced**: Indicates a completed crawl

During initial sync, use **Crawl rate** (parts/hour) to confirm the crawl is progressing. After initial sync completes, use **Change rate** (items/day) to confirm ongoing freshness.

For select connectors, you can also get an [initial crawl estimate](/connectors/crawling-types#understand-the-initial-crawl) during setup.

### What is Crawl rate?

Crawl rate is the hourly rate of crawling tasks across document parts, for example, content, metadata, permissions during the initial crawl. It serves as a heartbeat to confirm active progress.

### What is Change rate?

Change rate is the number of user-driven changes, for example, edits, additions, and deletions synced in the past 24 hours after the initial crawl completes. It indicates ongoing freshness.

### How can I restrict what Glean crawls?

While some connectors (like GitHub) offer restriction configuration during setup through the UI, most connectors require Glean support assistance for implementing crawl restrictions. Available restriction methods include:

### Time-based

Limit crawling to content created or accessed within a specific timeframe (for example, last 6 months)

### User-based

Restrict crawling to content from specified users

### Group-based

Limit crawling to content from specific AD groups

### Site/Channel-based

Restrict crawling to specific sites or channels

info

Available restrictions depend on the connector's API capabilities. Most applications support both greenlisting (explicit inclusion) and redlisting (explicit exclusion).

### What should I do if I see errors in my crawl status?

If you encounter errors in your crawl status, this may indicate connectivity issues with your connector or problems with the data itself. We recommend:

1.  Verifying your connector configuration
2.  Contacting Glean support if issues persist

### Can I crawl multiple connectors simultaneously?

Yes, Glean fully supports concurrent crawling of multiple connectors.

### Why is my crawl stuck at 'Job in progress'?

The **Job in progress** status indicates an active crawl of your connector. Since full crawls typically take several days to complete, this status will persist throughout the crawling process.

### How do I delete a connector?

To delete a connector after initial setup, navigate to the **Connectors** page on the [admin console](https://app.glean.com/admin) and click the connector instance you wish to delete. On the "Overview" tab, open the "Extreme Measures" section and click the "Delete instance" button.

Once you have confirmed the deletion, it may take up to 5 minutes for documents from this connector instance to no longer appear in Glean search results. All associated data will be removed in the background.

note

Currently, some connectors do not support deletion. Connectors that you cannot create multiple instances of cannot be deleted. In addition, you will not be able to delete your active People Connector. If you wish to delete this connector, first set a new People Connector on the **People Data** page.

### How do I stop or restart a crawl?

Crawl management operations must be performed by Glean support. Please contact them for assistance with stopping or restarting crawls.

### How does Glean handle deleted content?

Glean removes deleted content from search results through two mechanisms:

-   **API and webhook deletion**: For connectors that support deletion notifications (such as SharePoint, Google Drive, Box, Slack, and Confluence), Glean processes the deletion event and removes the content from the index. This typically happens within minutes to hours, depending on the connector.
-   **Full crawl cleanup**: For connectors that don't provide deletion notifications, stale content is identified and removed during the next scheduled full crawl. Full crawl frequency varies by connector. See [Refresh rates](/connectors/crawling-refresh-rates) for details.

### How long does it take for deleted content to disappear from search results?

The timeline depends on the connector and how the deletion is detected:

-   If the connector supports real-time or near-real-time deletion events (via APIs or webhooks), the content is typically removed within minutes to a few hours.
-   If the deletion event is missed or the connector doesn't support deletion notifications, the content is removed during the next full crawl. Full crawl intervals range from 6 hours to 28 days depending on the connector.

For connector-specific deletion timelines, refer to the [data refresh rates](/connectors/crawling-refresh-rates#default-refresh-patterns-by-connector) tables.

### Why is a deleted document still appearing in search results?

There are a few common reasons:

-   **Propagation delay**: The deletion may not have been processed yet. Most connectors pick up deletions within minutes to hours, but there can be a short lag between when content is deleted at the source and when it's removed from Glean.
-   **Missed deletion event**: In rare cases, the source application may not send a deletion notification to Glean. In these cases, the content is removed during the next full crawl.
-   **Recycle bin behavior**: Some applications (like SharePoint) move deleted items to a recycle bin rather than permanently deleting them. Glean treats items in the recycle bin as deleted and removes them from search results during the next crawl cycle.

If a deleted document persists in search results longer than expected, contact [Glean support](https://support.glean.com). For urgent cases involving sensitive content, Glean support can remove specific items from the index immediately.

### Can I hide a document from search results while waiting for deletion to process?

Yes. Admins can use the content hiding feature in the Admin console under Glean Protect to temporarily hide specific documents from search results. Navigate to **Admin console** > **Glean Protect** > **Content hiding** and use the CSV upload or document search to hide individual documents. See [Managing result visibility](/administration/search/hiding-content) for details.

### When do the Crawl rate and Change rate columns appear?

You will see Crawl rate only during the initial crawl. After the initial crawl is complete, Change rate appears for that connector.

### How often do Crawl rate and Change rate metrics update?

Approximately every 5–10 minutes.

### What does a \`0\` Crawl rate mean?

This can mean the connector is being initialized or no crawling tasks were performed in the last hour, for example, due to health checks. If 0 persists longer than expected, investigate configuration and permissions.

### What does a \`0\` Change rate mean?

Either no user‑driven changes occurred in the last 24 hours or updates are not being synced. If you expect activity, investigate potential sync or permission issues.

### Why don't I see Crawl rate and Change rate metrics for some connectors?

Certain connector types are excluded, for example, federated‑fetch only, customer‑managed, and web connectors.

### Does a high Crawl rate mean everything is healthy?

Not necessarily. These metrics reflect activity, not a complete health assessment. Use them alongside status indicators and error surfacing.

### Is "Change rate" the number of documents added, deleted, or edited per day?

-   Yes—conceptually, it's the count of document change events Glean processed in the last 24 hours for an ongoing crawl. These events include creates (adds), updates (content/metadata/permissions), moves/renames, and deletes. Think of it as an activity "heartbeat" showing that new or changed content is actively being processed.
    
-   In the original spec, the admin table highlights "added in the past day" as the simplest, user-friendly roll-up for ongoing crawls; internally, it's backed by the change-event stream described above.
    

### Why can Change rate be higher than items synced?

-   Multiple changes to the same item: If one document is edited many times in a day, each edit is a separate change event. "Items synced" is a cumulative count of distinct items indexed, so it won't rise with repeated edits.
    
-   Updates and deletes don't increase "items synced": Edits and permission-only changes are counted in "Change rate" but do not add to the total items. Deletes can even decrease "items synced" while still incrementing the change count.
    
-   Timing and pipeline lag: "Items synced" is a lagging, cumulative indicator that updates after indexing completes; "Change rate" reflects event processing activity within the last 24 hours and can surface earlier in the pipeline. Over short windows, you may see a high change rate without a corresponding immediate increase in the items total.
    
-   Permission/metadata churn: Some connectors generate events for permission or metadata changes (for example, access list updates), which raise "Change rate" even when no new items are added to the index.
    

### What can administrators learn by viewing this "Change rate"?

-   A live "heartbeat" of connector activity: It shows whether the connector is actively processing new or changed content in the last 24 hours (creates, edits, permission/metadata changes, deletes), so you can quickly confirm the crawl isn't idle.
-   Early stall detection: If Change rate flatlines while you expect activity, it's a signal to check connector health (auth scopes, webhook subscriptions, errors) even before the total items count moves.
-   Interpreting gaps vs. Items synced: Because Items synced is a cumulative, lagging indicator, a high Change rate with little movement in Items synced can indicate many edits/deletes or permission-only changes (which don't add to the total).
-   Validating configuration changes propagate: After updating inclusion/exclusion rules or visibility settings, a non-zero Change rate is a quick way to verify those changes are being picked up and applied by the pipeline.
-   Spotting surges or operational events: Spikes can reflect bulk content uploads/migrations or large permission sweeps—useful operational context that can explain search result shifts or indexing load.
-   Where it fits with Crawl rate: Use Change rate to monitor ongoing crawls; Crawl rate is the companion metric during initial syncs.

### Is "Crawl rate" the number of tasks that read permissions/metadata rather than documents?

-   Not exactly. For initial crawls, Crawl rate is the number of document parts discovered in the past hour. It's a throughput metric of the initial sync, reported in "parts," not a count of internal processing tasks, and it's not limited to permissions/metadata-only operations
-   In the admin UI this shows up as a parts/processing rate during initial sync. Once a connector moves to ongoing crawls, this column switches to show Change rate instead.

### What can administrators learn by looking at "Crawl rate"?

-   A live initial‑sync heartbeat: If Crawl rate is non‑zero and changing, the initial crawl is progressing and discovering new parts; if it flatlines during initial sync, it suggests a stall that merits a health check.
    
-   Speed and time‑to‑completion context: Because Crawl rate is "parts discovered per hour," monitoring it alongside the initial crawl time estimate helps you gauge how quickly the initial sync will finish. The setup flow includes a "Get sync time estimate."
    
-   Interpreting vs. Items synced: Items synced is a cumulative, lagging count that updates after indexing completes. During initial sync, you may see Crawl rate activity without an immediate Items synced increase, especially when pipelines are still processing discovered parts.
    
-   When the metric changes: Remember that Crawl rate is shown for initial syncs; once the source transitions to ongoing syncs, the table shows Change rate as the ongoing "heartbeat."
    

tip

For questions not addressed here or for specific crawl-related assistance, contact [Glean Support](https://support.glean.com).
