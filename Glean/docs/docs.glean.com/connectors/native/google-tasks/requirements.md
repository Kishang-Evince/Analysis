---
url: "https://docs.glean.com/connectors/native/google-tasks/requirements"
canonical: "https://docs.glean.com/connectors/native/google-tasks/requirements"
title: "Google Tasks requirements"
description: "Review the requirements for setting up the Google Tasks connector in Glean."
fetched_at: "2026-10-13T08:49:57.856Z"
---
On this page

Complete these requirements before you set up Google Tasks.

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   A Google Cloud project that hosts the service account used for Google Drive.
-   The Google Tasks API enabled in that project.
-   A connected Google Drive instance that has finished setup.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   The domain wide delegation client used to connect Google Drive.
-   The following OAuth scopes added to that client:
    -   `https://www.googleapis.com/auth/tasks.readonly`
    -   `https://www.googleapis.com/auth/admin.reports.audit.readonly`
-   No new service account. Google Tasks reuses the Google Drive domain wide delegation client.

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   A Google Super Admin account to set up the connector.
-   An associated Google Drive instance. The connector uses this instance for the Directory Admin and identity data that it needs to crawl Google Tasks.
