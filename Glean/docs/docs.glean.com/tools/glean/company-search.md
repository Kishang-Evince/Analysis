---
url: "https://docs.glean.com/tools/glean/company-search"
canonical: "https://docs.glean.com/tools/glean/company-search"
title: "Company search"
description: "Search connected company knowledge and use relevant results in agent workflows."
fetched_at: "2026-10-13T08:50:50.287Z"
---
On this page

Search across connected company knowledge repositories from Glean to return relevant files, documents, and references for user questions.

## Inputs[​](#inputs "Direct link to Inputs")

Configure Company Search in Agent Builder with a natural language query or a fixed query pattern. Set filters and result details to control the content that the agent receives.

| Input or setting | Description | Example |
| --- | --- | --- |
| Search query | Describe the information that the agent needs to locate. | Find the latest onboarding guidance for \[\[Team name\]\] |
| Fixed query or template | Provide a precise Glean search query or use variables in a query template. | \[\[Feature name\]\] app:jira updated:past\_week |
| Filters | Limit results to specific connectors, containers such as folders or collections, or documents. | app:gmail from:me to:"ABC XYZ" |
| Number of results | Select the number of results to return for each search. | 10 |
| Result detail | Select relevant snippets or the full document for each result. | Relevant excerpts |

For detailed search syntax and filter guidance, see [Search in Glean](/user-guide/search/how-to-search-in-glean) and [Advanced search filters](/user-guide/advanced/advanced-search-filter).

## Outputs[​](#outputs "Direct link to Outputs")

Company Search returns ranked search results and adds them to the agent context buffer. The tool does not automatically display these results to the user. Follow Company Search with a Respond step or another downstream step to summarize or extract the relevant information.

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   Meeting preparation: Search recent company notes, Salesforce updates, and meeting transcripts to prepare for an upcoming meeting.
-   Candidate interview preparation: Search candidate resume uploads and internal interview notes to prepare interview questions.
-   Support ticket resolution: Search Confluence playbooks and related internal documentation to solve a support ticket.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before using Company Search, complete these prerequisites:

-   Connect the sources that contain the required information.
-   Ensure that the person running the agent holds access permissions for the target content in the source application.
-   Allow newly connected or updated sources time to complete crawling and indexing before expecting content in search results.

## Configuration[​](#configuration "Direct link to Configuration")

To add Company Search to an agent:

1.  Open **Agent Builder** and select **Add step**.
2.  Select **Company Search** under the **By Glean** section.
3.  Enter a natural language query or a fixed query template.
4.  Configure optional settings such as filters, result limits, and snippet detail levels.
5.  Add a **Respond** step or another downstream step to process the search results.

## Results and scope[​](#results-and-scope "Direct link to Results and scope")

Company Search uses Glean ranking algorithms to return the most relevant results for a query. The tool retrieves a ranked subset of matches rather than scanning every document in a folder or connector. Each step retrieves approximately 10 results by default and supports a maximum of 500 results per step.

To adjust the result scope:

-   Increase the result count when relevant information spans multiple documents.
-   Combine multiple Company Search steps with targeted queries when one query cannot cover the entire topic.
-   Apply filters to limit results to specific connectors, collections, folders, or documents.

## Best practices[​](#best-practices "Direct link to Best practices")

-   Use manual queries for deterministic results: Define exact terms and filters directly instead of relying on AI-generated search queries.
-   Apply specific filters: Scope searches narrowly to reduce irrelevant results. Combine filters on different fields as AND conditions, and combine multiple values for the same field as OR conditions.
-   Increase result counts for broad coverage: Return more documents to give the agent a larger context pool. Note that higher counts increase processing time and memory consumption.
-   Select full document text when snippets lack context: Choose full document text if the agent locates correct documents but produces incomplete answers. Full text uses more tokens and can cause the agent to reach the memory limit.
-   Quote multi-word filter values: Enclose filter values that contain spaces in quotation marks, such as organization:"Account Name".
-   Use Collections for large document sets: Group documents into a Collection instead of adding individual files as filter sources.
-   Add a downstream step: Always follow Company Search with a Respond step or another action step to summarize, extract, or classify the results.

## Limitations[​](#limitations "Direct link to Limitations")

-   Results include only content that the active user has permission to access in connected sources.
-   Company Search provides ranked results rather than an exhaustive inventory of every matching document.
-   Content updates and newly connected sources require indexing completion before appearing in results.
-   Search quality depends on query specificity, filter selection, and indexed content.
-   Large result sets and full document text consume additional agent memory and increase processing time.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Company Search returns no results

Confirm that the relevant source is connected and that the person running the agent can access the target content in the source application. If the content was recently created or updated, wait for crawling and indexing to complete. Remove filters one at a time to identify whether one of them excludes the expected results.

### Expected documents are missing from the results

Confirm that the documents are indexed in Glean and that the running user has permission to access them. Increase the result count or use multiple targeted searches when the relevant information may be spread across a large document set.

### The results are too broad or not relevant

Add a specific connector, container, collection, document, or filter to the search. Use a fixed query template when the same search pattern should be applied consistently across runs.

### The agent does not use the search results in its response

Add a **Respond** step or another downstream step after Company Search. The search tool adds results to the agent's context but does not automatically display them to the user.

### The agent runs out of memory

Reduce the number of results, narrow the filters, or return relevant snippets instead of full document text. For large retrieval tasks, split the work across multiple focused searches.

## FAQ[​](#faq "Direct link to FAQ")

### Does Company Search search every document in a connector or folder?

No. Company Search returns a ranked subset of the most relevant matches. Use targeted filters, multiple searches, or a native connector tool when you need more complete coverage.

### Can I use a fixed search query?

Yes. Enter a fixed query or query template in the Company Search configuration. Templates can include variables such as `[[Customer name]]` or `[[Feature name]]`.

### Can Company Search return full documents?

Yes. Configure the step to return full document text instead of relevant snippets when the agent needs more context. Full document text uses more memory.

### Can I use Company Search to retrieve every matching record?

Company Search is designed for ranked relevance, not exhaustive retrieval. For complete datasets, structured filtering, sorting, or aggregation, use a native connector tool when one is available.

## See also[​](#see-also "Direct link to See also")

-   [Advanced search filters](/user-guide/advanced/advanced-search-filter)
-   [Search in Glean](/user-guide/search/how-to-search-in-glean)
-   [Troubleshoot document retrieval in agents](/agents/create-agents/troubleshoot-document-retrieval)
-   [Limits and best practices](/agents/concepts/limits-and-best-practices)
