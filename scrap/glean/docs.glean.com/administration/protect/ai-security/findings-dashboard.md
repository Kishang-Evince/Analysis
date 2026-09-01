---
url: "https://docs.glean.com/administration/protect/ai-security/findings-dashboard"
canonical: "https://docs.glean.com/administration/protect/ai-security/findings-dashboard"
title: "Findings Dashboard"
fetched_at: "2026-09-01T13:29:13.631Z"
---
On this page

Glean Protect+

When a Glean AI security policy is violated, an issue is created and displayed on the Findings dashboard. This page provides a detailed list of every flagged or blocked incident, helping administrators triage and resolve potential threats to their AI agents.

To access the dashboard, in the Glean Admin Console, navigate to **Glean Protect → AI security** and click the **Findings** tab.

## Issues List[​](#issues-list "Direct link to Issues List")

The Findings dashboard displays all AI security violations as issues with the following information:

| Field | Description |
| --- | --- |
| Issue | A descriptive title for the issue, typically showing the policy violation and affected agent |
| Source | Where the violation was detected (e.g., User prompt, Retrieved content, Agent response) |
| Action | The enforcement action taken: Flagged (logged for review) or Blocked (request stopped) |
| User | The user who initiated the agent run |
| Status | The current triage status: Open, In Progress, Rejected, or Allowed |
| Assigned to | The team member assigned to review this issue (shows "Unassigned" if no one is assigned) |
| Detected | When the violation was detected |

## Filtering and Searching[​](#filtering-and-searching "Direct link to Filtering and Searching")

Use the filters to quickly find and prioritize the most critical violations:

-   **Confidence**: Filter by High, Medium, or Low confidence levels
-   **Source**: Filter by the source of the violation (User prompt, Retrieved content, Agent response)
-   **Action**: Filter by enforcement action (Flagged, Blocked)
-   **Status**: Filter by triage status (Open, In Progress, Rejected, or Allowed)
-   **Agent**: Filter by agent name or type
-   **Policy**: Filter by specific security policies
-   **Detected**: Filter by when the violation was detected

## Grouping by Conversation[​](#grouping-by-conversation "Direct link to Grouping by Conversation")

Issues are grouped by conversation ID by default, allowing you to see all violations within the same chat session together. For scheduled agents that don't have conversation IDs, issues are grouped by run ID instead.

## Issue Details[​](#issue-details "Direct link to Issue Details")

Click on any issue to open the detail pane, which provides comprehensive context for triage:

The issue details pane includes the following information:

-   **Surface**: Where the issue occurred (e.g., Glean chat, specific agent)
-   **User**: The user who initiated the agent run
-   **Policy violated**: The name of the security policy that was triggered
-   **Conversation ID and Run ID**: Unique identifiers for tracking and investigation
-   **View chat**: Link to see the full conversation context
-   **Source**: Where the violation was detected (User prompt, Retrieved content, or Agent response)
-   **Snippet**: The actual content that triggered the policy violation
-   **Status and Confidence**: Current triage status and detection confidence level
-   **Assigned to**: The team member responsible for reviewing this issue

## Triage Tools[​](#triage-tools "Direct link to Triage Tools")

### Individual Tools[​](#individual-tools "Direct link to Individual Tools")

For each issue, you can:

-   **Change Status**: Update the issue status to In Progress (when actively investigating), Rejected (false positive), or Allowed (acknowledged true positive)
-   **Assign**: Assign the issue to a team member for investigation
-   **Add Comments**: Add notes and triage rationale to document your investigation
-   **View Trace**: Examine the full agent execution trace to understand the context
-   **Copy IDs**: Copy the Run ID or Session ID for further investigation

### Bulk Operations[​](#bulk-operations "Direct link to Bulk Operations")

Select multiple issues using the checkboxes to perform bulk actions:

-   **Bulk Status Update**: Change the status of multiple issues at once
-   **Bulk Assignment**: Assign multiple issues to a team member
-   **Bulk Resolution**: Quickly resolve multiple similar false positives

## Providing Feedback[​](#providing-feedback "Direct link to Providing Feedback")

When triaging issues, you can provide structured feedback that helps improve the AI security models over time:

1.  **Mark as False Positive**: When changing status to Rejected, you're indicating that this detection was incorrect. This feedback is used to reduce similar false positives in future model updates.
    
2.  **Mark as True Positive**: When changing status to Allowed, you're confirming the detection was correct. This helps calibrate the models.
    
3.  **Add Context**: Use comments to provide additional context about why an issue is a false positive or what made it noteworthy.
    

This feedback flows into Glean's AI Security model improvement pipeline and helps reduce noise over time.

## Export and download violations[​](#export-and-download-violations "Direct link to Export and download violations")

You can export the current view of the Findings dashboard, including all applied filters, to a JSONL ([JSON Lines](#export-format)) file for offline analysis, sharing with your security team, or integration with external reporting and SIEM tools. Only users with the sensitive content moderator role (or a super admin) can export violations.

To export your violations:

1.  Apply the desired filters to narrow down the violations you want to export, such as a specific policy, agent, status, source, confidence level, or detected time range.
2.  Initiate the export.
3.  Select the fields to include in the export, if prompted. Sensitive fields such as `rawContent` and `reasoning` are included by default. You can exclude them here.
4.  Track the progress in the **Exports** sidebar.
5.  Once the export is complete, download the JSONL file from the **Exports** sidebar.

Exports are generated asynchronously. Each export moves through a **Pending** state to either **Completed** or **Failed**, and the requester receives an email notification once the export is ready to download. Only one export can be in progress at a time.

### Export format[​](#export-format "Direct link to Export format")

The exported file uses the JSONL (JSON Lines) format, where each line represents a single AI security violation as a JSON object. You can iterate through the file line by line using standard JSON readers to process each violation. The following example illustrates a single line in the exported file:

```
{  "violationId": "violation_123",  "detectedAt": "2026-06-24T10:22:07Z",  "agentId": "agent_123",  "agentName": "Support Assistant",  "userId": "user_123",  "policyId": "policy_123",  "rule": "RESTRICTED_CONTENT",  "severity": "HIGH",  "action": "BLOCK",  "status": "OPEN",  "source": "User prompt",  "chatSessionId": "chat_123",  "title": "Restricted content detected in user prompt",  "runId": "run_123",  "assigneeUserId": "user_456",  "rawContent": "Example content that triggered the violation",  "reasoning": "The content matched the configured policy.",  "detectedTopics": ["Confidential information"],  "matchedRestrictedContent": ["API key"],  "matchedExpressions": ["expression_1"],  "feedback": "Reviewed by security team",  "statusChangeReason": "False positive"}
```

Exported fields may be empty when the corresponding value is not available for a violation.

| Field | Description |
| --- | --- |
| `violationId` | Unique identifier for the exported violation. |
| `detectedAt` | Time when Glean detected the violation. |
| `agentId` | Identifier of the agent associated with the violation, when available. |
| `agentName` | Name of the agent associated with the violation, when available. |
| `userId` | Identifier of the user associated with the violating interaction. |
| `policyId` | Identifier of the AI security policy that flagged the violation. |
| `rule` | Rule or policy condition that matched. |
| `severity` | Severity assigned to the violation. |
| `action` | Action taken by Glean for the violation, such as flagging or blocking. |
| `status` | Current review status of the violation. |
| `source` | Source of the content that triggered the violation. |
| `chatSessionId` | Identifier of the chat session associated with the violation, when available. |
| `title` | Display title shown for the violation in the Findings dashboard. |
| `runId` | Identifier of the agent or workflow run associated with the violation, when available. |
| `assigneeUserId` | Identifier of the user assigned to review the violation, when assigned. |
| `rawContent` | Content associated with the violation. This field may contain sensitive user or business content. |
| `reasoning` | Explanation for why the content was flagged. |
| `detectedTopics` | Topics detected in the content that contributed to the violation. |
| `matchedRestrictedContent` | Restricted content entries that matched the policy. |
| `matchedExpressions` | Expressions or policy conditions that matched the violation. |
| `feedback` | Reviewer feedback recorded for the violation, when available. |
| `statusChangeReason` | Reason recorded when the violation status was changed, when available. |

note

Exported files are available for download for one week. After this period, the file is automatically deleted and must be regenerated if needed.
