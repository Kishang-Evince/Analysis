---
url: "https://docs.glean.com/troubleshooting/error-codes/gitlab-onprem/gitlab-4"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gitlab-onprem/gitlab-4"
title: "GITLAB_4"
description: "GITLAB_4 Error Code"
fetched_at: "2026-09-01T13:30:20.146Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean was unable to fetch the members of one or more GitLab projects using the access token that was provided. Glean reads project members to enforce permissions, so the crawl cannot proceed until this check passes.

## Resolution[​](#resolution "Direct link to Resolution")

-   Confirm the personal access token is valid and not expired, and that it has the read scopes used during setup (`read_user`, `read_api`, `read_repository`).
-   Confirm the token's user can access the projects in scope. The `/members` API only returns members for projects the token is allowed to see.
-   Confirm the Glean crawler can reach your GitLab Server instance. Self-hosted instances often require IP whitelisting so the crawler can call the API.

After updating the configuration on the GitLab Server connector setup page, save to re-validate.

If the problem persists, contact [Glean Support](https://support.glean.com).
