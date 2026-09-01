---
url: "https://docs.glean.com/administration/management/alerts/admin-alerts"
canonical: "https://docs.glean.com/administration/management/alerts/admin-alerts"
title: "About admin alerts"
description: "Configure and manage alerts for critical events in your Glean instance to maintain optimal performance"
fetched_at: "2026-09-01T13:29:08.497Z"
---
On this page

Admin alerts notify you of critical events in your Glean instance that could affect performance. These notifications enable rapid response to potential issues, helping you maintain system health and resolve problems efficiently.

info

Glean delivers all alerts via email, and all alerts are turned on by default.

## Configure admin alerts[​](#configure-admin-alerts "Direct link to Configure admin alerts")

To manage your alert configuration, open the **Admin console** and go to **Notifications → [Alerts](https://app.glean.com/admin/alerts)**.

Glean turns admin alerts on by default, and all admin alerts are mandatory. For any alert, you can customize the recipient list in the **Audience** column and preview its email notification from the overflow (**⋮**) menu. Every alert must have at least one recipient.

When an alert triggers, recipients receive an email notification with the following delivery details:

-   **Frequency:** One email per day for each alert until the issue is resolved
-   **Sender address:** [noreply@glean.com](mailto:noreply@glean.com)

## Supported alert types[​](#supported-alert-types "Direct link to Supported alert types")

Glean continuously monitors the health of your instance. Admin alerts cover the subset of issues that need your attention because Glean can't resolve them on its own — for example, expired connector credentials or LLM provider errors. Glean introduces new alert types over time as it expands this coverage. The alerts available to you depend on your deployment configuration — for example, some alerts appear only if you use an LLM provider, single sign-on (SSO), or a specific cloud platform.

All admin alerts are mandatory. To ensure system reliability and optimal performance, you can't turn them off, but you can [choose who receives them](#configure-admin-alerts).

| Alert | Description |
| --- | --- |
| **Failing credentials** | Connector credentials are failing, which can affect the quality of search results. Applies to the connectors listed below. |
| **Gleanbot setup errors** | The Glean app in Slack isn't set up correctly, which affects some or all of Glean's ability to respond to messages in Slack. |
| **LLM provider errors** | Your LLM provider is running into errors, which affects some or all of Glean Assistant's functionality. Appears only when an LLM provider is configured. |
| **SSO expiry** | Your SSO credentials are expiring soon and will lock all users out of Glean if they aren't renewed. Appears only when SSO is configured. |
| **GCP constraint misconfiguration** | A Google Cloud constraint that Glean needs to function correctly is violated. Appears only for Google Cloud deployments. |
| **Confluence Cloud migration** | Your Confluence Cloud connector is still on the previous setup, which can affect the quality of search results. |
| **Jira Cloud migration** | Your Jira Cloud connector is still on the previous setup, which can affect the quality of search results. |

The **Failing credentials** alert currently flags the following connectors:

-   Slack
-   Slack Enterprise Grid
-   Google Drive
-   GitHub
-   OneDrive (O365)
-   SharePoint (O365)
-   Jira
-   Microsoft Teams
-   Workday
