---
url: "https://docs.glean.com/connectors/native/marketo/overview"
canonical: "https://docs.glean.com/connectors/native/marketo/overview"
title: "Marketo overview"
description: "Learn what the Marketo connector indexes, how it crawls content, and what it does not index"
fetched_at: "2026-10-13T08:50:04.150Z"
---
On this page

The Marketo connector makes marketing programs and assets searchable in Glean. It uses the Marketo Representational State Transfer (REST) and User Management APIs to index content, build folder and workspace context, and reconstruct source permissions.

## What Glean indexes[​](#what-glean-indexes "Direct link to What Glean indexes")

Glean indexes these Marketo asset types:

| Asset | Indexed content and metadata |
| --- | --- |
| **Programs** | Name, description, status, program type, channel, tags, costs, workspace, folder path, and timestamps |
| **Emails** | Name, HTML content, subject, sender details, status, template, operational status, workspace, folder path, and timestamps |
| **Landing pages** | Name, HTML content, status, template, workspace, folder path, public URL when available, and timestamps |
| **Smart campaigns** | Name, description, status, campaign type, active state, recurrence and qualification metadata, workspace, folder path, and timestamps |
| **Email templates** | Name, HTML content, status, version, workspace, folder path, and timestamps |
| **Landing page templates** | Name, HTML content, status, version, template type, Munchkin setting, workspace, folder path, and timestamps |
| **Forms** | Name, description, field definitions, status, theme, language, locale, workspace, folder path, and timestamps |
| **Snippets** | Name, HTML content, status, workspace, folder path, and timestamps |
| **Static lists** | Name, workspace, folder path, and timestamps when Marketo supplies them |

Glean adds supported facets such as status, workspace, folder, program type, channel, campaign type, active state, template, sender email, operational state, locale, and program tags. Available facets depend on the asset type and the metadata returned by Marketo.

## Content organization[​](#content-organization "Direct link to Content organization")

Marketo folders are context for indexed assets rather than searchable documents. Glean uses the folder hierarchy to create result containers and folder facets. Programs can act as containers for child assets.

Every indexed asset belongs to one Marketo workspace. Glean uses that workspace together with the asset's required capabilities to determine access.

## Crawling and freshness[​](#crawling-and-freshness "Direct link to Crawling and freshness")

The connector defines separate crawl scopes for identity, folders, and each of the nine asset types.

-   **Identity crawls are full only.** They refresh workspaces, roles, users, groups, and group memberships so Glean can remove stale permissions.
-   **Content and folder crawls support full and incremental modes.** Incremental crawls request assets updated since the prior crawl and add or update documents.
-   **Full content crawls remove stale documents.** Run or wait for a full crawl when deleted Marketo assets must disappear from Glean.
-   **Webhooks and activity crawls are not used.** Freshness depends on scheduled crawls and completion of the indexing pipeline.

Full content crawls depend on successful identity and folder full crawls. This order ensures that document permissions and folder context are available before Glean publishes content.

## Result links[​](#result-links "Direct link to Result links")

The connector uses the URLs returned by Marketo for programs and assets. For indexed landing pages, non-draft pages link to their public URL, while draft pages link to their administrative page in Adobe Experience Cloud.

## What Glean does not index[​](#what-glean-does-not-index "Direct link to What Glean does not index")

The connector does not index:

-   Leads, lead activity, or program members
-   Marketo users, roles, or workspaces as searchable documents
-   Provider activity events
-   Assets outside the API-only user's effective workspace and role access
