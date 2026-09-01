---
url: "https://docs.glean.com/tools/connector/jira/create-comment"
canonical: "https://docs.glean.com/tools/connector/jira/create-comment"
title: "Create a Jira Comment"
description: "Adds comments directly to Jira issues from within Glean workflows"
fetched_at: "2026-09-01T13:30:02.992Z"
---
On this page

## Key Features[​](#key-features "Direct link to Key Features")

The Create a Jira Comment tool in Glean enables users to add comments directly to Jira issues from within Glean workflows or conversations. This feature streamlines collaboration and communication by allowing users to provide additional context, document updates, or share insights for Jira tickets without having to navigate away from their current workspace. It supports integration with both Jira Software and Jira Service Management projects, promoting traceability and faster feedback cycles. The comment will be visible to those who have access to the tickets.

## Examples[​](#examples "Direct link to Examples")

-   **Status Update**: "Add a comment to ticket ENG-456 saying, 'Investigation is complete. Pending review from QA.'"
-   **Incident Documentation**: "Post: 'Root cause identified as database configuration drift. Applying fix now.' to ticket INCIDENT-101."
-   **Cross-system Reference**: "Attach meeting notes from today's Google Doc as a comment to JIRA-789."
-   **Follow-up Questions**: "Comment on TICKET-303: 'Can the deadline be extended to next week?'"
-   **Stakeholder Communication**: "Add 'This issue is being addressed by the infra team. ETA Friday.' as a comment to IT-1122."

## Best Practices and Troubleshooting[​](#best-practices-and-troubleshooting "Direct link to Best Practices and Troubleshooting")

-   Clarify which Jira ticket a comment should be added to by searching for the ticket in the previous step or directly providing a ticket number or ticket link.
-   When using a ticket link, ensure the ticket is in the correct format for Glean to read the contents (e.g., `https://yourinstance.atlassian.net/browse/[ticketnumber]`).
-   Type the ticket link in [app.glean.com](http://app.glean.com) Glean search to test whether Glean has access to the ticket.
-   Note that every user needs to connect their account to Jira before running the agent.
