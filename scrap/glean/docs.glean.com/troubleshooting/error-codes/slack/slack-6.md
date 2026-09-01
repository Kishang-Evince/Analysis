---
url: "https://docs.glean.com/troubleshooting/error-codes/slack/slack-6"
canonical: "https://docs.glean.com/troubleshooting/error-codes/slack/slack-6"
title: "SLACK-6"
description: "SLACK-6 Error Code"
fetched_at: "2026-09-01T13:30:31.342Z"
---
On this page

## Issue:[​](#issue "Direct link to Issue:")

-   Could not find a user token authenticated with the necessary scopes

## Resolution:[​](#resolution "Direct link to Resolution:")

-   We need to add the required scopes for the user token on the slack app page under Oauth & Permissions
    
-   Please re-authenticate a user token with the required scopes: `users:read.email`, `channels:read`
    

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
