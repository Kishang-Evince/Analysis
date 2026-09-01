---
url: "https://docs.glean.com/tools/connector/salesforce/list-leads"
canonical: "https://docs.glean.com/tools/connector/salesforce/list-leads"
title: "List leads"
description: "Lists Salesforce leads with flexible filtering and sorting options"
fetched_at: "2026-09-01T13:30:05.960Z"
---
On this page

The *Salesforce list leads* tool retrieves a list of Lead records from your connected Salesforce org. This is a read-only tool that supports flexible filtering and sorting to help teams find the right prospects in CRM without modifying any Salesforce data.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    
-   The authenticated Salesforce user must have permission to view Lead records based on your organization's sharing rules.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Query | String | SOQL query to fetch leads. Use standard SOQL syntax to filter, sort, and limit results. Examples: "SELECT Id, FirstName, LastName, Company FROM Lead WHERE Status = 'New'" "SELECT Id, Name, Email, Company FROM Lead ORDER BY CreatedDate DESC LIMIT 10" "SELECT Id, Name, Rating FROM Lead WHERE Rating = 'Hot' AND Industry = 'Technology'" |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "List all open leads in the US West territory owned by me."
    
-   "Show me new leads created in the last 30 days sorted by company."
    
-   "Find all qualified leads with status 'Hot' ready for outreach."
    

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

### Too many results returned

-   **Possible cause:** The filter criteria are too broad or no limit is set on the number of results.
-   **Fix:** Add more specific filter criteria to narrow down results. Use the Limit parameter to restrict the number of returned leads. Consider filtering by lead status, owner, or creation date.

## FAQs[​](#faqs "Direct link to FAQs")

### How do I filter leads by owner?

Use the filter criteria to specify the owner name or user ID. You can filter for leads owned by the current user, a specific user, or a team.

### Can I filter by lead status?

Yes. You can filter leads by status such as "Open", "Contacted", "Qualified", "Unqualified", or any custom lead statuses defined in your Salesforce org.

### What fields can I sort by?

You can sort by any standard or custom Lead field in your Salesforce org, such as Name, Company, Status, Email, CreatedDate, or LastModifiedDate. Check your Salesforce schema for available fields.

### How do I limit the number of results?

Use the Limit parameter to specify the maximum number of leads to return. This is useful when dealing with large result sets to improve performance and readability.
