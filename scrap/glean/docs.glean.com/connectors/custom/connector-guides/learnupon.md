---
url: "https://docs.glean.com/connectors/custom/connector-guides/learnupon"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/learnupon"
title: "LearnUpon"
description: "How the LearnUpon custom connector indexes LMS courses and resources into Glean."
fetched_at: "2026-09-01T13:29:19.705Z"
---
On this page

The LearnUpon custom connector brings your organization's LearnUpon learning management system (LMS) catalog into Glean. It indexes courses and resources for a single portal so employees can search LMS content directly from Glean.

note

The LearnUpon custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the LearnUpon connector, you need the following ready before contacting Glean Support:

-   **LearnUpon OAuth client**: a client ID and client secret for the target portal.
-   **Portal subdomain**: the subdomain of your LearnUpon portal (for example, `yourcompany` in `yourcompany.learnupon.com`).
-   **HTTPS network access**: the connector must reach your LearnUpon portal's API endpoints over HTTPS.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from LearnUpon:

-   **Courses**: published, non-archived, cataloged courses from your portal.
-   **Resources**: learning resources associated with the portal.

Users are indexed for identity resolution only and are not searchable as standalone objects. Group-based permissions are not currently supported for this connector.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

All indexed LearnUpon courses and resources are visible to every user of the Glean data source. The connector does not resolve group-level source permissions.

If your organization needs to restrict access to specific courses or resources, discuss visibility requirements with [Glean Support](https://support.glean.com) before setup.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector performs full crawls to keep Glean's index current.

-   **Full crawl**: indexes all published, cataloged courses and their resources. Runs on initial setup and periodically thereafter.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with the prerequisites above to begin setting up the LearnUpon connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
