---
url: "https://docs.glean.com/tools/connector/salesforce/update-lead"
canonical: "https://docs.glean.com/tools/connector/salesforce/update-lead"
title: "Update lead"
description: "Updates existing Salesforce leads"
fetched_at: "2026-09-01T13:30:06.536Z"
---
On this page

The *Salesforce Update lead* tool updates existing lead records in your connected Salesforce org identified by their Salesforce ID. This write tool updates only the specified fields and does not change unspecified fields on the lead.

## Limitations[​](#limitations "Direct link to Limitations")

-   As with other Salesforce tools, the exact parameter set and behavior can change over time. Confirm behavior in your own environment and review the tool schema in the agent builder before relying on this tool for large-scale or fully automated lead updates.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use and have permission to update Lead records.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Annual revenue | Number | Estimated or known annual revenue for the lead’s company. Defaults to -1 when not specified. |
| City | String | City for the lead’s mailing or business address. |
| Company | String | Company name associated with the lead. Typically required. |
| Country | String | Country for the lead’s mailing or business address. |
| Description | String | Free-form notes or additional context about the lead. |
| Email | String | Primary email address for the lead. |
| First name | String | Lead’s given name. |
| Industry | String | Industry classification for the lead’s company. |
| Last name | String | Lead’s family name or surname. Typically required. |
| Lead ID | String | Unique identifier of the lead record (for example, Salesforce lead ID). Required for updates. |
| Lead source | String | Origin of the lead (for example, Web, Partner, Event). |
| Number of employees | Integer | Number of employees at the lead’s company. Defaults to -1 when not specified. |
| Phone | String | Primary phone number for the lead. |
| Postal code | String | Postal or ZIP code for the lead’s address. |
| Rating | String | Internal quality or priority rating for the lead. |
| State | String | State, province, or region for the lead’s address. |
| Status | String | Current lifecycle status of the lead (for example, New, Working). |
| Street | String | Street line of the lead’s mailing or business address. |
| Title | String | Job title or role of the lead. |
| Website | String | Website URL associated with the lead’s company. |

## Usage example[​](#usage-example "Direct link to Usage example")

You just sent an introduction email to a lead and need to update their status in Salesforce to reflect active outreach, searching for them first to get their Lead ID.

*Instruction to an agent:*

"Find the lead for **ABC at XYZ Inc** in Salesforce and update his status to **Working - Contacted** with a note that says **Sent intro email about enterprise product demo**."

*Resulting behavior:*

-   Calls Search Salesforce with SOQL to find leads where the last name is "ABC" and company is "XYZ Inc".
    
-   Retrieves the Lead ID (for example, "00Qxx000001234567").
    
-   Calls Update lead with:
    
    -   `Lead ID` set to "00Qxx000001234567".
        
    -   `Status` set to "Working - Contacted".
        
    -   `Description` set to "Sent intro email about enterprise product demo on Dec 11, 2025".
        
-   Updates the specified fields on the Lead record.
    
-   All other fields (First name, Last name, Company, Email, Phone, Title, etc.) remain unchanged.
    
-   Confirms the lead status was updated successfully.
    

*Workflow tip:* Always search for the lead first to get the Lead ID before updating. When chaining Create lead and Update lead, ensure your agent captures and passes the correct lead ID between steps. For prospecting workflows, you can combine this tool with Create lead and Send email to create leads from sources like Google Sheets, send intro emails, and update status in one coordinated run.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool is not available in the agent builder

-   **Possible cause:** Salesforce is not connected as a connector, or the Salesforce tools are not enabled and configured in your Glean deployment.
-   **Fix:** In the Admin console, confirm that Salesforce is connected as a connector and that the Salesforce tools are enabled. After that, the Salesforce tools appear under **Tools → By connector → Salesforce** in the agent builder.

### Tool fails with an authorization or OAuth error

-   **Possible cause:** The Salesforce OAuth app is not configured correctly, for example, callback URL, Consumer Key, or Consumer Secret, or the user running the agent has not completed the required Salesforce authorization flow from Glean.
-   **Fix:** Have the user retry the agent and complete the Salesforce authorization prompt. If errors persist, a Glean admin should re-check the OAuth setup on the Salesforce Tools Setup page and re-run the configuration steps.

### Follow-up Update lead steps do not modify the expected lead (especially after Create lead)

-   **Possible cause:** In flows that chain Salesforce Create lead and Salesforce Update lead, the agent may not be capturing or passing the correct lead ID between steps. Updating the same lead is difficult if the ID is not readily available and the update step is not fully background-runnable.
-   **Fix:** Add a human review step or explicit confirmation of the lead record before running Salesforce Update lead, or adjust the agent design so updates happen only after the lead ID is clearly available to the agent runner.

### Errors mentioning base URL or custom auth when executing the tool

-   **Possible cause:** In some environments using the legacy tool execution flow, Salesforce tools can fail with an error indicating that no valid base URL is available for custom auth.
-   **Fix:** Retry the tool later and, if the issue persists, ask a Glean admin or the tools-oncall team to review the Salesforce tools configuration and any custom auth settings for Salesforce tools.

## FAQs[​](#faqs "Direct link to FAQs")

### Does Salesforce Update lead overwrite all fields on the lead?

No. The tool updates only the specified fields. Only the fields you pass into the tool are modified; all other fields remain unchanged on the record.

### How do I find the Lead ID to update?

Use Salesforce Search or Search Salesforce with SOQL to find the lead by email, name, company, or other criteria first. These search tools will return the Lead ID, which you can then pass to Update lead.

### Can I use this tool together with Salesforce Create lead and Send email?

Yes. Salesforce Update lead is designed to work alongside other Salesforce tools such as Create lead and Send email so agents can create a lead, send an intro email, and then update the status and related fields of the lead in one coordinated run.

### What must I watch out for when chaining Create lead and Update lead?

Make sure your agent reliably captures and passes the correct lead ID from the Create lead step into Salesforce Update lead. Updating the newly created lead is difficult when the ID is not readily available and the update step is not fully background-runnable. It is recommended to add an explicit review or confirmation step before running the update, especially in high-volume or automated flows.
