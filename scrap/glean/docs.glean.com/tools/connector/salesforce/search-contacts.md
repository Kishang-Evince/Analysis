---
url: "https://docs.glean.com/tools/connector/salesforce/search-contacts"
canonical: "https://docs.glean.com/tools/connector/salesforce/search-contacts"
title: "Search contacts"
description: "Searches Salesforce contacts using flexible filters like name, email, account, and title"
fetched_at: "2026-09-01T13:30:05.901Z"
---
On this page

The *Salesforce search contacts* tool retrieves a list of Contact records from your connected Salesforce org using flexible filters. This is a read-only tool that helps teams find the right contacts quickly without modifying any Salesforce data.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    
-   The authenticated Salesforce user must have permission to view Contact records based on your organization's sharing rules.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Name | String | Search by contact name (first name or last name). Supports partial matches. Optional. |
| Email | String | Search by email address. Supports partial matches. Optional. |
| Account name | String | Search by associated account name. Supports partial matches. Optional. |
| Title | String | Search by job title. Supports partial matches. Optional. |
| Phone | String | Search by phone number. Supports partial matches. Optional. |
| Fields | String | Comma-separated list of Contact fields to retrieve. Optional. |
| Limit | Integer | Maximum number of contacts to return. Optional. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Find all contacts at Acme Corporation with email addresses ending in @acme.com."
    
-   "Search for contacts with the title 'VP of Engineering' across all accounts."
    
-   "Show me all contacts named John Smith with phone numbers in the 415 area code."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool does not appear in the agent builder

-   **Possible cause:** The Salesforce tools are not added, not linked to your Salesforce connector, or not fully configured.
-   **Fix:** In the Admin console, go to **Platform → Tools**, add or open the Salesforce tools, link it to your Salesforce connector, configure authentication, update **Publish settings**, and save. After that, Salesforce tools should appear under **Tools → By connector → Salesforce**.

### Tool fails with OAuth or connected account error

-   **Possible cause:** The user's connected Salesforce account is missing, inactive, or misconfigured, or the Salesforce connected app is not set up correctly.
-   **Fix:** Ask the user to re-authenticate Salesforce when prompted by Glean. If errors persist, verify the Salesforce connected app configuration (callback URL and scopes) and confirm that Salesforce Tools setup is complete.

### Tool returns no contacts even when expecting matches

-   **Possible cause:** The filter values are too narrow, do not match how data is stored in Salesforce, or the user does not have permission to view the relevant contacts.
-   **Fix:** Confirm the filter values are correct by checking a sample contact directly in Salesforce. Relax or adjust filters in the agent configuration. Verify that the user's Salesforce profile allows them to view Contact records for the target accounts.

### Search returns too many results

-   **Possible cause:** The search filters are too broad or no limit is set on the number of results.
-   **Fix:** Add more specific filter criteria to narrow down results. Use the Limit parameter to restrict the number of returned contacts. Consider combining multiple filters like account name, title, or email domain.

## FAQs[​](#faqs "Direct link to FAQs")

### What fields can I search by?

You can search by contact name (first or last), email address, associated account name, job title, and phone number. All search filters support partial matches, allowing you to find contacts that contain your search term anywhere in the field.

### Can I retrieve custom Contact fields?

Yes. Use the Fields parameter to specify which Contact fields to retrieve, including custom fields. Provide a comma-separated list of API field names (e.g., "Name,Email,Title,CustomField\_\_c"). If you do not specify fields, the tool returns a default set of standard fields.

### How do I search for contacts at a specific account?

Use the Account name parameter to filter contacts by their associated account. The parameter supports partial matches, so searching for "Tech" will match contacts at "TechCorp", "Biotech Solutions", and other accounts with "Tech" in their name.

### Can I combine multiple search filters?

Yes. You can combine multiple search filters to narrow your results. For example, you can search for contacts with "VP" in their title at accounts named "Acme" with email addresses at the "acme.com" domain. All filters are applied with AND logic.
