---
url: "https://docs.glean.com/connectors/crawler-and-indexing-limits"
canonical: "https://docs.glean.com/connectors/crawler-and-indexing-limits"
title: "Crawl and index limits"
description: "This article explains the size limits and processing rules for item content, metadata, and permissions that Glean's crawler and indexer apply to all connectors."
fetched_at: "2026-09-01T13:29:17.806Z"
---
On this page

note

This page covers indexing size constraints, not crawl freshness or timing. To monitor crawl activity in your deployment, see [Managing connectors](/connectors/monitoring). For default crawl frequencies, see [Refresh rates](/connectors/crawling-refresh-rates).

When Glean is crawling an organization’s corpus using the configured connectors, the crawler pulls down the following information that is then fed to the indexer:

-   Item content (for example, title, body, comments, media)
-   Metadata (for example, created by, created time, updated time, type, facets, folder)
-   Permissions (for example, who is allowed to view the item)

Of the three types of data indexed, the first one (Item content) must take into consideration file size.

## Item content indexing limit[​](#item-content-indexing-limit "Direct link to Item content indexing limit")

Before the crawler downloads the item content to be fed to the indexer, it will first ascertain the content item’s size. If the size is GREATER than 64 MB, the crawler WILL NOT download the item contents and will only download the metadata and permissions information for indexing. If the file size is LESS than 64 MB, the item content will also be downloaded and fed to the indexer.

## Q&A[​](#qa "Direct link to Q&A")

### Is content over the size limit still searchable with Glean?

Yes, the item is still searchable with Glean based upon the metadata and it will still be ranked and secured based upon permissions and the personalization features of the Glean Platform.

### Do these limits apply for all connectors?

Yes, the crawler applies this logic for all connectors.

### When the content is less than the size limit, is all of the content indexed?

Not by default. By default the crawler will do the following:

1.  Download the content
2.  Convert the content from its RAW state (PDF, Word, Google Doc, etc…) to a text based indexable format. During this process multimedia content will be removed (Images, Videos, etc…). This process has been proven to drastically reduce document size while preserving the quality of the indexed content. (95%+ reduction in PDFs!).
3.  If the content (converted or not) is less than 16.875 MB, the content is stored and fed to the indexer. If the content is greater than 16.875 MB, then the first 16.875 MB of content will be stored and fed to the indexer. The rest of the content will be cut from indexing.

### What other options are available if the crawler defaults to converting and stripping content?

It is possible to turn on OCR (Optical Character Recognition) for certain connectors. If OCR is enabled, then the crawler WILL NOT strip the multimedia content and will attempt to extract text from it. Once this process is complete, then the default crawling/indexing process continues [as described above](#when-the-content-is-less-than-the-size-limit-is-all-of-the-content-indexed) (content conversion, total text indexable size of 16.875 MB, etc…)

note

Even with OCR enabled, the initial size limit of 64 MB still applies as described in the [Item content indexing limit](#item-content-indexing-limit) section.

### Are Glean and search result page summarize capabilities affected for non-indexed content?

Yes. Because the content of the document(s) in question will have not been indexed, Glean is unable to utilize their content as part of its standard functionality. This also means that you will not see the “Summarize” button in the Search Engine Result Page.

### Why do these limits seem small?

The burden is on the Glean Platform to provide a performant, secure, and scalable platform for organizations to quickly find and understand their internal knowledge. Limits had to be applied in order for the platform to achieve these goals. This may mean that some larger content will not be indexed, but the value tradeoffs for the rest of the content far outweigh the potential value lost in these large documents.

Customers have the opportunity to break up large documents into a logical series and/or downsample large multimedia content within them for crucial content whenever necessary.

note

Google.com’s upper bound limit for content size is 16 MB. Also as a point of reference the complete works of Shakespeare contain approximately 5 MB of text.

### Can this limit change?

No. The Glean Product Team is willing to revisit these limits as technology and content changes occur. Feel free to reach out to Glean Support or your Glean Account Team if you feel these limits are limiting for your business.

### Are there special limits for spreadsheets?

Yes. Spreadsheet files (such as Excel and Google Sheets) have a character-based indexing limit. By default, approximately **250,000 characters** of spreadsheet content are indexed. Content beyond this limit is truncated and won't appear in search results or be available to Assistant.

If you have large spreadsheets that exceed this limit, consider breaking them into smaller files or using [Data Analysis](/administration/assistant/data-analysis/about-data-analysis) to upload and analyze the full file directly.

### What types of content are affected?

Essentially all content is affected by these limits. However, in practicality it would be highly unlikely that certain content sources would produce enough text data to ever hit these high limits. (Teams, Slack, Salesforce, ServiceNow, etc…)

It would be considered a safe assumption that most customers would only run into these limits for unstructured Office (Powerpoint, Word, etc..), Google Docs (Slides, Docs, etc…), and PDFs.

### What if my corpus size is very large?

For organizations with very large corpuses, consider setting a crawl restriction to limit the scope of indexed content. Depending on your connector, available restriction types include date-based (for example, crawl only the last 2 years of content), greenlist or redlist by site or folder, and owner-based restrictions. For many connectors, the majority of search queries are satisfied by recently created or updated documents.

For connectors that support it, Glean's data fetching feature performs a federated live search alongside indexed corpus search. This means content outside the indexed window can still be surfaced at query time, providing coverage even when the crawler has not indexed the full corpus.

You can configure crawl restrictions on your connector setup page in the **Admin console**.
