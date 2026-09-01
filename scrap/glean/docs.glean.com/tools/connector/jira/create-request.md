---
url: "https://docs.glean.com/tools/connector/jira/create-request"
canonical: "https://docs.glean.com/tools/connector/jira/create-request"
title: "Create Request"
description: "Creates new requests directly to Jira Service Management (JSM) from within Glean"
fetched_at: "2026-09-01T13:30:03.079Z"
---
On this page

## Key Features[​](#key-features "Direct link to Key Features")

The Create Request tool in Glean enables users to submit new requests directly to Jira Service Management (JSM) from within Glean. This feature streamlines service desk operations by automatically suggesting the right request type in the service desk based on the user query. It supports integration with different JSM request types and required fields, promoting faster issue reporting, improved traceability, and enhanced user experience.

-   **Submit Requests via Natural Language**: Allows users to state their request in plain English, which Glean converts into the appropriate request type and fields for Jira Service Management.
-   **Structured Field Support**: Users can fill in required or custom fields (e.g., category, priority, description, attachments, assignees, etc.) as prompted by the JSM project configuration.
-   **Best Used With Agents**: Optimized for use within Glean agents, enabling embedded ticket creation as part of automated support or service workflows.

## Examples[​](#examples "Direct link to Examples")

-   **Incident Reporting**: "Create an IT incident request stating 'Cannot access VPN since this morning' and set urgency to high."
-   **Access Request**: "Submit an access request to add me to the engineering GitHub repo."
-   **Service Desk Issue**: "Log a facilities request: 'Monitor in meeting room 3 is not working.'"
-   **Onboarding**: "Open an onboarding request for new hire Jane Doe in the Boston office."
-   **Attachment Submission**: "Create a helpdesk ticket for 'laptop overheating' and attach the diagnostic report from today's Google Doc."

## Best Practices and Troubleshooting[​](#best-practices-and-troubleshooting "Direct link to Best Practices and Troubleshooting")

-   Provide descriptions on which service desk and request type should be used in the instructions to help Glean suggest the right one.
-   Unless multiple service desks absolutely need to be supported in a single tool, try separating into multiple tools and use branching to divide the workflow.
-   Note that every user needs to connect their account to Jira before running the agent.

## Known Limitations[​](#known-limitations "Direct link to Known Limitations")

-   Glean may not be able to choose the right request type if there isn't sufficient information provided or if there are too many service desks and request types to choose from.
-   Glean can populate only service desk, request type, summary, and description fields.
-   This help article is based on general JSM and Glea tool standards. Specific field prompts and supported request types may vary based on project configuration.
