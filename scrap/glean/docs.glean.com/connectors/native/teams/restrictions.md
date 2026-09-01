---
url: "https://docs.glean.com/connectors/native/teams/restrictions"
canonical: "https://docs.glean.com/connectors/native/teams/restrictions"
title: "Teams crawl restrictions"
description: "<CrawlingRestrictionsOverview"
fetched_at: "2026-09-01T13:29:45.440Z"
---
On this page

-   Use **Greenlist** restrictions to allow crawling only for content that you specify.
-   Use **Redlist** restrictions to prevent Glean from crawling content that you specify.

| Restriction Type | Greenlist | Redlist | Details |
| --- | --- | --- | --- |
| Time-based Restrictions | ✅ | ❌ | Restrict crawling to include/exclude content created/modified/viewed after a certain date. |
| Identity-based Restrictions | ✅ | ❌ | Restrict crawling to include/exclude content created/modified/viewed by specific users or a specific group (plus public content). |
| Content-based Restrictions | ✅ | ❌ | Restrict crawling to include/exclude specific content, documents, messages, or objects. |

## Supported restrictions[​](#supported-restrictions "Direct link to Supported restrictions")

| Restriction | Greenlist | Redlist | Details |
| --- | --- | --- | --- |
| Channel message age | ✅ | ❌ | Set the maximum age of channel messages to crawl, specified in seconds. Messages older than this limit will not be indexed. |
| Entra ID Group | ✅ | ❌ | Restrict crawling of direct messages to only users in a specific Azure AD group (Product Access Group). All public channels will still be crawled. |
| Private chat message age | ✅ | ❌ | Set the maximum age of private chat messages to crawl, specified in seconds. Messages older than this limit will not be indexed. |
| Team | ✅ | ❌ | Restrict crawling to specific teams by Team ID. |
| Channel | ✅ | ❌ | Restrict crawling to specific channels within teams. |

## Limitations[​](#limitations "Direct link to Limitations")

### Channel message age

-   Cannot be applied in the Admin UI.

### Entra ID Group

-   Cannot be applied in the Admin UI.
-   This restriction only applies to direct messages (DMs). Public channels are crawled for all users regardless of group membership.
-   The Object ID of the AD group must be provided, not the group name (for example, 7c77a355-c78c-6362-a195-d2428d285107).

### Private chat message age

-   Cannot be applied in the Admin UI.

### Team

-   Cannot be applied in the Admin UI.
-   If only a team greenlist is set (no channel greenlist), all channels within those teams are crawled.
-   If both a team and channel greenlist are set, only channels that appear in both lists are crawled.

### Channel

-   Cannot be applied in the Admin UI.
-   Channels are specified as comma-separated teamId,channelId pairs delimited by semicolons, for example teamId1,channelId1; teamId2,channelId2.
-   Use teamId,\* to greenlist all channels within a team.
-   If only a channel greenlist is set (no team greenlist), those specific channels are crawled regardless of their parent team.

## Apply restrictions[​](#apply-restrictions "Direct link to Apply restrictions")

| Method | Supported | Details |
| --- | --- | --- |
| Admin UI | ❌ | Restrictions can be applied in the Admin UI under the connector settings. |
| Glean Support | ✅ | Restrictions can be applied by Glean support on request. |

note

When contacting Glean Support to apply these restrictions, use the following config keys:

-   Entra ID Group: `productAccessGroupIds`
-   Team: `teamsGreenlist`
-   Channel: `channelsGreenlist`
-   Private chat message age: `crawl.privateChatsMaxAgeSecs`
-   Channel message age: `crawl.channelMessagesMaxAgeSecs`
