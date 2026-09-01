---
url: "https://docs.glean.com/tools/connector/jira/get-all-users"
canonical: "https://docs.glean.com/tools/connector/jira/get-all-users"
title: "Get all users"
description: "Retrieves a paginated list of all users from your Jira Cloud instance"
fetched_at: "2026-09-01T13:30:03.541Z"
---
On this page

*Jira get all users* tool retrieves a paginated list of users from your Jira Cloud site. This is a read-only tool that returns user account information for workflows that need to enumerate Jira accounts, generate user reports, or cross-check users against other systems.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must complete the initial Jira setup and enable tools in the Admin Console so that the Jira tools are available in Agent Builder.
-   Each user is prompted to connect their Jira account via OAuth in Glean before running tools, including Jira Assign issue.
-   If your Jira organization uses Central OAuth, a Jira administrator must authorize the app for the site before users can run Jira tools in Glean.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Max results | Integer | Maximum number of users to return in a single call. |
| Start at | Integer | Starting position in the overall user list for pagination. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Get all Jira users from our instance so I can generate a report for the quarterly audit."
    
-   "List all user accounts in our Jira Cloud."
    
-   "Show me all active and inactive users in Jira."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Site admin must authorize this app for the site

-   **Possible cause:** Jira's Central OAuth application is not granted site-wide access by a Jira administrator.
-   **Fix:** Ask a Jira admin to complete the required app authorization flow in Jira, then retry the tool.

### No users returned or fewer users than expected

-   **Possible cause:** The connected account does not have permission to view user information, or pagination parameters are incorrect.
-   **Fix:** Verify the connected account has permission to view users in Jira. Check that **Start at** is not beyond the total number of users.

### Tools backend returned status code 404 or 500

-   **Possible cause:** The tools server backing this tool is unreachable (404) or returning an internal error (500).
-   **Fix:** Confirm that the server information of the tool is correct and reachable from Glean. For 500 errors, contact Glean support to investigate the underlying exception.

### Invalid redirect URI during Jira authentication

-   **Possible cause:** The verify\_code URI for tools OAuth has not been added to the allowed redirect URIs for the Jira OAuth app.
-   **Fix:** An admin should add [https://tenant\_id-be.glean.com/tools/oauth/verify\_code/toolUniqueIdentifier](https://tenant_id-be.glean.com/tools/oauth/verify_code/toolUniqueIdentifier) to the OAuth app's allowed redirect URIs and retry authentication. Copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, and replace [https://tenant\_id-be.glean.com](https://tenant_id-be.glean.com) with it.

## FAQs[​](#faqs "Direct link to FAQs")

### Does Get all users work with Jira Server or Data Center?

No. Jira tools in Glean are designed for Jira Cloud and rely on Jira Cloud's REST APIs and OAuth-based integration. They do not support Jira Server or Data Center deployments.

### Whose permissions does the tool use when retrieving users?

The tool runs using the connected Jira account for the current user, so it can only return information that this Jira account is allowed to access in Jira.

### Can I use this tool to search for a specific user?

No. Get all users is designed to list all users with pagination, not to search for specific users. To search for users by name, email, or account ID, use **Find users** instead.

### How does pagination work?

Use **Results limit** to control how many users are returned per page, and **Start at** to specify the starting index. For example, to get the second page of 100 users, set **Start at** to 100 and **Results limit** to 100.

### Does this tool include inactive users?

Yes. Get all users returns all users in the Jira instance, including both active and inactive users. The user status information is included in the response.
