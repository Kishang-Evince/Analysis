---
url: "https://docs.glean.com/connectors/native/onedrive/restrictions"
canonical: "https://docs.glean.com/connectors/native/onedrive/restrictions"
title: "OneDrive crawl restrictions"
description: "<CrawlingRestrictionsOverview"
fetched_at: "2026-09-01T13:29:37.349Z"
---
On this page

-   Use **Greenlist** restrictions to allow crawling only for content that you specify.
-   Use **Redlist** restrictions to prevent Glean from crawling content that you specify.

| Restriction Type | Greenlist | Redlist | Details |
| --- | --- | --- | --- |
| Time-based Restrictions | ❌ | ❌ | Restrict crawling to include/exclude content created/modified/viewed after a certain date. |
| Identity-based Restrictions | ✅ | ❌ | Restrict crawling to include/exclude content created/modified/viewed by specific users or a specific group (plus public content). |
| Content-based Restrictions | ❌ | ❌ | Restrict crawling to include/exclude specific content, documents, messages, or objects. |

## Supported restrictions[​](#supported-restrictions "Direct link to Supported restrictions")

| Restriction | Greenlist | Redlist | Details |
| --- | --- | --- | --- |
| Entra ID Group | ✅ | ❌ | Restrict crawling to only drives owned by members of a specific Azure AD group (Product Access Group). |

## Limitations[​](#limitations "Direct link to Limitations")

### Entra ID Group

-   Cannot be applied in the Admin UI.
-   Content owned by users not in the group will not be indexed, even if that content is shared with users who are in the group.
-   The Object ID of the AD group must be provided, not the group name (e.g. 7c77a355-c78c-6362-a195-d2428d285107).

## Apply restrictions[​](#apply-restrictions "Direct link to Apply restrictions")

| Method | Supported | Details |
| --- | --- | --- |
| Admin UI | ❌ | Restrictions can be applied in the Admin UI under the connector settings. |
| Glean Support | ✅ | Restrictions can be applied by Glean support on request. |

note

When contacting Glean Support to apply this restriction, use the following config key:

-   Entra ID Group: `productAccessGroupIds`

## OneNote[​](#onenote "Direct link to OneNote")

OneNote notebooks stored in OneDrive inherit the same crawling restrictions as OneDrive. Restrictions applied to a user's OneDrive also apply to their OneNote notebooks. For more information, see [OneNote](/connectors/native/onedrive/onenote).
