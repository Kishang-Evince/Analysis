---
url: "https://docs.glean.com/connectors/custom/connector-guides/zoomin"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/zoomin"
title: "Zoomin"
description: "How the Zoomin custom connector indexes technical documentation and attachments into Glean."
fetched_at: "2026-09-01T13:29:20.068Z"
---
On this page

The Zoomin custom connector brings your organization's Zoomin technical documentation into Glean. It indexes documentation bundles, topics, and attachments so employees can search product and support content from Glean.

note

The Zoomin custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the Zoomin connector, you need the following ready before contacting Glean Support:

-   **Zoomin API credentials**: an access key and secret key for signed API requests.
-   **HTTPS network access**: the connector must reach your Zoomin portal and API endpoints over HTTPS.
-   **Archived-content preference**: tell Glean whether archived content should be included in indexing.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from Zoomin:

-   **Bundles**: documentation collections and their available metadata.
-   **Topics**: documentation topics within indexed bundles.
-   **Attachments**: files associated with documentation bundles.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

The connector does not resolve source permissions from Zoomin. Content indexed by this connector sets `allow_anonymous_access=True`, so it is visible to every user in the Glean tenant. It is not public on the internet.

Permission changes in Zoomin are not reflected in Glean.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector supports full and incremental crawls.

-   **Full crawl**: indexes the available bundles, topics, and attachments.
-   **Incremental crawl**: picks up bundles changed since the previous crawl and refreshes their topics and attachments.

Archived-content handling is configured for the connector. Content removed from Zoomin is removed from Glean during a subsequent crawl. The Glean team manages the crawl schedule and connector configuration.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with the prerequisites above to begin setting up the Zoomin connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
