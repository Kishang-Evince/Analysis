---
url: "https://docs.glean.com/tools/connector/salesforce/update-contact"
canonical: "https://docs.glean.com/tools/connector/salesforce/update-contact"
title: "Update contact"
description: "Updates existing Salesforce contacts"
fetched_at: "2026-09-01T13:30:06.554Z"
---
On this page

The *Salesforce Update contact* tool updates existing contact records in your connected Salesforce org. This tool updates only the specified fields and does not overwrite unspecified fields on the contact.

## Limitations[​](#limitations "Direct link to Limitations")

-   As with other Salesforce tools, the exact parameter set, field coverage, and behavior may change over time. Confirm how the tool behaves in your environment before relying on it for large-scale or fully automated updates.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use and have permission to update Contact records and write to relevant fields.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Contact ID | String | Salesforce ID of the Contact record to update. |
| Account ID | String | Updated Account ID association. Leave empty to keep unchanged. |
| First name | String | New first name to set on the contact. |
| Last name | String | New last name. |
| Email | String | Updated email address. |
| Phone | String | Primary phone number for the contact. |
| Mobile phone number | String | Mobile phone number. |
| Title | String | Job title. |
| Department | String | Department name. |
| Description | String | Free-form description or notes about the contact. |
| Birthdate | String | Contact’s birthdate. |
| Mailing street | String | Street portion of the contact's mailing address. |
| Mailing address (city) | String | City for the mailing address. |
| Mailing address (state/province) | String | State or province for the mailing address. |
| Mailing address (postal code) | String | Postal or ZIP code for the mailing address. |
| Mailing address (country) | String | Country for the mailing address. |

## Usage example[​](#usage-example "Direct link to Usage example")

You need to update a contact's job details after they changed roles at their company, searching for them first to confirm you have the right person.

*Instruction to an agent:*

"Find the contact for **[abc@example.com](mailto:abc@example.com)** in Salesforce and update her title to **VP of Product**, department to **Product Management**, and phone to **111-555-9999**."

*Resulting behavior:*

-   Calls Search Salesforce with SOQL to find contacts with email "[abc@example.com](mailto:abc@example.com)".
    
-   Retrieves the Contact ID (for example, "003xx000001234567").
    
-   Calls Update contact with:
    
    -   `Contact ID` set to "003xx000001234567".
        
    -   `Title` set to "VP of Product".
        
    -   `Department` set to "Product Management".
        
    -   `Phone` set to "111-555-9999".
        
-   Updates the specified fields on the Contact record.
    
-   All other fields (First name, Last name, Email, Account association, Mailing address, etc.) remain unchanged.
    
-   Confirms the contact was updated successfully.
    

*Workflow tip:* Always search for the contact first to get the Contact ID before updating. Only the fields you specify will be changed; all other fields remain as they are. Combine this tool with Salesforce Search, Search Salesforce with SOQL, Send email, or Log email activity to build complete contact management workflows that find contacts, update their information, and track outreach.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Salesforce Update contact tool does not appear in the agent builder

-   **Possible cause:** The Salesforce tools are not enabled or not linked to your Salesforce connector in the Glean admin console.
-   **Fix:** In the Glean admin console, go to **Platform → Tools**, add the Salesforce tools if needed, link it to your Salesforce connector instance, configure authentication, update **Publish settings**, and save. After that, Salesforce Update contact must appear under **Tools → By connector → Salesforce** in the agent builder.

### INVALID\_FIELD\_FOR\_INSERT\_UPDATE on one or more contact fields

-   **Possible cause:** The Salesforce profile of the user or permission set does not have write access to one of the fields included in the update.
-   **Fix:** In Salesforce setup, adjust field-level security or permission sets so that the user has write access to the affected Contact fields, or remove those fields from the tool configuration, then re-run the agent.

## FAQs[​](#faqs "Direct link to FAQs")

### Does Salesforce Update contact overwrite all fields on the contact?

No. The tool updates only the specified fields. Only the fields you pass into the tool are modified; all other fields remain unchanged on the record.

### How do I find the Contact ID to update?

Use Salesforce Search or Search Salesforce with SOQL to find the contact by email, name, or other criteria first. These search tools will return the Contact ID, which you can then pass to Update contact.

### Can I use this tool together with other Salesforce tools?

Yes. You can combine Update contact with Salesforce Search, Search Salesforce with SOQL, Send email, Log email activity, Create contact, or other Salesforce tools to build complete workflows that find contacts, update their information, and track outreach.
