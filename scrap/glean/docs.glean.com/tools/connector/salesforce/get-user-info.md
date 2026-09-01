---
url: "https://docs.glean.com/tools/connector/salesforce/get-user-info"
canonical: "https://docs.glean.com/tools/connector/salesforce/get-user-info"
title: "Get user info"
description: "Retrieves information about a Salesforce user, optionally including permissions"
fetched_at: "2026-09-01T13:30:05.572Z"
---
On this page

The *Salesforce get user info* tool retrieves information about a Salesforce user by their User ID. This is a read-only tool that can return details about a specific user or the current authenticated user, optionally including their permissions.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    
-   The Salesforce integration user must have permission to read user records and permission-related data.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| User ID | String | The Salesforce User ID to retrieve information for. If not provided, returns information about the current authenticated user. Optional. |
| Include permissions | Boolean | Whether to include user permissions in the response. When enabled, makes additional API calls to retrieve permission details. Optional. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Get information about the current authenticated Salesforce user including their permissions."
    
-   "Retrieve details for Salesforce user ID 0055g0000098ABC."
    
-   "Show me user information and permission level for user 0055g0000099XYZ."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Error: No connected account found

-   **Possible cause:** The user running the tool has not linked their Salesforce account in Glean.
-   **Fix:** Ask the user to connect their Salesforce account in Glean through their account settings, then retry the tool.

### Tool succeeds only when include permissions is false

-   **Possible cause:** Restrictive permissions or API issues in your Salesforce org affect the additional permission API calls.
-   **Fix:** Run the tool with include permissions set to false to confirm basic connectivity. Work with your Salesforce admin to ensure the relevant permission APIs are available if you need permission details.

### User not found or similar Salesforce errors

-   **Possible cause:** The User ID is not a valid Salesforce User ID, or the integration user does not have permission to read that user record.
-   **Fix:** Verify that User ID is a valid Salesforce User ID from your org and that the integration user has permission to read that user record.

### Tool returns incomplete permission information

-   **Possible cause:** The include permissions parameter is set to false, or field-level security restrictions limit what permission data can be retrieved.
-   **Fix:** Set include permissions to true to retrieve permission data. Check with your Salesforce admin if certain permission fields are still missing due to security settings.

## FAQs[​](#faqs "Direct link to FAQs")

### Is User ID required?

No. If you do not provide User ID, the tool returns information about the current authenticated Salesforce user. Provide User ID when you need information about a different user.

### What does include\_permissions do?

When include\_permissions is true, the tool makes additional Salesforce API calls to include the user's permissions in the response. This is useful when you need to understand what the user can do in Salesforce before running write tools, though it may add some latency.

### Can I retrieve multiple users at once?

No. This tool retrieves information for one user at a time. To get information about multiple users, call this tool multiple times with different user IDs.

### How do I find a Salesforce user ID?

You can find user IDs in Salesforce by navigating to Setup → Users, or use Salesforce search or query tools to find users based on name, email, or other criteria.
