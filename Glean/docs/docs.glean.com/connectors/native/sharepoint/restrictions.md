---
url: "https://docs.glean.com/connectors/native/sharepoint/restrictions"
canonical: "https://docs.glean.com/connectors/native/sharepoint/restrictions"
title: "Crawl restrictions"
description: "<CrawlingRestrictionsOverview"
fetched_at: "2026-10-13T08:50:15.736Z"
---
On this page

-   Use **Greenlist** restrictions to allow crawling only for content that you specify.
-   Use **Redlist** restrictions to prevent Glean from crawling content that you specify.

| Restriction Type | Greenlist | Redlist | Details |
| --- | --- | --- | --- |
| Time-based Restrictions | ✅ | ❌ | Restrict crawling to include/exclude content created/modified/viewed after a certain date. |
| Identity-based Restrictions | ✅ | ❌ | Restrict crawling to include/exclude content created/modified/viewed by specific users or a specific group (plus public content). |
| Content-based Restrictions | ✅ | ❌ | Restrict crawling to include/exclude specific content, documents, messages, or objects. |

info

Site restrictions also apply to [real-time access results](/connectors/native/sharepoint/real-time-access#how-crawl-restrictions-apply).

## Supported restrictions[​](#supported-restrictions "Direct link to Supported restrictions")

| Restriction | Greenlist | Redlist | Details |
| --- | --- | --- | --- |
| Date | ✅ | ❌ | Restrict crawling to only content created/modified/viewed after a specific date. |
| Site | ✅ | ✅ | Restrict crawling to include/exclude specific SharePoint sites. |

note

Sites must be provided in URL format without a trailing forward slash. For example:

```
https://<domain>.sharepoint.com/sites/<siteName>
```

For Group restrictions when using Azure AD/Entra ID, the Object ID of the AD Group must be provided, and **NOT** the Group name. For example:

```
7c77a355-c78c-6362-a195-d2428d285107
```

## Limitations[​](#limitations "Direct link to Limitations")

### Date[​](#date "Direct link to Date")

-   This restriction cannot currently be applied in the Admin UI.
-   Time-based restrictions do NOT speed up crawling as content is often not returned from vendor APIs ordered by date.
-   Some vendor APIs stop returning viewed dates ~4-5 months in the past for specific types of content.

### Entra ID Group[​](#entra-id-group "Direct link to Entra ID Group")

-   This restriction cannot currently be applied in the Admin UI.
-   Public content, despite being accessible to all users in SharePoint, will only be viewable in Glean to users in this group.

### Site[​](#site "Direct link to Site")

-   Every subsite must be explicitly specified. You cannot specify a site collection or parent-site and have the crawler include/exclude all subsites.

## Apply restrictions[​](#apply-restrictions "Direct link to Apply restrictions")

| Method | Supported | Details |
| --- | --- | --- |
| Admin UI | ✅ | Restrictions can be applied in the Admin UI under the connector settings. |
| Glean Support | ✅ | Restrictions can be applied by Glean support on request. |

note

Not all restrictions can be applied in the Admin UI. Contact [Glean support](https://support.glean.com) to apply the restriction if it is missing from the UI.

### Exclude with Purview sensitivity labels[​](#exclude-with-purview-sensitivity-labels "Direct link to Exclude with Purview sensitivity labels")

Exclude sensitive Microsoft 365 content from search results and Glean by integrating with Microsoft Purview sensitivity labels. When this integration is enabled, items in SharePoint and OneDrive with selected labels are excluded from indexing. Because these items are not indexed, they do not appear in Glean results. For more information, see [Restrict O365 content via sensitivity labels](/administration/protect/sensitive-findings/restrict-content-via-sensitivity-labels).

### Exclude draft content[​](#exclude-draft-content "Direct link to Exclude draft content")

By default, Glean keeps the latest available published version of supported SharePoint content searchable while authors work on updates. The unpublished changes do not appear in Glean.

For example, after an author publishes version 1.0 and creates draft version 1.1, Glean continues to show version 1.0.

Users can find the published content only if Glean can verify their SharePoint access.

Glean also excludes items whose version history contains no available published version.

This behavior does not apply to classic web part pages with a published version and a newer draft. A SharePoint API limitation prevents Glean from retrieving the published version's web part content, so Glean cannot index the page while the newer version remains a draft.

#### What counts as draft content[​](#what-counts-as-draft-content "Direct link to What counts as draft content")

Glean treats a SharePoint page, list item, or drive item as draft when **any** of these conditions is true:

-   **Minor version** — The item's latest version is a minor (draft) version (for example, 1.1 or 0.3).
-   **Checked out** — The item is currently checked out by a user for editing.
-   **Pending moderation** — The item has a non-approved moderation status (for example, pending or rejected) in a list or library that has content approval enabled.

Items that have never been published (version below 1.0) are excluded entirely and are not indexed.

#### Troubleshooting missing SharePoint pages or list items[​](#troubleshooting-missing-sharepoint-pages-or-list-items "Direct link to Troubleshooting missing SharePoint pages or list items")

If a SharePoint page or list item does not appear in Glean, verify its status in SharePoint.

For supported items with an available published version, check that the user has access. You don't need to publish unfinished edits to keep that version searchable.

For items that have never been published, or classic web part pages with a newer draft, complete the applicable publishing steps when the changes are ready:

1.  **Publish the item** — If the item is in a draft or minor version, publish a major version.
2.  **Check in the item** — If the item is checked out, check it back in so the published version is available. An admin can also cancel the checkout if another user checked the item out.
3.  **Approve pending moderation** — If the list or library uses content approval, approve the item so it moves to an approved state.

If published content is still missing, contact [Glean Support](https://support.glean.com).
