---
url: "https://docs.glean.com/tools/connector/salesforce/update-salesforce-opportunity"
canonical: "https://docs.glean.com/tools/connector/salesforce/update-salesforce-opportunity"
title: "Update Salesforce opportunity"
description: "Updates fields on existing Salesforce opportunity records from within Glean"
fetched_at: "2026-09-01T13:30:06.578Z"
---
On this page

This tool allows Glean agents to update specific fields on any Salesforce Opportunity that the user has access to. It integrates with your organization’s unique Salesforce schema, supporting both standard and custom fields.

## Limitations[​](#limitations "Direct link to Limitations")

-   As with other Salesforce actions, the exact parameter set and behavior can change over time. Confirm behavior in your own environment and review the action schema in the agent builder before relying on this action for large-scale or fully automated opportunity updates.
-   You can add this action to auto mode agents.
-   Each update in a batch requires separate user confirmation. There is no bulk confirm option.
-   Users must specify text instructions in the step if new information must be appended to existing data rather than replacing it.
-   Only fields the user has view and edit permissions for in Salesforce are visible and updatable.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean.
    
-   An admin must enable the Salesforce tools and complete [Salesforce tools setup](/administration/tools/setup-tools/salesforce-tools-setup) including OAuth configuration.
    
-   Users must authenticate for Salesforce actions on first use and have permission to update Opportunity records.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

The only required parameter is the Opportunity ID. Beyond that, this action accepts any Opportunity field that is marked as updatable in the metadata of your Salesforce org, including custom fields. The available fields are retrieved dynamically from Salesforce at runtime, so the exact set depends on the schema of your organization and the field-level permissions of the user.

At least one field besides Opportunity ID must be provided for the update.

Common standard fields include:

| Parameter | Type | Description |
| --- | --- | --- |
| Opportunity ID | String | Required. Salesforce ID of the opportunity record to update. |
| Name | String | Name of the opportunity. |
| Stage name | String | Current stage of the opportunity (for example, Prospecting, Negotiation, Closed Won). |
| Close date | Date | Expected or actual close date for the opportunity. |
| Amount | Number | Monetary amount associated with the opportunity. |
| Forecast category | String | Forecast category (for example, Pipeline, Best Case, Commit). |
| Next step | String | Planned next action or step for this opportunity. |
| Description | String | Additional details or notes about the opportunity. |
| Probability | Number | Probability (as a percentage) of winning the opportunity. |
| Lead source | String | Source from which the opportunity originated. |

To see the full list of updatable fields for your org, open the agent builder and use the dropdown to select fields from the Salesforce schema of your org.

## Set up in Agent Builder[​](#set-up-in-agent-builder "Direct link to Set up in Agent Builder")

1.  In Agent Builder, select the Salesforce update tool by navigating to **Select Step → Tools → By connector → Salesforce → Update Salesforce Opportunity**.
2.  Configure which Opportunity fields to update by selecting fields from your organization's Salesforce schema using the dropdown.
3.  For each field, decide if the value will be filled by AI, chosen from a set, set as a fixed value, or provided by the user at runtime.
4.  Add instructions to guide how particular fields should be filled out.
5.  Save and deploy the agent.

## Usage example[​](#usage-example "Direct link to Usage example")

You need to update an existing opportunity after a customer call, moving it to the next pipeline stage and adjusting the expected close date.

*Instruction to an agent:*

"Find the **Acme Corp Enterprise License** opportunity in Salesforce and update the stage to **Negotiation**, move the close date to **June 30, 2026**, and set the next step to **Send revised proposal**."

*Resulting behavior:*

-   Calls Search Salesforce with SOQL to find the Opportunity named "Acme Corp Enterprise License".
    
-   Retrieves the Opportunity ID (for example, `006xx000001234567`).
    
-   Displays the current values for the selected fields alongside the proposed updates for review.
    
-   After user confirmation, calls Update opportunity with:
    
    -   `Opportunity ID` set to `006xx000001234567` (required).
        
    -   `Stage name` set to "Negotiation".
        
    -   `Close date` set to "2026-06-30".
        
    -   `Next step` set to "Send revised proposal".
        
-   All other fields (Amount, Probability, Lead Source, and others) remain unchanged.
    
-   Confirms the opportunity was updated successfully and provides a direct link to the updated record in Salesforce.
    

*Workflow tip:* Always search for the opportunity first to get the Opportunity ID before updating. Combine this action with Search opportunities or Search Salesforce with SOQL to identify the correct record, and use Get opportunity to verify current field values before making changes.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Update Salesforce opportunity tool does not appear in the agent builder

-   **Possible cause:** The Salesforce tools are not enabled or not linked to your Salesforce connector in the Admin console.
-   **Fix:** In the Glean admin console, go to **Platform → Tools**, add the Salesforce tools if needed, link them to your Salesforce connector instance, configure authentication, update **Publish settings**, and save. After that, Update Salesforce opportunity should appear under **Tools → By connector → Salesforce** in the agent builder.

### The action fails with an OAuth or connected account not found error

-   **Possible cause:** The connected Salesforce account of the user is missing, inactive, or misconfigured, or the Salesforce connected app used for actions is not set up correctly.
-   **Fix:** Ask the user to re-authenticate Salesforce when prompted by Glean. If errors persist, a Glean admin should verify the Salesforce connected app configuration including the callback address and scopes, confirm that the [Salesforce tools setup](/administration/tools/setup-tools/salesforce-tools-setup) steps are complete, and have the user retry the action.

### Salesforce returns validation or required-field errors when updating opportunities

-   **Possible cause:** The field mappings of the agent or instructions don't match the schema of your Salesforce org, required fields, or validation rules.
-   **Fix:** Review how your agent maps values into this action and confirm that your defaults, required fields, and validation rules Salesforce org align with how the agent is updating opportunities. Update either the agent configuration (field mappings and instructions) or your Salesforce configuration so they match, then retest in a sandbox before rolling out.

### A field the user expects to update is not visible

-   **Possible cause:** The user does not have view or edit permissions for that field in Salesforce, or the field type is not supported in this release.
-   **Fix:** Verify the Salesforce profile of the user and field-level security settings. Confirm the field appears in the field dropdown of the agent builder. If the field is a complex or custom type, check whether it is supported by reviewing the available fields in the agent builder.

## FAQs[​](#faqs "Direct link to FAQs")

### Does this action overwrite all fields on the opportunity?

No. The action updates only the fields you specify. All other fields remain unchanged on the record.

### How do I find the Opportunity ID to update?

Use Search opportunities or Search Salesforce with SOQL to find the opportunity by name, account, stage, or other criteria first. These search actions return the Opportunity ID, which you can then pass to Update opportunity.

### Can I update custom fields?

Yes. The action dynamically retrieves updateable fields from your Salesforce metadata at runtime, including custom fields. If a custom field is marked as updateable in Salesforce and the authenticated user has edit permissions, it is available. Select custom fields from your organization's schema using the dropdown in the agent builder.

### Can I use this action together with other Salesforce actions?

Yes. You can combine Update Salesforce opportunity with other Salesforce actions such as Search opportunities, Get opportunity, Create opportunity, and Send email to build complete sales workflows that search for deals, verify current values, apply updates, and trigger follow-up outreach in one coordinated run.

### What happens when users review updates before they are applied?

By default, write tools use a human-in-the-loop review flow. The agent displays the current field values alongside proposed changes, and the user must confirm before the update is submitted to Salesforce. See [Human-in-the-loop experience for tools](/tools/human-in-the-loop-experience-for-tools) for details.

## See also[​](#see-also "Direct link to See also")

-   [Update Salesforce opportunities in Glean](/user-guide/assistant/update-salesforce-opportunities) - end-user guide for updating opportunities using natural language.
-   [Salesforce tools setup](/administration/tools/setup-tools/salesforce-tools-setup) - admin guide for enabling the Salesforce tools and configuring authentication.
-   [Create opportunity](/tools/connector/salesforce/create-opportunity) - tool reference for creating new opportunities.
-   [Search opportunities](/tools/connector/salesforce/search-opportunities) - tool reference for finding opportunities by name, account, stage, or other criteria.
