---
url: "https://docs.glean.com/connectors/native/highspot/about"
canonical: "https://docs.glean.com/connectors/native/highspot/about"
title: "Highspot overview"
description: "This article provides comprehensive documentation for configuring, setting up, and using the Highspot connector with Glean. It covers supported features, requirements, setup instructions, and known limitations."
fetched_at: "2026-09-01T13:29:32.261Z"
---
On this page

The Highspot connector enables you to index and search content from Highspot directly within Glean. Connect Highspot to quickly find Spots, Items, and associated metadata. This streamlines access to critical sales and marketing assets. The connector fetches content that the API user has access to, including Spots and Items within those Spots, along with their metadata and content.

## Supported features and limitations[​](#supported-features-and-limitations "Direct link to Supported features and limitations")

The Highspot connector is designed to ingest and index content from Highspot, making it searchable within Glean. This section outlines the supported objects, API endpoints, limitations, crawling strategy, and how results are displayed.

### Supported objects and entities[​](#supported-objects-and-entities "Direct link to Supported objects and entities")

| Object/Entity | Description |
| --- | --- |
| Spots | By default, only official Spots accessible to the API user are indexed. Glean can optionally be configured to index all accessible Spots, including unofficial and personal Spots. |
| Items | Items within indexed Spots. Glean crawls content and metadata for each item. Item visibility follows the parent Spot's access. |

### Supported API endpoints and features[​](#supported-api-endpoints-and-features "Direct link to Supported API endpoints and features")

-   `/users`: Fetches users from Highspot.
-   `/spots`: Fetches Spots for content indexing. When spot-level permissions are enabled, Glean also uses this endpoint with impersonation to fetch each user’s Spots and build access mappings.
-   `/items/%s`: Lists items within a Spot, including metadata.
-   `/items/%s/content`: Downloads the content of a given item.

Page size is generally set to 100.

### Limitations[​](#limitations "Direct link to Limitations")

-   The connector requires a paid Highspot license that supports API access.
-   There is no direct Highspot API to list all users with access to a given Spot. When spot-level permissions are enabled, Glean uses user impersonation to determine each user’s Spot membership.
-   By default, only official Spots are indexed. To index all accessible Spots, including unofficial and personal Spots, contact Glean support.

### Crawling strategy[​](#crawling-strategy "Direct link to Crawling strategy")

| Crawl Type | Full Crawl | Incremental Crawl | People Data | Activity | Update Rate | Webhook | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Spots & Items | Yes | No | No | No | 4 hours | No | Frequency depends on object type and impersonation used for permissions. |
| Users | Yes | No | Yes | No | 1 hour | No | Users fetched for permission mapping. |

The default frequency for content crawl is 4 hours and for identity crawl it is 1 hour.

### Results display[​](#results-display "Direct link to Results display")

Highspot results appear in Glean search with associated metadata such as title, author, date of publishing, and last modification date.

### Permissions & security[​](#permissions--security "Direct link to Permissions & security")

**Data and metadata ingested:**

-   Spots, Items, Item metadata, and Item content accessible to the API user.

**Default mode:** In the default configuration, all indexed Highspot content is visible to all Highspot users in Glean. Spot-level permissions aren’t enforced until you complete additional setup.

**Spot-level permissions (optional):** Glean supports spot-level permission enforcement for Highspot. When enabled, users only see Spots and Items they’re authorized to access. Item visibility follows the parent Spot’s membership.

To enable spot-level permissions:

1.  In Highspot, enable **Impersonation in Highspot REST API** for the specific API client used by Glean.
2.  Contact [Glean support](https://support.glean.com/hc/en-us/requests/new) to enable spot-level permissions for your connector.
3.  After Glean enables the setting, a new identity crawl runs to map each user’s Spot membership.

warning

Impersonation must be enabled for the API client that Glean uses. If impersonation isn’t configured for the correct client, the identity crawl can fail with `401 Unauthorized` errors, and content may not appear correctly in search results.

**Security & compliance notes:**

-   Authentication is handled through API credentials (client key and secret).
-   All data remains within your GCP project and no data leaves your environment.

For any issues or concerns, contact the [Glean support team](https://support.glean.com/hc/en-us/requests/new).
