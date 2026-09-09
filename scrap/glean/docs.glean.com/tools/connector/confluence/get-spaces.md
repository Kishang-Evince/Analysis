---
url: "https://docs.glean.com/tools/connector/confluence/get-spaces"
canonical: "https://docs.glean.com/tools/connector/confluence/get-spaces"
title: "Get spaces"
description: "Retrieves a paginated list of spaces from your Confluence instance"
fetched_at: "2026-09-01T13:29:59.841Z"
---
On this page

The *Confluence Get spaces* tool retrieves a paginated list of Confluence spaces. Use this read-only tool to discover available spaces and capture a space ID for follow-up tools like creating or updating content.

This tool is commonly the first step in Confluence workflows-fetch the target space, then pass its ID into write tools such as Create page or Update page.

## Limitations[​](#limitations "Direct link to Limitations")

-   Pagination is required for large result sets.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean tool must be enabled for your instance and the Confluence tools must be available.
    
-   A connected Confluence account must exist for the user with permission to view spaces.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Expand | Array | List of entities or fields to expand in the response payload, for example, `body.storage`. |
| Label | Array | List of labels to filter results by; only items with at least one of these labels are returned. |
| Maximum limit | Integer | Maximum number of results to return per page. Defaults to 25. |
| Space key | Array | List of space keys to filter results to specific spaces. |
| Start | Integer | Index of the first item to return (pagination offset). |
| Status | String | Status to filter results by (for example, `current`, `draft`, or `trashed`). |
| Type | String | Type of content to filter by (for example, `page` or `blogpost`). |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to find the Engineering space ID so you can create a new API documentation page in that space.

*Instruction to an agent:*

"Find the **Engineering** space in Confluence and show me its space ID. I need it to create a new documentation page."

*Resulting behavior:*

-   Calls the Get spaces tool to retrieve the list of available spaces.
    
    -   Searches through the returned spaces to find one matching "Engineering" by name or key.
        
    -   Returns the space ID for the Engineering space.
        
    -   The agent displays the space ID, which can then be used with tools like **Create page** or **Update page**.
        

*Workflow tip:* Once you have the space ID, you can use it with **Get pages** to find specific pages within that space, or with **Create page** to add new content.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### No spaces returned or authentication errors

-   **Possible cause:** The Confluence tools may not be fully configured, the connected account is missing, inactive, expired, or lacks the required scopes to view spaces.
-   **Fix:** Ask an admin to verify that the Confluence tools are enabled for your deployment. Have the user reconnect their Confluence account to refresh the token and ensure it has the right scopes.

### Intermittent failures

-   **Possible cause:** Temporary infrastructure or refresh issues.
-   **Fix:** Retry the tool. If problems persist, have an admin check tools availability and logs.

## FAQs[​](#faqs "Direct link to FAQs")

### How is this different from Get pages?

Get spaces retrieves a list of Confluence spaces (workspaces) to identify which space to work in. Get pages retrieves pages within a specific space using filters such as author, label, and status.
