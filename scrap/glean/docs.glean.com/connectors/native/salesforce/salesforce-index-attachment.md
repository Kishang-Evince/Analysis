---
url: "https://docs.glean.com/connectors/native/salesforce/salesforce-index-attachment"
canonical: "https://docs.glean.com/connectors/native/salesforce/salesforce-index-attachment"
title: "Set up Salesforce attachments indexing"
description: "Glean supports crawling and indexing Salesforce Files, allowing users to find and question file content directly in Glean Search and Glean. The connector respects all Salesforce permissions, ensuring users can only see the files they are authorized to access."
fetched_at: "2026-09-01T13:29:39.990Z"
---
On this page

Glean supports crawling and indexing [Salesforce Files](https://help.salesforce.com/s/articleView?id=experience.collab_salesforce_files_parent.htm&type=5), allowing users to find and question file content directly in Glean Search and Glean. The connector respects all Salesforce permissions, ensuring users can only see the files they are authorized to access.

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Verify the Salesforce admin account has the **Query All Files** permission.
-   Ensure your Salesforce connector is set up per the [Salesforce Connector Overview](/connectors/native/salesforce/about).

### Quick start checklist[​](#quick-start-checklist "Direct link to Quick start checklist")

-   Authorize the connector with a Salesforce admin account.
-   Add `ContentDocument` to the list of objects to crawl.
-   Enter the custom login domain during setup, if your Salesforce org uses a custom login domain (for example, a sandbox).
-   Validate the setup by searching for a known file in Glean after the crawl is complete.

### How it works[​](#how-it-works "Direct link to How it works")

The Glean connector crawls Salesforce Files, which are represented by the **ContentDocument** object. This process follows the connector's standard crawl behavior and limits.

#### What gets indexed[​](#what-gets-indexed "Direct link to What gets indexed")

-   **Object**: `ContentDocument`. Glean fetches file content through the related **ContentVersion** record.
-   **File Types (default)**: PDF, DOCX, TXT, and HTML.
-   **File Size**: Files up to 64 MB are fully indexed for search. Files larger than 64 MB are indexed by their metadata only.
-   **Unsupported Files**: The connector does not support encrypted or compressed files or rich media such as images and videos.

### How permissions work[​](#how-permissions-work "Direct link to How permissions work")

A single file can be linked to multiple records (for example, an Opportunity, a Case, and a Contact) via the **ContentDocumentLink** object. Glean computes the union of permissions from all linked records for that file.

-   **Permissions from indexed records**: If a file is linked to multiple records that are indexed by Glean, a user can access the file if they have permission to view any one of those linked records.
-   **Permissions from non-indexed records**: If a file is linked to a record that Glean does not index (e.g., a custom object not in the crawl list), the permissions from that specific link will not be applied.

### Setup[​](#setup "Direct link to Setup")

To enable Salesforce document attachments, follow these steps in the Glean Admin Console.

1.  In Glean Admin, navigate to your Salesforce connector and open the **Setup** tab.
2.  In the list of Salesforce objects to be crawled, add **ContentDocument**.
    -   **Note**: Do not add **ContentDocumentLink** to the list; it is used internally by Glean for permission resolution. The **Attachment** object is a legacy object and is not recommended for new setups.
3.  If your organization uses a sandbox or a non-standard login endpoint, set the optional custom login domain.
4.  Click **Authorize** and complete the OAuth flow using a Salesforce admin account that has the **Query All Files** permission.
5.  Click **Save** to save the changes. The connector will begin to crawl the **ContentDocument** objects.

## FAQs[​](#faqs "Direct link to FAQs")

### Why don’t I see ContentDocument in the object picker?

Ensure the service account used for authorization has access to the object in Salesforce.

### I see files but not their text content. Why??

Confirm that the file is 64 MB or smaller and is not an unsupported file type (e.g., encrypted or compressed).

### Do files linked from custom objects work??

Yes. Files are indexed via **ContentDocument** and permissioned via **ContentDocumentLink**, regardless of whether the custom object is indexed. Permissions are only applied from records that Glean is configured to crawl.

### What if I have transcripts in JSON format?

You can enable support for JSON files by adding json to the allowed file extensions in the Glean Admin settings. JSON content will be indexed as plain text without schema-aware parsing and are not enabled by default.
