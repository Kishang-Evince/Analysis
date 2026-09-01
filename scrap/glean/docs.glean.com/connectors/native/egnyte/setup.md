---
url: "https://docs.glean.com/connectors/native/egnyte/setup"
canonical: "https://docs.glean.com/connectors/native/egnyte/setup"
title: "Egnyte setup"
description: "Connect Egnyte to Glean by finding your Egnyte domain and authorizing the Glean-Egnyte app. You need Egnyte admin access to complete setup. For large deployments, you can authorize additional admin accounts to spread crawl traffic and index content faster."
fetched_at: "2026-09-01T13:29:26.322Z"
---
On this page

Connect Egnyte to Glean by finding your Egnyte domain and authorizing the Glean-Egnyte app. You need Egnyte admin access to complete setup. For large deployments, you can authorize additional admin accounts to spread crawl traffic and index content faster.

## Find your Egnyte domain[​](#find-your-egnyte-domain "Direct link to Find your Egnyte domain")

1.  Sign in to Egnyte as an **admin**.
2.  In your browser, copy the URL from `https://` through `.com`.  
    For example: `https://yourdomain.egnyte.com/`
3.  Paste this value into the **Egnyte domain** field on the setup page.

## Authorize Egnyte with the Glean-Egnyte app[​](#authorize-egnyte-with-the-glean-egnyte-app "Direct link to Authorize Egnyte with the Glean-Egnyte app")

1.  In the Glean Admin console, go to **Connectors** and click **Add connector**.
2.  Select **Egnyte**.
3.  In the **Egnyte domain** field, paste your domain in this format: `https://yourdomain.egnyte.com`.
4.  Click **Authorize** to start the OAuth 2.0 flow.
5.  When prompted, sign in to Egnyte to grant Glean permission to index your data.

tip

Use a dedicated Egnyte service account instead of a personal admin account. Service accounts simplify access management, auditing, and long-term maintenance. groups.

## Authorize additional admin accounts[​](#authorize-additional-admin-accounts "Direct link to Authorize additional admin accounts")

Large Egnyte deployments can hit per-token API rate limits, making full crawls and incremental crawls slow and unpredictable. By authorizing multiple Egnyte admin accounts, Glean spreads crawl traffic across tokens, indexing content faster and keeping your data fresher. Permissions are unaffected — Glean continues to enforce Egnyte's native user and group-level access controls regardless of how many admin accounts are authorized.

1.  In the Glean Admin console, go to **Connectors > Egnyte > Setup**.
2.  Click **Authorize additional admin**.
3.  Sign in as the Egnyte admin or service account you want to authorize.
4.  Repeat steps 2–3 for each additional admin account.

Once authorized, each account appears in the **Authorized accounts** table on the setup page with its status and last-updated timestamp.

### Recommendations[​](#recommendations "Direct link to Recommendations")

-   Use dedicated Egnyte user accounts rather than personal admin accounts to simplify access management and auditing.
-   Authorize up to 5 admin accounts.

### Token expiration[​](#token-expiration "Direct link to Token expiration")

If an admin account's token expires, re-authorize it from the **Authorized accounts** table on the setup page.
