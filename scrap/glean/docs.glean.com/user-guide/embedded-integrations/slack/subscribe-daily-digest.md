---
url: "https://docs.glean.com/user-guide/embedded-integrations/slack/subscribe-daily-digest"
canonical: "https://docs.glean.com/user-guide/embedded-integrations/slack/subscribe-daily-digest"
title: "Subscribe to daily digest"
description: "Set up your personalized daily digest of Slack channels and topics."
fetched_at: "2026-09-01T13:30:40.591Z"
---
On this page

The daily digest delivers a personalized summary of relevant information from selected Slack channels and topics directly to your Slack DMs. You can subscribe to specific channels, keywords, or topics to stay informed about the conversations that matter to you.

important

Daily digest is not supported for Slack RTS-powered deployments.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin has enabled the daily digest for your organization
-   Your deployment is not Slack RTS-powered (Daily Digest is not supported for Slack RTS)

## Use cases[​](#use-cases "Direct link to Use cases")

-   Get daily updates on customer feedback, escalations, or any keyword important to your team or projects.
-   Stay informed about important company-wide discussions, even about channels you do not actively follow or have not joined.
-   If a meeting connector is enabled in Glean, get activities about your work areas, even when they come up in a meeting.

## How to set up your daily digest[​](#how-to-set-up-your-daily-digest "Direct link to How to set up your daily digest")

After your admin enables the daily digest for your organization, you can configure it. (Admins: see the [Daily Digest admin guide](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-daily-digest).)

1.  Go to the **Glean app** in Slack, then open **Home** → **Manage Daily Digest**.
2.  Enter a comma-separated list of keywords and up to 10 topics you want to subscribe to.
3.  Choose your preferred delivery time.

note

The daily digest updates on weekdays. Monday's digest includes channel summaries from the weekend.

You can add up to 10 topics and 100 Slack channels. With topic subscriptions, the digest aggregates updates from all enterprise connectors connected to Glean, not just Slack. This includes documents, emails, tickets, meetings, and more.

To stop or modify your subscription, return to **Manage Daily Digest** in the Glean app and update your settings.

For any issues or concerns related to Daily Digest in Slack, reach out to the [Glean support team](https://support.glean.com/hc/en-us/requests/new).
