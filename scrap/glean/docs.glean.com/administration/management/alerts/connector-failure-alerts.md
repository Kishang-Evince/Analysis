---
url: "https://docs.glean.com/administration/management/alerts/connector-failure-alerts"
canonical: "https://docs.glean.com/administration/management/alerts/connector-failure-alerts"
title: "Connector failure alerts"
description: "Understand connector failure alerts, the connectors they cover, and how to resolve and manage them"
fetched_at: "2026-09-01T13:29:08.562Z"
---
On this page

Connector failure alerts notify you when a connector stops working after setup. A connector can fail for several reasons, such as:

-   Credentials expire and need to be refreshed in Glean
-   A required plug-in fails to install
-   Domains are no longer valid

These alerts are turned on by default so that you can act quickly. You receive one email per day for each failing connector until the issue is resolved. On the [Alerts page](https://app.glean.com/admin/alerts), each alert appears as **Failing credentials**. For recipients, sender details, and other alert settings, see [About admin alerts](/administration/management/alerts/admin-alerts).

## Supported connector failure alerts[​](#connectors-covered "Direct link to Supported connector failure alerts")

Connector failure alerts currently cover the following connectors:

-   Slack (including Enterprise Grid)
-   OneDrive (O365)
-   SharePoint (O365)
-   Google Drive
-   GitHub
-   Microsoft Teams
-   Jira
-   Workday

Glean is expanding coverage to more connectors over time.

## What the alert includes[​](#what-the-alert-includes "Direct link to What the alert includes")

Each alert identifies:

-   The name of the failing connector, as shown in your Glean [Admin console](https://app.glean.com/admin/)
-   The timestamp when the error occurred
-   The specific error that triggered the alert
-   A link to [documentation for fixing the error](/troubleshooting/error-codes)
-   A link to the connector in the **Admin console**

## Why these alerts are mandatory[​](#why-these-alerts-are-mandatory "Direct link to Why these alerts are mandatory")

Connector failure alerts can't be turned off. Reliable connector setup and continuous indexing are essential to Glean working well for your users. When a connector stays broken, your Glean corpus becomes stale and queries can return outdated documents. This is especially risky for permissions: users might retain access in Glean to content they can no longer access in the source connector.

If you no longer want to index a connector, you can delete it from the **Admin console**. For help resolving an error, contact [Glean Support](https://support.glean.com).

## Manage alert recipients[​](#manage-alert-recipients "Direct link to Manage alert recipients")

By default, alerts are sent to all admins listed on the **Alerts** page. To change recipients, go to **Notifications → [Alerts](https://app.glean.com/admin/alerts)** in the [Admin console](https://app.glean.com/admin/) and add or remove admins in the **Recipients** section.

To send an alert to a specific set of admins, select the three-dot menu next to the alert's audience and choose who should receive it.

## Troubleshoot connector failure alerts[​](#troubleshoot-connector-failure-alerts "Direct link to Troubleshoot connector failure alerts")

If the alert continues after you reconnect the connector, contact [Glean Support](https://support.glean.com) and include the contents of the alert notification body in your support ticket.

If you don't have access to the Glean Support Center, contact your account manager to provision access for you.
