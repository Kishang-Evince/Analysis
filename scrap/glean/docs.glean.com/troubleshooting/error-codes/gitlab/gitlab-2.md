---
url: "https://docs.glean.com/troubleshooting/error-codes/gitlab/gitlab-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gitlab/gitlab-2"
title: "GITLAB_2"
description: "GITLAB_2 Error Code"
fetched_at: "2026-09-01T13:30:20.614Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

-   We were unable to fetch GitLab projects using the access token that was provided.

## Resolution[​](#resolution "Direct link to Resolution")

### Verify Token Scope[​](#verify-token-scope "Direct link to Verify Token Scope")

Verify that the token includes the `read_api` scope. If the token is missing this scope or has expired, [generate a new token](/connectors/native/gitlab/setup).

After creating the new token:

1.  Navigate to the GitLab connector setup page in Glean.
2.  Enter the new token and save the configuration.
3.  Revalidate to confirm the error is resolved.

### Allow Glean Access to GitLab[​](#allow-glean-access-to-gitlab "Direct link to Allow Glean Access to GitLab")

Glean may not be able to connect to the GitLab instance due to [networking restrictions](https://docs.gitlab.com/user/group/access_and_permissions/#restrict-group-access-by-ip-address). Allowlist the [IP addresses](/security/networking/glean-ip-ranges) of your Glean project on your GitLab instance.

If you are still having difficulty please reach out to us: [https://support.glean.com](https://support.glean.com)
