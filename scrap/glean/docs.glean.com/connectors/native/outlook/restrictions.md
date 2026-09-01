---
url: "https://docs.glean.com/connectors/native/outlook/restrictions"
canonical: "https://docs.glean.com/connectors/native/outlook/restrictions"
title: "Outlook crawl restrictions"
description: "<CrawlingRestrictionsOverview"
fetched_at: "2026-09-01T13:29:37.698Z"
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
| Domain | ✅ | ❌ | Restrict indexing of emails to only messages from or to specific domains. |
| Entra ID Group | ✅ | ❌ | Restrict access to only users in a specific Azure AD group (Product Access Group). |
| Message lookback window | ✅ | ❌ | Limit the lookback period for emails that are indexed, specified in days. Only emails within this window will be indexed. |

## Limitations[​](#limitations "Direct link to Limitations")

### Domain

-   Cannot be applied in the Admin UI.
-   Domains must be specified as a list, for example example.com and contoso.com.

### Entra ID Group

-   The Object ID of the AD group must be provided, not the group name (for example, 7c77a355-c78c-6362-a195-d2428d285107).
-   Users outside the group will not be able to search Outlook content in Glean, even if their mailbox is otherwise accessible.

When a user is removed from the configured Product Access Group, changes propagate in two phases:

-   Search and Assistant visibility for that user drops after the next identity crawl refreshes group membership, typically within a few hours.
-   Previously indexed Outlook data for that user is removed from the search index when the next full content crawl completes. For large deployments, this can take longer than an incremental crawl cycle.

To immediately end an active user session, a workspace admin can sign the user out of all sessions from the **Admin console**.

### Message limit

By default, Glean indexes at most 5,000 messages for each user, regardless of the lookback window setting.

### Message lookback window

-   Cannot be applied in the Admin UI.

The lookback window limits which messages are eligible for indexing, but it does not override the per-user message cap. To index more history for heavy-volume mailboxes, both the lookback window and the individual user message cap can be raised. Contact Glean Support to adjust either value.

Reducing the lookback window also removes previously indexed messages that fall outside the new window on the next crawl. The setting acts as both a crawl-scope filter and a retention bound.

Messages outside the indexed window are surfaced through real-time access.

## Apply restrictions[​](#apply-restrictions "Direct link to Apply restrictions")

| Method | Supported | Details |
| --- | --- | --- |
| Admin UI | ✅ | Restrictions can be applied in the Admin UI under the connector settings. |
| Glean Support | ✅ | Restrictions can be applied by Glean support on request. |

note

When contacting Glean Support to apply these restrictions, use the following config keys:

-   Domain: `crawl.allowedDomains`
-   Message lookback window: `crawl.messagesLookbackWindow`
