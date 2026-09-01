---
url: "https://docs.glean.com/tools/connector/salesforce/create-contact"
canonical: "https://docs.glean.com/tools/connector/salesforce/create-contact"
title: "Create contact"
description: "Creates new Salesforce contacts from within Glean agents so teams can capture people in Salesforce"
fetched_at: "2026-09-01T13:30:04.968Z"
---
On this page

The *Salesforce Create contact* tool creates new contact records in your connected Salesforce org. This write tool creates a new contact each time it runs and does not update or delete existing contacts.

## Limitations[​](#limitations "Direct link to Limitations")

-   As with other Salesforce tools, the exact parameter set and behavior can change over time. Confirm how this tool behaves in your own environment before you depend on it for large-scale or fully automated contact creation.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use and have permission to create Contact records.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameters | Type | Description |
| --- | --- | --- |
| Account ID | String | Unique identifier for the account. |
| Birthdate | String | Birthdate of the individual. |
| Department | String | Department the individual belongs to. |
| Description | String | Additional details or notes about the record. |
| Email | String | Primary email address. |
| First name | String | First name of the individual. |
| Last name | String | **Required.** Last name of the individual. |
| Lead source | String | Source from which the lead was acquired. |
| Mailing city | String | City for the mailing address. |
| Mailing country | String | Country for the mailing address. |
| Mailing postal code | String | Postal or ZIP code for the mailing address. |
| Mailing state | String | State or province for the mailing address. |
| Mailing street | String | Street address for mailing. |
| Mobile phone | String | Mobile phone number. |
| Phone | String | Primary phone number. |
| Title | String | Job title or role of the individual. |

## Usage example[​](#usage-example "Direct link to Usage example")

You need to add a new contact to Salesforce for a customer representative you met at a conference, checking first to avoid creating a duplicate if they already exist in your system.

*Instruction to an agent:*

"Check if a contact exists in Salesforce for **[abc@example.com](mailto:abc@example.com)**. If not found, create a new contact for **ABC JIM**, Director of Product at **XYZ Solutions**, phone **123-555-0789**, located in **Palo Alto, CA**, and associate her with the YXZ account."

*Resulting behavior:*

-   Calls a Salesforce search tool to find contacts with email "[abc@example.com](mailto:abc@example.com)".
    
-   No existing contact found, so proceeds with creation.
    
-   Calls Search Salesforce with SOQL to find the Account ID for "XYZ Solutions".
    
-   Retrieves the Account ID (for example, "001xx000001234567").
    
-   Calls Create contact with:
    
    -   `First name` set to "ABC".
        
    -   `Last name` set to "JIM" (required).
        
    -   `Email` set to "[abc@example.com](mailto:abc@example.com)".
        
    -   `Title` set to "Director of Product".
        
    -   `Phone` set to "123-555-0789".
        
    -   `Account ID` set to "001xx000001234567".
        
    -   `Mailing city` set to "Palo Alto".
        
    -   `Mailing state` set to "CA".
        
    -   `Mailing country` set to "United States".
        
-   Creates a new Contact record in Salesforce linked to the XYZ Solutions account.
    
-   Returns the Contact ID (for example, "003xx000001234567").
    
-   Confirms the contact was created and associated with the correct account.
    

*Workflow tip:* Always search for existing contacts by email before creating to avoid duplicates. Combine this tool with Salesforce Add contact to campaign, Salesforce Associate contact to account, or Salesforce Send email to build complete contact management workflows. For bulk operations, process contacts from structured sources like Google Sheets by iterating through rows.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Salesforce Create contact tool does not appear in the Agent Builder

-   **Possible cause:** The Salesforce tools are not added or published in your Glean deployment.
-   **Fix:** In the Glean admin console, go to **Platform → Tools**, add the Salesforce tools if it is not present already, link it to your Salesforce connector instance, configure authentication, update **Publish settings**, and save. After that, Salesforce Create contact must appear under **Tools → By connector → Salesforce** in the agent builder.

### Tool fails with an authorization or OAuth error

-   **Possible cause:** The Salesforce OAuth app is not configured correctly (callback URL, Consumer Key, or Consumer Secret), or the user running the agent has not completed the required Salesforce authorization flow from Glean.
-   **Fix:** Have the user retry the agent and complete the Salesforce auth prompt. If errors persist, a Glean admin must re-check the OAuth setup on the Salesforce Tools Setup page and re-run the configuration steps.

### Contacts are created but owners or field values are not what you expect

-   **Possible cause:** The prompts and field mappings of the agent into the Salesforce Create contact tool do not match your Salesforce org's schema or defaulting rules, for example, default contact owner or required custom fields.
-   **Fix:** Review how your agent prompts and maps values into the Salesforce Create contact tool, and confirm that your Salesforce org's defaults, required fields, and validation rules align with how the agent is creating contacts. Update either the agent configuration or your Salesforce configuration so they match.

## FAQs[​](#faqs "Direct link to FAQs")

### Does this tool deduplicate or update existing contacts?

No. This tool always attempts to create a new contact. It does not check for existing contacts or update them. To avoid duplicates, design your agent to search for existing contacts, for example, by email address before calling Salesforce Create contact, and branch accordingly.

### Can I use this tool together with other Salesforce contact tools?

Yes. You can combine Salesforce Create contact with other Salesforce tools such as Salesforce Search, Search Salesforce with SOQL, Salesforce Add contact to campaign, Salesforce Associate contact to account, Salesforce Send email, and Salesforce Log email activity in the same agent so the flow can look up records, create new contacts, send follow-up emails, and log activity in a coordinated way.

### What happens if I omit required fields?

The tool must comply with your Salesforce org's required fields, validation rules, and defaulting behavior. If the agent omits required fields or passes values that conflict with validation rules, Salesforce will reject the request and the tool will fail. Check the agent run details and Salesforce error messages to identify missing fields.
