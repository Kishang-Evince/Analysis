---
url: "https://docs.glean.com/connectors/native/linear/about"
canonical: "https://docs.glean.com/connectors/native/linear/about"
title: "Linear overview"
description: "Learn what the Glean Linear connector indexes, how it enforces Linear permissions, and which objects are out of scope."
fetched_at: "2026-09-01T13:29:34.325Z"
---
On this page

The Linear connector brings Linear issues and project documents into Glean so users can search engineering work and project context without leaving Glean. The connector uses the Linear GraphQL API and preserves Linear team and document permissions at query time.

To connect Linear to Glean, see [Setup](/connectors/native/linear/setup).

## Supported features[​](#supported-features "Direct link to Supported features")

The connector is designed for searchable issue, comment, and project document content, together with the identity data needed to preserve access correctly in Glean.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object | Description |
| --- | --- |
| Issues | Linear issues used to track work and bugs |
| Issue comments | Comments attached to Linear issues |
| Project documents | Documents associated with Linear projects |
| Users | Identity data used for assignee, author, and permission mapping |

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

The connector relies on the following Linear API capabilities:

-   **Issues queries**: Crawl issue content and metadata.
-   **Comments queries**: Retrieve comments associated with issues.
-   **Project documents queries**: Retrieve project document content and metadata.
-   **Users and teams queries**: Retrieve identity and team visibility data for permission enforcement.

## Permissions[​](#permissions "Direct link to Permissions")

Glean preserves Linear permissions at query time:

-   Content from public teams is generally visible according to the Linear workspace's access rules.
-   Content from private teams is visible only to people who already have access in Linear.
-   Project documents remain subject to their Linear visibility settings.
-   Admin users do not automatically gain access to private-team content unless Linear itself grants it.

## Crawling and freshness[​](#crawling-and-freshness "Direct link to Crawling and freshness")

| Crawl type | Full crawl | Incremental crawl | People data | Activity | Update rate | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Issues and comments | Yes | Yes, filtered by `updatedAt` | Yes | No audit API | Daily by default | Captures issue and comment changes |
| Project documents | Yes | Limited | N/A | N/A | Daily | Some updates or deletions may require a full crawl |

## Limitations[​](#limitations "Direct link to Limitations")

-   Private-team content requires a paid Linear plan with the necessary access controls.
-   Webhooks are not supported for this connector path.
-   Linear does not expose an audit API for user views or edits in this integration.
-   Freshness for project documents is more limited than for issues and comments.
-   Multi-instance Linear deployments are not supported.

## See also[​](#see-also "Direct link to See also")

-   [Linear setup](/connectors/native/linear/setup)
