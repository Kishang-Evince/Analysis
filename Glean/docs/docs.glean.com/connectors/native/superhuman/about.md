---
url: "https://docs.glean.com/connectors/native/superhuman/about"
canonical: "https://docs.glean.com/connectors/native/superhuman/about"
title: "Superhuman Docs overview"
description: "Learn what the Glean Superhuman Docs connector indexes, how it enforces Superhuman Docs permissions, and which objects are out of scope."
fetched_at: "2026-10-13T08:50:20.606Z"
---
On this page

The Superhuman Docs connector brings content from your Superhuman Docs Enterprise instance into Glean so users can search Superhuman Docs, pages, and tables without leaving Glean. Glean uses the Coda API and Admin API to crawl content and permission metadata, and enforces Superhuman Docs access controls at query time.

To connect Superhuman Docs to Glean, see [Setup](/connectors/native/superhuman/setup).

## Supported features[​](#supported-features "Direct link to Supported features")

The connector indexes Superhuman Docs content and permission metadata needed for secure retrieval in Glean. It is designed for Superhuman Docs Enterprise environments that can use the Admin API.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object | Description |
| --- | --- |
| Docs | Top-level Superhuman Docs documents |
| Pages | Top-level and nested pages within docs |
| Tables | Structured table content within docs; the API determines which table features Glean can index |
| Users and groups | Identity and membership data used for permission enforcement |

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

The connector reads from the following APIs and feature areas:

-   **Organization endpoints**: Discover the organization and its top-level structure.
-   **Workspace and folder endpoints**: Enumerate workspaces and folders.
-   **Docs, pages, and tables endpoints**: Crawl document content, nested pages, and supported table data.
-   **User and permissions endpoints**: Retrieve user, workspace, folder, document, and page permissions for access enforcement.
-   **Audit and activity endpoints**: Obtain document-level change history where available.

## Permissions[​](#permissions "Direct link to Permissions")

Glean preserves Superhuman Docs' native permission model:

-   The connector enforces content visibility using organization, workspace, folder, document, and page permissions that the underlying APIs return.
-   Users see Superhuman Docs content in Glean only if they already have access to that content in Superhuman Docs.
-   User and group identities are crawled so Glean can map permissions correctly at search time.

## Crawling and freshness[​](#crawling-and-freshness "Direct link to Crawling and freshness")

-   The connector relies on scheduled crawls rather than webhooks.
-   The connector can use document-level activity and change history when the underlying APIs expose it, but those APIs provide limited page-level activity details.
-   Polling-based crawls mean very recent changes may not appear in Glean immediately.

## Limitations[​](#limitations "Direct link to Limitations")

-   The connector is available only for Superhuman Docs Enterprise customers because it depends on the Admin API.
-   The underlying APIs do not provide webhooks for document or page changes in this connector path, so the connector detects updates through polling.
-   API limitations restrict support for table rows and some advanced content types, such as formulas and controls.
-   Activity and audit data is available at the document level, not the page level.
-   Link sharing and public access behavior may be inferred from document settings where direct API coverage is limited.
-   Nested page visibility depends on successful traversal during crawling, so some sub-pages may not appear until a later crawl if an earlier crawl is incomplete.

## See also[​](#see-also "Direct link to See also")

-   [Superhuman Docs setup](/connectors/native/superhuman/setup)
