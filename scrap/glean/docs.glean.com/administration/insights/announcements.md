---
url: "https://docs.glean.com/administration/insights/announcements"
canonical: "https://docs.glean.com/administration/insights/announcements"
title: "Announcements"
description: "Enable announcement authoring, grant users access to create announcements, and troubleshoot Announcement Insights"
fetched_at: "2026-09-01T13:29:08.140Z"
---
On this page

Announcements let you promote team or company-wide updates on the Glean home page. Admins can grant access to create announcements, enable announcement creation from Slack, and troubleshoot the **Announcements** page. For the end-to-end authoring workflow (composing, targeting, scheduling, and publishing), see [How Announcements work](/user-guide/knowledge/announcements/how-announcements-work).

Prerequisite

You must have the Insights Moderator role to access this feature. To learn more about user roles in Glean, see [User roles](/administration/identity/roles/user-roles).

To open the **Announcements** tab, click your profile in the lower-left corner, then select **Insights → Announcements**.

## Grant access to create announcements[​](#grant-access-to-create-announcements "Direct link to Grant access to create announcements")

By default, members can only view announcements. To let a user create, edit, and delete announcements, assign the **Announcements Moderator** role:

1.  Go to **Admin console → Users & permissions → User roles**.
2.  Select **Edit roles** for the user, then assign the **Announcements Moderator** role.

Admins and Super Admins can already create announcements. If [group-based permissions](/administration/identity/roles/group-based-permissions) are enabled, you can also grant the Announcements Moderator role to an identity provider group so its members inherit the capability. For the full permission matrix, see [User roles](/administration/identity/roles/user-roles).

## Create announcements from Slack[​](#create-announcements-from-slack "Direct link to Create announcements from Slack")

To let users create announcements directly from Slack messages, configure the Gleanbot message shortcut. See [Enable announcements from Slack](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-announcements).

## Troubleshoot Announcement Insights[​](#troubleshoot-announcement-insights "Direct link to Troubleshoot Announcement Insights")

If the **Announcements** tab shows no data for a given time range, check the following:

-   **Minimum viewer threshold:** Announcement Insights only display data for announcements that have been viewed by at least five unique users in the selected time range. If an announcement has fewer than five viewers, it won't appear in Insights.
-   **Time range selection:** Adjust the date range to cover the period when the announcement was active. Announcements that expired or were removed before accumulating enough views won't appear.
-   **Persistent empty data:** If announcements have sufficient views and the correct time range is selected but data is still missing, [file a ticket](https://support.glean.com/hc/en-us) with Glean Support.

## See also[​](#see-also "Direct link to See also")

-   [How Announcements work](/user-guide/knowledge/announcements/how-announcements-work) — the end-user guide to composing, targeting, scheduling, and publishing announcements.
-   [Enable announcements from Slack](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-announcements)
-   [User roles](/administration/identity/roles/user-roles)
-   [Insights overview](/administration/insights/overview)
