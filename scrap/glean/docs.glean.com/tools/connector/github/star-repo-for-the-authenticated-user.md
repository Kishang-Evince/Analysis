---
url: "https://docs.glean.com/tools/connector/github/star-repo-for-the-authenticated-user"
canonical: "https://docs.glean.com/tools/connector/github/star-repo-for-the-authenticated-user"
title: "Star a repository for the authenticated user"
description: "Stars a GitHub repository on behalf of the authenticated user"
fetched_at: "2026-09-01T13:30:01.416Z"
---
On this page

*GitHub star a repository for the authenticated user* tool to star a GitHub repository on behalf of the authenticated user. This is a write tool that programmatically adds a star to a repository, marking it as a favorite or important for later reference.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must install and configure the GitHub connector, add GitHub tools under **Admin Console** → **Platform** → Tools, and enable this tool.
    
-   A GitHub app must be installed on the relevant organization(s) and linked to the correct GitHub connector in the Glean admin console.
    
-   The GitHub app must have the necessary permissions to star repositories on behalf of users.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Owner | String | The owner of the target GitHub repository (user or organization). |
| Repository | String | The name of the target GitHub repository to star. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Star the 'react' repository from 'facebook' on GitHub so I can keep track of it for my frontend project."
    
-   "Add a star to the 'tensorflow/tensorflow' repository."
    
-   "Star the 'microsoft/vscode' repository for later reference."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Authentication or authorization failure

-   **Possible cause:** The GitHub connector is not fully set up, the GitHub app is not installed on the target organization, or the app is missing required permissions.
-   **Fix:** Confirm that the GitHub connector is installed and authenticated, that the GitHub app is installed on the correct organization(s), and that it has the necessary repository scopes. If using a custom app, verify that permissions for starring repositories are enabled.

### Repository not found or 404 error

-   **Possible cause:** The owner or repository name is incorrect, the repository does not exist, or the authenticated user does not have access to it.
-   **Fix:** Verify that the repository exists at [https://github.com/owner/repo](https://github.com/owner/repo) and that the authenticated user has at least read access to it. Check for typos in the owner or repository name.

### Tool succeeds but star does not appear

-   **Possible cause:** There may be a delay in GitHub updating the star count, or the star was applied but not immediately visible due to caching.
-   **Fix:** Wait a few moments and refresh the repository page or check your starred repositories list at [https://github.com/stars](https://github.com/stars) to confirm the star was applied.

### 403 response with OAuth App access restrictions message

-   **Possible cause:** The GitHub organization has restricted third-party OAuth apps, so the app used by this tool is not allowed to star repositories even if credentials appear to be correct.
-   **Fix:** Ask your GitHub organization admin to enable the app or adjust OAuth App access restrictions for the relevant repositories.

## FAQs[​](#faqs "Direct link to FAQs")

### Can I star private repositories?

Yes, you can star private repositories as long as the authenticated user has access to them. The repository will appear in your starred list, but it will only be visible to you and others who have access to the private repository.

### Is there a limit to how many repositories I can star?

GitHub does not impose a hard limit on the number of repositories you can star, but you should be mindful of rate limiting if you are starring many repositories in quick succession. The GitHub API has rate limits that may affect bulk operations.

### Can I unstar a repository using this tool?

No. This tool only stars repositories. To unstar a repository, you would need a separate tool or do it manually through the GitHub interface.

### Does this tool work with GitHub Enterprise?

This tool is designed for GitHub.com and GitHub Enterprise Cloud. Support for GitHub Enterprise Server depends on your GitHub connector configuration. Confirm with your admin if you are using GitHub Enterprise Server.
