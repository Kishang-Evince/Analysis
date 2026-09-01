---
url: "https://docs.glean.com/tools/connector/salesforce/call-log"
canonical: "https://docs.glean.com/tools/connector/salesforce/call-log"
title: "Create call log"
description: "Creates structured call logs in Salesforce"
fetched_at: "2026-09-01T13:30:04.591Z"
---
On this page

The *Salesforce Create call log* tool creates Task records in Salesforce representing calls with key details such as subject, call date, disposition, and comments. This write tool creates new Task records only and does not update existing call logs. It returns the Salesforce Task identifier for downstream steps or reference.

## Limitations[​](#limitations "Direct link to Limitations")

-   This tool creates a new Task record each time it runs. Re-running with similar inputs creates duplicate call logs unless you add your own checks.
    
-   As with other Salesforce tools, the exact parameter set and behavior can change over time. Confirm how this tool behaves in your own environment before you depend on it for large-scale or fully automated call log creation.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use and have permission to create Task records and edit relevant fields.
    
-   For multiple Salesforce orgs, the Salesforce tools must be configured to use the correct instance.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Description |
| --- | --- |
| Call date | Date/time stored on the call log to represent when the call took place. |
| Call disposition | Outcome or status label for the call, using values configured in your Salesforce instance, for example, connected, no answer, left voicemail. |
| Call duration seconds | Duration of the call in seconds |
| Call type | Type of call made. Examples: "Inbound" "Outbound" "Internal" |
| Subject | Short subject line for the call log; used as the Task subject in Salesforce. |
| Comments | Free‑form notes about the conversation, including context, key points, and follow‑ups. |
| What ID | ID of the related record (Account, Opportunity, Case, etc.) associated with the call. |
| Who ID | ID of the Contact or Lead associated with the call. |

## Usage example[​](#usage-example "Direct link to Usage example")

You just completed a discovery call with a prospective customer and need to log the call details in Salesforce with key discussion points and next steps.

*Instruction to an agent:*

"Log a call for the Opportunity **XYZ Corp Q1 Deal** with subject **Discovery Call**, call type **Outbound**, duration **30 minutes**, disposition **Connected - Interested**, and include notes: discussed their pain points with current solution, interested in our enterprise tier, scheduling technical demo for next week."

*Resulting behavior:*

-   Calls a Salesforce search tool to find the Opportunity matching "XYZ Corp Q1 Deal".
    
-   Retrieves the Opportunity ID (for example, "006xx000001234567") and related Contact ID.
    
-   Calls Create call log with:
    
    -   `Subject` set to "Discovery Call".
        
    -   `Call date` set to current date and time.
        
    -   `Call type` set to "Outbound".
        
    -   `Call duration seconds` set to 1800 (30 minutes).
        
    -   `Call disposition` set to "Connected - Interested".
        
    -   `What ID` set to "006xx000001234567" (the Opportunity ID).
        
    -   `Who ID` set to the Contact ID associated with the Opportunity.
        
    -   `Comments` set to "Discussed their pain points with current solution. Interested in our enterprise tier with advanced features. Scheduling technical demo for next week with their engineering team."
        
-   Creates a new Task record in Salesforce representing the call.
    
-   Returns the Task ID (for example, "00Txx000001234567").
    
-   The call log appears in the Salesforce Opportunity's activity history.
    
-   Team members can view the call details and follow up appropriately.
    

*Workflow tip:* Combine this tool with Salesforce search to find the right record first. You can also use this in multi-step agents that read meeting transcripts, extract key points, and automatically log calls. For advanced workflows, use the returned Task ID in downstream steps to link related activities or trigger notifications.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool fails with an authorization or OAuth error

-   **Possible cause:** The Salesforce OAuth app is not configured correctly (callback URL, Consumer Key, or Consumer Secret), or the user running the agent has not completed the required Salesforce authorization flow from Glean.
-   **Fix:** Have the user retry the agent and complete the Salesforce auth prompt. If errors persist, a Glean admin must re-check the OAuth setup on the Salesforce Tools Setup page and re-run the configuration steps.

### Salesforce returns a field or permission error when creating the call log

-   **Possible cause:** The Salesforce user does not have access to one or more fields used by the tool, or required fields in Salesforce are missing from the payload.
-   **Fix:** Work with a Salesforce admin to check task field-level security and required fields for the relevant record type. Adjust the profile or permission of the user, set or update the agent prompt so it only fills fields the user can write.

### The tool does not appear in the Agent Builder

-   **Possible cause:** The Salesforce tools are not added, or the specific tool is not published to be used by agents.
-   **Fix:** In the Glean admin console, confirm that the Salesforce tools are enabled and that the Log call tool is included and published. Then reopen the Agent Builder and search for the tool by name.

## FAQs[​](#faqs "Direct link to FAQs")

### Where do I see the logged call in Salesforce?

The tool creates a Task record for the call. You can use the returned Task ID or navigate in Salesforce to the related Account, Contact, Lead, or Opportunity to view the associated activity in the activity history.

### What Salesforce record types can I associate the call log with?

You can associate call logs with any Salesforce record type that supports Task associations using the What ID parameter, including Accounts, Opportunities, and Cases. Use the Who ID parameter to link to a Contact or Lead.
