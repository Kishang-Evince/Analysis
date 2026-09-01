---
url: "https://docs.glean.com/connectors/native/lessonly/about"
canonical: "https://docs.glean.com/connectors/native/lessonly/about"
title: "Lessonly overview"
description: "Learn what the Glean Lessonly connector indexes, how it enforces Lessonly permissions, and which objects are out of scope."
fetched_at: "2026-09-01T13:29:33.852Z"
---
On this page

The Lessonly connector brings training content from Lessonly, also known as Seismic Learning, into Glean so users can search lessons and learning paths from one place. The connector indexes supported Lessonly content through API access and preserves the permissions already defined in Lessonly.

To connect Lessonly to Glean, see [Setup](/connectors/native/lessonly/setup).

## Supported features[​](#supported-features "Direct link to Supported features")

The connector is designed for searchable learning content and the identity data needed to enforce access correctly in Glean.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object | Description |
| --- | --- |
| Lessons | Individual learning modules published in Lessonly |
| Paths | Curated learning paths made up of multiple lessons |
| Users and groups | Identity and membership data used for permission enforcement |

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

The connector relies on the following Lessonly API capabilities:

-   **Lessons and Paths retrieval**: Crawl published Lessons and Paths for indexing.
-   **User and group enumeration**: Retrieve the identities needed for permission mapping.
-   **Permission-aware retrieval**: Preserve Lessonly document-level permissions in Glean search results.

## Permissions[​](#permissions "Direct link to Permissions")

Glean enforces Lessonly permissions at query time:

-   Users see lesson and path content in Glean only if they already have access to it in Lessonly.
-   User and group data is used to map Lessonly permissions into Glean.
-   A well-maintained Lessonly permission model improves the accuracy of search visibility in Glean.

## Limitations[​](#limitations "Direct link to Limitations")

-   Only Lessons and Paths are indexed. Other Lessonly content types are out of scope.
-   The connector uses an API token. OAuth and other authentication methods are not supported for this connector.
-   Nonstandard or rebranded domains may require additional validation or support.
-   Setup guidance in Lessonly itself may vary depending on your Seismic Learning environment.

## See also[​](#see-also "Direct link to See also")

-   [Lessonly setup](/connectors/native/lessonly/setup)
