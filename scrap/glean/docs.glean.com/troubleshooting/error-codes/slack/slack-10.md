---
url: "https://docs.glean.com/troubleshooting/error-codes/slack/slack-10"
canonical: "https://docs.glean.com/troubleshooting/error-codes/slack/slack-10"
title: "SLACK-10"
description: "SLACK-10 Error Code"
fetched_at: "2026-09-01T13:30:30.688Z"
---
On this page

## Slack instance collision[​](#slack-instance-collision "Direct link to Slack instance collision")

### Issue[​](#issue "Direct link to Issue")

During Slack Real Time Search (RTS) setup, Glean detected an existing custom Slack instance with a matching workspace or enterprise ID.

During migration, you must update your existing custom app’s manifest. The custom app and the new RTS app share the same name and slash commands, so without this update they will conflict. Updating the manifest lets the migration proceed.

### Required bot scopes[​](#required-bot-scopes "Direct link to Required bot scopes")

The following scopes must be added to your custom Slack app for the migration to succeed:

-   `channels:manage`
-   `channels:write.invites`
-   `groups:write`
-   `groups:write.invites`
-   `im:write`
-   `mpim:write`

### Resolution: Update the app manifest[​](#resolution-update-the-app-manifest "Direct link to Resolution: Update the app manifest")

Follow these steps to update your existing custom Slack app with the correct manifest:

1.  In the **Glean Admin console**, navigate back to the Slack RTS setup instructions.
2.  In the right-hand sidebar, copy the **entire** generated manifest.
3.  Log in to your [Slack app admin panel](https://api.slack.com/apps).
4.  Select the app associated with your existing Glean custom Slack instance.
5.  In the left sidebar, navigate to **App Manifest**.
6.  Switch to the **YAML** tab, then replace the entire contents with the manifest you copied from Glean.
7.  Click **Save Changes**.
8.  Reinstall the app to your workspace if prompted by Slack to apply the new permissions.
9.  Return to the **Glean Admin console** and retry the RTS setup validation.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
