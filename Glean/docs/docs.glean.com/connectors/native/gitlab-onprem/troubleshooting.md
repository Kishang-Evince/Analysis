---
url: "https://docs.glean.com/connectors/native/gitlab-onprem/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/gitlab-onprem/troubleshooting"
title: "GitLab Server troubleshooting and FAQs"
description: "Resolve common GitLab Server connector setup, network, permission, and content freshness issues, and read answers to frequently asked questions."
fetched_at: "2026-10-13T08:49:56.165Z"
---
On this page

This page covers the most common issues seen with the GitLab Server (self-managed) connector and how to resolve them. If an issue persists after trying the remediation, contact [Glean Support](https://support.glean.com).

## Setup and installation[​](#setup-and-installation "Direct link to Setup and installation")

### Setup validation fails with an authentication error[​](#setup-validation-fails-with-an-authentication-error "Direct link to Setup validation fails with an authentication error")

**Symptoms:**

-   The connector fails to save with an authentication or authorization error.
-   The initial crawl does not start.

| Cause | Fix |
| --- | --- |
| OAuth authorization fails. | Check the application's **Client ID**, **Client Secret**, requested scopes, and **Redirect URI**. The redirect must match the **Callback URL** in Glean's setup instructions, not the webhook URL. Click **Save**, then **Authorize** to retry. See [Create a GitLab OAuth application](/connectors/native/gitlab-onprem/setup#5-create-a-gitlab-oauth-application). |
| The personal access token is malformed or was copied incorrectly. | GitLab shows the token value only once. Generate a new [personal access token](/connectors/native/gitlab-onprem/setup#2-create-a-personal-access-token) and re-enter it. See [GITLAB\_3](/troubleshooting/error-codes/gitlab/gitlab-3) for the full troubleshooting steps. |
| The token is missing required scopes or has expired. | Confirm the token carries either the `api` scope or the read-only trio `read_user`, `read_api`, `read_repository`. If it may have expired, [generate a new token](/connectors/native/gitlab-onprem/setup#2-create-a-personal-access-token) and re-enter it. See [GITLAB\_1](/troubleshooting/error-codes/gitlab/gitlab-1) (users) and [GITLAB\_2](/troubleshooting/error-codes/gitlab/gitlab-2) (projects) for the full troubleshooting steps. |
| The instance domain or IP is wrong. | Confirm the GitLab instance domain (for example, `https://gitlab.company.com`) and GitLab Server IP entered in the **Admin console** are correct. |

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

### The crawler cannot reach the GitLab instance[​](#the-crawler-cannot-reach-the-gitlab-instance "Direct link to The crawler cannot reach the GitLab instance")

**Symptoms:**

-   Setup fails with a connection timeout or network error.
-   Webhooks configured in GitLab never reach Glean.

| Cause | Fix |
| --- | --- |
| The self-managed instance is not reachable from the Glean crawler. | Your instance must be network-reachable by the Glean crawler running in your cloud (GCP or AWS). Contact [Glean Support](https://support.glean.com) to confirm the required network configuration. |
| GitLab blocks local (outbound) requests from hooks and services. | If the webhook target is on your local network, allow it under **Admin Area** → **Settings** → **Network** → **Outbound requests**. See [Appendix: allow webhooks over the local network](/connectors/native/gitlab-onprem/setup#appendix-allow-webhooks-over-the-local-network). |

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

### No projects or content are indexed after setup[​](#no-projects-or-content-are-indexed-after-setup "Direct link to No projects or content are indexed after setup")

**Symptoms:**

-   Setup succeeds, but few or no GitLab results appear in Glean.

| Cause | Fix |
| --- | --- |
| The token owner does not have access to the projects. | Glean only crawls projects the token can reach. Use an admin token, or grant the token owner access to the projects you want indexed. See [GITLAB\_2](/troubleshooting/error-codes/gitlab/gitlab-2) for the full troubleshooting steps. |
| The **Crawl epics** toggle is off. | Turn on **Crawl epics** on the connector setup page. Glean enables this option by default. |
| Namespace allow and block lists are excluding projects. | If namespace filters were configured, confirm the projects fall within the allowed namespaces. Contact [Glean Support](https://support.glean.com) to review them. |

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

## Permissions and access[​](#permissions-and-access "Direct link to Permissions and access")

### Users see the wrong GitLab content, or none at all[​](#users-see-the-wrong-gitlab-content-or-none-at-all "Direct link to Users see the wrong GitLab content, or none at all")

**Symptoms:**

-   A user sees GitLab results they should not have access to, or is missing results they should see.

| Cause | Fix |
| --- | --- |
| A user hasn't authorized GitLab and has no existing identity mapping. | Ask the user to authorize the correct GitLab Server instance. Alternatively, provide a user-mapping CSV, or use an admin token that returns user emails. See [Authorize GitLab as a user](/connectors/native/gitlab-onprem/setup#authorize-gitlab-as-a-user). |
| A user relies on the CSV fallback but has no entry. | Add the user's numeric GitLab `id` and company email to the CSV and upload it again. Users who authorize through OAuth don't need a CSV entry for identity mapping. See [User-mapping CSV](/connectors/native/gitlab-onprem/setup#user-mapping-csv). |
| A non-admin token cannot see all project members. | Non-admin tokens may miss members added through inaccessible groups. Upload a [project permissions CSV](/connectors/native/gitlab-onprem/setup#project-permissions-csv), or switch to an admin token. See [GITLAB\_4](/troubleshooting/error-codes/gitlab/gitlab-4) for the full troubleshooting steps. |
| The project permissions CSV lists Guest members. | The CSV has no GitLab role column. Include only users with repository access, or use an admin token to grant Guests access to project overviews without granting access to repository content. |
| The CSV uses usernames instead of numeric user IDs. | The user ID column must be the numeric GitLab `id`, not the username. Rebuild the CSV using IDs from the [members API](https://docs.gitlab.com/ee/api/members.html). |
| A permission change in GitLab has not yet propagated. | Identity data refreshes hourly. Wait for the next identity crawl, then re-check. |

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

## Content freshness[​](#content-freshness "Direct link to Content freshness")

### Changes in GitLab are slow to appear in Glean[​](#changes-in-gitlab-are-slow-to-appear-in-glean "Direct link to Changes in GitLab are slow to appear in Glean")

**Symptoms:**

-   New or edited merge requests, issues, or wiki pages take a long time to show up in Glean.

| Cause | Fix |
| --- | --- |
| Webhooks or the system hook were not created. | With the `api` scope Glean creates webhooks automatically. With read-only scopes you must [create webhooks and a system hook manually](/connectors/native/gitlab-onprem/setup#create-webhooks-and-a-system-hook-read-only-scopes-only). See [GITLAB\_5](/troubleshooting/error-codes/gitlab/gitlab-5) for the full troubleshooting steps. |
| The webhook secret token does not match. | The **Webhook secret token** in Glean must exactly match the secret token configured on the GitLab webhooks and system hook. Re-enter it in all places. |
| Webhooks cannot reach Glean over the local network. | Allow local requests under **Admin Area** → **Settings** → **Network** → **Outbound requests**. See [Appendix: allow webhooks over the local network](/connectors/native/gitlab-onprem/setup#appendix-allow-webhooks-over-the-local-network). |
| Waiting for a scheduled crawl. | Without webhooks, updates arrive on scheduled incremental crawls (approximately hourly) and full crawls (approximately every 28 days). |

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

### Epics are not indexed[​](#epics-are-not-indexed "Direct link to Epics are not indexed")

**Symptoms:**

-   Epics do not appear in Glean even though **Crawl epics** is enabled.

| Cause | Fix |
| --- | --- |
| The GitLab version is too old. | Epic crawling requires **GitLab 18.1 or later**, which provides the GraphQL Work Items API. Upgrade your instance, or turn off **Crawl epics**. |
| The token cannot access the group that owns the epics. | Epics are group-level. Use a token that can access the groups whose epics you want indexed. See [GITLAB\_6](/troubleshooting/error-codes/gitlab/gitlab-6) for the full troubleshooting steps. |

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

### Code or commit content is missing[​](#code-or-commit-content-is-missing "Direct link to Code or commit content is missing")

**Symptoms:**

-   Code Search does not return files or commit messages you expect.

| Cause | Fix |
| --- | --- |
| The content is not on the default branch. | Glean indexes code and commit messages only on the **default branch**. Content on other branches is not crawled. |
| The initial crawl is still running. | Large repositories take time to crawl. Wait for the initial crawl to complete. |

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

## FAQs[​](#faqs "Direct link to FAQs")

### Should I use an admin or non-admin personal access token?

With an admin token, GitLab returns user emails and project membership from the API, so no CSV uploads are needed. With a non-admin token, the project permissions CSV remains required. The user-mapping CSV is optional when user OAuth is configured. See [Choose an authentication path](/connectors/native/gitlab-onprem/setup#1-choose-an-authentication-path).

### Does the Glean crawler need to reach my instance?

Yes. Your self-managed GitLab instance must be network-reachable by the Glean crawler running in your cloud. Glean supports deployments on both GCP and AWS. Contact [Glean Support](https://support.glean.com) for the required network configuration.

### When do I need to create a system hook?

Only when your token has read-only scopes. With the `api` scope Glean registers hooks automatically. With read-only scopes you create project or group webhooks plus one instance-wide system hook. See [Create webhooks and a system hook](/connectors/native/gitlab-onprem/setup#create-webhooks-and-a-system-hook-read-only-scopes-only).

### What version of GitLab do I need for epics?

Epic crawling requires **GitLab 18.1 or later**, which provides the GraphQL Work Items API. Other objects do not have this version requirement.

### Do I need to enable Code Search separately?

No. Code Search is enabled by default after the connector is connected. See [Code Search](/user-guide/assistant/code-search).

### What GitLab objects can Glean index?

Merge requests (with comments and diffs), code and commit messages on the default branch, issues, wikis, and epics. Snippets and standalone milestones are not supported. See the [Overview](/connectors/native/gitlab-onprem/about#supported-objects).
