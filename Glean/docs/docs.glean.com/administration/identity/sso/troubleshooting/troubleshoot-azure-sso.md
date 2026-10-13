---
url: "https://docs.glean.com/administration/identity/sso/troubleshooting/troubleshoot-azure-sso"
canonical: "https://docs.glean.com/administration/identity/sso/troubleshooting/troubleshoot-azure-sso"
title: "Troubleshoot Azure SSO"
description: "Resolve common Azure Single Sign-On (SSO) authentication issues in Glean"
fetched_at: "2026-10-13T08:49:14.214Z"
---
On this page

This page covers login issues most often reported when Azure is your authentication method. For setup steps, see the [Entra ID OIDC configuration guide](/administration/identity/sso/configuration/entra-id-oidc).

## Authentication[​](#authentication "Direct link to Authentication")

### Users are sent back to the login screen after signing in[​](#users-are-sent-back-to-the-login-screen-after-signing-in "Direct link to Users are sent back to the login screen after signing in")

**Symptoms:**

-   The user completes sign-in with Azure but lands on the Glean login screen again.

| Cause | Fix |
| --- | --- |
| **Domain not allowed:** The user's email domain in Azure is not on your instance's allowed domains list. | Contact Glean Support to request that the user's domain be added to your instance's allowed domains list. |

### Sign-in fails with "SSO code exchange failed \[Error Code 13\]"[​](#sign-in-fails-with-sso-code-exchange-failed-error-code-13 "Direct link to Sign-in fails with \"SSO code exchange failed [Error Code 13]\"")

**Symptoms:**

-   Sign-in stops with the error `SSO code exchange failed [Error Code 13]`.

| Cause | Fix |
| --- | --- |
| **Expired client secret:** The client secret for your Azure App has expired. | Generate a new client secret in your Azure App configuration. In the **Admin console**, go to **Setup → Authentication**, select your Azure App, update the **Client Secret** field with the new value and the **Client secret expiration date** field with the expiration date from Azure, then save the App configuration. |

### Sign-in fails with "Cannot authenticate user from access token \[Error code 14\]"[​](#sign-in-fails-with-cannot-authenticate-user-from-access-token-error-code-14 "Direct link to Sign-in fails with \"Cannot authenticate user from access token [Error code 14]\"")

**Symptoms:**

-   Sign-in stops with the error `Cannot authenticate user from access token [Error code 14]`.

| Cause | Fix |
| --- | --- |
| **Missing user attributes:** The user information request fails because the email or name field is empty. Glean requires both fields in the user information response. | In the Azure admin portal, view the user's properties and confirm that both the email and name fields contain valid values. |

**Still not resolved?** Contact Glean Support with the affected user's email address and the exact error text shown at sign-in.
