---
url: "https://docs.glean.com/tools/connector/confluence/add-content-label"
canonical: "https://docs.glean.com/tools/connector/confluence/add-content-label"
title: "Add content label"
description: "Adds metadata labels to existing Confluence pages or blog posts"
fetched_at: "2026-09-01T13:29:59.006Z"
---
On this page

The *Confluence add content label* tool adds labels to existing Confluence pages or blog posts. This is a write tool that updates content metadata without modifying the main body of the page or blog post.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glea tool must be enabled for your instance and the Confluence tools must be available.
-   The connected account must have permission to update content in the relevant spaces.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| ID | String | Identifier of the Confluence content (page or blog post) you want to label. |
| Labels | Array | List of labels to add to the content. Each label includes a name field that represents the label text. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Add the labels 'reviewed' and 'Q1-2024' to the Product Roadmap page with ID 12345678."
    
-   "Tag the meeting notes page (ID: 87654321) with 'urgent' and 'tool-required' labels."
    
-   "Add the 'approved' label to Confluence page ID 11223344."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Content not found or permission errors

-   **Possible cause:** The content ID is invalid, the content is deleted, or the connected account does not have permission to update labels on the content.
-   **Fix:** Verify the content ID is correct and that the connected account can edit the page or blog post directly in Confluence.

### Labels not appearing after tool completes

-   **Possible cause:** There may be a delay in label propagation, or the labels were added to a different version of the content.
-   **Fix:** Refresh the Confluence page to see the updated labels. If labels still do not appear, verify the content ID and check Confluence directly.

## FAQs[​](#faqs "Direct link to FAQs")

### Can this tool label both pages and blog posts?

Yes. The tool adds labels to any Confluence content that supports labels, including pages and blog posts.

### Can I remove or replace existing labels with this tool?

No. This tool only adds labels to content. Removal or replacement of existing labels is not supported by this tool.

### How many labels can I add at once?

You can add multiple labels in a single tool call by providing a list of label objects. Each label should have a name field with the label text.
