---
url: "https://docs.glean.com/connectors/native/google-tasks/faq"
canonical: "https://docs.glean.com/connectors/native/google-tasks/faq"
title: "Google Tasks FAQ"
description: "Find answers to common questions about the Google Tasks connector."
fetched_at: "2026-10-13T08:49:57.903Z"
---
### What does the Google Tasks connector index?

The connector indexes task lists and tasks. It uses task notes as the task body when notes exist. It uses the task title when notes do not exist. It also indexes task status, task source, due dates, completion dates, and task list names.

### Does Google Tasks need a new service account?

No. Google Tasks reuses the Google Drive domain wide delegation client and the Directory Admin from the associated Google Drive instance.

### Which scopes does Google Tasks use?

The connector uses `https://www.googleapis.com/auth/tasks.readonly` to read task lists and tasks. It uses `https://www.googleapis.com/auth/admin.reports.audit.readonly` to read Google Tasks activity from the Reports Audit API.

### How does Glean protect Google Tasks documents?

Glean assigns each document to the user whose Google Tasks data it crawls. Users see their own indexed task lists and tasks through the connector.

### How does the connector update content?

The connector runs full crawls for user containers on the configured schedule. It also runs an activity crawl that reads Google Reports Audit events for the `tasks` application. The connector does not run an incremental content crawl.
