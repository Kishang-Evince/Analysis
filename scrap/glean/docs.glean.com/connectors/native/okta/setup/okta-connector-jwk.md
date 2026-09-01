---
url: "https://docs.glean.com/connectors/native/okta/setup/okta-connector-jwk"
canonical: "https://docs.glean.com/connectors/native/okta/setup/okta-connector-jwk"
title: "People data connector (JWK)"
description: "Set up the Okta people data connector using JWK key pair authentication for secure, tokenless crawling."
fetched_at: "2026-09-01T13:29:36.700Z"
---
On this page

This setup path creates a dedicated API Services app in Okta with JWK key pair authentication. This is the recommended approach for the people data connector when not using the [API token setup](/connectors/native/okta/setup/).

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Okta super admin account with permissions to create applications and manage API scopes.
-   Glean admin console access.
-   SSO must be configured before setting up the people data connector.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

### Step 1: Create the connector app in Okta[​](#step-1-create-the-connector-app-in-okta "Direct link to Step 1: Create the connector app in Okta")

1.  Sign in to Okta as a **super admin**.
    
2.  On the left nav, navigate to **Applications > Applications > Create App Integration**.
    
3.  Select **API Services** for the type of app and name it **Glean connector** in the **App Integration name** field.
    
4.  In your newly created app, click **Edit** under the **General Settings** section.
    
5.  Uncheck **Require Demonstrating Proof of Possession (DPoP) header in token requests** and click **Save**.
    
6.  Back in the app, click the **Okta API Scopes** tab and grant the following scopes:
    
    -   **okta.users.read**
    -   **okta.apps.read**
    -   **okta.logs.read**
    -   **okta.groups.read**

note

Glean requires the `okta.groups.read` scope to crawl groups and group memberships. This scope isn't required unless you use Okta group-based role mapping.

7.  In the app, click the **Admin roles** tab and click **Edit assignments**.
    
8.  Under **Role**, select **Read-only Administrator** and click **Save Changes**.
    
9.  Navigate back to the **General** tab.
    
10.  Copy the **Client ID** under **Client Credentials**.
     

### Step 2: Set up Okta in the Glean admin console[​](#step-2-set-up-okta-in-the-glean-admin-console "Direct link to Step 2: Set up Okta in the Glean admin console")

1.  In the Glean admin console, go to **Settings** > **Connectors** > **Add connector**. Search for Okta in the search bar and choose **Okta**.
    
2.  Copy the **Client ID** from Okta and paste it in the corresponding field in the Glean admin console.
    
3.  Check the URL of your Okta instance. Copy the `{yourOktaDomain}` part of the URL: `https://{yourOktaDomain}-admin.okta.com`. Paste it into the **Okta domain url** field.
    
4.  Click the **Generate JWK Key Pair** button. If successful, a JWK public key is displayed.
    

### Step 3: Save the JWK public key in Okta[​](#step-3-save-the-jwk-public-key-in-okta "Direct link to Step 3: Save the JWK public key in Okta")

1.  Back in the Okta admin console, go to the app you created and named **Glean Connector**.
    
2.  Edit the settings under **General > Client Credentials**:
    
    -   Set **Client authentication** to **Public key / Private key**.
    -   Click **Save**.
3.  Edit the settings under **General > Public keys**:
    
    -   Set **Configuration** to **Save keys in Okta**.
    -   Click **Add key**.
4.  In the **Add a public key** popup that appears, paste the JWK public key displayed in Glean and press **Done**.
    

### Step 4: Complete the setup[​](#step-4-complete-the-setup "Direct link to Step 4: Complete the setup")

1.  Click **Save** in the Glean admin console to validate that your connector app is set up correctly.

If you use Okta groups for Glean role mappings, follow the [native group setup steps](/connectors/native/okta/setup/#enable-native-groups-for-group-based-role-mapping) after completing this connector setup.

If you encounter any configuration issues or require further assistance, contact [Glean support](https://support.glean.com/hc/en-us/requests/new).
