---
url: "https://docs.glean.com/connectors/custom/connector-guides/alation"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/alation"
title: "Alation"
description: "How the Alation custom connector indexes data catalog objects, articles, and documents into Glean."
fetched_at: "2026-09-01T13:29:18.672Z"
---
On this page

The Alation custom connector brings your organization's Alation Data Catalog content into Glean. It indexes catalog objects, articles, and documents so employees can search across data assets and governance content directly from Glean.

note

The Alation custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the Alation connector, you need the following ready before contacting Glean Support:

-   **Alation API credentials**: an admin or service account with API access. The connector supports refresh-token or token-creation authentication.
-   **API token ID**: the token identifier used for API authentication.
-   **HTTPS network access**: the connector must reach your Alation instance's API endpoints over HTTPS.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from Alation:

-   **Datasources, schemas, tables, and columns**: core data catalog objects that describe your organization's data assets.
-   **Articles**: knowledge articles authored in Alation.
-   **Documents and folders**: structured documentation within the catalog.
-   **Domains**: organizational groupings for catalog governance.
-   **Queries**: saved queries stored in Alation.
-   **Tags**: metadata tags applied to catalog objects.
-   **Terms** (optional): business glossary terms, when enabled.

Users and groups are indexed for identity resolution only and are not searchable as standalone objects.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

All indexed Alation catalog content is visible to every user in your Glean tenant. The connector does not resolve source-level permissions from Alation.

If your organization needs to restrict access to specific catalog objects, discuss visibility requirements with [Glean Support](https://support.glean.com) before setup.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector supports both full and incremental crawls to keep Glean's index current.

-   **Full crawl**: indexes all catalog objects, articles, documents, queries, and tags. Runs on initial setup and periodically thereafter.
-   **Incremental crawl**: picks up new and updated objects since the last crawl to keep the index fresh between full crawls.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with the prerequisites above to begin setting up the Alation connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
