---
url: "https://docs.glean.com/troubleshooting/error-codes/netsuite/netsuite-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/netsuite/netsuite-1"
title: "NETSUITE_1"
description: "NETSUITE_1 Error Code"
fetched_at: "2026-09-01T13:30:28.716Z"
---
On this page

## Possible error[​](#possible-error "Direct link to Possible error")

-   NetSuite OAuth credentials and certificate validation failed.

## Possible reasons[​](#possible-reasons "Direct link to Possible reasons")

-   Invalid or incorrectly formatted certificate.
-   Invalid or incorrectly formatted private key.
-   Incorrect OAuth credentials (Consumer Key, Consumer Secret, Token ID, Token Secret).
-   Missing or incomplete authentication data.
-   Invalid Account ID.

## Possible resolutions[​](#possible-resolutions "Direct link to Possible resolutions")

To resolve this error, try one or more of the following resolutions:

### Verify the certificate and private key[​](#verify-the-certificate-and-private-key "Direct link to Verify the certificate and private key")

Upload the certificate generated from the NetSuite integration record and confirm the private key matches it and uses the correct format.

### Validate account ID format[​](#validate-account-id-format "Direct link to Validate account ID format")

Confirm the NetSuite account ID is correct and includes the environment suffix when required, for example, `account_id-sb1` for sandbox environments.

### Recheck OAuth credentials[​](#recheck-oauth-credentials "Direct link to Recheck OAuth credentials")

Verify that Consumer Key, Consumer Secret, Token ID, and Token Secret match the NetSuite values with no extra spaces.

### Confirm token based authentication and permissions[​](#confirm-token-based-authentication-and-permissions "Direct link to Confirm token based authentication and permissions")

Ensure the integration record has token based authentication enabled and the access token role has the required permissions.

For more information, see [NetSuite connector](/connectors/native/netsuite/).

If you continue to see this error, contact [Glean Support](https://support.glean.com).
