---
url: "https://docs.glean.com/connectors/native/gitlab-onprem/setup"
canonical: "https://docs.glean.com/connectors/native/gitlab-onprem/setup"
title: "GitLab Server setup"
description: "Choose an authentication path, create a personal access token, configure webhooks, and set up the GitLab Server connector in the Glean Admin console."
fetched_at: "2026-09-01T13:29:29.544Z"
---
On this page

Setting up the GitLab Server connector involves these steps:

-   [Confirm requirements](#requirements): network access, credentials, and permissions.
-   [Choose an authentication path](#1-choose-an-authentication-path): admin or non-admin personal access token.
-   [Create a personal access token](#2-create-a-personal-access-token): in GitLab, with write or read-only scopes.
-   [Create webhooks and a system hook](#create-webhooks-and-a-system-hook-read-only-scopes-only): only if you chose read-only scopes.
-   [Build the CSV files](#4-build-the-csv-files-non-admin-token-only): required only for a non-admin token.
-   [Configure in Glean](#configure-in-glean): enter everything into the Glean **Admin console**.

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
-   **Webhook secret token**: a value you choose, entered in both GitLab and Glean so Glean can verify incoming events.
-   **CSV files**: a user-mapping CSV and a project permissions CSV, **only** if you use a non-admin token (see [Build the CSV files](#4-build-the-csv-files-non-admin-token-only)).

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   The account that creates the personal access token must have access to every project you want Glean to crawl.
-   To create webhooks manually, you need the **Maintainer** role for a project or the **Owner** role for a group. Creating a system hook requires admin access to the GitLab instance.

## 1\. Choose an authentication path[​](#1-choose-an-authentication-path "Direct link to 1. Choose an authentication path")

Glean supports two authentication paths. The path you choose determines which additional setup steps are required.

|  | **Admin PAT** (recommended) | **Non-admin PAT** |
| --- | --- | --- |
| **Token type** | [Personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) from a GitLab **admin** account | [Personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) from a **non-admin** account with access to the projects you want Glean to crawl |
| **User-mapping CSV** | Not required — admin-scoped tokens return user emails from the GitLab API | **Required** — non-admin tokens do not return user emails, so a CSV mapping user IDs to emails must be uploaded |
| **Project permissions CSV** | Not required — Glean reads project memberships directly from the API | **Required** — non-admin tokens may not see all project members (for example, members added through groups the token user cannot access) |
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
5.  Leave **Expiration date** empty so the token does not expire.
6.  Select **Create personal access token** and copy the token value. GitLab shows it only once.

## 3\. Provide your instance details[​](#3-provide-your-instance-details "Direct link to 3. Provide your instance details")

You enter these in the Glean **Admin console** during [Configure in Glean](#configure-in-glean):

-   Your GitLab instance domain, for example `https://gitlab.company.com`.
-   Your GitLab Server IP.

## Create webhooks and a system hook (read-only scopes only)[​](#create-webhooks-and-a-system-hook-read-only-scopes-only "Direct link to Create webhooks and a system hook (read-only scopes only)")

Skip this step if your token has the `api` scope — Glean creates the webhooks for you.

If your token has only read-only scopes, create webhooks for the groups or projects you want Glean to receive change events for, plus one instance-wide system hook. Group webhooks apply to all projects in a group and its subgroups; project webhooks apply to a single project.

### Create webhooks[​](#create-webhooks "Direct link to Create webhooks")

For each group or project:

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

### Create a system hook[​](#create-a-system-hook "Direct link to Create a system hook")

A system hook lets Glean receive certain instance-level repository events.

1.  In GitLab, go to **Admin Area** → **System Hooks**.
2.  Create a system hook:
    -   **URL**: copy the webhook URL shown on the GitLab connector setup page in the Glean **Admin console**.
    -   **Secret token**: the same secret token you used for the webhooks.
    -   **Trigger**: enable:
        -   Push events
        -   Merge request events
        -   Repository update events
3.  Save the system hook.

## 4\. Build the CSV files (non-admin token only)[​](#4-build-the-csv-files-non-admin-token-only "Direct link to 4. Build the CSV files (non-admin token only)")

warning

These files are required **only** when the personal access token belongs to a **non-admin** GitLab user. If you use an admin token, skip this step — admin-scoped tokens return user emails and full membership from the GitLab API.

### User-mapping CSV[​](#user-mapping-csv "Direct link to User-mapping CSV")

A non-admin token does not return user email addresses, so Glean needs a CSV that maps each GitLab user ID to the person's company (SSO) email.

1.  Create a CSV with two columns in the order **user ID, email**. Column headers are not required.
    -   The user ID is the numeric `id` from the GitLab API — not the username. Retrieve IDs with the [members API](https://docs.gitlab.com/ee/api/members.html#list-all-members-of-a-group-or-project).
    -   Example row:
        
        `12345,user1@example.com`📋
        
2.  Keep the file — you upload it in the Glean **Admin console** during [Configure in Glean](#configure-in-glean).

### Project permissions CSV[​](#project-permissions-csv "Direct link to Project permissions CSV")

A non-admin token may return incomplete project membership — for example, members added through a group the token user cannot see. Upload a `project_permissions.csv` that maps projects to the users who should have access.

1.  Create a CSV with two columns in the order **project path, user ID**. Column headers are not required.
    -   The project path is the full namespace path, for example `my-group/my-project`.
    -   Example row:
        
        `my-group/my-project,12345`📋
        
2.  Keep the file — you upload it in the Glean **Admin console** during [Configure in Glean](#configure-in-glean).

note

If project memberships change, re-upload `project_permissions.csv` to keep permissions in sync.

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

### 4\. Enter the webhook secret token[​](#4-enter-the-webhook-secret-token "Direct link to 4. Enter the webhook secret token")

In the **Webhook secret token** field, enter the same secret token value you used when creating webhooks and the system hook. This lets Glean verify that incoming events came from your GitLab instance.

### 5\. Upload the CSV files (non-admin token only)[​](#5-upload-the-csv-files-non-admin-token-only "Direct link to 5. Upload the CSV files (non-admin token only)")

If you cleared **API token has admin privileges**, upload the [user-mapping CSV](#user-mapping-csv) and the [project permissions CSV](#project-permissions-csv). Each upload field has a **Download CSV template** button that gives you a correctly formatted starter file. Skip this step if you are using an admin token.

Both files are required with a non-admin token. Glean validates them when you save the connector, and setup fails if either file is missing.

### 6\. Choose what to index[​](#6-choose-what-to-index "Direct link to 6. Choose what to index")

Epics are controlled by a single setup toggle:

-   **Crawl epics**: index epics. Selected by default. Requires **GitLab 18.1 or later** — clear it if your instance is older or you don't want epics indexed.

Merge requests (with comments and diffs), code, issues, and wikis are always indexed and have no per-object toggles. Code is made searchable through [Code Search](/user-guide/assistant/code-search), which is enabled by default after the connector is connected.

### 7\. Save and start the initial crawl[​](#7-save-and-start-the-initial-crawl "Direct link to 7. Save and start the initial crawl")

Select **Save**. Glean validates the connection before saving it, then starts the initial crawl. Once the crawl completes, GitLab content appears in Glean search results for users who have access to it.

If validation fails, the connector is not saved and the configuration is rolled back — fix the reported problem and select **Save** again.

With a non-admin token, validation checks both CSV files. A file fails if it is missing, empty, or unreadable, or if any row leaves a column blank, uses a user ID that is not a positive integer, or has a malformed email address. See [CSV\_1](/troubleshooting/error-codes/generic/csv-1) for the full troubleshooting steps.

## Appendix: allow webhooks over the local network[​](#appendix-allow-webhooks-over-the-local-network "Direct link to Appendix: allow webhooks over the local network")

If you want webhooks to reach Glean through your local network, allow local requests from hooks and services before creating the webhooks:

1.  Go to **Admin Area** → **Settings** → **Network**.
2.  Expand **Outbound requests**.
3.  Under **Local IP addresses and domain names that hooks and services may access**, add the local proxy IP. Contact [Glean Support](https://support.glean.com) if you need help finding this IP.
4.  Select **Save changes**.
