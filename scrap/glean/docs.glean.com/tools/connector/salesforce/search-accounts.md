---
url: "https://docs.glean.com/tools/connector/salesforce/search-accounts"
canonical: "https://docs.glean.com/tools/connector/salesforce/search-accounts"
title: "Search accounts"
description: "Searches Salesforce accounts using flexible filters like name, location, industry, and phone"
fetched_at: "2026-09-01T13:30:05.922Z"
---
On this page

The *Salesforce search accounts* tool searches Account records in your connected Salesforce org using flexible filters. This is a read-only tool that helps teams find the right accounts quickly without modifying any Salesforce data.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    
-   The authenticated Salesforce user must have permission to view Account records based on your organization's sharing rules.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Name | String | Search by account name. Supports partial matches. Optional. |
| Billing city | String | Search by billing city. Supports partial matches. Optional. |
| Billing state | String | Search by billing state/province. Supports partial matches. Optional. |
| Billing country | String | Search by billing country. Supports partial matches. Optional. |
| Industry | String | Search by industry. Optional. |
| Phone | String | Search by phone number. Supports partial matches. Optional. |
| Fields | String | Comma-separated list of Account fields to retrieve. Optional. |
| Limit | Integer | Maximum number of accounts to return. Optional. |
| Type | String | Search by account type. Examples: "Customer - Direct" "Customer - Channel" "Prospect" "Partner" |
| Webiste | String | Search by website. Supports partial matches. Examples: "acme.com" ".com" "https://" |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Find all accounts in the technology industry located in San Francisco."
    
-   "Search for accounts with 'Acme' in the name in the United States."
    
-   "Show me accounts in the healthcare industry with phone numbers in the 415 area code."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool does not appear in the agent builder

-   **Possible cause:** The Salesforce tools are not added, not linked to your Salesforce connector, or not fully configured.
-   **Fix:** In the Glean admin console, go to **Platform → Tools**, add or open the Salesforce tools, link it to your Salesforce connector, configure authentication, update **Publish settings**, and save. After that, Salesforce tools should appear under **Tools → By connector → Salesforce**.

### Tool fails with OAuth or connected account error

-   **Possible cause:** The user's connected Salesforce account is missing, inactive, or misconfigured, or the Salesforce connected app is not set up correctly.
-   **Fix:** Ask the user to re-authenticate Salesforce when prompted by Glean. If errors persist, verify the Salesforce connected app configuration (callback URL and scopes) and confirm that Salesforce Tools setup is complete.

### No search results appear in the agent response

-   **Possible cause:** The agent calls the search tool but never surfaces its output in a respond step or follow-up tool.
-   **Fix:** In the agent builder, add a respond step after the search tool that uses the tool's output fields (e.g., to print a table of matching accounts) so users can see and act on the results.

### Search returns too many or too few results

-   **Possible cause:** The search filters are too broad or too narrow, or the authenticated user has limited access to Account records.
-   **Fix:** Adjust the search parameters to be more specific or relaxed. Use the Limit parameter to control the number of results. Verify that the user's Salesforce profile allows them to view the relevant accounts.

## FAQs[​](#faqs "Direct link to FAQs")

### What fields can I search by?

You can search by account name, billing city, billing state, billing country, industry, and phone number. All search filters support partial matches except industry, which requires an exact match to your Salesforce industry picklist values.

### Can I retrieve custom Account fields?

Yes. Use the Fields parameter to specify which Account fields to retrieve, including custom fields. Provide a comma-separated list of API field names (e.g., "Name,Industry,CustomField\_\_c"). If you do not specify fields, the tool returns a default set of standard fields.

### How do partial matches work?

Partial matches allow you to search for accounts that contain your search term anywhere in the field. For example, searching for "tech" in the Name field will match "TechCorp", "Biotech Solutions", and "FinTech Innovations". This is case-insensitive.

### Can I combine multiple search filters?

Yes. You can combine multiple search filters to narrow your results. For example, you can search for accounts in the "Technology" industry that are located in "California" and have "Solutions" in the name. All filters are applied with AND logic.
