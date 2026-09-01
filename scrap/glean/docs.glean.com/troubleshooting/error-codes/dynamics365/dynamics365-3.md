---
url: "https://docs.glean.com/troubleshooting/error-codes/dynamics365/dynamics365-3"
canonical: "https://docs.glean.com/troubleshooting/error-codes/dynamics365/dynamics365-3"
title: "DYNAMICS365_3"
description: "DYNAMICS365_3 Error Code"
fetched_at: "2026-09-01T13:30:12.968Z"
---
On this page

## Possible errors[​](#possible-errors "Direct link to Possible errors")

-   Failed to refresh access token for Dynamics 365
-   Invalid credentials provided for token authentication
-   Azure application authentication failure

## Possible reasons[​](#possible-reasons "Direct link to Possible reasons")

-   Client secret has expired.
-   Missing admin consent for API permissions.
-   Wrong tenant ID configuration.
-   Application disabled in Azure.
-   Network connectivity issues to `login.microsoftonline.com`.

## Possible resolutions[​](#possible-resolutions "Direct link to Possible resolutions")

To resolve this error, try one or more of the following resolutions:

### Generating a new client secret if the current one expired[​](#generating-a-new-client-secret-if-the-current-one-expired "Direct link to Generating a new client secret if the current one expired")

For information on generating a new client secret, see [Generate secret](/connectors/native/microsoft/microsoft-dynamics-365-connector#5-generate-secret).

### Ensuring all required permissions are added[​](#ensuring-all-required-permissions-are-added "Direct link to Ensuring all required permissions are added")

For more information on checking required permissions, see [Configure permissions](/connectors/native/microsoft/microsoft-dynamics-365-connector#3-configure-permissions).

### Granting admin consent[​](#granting-admin-consent "Direct link to Granting admin consent")

For more information on ensuring admin consent is granted, see [Grant admin consent](/connectors/native/microsoft/microsoft-dynamics-365-connector#4-grant-admin-consent).

### Verifying application status is enabled in Azure[​](#verifying-application-status-is-enabled-in-azure "Direct link to Verifying application status is enabled in Azure")

1.  Go to **Azure** portal → **Microsoft Entra ID** → **Enterprise applications** → **All applications**.
2.  Search and select your *Enterprise application*.
3.  Open **Properties**.
4.  Confirm **Enabled for users to sign-in** is set to *Yes*.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com).
