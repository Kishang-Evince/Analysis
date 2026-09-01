---
url: "https://docs.glean.com/troubleshooting/error-codes/gitlab-onprem/gitlab-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gitlab-onprem/gitlab-1"
title: "GITLAB_1"
description: "GITLAB_1 Error Code"
fetched_at: "2026-09-01T13:30:19.680Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

-   We were unable to fetch Gitlab users using the access token that was provided.

## Resolution[​](#resolution "Direct link to Resolution")

There's a few possible reasons for this:

1.  The token does not have the read\_user scope OR the token is expired
    -   In either case, since Gitlab doesn't allow you to view the details of a token after creation, we will have to recreate the token
    -   Head over to your Glean admin account and navigate to [https://app.glean.com/admin/setup/apps](https://app.glean.com/admin/setup/apps)
    -   Find your Gitlab connector and navigate to its setup page
    -   Follow the instructions to create a new personal access token and save it
        -   Make sure to include the read\_user api scope on the token as this is the scope that allows us to fetch user information using the personal access token
2.  If the above doesn't work, it's possible our crawler has networking issues in reaching your Gitlab instance. Please reach out to us at [https://support.glean.com](https://support.glean.com) to resolve this. 

If you are still having difficulty please reach out to us: [https://support.glean.com](https://support.glean.com)
