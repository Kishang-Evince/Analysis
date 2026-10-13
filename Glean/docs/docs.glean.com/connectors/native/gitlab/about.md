---
url: "https://docs.glean.com/connectors/native/gitlab/about"
canonical: "https://docs.glean.com/connectors/native/gitlab/about"
title: "GitLab Cloud overview"
description: "What the GitLab Cloud connector indexes, how permissions are enforced, and how crawling keeps content fresh."
fetched_at: "2026-10-13T08:49:56.382Z"
---
On this page

The GitLab Cloud connector indexes content from GitLab.com (SaaS) so your team can find project overviews, merge requests, code, issues, wikis, and epics through permission-aware search and Glean Assistant. Glean connects to the [GitLab API](https://docs.gitlab.com/ee/api/rest/) over HTTPS using a group access token or a personal access token for a service account, crawls the groups and projects the token can access, and enforces GitLab's own permissions at query time so users only see what they can already see in GitLab.

For a product-level overview of the connector, see the [GitLab integration page](https://www.glean.com/connectors/gitlab).

To connect the connector, see [Setup](/connectors/native/gitlab/setup).

## Content scope and token access[​](#content-scope-and-token-access "Direct link to Content scope and token access")

A GitLab Cloud connector crawls the groups and projects that its access token can reach. It can index projects across multiple top-level groups when the token's identity supports that access. For unrelated top-level groups on GitLab.com, use a personal access token for a service account that a GitLab admin can add to every target group and project.

GitLab associates a group access token with one top-level group. To crawl projects across unrelated top-level groups, use a service-account personal access token with access to every target group and project.

If another group shares content with an invited group outside the associated top-level group, Glean cannot list the invited group's members with the group access token. Users who access the shared content through that invited group will not see those documents in Glean. Use a service-account personal access token with access to both groups for this scenario.

The connector indexes only content within the groups and projects the token can access, subject to the token's scopes and any namespace-level filters configured with help from Glean Support.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

Glean always indexes project overviews, merge requests, code, issues, and wikis. The setup page has no toggles for these object types. Glean indexes epics by default. Clear **Crawl Group Epics** to exclude them.

### Project overviews[​](#project-overviews "Direct link to Project overviews")

-   Project name and namespace.
-   Project description and link to the project in GitLab.
-   Default branch and star count.

### Merge requests[​](#merge-requests "Direct link to Merge requests")

-   Merge request title, description, and state.
-   Merge request comments (notes).
-   Merge request diffs.
-   Author, and project the merge request belongs to.

### Code[​](#code "Direct link to Code")

-   Repository file contents on the **default branch**, made searchable through [Code Search](/user-guide/assistant/code-search).
-   Commit messages on the **default branch**.

### Issues[​](#issues "Direct link to Issues")

-   Issue title, description, and state.
-   Issue comments (notes).
-   Author, and project the issue belongs to.

### Wikis[​](#wikis "Direct link to Wikis")

-   Wiki page title and body.
-   Only pages whose file body is `.md` or `.txt` are indexed.

### Epics[​](#epics "Direct link to Epics")

-   Epic title, description, and state.

## Limitations[​](#limitations "Direct link to Limitations")

-   The connector can index projects across multiple **top-level groups** when the token's identity can access every target group and project. GitLab associates a group access token with one top-level group. On GitLab.com, use a service-account personal access token that a GitLab admin can add to every target group.
-   Glean always indexes project overviews, merge requests (with comments and diffs), code, issues, and wikis. The **Crawl Group Epics** option is the only object-type toggle, and Glean turns it on by default.
-   Only file content on the **default branch** is indexed for code and commit messages. Other branches are not crawled.
-   Wiki indexing covers pages whose file body is `.md` or `.txt`; other file types in a wiki are not indexed.
-   **Snippets** and **standalone milestones** are not supported.
-   There are no greenlist (inclusion) or redlist (exclusion) content filters exposed in the setup UI. Namespace-level allow and block lists can be configured with help from Glean Support.
-   Glean needs to map GitLab identities to Glean accounts. User OAuth provides this mapping, with an optional user-mapping CSV as a fallback. See [Permissions and security](#permissions-and-security).

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

### How permissions are enforced[​](#how-permissions-are-enforced "Direct link to How permissions are enforced")

Glean mirrors GitLab's permission model. For private projects, access depends on the object type:

-   Guest members can find a project overview when they can view the project in GitLab.
-   Glean limits repository files, commit messages, and merge requests to members who have repository access in GitLab.

Glean reads project membership from the GitLab API and evaluates permissions at query time. Users only see GitLab content in Glean that they can access in GitLab.

### Map GitLab identities[​](#why-a-user-mapping-csv-is-required "Direct link to Map GitLab identities")

With user OAuth configured, teammates authorize GitLab to link their GitLab identities to their Glean accounts. OAuth doesn't expand the connector's crawl scope or grant new GitLab permissions. See [Authorize GitLab as a user](/connectors/native/gitlab/setup#authorize-gitlab-as-a-user).

A user-mapping CSV is optional with user OAuth. It maps numeric GitLab user IDs to company (SSO) emails as a fallback for teammates who haven't authorized GitLab. Existing CSV mappings remain supported. See [Build the user-mapping file](/connectors/native/gitlab/setup#3-build-the-user-mapping-file).

### Data access model[​](#data-access-model "Direct link to Data access model")

-   The connector is **read-only** — Glean never creates, modifies, or deletes content in GitLab.
-   Authentication uses a group access token or a personal access token for a service account, sent as a bearer token over HTTPS.
-   The connector indexes content from the groups and projects that the token can access, subject to the token's scopes.

## Crawling and freshness[​](#crawling-and-freshness "Direct link to Crawling and freshness")

### Full crawls[​](#full-crawls "Direct link to Full crawls")

Glean periodically re-enumerates all accessible projects and their content in a full crawl, which runs approximately **every 28 days**.

### Incremental crawls[​](#incremental-crawls "Direct link to Incremental crawls")

Between full crawls, Glean runs scheduled incremental crawls approximately **hourly** to pick up new and changed content.

### Webhook-driven updates[​](#webhook-driven-updates "Direct link to Webhook-driven updates")

When the token has the `api` scope and the **Owner** role on the relevant group, Glean automatically registers group webhooks in GitLab, so Glean reflects changes in approximately **10 minutes**. Otherwise you create webhooks manually to get the same near-real-time updates. See [Create webhooks manually](/connectors/native/gitlab/setup#2-create-webhooks-manually).

### Identity crawls[​](#identity-crawls "Direct link to Identity crawls")

User and membership data is refreshed **hourly** so permission changes in GitLab propagate to Glean.

note

GitLab enforces API rate limits. Glean throttles its crawl to stay within those limits, backing off in response to GitLab's rate-limit responses.

## Use cases and example queries[​](#use-cases-and-example-queries "Direct link to Use cases and example queries")

-   **Find a merge request by topic**: "merge request adding retry logic to the billing service".
-   **Locate code**: search a function or file name to jump straight to the implementation on the default branch.
-   **Recover a decision**: "why did we switch the auth library" surfaces the relevant MR discussion and issue comments.
-   **Track work**: "open issues in the payments project" or "epic for Q3 search improvements".
