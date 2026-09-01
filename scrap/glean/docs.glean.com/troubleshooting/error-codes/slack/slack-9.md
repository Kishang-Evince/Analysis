---
url: "https://docs.glean.com/troubleshooting/error-codes/slack/slack-9"
canonical: "https://docs.glean.com/troubleshooting/error-codes/slack/slack-9"
title: "SLACK-9"
description: "SLACK-9 Error Code"
fetched_at: "2026-09-01T13:30:31.711Z"
---
On this page

## Issue:[​](#issue "Direct link to Issue:")

-   The Slack signing secret missing or invalid.

## Resolution:[​](#resolution "Direct link to Resolution:")

-   Please double check that the provided signing secret is correct.
    -   Open any web browser and log in to your Slack account
    -   Go to your app admin panel [api.slack.com/apps](https://api.slack.com/apps)
    -   Regenerate your secret using the "Regenerate" button
    -   Configure your slack instance with the latest signing secret

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
