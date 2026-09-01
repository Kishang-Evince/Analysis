---
url: "https://docs.glean.com/tools/glean/company-search"
canonical: "https://docs.glean.com/tools/glean/company-search"
title: "Company search"
description: "Search across your company's connected knowledge and load the results into agent memory for use in later steps."
fetched_at: "2026-09-01T13:30:07.115Z"
---
On this page

The Glean Company Search Tool searches across company data. This tool calls the Glean search engine and can issue any query that you can issue against the Glean search engine, helping you query internal company knowledge. The Glean Company Search Tool:

-   **Queries Across Company Data**: Provides a targeted search across various connectors within the company, including internal documents, databases, and content repositories.
-   **Adds Search Results to Agent’s Memory**: The results from these searches are loaded into the agent's memory for use in subsequent steps or analyses. This tool does not output anything to the user—you will need to follow it with a Respond step with instructions on how to summarize or extract information from the search results and format them for the user.
-   **Supports Multiple Knowledge Sources**: Enables searches over multiple designated knowledge sources or repositories, such as specific folders or databases.

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   **Meeting Preparation**: Pulls the latest company notes, updates from internal sources like Salesforce, and meeting transcripts to prepare for meetings.
-   **Candidate Interview Preparation**: Searches a candidate's submitted resume and internal interview notes to curate relevant information for interviews.
-   **Support Ticket Resolution**: Searches Confluence pages for playbooks relevant to solving a support ticket.

## Configuration[​](#configuration "Direct link to Configuration")

You can configure the Glean Company Search Tool using the Agent Builder tool with the following steps:

1.  **Define Search Queries**: You can specify search queries manually or provide natural language instructions for the AI to determine appropriate queries.
    -   **Manual Specification**: You can list a template for any search query that you can enter into the Glean search engine. These templates can also include input fields. Examples:
        1.  `app:gmail from:me to:”Arvind Jain”`
        2.  `[[Feature name]] app:jira updated:past_week`
        3.  `[[Customer name]] app:salescloud type:opportunity isclosed:false`
    -   **Natural Language Instructions**: You can provide instructions to the AI to figure out the necessary search queries. Examples:
        -   `Find all Slack messages that mention [[Project name]]`
        -   `Search Confluence for playbooks that are relevant to solving the issue in [[Zendesk ticket]]`
2.  **Filter Sources**: Optionally specify that the search should be issued against a specific set of connectors, containers (e.g., folders, collections), or documents.
3.  **Select Number of Results to Return**: Choose how many results to return per search. Fewer results will result in a more focused response with less breadth. By default, each Company Search step retrieves approximately **10 results**.
4.  **Select How Much Information to Return**: Choose to either return only relevant snippets in results or return the entire document containing the result.

For detailed search syntax and filter guidance, see [Search in Glean](/user-guide/search/how-to-search-in-glean) and [Advanced search filters](/user-guide/advanced/advanced-search-filter).

The configured search result set is dynamically integrated into agent workflows to provide comprehensive data for analysis and decision-making.

## Results selection[​](#results-selection "Direct link to Results selection")

Company Search uses Glean's search ranking to return the most relevant results for your query. It doesn't scan every document in a folder or connector. Instead, it retrieves a ranked subset of the most relevant matches, similar to how the Glean search results page works.

If you need the agent to consider more documents, you can:

-   Increase the number of results in the step configuration.
-   Use multiple Company Search steps with different, targeted queries.
-   Use filters to narrow results to specific connectors or containers.

## Best practices[​](#best-practices "Direct link to Best practices")

-   **Use manual queries for deterministic results:** When you know what terms or filters the search should use, define them directly instead of relying on AI-generated queries. Manual queries produce more consistent and predictable results.
-   **Increase the number of results for broader coverage:** Retrieving more documents gives the agent a larger pool to work with, which improves accuracy when the relevant information could appear across multiple documents.
-   **Use full document text when excerpts miss context:** If your agent has the correct documents but produces incomplete or inaccurate answers, switch from relevant excerpts to full document text. Keep in mind that full document text uses more tokens and may cause the agent to approach its [memory limit](/agents/concepts/memory).
-   **Wrap multi-word filter values in quotes:** Filter values that contain spaces must be quoted, or the filter may not work as expected. For example, use `organization:"Account Name"` instead of `organization:Account Name`.
-   **Use Collections to manage large document sets:** Instead of adding individual documents as filter sources, group them into a [Collection](/user-guide/knowledge/collections/how-collections-work) and reference the Collection. This simplifies maintenance and avoids configuration limits.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

If your company search step returns no results or unexpected results:

-   **Check document permissions:** Agents run with the permissions of the user who triggers them. Verify that the user can access the target documents in their native application.
-   **Review filter configuration:** Each distinct filter field creates an AND condition, which narrows results. Filters with the same field name create an OR condition between those values. Remove filters one at a time to identify which filter is excluding expected documents.
-   **Allow time for indexing:** Newly created or updated documents appear after the next crawl processes the change. Timing depends on the connector's crawl schedule, how much data the crawl needs to process, and the activity available for incremental updates. Confirm the document is indexed by searching for it in Glean before retesting.
-   **Use debug mode:** Open [debug mode](/agents/create-agents/debug-agent) to inspect the search queries your agent generated and the results returned.

For a complete walkthrough, see [Troubleshoot document retrieval in agents](/agents/create-agents/troubleshoot-document-retrieval).
