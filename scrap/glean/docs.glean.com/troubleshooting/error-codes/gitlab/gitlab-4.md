---
url: "https://docs.glean.com/troubleshooting/error-codes/gitlab/gitlab-4"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gitlab/gitlab-4"
title: "GITLAB_4"
description: "GITLAB_4 Error Code"
fetched_at: "2026-09-01T13:30:20.674Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean was unable to fetch the members of one or more GitLab projects using the access token that was provided.

## Resolution[​](#resolution "Direct link to Resolution")

### Verify Token Validity[​](#verify-token-validity "Direct link to Verify Token Validity")

Confirm the personal access token is valid and not expired, and that it has the required scopes (`read_user`, `read_api`, `read_repository`). If the token is expired or missing any required scope, [generate a new token](/connectors/native/gitlab/setup) and update it on the GitLab connector setup page. Save the configuration to revalidate.

### Project Permissions Missing[​](#project-permissions-missing "Direct link to Project Permissions Missing")

The `/members` API returns members only for projects accessible to the token. If any projects are missing, add the token's user to those projects.

### Allow Glean Access to GitLab[​](#allow-glean-access-to-gitlab "Direct link to Allow Glean Access to GitLab")

Glean may not be able to connect to the GitLab instance due to [networking restrictions](https://docs.gitlab.com/user/group/access_and_permissions/#restrict-group-access-by-ip-address). Allowlist the [IP addresses](/security/networking/glean-ip-ranges) of your Glean project on your GitLab instance.

If the problem persists, contact [Glean Support](https://support.glean.com).
