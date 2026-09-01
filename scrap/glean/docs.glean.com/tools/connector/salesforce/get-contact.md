---
url: "https://docs.glean.com/tools/connector/salesforce/get-contact"
canonical: "https://docs.glean.com/tools/connector/salesforce/get-contact"
title: "Get contact"
description: "Retrieves full Salesforce contact details by ID"
fetched_at: "2026-09-01T13:30:05.341Z"
---
On this page

The *Salesforce get contact* tool retrieves a single Contact record from your connected Salesforce org by its Salesforce ID. This is a read-only tool that returns all available fields on the Contact object without modifying any Salesforce data.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    
-   The authenticated Salesforce user must have permission to view the target Contact record based on your organization's sharing rules.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Contact ID | String | The unique Salesforce ID of the contact to retrieve. Required. |
| Fields | String | Comma-delimited string of Contact field API names to retrieve. If omitted, all fields are returned. Examples: "Name,Email,Phone" "FirstName,LastName,AccountId,Description" |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Get the full details for Salesforce contact ID 003PZ000001rbt8YAA."
    
-   "Retrieve contact information for John Smith using his Salesforce ID."
    
-   "Show me all fields for contact ID 003PZ000002xyz9ABC."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool does not appear in the agent builder

-   **Possible cause:** The Salesforce tools are not added, not linked to your Salesforce connector, or not fully configured.
-   **Fix:** In the Glean admin console, go to **Platform → Tools**, add or open the Salesforce tools, link it to your Salesforce connector, configure authentication, update **Publish settings**, and save. After that, Salesforce tools should appear under **Tools → By connector → Salesforce**.

### Tool fails with OAuth or connected account error

-   **Possible cause:** The user's connected Salesforce account is missing, inactive, or misconfigured, or the Salesforce connected app is not set up correctly.
-   **Fix:** Ask the user to re-authenticate Salesforce when prompted by Glean. If errors persist, verify the Salesforce connected app configuration (callback URL and scopes) and confirm that Salesforce Tools Setup is complete.

### Tool returns no contact or record cannot be found error

-   **Possible cause:** The Contact ID is invalid, refers to a record that no longer exists, or the authorized Salesforce user does not have permission to view that Contact.
-   **Fix:** Confirm that the Contact ID is correct by checking the Salesforce URL, verify the record still exists, and ensure the user's Salesforce profile allows them to view that Contact.

### Agent run completes but no contact details appear

-   **Possible cause:** The agent calls the tool but never surfaces its output in a respond step.
-   **Fix:** In the agent builder, add a respond step after the tool that uses the tool's output fields to display key contact information (name, email, phone, account, owner) so users can see the retrieved details.

## FAQs[​](#faqs "Direct link to FAQs")

### How do I find the contact ID?

You can find the contact ID in Salesforce by navigating to the contact record and copying the ID from the URL, or use the Search contacts tool to programmatically find the contact ID based on name, email, or other criteria.

### Can I retrieve multiple contacts at once?

No. This tool retrieves one contact at a time using a single contact ID. To retrieve multiple contacts, call this tool multiple times with different IDs, or use a search tool to find multiple contacts based on criteria.

### Which fields does the tool return?

The tool returns all available fields on the Contact object. The exact fields visible depend on your Salesforce configuration and the authenticated user's field-level permissions.
