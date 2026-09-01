---
url: "https://docs.glean.com/tools/connector/salesforce/get-account"
canonical: "https://docs.glean.com/tools/connector/salesforce/get-account"
title: "Get account"
description: "Retrieves full Salesforce account details by ID"
fetched_at: "2026-09-01T13:30:05.219Z"
---
On this page

The *Salesforce get account* tool retrieves a single Account record from your connected Salesforce org by its Salesforce ID. This is a read-only tool that returns all available fields on the Account object without modifying any Salesforce data.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    
-   The authenticated Salesforce user must have permission to view the target Account record based on your organization's sharing rules.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Account ID | String | The unique Salesforce ID of the account to retrieve. Required. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Get the full details for Salesforce account ID 001PZ000003xyzABC."
    
-   "Retrieve account information for Acme Corporation using its Salesforce ID."
    
-   "Show me all fields for account ID 001PZ000004defGHI."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool returns authentication error or no connected account found

-   **Possible cause:** The user has not connected their Salesforce account for tools, or the Salesforce connected app is misconfigured.
-   **Fix:** Have the user complete Salesforce authentication from within Glean or reconnect if needed. An admin may need to review the Salesforce connected app configuration and tools settings if authentication continues to fail.

### Agent run completes but no account details appear

-   **Possible cause:** The agent calls the tool but never surfaces its output in a respond step.
-   **Fix:** In the agent builder, add a respond step after the tool that uses the tool's output fields to display key account information or a formatted summary so users can see the retrieved details.

### Tool fails or returns partial data for a specific account

-   **Possible cause:** The authenticated Salesforce user may not have permission to view that Account or some of its fields.
-   **Fix:** Ask a Salesforce admin to confirm that the connected user has read access to Accounts and to the specific record you are targeting. Verify field-level security settings if certain fields are missing.

### Account ID not found error

-   **Possible cause:** The provided account ID does not exist in Salesforce, or it may have been deleted.
-   **Fix:** Verify that the account ID is correct by checking in Salesforce. Use Search accounts tool to find the correct account ID if needed.

## FAQs[​](#faqs "Direct link to FAQs")

### Does this tool modify Salesforce data?

No. Salesforce get account is a read-only tool. It only retrieves account information and does not create, update, or delete records in Salesforce.

### How do I find the account ID?

You can find the account ID in Salesforce by navigating to the account record and copying the ID from the URL, or use the Search accounts tool to programmatically find the account ID based on account name or other criteria.

### Can I retrieve multiple accounts at once?

No. This tool retrieves one account at a time using a single account ID. To retrieve multiple accounts, call this tool multiple times with different IDs, or use a search tool to find multiple accounts based on criteria.
