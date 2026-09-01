---
url: "https://docs.glean.com/tools/connector/jira/get-issue"
canonical: "https://docs.glean.com/tools/connector/jira/get-issue"
title: "Get issue"
description: "Retrieves a single Jira issue by its ID or key"
fetched_at: "2026-09-01T13:30:03.756Z"
---
On this page

The *Jira Get issue* tool retrieves a single Jira issue by its ID or key so that agents can inspect its fields, summarize it, or combine it with context from other systems. Use this read-only tool for workflows like stale issue review, follow-up analysis, and cross-system enrichment where you need the latest canonical view of one Jira ticket.

The tool runs using the connected user's Jira account and permissions, so it can only return issues and fields that the user is allowed to see in Jira.

## Limitations[​](#limitations "Direct link to Limitations")

-   Jira tools are designed for Jira Cloud and do not support Jira Server or Data Center deployments.
    
-   If your Jira administrator has not granted site-wide access to the Jira OAuth app, users may see an error that the site admin must authorize the app before it can access their account.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must complete the initial Jira setup and enable tools in the Admin Console so that the Jira tools are available in Agent Builder.
    
-   Each user must connect their Jira account via OAuth in Glean before running tools, including Jira *Get issue*.
    
-   If your Jira organization uses Central OAuth, a Jira administrator must authorize the app for the site before users can run tools.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

The underlying tool defines the following parameters for Jira *Get issue*.

| Name | Type | Description |
| --- | --- | --- |
| Issue ID or key | String | Identifier of the Jira issue to retrieve, such as an issue key like EE-1234 or the internal issue ID. |
| Expand | String | Optional comma-separated list of expansion options passed through to Jira's issue API for advanced use cases. |
| Fields | String or list | Optional set of Jira field identifiers to request from the REST API when you want to narrow or customize the returned fields. |
| Fields by keys | Boolean | Optional flag that controls how Jira interprets the fields parameter; see Jira REST API documentation for supported behavior. |
| Properties | String or list | Optional list of Jira issue property keys to include in the response, passed through to the underlying Jira API. |
| Update history | Boolean | Optional flag corresponding to Jira's updateHistory behavior; confirm the desired value based on your Jira REST API configuration. |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to review a high-priority bug that has been open for several weeks to determine if it needs attention or re-prioritization.

*Instruction to an agent:*

"Look up Jira issue **ENG-567** and tell me: what is the current status, who is assigned to it, when was it last updated, and what is the priority level? Also, summarize the issue description."

*Resulting behavior:*

-   Calls the Get issue tool with:
    
    -   `Issue ID or key` set to ENG-567.
-   Retrieves the complete issue details including all standard fields.
    
-   Returns structured information about:
    
    -   **Status**: In Progress
        
    -   **Assignee**: ABC
        
    -   **Last updated**: November 15, 2024
        
    -   **Priority**: High
        
    -   **Description summary**: API timeout occurring when users make batch requests.
        
-   The agent can then combine this with other connectors or use it to decide on follow-up tools like adding comments or updating fields.
    

*Workflow tip:* Use Get issue as the first step in multi-step workflows. For example, retrieve an issue, analyze its status and comments, then use other Jira tools like Edit issue or Add comment to update it based on your analysis.

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

### How is Jira Get issue different from Search Jira with JQL?

Jira Get issue targets a single issue by ID or key, while Search Jira with JQL runs a JQL query and can return many matching issues up to the configured limits of the search tool.
