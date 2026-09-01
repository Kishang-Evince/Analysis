---
url: "https://docs.glean.com/connectors/custom/connector-guides/interact"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/interact"
title: "Interact"
description: "How the Interact custom connector indexes intranet pages, documents, and people into Glean with permissions-based access."
fetched_at: "2026-09-01T13:29:19.492Z"
---
On this page

The Interact custom connector brings your organization's Interact intranet content into Glean. It indexes active pages, documents, and user profiles so employees can search across internal communications, knowledge bases, and people directories directly from Glean.

note

The Interact custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the Interact connector, you need the following ready before contacting Glean Support:

-   **Interact tenant API key**: generate an API key from your Interact admin console.
-   **Interact tenant ID**: your organization's unique Interact tenant identifier.
-   **HTTPS network access**: the connector must reach Interact's API endpoints over HTTPS.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from Interact:

-   **Pages**: active intranet pages, including news, articles, and knowledge base content.
-   **Documents**: files and attachments published within Interact.
-   **Users**: employee profiles indexed for identity resolution only. Glean uses them to enforce Interact permissions and to attribute pages and documents to their authors, and they are not searchable as standalone objects.

Sections within pages are used to resolve permissions and are not indexed as standalone searchable documents.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

The Interact connector enforces your organization's Interact permissions in Glean search results.

### Access control[​](#access-control "Direct link to Access control")

-   Glean respects Interact's page-level and document-level permissions. Users only see content they are authorized to access in Interact.
-   User profiles are indexed to resolve ACLs. Glean maps Interact user identities to Glean user accounts to enforce access control.
-   Anonymous access is **not enabled by default**. Content that requires authentication in Interact also requires authentication in Glean.

### Permission sync[​](#permission-sync "Direct link to Permission sync")

-   Permission changes in Interact take effect in Glean after the next scheduled crawl completes.
-   There is no real-time permission sync. Plan for a delay between updating access in Interact and seeing those changes reflected in Glean search results.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector runs scheduled crawls to keep Glean's index current with your Interact environment.

-   **Full crawl**: indexes all active pages, documents, and users. Runs on initial setup and periodically thereafter.
-   **Incremental crawl**: picks up changes since the last crawl to keep the index fresh between full crawls.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with the prerequisites above to begin setting up the Interact connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
