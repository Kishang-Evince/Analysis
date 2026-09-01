---
url: "https://docs.glean.com/troubleshooting/error-codes/egnyte/egnyte-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/egnyte/egnyte-1"
title: "EGNYTE-1"
description: "EGNYTE-1 Error Code"
fetched_at: "2026-09-01T13:30:13.272Z"
---
On this page

## Possible error[​](#possible-error "Direct link to Possible error")

-   Unable to fetch users from the Egnyte instance.

## Possible reasons[​](#possible-reasons "Direct link to Possible reasons")

-   The Egnyte domain is missing the full `https://yourdomain.egnyte.com` format.
-   The admin did not complete the authorization flow.
-   API access is restricted by organization security policies.
-   The admin account is disabled or lost required permissions.

## Possible resolutions[​](#possible-resolutions "Direct link to Possible resolutions")

To resolve this error, try one or more of the following resolutions:

### Verify the Egnyte domain[​](#verify-the-egnyte-domain "Direct link to Verify the Egnyte domain")

Confirm that the domain matches the required format: `https://yourdomain.egnyte.com`.

### Re-run authorization as an admin[​](#re-run-authorization-as-an-admin "Direct link to Re-run authorization as an admin")

Click **Authorize** on the setup page and complete the login using an Egnyte admin account.

### Validate API access and permissions[​](#validate-api-access-and-permissions "Direct link to Validate API access and permissions")

Ensure your Egnyte instance allows API access and that your admin account has permission to manage users.

For more information, see [Egnyte requirements](/connectors/native/egnyte#requirements).

If you continue to see this error, contact [Glean Support](https://support.glean.com).
