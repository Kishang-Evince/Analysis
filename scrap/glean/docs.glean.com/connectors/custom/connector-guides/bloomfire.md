---
url: "https://docs.glean.com/connectors/custom/connector-guides/bloomfire"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/bloomfire"
title: "Bloomfire"
description: "How the Bloomfire custom connector indexes knowledge series, posts, and boards into Glean."
fetched_at: "2026-09-01T13:29:18.855Z"
---
On this page

The Bloomfire custom connector brings your organization's Bloomfire knowledge community into Glean. It indexes series, posts, and boards so employees can search shared knowledge directly from Glean.

note

The Bloomfire custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the Bloomfire connector, you need the following ready before contacting Glean Support:

-   **Bloomfire API key and admin email**: an API key and an administrator account email with read access to your Bloomfire community.
-   **HTTPS network access**: the connector must reach your Bloomfire API endpoint over HTTPS.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from Bloomfire:

-   **Series**: knowledge series published in your Bloomfire community.
-   **Posts**: individual posts within a series.
-   **Boards**: boards used to organize series and posts.
-   **Attachments**: files attached to posts, indexed with the access of the post they belong to.
-   **Users and groups**: indexed for identity and access-control resolution only. They are not searchable as standalone objects.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

Content access is based on group membership in Bloomfire. A series that's scoped to one or more groups is visible only to members of those groups. When a series has no resolvable group, it becomes visible to every user in your Glean tenant. It is not public on the internet.

Permission changes in Bloomfire take effect in Glean after the next scheduled crawl completes. There is no real-time permission sync.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector supports both full and incremental crawls to keep Glean's index current.

-   **Full crawl**: indexes all series, posts, boards, and attachments.
-   **Incremental crawl**: picks up series and posts created or updated since the last crawl.

Both crawl types run on a schedule, and content removed from Bloomfire is removed from Glean's index on the next full crawl.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with the prerequisites above to begin setting up the Bloomfire connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
