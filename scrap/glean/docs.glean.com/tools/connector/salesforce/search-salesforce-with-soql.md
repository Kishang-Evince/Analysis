---
url: "https://docs.glean.com/tools/connector/salesforce/search-salesforce-with-soql"
canonical: "https://docs.glean.com/tools/connector/salesforce/search-salesforce-with-soql"
title: "Search Salesforce with SOQL"
description: "Query Salesforce using Salesforce Object Query Language"
fetched_at: "2026-09-01T13:30:06.102Z"
---
On this page

## Key Features[​](#key-features "Direct link to Key Features")

-   **SOQL Integration**: Lets users query Salesforce using Salesforce Object Query Language for targeted, accurate answers.
-   **Real-Time Data Retrieval**: Fetches up-to-date records from standard (Accounts, Opportunities, Leads, Contacts, Cases) and custom objects (if configured).
-   **Customizable Data Model**: Admins can describe their Salesforce schema to optimize query relevance.
-   **Multi-Record and Aggregated Queries**: Supports filtered, basic computed, and aggregated queries (requires schema hints).
-   **Single-Record and Field Lookup**: Enables retrieval of information for individual Salesforce records, including those with custom fields.

## Usage Instructions[​](#usage-instructions "Direct link to Usage Instructions")

### Set Up in Agent Builder[​](#set-up-in-agent-builder "Direct link to Set Up in Agent Builder")

1.  In the Agent Builder, select the **Search Salesforce with SOQL** tool by navigating to **Select Step → Tools → By connector → Salesforce Tools → Search Salesforce with SOQL**.
2.  Use and test the tool with queries such as `SELECT * FROM Opportunity WHERE Amount > 100000`. If you need help building the SOQL, use the SOQL builder agent linked in the step instructions. Refer to the **Best Practices** section for tips on getting the best results from your SOQL builder agent.
3.  For advanced usage, add an **Analyze Data** step.

## Examples[​](#examples "Direct link to Examples")

-   **Opportunity Status**: "What is the stage of the Acme opportunity?"
-   **Custom Object Lookup**: "Who is the CSM for the Acme account?"
-   **Aggregation**: "Total ARR of all the opportunities closed from June to August."
-   **Use Case Association**: "What are the use cases associated with the Acme account?"

## Best Practices and Troubleshooting[​](#best-practices-and-troubleshooting "Direct link to Best Practices and Troubleshooting")

-   Initial admin setup for the Salesforce data model is required in the Connectors setup page.

## Known Limitations[​](#known-limitations "Direct link to Known Limitations")

-   Out-of-the-box support for standard objects; custom objects require additional configuration.
-   Cannot search multiple records at once; queries must be split for multi-entity lookups.
-   Search results exceeding 1000 rows will not be shown.
-   Referential (Service Cloud) objects such as Knowledge Bases and Cases are excluded.
-   Not all Salesforce object types, dashboards, or attachments are indexed.
-   Users may experience doc QA issues (e.g., difficulties with follow-up summaries or pasted links).
-   Does not support multiple salesforce instances.
