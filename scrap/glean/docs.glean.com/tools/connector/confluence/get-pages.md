---
url: "https://docs.glean.com/tools/connector/confluence/get-pages"
canonical: "https://docs.glean.com/tools/connector/confluence/get-pages"
title: "Get pages"
description: "Retrieves a paginated list of Confluence pages with optional filtering"
fetched_at: "2026-09-01T13:29:59.616Z"
---
On this page

The *Confluence Get pages* tool retrieves a paginated list of pages in a space, with optional filters for author, labels, status, title, and type. Use this read-only tool to discover existing content and identify the right page for follow-up tools such as updating, reviewing, or exploring page hierarchies.

The tool returns only pages the connected account can access, respecting Confluence permissions.

## Limitations[​](#limitations "Direct link to Limitations")

-   Pagination is required for large result sets.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean tool must be enabled for your instance and the Confluence tools must be available.
    
-   A connected Confluence account must exist for the user with permission to view pages in the target space.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Body format | String | Format of the content body to return, for example, `view`, `export_view`, or `storage`. |
| Cursor | String | Opaque cursor token used for pagination to fetch the next page of results. |
| Page limit | Integer | Maximum number of results to return per page. Defaults to 25. |
| Sort by | String | Field and direction to sort results by (for example, `created_desc` or `modified_asc`). |
| Space ID | Integer | Numeric identifier of the space to filter results to. |
| Status | String | Status to filter results by (for example, `current`, `draft`, or `archived`). |
| Subtype | String | More specific content subtype to filter by (for example, a page template or specialized content). |
| Title | String | Title or title filter used to match content items (typically a full or partial title string). |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to find all current API documentation pages in the Engineering space that were updated recently to prepare for a review meeting.

*Instruction to an agent:*

"Find all pages in the **Engineering** space with the label **api-docs** that have status **current**. Sort them by most recently modified and show me the top 10 results."

*Resulting behavior:*

-   Calls the Get pages tool with:
    
    -   `Space ID` set to the Engineering space ID.
        
    -   `Status` filter set to `current` to exclude drafts and archived pages.
        
    -   `Sort by` set to `modified_desc` to show most recently updated pages first.
        
    -   `Page limit` set to 10 to return the top 10 results.
        
    -   Returns a list of matching pages with their titles, IDs, and metadata that can be used in follow-up tools.
        

*Workflow tip:* Use the returned page IDs with other tools like **Get child pages** to explore page hierarchies or **Update page** to modify content.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### No pages returned or fewer pages than expected

-   **Possible cause:** The connected Confluence account might not have access to the target space or pages, or the filters are too restrictive.
-   **Fix:** Confirm that the account can view the same pages directly in Confluence and try again with broader filters.

### Authentication, permission errors, or stale connected account errors

-   **Possible cause:** The Confluence tools may not be fully configured, the connected account is missing, inactive, expired, or lacks the required scopes to view pages in the target space.
-   **Fix:** Ask an admin to verify that the Confluence tools are enabled for your deployment. Have the user reconnect their Confluence account to refresh the token and ensure it has the right scopes.

## FAQs[​](#faqs "Direct link to FAQs")

### How is this different from Get child pages?

Get pages retrieves a flat, paginated list of pages in a space with flexible filters such as author, label, status, and title. Get child pages lists direct children of a specific parent page ID, maintaining hierarchical relationships.
