---
url: "https://docs.glean.com/connectors/native/gitlab/setup"
canonical: "https://docs.glean.com/connectors/native/gitlab/setup"
title: "GitLab Cloud setup"
description: "Create a GitLab access token scoped to one top-level group, build the user-mapping file, and configure the GitLab Cloud connector in the Glean Admin console."
fetched_at: "2026-09-01T13:29:30.087Z"
---
On this page

Setting up the GitLab Cloud connector involves these steps:

-   [Confirm requirements](#requirements): the GitLab access, credentials, and permissions you need.
-   [Create an access token](#1-create-an-access-token): in GitLab, scoped to a single top-level group.
-   [Find your top-level group path](#2-find-your-top-level-group-path): the path Glean indexes.
-   [Create webhooks manually](#create-webhooks-manually-read-only-scopes-only): only if your token cannot create them automatically.
-   [Build the user-mapping file](#3-build-the-user-mapping-file): a CSV mapping GitLab user IDs to company emails.
-   [Configure in Glean](#configure-in-glean): enter everything into the Glean **Admin console**.

## Requirements[​](#requirements "Direct link to Requirements")

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   Glean connects to the GitLab REST API at `https://gitlab.com/api/v4/` over HTTPS.
-   Glean throttles its crawl to stay within GitLab's API rate limits, backing off in response to GitLab's rate-limit responses.
-   Each connector indexes a single top-level group. See [Top-level group scope](/connectors/native/gitlab/about#top-level-group-scope).

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

Gather these values before you start:

-   **Access token**: a group access token or service account access token, scoped to one top-level group (see [Create an access token](#1-create-an-access-token)).
-   **Top-level group path**: the URL path of the group you want Glean to index (see [Find your top-level group path](#2-find-your-top-level-group-path)).
-   **Webhook secret token**: a value you choose, entered in both GitLab and Glean so Glean can verify incoming webhook events.
-   **User-mapping CSV**: a file mapping GitLab user IDs to company emails (see [Build the user-mapping file](#3-build-the-user-mapping-file)).

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   The token must reach every project you want Glean to crawl, and must be scoped to a single top-level group.
-   For Glean to create webhooks automatically, the token needs the `api` scope and the **Owner** role on the top-level group.
-   To create webhooks manually, you need the **Maintainer** role for a project or the **Owner** role for a group.

## 1\. Create an access token[​](#1-create-an-access-token "Direct link to 1. Create an access token")

Use a token scoped to the single top-level group you want to index. Avoid user tokens that span multiple top-level groups — Glean's validation fails if the token reaches more than one.

### Option A: group access token (preferred)[​](#option-a-group-access-token-preferred "Direct link to Option A: group access token (preferred)")

1.  In GitLab, go to your top-level group → **Settings** → **Access tokens** → **Add new token**.
2.  Give it a name, for example `Glean GitLab Connector`.
3.  Set **Role** to **Owner**. This is required for Glean to create webhooks automatically.
4.  Choose the scopes:
    -   To let Glean create webhooks automatically, grant the `api` scope.
    -   To keep the token read-only, grant `read_api` and `read_repository`. You must then [create webhooks manually](#create-webhooks-manually-read-only-scopes-only).
5.  Set an **Expiration date** per your policy. GitLab requires an expiry.
6.  Select **Create** and copy the token value. GitLab shows it only once.

See [Group access tokens](https://docs.gitlab.com/user/group/settings/group_access_tokens/) in the GitLab docs.

### Option B: service account token[​](#option-b-service-account-token "Direct link to Option B: service account token")

1.  Create or select a [service account](https://docs.gitlab.com/user/profile/service_accounts/) in your top-level group.
2.  Add the service account as a member of the top-level group with the **Owner** role.
3.  Next to the service account, select **(…)** → **Manage access tokens** → **Add new token**.
4.  Give it a name, for example `Glean GitLab Connector`.
5.  Choose the scopes:
    -   To let Glean create webhooks automatically, grant the `api` scope.
    -   To keep the token read-only, grant `read_api`, `read_user`, and `read_repository`. You must then [create webhooks manually](#create-webhooks-manually-read-only-scopes-only).
6.  Set an **Expiration date** per your policy. GitLab requires an expiry.
7.  Select **Create** and copy the token value. GitLab shows it only once.

Make sure the service account is a member of only the top-level group you intend to index.

note

If you grant read-only scopes, clear the **API token has write privileges** checkbox in the Glean **Admin console** during [Configure in Glean](#configure-in-glean).

## 2\. Find your top-level group path[​](#2-find-your-top-level-group-path "Direct link to 2. Find your top-level group path")

Glean indexes one top-level group per connector, identified by its URL path. If your group URL is `https://gitlab.com/your-group`, then the path is `your-group`.

Keep this value — you enter it in the Glean **Admin console** during [Configure in Glean](#configure-in-glean).

## Create webhooks manually[​](#create-webhooks-manually-read-only-scopes-only "Direct link to Create webhooks manually")

Skip this step if your token has the `api` scope and the **Owner** role on the top-level group — Glean creates the webhooks for you.

Otherwise, create a webhook for each group or project you want Glean to receive change events for. Group webhooks apply to all projects in a group and its subgroups; project webhooks apply to a single project.

1.  Go to the group or project → **Settings** → **Webhooks** → **Add new webhook**.
2.  Configure the webhook:
    -   **URL**: copy the webhook URL shown on the GitLab connector setup page in the Glean **Admin console**.
    -   **Secret token**: the webhook secret token you enter in Glean.
    -   **Trigger**: enable:
        -   Push events
        -   Comments
        -   Issues events
        -   Confidential issues events
        -   Merge request events
        -   Wiki page events
        -   Repository update events
3.  Select **Add webhook**.

## 3\. Build the user-mapping file[​](#3-build-the-user-mapping-file "Direct link to 3. Build the user-mapping file")

The GitLab API does not return user email addresses, so Glean needs a CSV that maps each GitLab user ID to the person's company (SSO) email. This file is **required** for the GitLab Cloud connector.

1.  Create a CSV with two columns in the order **user ID, email**. Column headers are not required.
    -   The user ID is the numeric `id` from the GitLab API — not the username. Retrieve IDs with the [members API](https://docs.gitlab.com/ee/api/members.html#list-all-members-of-a-group-or-project).
    -   Example row:
        
        `12345,user1@example.com`📋
        
2.  Keep the file — you upload it in the Glean **Admin console** during [Configure in Glean](#configure-in-glean).

You can source company emails from your identity provider (for example, Okta or Google Workspace).

## Configure in Glean[​](#configure-in-glean "Direct link to Configure in Glean")

Enter the values you gathered into the GitLab Cloud connector setup page in the Glean **Admin console**, in this order.

### 1\. Start connector setup[​](#1-start-connector-setup "Direct link to 1. Start connector setup")

In the Glean **Admin console**, go to **Connectors**, add the **GitLab** connector, and select the **GitLab Cloud** setup. Set the connector display **Name** and icon.

### 2\. Enter the access token[​](#2-enter-the-access-token "Direct link to 2. Enter the access token")

Paste the [access token](#1-create-an-access-token) into the **Access token** field.

### 3\. Enter the webhook secret token[​](#3-enter-the-webhook-secret-token "Direct link to 3. Enter the webhook secret token")

In the **Webhook secret token** field, enter the same secret token value you used when creating webhooks. This lets Glean verify that incoming webhook events came from your GitLab instance.

### 4\. Enter the top-level group path[​](#4-enter-the-top-level-group-path "Direct link to 4. Enter the top-level group path")

In **URL Path of Top Level Group**, enter the [top-level group path](#2-find-your-top-level-group-path) — for example, `your-group`.

### 5\. Set the token privilege checkboxes[​](#5-set-the-token-privilege-checkboxes "Direct link to 5. Set the token privilege checkboxes")

-   **API token has Top Level Group Owner Privileges**: keep this selected if the token has the **Owner** role on the top-level group. Clear it if it does not.
-   **API token has write privileges**: select this if the token has the `api` scope so Glean creates webhooks automatically. Leave it cleared for read-only scopes, and make sure you have [created webhooks manually](#create-webhooks-manually-read-only-scopes-only).

### 6\. Upload the user-mapping file[​](#6-upload-the-user-mapping-file "Direct link to 6. Upload the user-mapping file")

Upload the [user-mapping CSV](#3-build-the-user-mapping-file) so Glean can map GitLab user IDs to company emails and enforce permissions.

### 7\. Save and start the initial crawl[​](#7-save-and-start-the-initial-crawl "Direct link to 7. Save and start the initial crawl")

Select **Save**. Glean validates the connection before saving it, then starts the initial crawl. Once it completes, GitLab content appears in Glean search results for users who have access to it.

If validation fails, the connector is not saved — fix the reported problem and select **Save** again. Two checks are specific to the top-level group:

-   [GITLAB\_7](/troubleshooting/error-codes/gitlab/gitlab-7): the token does not resolve to exactly one top-level group, or the path you entered does not match the group the token reaches.
-   [GITLAB\_8](/troubleshooting/error-codes/gitlab/gitlab-8): the token does not have **Owner** access to the top-level group. This is only checked when **API token has Top Level Group Owner Privileges** is selected.

Glean indexes merge requests (with comments and diffs), code, issues, and wikis by default, and these object types have no per-object toggles. Epics are also indexed by default, controlled by the **Crawl Group Epics** toggle on the setup page — leave it selected to index epics, or clear it to skip them. Code is made searchable through [Code Search](/user-guide/assistant/code-search), which is enabled by default after the connector is connected.

## Select code file types[​](#select-code-file-types "Direct link to Select code file types")

In the connector's **Manage data** tab, under **Additional Crawl Settings**, use **Code file types to index body** to select the file types Glean should index for code body content.

You can select supported file types or add custom extensions.

This connector-level setting controls code-body indexing and searchability for repositories in the configured top-level group. Code Search remains enabled by default after the connector is connected.

## API endpoints reference[​](#api-endpoints-reference "Direct link to API endpoints reference")

Glean uses the following GitLab REST API endpoints to crawl content and identity data.

| Endpoint | Description |
| --- | --- |
| `GET /api/v4/users` | List users for identity crawling |
| `GET /api/v4/groups` | Resolve the top-level group |
| `GET /api/v4/groups/<id>/enterprise_users` | Verify Owner access to the top-level group |
| `GET /api/v4/projects` | List accessible projects |
| `GET /api/v4/projects/<id>/members/all` | List project members (permissions) |
| `GET /api/v4/projects/<id>/wikis` | List and fetch wiki pages |
| `GET /api/v4/projects/<id>/issues` | List issues |
| `GET /api/v4/projects/<id>/merge_requests` | List merge requests |
| `GET /api/v4/projects/<id>/merge_requests/<id>/notes` | List merge request comments |
| `GET /api/v4/projects/<id>/merge_requests/<id>/diffs` | Fetch merge request diffs |
| `GET /api/v4/projects/<id>/repository/commits` | Fetch commit messages on the default branch |
