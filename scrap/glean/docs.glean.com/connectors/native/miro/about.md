---
url: "https://docs.glean.com/connectors/native/miro/about"
canonical: "https://docs.glean.com/connectors/native/miro/about"
title: "Miro overview"
description: "Learn what the Glean Miro connector indexes, how it enforces Miro permissions, and which objects are out of scope."
fetched_at: "2026-09-01T13:29:35.324Z"
---
On this page

The Miro connector brings board content from selected Miro teams into Glean so users can search and retrieve whiteboard context without leaving Glean. The connector uses the Miro APIs to crawl supported board content and permission metadata, while preserving the access rules already defined in Miro.

To connect Miro to Glean, see [Setup](/connectors/native/miro/setup).

## Supported features[​](#supported-features "Direct link to Supported features")

The connector is designed for searchable board content from selected teams, together with the identity and membership data needed for permission enforcement.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object | Description |
| --- | --- |
| Boards | Boards in the selected Miro teams that the connector can access |
| Users and team membership | Identity and team data used for permission mapping |

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

The connector relies on the following Miro API capabilities:

-   **Team membership endpoints**: Retrieve team members for identity and permission mapping.
-   **Boards endpoints**: Discover boards available to the connector within the selected teams.
-   **Widgets and board content endpoints**: Fetch board metadata and supported textual widget content.
-   **Audit logs endpoints**: Retrieve update and delete activity where the Miro plan and API access support it.

## Permissions[​](#permissions "Direct link to Permissions")

Glean preserves Miro permissions at query time:

-   Only boards that the connector can access in the selected teams are crawled.
-   Users see board content in Glean only if they already have access to that board in Miro.
-   Team membership and identity data are used to map access correctly into Glean.

## Crawling and freshness[​](#crawling-and-freshness "Direct link to Crawling and freshness")

-   The connector crawls content from a selected set of Miro teams.
-   Audit-log-based incremental updates are available only where the Miro environment and API support them.
-   Where audit log coverage is not available, Glean relies more heavily on recurring crawls.
-   Webhooks are not supported for this connector path.

## Limitations[​](#limitations "Direct link to Limitations")

-   Only boards from the configured teams are indexed.
-   Comments and some non-native or third-party widget content are not indexed.
-   Project-level or inherited permissions may be partially limited because public API support is incomplete.
-   Incremental crawling depends on audit log availability; otherwise, content freshness depends on crawl cadence.
-   New and deleted content may not appear instantly because updates are crawl-based.

## See also[​](#see-also "Direct link to See also")

-   [Miro setup](/connectors/native/miro/setup)
