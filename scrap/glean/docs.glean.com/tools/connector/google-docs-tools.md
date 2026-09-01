---
url: "https://docs.glean.com/tools/connector/google-docs-tools"
canonical: "https://docs.glean.com/tools/connector/google-docs-tools"
title: "Google Docs tools"
description: "Use Google Docs tools in Glean to create, update, copy, and edit documents directly from agents and workflows."
fetched_at: "2026-09-01T13:30:01.652Z"
---
On this page

With Google Docs tools, you can create, update, copy, and edit documents directly from Glean without switching to Google Docs.

This allows users to create, update, copy, and edit documents without switching between applications.

Google Docs tools are part of the broader Google tool suite.

When building a workflow agent, the Google Docs tools are available within the **Plan and Execute** step. For agents with **auto mode**, the Google Docs tools are available for all steps. This allows the agent to dynamically determine when to create or update documents to fulfill a complex user request.

## Supported tools[​](#supported-tools "Direct link to Supported tools")

The Google Docs tools are enabled as a unified bundle.

The following tools are included:

### Document creation and discovery[​](#document-creation-and-discovery "Direct link to Document creation and discovery")

-   Copy document: Creates a copy of an existing Google Docs document, including its content and formatting.
-   Search documents: Searches for Google Docs documents so agents can find the right file before reading or updating it.
-   Get document by ID: Retrieves a specific Google Docs document by its document ID.
-   Get document plaintext: Retrieves the plain text content of a Google Docs document without formatting, useful for text analysis or extraction.

### Document editing[​](#document-editing "Direct link to Document editing")

-   Replace all text: Finds and replaces all occurrences of a specified text string in a Google Docs document.
-   Update document section from Markdown: Updates a specific section of an existing Google Docs document using Markdown-formatted content.
-   Insert text action: Inserts a string of text at a specified location within a Google Docs document.
-   Insert page break: Inserts a page break at a specified location within a Google Docs document, useful for starting new content on a fresh page.
-   Update document style: Updates the overall document style settings, such as page size, margins, and background color.

## Example use cases[​](#example-use-cases "Direct link to Example use cases")

Google Docs tools support several common workflow patterns:

-   Markdown-to-Docs creation: An agent can turn Markdown content into a formatted Google Doc for sharing with stakeholders.
-   Template-based document creation: A workflow can copy an existing document and reuse its structure for a new deliverable.
-   Targeted document updates: An agent can update a specific section of a document without rewriting the entire file.
-   Content standardization: An agent can replace outdated terms, product names, or repeated text across a document.
-   Document lookup and retrieval: A workflow can search for the right document, retrieve it by ID, and use that context in later steps.
-   Text insertion: An agent can insert text at specific locations within a document to add new content without overwriting existing text.
-   Plain text extraction: An agent can retrieve the plain text content of a document for analysis, summarization, or feeding into downstream processing steps.
-   Document formatting: A workflow can update document style settings like margins or page size to match organizational templates or branding guidelines.
-   Section breaks: An agent can insert page breaks to properly separate chapters or sections when generating multi-part documents.

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before configuring tools, ensure you have the following:

-   You must have administrative access to the Glean **Admin console**.
-   Your organization must have an existing Google Drive connector configured in Glean.
-   You must have access to the Google Cloud Console to enable the required APIs and configure OAuth credentials.
-   The Google Drive API must be enabled in the Google Cloud project linked to your Google tools configuration.

### Administrator steps[​](#administrator-steps "Direct link to Administrator steps")

1.  Enable the tools: In Glean, go to **Admin console** → **Platform** → Tools and add **Google Docs extension tools** from the template library.
2.  Select the connector instance: Link the tools to your existing **Google Drive** connector instance.
3.  Configure authentication: Google Docs tools use OAuth user authentication.
    -   **Central**: Use the Glean-managed Google OAuth app when it is available in your environment.
    -   **Custom OAuth app**: If using a customer-managed app, register it in the Google Cloud Console, enable the Google Drive API, configure the OAuth consent screen, and enter the client credentials in Glean.
4.  Save the tools after authentication is complete.
5.  Enable the pack for users: Use **Edit settings** under **Enable Tools** to make the pack available to the relevant users and supported Glean surfaces.

note

Google Docs tools use OAuth user authentication exclusively. Domain-wide Delegation is not supported for Google Docs extension tools.

For detailed setup steps, see [Google tools setup](/administration/tools/setup-tools/google-tools-setup).

## FAQ[​](#faq "Direct link to FAQ")

### Do users need to connect their own Google account?

Yes.

Google Docs tools use OAuth user authentication, so each user must authenticate with their own Google account before using the tools.

### Can I enable only some Google Docs tools from the pack?

Yes. Admins can enable a subset of Google Docs tools based on what they want to make available.

### What Google APIs need to be enabled?

You must enable the **Google Drive API** in the Google Cloud project associated with your Google tools configuration.

The Google Drive API is required for all document creation and editing operations.

### Can I use Domain-wide Delegation for Google Docs tools?

No.

Google Docs extension tools require OAuth user authentication. Domain-wide Delegation is not supported for these tools. Each user authenticates individually.

### Where are created documents stored?

Documents created through Google Docs tools are stored in the signed-in user's Google Drive, in their default location (typically **My Drive**).
