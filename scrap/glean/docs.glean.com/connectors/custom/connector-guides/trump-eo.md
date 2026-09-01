---
url: "https://docs.glean.com/connectors/custom/connector-guides/trump-eo"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/trump-eo"
title: "Trump EO"
description: "How the Trump EO custom connector indexes U.S. executive orders into Glean."
fetched_at: "2026-09-01T13:29:20.109Z"
---
On this page

The Trump EO custom connector brings U.S. executive orders from the federal public API into Glean. It indexes the orders and their PDF content so employees can search executive-order information from Glean.

note

The Trump EO custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the Trump EO connector, you need the following ready before contacting Glean Support:

-   **No source credentials**: the connector retrieves executive orders from the federal public API without authentication.
-   **HTTPS network access**: the connector must reach the federal API over HTTPS.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content:

-   **Executive orders**: order titles, signing dates, disposition notes, and PDF content.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

The connector does not resolve source permissions. Content indexed by this connector sets `allow_anonymous_access=True`, so it is visible to every user in the Glean tenant. It is not public on the internet.

Permission changes are not applicable because the source does not provide access controls for this content.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector supports full and incremental crawls to keep executive-order content current.

-   **Full crawl**: indexes the available executive orders.
-   **Incremental crawl**: uses the configured `start_date` as a lower bound on `publication_date` and stops when it reaches that publication-date threshold.

Content removed from the source is removed from Glean during a subsequent crawl. The Glean team manages the crawl schedule and connector configuration.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) to begin setting up the Trump EO connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
