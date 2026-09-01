---
url: "https://docs.glean.com/tools/connector/salesforce/create-lead"
canonical: "https://docs.glean.com/tools/connector/salesforce/create-lead"
title: "Create lead"
description: "Creates new Salesforce leads from within Glean agents without leaving the workflow"
fetched_at: "2026-09-01T13:30:04.949Z"
---
On this page

The *Salesforce Create lead* tool creates new lead records in your connected Salesforce org. This write tool creates a new lead each time it runs. Running the same configuration multiple times will create duplicate leads, so design your workflow accordingly.

## Limitations[​](#limitations "Direct link to Limitations")

-   As with other Salesforce tools, the exact parameter set and behavior can change over time. Confirm how this tool behaves in your own environment before you depend on it for large-scale or fully automated lead creation.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Annual revenue | Number | Estimated or known annual revenue for the lead’s company. |
| City | String | City for the lead’s mailing or business address. |
| Company | String | Company name associated with the lead (required). |
| Country | String | Country for the lead’s mailing or business address. |
| Description | String | Free-form notes or additional context about the lead. |
| Email | String | Primary email address for the lead. |
| First name | String | Lead’s given name. |
| Industry | String | Industry classification for the lead’s company. |
| Last name | String | Lead’s family name or surname (required). |
| Lead source | String | Origin of the lead (for example, Web, Partner, Event). |
| Number of employees | Integer | Number of employees at the lead’s company. |
| Phone | String | Primary phone number for the lead. |
| Postal code | String | Postal or ZIP code for the lead’s address. |
| Rating | String | Internal quality or priority rating for the lead. |
| State | String | State, province, or region for the lead’s address. |
| Status | String | Current lifecycle status of the lead (for example, New, Working). |
| Street | String | Street line of the lead’s mailing or business address. |
| Title | String | Job title or role of the lead. |
| Website | String | Website URL associated with the lead’s company. |

## Usage example[​](#usage-example "Direct link to Usage example")

You have a list of qualified prospects from a recent trade show and need to add them to Salesforce as leads, then send personalized follow-up emails and update their status to show active outreach.

*Instruction to an agent:*

"Create a new lead in Salesforce for **ABC JIM**, Director of Engineering at **XYZ Inc**, email **[abc@example.com](mailto:abc@example.com)**, phone **444-555-1111**, located in **San Francisco, CA**. Set the lead source to **Trade Show** and industry to **Technology**. Then send him a personalized follow-up email about our enterprise product demo and update his lead status to **Working - Contacted**."

*Resulting behavior:*

-   Calls Create lead with:
    
    -   `First name` set to "ABC".
        
    -   `Last name` set to "JIM".
        
    -   `Company` set to "XYZ Inc" (required).
        
    -   `Title` set to "Director of Engineering".
        
    -   `Email` set to "[abc@example.com](mailto:abc@example.com)".
        
    -   `Phone` set to "444-555-1111".
        
    -   `City` set to "San Francisco".
        
    -   `State` set to "CA".
        
    -   `Country` set to "United States".
        
    -   `Lead source` set to "Trade Show".
        
    -   `Industry` set to "Technology".
        
    -   `Status` set to "New".
        
-   Creates a new Lead record in Salesforce.
    
-   Returns the Lead ID (for example, "00Qxx000001234567").
    
-   Calls Send email tool to send personalized follow-up email to Michael.
    
-   Calls Update lead tool to change status to "Working - Contacted".
    
-   Confirms the lead was created and outreach completed.
    

*Workflow tip:* Combine this tool with Salesforce Send email and Update lead to create complete prospecting workflows. You can also process leads from structured sources like Google Sheets by iterating through rows. For complex workflows, use conditional logic to branch based on lead properties like industry or region to send different email templates or assign to different owners.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool is not available in the agent builder

-   **Possible cause:** Salesforce is not connected as a connector in the Admin console, or the Salesforce tools are not enabled under Tools according to the Salesforce Tools Setup instructions.
-   **Fix:** A Glean admin should complete Salesforce Tools Setup including OAuth configuration and ensure Salesforce tools appear under **Tools → By connector → Salesforce** in the agent builder.

### Tool fails with an authorization or OAuth error

-   **Possible cause:** The Salesforce OAuth app is not configured correctly (callback URL, Consumer Key, or Consumer Secret), or the user running the agent has not completed the required Salesforce authorization flow from Glean.
-   **Fix:** Have the user retry the agent and complete the Salesforce auth prompt. If errors persist, a Glean admin must re-check the OAuth setup on the Salesforce Tools Setup page and re-run the configuration steps.

### Leads are created but owners or fields are not what you expect

-   **Possible cause:** The prompts of the agent and field mappings into the Salesforce Create lead tool do not match your Salesforce org's schema or defaulting rules, for example, default lead owner or required fields.
-   **Fix:** Adjust the agent step configuration and prompts so the correct fields are passed, or update your Salesforce defaults and validation rules so they align with how the agent is creating leads.

### Follow-up Update lead steps do not modify the newly created lead

-   **Possible cause:** In flows that chain Salesforce Create lead and Salesforce Update lead, the agent is not capturing or passing the correct lead ID between steps; updating the same lead is difficult if the ID is not readily available and the update step is not fully background-runnable.
-   **Fix:** Add a human review step or explicit confirmation of the lead record before running Salesforce Update lead, or adjust the agent design so updates happen only after the lead ID is clearly available to the agent runner.

## FAQs[​](#faqs "Direct link to FAQs")

### Can I use this tool together with Salesforce Send email and Update lead?

Yes. This tool is designed to work alongside other Salesforce hero tools such as Send email and Update lead, so agents can create a lead, send an intro email, and update the lead status in a single coordinated run.

### What happens if I create duplicate leads?

This tool creates a new lead each time it runs. If you run the same configuration multiple times with the same lead information, you will create duplicate lead records in Salesforce. Design your workflow to avoid unintentional duplicates by adding checks or confirmation steps.

### Can I process multiple leads from a source like Google Sheets?

Yes. You can use this tool in workflows that iterate through structured connectors like Google Sheets, creating a lead for each row. Combine with Send email and Update lead tools to complete the full prospecting workflow for each lead.
