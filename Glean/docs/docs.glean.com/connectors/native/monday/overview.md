---
url: "https://docs.glean.com/connectors/native/monday/overview"
canonical: "https://docs.glean.com/connectors/native/monday/overview"
title: "Monday.com overview"
description: "Understand the Monday.com content, permissions, and refresh behavior that Glean supports"
fetched_at: "2026-10-13T08:50:05.553Z"
---
On this page

The Monday.com connector indexes workspaces, boards, items, subitems, updates, and replies. Glean uses OAuth 2.0 and enforces each user's Monday.com viewing permissions.

## See what Glean indexes[​](#see-what-glean-indexes "Direct link to See what Glean indexes")

Glean indexes:

-   Workspaces that connected users can access
-   Public boards in open workspaces
-   Items and first-level subitems from indexed boards

After a user connects Monday.com in Glean, Glean also indexes private boards, shareable boards, and public boards in closed workspaces that the user can access.

Glean indexes each item and subitem as a separate search result, including its title and nonempty column values. Item results include Board and Workspace filters, and subitem results identify their parent item. Selecting a result opens the item or subitem in Monday.com.

Monday.com calls comments *updates* and *replies*. Glean adds updates and replies to the related board, item, or subitem document. Users can search this text through the parent document, but Glean doesn't create separate search results for updates or replies.

## Preserve Monday.com permissions[​](#preserve-mondaycom-permissions "Direct link to Preserve Monday.com permissions")

Items and subitems use their board's permissions. Updates and replies use their parent document's permissions. Glean shows a result only to users who can access its board in Monday.com.

## Authorize individual accounts[​](#authorize-individual-accounts "Direct link to Authorize individual accounts")

Each user must authorize Monday.com in Glean so Glean can index all content that the user can access. New authorizations grant Glean access to updates and replies.

Existing Monday.com connections might not grant Glean access to updates and replies. To grant this access, authorize Monday.com again. Until then, Glean continues to index available boards and items, but not their updates or replies. See [Monday.com setup](/connectors/native/monday/setup#authorize-individual-accounts).

## Understand refresh behavior[​](#understand-refresh-behavior "Direct link to Understand refresh behavior")

Glean performs a full content crawl every hour. The connector doesn't use incremental crawls. Glean reflects content and permission changes after the next successful full content crawl. After that crawl, Glean also removes deleted items and the text of deleted updates or replies from search.

## Limitations[​](#limitations "Direct link to Limitations")

-   Glean indexes one level of subitems from standard boards. The connector doesn't support Monday.com multi-level boards.
-   Glean doesn't index Monday workdocs or dashboards.
