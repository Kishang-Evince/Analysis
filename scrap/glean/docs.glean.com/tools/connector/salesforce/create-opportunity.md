---
url: "https://docs.glean.com/tools/connector/salesforce/create-opportunity"
canonical: "https://docs.glean.com/tools/connector/salesforce/create-opportunity"
title: "Create opportunity"
description: "Creates new Salesforce opportunities"
fetched_at: "2026-09-01T13:30:05.138Z"
---
On this page

The *Salesforce Create opportunity* tool creates new opportunity records in your connected Salesforce org. This write tool creates new opportunities only and does not update or delete existing opportunities.

## Limitations[​](#limitations "Direct link to Limitations")

-   As with other Salesforce tools, the exact parameter set and behavior can change over time; confirm how this tool behaves in your own environment before you depend on it for business-critical or large-scale opportunity creation.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use and have permission to create Opportunity records.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameters | Type | Description |
| --- | --- | --- |
| Account ID | String | Identifier of the related account. |
| Amount | Number | Monetary amount associated with the record. |
| Close date | String | Required. Expected or actual close date. |
| Contact ID | String | Identifier of the related contact. |
| Description | String | Additional details or notes about the opportunity. |
| Lead source | String | Source from which the lead or opportunity originated. |
| Name | String | Required. Name of the opportunity. |
| Next step | String | Planned next action or step for this opportunity. |
| Pricebook2 ID | String | Identifier of the associated price book. |
| Probability | Number | Probability (usually as a percentage) of winning. |
| Stage name | String | Required. Current stage of the opportunity. |
| Type | String | Type or category of the opportunity. |

## Usage example[​](#usage-example "Direct link to Usage example")

You need to create a new sales opportunity for a qualified prospect, linking it to their existing account and setting the initial stage and close date.

*Instruction to an agent:*

"Create a new opportunity in Salesforce for **ABC Corp Enterprise License** linked to the ABC Corp account with an amount of **$150,000**, close date **March 31, 2026**, stage **Qualification**, and probability **25%**. Set the next step to **Schedule product demo**."

*Resulting behavior:*

-   Calls Search Salesforce with SOQL to find the Account for "ABC Corp".
    
-   Retrieves the Account ID (for example, "001xx000001234567").
    
-   Calls Create opportunity with:
    
    -   `Name` set to "ABC Corp Enterprise License" (required).
        
    -   `Account ID` set to "001xx000001234567".
        
    -   `Amount` set to 150000.
        
    -   `Close date` set to "2026-03-31" (required).
        
    -   `Stage name` set to "Qualification" (required).
        
    -   `Probability` set to 25.
        
    -   `Next step` set to "Schedule product demo".
        
-   Creates a new Opportunity record in Salesforce linked to the ABC Corp account.
    
-   Returns the Opportunity ID (for example, "006xx000001234567").
    
-   Confirms the opportunity was created successfully.
    

*Workflow tip:* Always search for the Account first to get the Account ID before creating the opportunity. Three fields are required: Name, Close date, and Stage name. Combine this tool with other Salesforce tools like Create lead, Create contact, Send email, or Update Salesforce Opportunity to build complete sales workflows.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Salesforce Create opportunity tool does not appear in the agent builder

-   **Possible cause:** The Salesforce tools are not enabled or not linked to your Salesforce connector in the Glean admin console.
-   **Fix:** In the Glean admin console, go to **Platform → Tools**, add the Salesforce tools if needed, link it to your Salesforce connector instance, configure authentication, update **Publish settings**, and save. After that, Salesforce Create opportunity must appear under **Tools → By connector → Salesforce** in the agent builder.

### The tool fails with an OAuth or connected account not found error

-   **Possible cause:** The connected Salesforce account of the user is missing, inactive, or misconfigured, or the Salesforce connected app used for tools are not set up correctly.
-   **Fix:** Ask the user to re-authenticate Salesforce when prompted by Glean. If errors persist, a Glean admin must verify the Salesforce connected app configuration including callback URL and scopes, confirm that the Salesforce tools setup steps are complete, and have the user retry the tool.

### Salesforce returns validation or required-field errors when creating opportunities

-   **Possible cause:** The agent prompts and field mappings into Salesforce Create opportunity do not match your Salesforce org's schema, required fields, or validation rules, for example, required Opportunity fields such as Name, Close Date, or Stage name are not being populated.
-   **Fix:** Review how your agent prompts and maps values into this tool and confirm that your Salesforce org's defaults, required fields, and validation rules align with how the agent is creating opportunities. Update either the agent configuration like field mappings and instructions or your Salesforce configuration so they match, then retest in a sandbox before rolling out broadly.

### High-volume runs hit Salesforce API or connector limits

-   **Possible cause:** The combination of this tool, other Salesforce tools, and the Salesforce connector crawls is consuming a significant portion of your daily Salesforce API limit, or hitting connector-level size and throughput constraints.
-   **Fix:** Coordinate with your Salesforce and Glean admins to review Salesforce API usage dashboards and the Salesforce connector configuration. Consider reducing run frequency, limiting batch sizes, or staggering schedules for high-volume agents, and start with sandbox validation before enabling large-scale automated opportunity creation.

## FAQs[​](#faqs "Direct link to FAQs")

### Does this tool update existing opportunities, or only create new ones?

This tool only creates new opportunity records in Salesforce. To change existing records, use Update Salesforce Opportunity or other update-focused Salesforce tools in your agent.

### What fields are required to create an opportunity?

Three fields are required: Name, Close date, and Stage name. You will also typically need an Account ID to link the opportunity to an account. Use Salesforce Search or Search Salesforce with SOQL to find the Account ID first.

### Can I use this tool together with other Salesforce tools?

Yes. You can combine Salesforce Create opportunity with other Salesforce tools such as Create lead, Create contact, Send email, Log email activity, and Update Salesforce Opportunity to build complete sales workflows that create leads, contacts, opportunities, and track outreach in one coordinated run.

### What happens if I have multiple Salesforce orgs connected?

If you have multiple Salesforce orgs connected as separate connectors (for example, production and sandbox), the Salesforce tools must be configured to use the correct instance to avoid creating opportunities in the wrong org. Check with your Glean admin to confirm the correct configuration.
