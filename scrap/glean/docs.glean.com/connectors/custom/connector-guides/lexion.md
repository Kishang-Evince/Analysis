---
url: "https://docs.glean.com/connectors/custom/connector-guides/lexion"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/lexion"
title: "Lexion"
description: "How the Lexion custom connector indexes documents and tasks into Glean with permissions-based access."
fetched_at: "2026-09-01T13:29:19.691Z"
---
On this page

The Lexion custom connector brings your organization's Lexion contract and document content into Glean. It indexes documents and tasks so employees can search contracts and related work items directly from Glean.

note

The Lexion custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the Lexion connector, you need the following ready before contacting Glean Support:

-   **Lexion API key**: an API key with read access to documents and tasks.
-   **HTTPS network access**: the connector must reach your Lexion API endpoint over HTTPS.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from Lexion:

-   **Documents**: contract and other files stored in Lexion.
-   **Tasks**: work items tracked in Lexion.
-   **Users**: indexed for identity resolution only, so Glean can attribute documents and tasks to their authors and assignees. Users are not searchable as standalone objects.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

The Lexion connector enforces access based on document and task ownership and group membership rather than exposing content to your entire Glean tenant.

### Access control[​](#access-control "Direct link to Access control")

-   Each document and task is visible to its author or assignee, resolved from indexed user records.
-   Each document and task is also visible to a fixed set of groups configured for your organization during setup.
-   Anonymous access is **not enabled by default**. Users only see documents and tasks they are authorized to access.

### Permission sync[​](#permission-sync "Direct link to Permission sync")

-   Permission changes in Lexion take effect in Glean after the next scheduled crawl completes.
-   There is no real-time permission sync. Plan for a delay between updating access in Lexion and seeing those changes reflected in Glean search results.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector runs full crawls only; incremental crawls are not supported.

-   **Full crawl**: indexes all documents and tasks (or a subset, depending on your configuration) on every run.

Each crawl runs on a schedule, and documents or tasks removed from Lexion are removed from Glean's index on the next crawl.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with the prerequisites above to begin setting up the Lexion connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
