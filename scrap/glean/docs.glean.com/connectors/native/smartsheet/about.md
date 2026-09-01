---
url: "https://docs.glean.com/connectors/native/smartsheet/about"
canonical: "https://docs.glean.com/connectors/native/smartsheet/about"
title: "Smartsheet overview"
description: "Learn what the Glean Smartsheet connector indexes, how it enforces Smartsheet permissions, and how often it crawls."
fetched_at: "2026-09-01T13:29:44.023Z"
---
On this page

Connect your Smartsheet account to Glean so you can search across sheets, dashboards, reports, and workspaces. Glean's Smartsheet connector enforces native Smartsheet permissions at query time, ensuring that users only see content they are authorized to access. All indexed data remains within your organization's GCP environment.

To connect Smartsheet to Glean, see [Setup](/connectors/native/smartsheet/setup).

## Supported features[​](#supported-features "Direct link to Supported features")

-   Glean's Smartsheet connector helps you search key work execution content through unified enterprise search.
-   The connector indexes text content from sheets, dashboards, reports, and workspaces.
-   The connector enforces user and group permissions for each document at query time.
-   The connector supports filtering by document type, owner for sheets, and workspace.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object type | Description |
| --- | --- |
| Sheets | Project planning documents containing rows, columns, attachments, and metadata. |
| Dashboards | Visual documents aggregating data from multiple sources. |
| Reports | Aggregated views across multiple sheets for analysis. |
| Workspaces | Top-level containers for organizing sheets, reports, and dashboards. |

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

-   Identity: Get Users, Get Groups, and Get Token for refreshing access tokens.
-   Content: Get Sheets, Get Reports, Get Sights (dashboards), and Get Workspaces.
-   Permissions: Get shares for sheets, reports, dashboards, and workspaces.

## Crawling strategy[​](#crawling-strategy "Direct link to Crawling strategy")

| Crawl type | Full crawl | Incremental crawl | Identity | Activity | Update rate | Webhook | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Smartsheet | 1h | 10m | 10m | N/A | N/A | N/A | No webhook or activity crawl. Full content crawls are used for updates and deletions. |

-   The connector performs a full content crawl every hour and incremental crawls every 10 minutes.
-   Activity crawls and webhook-based updates are not supported. Permission changes and deletions may take a few hours or, in some cases, days to propagate in Glean.

## Crawl configuration options[​](#crawl-configuration-options "Direct link to Crawl configuration options")

-   The connector performs a full content crawl every hour and incremental crawls every 10 minutes.
-   You can configure which users' content is indexed by controlling who authenticates with Smartsheet.
-   Activity crawls and webhook-based updates are not supported. Full content crawls are used for updates and deletions.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

**Data and metadata ingested**

-   Sheets, dashboards, reports, and workspaces (text content only).
-   User and group permissions for each document.
-   Metadata such as title, workspace, and, for sheets, owner.

**Permission propagation logic**

-   Smartsheet workspace permissions cascade to all contained documents.
-   Glean enforces document-level permissions at query time, matching Smartsheet's access model.

**Security and compliance notes**

-   OAuth 2.0 authentication ensures secure, scoped access.
-   All data remains within your organization's GCP environment.
-   Public or anonymous access is not supported; all access is authenticated and permissioned.

**Data privacy implications**

-   The connector does not index or expose content beyond what users are permitted to access in Smartsheet.
-   All data is processed and stored in compliance with Glean's privacy and security policies.

## Results display[​](#results-display "Direct link to Results display")

In Glean search results, you can facet Smartsheet content by type (sheet, dashboard, report, or workspace), owner for sheets, and workspace. Each result displays the document type icon and relevant metadata.

## Limitations[​](#limitations "Direct link to Limitations")

-   Only text content is indexed. Complex field types such as dropdowns, attachments, and comments may not be fully represented.
-   Owner information is available only for sheets because of Smartsheet API limitations.
-   Dashboards, reports, and workspaces may not display owner information in search results.
-   Documents shared through public view links such as *Anybody can view/edit* are not indexed or surfaced in Glean search.

## See also[​](#see-also "Direct link to See also")

-   [Smartsheet setup](/connectors/native/smartsheet/setup)
-   [Crawl configuration options](#crawl-configuration-options)
-   [Permissions and security](#permissions-and-security)
