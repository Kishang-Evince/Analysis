---
url: "https://docs.glean.com/tools/connector/salesforce/send-email"
canonical: "https://docs.glean.com/tools/connector/salesforce/send-email"
title: "Send email"
description: "Send emails through Salesforce as part of multi-step Glean agents so sellers can trigger outreach without leaving Glean"
fetched_at: "2026-09-01T13:30:06.371Z"
---
On this page

The *Salesforce Send email* tool sends emails through your connected Salesforce org to specified recipients. This write tool sends a single new email each time it runs. Repeating the same step will send duplicate emails.

## Limitations[​](#limitations "Direct link to Limitations")

-   Email delivery can fail if identity data is incomplete for the target user, for example, missing *Department* attributes in Okta in some environments.

-   As with other Salesforce tools, the exact parameter set and behavior can change over time. Confirm how this tool behaves in your own environment before you depend on it for large-scale or fully automated contact creation.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup.
    
-   Users must authenticate for Salesforce tools on first use.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Attachment ids | String | Files you want to attach to the email, referenced by their Salesforce IDs (for example, 068…, 015…, or 069…). You can provide one or more IDs as a comma-separated string or as a list. |
| Bcc addresses | String | Recipients who get a private copy of the email. Other recipients will not see these addresses; provide one address or a comma-separated list. |
| Body | String | Required. Main content of the email message. Can be plain text or HTML depending on the value of is\_html. |
| Cc addresses | String | Recipients to copy on the email. Visible to all recipients; provide one address or a comma-separated list. |
| Is html | Boolean | Set to true if the email body contains HTML formatting (such as bold text, links, or paragraphs); leave false for plain-text messages. |
| Log email | Boolean | Choose whether to automatically log this email to the recipient’s activity timeline in Salesforce. Turn on to keep a record in Salesforce. |
| Org wide email address ID | String | Salesforce Org-Wide Email Address ID to send from a shared company address so the email appears from that approved address. |
| Recipient ID | String | Salesforce ID of the person you are emailing (for example, a Lead, Contact, or Person Account), used for logging and merge fields. |
| Related record ID | String | Salesforce ID of the record you want to relate this email to (such as an Account, Opportunity, or Case) so it appears on that record’s timeline and can use related merge fields. |
| Sender address | String | Email address to send from, typically used with an org-wide email address. If you do not know the ID, you can provide the actual org-wide email address (for example, [noreply@company.com](mailto:noreply@company.com)) so the system can look up the correct ID. |
| Sender type | String | Determines who the email is sent from. Use CurrentUser (default) to send as the current user or OrgWideEmailAddress to send from a shared company address. |
| Subject | String | Required. Subject line of the email. |
| To addresses | String | Required. Primary recipient email addresses. You can provide a single address, a comma-separated string of addresses, or a list. |

## Usage example[​](#usage-example "Direct link to Usage example")

You have a new qualified lead from your marketing team and need to send a personalized introduction email through Salesforce, then update the lead status to show your outreach.

*Instruction to an agent:*

"Find the lead for **ABC JIM at XYZ Corp** in Salesforce, send her a personalized introduction email with subject **Partnership Opportunity with Your Company**, include our value proposition in the body, and update her lead status to **Working - Contacted**."

*Resulting behavior:*

-   Calls a Salesforce search tool to find the Lead matching "ABC JIM at XYZ Corp".
    
-   Retrieves the Lead ID (for example, "00Qxx000001234567") and email address.
    
-   Calls Send email with:
    
    -   `To addresses` set to abc's email address (for example, "[abc.jim@example.com](mailto:abc.jim@example.com)").
        
    -   `Subject` set to "Partnership Opportunity with Your Company".
        
    -   `Body` set to personalized email content with value proposition.
        
    -   `Is html` set to true to include formatting.
        
    -   `Recipient ID` set to "00Qxx000001234567" (the Lead ID).
        
    -   `Log email` set to true to record on the Lead's activity timeline.
        
    -   `Sender type` set to "CurrentUser" to send as the authenticated user.
        
-   Sends the email through Salesforce.
    
-   Logs the email on the Lead's activity timeline in Salesforce.
    
-   Calls Update lead tool to change status to "Working - Contacted".
    
-   Confirms the email was sent and the Lead status updated.
    

*Workflow tip:* Combine this tool with Salesforce search to find leads or contacts first, then send personalized emails. Use the Log email parameter to automatically record the email on the recipient's timeline, or call Log email activity separately for more control. You can also combine with conditional logic to send different email templates based on lead properties like industry or region.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Emails are not delivered

-   **Possible cause:** The outbound email is not configured for your deployment, for example, SendGrid and proactive email flags are not set correctly.
-   **Fix:** Work with your Glean admin to review email configuration and, for self-hosted environments, confirm that SendGrid and related settings match your production configuration.

### Tool runs successfully but no one receives the email

-   **Possible cause:** The recipients do not have a valid mailbox, or their identity attributes such as Department from Okta are not correctly populated and synced into Glean.
-   **Fix:** Verify that the recipients have a valid mailbox and that their identity attributes such as Department from Okta are correctly populated and synced into Glean. Update the user attributes in your identity provider, wait for people data to re-sync, and then re-run the agent.

### Emails arrive but subject and body are blank

-   **Possible cause:** The agent step before Salesforce Send email is not producing the expected subject and body text, or these values are not passed into the tool step.
-   **Fix:** Confirm that the agent step before Salesforce Send email is producing the expected subject and body text, and that these values are passed into the tool step. If the setup looks good, capture a run log or screenshot of the agent configuration and open a Glean support ticket referencing the blank message from the Send email tool, including your agent ID.

### The tool fails with an OAuth or connected account not found error

-   **Possible cause:** The connected Salesforce account of the user is missing, inactive, or misconfigured, or the Salesforce connected app used for tools are not set up correctly.
-   **Fix:** Ask the user to re-authenticate Salesforce when prompted by Glean. If errors persist, a Glean admin must verify the Salesforce connected app configuration including callback URL and scopes, confirm that the Salesforce tools setup steps are complete, and have the user retry the tool.

## FAQs[​](#faqs "Direct link to FAQs")

### Does this tool send emails from Salesforce or directly from Glean?

The Salesforce Send email tool sends the message through Salesforce, using the Salesforce connection that your Glean admin configured.

### Can I use this tool together with Salesforce Create lead and Update lead?

Yes, this tool is designed to work alongside Salesforce hero tools such as Create lead and Update lead, for example to create a lead from a Google Sheet, send a tailored intro email, and then move the lead to Working in a single guided flow.
