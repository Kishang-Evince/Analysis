---
url: "https://docs.glean.com/troubleshooting/error-codes/slackentgrid/slackentgrid-6"
canonical: "https://docs.glean.com/troubleshooting/error-codes/slackentgrid/slackentgrid-6"
title: "SLACKENTGRID-6"
description: "Issue"
fetched_at: "2026-09-01T13:30:32.117Z"
---
**Issue**

The Glean Slack custom app's event subscriptions are not configured or no webhooks have been received. Glean relies on webhooks from the custom Slack app to keep the Slack Enterprise Grid corpus up-to-date. Without event subscriptions enabled, no new messages, edits, or deletions will be reflected in Glean search results.

**Resolution**

The Request URL and event subscriptions should already be configured from the app manifest provided during initial setup. To verify:

1.  Go to [api.slack.com/apps](https://api.slack.com/apps) and click on your Glean Slack custom app.
2.  In the sidebar under **Features**, click **Event Subscriptions**.
3.  Confirm that **Enable Events** is toggled **On**. If it is not, toggle it on.
4.  Confirm that the **Request URL** field is populated and shows a green **Verified** checkmark. If the Request URL is missing, please contact Glean Support at [https://support.glean.com](https://support.glean.com).
5.  Under **Subscribe to bot events**, confirm the following events are listed. Add any that are missing:
    -   `app_home_opened`
    -   `app_mention`
    -   `assistant_thread_context_changed`
    -   `assistant_thread_started`
    -   `link_shared`
    -   `message.groups`
    -   `message.im`
    -   `message.mpim`
    -   `team_join`
6.  Under **Subscribe to events on behalf of users**, confirm the following events are listed. Add any that are missing:
    -   `channel_created`
    -   `channel_deleted`
    -   `channel_history_changed`
    -   `channel_left`
    -   `channel_rename`
    -   `channel_unarchive`
    -   `file_change`
    -   `file_created`
    -   `file_deleted`
    -   `file_shared`
    -   `file_unshared`
    -   `group_deleted`
    -   `group_history_changed`
    -   `group_left`
    -   `im_created`
    -   `im_history_changed`
    -   `link_shared`
    -   `member_joined_channel`
    -   `member_left_channel`
    -   `message.channels`
    -   `message.groups`
    -   `message.im`
    -   `message.mpim`
    -   `team_join`
7.  Click **Save Changes** if you made any updates.

If event subscriptions appear correctly configured and you are still seeing this error, verify that:

-   The app is installed at the organization level and in all required workspaces (see [SLACKENTGRID-7](/troubleshooting/error-codes/slackentgrid/slackentgrid-7) for instructions).
-   The **Signing Secret** in the Glean Admin Console matches the one shown under **Basic Information** > **App Credentials** in [api.slack.com/apps](https://api.slack.com/apps).
