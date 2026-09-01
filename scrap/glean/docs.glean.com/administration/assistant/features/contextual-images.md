---
url: "https://docs.glean.com/administration/assistant/features/contextual-images"
canonical: "https://docs.glean.com/administration/assistant/features/contextual-images"
title: "Image Rendering in Glean: Admin Configuration Guide"
description: "Display relevant visuals directly alongside your answers"
fetched_at: "2026-09-01T13:29:00.272Z"
---
On this page

Contextual Images allow your users to see relevant diagrams, screenshots, and charts alongside their conversational answers in Glean. This includes supported images from Google Drive, O365 (SharePoint/OneDrive), and supported content ingested through custom connectors. This guide explains setup, feature controls, permissions, and cost management.

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   This feature is available for all Glean hosted customers. For self-hosted customers, your deployment must be hosted on GCP or AWS.
-   Glean must be connected to at least one supported connector that can provide image content for indexing, such as Google Drive, OneDrive, SharePoint, or a supported custom connector.

### Enabling or disabling Contextual Images[​](#enabling-or-disabling-contextual-images "Direct link to Enabling or disabling Contextual Images")

Image rendering is enabled by default for most Glean-hosted (GCP) customers.

#### To enable or disable:[​](#to-enable-or-disable "Direct link to To enable or disable:")

1.  Go to the **Admin Console**.
2.  Navigate to **Platform → Assistant → Settings**.
3.  Toggle the **Image Results** option to enable or disable.
4.  Save your changes.

note

Disabling this feature removes contextual images from all Glean responses for your org.

### Managing cost & captioning[​](#managing-cost--captioning "Direct link to Managing cost & captioning")

| Cost Type | Amount | Frequency | Notes |
| --- | --- | --- | --- |
| **Captioning Cost** | $220 per 1M images | One-time per image | Required for search and relevance. Only new images are captioned. |
| **Storage Cost** | $2 per 1M images | Monthly | Ongoing storage cost for indexed images |

#### Cost controls[​](#cost-controls "Direct link to Cost controls")

For Glean hosted customers, there is no additional cost for using Contextual Images. For self-hosted customers, Glean implements monthly cost caps per deployment based on your deployment size. For most organizations, enabling image rendering will not significantly impact total monthly Glean costs. Glean expects the captioning costs to decrease after the first few months as incremental costs are incurred only for new images.

If you have concerns about costs or require a broad estimation for your deployment, please contact your Glean representative.

### Permissions & security[​](#permissions--security "Direct link to Permissions & security")

-   Image visibility is fully governed by users’ access to source documents.
-   Glean never displays images to users who do not have the required permissions.

### Supported connectors & formats[​](#supported-connectors--formats "Direct link to Supported connectors & formats")

-   Supported connectors include Google Drive, SharePoint/OneDrive (O365), and supported custom connectors.
-   Images can be standalone files or embedded inside supported document formats such as DOCX, PPTX, and PDF.
-   For custom connectors, image support is configured per connector, not enabled automatically for all connectors. To enable Glean to caption, index, and show images from a custom connector, contact [Glean Support](https://support.glean.com/hc/en-us/requests/new).
-   Google Drawings and vector images in PDFs may not be supported.

### Troubleshooting & FAQs[​](#troubleshooting--faqs "Direct link to Troubleshooting & FAQs")

### Can't see images in responses?

-   Glean will display an image only if it's relevant to your question and if the image exists in a document that's being used to create the answer. Images aren't guaranteed to appear for every chat query. To increase your chances of seeing an image, add "Render an image if relevant" to the end of your question.
-   Confirm the feature is enabled and your connector connections are active.
-   Ensure user owns or has permission to view the source document.
-   Confirm your deployment is hosted on GCP or AWS.
-   If contextual images are not appearing for content from a custom connector, confirm that image content is included in the indexed documents and that the user has permission to view the source document.

### Worried about costs?

-   Use the monthly limit controls in the Admin Console.
-   Review your organization's current image processing and storage costs under **Platform → Assistant → Image Rendering**.

### Are permissions enforced?

Yes. Only users with access to the source document can see associated images.

## See also[​](#see-also "Direct link to See also")

-   [Contextual Images](/user-guide/assistant/contextual-images): User guide for viewing contextual images in Glean Assistant
