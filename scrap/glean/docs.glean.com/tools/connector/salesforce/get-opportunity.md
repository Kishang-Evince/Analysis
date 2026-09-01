---
url: "https://docs.glean.com/tools/connector/salesforce/get-opportunity"
canonical: "https://docs.glean.com/tools/connector/salesforce/get-opportunity"
title: "Get opportunity"
description: "Retrieves full Salesforce opportunity details by ID"
fetched_at: "2026-09-01T13:30:05.647Z"
---
On this page

The *Salesforce get opportunity* tool retrieves a single Opportunity record from your connected Salesforce org by its Salesforce ID. This is a read-only tool that returns all available fields on the Opportunity object without modifying any Salesforce data.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    
-   The authenticated Salesforce user must have permission to view the target Opportunity record based on your organization's sharing rules.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Opportunity ID | String | The unique Salesforce ID of the opportunity to retrieve. Required. |
| Fields | String | Comma-delimited string of Opportunity field API names to retrieve. If omitted, all fields are returned. Examples: "Name,Amount,StageName,CloseDate" "Description,Type,LeadSource,NextStep" |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Get the full details for Salesforce opportunity ID 006PZ000003xyzABC."
    
-   "Retrieve opportunity information for the Q4 Enterprise Deal using its Salesforce ID."
    
-   "Show me all fields for opportunity ID 006PZ000004defGHI."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool fails with no connected account found or authentication error

-   **Possible cause:** Salesforce is not connected as a connector, the OAuth app is misconfigured, or the user's token is invalid.
-   **Fix:** Verify that Salesforce is connected, the OAuth app is configured with the correct callback URL and scopes, and the user has successfully completed the Salesforce OAuth flow in Glean. Ask the user to re-authenticate if needed.

### Tool does not appear in the builder

-   **Possible cause:** Salesforce Tools Setup is not complete, or Salesforce tools are not enabled for your tenant.
-   **Fix:** Confirm that Salesforce Tools Setup is complete in the Admin console and that Salesforce tools are enabled and available.

### Tool returns no data or permissions error

-   **Possible cause:** The opportunity ID is invalid, from the wrong org, or the user does not have permission to view that opportunity.
-   **Fix:** Verify that the opportunity ID is valid and from the correct Salesforce org. Ensure the user has permission in Salesforce to view that opportunity. Check record-level and field-level security settings if certain fields are missing.

### Opportunity ID not found error

-   **Possible cause:** The provided opportunity ID does not exist in Salesforce, or it may have been deleted.
-   **Fix:** Verify that the opportunity ID is correct by checking in Salesforce. Use Search opportunities tool to find the correct opportunity ID if needed.

## FAQs[​](#faqs "Direct link to FAQs")

### How is this different from Search Opportunities?

Salesforce get opportunity retrieves one specific opportunity when you already know its Salesforce ID. Search Opportunities searches across opportunities by name or filters and returns a list of matching records. Use Search Opportunities to find the right record, then pass its ID to this tool to load full details.

### How do I find the opportunity ID?

You can find the opportunity ID in Salesforce by navigating to the opportunity record and copying the ID from the URL, or use the Search opportunities tool to programmatically find the opportunity ID based on name, stage, amount, or other criteria.

### Can I retrieve multiple opportunities at once?

No. This tool retrieves one opportunity at a time using a single opportunity ID. To retrieve multiple opportunities, call this tool multiple times with different IDs, or use a search tool to find multiple opportunities based on criteria.

### Which fields does the tool return?

The tool returns all available fields on the Opportunity object, including custom fields. The exact fields visible depend on your Salesforce configuration and the authenticated user's field-level permissions.
