---
url: "https://docs.glean.com/user-guide/glean-notification/notification"
canonical: "https://docs.glean.com/user-guide/glean-notification/notification"
title: "Browser and email notifications"
description: "Get alerts when an agent needs your input or when Deep Research completes, so you can act without manually checking chats."
fetched_at: "2026-09-01T13:30:40.625Z"
---
On this page

Glean sends notifications when an agent needs your input or when long running work like Deep Research finishes, so you can act without constantly checking chats or the Agent Library. Clicking a notification takes you to the relevant chat or run.

note

Notifications must be enabled by your admin. For admin configuration details, see [Notifications setup](/administration/assistant/features/notifications).

Notifications are sent when:

-   An agent HITL (human‑in‑the‑loop) step requires your input or approval, you get both an email and a browser notification if enabled.
-   A Deep Research query completes in the background, you get a browser notification if enabled.

Clicking a notification links you back to the relevant chat or agent context so you can unblock the run or review the result.

## Notification types[​](#notification-types "Direct link to Notification types")

Notifications support two main types.

| Type | What it is | Examples |
| --- | --- | --- |
| Action required | Notifications that need your input or approval before the task can continue. | Approve a write step; answer a HITL prompt; re‑authenticate an expired integration. |
| Informational | Status updates that do not require action. | Deep Research report is ready. |

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Notifications must be enabled by your admin. For admin configuration details, see [Notifications setup](/administration/assistant/features/notifications).

## How to manage notification preferences[​](#how-to-manage-notification-preferences "Direct link to How to manage notification preferences")

### Turn on browser/desktop notifications[​](#turn-on-browserdesktop-notifications "Direct link to Turn on browser/desktop notifications")

To turn on the browser notifications for Glean, follow these steps:

1.  Open your **browser settings** for your Glean URL, `app.glean.com`.
    
2.  Toggle on the **Notifications** option to receive notifications from Glean app.
    

### Turn off browser/desktop notifications[​](#turn-off-browserdesktop-notifications "Direct link to Turn off browser/desktop notifications")

If you previously allowed notifications and want to stop them:

1.  Open your **browser settings** for your Glean URL, `app.glean.com`.
2.  Set **Notifications** to **Block** or **Ask**, as you prefer.

You can also mute or turn off notifications for your browser from the notification settings of your operating system.

### Email notifications for agents that need your input[​](#email-notifications-for-agents-that-need-your-input "Direct link to Email notifications for agents that need your input")

In some workspaces, Glean can also send email notifications when an agent needs your input or approval, for example, to confirm a write step or provide missing information. The email links back to Glean so you can review the request and unblock the run.

info

Email notifications are configured by your admin. See [Notifications setup](/administration/assistant/features/notifications) for configuration details.

#### Turn on email and browser notifications for Assistant and agents[​](#turn-on-email-and-browser-notifications-for-assistant-and-agents "Direct link to Turn on email and browser notifications for Assistant and agents")

1.  Go to your profile on [Glean app](https://app.glean.com).
    
2.  Click **Your settings**.
    
3.  Click **Notifications**.
    
4.  Toggle on the options if you want to receive email and browser notifications.
    

note

Email notifications are not supported for Deep Research.

If you are receiving email notifications and believe you should not, or if you are not receiving them but expect to, contact your Glean admin or see [Notifications setup](/administration/assistant/features/notifications) for configuration information.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### I do not see Notifications in the left navigation

-   Notifications may not be enabled yet for your organization.
-   Ask your Glean admin to confirm whether *Notifications* is turned on in the Admin Console. For admin setup instructions, see [Notifications setup](/administration/assistant/features/notifications).

### I'm not getting browser notifications

-   Confirm you chose **Allow** in both the Glean prompt and your browser’s permission dialog.
-   In your OS settings, ensure notifications are allowed for your browser.
-   You’ll still see notifications inside Glean when you open the Notifications panel even if browser alerts are off.
