---
url: "https://docs.glean.com/tools/connector/confluence/get-page-by-id"
canonical: "https://docs.glean.com/tools/connector/confluence/get-page-by-id"
title: "Get page by ID"
description: "Retrieves a single Confluence page by its page ID to inspect content and metadata"
fetched_at: "2026-09-01T13:29:59.625Z"
---
On this page

The *Confluence get page by ID* tool to retrieve a single, specific Confluence page when you already know its page ID. This is a read-only tool that returns the metadata of the page and body for inspection or use in follow-up tools.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean tool must be enabled for your instance and the Confluence tools must be available.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Page ID | String | Identifier of the Confluence page you want to retrieve. |
| Draft | Boolean | Optional flag to retrieve draft content. |
| Version | Integer | Optional version indicator to retrieve a specific page version. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Get the content of the Onboarding Guide page with ID 12345678."
    
-   "Retrieve the Confluence page with ID 87654321 so I can review it."
    
-   "Show me the page details for Confluence page ID 11223344."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### No page returned or not found error

-   **Possible cause:** The page ID is invalid, the page is deleted, or the connected account does not have permission to view the page.
-   **Fix:** Confirm that the page ID belongs to an existing Confluence page, and that the connected account can open the same page directly in Confluence.

### Authentication or permission errors

-   **Possible cause:** The Confluence tools are not fully configured, or the connected account is missing, inactive, or lacks the required scopes to read pages.
-   **Fix:** Ask an admin to verify that the Confluence tools are enabled for your deployment and that the user has an active connected account with the right scopes. Have the user reconnect their Confluence account if the token has expired.

## FAQs[​](#faqs "Direct link to FAQs")

### How is this different from Get pages?

Get page by ID retrieves a single Confluence page when you already know its ID. Get pages retrieves a paginated list of pages in a space with filters such as author, label, status, and type.

### Can I use this tool to fetch a specific version or draft?

Yes. The tool supports *Draft* and *Version* parameters. Use *Draft* set to true to retrieve draft content, or specify a *Version* number to retrieve a specific page version.
