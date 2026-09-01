---
url: "https://docs.glean.com/tools/connector/github/list-repo-contributors"
canonical: "https://docs.glean.com/tools/connector/github/list-repo-contributors"
title: "List repository contributors"
description: "Lists repository contributors"
fetched_at: "2026-09-01T13:30:00.840Z"
---
On this page

The *GitHub List repository contributors* tool retrieves users who have contributed code to a specific repository. Use this read-only tool to identify active contributors, understand team composition, or audit repository activity.

The tool supports pagination to handle repositories with many contributors.

## Limitations[​](#limitations "Direct link to Limitations")

-   Like other GitHub tools, calls are subject to GitHub API rate limits. Heavy automation or tight loops can cause intermittent failures until rate limits reset.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must install and configure the GitHub connector, add GitHub tools under **Admin Console** → **Platform** → Tools, and enable this tool.
    
-   A GitHub app must be installed on the relevant organization(s) and linked to the correct GitHub connector in the Glean admin console.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameters | Type | Description |
| --- | --- | --- |
| Include anonymous | String | Anonymous access level filter or flag. |
| Owner | String | Required. Owner of the repository. |
| Page | Integer | Page number for paginated results. Defaults to 1. |
| Results per page | Integer | Number of results per page. Defaults to 30. |
| Repository | String | Required. Name of the repository. |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to identify the top contributors to your open source project to recognize their work in the monthly newsletter.

*Instruction to an agent:*

"Show me all contributors to the **openai/gpt-4** repository, including anonymous contributors. Get the first 50 contributors."

*Resulting behavior:*

-   Calls List repository contributors with:
    
    -   `Owner` set to "openai".
        
    -   `Repository` set to "gpt-4".
        
    -   `Include anonymous` set to true to include anonymous contributors.
        
    -   `Results per page` set to 50 to retrieve a larger batch.
        
    -   `Page` set to 1 (default) for the first page.
        
-   Retrieves contributor data including:
    
    -   Contributor username or identifier
        
    -   Contribution count
        
    -   Profile information
        
    -   Whether the contributor is anonymous
        
-   Presents the list of contributors sorted by contribution count.
    
-   User can review the list and identify top contributors for recognition.
    

*Workflow tip:* Use `Results per page` to control batch size (default is 30). For repositories with many contributors, use the `Page` parameter to iterate through multiple pages. The tool returns contributors based on the GitHub API's definition, which typically includes users with committed code that was merged into the repository.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Authentication or authorization failure

-   **Possible cause:** The GitHub app is not installed on the target organization, or the app is missing required permissions.
-   **Fix:** Confirm that the GitHub app is installed on the correct organization(s), and that it has the necessary repository and organization scopes. If using a custom app, verify that permissions such as contents, issues, pull requests, and commit-related scopes are enabled.

## FAQs[​](#faqs "Direct link to FAQs")

### Can I include anonymous contributors in the results?

Yes. Use the `Include anonymous` parameter to control whether anonymous contributors are included in the results.
