---
url: "https://docs.glean.com/tools/connector/github/list-repo-languages"
canonical: "https://docs.glean.com/tools/connector/github/list-repo-languages"
title: "List repository languages"
description: "Lists the programming languages detected in a specific GitHub repository"
fetched_at: "2026-09-01T13:30:01.075Z"
---
On this page

*GitHub list repository languages* tool lists the programming languages detected in a specific GitHub repository. This is a read-only tool that returns language statistics based on GitHub's language detection for the repository.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must install and configure the GitHub connector, add GitHub tools under **Admin Console** → **Platform** → Tools, and enable this tool.
    
-   A GitHub app must be installed on the relevant organization(s) and linked to the correct GitHub connector in the Glean admin console.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Owner | String | The username or organization that owns the repository (case-insensitive). |
| Repository | String | The name of the repository without the .git extension (case-insensitive). |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "What programming languages are used in the 'facebook/react' repository?"
    
-   "Show me the language breakdown for 'microsoft/vscode'."
    
-   "What is the primary language in the 'tensorflow/tensorflow' repository?"
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Authentication or authorization failure

-   **Possible cause:** The GitHub connector is not fully set up, the GitHub app is not installed on the target organization, or the app is missing required permissions.
-   **Fix:** Confirm that the GitHub connector is installed and authenticated, that the GitHub app is installed on the correct organization(s), and that it has the necessary repository scopes. If using a custom app, verify that permissions to read repository metadata are enabled.

### Repository not found or 404 error

-   **Possible cause:** The owner or repository name is incorrect, the repository does not exist, or the authenticated user does not have access to it.
-   **Fix:** Verify that the repository exists at [https://github.com/owner/repo](https://github.com/owner/repo) and that the authenticated user has at least read access to it. Check for typos in the owner or repository name.

### No languages returned or empty response

-   **Possible cause:** The repository may not contain any code files, or GitHub has not yet analyzed the repository to detect languages.
-   **Fix:** This is expected behavior for empty repositories or repositories with only documentation/configuration files. GitHub's language detection runs periodically and may take time for new repositories. Verify that the repository contains actual code files.

### 403 response with OAuth App access restrictions message

-   **Possible cause:** The GitHub organization has restricted third-party OAuth apps, so the app used by this tool is not allowed to access repository information.
-   **Fix:** Ask your GitHub organization admin to enable the app or adjust OAuth App access restrictions for the relevant repositories.

## FAQs[​](#faqs "Direct link to FAQs")

### What information does this tool return?

The tool returns the programming languages detected in the repository along with the number of bytes of code written in each language. This data comes from GitHub's automatic language detection, which analyzes file extensions and content.

### Can I see languages for private repositories?

Yes, as long as the authenticated user has access to the private repository. The tool respects GitHub's access control and only returns language information for repositories the user can access.

### Can I use this to filter repositories by programming language?

Yes. You can use this tool in a workflow to check the languages of multiple repositories and filter or categorize them based on their primary language or language mix. Combine this with repository search or listing tools for bulk analysis.
