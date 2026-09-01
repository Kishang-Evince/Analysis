---
url: "https://docs.glean.com/connectors/native/gmail/setup"
canonical: "https://docs.glean.com/connectors/native/gmail/setup"
title: "Gmail setup"
description: "Connect Gmail with Glean by adding the OAuth scope and configuring the connector."
fetched_at: "2026-09-01T13:29:30.842Z"
---
On this page

You're reading the **previous setup**[Connecting Gmail for the first time? →](/connectors/native/gmail/new-setup)

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Successful setup requires administrative access to both Glean and Google Workspace, along with an operational Google Drive connector.

| **Requirement** | **Details** |
| --- | --- |
| **Admin access** | Glean Administrator and Google Workspace Administrator access is required. |
| **Google Drive Connector** (*Not required if only **Data\_fetching** is used*) | The Google Drive connector must be installed and operational to index Gmail content. For more information, see [Google Drive authentication mechanisms](/connectors/native/gdrive/about#connector-credentials-requirements). |
| **Service account** | The service account must have [**Domain-wide Delegation**](https://knowledge.workspace.google.com/admin/apps/control-api-access-with-domain-wide-delegation) enabled and provide a Directory admin email. |
| **Required scopes** | The service account must be granted the following OAuth scope: `https://www.googleapis.com/auth/gmail.readonly` (read-only access to Gmail). |

## Setup[​](#setup "Direct link to Setup")

Follow these steps to configure the Gmail connector, starting in the Google Admin Console.

### Step 1: Add OAuth scopes in Google Admin console[​](#step-1-add-oauth-scopes-in-google-admin-console "Direct link to Step 1: Add OAuth scopes in Google Admin console")

1.  Go to the **Domain-wide Delegation** section in the [Google Admin Console](https://admin.google.com/ac/owl/domainwidedelegation).
2.  Click **Add new**. If you have already connected Google Drive with the same Client ID, click **Edit** on the existing client instead.
3.  Paste the 21-digit Unique ID (Client ID) into the **Client ID** field.
4.  Copy and paste the following into the **OAuth scopes (comma-delimited)** field:

```
https://www.googleapis.com/auth/gmail.readonly
```

5.  Click **Authorize**.

### Step 2: Configure and connect in Glean[​](#step-2-configure-and-connect-in-glean "Direct link to Step 2: Configure and connect in Glean")

1.  In the Glean Admin Console, navigate to **Connectors** and select the **Gmail** connector.
2.  Enter a **Name** and icon for your connector.
3.  **Select data retrieval methods:** Allow Glean to access data by checking both methods (recommended):
    -   **Data crawling and indexing**: Gathers and organizes data for fast access.
    -   **Live mode**: Retrieves live data on a per-query basis.
4.  **Associate Google Drive instance:** Select the corresponding **Google Drive** instance to associate with this Gmail connection.

> This option is visible if **Data crawling and indexing** method is selected.

5.  **Save:** Click **Save** to complete the connection.
