---
url: "https://docs.glean.com/connectors/native/panopto/setup"
canonical: "https://docs.glean.com/connectors/native/panopto/setup"
title: "Panopto setup"
description: "Learn how the Panopto connector works and how to configure it for Glean."
fetched_at: "2026-10-13T08:50:10.136Z"
---
On this page

This page explains how to prepare Panopto, create an API client, authorize the connector, and start the initial crawl.

## Requirements[​](#requirements "Direct link to Requirements")

To use the Panopto connector, you need:

-   A Panopto instance that exposes the public Panopto APIs and allows server‑to‑server connections from Glean.
-   A Panopto administrator who can:
    -   Register an OAuth 2.0 client for Glean.
    -   Obtain or approve client credentials (client ID and client secret).
    -   Approve the required API scopes for reading users, groups, folders, sessions, permissions, and captions.
-   A Glean org admin (or equivalent) with permission to add and configure connectors in the Glean **Admin console**.

If your Panopto instance is behind a firewall or uses a private domain, you must allow outbound traffic from your Glean deployment to the Panopto APIs for the connector to work.

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

### Step 1: Identify your Panopto Hostname[​](#step-1-identify-your-panopto-hostname "Direct link to Step 1: Identify your Panopto Hostname")

1.  Sign in to your Panopto instance as an administrator.
2.  Review the URL in your browser's address bar. Your hostname is the domain portion of that URL.
    -   **Cloud-hosted example:** `company.hosted.panopto.com`
    -   **On-premises example:** `panopto.mycompany.edu`
3.  Copy this hostname and enter it into the **Panopto Hostname** field on the Glean setup page.

**Note:** Ensure you do not include `https://` or any trailing slashes when entering the hostname.

### Step 2: Create an API client in Panopto[​](#step-2-create-an-api-client-in-panopto "Direct link to Step 2: Create an API client in Panopto")

1.  In Panopto, click the **gear icon** in the bottom-left corner to open **System Settings**.
2.  Navigate to the **API Clients** tab and click **New**.
3.  Configure the client with the following settings:
    -   **Client Name:** `Glean Panopto Client`
    -   **Client Type:** `Server-side Web Application`
    -   **Redirect URL:** Copy the Redirect URL shown on the Panopto setup page in the Glean **Admin console**. Glean provides the specific value for your deployment; it will look like: `<INSTANCE_URL>/PANOPTO/oauth/verify_code`
    -   **CORS Origin URL:** Leave empty.
    -   **Post Logout Redirect URL:** Leave empty.
4.  Click **Create** to generate your credentials.
5.  **Copy the Client ID and Client Secret immediately.** The secret may only be visible once.

### Step 3: Configure in Glean[​](#step-3-configure-in-glean "Direct link to Step 3: Configure in Glean")

1.  Go to **Admin console** → **Connectors** → **Add connector** and select **Panopto**.
    
2.  Enter a name for your Panopto connector.
    
3.  Enter the following Panopto details:
    
    -   **Panopto Hostname:** Enter the hostname identified in Step 1.
    -   **OAuth2 Client ID:** Paste the ID from Step 2.
    -   **OAuth2 Client Secret:** Paste the Secret from Step 2.
4.  Click **Save** to store your configuration.
    

### Step 4: Authorize[​](#step-4-authorize "Direct link to Step 4: Authorize")

1.  Click **Authorize** to open the Panopto OAuth2 authorization window.
2.  Sign in with your Panopto Administrator account if prompted.
3.  Grant Glean permission to access your Panopto content.
4.  Once authorization is complete, you will see a success message.

### Step 5: Start the initial crawl[​](#step-5-start-the-initial-crawl "Direct link to Step 5: Start the initial crawl")

After authorization:

1.  In the Panopto connector page, start a crawl (for example, by clicking **Crawl now** if available, or waiting for the scheduled crawl to run).
2.  The connector will:
    -   Crawl users, groups, and folders for identity and permissions.
    -   Crawl sessions for metadata and permissions.
    -   Download and index captions where available.
3.  Once the crawl completes, Panopto videos begin appearing in Glean Search and can be used by Glean as grounding.
