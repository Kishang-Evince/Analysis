---
url: "https://docs.glean.com/troubleshooting/error-codes/salesloft/salesloft-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/salesloft/salesloft-1"
title: "SALESLOFT_1"
description: "Resolve the SALESLOFT_1 Salesloft authentication error."
fetched_at: "2026-10-13T08:51:14.911Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean could not validate the Salesloft credentials or could not use the resulting access token to read the Salesloft team endpoint.

## Possible reasons[​](#possible-reasons "Direct link to Possible reasons")

-   The Application ID (Client ID) or Client secret is incorrect or missing.
-   The Salesloft private application does not use the **Client Credentials** grant.
-   The private application does not include the `team:read` scope.
-   The account that created the private application does not have enough access to the Salesloft team or workspace.
-   Salesloft temporarily rejected the request.

## Resolution[​](#resolution "Direct link to Resolution")

### Verify the private application[​](#verify-the-private-application "Direct link to Verify the private application")

In Salesloft, open **Account → Your Applications → OAuth Applications** and confirm that the application:

-   Uses the internal application option.
-   Uses the **Client Credentials** grant.
-   Includes the `team:read` scope.
-   Was created by a **Super Admin**, **Team Admin**, or equivalent administrator with workspace-wide access.

### Re-enter the credentials[​](#re-enter-the-credentials "Direct link to Re-enter the credentials")

Copy the **Application ID (Client ID)** and **Secret (Client Secret)** from Salesloft. In the Glean **Admin console**, open the Salesloft connector and replace the values in **Application ID (Client ID)** and **Client secret**. Click **Save**, then click **Authorize**.

### Check the remaining scopes[​](#check-the-remaining-scopes "Direct link to Check the remaining scopes")

If authentication succeeds but one or more record types are missing, compare the private application's scopes with the complete list in [Salesloft setup](/connectors/native/salesloft/setup#step-1-create-a-private-application-in-salesloft). Add any missing scopes, save the application, and authorize the connector again.

If the error continues, contact [Glean Support](https://support.glean.com) with the connector instance name and error text. Do not send the Client Secret.
