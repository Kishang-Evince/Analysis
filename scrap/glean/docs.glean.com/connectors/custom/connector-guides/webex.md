---
url: "https://docs.glean.com/connectors/custom/connector-guides/webex"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/webex"
title: "Webex"
description: "How the Webex custom connector indexes team messages, spaces, and memberships into Glean with permissions-based access."
fetched_at: "2026-09-01T13:29:20.097Z"
---
On this page

The Webex custom connector brings Cisco Webex Messaging content into Glean. It indexes messages, spaces, teams, and memberships so employees can search across conversations and team collaboration directly from Glean.

note

The Webex custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the Webex connector, you need the following ready before contacting Glean Support:

-   **Webex authentication credentials**: the connector supports OAuth refresh tokens or personal access tokens. Obtain the appropriate token type from your Webex admin console.
-   **HTTPS network access**: the connector must reach Webex APIs over HTTPS.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from Webex Messaging:

-   **Messages**: individual messages and threaded replies within spaces.
-   **Spaces (rooms)**: team spaces and group rooms where conversations happen.
-   **Teams**: organizational groupings that contain one or more spaces.
-   **Memberships**: user membership records used for ACL resolution.

Direct messages (DMs) without a room ID are excluded from anonymous access.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

The Webex connector enforces your organization's Webex access controls in Glean search results.

### Public and private spaces[​](#public-and-private-spaces "Direct link to Public and private spaces")

-   **Public spaces**: content in public rooms may be accessible to all users in the organization. Whether anonymous access is allowed depends on your Webex configuration.
-   **Private spaces**: content in private rooms is restricted to room members. Only users who are members of a private space see its messages in Glean search results.

### Access control[​](#access-control "Direct link to Access control")

-   Glean maps Webex user identities to Glean user accounts using membership data.
-   Permission enforcement mirrors the access model in Webex. If a user cannot see a space in Webex, they cannot see its content in Glean.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector supports both full and incremental crawls to keep Glean's index current.

-   **Full crawl**: indexes all teams, spaces, memberships, and messages. Uses a configurable historical lookback window to control how far back messages are indexed.
-   **Incremental crawl**: picks up new and updated messages since the last crawl. For rooms, incrementals use a cursor to efficiently fetch only changed content.

Both crawl types run on a schedule to keep the index fresh.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with the prerequisites above to begin setting up the Webex connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
