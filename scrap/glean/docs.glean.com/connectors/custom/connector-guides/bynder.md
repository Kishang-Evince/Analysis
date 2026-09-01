---
url: "https://docs.glean.com/connectors/custom/connector-guides/bynder"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/bynder"
title: "Bynder"
description: "How the Bynder custom connector indexes digital assets and collections into Glean."
fetched_at: "2026-09-01T13:29:19.089Z"
---
On this page

The Bynder custom connector brings your organization's Bynder digital asset management (DAM) library into Glean. It indexes assets and their collection membership so employees can search brand and marketing assets directly from Glean.

note

The Bynder custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the Bynder connector, you need the following ready before contacting Glean Support:

-   **Bynder OAuth 1.0a credentials**: a consumer key and secret, and an access token and secret, with asset read access.
-   **Portal and API URLs**: the base URLs for your Bynder portal and its API.
-   **HTTPS network access**: the connector must reach your Bynder portal and API endpoints over HTTPS.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from Bynder:

-   **Assets**: digital assets from your Bynder library, including their metadata.
-   **Collections**: collection membership is indexed as a property on each asset rather than as a separate searchable object.

Users and groups are not indexed by this connector.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

Content indexed by this connector sets `allow_anonymous_access=True`, so it is visible to every user in the Glean tenant. It is not public on the internet.

The connector does not resolve source-level asset permissions, and changes to permissions in Bynder are not reflected in Glean. If your organization needs to restrict access to specific assets or collections, discuss visibility requirements with [Glean Support](https://support.glean.com) before setup.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector supports both full and incremental crawls to keep Glean's index current.

-   **Full crawl**: indexes all assets and their collection membership.
-   **Incremental crawl**: picks up new and updated assets since the last crawl.

Both crawl types run on a schedule to keep the index fresh, and assets removed from Bynder are removed from Glean's index on the next full crawl.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with the prerequisites above to begin setting up the Bynder connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
