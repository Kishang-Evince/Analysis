---
url: "https://docs.glean.com/connectors/native/github/setup"
canonical: "https://docs.glean.com/connectors/native/github/setup"
title: "Set up GitHub Cloud"
description: "Connect GitHub Cloud or GitHub Enterprise Cloud to Glean, configure the GitHub App, and enable per-user OAuth."
fetched_at: "2026-10-13T08:49:55.605Z"
---
On this page

Use this guide to connect an organization on `github.com` to Glean. You install the Glean GitHub App and enter your organization name. For self-hosted deployments, see [GitHub Enterprise Server](/connectors/native/github-enterprise-server/) or [GitHub Server](/connectors/native/github-server/) instead.

Disclaimer

The instructions below are updated periodically. For the latest steps, refer to the Glean Admin console.

## Required access[​](#required-access "Direct link to Required access")

| Requirement | GitHub Cloud |
| --- | --- |
| **Role that runs setup** | Organization admin |
| **GitHub App** | The Glean GitHub App, which you install from GitHub |
| **Ongoing access** | Admin read-only, for the running and operation of the GitHub App |
| **Private repositories** | Individual user authorization (per-user OAuth) |

The App's permission scopes are fixed and read-only, and organization admins cannot change them. See [API endpoints and permissions](/connectors/native/github/api) for the full list.

## Set up the connector[​](#set-up-the-connector "Direct link to Set up the connector")

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

## Enable per-user OAuth for private repositories[​](#enable-per-user-oauth-for-private-repositories "Direct link to Enable per-user OAuth for private repositories")

The GitHub App crawls content, but GitHub returns a user's email address only after that user has authorized Glean. Each user must authorize once so their GitHub identity can be matched to their Glean identity. Until they do, they cannot see private repositories they have access to.

Each user authorizes from **Glean → Settings → Connectors → GitHub** by selecting **Authorize**. After a user authorizes, Glean picks up the change on the next identity crawl and syncs the private repositories and aliases they have access to.

## Manage crawl behavior[​](#manage-crawl-behavior "Direct link to Manage crawl behavior")

After setup, you can configure what content Glean crawls from the **Manage Data** tab in the admin console (**Admin console → Connectors → GitHub → Manage Data**). Options include:

-   Repository inclusion and exclusion lists
-   GitHub Pages repository inclusion and exclusion lists
-   Content type toggles for wikis, issues, and pull request diffs
-   Code file extension and filename controls

For full details, see [Crawling restrictions](/connectors/native/github/restrictions).

## See also[​](#see-also "Direct link to See also")

-   [About the GitHub connector](/connectors/native/github/about)
-   [API endpoints and permissions](/connectors/native/github/api)
-   [Crawling restrictions](/connectors/native/github/restrictions)
-   [Troubleshooting and FAQs](/connectors/native/github/troubleshooting)
-   [GitHub Server](/connectors/native/github-server/)
