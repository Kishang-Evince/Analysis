---
url: "https://docs.glean.com/tools/connector/salesforce/add-contact-to-campaign"
canonical: "https://docs.glean.com/tools/connector/salesforce/add-contact-to-campaign"
title: "Add contact to campaign"
description: "Adds existing Salesforce contacts to a campaign to track engagement"
fetched_at: "2026-09-01T13:30:04.318Z"
---
On this page

The *Salesforce add contact to campaign* tool associates an existing Salesforce contact with a specific campaign. This is a write tool that enables agents to automate common follow-up steps like adding new prospects to nurture journeys or event campaigns immediately after creation or qualification.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    
-   The Salesforce user must have permission to work with the relevant campaign and contact records.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Campaign ID | String | The unique identifier of the Salesforce campaign to add the contact to. Required. |
| Contact ID | String | The unique identifier of the Salesforce contact to associate with the campaign. Required. |
| Status | String | Optional campaign member status representing how the contact engages with the campaign (e.g., "Sent", "Responded"). |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Add contact ID 003PZ000001rbt8YAA to the Q1 Product Launch campaign."
    
-   "Enroll the new contact in campaign ID 701PZ000002nrxyYAA with status 'Sent'."
    
-   "Associate Sarah Chen's contact record with the Webinar Attendees campaign."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool does not appear in the agent builder

-   **Possible cause:** The Salesforce tools are not added or published in your Glean deployment.
-   **Fix:** In the Glean admin console, go to **Platform → Tools**, add the Salesforce tools, link it to your Salesforce connector, configure authentication, update **Publish settings**, and save. After that, Salesforce tools should appear under **Tools → By connector → Salesforce**.

### Tool fails with OAuth or connected account error

-   **Possible cause:** The user's connected Salesforce account is missing, inactive, or misconfigured, or the Salesforce connected app is not set up correctly.
-   **Fix:** Ask the user to re-authenticate Salesforce when prompted by Glean. If errors persist, verify the Salesforce connected app configuration (callback URL and scopes) and confirm that Salesforce Tools Setup is complete.

### Tool succeeds but contact is not added to campaign

-   **Possible cause:** Salesforce rejected the request due to validation rules, missing required fields, insufficient permissions, or incorrect campaign or contact identifiers.
-   **Fix:** Check agent run details and Salesforce error messages. Adjust required fields, validation rules, or user permissions. Verify that the campaign ID and contact ID are correct and that the user has access to both records.

### Duplicate contact additions

-   **Possible cause:** The tool's idempotency behavior may allow multiple additions of the same contact to the same campaign.
-   **Fix:** Design your agent workflow to check if the contact is already a campaign member before calling this tool. Validate the behavior in your Salesforce org before using in high-volume automated workflows.

## FAQs[​](#faqs "Direct link to FAQs")

### Is this a read or write tool?

This is a write tool. It sends a request to Salesforce to modify campaign-member data by associating a contact with a campaign.

### Can I use this tool with other Salesforce tools?

Yes. You can combine this tool with other Salesforce tools such as Create contact, Search contacts, Associate contact to account, Send email, and Log email activity in the same agent to create comprehensive workflows.

### What happens if I add the same contact to a campaign multiple times?

The idempotency behavior depends on your Salesforce configuration. In most cases, Salesforce will update the existing campaign member record rather than create a duplicate. Test this behavior in your org before deploying to production workflows.

### Can I remove a contact from a campaign?

This tool only adds contacts to campaigns. To remove a contact from a campaign, you would need to use a different Salesforce tool or perform the operation directly in Salesforce.

### How do I find the campaign ID?

You can find the campaign ID in Salesforce by navigating to the campaign record and copying the ID from the URL, or use the Search campaigns tool to programmatically find the campaign ID based on campaign name or other criteria.
