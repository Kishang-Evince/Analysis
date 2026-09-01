---
url: "https://docs.glean.com/tools/glean/retrieve-search-insights"
canonical: "https://docs.glean.com/tools/glean/retrieve-search-insights"
title: "Retrieve search insights"
description: "This article documents the Retrieve search insights tool, which allows you to access and analyze your historical search queries in Glean over a specified time period."
fetched_at: "2026-09-01T13:30:07.508Z"
---
On this page

The retrieve search insights tool enables you to retrieve and review your past search queries within Glean for a defined date range. By providing structured access to your search history, this tool helps you understand your information-seeking patterns, track recurring interests, and analyze your search behavior over time. The tool is read-only, idempotent, and does not modify any data or have side effects. Pagination or result limits may apply for very large search histories (implementation-dependent). The results are ordered chronologically by query timestamp and partial results may be returned if the date range is large or if there are system-imposed limits.

## Capabilities[​](#capabilities "Direct link to Capabilities")

-   Retrieves a list of your search queries performed in Glean during a specified time period.
-   Analyze historical search behavior to identify trends or recurring topics.
-   Use in Glean Agents to power workflows that require search history context.
-   Only retrieves search queries for the authenticated user and you cannot access other users search histories.

## Limitations[​](#limitations "Direct link to Limitations")

-   The tool returns raw search queries, which may include sensitive or personally identifiable information (PII).
-   The date range must be valid, start date before end date, formatted as yyyy-mm-dd.
-   Results are limited to the available search history within your organization’s data retention policy.

## Prerequisites and permissions[​](#prerequisites-and-permissions "Direct link to Prerequisites and permissions")

-   You must have an active Glean account and you must be signed in.
-   No special permissions are required beyond standard user access.
-   The tool is available in Glean Agents and may require your admin to enable it in the agent builder or tools configuration.

## Inputs[​](#inputs "Direct link to Inputs")

| Name | Type | Required | Default | Allowed values | Example | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| start\_date | string | Yes | None | yyyy-mm-dd, **week ago** | 2025-03-01 | Inclusive. The beginning of the period to retrieve search queries from. |
| end\_date | string | Yes | None | yyyy-mm-dd, **now** | 2025-03-08 | Exclusive. Must be after start\_date. |

-   Both dates must be provided in ISO format (yyyy-mm-dd) or as relative phrases like **last week** or **now**.

## Outputs[​](#outputs "Direct link to Outputs")

-   Returns a JSON object containing details of the user’s search queries within the specified period.
-   Each entry typically includes:
    -   Query text
    -   Timestamp
    -   Additional metadata if available, such as search context.
-   Example output:

```
{  "searches": [    {      "query": "project roadmap",      "timestamp": "2025-03-02T10:15:00Z"    },    {      "query": "Q1 OKRs",      "timestamp": "2025-03-03T14:22:00Z"    }  ]}
```

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   Minimal:  
    “What did I search for last week?”  
    Returns all your search queries from the previous week.
    
-   Typical:  
    “List all my searches from March 1 to March 8, 2025.”  
    Returns your search queries between those dates.
    
-   Advanced:  
    “Show my search history for the last month and highlight repeated queries.”  
    Returns your search queries for the last month; further analysis can be performed on the output.
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

| Error message | Cause | Fix |
| --- | --- | --- |
| **Invalid date format** | Dates not in yyyy-mm-dd or recognized phrase | Use ISO format or supported relative phrases. |
| **End date must be after start date** | end\_date is before or equal to start\_date | Adjust the date range so end\_date is after start\_date. |
| **No search history found** | No queries in the specified period | Try a different or broader date range. |
| **Permission denied** | User not authenticated or lacks access | Sign in to Glean and ensure you have standard user access. |

## FAQs[​](#faqs "Direct link to FAQs")

### Can I retrieve another user’s search history?

No. The tool only allows you to access your own search queries.

### Are search queries redacted for PII?

No. Raw search queries are shown. If your organization requires redaction, the admin can disable this feature.

### What is the maximum date range I can query?

This depends on your organization’s data retention policy and system limits. If you receive partial results, try narrowing the date range.
