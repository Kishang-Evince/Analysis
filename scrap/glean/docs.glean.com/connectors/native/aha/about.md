---
url: "https://docs.glean.com/connectors/native/aha/about"
canonical: "https://docs.glean.com/connectors/native/aha/about"
title: "Aha! overview"
description: "Learn what the Glean Aha! connector indexes, how it enforces Aha! permissions, and which objects are out of scope."
fetched_at: "2026-09-01T13:29:21.708Z"
---
On this page

Aha! is a cloud-based product development platform for capturing ideas, prioritizing features, and managing product roadmaps. Use the Aha! connector to index content from Aha! Ideas and Aha! Features so that your users can search and retrieve roadmap context directly in Glean.

To connect Aha! to Glean, see [Setup](/connectors/native/aha/setup).

## Supported features[​](#supported-features "Direct link to Supported features")

The connector ingests data from two Aha! modules: Ideas and Features. Metadata such as titles, descriptions, comments, status, and votes is indexed and searchable. Glean takes Aha! permissions into account, so users see only the content they are entitled to access.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object | Description |
| --- | --- |
| Ideas | Crowd-sourced feedback, tickets, and suggestions with metadata such as votes, comments, status, and categories. |
| Features | Items representing product tasks or enhancements, with fields for timelines, status, comments, goals, and tags. |

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

The connector reads from the following Aha! REST API endpoints:

-   **Ideas endpoint:** Fetches ideas including title, description, votes (count), author, assignee, comments, status, and related metadata.
-   **Features endpoint:** Retrieves features with metadata fields similar to ideas, plus associated release and goal information.
-   **User and permission endpoints:** Identify workspace (product) memberships and role-based access for permission enforcement.

## Crawling and freshness[​](#crawling-and-freshness "Direct link to Crawling and freshness")

-   Glean performs incremental fetches using the `updated_since` parameter, so each crawl after the initial one retrieves only content that changed.
-   Optional activity webhooks notify Glean when ideas and features are created, updated, or deleted, and when comments or votes change within them. Webhook notifications typically arrive about five minutes after the triggering event.
-   Aha! API rate limits apply: up to 300 requests per minute and up to 20 requests per second per source IP address.

## Permissions[​](#permissions "Direct link to Permissions")

Glean enforces Aha! permissions at query time:

-   Only users with a Viewer or higher role in a workspace have their associated content indexed and made accessible in Glean.
-   Permission propagation follows the Aha! workspace (product) and product line hierarchy, so users may inherit access to descendant workspaces.
-   Workspace hierarchy and group-based permissions are handled, though some propagation logic is best-effort because of Aha! API limitations.

## Limitations[​](#limitations "Direct link to Limitations")

-   Only Ideas and Features are indexed. Workspaces (products), product lines, releases, and individual votes or endorsements are out of scope.
-   Epics, Initiatives, and Goals are not currently supported in the standard configuration.
-   Comments are indexed as part of the parent idea or feature, not as standalone records.
-   Only users with at least Viewer permissions in a workspace can have their content indexed and displayed.
-   Aha! on-premises deployments are not supported. The connector works with Aha! cloud only.
-   Pagination may miss or duplicate items if the underlying Aha! data changes during a crawl, though the index reaches eventual consistency.
-   Webhook notifications for deletions are delayed by about five minutes.

## See also[​](#see-also "Direct link to See also")

-   [Aha! setup](/connectors/native/aha/setup)
