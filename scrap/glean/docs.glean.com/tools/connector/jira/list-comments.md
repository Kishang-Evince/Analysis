---
url: "https://docs.glean.com/tools/connector/jira/list-comments"
canonical: "https://docs.glean.com/tools/connector/jira/list-comments"
title: "List issue comments"
description: "Gets all comments from a specific Jira issue with pagination and sorting options"
fetched_at: "2026-09-01T13:30:03.937Z"
---
On this page

The *Jira List issue comments* tool retrieves the full list of comments for a single Jira issue using its issue ID or key. Use this read-only tool to analyze discussion threads, identify blockers, or combine comment history with issue details for workflows such as stale feature request review or triage.

The tool supports pagination through `results limit` and `start at` parameters, allowing agents to iterate through long comment threads. It runs using the connected user's Jira account and permissions, so it can only return comments on issues the user is allowed to view.

## Limitations[​](#limitations "Direct link to Limitations")

-   Jira tools in Glean are designed for Jira Cloud and do not support Jira Server or Jira Data Center deployments.
    
-   Pagination and sorting behavior, including default ordering and maximum page size, are not specified in the available toolkit sources; confirm details against your Jira REST configuration if needed.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must complete the initial Jira setup and enable tools so that Jira appears as a tool in Agent Builder.
    
-   Each user is prompted to connect their Jira account via OAuth in Glean before running tools, including Jira List issue comments.
    
-   If your Jira organization uses Central OAuth, a Jira administrator must authorize the app for the site before users can run tools.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Name | Type | Description |
| --- | --- | --- |
| Issue ID or key | String | Identifier of the Jira issue whose comments to retrieve. |
| Expand | String | Optional. Expansion options for including additional comment details (not specified in available sources). |
| Results limit | Integer | Maximum number of comments to return per call. Defaults to 50. |
| Sort by | String | Field used to sort comments; see Jira REST API documentation for supported values. |
| Start at | Integer | Index of the first comment to return for pagination. |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to review a feature request ticket to understand if there are any open questions or blockers mentioned in the discussion before deciding whether to prioritize it.

*Instruction to an agent:*

"Look up Jira issue **FEAT-789** and analyze all the comments. Tell me if there are any unanswered questions, blockers, or concerns raised by the team. Also, summarize the most recent discussion points."

*Resulting behavior:*

-   Calls Get issue to retrieve the core issue details (status, assignee, priority, description).
    
-   Calls List issue comments with:
    
    -   `Issue ID or key` set to FEAT-789.
        
    -   `Results limit` set to 50 (default) to retrieve up to 50 comments.
        
-   Retrieves the full comment thread with:
    
    -   Comment author
        
    -   Comment body text
        
    -   Comment creation date
        
    -   Comment ID and other metadata
        
-   Analyzes the comments to identify:
    
    -   Unanswered questions from the team
        
    -   Blockers or concerns raised
        
    -   Recent discussion themes
        
-   Presents a summary of findings to help with prioritization decisions.
    

*Workflow tip:* Combine this tool with **Get issue** to get both issue details and comments in a single workflow. For issues with many comments, use the `start at` parameter to paginate through results. You can also use the returned comment data with **Edit issue** to update the issue based on discussion insights.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Your site admin must authorize this application for the site before the application can access your account

-   **Possible cause:** The central OAuth application of Jira is not granted a site-wide access by a Jira administrator.
-   **Fix:** Ask your Jira administrator to complete the required app authorization flow in Jira, then retry the tool.

### Tools return status code 404 or 500 for this tool

-   **Possible cause:** The tools server backing this tool is unreachable (404) or returning an internal error (500).
-   **Fix:** Confirm that the server information of the tool is correct and reachable from Glean. For 500 errors, the tool creator needs to fix the server or investigate the underlying exception.

### Invalid redirect URI during Jira authentication

-   **Possible cause:** The verify\_code URI for tools OAuth has not been added to the allowed redirect URIs for the Jira OAuth app.
-   **Fix:** An admin must add [https://tenant\_id-be.glean.com/tools/oauth/verify\_code/toolUniqueIdentifier](https://tenant_id-be.glean.com/tools/oauth/verify_code/toolUniqueIdentifier) to the allowed redirect URIs of OAuth application and retry authentication. The tool unique identifier is case-sensitive. Copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, and replace [https://tenant\_id-be.glean.com](https://tenant_id-be.glean.com) with it.

## FAQs[​](#faqs "Direct link to FAQs")

### Can this tool return comments for multiple issues in a single call?

No. Jira List issue comments targets a single Jira issue identified by its ID or key. To analyze comments across multiple issues, an agent should call this tool once per issue, usually after selecting or searching for issues in a prior step.

### How is Jira List issue comments different from Jira Get issue?

Jira Get issue returns the core fields for an issue such as summary, status, assignee, labels, and description, while Jira List issue comments returns the full comment thread for that issue so that agents can analyze or summarize the discussion in more detail.
