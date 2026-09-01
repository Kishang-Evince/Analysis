---
url: "https://docs.glean.com/tools/connector/salesforce/list-contacts"
canonical: "https://docs.glean.com/tools/connector/salesforce/list-contacts"
title: "List contacts"
description: "Lists Salesforce contacts with flexible filtering and sorting options"
fetched_at: "2026-09-01T13:30:05.502Z"
---
On this page

The *Salesforce list contacts* tool retrieves a list of Contact records from your connected Salesforce org. This is a read-only tool that supports flexible filtering and sorting to help teams find the right people in CRM without modifying any Salesforce data.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    
-   The authenticated Salesforce user must have permission to view Contact records based on your organization's sharing rules.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Query | String | SOQL query to fetch contacts. Use standard SOQL syntax to filter, sort, and limit results. Examples: "SELECT Id, FirstName, LastName FROM Contact WHERE Email != null" "SELECT Id, FirstName, LastName, Email FROM Contact ORDER BY LastName LIMIT 10" "SELECT Id, Name, Email FROM Contact WHERE CreatedDate = TODAY" |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "List all contacts at Acme Corporation sorted by job title."
    
-   "Show me contacts with email addresses at example.com domain."
    
-   "Find all contacts created in the last 30 days owned by the sales team."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool does not appear in the agent builder

-   **Possible cause:** The Salesforce tools are not added, not linked to your Salesforce connector, or not fully configured.
-   **Fix:** In the Glean admin console, go to **Platform → Tools**, add or open the Salesforce tools, link it to your Salesforce connector, configure authentication, update **Publish settings**, and save. After that, Salesforce tools should appear under **Tools → By connector → Salesforce**.

### Tool fails with OAuth or connected account error

-   **Possible cause:** The user's connected Salesforce account is missing, inactive, or misconfigured, or the Salesforce connected app is not set up correctly.
-   **Fix:** Ask the user to re-authenticate Salesforce when prompted by Glean. If errors persist, verify the Salesforce connected app configuration (callback URL and scopes) and confirm that Salesforce Tools setup is complete.

### Tool returns no contacts even when expecting matches

-   **Possible cause:** The filter values are too narrow, do not match how data is stored in Salesforce, or the user does not have permission to view the relevant contacts.
-   **Fix:** Confirm the filter values are correct by checking a sample contact directly in Salesforce. Relax or adjust filters in the agent configuration. Verify that the user's Salesforce profile allows them to view Contact records.

### Too many results returned

-   **Possible cause:** The filter criteria are too broad or no limit is set on the number of results.
-   **Fix:** Add more specific filter criteria to narrow down results. Use the Limit parameter to restrict the number of returned contacts. Consider breaking large queries into smaller, more focused queries.

## FAQs[​](#faqs "Direct link to FAQs")

### How do I filter contacts by account?

Use the filter criteria to specify the account name or account ID. The exact syntax depends on your Salesforce configuration, but you can typically filter by account-related fields available in your org.

### Can I filter by multiple criteria?

Yes. You can combine multiple filter criteria to narrow down results. For example, filter by both account and job title, or by email domain and creation date.

### What fields can I sort by?

You can sort by any standard or custom Contact field in your Salesforce org, such as Name, Email, Title, LastModifiedDate, or CreatedDate. Check your Salesforce schema for available fields.

### How do I limit the number of results?

Use the Limit parameter to specify the maximum number of contacts to return. This is useful when dealing with large result sets to improve performance and readability.
