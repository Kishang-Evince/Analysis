---
url: "https://docs.glean.com/connectors/custom/connector-guides/frontify"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/frontify"
title: "Frontify"
description: "How the Frontify custom connector indexes brand assets, libraries, and guidelines into Glean."
fetched_at: "2026-09-01T13:29:19.505Z"
---
On this page

The Frontify custom connector brings your organization's Frontify brand management platform into Glean. It indexes brand assets, libraries, and guidelines so employees can search brand and marketing content directly from Glean.

note

The Frontify custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the Frontify connector, you need the following ready before contacting Glean Support:

-   **Frontify API token**: an API token with library, asset, and guideline permissions.
-   **HTTPS network access**: the connector must reach your Frontify API endpoint over HTTPS.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from Frontify:

-   **Brands**: brand libraries configured in your Frontify account.
-   **Assets**: digital assets stored in your Frontify libraries.
-   **Guidelines**: brand guideline documents.
-   **Guideline pages**: individual pages within a guideline, indexed with the access of the guideline they belong to.
-   **Users and groups**: indexed for identity and access-control resolution only. They are not searchable as standalone objects.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

Content access is based on group membership and library or project permissions in Frontify. When an asset, library, or guideline has no resolvable group or permission, it becomes visible to every user in your Glean tenant. It is not public on the internet.

Permission changes in Frontify take effect in Glean after the next scheduled crawl completes. There is no real-time permission sync.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector runs full crawls only; incremental crawls are not supported.

-   **Full crawl**: indexes all brands, assets, libraries, guidelines, and guideline pages on every run.

Each crawl runs on a schedule, and content removed from Frontify is removed from Glean's index on the next crawl.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with the prerequisites above to begin setting up the Frontify connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
