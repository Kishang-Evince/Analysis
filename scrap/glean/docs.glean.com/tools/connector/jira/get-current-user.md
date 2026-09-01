---
url: "https://docs.glean.com/tools/connector/jira/get-current-user"
canonical: "https://docs.glean.com/tools/connector/jira/get-current-user"
title: "Get current user"
description: "Retrieves detailed information about the currently authenticated Jira user"
fetched_at: "2026-09-01T13:30:03.513Z"
---
On this page

The *Jira get current user* tool retrieves detailed information about the currently authenticated Jira account. This is a read-only tool that returns the details of the current user for permission checks, personalization, or workflow identification.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must complete the initial Jira setup and enable tools in the Admin Console so that the Jira tools are available in Agent Builder.
-   Each user is prompted to connect their Jira account via OAuth in Glean before running tools, including Jira Assign issue.
-   If your Jira organization uses Central OAuth, a Jira administrator must authorize the app for the site before users can run Jira tools in Glean.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

This tool does not accept any input parameters. It always returns information for the currently authenticated Jira user.

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Show me my current Jira account details."
    
-   "What is my Jira account ID and email address?"
    
-   "Before I create a new Jira issue, verify which Jira account I am using."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Site admin must authorize this app for the site

-   **Possible cause:** Jira's Central OAuth application is not granted site-wide access by a Jira administrator.
-   **Fix:** Ask a Jira admin to complete the required app authorization flow in Jira, then retry the tool.

### Tools backend returned status code 404 or 500

-   **Possible cause:** The tools server backing this tool is unreachable (404) or returning an internal error (500).
-   **Fix:** Confirm that the tool's server information is correct and reachable from Glean. For 500 errors, contact Glean support to investigate the underlying exception.

### Invalid redirect URI during Jira authentication

-   **Possible cause:** The verify\_code URI for tools OAuth has not been added to the allowed redirect URIs for the Jira OAuth app.
-   **Fix:** An admin should add [https://tenant\_id-be.glean.com/tools/oauth/verify\_code/toolUniqueIdentifier](https://tenant_id-be.glean.com/tools/oauth/verify_code/toolUniqueIdentifier) to the OAuth app's allowed redirect URIs and retry authentication. Copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, and replace [https://tenant\_id-be.glean.com](https://tenant_id-be.glean.com) with it.

## FAQs[​](#faqs "Direct link to FAQs")

### Whose permissions does the tool use when retrieving the current user?

The tool runs using the connected Jira account for the current user, so it can only return information that this Jira account is allowed to access.

### Can I look up another user with this tool?

No. Get current user only returns the currently authenticated Jira user. To work with other Jira users, use separate Jira tools such as *Find users* or *Get all users* where available.
