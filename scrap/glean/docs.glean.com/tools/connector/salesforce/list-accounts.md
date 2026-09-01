---
url: "https://docs.glean.com/tools/connector/salesforce/list-accounts"
canonical: "https://docs.glean.com/tools/connector/salesforce/list-accounts"
title: "List accounts"
description: "Lists Salesforce account records using a SOQL query for filtering and sorting"
fetched_at: "2026-09-01T13:30:05.587Z"
---
On this page

The *Salesforce list accounts* tool retrieves lists of Account records from your connected Salesforce org using a SOQL query. This is a read-only tool that allows agents to filter, sort, and control which account fields to return without modifying any Salesforce data.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    
-   The authenticated Salesforce user must have permission to view Account records based on your organization's sharing rules.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Query | String | SOQL query to fetch accounts. Use standard SOQL syntax to select fields, filter, sort, and limit results. Required. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "List all enterprise accounts in the West region sorted by annual revenue."
    
-   "Show me accounts in the technology industry that were created in the last 30 days."
    
-   "Find all accounts owned by the sales team with opportunities closing this quarter."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool fails with no connected account found or authentication error

-   **Possible cause:** The user has not connected Salesforce or the Salesforce connected app is not configured correctly.
-   **Fix:** Ask the user to connect Salesforce when Glean prompts them, then retry the tool. If errors persist, verify Salesforce tools setup and the connected app configuration.

### Tool returns SOQL or invalid field error

-   **Possible cause:** The Query parameter includes an invalid SOQL statement, such as a field name that does not exist in the Account object or a malformed WHERE clause.
-   **Fix:** Update the query to use valid Account field names and SOQL syntax. Check your Salesforce schema for available fields, then re-run the agent.

### Tool returns no results

-   **Possible cause:** The SOQL query is valid but no Account records match the filters.
-   **Fix:** Broaden the filters or temporarily remove conditions to confirm that the tool can return data, then refine the query. Verify that accounts matching your criteria exist in Salesforce.

### Query timeout or performance issues

-   **Possible cause:** The SOQL query is too broad or returns too many records, causing performance issues.
-   **Fix:** Add more specific filters to narrow down results. Use LIMIT clauses to restrict the number of returned records. Consider breaking large queries into smaller, more focused queries.

## FAQs[​](#faqs "Direct link to FAQs")

### What SOQL syntax is supported?

The tool supports standard Salesforce SOQL syntax including SELECT, WHERE, ORDER BY, and LIMIT clauses. You can filter by any Account field, use comparison operators, and combine conditions with AND/OR logic.

### Can I query custom fields?

Yes. You can include custom fields in your SOQL query as long as they exist in your Salesforce Account object and the authenticated user has permission to view them.

### How do I limit the number of results?

Use the LIMIT clause in your SOQL query (e.g., "SELECT Id, Name FROM Account WHERE Industry = 'Technology' LIMIT 100") to restrict the number of returned records.
