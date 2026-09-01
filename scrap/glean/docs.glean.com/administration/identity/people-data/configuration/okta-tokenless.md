---
url: "https://docs.glean.com/administration/identity/people-data/configuration/okta-tokenless"
canonical: "https://docs.glean.com/administration/identity/people-data/configuration/okta-tokenless"
title: "Okta People Data Tokenless Setup"
description: "Configure Okta as your People Data provider for Glean without use of an API Token"
fetched_at: "2026-09-01T13:29:01.954Z"
---
On this page

This guide provides step-by-step instructions for configuring Okta as your People Data provider for Glean, by manually setting up a JWK key pair.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

**Before beginning the setup process, please ensure that Glean support has enabled the tokenless setup flow for Okta.** Additionally, ensure that you have:

-   An active Okta administrator account
-   Access to your Glean admin account with **Admin** or **Setup Admin** roles

## Create the connector app in Okta[​](#create-the-connector-app-in-okta "Direct link to Create the connector app in Okta")

1.  Sign in to Okta as a **super admin**. Navigate to **Applications → Create App Integration**
    
2.  Select “API Services” for the type of app and name the app “Glean Connector” or something similar
    
3.  Click **Edit** under the “General Settings” section.
    
4.  Un-check "Require Demonstrating Proof of Possession (DPoP) header in token requests" and then click **Save**.
    
5.  Click on the **Okta API Scopes** tab, and grant the following scopes:
    
    -   **okta.users.read**
    -   **okta.apps.read**
    -   **okta.logs.read**
6.  Click on the **Admin roles** tab, and click **Edit assignments**.
    
7.  Under "Role", select "Read-only Administrator" and then click **Save Changes**.
    
8.  Navigate back to the **General** tab.
    

### Set up Okta in Glean Admin Console[​](#set-up-okta-in-glean-admin-console "Direct link to Set up Okta in Glean Admin Console")

1.  Navigate to the [Connectors page in Glean Admin Console](https://app.glean.com/admin/setup/apps), click **Add connector**, and then click on Okta.
    
2.  Copy the **Client ID** from Okta and paste it in the corresponding field on the setup page in Glean Admin Console.
    
3.  Check the URL of your Okta instance. Copy the {yourOktaDomain} part of the URL: `https://{'{yourOktaDomain}'}-admin.okta.com`. Paste it into the **Okta Domain** field in Glean.
    
4.  Click the **Generate JWK Key Pair** button. If successful, a JWK public key should be displayed on the page.
    

### Save JWK public key in Okta[​](#save-jwk-public-key-in-okta "Direct link to Save JWK public key in Okta")

1.  Back in Okta admin console, edit the settings under “Client Credentials” as follows:
    
    -   Client authentication - “Public key / Private key”
    -   Configuration - “Save keys in Okta”
    -   Click “Add key”
2.  A new window should pop up, asking for a public key - copy the JWK public key displayed in Glean and paste it here and **save your changes**.
    

### Complete the setup in Glean Admin Console[​](#complete-the-setup-in-glean-admin-console "Direct link to Complete the setup in Glean Admin Console")

Click **Save** at the bottom of the setup page in Glean to validate that your connector app is set up correctly.
