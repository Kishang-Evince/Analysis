---
url: "https://docs.glean.com/troubleshooting/error-codes/gitlab-onprem/gitlab-6"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gitlab-onprem/gitlab-6"
title: "GITLAB_6"
description: "GITLAB_6 Error Code"
fetched_at: "2026-09-01T13:30:20.137Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean is unable to fetch GitLab epics. Epic crawling relies on the GitLab GraphQL Work Items API, which requires GitLab Server version 18.1 or later, or specific access token permissions.

## Resolution[​](#resolution "Direct link to Resolution")

Ensure that your GitLab Server instance meets the version requirements or that your access token is properly configured.

To fix this issue:

-   **Verify your GitLab Server version.** Ensure your instance is running version **18.1 or later**.
-   **Check access token scopes.** If your instance is on 18.1 or later, confirm that the configured access token has API permissions to read both the GitLab GraphQL API and the specific groups you want indexed.

For additional assistance, contact [Glean Support](https://support.glean.com)
