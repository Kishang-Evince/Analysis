---
url: "https://docs.glean.com/administration/tools/setup-tools/google-tools-setup"
canonical: "https://docs.glean.com/administration/tools/setup-tools/google-tools-setup"
title: "Google tools setup"
description: "Use Google tools to let Glean Assistant and Glean Agents export responses to Google Docs, Google Sheets, or as a draft in Gmail. With these tools, users can create documents and sheets with formatting preserved, or open a draft email in Gmail."
fetched_at: "2026-09-01T13:29:15.197Z"
---
On this page

Use Google tools to let Glean Assistant and Glean Agents export responses to Google Docs, Google Sheets, or as a draft in Gmail. With these tools, users can create documents and sheets with formatting preserved, or open a draft email in Gmail.

**Google tool setup depends on how and when your connector was deployed**

-   **[Google Drive](https://docs.glean.com/connectors/native/gdrive/new-setup), [Google Calendar](https://docs.glean.com/connectors/native/gcal/new-setup), or [Gmail](https://docs.glean.com/connectors/native/gmail/new-setup) connectors deployed using the new setup flow on or after August 14, 2026:** Associated tools are enabled automatically during connector setup. No separate manual tool setup is required.
-   **Google connectors deployed before August 14, 2026, or using the previous setup flow:** Follow the instructions below to deploy Google tools manually.

With this setup, you can:

-   Export assistant responses to Google Docs with formatting preserved.
-   Export tables to Google Sheets with headings preserved.
-   Export responses to Gmail as draft emails with formatting preserved.

info

Google Calendar, Google Docs, Google Sheets, and Gmail tools use OAuth for each teammate. Each teammate is prompted to connect the first time they run one of these tools. For help with authentication issues, see [Tools authentication](/troubleshooting/tools-authentication).

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before enabling Google tools:

-   The Google Drive connector must be configured.
-   You must have admin access to Glean Admin Console.
-   For Domain-wide Delegation: Google Workspace admin access to configure domain-wide delegation.
-   For custom OAuth: Sufficient permissions in Google Cloud Console to create OAuth credentials.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

Follow these steps to set up the Google tools:

1.  In Glean, go to **Admin Console → Platform → Tools**.
    
2.  Click **Add**.
    
3.  From the list in the **Add pre-set tools** section, select **Google Tools** under **Tool templates**.
    
4.  In the **Configuration** tab:
    
    1.  Add the **Instance Name**.
    2.  Select the **Data Instance** you want to link these tools to. This is the instance where docs and sheets will be created.
    3.  Configure authentication. Google tools support two authentication modes, depending on how the tools are configured:
    
    -   *Domain‑wide Delegation (DWD)*: supported only when Google tools are configured to use a central service account that can act on behalf of users across the domain.
    -   *OAuth user authentication*: used when Google tools run as the signed‑in user or on their behalf. The newer tools like Google Calendar, Google Docs, Google Sheets, and Gmail tools use OAuth user authentication and do not support Domain‑wide Delegation.

Choose an option below:

-   Domain‑wide delegation
-   OAuth user authentication

Use **Domain-wide Delegation** only for legacy Google tools that are enabled to run through a central service account.  
The new Google Calendar, Docs, Sheets, and Gmail tools are **OAuth-only** and do **not** use Domain‑wide Delegation.

Use **Domain-wide Delegation** if you want a central service account to act on behalf of users. A dedicated service account is used for Google tools (separate from the Google Drive connector). Google's [Domain-wide Delegation](https://knowledge.workspace.google.com/admin/apps/control-api-access-with-domain-wide-delegation) allows Glean to act on behalf of the logged-in Glean user to create documents, sheets, or emails.

Steps:

1.  Select **Domain-wide Delegation** under **Authenticate** on the Google Tools setup page in the Glean Admin console.
2.  Copy the 21-digit **Client ID** under **How to authenticate Drive** instructions.
3.  Go to the [Domain-wide Delegation section in Google Admin Console](https://admin.google.com/ac/owl/domainwidedelegation). You must be signed in as an admin.
4.  Click **Add new** and paste the 21-digit *Client ID* into the **Client ID** field.
5.  In the **OAuth scopes (comma-delimited)** field for this Domain‑wide Delegation client, paste the following and click **Authorize**:  
    `https://www.googleapis.com/auth/drive.file,https://www.googleapis.com/auth/gmail.compose,https://www.googleapis.com/auth/spreadsheets`
6.  Navigate to the [Google Cloud Console](https://console.cloud.google.com/) and go to **APIs & Services → Library**.
7.  Enable the **Google Drive API**, **Google Sheets API**, and **Gmail API**. For Gmail API, also enable the **People API**.

note

To use only **Google Docs and Sheets** (no Email tool) with **Domain‑wide Delegation**, add only:

-   `https://www.googleapis.com/auth/drive.file`
-   `https://www.googleapis.com/auth/spreadsheets`

Omit `https://www.googleapis.com/auth/gmail.compose`; the email export option will not appear without the Gmail scope.

Use **OAuth User** for the new **Google Calendar, Google Docs, Google Sheets, and Gmail tools**.  
These tools run as the logged‑in user and are **not** available via Domain‑wide Delegation.

With OAuth user authentication, documents, sheets, events, and emails are created on behalf of the user and stored in the user’s Google account (for example, in their Drive or Calendar).

-   Central authentication (Recommended)
-   Custom authentication

Use the **central** option if:

-   Your organization is *Glean‑hosted*, and
-   Central apps are available for *Google* in your environment.

Steps:

1.  Select **Central** under **Authenticate** section on the Google Tools setup page.
2.  Click **Save**.

End users are prompted to connect their Google account the first time they run a tool, and tokens are managed centrally thereafter.

note

Glean's OAuth app may show as unverified during Google's review. Until verified, admins can [authorize the unverified app](https://knowledge.workspace.google.com/admin/apps/authorize-unverified-third-party-apps). Otherwise users may see an unverified app message when authenticating.

Use the **custom** option if:

-   You want to use your own Google Cloud project and OAuth client for Google tools, or
-   Your security model requires a *customer-owned* OAuth app in Google Cloud Console.

Steps:

In order to setup OAuth for Google tools, follow these steps:

**Step 1: Choose the project in Google Cloud Console**

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  In the top bar, click the **project selector** (it usually shows your current project name).
3.  Either select an **existing project** your org uses for Google Workspace integrations, or create a **new project** dedicated to Glean Google Tools (for example, *Glean Google Tools*).

**Step 2: Enable the required Google APIs (scopes)**

1.  In the left navigation, go to **APIs & Services → Library**.
2.  Open the details page, search for **Google Drive API**, click \*\*Enable.
3.  Repeat for **Google Sheets API** and **Gmail API**.
4.  If you want to enable the Gmail tools, add the *People* API.

You must enable all three APIs in the same project for Docs, Sheets, and Email export to work. If Gmail or Sheets are not enabled, users will see "API not enabled" errors when exporting from Glean.

note

You can see the required scopes in the Glean admin console. Go to the **Google Tools** setup page in the Glean Admin Console, in the **Custom App** , locate the **Scopes** field to see the required scopes.

You can use the same OAuth client for Google Docs, Sheets, and Gmail tools, as long as the required APIs are enabled in the same Google Cloud project and the redirect URI matches the callback URL from Glean.

**Step 3: Configure the OAuth consent screen (if not already configured)**

1.  In the left navigation, go to **APIs & Services → OAuth consent screen**.
2.  Choose the user type: **Internal** (recommended for most Workspace domains) or **External** (only if you must allow accounts outside your domain).
3.  Fill in the required fields: **App name** (for example, *Glean Google Tools*), **User support email**, and **Developer contact information**.
4.  Click **Create**.

You only need to complete this once per project; subsequent OAuth client IDs reuse the same consent configuration.

**Step 4: Create the OAuth client credentials (Web application)**

1.  In the left navigation, go to **APIs & Services → Credentials**.
2.  Click **Create credentials → OAuth client ID**. If Google prompts you to configure the consent screen, complete Step 3 first, then return here.
3.  For **Application type**, select **Web application**.
4.  Enter a descriptive **Name** (for example, *Glean Google Tools OAuth Client*).
5.  Leave **Authorized redirect URIs** empty for now; you will add the Callback URL from Glean in Step 6.
6.  Click **Create**. Keep this page open or copy the **Client ID** and **Client secret** when shown. This information is required in Step 7.

**Step 5: In Glean Admin Console – copy the Callback URL**

1.  Go to the [Glean Admin Console](https://app.glean.com/admin) and navigate to **Platform → Tools**.
2.  Open your **Google Tools** tool configuration page.
3.  Under **Authentication**, select **OAuth User → Custom App**.
4.  Locate the **Callback URL** on the Google Tools setup page and copy it.

This Callback URL is the exact redirect URI that must be added to your OAuth client in Google Cloud Console.

**Step 6: Back in Google Cloud Console – add the redirect URI**

1.  Return to the **Credentials** page in Google Cloud Console and open your OAuth client.
2.  In **Authorized redirect URIs**, click **Add URI** and paste the **Callback URL** you copied from Glean Google Tools setup page.
3.  Click **Create**.

**Step 7: In Glean Admin Console – paste Client ID and Client Secret**

1.  Go back to the **Google Tools** setup page in the Glean Admin Console.
2.  In the **Custom App** , locate the **Client ID** and **Client Secret** fields.
3.  Paste the **Client ID** and **Client Secret** from the Google Cloud Console into the matching fields in Glean.
4.  Click **Save** on the Google Tools setup page.

After you configure authentication using the tab above, finish the setup:

1.  Click **Save**.
2.  Click **Edit settings** under **Enable Tools** to control which users can use these tools in Glean.

## See also[​](#see-also "Direct link to See also")

-   [Google Drive setup](https://docs.glean.com/connectors/native/gdrive/new-setup)
-   [Choose your Google Drive setup](https://docs.glean.com/connectors/native/gdrive/choose-your-setup)
-   [Google Calendar setup](https://docs.glean.com/connectors/native/gcal/new-setup)
-   [Choose your Google Calendar setup](https://docs.glean.com/connectors/native/gcal/choose-your-setup)
-   [Gmail setup](https://docs.glean.com/connectors/native/gmail/new-setup)
-   [Choose your Gmail setup](https://docs.glean.com/connectors/native/gmail/choose-your-setup)
