---
url: "https://docs.glean.com/user-guide/assistant/query-snowflake-data-in-glean-assistant"
canonical: "https://docs.glean.com/user-guide/assistant/query-snowflake-data-in-glean-assistant"
title: "Query Snowflake data in Glean Assistant"
description: "Query your Snowflake warehouse with natural language or SQL in Assistant-governed, self-serve analysis without leaving chat."
fetched_at: "2026-09-01T13:30:39.394Z"
---
On this page

Glean lets you query Snowflake data in Assistant using natural language, direct SQL, and supported Cortex Agent workflows.

This gives you a governed, self-serve way to explore approved Snowflake data without leaving chat. Your organization controls which datasets, semantic views, and Cortex Agents are available in Glean, and all Snowflake queries from Assistant are read-only.

## Key features[​](#key-features "Direct link to Key features")

-   **Natural language queries:** Ask questions in plain language to explore approved Snowflake data.
-   **Direct SQL execution:** Run read-only SQL queries for precise ad hoc analysis when your admin has enable tools.
-   **Semantic view exploration:** Use approved semantic views to ask business-friendly questions over modeled warehouse data.
-   **Cortex Agent-backed workflows:** Use approved Cortex Agents when your organization has made them available in Glean.
-   **Interactive results:** View results as tables and, when supported, as charts or dashboards.
-   **Transparent citations:** See which Snowflake resource the response used and get clear feedback when a query needs adjustment.

## Query Snowflake data in Assistant[​](#query-snowflake-data-in-assistant "Direct link to Query Snowflake data in Assistant")

### Ask questions in natural language[​](#ask-questions-in-natural-language "Direct link to Ask questions in natural language")

Use this method for general data exploration. Assistant will interpret your intent and map it to the relevant Snowflake tables.

Example prompts:

-   "What was our quarterly revenue by region?"
-   "Show the top 10 customers by usage growth this month."
-   "Which support queues had the highest ticket volume last week?"

### Run SQL queries directly[​](#run-sql-queries-directly "Direct link to Run SQL queries directly")

If you have a specific query in mind or need advanced filtering, you can input SQL commands directly into the chat.

Example:

SQL

```
SELECT region, SUM(arr) AS total_arrFROM sales_summaryGROUP BY regionORDER BY total_arr DESC;
```

## Tips for better results[​](#tips-for-better-results "Direct link to Tips for better results")

To get the most accurate answers from Assistant, keep these best practices in mind:

-   Be specific: Include the exact metric like "ARR", dimension ("Region"), and time range ("Q3") in your prompt.
-   Mention datasets: If you know the specific view or table name for example `SALES_SUMMARY`, mention it to help Assistant find the right data faster.
-   Refine and rephrase: If the first answer seems incomplete, try rephrasing your question or switching to SQL for more granular control.
-   Check permissions: Your ability to query data depends on your Snowflake role. If a specific table is not appearing, verify with your admin that you have `SELECT` access.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### I can use Snowflake in Agents but not in Assistant

Your admin might still need to enable Snowflake for Assistant or configure access to the specific Snowflake resources you need in Assistant.

Access can differ by dataset, semantic view, or Cortex Agent. Even when Snowflake is available elsewhere in Glean, Assistant only shows the resources and tools your admin has enabled and made visible there.

![Enabling chat for Snowflake tools](/img/sf-natural-language.png)

### My query returns an error or no result

-   **Permissions:** Confirm with your admin that the relevant dataset, semantic view, or Cortex Agent is available to you in Glean and that your Snowflake role has the required access.
-   **Complexity:** If a natural language query fails, try breaking it into smaller questions or running a direct `SELECT` statement.
-   **Data Availability:** Ensure the data you are looking for has been synced or is accessible via the role Glean is using.

### Can I use Snowflake in Assistant without enabling every Snowflake resource?

Yes. Your admin can restrict Glean's Snowflake role so it can access only the datasets, semantic views, or Cortex Agents your organization wants to expose in Glean.

If your organization does not want to use specific Cortex Agents or semantic views in Assistant, admins can also remove access to those resources or set the visibility of the related tools to none.

### Why does a Cortex Agent request time out in Assistant?

Some Cortex Agent requests can time out in Glean if the agent has high latency or large token usage.

If this happens, ask your admin to review the timeout and token limits configured for the Cortex Agent in Snowflake. It can also help to narrow the request or break it into smaller questions.
