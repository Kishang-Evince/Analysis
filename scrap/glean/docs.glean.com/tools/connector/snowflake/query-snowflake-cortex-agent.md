---
url: "https://docs.glean.com/tools/connector/snowflake/query-snowflake-cortex-agent"
canonical: "https://docs.glean.com/tools/connector/snowflake/query-snowflake-cortex-agent"
title: "Snowflake Cortex Agent tool"
description: "Queries a Snowflake Cortex Agent in natural language and returns its response"
fetched_at: "2026-09-01T13:30:06.738Z"
---
On this page

The *Snowflake Cortex Agent tool* lets Glean agents ask a natural language question to a Cortex Agent you already manage in Snowflake and return the agent’s answer. Provide the agent’s database, schema, and name, plus the question with business context, filters, and constraints. Snowflake can orchestrate tools such as Cortex Search, Cortex Analyst, and custom tools, then return free-form text, optional tables, and execution updates so you can build a final response in your Glean agent, for example, summarize the answer, post to Slack, or file a ticket.

This is a read tool. It calls Snowflake’s Cortex Agents REST API, which may run Cortex Search and text-to-SQL queries over your Snowflake data. The tool itself does not modify data; it executes the read operations the configured Cortex Agent performs to answer the question.

## Limitations[​](#limitations "Direct link to Limitations")

-   Each run sends one question and returns one response. Use separate runs for follow-up questions.
    
-   Chart configs, for example, Vega specs are not rendered.
    
-   There is a timeout risk for long-running agents and Glean steps can time out before the agent finishes.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   An admin has enabled and configured Snowflake tools in the Glean Admin Console.
    
-   **Snowflake role and permissions**
    
    -   A Snowflake role (for example, `GLEAN_QUERY_SNOWFLAKE_ROLE`) with at least:
        
        -   Database role: `SNOWFLAKE.CORTEX_USER` or `SNOWFLAKE.CORTEX_AGENT_USER`.
            
        -   `USAGE` on the agent’s database, schema, and the agent object itself.
            
        -   `USAGE` and `SELECT` on any databases, schemas, and tables referenced by the agent’s semantic models.
            
        -   `USAGE` (and `EXECUTE`, if needed) on any stored procedures or UDFs used as custom tools in the agent.
            
-   **Existing Cortex Agent in Snowflake**
    
    -   You have already created and tested a Cortex Agent in the target Snowflake account.
        
    -   You know its **database**, **schema**, and **agent name**.
        

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Required | Recommended source | Description |
| --- | --- | --- | --- | --- |
| Query | string | Yes | Dynamic (user input or step) | Natural language question or request for the Cortex Agent. Include business context, filters, and constraints. |
| Database | string | Yes | Fixed in step configuration | Name of the Snowflake database that contains the Cortex Agent. |
| Schema | string | Yes | Fixed in step configuration | Name of the Snowflake schema that contains the Cortex Agent. |
| Agent Name | string | Yes | Fixed in step configuration | Name of the Cortex Agent to query (as defined in Snowflake). |

## Usage example[​](#usage-example "Direct link to Usage example")

*Scenario:* Revenue insights via Cortex Agent

*Goal:* Let users ask a revenue question and reuse the result in a broader workflow.

*Setup in Agent Builder:*

-   Add a trigger step, for example, an input form with a query in the text field.
    
-   Add the **Snowflake Cortex Agent tool** and configure:
    
    -   **Query:** `[[query]]`
        
    -   **Database:** your agent’s database (for example, `CORTEX_ANALYST_DEMO`).
        
    -   **Schema:** your agent’s schema (for example, `REVENUE_TIMESERIES`).
        
    -   **Agent name:** the agent name (for example, `revenue_agent`).
        
-   Add a **Respond** step that returns the tool’s `response` field.
    

*Resulting behavior*:

-   The tool sends the user’s question as the `query` to the configured Cortex Agent, qualified by the database, schema, and its name.
    
-   The Cortex Agent can interpret time windows, for example, “last quarter”, run Cortex Search, and generate text-to-SQL queries as configured.
    
-   The tool returns the agent’s final answer text and any tabular results, plus execution updates.
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Database, schema, or agent name missing

-   **Possible cause:** One or more of `database`, `schema`, or `agentName` is empty in the step configuration.
-   **Fix:** Edit the Cortex Agent step in Agent Builder and set non-empty values for **Database**, **Schema**, and **Agent name** that match the agent definition in Snowflake, then run the agent again.

### Natural language query missing

-   **Possible cause:** The `query` parameter is empty or not mapped correctly from the trigger or previous step.
-   **Fix:** Ensure the **Query** field references a valid variable (for example, `[[query]]`) or fixed text. Test with a simple hard-coded question to confirm.

### Error from Cortex Agent

-   **Possible cause:** The Cortex Agent reported an error while processing the query (for example, misconfigured agent, missing data, or internal error).
-   **Fix:** Open Snowflake, review the Cortex Agent’s configuration and logs for the affected agent, fix any issues in the agent definition (tools, prompts, permissions, or data), and retry from Glean.

### HTTP 4xx/5xx from Snowflake

-   **Possible cause:** OAuth integration, network policy, or role configuration issues prevent access to the Cortex Agent endpoint or its underlying resources.
-   **Fix:** Verify Snowflake Tools setup: network policies allow Glean IPs, the OAuth security integration is configured as documented, and the role used for the tool can access the database, schema, agent, and any referenced tables or views.

### Results are incomplete or not business-relevant

-   **Possible cause:** The Cortex Agent’s prompts or tools do not fully capture your business logic, or the query lacks sufficient context.
-   **Fix:** Refine the Cortex Agent’s definition in Snowflake (prompts, tools, and example queries) and update your Glean agent instructions to ask more specific questions with clear time windows, filters, and constraints. Then test again.

## FAQs[​](#faqs "Direct link to FAQs")

### Who configures and maintains the Cortex Agent?

You configure and manage Cortex Agents directly in Snowflake. Glean calls the agent you specify by database, schema, and agent name; it does not edit the agent definition.

### Can I use multiple Cortex Agents in one Glean agent?

Yes. Add multiple Snowflake Cortex Agent tool steps, each pointing to a different agent (or use different Glean agents), and chain their results into downstream steps as needed.
