---
url: "https://docs.glean.com/tools/connector/snowflake/search-snowflake-with-sql"
canonical: "https://docs.glean.com/tools/connector/snowflake/search-snowflake-with-sql"
title: "Search Snowflake with SQL"
description: "Runs read-only SQL queries against Snowflake and returns tabular results"
fetched_at: "2026-09-01T13:30:06.701Z"
---
On this page

The *Search Snowflake with SQL tool* lets Glean agents run direct, read-only SQL against Snowflake and return the results to downstream steps.

Use this tool when you want full control over the SQL being executed while still composing the response in a Glean agent (for example, summarizing the data, sending a message, or updating another system).

## Limitations[​](#limitations "Direct link to Limitations")

-   The tool validates SQL to prevent writes and relies on Snowflake role permissions.
    
-   If no warehouse is provided, no default warehouse is configured in the tool setup, and the user has no default warehouse in Snowflake, the tool fails.
    
-   Missing privileges return authorization or *object does not exist* errors.
    
-   Snowflake errors surface back to the agent run and this is dependent on Snowflake service health.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   An admin has enabled and configured Snowflake tools in the Glean Admin Console.
    
-   **Snowflake role and permissions**
    
    -   A Snowflake role, for example, `GLEAN_QUERY_SNOWFLAKE_ROLE` with at least:
        
        -   `USAGE` on target databases and schemas.
            
        -   `SELECT` on the tables or views referenced in your SQL.
            
        -   `USAGE` on the warehouse used by the tool.
            
-   **User authentication**
    
    -   Users who run this tool have authenticated to Snowflake via OAuth from Glean.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Required | Recommended source | Description |
| --- | --- | --- | --- | --- |
| Query | String | Yes | Dynamic (user input or step) | Full read-only SQL statement to execute (for example, `SELECT COUNT(*) FROM ANALYTICS.CUSTOMERS LIMIT 5`). |
| Warehouse | String | No | Fixed in step configuration | Snowflake warehouse to execute the SQL. If omitted, the tool uses the default warehouse configured in the tool setup. If no default is configured, the tool uses the user's Snowflake default warehouse. |

## Usage example[​](#usage-example "Direct link to Usage example")

*Scenario:* Simple reporting query

*Goal:* run a fixed report query and present results in the agent response.

*Setup in Agent Builder:*

-   Add a trigger step, for example, an input form with a query in the text field.
    
-   Add the **Search Snowflake with SQL** tool and configure:
    
    -   **Query:** a fixed SQL statement, for example, `SELECT COUNT(*) AS customer_count FROM ANALYTICS.CUSTOMERS`.
        
    -   **Warehouse:** a reporting warehouse your role can use.
        
-   Add a **Respond** step to display the results as a table or summary.
    

*Resulting behavior:*

-   The tool executes the SQL in Snowflake and returns the result set.
    
-   The Respond step formats or summarizes the output.
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Warehouse missing or not authorized

-   **Possible cause:** No warehouse is specified in the step, no default warehouse is configured in the tool setup, the user has no default warehouse in Snowflake, or the role does not have `USAGE` on the warehouse.
-   **Fix:** Set a default warehouse in the Snowflake tool setup, or set the warehouse in the step configuration, and grant `USAGE` to the integration role.

### Object does not exist or is not authorized

-   **Possible cause:** Database, schema, or table names are missing, misspelled, or not visible to the role.
-   **Fix:** Use fully qualified names, for example, `DATABASE.SCHEMA.TABLE` and grant `USAGE`/`SELECT` privileges.

### HTML “File not Found” error from Snowflake

-   **Possible cause:** The Snowflake tools are misconfigured (account identifier mismatch).
-   **Fix:** Copy the account identifier from the Snowflake OAuth URLs into the tools configuration and re-authenticate.

### Query outside allowed schemas fails

-   **Possible cause:** The role lacks `USAGE`/`SELECT` on referenced objects.
-   **Fix:** Restrict queries to allowed objects or update grants for the integration role.

## FAQs[​](#faqs "Direct link to FAQs")

### Does this tool support write queries (INSERT, UPDATE, DELETE, DDL)?

No. The tool validates SQL as read-only and uses Snowflake roles scoped for reporting access.

### Which warehouse does the tool use?

The tool resolves the warehouse in this order: an explicitly selected warehouse (for example, in a workflow step) takes highest precedence, then the default warehouse configured in the tool setup, and finally the user’s default warehouse in Snowflake. If none of these are set, Snowflake returns an error.

### When should I use this tool versus Search Snowflake with Cortex?

Use Search Snowflake with SQL when you want direct SQL control. Use Search Snowflake with Cortex when you want natural language questions and generated SQL.
