---
url: "https://docs.glean.com/connectors/custom/connector-guides/groove"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/groove"
title: "Groove"
description: "How the Groove custom connector indexes sales flows, actions, templates, and CRM contacts into Glean."
fetched_at: "2026-10-13T08:49:41.085Z"
---
On this page

The Groove custom connector brings Groove sales engagement content into Glean. It indexes sales flows, actions, email templates, and customer relationship management (CRM) contacts so employees can find sales resources and activity in Glean.

note

The Glean team sets up the Groove custom connector. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the Groove connector, you need the following ready before contacting Glean Support:

-   **Groove OAuth credentials**: a client ID and client secret for an OAuth 2.0 application.
-   **API scopes**: `users.read`, `flows.read`, `people.read`, `actions.read`, `template_folders.read`, and `templates.read`.
-   **HTTPS network access**: the connector must reach the Groove Engine API and Groove web application.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from Groove:

-   **Flows**: sales engagement flows and their sharing information. Deleted flows are not indexed.
-   **Actions**: activities associated with creators and assignees.
-   **Email templates**: reusable sales email content.
-   **People**: CRM contacts and leads associated with flows.

The connector indexes Groove users for identity and permission resolution, not as searchable content. It does not index groups.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

By default, all indexed content sets `allow_anonymous_access=False`. Flows are available to their owners, users who receive shared access, and any additional users configured during deployment. Actions are available to their creators, assignees, and any additional configured users. Email templates and people are available to all indexed Groove users.

During setup, Glean can instead configure all indexed Groove content to set `allow_anonymous_access=True`. This makes the content visible to every user in the Glean tenant. It does not make the content public on the internet.

Permission changes take effect after the next full crawl.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

Every Groove crawl is a full replacement of the previously indexed content. Each crawl retrieves the current flows, actions, email templates, and people, then removes content that the source no longer returns.

The Glean team configures the crawl schedule for your deployment.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with these prerequisites to begin setting up the Groove connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
