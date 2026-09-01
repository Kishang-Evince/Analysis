---
url: "https://docs.glean.com/connectors/native/bitbucket/setup"
canonical: "https://docs.glean.com/connectors/native/bitbucket/setup"
title: "setup"
fetched_at: "2026-09-01T13:29:23.589Z"
---
On this page

## Connect to Bitbucket[​](#connect-to-bitbucket "Direct link to Connect to Bitbucket")

### Set-up an OAuth Consumer[​](#set-up-an-oauth-consumer "Direct link to Set-up an OAuth Consumer")

**For each workspace:**

1.  Navigate to **Workspace Settings → OAuth consumers**
2.  Click “Add Consumer”.
3.  Name the consumer “Glean OAuth Consumer”
4.  Set the Callback URL. Glean will supply you with the correct URL for your project.
5.  For Permissions, select Account:Read (This will automatically select Account:Email as well).
6.  Click save.
7.  Supply the OAuth consumer key to the "OAuth Client Id" box
8.  Supply the OAuth Secret to the "OAuth Client Secret" box

### Create an App Password[​](#create-an-app-password "Direct link to Create an App Password")

Note: Whichever workspaces and repositories this user has access to will be crawled.

**Important:** The service account user must have **admin access** to the repositories you want to crawl. This is required for Glean to read repository permissions. The API token scopes can remain read-only, but the user account itself needs admin access to each repository.

1.  Navigate to **Personal Settings** → [App passwords](https://bitbucket.org/account/settings/app-passwords/)
2.  Click **Create app password**
3.  Label it: “Glean App Password”
4.  Assign read permissions to:
    -   Account
    -   Workspace membership
    -   Projects
    -   Repositories
    -   Pull requests
    -   Issues
    -   Wikis
5.  Copy the app password and supply it to the "App password" input box
6.  Copy the user’s username (found under Personal Settings → [Account settings](https://bitbucket.org/account/settings/)) and supply it to the "Auth username" input box Click **Save** in Glean. You're all set!
