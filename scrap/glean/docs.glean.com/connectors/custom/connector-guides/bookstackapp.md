---
url: "https://docs.glean.com/connectors/custom/connector-guides/bookstackapp"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/bookstackapp"
title: "BookStack"
description: "How the BookStack custom connector indexes shelves, books, chapters, and pages into Glean with role-based access."
fetched_at: "2026-09-01T13:29:19.104Z"
---
On this page

The BookStack custom connector brings your organization's BookStack wiki into Glean. It indexes shelves, books, chapters, and pages so employees can search internal documentation directly from Glean.

note

The BookStack custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the BookStack connector, you need the following ready before contacting Glean Support:

-   **BookStack API token**: an API token ID and secret with read access to shelves, books, chapters, and pages.
-   **HTTPS network access**: the connector must reach your BookStack instance's API endpoint over HTTPS.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from BookStack:

-   **Shelves**: top-level collections that group related books.
-   **Books**: collections of chapters and pages.
-   **Chapters**: groupings of pages within a book.
-   **Pages**: individual wiki pages.
-   **Users and roles**: indexed for access-control resolution only. Each role is represented as a Glean group. They are not searchable as standalone objects.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

The BookStack connector enforces access based on the role permissions configured in BookStack rather than exposing content to your entire Glean tenant.

### Access control[​](#access-control "Direct link to Access control")

-   Each shelf, book, chapter, and page is visible to the roles granted access to it in BookStack.
-   Permissions are inherited down the content hierarchy: a page inherits access from its chapter, which inherits from its book, which inherits from its shelf, unless overridden at a lower level.
-   Content that BookStack marks as publicly viewable, with no role restrictions, sets `allow_anonymous_access=True` and becomes visible to every user in your Glean tenant. It is not public on the internet.

### Permission sync[​](#permission-sync "Direct link to Permission sync")

-   Permission changes in BookStack take effect in Glean after the next scheduled crawl completes.
-   There is no real-time permission sync. Plan for a delay between updating access in BookStack and seeing those changes reflected in Glean search results.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector supports both full and incremental crawls to keep Glean's index current.

-   **Full crawl**: indexes all shelves, books, chapters, and pages.
-   **Incremental crawl**: picks up content created or updated within a configurable lookback window since the last crawl.

Both crawl types run on a schedule, and content removed from BookStack is removed from Glean's index on the next full crawl.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with the prerequisites above to begin setting up the BookStack connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
