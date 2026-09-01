---
url: "https://docs.glean.com/tools/connector/confluence/get-current-user"
canonical: "https://docs.glean.com/tools/connector/confluence/get-current-user"
title: "Get current user"
description: "Returns details about the currently authenticated Confluence account to confirm user identity and permissions"
fetched_at: "2026-09-01T13:29:59.636Z"
---
On this page

The *Confluence get current user* tool retrieves details about the currently authenticated Confluence account. This is a read-only tool that can be used to confirm which user the tool is running as and to fetch user details for permission checks or audit trails.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean tool must be enabled for your instance and the Confluence tools must be available.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

This tool does not accept any input parameters. It always returns information for the currently authenticated Confluence user.

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Before I update the product roadmap page, verify which Confluence account I am using."
    
-   "What Confluence account am I currently logged in as?"
    
-   "Fetch the Confluence ID and email of the current user so a downstream tool can assign them as the owner of a new page."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### No user returned

-   **Possible cause:** The Confluence connector does not have an active, authenticated account for this tool.
-   **Fix:** Verify that Confluence is connected for this user and that tools are enabled. Reconnect the Confluence account and try the tool again.

### Authentication or permission errors

-   **Possible cause:** The connector is not authorized to call user/current, or the READ permission for user APIs is missing or misconfigured.
-   **Fix:** Ask a Glean admin to confirm that the Confluence connector is fully set up and that the Confluence app configuration allows calling the user/current endpoint with READ scope.

### Intermittent failures

-   **Possible cause:** Temporary issues with the Confluence API or Glean tool infrastructure.
-   **Fix:** Retry the tool. If problems persist, have an admin review Confluence connector health and logs.

## FAQs[​](#faqs "Direct link to FAQs")

### Can I pass parameters to this tool?

No. Get current user does not accept any parameters. It always returns information for the currently authenticated Confluence user.

### Can I look up another user with this tool?

No. This tool only returns the currently authenticated user. To work with other users, use separate Confluence user listing or search tools where available.
