---
url: "https://docs.glean.com/connectors/native/gitlab/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/gitlab/troubleshooting"
title: "GitLab Cloud troubleshooting and FAQs"
description: "Resolve common GitLab Cloud connector setup, permission, and content freshness issues, and read answers to frequently asked questions."
fetched_at: "2026-09-01T13:29:30.250Z"
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
| The access token is malformed or was copied incorrectly. | GitLab shows the token value only once. Generate a new [access token](/connectors/native/gitlab/setup#1-create-an-access-token) and re-enter it. See [GITLAB\_3](/troubleshooting/error-codes/gitlab/gitlab-3) for the full troubleshooting steps. |
| The token is missing required scopes or has expired. | Confirm the token carries either the `api` scope or the read-only scopes for the token type you chose. If it may have expired, [generate a new token](/connectors/native/gitlab/setup#1-create-an-access-token) and re-enter it. See [GITLAB\_1](/troubleshooting/error-codes/gitlab/gitlab-1) (users) and [GITLAB\_2](/troubleshooting/error-codes/gitlab/gitlab-2) (projects) for the full troubleshooting steps. |
| The token owner cannot access the projects you expect. | Use a token that has access to every project you want Glean to crawl. See [GITLAB\_2](/troubleshooting/error-codes/gitlab/gitlab-2) for the full troubleshooting steps. |
| The token reaches more than one top-level group, or the path you entered does not match. | Each connector indexes one [top-level group](/connectors/native/gitlab/about#top-level-group-scope). Scope the token to a single group, and confirm **URL Path of Top Level Group** matches that group's path. See [GITLAB\_7](/troubleshooting/error-codes/gitlab/gitlab-7) for the full troubleshooting steps. |
| The token does not have **Owner** access to the top-level group. | Give the token the **Owner** role on the top-level group, or clear the **API token has Top Level Group Owner Privileges** checkbox. See [GITLAB\_8](/troubleshooting/error-codes/gitlab/gitlab-8) for the full troubleshooting steps. |

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

### No projects or content are indexed after setup[​](#no-projects-or-content-are-indexed-after-setup "Direct link to No projects or content are indexed after setup")

**Symptoms:**

-   Setup succeeds, but few or no GitLab results appear in Glean.

| Cause | Fix |
| --- | --- |
| The token owner does not have access to the projects. | Glean only crawls projects the token can reach. Grant the token owner access, or use a token with broader access. See [GITLAB\_2](/troubleshooting/error-codes/gitlab/gitlab-2) for the full troubleshooting steps. |
| The projects are outside the configured top-level group. | Each connector indexes one [top-level group](/connectors/native/gitlab/about#top-level-group-scope). Add a separate GitLab Cloud connector for each additional top-level group you want indexed. |
| The initial crawl is still in progress. | The first full crawl can take time on large accounts. Wait for it to finish, then re-check. All supported objects — merge requests, code, issues, wikis, and epics — are indexed by default, so there is no per-object setting to enable. |
| Namespace allow/block lists are excluding projects. | If namespace filters were configured, confirm the projects fall within the allowed namespaces. Contact [Glean Support](https://support.glean.com) to review them. |

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

## Permissions and access[​](#permissions-and-access "Direct link to Permissions and access")

### Users see the wrong GitLab content, or none at all[​](#users-see-the-wrong-gitlab-content-or-none-at-all "Direct link to Users see the wrong GitLab content, or none at all")

**Symptoms:**

-   A user sees GitLab results they should not have access to, or is missing results they should see.

| Cause | Fix |
| --- | --- |
| The user-mapping CSV is missing or incomplete. | The GitLab API does not return emails, so Glean relies on the [user-mapping CSV](/connectors/native/gitlab/setup#3-build-the-user-mapping-file) to map GitLab user IDs to company emails. Upload a complete file. |
| The CSV uses usernames instead of numeric user IDs. | The first column must be the numeric GitLab `id`, not the username. Rebuild the CSV using IDs from the [members API](https://docs.gitlab.com/ee/api/members.html). |
| A permission change in GitLab has not yet propagated. | Identity data refreshes hourly. Wait for the next identity crawl, then re-check. |

**Still not resolved?** Contact [Glean Support](https://support.glean.com).

## Content freshness[​](#content-freshness "Direct link to Content freshness")

### Changes in GitLab are slow to appear in Glean[​](#changes-in-gitlab-are-slow-to-appear-in-glean "Direct link to Changes in GitLab are slow to appear in Glean")

**Symptoms:**

-   New or edited merge requests, issues, or wiki pages take a long time to show up in Glean.

| Cause | Fix |
| --- | --- |
| Webhooks were not created. | Glean creates webhooks automatically when the token has the `api` scope and the **Owner** role on the top-level group. Otherwise you must [create webhooks manually](/connectors/native/gitlab/setup#create-webhooks-manually-read-only-scopes-only) for near-real-time updates. See [GITLAB\_5](/troubleshooting/error-codes/gitlab/gitlab-5) for the full troubleshooting steps. |
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

### Why is a user-mapping CSV required?

The GitLab REST API does not return user email addresses, so Glean cannot automatically match a GitLab user ID to a person's company identity. The [user-mapping CSV](/connectors/native/gitlab/setup#3-build-the-user-mapping-file) provides that mapping so permissions are enforced correctly.

### Which token should I use, and which scopes?

Use a token scoped to a single top-level group: either a group access token on that group (preferred) or an access token for a service account that belongs only to that group. Grant the `api` scope to let Glean create webhooks automatically, or keep the token read-only and [create webhooks manually](/connectors/native/gitlab/setup#create-webhooks-manually-read-only-scopes-only). Read-only scopes are `read_api` and `read_repository` for a group access token, and `read_api`, `read_user`, and `read_repository` for a service account token. See [Create an access token](/connectors/native/gitlab/setup#1-create-an-access-token).

### Can I index more than one top-level group?

Not with a single connector. Each GitLab Cloud connector indexes one top-level group, so add a separate connector for each group, with its own access token scoped to that group. See [Top-level group scope](/connectors/native/gitlab/about#top-level-group-scope).

### Do I need to enable Code Search separately?

No. Code Search is enabled by default after the connector is connected. See [Code Search](/user-guide/assistant/code-search).

### What GitLab objects can Glean index?

Merge requests (with comments and diffs), code and commit messages on the default branch, issues, wikis, and epics. Snippets and standalone milestones are not supported. See the [Overview](/connectors/native/gitlab/about#supported-objects).

### How quickly do changes appear in Glean?

With webhooks configured, changes appear in approximately 10 minutes. Otherwise, updates arrive on scheduled incremental crawls (approximately hourly) and full crawls (approximately every 28 days). Identity data refreshes hourly.
