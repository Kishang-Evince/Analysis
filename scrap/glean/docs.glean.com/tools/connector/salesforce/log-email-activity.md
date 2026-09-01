---
url: "https://docs.glean.com/tools/connector/salesforce/log-email-activity"
canonical: "https://docs.glean.com/tools/connector/salesforce/log-email-activity"
title: "Log email activity"
description: "Records email interactions as EmailMessage activity on Salesforce records"
fetched_at: "2026-09-01T13:30:05.943Z"
---
On this page

The *Salesforce Log email activity* tool creates EmailMessage records in Salesforce to log email interactions on CRM records without actually sending the email. This write tool accepts structured email content including HTML body and addressing fields from earlier steps in a Glean agent and links the logged email to leads, contacts, opportunities, or cases.

## Limitations[​](#limitations "Direct link to Limitations")

-   This tool only logs an email as an EmailMessage record and it does not actually send the email. To send, you have to use Salesforce Send email and optionally pair it with Log email activity in the same agent.
    
-   As with other Salesforce tools, the exact parameter set and behavior can change over time. Confirm how this tool behaves in your own environment before you depend on it for large-scale or fully automated contact creation.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use and have permission to create EmailMessage records and write to fields such as IsExternallyVisible.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| From address | String | Email address that should be recorded as the sender of the logged email. |
| Related to ID | Integer | ID of the record to associate this email with. |
| Subject | String | Subject line of the email. |
| To address | String | Email addresses of the recipients (comma-separated if multiple). |
| Bcc address | String | BCC email addresses (comma-separated if multiple). |
| Cc address | String | One or more CC recipient addresses to store with the logged email. |
| Html body | String | HTML body of the email to record as the EmailMessage content. |
| Is client managed | String | Whether the email is client-managed (not sent through Salesforce). |
| Is externally visible | String | Whether this is an incoming email (true) or outgoing email (false). |
| Is incoming | Boolean | Whether this is an incoming email (true) or outgoing email (false). |
| Message date | Date/time | Date/time the email was sent in ISO format. Defaults to current time if not provided. |
| Parent ID | Integer | ID of the parent record, typically a Case for case-related emails. |
| Status | String | Status of the email. 0=New, 1=Read, 2=Replied, 3=Sent, 4=Forwarded, 5=Draft Examples: "0" "3" "5" |
| Text body | String | Plain text body of the email. |

## Usage example[​](#usage-example "Direct link to Usage example")

You need to log a follow-up email that was sent to a customer about an open support case, recording the email content in Salesforce so your support team has a complete activity history.

*Instruction to an agent:*

"Log the follow-up email I sent to **[abc.jim@example.com](mailto:abc.jim@example.com)** about Case **00001234** with subject **Re: Technical Issue Resolution**, including the email body and mark it as sent."

*Resulting behavior:*

-   Calls a Salesforce search tool to find the Case matching "00001234".
    
-   Retrieves the Case ID (for example, "500xx000001234567") and related Contact ID.
    
-   Calls Log email activity with:
    
    -   `From address` set to your email address (for example, "[support@example.com](mailto:support@example.com)").
        
    -   `To address` set to "[abc.jim@example.com](mailto:abc.jim@example.com)".
        
    -   `Subject` set to "Re: Technical Issue Resolution".
        
    -   `Html body` set to the email content with formatting.
        
    -   `Text body` set to plain text version of the email.
        
    -   `Message date` set to the current date and time when the email was sent.
        
    -   `Parent ID` set to "500xx000001234567" (the Case ID).
        
    -   `Related to ID` set to the Contact ID for John Doe.
        
    -   `Status` set to "3" (Sent).
        
    -   `Is incoming` set to false (outgoing email).
        
    -   `Is externally visible` set to true to make it visible on the customer portal.
        
-   Creates a new EmailMessage record in Salesforce.
    
-   The logged email appears in the Case activity timeline.
    
-   Support team members viewing the Case can see the complete email history.
    

*Workflow tip:* Use this tool after sending emails outside Salesforce to maintain a complete activity record. For emails sent through Salesforce Send email tool, you can either use the built-in logging option or call this tool separately for more control. Combine with Salesforce search to find the right Case, Lead, Contact, or Opportunity IDs before logging.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool fails with INVALID\_FIELD\_FOR\_INSERT\_UPDATE mentioning IsExternallyVisible

-   **Possible cause:** The Salesforce profile or permission set for the connected user cannot write to the IsExternallyVisible field.
-   **Fix:** In Salesforce Setup, update field-level security or permission sets so that the profile of the user has write access to IsExternallyVisible or remove this field from the tool configuration, if appropriate, then retry the tool.

### Tool fails with an authorization or OAuth error

-   **Possible cause:** The Salesforce OAuth app is not configured correctly (callback URL, Consumer Key, or Consumer Secret), or the user running the agent has not completed the required Salesforce authorization flow from Glean.
-   **Fix:** Have the user retry the agent and complete the Salesforce auth prompt. If errors persist, a Glean admin must re-check the OAuth setup on the Salesforce Tools Setup page and re-run the configuration steps.

## FAQs[​](#faqs "Direct link to FAQs")

### Does this tool send an email, or only log it?

This tool only logs an email interaction as an EmailMessage record in Salesforce. To actually send an email, use the Salesforce Send email tool and, if needed, combine it with Salesforce Log email activity in the same agent.

### When should I use Salesforce Log email activity instead of the log\_email option on Salesforce Send email?

Use Salesforce Log email activity when you need an explicit, standalone step to record an email interaction, for example, when the email was generated or sent outside Salesforce Send email, or when you want separate control over how and when the activity is logged. Use the log\_email flag on Salesforce Send email when you want sending and logging to happen together in one tool.
