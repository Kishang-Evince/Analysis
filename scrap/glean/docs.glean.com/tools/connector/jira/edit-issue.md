---
url: "https://docs.glean.com/tools/connector/jira/edit-issue"
canonical: "https://docs.glean.com/tools/connector/jira/edit-issue"
title: "Edit issue"
description: "Updates an existing Jira issue with field values and operations"
fetched_at: "2026-09-01T13:30:03.339Z"
---
On this page

The *Jira Edit issue* tool updates an existing Jira issue so agents can modify multiple fields in a single step instead of making several separate calls or manual edits. Use this write tool when you need to update status, description, assignee, priority, or other fields on a specific ticket identified by its ID or key.

The tool runs using the connected user's Jira account and permissions, so it can only edit issues and fields that the user is allowed to modify directly in Jira.

## Limitations[​](#limitations "Direct link to Limitations")

-   Jira tools are designed for Jira Cloud and do not support Jira Server or Jira Data Center deployments.
    
-   If administrators update the Jira tools configuration such as allowed tools or OAuth settings, existing connected accounts can be invalidated, and users might be asked to reauthenticate before the tool works again.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   An admin must complete the initial Jira setup and enable tools in the Admin Console so that the Jira tools are available in Agent Builder.
    
-   Each user is prompted to connect their Jira account in Glean before running agents that use Jira Edit issue.
    
-   If your Jira organization uses centralized OAuth approval, a Jira administrator must authorize the Jira OAuth app for the site before users can run tools.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

The underlying tool defines the following parameters for **Jira Edit issue**.

| Name | Type | Description |
| --- | --- | --- |
| Issue ID or key | String | Identifier of the Jira issue to edit, such as an issue key like `ENG-1234`. |
| Assignee | String | New assignee for the issue. The exact format (for example, account ID vs. display name) is defined by the toolkit schema and Jira configuration. |
| Description | String | New description for the issue. For some projects, this may be a rich text field that expects structured content. |
| Due date | String | Optional due date for the issue, if your Jira project uses due dates. |
| Fields | String | Generic field map for advanced updates. Use this to set or update fields by their Jira field keys (including custom fields) when direct parameters are not enough. |
| Labels | Array | Labels to set on the issue. Behavior (replace vs. merge) depends on the toolkit's mapping to Jira. |
| Notify users | Boolean | Flag that controls whether Jira notifies watchers and stakeholders about the edit. |
| Override editable flag | Boolean | Advanced flag that can bypass some "editable" constraints in Jira when allowed. Use only in trusted admin workflows. |
| Override screen security | Boolean | Advanced flag that can bypass some screen or field-visibility rules when permitted. Use with caution. |
| Priority ID or name | String | New priority for the issue, provided by either priority ID or human-readable name, depending on configuration. |
| Return issue | Boolean | Controls whether the updated issue payload is returned in the response. |
| Sprint ID or name | String | Sprint to associate the issue with, where applicable. |
| Summary | String | New summary for the issue. Many Jira projects require a non-empty summary. |
| Update | String | Low-level field operations object for advanced scenarios where you need fine-grained control beyond simple field replacement. |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to update a feature request ticket with new information from customer feedback, including changing the priority and updating the description.

*Instruction to an agent:*

"Update Jira issue **ENG-1234** with the following changes: change the summary to **Improve batch API performance for large datasets**, update the description to include the latest customer feedback about timeout issues with requests over 10,000 records, set the priority to **High**, and assign it to **ABC** from the API team."

*Resulting behavior:*

-   Identifies the Jira issue ENG-1234.
    
-   Calls the Edit issue tool with:
    
    -   `Issue ID or key` set to ENG-1234.
        
    -   `Summary` set to "Improve batch API performance for large datasets".
        
    -   `Description` updated with the new customer feedback about timeout issues.
        
    -   `Priority ID or name` set to High.
        
    -   `Assignee` set to ABC's account ID.
        
-   Updates all specified fields in a single API call to Jira.
    
-   Other fields like labels, sprint, and watchers remain unchanged.
    

*Workflow tip:* Use **Edit issue** when you need to update multiple fields at once. For single-field updates like only changing the assignee, consider using **Assign issue** instead. You can also combine Edit issue with **Get issue** to first retrieve current values, then update specific fields based on conditions.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Jira Edit issue times out or the agent reports a generic timeout

-   **Possible cause:** The underlying Jira API may be returning a 400 Bad request error, for example, due to empty required fields or invalid field structures, which can surface as timeouts or generic failures in some environments.
-   **Fix:** Start with simple edits like summary and description only to confirm the tool works. Then add additional fields gradually. Avoid sending empty strings for required fields like summary, and remove fields from the payload rather than sending empty values.

### Invalid request payload. Refer to the REST API documentation and try again

-   **Possible cause:** Jira rejected the payload, often because one or more fields are not formatted the way that Jira expects especially complex custom fields or status-like fields sent via the generic fields map.
-   **Fix:** Narrow the payload to a small set of simple fields like summary, description, priority and confirm they work. For custom fields, compare against how Jira stores that field, for example, export a sample issue via Jira's UI or API) and align the structure of the fields payload accordingly.

### Frequent reauthentication prompts for Jira Edit issue

-   **Possible cause:** Updates to the Jira tools configuration such as changes to allowed tools or OAuth credentials invalidate existing connected accounts, which can require users to reauthenticate even if they did not change the Jira Edit issue step itself.
-   **Fix:** Reauthenticate the Jira tools when prompted. If prompts continue to appear after every agent change, ask your Glean admin to confirm whether there are ongoing changes to the Jira tools configuration.

### Your site admin must authorize this app for the site before the app can access your account

-   **Possible cause:** The Jira OAuth application has not been authorized at the site level in your Jira organization.
-   **Fix:** Ask your Jira administrator to complete the required OAuth app authorization for your Jira site, then retry the tool.

### Tools backend returned 404 or 500 for this tool, or No connected account found

-   **Possible cause:** The tools backend or Glean tool runtime cannot reach the Jira tool server, or there is no valid connected Jira account for the current user.
-   **Fix:** Confirm that Jira tools are enabled and healthy in the Admin Console and that you have an active Jira OAuth connection.

## FAQs[​](#faqs "Direct link to FAQs")

### When should I use Jira Edit issue vs. Jira Assign issue vs. Jira Get issue?

-   Use Jira Get issue when you only need to retrieve an issue's current state.
-   Use Jira Assign issue when you only need to change who owns an issue.
-   Use Jira Edit issue when you want to update several fields together in a single call (for example, summary, description, assignee, and priority).

### Can Jira Edit issue update custom fields?

Yes, as long as the payload matches the structure that Jira expects for that field.
