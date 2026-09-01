---
url: "https://docs.glean.com/tools/connector/github/create-review-comment-for-a-pr"
canonical: "https://docs.glean.com/tools/connector/github/create-review-comment-for-a-pr"
title: "Create a review comment for a pull request"
description: "Creates a review comment for a pull request"
fetched_at: "2026-09-01T13:30:00.211Z"
---
On this page

The *GitHub Create a review comment for a pull request* tool adds targeted, line-level review comments to an existing pull request. Use this write tool to leave code review feedback directly on the diff, for example when flagging documentation or style issues in changed files.

Specify the exact location for the comment using commit ID, file path, and diff position details. The tool does not create pull requests or submit overall approvals or change requests.

## Limitations[​](#limitations "Direct link to Limitations")

-   Requires a valid combination of `owner`, `repo`, `pull_number`, `commit_id`, `path`, and location fields like `line` or `position`, and optional `start_line`/`start_side` that map to a real line in the pull request diff. Invalid locations will cause the tool to fail.
    
-   Like other GitHub tools, calls are subject to GitHub API rate limits. Heavy automation or tight loops can cause intermittent failures until rate limits reset.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must install and configure the GitHub connector, add GitHub tools under **Admin Console → Platform → Tools**, and enable this tool.
    
-   A GitHub app must be installed on the relevant organization(s) and linked to the correct GitHub connector in the Glean admin console.
    
-   You must authenticate for GitHub tools so the tool can run using your GitHub identity. Your identity must have permission to view the diff and post review comments in the target repository.
    

## Parameters[​](#parameters "Direct link to Parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Comment body | String | Text content of the review comment. |
| Commit ID | String | The commit SHA that the comment should be associated with. |
| Owner | String | Owner of the repository that contains the pull request. |
| File path | String | File path in the repository where you want to add the comment. |
| Pull request number | Integer | Number of the pull request to comment on. |
| Repository | String | Name of the repository that contains the pull request. |
| Reply to comment | Integer | ID of an existing review comment if you want to reply in an existing review thread instead of creating a new one. |
| Line number | Integer | Line number in the file where the comment should appear (for unified diff mode). Use either `line` or `position` depending on how your agent computes locations. |
| Position | Integer | Position in the diff where the comment should appear (for diff-based positioning). Use either `line` or `position`. |
| Side | String | Side of the diff to comment on, for example the original or the modified side of the change. |
| Start line | Integer | Starting line number for a multi-line comment range. |
| Start side | String | Side of the diff for the starting line of a multi-line comment range. |
| Subject type | String | Type of subject the comment applies to, for example a line or file-level comment, depending on how the underlying API is configured. |

## Usage example[​](#usage-example "Direct link to Usage example")

You are reviewing a pull request and notice a function is missing documentation. You want to leave a comment on that specific line suggesting the author add documentation.

*Instruction to an agent:*

"Add a review comment to pull request **#127** in **mycompany/backend** repository at line **45** in the file **src/api/users.py**, suggesting that the function needs documentation."

*Resulting behavior:*

-   Calls Get a pull request to retrieve details for PR #127 including the latest commit SHA.
    
-   Calls Create a review comment for a pull request with:
    
    -   `Owner` set to "mycompany".
        
    -   `Repository` set to "backend".
        
    -   `Pull request number` set to 127.
        
    -   `Commit ID` set to the latest commit SHA (for example, "abc123def456").
        
    -   `File path` set to "src/api/users.py".
        
    -   `Line number` set to 45.
        
    -   `Side` set to "RIGHT" to comment on the modified version.
        
    -   `Comment body` set to "Please add documentation for this function explaining the parameters, return value, and any exceptions it may raise."
        
-   Creates a review comment on the pull request at the specified line.
    
-   The comment appears in the pull request diff view attached to line 45 of the file.
    
-   The pull request author receives a notification about the new comment.
    

*Workflow tip:* Use this tool with Get a pull request to first retrieve the latest commit SHA. For multi-line comments, use `Start line` and `Start side` parameters. Combine with other GitHub tools like requesting reviewers or listing commits to build comprehensive code review agents.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool fails for a specific pull request

-   **Possible cause:** The `owner`, `repository`, or `pull_number` values do not match an existing pull request that is available through your GitHub connector, or the authenticated identity cannot access that pull request.
-   **Fix:** Confirm that the repository is connected in Glean, the pull request exists in GitHub, and the identifiers you passed match the pull request.

### Tool succeeds intermittently or stops working after many rapid calls

-   **Possible cause:** Hitting GitHub API rate limits.
-   **Fix:** Reduce how frequently the tool is called, add delays between calls, or batch comments where possible. If this keeps happening, contact your Glean admin to review configuration and usage.

### Tool appears unavailable or you see an authentication or permission error

-   **Possible cause:** GitHub tools are not enabled, or your GitHub identity does not have permission to comment on pull requests in the target repository.
-   **Fix:** Ask your Glean admin to confirm that the relevant GitHub connector instance is added with tools enabled and that you are allowed to use this tool.

## FAQs[​](#faqs "Direct link to FAQs")

### Does this tool submit an approve or request-changes review?

No. This tool creates individual review comments. To submit a full review (approve or request changes), use the separate GitHub tools that create or submit a review for a pull request, and combine them with this tool if you need both behaviors.

### Can I use this tool without specifying an exact line?

No. You must provide enough location information such as `commit_id`, `path`, and either `line` or `position` for GitHub to attach the comment to a specific place in the pull request diff.
