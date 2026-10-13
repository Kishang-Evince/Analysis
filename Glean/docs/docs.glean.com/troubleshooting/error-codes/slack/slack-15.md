---
url: "https://docs.glean.com/troubleshooting/error-codes/slack/slack-15"
canonical: "https://docs.glean.com/troubleshooting/error-codes/slack/slack-15"
title: "SLACK-15"
description: "SLACK-15 Error Code"
fetched_at: "2026-10-13T08:51:16.949Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean has not received webhooks from your configured Slack app.

## Resolution[​](#resolution "Direct link to Resolution")

1.  Find the Slack app ID in the alert. Open [Your Apps](https://api.slack.com/apps) and select the matching app. You may need help from an app collaborator or your Slack administrator.
2.  Open **Event Subscriptions**. Confirm that **Enable Events** is on and the app's **Request URL** matches the URL configured for your Glean Slack connection and is verified by Slack.

For additional assistance, contact [Glean Support](https://support.glean.com).
