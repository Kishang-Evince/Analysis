---
url: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/admin-guide/enable-announcements"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/admin-guide/enable-announcements"
title: "Enable announcements from Slack"
description: "Configure Gleanbot to allow employees to create announcements in Glean directly from Slack messages"
fetched_at: "2026-09-01T13:29:11.583Z"
---
On this page

Glean lets you create announcements directly from Slack messages. This capability requires proper configuration of the Gleanbot Slack application. This guide provides step-by-step instructions for administrators to enable this functionality.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

This feature requires two roles to complete each task: one to set up the integration, and another to create announcements once it's live. Confirm the following access requirements before you begin.

| Required roles | Task |
| --- | --- |
| **Admin** or **Super Admin** | Configure the Gleanbot message shortcut. |
| **Admin**, **Super Admin**, or **Announcements Moderator** | Create an announcement from a Slack message using the shortcut. |
| **Slack workspace admin** | Edit the Glean Slack app in your organization's Slack workspace. |

To assign these roles or review what each one can do, see [User roles](/administration/identity/roles/user-roles).

## Configure announcements from Slack[​](#configure-announcements-from-slack "Direct link to Configure announcements from Slack")

1

Access Slack API console

First, navigate to the [Slack API console](https://api.slack.com) and select Glean from the drop-down menu. This will take you to the configuration page for your Glean Slack integration.

2

Navigate to shortcuts settings

In the left navigation bar, locate and select **Interactivity & Shortcuts**. This section allows you to configure how users can interact with Gleanbot through Slack's interface.

3

Create message shortcut

Within the Shortcuts section, create a new **Message Shortcut**. Ensure you select the option for the shortcut to appear **On Messages**, as this enables users to create announcements from existing Slack messages.

4

Configure shortcut details

Configure the shortcut with the following specific parameters:

| Field | Required Value |
| --- | --- |
| Name | **Create announcement in** |
| Description | **Creates an announcement in Glean** |
| Callback ID | **create\_announcement** |

warning

The Callback ID must be exactly `create_announcement` for the integration to function properly.

5

Use the shortcut

After configuration, users with permission to create announcements can do so by following these steps:

1.  Click the three-dot menu (⋮) on any Slack message
2.  Select **Create announcement in Glean** from the menu options

info

If users don't see the shortcut immediately in the context menu, they should select **More message shortcuts...** to access it. The shortcut will appear in this expanded menu.

## Verification[​](#verification "Direct link to Verification")

After completing the configuration, it's recommended to verify the setup by:

1.  Testing the shortcut on a test message
2.  Confirming the announcement appears correctly in Glean
3.  Checking that all team members who need access can see and use the shortcut

## See also[​](#see-also "Direct link to See also")

-   [How Announcements work](/user-guide/knowledge/announcements/how-announcements-work) - The end-user guide to composing, targeting, scheduling, and publishing announcements in Glean. Share this with the people who will create announcements from the Slack shortcut you set up here.
-   [Announcements](/administration/insights/announcements) - Admin overview: grant users access to create announcements and troubleshoot Announcement Insights.
