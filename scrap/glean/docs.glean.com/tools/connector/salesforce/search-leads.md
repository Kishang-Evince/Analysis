---
url: "https://docs.glean.com/tools/connector/salesforce/search-leads"
canonical: "https://docs.glean.com/tools/connector/salesforce/search-leads"
title: "Search leads"
description: "Searches Salesforce leads using flexible filters like name, email, company, and status"
fetched_at: "2026-09-01T13:30:06.092Z"
---
On this page

The *Salesforce search leads* tool searches Lead records in your connected Salesforce org using flexible filters. This is a read-only tool that helps teams find the right prospects quickly without modifying any Salesforce data.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    
-   The authenticated Salesforce user must have permission to view Lead records based on your organization's sharing rules.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Name | String | Search by lead name (first name or last name). Supports partial matches. Optional. |
| Email | String | Search by email address. Supports partial matches. Optional. |
| Company | String | Search by company name. Supports partial matches. Optional. |
| Status | String | Search by lead status (e.g., "Open", "Contacted", "Qualified"). Optional. |
| Phone | String | Search by phone number. Supports partial matches. Optional. |
| Fields | String | Comma-separated list of Lead fields to retrieve. Optional. |
| Limit | Integer | Maximum number of leads to return. Optional. |
| Lead source | String | Search by lead source. Examples: "Web" "Phone Inquiry" "Partner Referral" |
| Title | String | Search by job title. Supports partial matches. Examples: "Manager" "Director" "Sales" |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Search for all qualified leads at Acme Corporation with email addresses ending in @acme.com."
    
-   "Find open leads named John Smith with phone numbers in the 415 area code."
    
-   "Show me all contacted leads at companies in the technology industry."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool does not appear in the agent builder

-   **Possible cause:** The Salesforce tools are not added, not linked to your Salesforce connector, or not fully configured.
-   **Fix:** In the Glean admin console, go to **Platform → Tools**, add or open the Salesforce tools, link it to your Salesforce connector, configure authentication, update **Publish settings**, and save. After that, Salesforce tools should appear under **Tools → By connector → Salesforce**.

### Tool fails with OAuth or connected account error

-   **Possible cause:** The user's connected Salesforce account is missing, inactive, or misconfigured, or the Salesforce connected app is not set up correctly.
-   **Fix:** Ask the user to re-authenticate Salesforce when prompted by Glean. If errors persist, verify the Salesforce connected app configuration (callback URL and scopes) and confirm that Salesforce Tools setup is complete.

### Tool returns no leads even when expecting matches

-   **Possible cause:** The filter values are too narrow, do not match how data is stored in Salesforce, or the user does not have permission to view the relevant leads.
-   **Fix:** Confirm the filter values are correct by checking a sample lead directly in Salesforce. Relax or adjust filters in the agent configuration. Verify that the user's Salesforce profile allows them to view Lead records in the target segment.

### Search returns too many results

-   **Possible cause:** The search filters are too broad or no limit is set on the number of results.
-   **Fix:** Add more specific filter criteria to narrow down results. Use the Limit parameter to restrict the number of returned leads. Consider combining multiple filters like company, status, or email domain.

## FAQs[​](#faqs "Direct link to FAQs")

### What fields can I search by?

You can search by lead name (first or last), email address, company name, lead status, and phone number. All search filters support partial matches (except status, which requires exact match to your Salesforce lead status picklist values).

### Can I retrieve custom Lead fields?

Yes. Use the Fields parameter to specify which Lead fields to retrieve, including custom fields. Provide a comma-separated list of API field names (e.g., "Name,Email,Company,Status,CustomField\_\_c"). If you do not specify fields, the tool returns a default set of standard fields.

### How do I search for leads by status?

Use the Status parameter to filter leads by their status. The status value must match your Salesforce lead status picklist exactly (e.g., "Open", "Contacted", "Qualified", "Unqualified"). Status values are case-sensitive and org-specific.

### Can I combine multiple search filters?

Yes. You can combine multiple search filters to narrow your results. For example, you can search for leads with "VP" in their name at companies named "Tech" with status "Qualified". All filters are applied with AND logic.
