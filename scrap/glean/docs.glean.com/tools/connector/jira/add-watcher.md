---
url: "https://docs.glean.com/tools/connector/jira/add-watcher"
canonical: "https://docs.glean.com/tools/connector/jira/add-watcher"
title: "Add Watcher to issue"
description: "Add a user as a watcher on a Jira issue so they receive updates and notifications directly in Jira"
fetched_at: "2026-09-01T13:30:03.003Z"
---
On this page

The *Jira Add watcher to issue* tool adds a specified user as a watcher on an existing Jira issue so they receive notifications about future changes and activity on that ticket according to your Jira notification scheme. Use this write tool when you want agents and workflows to keep the right people in the loop automatically, for example when routing release tickets to stakeholders or ensuring feature request owners stay informed as feedback evolves.

The tool runs using the connected user's Jira account and permissions, so it can only add watchers in ways that the user is allowed to perform directly in Jira.

## Limitations[​](#limitations "Direct link to Limitations")

-   This tool is designed for Jira Cloud and does not support Jira Server or Jira Data Center deployments.
    
-   If the Jira administrator is not granted a site-wide access to the Jira OAuth app, users may see an error that the site admin must authorize the app before it can access their account.
    
-   Limited to one Jira Cloud instance per customer per Jira tools configuration. To work with multiple instances, create a separate Jira tools for each instance.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   An admin must complete the initial Jira setup and enable tools in the Admin Console so that the Jira tools are available in Agent Builder.
    
-   Each user is prompted to connect their Jira account via OAuth in Glean before running tools, including Jira *Add watcher to issue*.
    
-   If your Jira organization uses Central OAuth, a Jira administrator must authorize the app for the site before users can run Jira tools in Glean.
    
-   Optional: For multiple Jira instances, set up a separate Jira tools per instance and give each pack a clear name, for example, Jira Tools – Acme or Jira Tools – Sales so builders can select the right instance.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

The underlying tool defines the following parameters for Jira *Add watcher to issue*.

| Name | Type | Description |
| --- | --- | --- |
| Issue ID or key | String | Identifier of the Jira issue to watch, such as an issue key like ENG-1234. |
| Account ID | String | Jira account ID of the user who should be added as a watcher on the issue. |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to ensure that key stakeholders are notified about an important release ticket so they stay informed as it progresses.

*Instruction to an agent:*

"Add **Sarah Chen** and **Mike Johnson** from the product team as watchers on Jira issue **REL-456** so they receive updates as the release progresses. Also add me as a watcher."

*Resulting behavior:*

-   Identifies the Jira issue REL-456.
    
-   Resolves the user names to their Jira account IDs.
    
-   Calls the Add watcher to issue tool multiple times with:
    
    -   `Issue ID or key` set to REL-456.
        
    -   `Account ID` set to Sarah Chen's Jira account ID (first call).
        
    -   `Account ID` set to Mike Johnson's Jira account ID (second call).
        
    -   `Account ID` set to the current user's Jira account ID (third call).
        
-   Adds all three users as watchers on the issue.
    
-   Each watcher will now receive Jira notifications for any updates or changes to REL-456 according to the Jira notification scheme.
    

*Workflow tip:* Combine this tool with **Assign issue** to both assign an issue to an owner and add relevant stakeholders as watchers in a single workflow. You can also use it with **Add comment** to notify watchers why they were added.

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

### How is Jira Add watcher to issue different from Get issue watchers or Remove watcher from issue?

Jira Add watcher to issue adds a user as a watcher on an issue, Jira Get issue watchers retrieves the current watchers list, and Jira Remove watcher from issue removes an existing watcher.
