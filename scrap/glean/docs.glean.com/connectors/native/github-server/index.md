---
url: "https://docs.glean.com/connectors/native/github-server/"
canonical: "https://docs.glean.com/connectors/native/github-server/"
title: "GitHub Server"
description: "How the Glean GitHub Server connector indexes content, resolves identity, and keeps results fresh."
fetched_at: "2026-09-01T13:29:29.260Z"
---
On this page

The GitHub Server connector lets Glean fetch and index content from an on-prem GitHub Server instance, so users can search the repositories, code, and activity they have access to. Glean authenticates by creating a GitHub App on your instance, and enforces all user access permissions at query time so users only see results they are allowed to see. All data is stored in the customer's cloud account and no data leaves the customer's environment.

Network reachability

These instructions work for on-prem instances the Glean crawler can access. Glean supports deployments on both GCP and AWS. Your GitHub Server instance must be network-accessible to the Glean crawler running in your cloud. Contact Glean Support for any network configuration required.

When you are ready to connect, follow the [setup guide](/connectors/native/github-server/setup).

## Key features[​](#key-features "Direct link to Key features")

-   Glean authenticates to your GitHub instance to fetch relevant information.
-   Authentication is done by creating a GitHub App on your instance.
-   Glean enforces all user access permissions at query time, so users cannot see results they do not have access to.
-   All data is stored in the customer's cloud account; no data leaves the customer's environment.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

For GitHub Server, Glean captures the following content:

-   PR descriptions
-   PR conversations and comments
-   Issue threads
-   Commit messages for the main branch
-   Wikis
-   Code: Code Search is supported for repositories connected via GitHub Server. It is enabled by default once connected; the Admin console toggle has been removed. See [Code Search](/user-guide/assistant/code-search) for more details.
-   GitHub Pages: you must enter a comma-separated list of repository names to include Pages in your search index. Only repositories that use the legacy **`gh-pages`** branch based workflow are supported, and within that branch only HTML and Markdown files are indexed.

File types

Content indexing is limited to specific file types for Text and Markdown (.txt, .md) and Code and Configuration files (.cmd, .c, .h, .cs, .csx, .cpp, .c++, .cc, .h++, .hh, .hpp, .cmake, .cob, .cbl, .css, .clj, .cljs, .cls, .dockerfile, .go, .graphql, .gql, .graphqls, .hs, .ini, .cfg, .cnf, .java, .js, .json, .jsx, .jl, .kt, .kts, .lua, .ml, .php, .pas, .pl, .perl, .proto, .py, .py3, .r, .rd, .rb, .rs, .scss, .sql, .mysql, .scala, .sc, .sh, .bash, .swift, .tf, .ts, .tsx, .us, .vhdl, .vhd, .vlg, .verilog, .yaml, .yml).

note

Contact Glean Support to explore crawling additional content types beyond those listed above.

## Live fetch for files[​](#live-fetch-for-files "Direct link to Live fetch for files")

Glean indexes code files from each repository's default branch. When Assistant needs to retrieve a GitHub file from a branch, tag, or commit that is not represented in the indexed corpus, Glean can fetch the file content directly from your GitHub Server instance using the user's federated GitHub access. This makes file content outside the default branch available on demand while continuing to enforce the user's GitHub permissions.

Files on a branch whose name contains a forward slash (for example, `feature/login`) can't be fetched this way. To reach such a file on demand, reference it by its commit SHA instead of the branch name.

## Live fetch for pull requests[​](#live-fetch-for-pull-requests "Direct link to Live fetch for pull requests")

When a user opens or shares a GitHub pull request URL in Glean Assistant and the indexed PR document is not yet available, Glean can fetch the pull request live from your GitHub Server instance. This indexing\-delay fallback provides Assistant with the current pull request body, metadata, reviewers, review comments, and diff.

The connector's per-user OAuth flow is required for live pull-request fetch.

## Crawl strategy and indexed content[​](#crawl-strategy-and-indexed-content "Direct link to Crawl strategy and indexed content")

This table outlines the purpose, frequency, and corresponding API endpoints for each crawl scope.

| Crawl scope | Purpose | Frequency | API endpoint |
| --- | --- | --- | --- |
| Repositories | Discover all repositories in the organization. | Every 4 hours | `GET /orgs/{org}/repos` |
| GIT | Clone repositories and crawl files, commits, and READMEs. | Full: 28 days; Incremental: 1 hour |  |
| PRs | Crawl pull requests, comments, reviews, diffs, and changed files. | Full: 28 days; Incremental: 1 hour | `GET /repos/{owner}/{repo}/pulls` |
| Issues | Crawl issues (non-PR) and comments. | Full: 28 days; Incremental: 1 hour | `GET /repos/{owner}/{repo}/issues` |
| Pages | Crawl GitHub Pages content (HTML and Markdown from legacy `gh-pages` repositories). |  |  |
| Identity | Discover users, groups (repositories and teams), team members, and collaborators. | Every 10 minutes | `GET /orgs/{org}/members` (users); `GET /repos/{owner}/{repo}/collaborators` (collaborators) |

note

In addition to the scheduled identity crawl, Glean supports identity webhooks for GitHub Server. Additive permission changes, such as adding users to a repository, adding teams to a repository, adding users to a team, or adding and removing users from the organization, are typically reflected in Glean within an hour.

## Identity[​](#identity "Direct link to Identity")

-   **Users:** Glean syncs GitHub users for permission resolution.
-   **Teams and groups:** Glean syncs GitHub teams, team memberships, and repository-level access groups.
-   **Scoped identity crawling:** GitHub identity sync uses separate crawl scopes for users and teams to improve permission freshness.
-   **Full identity crawls:** Conducted periodically to ensure all identity data stays up to date.

## Webhook events[​](#webhook-events "Direct link to Webhook events")

Glean handles GitHub identity webhook events for membership and team changes. Events such as Member, Organization, and Team help refresh permissions faster.

| Event type | Trigger | Behavior |
| --- | --- | --- |
| pull\_request | opened, edited, closed, reopened, etc. | Create dirty nodes for PR plus comments, reviews, diff, files |
| pull\_request\_review | submitted, edited | Create dirty node for reviews |
| pull\_request\_review\_comment | created, edited, deleted | Create dirty node for review comments or publish deletion doc |
| issue\_comment | created, edited, deleted | Create dirty node for issue comments or publish deletion doc |
| issues | opened, edited, closed, reopened, etc. | Create dirty node for issue plus comments |
| installation | created, deleted | Trigger admin re-auth |
| member | added, removed, edited | Update user identity (if enabled) |
| membership | added, removed | Update team memberships (if enabled) |
| organization | member\_added, member\_removed | Update user identity (if enabled) |
| team | created, deleted, edited | Update team metadata (if enabled) |

## GitHub authentication system[​](#github-authentication-system "Direct link to GitHub authentication system")

The system uses two separate flows to manage access: App authentication (for organizational data) and user token refresh (for individual sessions).

### GitHub App authentication (installation token)[​](#github-app-authentication-installation-token "Direct link to GitHub App authentication (installation token)")

This flow manages the application's core access token (`AUTH_ACCESS_TOKEN`), which lets Glean read organizational data through the GitHub App installation.

| Process stage | Purpose | Key artifacts | Expiry logic |
| --- | --- | --- | --- |
| Token request | Generate a JWT to request a new access token from the GitHub API. | JWT, installation ID (cached for 24h) |  |
| Active token | The current token used for all API calls. | Access token | 1 hour expiry. |
| Pre-fetch | Store a pre-fetched token 30 minutes before the active token expires. | Next access token |  |
| Validation |  |  | If the active token is under 5 minutes from expiry, the pending token is immediately accepted. |

### User token refresh[​](#user-token-refresh "Direct link to User token refresh")

This flow manages renewal of individual user sessions through the OAuth token refresh mechanism.

| Process stage | Purpose | Condition or endpoint |
| --- | --- | --- |
| Discovery | The admin crawl queries the user token store for sessions needing renewal. | Targets tokens expiring within a two-hour buffer (for 8-hour tokens). |
| Renewal | The system posts the refresh token to the GitHub OAuth endpoint to retrieve a new pair. | `gitDomain/login/oauth/access_token` |
| Update | The user token store is updated with the new access and refresh token pair and their updated expiry time. | Performed for each user requiring a refresh. |
