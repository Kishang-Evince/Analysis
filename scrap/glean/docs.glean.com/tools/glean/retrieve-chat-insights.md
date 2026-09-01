---
url: "https://docs.glean.com/tools/glean/retrieve-chat-insights"
canonical: "https://docs.glean.com/tools/glean/retrieve-chat-insights"
title: "Retrieve chat insights"
description: "This article documents the retrieve chat insights tool, which allows you to extract your historical chat queries in Glean over a specified time period."
fetched_at: "2026-09-01T13:30:07.526Z"
---
On this page

The retrieve chat insights tool enables you to access and review your past chat queries within Glean. By specifying a time window, you can retrieve raw chat queries which can help you understand your information-seeking patterns and recurring topics over time by using analyzing tools. This tool is read-only, does not modify any data, and is idempotent that is repeated requests with the same parameters yield the same results. Supports pagination for large result sets (if applicable). The tool returns partial results if the time window is too large or if there are system-imposed limits. Results are typically returned in chronological order.

## Capabilities[​](#capabilities "Direct link to Capabilities")

-   Retrieve your chat queries from Glean for a specified time period.
-   Supports filtering by custom date ranges like last week, last month, or specific start and end dates.
-   Returns raw chat queries.
-   You can use this tool agent workflows to provide context-aware, personalized responses based on your chat history.
-   Only retrieves chat queries for the authenticated user and you cannot access other users chat histories.

## Limitations[​](#limitations "Direct link to Limitations")

-   The tool does not analyze or summarize chat content by itself. To generate summaries or further analysis, combine this step with a **Think** or **Respond** step in your workflow.
-   Data retention is subject to your organization’s chat history policy.
-   If chat history is disabled for your organization or user, this tool may not return results.
-   Large time windows like over 14 days may result in slower performance or incomplete results in some cases.

## Prerequisites and permissions[​](#prerequisites-and-permissions "Direct link to Prerequisites and permissions")

-   You must be authenticated in Glean and have access to Glean and chat features.
-   Chat history must be enabled for your account or organization.
-   No additional connectors or scopes are required beyond standard Glean access.

## Inputs[​](#inputs "Direct link to Inputs")

| Name | Type | Required | Default | Allowed values | Example | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| start\_date | date | Yes | None | yyyy-mm-dd, **week ago** | 2025-03-01 | Inclusive. The beginning of the time window for chat retrieval. |
| end\_date | date | Yes | None | yyyy-mm-dd, **now** | 2025-03-08 | Exclusive. Must be after start\_date. End of the time window. |

-   Dates can be provided as absolute like **2025-03-01** or relative like **week ago**, **now**.
-   The tool will extract these values from natural language queries when used in conversational workflows.

## Outputs[​](#outputs "Direct link to Outputs")

-   Returns a JSON object containing details of the user’s chat queries within the specified time period.
    
-   Output fields may include:
    
    -   List of chat queries (text).
    -   Timestamps for each query.
-   Example output payload:
    

```
{  "chatsSessions": [    {      "timestamp": "2025-03-02T10:15:00Z",      "query": "How do I access the quarterly report?"    },    {      "timestamp": "2025-03-05T14:30:00Z",      "query": "List all my open tickets"    }  ]}
```

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   Minimal:  
    “What did I chat about last week?”  
    Automatically sets start\_date and end\_date to cover the previous week.
    
-   Typical:  
    “Show my chat queries from March 1 to March 8, 2025.”  
    Returns all chat queries in that date range.
    
-   Advanced:  
    “List all my chats about troubleshooting in the last month.”  
    Returns chat queries filtered by topic, further analysis can be performed on the output.
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

| Error message | Cause | Fix |
| --- | --- | --- |
| **No chat history found for the specified period** | No chats exist in the selected time window, or chat history is disabled. | Check your date range and ensure chat history is enabled. |
| **Invalid date range: end\_date must be after start\_date** | The end date is not after the start date. | Adjust your input dates so end\_date is after start\_date. |
| **Partial results returned** | The time window is too large or system limits were reached. | Narrow the date range or try again with a smaller window. |
| **Tool unavailable** | Chat history is disabled for your account or organization. | Contact your Glean admin to enable chat history. |

## FAQs[​](#faqs "Direct link to FAQs")

### Can I retrieve chat insights for another user?

No, you can only retrieve your own chat history.

### How far back can I retrieve chat insights?

Data retention is typically 30 days, but your organization’s policy may differ.

### Does this tool analyze or summarize my chats?

No, it only retrieves chat queries. For analysis or summarization, add a Think or Respond step after this tool.
