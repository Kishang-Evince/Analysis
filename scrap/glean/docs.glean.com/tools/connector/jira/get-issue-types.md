---
url: "https://docs.glean.com/tools/connector/jira/get-issue-types"
canonical: "https://docs.glean.com/tools/connector/jira/get-issue-types"
title: "Get issue types"
description: "Retrieves the list of issue types available in your Jira site"
fetched_at: "2026-09-01T13:30:03.948Z"
---
On this page

*Jira get issue types* tool to retrieve all issue types available to the authenticated Jira user. This is a read-only tool that returns structured metadata for each issue type, which agents can use to choose valid types when creating or updating issues.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must complete the initial Jira setup and enable tools in the Admin Console so that the Jira tools are available in Agent Builder.
-   Each user is prompted to connect their Jira account via OAuth in Glean before running tools, including Jira Assign issue.
-   If your Jira organization uses Central OAuth, a Jira administrator must authorize the app for the site before users can run Jira tools in Glean.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

This tool does not accept any input parameters. It always returns the list of Jira issue types visible to the authenticated Jira user.

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "What issue types are available in our Jira?"
    
-   "Show me all Jira issue types so I can create the right type of ticket."
    
-   "List the issue types I can use when creating a new Jira issue."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Authentication or authorization error

-   **Possible cause:** Jira is not connected as a connector, the Jira tools are not enabled, or the Jira account is not connected via OAuth.
-   **Fix:** Confirm that Jira is connected as a connector, the Jira tools are enabled, and your Jira account is connected via OAuth in Glean. If your organization uses Central OAuth, a Jira administrator may need to approve the app in Jira.

### Some expected issue types are missing

-   **Possible cause:** The connected Jira account does not have permission to see all issue types, or issue type schemes restrict visibility.
-   **Fix:** The tool only returns issue types that the user is allowed to see in Jira. Ask a Jira administrator to verify your permissions for the relevant projects and issue type schemes if types appear to be missing.

### OAuth redirect or app configuration error

-   **Possible cause:** The OAuth application configuration is incorrect or the callback URL is not properly configured.
-   **Fix:** A Jira or Glean admin may need to update the OAuth application configuration. For example, they might need to add the correct Glean tools callback URL to the app's allowed redirect URIs, then retry authentication.

### No issue types returned

-   **Possible cause:** The connected account does not have access to any projects or issue type schemes in Jira.
-   **Fix:** Verify the connected account has permission to view at least one project in Jira. Contact your Jira administrator to ensure proper access permissions.

## FAQs[​](#faqs "Direct link to FAQs")

### How is Get issue types different from Get issue?

**Get issue** returns fields for a single Jira ticket, such as summary, status, assignee, and description. *Get issue types* returns the catalog of issue types available in your Jira site, which you can then use when creating or editing issues.

### What should I do with the output of Get issue types?

Use the returned issue type names and IDs as inputs to other Jira tools, such as *Edit issue*, so agents always pass valid issue\_type or issue\_type\_id values instead of hardcoding them.

### Can I filter or search for specific issue types?

No. This tool returns all issue types available to the authenticated user. If you need to filter issue types, retrieve the full list and then filter the results in your agent workflow based on name or ID.
