---
url: "https://docs.glean.com/administration/protect/ai-security/findings-dashboard"
canonical: "https://docs.glean.com/administration/protect/ai-security/findings-dashboard"
title: "Findings Dashboard"
fetched_at: "2026-10-13T08:49:28.485Z"
---
On this page

Glean Protect+

When a Glean AI security policy is violated, an issue is created and displayed on the Findings dashboard. This page provides a detailed list of every flagged or blocked incident, helping administrators triage and resolve potential threats to their AI agents.

To access the dashboard, open **Protect** from the Glean navigation, next to **Admin console**. Then, under **AI security**, click **AI security issues**.

## Issues List[​](#issues-list "Direct link to Issues List")

The Findings dashboard displays all AI security violations as issues with the following information:

| Field | Description |
| --- | --- |
| Issue | A descriptive title for the issue, typically showing the policy violation and affected agent |
| Source | Where the violation was detected (for example, User prompt, Retrieved content, Agent response) |
| Action | The enforcement action taken: Flagged (logged for review) or Blocked (request stopped) |
| User | The user who initiated the agent run |
| Status | The current triage status: Open, In progress, or Closed |
| Assigned to | The team member assigned to review this issue (shows "Unassigned" if no one is assigned) |
| Detected | When the violation was detected |

## Filter and Search[​](#filter-and-search "Direct link to Filter and Search")

Use the filters to quickly find and prioritize the most critical violations:

-   **Confidence**: Filter by High, Medium, or Low confidence levels
-   **Source**: Filter by the source of the violation (User prompt, Retrieved content, Agent response)
-   **Action**: Filter by enforcement action (Flagged, Blocked)
-   **Status**: Filter by triage status (Open, In progress, or Closed)
-   **Agent**: Filter by agent name or type
-   **Policy**: Filter by specific security policies
-   **Detected**: Filter by when the violation was detected

## Group by Conversation[​](#group-by-conversation "Direct link to Group by Conversation")

Issues are grouped by conversation ID by default, allowing you to see all violations within the same chat session together. For scheduled agents that don't have conversation IDs, issues are grouped by run ID instead.

## Issue Details[​](#issue-details "Direct link to Issue Details")

Click an issue to open its details. Use the share control to copy a link to that issue, so someone else with access to Protect can open the same violation.

The issue details pane includes the following information:

-   **Surface**: Where the issue occurred (for example, Glean chat, specific agent)
-   **User**: The user who initiated the agent run
-   **Policy violated**: The name of the security policy that was triggered
-   **Conversation ID and Run ID**: Unique identifiers for tracking and investigation
-   **View chat**: Link to see the full conversation context
-   **Source**: Where the violation was detected (User prompt, Retrieved content, or Agent response)
-   **Snippet**: The content that matched the policy. The label under it names where that content came from: user prompt, tool call, LLM prompt, LLM response, tool response, or retrieved data. **Highlights** shows the matching sentences. **Raw** shows the full content.
-   **Status and Confidence**: Current triage status and detection confidence level
-   **Assigned to**: The team member responsible for reviewing this issue

### History and comments[​](#history-and-comments "Direct link to History and comments")

The detail pane has three tabs: **Overview**, **History**, and **Comments**. The full issue page shows **Overview** and **Comments**.

**History** lists every change to the issue, newest first: when Glean detected it, each status change, each assignment change, and each update to triage notes. Status changes show the close reason and triage notes recorded with them, and each entry shows who made the change and when.

**Comments** is where your security team discusses an issue. Add a comment to share context, or reply to a comment to keep a conversation in one thread. Collapse a thread with more than one reply to hide its replies. You can delete comments you wrote, and if someone deletes a comment that has replies, the replies stay visible. Each comment can be up to 2,000 characters.

## Triage Tools[​](#triage-tools "Direct link to Triage Tools")

### Individual Tools[​](#individual-tools "Direct link to Individual Tools")

For each issue, you can:

-   **Change Status**: Move the issue to In progress while you investigate, or to Closed when you're done. Closing an issue requires a reason: Resolved, False positive, Incorrect classification, or Other. See [Provide Feedback](#provide-feedback) for what each reason means. When you move an issue to In progress or Closed, you can also add triage notes of up to 2,000 characters. The notes appear on the **History** tab.
-   **Assign**: Assign the issue to a team member for investigation
-   **Add Comments**: Discuss the issue with your team on the **Comments** tab
-   **Copy IDs**: Copy the Run ID or Session ID for further investigation

### Bulk Operations[​](#bulk-operations "Direct link to Bulk Operations")

Select multiple issues using the checkboxes to perform bulk actions:

-   **Bulk Status Update**: Change the status of multiple issues at once
-   **Bulk Assignment**: Assign multiple issues to a team member
-   **Bulk Resolution**: Quickly resolve multiple similar false positives

## Provide Feedback[​](#provide-feedback "Direct link to Provide Feedback")

When you close an issue, the reason you choose tells Glean whether the detection was accurate. Choose the reason that fits best:

1.  **Resolved**: The detection was correct, and you've dealt with the violation. Glean counts it as a true positive, which confirms that the detection worked as intended.
    
2.  **False positive**: There was no violation, so the detection was wrong. This is the clearest signal that Glean flagged something it shouldn't have.
    
3.  **Incorrect classification**: The issue was worth flagging, but part of the verdict was wrong, such as its severity. Glean treats this as a weaker signal than a false positive.
    
4.  **Other**: None of the other reasons fits. Use triage notes to explain why you closed the issue.
    

Add triage notes to explain your reason, especially for false positives, incorrect classifications, or when you choose **Other**. Glean reviews close reasons and triage notes to measure detection quality and improve AI security detection over time. Closing an issue doesn't immediately change what Glean flags for your organization. To change that, [configure your policies](/administration/protect/ai-security/configuring-policies).

## Export and download violations[​](#export-and-download-violations "Direct link to Export and download violations")

You can export the current view of the Findings dashboard, including all applied filters, to a JSONL ([JSON Lines](#export-format)) file for offline analysis, sharing with your security team, or integration with external reporting and SIEM tools. Only users with the Sensitive Content Moderator role (or a Super Admin) can export violations.

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
