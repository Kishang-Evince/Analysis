---
url: "https://docs.glean.com/connectors/native/github-server/setup"
canonical: "https://docs.glean.com/connectors/native/github-server/setup"
title: "Set up GitHub Server"
description: "Create a GitHub App on your GitHub Server instance and connect it to Glean."
fetched_at: "2026-09-01T13:29:29.286Z"
---
On this page

This guide covers connecting an on-prem GitHub Server instance to Glean. For an overview of what the connector indexes, see the [GitHub Server overview](/connectors/native/github-server/).

Network reachability

These instructions work only for on-prem instances the Glean crawler can access. Your GitHub Server instance must be network-accessible to the Glean crawler running in your cloud. Contact Glean Support for any network configuration required.

## Before you begin[​](#before-you-begin "Direct link to Before you begin")

-   You must be a GitHub organization owner to create the GitHub App.
-   Confirm your GitHub Server instance is reachable from the Glean crawler.
-   Have the Glean Admin console open so you can copy the generated webhook URL and secret into the GitHub App, and copy the App credentials back into Glean.

The GitHub App requests read-only repository permissions (Administration, Contents, Commit statuses, Issues, Metadata, Pull requests, Pages), read-only organization permissions (Members), and read-only user permissions (Email addresses).

## Connect to GitHub Server[​](#connect-to-github-server "Direct link to Connect to GitHub Server")

The instructions below will work only for on-prem instances that the Glean Crawler running on GCP can access. Please reach out to Glean Support for any network configuration required.

### Step 1. Create a GitHub App[​](#step-1-create-a-github-app "Direct link to Step 1. Create a GitHub App")

This app will be used by Glean to crawl your GitHub instance.

1.  Go to your GitHub Server.
2.  Click on your organization.
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

Click on Install App from the menu on the left. Click Install for your organization.

### Step 4. Configure additional configs on Admin Console[​](#step-4-configure-additional-configs-on-admin-console "Direct link to Step 4. Configure additional configs on Admin Console")

Enter the following configs in Glean:

1.  Git Domain
2.  Organization Name

## After setup[​](#after-setup "Direct link to After setup")

-   Users are prompted to authorize Glean through per-user OAuth to sync their user aliases. They cannot see content in private repositories until they complete this flow.
-   You can limit which repositories are indexed. Contact your Glean representative to configure repository inclusion or exclusion lists.
