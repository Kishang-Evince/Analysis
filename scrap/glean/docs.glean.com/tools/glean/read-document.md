---
url: "https://docs.glean.com/tools/glean/read-document"
canonical: "https://docs.glean.com/tools/glean/read-document"
title: "Read document"
description: "Read the full content of specific documents or URLs so agents can use that context in later steps."
fetched_at: "2026-09-01T13:30:07.302Z"
---
On this page

The Read Document tool allows an agent to read the full content of specific documents or URLs. This tool is useful for incorporating document context into workflows and enables agents in subsequent steps to work with the retrieved information.

## Limitations[​](#limitations "Direct link to Limitations")

Keep the following limits in mind when using the Read Document tool:

-   **Files per step**: A single Read Document step can read up to **100 files**. If you need to process more files, split them across multiple steps.
-   **Google Sheets**: Reading a Google Sheet through this tool retrieves approximately **1,000 rows**. Rows beyond this limit aren’t included. If your sheet has more rows, consider exporting it and using [Data Analysis](/administration/assistant/data-analysis/about-data-analysis) instead.
-   **Large documents**: When a document’s content is very large, the agent may trim it to fit within the model’s context window. If this happens, you’ll see a warning that the document was partially read.

## Configuration[​](#configuration "Direct link to Configuration")

caution

**Prerequisites**

Ensure your desired documents are accessible.

Configure the Read Document connector by entering search queries in one of two ways:

-   **Define Fixed Queries Manually**: Use this method to provide your exact queries to the Read Document agent. You can tag individual documents using the `@` tag or enter a specific document’s URL.
-   **Write a Plain Text Prompt for Glean to Generate Queries From**: Glean uses this plain text field to generate queries, which it passes to the Read Document connector.
