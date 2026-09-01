---
url: "https://docs.glean.com/troubleshooting/error-codes/gitlab/gitlab-7"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gitlab/gitlab-7"
title: "GITLAB_7"
description: "GITLAB_7 Error Code"
fetched_at: "2026-09-01T13:30:20.957Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean is unable to fetch a single top-level group associated with the provided access token.

## Resolution[​](#resolution "Direct link to Resolution")

### Missing token scopes and permissions[​](#missing-token-scopes-and-permissions "Direct link to Missing token scopes and permissions")

Make sure that the provided token has access to a top-level group and that it has all the required scopes mentioned in the instructions.

### Multiple top-level groups[​](#multiple-top-level-groups "Direct link to Multiple top-level groups")

The Glean connector for GitLab Cloud only allows a single top-level group per connector instance.

Limit the access of the access token by using a service account or group access token to a single top-level group.

### Incorrect path[​](#incorrect-path "Direct link to Incorrect path")

Make sure the URL path you are entering matches the expected URL path of the top-level group for which access is provided.

If the problem persists, contact [Glean Support](https://support.glean.com).
