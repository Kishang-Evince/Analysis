---
url: "https://docs.glean.com/connectors/crawling-deletion"
canonical: "https://docs.glean.com/connectors/crawling-deletion"
title: "Deletion handling"
description: "How Glean detects and removes deleted content from the index, including webhook-based deletion and full-crawl cleanup."
fetched_at: "2026-09-01T13:29:18.049Z"
---
On this page

Glean handles content deletion through two primary mechanisms, depending on the capabilities of the source application:

-   **API and webhook deletion** — for sources that send deletion notifications through APIs or webhooks.
-   **Full crawl cleanup** — for sources without deletion notifications, or when a notification is missed.

## API and webhook deletion[​](#api-and-webhook-deletion "Direct link to API and webhook deletion")

For applications that provide deletion notifications through APIs or webhooks, content is removed from the index when the notification is processed. This typically happens within minutes to a few hours of the deletion at the source.

Examples of connectors with API or webhook-based deletion are OneDrive and SharePoint, Google Drive, Box, Slack, and Confluence.

## Full crawl cleanup[​](#full-crawl-cleanup "Direct link to Full crawl cleanup")

For applications without deletion notifications, or when a deletion event is missed, stale content is identified and removed during scheduled full crawls. Full crawl frequency varies by connector. Refer to the [refresh rates](/connectors/crawling-refresh-rates) tables for connector-specific full crawl intervals.

## When deletion events are missed[​](#when-deletion-events-are-missed "Direct link to When deletion events are missed")

In rare cases, a source application may fail to deliver a deletion notification. When this happens, the deleted content remains in the index until the next full crawl processes the affected data.

If you notice deleted content persisting in search results longer than expected, contact [Glean Support](https://support.glean.com). For urgent cases involving sensitive content, support can remove specific items from the index immediately. Admins can also use the [content hiding](/administration/search/hiding-content) feature to temporarily hide documents while deletion processing completes.

warning

Deletion of derived information used in models and other auxiliary systems is governed by Glean's privacy policy.
