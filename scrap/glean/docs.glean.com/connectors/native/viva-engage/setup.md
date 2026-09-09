---
url: "https://docs.glean.com/connectors/native/viva-engage/setup"
canonical: "https://docs.glean.com/connectors/native/viva-engage/setup"
title: "Set up the Viva Engage connector"
description: "Register the Azure app, grant permissions, and configure the Microsoft Viva Engage connector in Glean."
fetched_at: "2026-09-01T13:29:47.150Z"
---
On this page

This section covers setup requirements, permissions, and configuration for the Viva Engage connector.

## Before you start[​](#before-you-start "Direct link to Before you start")

Have these in place before you configure the connector:

-   **Native Mode** - your Viva Engage instance must be running in [Native Mode](https://learn.microsoft.com/en-us/viva/engage/native-mode-guide). On-premises variants are not supported.
-   **A Verified Administrator account** - you need a [Viva Engage Verified Administrator](https://learn.microsoft.com/en-us/viva/engage/eac-key-admin-roles-permissions#verified-administrator) account, with permission to register applications in Microsoft Entra ID.
-   **An Azure AD app registration** - you'll register an app and obtain its client secret, application (client) ID, and directory (tenant) ID during setup.
-   **Delegated permissions** - the connector uses OAuth 2.0 delegated authentication. See [Required permissions](#required-permissions) for the exact scopes to grant.

## Required permissions[​](#required-permissions "Direct link to Required permissions")

The connector app must be granted the following **delegated permissions** in Azure AD, with admin consent.

**Tell us what you need, and we’ll build the request.**

The baseline permissions are always included. Select any extras below and the permission set updates instantly. Then copy it to hand to your IT or security team, so every scope is requested in one pass.

Index Viva Engage community messagesAlways includedReads community messages via the Viva Engage Data Export API on behalf of the authorizing Verified Administrator.

Permissions to request from ITCopy request

Microsoft Graph API Delegated

-   `User.Read`Signs in the administrator and reads their basic profile.
-   `offline_access`Issues a refresh token so Glean maintains access without repeated sign-in.
-   `openid`Enables OpenID Connect sign-in.
-   `email`Reads the administrator's email address claim.
-   `profile`Reads basic profile claims, such as name.

Viva Engage (Yammer) API Delegated

-   `access_as_user`Calls the Viva Engage Data Export API on behalf of the signed-in Verified Administrator to read community messages.
-   `user_impersonation`Grants delegated access to the Viva Engage API as the authorizing administrator.

## Known limitations[​](#known-limitations "Direct link to Known limitations")

-   **Real-time updates.** The connector relies on scheduled crawls and does not support webhooks or near-real-time activity tracking.
-   **Deployment.** The connector is designed for cloud-hosted Viva Engage instances in **Native Mode** and does not support on-premises variants.

## Setup steps[​](#setup-steps "Direct link to Setup steps")

### Register a new application in Azure AD[​](#register-a-new-application-in-azure-ad "Direct link to Register a new application in Azure AD")

1.  Sign in to your **[Azure portal](https://portal.azure.com/)** as an administrator.
    
2.  Select **Microsoft Entra ID**, and navigate to **Manage** → **App registrations** → **New registration**.
    
3.  On the **Register an application** page, enter the following details:
    
    -   **Name:** `Glean Viva Engage Application`
    -   **Supported account types:** `Accounts in this organizational directory only (Single tenant)`
    -   **Redirect URI:** Select **Web** and enter the URL: `https://tenant_id-be.glean.com/instance/yammer/oauth/verify_code`
    
    Copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, and replace `https://tenant_id-be.glean.com` with it.
    
4.  Click **Register**.
    

### Configure API permissions[​](#configure-api-permissions "Direct link to Configure API permissions")

1.  On the left navigation on the **Overview** page, click **Manage** → **API Permissions**.
2.  Click **Add a permission** and select **Microsoft Graph**.
3.  Choose **Delegated permissions** and add the following permissions:
    -   `User.Read`
    -   `offline_access`
    -   `email`
    -   `openid`
    -   `profile`
4.  Click **Add a permission** again and select **Yammer**.
5.  Choose **Delegated permissions** and add `access_as_user` and `user_impersonation`.
6.  Click **Grant admin consent** to finalize the permissions.

### Generate a client secret and copy credentials[​](#generate-a-client-secret-and-copy-credentials "Direct link to Generate a client secret and copy credentials")

1.  Navigate to **Microsoft Entra ID** → **Manage** → **App registrations** and click the application you created.
    
2.  Select **Manage** → **Certificates & secrets**.
    
3.  Under **Client secrets**, click **New client secret**. Enter a descriptive name and select an expiry time (24 months recommended), then click **Add**.
    
4.  **Copy the `Value` of the new secret.** This is your client secret and will not be displayed again.
    
    note
    
    Save the secret **Value**, not the **Secret ID**.
    
5.  Navigate back to the **Overview** page and copy the **Application (client) ID** and **Directory (tenant) ID** from the Essentials panel.
    

### Connect in Glean[​](#connect-in-glean "Direct link to Connect in Glean")

1.  In the Glean Admin console, navigate to **Connectors** → **Add connector**, then select Yammer.
2.  Enter a **Name** for your connector.
3.  Enter the following values:
    -   Client secret
    -   Application (client) ID
    -   Directory (tenant) ID
4.  Click **Authorize** and follow the generated link to sign in with your Verified Administrator account.

Upon successful authorization, Glean begins the initial crawl.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

-   **Permission propagation.** The connector honors Viva Engage's permission model - community membership determines access, and users only see messages from communities they belong to.
-   **Privileges.** The connector uses OAuth 2.0 delegated authentication and requests only the scopes it needs.
-   **Data privacy.** Glean extracts data within your cloud environment, and all indexed data respects source-system permissions.
