---
url: "https://docs.glean.com/tools/connector/github/list-repo-issues"
canonical: "https://docs.glean.com/tools/connector/github/list-repo-issues"
title: "List repository issues"
description: "Lists issues from a specific GitHub repository with filtering and pagination options"
fetched_at: "2026-09-01T13:30:01.014Z"
---
On this page

*GitHub list repository issues* tool to list issues from a specific GitHub repository. This is a read-only tool that returns issue metadata with support for filtering by state, assignee, labels, creator, and other criteria, plus pagination for large result sets.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must install and configure the GitHub connector, add GitHub tools under **Admin Console** → **Platform** → Tools, and enable this tool.
    
-   A GitHub app must be installed on the relevant organization(s) and linked to the correct GitHub connector in the Glean admin console.
    
-   The GitHub app must have read permissions to repository issues.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| Owner | String | Yes | The account owner of the repository (case-insensitive). |
| Repository | String | Yes | The name of the repository without the .git extension (case-insensitive). |
| State | String | No | Filter by issue state: "open", "closed", or "all" (default is "open"). |
| Labels | String | No | Filter by label names, comma-separated (e.g., "bug,enhancement"). Only issues with all specified labels are returned. |
| Sort by | String | No | Field to sort by: "created", "updated", or "comments" (default is "created"). |
| Direction | String | No | Sort direction: "asc" for ascending or "desc" for descending (default is "desc"). |
| Since | String | No | Only return issues created or updated after this timestamp (ISO 8601 format, e.g., "2024-01-01T00:00:00Z"). |
| Assignee | String | No | Filter by assigned user. Use a username, "none" for unassigned issues, or "\*" for any assigned issue. |
| Creator | String | No | Filter by the user who created the issue (GitHub username). |
| Mentioned user | String | No | Filter by a user mentioned in the issue (GitHub username). |
| Milestone | String | No | Filter by milestone number, "none" for issues with no milestone, or "\*" for issues with any milestone. |
| Results per page | Integer | No | Number of results per page (default is 30, maximum is 100). |
| Page | Integer | No | Page number for paginated results (default is 1). |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Show me all open bugs in the 'octocat/Hello-World' repository."
    
-   "List closed issues assigned to me in the 'facebook/react' repository."
    
-   "What are the most recently updated issues in 'microsoft/vscode' with the 'enhancement' label?"
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Authentication or authorization failure

-   **Possible cause:** The GitHub connector is not fully set up, the GitHub app is not installed on the target organization, or the app is missing read permissions to repository issues.
-   **Fix:** Confirm that the GitHub connector is installed and authenticated, that the GitHub app is installed on the correct organization(s), and that it has read permissions to repository issues. If using a custom app, verify that the `issues:read` permission is enabled.

### 403 error with OAuth App access restrictions

-   **Possible cause:** The GitHub organization has enabled OAuth App access restrictions, and the app used by this tool is not allowed to access the repository.
-   **Fix:** Ask your GitHub organization admin to approve or allow the GitHub app used by this tool for the relevant repositories, then retry.

### Slow responses or rate limit errors

-   **Possible cause:** GitHub API rate limits are being reached, especially for organizations with many repositories or when many tools run in a short time.
-   **Fix:** Narrow the query by using filters such as **Since**, **State**, or **Labels** to reduce the number of issues returned. Retry after some time, and coordinate with your Glean admin if rate limits need to be adjusted at the deployment level.

### Expected issues do not appear in results

-   **Possible cause:** The repository may not be indexed or authorized for the requesting user, or the filters (such as **Labels**, **Assignee**, **Creator**, or **Since**) may be too restrictive.
-   **Fix:** Confirm that the repository is part of the connected GitHub connector and that the requesting user has access to it. Verify that filter values are correct (e.g., label names are exact matches, usernames are valid). Temporarily remove filters to verify that issues are returned without filtering.

### No issues returned for a repository with known issues

-   **Possible cause:** The default filter for **State** is "open", so closed issues are not returned unless explicitly requested.
-   **Fix:** Set **State** to "all" to return both open and closed issues, or set it to "closed" to return only closed issues.

## FAQs[​](#faqs "Direct link to FAQs")

### What types of issues does this tool return?

This tool returns issues from the specified GitHub repository based on the filters you provide. By default, it returns open issues. Use the **State** parameter to include closed issues or both open and closed. Pull requests are also included in the results, as GitHub treats them as issues.

### Can I filter issues by multiple labels?

Yes. Use the **Labels** parameter with comma-separated label names (e.g., "bug,high-priority"). The tool returns only issues that have all the specified labels. To find issues with any of several labels, you would need to make multiple calls with different label filters.

### How do I find unassigned issues?

Set the **Assignee** parameter to "none" to return only issues that are not assigned to anyone. To find issues assigned to anyone, use "\*" as the assignee value.

### Can I search across multiple repositories at once?

No. This tool lists issues from a single repository specified by the **Owner** and **Repository** parameters. To search across multiple repositories, call this tool multiple times with different repository parameters, or use GitHub's search issues tool for cross-repository queries.
