---
url: "https://docs.glean.com/user-guide/knowledge/announcements/how-announcements-work"
canonical: "https://docs.glean.com/user-guide/knowledge/announcements/how-announcements-work"
title: "How announcements work"
description: "Share team or company-wide updates on the Glean home page"
fetched_at: "2026-09-01T13:30:40.601Z"
---
On this page

Announcements let you promote updates on the Glean homepage for your users to see. They're especially useful for anyone using [Glean as their homepage](https://chrome.google.com/webstore/detail/glean/cfpdompphcacgpjfbonkdokgjhgabpij). You can target an announcement to a specific audience and schedule when it appears and disappears.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

You need permission to create announcements for your team. If you don't have it, ask an admin to grant access. See [Announcements](/administration/insights/announcements) in the admin guide.

## How to create an announcement[​](#how-to-create-an-announcement "Direct link to How to create an announcement")

1

Open the composer

Go to **Knowledge → Announcements** and click **New announcement** in the upper-right corner. The announcement composer opens.

2

Customize the banner

Style the banner at the top of your announcement. Choose a background color, add an icon, or upload a background image.

3

Write your announcement

Give your announcement a title, then compose your message in the rich text editor.

You can enhance the body with the following:

-   **Images**: drag, paste, or upload an image. Keep it under 1 megabyte. After placing an image, click it and drag the corner handle to resize.
-   **Video**: add a video URL from Google Drive, Vimeo, or YouTube to embed it inline.

To hide the author's name on the published announcement, turn off the **Show author** toggle.

4

Choose your audience

By default, an announcement is shown to everyone in your organization. To target a subset of users, filter the audience by attributes such as **Department**, **Team**, **Title**, **Role type**, **Location**, **Tenure**, and **Employee type**.

note

Available filters depend on the people data in your organization. If an attribute isn't present in the source Glean pulls from, it won't appear as an audience option.

5

Set the schedule

By default, an announcement is featured on users' home pages for one month. To change this, set the start and end dates under **Scheduling**.

6

Preview and publish

Click **More** in the top right and select **Preview announcement** to see how your announcement will look. When you're ready, click **Publish** to post the announcement to your users' home pages.

## How announcements appear[​](#how-announcements-appear "Direct link to How announcements appear")

When there are announcements visible to you, an **Announcements** section appears on the Glean home page. Click an announcement to read it in full, or hide it if it isn't relevant to you.

## Troubleshoot audience location filter[​](#troubleshoot-audience-location-filter "Direct link to Troubleshoot audience location filter")

When you set an announcement's audience, you can filter by **Location**. If this filter is missing, the location data likely isn't present in the people source that Glean pulls from.

To confirm, check whether a location filter appears under **Directory → People**. If it isn't available there, that means location information is missing, and it's expected that location won't appear as an audience option.

## For admins[​](#for-admins "Direct link to For admins")

To grant users access to create announcements, enable creation from Slack, or troubleshoot Announcement Insights, see [Announcements](/administration/insights/announcements) in the admin guide.

To let users push announcements from Slack, see [Enable announcements from Slack](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-announcements).
