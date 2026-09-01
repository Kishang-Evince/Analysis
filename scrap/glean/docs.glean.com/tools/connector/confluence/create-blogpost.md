---
url: "https://docs.glean.com/tools/connector/confluence/create-blogpost"
canonical: "https://docs.glean.com/tools/connector/confluence/create-blogpost"
title: "Create blog post"
description: "Creates a new Confluence blog post in a specified space"
fetched_at: "2026-09-01T13:29:59.216Z"
---
On this page

The *Confluence create blog post* tool creates a new blog post in a specified Confluence space. Use it to publish product updates, release notes, or announcements directly from workflows or agents, without managing Confluence APIs or authentication yourself.

This write tool sets the blog post's title, publication status (publish immediately or save as draft), body content, and optional labels or metadata. The tool returns the created content as defined by your environment's configuration.

## Limitations[​](#limitations "Direct link to Limitations")

-   The `status` parameter accepts only `current`, `draft`, or `archived`. Use `current` to publish immediately and `draft` to save without publishing.
    
-   Confluence blog posts do not have a parent/child page hierarchy. Parent content IDs typically do not apply for blogs in Confluence Cloud or Data Center.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean tool must be enabled for your instance and the Confluence tools must be available.
    
-   A connected Confluence account must exist for the user, with permission to create blog posts in the target space. Otherwise, the tool fails with a permission error.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Body | Object | Required. Content body of the blog post, including representation and value, for example, storage JSON. |
| Space ID | String | Required. Identifier of the space where the blog post will be created. |
| Status | String | Required. Initial status of the blog post: `current`, `draft`, or `archived`. |
| Title | String | Required. Title of the blog post to create. |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to publish a product release announcement with labels for easy discovery, but first save it as a draft for review.

*Instruction to an agent:*

"Create a Confluence blog post in the **Engineering** space titled **Product Release: Version 2.5.0 - New Features**. Include a summary of the key features: improved API performance, new dashboard widgets, and enhanced security. Tag it with `release-notes`, `product-update`, and `v2.5`. Save it as a draft for now so the team can review it before publishing."

*Resulting behavior:*

-   Creates a blog post in the Engineering space with:
    
    -   `Space ID` set to the Engineering space ID.
        
    -   `Title` set to `Product Release: Version 2.5.0 - New Features`.
        
    -   `Status` set to `draft` so it is not yet published and can be reviewed.
        
    -   `Labels` including `release-notes`, `product-update`, and `v2.5` for categorization and discoverability.
        
    -   `Body` containing the agent-generated summary of the three key features.
        

*To publish the blog post later*, you can instruct the agent: "Update the blog post status to publish it" or create it with `status` set to `current` to publish immediately.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### 400 Bad Request for body

-   **Possible cause:** The body object is missing representation or value, or representation is not set to storage in an advanced or programmatic call.
-   **Fix:** Ensure body.representation is storage and body.value contains valid content for that representation. When using agents, avoid overriding these fields unless you have a specific need.

### 403 Forbidden or permission denied when creating in space

-   **Possible cause:** The connected Confluence account does not have permission to create blog posts in the selected space.
-   **Fix:** Confirm that the account used for the Confluence connector has create permissions for that space, then retry the tool.

### Rate limit or throttling from Confluence

-   **Possible cause:** The underlying Confluence Cloud APIs are enforcing rate limits for your tenant.
-   **Fix:** Retry after a short delay. If the issue persists, your Glean admin may need to review Confluence connector rate-limit configuration or reduce concurrent write activity.

## FAQs[​](#faqs "Direct link to FAQs")

### Where is the blog post created?

In the Confluence space identified by spaceId when the tool runs.

### How should I format the body?

When you use this tool through a Glean agent, you can describe the content in natural language and let the agent construct the correct body structure. For advanced or programmatic use, pass a JSON object where representation is storage and value contains the blog content formatted for that representation, for example, Confluence's storage-format HTML.

### Can this tool update an existing blog post?

No. This tool always creates a new blog post. To modify an existing blog, use the corresponding update tool for Confluence blog posts in your environment.
