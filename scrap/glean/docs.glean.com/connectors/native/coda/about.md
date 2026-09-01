---
url: "https://docs.glean.com/connectors/native/coda/about"
canonical: "https://docs.glean.com/connectors/native/coda/about"
title: "Coda overview"
description: "Learn what the Glean Coda connector indexes, how it enforces Coda permissions, and which objects are out of scope."
fetched_at: "2026-09-01T13:29:24.573Z"
---
On this page

The Coda connector brings content from your Coda Enterprise instance into Glean so users can search Coda docs, pages, and tables without leaving Glean. Glean uses the Coda API and Admin API to crawl content and permission metadata, and enforces Coda access controls at query time.

To connect Coda to Glean, see [Setup](/connectors/native/coda/setup).

## Supported features[​](#supported-features "Direct link to Supported features")

The connector indexes Coda content and permission metadata needed for secure retrieval in Glean. It is designed for Coda Enterprise environments that can use the Admin API.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object | Description |
| --- | --- |
| Docs | Top-level Coda documents |
| Pages | Top-level and nested pages within docs |
| Tables | Structured table content within docs, subject to Coda API support |
| Users and groups | Identity and membership data used for permission enforcement |

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

The connector reads from the following Coda APIs and feature areas:

-   **Organization endpoints**: Discover the organization and its top-level structure.
-   **Workspace and folder endpoints**: Enumerate workspaces and folders.
-   **Docs, pages, and tables endpoints**: Crawl document content, nested pages, and supported table data.
-   **User and permissions endpoints**: Retrieve user, workspace, folder, document, and page permissions for access enforcement.
-   **Audit and activity endpoints**: Obtain document-level change history where available.

## Permissions[​](#permissions "Direct link to Permissions")

Glean preserves Coda's native permission model:

-   Content visibility is enforced using organization, workspace, folder, document, and page permissions returned by Coda.
-   Users see Coda content in Glean only if they already have access to that content in Coda.
-   User and group identities are crawled so Glean can map permissions correctly at search time.

## Crawling and freshness[​](#crawling-and-freshness "Direct link to Crawling and freshness")

-   The connector relies on scheduled crawls rather than webhooks.
-   Document-level activity and change history can be used where Coda exposes it, but page-level activity details are limited.
-   Polling-based crawls mean very recent changes may not appear in Glean immediately.

## Limitations[​](#limitations "Direct link to Limitations")

-   The connector is available only for Coda Enterprise customers because it depends on the Admin API.
-   Coda does not provide webhooks for document or page changes in this connector path, so updates are detected through polling.
-   Table rows and some advanced content types, such as formulas and controls, are limited by Coda API capabilities.
-   Activity and audit data is available at the document level, not the page level.
-   Link sharing and public access behavior may be inferred from document settings where direct API coverage is limited.
-   Nested page visibility depends on successful traversal during crawling, so some sub-pages may not appear until a later crawl if an earlier crawl is incomplete.

## See also[​](#see-also "Direct link to See also")

-   [Coda setup](/connectors/native/coda/setup)
