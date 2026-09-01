---
url: "https://docs.glean.com/troubleshooting/error-codes/tools/google-tool-errors"
canonical: "https://docs.glean.com/troubleshooting/error-codes/tools/google-tool-errors"
title: "Google Tool Errors"
description: "Errors in Enabling Google Tools"
fetched_at: "2026-09-01T13:30:32.126Z"
---
While Enabling Google Tools in your Glean Admin Console, if you encounter the Error: **Error creating tools / Service Account doesn't have required scopes.** You need to review the Domain-wide-delegation setup permissions page and make sure the scopes are correctly defined.

**Required Scopes**:

-   [https://www.googleapis.com/auth/drive.file](https://www.googleapis.com/auth/drive.file)
-   [https://www.googleapis.com/auth/gmail.compose](https://www.googleapis.com/auth/gmail.compose)

note

You need to ensure you have provided Domain-wide-delegation (DWD) permissions to the service account with the client ID that pops up on the Setup instructions page while enabling Google Tools.
