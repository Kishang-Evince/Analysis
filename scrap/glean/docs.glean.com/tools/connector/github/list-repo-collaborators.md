---
url: "https://docs.glean.com/tools/connector/github/list-repo-collaborators"
canonical: "https://docs.glean.com/tools/connector/github/list-repo-collaborators"
title: "List repository collaborators"
description: "Lists users with direct access permissions to a specific GitHub repository"
fetched_at: "2026-09-01T13:30:00.829Z"
---
On this page

*GitHub list repository collaborators tool* lists collaborators for a specific GitHub repository. This is a read-only tool that returns users with direct access permissions, which is useful for auditing repository access or using the collaborator list in multi-step workflows.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must install and configure the GitHub connector, add GitHub tools under **Admin Console** → **Platform** → Tools, and enable this tool.
    
-   A GitHub app must be installed on the relevant organization(s) and linked to the correct GitHub connector in the Glean admin console.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Owner | String | The username of the account that owns the repository (case-insensitive). |
| Repository | String | The name of the repository without the .git extension (case-insensitive). |
| Affiliation | String | Filter by affiliation: `outside` (non-org members), `direct` (direct permissions), or `all` (all visible collaborators). |
| Page | Integer | The page number of results to retrieve for pagination. |
| Results per page | Integer | Number of results per page (maximum 100). |
| Permission level | String | Filter collaborators by their repository permission level. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "List all collaborators for the 'facebook/react' repository and show their permission levels."
    
-   "Who has write access to the 'microsoft/vscode' repository?"
    
-   "Show me all outside collaborators for the 'tensorflow/tensorflow' repository."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Authentication or authorization failure

-   **Possible cause:** The GitHub connector is not fully set up, the GitHub app is not installed on the target organization, or the app is missing required permissions.
-   **Fix:** Confirm that the GitHub connector is installed and authenticated, that the GitHub app is installed on the correct organization(s), and that it has the necessary repository scopes. If using a custom app, verify that permissions to read repository collaborators are enabled.

### Repository not found or 404 error

-   **Possible cause:** The owner or repository name is incorrect, the repository does not exist, or the authenticated user does not have access to it.
-   **Fix:** Verify that the repository exists at [https://github.com/owner/repo](https://github.com/owner/repo) and that the authenticated user has at least read access to it. Check for typos in the owner or repository name.

### Empty or incomplete collaborator list

-   **Possible cause:** The repository may have no collaborators, the affiliation filter is too restrictive, or the authenticated user can only see a subset of collaborators.
-   **Fix:** Try using `affiliation: all` to see all visible collaborators. Verify that the authenticated user has sufficient permissions to view the collaborator list. Note that only repository admins can see all collaborators.

### 403 response with OAuth App access restrictions message

-   **Possible cause:** The GitHub organization has restricted third-party OAuth apps, so the app used by this tool is not allowed to access repository collaborators.
-   **Fix:** Ask your GitHub organization admin to enable the app or adjust OAuth App access restrictions for the relevant repositories.

## FAQs[​](#faqs "Direct link to FAQs")

### Who does this tool return as collaborators?

It returns users with direct access permissions to the specified GitHub repository. You can filter the list using the *Affiliation* parameter (`outside`, `direct`, or `all`) and further filter by *Permission level* when needed.

### What permission levels can collaborators have?

Collaborators can have the following permission levels: `read` (pull), `triage` (triage issues/PRs), `write` (push), `maintain` (manage without destructive actions), or `admin` (full access). The specific levels available depend on your repository settings.

### Can I list collaborators for private repositories?

Yes, as long as the authenticated user has access to the private repository. The tool respects GitHub's access control and only returns collaborators for repositories the user can access.

### What is the difference between affiliation types?

-   `outside`: Collaborators who are not members of the organization (for organization-owned repos)
-   `direct`: Collaborators with direct permissions to the repository
-   `all`: All collaborators visible to the authenticated user (default)
