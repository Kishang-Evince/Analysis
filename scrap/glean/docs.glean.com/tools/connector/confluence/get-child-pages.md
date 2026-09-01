---
url: "https://docs.glean.com/tools/connector/confluence/get-child-pages"
canonical: "https://docs.glean.com/tools/connector/confluence/get-child-pages"
title: "Get child pages"
description: "Lists all direct child pages of a given Confluence page"
fetched_at: "2026-09-01T13:29:59.388Z"
---
On this page

The *Confluence Get child pages* tool lists all direct child pages under a specified parent page. Use it when you want an agent to understand or operate on a page subtree, such as reviewing related documentation, building navigation, or updating a group of related pages.

This read-only tool returns a paginated list of child pages that you can pass into follow-up tools. The tool respects Confluence permissions and only returns child pages the connected account can view.

## Limitations[​](#limitations "Direct link to Limitations")

-   The tool lists only direct child pages for the specified parent. To traverse deeper descendants, you need to call the tool again for each child page.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean tool must be enabled for your instance and the Confluence tools must be available.
    
-   A connected Confluence account must exist for the user with permission to view pages in the target space.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Page ID | String | Required. Unique identifier used to target or filter a specific resource. |
| Page Limit | Integer | Maximum number of results to return per page. Defaults to 25. |
| Start | Integer | Index of the first item to return (pagination offset). |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to review all documentation pages under a main product guide to ensure they are up to date.

*Instruction to an agent:*

"List all the child pages under the **Product Guide Overview** page in the Engineering space. For each child page, show me the title and last modified date so I can identify which ones need updating."

*Resulting behavior:*

-   Calls the Get child pages tool with:
    
    -   `Page ID` set to the Product Guide Overview page ID.
        
    -   Returns a list of all direct child pages with their titles, IDs, and metadata.
        
    -   The agent can then display this information or use it in follow-up tools like updating outdated pages.
        

*Workflow tip:* If you do not know the parent page ID, first use the **Get pages** tool to search by title or label in the space. For parents with many children, use the `limit` and `start` parameters to paginate through results.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### No child pages returned, or fewer pages than expected

-   **Possible cause:** The parent page may not have any child pages, the connected account may not have permission to view them, or the ID may refer to a non-page content type such as a blog post that does not support a hierarchy.
-   **Fix:** Confirm that the ID you pass belongs to a page and that the connected account can see the same child pages directly in Confluence. If you expect more results, try broadening any filtering that happens earlier in your flow, for example, in a preceding Get pages call.

### Authentication, permission errors, or stale connected account errors

-   **Possible cause:** The Confluence tools may not be fully configured, the connected account is missing, inactive, expired, or lacks the required scopes to read pages in the target space.
-   **Fix:** Ask an admin to verify that the Confluence tools are enabled for your deployment. Have the user reconnect their Confluence account to refresh the token and ensure it has the right scopes.

## FAQs[​](#faqs "Direct link to FAQs")

### How is this different from Confluence Get pages?

Get child pages lists direct children of a specific parent page ID, maintaining hierarchical relationships. Get pages retrieves a flat, paginated list of pages in a space with filters such as author, label, and status.
