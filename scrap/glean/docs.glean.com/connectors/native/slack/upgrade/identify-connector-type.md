---
url: "https://docs.glean.com/connectors/native/slack/upgrade/identify-connector-type"
canonical: "https://docs.glean.com/connectors/native/slack/upgrade/identify-connector-type"
title: "Identify connector type"
description: "Learn how to identify the type of Slack connector you are using."
fetched_at: "2026-09-01T13:29:44.046Z"
---
On this page

If you're an existing Glean and Slack user, you may have one or more of the following Slack connectors:

-   Central App
-   Custom App
-   Slack Enterprise Grid (Discovery API)

To find out which connector you are using, do the following:

1.  In Glean, go to **Admin console** → **Connectors**.
2.  Find your Slack connector and open the connector details page.
3.  Select the **Setup** tab.
4.  Review the fields under **step 1** and select the connector type that matches your setup.

See the options below:

-   Central App
-   Custom App
-   Slack Enterprise Grid (Discovery API)

Central App

If you see the following fields, you are using a Central App:

-   Slack domain
-   Slack ID

[

### Central App Upgrade Guide

Select this card to view the guide for upgrading your Central App to the new Slack connector.







](/connectors/native/slack/upgrade/central-app-upgrade)

Custom App

If you see the following fields, you are using a Custom App:

-   Slack domain
-   Slack ID
-   App-Level Token
-   Client ID
-   Client secret
-   Signing secret

[

### Custom App Upgrade Guide

Select this card to view the guide for upgrading your Custom App to the new Slack connector.







](/connectors/native/slack/upgrade/custom-app-upgrade)

Slack Enterprise Grid (Discovery API)

If you see the following fields, you are using a Slack Enterprise Grid (Discovery API):

-   Slack Enterprise domain (for example, `yourdomain.enterprise.slack.com`)
-   Bot User OAuth Token
-   Bot Signing Secret
-   App-Level Token

note

Enterprise customers without a custom Slack app will still see all of the fields above. The custom app fields (App-Level Token, Client ID, Client secret, Signing secret) may be blank. If those fields are empty in your existing connector configuration, they must be upgraded manually. Contact Glean Support to coordinate this migration.

info

If Glean has notified you that your Slack Enterprise connector is being migrated and you see a setup page titled **Finish upgrading your Slack Enterprise connection**, see [Complete your Slack Enterprise Grid migration](/connectors/native/slack/upgrade/enterprise-grid-seg-migration) instead.

[

### Enterprise Grid Upgrade Guide

Select this card to view the guide for upgrading your Slack Enterprise Grid app to the new Slack connector.







](/connectors/native/slack/upgrade/enterprise-grid-app-upgrade)

## Which RTS connector to select when upgrading[​](#which-rts-connector-to-select-when-upgrading "Direct link to Which RTS connector to select when upgrading")

When you add the **Slack Real Time Search (RTS)** connector, select the RTS connector based on how your existing Slack connector is configured in the **Glean Admin Console**.

| **If your existing Slack connector is…** | **Select this RTS connector:** |
| --- | --- |
| Slack (Central App) or Slack (Custom App) | Slack Real Time Search |
| Slack Enterprise Grid (Discovery API) | Slack Real Time Search Enterprise |
