---
url: "https://docs.glean.com/connectors/native/asana/about"
canonical: "https://docs.glean.com/connectors/native/asana/about"
title: "Asana overview"
description: "Learn what the Glean Asana connector indexes, how it enforces Asana user access permissions, and how often it crawls."
fetched_at: "2026-09-01T13:29:22.150Z"
---
On this page

Connect your Asana workspace to Glean so you can search across tasks, comments, and projects. Glean’s Asana connector enforces Asana user access permissions, ensuring that you can only see content you are authorized to view at search time. All indexed data remains within the cloud environment of your organization.

To connect Asana to Glean, see [Setup](/connectors/native/asana/setup).

## Supported features[​](#supported-features "Direct link to Supported features")

-   Glean's Asana connector helps you ingest key information for unified enterprise search.
-   The connector pulls content from your Asana instance, supports user-level permission controls, and offers redlisting capabilities to exclude specific projects from search.
-   The Glean connector does not modify or write any data to Asana-read-only data and access is strictly enforced.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Objects | Description |
| --- | --- |
| Tasks | All indexed tasks, project-associated |
| Comments | Comments attached to supported tasks |
| Projects | Project metadata for display and faceting |

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

-   `/api/1.0/projects`: For crawling project data.
-   `/api/1.0/tasks`: For task-level crawl and indexing.
-   `/api/1.0/users`, `/api/1.0/teams`, `/api/1.0/organizations`: For identity mapping and permission enforcement.
-   `/api/1.0/workspaces`: Workspace context for scoping.
-   `/api/1.0/events`: Captures activity on indexed tasks.

## Crawling strategy[​](#crawling-strategy "Direct link to Crawling strategy")

| Crawl type | Full Crawl | Incremental Crawl | People Data | Activity | Update Rate | Webhook | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Tasks | Yes | Yes | Yes | Yes | On change | Yes | Only project-associated tasks can be crawled. Webhook limit applies. |
| Comments | Yes | Yes | Yes | Yes | On change | Yes | Comments only on indexed tasks. |
| Projects | Yes | Yes | Yes | Yes | On change | Yes | Projects must not be redlisted to be crawled. |

-   Full crawl frequency is determined by the Glean configuration and typical corpus size. Enterprise customers with very large instances need to plan for multi-day initial crawls.
-   Webhook limitation requires monitoring for skipped or delayed updates on large workspaces.

## Limitations[​](#limitations "Direct link to Limitations")

-   Glean can only index Asana tasks that are associated with a project, and for private projects, the Glean administrator/service account must be explicitly added. Tasks that are private and have no project association cannot be indexed on any edition.
-   Due to Asana’s limit of 10,000 webhooks per user per OAuth app, we register webhooks on up to 10,000 projects. If your workspace has more than 10,000 projects, we randomly select 10,000 to monitor. Projects outside this set do not receive real‑time webhook updates.
-   Portfolios, forms, messages are not supported and will not be indexed.
-   Glean does not ingest Asana custom task fields or expose them for search.

## FAQs[​](#faqs "Direct link to FAQs")

### Why isn't Glean associating all of the underlying tasks to a requested project?

At this time, there is a known limitation with indexing of projects to the underlying tasks. Results may vary within Glean Assistant and Glean Agents.

## See also[​](#see-also "Direct link to See also")

-   [Asana setup](/connectors/native/asana/setup)
