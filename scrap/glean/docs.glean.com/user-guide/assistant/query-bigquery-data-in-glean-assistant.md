---
url: "https://docs.glean.com/user-guide/assistant/query-bigquery-data-in-glean-assistant"
canonical: "https://docs.glean.com/user-guide/assistant/query-bigquery-data-in-glean-assistant"
title: "Query BigQuery data in Glean"
description: "Ask natural-language questions or run SQL against your BigQuery data directly in Glean."
fetched_at: "2026-09-01T13:30:39.356Z"
---
On this page

Glean lets you query your BigQuery datasets by asking questions in natural language or running SQL directly in the conversation. When you ask a data question, Glean routes it to BigQuery and returns the results without you needing to leave Glean.

Your organization controls the BigQuery project that Glean connects to. Within that project scope, queries run with your Google Cloud permissions, so you only see the datasets and tables you can access.

## What you can do[​](#what-you-can-do "Direct link to What you can do")

-   **Natural-language queries:** Ask questions as you would to a data analyst. Glean translates your question into a BigQuery query and returns the results.
-   **Direct SQL execution:** Run read-only SQL queries in BigQuery for precise, ad hoc analysis.
-   **Tabular results:** View results in a clean, easy-to-read table format directly in Glean.
-   **Transparent citations:** See which BigQuery resource the response used and where the data came from.

## Query BigQuery data[​](#query-bigquery-data "Direct link to Query BigQuery data")

### Ask questions in natural language[​](#ask-questions-in-natural-language "Direct link to Ask questions in natural language")

Use this method for general data exploration. Glean interprets your intent and maps it to the relevant BigQuery tables.

Example prompts:

-   "What was quarterly revenue by region?"
-   "Show the top 10 customers by usage growth this month."
-   "Which product categories had the highest sales last week?"

### Run SQL queries directly[​](#run-sql-queries-directly "Direct link to Run SQL queries directly")

If you have a specific query in mind or need advanced filtering, enter SQL commands directly in Glean.

Example:

SQL

```
SELECT region, SUM(revenue) AS total_revenueFROM sales.summaryGROUP BY regionORDER BY total_revenue DESC;
```

## Tips for better results[​](#tips-for-better-results "Direct link to Tips for better results")

-   **Be specific:** Include the exact metric (for example, "revenue"), dimension ("region"), and time range ("Q3") in your prompt.
-   **Mention datasets:** If you know the specific table or dataset name, mention it to help Glean find the right data faster.
-   **Refine and rephrase:** If the first answer seems incomplete, try rephrasing your question or switching to SQL for more granular control.
-   **Check permissions:** Your ability to query data depends on your Google Cloud Identity and Access Management (IAM) roles. If a specific dataset or table is not available, verify with your admin that you have the required access.

## Customize how Glean queries BigQuery[​](#customize-how-glean-queries-bigquery "Direct link to Customize how Glean queries BigQuery")

Glean uses a built-in skill called `query-bigquery` to control how it generates queries, formats results, and interprets your questions. If the default behavior does not match your needs, you can customize it.

To modify the skill:

1.  Go to **Settings → Skills** and find the `query-bigquery` skill.
2.  Clone the skill to create an editable copy.
3.  Update the instructions, for example, to prefer specific tables or adjust result formatting.
4.  Upload the modified skill with the same title (`query-bigquery`) to replace the default version.

For more details, see [Skills](/user-guide/assistant/skills).

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### BigQuery is not available in Glean

Your admin might not have connected BigQuery yet. Ask your admin to verify the BigQuery connector in the **admin console** under **Platform → Connectors**.

### My query returns an error or no results

-   **Permissions:** Confirm with your admin that you have the Google Cloud Identity and Access Management (IAM) access required for the connected project, including `roles/mcp.toolUser` and `roles/bigquery.jobUser`, plus read access to the relevant datasets or tables
-   **Complexity:** If a natural-language query fails, try breaking it into smaller questions or running a direct SQL statement
-   **Data availability:** Make sure the data you want is in the connected project and that your Google account can access the relevant datasets or tables

### I'm prompted to authorize but the flow fails

Check that your Google account has access to the connected BigQuery project and that your admin configured the OAuth client correctly
