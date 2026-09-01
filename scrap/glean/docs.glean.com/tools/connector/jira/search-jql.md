---
url: "https://docs.glean.com/tools/connector/jira/search-jql"
canonical: "https://docs.glean.com/tools/connector/jira/search-jql"
title: "Search Jira with JQL"
description: "Searches for Jira issues using JQL"
fetched_at: "2026-09-01T13:30:03.882Z"
---
On this page

## Key features[​](#key-features "Direct link to Key features")

The Search Jira with JQL tool in Glean enables users to perform Jira searches using natural language, which is automatically converted to JQL and executed, returning Jira ticket data in a tabular format. This feature focuses on structured querying, automation, and making Jira ticket data easily accessible for further analysis and reporting. It can search through tickets in both Jira and Jira Service Management.

-   **Natural Language to JQL Conversion and Execution**: Allows users to ask questions in plain English, which are then translated into Jira Query Language (JQL). Fetches Jira issues matching the generated JQL and returns them as structured data.
-   **JQL Execution**: Allows users to paste JQL and fetch matching Jira issues as JSON, display them in chat, or use them in an agent's future steps.
-   **Follow-up Tools**: Supports follow-up queries about specific issues, linking related Slack threads or Google Docs.
-   **Best Used With Agents**: Designed for use within Glean-provided agents for the best quality and formatting of results.
-   **Result Download**: Users can download raw Jira search results as files for larger datasets from the link provided in intermediate steps, as well as link to the Jira issues page.

## Usage instructions[​](#usage-instructions "Direct link to Usage instructions")

### Set up in Agent builder[​](#set-up-in-agent-builder "Direct link to Set up in Agent builder")

This step is needed only once per tools.

1.  In the Agent Builder, select the Jira tool by navigating to **Select Step → Tools → By connector → \[your tools name\]**.
2.  Authenticate Jira by clicking **Connect**.
3.  On Atlassian's authorization page, select the instance that matches the connector instance set previously in the Admin Console and click **Accept**.
4.  Configure the service desks that are applicable for this instance of the tool. Provide instructions such as:
    -   "'IT Support' project is used for access requests, hardware issues, or general IT inquiries. 'Customer Support' project is used for issues reported by customers. If there is no clear match, use 'IT Support' as a fallback."
    -   "'Request software access' request type is used for any request for new software. 'Request admin access' is used when a request specifically calls out admin permissions. 'Hardware issue' is for laptops, phones, monitors, or any other hardware device issues. If there is no clear match, use 'IT Support' as a fallback."
    -   The more specific the instructions, the better Glean will be able to suggest the right service desk and request type when creating a request.
5.  Use and test the tool with queries such as "Issues assigned to me" or "assignee = currentUser()".

## Examples[​](#examples "Direct link to Examples")

-   **Ticket Monitoring**: "Show me tickets assigned to me created in the last 30 days, grouped by priority and shown as a table."
-   **Work Queue Review**: "What open issues do I have assigned to me?"
-   **Priority Management**: "Do I have any open highest-priority Jira tickets assigned to me, created in the last 30 days?"
-   **Component Analysis**: "Which components had the most issues last week?"
-   **User Audit**: "Which user had the most tickets assigned last week?"

## Best practices and troubleshooting[​](#best-practices-and-troubleshooting "Direct link to Best practices and troubleshooting")

-   If the Jira tools are missing in the Agent Builder, check whether the initial admin setup for Jira was completed by the admin.
-   To enhance your JQL query, run it directly in the Jira instance (**Filters → Search work items**) to verify the search results.
-   Search on [app.glean.com](http://app.glean.com) with `app:jira` and click **All filters** to understand facets available to use in the Jira search tool (e.g., Updated, From, Type, Assignee, etc.).
-   Note that every user needs to connect their account to Jira before running the agent.

## Known limitations[​](#known-limitations "Direct link to Known limitations")

-   Fetches up to 100 issues for each underlying Jira API call by default.
-   Supports up to 500 results per search.
-   The response returned to the agent is capped by size (approximately 1 MB) and by issue count, whichever limit is reached first. When a cap is hit, only the issues that fit are returned in-context. The remainder are available through the download link on the tool's intermediate step output.
-   JQL query size is limited to 2,000 characters.
-   Limited to one Jira Cloud instance per customer.
-   Does not support aggregations or combining with other structured data natively.
-   Can only return a list of issues, not aggregate data.
-   Each API call retrieves a fixed page of issues. A response-size cap can reduce the number of issues returned per page when individual issues are large, for example, when they contain long descriptions or many custom fields.
-   Agent runs have an overall tool-call budget that limits how many pages the agent can fetch in a single execution. Queries returning hundreds of results may not complete pagination within this budget.
-   Pagination through additional pages of results is available only in adaptive planning and plan-and-execute agent setups. Search Jira with JQL steps inside static workflow agents don't page through subsequent results automatically.

## Handling large result sets[​](#handling-large-result-sets "Direct link to Handling large result sets")

When a JQL query matches more issues than fit in a single agent response, use one or more of these strategies.

### Use the download link[​](#use-the-download-link "Direct link to Use the download link")

Every Search Jira with JQL tool run includes a download link in the intermediate step output. This link can contain more issues than the agent displays in chat, independent of the in-context response-size cap. Use this option when you need the complete dataset for further processing in a later step, or when teammates need to save the data locally.

### Validate expected counts in Jira[​](#validate-expected-counts-in-jira "Direct link to Validate expected counts in Jira")

Before investigating gaps in agent output, run your JQL directly in Jira (**Filters → Search work items**) to confirm how many issues match. This establishes a baseline for comparison.

### Refine the JQL with filters[​](#refine-the-jql-with-filters "Direct link to Refine the JQL with filters")

Narrow your query so it returns a manageable set of issues:

-   Time range — `created >= -90d` or `updated >= -30d`
-   Status — `status in ("In Progress", "Open")`
-   Assignee — `assignee = currentUser()`
-   Priority — `priority in (High, Highest)`
-   Project scope — `project = PROJ AND component = "Billing"`

### Batch by time window[​](#batch-by-time-window "Direct link to Batch by time window")

For projects with thousands of issues, split a single broad query into multiple date-bounded queries and aggregate the results in a later step:

```
project = PROJ AND created >= 2026-01-01 AND created < 2026-02-01project = PROJ AND created >= 2026-02-01 AND created < 2026-03-01
```

You can also batch by fields like status, priority, or assignee — for example, `project = PROJ AND status = "In Progress"` followed by `project = PROJ AND status = "Done"`.

Then pass the aggregated output to an [Analyze data](/tools/glean/analyze-data) step for summarization.

Keep in mind that each agent run has a limit on the total number of tool calls it can make, so size your time windows accordingly. See [Agent execution limits](/agents/concepts/execution-limits) and [Limits and exhaustive retrieval best practices](/agents/concepts/limits-and-best-practices) for details.
