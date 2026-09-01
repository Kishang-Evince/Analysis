---
url: "https://docs.glean.com/troubleshooting/error-codes/tools/google-tool-setup"
canonical: "https://docs.glean.com/troubleshooting/error-codes/tools/google-tool-setup"
title: "GOOGLE_ACTION_SETUP"
description: "GOOGLE_ACTION_SETUP Error Code"
fetched_at: "2026-09-01T13:30:32.280Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

You encountered an error while running an agent that uses a Google Workspace tool (Google Drive, Google Sheets, or Gmail). This typically indicates that Domain-Wide Delegation (DWD) or authentication has not been properly configured for your organization.

## Resolution[​](#resolution "Direct link to Resolution")

Please contact your Glean administrator and provide them with the full error message so they can identify the specific configuration issue.

Administrators should review the setup instructions at [Google Tools Setup](/administration/tools/setup-tools/google-tools-setup), paying particular attention to:

-   **Domain-Wide Delegation** (when using DWD): Ensure the correct Client ID has been added with the required OAuth scopes
-   **OAuth scopes** (when using DWD): Verify that all required scopes are authorized for the tools being used (e.g., `drive.file`, `spreadsheets`, `gmail.compose`)
-   **App trust status** (when using central app): Confirm the app is marked as 'Trusted' in the Google Admin Console

If the configuration appears correct and the error persists, it may be a transient issue. Please try again in a few minutes.

If you continue to experience issues, please contact Glean Support at [https://support.glean.com](https://support.glean.com).
