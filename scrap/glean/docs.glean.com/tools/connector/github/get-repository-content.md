---
url: "https://docs.glean.com/tools/connector/github/get-repository-content"
canonical: "https://docs.glean.com/tools/connector/github/get-repository-content"
title: "Get repository content"
description: "Fetches files and folders from a GitHub repository at a specific path or branch"
fetched_at: "2026-09-01T13:30:00.439Z"
---
On this page

The *GitHub Get repository content* tool retrieves files and folders from a GitHub repository at a specific path, branch, or commit reference. Use this read-only tool to inspect code structure, documentation, or directory listings for analysis, summaries, or onboarding content generation.

## Limitations[​](#limitations "Direct link to Limitations")

-   Access can get blocked by GitHub organization OAuth App access restrictions, returning a 403 error even when credentials are correct.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must install and configure the GitHub connector, add GitHub tools under **Admin Console** → **Platform** → Tools, and enable this tool.
    
-   A GitHub app must be installed on the relevant organization(s) and linked to the correct GitHub connector in the Glean admin console.
    
-   You must authenticate for GitHub tools so the tool can run using your GitHub identity.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Name | Type | Description |
| --- | --- | --- |
| Owner | String | Repository owner. |
| Repository | String | Repository name. |
| File path | String | File or folder path within the repository. |
| Branch or commit | String | Branch or commit reference to read content from. |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to create onboarding documentation for new contributors by examining the structure of the project's documentation directory.

*Instruction to an agent:*

"Show me all files in the **docs/** directory of the **mycompany/backend** repository on the **main** branch."

*Resulting behavior:*

-   Calls Get repository content with:
    
    -   `Owner` set to "mycompany".
        
    -   `Repository` set to "backend".
        
    -   `File path` set to "docs/".
        
    -   `Branch or commit` set to "main".
        
-   Retrieves repository content including:
    
    -   List of files in the docs/ directory
        
    -   File names and paths
        
    -   File types (file vs directory)
        
    -   File sizes
        
    -   Download URLs for each file
        
-   Presents the directory structure to the user.
    
-   User can review the documentation files and decide which ones to include in the onboarding guide.
    

*Workflow tip:* Use this tool to inspect repository structure before generating documentation or onboarding content. You can specify a branch or commit SHA to view content at a specific point in history. For private repositories, ensure the GitHub app has proper access permissions.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### 403 response with OAuth App access restrictions message

-   **Possible cause:** The GitHub organization has restricted third-party OAuth apps, so the app used by this tool is not allowed to read repository contents even if credentials appear to be correct.
-   **Fix:** Ask your GitHub organization admin to enable the app or adjust OAuth App access restrictions for the relevant repositories.

## FAQs[​](#faqs "Direct link to FAQs")

### Can this tool read content from private repositories?

Yes, provided your GitHub connector and GitHub app are configured to access those private repositories and your authenticated identity has permission to read them.

### What should I do if the tool returns no content for a path I expect to exist?

Confirm that the `owner`, `repository`, `file path`, and `branch or commit` values exactly match what exists in GitHub. If the values are correct, verify that the GitHub app and your GitHub identity have read access to that path and repository.
