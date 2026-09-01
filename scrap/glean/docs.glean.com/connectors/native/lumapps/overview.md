---
url: "https://docs.glean.com/connectors/native/lumapps/overview"
canonical: "https://docs.glean.com/connectors/native/lumapps/overview"
title: "LumApps overview"
description: "Learn how the LumApps connector works with Glean."
fetched_at: "2026-09-01T13:29:34.567Z"
---
On this page

The LumApps connector allows you to integrate your LumApps intranet with Glean, enabling search and discovery of LumApps content directly within Glean. The connector indexes content pages, community pages, and posts, while strictly enforcing LumApps permissions so that users only see content they are authorized to access.

## Supported features and limitations[​](#supported-features-and-limitations "Direct link to Supported features and limitations")

The LumApps connector supports permissions-enforced indexing and search for a range of LumApps content types. It is designed to keep your Glean index in sync with LumApps, reflecting changes in content and permissions as quickly as possible.

### Supported objects/entities[​](#supported-objectsentities "Direct link to Supported objects/entities")

-   Content pages including homepages, directory listings, and custom content pages
-   Community pages
-   Community posts

For all indexed content, Glean processes and displays the title, last updated time, author, and text snippets in search results.

### Supported API endpoints/features[​](#supported-api-endpointsfeatures "Direct link to Supported API endpoints/features")

-   LumApps API v1 for content, users, groups, and permissions.
-   If enabled, platform logs API for user activity .
-   OAuth 2.0 authentication for secure access.

### Limitations[​](#limitations "Direct link to Limitations")

-   Only content visible to the admin user who authorizes the connector is indexed. Private pages not accessible to the admin will not be indexed.
-   Sections within a content page that have special permissions (different from the page default) are ignored and only content visible to the default groups is indexed.
-   Incremental crawls are not supported due to API limitations and full crawls are run at the same frequency as incremental crawls.
-   The Platform logs API for activity data is disabled by default and must be enabled by LumApps support if you want to use activity-based features.
-   Indexing of *Spaces* requires API v2, which is not currently supported.

### Crawling strategy[​](#crawling-strategy "Direct link to Crawling strategy")

| Crawl type | Full Crawl | Incremental Crawl | People Data | Activity | Update Rate | Webhook | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Content | Yes | No | No | No | Frequent | No | All content (pages, community pages, posts) fetched in parallel |
| Identity | Yes | No | Yes | No | Frequent | No | Users and groups fetched to determine permissions |
| Activity | No | No | No | Yes | Optional | No | Requires Platform logs API to be enabled by LumApps support |

Crawls are performed using the admin access token, which has access to all content visible to the admin in the LumApps instance.
