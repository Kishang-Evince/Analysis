---
url: "https://docs.glean.com/connectors/native/sharepoint/restrictions"
canonical: "https://docs.glean.com/connectors/native/sharepoint/restrictions"
title: "Crawl restrictions"
description: "<CrawlingRestrictionsOverview"
fetched_at: "2026-09-01T13:29:41.206Z"
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

By default, Glean does not index SharePoint pages, list items, or drive items that are in a draft or unpublished state. The draft version itself does not appear in Glean search results.

Glean Support can enable published-version visibility for your SharePoint deployment. When enabled, Glean can continue to index and serve the latest published version for supported SharePoint items when the item has a newer draft, is checked out, or is pending moderation. Items that have never been published remain excluded.

This setting does not apply to classic site pages with a published version and a newer draft. A SharePoint API limitation prevents Glean from retrieving the published version's content, so Glean cannot index the page while the newer version remains a draft.

#### What counts as draft content[​](#what-counts-as-draft-content "Direct link to What counts as draft content")

Glean treats a SharePoint page, list item, or drive item as draft when **any** of these conditions is true:

-   **Minor version** — The item's latest version is a minor (draft) version (for example, 1.1 or 0.3).
-   **Checked out** — The item is currently checked out by a user for editing.
-   **Pending moderation** — The item has a non-approved moderation status (for example, pending or rejected) in a list or library that has content approval enabled.

Items that have never been published (version below 1.0) are excluded entirely and are not indexed.

#### Troubleshooting missing SharePoint pages or list items[​](#troubleshooting-missing-sharepoint-pages-or-list-items "Direct link to Troubleshooting missing SharePoint pages or list items")

If a SharePoint page or list item does not appear in Glean, verify its status in SharePoint:

1.  **Publish the item** — If the item is in a draft or minor version, publish a major version.
2.  **Check in the item** — If the item is checked out, check it back in so the published version is available. An admin can also cancel the checkout if another user checked the item out.
3.  **Approve pending moderation** — If the list or library uses content approval, approve the item so it moves to an approved state.

After you resolve the draft condition, Glean indexes the item during the next crawl cycle. If you want Glean to index the latest published version while newer edits are in progress, contact [Glean support](https://support.glean.com). Classic site pages remain subject to the limitation described above.
