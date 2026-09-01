---
url: "https://docs.glean.com/tools/connector/salesforce/create-campaign"
canonical: "https://docs.glean.com/tools/connector/salesforce/create-campaign"
title: "Create campaign"
description: "Creates new Salesforce campaign records from within Glean agents"
fetched_at: "2026-09-01T13:30:04.748Z"
---
On this page

The *Salesforce create campaign* tool creates new campaign records in your connected Salesforce org. This is a write tool that only creates new campaigns and does not update or delete existing campaign records. Design workflows carefully to avoid duplicate campaigns.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    
-   The Salesforce user must have permission to create and view campaign records.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Name | String | The name of the campaign to create. Required. |
| Actual cost | Integer | Actual cost spent on the campaign. Examples: 8500 4200.75 22000 |
| Type | String | The type of campaign (e.g., "Email", "Webinar", "Conference", "Trade Show"). |
| Status | String | The current status of the campaign (e.g., "Planned", "In Progress", "Completed"). |
| Start date | Date | The start date of the campaign in YYYY-MM-DD format. |
| End date | Date | The end date of the campaign in YYYY-MM-DD format. |
| Description | String | A description of the campaign's purpose and goals. |
| Budgeted cost | Number | The budgeted cost for the campaign. |
| Expected revenue | Number | The expected revenue from the campaign. |
| Parent ID | String | ID of the parent campaign if this is a child campaign. Example: "701XXXXXXXXXXXXXXX" |
| Expected response | Integer | Expected response rate as a percentage. Examples: 5 10.5 15 |
| Is active | Boolean | Whether the campaign is currently active. Examples: true false |
| Number sent | Integer | Number of individuals targeted by the campaign. Examples: 1000 5000 10000 |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Create a new Salesforce campaign called 'Q1 2024 Product Launch' with type 'Email' and status 'Planned'."
    
-   "Set up a webinar campaign named 'Customer Success Workshop' starting March 15, 2024."
    
-   "Create a conference campaign 'Tech Summit 2024' with budget $50,000 and expected revenue $200,000."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool does not appear in the agent builder

-   **Possible cause:** The Salesforce tools are not added or published in your Glean deployment.
-   **Fix:** In the Admin console, go to **Platform → Tools**, add the Salesforce tools, link it to your Salesforce connector, configure authentication, update **Publish settings**, and save. After that, Salesforce tools should appear under **Tools → By connector → Salesforce**.

### Tool fails with OAuth or connected account error

-   **Possible cause:** The user's connected Salesforce account is missing, inactive, or misconfigured, or the Salesforce connected app is not set up correctly.
-   **Fix:** Ask the user to re-authenticate Salesforce when prompted by Glean. If errors persist, verify the Salesforce connected app configuration (callback URL and scopes) and confirm that Salesforce Tools Setup is complete.

### Tool succeeds but campaign is not created as expected

-   **Possible cause:** Salesforce rejected the request due to validation rules, missing required fields, insufficient permissions, or unexpected values in campaign fields.
-   **Fix:** Check agent run details and Salesforce error messages. Adjust required fields, validation rules, or user permissions. Verify that all required campaign fields are provided with valid values.

### Duplicate campaigns created

-   **Possible cause:** The tool was called multiple times with the same campaign name, and Salesforce does not prevent duplicate campaign names.
-   **Fix:** Design your agent workflow to check if a campaign with the same name already exists using Search campaigns before creating a new one. Consider implementing campaign naming conventions that include unique identifiers.

## FAQs[​](#faqs "Direct link to FAQs")

### Can this tool update or delete existing campaigns?

No. Salesforce create campaign only creates new campaign records. It does not update or delete existing campaigns. Use separate Salesforce tools for updates or modifications.

### Can I use this tool with other Salesforce tools?

Yes. You can combine this tool with other Salesforce tools such as List campaigns, Add lead to campaign, Add contact to campaign, Send email, and Log email activity in the same agent to create comprehensive workflows.

### How do I avoid creating duplicate campaigns?

Design your agent workflow to search for existing campaigns first using the List campaigns or Search campaigns tool. Only create a new campaign if no matching record is found. Consider using unique campaign naming conventions with dates or identifiers.

### What campaign types are available?

Campaign types depend on your Salesforce org configuration. Common types include Email, Webinar, Conference, Trade Show, Advertisement, and Direct Mail. Check your Salesforce campaign settings to see available types in your org.

### Can I add members to the campaign when creating it?

No. This tool only creates the campaign record. After creating a campaign, use Add lead to campaign or Add contact to campaign tools to enroll members in the newly created campaign.
