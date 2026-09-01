---
url: "https://docs.glean.com/tools/connector/confluence/get-blogpost"
canonical: "https://docs.glean.com/tools/connector/confluence/get-blogpost"
title: "Get blog posts"
description: "Lists blog posts available to the connected Confluence account with pagination support"
fetched_at: "2026-09-01T13:29:59.396Z"
---
On this page

The *Confluence get blog post* tool lists Confluence blog posts. This is a read-only tool that returns blog posts the connected account can access, with support for pagination through large result sets.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Confluence must be connected as a connector with the Confluence tools enabled.
-   The connected account must have permission to view blog posts in the relevant spaces.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Cursor | String | Opaque pagination cursor for fetching the next page of results from a previous call. |
| Post limit | Integer | Maximum number of blog posts to return per page. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Show me the latest 10 Confluence blog posts."
    
-   "List all recent blog posts from our Confluence."
    
-   "What are the most recent Confluence blog posts in our company announcements space?"
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool returns no blog posts

-   **Possible cause:** There are no blog posts visible to the connected Confluence account, or you have paginated past the end of the available results.
-   **Fix:** Confirm that there are blog posts in the relevant Confluence spaces and that the connected account has permission to view them.

### Permission or access errors

-   **Possible cause:** The Confluence tools are not fully configured, or the connected account is missing, inactive, or lacks the required scopes to read blog posts.
-   **Fix:** Ask an admin to verify that the Confluence tools are enabled for your deployment and that the user has an active connected account with the right scopes. Have the user reconnect their Confluence account if the token has expired.

## FAQs[​](#faqs "Direct link to FAQs")

### Does this tool modify Confluence content?

No. Get blog posts is a read-only tool that lists existing blog posts and does not create, edit, or delete any Confluence data.

### How is this different from Get pages?

Get blog posts lists Confluence blog posts, while Get pages lists Confluence pages. Use this tool when you specifically want to work with blog content instead of page content.

### How do I retrieve more than one page of results?

Use the **Cursor** parameter returned in the response from a previous call. Pass this cursor value in subsequent calls to retrieve the next page of blog posts.
