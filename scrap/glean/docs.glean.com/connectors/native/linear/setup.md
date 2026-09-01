---
url: "https://docs.glean.com/connectors/native/linear/setup"
canonical: "https://docs.glean.com/connectors/native/linear/setup"
title: "Linear setup"
description: "Configure the Glean Linear connector, including requirements, OAuth2 application registration, refresh-token support, and connector authorization in the Glean Admin console."
fetched_at: "2026-09-01T13:29:34.306Z"
---
On this page

You'll do the setup in two places: Linear to register the OAuth2 application and the **Glean Admin console** to save the credentials and complete authorization.

## Requirements[​](#requirements "Direct link to Requirements")

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   A Linear workspace.
-   Access to the **Glean Admin console**.
-   A paid Linear plan if you need Glean to index content from private teams.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   A Linear OAuth2 application's **Client ID** and **Client Secret**.
-   The callback URL for your Glean backend.

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   Linear administrator or workspace-owner access to create and manage the OAuth2 application.
-   Access to the teams and project documents you want Glean to crawl.
-   For best results, use an app configuration that supports refresh tokens before you authorize Glean.

## Step 1: Register a Linear OAuth2 application[​](#step-1-register-a-linear-oauth2-application "Direct link to Step 1: Register a Linear OAuth2 application")

1.  Sign in to Linear as an administrator or workspace owner.
2.  Open the [Create a new OAuth2 application](https://linear.app/settings/api/applications/new) page.
3.  On the application form, enter the following values:
    -   **Application name:** `Glean Application`
    -   **Developer name:** `Glean`
    -   **Developer URL:** `https://glean.com`
    -   **Callback URLs:** `https://tenant_id-be.glean.com/instance/linear/oauth/verify_code`
4.  In Glean, open [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean), copy your full backend URL from **Server instance (QE)**, and replace `https://tenant_id-be.glean.com` in the callback URL with that value.
5.  Create the application.

## Step 2: Enable refresh-token support if needed[​](#step-2-enable-refresh-token-support-if-needed "Direct link to Step 2: Enable refresh-token support if needed")

If you are connecting an existing Linear OAuth application, verify that the application is configured to support refresh tokens before you authorize Glean. If you enable refresh-token support after the connector was already authorized, re-authorize the connector in Glean.

## Step 3: Enter the credentials in Glean and authorize[​](#step-3-enter-the-credentials-in-glean-and-authorize "Direct link to Step 3: Enter the credentials in Glean and authorize")

1.  In Linear, copy the **Client ID** and **Client Secret** from the application details page.
2.  In the **Glean Admin console**, go to **Connectors** and select **Add connector**.
3.  Select **Linear**.
4.  Enter a connector name.
5.  Paste the **Client ID** and **Client Secret** into the corresponding fields.
6.  Select **Authorize** and complete the authorization flow in the new browser tab.
7.  Return to Glean and confirm the connector saves successfully.

## What happens next[​](#what-happens-next "Direct link to What happens next")

After you save the connector, Glean begins crawling the Linear issues, comments, project documents, and permission metadata that the connector can access. Because this connector does not use webhooks, updates depend on the scheduled crawl cadence.

## See also[​](#see-also "Direct link to See also")

-   [Linear overview](/connectors/native/linear/about)
