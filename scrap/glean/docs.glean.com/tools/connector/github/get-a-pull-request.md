---
url: "https://docs.glean.com/tools/connector/github/get-a-pull-request"
canonical: "https://docs.glean.com/tools/connector/github/get-a-pull-request"
title: "Get a pull request"
description: "Retrieves details for an existing pull request"
fetched_at: "2026-09-01T13:30:00.162Z"
---
On this page

The *GitHub Get a pull request* tool retrieves details for a single existing pull request in a connected GitHub repository. Use this read-only tool to get structured pull request data for analysis, review, or documentation tasks.

Specify the pull request by owner, repository, and pull request number. The tool works across any connected GitHub repositories, including private repositories, as long as the GitHub app is properly installed and the calling user has permission to view the pull request.

## Limitations[​](#limitations "Direct link to Limitations")

-   Subject to GitHub API rate limits, along with any additional limits configured by your admin for GitHub tools.
    
-   Can operate only on repositories and pull requests that are accessible through GitHub app installation and permissions of your organization.
    
-   For private repositories, the GitHub app used for tools must be installed and authorized for the organization and for the specific repository. If that app is missing or not fully approved, calls to this tool can return *HTTP 404 Not Found* even when the pull request exists.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must install and configure the GitHub connector, add GitHub tools under **Admin Console → Platform → Tools**, and enable this tool.
    
-   A GitHub app must be installed on the relevant organization(s) and linked to the correct GitHub connector in the Glean admin console.
    
-   You must authenticate for GitHub tools so the tool can run using your GitHub identity.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Owner | String | Owner of the repository that contains the pull request. |
| Repository Name | String | Name of the repository that contains the pull request. |
| Pull Request Number | Integer | Number of the pull request to retrieve details for. |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to review an important pull request that was just opened and need to see its details before deciding next steps.

*Instruction to an agent:*

"Get the details for pull request **#127** in the **mycompany/backend** repository."

*Resulting behavior:*

-   Calls Get a pull request with:
    
    -   `Owner` set to "mycompany".
        
    -   `Repository Name` set to "backend".
        
    -   `Pull Request Number` set to 127.
        
-   Retrieves pull request data including:
    
    -   PR title and description
        
    -   Author information
        
    -   Base and head branches
        
    -   Current state (open, closed, merged)
        
    -   List of changed files
        
    -   Commit count
        
    -   Review status and comments
        
    -   Labels and assignees
        
-   Presents the pull request details to the user.
    
-   User can review the information and decide whether to approve, request changes, or take other tools.
    

*Workflow tip:* Use this tool as the first step in pull request review workflows. Combine it with other GitHub tools to build intelligent review agents that can summarize changes, leave targeted comments, or request specific reviewers based on the files changed.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool fails for a specific pull request

-   **Possible cause:** The owner, repo, or pull\_number values do not match an existing pull request that is available through your GitHub connector.
-   **Fix:** Confirm that the repository is connected in Glean, the pull request exists in GitHub, and the identifiers you passed (owner, repo, pull request number) match the pull request you want to retrieve.

### Tool succeeds intermittently or stops working after many rapid calls

-   **Possible cause:** You are hitting GitHub API rate limits.
-   **Fix:** Reduce how frequently the tool is called or stagger calls across workflows. If this keeps happening, contact your Glean admin to review configuration and usage.

### Tool appears unavailable or you see an authentication or permission error

-   **Possible cause:** GitHub tools are not enabled for your organization, you have not authenticated for GitHub tools, or your GitHub identity does not have permission to read pull requests for the target repository.
-   **Fix:** Ask your Glean admin to confirm that GitHub tools are added and that you are allowed to use them, then re-authenticate for GitHub and try again.

### 404 Not Found error when trying to fetch a pull request

-   **Possible cause:** The GitHub app used for tools is not installed or not authorized for the organization or for the specific (often private) repository, even though the pull request exists.
-   **Fix:** Verify that the correct GitHub app for tools are installed and approved at the organization level and has access to the target repository. After updating the app configuration, re-authenticate for GitHub tools and retry.

## FAQs[​](#faqs "Direct link to FAQs")

### Can this tool read private pull requests?

Yes, as long as the GitHub app used for tools are installed and authorized for your organization and has access to the private repository.

### Who runs this tool in GitHub?

The tool runs using the identity that authenticated for GitHub tools. Make sure that identity has permission to view the target repository and pull request.
