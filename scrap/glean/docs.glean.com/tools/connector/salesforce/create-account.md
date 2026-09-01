---
url: "https://docs.glean.com/tools/connector/salesforce/create-account"
canonical: "https://docs.glean.com/tools/connector/salesforce/create-account"
title: "Create account"
description: "Creates new Salesforce account records from within Glean agents"
fetched_at: "2026-09-01T13:30:04.731Z"
---
On this page

The *Salesforce create account* tool creates new Account records in your connected Salesforce org. This is a write-only tool that creates new records each time it runs and does not update or delete existing accounts. Design workflows carefully to avoid unintentional duplicates and respect your organization's validation rules.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Billing postal code | String | Billing address postal/zip code. Examples: "94105" "10001" "60601" |
| Fax | Integer | Fax number. Examples: "(555) 123-4568" "+1-800-555-0124" |
| Shipping city | String | Shipping address city. Examples: "San Francisco" "New York" "Chicago" |
| Shipping country | String | Shipping address country. Examples: "USA" "United States" "Canada" "UK" |
| Shipping state | String | Shipping address state/province. Examples: "CA" "NY" "IL" "California" "New York" "Illinois" |
| Description | String | Text description of the account. Examples: "Leading provider of cloud solutions" "Fortune 500 company specializing in consumer goods" |
| Industry | String | Industry the account belongs to. Examples: "Agriculture" "Banking" "Biotechnology" "Communications" "Construction" "Consulting" |
| Parent ID | Integer | ID of the parent account if this is a subsidiary. Must be a valid Salesforce Account Id (15- or 18-character). Examples: "001XXXXXXXXXXXXXXX" "001xx000003DGgPAAW" |
| Shipping street | String | Shipping address street. Examples: "123 Main St" "456 Enterprise Blvd Suite 200" |
| Sic desc | String | Standard Industrial Classification (SIC) description. Examples: "Business Services" "Manufacturing" |
| Account source | String | Source of the account. Examples: "Advertisement" "Employee Referral" "External Referral" "Partner" "Public Relations" "Seminar - Internal" "Seminar - Partner" "Trade Show" "Web" "Word of mouth" "Other" |
| Billing country | String | Billing address country. Examples: "USA" "United States" "Canada" "UK" |
| Billing state | String | Billing address state/province. Examples: "CA" "NY" "IL" "California" "New York" "Illinois" |
| Name | String | Account name (required field in Salesforce). Examples: "Acme Corporation" "Global Enterprises Inc." "Tech Innovations Ltd." |
| Type | String | Type of account. Examples: "Analyst" "Competitor" "Customer" "Integrator" "Investor" "Partner" "Press" "Prospect" "Reseller" "Other" |
| Website | String | Company website URL. Examples: "[https://www.example.com](https://www.example.com)" "[www.company.com](http://www.company.com)" |
| Billing street | String | Billing address street. Examples: "123 Main St" "456 Enterprise Blvd Suite 200" |
| Phone | Integer | Phone |
| Shipping postal code | Integer | Shipping address postal/zip code. Examples: "94105" "10001" "60601" |
| Number of employees | Integer | Number of employees. Examples: 50 500 5000 |
| Annual revenue | Integer | Estimated annual revenue. Examples: 1000000 5000000 50000000 |
| Billing city | String | Billing address city. Examples: "San Francisco" "New York" "Chicago" |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Create a new Salesforce account for Abc Corporation with website abc.com."
    
-   "Add a new account in Salesforce for TechStart Inc in the technology industry."
    
-   "Set up a Salesforce account for Global Solutions with 500 employees and annual revenue of $10M."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool is not available in the agent builder

-   **Possible cause:** Salesforce is not connected as a connector, or the Salesforce tools are not enabled or published.
-   **Fix:** A Glean admin should verify that Salesforce is connected under **Admin Console → Platform → Connectors** and that the Salesforce tools are enabled and published under **Admin Console → Platform → Tools**.

### Tool fails with authorization or OAuth error

-   **Possible cause:** The Salesforce connected app is misconfigured, the user has not completed OAuth, or their account is missing required scopes for write operations.
-   **Fix:** In Salesforce Setup, verify the connected app OAuth settings (callback URL, scopes, and permitted users). Ask the user to revoke and re-authorize the Glean app in Salesforce, then re-run the agent.

### Salesforce returns a potential duplicate account error

-   **Possible cause:** Salesforce duplicate or matching rules detected an existing similar account and blocked automatic creation.
-   **Fix:** Work with your Salesforce admin to review duplicate-management rules. Consider designing agents to search for existing accounts before creating new ones.

## FAQs[​](#faqs "Direct link to FAQs")

### Can this tool update or delete existing accounts?

No. Salesforce create account only creates new records. It does not update or delete existing accounts. Use separate Salesforce tools for updates or modifications.

### Can I use this tool together with other Salesforce tools?

Yes. You can combine Salesforce create account with other Salesforce tools such as Get account, Search accounts, Create contact, Create opportunity, Send email, and Log email activity in the same agent. For a complete catalog, see the Salesforce tools documentation.

### How do I avoid creating duplicate accounts?

Design your agent workflow to search for existing accounts first using the Search accounts tool. Only create a new account if no matching record is found. Also work with your Salesforce admin to configure appropriate duplicate detection rules.

### What happens if required fields are missing?

Salesforce will return a validation error if required fields are not provided. Ensure your agent collects all required fields before calling the tool, based on your organization's field requirements and validation rules.
