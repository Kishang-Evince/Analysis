---
url: "https://docs.glean.com/troubleshooting/error-codes/slack/slack-12"
canonical: "https://docs.glean.com/troubleshooting/error-codes/slack/slack-12"
title: "SLACK-12"
description: "SLACK-12 Error Code"
fetched_at: "2026-09-01T13:30:30.931Z"
---
On this page

## Issue:[​](#issue "Direct link to Issue:")

The Slack custom app is not installed at the organization level. Glean requires the app to be installed org-wide.

## Resolution:[​](#resolution "Direct link to Resolution:")

1.  Go to [api.slack.com/apps](https://api.slack.com/apps) and click on your Glean Slack custom app.
2.  In the sidebar under **Features**, click **Org Level Apps**.
3.  Click **Enable Org-Readiness** and confirm **Yes, Enable**.
4.  In the sidebar under **Settings**, click **Install App**.
5.  Click **Install to Organization**.
6.  In your Slack Enterprise workspace, go to **Tools & Settings** → **Organization settings**.
7.  Click **Integrations → Installed apps**, find and click on your Glean Slack custom app.
8.  In the top right, click **Manage → Approve for Organization** and click **Approve**.

For more details, see Slack's documentation on [developing for Enterprise organizations](https://docs.slack.dev/enterprise/developing-for-enterprise-orgs#opt).

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com).
