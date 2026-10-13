---
url: "https://docs.glean.com/get-started/setup/access-the-admin-ui"
canonical: "https://docs.glean.com/get-started/setup/access-the-admin-ui"
title: "Access the Admin console"
description: "Learn how to access the Glean Admin console and begin setup for your organization."
fetched_at: "2026-10-13T08:50:27.778Z"
---
On this page

Use the Glean **Admin console** to manage the Glean workspace for your organization, including setting up single sign-on (SSO), configuring connectors, and syncing people data.

Before you configure SSO, the **Admin console** runs in Central Workspace Setup (CWS) mode. CWS is the initial admin-only environment where designated administrators sign in using a magic link to perform the foundational setup before making the workspace available to the rest of your organization.

In CWS, you can configure and verify your SSO integration before Glean provisions your dedicated workspace. Verification confirms that your SSO configuration works, but it doesn't change how you sign in to CWS.

Configuring SSO in CWS doesn't activate SSO sign-in

Configuring or verifying SSO in Central Workspace Setup (CWS) doesn't activate SSO for sign-in. Continue using magic links until Glean provisions your dedicated workspace.

Once the workspace is ready, return to the SSO page, complete any tenant-specific configuration updates, and switch the deployment to SSO. See [Activate SSO](/get-started/setup/configure-sso#activate-sso).

Once you switch to SSO sign-in, end users and administrators access Glean through your SSO provider.

## Sign in to the **Admin console**[​](#sign-in-to-the-admin-console "Direct link to sign-in-to-the-admin-console")

To access the **Admin console** for your tenant, navigate to [https://app.glean.com/admin](https://app.glean.com/admin) in your web browser. If you are not already logged in, you will be prompted to do so.

![Enter your company email address to log in.](/img/get-started/adminui-login.webp)

Enter your company email address to log in.

Because Single Sign-On (SSO) is not active yet, Glean prompts you to check your email for a link to sign in. This is called a **magic link**. You continue to use magic links for CWS sign-in until Glean provisions your workspace and you activate SSO.

### What is a magic link?[​](#what-is-a-magic-link "Direct link to What is a magic link?")

A magic link is a single-use sign-in link that Glean emails to you instead of asking for a password. Glean doesn't issue passwords for the **Admin console**, so the magic link proves that you control the admin email address you entered.

Magic links work as follows:

-   **Emailed on request**: Each time you enter your email address at [app.glean.com/admin](https://app.glean.com/admin), Glean sends a new link to that address. Glean only sends the link to addresses that are already registered as Glean administrators.
-   **Short-lived**: The link expires about 15 minutes after Glean sends it. Request a new link if it expires.
-   **Single-use**: Clicking the link consumes it. A link that you already used doesn't work a second time, even before it expires.
-   **Starts a browser session**: After you click the link, Glean keeps you signed in for one day. When the session ends, request a new magic link.

Treat a magic link like a password. Anyone who opens the link before you do can sign in as you, so don't forward or share it.

note

If the link doesn't arrive, check your spam folder and confirm that the address you entered is registered as a Glean administrator. Glean shows the same confirmation screen whether or not the address belongs to an administrator, so a missing email often means the address isn't registered yet.

Click the magic link in your inbox to sign in.

![Check your email for a magic link to log in.](/img/get-started/adminui-magiclink.webp)

Check your email for a magic link to log in.

## Add additional administrators[​](#add-additional-administrators "Direct link to Add additional administrators")

When you sign in for the first time, Glean prompts you to add additional administrators before proceeding.

![Optionally, add additional administrators to your workspace.](/img/get-started/adminui-add-admins.webp)

Optionally, add additional administrators to your workspace.

There are two types of administrator roles, **Admin** and **Setup Admin**:

-   The **Admin** role has full read/write privileges across the **Admin console**. This role can add/remove other administrators, manage user permissions, configure connectors, start crawls, and customize the Glean workspace for the organization.
-   The **Setup Admin** role has restricted permissions and can only configure connectors and start crawls. This is the perfect role to give to the administrators of any cloud applications that you wish to connect to Glean.

For the full role reference, see [Administrator roles](/administration/identity/roles/admin-roles).

warning

Provide only select individuals within your organization with the Admin role.

To proceed, enter the emails of any additional administrators that you wish to add, or simply skip to the next step.

note

Are you hosting Glean in your own GCP or AWS environment?

You will need to follow the appropriate customer-hosted deployment guide for deploying Glean in GCP or AWS before you can proceed with the rest of this guide.

-   [GCP Deployment Guide](/get-started/prepare/self-hosted-deployment/gcp/deploy-gcp)
-   [AWS Deployment Guide](/get-started/prepare/self-hosted-deployment/aws/deploy-aws)
