---
url: "https://docs.glean.com/tools/connector/github/list-commits"
canonical: "https://docs.glean.com/tools/connector/github/list-commits"
title: "List commits"
description: "Gets commit history from a GitHub repository with filtering and pagination options"
fetched_at: "2026-09-01T13:30:00.681Z"
---
On this page

The *GitHub List commits* tool retrieves commit history from a GitHub repository with filtering and pagination options. Use this read-only tool to explore commit activity for review, audit, or debugging workflows.

The tool supports filtering by owner, repository, author, committer, path, and time range (since, until), making it useful for pull request reviews, repository activity summaries, and targeted commit analysis.

## Limitations[​](#limitations "Direct link to Limitations")

-   Subject to GitHub API rate limits and Glean’s configured rate limits for the GitHub connector. On very large organizations or repositories, calls may be slower or may return errors when limits are reached.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must install and configure the GitHub connector, add GitHub tools under **Admin Console** → **Platform** → Tools, and enable this tool.
    
-   A GitHub app must be installed on the relevant organization(s) and linked to the correct GitHub connector in the Glean admin console.
    
-   For custom GitHub apps, ensure required repository permissions (contents, commit statuses, issues, pull requests) are granted to read commit history.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Name | Type | Description |
| --- | --- | --- |
| Author | String | Filter results to items authored by this user or identifier. |
| Committer | String | Filter results to items committed by this user or identifier. |
| Owner | String | Owner name of the repository or project (for example, user or organization). |
| Page | Integer | Page number of results to return (used for pagination). Default is 1. |
| Path | String | Restrict results to items that touch the given file or directory path. |
| Results per page | Integer | Number of results to include per page. Default is 1. |
| Repository | String | Repository name or project identifier under the owner. |
| SHA | String | Specific revision (for example, branch name or commit SHA) to list results from. |
| Since | String | Only include items created or updated after this timestamp (typically ISO 8601). |
| Until | String | Only include items created or updated before this timestamp (typically ISO 8601). |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to review what changes a specific developer made to the authentication module in the last two weeks.

*Instruction to an agent:*

"Show me all commits by **[alice@company.com](mailto:alice@company.com)** to the **auth/** directory in the **mycompany/backend** repository from the last two weeks."

*Resulting behavior:*

-   Calls List commits with:
    
    -   `Owner` set to "mycompany".
        
    -   `Repository` set to "backend".
        
    -   `Author` set to "[alice@company.com](mailto:alice@company.com)".
        
    -   `Path` set to "auth/" to filter commits touching the authentication directory.
        
    -   `Since` set to two weeks ago (for example, 2025-01-01T00:00:00Z).
        
    -   `Results per page` set to 30 to retrieve a reasonable batch.
        
-   Retrieves commit data including:
    
    -   Commit SHA and message
        
    -   Author information
        
    -   Commit timestamp
        
    -   Files changed in each commit
        
    -   Commit URL for detailed review
        
-   Presents the filtered commit history showing only Alice's changes to the auth directory.
    
-   User can review the commit messages and click through to see detailed diffs.
    

*Workflow tip:* Use `Author` to filter by developer, `Path` to focus on specific directories or files, and `Since`/`Until` to narrow the time range. Combine with `Page` and `Results per page` parameters for pagination when dealing with large commit histories. This is particularly useful for code reviews, security audits, and understanding recent changes to critical components.

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

### Expected commits do not appear in results

-   **Possible cause:** The repository may not be indexed or authorized for the requesting user, or the filters such as since/until, author, or path may be too restrictive.
-   **Fix:** Confirm that the repository is part of the connected GitHub connector, that the requesting user has access to it, and that any date or author filters are correct. If needed, temporarily remove filters to verify that commits are returned.

## FAQs[​](#faqs "Direct link to FAQs")

### Can I retrieve commits from multiple repositories in a single call?

No. This tool retrieves commits from a single repository specified by the Owner and Repository parameters. To get commits from multiple repositories, call the tool separately for each repository.
