---
url: "https://docs.glean.com/tools/connector/salesforce/search-opportunities"
canonical: "https://docs.glean.com/tools/connector/salesforce/search-opportunities"
title: "Search opportunities"
description: "Searches Salesforce opportunities using filters like name, account, stage, amount, and close date"
fetched_at: "2026-09-01T13:30:06.145Z"
---
On this page

The *Salesforce search opportunities* tool searches Opportunity records in your connected Salesforce org using flexible filters. This is a read-only tool that helps teams find the right deals quickly without modifying any Salesforce data.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    
-   The authenticated Salesforce user must have permission to view Opportunity records based on your organization's sharing rules.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Name | String | Search by opportunity name. Supports partial matches. Optional. |
| Account name | String | Search by associated account name. Supports partial matches. Optional. |
| Stage name | String | Search by opportunity stage (e.g., "Prospecting", "Negotiation", "Closed Won"). Optional. |
| Lead source | String | Search by lead source. Optional. |
| Amount min | Number | Minimum opportunity amount. Optional. |
| Amount max | Number | Maximum opportunity amount. Optional. |
| Close date from | Date | Return opportunities with close date on or after this date (YYYY-MM-DD format only). Optional. |
| Close date to | Date | Return opportunities with close date before this date (YYYY-MM-DD format only). Optional. |
| Is closed | Boolean | Filter by closed status. True returns closed opportunities, false returns open. Optional. |
| Is won | Boolean | Filter by won status. True returns won opportunities, false returns lost (applies to closed opportunities only). Optional. |
| Fields | String | Comma-separated list of Opportunity fields to retrieve. Optional. |
| Limit | Integer | Maximum number of opportunities to return. Optional. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Find all open opportunities at Acme Corporation with close dates this quarter and amounts over $50,000."
    
-   "Search for opportunities in the Negotiation stage with close dates in the next 30 days."
    
-   "Show me all closed-won opportunities from the Webinar lead source this year."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool does not appear in the agent builder

-   **Possible cause:** The Salesforce tools are not added, not linked to your Salesforce connector, or not fully configured.
-   **Fix:** In the Glean admin console, go to **Platform → Tools**, add or open the Salesforce tools, link it to your Salesforce connector, configure authentication, update **Publish settings**, and save. After that, Salesforce tools should appear under **Tools → By connector → Salesforce**.

### Tool fails with OAuth or connected account error

-   **Possible cause:** The user's connected Salesforce account is missing, inactive, or misconfigured, or the Salesforce connected app is not set up correctly.
-   **Fix:** Ask the user to re-authenticate Salesforce when prompted by Glean. If errors persist, verify the Salesforce connected app configuration (callback URL, client key, client secret, and required scopes) and confirm that Salesforce Tools setup is complete. If needed, revoke the user's authorization and have them re-run the OAuth flow.

### Tool returns no results or fewer opportunities than expected

-   **Possible cause:** The filter values are too narrow, date formats are incorrect, or the user does not have permission to view the relevant opportunities.
-   **Fix:** Verify that filter values (account name, stage, lead source) are correct and not overly restrictive. Ensure close date parameters use YYYY-MM-DD format only (natural language phrases like "this quarter" will cause errors). Check that the limit parameter is set high enough. Verify that the user's Salesforce profile allows them to view the target opportunities.

### Date filter errors or unexpected results

-   **Possible cause:** Close date parameters contain natural language phrases instead of YYYY-MM-DD format, causing SOQL syntax errors.
-   **Fix:** Always use YYYY-MM-DD format for Close date from and Close date to parameters. For example, use "2024-01-01" instead of "this quarter" or "next month". Calculate the specific dates before passing them to the tool.

## FAQs[​](#faqs "Direct link to FAQs")

### What is the difference between this tool and Get opportunity?

**Search opportunities** searches across many opportunities using filters and returns a list of matching records. **Get opportunity** retrieves a single opportunity when you already know its Salesforce ID, typically after finding it with a search tool.

### Can I retrieve custom Opportunity fields?

Yes. Use the Fields parameter to specify which Opportunity fields to retrieve, including custom fields. Provide a comma-separated list of API field names (e.g., "Name,StageName,Amount,CloseDate,CustomField\_\_c"). If you do not specify fields, the tool returns a default set of standard fields.

### How do I filter by amount range?

Use the Amount min and Amount max parameters together to create a range. For example, set Amount min to 50000 and Amount max to 100000 to find opportunities between $50K and $100K. You can use just one parameter if you only need a minimum or maximum threshold.

### What date format should I use for close date filters?

Always use YYYY-MM-DD format for Close date from and Close date to parameters (e.g., "2024-03-01" for March 1, 2024). Do not use natural language phrases like "this quarter" or "next month" as they will cause SOQL syntax errors.
