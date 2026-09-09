---
url: "https://docs.glean.com/administration/management/maintenance-windows"
canonical: "https://docs.glean.com/administration/management/maintenance-windows"
title: "Maintenance Window Policy"
description: "As a managed SaaS service, Glean automatically updates our services to ensure that the underlying infrastructure is reliable, performant, secure, and up-to-date. Most of these updates are performed while your Glean services are up and running. However, certain software updates like Elasticsearch require a brief service interruption to be completed. These updates are called maintenance."
fetched_at: "2026-09-01T13:29:09.078Z"
---
On this page

As a managed SaaS service, Glean automatically updates our services to ensure that the underlying infrastructure is reliable, performant, secure, and up-to-date. Most of these updates are performed while your Glean services are up and running. However, certain software updates like Elasticsearch require a brief service interruption to be completed. These updates are called maintenance.

One example is Elasticsearch updates which require the GKE nodes to be restarted, hence they incur a brief downtime.

## Maintenance Impact[​](#maintenance-impact "Direct link to Maintenance Impact")

During a maintenance event, Glean’s Query Endpoint service loses connectivity to the Elasticsearch GKE cluster for up to 90 minutes for large indexes. Customers having small indexes should expect smaller downtime, around 15 minutes on average.

Customer users are expected to see a “Temporarily down for maintenance“ page when they use the service during the maintenance window.

Glean schedules maintenance no more than once a week. When there is no maintenance event for a week, customers may use the service as normal but there is no availability guarantee during the maintenance window.

### Glean in Slack and Microsoft Teams[​](#glean-in-slack-and-microsoft-teams "Direct link to Glean in Slack and Microsoft Teams")

Glean's chat integrations, such as Glean in Slack and Glean in Microsoft Teams, are unavailable during maintenance along with the rest of the service.

info

The rest of this section applies only if your organization uses a custom Slack app that you created and own.

If you access Glean in Slack through the Glean-managed Marketplace app, Glean handles **Event Subscriptions** for you and no admin action is needed after maintenance.

Slack monitors event delivery to each app and automatically disables an app's **Event Subscriptions** when the delivery success rate stays below its [failure limit](https://docs.slack.dev/apis/events-api/#failure-limits). If a maintenance event causes enough failed deliveries, Slack can disable **Event Subscriptions** for your custom Glean app. When this happens, Slack emails the app's creator and owner, and Glean in Slack does not resume automatically after maintenance ends-a Slack admin must re-enable **Event Subscriptions** before Glean responds again.

#### Re-enable Glean in Slack after maintenance[​](#re-enable-glean-in-slack-after-maintenance "Direct link to Re-enable Glean in Slack after maintenance")

If Glean stops responding in Slack after a maintenance window, re-enable the app's **Event Subscriptions**:

1.  Sign in to the Slack app configuration at [api.slack.com/apps](https://api.slack.com/apps) and select the Glean app.
2.  Open **Event Subscriptions**.
3.  Turn **Enable Events** back on and confirm that the Request URL shows as **Verified**.

For other issues with Glean in Slack, see [Troubleshooting Glean in Slack](/administration/platform/embedded-integrations/slackbot/troubleshooting).

## Maintenance Settings[​](#maintenance-settings "Direct link to Maintenance Settings")

The default maintenance window is **Saturday 12:00 pm - 01:30 pm UTC**. If there is a need to move your maintenance window to a different time slot, please contact the Glean Technical Services team to customize your maintenance settings.

## Maintenance Notifications[​](#maintenance-notifications "Direct link to Maintenance Notifications")

As Glean is a SaaS service and we use a fixed maintenance schedule, there is no notification about upcoming maintenance sent to our customers currently. We are also working on removing the maintenance window in the near future, which will improve our service’s availability further.
