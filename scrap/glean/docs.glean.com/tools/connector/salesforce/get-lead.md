---
url: "https://docs.glean.com/tools/connector/salesforce/get-lead"
canonical: "https://docs.glean.com/tools/connector/salesforce/get-lead"
title: "Get lead"
description: "Retrieves full Salesforce lead details by ID"
fetched_at: "2026-09-01T13:30:05.359Z"
---
On this page

The *Salesforce get lead* tool retrieves a single Lead record from your connected Salesforce org by its Salesforce ID. This is a read-only tool that returns all available fields on the Lead object without modifying any Salesforce data.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    
-   The authenticated Salesforce user must have permission to view the target Lead record based on your organization's sharing rules.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Lead ID | String | The unique Salesforce ID of the lead to retrieve. Required. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Get the full details for Salesforce lead ID 00QPZ000001rbt8YAA."
    
-   "Retrieve lead information for Jane Smith using her Salesforce ID."
    
-   "Show me all fields for lead ID 00QPZ000002xyz9ABC."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool runs but no lead details appear in the response

-   **Possible cause:** The agent calls the tool but never surfaces its output in a respond step.
-   **Fix:** In the agent builder, add a respond step after the tool that uses the tool's output fields to display key lead information (name, title, company, status, lead source) so users can see the retrieved details.

### Tool fails when looking up a lead by name only

-   **Possible cause:** The tool cannot reliably predict lead IDs from person names.
-   **Fix:** Use a real Salesforce lead identifier from the record URL and pass that identifier directly into the tool instead of relying on name-based inference.

### Salesforce authentication or permissions errors

-   **Possible cause:** Salesforce is not connected as a connector, tools are not enabled, or the user has not authorized Salesforce.
-   **Fix:** Confirm that Salesforce is connected, the tools are enabled, and the user has re-authorized Salesforce if prompted. Work with your Glean admin to verify that Salesforce Tools setup is complete and that the connected user can view Lead records.

### Lead ID not found error

-   **Possible cause:** The provided lead ID does not exist in Salesforce, or it may have been deleted or converted to a contact.
-   **Fix:** Verify that the lead ID is correct by checking in Salesforce. Use Search leads tool to find the correct lead ID if needed.

## FAQs[​](#faqs "Direct link to FAQs")

### How is this different from Salesforce Retrieve Lead by ID?

Salesforce Retrieve Lead by ID is a legacy tool that is deprecated in favor of Salesforce Get lead. When building new agents, use Salesforce Get lead where available.

### How do I find the lead ID?

You can find the lead ID in Salesforce by navigating to the lead record and copying the ID from the URL, or use the Search leads tool to programmatically find the lead ID based on name, email, company, or other criteria.

### Can I retrieve multiple leads at once?

No. This tool retrieves one lead at a time using a single lead ID. To retrieve multiple leads, call this tool multiple times with different IDs, or use a search tool to find multiple leads based on criteria.

### Which fields does the tool return?

The tool returns all available fields on the Lead object. The exact fields visible depend on your Salesforce configuration and the authenticated user's field-level permissions.
