---
url: "https://docs.glean.com/connectors/native/loopio/setup"
canonical: "https://docs.glean.com/connectors/native/loopio/setup"
title: "Loopio setup"
description: "Create a read-only Loopio OAuth app and connect it to Glean using your subdomain, region, and OAuth credentials."
fetched_at: "2026-10-13T08:50:03.170Z"
---
On this page

Connect Loopio to Glean by creating a read-only OAuth app in Loopio, then entering its credentials, your subdomain, and your region in the Glean Admin console. You need a Loopio Administrator account to complete setup.

## Requirements[​](#requirements "Direct link to Requirements")

Complete these prerequisites before you connect Loopio to Glean. They cover the hosting and connectivity constraints, the credentials Glean needs, and the permissions required to create them.

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   Access to the Glean Admin console to add and configure the connector.
-   A Loopio tenant hosted in the **United States**. Other regions, including the EU, are not supported today.
-   Loopio credentials only work against the region they were created in, so the OAuth app and the region you select in Glean must match where your Loopio tenant is hosted.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   A Loopio **Administrator** account. Creating an OAuth app is restricted to administrators in Loopio, so a standard user can't complete setup.
-   An OAuth app created in Loopio, granting all five read-only scopes:
    -   `project:read`
    -   `project.participant:read`
    -   `user:read`
    -   `role:read`
    -   `mergeVariable:read`
-   The app's **Client ID** and **Client Secret**.
-   Your Loopio **subdomain**, taken from the URL you use to reach Loopio (`https://<your-subdomain>.loopio.com`).

Scopes are fixed when the app is created

Loopio fixes an app's scopes at creation and they can't be changed afterward. If a scope is missing, the only fix is to delete the app and create a new one, which means new credentials and repeating setup. Select all five scopes even if you're not sure you need one of them.

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   The Loopio Administrator role is required to create the OAuth app and obtain its credentials.
-   Glean enforces Loopio's native access model at query time: project access mirrors Loopio's participant list, and teams map to Glean groups.
-   Because Loopio's API exposes no per-role permissions, Glean honors only the immutable **Full Access** role. Users with custom roles see only the projects they participate in.
-   **Guest** users are excluded and won't see Loopio content in Glean.
-   All access is read-only. Glean never writes to Loopio.

## Set up Loopio[​](#set-up-loopio "Direct link to Set up Loopio")

### Before you start[​](#before-you-start "Direct link to Before you start")

You must have a Loopio **Administrator** account. Only Loopio administrators can create an OAuth app, so a standard user cannot complete these steps.

### Create an OAuth app in Loopio[​](#create-an-oauth-app-in-loopio "Direct link to Create an OAuth app in Loopio")

> ⚠️ **Choose the scopes carefully.** Loopio fixes an app's scopes when you create it, and they cannot be changed afterward. If a scope is missing, the only fix is to delete the app and start over, which means generating new credentials and repeating the setup. Select all five scopes listed in step 4, even if you are not sure you need one of them.

1.  Log in to [Loopio](https://login.loopio.com/lookup) as an administrator.
    
2.  Go to **Admin** > **Integrations**.
    
3.  Click **Add an App**.
    
4.  Grant the app **all five** of these scopes:
    
    | Scope | What Glean uses it for |
    | --- | --- |
    | `project:read` | Reading projects, their entries, and templates |
    | `project.participant:read` | Reading who has access to each project |
    | `user:read` | Reading users and teams |
    | `role:read` | Identifying Full Access administrators, and Guest users so they are excluded |
    | `mergeVariable:read` | Resolving merge variables so answers read the way they do in Loopio |
    
    > **Note:** All five are read-only. Glean never writes to Loopio.
    
5.  Give the app a descriptive name, such as `Glean`.
    
6.  Copy the **Client ID** and **Client Secret**. Store them securely for later use.
    

### Find your Loopio subdomain[​](#find-your-loopio-subdomain "Direct link to Find your Loopio subdomain")

Look at the URL you use to reach Loopio. It's of the form `https://<your-subdomain>.loopio.com`. For `https://acme.loopio.com`, the subdomain is `acme`.

Glean uses this to build links back to Loopio, so search results open the right project in your account.

### Select your Loopio region[​](#select-your-loopio-region "Direct link to Select your Loopio region")

Select the region that hosts **your Loopio tenant**. This is not the same region where your Glean instance runs.

Select **United States**. Glean supports only this region. Use credentials from the same region as your Loopio app. An app from another region will not authenticate.

### Set up Loopio in Glean[​](#set-up-loopio-in-glean "Direct link to Set up Loopio in Glean")

1.  Log in to the Glean **Admin console**.
2.  Enter the **Client ID** in the Client ID field.
3.  Enter the **Client Secret** in the Client Secret field.
4.  Enter your subdomain in the **Loopio subdomain** field . See **Find your Loopio subdomain** above.
5.  Choose **United States** for the region hosting **your Loopio tenant**. See **Select your Loopio region** above.
6.  Click **Save**.

### Troubleshoot setup failures[​](#troubleshoot-setup-failures "Direct link to Troubleshoot setup failures")

| What you see | What to check |
| --- | --- |
| Glean cannot reach the Loopio API with these credentials | Re-enter the Client ID and Client Secret; confirm the app still exists in **Admin** > **Integrations**; confirm the selected region matches where your Loopio tenant is hosted |
| The subdomain does not match your account | Compare the value you entered with the URL you use to reach Loopio. Glean reports both values so you can see the difference |
| The app is missing required scopes | Glean lists each missing scope. Because Loopio fixes an app's scopes when you create it, delete the app, create a new one with all five scopes, and re-enter the new credentials |

## See also[​](#see-also "Direct link to See also")

-   [Requirements](/connectors/native/loopio/requirements)
-   [Loopio overview](/connectors/native/loopio/overview)
-   [FAQ](/connectors/native/loopio/troubleshooting)
