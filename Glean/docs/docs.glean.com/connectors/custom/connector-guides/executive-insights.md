---
url: "https://docs.glean.com/connectors/custom/connector-guides/executive-insights"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/executive-insights"
title: "Executive orders"
description: "How the Executive orders custom connector indexes executive orders and PDF content."
fetched_at: "2026-10-13T08:49:41.066Z"
---
On this page

The Executive orders custom connector brings executive orders from a public API into Glean. It indexes the orders and their PDF content so employees can search executive-order information in Glean.

note

The Executive orders custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the Executive orders connector, you need the following ready before contacting Glean Support:

-   **No source credentials**: the connector retrieves executive orders from the public API without authentication.
-   **HTTPS network access**: the connector must reach the public API over HTTPS.

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

Contact [Glean Support](https://support.glean.com) to begin setting up the Executive orders connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean API reference](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
