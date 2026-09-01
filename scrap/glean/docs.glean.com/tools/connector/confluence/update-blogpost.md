---
url: "https://docs.glean.com/tools/connector/confluence/update-blogpost"
canonical: "https://docs.glean.com/tools/connector/confluence/update-blogpost"
title: "Update blog post"
description: "Updates an existing Confluence blog post’s title or body"
fetched_at: "2026-09-01T13:30:00.043Z"
---
On this page

The *Confluence update blog post* tool updates an existing blog post in a Confluence space when you provide the blog post ID and the latest version information. Use it to revise titles, fix typos, or refresh content for announcements, launch notes, and other updates without managing Confluence APIs or authentication yourself.

This write tool supports workflows where agents keep a single canonical blog post up to date over time, instead of creating new posts for every change.

## Limitations[​](#limitations "Direct link to Limitations")

-   Requires the latest version number. The update must include the current version number of the blog post and if the version number is out of date, the provider may reject the update.
-   In Confluence Cloud, blog posts do not follow a page hierarchy model. Parent page identifiers are typically not relevant for blog posts.
-   This tool is subject to the same API limits and connector configuration you use for the Confluence (Cloud) connector, including any rate limits or exclusions for spaces, labels, or creators.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean tool must be enabled for your instance and the Confluence tools must be available.
    
-   A connected Confluence account must exist for the user with permission to edit blog posts in the target space. Otherwise, the tool fails with a permission error.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Body content | Object | Required. Updated content body of the page, including representation and value, for example, storage format. |
| Post ID | String | Required. Unique identifier of the page to update. |
| Space ID | String | Required. Identifier of the space the page belongs to; used to validate or change the page’s space. |
| Status | String | Status of the page after the update, for example, `current`, `draft`, or `archived`. |
| Title | String | Required. Updated title of the page. |
| Version number | Object | Required. Version object containing the new version number and related metadata for the update operation. |
| Minor edit | String | Whether this update is a minor edit. |
| Version message | String | Optional message describing the version update. |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to update a weekly product update blog post with new information and mark it as revised.

*Instruction to an agent:*

"Find the Confluence blog post titled **Weekly product update — December 5** in the **Engineering** space. Update the title to add **(Revised)** and expand the Features section to include the new dashboard widgets feature. Mark this as a minor edit with the version message 'Added dashboard widgets info'."

*Resulting behavior:*

-   Locates the existing blog post in the Engineering space and retrieves its current version number.
    
-   Calls the Update blog post tool with:
    
    -   `Post ID` set to the blog post ID.
        
    -   `Space ID` set to the Engineering space ID.
        
    -   `Title` updated to `Weekly product update — December 5 (Revised)`.
        
    -   `Body content` updated with the expanded Features section including dashboard widgets.
        
    -   `Version number` set to the latest version to avoid conflicts.
        
    -   `Minor edit` set to true to mark this as a small change.
        
    -   `Version message` set to "Added dashboard widgets info" for tracking purposes.
        

*Workflow tip:* Always retrieve the current version number before updating to avoid version conflicts. The tool automatically increments the version number when the update is successful.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Request fails with a permissions or 403-style error when updating a blog post

-   **Possible cause:** The connected Confluence account does not have permission to edit blog posts in the target space.
-   **Fix:** Confirm that the account used for the Confluence connector has edit rights for the space and blog post, then retry the tool.

### The update is rejected because of version or conflict issues

-   **Possible cause:** The version.number provided is not the latest version for the blog post.
-   **Fix:** Retrieve the current version of the blog post, update version.number to that value, and retry.

### Request fails due to malformed or missing body content

-   **Possible cause:** The body object is missing required structure or content expected by the provider.
-   **Fix:** Ensure that body includes valid content in the expected format. When using agents, avoid overriding low-level body fields unless you have a specific need.

### Rate limit or throttling from the provider

-   **Possible cause:** The underlying Confluence APIs are enforcing rate limits for your tenant.
-   **Fix:** Retry after a short delay. If the issue persists, your Glean admin may need to review connector-level rate-limit configuration or reduce concurrent write activity.

## FAQs[​](#faqs "Direct link to FAQs")

### Can I change the space of a blog post with this tool?

No. The tool expects the blog post to remain in its existing space. The Space ID parameter is used to validate that the blog post belongs to the specified space, not to move it.
