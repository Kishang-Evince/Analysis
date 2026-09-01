---
url: "https://docs.glean.com/tools/connector/confluence/create-page"
canonical: "https://docs.glean.com/tools/connector/confluence/create-page"
title: "Create page"
description: "Creates a new Confluence page in a specified space"
fetched_at: "2026-09-01T13:29:59.207Z"
---
On this page

The *Confluence create page* tool creates a new page in a specified Confluence space directly from an agent or workflow. Use it when you want agents to publish new documentation, specs, or playbooks without leaving Glean.

The tool accepts rich page bodies in Confluence storage representation, so agents can preserve structure such as headings, lists, and tables. You can optionally specify a parent page to create a hierarchical page structure.

## Limitations[​](#limitations "Direct link to Limitations")

-   The available sources do not specify rate limits, maximum page size, or guarantees around duplicate titles when you call the tool multiple times.
    
-   The body field supports multiple Confluence body representations. For typical usage, only the `body.storage.value` field should be set. Using other representations without providing all required subfields can lead to validation errors.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean tool must be enabled for your instance and the Confluence tools must be available.
    
-   A connected Confluence account must exist for the user, with permission to create pages in the target space and under the chosen parent page (if provided). Otherwise, the tool fails with a permission error.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Body content | Object | Required. Content body of the page, including representation and value, for example, storage. |
| Parent ID | String | Identifier of the parent page under which this page will be created. |
| Space ID | String | Required. Identifier of the space where the page will be created. |
| Title | String | Required. Title of the page to create. |
| Content format | String | The representation format of the content. Must be 'storage'. |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to create a new API documentation page under an existing documentation parent page in your Engineering space.

*Instruction to an agent:*

"Create a new Confluence page in the **Engineering** space titled **REST API v3.0 Documentation**. Place it under the **Technical Documentation** parent page. Include an overview section explaining the new REST API endpoints, authentication methods, and rate limits. Format it with proper headings and a table of contents."

*Resulting behavior:*

-   Creates a page in the Engineering space with:
    
    -   `Space ID` set to the Engineering space ID.
        
    -   `Title` set to `REST API v3.0 Documentation`.
        
    -   `Parent ID` set to the Technical Documentation page ID to create a hierarchical structure.
        
    -   `Body` containing the agent-generated content with headings, lists, and tables in Confluence storage format.
        

*Workflow tip:* If you do not know the space ID or parent page ID, first use the **Get spaces** tool to find the correct space, then optionally use **Get pages** to locate the parent page ID.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### No page created or you see 403/404 errors from Confluence

-   **Possible cause:** The space ID or parent page ID may be invalid, or the connected account does not have permission to create pages in that location.
-   **Fix:** Use Get spaces and optionally Get pages to retrieve valid IDs, and confirm that the connected account can create a page in the same space directly in Confluence.

### Errors mentioning expired or invalid tokens when running the tool

-   **Possible cause:** The connected Confluence account token has expired or is no longer valid.
-   **Fix:** Ask the user to reconnect their Confluence account for this Glean tool and retry the tool.

### Authentication flow errors such as redirect or callback URL mismatch when connecting Confluence

-   **Possible cause:** The OAuth app configuration for Confluence is incorrect.
-   **Fix:** Admins must verify that the authorization and callback URLs in the OAuth app match the values shown in the Confluence tools setup screen.

### Tools appear authenticated but Create page still fails to execute

-   **Possible cause:** The connected account may be missing required scopes or the tools are not fully configured.
-   **Fix:** Confirm that a connected account exists for this tools, that it has the scopes required to create pages, and that the Confluence tools are enabled for the deployment.

## FAQs[​](#faqs "Direct link to FAQs")

### Can this tool update an existing page?

No. Create page always creates a new page. To modify existing content, use the Update page tool.

### Does this tool support rich formatting?

Yes. The tool accepts content in Confluence storage representation, which preserves headings, lists, tables, and other formatting from the source document. When using an agent, simply describe the content structure in natural language and let the agent handle the conversion to storage format.
