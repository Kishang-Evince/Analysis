---
url: "https://docs.glean.com/tools/connector/confluence/update-page"
canonical: "https://docs.glean.com/tools/connector/confluence/update-page"
title: "Update page"
description: "Updates an existing Confluence page’s content and related metadata"
fetched_at: "2026-09-01T13:30:00.058Z"
---
On this page

The *Confluence Update page* tool modifies an existing Confluence page directly from an agent flow. Use it to update page content, titles, and metadata without creating a new page.

This write tool is typically used after a read tool like *Get pages* or *Get page by ID* to fetch the current page, then modify and write the updated content back. This allows agents to keep existing documentation up to date.

## Limitations[​](#limitations "Direct link to Limitations")

-   Large page bodies can be truncated when they pass through the model context window, when you fetch a long page and then append additional text before calling this tool. In these cases, the updated page may contain only part of the original content.
    
-   The underlying body schema exposes multiple representations, for example, storage and wiki.
    
-   The tool depends on the Confluence versioning model. If the version number you pass does not match with what Confluence expects, the update can fail without changing the page.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean tool must be enabled for your instance and the Confluence tools must be available.
    
-   A connected Confluence account must exist for the user with permission to edit pages in the target space.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Body content | Object | Required. Updated content body of the page, including representation and value, for example, storage format. |
| ID | String | Required. Unique identifier of the page to update. |
| Space ID | String | Identifier of the space the page belongs to; used to validate or change the page’s space if supported. |
| Title | String | Required. Updated title of the page. |
| Version number | Object | Required. Version object containing the new version number and related metadata for the update operation. |
| Body → wiki → representation | String | The representation format of the content. Supported values: 'storage', 'atlas\_doc\_format', 'wiki'. Examples: "storage" "atlas\_doc\_format" "wiki" |
| Body → wiki → value | String | The content body in the specified representation. |
| Content format | String | The representation format of the content. Supported values: 'storage', 'atlas\_doc\_format', 'wiki'. Examples: "storage" "atlas\_doc\_format" "wiki" |
| Version message | String | Optional version message describing the changes. Examples: "Updated content" "Fixed formatting" |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to update the API documentation page with new endpoint information.

*Instruction to an agent:*

"Find the **REST API v3.0 Documentation** page in the **Engineering** space and add a new section about the /users/batch endpoint. Include authentication requirements and rate limits. Add the version message 'Added batch users endpoint documentation'."

*Resulting behavior:*

-   Calls Get pages to locate the REST API v3.0 Documentation page and retrieves its current version number.
    
-   Calls the Update page tool with:
    
    -   `ID` set to the page ID.
        
    -   `Space ID` set to the Engineering space ID.
        
    -   `Title` unchanged (REST API v3.0 Documentation).
        
    -   `Body content` updated with the new endpoint section appended to existing content.
        
    -   `Version number` set to the current version to avoid conflicts.
        
    -   `Version message` set to "Added batch users endpoint documentation" for tracking purposes.
        

*Workflow tip:* Always fetch the current page content and version number before updating. This ensures you have the latest version and can append to existing content without losing information.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool fails even when all visible fields look correct

-   **Possible cause:** The tool schema for the body field has changed, for example, around the storage representation, and the environment is using an outdated parsing or flattening configuration.
-   **Fix:** Confirm that your environment is on the latest tool schema and parsing logic. If the failures persist, share the agent link and inputs with Glean support so they can verify the schema version.

### Invalid request data provided – missing body.wiki.value

-   **Possible cause:** A wiki body representation field such as body.wiki.representation is set without a corresponding body.wiki.value.
-   **Fix:** Clear all body.wiki.\* fields in the tool inputs and rely only on body.storage.\* for content updates. Re-run the agent after removing wiki fields.

### Updated page body is truncated or shows placeholder text instead of the full original content

-   **Possible cause:** The model's context window is too small to handle the full page body plus the new content, so the body is truncated before it is sent to the tool.
-   **Fix:** Switch the agent or the specific update step to a model with a larger context window, and re-run the flow. If you still need to use a smaller context window, reduce the amount of page content you include in the prompt before calling the tool.

## FAQs[​](#faqs "Direct link to FAQs")

### Can I leave the body content empty to only update metadata such as the title?

In most cases you should provide body content. Leaving the body empty can cause the request to fail or leave the page unchanged, depending on how the schema is interpreted in your environment.
