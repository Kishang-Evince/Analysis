---
url: "https://docs.glean.com/tools/connector/salesforce/list-campaigns"
canonical: "https://docs.glean.com/tools/connector/salesforce/list-campaigns"
title: "List campaigns"
description: "Lists Salesforce campaigns with flexible filtering and sorting options"
fetched_at: "2026-09-01T13:30:05.726Z"
---
On this page

The *Salesforce list campaigns* tool retrieves a list of Campaign records from your connected Salesforce org. This is a read-only tool that supports flexible filtering and sorting to help teams find the right campaigns without modifying any Salesforce data.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    
-   The authenticated Salesforce user must have permission to view Campaign records based on your organization's sharing rules.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Query | String | SOQL query to fetch campaigns. Use standard SOQL syntax to filter, sort, and limit results. Examples: "SELECT Id, Name, Type, Status FROM Campaign WHERE IsActive = true" "SELECT Id, Name, StartDate, EndDate FROM Campaign ORDER BY StartDate DESC LIMIT 10" "SELECT Id, Name, BudgetedCost FROM Campaign WHERE Type = 'Email' AND Status = 'In Progress'" |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "List all active email campaigns sorted by start date."
    
-   "Show me webinar campaigns that started in Q4 2023."
    
-   "Find all campaigns with status 'In Progress' owned by the marketing team."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool does not appear in the agent builder

-   **Possible cause:** The Salesforce tools are not added or published in your Glean deployment.
-   **Fix:** In the Glean admin console, go to **Platform → Tools**, add the Salesforce tools, link it to your Salesforce connector, configure authentication, update **Publish settings**, and save. After that, Salesforce tools should appear under **Tools → By connector → Salesforce**.

### Tool fails with OAuth or connected account error

-   **Possible cause:** The user's connected Salesforce account is missing, inactive, or misconfigured, or the Salesforce connected app is not set up correctly.
-   **Fix:** Ask the user to re-authenticate Salesforce when prompted by Glean. If errors persist, verify the Salesforce connected app configuration (callback URL and scopes) and confirm that Salesforce Tools Setup is complete.

### Tool returns no campaigns even when expecting matches

-   **Possible cause:** The filter values are too narrow, do not match how data is stored in Salesforce, or the user does not have permission to view the relevant campaigns.
-   **Fix:** Confirm the filter values are correct by checking a sample campaign directly in Salesforce. Relax or adjust filters in the agent configuration. Verify that the user's Salesforce profile allows them to view Campaign records.

### Too many results returned

-   **Possible cause:** The filter criteria are too broad or no limit is set on the number of results.
-   **Fix:** Add more specific filter criteria to narrow down results. Use the Limit parameter to restrict the number of returned campaigns. Consider filtering by campaign status, type, or date range.

## FAQs[​](#faqs "Direct link to FAQs")

### How do I filter campaigns by status?

Use the filter criteria to specify the campaign status (e.g., "Planned", "In Progress", "Completed", "Aborted"). The available status values depend on your Salesforce configuration.

### Can I filter by campaign type?

Yes. You can filter campaigns by type such as "Email", "Webinar", "Conference", "Trade Show", or any custom campaign types defined in your Salesforce org.

### What fields can I sort by?

You can sort by any standard or custom Campaign field in your Salesforce org, such as Name, StartDate, EndDate, Status, Type, or BudgetedCost. Check your Salesforce schema for available fields.

### How do I limit the number of results?

Use the Limit parameter to specify the maximum number of campaigns to return. This is useful when dealing with large result sets to improve performance and readability.
