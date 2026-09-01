---
url: "https://docs.glean.com/tools/connector/salesforce/search-campaigns"
canonical: "https://docs.glean.com/tools/connector/salesforce/search-campaigns"
title: "Search campaigns"
description: "Searches Salesforce campaigns with flexible filtering by name, type, status, date range, and active status"
fetched_at: "2026-09-01T13:30:06.033Z"
---
On this page

The *Salesforce search campaigns* tool searches campaign records in your connected Salesforce org using flexible filters. This is a read-only tool that helps teams find the right campaigns quickly without modifying any Salesforce data.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    
-   The authenticated Salesforce user must have permission to view Campaign records based on your organization's sharing rules.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Name | String | Campaign name to search for. Supports partial matches. Optional. |
| Type | String | Campaign type to filter by (e.g., "Email", "Webinar", "Conference"). Optional. |
| Status | String | Campaign status to filter by (e.g., "Planned", "In Progress", "Completed"). Optional. |
| Is active | Boolean | Filter by active status. True for active campaigns, false for inactive. Optional. |
| Start date from | Date | Search campaigns starting from this date (YYYY-MM-DD format). Optional. |
| Start date to | Date | Search campaigns starting before this date (YYYY-MM-DD format). Optional. |
| Fields | String | Comma-separated list of Campaign fields to retrieve in results. Optional. |
| Limit | Integer | Maximum number of campaigns to return. Optional. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Find all active email campaigns with 'Product Launch' in the name."
    
-   "Search for webinar campaigns that started in Q1 2024 with status 'Completed'."
    
-   "Show me all conference campaigns in progress sorted by start date."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool does not appear in the agent builder

-   **Possible cause:** The Salesforce tools are not added, not linked to your Salesforce connector, or not fully configured.
-   **Fix:** In the Glean admin console, go to **Platform → Tools**, add or open the Salesforce tools, link it to your Salesforce connector, configure authentication, update **Publish settings**, and save. After that, Salesforce tools should appear under **Tools → By connector → Salesforce**.

### Tool fails with OAuth or connected account error

-   **Possible cause:** The user's connected Salesforce account is missing, inactive, or misconfigured, or the Salesforce connected app is not set up correctly.
-   **Fix:** Ask the user to re-authenticate Salesforce when prompted by Glean. If errors persist, verify the Salesforce connected app configuration (callback URL and scopes) and confirm that Salesforce Tools setup is complete.

### Tool returns no campaigns even when expecting matches

-   **Possible cause:** The authenticated user does not have permission to view the relevant campaigns, or the search filters are too restrictive.
-   **Fix:** Confirm that the connected Salesforce user has access to the campaigns you expect to see. Review the filter values (name, status, type, date range, active flag) in your agent configuration to ensure they match campaigns in your org.

### Search returns too many results

-   **Possible cause:** The search filters are too broad or no limit is set on the number of results.
-   **Fix:** Add more specific filter criteria to narrow down results. Use the Limit parameter to restrict the number of returned campaigns. Consider filtering by campaign type, status, or date range.

## FAQs[​](#faqs "Direct link to FAQs")

### What campaign fields can I search by?

You can search by campaign name (partial match), type, status, active status, and start date range. Use the Name parameter for keyword searches, and combine multiple filters to narrow your results.

### Can I retrieve custom Campaign fields?

Yes. Use the Fields parameter to specify which Campaign fields to retrieve, including custom fields. Provide a comma-separated list of API field names (e.g., "Name,Type,Status,CustomField\_\_c"). If you do not specify fields, the tool returns a default set of standard fields.

### How do date range filters work?

Use Start date from and Start date to parameters to filter campaigns by their start date. Both use YYYY-MM-DD format. For example, to find campaigns that started in January 2024, set Start date from to "2024-01-01" and Start date to to "2024-01-31".

### What is the difference between active and status filters?

The Is active filter indicates whether a campaign is currently active (true/false), while the Status filter uses your Salesforce campaign status picklist values (e.g., "Planned", "In Progress", "Completed", "Aborted"). A campaign can be inactive but still have a status of "In Progress" if it was recently deactivated.
