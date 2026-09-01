---
url: "https://docs.glean.com/troubleshooting/error-codes/gitlab/gitlab-6"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gitlab/gitlab-6"
title: "GITLAB_6"
description: "GITLAB_6 Error Code"
fetched_at: "2026-09-01T13:30:20.870Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean is unable to fetch GitLab epics. The configured access token does not have the necessary permissions or scopes required to access and crawl epic data.

## Resolution[​](#resolution "Direct link to Resolution")

Ensure that your GitLab access token is configured with the correct permissions to read your organization's epics.

To fix this issue:

-   **Verify access token permissions.** Check your GitLab settings to confirm that the token has the necessary API scopes and explicit read access to the groups containing the epics you want indexed.
-   **Update the token configuration.** If permissions were missing, regenerate or update the token in GitLab with the correct access levels.
-   **Re-authenticate the connector.** Update the access token on the Glean connector setup page and save your changes to re-trigger the crawl.

If the problem persists, contact [Glean Support](https://support.glean.com).
