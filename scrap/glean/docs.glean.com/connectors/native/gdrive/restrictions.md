---
url: "https://docs.glean.com/connectors/native/gdrive/restrictions"
canonical: "https://docs.glean.com/connectors/native/gdrive/restrictions"
title: "Crawl Restrictions"
description: "Supported exclusion and inclusion rules for Google Drive to allow you to manage what data is crawled by Glean."
fetched_at: "2026-09-01T13:29:28.059Z"
---
On this page

-   **Greenlist** restrictions permit Glean to *only* crawl and index specified content (specific include).
-   **Redlist** restrictions permit Glean to crawl and index everything *except* the specified content (specific exclude).

| Restriction Type | Greenlist | Redlist | Details |
| --- | --- | --- | --- |
| Time-based Restrictions | ✅ | ❌ | Restrict crawling to include/exclude content created/modified/viewed after a certain date. |
| User-based Restrictions | ✅ | ✅ | Restrict crawling to include/exclude content created/modified/viewed by specific users or a specific group (plus public content). |
| Content-based Restrictions | ✅ | ✅ | Restrict crawling to include/exclude specific content, documents, messages, or objects (see below). |

## Supported restrictions[​](#supported-restrictions "Direct link to Supported restrictions")

| Restriction | Greenlist | Redlist | Details |
| --- | --- | --- | --- |
| Date | ✅ | ❌ | Restrict crawling to only content created/modified/viewed after a specific date, e.g. `YYYY-MM-DD` |
| Group | ✅ | ✅ | Restrict crawling to only content created/modified/viewed by users in a Google Group, e.g. `glean-users@company.com` |
| User (Owner) | ❌ | ✅ | Restrict crawling to exclude content owned by specific users, e.g. `user@company.com,user2@company.com` |
| Content (Shared Drive) | ✅ | ✅ | Restrict crawling to shared drives only, or exclude specific shared drives by name/prefix. |
| Content (Folder) | ✅ | ✅ | Restrict crawling to include/exclude content within specific folder IDs. |
| Content (File) | ✅ | ❌ | Restrict crawling to include **public** files only. |
| Label | ❌ | ✅ | Exclude files that carry specific Drive label choices. See [Restrict Google Drive content based on sensitivity labels](/connectors/native/gdrive/restrict-drive-sensitivity-labels). |

## Applying restrictions[​](#applying-restrictions "Direct link to Applying restrictions")

| Method | Supported | Details |
| --- | --- | --- |
| Admin UI | ✅ | Restrictions can be applied in the Admin UI under the connector configuration. |
| Glean Support | ✅ | Restrictions can be applied by Glean Support on request. |

warning

Not all restrictions can be applied in the Admin UI. Please contact Glean support to apply the restriction if it is missing from the UI.

* * *

## Locating folder IDs[​](#locating-folder-ids "Direct link to Locating folder IDs")

To specify certain folders to exclude in Google Drive, you'll need to get the folder ID.

Go to the folder in Google Drive. In the URL bar, select everything after `drive.google.com/drive/folders/`. This is the folder ID.

You can copy and paste this folder ID into Glean.

## Locating shared drive IDs[​](#locating-shared-drive-ids "Direct link to Locating shared drive IDs")

Shared drives are special folders in Google Drive. Because they are folders, the process for finding the shared drive ID is the same as it is for a folder.

Go to the shared drive in Google Drive. In the URL bar, select everything after `drive.google.com/drive/folders/`. This is the shared drive ID.

Copy & paste the Shared Drive ID into Glean.

## See also[​](#see-also "Direct link to See also")

-   [Restrict Google Drive content based on sensitivity labels](/connectors/native/gdrive/restrict-drive-sensitivity-labels)
-   [Retrieve label IDs from Google Drive](/connectors/native/gdrive/retrieving-labels)
