---
url: "https://docs.glean.com/agents/concepts/limits-and-best-practices"
canonical: "https://docs.glean.com/agents/concepts/limits-and-best-practices"
title: "Limits and exhaustive retrieval best practices"
description: "Understand agent execution limits and choose the right retrieval approach for different use cases."
fetched_at: "2026-09-01T13:29:16.401Z"
---
On this page

Agents execute multi-step workflows that may query, transform, and write data across many systems. Each execution is subject to guardrails that control cost, latency, and reliability. Understanding these limits helps you design agents that retrieve the data you need without running into truncation or budget constraints.

## Tool-call budget[​](#tool-call-budget "Direct link to Tool-call budget")

Each agent run has a maximum number of tool calls it can make. This budget covers every tool the agent invokes - searches, reads, writes, and orchestration steps all count toward the same limit.

When an agent needs to paginate or iterate across many records, design the workflow so each step does meaningful work. For example, batch records by date range or status rather than fetching one record at a time.

tip

If your agent is running out of tool calls before it finishes, break the work into fewer, broader queries rather than many narrow ones.

## Response payload size[​](#response-payload-size "Direct link to Response payload size")

Each tool response is subject to a size cap. When a search or query returns many large records, the response may be truncated even though the underlying system has more matches.

Several tools - including [Search Jira with JQL](/tools/connector/jira/search-jql) and [Search Salesforce with SOQL](/tools/connector/salesforce/search-salesforce-with-soql) - provide a downloadable result link so you can retrieve the full dataset outside of the in-chat response. Look for a download link in the intermediate step output when working with large result sets.

## Use native connector tools for large datasets[​](#use-native-connector-tools-for-large-datasets "Direct link to Use native connector tools for large datasets")

Agents have two broad ways to retrieve data: **company search** and **native connector tools**. Choosing the right one depends on whether you need ranked relevance or exhaustive enumeration.

### Company search[​](#company-search "Direct link to Company search")

Use [company search](/tools/glean/company-search) when you want:

-   Ranked, permission-aware retrieval across one or more connectors.
-   Relevance-ordered results based on the query.
-   A broad sweep without needing every matching record.

Company search is ideal for questions like "find the most relevant Confluence pages about deployment procedures" or "show me recent Slack messages about the Q3 launch."

### Native connector tools[​](#native-connector-tools "Direct link to Native connector tools")

Use native connector tools - such as [Search Jira with JQL](/tools/connector/jira/search-jql), [Search Salesforce with SOQL](/tools/connector/salesforce/search-salesforce-with-soql), or [Search Databricks with SQL](/tools/connector/databricks-tools) - when you need:

-   **Exhaustive enumeration** - for example, listing every open ticket in a project or every opportunity closing this quarter.
-   **Precise field-based filtering** that the Glean index doesn't expose - for example, filtering by a custom Jira field or a Salesforce formula field.
-   **Aggregations or sorting** that company search doesn't support - for example, counting tickets by priority or summing opportunity amounts by stage.

### When to combine both[​](#when-to-combine-both "Direct link to When to combine both")

A common pattern is to use a native tool for exhaustive enumeration, then pass the structured output to a [respond](/tools/glean/respond) step or an [analyze data](/tools/glean/analyze-data) step for summarization. For example:

1.  Use **Search Jira with JQL** to retrieve all P1 tickets from the past month.
2.  Pass the results to an **analyze data** step to generate a summary table grouped by assignee.
3.  Use a **respond** step to present the analysis to the user.

## Choosing result counts for company search[​](#choosing-result-counts-for-company-search "Direct link to Choosing result counts for company search")

Company search steps let you configure how many results to retrieve per search. Higher numbers broaden recall but use more of the agent's working memory and can degrade response quality when the model must reason over many conflicting or irrelevant results.

Start with a lower result count and increase it only when your agent's answers are missing relevant context. If you need every matching record rather than the top results, use a native connector tool instead.

## Pagination and batching for large result sets[​](#pagination-and-batching-for-large-result-sets "Direct link to Pagination and batching for large result sets")

When a project, account, or ticket queue contains more records than a single tool call can return, use field-based batching to retrieve results in manageable chunks:

-   **Time-based batching** - split queries by date range. For example, query one month at a time using JQL like `project = ABC AND created >= "2025-01-01" AND created < "2025-02-01"`.
-   **Field-based batching** - split queries by a categorical field such as status, priority, or assignee.

Agents can iterate across batches using looping steps and aggregate the results into a spreadsheet output or a consolidated response. For a worked example using JQL, see [Handling large result sets](/tools/connector/jira/search-jql#handling-large-result-sets) on the Search Jira with JQL page.
