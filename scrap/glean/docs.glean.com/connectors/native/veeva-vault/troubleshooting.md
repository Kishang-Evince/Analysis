---
url: "https://docs.glean.com/connectors/native/veeva-vault/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/veeva-vault/troubleshooting"
title: "Veeva Vault troubleshooting and FAQs"
description: "Learn how the Veeva Vault connector works and how to configure it for Glean."
fetched_at: "2026-09-01T13:29:46.275Z"
---
On this page

This page covers issues most often reported on the Veeva Vault connector. For setup steps, see the [Veeva Vault setup guide](/connectors/native/veeva-vault/setup).

## Setup and connection[​](#setup-and-connection "Direct link to Setup and connection")

### Glean cannot connect to Veeva Vault[​](#glean-cannot-connect-to-veeva-vault "Direct link to Glean cannot connect to Veeva Vault")

**Symptoms:**

-   Glean cannot reach your Veeva Vault instance during setup.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Incorrect Vault URL:** The URL includes a protocol prefix or is otherwise malformed. | Verify that the Vault URL is correct. Enter only the Vault domain, for example `company.veevavault.com`, without `http://` or `https://`. |

### The integration user is not active[​](#the-integration-user-is-not-active "Direct link to The integration user is not active")

**Symptoms:**

-   Setup or crawling fails because the Glean integration user is inactive.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Activation Date in the future:** The user has not been activated yet. | Make sure the user's **Activation Date** is set to today or an earlier date. |

### The integration user has no password set[​](#the-integration-user-has-no-password-set "Direct link to The integration user has no password set")

**Symptoms:**

-   The integration user has not set a password yet.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Password never set:** The welcome email was not completed. | Use **Tools > Reset Password** from the user profile page to send a reset email. |

## Authentication and access[​](#authentication-and-access "Direct link to Authentication and access")

### Setup fails with an authentication error[​](#setup-fails-with-an-authentication-error "Direct link to Setup fails with an authentication error")

**Symptoms:**

-   Setup cannot complete and returns an authentication error.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Incorrect username or password:** The username is missing its full domain suffix, or the password is wrong. | Verify that the username includes the full domain suffix, for example `glean-integration@example.com`, and that the password is correct. |

### API access is denied even though credentials are valid[​](#api-access-is-denied-even-though-credentials-are-valid "Direct link to API access is denied even though credentials are valid")

**Symptoms:**

-   The credentials are accepted, but setup still fails.
-   Errors reference API access.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Missing API access permission:** The user's security profile does not include API access. | Make sure the user's security profile includes the **Glean Integration** permission set with API access enabled. |

### OAuth token request fails[​](#oauth-token-request-fails "Direct link to OAuth token request fails")

**Symptoms:**

-   Glean cannot obtain an access token from your IdP.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Token Endpoint URL is wrong or unreachable:** Glean cannot reach the IdP token endpoint. | Verify that the **Token Endpoint URL** is correct and reachable from the network where Glean is hosted. |
| **Client credentials do not match the IdP:** The Client ID or Client Secret is incorrect. | Verify that the **Client ID** and **Client Secret** match the values configured in your identity provider. |
| **`client_credentials` grant not enabled:** The OAuth client cannot use the client credentials flow. | Confirm that the OAuth client has the `client_credentials` grant type enabled in your IdP. |
| **Invalid scopes:** The requested scopes are not valid for the client. | If you specified **Scopes**, confirm they are valid for your OAuth client configuration. |

### OAuth session exchange fails[​](#oauth-session-exchange-fails "Direct link to OAuth session exchange fails")

**Symptoms:**

-   Glean obtains an access token, but the Veeva Vault session exchange fails.

| Likely cause | Fix / Remediation |
| --- | --- |
| **OIDC Profile ID mismatch:** The profile ID does not match the one configured in Veeva Vault. | Verify that the **Vault OIDC Profile ID** matches the profile configured in Veeva Vault under **Admin** > **Settings** > **OAuth 2.0 / OpenID Connect Profiles**. |
| **Wrong Session Exchange Base URL:** The gateway endpoint is incorrect. | If using an API gateway, verify that the **Session Exchange Base URL** points to the correct gateway endpoint. |
| **Malformed custom headers:** The gateway requires headers that are missing or invalid. | If your gateway requires custom headers, verify that the **Custom Headers** JSON is correctly formatted and includes the required keys and values. |

### A Veeva session expires during crawling[​](#a-veeva-session-expires-during-crawling "Direct link to A Veeva session expires during crawling")

**Symptoms:**

-   A Veeva session expires while Glean is connected.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Expired Vault session:** Veeva sessions are time-limited. | No action required. Glean automatically re-authenticates when a session expires. |

## Missing content[​](#missing-content "Direct link to Missing content")

### No documents are indexed[​](#no-documents-are-indexed "Direct link to No documents are indexed")

**Symptoms:**

-   Setup succeeds, but no documents are indexed.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Dynamic Access Control not fully configured:** One or more required objects are missing. | Verify that Dynamic Access Control is configured correctly. The document type group, application role, sharing rule, user role setup, and lifecycle security settings must all be in place. |

### Document content is missing from indexed documents[​](#document-content-is-missing-from-indexed-documents "Direct link to Document content is missing from indexed documents")

**Symptoms:**

-   Documents appear in Glean, but their content is missing.

| Likely cause | Fix / Remediation |
| --- | --- |
| **File Staging access not granted:** The integration user cannot access the staging area. | Verify that the **File Staging: Access** permission is enabled in the **Glean Integration** permission set and that the Glean integration user can access the staging area. |

## FAQs[​](#faqs "Direct link to FAQs")

### What URL should I enter in Glean?

Enter the Vault domain only, such as company.veevavault.com. The setup form already applies the https:// prefix and rejects values that include http:// or https://.

### Can I use a custom security profile instead of System Administrator?

Yes. Create the custom Glean Integration permission set and add it to a custom security profile such as Glean Integration Profile. This is the recommended approach when you do not want to grant full System Administrator access.

### Do I need Dynamic Access Control if I use a custom security profile?

Yes. When you use the custom Glean Integration Profile, Dynamic Access Control determines which documents the Glean integration user can access and index. Without this configuration, the integration user will not be able to see any documents.

### Can I limit which document types Glean indexes?

Yes. You can restrict access by configuring Dynamic Access Control with a dedicated document type group, such as Glean Accessible Documents, and adding only the document types and sub-types that Glean should index.

### Should I use OAuth 2.0 or username and password?

Use **OAuth 2.0 Client Credentials** if your organization requires OAuth for system-level integrations or if you access Veeva Vault through an API gateway such as Kong. Otherwise, **username and password** authentication is simpler to set up and works for most environments.
