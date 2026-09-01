---
url: "https://docs.glean.com/tools/connector/salesforce/complete-tasks"
canonical: "https://docs.glean.com/tools/connector/salesforce/complete-tasks"
title: "Complete task"
description: "Marks a Salesforce task as completed with optional completion notes"
fetched_at: "2026-09-01T13:30:04.762Z"
---
On this page

The *Salesforce complete task* tool marks an existing Task record as completed in Salesforce. This is a write tool that updates the task status to "Completed" and optionally appends completion notes to the task description.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Salesforce org must be connected as a connector in Glean, and an admin must enable the Salesforce tools and complete Salesforce Tools Setup including OAuth configuration.
    
-   Users must authenticate for Salesforce tools on first use.
    
-   The authenticated Salesforce user must have permission to edit Task records based on your organization's sharing rules.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| Task ID | String | Yes | Salesforce ID of the task to mark as completed (e.g., "00T5g00007ABCDEFUA2"). |
| Completion notes | String | No | Optional notes about the task completion; appended to the existing task description. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Mark task 00T5g00007ABCDEFUA2 as completed with notes 'Spoke with prospect, confirmed needs, scheduled demo for next Tuesday'."
    
-   "Complete the follow-up call task and add the summary 'Customer satisfied with resolution'."
    
-   "Close out my sales outreach task with completion notes 'Left voicemail, will try again tomorrow'."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Tool does not appear in the agent builder

-   **Possible cause:** The Salesforce tools are not added, not linked to your Salesforce connector, or not fully configured.
-   **Fix:** In the Glean admin console, go to **Platform → Tools**, add or open the Salesforce tools, link it to your Salesforce connector, configure authentication, update **Publish settings**, and save. After that, Salesforce tools should appear under **Tools → By connector → Salesforce**.

### Tool fails with OAuth or connected account error

-   **Possible cause:** The user's connected Salesforce account is missing, inactive, or misconfigured, or the Salesforce connected app is not set up correctly.
-   **Fix:** Ask the user to re-authenticate Salesforce when prompted by Glean. If errors persist, verify the Salesforce connected app configuration (callback URL and scopes) and confirm that Salesforce Tools setup is complete.

### Tool fails with invalid task ID error

-   **Possible cause:** The provided task ID does not exist in Salesforce, is not a valid 18-character Salesforce ID, or the user does not have access to view the task.
-   **Fix:** Verify the task ID is correct by checking the task directly in Salesforce. Task IDs typically start with "00T" and are 15 or 18 characters long. Ensure the user has permission to view and edit the task.

### Tool fails with insufficient permissions error

-   **Possible cause:** The authenticated Salesforce user does not have permission to edit Task records or the specific task is assigned to someone else with restricted access.
-   **Fix:** Verify the user's Salesforce profile or permission set includes edit permissions for Tasks. Check that the task owner allows others to edit the task based on your organization's sharing settings.

## FAQs[​](#faqs "Direct link to FAQs")

### What happens to the existing task description?

If you provide completion notes, they are appended to the existing task description. The original description is preserved, and your notes are added at the end. If you do not provide completion notes, only the status is updated to "Completed".

### What task status does this tool set?

This tool sets the task status to "Completed". If your Salesforce org has custom task statuses, the tool uses the standard "Completed" status value. You cannot specify a different completion status with this tool.

### Can I complete multiple tasks at once?

No. This tool completes one task at a time. To complete multiple tasks, you need to call this tool multiple times with different task IDs, or use a loop in your agent workflow.
