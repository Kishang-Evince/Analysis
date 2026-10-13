---
url: "https://docs.glean.com/troubleshooting/error-codes/gitlab/gitlab-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gitlab/gitlab-1"
title: "GITLAB_1"
description: "GITLAB_1 Error Code"
fetched_at: "2026-10-13T08:51:05.389Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean is unable to fetch GitLab users using the provided access token or validate that the token belongs to a GitLab administrator on a self-managed GitLab instance.

## Resolution[​](#resolution "Direct link to Resolution")

A few possible reasons and resolutions to the issue:

### Token doesn't have correct privileges or is expired[​](#token-doesnt-have-correct-privileges-or-is-expired "Direct link to Token doesn't have correct privileges or is expired")

Either the token doesn't have the `read_user` scope, or it has expired. To resolve this:

-   Follow the [instructions to create a new personal access token](/connectors/native/gitlab-onprem/setup#2-create-a-personal-access-token) and save it.
-   Make sure to include the `read_user` scope on the token.

### Token doesn't belong to an admin user[​](#token-doesnt-belong-to-an-admin-user "Direct link to Token doesn't belong to an admin user")

The provided token doesn't have **admin privileges** for the self-managed GitLab instance. To resolve this:

Make sure the token belongs to a user with administrator privileges on the GitLab instance.

Glean requires read-only **admin** privileges to read user emails for providing access to crawled documents.

-   In the setup form, make sure to unselect **API token has admin privileges**.

If you continue to see this error, contact [Glean Support](https://support.glean.com).
