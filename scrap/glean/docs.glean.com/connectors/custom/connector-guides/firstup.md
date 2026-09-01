---
url: "https://docs.glean.com/connectors/custom/connector-guides/firstup"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/firstup"
title: "Firstup"
description: "How the Firstup custom connector indexes employee communications channels and content into Glean."
fetched_at: "2026-09-01T13:29:19.271Z"
---
On this page

The Firstup custom connector brings your organization's Firstup employee communications into Glean. It indexes channels and published content so employees can search internal communications directly from Glean.

note

The Firstup custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the Firstup connector, you need the following ready before contacting Glean Support:

-   **Firstup API client credentials**: an OAuth client ID and client secret with API access to your Firstup instance.
-   **HTTPS network access**: the connector must reach your Firstup API endpoints over HTTPS.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from Firstup:

-   **Channels**: communication channels used to organize content.
-   **Content**: posts and published content within channels.

Users and groups are indexed for identity and permission resolution only and are not searchable as standalone objects.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

Channel and content access is based on group membership in Firstup. When a channel or piece of content has no resolvable group, it becomes visible to every user in your Glean tenant. It is not public on the internet.

Permission changes in Firstup take effect after the next crawl.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector supports both full and incremental crawls to keep Glean's index current.

-   **Full crawl**: indexes all channels and content. Runs on initial setup and periodically thereafter.
-   **Incremental crawl**: picks up new and updated content since the last crawl to keep the index fresh between full crawls.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with the prerequisites above to begin setting up the Firstup connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
