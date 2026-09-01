---
url: "https://docs.glean.com/troubleshooting/error-codes/fathom/fathom-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/fathom/fathom-1"
title: "FATHOM_1"
description: "FATHOM_1 Error Code"
fetched_at: "2026-09-01T13:30:13.224Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean can't retrieve the Fathom user list, which it needs to identify users who can authorize access to their Fathom content. Fathom restricts this API to account admins, so setup can't complete unless an account admin authorizes the connector. Other potential causes include an invalid access token or a temporary connectivity issue.

## Resolution[​](#resolution "Direct link to Resolution")

**Authorize the connector as a Fathom admin:** If the connector was authorized by a non-admin or has not been authorized yet, identify a Fathom account admin for your workspace.

1.  In the Glean **Admin console**, go to **Connectors** and select **Fathom**.
2.  Click **Authorize** and sign in using the Fathom admin account.

Note: The OAuth app credentials do not need to change; only the authorizing account must be updated.

**Verify and update the OAuth credentials:**

1.  In Fathom, go to **Settings** > **API Access** and select the app registered for Glean.
2.  Copy the **Client ID** and **Client Secret**.
3.  In the Glean **Admin console**, open the Fathom connector settings.
4.  Paste the credentials into **OAuth Client ID** and **OAuth Client Secret**.
5.  Click **Save**, then click **Authorize** to complete setup.

**Verify the Production redirect URL:**

1.  In the Glean **Admin console**, open the Fathom setup page and copy the displayed **Redirect URL**.
2.  In Fathom, open your app settings and paste it into **Production redirect URL**.
3.  Ensure the URL matches exactly, including the scheme, host, and path.

Note: Always copy and paste the URL directly. Do not construct or edit it manually.

**Retry setup after a brief delay:** If the credentials and redirect URL are correct, the failure may be due to a transient network or service disruption. Wait a few minutes, then retry setup.

Until an account admin authorizes the connector, Glean can't discover your Fathom users. Users will not be prompted to connect their accounts or shown an error explaining the setup block. Since Fathom indexes content per user, this can leave the connector with little or no indexed content.

For additional assistance, contact [Glean Support](https://support.glean.com).
