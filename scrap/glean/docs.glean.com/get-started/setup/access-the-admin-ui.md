---
url: "https://docs.glean.com/get-started/setup/access-the-admin-ui"
canonical: "https://docs.glean.com/get-started/setup/access-the-admin-ui"
title: "Access the Admin console"
description: "Learn how to access the Glean Admin console and begin setup for your organization."
fetched_at: "2026-09-01T13:29:50.511Z"
---
On this page

Use the Glean **Admin console** to manage the Glean workspace for your organization, including setting up single sign-on (SSO), configuring connectors, and syncing people data.

Before you configure SSO, the **Admin console** runs in Central Workspace Setup (CWS) mode. CWS is the initial admin-only environment where designated administrators sign in using a magic link to perform the foundational setup before making the workspace available to the rest of your organization.

Once you switch to SSO sign-in, end users and administrators access Glean through your SSO provider.

## Sign in to the **Admin console**[​](#sign-in-to-the-admin-console "Direct link to sign-in-to-the-admin-console")

To access the **Admin console** for your tenant, navigate to [https://app.glean.com/admin](https://app.glean.com/admin) in your web browser. If you are not already logged in, you will be prompted to do so.

![Enter your company email address to log in.](/img/get-started/adminui-login.webp)

Enter your company email address to log in.

Because Single Sign-On (SSO) has not been configured yet, Glean prompts you to check your email for a link to log in. This is called a **magic link**.

Click the magic link in your inbox to log in.

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
