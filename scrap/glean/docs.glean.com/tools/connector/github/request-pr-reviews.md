---
url: "https://docs.glean.com/tools/connector/github/request-pr-reviews"
canonical: "https://docs.glean.com/tools/connector/github/request-pr-reviews"
title: "Request pull request reviews"
description: "Requests specific users or teams to review an existing pull request"
fetched_at: "2026-09-01T13:30:01.259Z"
---
On this page

The GitHub *Request pull request reviews* tool helps you route code changes to the right people by requesting reviewers on an existing pull request. Use this tool when you want an agent or workflow to ask specific users or teams to review a pull request, such as requesting documentation review on docs related pull requests.

This tool updates an existing pull request by requesting one or more users or teams as reviewers. It operates only on existing pull requests and it does not create new ones. It sends the request through GitHub using your authenticated configuration.

## Limitations[​](#limitations "Direct link to Limitations")

-   Available only for GitHub Cloud repositories connected through the GitHub connector and GitHub Server and GitHub Enterprise Server are not supported.
    
-   Subject to GitHub API rate limits, for example, the default rate limit of 4 queries per second and any additional limits configured by your admin.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   GitHub is connected as a connector in Glean and the Glean app for GitHub is installed in your GitHub organization.
    
-   GitHub tools are enabled in the Glean admin console for your organization.
    
-   You are authenticated to use GitHub tools so the tool can run using your GitHub identity.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Description |
| --- | --- |
| owner | Owner of the repository that contains the pull request. |
| repo | Name of the repository that contains the pull request. |
| pull\_number | Number of the pull request to request reviews on. |
| reviewers | Users to request as reviewers for the pull request. |
| team\_reviewers | Teams to request as reviewers for the pull request. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

### Minimal[​](#minimal "Direct link to Minimal")

Request a single engineer to review a pull request when you already know the owner, repository, and pull request number.

### Typical[​](#typical "Direct link to Typical")

Use in a documentation workflow agent to request review from the documentation team on any pull request that updates docs content.

### Advanced[​](#advanced "Direct link to Advanced")

Combine with other GitHub tools such as Get a pull request and Create a review comment for a pull request to build an agent that analyzes pull request changes, leaves comments, and then requests the right reviewers.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

-   **Error:** Tool fails for a specific pull request.
    
    -   **Possible cause:** The `owner`, `repo`, or `pull_number` values do not match an existing pull request that is available through your GitHub connector
    -   **Fix:** Confirm that the repository is connected in Glean, the pull request exists in GitHub, and the identifiers you passed match the pull request.
-   **Error:** Tool succeeds intermittently or stops working after many rapid calls.
    
    -   **Possible cause:** Hitting GitHub API rate limits.
    -   **Fix:** Reduce how frequently the tool is called, or stagger calls across time. If this keeps happening, contact your Glean admin to review configuration and usage.
-   **Error:** Tool appears unavailable or you see an authentication or permission error.
    
    -   **Possible cause:** GitHub tools are not enabled for your organization, you have not authenticated for GitHub tools, or your GitHub identity does not have permission to request reviewers for the target repository.
    -   **Fix:** Ask your Glean admin to confirm that GitHub tools are added and that you are allowed to use it, then re-authenticate for GitHub and try again.

## FAQs[​](#faqs "Direct link to FAQs")

-   **Does this tool create a new pull request?**
    
    → No. This tool only requests reviewers for an existing pull request. Use other GitHub tools if you need to create a pull request.
    
-   **What systems does this tool work with?**
    
    → This tool works with GitHub Cloud repositories that are connected through the GitHub connector in Glean.
    
-   **Who runs this tool in GitHub?**
    
    → The tool runs using the identity that authenticated for GitHub tools. Make sure that identity has permission to request reviewers on the target repository and pull request.
