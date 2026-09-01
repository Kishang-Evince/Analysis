---
url: "https://docs.glean.com/connectors/custom/connector-guides/sharpr"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/sharpr"
title: "Sharpr"
description: "How the Sharpr custom connector indexes insight posts and attachments into Glean."
fetched_at: "2026-09-01T13:29:19.917Z"
---
On this page

The Sharpr custom connector brings your organization's Sharpr insight content into Glean. It indexes posts and their attachments so employees can search market intelligence and other shared insights from Glean.

note

The Sharpr custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the Sharpr connector, you need the following ready before contacting Glean Support:

-   **Sharpr API credentials**: the credentials required to authenticate to your Sharpr account.
-   **HTTPS network access**: the connector must reach the Sharpr API over HTTPS.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from Sharpr:

-   **Insight posts**: published Sharpr posts and their content.
-   **Attachments**: files attached to indexed posts.

Users are indexed for author attribution. They are not searchable as standalone content and are not used to apply source-level permissions.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

The connector does not currently resolve source permissions from Sharpr. Contact [Glean Support](https://support.glean.com) to discuss whether permission-aware indexing is feasible for your deployment.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector runs full crawls to keep indexed posts and attachments current.

Content removed from Sharpr is removed from Glean during a subsequent crawl. The Glean team manages the crawl schedule and connector configuration.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with the prerequisites above to begin setting up the Sharpr connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
