---
url: "https://docs.glean.com/troubleshooting/error-codes/googletasks/google-tasks-3"
canonical: "https://docs.glean.com/troubleshooting/error-codes/googletasks/google-tasks-3"
title: "GOOGLE-TASKS-3"
description: "GOOGLE-TASKS-3 Error Code"
fetched_at: "2026-09-01T13:30:21.953Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The configured Google Drive Directory Admin does not have access to the Reports Audit API, which Google Tasks uses for its activity crawl.

## Resolution[​](#resolution "Direct link to Resolution")

-   Google Tasks uses the Directory Admin configured for the associated Google Drive app to read the [Reports Audit API](https://developers.google.com/admin-sdk/reports/v1/get-start/getting-started) for the `tasks` application.
-   Open [domain-wide delegation](https://admin.google.com/u/1/ac/owl/domainwidedelegation) in the Google Admin console and ensure the Google client ID has been granted the `https://www.googleapis.com/auth/admin.reports.audit.readonly` scope.
-   Ensure the Directory Admin account has the **Reports Administrator** or **Super Admin** role in the Google Admin console.
-   Ensure the app with the respective Google client ID is listed as trusted in the [Admin console](https://admin.google.com/ac/owl/list?tab=configuredApps).

For additional assistance, contact [Glean Support](https://support.glean.com).
