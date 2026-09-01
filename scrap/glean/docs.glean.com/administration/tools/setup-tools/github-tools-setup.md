---
url: "https://docs.glean.com/administration/tools/setup-tools/github-tools-setup"
canonical: "https://docs.glean.com/administration/tools/setup-tools/github-tools-setup"
title: "GitHub tools setup"
description: "Set up GitHub tools in Glean, including GitHub App authentication and required permissions."
fetched_at: "2026-09-01T13:29:15.280Z"
---
On this page

Use GitHub tools to connect Glean Assistant and Glean Agents to your GitHub repositories. After you install and configure a GitHub App, users can open pull requests, update code, inspect diffs, and review workflow logs from Glean without switching to GitHub. Tools run as the signed-in user and respect the repository access granted to your GitHub installation.

With this setup, you can:

-   Link the GitHub tools to your GitHub Cloud or GitHub Enterprise Server connector.
-   Authenticate with the central Glean GitHub App or a customer-managed GitHub App.
-   Choose which users can use GitHub tools in Glean Assistant and Glean Agents.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before enabling GitHub tools:

-   The GitHub connector must be configured for the GitHub environment you want to use with tools (GitHub Cloud or GitHub Enterprise Server).
-   You must be able to access the Glean admin console.
-   Your GitHub admin must be able to install a GitHub App in your GitHub organization:
    -   For central or custom authentication, your GitHub admin must be able to approve and install the GitHub App with the required permissions.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

Follow these steps to set up the GitHub tools in Glean:

1.  In Glean, go to **Admin console → Platform → Tools**.
2.  Click **Add**.
3.  From the list in the **Add pre-set tools** section, select **GitHub Tools** under **Tool templates**.
4.  In the **Configuration** tab:
    1.  Select **Connector instance** to link this tool to your GitHub environment (GitHub Cloud or GitHub Enterprise Server).
    2.  Configure authentication using the tabs below, based on your requirements.

### Configure authentication[​](#configure-authentication "Direct link to Configure authentication")

GitHub tools use *GitHub App authentication* so that tools run as the signed-in user and respect their permissions. You can either use the **Glean Central GitHub App** (recommended) or configure a **custom GitHub App**.

-   Central authentication (Recommended)
-   Custom authentication

Use the **central** option if:

-   You want the simplest setup flow, and
-   The Glean Central GitHub App meets your organization's requirements.

1.  Select **Central** under the **Authenticate** section on the GitHub tools setup page.
2.  Install the **Glean Central GitHub App** if it is not already installed for your GitHub organization.
3.  During installation, choose which repositories the app can access. You can grant access to all repositories or only selected repositories, depending on your organization's requirements.
4.  Make sure the app is installed in the GitHub organization that matches the **Connector instance** you selected in Glean.
5.  After the app is installed and repository access is granted, return to Glean and click **Save**.
6.  Click **Edit settings** under the **Enable tools** section to make tools visible for all or some users within Glean Assistant and Glean Agents.

After you save the configuration, GitHub tools run using the signed-in user's GitHub identity and only within the repositories that were granted access during app installation.

Use the **custom** option if:

-   Your security model requires a *customer-managed* GitHub App, or
-   You want to manage the GitHub App configuration yourself.

#### Step 1: Create a new GitHub App[​](#step-1-create-a-new-github-app "Direct link to Step 1: Create a new GitHub App")

1.  In the upper-right corner of any page on GitHub, click your profile picture.
2.  Navigate to your account settings:
    -   For an app owned by a personal account, click **Settings**.
    -   For an app owned by an organization, click **Your organizations**, then click **Settings** next to the organization.
3.  In the left sidebar, click **Developer settings**.
4.  In the left sidebar, click **GitHub Apps**.
5.  Click **New GitHub App**.

#### Step 2: Configure the GitHub App[​](#step-2-configure-the-github-app "Direct link to Step 2: Configure the GitHub App")

Fill in the following fields:

note

GitHub App names must be globally unique in GitHub. To avoid a *Name is already taken* error, do not use a generic name like *Glean Agents* — always append the name of your organization or a unique suffix.

-   **GitHub App name**: Choose a globally unique name (for example, *Glean-MCP-your-company-name*).
-   **Homepage URL**: `https://app.glean.com`
-   **Identifying and authorizing users**:
    -   **Callback URL**: Copy the callback URL shown on the GitHub tools setup page in Glean.
    -   **Request user authorization (OAuth) during installation**: Leave unchecked.
    -   **Enable Device Flow**: Leave unchecked.
-   **Webhook**:
    -   **Active**: Leave unchecked.

#### Step 3: Set permissions[​](#step-3-set-permissions "Direct link to Step 3: Set permissions")

Under **Permissions**, set the following:

-   **Repository permissions**:
    -   Actions: **Read and write**
    -   Checks: **Read-only**
    -   Commit statuses: **Read and write**
    -   Contents: **Read and write**
    -   Metadata: **Read-only**
    -   Pull requests: **Read and write**
-   **Organization permissions**:
    -   Members: **Read-only**
-   **Account permissions**:
    -   Email addresses: **Read-only**

#### Step 4: Set the installation scope[​](#step-4-set-the-installation-scope "Direct link to Step 4: Set the installation scope")

For **Where can this GitHub App be installed?**, select **Only on this account**.

#### Step 5: Create the app[​](#step-5-create-the-app "Direct link to Step 5: Create the app")

Click **Create GitHub App**.

#### Step 6: Generate a client secret and add credentials to Glean[​](#step-6-generate-a-client-secret-and-add-credentials-to-glean "Direct link to Step 6: Generate a client secret and add credentials to Glean")

1.  On the app settings page, copy the **Client ID**.
2.  Under **Client secrets**, click **Generate a new client secret**.
3.  Copy the **client secret** — it is only shown once.
4.  On the GitHub tools setup page in Glean, paste the **Client ID** and **client secret** into the corresponding fields.

#### Step 7: Install the GitHub App[​](#step-7-install-the-github-app "Direct link to Step 7: Install the GitHub App")

1.  In the GitHub App settings, click **Install App** from the left sidebar.
2.  Click **Install** for your organization.
3.  Return to the GitHub tools setup page in Glean and click **Connect** to complete authentication.

warning

If you enabled **Request user authorization (OAuth) during installation** when configuring the app, GitHub redirects you to an OAuth flow immediately after installation. Do not complete authentication from that redirect. Return to Glean and click **Connect** instead, so that OAuth starts from Glean with the correct context.

#### Step 8: Enable the tools[​](#step-8-enable-the-tools "Direct link to Step 8: Enable the tools")

Click **Edit settings** under the **Enable tools** section to make tools visible for all or some users within Glean Assistant and Glean Agents.

## Next step[​](#next-step "Direct link to Next step")

Refer to the [GitHub tools documentation](/tools/connector/github/github-index) for information on testing GitHub tools in Agent builder.
