---
url: "https://docs.glean.com/connectors/native/workfront/setup"
canonical: "https://docs.glean.com/connectors/native/workfront/setup"
title: "Adobe Workfront setup"
description: "Requirements and step-by-step configuration for the Adobe Workfront connector in Glean."
fetched_at: "2026-10-13T08:50:24.153Z"
---
On this page

Set up the Adobe Workfront connector:

-   Confirm the [requirements](#requirements).
-   [Create an OAuth2 application in Adobe Workfront](#workfront-setup).
-   [Configure the connector in Glean](#configure-glean).

## Requirements[​](#requirements "Direct link to Requirements")

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

To use the Adobe Workfront connector, you need:

-   An Adobe Workfront instance with API access enabled.
-   A user account with **System Administrator** access level in Adobe Workfront.
-   A Glean deployment with access to the **Admin console** to manage connectors.

Glean connects to Adobe Workfront via the Adobe Workfront APIs over HTTPS. It stores indexed data in your organization's Glean deployment.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

The connector uses the OAuth 2.0 JSON Web Token (JWT) Bearer grant. A JWT assertion is signed with a Privacy-Enhanced Mail (PEM) private key and exchanged for an access token. You need the following values from your Adobe Workfront instance:

-   **Server Domain**: your Adobe Workfront instance domain (for example, `yourcompany.my.workfront.com`).
-   **Client ID**: from your Adobe Workfront OAuth2 application.
-   **Client Secret**: from your Adobe Workfront OAuth2 application.
-   **Customer ID**: your Adobe Workfront customer identifier.
-   **Admin User ID**: the ID of a user with System Administrator access.
-   **Private Key (PEM)**: a PEM-encoded private key for JWT signing.

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

To configure the connector end to end, the person performing setup must:

-   Be an **Adobe Workfront System Administrator** (to create OAuth2 applications and manage users).
-   Be a **Glean admin** with permission to add and configure connectors.

## Adobe Workfront setup[​](#adobe-workfront-setup "Direct link to Adobe Workfront setup")

Before configuring the connector in Glean, create an OAuth2 application in your Adobe Workfront instance.

### 1\. Create an OAuth2 application[​](#1-create-an-oauth2-application "Direct link to 1. Create an OAuth2 application")

1.  Sign in to your [Adobe Workfront instance](https://one.workfront.com/) as a System Administrator.
2.  Go to **Setup** > **System** > **OAuth2 Applications**.
3.  Click **Create New OAuth2 Application**.
4.  Configure the application with the appropriate settings for server-to-server integration.
5.  Note the **Client ID** and **Client Secret** generated for the application.

### 2\. Collect the required credentials[​](#2-collect-the-required-credentials "Direct link to 2. Collect the required credentials")

Gather the following values to provide during Glean setup:

1.  **Server Domain**: your Adobe Workfront instance address (for example, `yourcompany.my.workfront.com`).
2.  **Client ID** and **Client Secret**: from the OAuth2 application you created.
3.  **Customer ID**: your Adobe Workfront customer identifier. Contact your Adobe Workfront administrator or Adobe support if you are unsure of this value.
4.  **Admin User ID**: navigate to the admin user's profile in Adobe Workfront and note the user ID from the address or user details.
5.  **Private Key (PEM)**: generate or obtain the PEM-encoded private key used for JWT authentication.

## Configure in Glean[​](#configure-in-glean "Direct link to Configure in Glean")

After you configure Adobe Workfront, complete setup in the Glean **Admin console**.

### 1\. Start connector setup[​](#1-start-connector-setup "Direct link to 1. Start connector setup")

1.  In the Glean **Admin console**, go to **Connectors** > **Add connector**.
2.  Search for **Adobe Workfront** and select the Adobe Workfront connector.
3.  Provide a **Name** and optional **Icon** for the connector. This label will appear for users in search results.
4.  On the Adobe Workfront connector setup page, enter the credentials you collected earlier:
    -   **Server Domain**: your Adobe Workfront instance domain.
    -   **Client ID**: from your Adobe Workfront OAuth2 application.
    -   **Client Secret**: from your Adobe Workfront OAuth2 application.
    -   **Customer ID**: your Adobe Workfront customer identifier.
    -   **Admin User ID**: the ID of the System Administrator user.
    -   **Private Key (PEM)**: the PEM-encoded private key for JWT authentication.

### 2\. Save and start the initial crawl[​](#2-save-and-start-the-initial-crawl "Direct link to 2. Save and start the initial crawl")

1.  Review your configuration.
2.  Click **Save** to complete setup.

Glean signs a JWT assertion and exchanges it for an access token via the OAuth 2.0 JWT Bearer grant, then starts an initial full crawl of Adobe Workfront content. Once the crawl finishes, Adobe Workfront results begin to appear in users' Glean search and AI experiences.
