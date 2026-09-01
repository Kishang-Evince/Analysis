---
url: "https://docs.glean.com/troubleshooting/error-codes/gcal/googlecalendar-3"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gcal/googlecalendar-3"
title: "GOOGLECALENDAR-3"
description: "GOOGLECALENDAR-3 Error Code"
fetched_at: "2026-09-01T13:30:14.107Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The configured Google Drive Directory Admin does not have permissions to use the Reports Audit API.

## Resolution[​](#resolution "Direct link to Resolution")

-   Google Calendar uses the Directory Admin configured for the Google Drive app. Verify that the Directory Admin has the necessary permissions to access the [Reports Audit API](https://developers.google.com/admin-sdk/reports/v1/get-start/getting-started).
-   Ensure the Directory Admin account has the **Reports Administrator** or **Super Admin** role in the Google Admin console.
-   Head to the [Google Admin console](https://admin.google.com) and confirm the admin role assignments for the configured Directory Admin account.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
