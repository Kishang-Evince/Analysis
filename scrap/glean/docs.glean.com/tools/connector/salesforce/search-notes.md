---
url: "https://docs.glean.com/tools/connector/salesforce/search-notes"
canonical: "https://docs.glean.com/tools/connector/salesforce/search-notes"
title: "Search notes"
description: "Searches Salesforce notes using filters like title, body, owner, parent record, and created date"
fetched_at: "2026-09-01T13:30:06.170Z"
---
On this page

The *Salesforce search notes* tool searches Note records in your connected Salesforce org using flexible filters. This is a read-only tool that helps teams find the right notes quickly without modifying any Salesforce data.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    
-   The authenticated Salesforce user must have permission to view Note records based on your organization's sharing rules.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Title | String | Search by note title. Supports partial matches. Optional. |
| Body | String | Search within the note body content. Supports partial matches to find keywords or phrases. Optional. |
| Owner name | String | Search by the note owner's name. Supports partial matches. Optional. |
| Parent name | String | Search by the parent record name (e.g., Account, Contact, Opportunity) the note is attached to. Supports partial matches. Optional. |
| Created date from | Date | Return notes created on or after this date (YYYY-MM-DD format). Optional. |
| Created date to | Date | Return notes created before this date (YYYY-MM-DD format). Optional. |
| Is private | Boolean | Filter by note privacy status. True returns private notes, false returns public notes. Optional. |
| Fields | String | Comma-separated list of Note fields to retrieve in the response. Optional. |
| Limit | Integer | Maximum number of notes to return. Optional. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Find all notes from the last quarter on the Acme Corporation renewal opportunity."
    
-   "Search for notes containing 'security requirements' written by John Smith."
    
-   "Show me recent private notes attached to the Q4 Enterprise Deal account."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool does not appear in the agent builder

-   **Possible cause:** The Salesforce tools are not added, not linked to your Salesforce connector, or not fully configured.
-   **Fix:** In the Glean admin console, go to **Platform → Tools**, add or open the Salesforce tools, link it to your Salesforce connector, configure authentication, update **Publish settings**, and save. After that, Salesforce tools should appear under **Tools → By connector → Salesforce**.

### Tool fails with OAuth or authorization error

-   **Possible cause:** The user's connected Salesforce account is missing, inactive, or misconfigured, or the Salesforce connected app is not set up correctly.
-   **Fix:** Have the user retry the agent and complete the Salesforce authorization prompt. If errors persist, verify the Salesforce connected app configuration (callback URL, consumer key, consumer secret) and confirm that Salesforce Tools setup is complete.

### Search returns no results or fewer notes than expected

-   **Possible cause:** The filter values are too restrictive, or the user does not have permission to view the relevant notes.
-   **Fix:** Review and loosen filters (e.g., widen the date range or remove the is\_private filter). Confirm in Salesforce that the user running the agent can see the missing notes on those records. Very restrictive filter combinations can legitimately yield empty result sets.

### Too many notes returned

-   **Possible cause:** The search filters are too broad or no limit is set.
-   **Fix:** Add more specific filter criteria to narrow down results. Use the Limit parameter to restrict the number of returned notes (typically 10-50 notes is sufficient for summarization). Consider filtering by created date range, parent record, or owner.

## FAQs[​](#faqs "Direct link to FAQs")

### What fields can I search by?

You can search by note title, body content (keywords or phrases), owner name, parent record name (Account, Contact, Opportunity), created date range, and privacy status. All text filters support partial matches for flexible searching.

### Can I retrieve custom Note fields?

Yes. Use the Fields parameter to specify which Note fields to retrieve, including custom fields. Provide a comma-separated list of API field names (e.g., "Title,Body,OwnerId,ParentId,CreatedDate,CustomField\_\_c"). If you do not specify fields, the tool returns a default set of standard fields.

### How do I search notes on a specific record?

Use the Parent name parameter to filter notes by their associated parent record (Account, Contact, Opportunity, etc.). The parameter supports partial matches, so you can search for notes attached to any record with a specific name.

### How many notes should I return?

Use the Limit parameter to keep results manageable. Typically 10-50 notes is sufficient for summarization or review while keeping agent runs fast and responses readable. Adjust based on your use case.
