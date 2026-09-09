---
url: "https://docs.glean.com/administration/search/access-verification"
canonical: "https://docs.glean.com/administration/search/access-verification"
title: "Access verification"
description: "How to check if a document is visible in Glean and whether a user can access it."
fetched_at: "2026-09-01T13:29:14.400Z"
---
On this page

Use **Document lookup** to check whether Glean has indexed a document and whether a teammate can access it.

## Look up a document[​](#look-up-a-document "Direct link to Look up a document")

1.  Navigate to [**Admin console → Content management → Document lookup**](https://app.glean.com/admin/managesearch/documentaccess).
2.  Enter the document URL or ID in **Document URL**.
3.  To check access for a teammate, select them in **User (optional)**.
4.  Click **Check document**.

After Glean finds the document, review these fields:

-   **Last crawled**: When Glean last scanned the document for changes
-   **Last indexed**: When Glean last added those changes to search
-   **Document visibility on Glean**: Whether the document is visible or hidden in Glean
-   **Document access**: Whether the selected teammate can access the document

note

Glean assigns a unique document ID when it successfully crawls a document.

### Find a document ID[​](#find-a-document-id "Direct link to Find a document ID")

If you don't know the document URL or ID, or the URL returns an error:

1.  Below **Document URL**, click **using the document ID**.
2.  Select the option that describes your access to the document.
3.  If you can access the document, search by title or URL and click **Add ID** next to the correct result. If you can't access it, ask a teammate with access to find the document ID.
4.  Click **Check document**.

## Troubleshoot missing or stale documents[​](#troubleshoot-missing-or-stale-documents "Direct link to Troubleshoot missing or stale documents")

### Document not found in lookup[​](#document-not-found-in-lookup "Direct link to Document not found in lookup")

If the document URL or ID returns no results, the document has not been crawled yet. This can happen when:

-   The document was recently created or approved in the source application and the next crawl cycle has not run yet.
-   The connector's permissions prevent Glean from accessing the document.
-   The URL or ID does not match the format Glean expects for that connector.

To resolve this, confirm that the document is accessible in the source application, then check your connector's crawl schedule on the [Connector refresh rates](/connectors/crawling-refresh-rates) page. If the document should have been crawled already, go to **Admin console → Platform → Connectors**, select the connector, and review its **Status** and **Last crawled** timestamp.

### Stale "Last crawled" or "Last indexed" timestamps[​](#stale-last-crawled-or-last-indexed-timestamps "Direct link to Stale \"Last crawled\" or \"Last indexed\" timestamps")

If the **Last crawled** or **Last indexed** timestamps are older than expected, the connector may be experiencing crawl delays. Common causes include API rate limits, large corpus sizes, or source application outages.

Go to **Admin console → Platform → Connectors** and review **Crawl rate** and **Change rate** for the connector. If the connector appears healthy but the document is still stale, contact [Glean Support](https://support.glean.com) to request a targeted recrawl.

### Expected latency for newly created or approved documents[​](#expected-latency-for-newly-created-or-approved-documents "Direct link to Expected latency for newly created or approved documents")

After a document is created or approved in the source application, it becomes available in Glean after the next applicable update or crawl completes for that connector. The time this takes depends on the connector type:

-   **Webhook-enabled connectors** (Slack, Jira, GitHub, and others) usually reflect changes within minutes.
-   **API-based connectors** can use a faster update path, an incremental crawl, or both. For example, Box updates every 10 minutes, SharePoint and OneDrive use 10-minute update signals with hourly incremental crawls, and Google Drive uses 10-minute Reports API updates with a 3-hour incremental crawl.
-   **Scheduled-only connectors** rely on their next scheduled crawl, which can range from 1 hour to 28 days.

Documents behind access controls can also take longer when Glean needs to resolve or apply permission data for the document. Some connectors attach permissions during the regular content crawl, while others depend on separate group or identity updates. If a document does not appear after the connector's next two expected updates or crawls, contact [Glean Support](https://support.glean.com).

For Push API (custom) connectors, you control when documents are uploaded. If uploaded documents are not appearing, see [Custom connector troubleshooting](/connectors/custom/troubleshooting) to verify upload and processing status.

See the [Connector refresh rates](/connectors/crawling-refresh-rates) page for default crawl intervals by connector.

## See also[​](#see-also "Direct link to See also")

-   [Crawl strategy](/connectors/crawling-frequency) - how Glean balances crawl freshness and API limits
-   [Connector refresh rates](/connectors/crawling-refresh-rates) - default crawl intervals by connector
-   [Crawl types](/connectors/crawling-types) - full, incremental, activity, and identity crawls
-   [Custom connector troubleshooting](/connectors/custom/troubleshooting) - debug endpoints for Push API connectors
