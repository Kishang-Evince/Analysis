---
url: "https://docs.glean.com/tools/connector/salesforce/associate-contact-to-account"
canonical: "https://docs.glean.com/tools/connector/salesforce/associate-contact-to-account"
title: "Associate contact to account"
description: "Links existing Salesforce contacts to accounts to maintain relationships"
fetched_at: "2026-09-01T13:30:04.569Z"
---
On this page

The *Salesforce associate contact to account* tool links an existing Salesforce contact record to a specific account. This is a write tool that enables agents to create or correct person-account relationships in Salesforce automatically.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    
-   The Salesforce user must have permission to work with the relevant account and contact records.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Account ID | String | The unique identifier of the Salesforce account to associate the contact with. Required. |
| Contact ID | String | The unique identifier of the Salesforce contact to link to the account. Required. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Link contact ID 003PZ000001rbt8YAA to account ID 001PZ000003xyzABC."
    
-   "Associate Abc Xyz's contact record with the Pqr Corporation account."
    
-   "Connect the new contact to account ID 001PZ000004defGHI."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool does not appear in the agent builder

-   **Possible cause:** The Salesforce tools are not added or published in your Glean deployment.
-   **Fix:** In the Glean admin console, go to **Platform → Tools**, add the Salesforce tools, link it to your Salesforce connector, configure authentication, update **Publish settings**, and save. After that, Salesforce tools should appear under **Tools → By connector → Salesforce**.

### Tool fails with OAuth or connected account error

-   **Possible cause:** The user's connected Salesforce account is missing, inactive, or misconfigured, or the Salesforce connected app is not set up correctly.
-   **Fix:** Ask the user to re-authenticate Salesforce when prompted by Glean. If errors persist, verify the Salesforce connected app configuration (callback URL and scopes) and confirm that Salesforce Tools Setup is complete.

### Tool succeeds but contact is not associated to account

-   **Possible cause:** Salesforce rejected the request due to validation rules, missing required fields, insufficient permissions, or incorrect account or contact identifiers.
-   **Fix:** Check agent run details and Salesforce error messages. Adjust required fields, validation rules, or user permissions. Verify that the account ID and contact ID are correct and that the user has access to both records.

### Repeated associations of same contact and account

-   **Possible cause:** The tool's idempotency behavior may allow multiple association attempts for the same contact and account.
-   **Fix:** Design your agent workflow to check if the contact is already associated with the account before calling this tool. Validate the behavior in your Salesforce org before using in high-volume automated workflows.

## FAQs[​](#faqs "Direct link to FAQs")

### What happens if the contact is already associated with another account?

Salesforce allows a contact to be associated with multiple accounts depending on your org configuration. This tool will create or update the relationship. Check your Salesforce org's account-contact relationship settings to understand the specific behavior.

### Can I disassociate a contact from an account?

This tool only creates or updates associations. To remove a contact-account relationship, you would need to use a different Salesforce tool or perform the operation directly in Salesforce.

### How do I find the account ID and contact ID?

You can find IDs in Salesforce by navigating to the respective records and copying the IDs from the URLs, or use Search contacts and Search accounts tools to programmatically find the IDs based on names or other criteria.
