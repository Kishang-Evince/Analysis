---
url: "https://docs.glean.com/connectors/native/gitlab-onprem/about"
canonical: "https://docs.glean.com/connectors/native/gitlab-onprem/about"
title: "GitLab Server overview"
description: "What the GitLab Server connector indexes, how permissions are enforced, and how crawling keeps content fresh."
fetched_at: "2026-09-01T13:29:29.856Z"
---
On this page

The GitLab Server connector indexes content from your self-managed (on-premises) GitLab instance so your team can find merge requests, code, issues, wikis, and epics through permission-aware search and Glean Assistant. Glean connects to the [GitLab REST API](https://docs.gitlab.com/ee/api/rest/) over HTTPS using a personal access token, crawls the projects the token can reach, and enforces GitLab's own permissions at query time so users only see what they can already see in GitLab.

For a product-level overview of the connector, see the [GitLab integration page](https://www.glean.com/connectors/gitlab).

To connect the connector, see [Setup](/connectors/native/gitlab-onprem/setup).

info

Your self-managed GitLab instance must be network-reachable by the Glean crawler running in your cloud. Glean supports deployments on both **GCP** and **AWS**. Contact [Glean Support](https://support.glean.com) for any network configuration required.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

Glean indexes the following GitLab objects. Merge requests, code, issues, and wikis are always indexed and have no setup toggles. Epics are also indexed by default, controlled by a **Crawl epics** toggle on the connector setup page that you can clear if you don't want epics indexed.

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
-   Epic crawling requires **GitLab 18.1 or later** and uses the [GraphQL Work Items API](https://docs.gitlab.com/ee/api/graphql/reference/#workitem).

## Limitations[​](#limitations "Direct link to Limitations")

-   Merge requests (with comments and diffs), code, issues, and wikis cannot be selectively enabled or disabled - they are always indexed. Epics are the only object type with a setup toggle: the **Crawl epics** option on the connector setup page controls whether epics are indexed, and it is selected by default.
-   Only file content on the **default branch** is indexed for code and commit messages. Other branches are not crawled.
-   Wiki indexing covers pages whose file body is `.md` or `.txt`; other file types in a wiki are not indexed.
-   Epic crawling requires **GitLab 18.1 or later**.
-   **Snippets** and **standalone milestones** are not supported.
-   There are no greenlist (inclusion) or redlist (exclusion) content filters exposed in the setup UI. Namespace-level allow and block lists can be configured with help from Glean Support.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

### How permissions are enforced[​](#how-permissions-are-enforced "Direct link to How permissions are enforced")

Glean mirrors GitLab's permission model. For each project, Glean reads the project's membership from the GitLab API and grants access in Glean to the same users. Epics are group-level, so Glean mirrors the owning group's membership and grants access to each epic to that group's members. Permissions are evaluated at query time, so a user only sees GitLab content in Glean that they are entitled to see in GitLab.

### Admin and non-admin tokens[​](#admin-and-non-admin-tokens "Direct link to Admin and non-admin tokens")

The connector supports two authentication paths, and the path affects what extra data you must provide:

-   With an **admin personal access token**, GitLab returns user emails and complete project membership directly from the API, so no supplementary files are needed.
-   With a **non-admin personal access token**, the API does not return user emails and may return incomplete project membership. In that case you upload a **user-mapping CSV** and a **project permissions CSV** so Glean can resolve identities and enforce permissions correctly.

See [Choose an authentication path](/connectors/native/gitlab-onprem/setup#1-choose-an-authentication-path) for the full comparison.

### Data access model[​](#data-access-model "Direct link to Data access model")

-   The connector is **read-only** - Glean never creates, modifies, or deletes content in GitLab.
-   Authentication uses a personal access token sent as a bearer token over HTTPS.
-   Content is indexed from the projects the token can access, subject to the token's scopes.

## Crawling and freshness[​](#crawling-and-freshness "Direct link to Crawling and freshness")

### Full crawls[​](#full-crawls "Direct link to Full crawls")

Glean periodically re-enumerates all accessible projects and their content in a full crawl, which runs approximately **every 28 days**.

### Incremental crawls[​](#incremental-crawls "Direct link to Incremental crawls")

Between full crawls, Glean runs scheduled incremental crawls approximately **hourly** to pick up new and changed content. Code and commit changes are picked up by incremental git crawls.

### Webhook-driven updates[​](#webhook-driven-updates "Direct link to Webhook-driven updates")

When the token has the `api` scope, Glean automatically registers webhooks in GitLab. With read-only scopes you create webhooks - and a system hook - manually to get near-real-time updates. See [Create webhooks and a system hook](/connectors/native/gitlab-onprem/setup#create-webhooks-and-a-system-hook-read-only-scopes-only).

### Identity crawls[​](#identity-crawls "Direct link to Identity crawls")

User and membership data is refreshed **hourly** so permission changes in GitLab propagate to Glean.

note

GitLab enforces API rate limits. Glean throttles its crawl to stay within those limits, backing off in response to GitLab's rate-limit responses.

## Use cases and example queries[​](#use-cases-and-example-queries "Direct link to Use cases and example queries")

-   **Find a merge request by topic**: "merge request adding retry logic to the billing service".
-   **Locate code**: search a function or file name to jump straight to the implementation on the default branch.
-   **Recover a decision**: "why did we switch the auth library" surfaces the relevant MR discussion and issue comments.
-   **Track work**: "open issues in the payments project" or "epic for Q3 search improvements".
