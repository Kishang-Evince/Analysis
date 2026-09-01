---
url: "https://docs.glean.com/connectors/native/github/setup"
canonical: "https://docs.glean.com/connectors/native/github/setup"
title: "Set up GitHub Cloud"
description: "Connect GitHub Cloud or GitHub Enterprise Cloud to Glean, configure the GitHub App, and enable per-user OAuth."
fetched_at: "2026-09-01T13:29:29.607Z"
---
On this page

This guide covers connecting GitHub Cloud to Glean. There are two setup paths, and the one you use depends on how your GitHub account is organized. For self-hosted deployments, see [GitHub Enterprise Server](/connectors/native/github-enterprise-server/) or [GitHub Server](/connectors/native/github-server/) instead.

| Your GitHub deployment | Setup path |
| --- | --- |
| One or more organizations on `github.com` | **GitHub Cloud.** You install the Glean GitHub App and enter your organization name. |
| An enterprise account on `github.com`, or GitHub Enterprise Cloud with Data Residency on `<your-enterprise>.ghe.com` | **GitHub Enterprise Cloud.** You create a custom GitHub App on your enterprise account and enter your enterprise slug and domain. |

Disclaimer

The instructions below are updated periodically. For the latest steps, refer to the Glean Admin console.

Availability

The GitHub Enterprise Cloud setup path is enabled by Glean on request rather than being self-serve. Contact Glean Support to have it turned on for your deployment.

## Required access[​](#required-access "Direct link to Required access")

| Requirement | GitHub Cloud | GitHub Enterprise Cloud |
| --- | --- | --- |
| **Role that runs setup** | Organization admin | GitHub enterprise owner |
| **GitHub App** | The Glean GitHub App, which you install from GitHub | A custom GitHub App that you create on your enterprise account |
| **Ongoing access** | Admin read-only, for the running and operation of the GitHub App | Admin read-only, for the running and operation of the GitHub App |
| **Enterprise Managed Users** | Not required | Required |
| **Private repositories** | Individual user authorization (per-user OAuth) | Individual user authorization (per-user OAuth) |

On the GitHub Cloud path, the App's permission scopes are fixed and read-only, and organization admins cannot change them. On the GitHub Enterprise Cloud path, you set the same read-only scopes yourself when you create the App. See [API endpoints and permissions](/connectors/native/github/api) for the full list.

## Set up the connector[​](#set-up-the-connector "Direct link to Set up the connector")

-   GitHub Cloud
-   GitHub Enterprise Cloud

### Install the Glean GitHub App[​](#install-the-glean-github-app "Direct link to Install the Glean GitHub App")

1.  Before installing, make sure your GitHub account has a verified work email address. Go to [GitHub → Settings → Emails](https://github.com/settings/emails) and confirm that your work email is listed and labeled as **Verified**. Glean uses this email to map the installation to your organization, so a missing or unverified email will cause the setup to fail.
    
2.  Go to [https://github.com/apps/glean-github-app](https://github.com/apps/glean-github-app), or in Glean go to **Admin console → Connectors → GitHub** and select **Install the Glean GitHub App**.
    
3.  Select **Install** or **Configure**.
    
4.  Select the organization where the app should be installed.
    
5.  Choose which repositories the app can access:
    
    -   **All repositories** grants access to every repository in the organization.
    -   **Only select repositories** limits access to the repositories you choose.
    
    Select **Install & Authorize**. Glean indexes only the repositories granted to the GitHub App installation. You can change this selection later from the app's installation settings in GitHub. Use [crawling restrictions](/connectors/native/github/restrictions) to further control which repositories within that set are indexed.
    

### Configure the connector in Glean[​](#configure-the-connector-in-glean "Direct link to Configure the connector in Glean")

After installing the Glean GitHub App, wait a few minutes for the installation to propagate before continuing.

1.  Enter the connector name in the **Name** text box.
2.  Choose an icon for the connector.
3.  Enter your GitHub organization name in the **GitHub organization name** text box.
4.  Select **Save**.

These steps apply to both standard GitHub Enterprise Cloud on `github.com` and GitHub Enterprise Cloud with Data Residency on `<your-enterprise>.ghe.com`. The only difference between the two is the domain you enter in Glean.

Prerequisites

This path is supported only for enterprises that use [Enterprise Managed Users](https://docs.github.com/en/enterprise-cloud@latest/admin/concepts/identity-and-access-management/enterprise-managed-users).

Creating the GitHub App must be done by a GitHub enterprise owner. If you are not an enterprise owner, ask your enterprise administrator to create the App on your behalf.

### Step 1. Create a GitHub App[​](#step-1-create-a-github-app "Direct link to Step 1. Create a GitHub App")

Glean uses this App to crawl your GitHub Enterprise Cloud data.

1.  In the Glean admin console, open the GitHub Enterprise Cloud connector and select **Generate URLs**. Glean displays the user authorization callback URL and the webhook URL. Select **Show setup instructions** to see the webhook secret that Glean generated for this connector. Keep this page open.
2.  In GitHub, go to your enterprise settings. Select your profile photo and then **Your enterprise**, or go directly to `https://github.com/enterprises/<your-enterprise>`. If you use Data Residency, go to `https://<your-enterprise>.ghe.com/enterprises/<your-enterprise>`.
3.  In the left sidebar under **Settings**, select **GitHub Apps**, then **New GitHub App**. The App must be created at the enterprise level. See GitHub's [Creating GitHub Apps for your enterprise](https://docs.github.com/en/enterprise-cloud@latest/admin/managing-github-apps-for-your-enterprise/creating-github-apps-for-your-enterprise).
4.  Complete the App fields:
    -   **Name:** `Glean`
    -   **Homepage URL:** `https://app.glean.com`
    -   **User authorization callback URL:** the authorization URL generated on the Glean setup page
    -   **Request user authorization:** clear the checkbox
    -   **Post installation:** leave the fields blank
    -   **Webhook → Active:** selected
    -   **Webhook URL:** the webhook URL generated on the Glean setup page
    -   **Webhook secret:** the webhook secret from the Glean setup instructions. Enter the same value here and in the **Webhook secret token** field in Glean.
    -   **Where can this GitHub App be installed:** **Any account**
5.  Under **Permissions**, set only the following to read-only:
    -   **Repository permissions:** Administration, Commit statuses, Contents, Issues, Metadata, Pages, Pull requests
    -   **Organization permissions:** Members
    -   **User permissions** (shown as **Account permissions** in some views): Email addresses
    -   **Enterprise permissions:** Enterprise people, Enterprise teams
6.  Under **Subscribe to events**, select only the following:
    -   Commit comment
    -   Issues
    -   Issue comment
    -   Member
    -   Membership
    -   Organization
    -   Pull request
    -   Pull request review
    -   Pull request review comment
    -   Push
    -   Repository
    -   Team
    -   Team add

### Step 2. Copy the App credentials into Glean[​](#step-2-copy-the-app-credentials-into-glean "Direct link to Step 2. Copy the App credentials into Glean")

From the GitHub App page, copy each value into the matching field on the Glean setup page:

| GitHub value | Glean field |
| --- | --- |
| App ID | **GitHub App ID** |
| Client ID | **App Client Id** |
| Client secret | **App Client Secret** |

At the bottom of the GitHub App page, select **Generate a private key**. GitHub downloads a `.pem` file to your machine. Upload that file where Glean prompts you for the generated private key file.

### Step 3. Install the App on your enterprise[​](#step-3-install-the-app-on-your-enterprise "Direct link to Step 3. Install the App on your enterprise")

From the GitHub App page, select **Install App** and install the App on your **enterprise** and on **every organization** you want Glean to index. An organization that the App is not installed on is not indexed.

### Step 4. Complete the remaining fields in Glean[​](#step-4-complete-the-remaining-fields-in-glean "Direct link to Step 4. Complete the remaining fields in Glean")

1.  Enter your enterprise's short name in the **Enterprise account slug** text box, for example `my-enterprise`.
2.  Enter your domain in the **GitHub Enterprise Cloud domain** text box:
    -   Standard GitHub Enterprise Cloud: `https://github.com`
    -   Data Residency: `https://<your-enterprise>.ghe.com`
3.  Select **Save**.

## Enable per-user OAuth for private repositories[​](#enable-per-user-oauth-for-private-repositories "Direct link to Enable per-user OAuth for private repositories")

The GitHub App crawls content, but GitHub returns a user's email address only after that user has authorized Glean. Each user must authorize once so their GitHub identity can be matched to their Glean identity. Until they do, they cannot see private repositories they have access to.

Each user authorizes from **Glean → Settings → Connectors → GitHub** by selecting **Authorize**. After a user authorizes, Glean picks up the change on the next identity crawl and syncs the private repositories and aliases they have access to.

## Manage crawl behavior[​](#manage-crawl-behavior "Direct link to Manage crawl behavior")

After setup, you can configure what content Glean crawls from the **Manage Data** tab in the admin console (**Admin console → Connectors → GitHub → Manage Data**). Options include:

-   Repository inclusion and exclusion lists
-   GitHub Pages repository inclusion and exclusion lists
-   Content type toggles for wikis, issues, and pull request diffs
-   Code file extension controls

For full details, see [Crawling restrictions](/connectors/native/github/restrictions).

## See also[​](#see-also "Direct link to See also")

-   [About the GitHub connector](/connectors/native/github/about)
-   [API endpoints and permissions](/connectors/native/github/api)
-   [Crawling restrictions](/connectors/native/github/restrictions)
-   [Troubleshooting and FAQs](/connectors/native/github/troubleshooting)
-   [GitHub Server](/connectors/native/github-server/)
