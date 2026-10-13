---
url: "https://docs.glean.com/connectors/custom/connector-guides/m-files"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/m-files"
title: "M-Files"
description: "How the M-Files custom connector indexes vault objects and attached files into Glean."
fetched_at: "2026-10-13T08:49:41.580Z"
---
On this page

The M-Files custom connector brings content from an M-Files vault into Glean. It indexes vault object metadata and attached files so employees can find governed enterprise content while preserving source permissions.

note

The Glean team sets up the M-Files custom connector. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the M-Files connector, you need the following ready before contacting Glean Support:

-   **Microsoft Entra ID credentials**: application details and credentials for a dedicated user that can authenticate to the M-Files vault.
-   **M-Files read access**: access to vault structure, object metadata, and attached file content.
-   **Permissioning extension**: a customer-built M-Files Vault Application Framework (VAF) extension that returns documents, users, groups, and group memberships, with an API key for access.
-   **Connection details**: the M-Files API and permissioning-extension URLs, plus the vault identifier used for links.
-   **HTTPS network access**: the connector must reach the M-Files and permissioning-extension endpoints.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from M-Files:

-   **Vault objects**: metadata for the object types configured for the deployment.
-   **Attached files**: the connector creates a separate searchable document for each attached file, subject to the configured file-size limit.

The connector also adds M-Files users, groups, and group memberships for identity and permission resolution. It does not make them searchable content.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

Public vault objects set `allow_anonymous_access=True`, so they are visible to every user in the Glean tenant. They are not public on the internet.

Other content sets `allow_anonymous_access=False` and is available only to the users and groups returned by the VAF permissioning extension. Permission changes take effect after the next crawl.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector supports incremental and full crawls:

-   **Incremental crawl**: adds or updates changed vault objects and files. It does not remove content that disappears from M-Files.
-   **Full crawl**: indexes all configured vault content and removes content that the source no longer returns.

The Glean team configures the crawl schedule and can enable full crawls for your deployment.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with these prerequisites to begin setting up the M-Files connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
