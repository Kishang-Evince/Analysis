---
url: "https://docs.glean.com/tools/connector/jira/assign-issue"
canonical: "https://docs.glean.com/tools/connector/jira/assign-issue"
title: "Assign issue to user"
description: "Assigns a single Jira issue to a specific user"
fetched_at: "2026-09-01T13:30:03.023Z"
---
On this page

The *Jira assign issue* tool updates the assignee on an existing Jira issue so that agents and workflows can route work to the right owner without manual triage. It operates on a single issue, identified by its issue ID or key, and supports identifying the target user by account ID or assignee name.

This write tool runs using the connected user's Jira account and permissions, so it can only assign issues that the user is allowed to view and edit in Jira.

## Limitations[​](#limitations "Direct link to Limitations")

-   Jira tools in Glean are designed for Jira Cloud and do not support Jira Server or Jira Data Center deployments.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must complete the initial Jira setup and enable tools in the Admin Console so that the Jira tools are available in Agent Builder.
    
-   Each user is prompted to connect their Jira account via OAuth in Glean before running tools, including Jira Assign issue.
    
-   If your Jira organization uses Central OAuth, a Jira administrator must authorize the app for the site before users can run Jira tools in Glean.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

The underlying toolkit defines the following parameters for Jira Assign issue.

| Name | Type | Description |
| --- | --- | --- |
| Issue ID or key | String | Identifier of the Jira issue to assign, such as an issue key like ENG-1234. |
| Account ID | String | Jira account ID of the user who should become the assignee. |
| Assignee name | String | Human-readable name of the user who should become the assignee. |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to assign a high-priority bug that has been sitting unassigned for too long to the appropriate team owner.

*Instruction to an agent:*

"Find the Jira issue *ENG-1234* about the API timeout bug and assign it to *ABC* from the connectors team. ABC is the triage owner for connector issues."

*Resulting behavior:*

-   Looks up the Jira issue ENG-1234 to verify it exists and retrieve current details.
    
-   Calls the Assign issue tool with:
    
    -   `Issue ID or key` set to ENG-1234.
        
    -   `Assignee name` set to ABC (or uses `Account ID` if the account ID is known).
        
-   Updates the issue in Jira so ABC becomes the assignee.
    
-   The agent can optionally add a comment or notify ABC about the assignment.
    

*Workflow tip:* You can combine this tool with Jira search or filter tools to identify unassigned issues, then automatically assign them to the appropriate owners based on labels, components, or priority.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Your site admin must authorize this application for the site before the application can access your account

-   **Possible cause:** Central OAuth application of Jira is not granted a site-wide access by a Jira administrator.
-   **Fix:** Ask your Jira administrator to complete the required app authorization flow in Jira, then retry the tool.

### Tools return status code 404 or 500 for this tool

-   **Possible cause:** The tools server backing this tool is unreachable (404) or is returning an internal error (500).
-   **Fix:** Confirm that the server information of the tool is correct and reachable from Glean. For 500 errors, the tool creator needs to fix the server or investigate the underlying exception.

### Invalid redirect URI during Jira authentication

-   **Possible cause:** The verify\_code URI for tools OAuth is not added to the allowed redirect URIs for the Jira OAuth app.
-   **Fix:** An admin should add [https://tenant\_id-be.glean.com/tools/oauth/verify\_code/toolUniqueIdentifier](https://tenant_id-be.glean.com/tools/oauth/verify_code/toolUniqueIdentifier) to the allowed redirect URIs of OAuth application and retry authentication. The tool unique identifier is case-sensitive. Copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, and replace [https://tenant\_id-be.glean.com](https://tenant_id-be.glean.com) with it.

## FAQs[​](#faqs "Direct link to FAQs")

### How is Jira Assign issue different from Jira Edit issue?

Jira Assign issue focuses on changing who owns an issue, using a small set of parameters related to the assignee. Jira Edit issue is a broader update tool that can modify multiple fields on an issue (such as summary, description, assignee, and priority) in a single call. Use Jira Assign issue when you only need to change the owner, and Jira Edit issue when you need to update several fields together.
