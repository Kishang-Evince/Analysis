---
url: "https://docs.glean.com/tools/connector/salesforce/salesforce-search"
canonical: "https://docs.glean.com/tools/connector/salesforce/salesforce-search"
title: "Salesforce Search"
description: "Searches Salesforce by combining indexed Salesforce content in Glean with live SOQL queries"
fetched_at: "2026-09-01T13:30:05.684Z"
---
On this page

## Key Features[​](#key-features "Direct link to Key Features")

This tool allows Glean to intelligently combine indexed Salesforce documents along with data fetched from Salesforce using SOQL to best answer queries.

## Usage Instructions[​](#usage-instructions "Direct link to Usage Instructions")

This tool internally uses the "Search Salesforce with SOQL" tool. Ensure "Search Salesforce with SOQL" is enabled in order to use this Tool.

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
