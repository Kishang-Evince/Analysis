---
url: "https://docs.glean.com/connectors/native/github-enterprise-server/setup"
canonical: "https://docs.glean.com/connectors/native/github-enterprise-server/setup"
title: "Set up GitHub Enterprise Server"
description: "Create a GitHub App, generate an admin token, and connect one or more GitHub Enterprise Server instances to Glean."
fetched_at: "2026-09-01T13:29:28.841Z"
---
On this page

This guide covers connecting a self-hosted GitHub Enterprise Server instance to Glean. For an overview of what the connector indexes and how multiple instances work, see the [GitHub Enterprise Server overview](/connectors/native/github-enterprise-server/).

Network reachability

These instructions work only for on-prem instances the Glean crawler can access. Your GitHub Enterprise Server instance must be network-accessible to the Glean crawler running in your cloud. Contact Glean Support for any network configuration required.

## Before you begin[​](#before-you-begin "Direct link to Before you begin")

-   You must be a GitHub organization owner to create the GitHub App. If you are not, ask an organization owner to create it on your behalf.
-   Confirm your GitHub Enterprise Server instance is reachable from the Glean crawler.
-   Have the Glean Admin console open so you can copy the generated webhook URL and secret into the GitHub App, and copy the App credentials and admin token back into Glean.

## Required admin token scopes[​](#required-admin-token-scopes "Direct link to Required admin token scopes")

Setup requires a classic personal access token, created by an admin, with no expiration and the following scopes:

| Scope | Purpose |
| --- | --- |
| `user:email` | Read user email addresses for identity |
| `read:enterprise` | Read enterprise-level data |
| `read:org` | Read organization-level data |

## Connect to GitHub Enterprise Server[​](#connect-to-github-enterprise-server "Direct link to Connect to GitHub Enterprise Server")

The instructions below will work only for on-prem instances that the Glean Crawler running on GCP can access. Please reach out to Glean Support for any network configuration required.

### Step 1. Create a GitHub App[​](#step-1-create-a-github-app "Direct link to Step 1. Create a GitHub App")

warning

This step must be performed by a GitHub organization owner. If you aren't an organization owner, contact one to create the GitHub App on your behalf.

This app will be used by Glean to crawl your GitHub instance.

1.  Go to your GitHub Enterprise Server instance.
2.  Click on any one of your organizations.
3.  Click settings.
4.  Click GitHub Apps.
5.  Click New GitHub App.
6.  Fill the following fields:
    1.  Name: Glean
    2.  Homepage URL: [https://app.glean.com](https://app.glean.com)
    3.  Identifying and authorizing users
        -   User authorization callback URL: Copy the generated URL from the setup page
        -   Request user authorization: unchecked
    4.  Post installation
        -   Leave blank
    5.  Webhook
        -   Webhook Active: checked
        -   Webhook URL: Copy the generated URL from the setup page
        -   Webhook secret: sk\_test\_123456789 %1%
            -   Copy the webhook secret into the corresponding field in Glean
            -   Copy the webhook secret into the corresponding field in the GitHub App
    6.  Repository permissions
        1.  Set only the following to read-only:
            -   Repository permissions
                -   Administration
                -   Contents
                -   Commit statuses
                -   Issues
                -   Metadata
                -   Pull requests
                -   Pages
            -   Organization permissions
                -   Members
            -   User permissions (or Account Permissions)
                -   Email addresses
    7.  Subscribe to events
        -   Check only the following:
            -   Commit comment
            -   Issues
            -   Issue comment
            -   Member
            -   Organization
            -   Pull request
            -   Pull request review
            -   Pull request review comment
            -   Push
            -   Repository
            -   Team
            -   Team add
    8.  Where can this App be installed: Any account

### Step 2. Configure the GitHub App[​](#step-2-configure-the-github-app "Direct link to Step 2. Configure the GitHub App")

Copy the following values into the corresponding fields in Glean:

-   App ID
-   Client ID
-   Client Secret At the very bottom of the page, click "Generate a private key" It will download the key to your local machine. Upload this file into the corresponding field in Glean.

### Step 3. Install the GitHub App[​](#step-3-install-the-github-app "Direct link to Step 3. Install the GitHub App")

Click on Install App from the menu on the left. Click Install for all organizations you want to connect.

### Step 4. Create an admin token[​](#step-4-create-an-admin-token "Direct link to Step 4. Create an admin token")

1.  Go to your GitHub Enterprise Server instance.
2.  Click on the User Profile dropdown on the top right.
3.  Click on User settings.
4.  Click on Developer settings.
5.  Click on Personal access tokens.
6.  Click on Tokens (classic)
7.  Generate a new classic token with no expiration with the following permissions:
    -   user:email
    -   read:enterprise
    -   read:org
8.  Copy the token into the Admin Personal Access Token field in Glean.

### Step 5. Configure additional configs on admin console[​](#step-5-configure-additional-configs-on-admin-console "Direct link to Step 5. Configure additional configs on admin console")

In Glean, enter your GitHub instance domain name.

## Manage crawl behavior[​](#manage-crawl-behavior "Direct link to Manage crawl behavior")

After setup, you can configure what content Glean crawls from the **Manage Data** tab in the admin console (**Admin console → Connectors → GitHub Enterprise Server → Manage Data**). Options include:

-   **Organization allow and block lists** - restrict crawling to specific organizations, or block organizations you don't want indexed
-   **Repository inclusion and exclusion lists** - control which repositories are crawled
-   **GitHub Pages repository inclusion and exclusion lists** - control which repositories have their Pages content crawled
-   **Content type toggles** - turn crawling on or off for wikis, issues, and pull request diffs
-   **Code file extensions** - control which extensions have their full file body indexed

## Per-user OAuth[​](#per-user-oauth "Direct link to Per-user OAuth")

Per-user OAuth maps each user's GitHub alias to their email so Glean can resolve their identity. Until a user completes it, private and internal GitHub content doesn't appear in their search results. Public repository content appears regardless. Once complete, the next identity crawl syncs their aliases.
