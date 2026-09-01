---
url: "https://docs.glean.com/troubleshooting/error-codes/googletasks/google-tasks-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/googletasks/google-tasks-1"
title: "GOOGLE-TASKS-1"
description: "GOOGLE-TASKS-1 Error Code"
fetched_at: "2026-09-01T13:30:21.744Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The Google Drive instance associated with this Google Tasks connector is not configured, or its setup has not finished.

## Resolution[​](#resolution "Direct link to Resolution")

-   Google Tasks reuses the identity and Directory Admin of an associated Google Drive instance. Ensure a Google Drive instance is set up and associated with this Google Tasks connector.
-   Confirm the associated Google Drive instance has completed setup and shows as **Active** in the Admin Console (**Setup → Connectors**) before validating Google Tasks.
-   If no Google Drive instance exists yet, set one up first, then associate it with Google Tasks in the connector configuration.

For additional assistance, contact [Glean Support](https://support.glean.com).
