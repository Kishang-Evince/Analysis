---
url: "https://docs.glean.com/tools/connector/jira/find-users"
canonical: "https://docs.glean.com/tools/connector/jira/find-users"
title: "Find users"
description: "Searches for Jira Cloud users by account details and status"
fetched_at: "2026-09-01T13:30:03.526Z"
---
On this page

*Jira find users* tool searches for Jira Cloud users that match a query and optional filters. This is a read-only tool that returns matching users with their account identifiers and profile fields.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must complete the initial Jira setup and enable tools in the Admin Console so that the Jira tools are available in Agent Builder.
-   Each user is prompted to connect their Jira account via OAuth in Glean before running tools, including Jira Assign issue.
-   If your Jira organization uses Central OAuth, a Jira administrator must authorize the app for the site before users can run Jira tools in Glean.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Search query | String | Free-text query to search for users by name, email address, or other supported fields. |
| Account ID | String | Jira account ID to match when searching for users. |
| Active | Boolean | Whether to include active Jira users in the results. |
| Results limit | Integer | Maximum number of users to return in a single call. |
| Start at | Integer | Index of the first user to return for pagination. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Find active Jira users with the name Abc Xyz so I can assign her to the new bug report."
    
-   "Search for users with email [abc.xyz@company.com](mailto:abc.xyz@company.com) in Jira."
    
-   "Look up the account ID for user Abc Pqr in our Jira."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Site admin must authorize this app for the site

-   **Possible cause:** Jira's Central OAuth application has not been granted site-wide access by a Jira administrator.
-   **Fix:** Ask a Jira admin to complete the required app authorization flow in Jira, then retry the tool.

### No users returned or fewer users than expected

-   **Possible cause:** The query does not match any users, or the connected account does not have permission to view user information.
-   **Fix:** Try a broader query or check that the connected account has permission to search for users in Jira. Verify the user exists and is active if searching by specific criteria.

### Tools backend returned status code 404 or 500

-   **Possible cause:** The tools server backing this tool is unreachable (404) or returning an internal error (500).
-   **Fix:** Confirm that the tool's server information is correct and reachable from Glean. For 500 errors, contact Glean support to investigate the underlying exception.

### Invalid redirect URI during Jira authentication

-   **Possible cause:** The verify\_code URI for tools OAuth has not been added to the allowed redirect URIs for the Jira OAuth app.
-   **Fix:** An admin should add [https://tenant\_id-be.glean.com/tools/oauth/verify\_code/toolUniqueIdentifier](https://tenant_id-be.glean.com/tools/oauth/verify_code/toolUniqueIdentifier) to the OAuth app's allowed redirect URIs and retry authentication. Copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, and replace [https://tenant\_id-be.glean.com](https://tenant_id-be.glean.com) with it.

## FAQs[​](#faqs "Direct link to FAQs")

### Whose permissions does the tool use when searching for users?

The tool runs using the connected Jira account for the current user, so it can only return information that this Jira account is allowed to access.

### When should I use Find users versus Get current user?

Use *Find users* when you need to search for other Jira users (e.g., to look up potential assignees or reporters). Use *Get current user* when you only need details about the Jira account that is currently authenticated for the connector.

### What information is returned for each user?

The tool returns user account IDs, display names, email addresses (if available), and other profile fields exposed by the Jira API. The specific fields depend on your Jira configuration and the connected account's permissions.
