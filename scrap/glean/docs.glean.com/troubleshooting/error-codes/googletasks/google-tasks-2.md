---
url: "https://docs.glean.com/troubleshooting/error-codes/googletasks/google-tasks-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/googletasks/google-tasks-2"
title: "GOOGLE-TASKS-2"
description: "GOOGLE-TASKS-2 Error Code"
fetched_at: "2026-09-01T13:30:21.725Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean couldn't validate whether the Google Tasks API is set up correctly with the right scopes.

## Resolution[​](#resolution "Direct link to Resolution")

-   Ensure the Google Tasks API (`tasks.googleapis.com`) is enabled on your Google Project. You can check its status in the [Cloud Console API Library](https://console.cloud.google.com/apis/library/tasks.googleapis.com).
-   Open [domain-wide delegation](https://admin.google.com/u/1/ac/owl/domainwidedelegation) in the Google Admin console and ensure the Google client ID has been granted the `https://www.googleapis.com/auth/tasks.readonly` scope.
-   Ensure the app with the respective Google client ID is listed as trusted in the [Admin console](https://admin.google.com/ac/owl/list?tab=configuredApps).
-   Google Tasks uses the Directory Admin configured for the associated Google Drive app. Ensure a valid Directory Admin e-mail is set and can access the Google Tasks service.

For additional assistance, contact [Glean Support](https://support.glean.com).
