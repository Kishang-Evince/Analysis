---
url: "https://docs.glean.com/connectors/native/gitlab/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/gitlab/troubleshooting"
title: "GitLab Cloud troubleshooting and FAQs"
description: "Resolve common GitLab Cloud connector setup, permission, and content freshness issues, and read answers to frequently asked questions."
fetched_at: "2026-10-13T08:49:56.657Z"
---
On this page

This page covers the most common issues seen with the GitLab Cloud connector and how to resolve them. If an issue persists after trying the remediation, contact [Glean Support](https://support.glean.com).

## Setup and installation[​](#setup-and-installation "Direct link to Setup and installation")

### Setup validation fails with an authentication error[​](#setup-validation-fails-with-an-authentication-error "Direct link to Setup validation fails with an authentication error")

**Symptoms:**

-   The connector fails to save with an authentication or authorization error.
-   The initial crawl does not start.

| Cause | Fix |
| --- | --- |
| OAuth authorization fails. | Check the application's **Client ID**, **Client Secret**, requested scopes, and **Redirect URI**. The redirect must match the **Callback URL** in Glean's setup instructions, not the webhook URL. Click **Save**, then **Authorize** to retry. See [Create a GitLab OAuth application](/connectors/native/gitlab/setup#4-create-a-gitlab-oauth-application). |
| The access token is malformed or was copied incorrectly. | GitLab shows the token value only once. Generate a new [access token](/connectors/native/gitlab/setup#1-create-an-access-token) and re-enter it. See [GITLAB\_3](/troubleshooting/error-codes/gitlab/gitlab-3) for the full troubleshooting steps. |
| The token is missing required scopes or has expired. | Confirm the token carries either the `api` scope or the read-only scopes for the token type you chose. If it may have expired, [generate a new token](/connectors/native/gitlab/setup#1-create-an-access-token) and re-enter it. See [GITLAB\_1](/troubleshooting/error-codes/gitlab/gitlab-1) (users) and [GITLAB\_2](/troubleshooting/error-codes/gitlab/gitlab-2) (projects) for the full troubleshooting steps. |
| The token owner cannot access the projects you expect. | Use a token that has access to every project you want Glean to crawl. See [GITLAB\_2](/troubleshooting/error-codes/gitlab/gitlab-2) for the full troubleshooting steps. |
| The token cannot access one or more expected groups or projects. | Grant the token's identity access to every group and project Glean should crawl. For unrelated top-level groups on GitLab.com, use a personal access token for a service account that can be granted membership in every target group. |
| A group access token cannot resolve members from an invited group outside its associated top-level group. | Use a token whose identity has access to both the associated and invited groups. Users who reach shared content through the invited group will not see those documents when Glean cannot resolve that group's members. |
| Memberships from an invited group outside the allowed content namespaces are missing. | Confirm that the connector token can list the invited group and its members. See [Create an access token](/connectors/native/gitlab/setup/#1-create-an-access-token). |

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

### No projects or content are indexed after setup[​](#no-projects-or-content-are-indexed-after-setup "Direct link to No projects or content are indexed after setup")

**Symptoms:**

-   Setup succeeds, but few or no GitLab results appear in Glean.

| Cause | Fix |
| --- | --- |
| The token owner does not have access to the projects. | Glean only crawls projects the token can reach. Grant the token owner access, or use a token with broader access. See [GITLAB\_2](/troubleshooting/error-codes/gitlab/gitlab-2) for the full troubleshooting steps. |
| The token cannot access the group or project. | Glean crawls only groups and projects the token can reach. Grant the token's identity access to the missing content. For unrelated top-level groups on GitLab.com, use a personal access token for a service account that can be granted membership in every target group. |
| The initial crawl is still in progress. | The first full crawl can take time on large accounts. Wait for it to finish, then re-check. Glean always indexes project overviews, merge requests, code, issues, and wikis. Glean indexes epics by default; confirm that **Crawl Group Epics** is on. |
| Namespace allow/block lists are excluding projects. | If namespace filters were configured, confirm the projects fall within the allowed namespaces. Contact [Glean Support](https://support.glean.com) to review them. |

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

## Permissions and access[​](#permissions-and-access "Direct link to Permissions and access")

### Users see the wrong GitLab content, or none at all[​](#users-see-the-wrong-gitlab-content-or-none-at-all "Direct link to Users see the wrong GitLab content, or none at all")

**Symptoms:**

-   A user sees GitLab results they should not have access to, or is missing results they should see.

| Cause | Fix |
| --- | --- |
| A user hasn't authorized GitLab and has no existing identity mapping. | Ask the user to authorize the correct GitLab instance. Alternatively, add the user's numeric ID and company email to the optional user-mapping CSV. See [Authorize GitLab as a user](/connectors/native/gitlab/setup#authorize-gitlab-as-a-user) and [Build the user-mapping file](/connectors/native/gitlab/setup#3-build-the-user-mapping-file). |
| The CSV uses usernames instead of numeric user IDs. | The first column must be the numeric GitLab `id`, not the username. Rebuild the CSV using IDs from the [members API](https://docs.gitlab.com/ee/api/members.html). |
| A permission change in GitLab has not yet propagated. | Identity data refreshes hourly. Wait for the next identity crawl, then re-check. |

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

## Content freshness[​](#content-freshness "Direct link to Content freshness")

### Changes in GitLab are slow to appear in Glean[​](#changes-in-gitlab-are-slow-to-appear-in-glean "Direct link to Changes in GitLab are slow to appear in Glean")

**Symptoms:**

-   New or edited merge requests, issues, or wiki pages take a long time to show up in Glean.

| Cause | Fix |
| --- | --- |
| Webhooks were not created. | Glean creates group webhooks automatically when the token has the `api` scope and the **Owner** role on the relevant group. Otherwise, you must [create webhooks manually](/connectors/native/gitlab/setup) for near-real-time updates. See [GITLAB\_5](/troubleshooting/error-codes/gitlab/gitlab-5) for the full troubleshooting steps. |
| The webhook secret token does not match. | The **Webhook secret token** in Glean must exactly match the secret token configured on the GitLab webhook. Re-enter it in both places. |
| Waiting for a scheduled crawl. | Without webhooks, updates arrive on scheduled incremental crawls (approximately hourly) and full crawls (approximately every 28 days). |

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

### Does Glean modify anything in GitLab?

No. The connector is read-only. It reads content, membership, and identity data, and (with the `api` scope) registers webhooks. It never creates, modifies, or deletes content in GitLab.

### Do I still need a user-mapping CSV?

Not when user OAuth is configured and the user has authorized GitLab. Existing CSV mappings remain supported as a fallback for users who haven't authorized. See [Map GitLab identities](/connectors/native/gitlab/about#why-a-user-mapping-csv-is-required).

### Which token should I use, and which scopes?

Use a group access token for a group you want to crawl, or use a personal access token for a service account that a GitLab admin can add to every target group when you need to crawl projects across multiple top-level groups. Grant the `api` scope and the **Owner** role on each relevant group to let Glean create group webhooks automatically. For a read-only token, [create webhooks manually](/connectors/native/gitlab/setup). Read-only scopes are `read_api` and `read_repository` for a group access token, and `read_api`, `read_user`, and `read_repository` for the service account's personal access token. See [Create an access token](/connectors/native/gitlab/setup#1-create-an-access-token).

### Can I index more than one top-level group?

Yes. A GitLab Cloud connector can index projects across multiple top-level groups when the token's identity can access every target group and project. GitLab associates a group access token with one top-level group. For unrelated top-level groups on GitLab.com, use a service-account personal access token that can be granted membership in every target group. A group access token cannot resolve members from an invited group outside its associated top-level group; use a service-account personal access token with access to both groups for that access pattern.

### Do I need to enable Code Search separately?

No. Code Search is enabled by default after the connector is connected. See [Code Search](/user-guide/assistant/code-search).

### What GitLab objects can Glean index?

Merge requests (with comments and diffs), code and commit messages on the default branch, issues, wikis, and epics. Snippets and standalone milestones are not supported. See the [Overview](/connectors/native/gitlab/about#supported-objects).

### How quickly do changes appear in Glean?

With webhooks configured, changes appear in approximately 10 minutes. Otherwise, updates arrive on scheduled incremental crawls (approximately hourly) and full crawls (approximately every 28 days). Identity data refreshes hourly.
