---
url: "https://docs.glean.com/connectors/native/gitlab-onprem/setup"
canonical: "https://docs.glean.com/connectors/native/gitlab-onprem/setup"
title: "GitLab Server setup"
description: "Configure GitLab Server indexing and user OAuth, including access tokens, application credentials, and non-admin project permissions"
fetched_at: "2026-10-13T08:49:56.195Z"
---
On this page

Setting up the GitLab Server connector involves these steps:

-   [Confirm requirements](#requirements): network access, credentials, and permissions.
-   [Choose an authentication path](#1-choose-an-authentication-path): admin or non-admin personal access token.
-   [Create a personal access token](#2-create-a-personal-access-token): in GitLab, with write or read-only scopes.
-   [Create webhooks and a system hook](#create-webhooks-and-a-system-hook-read-only-scopes-only): only if you chose read-only scopes.
-   [Build the CSV files](#4-build-the-csv-files-non-admin-token-only): project permissions for a non-admin token, plus optional identity mapping.
-   [Create an OAuth application](#5-create-a-gitlab-oauth-application): configure user authorization.
-   [Configure in Glean](#configure-in-glean): enter the credentials, save, and authorize the connector.

The current setup includes user OAuth application credentials alongside the connector's personal access token. OAuth maps each teammate's GitLab identity to their Glean account. It doesn't replace the token or expand the content the connector can crawl.

## Requirements[​](#requirements "Direct link to Requirements")

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   Your self-managed GitLab instance must be network-reachable by the Glean crawler running in your cloud. Glean supports deployments on both **GCP** and **AWS**. Contact [Glean Support](https://support.glean.com) for any network configuration required.
-   Glean connects to your instance's GitLab REST API over HTTPS.
-   Glean throttles its crawl to stay within GitLab's API rate limits, backing off in response to GitLab's rate-limit responses.
-   Epic crawling requires **GitLab 18.1 or later**.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

Gather these values before you start:

-   **Personal access token**: created in GitLab (see [Create a personal access token](#2-create-a-personal-access-token)).
-   **GitLab instance domain**: for example, `https://gitlab.company.com`.
-   **GitLab Server IP**: the IP address of your instance.
-   Webhook secret token: copy this value from the GitLab Server setup instructions in Glean when creating webhooks manually.
-   OAuth application credentials: the client ID and client secret from an instance-wide GitLab OAuth application. A GitLab administrator must create this application, even if the connector uses a non-admin personal access token.
-   CSV files: a project permissions CSV for a non-admin token, plus an optional user-mapping CSV when using user OAuth. See [Build the CSV files](#4-build-the-csv-files-non-admin-token-only).

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   The account that creates the personal access token must have access to every project you want Glean to crawl.
-   To create webhooks manually, you need the **Maintainer** role for a project or the **Owner** role for a group. Creating a system hook requires admin access to the GitLab instance.

## 1\. Choose an authentication path[​](#1-choose-an-authentication-path "Direct link to 1. Choose an authentication path")

Glean supports two authentication paths. The path you choose determines which additional setup steps are required.

|  | **Admin PAT** (recommended) | **Non-admin PAT** |
| --- | --- | --- |
| **Token type** | [Personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) from a GitLab **admin** account | [Personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) from a **non-admin** account with access to the projects you want Glean to crawl |
| **User-mapping CSV** | Not required — admin-scoped tokens return user emails from the GitLab API | Optional with user OAuth. Use it as a fallback for teammates who haven't authorized GitLab. |
| **Project permissions CSV** | Not required — Glean reads project memberships directly from the API | **Required** — non-admin tokens may not see all project members. List only users with repository access. |
| **Webhooks** | Can be created automatically with the `api` scope, or manually with read-only scopes | Can be auto-created for projects where the token user has **Maintainer** access (requires `api` scope); other projects require manual webhook setup |

info

If you are unsure which path to use, we recommend an **admin PAT**. This avoids CSV uploads and ensures Glean always has complete, up-to-date permissions data.

## 2\. Create a personal access token[​](#2-create-a-personal-access-token "Direct link to 2. Create a personal access token")

Glean authenticates to GitLab with a [personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) (PAT). The scopes you grant determine whether Glean can create webhooks automatically.

1.  Sign in to GitLab with the account you chose in [step 1](#1-choose-an-authentication-path) (admin or non-admin).
2.  Go to your avatar in the top right → **Edit profile** → **Access tokens**.
3.  Select **Add new token** and give it a name, for example `Glean Token`.
4.  Choose the scopes:
    -   To let Glean create webhooks automatically, grant the `api` scope.
    -   To keep the token read-only, grant `read_user`, `read_api`, and `read_repository`. With read-only scopes you must [create webhooks and a system hook manually](#create-webhooks-and-a-system-hook-read-only-scopes-only).
5.  Set an **Expiration date** according to your organization's policy.
6.  Select **Create personal access token** and copy the token value. GitLab shows it only once.

## 3\. Provide your instance details[​](#3-provide-your-instance-details "Direct link to 3. Provide your instance details")

You enter these in the Glean **Admin console** during [Configure in Glean](#configure-in-glean):

-   Your GitLab instance domain, for example `https://gitlab.company.com`.
-   Your GitLab Server IP.

## Create webhooks and a system hook (read-only scopes only)[​](#create-webhooks-and-a-system-hook-read-only-scopes-only "Direct link to Create webhooks and a system hook (read-only scopes only)")

Skip this step if your token has the `api` scope — Glean creates the webhooks for you.

If your token has only read-only scopes, create webhooks for the groups or projects you want Glean to receive change events for, plus one instance-wide system hook. Group webhooks apply to all projects in a group and its subgroups; project webhooks apply to a single project.

Open the GitLab Server connector setup in the Glean **Admin console**, then open its setup instructions to copy the webhook URL and secret token.

### Create webhooks[​](#create-webhooks "Direct link to Create webhooks")

For each group or project:

1.  Go to the group or project → **Settings** → **Webhooks** → **Add new webhook**.
2.  Configure the webhook:
    -   **URL**: copy the webhook URL from Glean's setup instructions.
    -   **Secret token**: copy the webhook secret token from Glean's setup instructions.
    -   **Trigger**: enable:
        -   Push events
        -   Comments
        -   Issues events
        -   Confidential issues events
        -   Merge request events
        -   Wiki page events
        -   Repository update events
3.  Select **Add webhook**.

### Create a system hook[​](#create-a-system-hook "Direct link to Create a system hook")

A system hook lets Glean receive certain instance-level repository events.

1.  In GitLab, go to **Admin Area** → **System Hooks**.
2.  Create a system hook:
    -   **URL**: copy the webhook URL from Glean's setup instructions.
    -   **Secret token**: the same secret token you used for the webhooks.
    -   **Trigger**: enable:
        -   Push events
        -   Merge request events
        -   Repository update events
3.  Save the system hook.

## 4\. Build the CSV files (non-admin token only)[​](#4-build-the-csv-files-non-admin-token-only "Direct link to 4. Build the CSV files (non-admin token only)")

warning

The project permissions CSV remains required for a non-admin personal access token. User OAuth replaces the need for an identity-mapping CSV, not the project membership data. With an admin token, skip these uploads because GitLab returns user emails and project membership through the API.

### User-mapping CSV[​](#user-mapping-csv "Direct link to User-mapping CSV")

With user OAuth configured, this CSV is optional. It maps numeric GitLab user IDs to company (SSO) emails as a fallback for teammates who haven't authorized GitLab. Existing CSV mappings remain supported.

1.  Create a CSV with two columns in the order **user ID, email**. Column headers are not required.
    -   The user ID is the numeric `id` from the GitLab API — not the username. Retrieve IDs with the [members API](https://docs.gitlab.com/ee/api/members.html#list-all-members-of-a-group-or-project).
    -   Example row:
        
        `12345,user1@example.com`📋
        
2.  Keep the file — you upload it in the Glean **Admin console** during [Configure in Glean](#configure-in-glean).

### Project permissions CSV[​](#project-permissions-csv "Direct link to Project permissions CSV")

A non-admin token may return incomplete project membership — for example, members added through a group the token user cannot see. Upload a `project_permissions.csv` that maps projects to the users who should have repository access.

The file does not include GitLab roles. Include only users with repository access, not Guest members. Use an admin token if Guest members must find private project overviews without receiving repository access.

1.  Create a CSV with two columns in the order **project path, user ID**. Column headers are not required.
    -   The project path is the full namespace path, for example `my-group/my-project`.
    -   Example row:
        
        `my-group/my-project,12345`📋
        
2.  Keep the file — you upload it in the Glean **Admin console** during [Configure in Glean](#configure-in-glean).

note

If project memberships change, re-upload `project_permissions.csv` to keep permissions in sync.

## 5\. Create a GitLab OAuth application[​](#5-create-a-gitlab-oauth-application "Direct link to 5. Create a GitLab OAuth application")

Ask a GitLab administrator to create an instance-wide application. The OAuth application credentials are separate from the personal access token used to crawl content.

1.  Open the GitLab Server connector setup in the Glean **Admin console**, then open its setup instructions to copy the **Callback URL**.
2.  In GitLab, go to **Admin Area → Applications** and click **New application**.
3.  Enter a **Name**, such as `Glean`, and set **Redirect URI** to the callback URL from Glean. Don't use the webhook URL.
4.  Select `openid`, `profile`, `email`, `read_user`, `read_api`, and `mcp`.
5.  Save the application. Copy GitLab's **Application ID** and **Secret** for the **Client ID** and **Client Secret** fields in Glean.

See [Configure GitLab as an OAuth 2.0 authentication identity provider](https://docs.gitlab.com/integration/oauth_provider/#create-an-instance-wide-application).

## Configure in Glean[​](#configure-in-glean "Direct link to Configure in Glean")

Enter the values you gathered into the GitLab Server connector setup page in the Glean **Admin console**, in this order.

### 1\. Start connector setup[​](#1-start-connector-setup "Direct link to 1. Start connector setup")

In the Glean **Admin console**, go to **Connectors**, add the **GitLab** connector, and select the **GitLab Server** setup. Set the connector display **Name** and icon.

### 2\. Enter your instance details[​](#2-enter-your-instance-details "Direct link to 2. Enter your instance details")

Enter your GitLab instance domain (for example, `https://gitlab.company.com`) and your GitLab Server IP.

### 3\. Enter the personal access token[​](#3-enter-the-personal-access-token "Direct link to 3. Enter the personal access token")

Paste the [personal access token](#2-create-a-personal-access-token) into the token field, then set the two token checkboxes to match the token you created:

-   **API token has admin privileges**: select this if the token belongs to a GitLab admin account. Clear it for a non-admin token — the CSV upload fields appear only when this checkbox is cleared.
-   **API token has write privileges**: select this if the token has the `api` scope, so Glean creates webhooks automatically. Leave it cleared for read-only scopes, and make sure you have [created webhooks and a system hook manually](#create-webhooks-and-a-system-hook-read-only-scopes-only).

### 4\. Confirm the webhook secret[​](#4-enter-the-webhook-secret-token "Direct link to 4. Confirm the webhook secret")

Glean supplies the webhook secret token in its setup instructions. If you created webhooks and a system hook manually, confirm that their **Secret token** matches that value. You don't enter a webhook secret in the GitLab Server setup form.

### 5\. Upload the CSV files (non-admin token only)[​](#5-upload-the-csv-files-non-admin-token-only "Direct link to 5. Upload the CSV files (non-admin token only)")

If you cleared **API token has admin privileges**, upload the project permissions CSV. You can also upload a user-mapping CSV as an identity fallback. Each upload field has a **Download CSV template** button. Skip these uploads with an admin token. See [Project permissions CSV](#project-permissions-csv) and [User-mapping CSV](#user-mapping-csv).

Glean validates the required project permissions CSV and any uploaded user-mapping CSV when you save. User OAuth doesn't remove the project permissions CSV requirement for a non-admin token.

### 6\. Enter the OAuth application credentials[​](#6-enter-the-oauth-application-credentials "Direct link to 6. Enter the OAuth application credentials")

Enter the application's **Client ID** and **Client Secret**. These are required in the current setup form.

### 7\. Choose what to index[​](#6-choose-what-to-index "Direct link to 7. Choose what to index")

Epics are controlled by a single setup toggle:

-   **Crawl epics**: index epics. Selected by default. Requires **GitLab 18.1 or later** — clear it if your instance is older or you don't want epics indexed.

Glean always indexes project overviews, merge requests (with comments and diffs), code, issues, and wikis. These object types have no per-object toggles. Glean makes code searchable through [Code Search](/user-guide/assistant/code-search) and turns Code Search on by default after setup.

### 8\. Save and authorize[​](#7-save-and-start-the-initial-crawl "Direct link to 8. Save and authorize")

Complete both setup actions:

1.  Click **Save**. Glean validates the connector configuration. If validation fails, fix the reported problem and save again.
2.  Click **Authorize** and complete the GitLab OAuth flow. Return to Glean and confirm that authorization succeeded.

Saving the configuration alone doesn't complete OAuth setup. After setup and crawling, results depend on the user's GitLab access and identity mapping.

With a non-admin token, a missing project permissions CSV fails validation. CSV files must contain valid, nonempty rows with numeric user IDs. An uploaded user-mapping CSV must also contain valid email addresses. See [CSV\_1](/troubleshooting/error-codes/generic/csv-1).

## Authorize GitLab as a user[​](#authorize-gitlab-as-a-user "Direct link to Authorize GitLab as a user")

During connector setup, an admin can optionally upload a user-mapping CSV for an initial set of users. Those users don't need to authorize individually for search access. New users who aren't included in the CSV can authorize GitLab instead of asking an admin to update the user-mapping CSV.

After an admin configures the OAuth application, teammates can authorize their GitLab Server accounts:

1.  In Glean, go to **Settings → Connectors** and open **GitLab**.
2.  Under **Search access**, click **Authorize** for the GitLab Server instance you want to connect.
3.  Click **Get search results from GitLab**. If Glean asks you to choose an instance, click **Add to Glean** beside that instance.
4.  Sign in to your GitLab Server instance and complete authorization, then return to Glean.

Authorize each instance you need separately.

User OAuth doesn't grant additional project access or replace the project permissions CSV required with a non-admin token.

## Appendix: allow webhooks over the local network[​](#appendix-allow-webhooks-over-the-local-network "Direct link to Appendix: allow webhooks over the local network")

If you want webhooks to reach Glean through your local network, allow local requests from hooks and services before creating the webhooks:

1.  Go to **Admin Area** → **Settings** → **Network**.
2.  Expand **Outbound requests**.
3.  Under **Local IP addresses and domain names that hooks and services may access**, add the local proxy IP. Contact [Glean Support](https://support.glean.com) if you need help finding this IP.
4.  Select **Save changes**.
