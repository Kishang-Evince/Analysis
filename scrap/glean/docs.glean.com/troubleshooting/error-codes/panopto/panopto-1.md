---
url: "https://docs.glean.com/troubleshooting/error-codes/panopto/panopto-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/panopto/panopto-1"
title: "PANOPTO_1"
description: "PANOPTO_1 Error Code"
fetched_at: "2026-09-01T13:30:28.888Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The authenticated user does not have administrator privileges in Panopto. This error occurs during connector setup validation when Glean verifies that the OAuth-authenticated account has the required administrator role. Possible causes include:

-   The admin user has not authorized the Glean application in Panopto.
-   The access token for the admin user is missing or has expired.
-   The authenticated Panopto account does not have the administrator role.
-   The OAuth credentials could not be validated due to network or configuration issues.

## Resolution[​](#resolution "Direct link to Resolution")

To fix this issue:

1.  Ensure you are authenticating with a Panopto account that has the **Administrator** role. Viewer or Creator roles are not sufficient.
2.  Re-authenticate by going to the Panopto connector setup in the Glean Admin UI and completing the OAuth authorization flow with an administrator account.
3.  Verify that the Panopto user's role is set to **Administrator** in the Panopto admin settings under **Users**.
4.  If the error persists after re-authentication, check that the OAuth application (Client ID and Client Secret) is correctly configured in your Panopto instance under **System → Identity Providers**.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com).
