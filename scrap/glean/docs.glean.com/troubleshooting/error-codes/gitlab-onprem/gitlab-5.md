---
url: "https://docs.glean.com/troubleshooting/error-codes/gitlab-onprem/gitlab-5"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gitlab-onprem/gitlab-5"
title: "GITLAB_5"
description: "GITLAB_5 Error Code"
fetched_at: "2026-09-01T13:30:20.126Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean could not create webhooks for your GitLab Server connector because the configured personal access token (PAT) is missing the `api` scope.

Glean creates webhooks automatically only when the PAT has the full `api` scope. When **API token has write privileges** is enabled but the token has only read scopes (such as `read_api`), webhook creation is rejected and this error is raised.

## Resolution[​](#resolution "Direct link to Resolution")

**Grant the `api` scope (recommended).**

1.  In GitLab, create a new PAT with the full `api` scope. GitLab does not let you view or change the scopes of an existing token, so you must create a new one.
2.  On the GitLab Server connector setup page, enter the new token and keep **API token has write privileges** checked.
3.  Save. Glean re-validates the token and creates the webhooks.

**Or use a read-only token and create webhooks yourself.**

1.  Uncheck **API token has write privileges** so Glean stops attempting to create webhooks.
2.  Following the GitLab Server setup instructions, create the group/project webhooks and the system hook manually so Glean still receives change events.

If the problem persists, contact [Glean Support](https://support.glean.com).
