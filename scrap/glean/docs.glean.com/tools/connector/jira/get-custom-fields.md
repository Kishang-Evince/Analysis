---
url: "https://docs.glean.com/tools/connector/jira/get-custom-fields"
canonical: "https://docs.glean.com/tools/connector/jira/get-custom-fields"
title: "Get fields"
description: "Retrieve Jira fields, including custom fields, so agents can reference the right field IDs in follow‑on tools like Edit issue"
fetched_at: "2026-09-01T13:30:03.735Z"
---
On this page

The *Jira Get fields* tool retrieves field metadata from a connected Jira Cloud instance so agents can discover available fields and their IDs. Use this read-only tool to find the correct field IDs for custom fields before using tools like Edit issue.

You can optionally filter to show only custom fields using the `custom only` parameter, which restricts the output to fields created by Jira administrators rather than built-in system fields. The tool only returns fields the connected account has permission to view.

## Limitations[​](#limitations "Direct link to Limitations")

-   This tool is designed and validated against Jira Cloud endpoints, for example, `api.atlassian.com/ex/jira/...`.
    
-   Custom fields are created and managed per Jira instance, so field IDs, names, and types differ for every customer. Flows built with this tool are not automatically portable across Jira instances without re‑mapping the field IDs.
    
-   The tool depends on Jira's standard "get fields" API. If Jira is unavailable, misconfigured, or rate‑limited, the tool may fail or return partial results.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must complete the initial Jira setup and enable tools so that the Jira tools are available in Agent Builder.
    
-   Each user is prompted to connect their Jira account via OAuth in Glean before running tools, including Jira Get fields.
    
-   The connected account needs read access to Jira projects and configuration to view field metadata. If the account cannot see a field in Jira, this tool will not return it.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| Custom only | boolean | No | `false` | When `true`, the tool filters the Jira "get fields" response to only include custom fields defined by administrators. When `false` (default), it returns both Jira system fields and custom fields. |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to update the "Story Points" custom field on a Jira issue, but you need to find the correct field ID first.

*Instruction to an agent:*

"Find the field ID for the **Story Points** custom field in Jira, then update issue **ENG-1234** to set the story points to **8**."

*Resulting behavior:*

-   Calls Get fields with:
    
    -   `Custom only` set to true to filter only custom fields.
-   Retrieves a list of custom fields including:
    
    -   Field name: "Story Points"
        
    -   Field ID: customfield\_10016
        
    -   Field type: number
        
-   Identifies the matching field by searching for "Story Points" in the field names.
    
-   Calls Edit issue with:
    
    -   `Issue ID or key` set to ENG-1234.
        
    -   `Fields` object containing `{"customfield_10016": 8}`.
        
-   Updates the Story Points field on the issue to 8.
    

*Workflow tip:* Use Get fields to dynamically discover custom field IDs instead of hard-coding them, making your agents portable across different Jira configurations. Set `custom only` to true when you only need administrator-defined fields to reduce the response size.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Frequent reauthentication prompts for Jira tools

-   **Possible cause:** Updates to the Jira tools configuration such as changes to allowed tools or OAuth credentials invalidate existing connected accounts, which can require users to reauthenticate.
-   **Fix:** Reauthenticate the Jira tools when prompted. If prompts continue to appear after every agent change, ask your Glean admin to confirm whether there are ongoing changes to the Jira tools configuration.

### The tool returns data: null, successful: false, and no error message

-   **Possible cause:** There may be an issue with the tools runtime or upstream tools service rather than with your configuration.
-   **Fix:** Re-run the tool once. If it continues to return null with no error, escalate to your Glean admin or support so they can check the tools deployment status.

### You do not see expected custom fields in the response

-   **Possible causes:**
    -   The connected Jira account does not have permission to see those fields or the projects they belong to.
    -   The fields are defined only in another Jira site (for example, a different Atlassian cloud id) than the one you connected.
-   **Fix:**
    -   Verify in Jira (as the same account) that you can see the field in project settings and on issues.
    -   Confirm that the correct Jira cloud instance is connected in Glean. If necessary, re-authenticate or update the connected account.

### Tool customization fails validation when you leave a boolean parameter like custom\_only unchecked

-   **Possible cause:** Older versions of the tool configuration logic treated an unchecked required boolean field as invalid.
-   **Fix:** Use the latest tools runtime image. If the issue persists, contact your Glean admin or support, as this is a platform-side validation bug rather than a configuration problem you can fix in the UI.

### The response includes too many fields for agents to use effectively, for example, ~200 entries

-   **Possible causes:** The Jira instance has a large number of custom fields, and you are calling the tool with custom\_only: false or defaulting it.
-   **Fix:**
    -   Set custom\_only to true when you only care about administrator-defined fields.
    -   In complex workflows, add agent instructions that explicitly tell the LLM how to filter and pick fields, or use a paginated/filtered variant of the tool if one is available.

## FAQs[​](#faqs "Direct link to FAQs")

### Why do I see both system and custom fields?

By design, the underlying Jira API returns all fields. Use the custom\_only parameter to limit the response to custom fields if you do not need system fields.

### Is there pagination or filtering beyond custom\_only?

A paginated variant of this tool has been discussed for large Jira instances. If it is exposed in your environment, for example, a tool named something like "Jira get fields paginated", prefer that for very large schemas. Otherwise, rely on custom\_only and agent-side filtering.
