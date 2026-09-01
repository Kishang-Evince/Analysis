---
url: "https://docs.glean.com/connectors/custom/connector-guides/zulip"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/zulip"
title: "Zulip"
description: "How the Zulip custom connector indexes streams, topics, and messages into Glean."
fetched_at: "2026-09-01T13:29:20.301Z"
---
On this page

The Zulip custom connector brings your organization's Zulip chat content into Glean. It indexes public streams, topics, messages, and attachments so employees can search across team conversations directly from Glean.

note

The Zulip custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the Zulip connector, you need the following ready before contacting Glean Support:

-   **Zulip bot or user email**: the email address associated with the Zulip account used for API access.
-   **Zulip API key**: generate an API key from your Zulip settings or admin console.
-   **HTTPS network access**: the connector must reach your Zulip server's API endpoints over HTTPS.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from Zulip:

-   **Streams (channels)**: the public streams your organization uses for topic-based conversations. Private streams are not indexed.
-   **Topics**: threaded conversation topics within streams.
-   **Messages**: individual messages within topics.
-   **Attachments**: files shared in messages.
-   **Users**: user profiles used for sender resolution.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

The connector indexes public streams only, so private streams never reach Glean.

Content indexed by this connector sets `allow_anonymous_access=True`, so it is visible to every user in the Glean tenant. It is not public on the internet. The connector does not enforce Zulip's stream-level access controls, and permission changes in Zulip are not reflected in Glean.

If your organization needs to keep specific public streams out of the index, discuss visibility requirements with [Glean Support](https://support.glean.com) before setup.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector supports both full and incremental crawls to keep Glean's index current.

-   **Full crawl**: indexes all public streams, topics, messages, attachments, and users. Runs on initial setup and periodically thereafter. Because the incremental crawl only adds new messages, the full crawl is what reconciles edits and deletions.
-   **Incremental crawl**: picks up messages posted since the last crawl, using a persisted cursor. It does not pick up edits or deletions to messages that were already indexed.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with the prerequisites above to begin setting up the Zulip connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
