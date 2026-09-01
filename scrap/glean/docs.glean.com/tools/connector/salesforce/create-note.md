---
url: "https://docs.glean.com/tools/connector/salesforce/create-note"
canonical: "https://docs.glean.com/tools/connector/salesforce/create-note"
title: "Create note"
description: "Creates Salesforce notes from within Glean agents so teams can capture context on any Salesforce record without leaving their workflow"
fetched_at: "2026-09-01T13:30:05.151Z"
---
On this page

The *Salesforce Create note* tool creates note records attached to Salesforce records in the org connected to your Glean tenant. This write tool creates new notes only and does not update or delete existing notes.

## Limitations[​](#limitations "Direct link to Limitations")

-   As with other Salesforce tools, the exact parameter set and behavior can change over time; confirm how this tool behaves in your own environment before you depend on it for business-critical or large-scale note creation.
    
-   This tool creates a new note each time it runs. If you re-run an agent on the same record with similar inputs, you may end up with multiple similar notes unless you add your own checks or review steps.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use and have permission to create notes on the target records.
    
-   For multiple Salesforce orgs, the Salesforce tools must be configured to use the correct instance.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameters | Type | Description |
| --- | --- | --- |
| Body | String | Content or main text of the item. |
| Is private | Boolean | Indicates whether the item is private. |
| Owner ID | String | Identifier of the owner of the item. |
| Parent ID | String | Required. Identifier of the parent item. |
| Title | String | Required. Title or name of the item. |

## Usage example[​](#usage-example "Direct link to Usage example")

You need to document key discussion points from a recent customer call on the relevant Salesforce Opportunity record so your team has context for the upcoming renewal negotiation.

*Instruction to an agent:*

"Find the Opportunity for **XYZ Corp renewal** and create a note summarizing the key points from today's call: customer requested volume discount, concerned about support response times, interested in premium tier."

*Resulting behavior:*

-   Calls a Salesforce search tool to find the Opportunity matching "XYZ Corp renewal".
    
-   Retrieves the Opportunity ID (for example, "006xx000001234567").
    
-   Calls Create note with:
    
    -   `Parent ID` set to "006xx000001234567" (the Opportunity ID).
        
    -   `Title` set to "Customer Call Summary - Dec 11, 2025".
        
    -   `Body` set to "Key points from today's call: Customer requested volume discount for renewal. Expressed concerns about support response times. Interested in upgrading to premium tier for additional features."
        
    -   `Is private` set to false to share with the team.
        
-   Creates a new note record attached to the Opportunity.
    
-   The note appears in the Salesforce Opportunity's activity feed.
    
-   Team members viewing the Opportunity can see the documented call context.
    

*Workflow tip:* Combine this tool with Salesforce search or SOQL tools to find the right record first, then create the note. You can also use this tool in loops to create notes on multiple records or combine it with other Salesforce write tools to both update fields and log context. Always validate behavior in a sandbox before high-volume runs.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool is not available in the agent builder

-   **Possible cause:** Salesforce is not connected as a connector, or the Salesforce tools are not enabled and configured in your Glean deployment.
-   **Fix:** In the Admin console, confirm that Salesforce is connected as a connector and that the Salesforce tools are enabled. After that, the Salesforce tools appear under **Tools → By connector → Salesforce** in the agent builder.

### Tool fails with an authorization or OAuth error

-   **Possible cause:** The Salesforce OAuth app is not configured correctly, for example, callback URL, Consumer Key, or Consumer Secret, or the user running the agent has not completed the required Salesforce authorization flow from Glean.
-   **Fix:** Have the user retry the agent and complete the Salesforce authorization prompt. If errors persist, a Glean admin should re-check the OAuth setup on the Salesforce Tools Setup page and re-run the configuration steps.

### Notes are created on the wrong record or with unexpected content

-   **Possible cause:** The agent is not reliably passing the correct Salesforce record identifier into the Salesforce Create note tool, or its prompts are too broad, so it pulls context from the wrong place or mixes multiple records together.
-   **Fix:** Update the flow so it clearly identifies and surfaces the target record before calling Salesforce Create note, for example, by adding a prior Salesforce search step and explicit confirmation, and refine the step instructions to pass the exact record ID and a focused, well-scoped summary into the note content.

## FAQs[​](#faqs "Direct link to FAQs")

### How does this tool authenticate to Salesforce?

Salesforce tools use the Salesforce tools configuration set up by your admin, which points at an existing Salesforce connector and uses an OAuth app configured in Salesforce. The pack configuration is shared, but each user must authorize Glean to access Salesforce as them the first time they run tools.

### Can I use this tool together with other Salesforce tools?

Yes. You can combine Salesforce Create note with other Salesforce tools such as Search Salesforce with SOQL, Salesforce Search, or Update Salesforce Opportunity in the same agent so that the flow can look up records, update fields, and log notes in a coordinated way.

### Does this tool run automatically or require user confirmation?

Whether this write tool can run automatically without explicit user confirmation depends on how your admin has configured in-line execution for write tools in the Admin console.
