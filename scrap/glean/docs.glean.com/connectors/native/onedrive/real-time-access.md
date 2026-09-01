---
url: "https://docs.glean.com/connectors/native/onedrive/real-time-access"
canonical: "https://docs.glean.com/connectors/native/onedrive/real-time-access"
title: "Real-time access for OneDrive"
description: "Supplement indexed OneDrive results with live data from Microsoft 365."
fetched_at: "2026-09-01T13:29:37.387Z"
---
On this page

Glean can supplement indexed results from OneDrive with real-time results fetched directly from Microsoft 365. This ensures users can find recently created or updated content without waiting for a full crawl cycle.

## How real-time access works[​](#how-real-time-access-works "Direct link to How real-time access works")

Real-time access retrieves content live from OneDrive when a query targets this source. This applies to the following Glean surfaces:

### Search[​](#search "Direct link to Search")

Any query that specifies `app:onedrive`, or search results explicitly filtered for OneDrive, can include real-time results alongside indexed results.

### Assistant and agents[​](#assistant-and-agents "Direct link to Assistant and agents")

When Assistant or an agent is highly confident that a query is about OneDrive — for example, when the user mentions OneDrive or includes a link — it adds real-time search results from that source to the chat context.

Explicitly specifying `app:onedrive` in a query or agent run also triggers real-time results. Assistant and agents can also scope real-time results to a specific OneDrive folder.

## Supported content[​](#supported-content "Direct link to Supported content")

Real-time access supports the following content types:

| Source | Supported content |
| --- | --- |
| **OneDrive** | Documents |

Glean also supports native file access for Microsoft Excel (`.xlsx`) files stored in OneDrive. When native file access is available, Assistant and agents can read the original spreadsheet rather than extracted text, preserving formatting, formulas, and structure.

## Enable real-time access[​](#enable-real-time-access "Direct link to Enable real-time access")

Which setup do you have?

The administrator steps in this section apply when OneDrive was connected to Glean through the [previous setup](/connectors/native/onedrive/setup), where real-time access is a separate option that an administrator enables. If OneDrive was connected through the [new setup](/connectors/native/onedrive/new-setup), real-time access is already enabled and there is no checkbox to select. End-user authentication is required on both paths, so continue at [Authenticate end users](#authenticate-end-users).

Enabling real-time access requires both administrator setup and end-user authentication:

-   Configuring your **Admin console** and **Azure portal**
-   Having end users authenticate

### Configure the Admin console and Azure portal[​](#configure-the-admin-console-and-azure-portal "Direct link to Configure the Admin console and Azure portal")

A Glean admin must enable data fetching for OneDrive, and a Microsoft Global Admin must configure additional permissions in Azure.

#### Enable data fetching in the Admin console[​](#enable-data-fetching-in-the-admin-console "Direct link to Enable data fetching in the Admin console")

Enable data fetching for OneDrive:

1.  Navigate to **Admin console > Connectors**.
2.  Select **OneDrive**.
3.  Go to the **Setup** tab.
4.  Select the checkbox to enable data fetching.

#### Configure delegated permissions in Azure[​](#configure-delegated-permissions-in-azure "Direct link to Configure delegated permissions in Azure")

A [Microsoft Global Admin](https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles) must add delegated permissions to your Glean application in Azure:

1.  Sign in to the [Azure portal](https://portal.azure.com/).
    
2.  Search and navigate to your Glean application.
    
3.  In the left navigation, select **Manage > API Permissions**.
    
4.  Select **Add a permission**, then select **Microsoft Graph**.
    
5.  Choose **Delegated permissions** and add the following:
    
    -   `offline_access`
    -   `User.Read`
    -   `Files.ReadWrite.All`
    -   `Sites.Read.All`

tip

Grant `Files.ReadWrite.All` so Glean can access files from shared URLs. See Microsoft's [Accessing shared driveItems](https://learn.microsoft.com/en-us/graph/api/shares-get?view=graph-rest-1.0&tabs=http#permissions) documentation for details.

info

These delegated permissions are separate from the application permissions used for crawling. They enable per-user, on-demand access to content that may not yet be indexed.

#### Configure the OAuth redirect URL[​](#configure-the-oauth-redirect-url "Direct link to Configure the OAuth redirect URL")

Set up an OAuth redirect URL so Glean can complete the user authentication flow:

1.  In the Azure portal, navigate to your Glean application's **Authentication → Platform configurations**.
2.  Select **Add a platform**.
3.  Enter the [tenant backend domain URL](https://app.glean.com/admin/about-glean) under **Server instance (QE)** for your deployment.
4.  Select **Configure** to save.

note

These instructions apply to the standard Azure Portal App Authentication experience, not the preview experience.

### Authenticate end users[​](#authenticate-end-users "Direct link to Authenticate end users")

After the admin configuration is complete, each user must authenticate with OneDrive to use real-time access:

-   **Proactively:** Users navigate to **Your Settings > Connectors** and select **OneDrive** to authenticate.
-   **On demand:** Glean prompts users to authenticate when a query includes a link to a document that Glean has not indexed yet.

Consider communicating to your organization that real-time access is available and encouraging users to authenticate.

## Frequently asked questions[​](#frequently-asked-questions "Direct link to Frequently asked questions")

### Are there performance considerations?

Yes. Because real-time access retrieves content live from OneDrive, results may be slower than indexed results in some cases.

### Does real-time access increase Microsoft API usage?

Yes. Real-time access generates Microsoft API calls when users trigger queries that include live results. Because these calls are on demand rather than part of a full crawl, the impact is generally lower than indexing.

### Can users summarize live-fetched documents from search?

Not directly from the search results page. To summarize real-time fetched content, open or paste the OneDrive link in Glean, where Glean fetches the content live.

### Are NoCrawl settings, redlists, and greenlists supported?

No. For OneDrive, these restrictions are not applied during indexing or real-time access.

### Can I enable real-time access for a subset of users?

No. Real-time access is enabled at the organization level and cannot target a specific group of users.

### Can Assistant and agents scope real-time OneDrive results to a specific location?

Assistant and agents can narrow real-time OneDrive results to a specific folder.
