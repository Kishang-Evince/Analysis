---
url: "https://docs.glean.com/troubleshooting/error-codes/okta/okta-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/okta/okta-1"
title: "OKTA-1"
description: "OKTA-1 Error Code"
fetched_at: "2026-09-01T13:30:28.873Z"
---
On this page

## Issue:[​](#issue "Direct link to Issue:")

-   Glean is unable to fetch users/apps. This is most likely caused by invalid authentication credentials.

## Resolution:[​](#resolution "Direct link to Resolution:")

If this issue has occurred during setup, confirm that the API access token entered in the admin console has the correct permissions.

1.  Log into your Okta organization with a **super admin** account.
2.  On the left-hand side, click **Security → API**.
3.  Click Tokens.
4.  Identify the token in use and click on its name to see details.
5.  Verify that the token was created by a Super Admin.
6.  Verify that "Token can be used from Any IP". If not, edit the token to reflect this permission and click save.

If this issue has occurred from an email alert, confirm that your Okta app integration is set up correctly.

1.  Log into your Okta organization with a **super admin** account.
2.  Navigate to **Applications** and verify that your Glean connector has not been deactivated or deleted.

-   If you are having trouble identifying the correct app, use the displayed client ID suffix on the Okta setup page in Glean's admin console to identify the app.

3.  In the app, verify that there is only 1 public key stored in the app.
4.  Click into the **Okta API Scopes** tab, and check that you have granted the following scopes:

-   **okta.users.read**
-   **okta.apps.read**
-   **okta.logs.read**

5.  Click into the **Admin roles** tab, and check that the app has been granted the **Read-only Administrator** role.
6.  If still having issues, please refer to the Okta setup page in your admin console.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
