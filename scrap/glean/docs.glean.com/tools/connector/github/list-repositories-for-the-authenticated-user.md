---
url: "https://docs.glean.com/tools/connector/github/list-repositories-for-the-authenticated-user"
canonical: "https://docs.glean.com/tools/connector/github/list-repositories-for-the-authenticated-user"
title: "List repositories for the authenticated user"
description: "Lists repositories for the authenticated user"
fetched_at: "2026-09-01T13:30:01.221Z"
---
On this page

The *GitHub List repositories for the authenticated user* tool retrieves repositories owned by the currently authenticated user with filtering and sorting options. Use this read-only tool when you need the authenticated user's repositories as input to other workflow steps.

Results are limited to repositories that the authenticated user and the connected GitHub app can access.

## Limitations[​](#limitations "Direct link to Limitations")

-   Calls are subject to GitHub API rate limits and to any rate limits configured for the GitHub connector. On large organizations with many repositories or when many tools run in a short time, you may see slower responses or rate-limit errors.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must install and configure the GitHub connector, add GitHub tools under **Admin Console** → **Platform** → Tools, and enable this tool.
    
-   A GitHub app must be installed on the relevant organization(s) and linked to the correct GitHub connector in the Glean admin console.
    
-   You must authenticate for GitHub tools so the tool can run using your GitHub identity.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Before | String | Filters results to items that occur before this value, often passed as a timestamp or pagination cursor. |
| Direction | String | Sort direction for the results, typically asc for ascending or desc for descending order. |
| Page | Integer | Page number of results to return for paginated responses; defaults to 1 (the first page). |
| Results per page | Integer | Number of items to include per page in a paginated response; defaults to 30. |
| Raw response | Boolean | If true, returns the raw API response payload; if false, returns a processed or normalized result. |
| Since | String | Filters results to items created or updated after this value, usually provided as an ISO 8601 timestamp. |
| Sort by | String | Field to sort results by; defaults to `full_name`. |
| Repository type | String | Type of items to include in the results; defaults to all, for example, all types unless further filtered. |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to identify your most recently updated personal repositories to prioritize maintenance work.

*Instruction to an agent:*

"Show me my personal GitHub repositories (not forks) that were updated since **2025-01-01**, sorted by last update time. Return 50 repositories per page."

*Resulting behavior:*

-   Calls List repositories for the authenticated user with:
    
    -   `Repository type` set to "owner" to exclude forks.
        
    -   `Since` set to "2025-01-01T00:00:00Z" to filter recent updates.
        
    -   `Sort by` set to "updated".
        
    -   `Direction` set to "desc" for newest first.
        
    -   `Results per page` set to 50.
        
    -   `Page` set to 1 (default).
        
-   Retrieves repository data including:
    
    -   Repository name and full name
        
    -   Visibility (public or private)
        
    -   Primary language
        
    -   Default branch
        
    -   Last updated timestamp
        
    -   Last pushed timestamp
        
    -   Repository description
        
    -   Stars and forks count
        
-   Presents the filtered list of repositories sorted by most recent activity.
    
-   User can review the list and decide which repositories need attention.
    

*Workflow tip:* Use filters like `Repository type`, `Since`, `Sort by`, and `Direction` to narrow results. Combine with `Page` and `Results per page` for pagination. Use this tool as the first step in workflows that generate onboarding documentation or repository summaries by feeding the repository list into downstream tools.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Authentication or authorization failure

-   **Possible cause:** The GitHub app is not installed on the target organization, or the app is missing required permissions.
-   **Fix:** Confirm that the GitHub app is installed on the correct organization(s), and that it has the necessary repository and organization scopes. If using a custom app, verify that permissions such as contents, issues, pull requests, and commit-related scopes are enabled.

### Tools or tool not available

-   **Possible cause:** GitHub tools are not added in **Admin Console** → **Platform** → Tools, not linked to the correct connector, or not enabled by an admin.
-   **Fix:** In the Glean admin console, add GitHub tools, link it to the appropriate GitHub connector, and save. Ensure an Admin, Super Admin, or Setup Admin enables the pack and this specific tool.

### Slow responses or rate-limit errors

-   **Possible cause:** GitHub API rate limits or the configured rate limits of the connector are being reached, particularly for large organizations or repositories or when many tools run in a short time.
-   **Fix:** Narrow the query, for example, by using `since/until` or filtering by `author/path`, retry after some time, and coordinate with your Glean admin if rate limits need to be adjusted at the deployment level.

### 403 response mentioning OAuth App access restrictions

-   **Possible cause:** The GitHub organization has enabled OAuth App access restrictions and the GitHub App used by this tool is not allowed to access repositories for the authenticated user.
-   **Fix:** Ask your GitHub organization admin to allow the GitHub App or adjust OAuth App access restrictions for the relevant organization or repositories, following the guidance linked in the GitHub error message.

### Expected repositories do not appear in the results

-   **Possible cause:** The repositories may not be accessible to the authenticated user, or the filters applied to the tool such as `repository type`, `since`, or `sort by` may be too restrictive.
-   **Fix:** Confirm that the user has access to the missing repositories in GitHub and that the GitHub App is installed with permission to read them. Try running the tool again with fewer or no filters to verify that repositories are returned.

## FAQs[​](#faqs "Direct link to FAQs")

### What GitHub environments does this tool support?

This tool depends on your GitHub connector configuration. It is intended for use where GitHub is connected as a connector in Glean, typically GitHub Cloud via the standard GitHub connector. Support for other variants depends on how your deployment's connector is set up.
