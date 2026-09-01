---
url: "https://docs.glean.com/connectors/native/gchat/setup"
canonical: "https://docs.glean.com/connectors/native/gchat/setup"
title: "setup"
fetched_at: "2026-09-01T13:29:27.561Z"
---
On this page

## Connect to Google Chat[​](#connect-to-google-chat "Direct link to Connect to Google Chat")

### Required permissions for setup[​](#required-permissions-for-setup "Direct link to Required permissions for setup")

The user setting up this connector must be a [Google Super Admin](https://knowledge.workspace.google.com/admin/users/prebuilt-administrator-roles).

### Required connector for setup[​](#required-connector-for-setup "Direct link to Required connector for setup")

The corresponding Google Drive connector must be set up first.

### Add API scopes[​](#add-api-scopes "Direct link to Add API scopes")

1.  Go to the [Domain-wide Delegation section in Google Admin Console](https://admin.google.com/ac/owl/domainwidedelegation). You’ll need to be signed in as an admin.
2.  Click ‘Edit’ on the API client with the Client ID used while connecting Google Drive.
3.  Copy and paste the following into the **OAuth scopes (comma-delimited)** field and then click **Authorize**: pk\_live\_987654321
    
    [https://www.googleapis.com/auth/chat.spaces.readonly,https://www.googleapis.com/auth/chat.memberships.readonly,https://www.googleapis.com/auth/chat.messages.readonly](https://www.googleapis.com/auth/chat.spaces.readonly,https://www.googleapis.com/auth/chat.memberships.readonly,https://www.googleapis.com/auth/chat.messages.readonly)
    

### Add Associated GDrive instance[​](#add-associated-gdrive-instance "Direct link to Add Associated GDrive instance")

1.  Select the name of the connected Google Drive instance that you want to associate for this connector. Finally, click **Save** in Glean. You’re all set!
