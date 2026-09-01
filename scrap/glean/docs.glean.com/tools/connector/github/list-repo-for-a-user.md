---
url: "https://docs.glean.com/tools/connector/github/list-repo-for-a-user"
canonical: "https://docs.glean.com/tools/connector/github/list-repo-for-a-user"
title: "List repositories for a user"
description: "Lists public repositories owned by a specific GitHub user"
fetched_at: "2026-09-01T13:30:00.997Z"
---
On this page

*GitHub list repositories for a user* tool lists public repositories owned by a specific GitHub user. This is a read-only tool that returns repository metadata with support for filtering, sorting, and pagination.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must install and configure the GitHub connector, add GitHub tools under **Admin Console** → **Platform** → Tools, and enable this tool.
    
-   A GitHub app must be installed on the relevant organization(s) and linked to the correct GitHub connector in the Glean admin console.
    
-   The GitHub app must have read permissions to repository metadata.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| Username | String | Yes | The GitHub username whose repositories you want to list. |
| Repository type | String | No | Filter by repository type (e.g., "all", "owner", "member"). |
| Sort by | String | No | Field to sort repositories by (e.g., "created", "updated", "pushed", "full\_name"). |
| Direction | String | No | Sort direction ("asc" for ascending, "desc" for descending). Works with the sort parameter. |
| Results per page | Integer | No | Maximum number of repositories to return per page (default is 30, maximum is 100). |
| Page | Integer | No | Page number for paginated results (default is 1). |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Show me the most recently updated repositories owned by the GitHub user 'octocat'."
    
-   "List all public repositories for the user 'torvalds'."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Authentication or authorization failure

-   **Possible cause:** The GitHub connector is not fully set up, the GitHub app is not installed on the target organization, or the app is missing read permissions to repository metadata.
-   **Fix:** Confirm that the GitHub connector is installed and authenticated, that the GitHub app is installed on the correct organization(s), and that it has read permissions to repository metadata. If using a custom app, verify that the `metadata:read` permission is enabled.

### 403 error with OAuth App access restrictions

-   **Possible cause:** The GitHub organization has enabled OAuth App access restrictions, and the app used by this tool is not allowed to access repositories for the specified user.
-   **Fix:** Ask your GitHub organization admin to approve or allow the GitHub app used by this tool for the relevant repositories, then retry.

### User not found or no repositories returned

-   **Possible cause:** The username is misspelled, the user does not exist, or the user has no public repositories visible to the authenticated app.
-   **Fix:** Verify the username is correct and that the user has public repositories. Note that this tool only returns repositories the authenticated GitHub app can access based on its permissions and the repository visibility settings.

### Pagination returns incomplete results

-   **Possible cause:** The user has more repositories than fit in a single page, or the per page parameter is set too low.
-   **Fix:** Use the **Page** parameter to retrieve additional pages of results. The GitHub API returns up to 100 repositories per page. Check the response metadata to determine if more pages are available.

## FAQs[​](#faqs "Direct link to FAQs")

### What types of repositories does this tool return?

This tool returns public repositories owned by the specified GitHub user. The results depend on the repository visibility settings and what the configured GitHub app is allowed to access. Use the **Type** parameter to filter by repository type (e.g., "owner", "member").

### Can I list private repositories for a user?

This tool can list private repositories only if the authenticated GitHub app has been granted access to those repositories and the necessary permissions. For most use cases, this tool returns public repositories only.

### How do I handle pagination when a user has many repositories?

Use the **Page** and **Per page** parameters to paginate through results. Set **Per page** to a value between 1 and 100 (default is 30), and increment **Page** to retrieve subsequent pages. Check the response metadata to determine if more pages are available.

### What is the difference between this tool and List repositories for the authenticated user?

This tool lists repositories for any specified GitHub user (by username) and typically returns public repositories. **List repositories for the authenticated user** lists repositories accessible to the currently authenticated user, including private repositories they own or have access to.
