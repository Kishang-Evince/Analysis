---
url: "https://docs.glean.com/connectors/native/google-tasks/setup"
canonical: "https://docs.glean.com/connectors/native/google-tasks/setup"
title: "Google Tasks setup"
description: "Learn how to connect Google Tasks with Glean."
fetched_at: "2026-10-13T08:49:58.209Z"
---
On this page

## Connect to Google Tasks[​](#connect-to-google-tasks "Direct link to Connect to Google Tasks")

### Required permissions for setup[​](#required-permissions-for-setup "Direct link to Required permissions for setup")

Use a [Google Super Admin](https://support.google.com/a/answer/2405986) account to set up this connector.

### Required connector for setup[​](#required-connector-for-setup "Direct link to Required connector for setup")

Set up the corresponding Google Drive connector first. Google Tasks reuses the Google Drive domain wide delegation client. You do not need a new service account.

### Enable the Google Tasks API[​](#enable-the-google-tasks-api "Direct link to Enable the Google Tasks API")

1.  Select the project where the Google Drive service account runs in the [Google Cloud Console](https://console.cloud.google.com/apis/library/tasks.googleapis.com).
    
2.  Enable the **Google Tasks API** for that project.
    

### Add API scopes[​](#add-api-scopes "Direct link to Add API scopes")

1.  Sign in as an administrator and open the [Domain wide Delegation section in Google Admin Console](https://admin.google.com/ac/owl/domainwidedelegation).
    
2.  Choose `Edit` on the API client used while connecting to Google Drive.
    
3.  Copy and paste the following into the **OAuth scopes (comma separated)** field and click **Authorize**: `https://www.googleapis.com/auth/tasks.readonly,https://www.googleapis.com/auth/admin.reports.audit.readonly`
    

![](/images/admin/google-delegated-domain-wide.png)  
  

### Add an associated Google Drive instance[​](#add-an-associated-google-drive-instance "Direct link to Add an associated Google Drive instance")

1.  Select the connected Google Drive instance to associate with this connector.

Click **Save** in Glean.
