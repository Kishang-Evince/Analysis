---
url: "https://docs.glean.com/connectors/custom/connector-guides/manageengine"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/manageengine"
title: "ManageEngine"
description: "How the ManageEngine custom connector indexes ServiceDesk Plus knowledge-base solutions into Glean."
fetched_at: "2026-09-01T13:29:19.890Z"
---
On this page

The ManageEngine custom connector brings your organization's ManageEngine ServiceDesk Plus knowledge base into Glean. It indexes knowledge-base solutions so employees can search IT helpdesk articles directly from Glean.

note

The ManageEngine custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the ManageEngine connector, you need the following ready before contacting Glean Support:

-   **Zoho OAuth client**: a client ID, client secret, and refresh token with ServiceDesk Plus API access.
-   **Portal URL**: the base URL and portal identifier for your ServiceDesk Plus instance.
-   **HTTPS network access**: the connector must reach your Zoho accounts and ServiceDesk Plus portal over HTTPS.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from ManageEngine ServiceDesk Plus:

-   **Solutions**: knowledge-base articles from your ServiceDesk Plus portal.

Users and groups are not indexed by this connector.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

Content indexed by this connector sets `allow_anonymous_access=True`, so it is visible to every user in the Glean tenant. It is not public on the internet.

The connector does not resolve source-level solution permissions, and changes to permissions in ServiceDesk Plus are not reflected in Glean. If your organization needs to restrict access to specific solutions, discuss visibility requirements with [Glean Support](https://support.glean.com) before setup.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector supports both full and incremental crawls to keep Glean's index current.

-   **Full crawl**: indexes all knowledge-base solutions.
-   **Incremental crawl**: picks up solutions modified within a configurable lookback window since the last crawl.

Both crawl types run on a schedule to keep the index fresh.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with the prerequisites above to begin setting up the ManageEngine connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
