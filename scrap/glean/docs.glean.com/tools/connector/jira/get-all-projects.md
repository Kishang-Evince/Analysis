---
url: "https://docs.glean.com/tools/connector/jira/get-all-projects"
canonical: "https://docs.glean.com/tools/connector/jira/get-all-projects"
title: "Get all projects"
description: "Retrieves a list of Jira projects with optional filtering and pagination"
fetched_at: "2026-09-01T13:30:03.302Z"
---
On this page

*Jira get all projects* tool retrieves a list of projects from your Jira instance. This is a read-only tool that returns projects with support for filtering by name, category, status, and other criteria.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must complete the initial Jira setup and enable tools in the Admin Console so that the Jira tools are available in Agent Builder.
-   Each user is prompted to connect their Jira account via OAuth in Glean before running tools, including Jira Assign issue.
-   If your Jira organization uses Central OAuth, a Jira administrator must authorize the app for the site before users can run Jira tools in Glean.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Search query | String | Text to search for in project names and descriptions. |
| Name | String | Filter projects by exact or partial name match. |
| Category ID | String | Filter projects by category identifier. |
| Status | String | Filter projects by status (e.g., live, archived). |
| Tool | String | Type of tool to perform when retrieving projects. |
| Expand | String | Comma-separated list of additional fields to expand in the response. |
| Properties | String | Additional properties to include in the results. |
| Sort by | String | Field to sort results by (e.g., name, key, category). |
| Start at | Integer | Zero-based index for pagination to fetch subsequent pages. |
| Results limit | Integer | Maximum number of projects to return per page. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Show me all active Jira projects in our Engineering category."
    
-   "List all Jira projects I have access to."
    
-   "What archived projects exist in Jira?"
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### No projects returned or fewer projects than expected

-   **Possible cause:** The connected account does not have permission to view all projects, or filters are too restrictive.
-   **Fix:** Confirm that the connected account has permission to view the projects directly in Jira. Try removing filters like *Status* or *Category ID* to see if more projects are returned.

### Permission or authentication errors

-   **Possible cause:** The Jira tools are not fully configured, or the connected account is missing, inactive, or lacks the required scopes to read projects.
-   **Fix:** Ask an admin to verify that the Jira tools are enabled for your deployment and that the user has an active connected account with the right scopes. Have the user reconnect their Jira account if the token has expired.

### Tool not available in agent builder

-   **Possible cause:** The Jira tools are not enabled, or there is a configuration issue preventing the tool from appearing.
-   **Fix:** Ask your Glean admin to verify that the Jira tools are enabled and properly configured for your deployment. If the issue persists, contact Glean support.

### Pagination not working as expected

-   **Possible cause:** The *Start at* index is beyond the available results, or *Results limit* is set too low.
-   **Fix:** Check that *Start at* is a valid index within the result set. Start with *Start at* set to 0 and use the total count from the response to calculate pagination offsets.

## FAQs[​](#faqs "Direct link to FAQs")

### Can I retrieve archived projects?

Yes. Set the **Status** parameter to "archived" to retrieve only archived projects, or leave it empty to retrieve all projects regardless of status.

### How does pagination work?

Use *Results limit* to control how many projects are returned per page, and *Start at* to specify the starting index for pagination. For example, to get the second page of 50 projects, set *Start at* to 50 and *Results limit* to 50.
