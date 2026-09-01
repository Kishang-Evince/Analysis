---
url: "https://docs.glean.com/connectors/custom/connector-guides/bmc-helix"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/bmc-helix"
title: "BMC Helix"
description: "How the BMC Helix custom connector indexes Knowledge Management documents into Glean."
fetched_at: "2026-09-01T13:29:18.868Z"
---
On this page

The BMC Helix custom connector brings your organization's BMC Helix Knowledge Management content into Glean. It indexes knowledge documents so employees can search IT service management content directly from Glean.

note

The BMC Helix custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the BMC Helix connector, you need the following ready before contacting Glean Support:

-   **API account with Knowledge Management read access**: credentials for an account authorized to read Knowledge Management documents through the BMC Helix API.
-   **HTTPS network access**: the connector must reach your BMC Helix API endpoint over HTTPS.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from BMC Helix:

-   **Documents**: knowledge documents from BMC Helix Knowledge Management.

Users are indexed for author attribution only. Groups are not indexed by this connector.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

Content indexed by this connector sets `allow_anonymous_access=True`, so it is visible to every user in the Glean tenant. It is not public on the internet.

The connector does not resolve source-level document permissions, and changes to permissions in BMC Helix are not reflected in Glean. If your organization needs to restrict access to specific documents, discuss visibility requirements with [Glean Support](https://support.glean.com) before setup.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector supports both full and incremental crawls to keep Glean's index current.

-   **Full crawl**: indexes all knowledge documents.
-   **Incremental crawl**: picks up documents created or updated since the last crawl.

Both crawl types run on a schedule, and documents removed from BMC Helix are removed from Glean's index on the next full crawl.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with the prerequisites above to begin setting up the BMC Helix connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
