---
url: "https://docs.glean.com/administration/assistant/features/notifications"
canonical: "https://docs.glean.com/administration/assistant/features/notifications"
title: "Notifications"
description: "Configure user notifications for agents and Deep Research"
fetched_at: "2026-09-01T13:29:00.234Z"
---
On this page

The Notifications feature allows users to receive alerts when an agent needs their input or when long-running work like Deep Research completes. Users can receive both in-app notifications and email notifications, helping them respond to agent requests without constantly checking chats.

## How notifications work[​](#how-notifications-work "Direct link to How notifications work")

When enabled, Glean sends notifications to users in the following scenarios:

-   **Agent wait for user input steps**: When an agent requires user input or approval (for example, to confirm a step or provide missing information), the user receives both an email and a browser notification if enabled.
-   **Deep Research completion**: When a Deep Research query completes in the background, the user receives a browser notification if enabled.

Clicking a notification takes the user directly to the relevant chat or agent context.

## Notification types[​](#notification-types "Direct link to Notification types")

| Type | Description | Examples |
| --- | --- | --- |
| Action required | Notifications that need user input or approval before the task can continue | Approve a step; answer a HITL prompt; re-authenticate an expired integration |
| Informational | Status updates that do not require action | Deep Research report is ready |

## Enable notifications for your organization[​](#enable-notifications-for-your-organization "Direct link to Enable notifications for your organization")

To enable the Notifications feature:

1.  Navigate to **Admin Console → Management → Features → Notifications**.
2.  Toggle the **Notifications** setting to **On**.
3.  Click **Save**.

Once enabled, users will see the Notifications panel in the left navigation of the Glean application.

note

After enabling Notifications, users may need to refresh their browser to see the feature appear in the left navigation.

## Configure email notifications[​](#configure-email-notifications "Direct link to Configure email notifications")

Email notifications for agents are controlled at the workspace or admin configuration level. When enabled, users receive emails when an agent needs their input or approval.

To configure email notifications:

1.  Navigate to **Admin Console → Management → Features → Notifications**.
2.  Enable the **Email notifications for agent HITL** setting.
3.  Configure any additional email notification preferences for your organization.
4.  Click **Save**.

important

Email notifications are not supported for Deep Research. Deep Research only supports browser/in-app notifications.

## User notification preferences[​](#user-notification-preferences "Direct link to User notification preferences")

After you enable Notifications at the organization level, users can manage their own notification preferences from their profile settings:

-   **Browser/desktop notifications**: Users control these through their browser permissions for `app.glean.com`.
-   **Email notifications**: Users can turn email notifications on or off in their Glean profile settings under **Settings → Notifications**.

## Availability[​](#availability "Direct link to Availability")

-   **Browser notifications**: Available for all notification types where enabled
-   **Email notifications**: Available for agent notifications that need user input only
-   **Deep Research notifications**: Browser notifications only (email not supported)

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Users don't see Notifications in the left navigation[​](#users-dont-see-notifications-in-the-left-navigation "Direct link to Users don't see Notifications in the left navigation")

-   Verify that Notifications is turned on in the Admin Console.
-   Ask users to hard-refresh their browser (Ctrl+Shift+R or Cmd+Shift+R).

### Users aren't receiving email notifications[​](#users-arent-receiving-email-notifications "Direct link to Users aren't receiving email notifications")

-   Confirm that email notifications are enabled at the workspace level in the Admin Console.
-   Verify that the user has enabled email notifications in their personal settings (**Settings → Notifications**).
-   Check that the user's email address is correctly configured in their Glean profile.

### Users aren't receiving browser notifications[​](#users-arent-receiving-browser-notifications "Direct link to Users aren't receiving browser notifications")

-   Verify that the user has allowed notifications for `app.glean.com` in their browser settings.
-   Check that the user's operating system allows notifications for their browser.
-   Confirm that the user has not manually blocked notifications in their browser.

## See also[​](#see-also "Direct link to See also")

-   [Notifications user guide](/user-guide/glean-notification/notification) - End-user documentation for managing notifications
-   [Admin Notifications Dashboard](/administration/management/notifications/admin-notifications-dashboard) - Monitor system health with admin notifications
