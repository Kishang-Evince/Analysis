---
url: "https://docs.glean.com/connectors/native/gmail/about"
canonical: "https://docs.glean.com/connectors/native/gmail/about"
title: "Gmail overview"
description: "Learn how the Gmail connector indexes email, its update frequency, indexing scope, and data controls."
fetched_at: "2026-09-01T13:29:30.604Z"
---
On this page

The Glean Gmail connector integrates your organization's email content into the unified search platform, supporting both **Data crawling and indexing** and **Live mode**. You can scope the connector to index emails from specific users, groups, or domains while strictly respecting Gmail’s permission model.

## Key capabilities and features[​](#key-capabilities-and-features "Direct link to Key capabilities and features")

| **Feature** | **Details** | **Access and scope** |
| --- | --- | --- |
| **Data crawling and indexing (Recommended)** | Gathers and organizes data for fast, high-quality search access across all your sources. Provides robust results that appear directly in the main search tab. | By default, indexes approximately 6 months of history and up to 5,000 Inbox threads per user. Limits are configurable per deployment. |
| **Live mode** | Retrieves live data directly from Gmail on a per-query basis. Best for quick access to smaller volumes of data and ensuring coverage of the most current emails. | Results appear only when explicitly filtered (for example, `app:gmail`). |
| **Searchable metadata** | Indexes sender, recipients, subject, date, and thread-level metadata. | Supports search operators like `from`, `recipient`, `date`, `subject`, and `documentcategory:email`. |
| **Security controls** | Supports both inclusion (greenlist) and exclusion (redlist) rules to control which mailboxes are indexed. | Spam and trash folders are automatically excluded from indexing. |

## Limitations[​](#limitations "Direct link to Limitations")

-   **Attachments**: Attachments are not indexed. Only the text content of email threads is crawled.
-   **Indexing limits**: By default, indexing covers approximately 6 months of history and up to 5,000 Inbox threads per user. Limits are configurable per deployment.
-   **Label support**: Custom labels attached to indexed threads are available as searchable label facets. Labels do not expand the crawl scope.
-   **Spam and trash folders**: Spam and trash folders are not indexed.

## Update frequency[​](#update-frequency "Direct link to Update frequency")

-   **Full content crawl**: Monthly (every ~28–30 days). This ensures the indexed corpus is fully reconciled on a regular cadence.
    
-   **Incremental content crawl**: Continuous, activity-based updates via the Gmail History API (`historyId`). We poll for changes every few minutes and batch updates to refresh modified threads efficiently. A periodic incremental pass also runs as a safety net to discover any newly eligible threads and to cover missed events.
    

## Indexing scope[​](#indexing-scope "Direct link to Indexing scope")

-   **Coverage**: Inbox and sent folders are indexed.
    
-   **Lookback window**: Approximately 6 months by default (configurable per deployment).
    
-   **Thread limits**: By default, up to 5,000 Inbox threads per user are indexed. Limits are configurable per deployment.
    
-   **Mailbox scope**: Only mailboxes in the configured indexing scope are indexed. Delegated mailbox access is supported when delegate mappings are configured, and indexed email is available to the mailbox owner and configured delegates.
    
-   **Deleted emails**: If a user deletes an email, we will also delete the associated email thread in the Glean corpus.
    
-   **Spam emails**: Emails that have been filtered as spam will not be indexed, even if the user has previously interacted with it. If the user marks an email as spam after Glean has crawled it, we will delete the associated email after processing the next activity update or incremental crawl.
    

## Manage data[​](#manage-data "Direct link to Manage data")

These restrictions are optional and apply only to **Data crawling and indexing**. **Live mode will not be affected.** If you have no specific rules, leave these sections blank.

### Policy priority[​](#policy-priority "Direct link to Policy priority")

If both inclusion and exclusion rules are applied to the same piece of content, the exclusion rule takes priority, and the content will not be indexed.

**Best practice:** Use these rules minimally to preserve the enterprise search experience, as most end-users expect to find all content. Most customers do not apply any rules, or apply exclusion rules sparingly for sensitive data.

### Inclusion rules (Greenlist)[​](#inclusion-rules-greenlist "Direct link to Inclusion rules (Greenlist)")

Use these options to explicitly limit the content that Glean indexes.

| **Configuration** | **Description** | **Tool** |
| --- | --- | --- |
| **Crawl only mailboxes of members of a Google Group** | Limits the crawl to only mailboxes belonging to members of the specified Google Groups. | Enter Google Group email addresses (comma-separated). |
| **Greenlisted domains: Index email threads which include these domains** | Restricts email indexing to only threads where the sender belongs to the specified domain(s). | Enter domain names (for example, `company.com`), separated by commas. |

### Exclusion rules (Redlist)[​](#exclusion-rules-redlist "Direct link to Exclusion rules (Redlist)")

Use these options to explicitly remove sensitive or unnecessary content from the index.

| **Configuration** | **Description** | **Tool** |
| --- | --- | --- |
| **Exclude members of a Google Group from crawling** | Prevents mailboxes belonging to members of the specified Google Groups from being crawled. | Enter Google Group email addresses (comma-separated). |
| **Exclude threads sent to recipients in this Google Group from being crawled** | Prevents threads from being indexed if they were sent to recipients in the specified Google Groups. | Enter Google Group email addresses (comma-separated). |

## Security and data access[​](#security-and-data-access "Direct link to Security and data access")

-   **Data integrity:** The connector uses activity-based updates via the Gmail API to handle deletions and maintain a secure, current index. Emails marked as spam or deleted in Gmail are removed from the Glean index on the next update.
-   **Security:** Glean enforces all Gmail permissions at query time. Only authorized users see search results, and sensitive items (spam/trash) are excluded from the index.
