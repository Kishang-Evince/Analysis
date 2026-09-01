---
url: "https://docs.glean.com/connectors/native/showpad/setup"
canonical: "https://docs.glean.com/connectors/native/showpad/setup"
title: "Showpad setup"
description: "Register an OAuth client in Showpad, provide the credentials to Glean, and authorize the Showpad connector."
fetched_at: "2026-09-01T13:29:42.054Z"
---
On this page

This page describes how to install and configure the Showpad connector. Setup takes place in both Showpad and the Glean Admin console.

To set up the Showpad connector:

-   Confirm the [requirements](#requirements).
-   Enter your [Showpad URL](#step-1-add-the-connector-and-enter-your-showpad-url) in Glean.
-   Register an [OAuth client](#step-2-register-an-oauth-client-in-showpad) in Showpad.
-   Provide the [credentials to Glean](#step-3-provide-the-credentials-to-glean) and authorize the connector.

## Requirements[​](#requirements "Direct link to Requirements")

To set up and operate the Showpad connector, ensure that the technical, credential, and permission requirements are met.

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   A Showpad cloud instance. Showpad does not offer a self-hosted deployment.
    
-   Administrator access to your Showpad instance, so that you can register an OAuth client.
    
-   Administrator access to the Glean **Admin console**.
    
-   Web connectivity between Glean and the Showpad hosts that the connector uses:
    
    -   `https://{subdomain}.showpad.com`, your Showpad tenant.
    -   `https://{subdomain}.showpad.biz`, which serves the OAuth authorization and token endpoints.
    -   `https://{subdomain}.api.showpad.com`, which serves the Showpad search and metadata APIs.
    
    Replace `{subdomain}` with your own Showpad subdomain in each host.
    

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   An OAuth client that you register in Showpad specifically for Glean. The connector authenticates with the client's **Client ID** and **Client Secret**, so record both values when Showpad displays them.
-   The redirect URL shown on the Glean connector setup page. The value is specific to your Glean deployment, so copy it from the setup page rather than reusing a value from another deployment.

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   Grant the OAuth client only the following four scopes. Glean needs read-only access to content, users, and divisions, plus the ability to refresh its own tokens.
    -   `refresh_token`
    -   `read_user_management`
    -   `read_contentprofile_management`
    -   `read_division_management`
-   Each user who searches Showpad in Glean must have a Showpad account. Glean uses that user's own Showpad permissions, so a user sees only the assets they are entitled to see in Showpad.

## Step 1: Add the connector and enter your Showpad URL[​](#step-1-add-the-connector-and-enter-your-showpad-url "Direct link to Step 1: Add the connector and enter your Showpad URL")

1.  In the Glean **Admin console**, go to **Connectors** and select **Add Connector**.
2.  Choose **Showpad** from the available connectors. If you cannot see this option, contact Glean support to enable it.
3.  In **Showpad URL**, enter the URL you use to access Showpad, for example `https://acme.showpad.com`. Glean keeps only the subdomain.
4.  Keep the setup page open. The next steps use the redirect URL that it displays, and you return to it to enter your credentials.

## Step 2: Register an OAuth client in Showpad[​](#step-2-register-an-oauth-client-in-showpad "Direct link to Step 2: Register an OAuth client in Showpad")

For reference, see Showpad's [OAuth client registration guide](https://developer.showpad.com/docs/apis/concepts/authentication#registration).

1.  Sign in to **Showpad** as an administrator and go to **Settings** → **Integrations** → **API**.
2.  Select **Manage OAuth Clients**, then select the **+** icon to add a new OAuth2 client.
3.  Configure the OAuth2 client with the following values:
    -   **Name**: `Glean`
    -   **Redirect URL**: copy the redirect URL from the Glean connector setup page
    -   **Description**: add a description of your choice
    -   **Website**: `https://www.glean.com`
4.  Under **Scope**, select only these four checkboxes:
    -   **Automatically refresh access tokens** (`refresh_token`)
    -   **View user related resources** (`read_user_management`)
    -   **View content related resources** (`read_contentprofile_management`)
    -   **View Division related resources** (`read_division_management`)
5.  Select **Update**. Showpad displays a **Client ID** and **Client Secret**.

## Step 3: Provide the credentials to Glean[​](#step-3-provide-the-credentials-to-glean "Direct link to Step 3: Provide the credentials to Glean")

1.  Copy the **Client ID** and enter it into the **OAuth Client ID** field in Glean.
2.  Copy the **Client Secret** and enter it into the **OAuth Client Secret** field in Glean.
3.  Select **Save** to save the credentials, then select **Authorize** to complete the OAuth setup.

note

Each user is prompted to authorize Glean with their own Showpad account the first time they search Showpad. Search results include only the content that user has access to in Showpad.

Showpad results become available as soon as a user authorizes Glean with their own Showpad account.

## See also[​](#see-also "Direct link to See also")

-   [Showpad overview](/connectors/native/showpad/about)
