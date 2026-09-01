---
url: "https://docs.glean.com/connectors/native/gcal/setup"
canonical: "https://docs.glean.com/connectors/native/gcal/setup"
title: "Google Calendar setup"
description: "Learn how to connect Google Calendar with Glean."
fetched_at: "2026-09-01T13:29:27.616Z"
---
On this page

You're reading the **previous setup**[Connecting Google Calendar for the first time? →](/connectors/native/gcal/new-setup)

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

You must complete the following prerequisites for a successful setup:

| Requirement | Details |
| --- | --- |
| **Admin access** | You must be a **Glean Administrator** and a **Google Workspace Administrator** able to manage APIs, domain-wide delegation, and app access. |
| **Google Drive connector** | The **Google Drive** connector must be installed and operational. It provisions the service account and domain-wide delegation that Google Calendar reuses for authentication. |
| **Google Calendar API enabled** | In the Google Cloud project backing the service account, the **Google Calendar API** must be enabled. Missing this is a common cause of validation failures and error `GOOGLECALENDAR-1`. |
| **Domain-wide delegation (DWD) scopes** | The DWD client ID used for GDrive must include at least: `https://www.googleapis.com/auth/admin.directory.user.readonly` `https://www.googleapis.com/auth/admin.directory.group.readonly` `https://www.googleapis.com/auth/drive.readonly` `https://www.googleapis.com/auth/admin.reports.audit.readonly` `https://www.googleapis.com/auth/calendar.readonly` (Calendar access) These build on the Drive setup with an additional Calendar scope. |
| **Directory Admin email** | The **Directory Admin email** configured in the Google Drive connector must be a valid Google Workspace user with Calendar enabled. The Calendar connector uses this identity for API validation. |
| **Calendar service enabled for OU (Organizational Unit)** | In **Google Admin → Apps → Google Workspace → Calendar**, the service must be ON for the OU containing the Directory Admin and the users whose calendars you want to index. |
| **Transcripts / Gemini notes (optional)** | For Meeting Summary agent to work, customers must have Google Meet transcription or Gemini note-taking enabled and producing documents that Glean can see via Google Drive. |

## Configuration and setup[​](#configuration-and-setup "Direct link to Configuration and setup")

### Step 1: Confirm Google Drive setup[​](#step-1-confirm-google-drive-setup "Direct link to Step 1: Confirm Google Drive setup")

1.  In **Glean Admin Console**, go to **Connectors** → **Google Drive** and verify that the connector is **Connected** and healthy.
    
    If it is not configured, complete those setups first. For more information, see [Connect to Google Drive](/connectors/native/gdrive/setup).
    

### Step 2: Add Calendar OAuth scopes in Google Admin console[​](#step-2-add-calendar-oauth-scopes-in-google-admin-console "Direct link to Step 2: Add Calendar OAuth scopes in Google Admin console")

1.  In the **Google Admin Console**, navigate to:  
    **Security** → **Access & data control** → **API controls** → **Domain-wide delegation**.
    
2.  Locate the **Client ID** used for Glean (the same one already configured for Google Drive).
    
3.  Click **Edit** on that client.
    
4.  In the **OAuth scopes (comma-delimited)** field, ensure the following scopes are present, adding any that are missing:
    
    ```
    https://www.googleapis.com/auth/admin.directory.user.readonly,https://www.googleapis.com/auth/admin.directory.group.readonly,https://www.googleapis.com/auth/drive.readonly,https://www.googleapis.com/auth/admin.reports.audit.readonly,https://www.googleapis.com/auth/calendar.readonly
    ```
    
5.  Click **Authorize** to save changes.
    

### Step 3: Enable the Google Calendar API[​](#step-3-enable-the-google-calendar-api "Direct link to Step 3: Enable the Google Calendar API")

1.  Go to the **Google Cloud Console** for the project that owns the Glean service account.
2.  Open **APIs & Services** → **Library**.
3.  Search for **Google Calendar API**.
4.  Ensure it is **Enabled**. If not, click **Enable**.

This step resolves a common configuration gap where scopes are correct, but the API itself is disabled, leading to validation failures during connector setup.

### Step 4: Configure Google Calendar in the Glean Admin console[​](#step-4-configure-google-calendar-in-the-glean-admin-console "Direct link to Step 4: Configure Google Calendar in the Glean Admin console")

1.  In **Glean Admin Console**, go to **Connectors** → **Google Calendar**.
    
2.  On the **Setup** tab, provide:
    
    -   **Name and icon** (optional) — How this connector appears to admins.
    -   **Associated Google Drive instance** — Choose the Google Drive connector instance whose service account and delegation should be reused for Calendar.
3.  Choose **data retrieval methods** (modes):
    
    -   **Data crawling and indexing** — Recommended. Enables indexed meeting search, hero meeting cards, Meeting Summary agent, and Calendar Search tools.
    -   **Data fetching** — On-demand federated queries to Google Calendar. Useful for lighter-weight access or complementary coverage.
4.  You can enable **both** modes for the best experience. The admin UI allows selecting one or both retrieval methods for the connector.
    
5.  Confirm that the UI indicates **Google Drive** prerequisites are met. There are no additional credentials beyond those used for Google Drive.
    
6.  Click **Save** to start validation and, if indexing is enabled, the **initial full crawl**.
    

### Step 5: Monitor the initial crawl and validation[​](#step-5-monitor-the-initial-crawl-and-validation "Direct link to Step 5: Monitor the initial crawl and validation")

After saving:

1.  The connector enters an **initial sync** phase, including validation of API access (using the Directory Admin identity) and the first full crawl of in-scope primary calendars.
2.  In **Admin Console** → **Platform** → **Connectors** → **Google Calendar**, monitor status:
    -   Once the crawl and subsequent indexing pass complete, the connector will report a **Healthy** state.
    -   If validation fails with an error like `GOOGLECALENDAR-1`, follow the troubleshooting guidance.
3.  Verify behavior by:
    -   Searching in Glean with the app`:googlecalendar` and a known meeting title.
    -   Checking for hero meeting cards and Meeting Summary icons on the home page for recent meetings with transcripts.
