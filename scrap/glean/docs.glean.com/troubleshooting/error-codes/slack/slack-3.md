---
url: "https://docs.glean.com/troubleshooting/error-codes/slack/slack-3"
canonical: "https://docs.glean.com/troubleshooting/error-codes/slack/slack-3"
title: "SLACK-3"
description: "SLACK-3 Error Code"
fetched_at: "2026-09-01T13:30:31.127Z"
---
On this page

## Issue:[​](#issue "Direct link to Issue:")

-   We do not have all the necessary OAuth scopes for GleanBot to work.

## Resolution:[​](#resolution "Direct link to Resolution:")

-   Navigate to [https://api.slack.com/apps](https://api.slack.com/apps) and find your app created for the Glean integration.
    
-   On the left hand side, navigate to OAuth & Permissions. Then scroll down to the Scopes section.
    
-   Under Bot Token Scopes, select Add an OAuth Scope.
    
-   From there, you can add the missing scopes listed that are needed for GleanBot to set up. The link will be something like: `https://api.slack.com/apps/XXXXX/oauth?`
    

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
