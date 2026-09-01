---
url: "https://docs.glean.com/tools/connector/jira/list-boards"
canonical: "https://docs.glean.com/tools/connector/jira/list-boards"
title: "List boards"
description: "Retrieves available Jira boards with filtering and pagination options"
fetched_at: "2026-09-01T13:30:03.975Z"
---
On this page

*Jira list boards* tool to retrieve a list of available Jira boards. This is a read-only tool that returns structured board data with support for filtering by project, board type, and other criteria.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must complete the initial Jira setup and enable tools in the Admin Console so that the Jira tools are available in Agent Builder.
-   Each user is prompted to connect their Jira account via OAuth in Glean before running tools, including Jira Assign issue.
-   If your Jira organization uses Central OAuth, a Jira administrator must authorize the app for the site before users can run Jira tools in Glean.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Project key or ID | String | Project identifier used to scope which boards to list. |
| Name | String | Filter boards by name. |
| Type | String | Filter by board type (e.g., scrum, kanban). |
| Include private boards | Boolean | Whether to include private Jira boards in the results. |
| Sort by | String | Sort key for the returned board list (e.g., name, id). |
| Start at | Integer | Zero-based index for pagination to fetch subsequent pages. |
| Results limit | Integer | Maximum number of boards to return per page. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Show me all scrum boards in the Mobile App project."
    
-   "List all available Jira boards I have access to."
    
-   "What kanban boards are in our Engineering project?"
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Site admin must authorize this app for the site

-   **Possible cause:** Jira's Central OAuth application has not been granted site-wide access by a Jira administrator.
-   **Fix:** Ask your Jira administrator to complete the required app authorization flow in Jira, then retry the tool.

### No boards returned or fewer boards than expected

-   **Possible cause:** The filters are too restrictive, or the connected account does not have permission to view boards.
-   **Fix:** Try removing filters like *Project key or ID* or *Board type* to see if more boards are returned. Verify the connected account has permission to view boards in Jira.

### Tools backend returned status code 404 or 500

-   **Possible cause:** The tools server backing this tool is unreachable (404) or returning an internal error (500).
-   **Fix:** Confirm that the tool's server information is correct and reachable from Glean. For 500 errors, contact Glean support to investigate the underlying exception.

### Invalid redirect URI during Jira authentication

-   **Possible cause:** The `verify_code` URI for tools OAuth has not been added to the allowed redirect URIs for the Jira OAuth app.
-   **Fix:** An admin should add the tools OAuth `verify_code` endpoint for your Glean instance to the OAuth app's allowed redirect URIs and retry authentication.

## FAQs[​](#faqs "Direct link to FAQs")

### What types of boards can I retrieve?

You can filter boards by type using the *Board type* parameter. Common board types include scrum and kanban boards.

### Can I list boards across multiple projects?

To list boards for a specific project, use the *Project key or ID* parameter. If you leave this parameter empty, the tool will return boards across all projects the user has access to.
