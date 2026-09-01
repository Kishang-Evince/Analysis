---
url: "https://docs.glean.com/troubleshooting/error-codes/veevavault/veevavault-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/veevavault/veevavault-1"
title: "VEEVAVAULT_1"
description: "VEEVAVAULT_1 Error Code"
fetched_at: "2026-09-01T13:30:32.508Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean was unable to authenticate with your Veeva Vault instance during connector setup validation. This error occurs when Glean attempts to authenticate using the provided credentials (username/password or OAuth). Possible causes include:

### Username/Password Authentication[​](#usernamepassword-authentication "Direct link to Username/Password Authentication")

-   The Vault URL is incorrect, unreachable, or does not point to a valid Veeva Vault instance.
-   The username or password entered during setup is incorrect.
-   The username is missing the domain suffix (e.g., should be `glean-api-user@yourdomain.com`, not just `glean-api-user`).
-   The user account is inactive or the password has not been set.
-   A firewall or network policy is blocking access to the Vault API.

### OAuth Authentication[​](#oauth-authentication "Direct link to OAuth Authentication")

-   **OAuth Token Failure** — Verify that the Token Endpoint URL, Client ID, and Client Secret are correct. Ensure your IdP enables the `client_credentials` grant type for the OAuth client.
-   **OAuth Session Exchange Failed** — the OIDC Profile ID does not match the profile configured in Vault Admin. If using an API gateway, the Session Exchange Base URL or required custom headers may be incorrect.
-   **API Gateway (Kong) Errors** — custom headers are incorrectly configured, or the OAuth client is not authorized for the gateway routes.

## Resolution[​](#resolution "Direct link to Resolution")

To fix this issue:

### Username/Password Authentication[​](#usernamepassword-authentication-1 "Direct link to Username/Password Authentication")

1.  Verify the **Vault URL** is correct and accessible. In Glean, enter only the Vault domain (for example `company.veevavault.com`) without `http://` or `https://`. You can test reachability by opening `https://company.veevavault.com` in a browser (use your actual domain).
2.  Confirm the **username** includes the full domain suffix (e.g., `glean-api-user@yourdomain.com`). This is shown on the user's profile page in Veeva Vault under **Admin** > **Users & Groups** > **Vault Users**.
3.  Confirm the **password** is correct. If you are unsure, reset it by navigating to the user's profile page and selecting Tools > **Reset Password**.
4.  Ensure the user account is active. Check that the **Activation Date** in the user's **Details** section is set to today or earlier.

### OAuth Authentication[​](#oauth-authentication-1 "Direct link to OAuth Authentication")

1.  **OAuth Token Failed**: Verify the **Token Endpoint URL** is correct and reachable. Confirm the **Client ID** and **Client Secret** match what is configured in your identity provider. Ensure the OAuth client has the `client_credentials` grant type enabled in your IdP.
2.  **OAuth Session Exchange Failed**: Verify the **OIDC Profile ID** matches the profile configured in Vault Admin under **Admin** > **Settings** > **OAuth 2.0 / OpenID Connect Profiles**. If using an API gateway, verify the **Session Exchange Base URL** points to the correct gateway endpoint and that any required **custom headers** are configured.
3.  **API Gateway (Kong) Errors**: Verify that custom headers (e.g., API keys, routing headers) are correctly configured in the Glean Admin UI. Confirm the OAuth client is authorized for the gateway routes used by the Veeva Vault API.

For more information, see [Veeva Vault connector](/connectors/native/veeva-vault/).

For additional assistance, contact Glean Support at [https://support.glean.com](https://support.glean.com).
