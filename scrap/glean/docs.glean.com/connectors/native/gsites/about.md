---
url: "https://docs.glean.com/connectors/native/gsites/about"
canonical: "https://docs.glean.com/connectors/native/gsites/about"
title: "Google Sites overview"
description: "Learn what the Glean Google Sites connector indexes, how it enforces Google Drive permissions, and how Google Vault exports work."
fetched_at: "2026-09-01T13:29:31.850Z"
---
On this page

Connect your Google Sites content to Glean so you can search New Google Sites pages through unified enterprise search. The connector uses Google Vault and Google Drive APIs, then enforces permissions from the underlying Drive content at query time. Indexed data remains within your organization's cloud environment.

Google Drive must already be connected before you set up Google Sites. For setup instructions, see [Setup](/connectors/native/gsites/setup).

## Supported features[​](#supported-features "Direct link to Supported features")

-   The connector indexes content from New Google Sites pages.
-   It captures publishing dates, modification dates, author or owner information, and access control metadata.
-   It includes links to embedded Google Docs as URL references.
-   It inherits and enforces permissions from the underlying Google Drive content.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object type | Description |
| --- | --- |
| Google Sites pages | Content from New Google Sites only. |
| Page metadata | Publishing dates, modification dates, author or owner information, and access control metadata. |
| Embedded content | Links to embedded Google Docs as URL references. |

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

-   Google Vault API for exporting Google Sites content.
-   Google Drive API for retrieving site files and permissions.
-   Google Cloud Storage API for reading content from generated Vault exports.

## Crawling strategy[​](#crawling-strategy "Direct link to Crawling strategy")

-   The connector supports last-modified site crawling rather than incremental crawling for individual pages.
-   Google Vault organizational quotas and rate limits can affect export and crawl timing.
-   Google Drive identity crawls provide the permissions used to secure Google Sites results.

## Results display[​](#results-display "Direct link to Results display")

-   Glean displays Google Sites pages as searchable documents with their indexed metadata.
-   The connector uses ID-based edit URLs for Sites pages because the API does not provide a canonical human-readable published URL of every result.
-   Editors are directed to the edit version of a site. Non-editors are directed to the published version when available.

## Limitations[​](#limitations "Direct link to Limitations")

-   Only New Google Sites are supported. Classic Sites are not indexed.
-   The connector references ID-based edit URLs rather than human-readable published URLs because of API constraints.
-   Permissions are based on Drive file access. Published-site viewers may not map precisely, and permissions may default to everyone in some cases.
-   Google Vault organizational quotas and rate limits can delay exports.
-   Individual pages do not support incremental crawling; only last-modified site crawling is available.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

-   The connector inherits user and group permissions from the underlying Drive document for each Google Sites page.
-   Glean enforces those permissions at query time so users only see sites they can access in Google Drive.
-   The connector uses service account access and organization-controlled Vault Matter sharing.
-   Data is exported and stored within your organization's cloud environment.

## See also[​](#see-also "Direct link to See also")

-   [Google Sites setup](/connectors/native/gsites/setup)
