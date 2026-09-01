---
url: "https://docs.glean.com/connectors/native/github/about"
canonical: "https://docs.glean.com/connectors/native/github/about"
title: "GitHub Cloud"
description: "How the Glean GitHub Cloud connector indexes content, resolves identity, and keeps results fresh."
fetched_at: "2026-09-01T13:29:29.171Z"
---
On this page

The GitHub connector lets Glean fetch and index content from GitHub Cloud (GitHub.com, including GitHub Enterprise Cloud) so users can search the repositories, code, and activity they have access to. An organization admin installs a GitHub App for crawling, and each user completes per-user OAuth once so Glean can map their GitHub alias to their email and resolve their identity.

All data is stored in the customer's own cloud project, so no data leaves the customer's environment. Glean uses GitHub's standard [REST API](https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api?apiVersion=2022-11-28) to ingest content, and respects all user access permissions: users only see search results for content they can already access in GitHub.

Code Search

Code Search is enabled by default after GitHub is connected to Glean. The previous code tool toggle in the Admin console has been removed. See [Code Search](/user-guide/assistant/code-search) for more details.

When you are ready to connect GitHub Cloud, follow the [setup guide](/connectors/native/github/setup).

## What Glean indexes[​](#what-glean-indexes "Direct link to What Glean indexes")

The connector indexes the following objects:

-   Repositories and repository metadata
-   Source code files (common code and text file types)
-   Commits and README files
-   Issues and issue comments
-   Pull requests, reviews, comments, changed files, and diffs
-   Commit statuses
-   GitHub Pages: only repositories that use the legacy `gh-pages` branch based workflow, and within that branch only HTML and Markdown files. You must provide a comma-separated list of repository names to include Pages content.

The following are **not** indexed by default:

-   Wikis
-   GitHub Pages content (when Pages crawling is enabled, only sites using GitHub's branch-based build are indexed, not sites built with custom GitHub Actions workflows)

File types

Content indexing is limited to specific file types for Text and Markdown (.txt, .md) and Code and Configuration files (.cmd, .c, .h, .cs, .csx, .cpp, .c++, .cc, .h++, .hh, .hpp, .cmake, .cob, .cbl, .css, .clj, .cljs, .cls, .dockerfile, .go, .graphql, .gql, .graphqls, .hs, .ini, .cfg, .cnf, .java, .js, .json, .jsx, .jl, .kt, .kts, .lua, .ml, .php, .pas, .pl, .perl, .proto, .py, .py3, .r, .rd, .rb, .rs, .scss, .sql, .mysql, .scala, .sc, .sh, .bash, .swift, .tf, .ts, .tsx, .us, .vhdl, .vhd, .vlg, .verilog, .yaml, .yml).

note

Contact Glean Support to explore crawling additional content types beyond those listed above.

## Live fetch for files[​](#live-fetch-for-files "Direct link to Live fetch for files")

Glean indexes code files from each repository's default branch. When Assistant needs to retrieve a GitHub file from a branch, tag, or commit that is not represented in the indexed corpus, Glean can fetch the file content directly from GitHub using the user's federated GitHub access. This makes file content outside the default branch available on demand while continuing to enforce the user's GitHub permissions.

## Live fetch for pull requests[​](#live-fetch-for-pull-requests "Direct link to Live fetch for pull requests")

When a user opens or shares a GitHub pull request URL in Glean Assistant and the indexed PR document is not yet available, Glean can fetch the pull request live from GitHub. This fallback provides Assistant with the current pull request body, metadata, reviewers, review comments, and diff.

Live pull-request fetch has two authentication paths:

-   **MCP path:** On GitHub Cloud, Assistant can use the GitHub MCP connection. The user must connect the GitHub action pack, which is separate from connector OAuth.
-   **API-backed fallback:** When MCP is not used, Glean fetches the pull request using the user's GitHub access. The user must complete the connector's per-user OAuth flow.

## How authentication works[​](#how-authentication-works "Direct link to How authentication works")

The connector uses the GitHub App for organization-level crawling. An organization admin installs the app, which lets Glean crawl repositories, pull requests, issues, collaborators, and other organization data.

Each user must also complete the connector's per-user OAuth flow. This maps the user's GitHub identity to their Glean identity so Glean can resolve permissions for indexed GitHub content.

After OAuth is complete, the next entity crawl makes the mapping available in Glean.

For the step-by-step install and configuration, see the [setup guide](/connectors/native/github/setup).

## Identity[​](#identity "Direct link to Identity")

-   **Users:** Glean syncs GitHub users for permission resolution.
-   **Teams and groups:** Glean syncs GitHub teams, team memberships, and repository-level access groups.
-   **Scoped identity crawling:** GitHub identity sync uses separate crawl scopes for users and teams to improve permission freshness.
-   **Full identity crawls:** Conducted periodically to ensure all identity data stays up to date.

Glean creates one access group per private repository, made up of the repository's direct collaborators and any GitHub Teams with access. At search time, a user sees private repository content only if their GitHub identity is a direct collaborator or a member of a team with access.

## Webhook events[​](#webhook-events "Direct link to Webhook events")

Glean handles GitHub identity webhook events for membership and team changes. Events such as Member, Organization, and Team help refresh permissions faster. The connector subscribes to:

-   Commit comment
-   Issues
-   Issue comment
-   Member
-   Organization
-   Pull request
-   Pull request review
-   Pull request review comment
-   Push
-   Repository
-   Team
-   Team add

Webhook information is stored securely in the customer's dedicated cloud project, keeping the data private and protected. The connector can crawl content without webhooks, but webhooks are strongly recommended because they help Glean pick up new and updated activity faster.

## Crawling and update frequency[​](#crawling-and-update-frequency "Direct link to Crawling and update frequency")

-   **Rate limits:** The default rate limit is 4 queries per second. For more on GitHub's rate limiting, see [GitHub's documentation](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28).
-   **Webhooks:** Adds, updates, and permission changes are crawled with best effort as received, so new and modified content is detected quickly.
-   **Identity:** Changes to users, team memberships, and team-based repository access are picked up through identity webhook events and regular identity crawls.
-   **Incremental crawls:** Run every 10 minutes for additional reliability beyond webhooks.
-   **Full crawls:** Configurable, but generally less frequent than incremental crawls, around every 28 days.

Changes must be crawled, processed, and indexed before they appear in the UI. Actual time varies with the number of changes and corpus size. For more, see [Crawling Strategy](/connectors/crawling-frequency).

How the crawl works:

-   **Identity crawl:** Updates users, GitHub teams, team memberships, and repository access used for permission enforcement.
-   **Webhooks:** Notify Glean of changes in real time; Glean then initiates a crawl or picks up the change on the next crawl.
-   **Content crawls:** Full crawls cover the entire defined scope; incremental crawls capture only the changes since the previous crawl.

## Known limitations[​](#known-limitations "Direct link to Known limitations")

-   Per-user OAuth maps a user's GitHub alias to their email so Glean can resolve their GitHub identity. Until a user completes it from **Glean → Settings → Connectors → GitHub**, Glean can't resolve their identity, so no GitHub content (public or private) appears in their search results.
-   GitHub Wiki pages are not crawled by default. To enable them, contact your Glean representative.
-   Only GitHub Pages sites that use the legacy `gh-pages` branch based build are supported. Glean indexes the HTML and Markdown files in that branch. Pages sites built with custom GitHub Actions workflows are not supported.
