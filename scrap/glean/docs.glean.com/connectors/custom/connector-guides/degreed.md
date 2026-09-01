---
url: "https://docs.glean.com/connectors/custom/connector-guides/degreed"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/degreed"
title: "Degreed"
description: "How the Degreed custom connector indexes learning content, pathways, and skill plans into Glean."
fetched_at: "2026-09-01T13:29:19.285Z"
---
On this page

The Degreed custom connector brings your organization's Degreed learning content into Glean. It indexes content items, pathways, and skill plans so employees can search across learning resources directly from Glean.

note

The Degreed custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the Degreed connector, you need the following ready before contacting Glean Support:

-   **Degreed OAuth2 client credentials**: a client ID and client secret with API access to your Degreed tenant.
-   **API scopes**: the connector requires the following scopes: `content:read`, `pathways:read`, `skill_plans:read`, `users:read`, and `groups:read`.
-   **HTTPS network access**: the connector must reach Degreed's API endpoints over HTTPS.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from Degreed:

-   **Content**: learning content items such as courses, videos, articles, and books.
-   **Pathways**: curated learning paths that group content into a structured sequence.
-   **Skill plans** (optional): skill-based development plans, when enabled.
-   **Users and groups**: user and group records used for visibility resolution.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

The Degreed connector resolves content visibility based on group membership, authorship, and organization-level access settings in Degreed.

-   Content marked as public or organization-wide is visible to all users in your Glean tenant.
-   Content restricted to specific groups or authors is visible only to the corresponding users.
-   Content with unknown visibility is excluded from the index.

Permission changes in Degreed take effect in Glean after the next scheduled crawl completes.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector supports both full and incremental crawls to keep Glean's index current.

-   **Full crawl**: indexes all content, pathways, skill plans, users, and groups. Runs on initial setup and periodically thereafter.
-   **Incremental crawl**: picks up new and updated content since the last crawl, when incremental crawling is enabled.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with the prerequisites above to begin setting up the Degreed connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
