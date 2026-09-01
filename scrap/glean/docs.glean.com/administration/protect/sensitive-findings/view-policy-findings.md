---
url: "https://docs.glean.com/administration/protect/sensitive-findings/view-policy-findings"
canonical: "https://docs.glean.com/administration/protect/sensitive-findings/view-policy-findings"
title: "View sensitive findings flagged by policies"
description: "Learn how to view and manage sensitive findings identified by your policies."
fetched_at: "2026-09-01T13:29:14.558Z"
---
On this page

Glean Protect+

Prerequisites

Only users with the Super Admin or Sensitive Content Moderator roles can create or view policies.

### Sensitive issues[​](#sensitive-issues "Direct link to Sensitive issues")

The **sensitive issues** dashboard is the central place to monitor and manage matches your sensitive content policies have flagged. Each entry in the dashboard is a single **issue**, which represents a unique document–policy pair. For example, if a document is flagged by three policies (`A`, `B`, `C`), Glean creates three separate issues (`iA`, `iB`, `iC`), each scoped to one policy and the findings that policy detected on that document.

This lets you triage what each policy flagged independently. The findings, severity, and detectors shown on an issue are always scoped to its policy.

When you open an issue, you can review:

-   Findings detected by that policy on the document, with surrounding text
-   Document ID, an internally generated ID that is prefixed with the connector the document belongs to
-   Viewing URL of the document
-   Email of the document owner, when known
-   Email of the owner department, when known
-   Accessibility level:
    -   **Domain accessible**: Shared with all users in the organization
    -   **Accessibility count above given threshold**: Shared with over N users, where N is the value chosen in the report setting
    -   **Anonymously accessible with link**: Accessible to anyone with link
    -   **Anonymously searchable**: Searchable and accessible to anyone
-   Container name (for example, folder)
-   Document type
-   Connector
-   Document last updated timeframe
-   Issue status
-   Issue assignee

#### Triage with the built-in case management system[​](#triage-with-the-built-in-case-management-system "Direct link to Triage with the built-in case management system")

Each issue works like a lightweight ticket, so you can run a structured triage workflow without leaving the dashboard:

-   **Assign owners**: Assign an issue to a specific user so it's clear who is responsible for resolving it. See [Who can be assigned an issue](#who-you-can-assign-an-issue-to).
-   **Track progress with statuses**: Move issues through their lifecycle as work happens. See [Issue statuses](#issue-statuses) for details.
-   **Bulk update**: Select multiple issues that match a filter (for example, every open issue assigned to a particular reviewer for one policy) and update their status or assignee in one step

This makes it easier to split work across reviewers, run focused triage queues per policy, and track issues to resolution.

#### Who you can assign an issue to[​](#who-you-can-assign-an-issue-to "Direct link to Who you can assign an issue to")

You can assign a sensitive issue only to a user who holds the Super Admin or Sensitive Content Moderator role. Those roles can open the dashboard, so an assignee always has access to the issue they own. See [User roles](/administration/identity/roles/user-roles).

The **Assigned to** picker on an individual issue and the **Assign to** dialog for bulk assignment list eligible users only. If you don't see the user you're looking for, confirm they hold one of the two roles in **Admin console → Users & permissions → User roles**, then reload the dashboard.

Assignments made outside the dashboard follow the same rule. Glean rejects an assignment that names a user with neither role and explains that the user lacks the required role. The issue keeps the assignee it already had.

If a user loses both roles while issues are still assigned to them, those issues show **Former assignee** in place of the name. Reassign that work to someone who currently holds an eligible role.

#### Filter and search[​](#filter-and-search "Direct link to Filter and search")

Use the toolbar above the dashboard to narrow the list of issues to a focused set:

-   **Search**: Enter a keyword to match across an issue's title, document ID, container, owner, and department.
-   **Status**: Filter by issue status.
-   **Severity**: Filter by severity level.
-   **Policy**: Filter by the policy that raised the issue.
-   **Info type**: Filter by the info type that matched.
-   **Regex ID**: Filter by the custom regex pattern that matched.
-   **Connector**: Filter by the connector the document came from.
-   **Visibility**: Filter by how broadly the underlying document is shared.
-   **Assigned to**: Filter by the user assigned to the issue.
-   **Created**: Filter by when the issue was created.

Filters compose with each other and with the search box, so you can stack them to focus on exactly the slice of issues you need — for example, every `OPEN`, high-severity issue from one connector assigned to a specific reviewer.

#### Issue statuses[​](#issue-statuses "Direct link to Issue statuses")

Each issue has one of the following statuses:

| Status | Set by | Description |
| --- | --- | --- |
| `OPEN` | System | Applied when a new issue is detected, or when an existing issue is updated with new findings |
| `IN_PROGRESS` | User | A reviewer has picked the issue up and is actively working on it |
| `CLOSED` | User | A reviewer has manually closed the issue |
| `RESOLVED` | System | Applied automatically when all findings on an existing issue have been resolved |

### Take action on sensitive documents[​](#take-action-on-sensitive-documents "Direct link to Take action on sensitive documents")

1.  Archive the findings within the document if you want to filter it out of the dashboard.
2.  Hide this document from Glean search if it has genuinely sensitive information.
3.  Exclude the terms from future scans if they are benign and you don't want similar future findings.

### Sensitive Findings Insights[​](#sensitive-findings-insights "Direct link to Sensitive Findings Insights")

The Sensitive Findings Insights dashboard provides a high-level statistical view of all findings and documents flagged by your sensitive policies. This dashboard includes the following panels:

-   **Total findings**: The aggregate count of all sensitive findings detected.
-   **Total documents with findings**: The number of unique documents containing one or more findings.
-   **Findings trend**: A visualization of total findings over configurable time windows (past week, past month).
-   **Findings by info-type**: Distribution of findings across different info-types and regex patterns configured in your policies.
-   **Documents by severity**: Distribution of documents across severity levels (low, medium, high, false positive, and unspecified).
-   **Findings and documents by connector**: Breakdown of findings and documents by their originating connectors.
-   **Findings and documents by policy**: Distribution of findings and documents across your configured policies.

All panels support filtering by severity, policy, and visibility to help you narrow down your insights.

note

Statistics on this dashboard are updated every 6 hours.

### Exporting and downloading sensitive findings[​](#exporting-and-downloading-sensitive-findings "Direct link to Exporting and downloading sensitive findings")

You can export the current view of the dashboard, including all applied filters, to a JSONL file for offline analysis or integration with external systems.

To export your findings:

1.  Apply the desired filters to the dashboard to narrow down the findings you want to export.
2.  Initiate the export. The export process typically takes 5–10 minutes to complete.
3.  Track the progress in the **Exports** sidebar.
4.  Once complete, download the JSONL file from the **Exports** sidebar.

#### Export format[​](#export-format "Direct link to Export format")

The exported file uses the JSONL (JSON Lines) format, where each line represents a single document as a JSON object. You can iterate through this file line by line using a simple Python script with built-in JSON readers to process each detected document. The following example illustrates a single line in the exported file:

```
{  "docId": "docId123",  "reportIds": ["123"],  "findings": [    {      "findingId": "456",      "matchedRuleType": "BUILT_IN",      "matchedRuleValue": "PASSWORD",      "quote": "hello",      "reportId": "456"    }  ],  "detectedTimestamp": "1765795145000",  "ownerEmail": "owner_email_unknown",  "ownerDepartment": "owner_department_unknown",  "sharingLevel": "BROADLY_SHARED",  "docType": "WebPage",  "datasource": "CUSTOM_DATASOURCE",  "docLastUpdatedAt": "1761109200000",  "documentAccessibility": "PUBLIC_VISIBLE",  "severityAnalyses": [    {      "reportId": "456",      "severity": "HIGH"    }  ],  "visibilityOverride": "HIDE_ALL"}
```

note

Exported files are available for download for one week. After this period, the file is automatically deleted and must be regenerated if needed.
