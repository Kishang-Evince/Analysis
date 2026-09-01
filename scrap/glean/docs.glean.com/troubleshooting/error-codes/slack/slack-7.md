---
url: "https://docs.glean.com/troubleshooting/error-codes/slack/slack-7"
canonical: "https://docs.glean.com/troubleshooting/error-codes/slack/slack-7"
title: "SLACK-7"
description: "SLACK-7 Error Code"
fetched_at: "2026-09-01T13:30:31.223Z"
---
On this page

## Issue:[​](#issue "Direct link to Issue:")

-   Slack list users API failed using the user token

## Resolution:[​](#resolution "Direct link to Resolution:")

-   Please reauthenticate a user token with the required scopes: `users:read.email`, `channels:read`
-   We can search for users.list API failed with error in the logs which will show the specific error encountered. Then, we can check against the list of errors to see what the issue is.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
