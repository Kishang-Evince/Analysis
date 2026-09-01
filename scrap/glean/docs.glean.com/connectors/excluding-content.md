---
url: "https://docs.glean.com/connectors/excluding-content"
canonical: "https://docs.glean.com/connectors/excluding-content"
title: "Content exclusion"
description: "For some apps, you can specify exclusion and inclusion rules to manage what data is crawled by Glean."
fetched_at: "2026-09-01T13:29:20.676Z"
---
On this page

Content restrictions in Glean are a powerful tool for managing the visibility and accessibility of your organization's data. Two key methods for applying these restrictions are greenlisting and redlisting.

These restrictions help ensure that only appropriate content is searchable while sensitive or irrelevant content remains protected.

### Greenlisting

Use Greenlist restrictions to allow crawling only for content that you specify. Only greenlisted connectors or items are crawled and indexed in Glean search results.

### Redlisting

Use Redlist restrictions to prevent Glean from crawling content that you specify. Redlisted connectors or items are excluded from crawling and do not appear in search results.

## Content restrictions[​](#content-restrictions "Direct link to Content restrictions")

Content restrictions play a vital role in maintaining data security and relevance within your organization:

1

Data visibility management

Precisely control which content appears in search results across your organization.

2

Sensitive content protection

Ensure sensitive information remains restricted and only accessible to authorized users.

3

Search relevance

Improve search quality by including only pertinent content in the index.

4

Organizational compliance

Maintain compliance with internal policies and external regulations regarding data access.

## Implement content restrictions[​](#implement-content-restrictions "Direct link to Implement content restrictions")

info

Content restrictions are implemented through the [Glean Admin console](https://app.glean.com/admin) or with assistance from [Glean Support](https://support.glean.com).

### Configuration process[​](#configuration-process "Direct link to Configuration process")

The implementation of content restrictions involves two main approaches:

### Greenlist implementation

Create an allowlist of connectors or items that should be included in search results. Only these specified items are:

-   Crawled by Glean's systems
-   Indexed in the search database
-   Available in search results

### Redlist implementation

Create a blocklist of connectors or items that should be excluded from search results. These specified items are:

-   Excluded from Glean's crawling process
-   Omitted from the search index
-   Hidden from all search results

note

Different connectors may support different types of content restrictions. For connector-specific restriction capabilities, refer to the **Restricting Content** documentation for your specific connector.

tip

When implementing content restrictions, start with a clear understanding of your organization's security requirements and data access policies to ensure proper configuration.

tip

After making greenlisting or redlisting changes, monitor the **Admin console** (**Admin console → Platform → Connectors**) to confirm the crawler picks up and applies your changes. A non-zero **Change rate** after a restriction update indicates the pipeline is processing the change.
