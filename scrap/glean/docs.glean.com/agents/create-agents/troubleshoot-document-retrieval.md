---
url: "https://docs.glean.com/agents/create-agents/troubleshoot-document-retrieval"
canonical: "https://docs.glean.com/agents/create-agents/troubleshoot-document-retrieval"
title: "Troubleshoot document retrieval in agents"
description: "Resolve common issues where agents cannot find or retrieve documents from configured knowledge sources."
fetched_at: "2026-09-01T13:29:17.038Z"
---
On this page

If your agent returns empty results or cannot find documents that you expect it to retrieve, work through the following checks. Each section addresses a common root cause and provides steps to resolve it.

## Verify document permissions[​](#verify-document-permissions "Direct link to Verify document permissions")

Agents run with the permissions of the user who triggers them. For an agent to retrieve a document, the user must have access to that document in its native application (for example, Google Drive, Confluence, or SharePoint).

To confirm permissions:

1.  Open the native application where the document lives.
2.  Verify that the user who runs the agent can view the document directly.
3.  If the document is restricted, update its sharing settings in the native application before retesting the agent.

tip

Test your agent as the same user who will run it in production. An agent builder with broad access may see results that a more restricted user cannot.

## Wait for new documents to be indexed[​](#wait-for-new-documents-to-be-indexed "Direct link to Wait for new documents to be indexed")

Glean does not make newly created or recently updated documents available instantly. After a document is created or modified in a connected connector, wait for the next crawl to pick up the change and index the document. Timing depends on the connector's crawl schedule, how much data the crawl needs to process, and the activity available for incremental updates.

If your agent cannot find a recently created document:

1.  Wait for the next crawl to process the document.
2.  Search for the document in Glean search to confirm it has been indexed.
3.  Once the document appears in Glean search results, retest your agent.

## Review knowledge source configuration[​](#review-knowledge-source-configuration "Direct link to Review knowledge source configuration")

### Document limit[​](#document-limit "Direct link to Document limit")

You can attach up to 500 documents as knowledge sources for an agent. If you need to reference more than 500 documents, use Collections to group related documents and attach the Collection as a knowledge source instead of individual documents.

### Use Collections for large document sets[​](#use-collections-for-large-document-sets "Direct link to Use Collections for large document sets")

[Collections](/user-guide/knowledge/collections/how-collections-work) let you organize documents into named groups that you can reference as a single knowledge source. This approach:

-   Keeps your knowledge source configuration manageable
-   Lets you update the set of documents without editing the agent
-   Avoids hitting the 500-document limit

## Check company search step settings[​](#check-company-search-step-settings "Direct link to Check company search step settings")

If your agent uses a company search step but returns no results or irrelevant results, review these settings in the agent builder:

### Search query type[​](#search-query-type "Direct link to Search query type")

Company search supports two query modes:

-   **Manual queries**: You define the exact search query template. This approach produces more deterministic results and is recommended when you know what terms or filters the search should use.
-   **Natural language instructions**: The AI generates search queries based on your instructions. This is more flexible but can produce inconsistent results.

If your agent returns unexpected results, try switching to manual queries with specific search terms.

### Filter configuration[​](#filter-configuration "Direct link to Filter configuration")

Filters narrow which connectors or containers the company search step queries. Common mistakes include:

-   **Missing quotes around multi-word values**: Wrap filter field values in quotes to prevent filters from breaking when the value contains a space. For example, use `organization:"Account Name"` instead of `organization:Account Name`.
-   **Unintended AND conditions**: Each distinct filter creates an AND condition. Adding filters for different fields narrows results further. Filters with the same field name create an OR condition between those values.
-   **Overly restrictive filters**: If no results are returned, try removing filters one at a time to identify which filter is excluding the expected documents.

For detailed search syntax and filter guidance, see [Search in Glean](/user-guide/search/how-to-search-in-glean) and [Advanced search filters](/user-guide/advanced/advanced-search-filter).

### Number of results[​](#number-of-results "Direct link to Number of results")

Increasing the number of results retrieved gives the agent more documents to work with. If your agent misses relevant documents, try increasing this value.

### Relevant excerpts compared to full document text[​](#relevant-excerpts-compared-to-full-document-text "Direct link to Relevant excerpts compared to full document text")

Company search can return either relevant excerpts or full document text:

-   **Relevant excerpts**: Returns the most relevant portions of matching documents. This uses fewer tokens but may miss important context that appears elsewhere in the document.
-   **All document text**: Returns the complete content of matching documents. This provides more context but uses more tokens and may cause the agent to approach its memory limit.

If your agent has the right documents but gives incomplete answers, try switching to full document text. If the agent hits memory limits, switch back to relevant excerpts and increase the number of results instead.

## Check Google Drive permissions[​](#check-google-drive-permissions "Direct link to Check Google Drive permissions")

Google Drive documents shared through organization-wide groups require special attention. A document must have the **Can find in search results** permission for the agent to retrieve it. Without this permission, the agent can only find the document if the user has previously viewed it or the document has been shared directly with the user.

To check and update this setting:

1.  Open the document in Google Drive.
2.  Select **Share**.
3.  Verify that the sharing settings include **Can find in search results** for your organization.

## Use debug mode to investigate[​](#use-debug-mode-to-investigate "Direct link to Use debug mode to investigate")

If you have worked through the checks above and your agent still cannot retrieve documents, use [debug mode](/agents/create-agents/debug-agent) to inspect the agent's execution step by step. Debug mode lets you:

-   View the inputs and outputs of each step, including the search queries the agent generated
-   Identify which step is failing or returning empty results
-   Compare the search queries against what you expect

## See also[​](#see-also "Direct link to See also")

-   [Company Search](/tools/glean/company-search)
-   [Debug your agent](/agents/create-agents/debug-agent)
-   [Knowledge source types](/agents/knowledge-source-types)
-   [Memory](/agents/concepts/memory)
