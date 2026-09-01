---
url: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/admin-guide/enable-daily-digest"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/admin-guide/enable-daily-digest"
title: "Enable and configure daily digest"
description: "Enable and configure the daily digest feature for your organization."
fetched_at: "2026-09-01T13:29:11.789Z"
---
On this page

The Glean daily digest delivers a personalized summary of relevant information from selected Slack channels and topics directly to users' Slack DMs.

important

Daily digest is not supported for Slack RTS-powered deployments.

## Key features[​](#key-features "Direct link to Key features")

-   Subscribe to channels, keywords, or topics — such as *competitor-news* or *product-launches* — to receive targeted daily digests in your Slack DM.
-   Users can add up to 10 topics and 100 Slack channels.
-   With topic subscriptions, the digest aggregates updates from all enterprise connectors connected to Glean — not just Slack. This includes documents, emails, tickets, and meetings.
-   Admins can deliver digests in *Slack Canvas* for a richer reading experience. See [Setting up Slack Canvas](#optional-setting-up-slack-canvas).
-   Users can configure their preferred delivery time.

![Example of topic subscription](/img/topicsubs1.png)

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   You must have a Glean Assistant license to use the daily digest feature.
-   You must have admin privileges to enable daily digest for your organization.
-   The Glean Slack connector must be set up and healthy.

## Admin setup[​](#admin-setup "Direct link to Admin setup")

1.  In the Glean Admin console, navigate to **Platform** → **Embedded integrations**.
2.  Select **Glean in Slack**.
    
    note
    
    This option only appears after the Slack connector has been configured. For setup instructions, see [Set up Slack connectors](/connectors/native/slack/setup/).
    
3.  Under **Slack connector**, select your Slack connector. This dropdown lists all Slack sources where the **Glean in Slack** tab is configured.
4.  Scroll to the **Daily digest** section and toggle the switch to **On**.
5.  Under **Rollout configuration**, choose which teammates can receive the digest:
    -   **All teammates:** Enables the feature for everyone in the organization.
    -   **Set of teammates:** Limits the feature to specific individuals. Add the names of the teammates you wish to include.
6.  Click **Save** at the top right of the page to apply your changes.

![Enable daily digest](/img/administration/platform/embed-integrate/config-daily-digest.png)

### (Optional) Setting up Slack Canvas[​](#optional-setting-up-slack-canvas "Direct link to (Optional) Setting up Slack Canvas")

You can set up Slack Canvas to deliver digest updates in a formatted Slack Canvas document.

**Prerequisite:** Admin access to the Slack app.

**Steps:**

1.  Add the following scopes in **Slack API → Your App → OAuth & Permissions → Bot Token Scopes**:
    -   `canvases:read`
    -   `canvases:write`
2.  After adding scopes, reinstall the Slack app to your workspace so the new permissions take effect.
3.  If Slack shows a *scope approval pending* error, wait for Slack's approval before testing Canvas delivery.

## User setup[​](#user-setup "Direct link to User setup")

After the admin setup is complete, users configure their digest preferences. For details, see the [daily digest user guide](/user-guide/embedded-integrations/slack/subscribe-daily-digest).
