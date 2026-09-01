---
url: "https://docs.glean.com/user-guide/assistant/contextual-images"
canonical: "https://docs.glean.com/user-guide/assistant/contextual-images"
title: "Contextual Images"
description: "Display relevant visuals directly alongside your answers"
fetched_at: "2026-09-01T13:30:38.344Z"
---
On this page

**Contextual Images** is a feature in Glean that surfaces diagrams, charts, screenshots, and other images found in your company’s indexed documents directly in chat responses. These visuals appear inline with supporting answers, helping you quickly understand technical concepts or visualize referenced content without leaving your workflow.

### Key benefits[​](#key-benefits "Direct link to Key benefits")

-   **Instant Visual Context:** See diagrams, process maps, and screenshots exactly when you need them.
-   **Improved Collaboration:** Reduce back-and-forth over missing visuals during technical troubleshooting or brainstorming.
-   **Time Savings:** No need to open multiple files or search folders for referenced images.

### Example use cases[​](#example-use-cases "Direct link to Example use cases")

-   Requesting a system architecture diagram for a product or service.
-   Viewing a whiteboard photo from a design review captured in a meeting notes doc.
-   Troubleshooting a support issue with step-by-step screenshots extracted from internal documentation.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Contextual images must be enabled by your admin before you can use it. If your organization uses custom connectors, image support depends on your admin configuring those connectors to send indexed image content to Glean.

note

This feature may not be available for your deployment. If you do not see images rendered, contact your admin. For setup instructions, see [Contextual Images](/administration/assistant/features/contextual-images).

## How to use contextual images[​](#how-to-use-contextual-images "Direct link to How to use contextual images")

1

Scan connected sources

Glean scans supported connected content for images that match your query context. This includes Google Drive, SharePoint, OneDrive, and supported content ingested through custom connectors.

2

Display Relevant Images

When an image is relevant and you have viewing permissions, it appears automatically in your response.

3

Support Multiple Formats

Images are supported if they are standalone files (PNG, JPG, GIF, and other common formats) or embedded inside Google Docs, PDFs, Word, and PowerPoint documents (except Google Drawings).

### Permissions and privacy[​](#permissions-and-privacy "Direct link to Permissions and privacy")

-   You will *only* see images if you have access to the underlying source document.
-   The feature honors your company’s sharing and security policies automatically.

### Frequently asked questions[​](#frequently-asked-questions "Direct link to Frequently asked questions")

### Can users upload their own images?

Contextual Images surfaces existing images from indexed sources; user uploads via chat are not currently supported for rendering.

### Which image formats are supported?

Standard image formats such as PNG, JPG, and GIF are supported when they come from Google Drive, OneDrive, SharePoint, or supported content ingested through custom connectors. Glean can also render images embedded in supported document formats such as PDF, DOCX, and PPTX files. Google Drawings are not supported.

For custom connectors, image support depends on how the connector is configured and whether image content is included in indexing.

### Do I have to do anything to prompt images?

Just ask a question; for best results, reference the concept or process you want to visualize (for example, "Show me the pipeline diagram for project Mercury").

## See also[​](#see-also "Direct link to See also")

For further details, troubleshooting tips, and admin cost controls, visit:

-   [Contextual Images Admin Guide](/administration/assistant/features/contextual-images)
-   [Community and Support](https://community.glean.com/)
