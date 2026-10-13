---
url: "https://docs.glean.com/troubleshooting/error-codes/googletasks/google-tasks-3"
canonical: "https://docs.glean.com/troubleshooting/error-codes/googletasks/google-tasks-3"
title: "GOOGLE TASKS 3"
description: "GOOGLE TASKS 3 error code"
fetched_at: "2026-10-13T08:51:06.667Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The connector could not access the Reports Audit API for the `tasks` application.

## Resolution[​](#resolution "Direct link to Resolution")

1.  Add `https://www.googleapis.com/auth/admin.reports.audit.readonly` to the domain wide delegation client that you used for Google Drive.
2.  Confirm that the Directory Admin from the associated Google Drive instance can read Reports Audit activity for the `tasks` application.
3.  Run validation again.
