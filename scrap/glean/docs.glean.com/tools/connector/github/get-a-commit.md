---
url: "https://docs.glean.com/tools/connector/github/get-a-commit"
canonical: "https://docs.glean.com/tools/connector/github/get-a-commit"
title: "Get a commit"
description: "Retrieves details of a specific commit from a GitHub repository by branch name or commit SHA"
fetched_at: "2026-09-01T13:30:00.259Z"
---
On this page

*GitHub get a commit* tool retrieves details for a specific commit in a GitHub repository. This is a read-only tool that returns commit metadata including author, committer, message, file changes, and parent commit references.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must install and configure the GitHub connector, add GitHub tools under **Admin Console → Platform → Tools**, and enable this tool.
    
-   A GitHub app must be installed on the relevant organization(s) and linked to the correct GitHub connector in the Glean admin console.
    
-   The GitHub app must have read permissions to repository contents and metadata.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| Owner | String | Yes | The account owner of the repository (case-insensitive). |
| Repository | String | Yes | The name of the repository without the .git extension (case-insensitive). |
| Branch or commit | String | Yes | The branch name, tag, or commit SHA to retrieve (e.g., "main", "v1.0.0", or full SHA). |
| Page | Integer | No | Page number for paginated file listings in the commit diff (default is 1). |
| Results per page | Integer | No | Number of files per page in the commit diff (default is 30, maximum is 100). |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Show me the details of the most recent commit on the 'main' branch of the 'octocat/Hello-World' repository."
    
-   "Get information about commit SHA 'abc123def456' in the 'facebook/react' repository."
    
-   "What files were changed in the latest commit on the 'develop' branch of 'microsoft/vscode'?"
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Authentication or authorization failure

-   **Possible cause:** The GitHub connector is not fully set up, the GitHub app is not installed on the target organization, or the app is missing read permissions to repository contents.
-   **Fix:** Confirm that the GitHub connector is installed and authenticated, that the GitHub app is installed on the correct organization(s), and that it has read permissions to repository contents and metadata. If using a custom app, verify that the `contents:read` permission is enabled.

### 404 error or repository not found

-   **Possible cause:** The owner, repository name, or ref value is incorrect, the repository does not exist, or the authenticated user does not have access to it.
-   **Fix:** Verify that the repository exists at [https://github.com/owner/repo](https://github.com/owner/repo) and that the authenticated user has at least read access to it. Check for typos in the **Owner**, **Repository**, or **Ref** parameters.

### Commit not found or invalid ref

-   **Possible cause:** The **Ref** parameter does not match any branch, tag, or commit SHA in the repository.
-   **Fix:** Verify that the branch or tag name is spelled correctly (branch and tag names are case-sensitive). If using a commit SHA, ensure you are using the full 40-character SHA or at least the first 7 characters. Use **List commits** to find valid commit SHAs if needed.

### 403 error with OAuth App access restrictions

-   **Possible cause:** The GitHub organization has enabled OAuth App access restrictions, and the app used by this tool is not allowed to access the repository.
-   **Fix:** Ask your GitHub organization admin to approve or allow the GitHub app used by this tool for the relevant repositories, then retry.

### Commit diff is truncated or incomplete

-   **Possible cause:** The commit contains a very large number of file changes, and the response is paginated or truncated by GitHub's API limits.
-   **Fix:** Use the **Page** and **Per page** parameters to retrieve additional pages of file changes. Note that GitHub may truncate diffs for extremely large commits (e.g., those with thousands of file changes).

## FAQs[​](#faqs "Direct link to FAQs")

### Can I use a branch name instead of a commit SHA?

Yes. The **Ref** parameter accepts branch names, tag names, or commit SHAs. When you provide a branch name (e.g., "main"), the tool returns the latest commit on that branch. When you provide a commit SHA, it returns that specific commit regardless of which branch it is on.

### What is the difference between author and committer?

The **author** is the person who originally wrote the code changes, while the **committer** is the person who applied the commit to the repository. In most cases, these are the same person. However, when applying patches or rebasing commits, the author and committer may differ. Both fields include name, email, and timestamp.

### How do I retrieve commits from a specific pull request?

This tool retrieves individual commits by reference. To get commits from a pull request, first use **Get a pull request** to retrieve the PR's head SHA, then use this tool with that SHA as the **Ref** parameter. Alternatively, use **List commits** to get all commits within a date range or branch.

### Does this tool show the actual file content changes?

This tool returns a list of files changed in the commit along with statistics (additions, deletions). To see the actual content changes (the diff), use **Get repository content** to retrieve the files at different commit references, or examine the patch/diff URLs in the response. GitHub may truncate diffs for very large commits.
