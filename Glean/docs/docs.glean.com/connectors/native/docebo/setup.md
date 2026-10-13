---
url: "https://docs.glean.com/connectors/native/docebo/setup"
canonical: "https://docs.glean.com/connectors/native/docebo/setup"
title: "Docebo setup"
description: "Connect Docebo to Glean by registering an OAuth app in Docebo and entering the resulting credentials in the Glean Admin console."
fetched_at: "2026-10-13T08:49:49.320Z"
---
On this page

Connect Docebo to Glean by registering an OAuth app in Docebo and entering the resulting credentials in the Glean **Admin console**.

## Requirements[​](#requirements "Direct link to Requirements")

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   A valid Docebo cloud instance.
-   The Docebo API and SSO App installed and activated in your Docebo instance.
-   Administrative privileges in the Glean **Admin console**.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   An admin-level Docebo login with permission to create OAuth2 applications.
-   A Client ID and Client Secret obtained by registering the Glean app in Docebo.

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   The authorizing admin account must be enrolled in all courses you want to be searchable in Glean.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

To connect Glean to Docebo, you must provide the following Docebo details:

-   Docebo domain
-   Docebo vanity URL
-   Client ID
-   Client secret

### Step 1: Determine the domain of your Docebo instance[​](#step-1-determine-the-domain-of-your-docebo-instance "Direct link to Step 1: Determine the domain of your Docebo instance")

1.  Sign in to your Docebo instance as an admin. Copy the URL in the URL bar, keeping only the part that comes after the *https://* and up to the *.com*. The expected format is: `yourdomain.docebosaas.com`.
2.  Enter this value into the **Docebo domain** field in the Glean **Admin console**.

### Step 2: Determine the vanity URL of your Docebo instance (if applicable):[​](#step-2-determine-the-vanity-url-of-your-docebo-instance-if-applicable "Direct link to Step 2: Determine the vanity URL of your Docebo instance (if applicable):")

1.  You may have a Docebo vanity URL different from the Docebo domain. The vanity URL will usually not mention Docebo, and it is often set up to make it easier for employees to remember and navigate to important Docebo content. An example is: employee-learning.company.com
2.  If applicable, enter the vanity URL into the *Docebo vanity URL* input box on the Glean setup page. Else, leave the field blank.

### Step 3: Create an OAuth app and upload the client ID and client secret[​](#step-3-create-an-oauth-app-and-upload-the-client-id-and-client-secret "Direct link to Step 3: Create an OAuth app and upload the client ID and client secret")

Docebo offers multiple ways to authenticate and obtain an access token. Follow the steps that correspond to your environment's configuration.

-   Glean's Docebo connector supports the **Authorization Code + Implicit Grant** type by default.
-   If your application is configured to use the **JSON Web Token (JWT) Bearer grant type**, contact [Glean support](http://gleanwork.zendesk.com/) to enable it.

For more information on different types of authentication mechanisms in Docebo, see [API documentation](https://help.docebo.com/hc/en-us/articles/360020082060-APIs-authentication).

-   Authorization Code + Implicit grant type
-   JWT Bearer grant type

1.  Install the **API and SSO App** in your Docebo instance if you haven't already. Complete these steps before proceeding with the connector configuration.
    1.  Open the **Admin Menu**(gear icon, top right) and click **Add New Apps**.
    2.  Select the **Third Party Integrations** tab under **Browse apps and features**.
    3.  Find **API and SSO App** and click **Activate App** or **Try it for free**. Confirm by clicking **Install Now**.
2.  Refresh the page, then go to **Admin Menu** > **API and SSO** > **Manage** to open the Settings page.
3.  Click **Add OAuth2 app** in the **API credentials** tab.
4.  Enter **Glean** as the **App name** and **Glean OAuth app** as the **App description**.
5.  Set a **Client ID** and enter it in the `Client ID` field of Docebo and `Client ID` Glean setup page. Copy the **Client secret** from Docebo into the `Client secret` field of the Glean setup page.
6.  Set the **Redirect URI** in Docebo to: `https://tenant_id-be.glean.com/instance/DOCEBO/oauth/verify_code`. Copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, and replace [https://tenant\_id-be.glean.com](https://tenant_id-be.glean.com) with it.
7.  Check **Show advanced settings** and enable the **Authorization code + implicit grant** grant type.
8.  Click **CONFIRM** in Docebo.

warning

Activate the app by clicking the checkmark in the app's row until it turns from grey to green. The app will not work until activated.

info

Enroll the service account admin in every course you want searchable in Glean. Glean can only access courses where this admin is enrolled.

9.  Return to the Docebo connector setup page in Glean. If you haven't already, enter the **Docebo domain** and **Docebo vanity URL** you determined in Step 1 and Step 2.
10.  Click **Authorize** to save your credentials and initiate an OAuth 2.0 authorization flow between Docebo and Glean. If necessary, log in as a Docebo admin during the flow.

1.  Install the **API and SSO App** in your Docebo instance if you haven't already:
    1.  Open the **Admin Menu** (gear icon, top right) and click **Add New Apps**.
    2.  Select the **Third Party Integrations** tab under **Browse Apps and Features**.
    3.  Find **API and SSO App** and click **Activate App** or **Try it for free**. Confirm by clicking **Install Now**.
2.  Refresh the page, then go to **Admin menu** > **API and SSO** > **Manage** to open the Settings page.
3.  Click **Add OAuth2 app** in the **API credentials** tab.
4.  Enter `Glean` as the **App name** and `Glean OAuth app` as the **App description**.
5.  Set a **Client ID** and enter it in both Docebo and the Glean setup page. Enter the Docebo admin account's username into the **Admin Username** field in the Glean setup page.
6.  Check **Show advanced settings** and enable the **JWT Bearer** grant type.
7.  Generate a public/private key pair in Privacy-Enhanced Mail (PEM) format using the OpenSSL command-line tool:
    1.  Generate the private key:
        
        ```
        openssl genrsa -des3 -out doceboprivate.pem 2048                                                                       
        ```
        
    2.  Extract the public key:
        
        ```
        openssl rsa -in doceboprivate.pem -outform PEM -pubout -out docebopublic.pem                                           
        ```
        
    3.  Convert the private key to encrypted PKCS8 format. Enter a passphrase when prompted:
        
        ```
        openssl pkcs8 -topk8 -inform PEM -outform PEM -in ./doceboprivate.pem -out doceboprivate8.pem                          
        ```
        
    4.  Upload `docebopublic.pem` to the **Upload public key** field in Docebo.
    5.  Copy the full contents of `doceboprivate8.pem` into the **Private key** field in the Glean setup page. Preserve all  
        spacing and line breaks.
    6.  Enter the passphrase you created in step 7.3 into the **Passphrase** field.
8.  Click **CONFIRM** in Docebo.

warning

Activate the app by clicking the checkmark in the app's row until it turns from grey to green. The app will not work until  
activated.

info

Enroll the service account admin in every course you want searchable in Glean. Glean can only access courses where this admin is enrolled.

9.  Return to the Docebo connector setup page in Glean. If you haven't already, enter the **Docebo domain** and **Docebo vanity URL** you determined in Step 1 and Step 2.
10.  Click **Save** to store your credentials. JWT Bearer setup completes immediately, with no additional authorization redirect.
