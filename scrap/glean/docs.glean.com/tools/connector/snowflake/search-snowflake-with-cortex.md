---
url: "https://docs.glean.com/tools/connector/snowflake/search-snowflake-with-cortex"
canonical: "https://docs.glean.com/tools/connector/snowflake/search-snowflake-with-cortex"
title: "Search Snowflake with Cortex"
description: "Searches Snowflake with Cortex Analyst using natural language queries"
fetched_at: "2026-09-01T13:30:06.717Z"
---
On this page

The *Search Snowflake with Cortex tool* lets Glean agents ask Snowflake Cortex Analyst a natural language question and return results for downstream steps. You can scope the question with semantic model files or semantic views and choose the warehouse that runs the generated SQL.

Use this tool when you want Snowflake to interpret the question and generate SQL while you control how the response is presented in your Glean agent, for example, summarize results or post a report.

## Limitations[​](#limitations "Direct link to Limitations")

-   Each run sends one query and returns one response.
    
-   If no warehouse is provided, no default warehouse is configured in the tool setup, and the user has no default warehouse in Snowflake, the tool fails.
    
-   The tool can read or write data depending on the generated SQL and the role’s privileges.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   An admin has enabled and configured Snowflake tools in the Glean Admin Console.
    
-   **Snowflake role and permissions**
    
    -   A Snowflake role (for example, `GLEAN_QUERY_SNOWFLAKE_ROLE`) with at least:
        
        -   `USAGE` and `SELECT` on the databases, schemas, and tables referenced by your semantic models or views.
            
        -   Any Cortex roles required by your organization for Cortex Analyst usage.
            
        -   `USAGE` on the warehouse specified in the tool.
            
-   **Semantic models or semantic views**
    
    -   You have created and tested the semantic model files or semantic views used by Cortex Analyst.
-   **User authentication**
    
    -   Users who run this tool have authenticated to Snowflake via OAuth from Glean.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Required | Recommended source | Description |
| --- | --- | --- | --- | --- |
| Natural language query | string | Yes | Dynamic (user input or step) | Natural language question or request for Cortex Analyst. Include relevant business context, filters, and constraints. |
| Semantic model files | string | Recommended | Fixed in step configuration | Comma-separated list of semantic model files to use for the Cortex Analyst query. |
| Semantic views | string | Yes | Dynamic | Comma-separated list of semantic views to use for the Cortex Analyst query. |
| Snowflake warehouse | string | No | Fixed in step configuration | Snowflake warehouse to execute the generated SQL. If omitted, the tool uses the default warehouse configured in the tool setup. If no default is configured, the user's Snowflake default warehouse is used. |

## Usage example[​](#usage-example "Direct link to Usage example")

*Scenario:* Revenue insights through Cortex Analyst

*Goal:* let users ask a revenue question and reuse the results in a broader workflow.

*Setup in Agent Builder:*

-   Add a trigger step, for example, an input form with a query in the text field.
    
-   Add the **Search Snowflake with Cortex** tool and configure:
    
    -   **Query:** `[[query]]`
        
    -   **Semantic models or views:** the models or views that define your revenue metrics
        
    -   **Warehouse:** a warehouse with access to the underlying data
        
-   Add a **Respond** step that formats the tool output, for example showing a table when multiple rows are returned.
    

*Resulting behavior:*

-   The tool sends the user’s question and configuration to Cortex Analyst.
    
-   Cortex Analyst generates SQL, runs it, and returns the results.
    
-   The Respond step presents the results to the user.
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Warehouse missing or not authorized

-   **Possible cause:** No warehouse is specified in the step, no default warehouse is configured in the tool setup, the user has no default warehouse in Snowflake, or the role does not have `USAGE` on the warehouse.
-   **Fix:** Set a default warehouse in the Snowflake tool setup, or set the warehouse in the step configuration, and grant `USAGE` to the integration role.

### Object does not exist or is not authorized

-   **Possible cause:** Database, schema, or table names are missing, misspelled, or not visible to the role.
-   **Fix:** Use fully qualified names (for example, `DATABASE.SCHEMA.TABLE`) in semantic models or views and grant `USAGE`/`SELECT` privileges.

### Results are incomplete or not business-relevant

-   **Possible cause:** Semantic models or views are incomplete, or the query lacks context.
-   **Fix:** Refine semantic models or views and update agent prompts to include clear time windows, filters, and constraints.

### Snowflake or network errors

-   **Possible cause:** OAuth integration or network policies prevent access to Snowflake.
-   **Fix:** Verify Snowflake Tools setup, OAuth integration, and network policies that allow Glean access.

## FAQs[​](#faqs "Direct link to FAQs")

### Can this tool change data in Snowflake?

The tool generates and runs SQL using the configured Snowflake role. Whether data can change depends on that SQL and the role’s privileges.
