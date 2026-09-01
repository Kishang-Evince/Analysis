---
url: "https://docs.glean.com/connectors/native/gitlab/about"
canonical: "https://docs.glean.com/connectors/native/gitlab/about"
title: "GitLab Cloud overview"
description: "What the GitLab Cloud connector indexes, how permissions are enforced, and how crawling keeps content fresh."
fetched_at: "2026-09-01T13:29:30.015Z"
---
On this page

The GitLab Cloud connector indexes content from GitLab.com (SaaS) so your team can find merge requests, code, issues, wikis, and epics through permission-aware search and Glean Assistant. Glean connects to the [GitLab REST API](https://docs.gitlab.com/ee/api/rest/) over HTTPS using an access token scoped to a single [top-level group](#top-level-group-scope), crawls the projects and subgroups in that group, and enforces GitLab's own permissions at query time so users only see what they can already see in GitLab.

For a product-level overview of the connector, see the [GitLab integration page](https://www.glean.com/connectors/gitlab).

To connect the connector, see [Setup](/connectors/native/gitlab/setup).

## Top-level group scope[​](#top-level-group-scope "Direct link to Top-level group scope")

Each GitLab Cloud connector indexes exactly one **top-level group**, a GitLab root namespace with no parent group. If your group URL is `https://gitlab.com/your-group`, then `your-group` is the top-level group path.

Glean validates this when you save the connector: the access token you provide must resolve to exactly one top-level group, and that group's path must match the path you entered. Scoping each connector to one namespace keeps the crawl inside a single permission boundary.

To index more than one top-level group, add a separate GitLab Cloud connector for each one, with its own access token scoped to that group.

Existing connectors

If your connector was set up before the top-level group field existed, validation keeps passing while the field is empty—the top-level group check only runs once a group has been recorded. Glean records one for you as soon as the token resolves to exactly one top-level group, so no action is needed. If the token reaches several top-level groups, scope it down to one and add a separate connector for each remaining group.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

Glean indexes the following GitLab objects. Merge requests, code, issues, and wikis are always indexed and have no setup toggles. Epics are also indexed by default, controlled by a **Crawl Group Epics** toggle on the connector setup page that you can clear if you don't want epics indexed.

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

-   Each connector indexes a single **top-level group**. Indexing more than one requires a separate GitLab Cloud connector per group. See [Top-level group scope](#top-level-group-scope).
-   Merge requests (with comments and diffs), code, issues, and wikis cannot be selectively enabled or disabled — they are always indexed. Epics are the only object type with a setup toggle: the **Crawl Group Epics** option on the connector setup page controls whether epics are indexed, and it is selected by default.
-   Only file content on the **default branch** is indexed for code and commit messages. Other branches are not crawled.
-   Wiki indexing covers pages whose file body is `.md` or `.txt`; other file types in a wiki are not indexed.
-   **Snippets** and **standalone milestones** are not supported.
-   There are no greenlist (inclusion) or redlist (exclusion) content filters exposed in the setup UI. Namespace-level allow and block lists can be configured with help from Glean Support.
-   The GitLab API does not return user email addresses, so a **user-mapping CSV** is required to enforce permissions correctly. See [Permissions and security](#permissions-and-security).

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

### How permissions are enforced[​](#how-permissions-are-enforced "Direct link to How permissions are enforced")

Glean mirrors GitLab's permission model. For each project, Glean reads the project's membership from the GitLab API and grants access in Glean to the same users. Permissions are evaluated at query time, so a user only sees GitLab content in Glean that they are entitled to see in GitLab.

### Why a user-mapping CSV is required[​](#why-a-user-mapping-csv-is-required "Direct link to Why a user-mapping CSV is required")

The GitLab REST API does not expose user email addresses, so Glean cannot automatically map a GitLab user ID to the person's company identity (their SSO email). To bridge this, you upload a **user-mapping CSV** during setup that maps each numeric GitLab user ID to the corresponding company email. Without it, Glean cannot resolve GitLab memberships to Glean users and permissions cannot be enforced. See [Build the user-mapping file](/connectors/native/gitlab/setup#3-build-the-user-mapping-file).

### Data access model[​](#data-access-model "Direct link to Data access model")

-   The connector is **read-only** — Glean never creates, modifies, or deletes content in GitLab.
-   Authentication uses a group access token or a service account access token, sent as a bearer token over HTTPS.
-   Content is indexed from the projects in the top-level group that the token can access, subject to the token's scopes.

## Crawling and freshness[​](#crawling-and-freshness "Direct link to Crawling and freshness")

### Full crawls[​](#full-crawls "Direct link to Full crawls")

Glean periodically re-enumerates all accessible projects and their content in a full crawl, which runs approximately **every 28 days**.

### Incremental crawls[​](#incremental-crawls "Direct link to Incremental crawls")

Between full crawls, Glean runs scheduled incremental crawls approximately **hourly** to pick up new and changed content.

### Webhook-driven updates[​](#webhook-driven-updates "Direct link to Webhook-driven updates")

When the token has the `api` scope and the **Owner** role on the top-level group, Glean automatically registers webhooks in GitLab, so changes are reflected in approximately **10 minutes**. Otherwise you create webhooks manually to get the same near-real-time updates. See [Create webhooks manually](/connectors/native/gitlab/setup#create-webhooks-manually-read-only-scopes-only).

### Identity crawls[​](#identity-crawls "Direct link to Identity crawls")

User and membership data is refreshed **hourly** so permission changes in GitLab propagate to Glean.

note

GitLab enforces API rate limits. Glean throttles its crawl to stay within those limits, backing off in response to GitLab's rate-limit responses.

## Use cases and example queries[​](#use-cases-and-example-queries "Direct link to Use cases and example queries")

-   **Find a merge request by topic**: "merge request adding retry logic to the billing service".
-   **Locate code**: search a function or file name to jump straight to the implementation on the default branch.
-   **Recover a decision**: "why did we switch the auth library" surfaces the relevant MR discussion and issue comments.
-   **Track work**: "open issues in the payments project" or "epic for Q3 search improvements".
