---
url: "https://docs.glean.com/connectors/custom/connector-guides/knoiq"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/knoiq"
title: "Knoiq"
description: "How the Knoiq custom connector indexes documents and news articles into Glean."
fetched_at: "2026-09-01T13:29:19.721Z"
---
On this page

The Knoiq custom connector brings your organization's Knoiq knowledge portal content into Glean. It indexes documents and news articles so employees can search internal knowledge and announcements directly from Glean.

note

The Knoiq custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the Knoiq connector, you need the following ready before contacting Glean Support:

-   **Knoiq API access token and site credentials**: the connector authenticates using a challenge-response HMAC scheme, so you need the access token and associated site credentials issued by Knoiq.
-   **Portal URL**: the base URL of your Knoiq site.
-   **HTTPS network access**: the connector must reach your Knoiq portal's API endpoints over HTTPS.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from Knoiq:

-   **Documents**: knowledge documents published in your Knoiq portal.
-   **News articles**: announcements and news content published in your Knoiq portal.

Users and groups are not indexed by this connector.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

Content indexed by this connector sets `allow_anonymous_access=True`, so it is visible to every user in the Glean tenant. It is not public on the internet.

The connector does not resolve source-level document or article permissions, and changes to permissions in Knoiq are not reflected in Glean. If your organization needs to restrict access to specific documents or articles, discuss visibility requirements with [Glean Support](https://support.glean.com) before setup.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector supports both full and incremental crawls to keep Glean's index current.

-   **Full crawl**: indexes all documents and news articles. Runs on initial setup and periodically thereafter.
-   **Incremental crawl**: picks up new and updated documents and articles since the last crawl. This is the default crawl mode after initial setup.

Both crawl types run on a schedule, and content removed from Knoiq is removed from Glean's index on the next full crawl.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with the prerequisites above to begin setting up the Knoiq connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
