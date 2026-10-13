---
url: "https://docs.glean.com/connectors/native/google-tasks/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/google-tasks/troubleshooting"
title: "Google Tasks troubleshooting"
description: "Troubleshoot setup and indexing issues with the Google Tasks connector."
fetched_at: "2026-10-13T08:49:58.168Z"
---
Use the validation result in Glean to identify the failed check. The connector runs these checks in order.

### Associated Google Drive instance not set up

Glean reports `GOOGLE_TASKS_1` when the connector cannot find an associated Google Drive instance or when the instance has not finished setup.

1.  Open the Google Tasks connector configuration.
2.  Select an associated Google Drive instance.
3.  Confirm that the Google Drive instance has finished setup.
4.  Run validation again.

See the [Google Tasks 1 error page](/troubleshooting/error-codes/googletasks/google-tasks-1).

### Google Tasks API not accessible

Glean reports `GOOGLE_TASKS_2` when the connector cannot access the Google Tasks API.

1.  Enable the Google Tasks API in the Google Cloud project that hosts the Google Drive service account.
2.  Add `https://www.googleapis.com/auth/tasks.readonly` to the domain wide delegation client that you used for Google Drive.
3.  Confirm that the Directory Admin from the associated Google Drive instance can list task lists.
4.  Run validation again.

See the [Google Tasks 2 error page](/troubleshooting/error-codes/googletasks/google-tasks-2).

### Reports Audit API not accessible

Glean reports `GOOGLE_TASKS_3` when the connector cannot access the Reports Audit API for the `tasks` application.

1.  Add `https://www.googleapis.com/auth/admin.reports.audit.readonly` to the domain wide delegation client that you used for Google Drive.
2.  Confirm that the Directory Admin from the associated Google Drive instance can read Reports Audit activity for the `tasks` application.
3.  Run validation again.

See the [Google Tasks 3 error page](/troubleshooting/error-codes/googletasks/google-tasks-3).

### Content does not appear

1.  Confirm that the associated Google Drive instance has finished setup.
2.  Confirm that the connector can access the Google Tasks API.
3.  Confirm that the connector can access Reports Audit activity for the `tasks` application.
4.  Check the next full crawl for the user's container. Google Tasks does not run an incremental content crawl.

### Updates do not appear

1.  Confirm that the activity crawl can access the Reports Audit API.
2.  Confirm that the event belongs to the `tasks` application.
3.  Check the next full crawl for the user's container.
