---
url: "https://docs.glean.com/troubleshooting/error-codes/okta/okta-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/okta/okta-2"
title: "OKTA-2"
description: "OKTA-2 Error Code"
fetched_at: "2026-09-01T13:30:28.903Z"
---
On this page

## Issue:[​](#issue "Direct link to Issue:")

-   Glean is unable to fetch users/apps. This is most likely caused by invalid authentication credentials.

## Resolution:[​](#resolution "Direct link to Resolution:")

-   Confirm that your Okta app integration is setup correctly.

1.  Confirm that you are using a **super admin** account to create your Okta app integration.
2.  Log into your Okta organization with a **super admin** account.
3.  Navigate to **Applications** and verify that your Glean connector has not been deactivated or deleted.
4.  Click into the application and confirm that you are copying the correct **Client ID** and **domain** into the Okta setup page in Glean.
5.  Verify that there is only 1 public key stored in the app, and this public key corresponds to the public key displayed in the Glean admin console.
6.  Click into the **Okta API Scopes** tab, and check that you have granted the following scopes:

-   **okta.users.read**
-   **okta.apps.read**
-   **okta.logs.read**

7.  Click in the **Admin roles** tab, and check that the app has been granted the **Read-only Administrator** role.
8.  If still having issues, please refer to the Okta setup page in your admin console.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
