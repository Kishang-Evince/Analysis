---
url: "https://docs.glean.com/connectors/native/greenhouse/harvest-v3-migration"
canonical: "https://docs.glean.com/connectors/native/greenhouse/harvest-v3-migration"
title: "Update Harvest API credentials for v3"
description: "Update your Greenhouse connector credentials from Harvest API v1 to v3 before Greenhouse retires the older API on August 31, 2026."
fetched_at: "2026-09-01T13:29:31.484Z"
---
On this page

Greenhouse will retire Harvest API v1 on **August 31, 2026**. To keep your Greenhouse connector running in Glean after that date, add new Harvest v3 (OAuth) credentials to your existing connector. This update changes only the credentials. Glean keeps your Greenhouse content searchable during the update, with no re-indexing or downtime.

Important

If you do not update the credentials before August 31, 2026, the Greenhouse connector will stop indexing new and updated content until you add valid v3 credentials.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Access to Greenhouse as a Site Admin
-   Access to the Glean admin console

## Create v3 API credentials in Greenhouse[​](#create-v3-api-credentials-in-greenhouse "Direct link to Create v3 API credentials in Greenhouse")

1.  Sign in to [Greenhouse](https://app4.greenhouse.io/users/sign_in) as a **Site Admin**.
2.  In **My Dashboard**, click the gear icon in the top-right.
3.  Navigate to **Dev Center → API Credential Management**.
4.  Click **Create New API Credentials**.
    -   For **API Type**, select **Harvest V3 (OAuth)**
    -   For **Description**, enter `Glean Harvest v3 Credentials`
5.  Click **View and store credentials** — Greenhouse displays your *Client ID* and *Client Secret*.
6.  Copy the *Client ID* and *Client Secret* and store them somewhere safe — you'll paste them into Glean next. Then click **I have stored the client credentials**.
7.  Under **Manage Scopes**, check **Select All** to grant all scopes, then click **Save**.

## Enter the credentials in Glean[​](#enter-the-credentials-in-glean "Direct link to Enter the credentials in Glean")

1.  In the Glean **admin console**, you'll see a banner asking you to set up Harvest v3 (OAuth) credentials. Click **Set up Harvest v3** to open the setup page for your Greenhouse connector.
    
    Don't see the banner?
    
    In the **admin console**, click the **Connectors** tab in the side panel. Search for **Greenhouse**, open the connector, and click the **Setup** tab. Continue from step 2 below.
    
2.  Verify that the **Greenhouse Base URL** reflects your Greenhouse URL in the format `https://yourDomain.greenhouse.io` — no trailing slash or extra path.
    
3.  Enter your v3 credentials:
    
    -   **Client ID** — from the previous section
    -   **Client Secret** — from the previous section
4.  Leave your existing **Harvest API Key** and **Webhook Secret** in place — don't remove them.
    
5.  Click **Save**.
    

## Confirm validation[​](#confirm-validation "Direct link to Confirm validation")

1.  When you save, Glean checks the new credentials. This can take a few minutes.
2.  If the credentials are valid, you'll see **Saved** — Glean automatically switches to the v3 API and keeps the connection refreshed on its own.
3.  If you see **Failed to save changes**, click the help article link for the failed validation step. It redirects you to the specific troubleshooting page for resolving the failure.

## What to expect[​](#what-to-expect "Direct link to What to expect")

-   **No downtime, no re-indexing.** Existing Greenhouse results, their links, and their access permissions all stay intact during and after the update.
-   **No future steps required** for updating your Greenhouse connection.

## FAQs[​](#faqs "Direct link to FAQs")

Do I have to remove my old Harvest API Key?

Not during the update — keep it in place so there's no interruption. You can remove or revoke it after August 31, 2026.

Will search results break or lose history while I update?

No. Content, result links, and access permissions are preserved. There is no re-index and no gap in search.

What does the "Failed to save changes" error mean?

It means Glean couldn't validate a working set of credentials — most often the v3 client ID or client secret is missing or incorrect. Click the help article link displayed, which redirects you to the specific troubleshooting page.

How do I find or confirm my Greenhouse base URL?

Sign in to [Greenhouse](https://app4.greenhouse.io/users/sign_in) as a Site Admin and navigate to **My Dashboard**. Copy the URL from your browser's address bar and delete everything after `.io`. The result is your Greenhouse base URL.

Expected format: `https://yourDomain.greenhouse.io`

Why did validation fail on the base URL?

The base URL must be exactly your Greenhouse address in the format `https://yourDomain.greenhouse.io` — no trailing slash and no path after the domain.

Do I need to re-enter or recreate anything on the Glean side beyond the credentials?

No. Only the credentials change. All other connector settings stay as they are.

What happens if I don't update before August 31, 2026?

The v1 API is retired that day. Without valid v3 credentials, the Greenhouse connector stops pulling in new or updated content until you add v3 credentials.
