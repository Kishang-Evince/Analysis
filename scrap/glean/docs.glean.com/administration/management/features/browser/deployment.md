---
url: "https://docs.glean.com/administration/management/features/browser/deployment"
canonical: "https://docs.glean.com/administration/management/features/browser/deployment"
title: "Deploy the browser extension to managed devices"
description: "The Glean browser extension can either be manually installed by your users or pushed to managed devices by your IT admin."
fetched_at: "2026-09-01T13:29:08.763Z"
---
On this page

This page is for IT admins who want to deploy the Glean browser extension to company-managed devices. You can push a managed rollout of the Glean Chrome or Edge extension to all employees, so the extension installs on company-managed computers.

If you are an end user, see [Installing the browser extension](/user-guide/apps/installing-the-browser-extension) for installation and sign-in steps, then follow [Extension sidebar](/user-guide/apps/extension-sidebar) to use Chat, Search, and Agents.

-   Users can't turn off or uninstall the extension if it's installed in this manner.
-   The user's new tab page will be switched to Glean. Users can turn this off in their Glean settings.

-   Managed Chrome
-   Managed Edge

1.  Ensure you have or work with someone who has Google Workspace Admin privileges.
2.  Go to [https://admin.google.com/ac/chrome/apps/user](https://admin.google.com/ac/chrome/apps/user)

3.  Use the left bar to choose the organizational unit you would like to deploy the extension to. Even if this is being rolled out company-wide, it's good to select a company-wide organizational unit so that the extension will only be pushed on the Chrome profile associated with employees' work account.
    
4.  Hover over the **+** button in the bottom right corner and select **Add from Chrome Web Store**:
    

5.  Search for "Glean" and select the option corresponding to the Glean work extension (the first one pictured here):

6.  Click **Select** in the top right:

7.  The extension should appear as below. Click on it to open a right nav bar.

8.  In **Policy for extensions**, enter: `{ "BaseUrl": { "Value": "https://tenant_id-be.glean.com" }}`

Copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, and replace [https://tenant\_id-be.glean.com](https://tenant_id-be.glean.com) with it. An example is shown below.

9.  Click **Save** at the top after entering the **Policy for extensions** value:

10.  Hover over **Installation policy** for the extension and choose **Force install** or **Force install + pin to browser toolbar**:

11.  Click **Save** at the top:

You can use the [ExtensionInstallForceList](https://learn.microsoft.com/en-us/DeployEdge/microsoft-edge-policies#extensioninstallforcelist) policy to install the Glean extension silently.

1.  In the Group Policy Editor, go to **Administrative Templates** → **Microsoft Edge** → **Extensions** and then select **Control which extensions are installed silently**.
    
2.  Select **Enabled**.
    
3.  Click **Show**.
    
4.  Enter the following ID to install the Glean extension from the Chrome web store:
    
    ```
    cfpdompphcacgpjfbonkdokgjhgabpij;https://clients2.google.com/service/update2/crx
    ```
    

## Post-install experience[​](#post-install-experience "Direct link to Post-install experience")

Upon installation of the Glean extension via a managed push, all new users will see the below page to prompt them to sign in to Glean. Your company name, as set in the Glean admin settings, will be automatically populated in the popup to the user.

After signing in, share the [Extension sidebar](/user-guide/apps/extension-sidebar) with users so they know how to open the sidebar and use Chat and Search. If you have configured Agents for support platforms, users can follow the [Agents workflow](/user-guide/apps/extension-sidebar#agents) on supported pages.

## Email template[​](#email-template "Direct link to Email template")

Refer to the email template below for a company-wide communication to inform employees of a managed Chrome or Edge install.

> **Subject: New browser extension available for all employees**

> *Title: Key updates to your browser*

> In \[company name\]'s continued effort to support employee well-being and productivity, we are rolling out a new company-wide search tool, [Glean](https://www.glean.com/).

> Using Glean, you can search across all work applications we use at \[company name\]. Whether the document or answer you are looking for lives in \[GDrive, Slack, Email, Jira \*customize with your company's tools\] or with another colleague, Glean will help you search for and discover what you need to get your work done. All without remembering where all your documents are hosted or messaging multiple people.

> Starting \[launch date\], Glean will be installed on your Chrome browser. Note that this launch will replace your current default new tab page with Glean so that you can easily [access search across all company apps](/user-guide/apps/extension-sidebar).
