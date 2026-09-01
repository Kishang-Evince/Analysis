---
url: "https://docs.glean.com/tools/connector/jira/create-issue"
canonical: "https://docs.glean.com/tools/connector/jira/create-issue"
title: "Create a Jira Issue"
description: "Creates new Jira issues in Jira Cloud directly from Glean"
fetched_at: "2026-09-01T13:30:03.074Z"
---
On this page

The Create Jira issue tool allows you to create new Jira issues in Jira Cloud directly from Glean. It streamlines engineering and related workflows by suggesting the right project and issue type from your query. It also provides prefilled suggestions for the summary and description and guides you through required fields.

## Key Features[​](#key-features "Direct link to Key Features")

-   **Natural Language Processing:** Describe the problem or task in plain English. Glean infers the project and issue type, then populates the summary and description based on your prompt.
    
-   **Permission-Aware**: Issues are created under the connected Jira user, which preserves permissions and proper attribution.
    
-   **Graceful Redirect**: For projects with complex creation screens or validation rules, Glean redirects you to Jira's native Create Issue page to complete the remaining fields.
    
-   **Jira Software Focus**: This tool is designed for common Jira Software issue types, such as Task, Bug, and Story. For service requests, use the **Jira Service Management – Create Request** tool.
    

## Examples[​](#examples "Direct link to Examples")

-   "Create a Bug in ENG: 'SSO login fails for new users' and add a brief description."
-   "Open a Task in ABC titled 'Add pagination to issues list' with a paragraph of details."
-   "Create a Story in Mobile App: 'Improve profile edit UX' and assign it to me."
-   "File a Bug: 'Crash on profile edit when tapping Save' with steps to reproduce and expected result."
-   "Create a Task in WEB for 'Deprecate legacy webhook v1' and include a checklist in the description."

## ​Best Practices and Troubleshooting[​](#best-practices-and-troubleshooting "Direct link to ​Best Practices and Troubleshooting")

-   To help Glean select the correct target, always provide the project and issue type in your instruction.
    
-   If your workflow involves very different projects or configurations, consider using tools to branch your agent's logic for clarity.
    
-   Each user must connect their Jira account via OAuth within Glean before running the tool. This ensures correct access and attribution. A user only needs to complete the OAuth process once.
    
-   If you are redirected to Jira, complete the remaining required fields on the native Create Issue screen and submit. This occurs with projects that have advanced validations or dynamic screens.
    
-   Glean might not be able to choose the correct issue type if there are not enough instructions or if there are too many issue types to choose from.
    

## Known Limitations[​](#known-limitations "Direct link to Known Limitations")

-   Supports **Jira Cloud** only.
-   Some field types are not supported in the Glean form, including:
    -   Attachments
    -   Linked issues
    -   Parent/Epic link (in certain schemes)
    -   Time tracking
    -   Fix versions
-   If your request includes an unsupported field, Glean will redirect you to the Jira screen to manage and configure those fields before creating the issue.
-   Glean may not be able to select the correct issue type or other parameters if your request doesn't provide enough detail or if there are too many types to choose from.
