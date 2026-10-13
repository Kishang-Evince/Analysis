---
url: "https://docs.glean.com/troubleshooting/error-codes/googletasks/google-tasks-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/googletasks/google-tasks-2"
title: "GOOGLE TASKS 2"
description: "GOOGLE TASKS 2 error code"
fetched_at: "2026-10-13T08:51:06.392Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The connector could not access the Google Tasks API.

## Resolution[​](#resolution "Direct link to Resolution")

1.  Enable the Google Tasks API in the Google Cloud project that hosts the Google Drive service account.
2.  Add `https://www.googleapis.com/auth/tasks.readonly` to the domain wide delegation client that you used for Google Drive.
3.  Confirm that the Directory Admin from the associated Google Drive instance can list task lists.
4.  Run validation again.
