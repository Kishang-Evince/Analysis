---
url: "https://docs.glean.com/connectors/native/box/restrictions"
canonical: "https://docs.glean.com/connectors/native/box/restrictions"
title: "Crawl restrictions"
description: "Supported exclusion and inclusion rules for Box to allow you to manage what data is crawled by Glean."
fetched_at: "2026-09-01T13:29:23.814Z"
---
On this page

Redlist restrictions permit Glean to crawl and index everything *except* the specified content (specific exclude).

| Restriction Type | Redlist | Details |
| --- | --- | --- |
| User-based Restrictions | ✅ | Restrict crawling to exclude content created/modified/viewed by specific users or a specific group (plus public content). |
| Content-based Restrictions | ✅ | Restrict crawling to exclude specific content, documents, messages, or objects (see below). |

## Supported restrictions[​](#supported-restrictions "Direct link to Supported restrictions")

| Restriction | Redlist | Details |
| --- | --- | --- |
| User (Owner) | ✅ | Restrict crawling to exclude content owned by specific users. |
| Content (Folder) | ✅ | Restrict crawling to exclude content within specific folders. |
| Event Types | ✅ | Restrict activity/content updates to specific event types (e.g. `DOWNLOAD`) |
| Service Account (Email) | ✅ | Restrict activity/content updates from certain service accounts (e.g. Bots/services that synchronize or backup content to Box) |

## Applying restrictions[​](#applying-restrictions "Direct link to Applying restrictions")

| Method | Supported | Details |
| --- | --- | --- |
| Admin UI | ❌ | Restrictions cannot currently be applied in the Admin UI. |
| Glean Support | ✅ | Restrictions can be applied by Glean Support on request. |

## Format[​](#format "Direct link to Format")

When specifying restrictions for **Owners**, **Folders**, or **Files**, the ID of the owner, folder, or file within the Box app must be specified.

For example:

-   Owner IDs:
    
    ```
    23400261190,23401260091 
    ```
    
-   Folder IDs:
    
    ```
    119142000606,518142000607
    ```
    
-   File IDs:
    
    ```
    31600504200,31600504201
    ```
    

### Locating user IDs[​](#locating-user-ids "Direct link to Locating user IDs")

As a Box admin, open the Box Admin Console and go to **Users & Groups**.

Click on a user from the user list, and the URL will reveal their user ID. For example, in `https://app.box.com/master/content/2267862105/0/0`, the user ID is `2267862105`.
