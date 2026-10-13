---
url: "https://docs.glean.com/connectors/native/gitlab/setup"
canonical: "https://docs.glean.com/connectors/native/gitlab/setup"
title: "GitLab Cloud setup"
description: "Configure GitLab Cloud indexing and user OAuth with an access token, OAuth application, and optional identity mapping"
fetched_at: "2026-10-13T08:49:56.456Z"
---
On this page

Setting up the GitLab Cloud connector involves these steps:

-   [Confirm requirements](#requirements): the GitLab access, credentials, and permissions you need.
-   [Create an access token](#1-create-an-access-token): in GitLab, with access to the groups and projects Glean should crawl.
-   [Create webhooks manually](#2-create-webhooks-manually): only if your token cannot create them automatically.
-   [Build the user-mapping file](#3-build-the-user-mapping-file): an optional fallback mapping GitLab user IDs to company emails.
-   [Create an OAuth application](#4-create-a-gitlab-oauth-application): configure user authorization.
-   [Configure in Glean](#4-configure-in-glean): enter the credentials, save, and authorize the connector.

The current setup includes user OAuth application credentials alongside the connector's access token. OAuth maps each teammate's GitLab identity to their Glean account. It doesn't replace the access token or expand the content the connector can crawl.

## Requirements[​](#requirements "Direct link to Requirements")

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   Glean connects to the GitLab REST API at `https://gitlab.com/api/v4/` over HTTPS.
-   Glean throttles its crawl to stay within GitLab's API rate limits, backing off in response to GitLab's rate-limit responses.
-   The connector can index projects across multiple top-level groups when the access token can reach them.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

Gather these values before you start:

-   **Access token**: a group access token or a personal access token for a service account that can access every group and project Glean should crawl (see [Create an access token](#1-create-an-access-token)).
-   **Webhook secret token**: a value you choose, entered in both GitLab and Glean so Glean can verify incoming webhook events.
-   OAuth application credentials: the client ID and client secret from a group-owned GitLab OAuth application.
-   User-mapping CSV: an optional fallback for teammates who haven't authorized GitLab. See [Build the user-mapping file](#3-build-the-user-mapping-file).

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   The token must reach every group and project you want Glean to crawl.
-   For Glean to create group webhooks automatically, the token needs the `api` scope and the **Owner** role on the relevant group.
-   To create webhooks manually, you need the **Maintainer** role for a project or the **Owner** role for a group.

## 1\. Create an access token[​](#1-create-an-access-token "Direct link to 1. Create an access token")

Use a token whose identity can access every group and project you want to index. A group access token belongs to one top-level group. For unrelated top-level groups on GitLab.com, use a personal access token for a service account that can be granted membership in every target group and project.

Invited-group membership crawling

Namespace filters restrict content crawling. Glean can crawl membership data for an invited group outside the allowed content namespaces if the connector token can list the invited group and its members. Content from the invited group remains excluded.

### Option A: Group access token (preferred)[​](#option-a-group-access-token-preferred "Direct link to Option A: Group access token (preferred)")

1.  In GitLab, go to a group you want Glean to crawl → **Settings** → **Access tokens** → **Add new token**.
2.  Give it a name, for example `Glean GitLab Connector`.
3.  Set **Role** to **Owner**. This is required for Glean to create webhooks automatically.
4.  Choose the scopes:
    -   To let Glean create webhooks automatically, grant the `api` scope.
    -   To keep the token read-only, grant `read_api` and `read_repository`. You must then [create webhooks manually](#2-create-webhooks-manually).
5.  Set an **Expiration date** per your policy. GitLab requires an expiry.
6.  Select **Create** and copy the token value. GitLab shows it only once.

See [Group access tokens](https://docs.gitlab.com/user/group/settings/group_access_tokens/) in the GitLab docs.

Group access-token limitation

A group access token can list members only from its associated top-level group. If another group shares content with an invited group outside that top-level group, Glean cannot list the invited group's members with the group access token. Users who access the shared content through that invited group will not see those documents in Glean. Use a token whose identity can access both groups for this scenario.

### Option B: Personal access token for a service account[​](#option-b-personal-access-token-for-a-service-account "Direct link to Option B: Personal access token for a service account")

1.  Create or select a service account supported by GitLab. It must be capable of membership in every target top-level group and project. On GitLab.com, use a personal access token for the service account that can be added to each target top-level group.
2.  Add the identity to the groups you want Glean to crawl. Use the **Owner** role where Glean should create group webhooks automatically.
3.  Next to the service account, select **(…)** → **Manage access tokens** → **Add new token**.
4.  Give it a name, for example `Glean GitLab Connector`.
5.  Choose the scopes:
    -   To let Glean create webhooks automatically, grant the `api` scope.
    -   To keep the token read-only, grant `read_api`, `read_user`, and `read_repository`. You must then [create webhooks manually](#2-create-webhooks-manually).
6.  Set an **Expiration date** per your policy. GitLab requires an expiry.
7.  Select **Create** and copy the token value. GitLab shows it only once.

Make sure the identity can access every group and project you intend to index. For multiple unrelated top-level groups, verify that it is a member of each target group before creating the token.

note

If you grant read-only scopes, clear the **API token has write privileges** checkbox in the Glean **Admin console** during [Configure in Glean](#4-configure-in-glean).

## 2\. Create webhooks manually[​](#2-create-webhooks-manually "Direct link to 2. Create webhooks manually")

Skip this step when your token has the `api` scope and the **Owner** role on the relevant group — Glean creates the group webhooks for you.

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

## 3\. Build the user-mapping file (optional)[​](#3-build-the-user-mapping-file "Direct link to 3. Build the user-mapping file (optional)")

User OAuth maps each teammate's GitLab identity to their Glean account. You can also provide a CSV that maps numeric GitLab user IDs to company (SSO) emails as a fallback for teammates who haven't authorized GitLab. Existing CSV mappings remain supported.

1.  Create a CSV with two columns in the order **user ID, email**. Column headers are not required.
    -   The user ID is the numeric `id` from the GitLab API — not the username. Retrieve IDs with the [members API](https://docs.gitlab.com/ee/api/members.html#list-all-members-of-a-group-or-project).
    -   Example row:
        
        `12345,user1@example.com`📋
        
2.  Keep the file to upload during connector configuration. See [Configure in Glean](#4-configure-in-glean).

You can source company emails from your identity provider (for example, Okta or Google Workspace).

## 4\. Create a GitLab OAuth application[​](#4-create-a-gitlab-oauth-application "Direct link to 4. Create a GitLab OAuth application")

Create a group-owned application for user authorization. The OAuth application credentials are separate from the access token used to crawl content.

1.  Open the GitLab Cloud connector setup in the Glean **Admin console**, then open its setup instructions to copy the **Callback URL**.
2.  In GitLab, go to your top-level group and open **Settings → Applications**. Click **Add new application** if shown.
3.  Enter a **Name**, such as `Glean`, and set **Redirect URI** to the callback URL from Glean. Don't use the webhook URL.
4.  Select `openid`, `profile`, `email`, `read_user`, `read_api`, and `mcp`. Keep **Confidential** selected.
5.  Save the application. Copy GitLab's **Application ID** and **Secret** for the **Client ID** and **Client Secret** fields in Glean.

See [Configure GitLab as an OAuth 2.0 authentication identity provider](https://docs.gitlab.com/integration/oauth_provider/#create-a-group-owned-application).

## 5\. Configure in Glean[​](#4-configure-in-glean "Direct link to 5. Configure in Glean")

Enter the values you gathered into the GitLab Cloud connector setup page in the Glean **Admin console**, in this order.

### 1\. Start connector setup[​](#1-start-connector-setup "Direct link to 1. Start connector setup")

In the Glean **Admin console**, go to **Connectors**, add the **GitLab** connector, and select the **GitLab Cloud** setup. Set the connector display **Name** and icon.

### 2\. Enter the access token[​](#2-enter-the-access-token "Direct link to 2. Enter the access token")

Paste the [access token](#1-create-an-access-token) into the **Access token** field.

### 3\. Enter the webhook secret token[​](#3-enter-the-webhook-secret-token "Direct link to 3. Enter the webhook secret token")

In the **Webhook secret token** field, enter the same secret token value you used when creating webhooks. This lets Glean verify that incoming webhook events came from your GitLab instance.

### 4\. Set the token privilege checkboxes[​](#4-set-the-token-privilege-checkboxes "Direct link to 4. Set the token privilege checkboxes")

-   **API token has owner privileges**: keep this selected if the token has the **Owner** role on the relevant group where Glean should create group webhooks automatically. Clear it otherwise.
-   **API token has write privileges**: select this if the token has the `api` scope so Glean creates webhooks automatically. Leave it cleared for read-only scopes, and make sure you have [created webhooks manually](#2-create-webhooks-manually).

### 5\. Enter the OAuth application credentials[​](#5-enter-the-oauth-application-credentials "Direct link to 5. Enter the OAuth application credentials")

Enter the application's **Client ID** and **Client Secret**. These are required in the current setup form.

### 6\. Upload the user-mapping file (optional)[​](#5-upload-the-user-mapping-file "Direct link to 6. Upload the user-mapping file (optional)")

Upload the CSV if you want an identity-mapping fallback for teammates who haven't authorized GitLab. Glean validates the file if you upload one. See [Build the user-mapping file](#3-build-the-user-mapping-file).

### 7\. Save and authorize[​](#6-save-and-start-the-initial-crawl "Direct link to 7. Save and authorize")

Complete both setup actions:

1.  Click **Save**. Glean validates the connector configuration. If validation fails, fix the reported problem and save again.
2.  Click **Authorize** and complete the GitLab OAuth flow. Return to Glean and confirm that authorization succeeded.

Saving the configuration alone doesn't complete OAuth setup. After setup and crawling, results depend on the user's GitLab access and identity mapping. Teammates can authorize their own accounts using the user flow.

Glean always indexes project overviews, merge requests (with comments and diffs), code, issues, and wikis. These object types have no per-object toggles. Glean also indexes epics by default. To skip epics, clear **Crawl Group Epics** on the setup page. Glean makes code searchable through [Code Search](/user-guide/assistant/code-search) and turns Code Search on by default after setup.

## Authorize GitLab as a user[​](#authorize-gitlab-as-a-user "Direct link to Authorize GitLab as a user")

Users already mapped through a user-mapping CSV don't need user OAuth for search access. Users without an existing identity mapping can authorize GitLab instead of asking an admin to update the user-mapping CSV.

After an admin configures the OAuth application, teammates can connect their own GitLab accounts:

1.  In Glean, go to **Settings → Connectors** and open **GitLab**.
2.  Under **Search access**, click **Authorize** for the GitLab instance you want to connect.
3.  Click **Get search results from GitLab**. If Glean asks you to choose an instance, click **Add to Glean** beside that instance.
4.  Sign in to GitLab and complete authorization, then return to Glean.

Authorize each instance you need separately. If the authorization option isn't available, ask your Glean admin to check the connector's OAuth configuration.

OAuth links your identity but doesn't expand the connector's crawl scope or grant new GitLab permissions. Allow content and identity crawling to complete before checking results. Disconnecting OAuth isn't a way to revoke access to already indexed content. Manage access in GitLab.

## Select code files to index[​](#select-code-files-to-index "Direct link to Select code files to index")

In the connector's **Manage data** tab, under **Additional Crawl Settings**:

Use **Code file types to index body** to select supported file extensions or add custom extensions, such as `.py` or `.md`.

Use **Code files to index body** to enter an exact filename. This can be a file without an extension, such as `Dockerfile`, a file with an extension, such as `skill.md`, or a dot-prefixed filename, such as `.gitignore`. Glean matches the value with the repository file name after removing its directory path. To match every filename ending in `.dockerfile`, add `.dockerfile` under **Code file types to index body**. Enter multiple filenames as comma-separated values. Filename matching is case-insensitive.

These connector-level settings control code-body indexing and searchability for repositories in the groups and projects the token can reach. Code Search remains enabled by default after you connect the connector.

## API endpoints reference[​](#api-endpoints-reference "Direct link to API endpoints reference")

Glean uses the following GitLab REST API endpoints to crawl content and identity data.

| Endpoint | Description |
| --- | --- |
| `GET /api/v4/users` | List users for identity crawling |
| `GET /api/v4/groups` | List groups the token can access |
| `GET /api/v4/projects` | List projects the token can access |
| `GET /api/v4/projects/<id>/members/all` | List project members (permissions) |
| `GET /api/v4/projects/<id>/wikis` | List and fetch wiki pages |
| `GET /api/v4/projects/<id>/issues` | List issues |
| `GET /api/v4/projects/<id>/merge_requests` | List merge requests |
| `GET /api/v4/projects/<id>/merge_requests/<id>/notes` | List merge request comments |
| `GET /api/v4/projects/<id>/merge_requests/<id>/diffs` | Fetch merge request diffs |
| `GET /api/v4/projects/<id>/repository/commits` | Fetch commit messages on the default branch |
