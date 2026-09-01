---
url: "https://docs.glean.com/connectors/native/github/api"
canonical: "https://docs.glean.com/connectors/native/github/api"
title: "GitHub Cloud API endpoints"
description: "The GitHub REST API endpoints and read-only permissions used by the Glean GitHub Cloud connector."
fetched_at: "2026-09-01T13:29:29.455Z"
---
On this page

## Overview[​](#overview "Direct link to Overview")

Glean uses GitHub's standard [REST API](https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api?apiVersion=2022-11-28) to crawl your GitHub Cloud organization, plus the git protocol to clone repository contents. Every permission Glean uses is read-only.

## GitHub App permissions[​](#github-app-permissions "Direct link to GitHub App permissions")

Glean requests the following read-only permissions, grouped by the level they apply to. How the permissions are set depends on which setup path you use:

-   **GitHub Cloud:** the permissions belong to the Glean GitHub App. They are set when the App is installed, and organization admins cannot scope them down or expand them.
-   **GitHub Enterprise Cloud:** a GitHub enterprise owner creates a custom App and sets the same read-only permissions when creating it, including the Organization and Enterprise permissions described below. See [Set up GitHub Cloud](/connectors/native/github/setup).

-   Repository
-   Organization
-   User
-   Enterprise

| Permission | Access | What it covers |
| --- | --- | --- |
| Administration | Read-only | Repository settings and metadata |
| Contents | Read-only | Code, files, commits, and READMEs |
| Commit statuses | Read-only | Commit status checks |
| Issues | Read-only | Issues and issue comments |
| Metadata | Read-only | Basic repository information (always required) |
| Pull requests | Read-only | Pull requests, reviews, comments, and diffs |
| Pages | Read-only | GitHub Pages content for legacy `gh-pages` sites |

| Permission | Access | What it covers |
| --- | --- | --- |
| Members | Read-only | Organization members and teams, for permission resolution |

| Permission | Access | What it covers |
| --- | --- | --- |
| Email addresses | Read-only | The user's GitHub email, granted through per-user OAuth so identity can be matched |

Enterprise permissions apply only to the GitHub Enterprise Cloud setup path, where Glean crawls identity at the enterprise level rather than one organization at a time.

| Permission | Access | What it covers |
| --- | --- | --- |
| Enterprise people | Read-only | Enterprise members, so Glean can match them to Glean users |
| Enterprise teams | Read-only | Enterprise teams, for permission resolution |

## API endpoints[​](#api-endpoints "Direct link to API endpoints")

| Endpoint | Permissions | URL |
| --- | --- | --- |
| [List installations for the authenticated app](https://docs.github.com/en/rest/apps/apps?apiVersion=2022-11-28#list-installations-for-the-authenticated-app) | Read | `/app/installations` |
| [Create an installation access token for an app](https://docs.github.com/en/rest/apps/apps?apiVersion=2022-11-28#create-an-installation-access-token-for-an-app) |  | `/app/installations/%/access_token` |
| [List repositories accessible to the app installation](https://docs.github.com/en/rest/apps/installations?apiVersion=2022-11-28#list-repositories-accessible-to-the-app-installation) | Read | `/installation/repositories` |
| [Organization permissions for Members](https://docs.github.com/en/rest/authentication/permissions-required-for-github-apps?apiVersion=2022-11-28#organization-permissions-for-members) | Read | `/org/%/members` |
| [List organization teams](https://docs.github.com/en/rest/teams/teams?apiVersion=2022-11-28#list-teams) | Read | `/org/%/teams` |
| [List team members](https://docs.github.com/en/rest/teams/members?apiVersion=2022-11-28#list-team-members) | Read | `/org/%/teams/%/members` |
| [List team repositories](https://docs.github.com/en/rest/teams/teams?apiVersion=2022-11-28#list-team-repositories) | Read | `/org/%/teams/%/repos` |
| [Repository permissions for Metadata (repository)](https://docs.github.com/en/rest/authentication/permissions-required-for-github-apps?apiVersion=2022-11-28#repository-permissions-for-metadata) | Read | `/repos/%` |
| [Repository permissions for Issues](https://docs.github.com/en/rest/authentication/permissions-required-for-github-apps?apiVersion=2022-11-28#repository-permissions-for-issues) | Read | `/repos/%/issues` |
| [Repository permissions for Issues (comments)](https://docs.github.com/en/rest/authentication/permissions-required-for-github-apps?apiVersion=2022-11-28#repository-permissions-for-issues) | Read | `/repos/%/issues/%/comments` |
| [Repository permissions for Pull requests](https://docs.github.com/en/rest/authentication/permissions-required-for-github-apps?apiVersion=2022-11-28#repository-permissions-for-pull-requests) | Read | `/repos/%/pulls` |
| [Repository permissions for Pull requests (detail)](https://docs.github.com/en/rest/authentication/permissions-required-for-github-apps?apiVersion=2022-11-28#repository-permissions-for-pull-requests) | Read | `/repos/%/pulls/%` |
| [Repository permissions for Pull requests (comments)](https://docs.github.com/en/rest/authentication/permissions-required-for-github-apps?apiVersion=2022-11-28#repository-permissions-for-pull-requests) | Read | `/repos/%/pulls/%/comments` |
| [Repository permissions for Pull requests (reviews)](https://docs.github.com/en/rest/authentication/permissions-required-for-github-apps?apiVersion=2022-11-28#repository-permissions-for-pull-requests) | Read | `/repos/%/pulls/%/reviews` |
| [Repository permissions for Metadata (collaborators)](https://docs.github.com/en/rest/authentication/permissions-required-for-github-apps?apiVersion=2022-11-28#repository-permissions-for-metadata) | Read | `/repos/%/collaborators` |
| [Per-user OAuth: request a user's GitHub identity (scope user:email) to get a code](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#1-request-a-users-github-identity) | Read | `/login/oauth/authorize` |
| [Per-user OAuth: exchange the code for an access token](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github) |  | `/login/oauth/access_token` |
| Per-user OAuth: get the authenticated user (scope user:email) |  | `/user` |
| [User permissions for Email addresses](https://docs.github.com/en/rest/authentication/permissions-required-for-github-apps?apiVersion=2022-11-28#user-permissions-for-email-addresses) | Read | `/user/emails` |

## Git protocol endpoints[​](#git-protocol-endpoints "Direct link to Git protocol endpoints")

In addition to the REST API, the connector uses the git protocol to read repository contents. These endpoints are prefixed by the configured git domain:

```
GET  /<repository-name>.git/info/refs?service=git-upload-packPOST /<repository-name>.git/git-upload-pack
```
