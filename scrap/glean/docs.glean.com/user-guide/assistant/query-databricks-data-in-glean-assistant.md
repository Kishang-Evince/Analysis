---
url: "https://docs.glean.com/user-guide/assistant/query-databricks-data-in-glean-assistant"
canonical: "https://docs.glean.com/user-guide/assistant/query-databricks-data-in-glean-assistant"
title: "Query Databricks data in Glean Assistant"
description: "Ask natural-language questions about your Databricks data in Assistant — Glean routes to the best Genie space and returns results in Assistant."
fetched_at: "2026-09-01T13:30:39.373Z"
---
On this page

Glean Assistant lets you query your Databricks data by asking natural-language questions directly in Assistant. When you ask a data question, Assistant automatically identifies the most relevant Databricks Genie space and sends your question to it. You get results — including tables and charts — without leaving Glean or writing SQL.

Your organization controls which Databricks Genie spaces are available. All queries run with your own Databricks permissions, so you only see data you're authorized to access.

## What you can do[​](#what-you-can-do "Direct link to What you can do")

-   **Natural-language queries:** Ask questions as you would to a data analyst. Assistant routes your question to the best-matching Genie space automatically.
-   **Direct SQL execution:** Run read-only SQL queries against Databricks for precise, ad-hoc analysis.
-   **Tabular results:** View results in a clean, easy-to-read table format directly in Assistant.
-   **Transparent routing:** See which Genie space handled your question and where the data came from.

## Query Databricks data in Assistant[​](#query-databricks-data-in-assistant "Direct link to Query Databricks data in Assistant")

### Ask questions in natural language[​](#ask-questions-in-natural-language "Direct link to Ask questions in natural language")

Use this method for general data exploration. Assistant finds the right Genie space based on your question and returns the results.

Example prompts:

-   "What was our quarterly revenue by region?"
-   "Show the top 10 customers by usage growth this month."
-   "Which product categories had the highest sales last week?"

Assistant uses indexed Genie space metadata — including descriptions, sample questions, and table information — to match your question to the right space. Adding context like metric names, dimensions, or time ranges helps Assistant find the best match.

### Run SQL queries directly[​](#run-sql-queries-directly "Direct link to Run SQL queries directly")

If you have a specific query in mind or need advanced filtering, enter SQL commands directly in Assistant. Prefix your message so Assistant knows you want direct SQL execution.

Example:

SQL

```
SELECT region, SUM(revenue) AS total_revenueFROM sales_summaryGROUP BY regionORDER BY total_revenue DESC;
```

## Tips for better results[​](#tips-for-better-results "Direct link to Tips for better results")

To get the most accurate answers from Assistant, keep these best practices in mind:

-   **Be specific:** Include the exact metric (for example, "revenue"), dimension ("region"), and time range ("Q3") in your prompt.
-   **Use natural language:** Assistant routes to Genie spaces, which are designed for natural-language questions. You don't need to know table names or SQL syntax.
-   **Refine and rephrase:** If the first answer seems incomplete, try rephrasing your question with more context. You can also switch to SQL for more granular control.
-   **Check permissions:** Your ability to query data depends on your Databricks permissions. If a specific Genie space or table isn't available, verify with your admin that you have access.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### I can use Databricks in Agents but not in Assistant

Databricks support in Assistant is a new feature. Even if your organization uses Databricks with agents, an admin must specifically enable Databricks in Assistant for your deployment.

### My query returns an error or no results

-   **Permissions:** Confirm with your admin that the Genie space is available and that your Databricks account has access.
-   **Genie space coverage:** The question may not match any available Genie space. Try rephrasing or ask your admin which Genie spaces are configured.
-   **SQL fallback:** If natural-language queries aren't returning results, try running a direct SQL query instead.

### Assistant used the wrong Genie space

Assistant selects a Genie space based on indexed metadata. Adding more detail to your question — such as specific metric names or dataset references — helps Assistant choose the right space.
