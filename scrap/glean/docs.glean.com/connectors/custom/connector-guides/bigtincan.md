---
url: "https://docs.glean.com/connectors/custom/connector-guides/bigtincan"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/bigtincan"
title: "BigTinCan"
description: "How the BigTinCan custom connector indexes hubs, channels, stories, and files into Glean."
fetched_at: "2026-09-01T13:29:18.881Z"
---
On this page

The BigTinCan custom connector brings your organization's BigTinCan content into Glean. It indexes hubs, channels, stories, and optional file attachments so employees can find sales enablement and other shared content from Glean.

note

The BigTinCan custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the BigTinCan connector, you need the following ready before contacting Glean Support:

-   **BigTinCan API credentials**: credentials with read access to the hubs and content you want to index.
-   **HTTPS network access**: the connector must reach your BigTinCan instance and its API endpoints over HTTPS.
-   **Attachment requirements**: tell Glean whether you want to index file attachments and any attachment-size requirements.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from BigTinCan:

-   **Tabs**: hub tabs and their channel relationships.
-   **Channels**: public and private channels.
-   **Stories**: stories published in indexed channels.
-   **File attachments**: files attached to stories, when attachment indexing is enabled and the files meet the configured size limit.

Users and groups are indexed for access-control resolution when permissions are enabled. They are not searchable as standalone content.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

When permission mapping is enabled, public channels and tabs are available to users with access to the BigTinCan datasource, and private channels use channel-specific group membership. Permission changes take effect after the next full crawl.

When permission mapping is disabled, content indexed by this connector sets `allow_anonymous_access=True`, so it is visible to every user in the Glean tenant. It is not public on the internet.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector runs full crawls to index current BigTinCan content. Each crawl can include tabs, channels, stories, and configured file attachments.

Content removed from BigTinCan is removed from Glean during a subsequent crawl. The Glean team manages the crawl schedule and connector configuration.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with the prerequisites above to begin setting up the BigTinCan connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
