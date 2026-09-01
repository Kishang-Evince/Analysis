---
url: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/getting-started/installation-guide"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/getting-started/installation-guide"
title: "Installation guide"
description: "Step-by-step instructions to install Glean in Slack."
fetched_at: "2026-09-01T13:29:12.000Z"
---
On this page

This guide walks you through enabling Glean in Slack after your Slack connectors are configured. Set up both the Slack connector and Slack Real Time Search (RTS) first; this page then focuses on enabling Glean in Slack features, adding the app to channels, and verifying the installation.

## Installation overview[​](#installation-overview "Direct link to Installation overview")

Setting up Glean in Slack involves three phases:

1.  **Configure the Slack connectors:** Set up the Slack connector first, then Slack Real Time Search (RTS). The Slack connector provides engagement signals and supports proactive answers in channels where the bot isn't present, while Slack RTS retrieves Slack messages live at query time.
2.  **Enable Glean in Slack features:** Turn on bot responses, configure channel settings, and enable optional features.
3.  **Add Glean to Slack channels:** Add the Glean app to the specific channels where you want it to respond.

## Step 1: Configure the Slack connectors[​](#step-1-configure-the-slack-connectors "Direct link to Step 1: Configure the Slack connectors")

The Slack connector and Slack RTS together provide the foundation for Glean in Slack. The Slack connector provides engagement signals and supports proactive answers in channels where the bot isn't present. Slack RTS retrieves Slack messages live at query time. Gleanbot and Slack actions require both connectors.

Follow the connector setup guide for your environment in this order:

-   **Single workspace:** Set up [Slack connector setup](/connectors/native/slack/setup/slack-connector) first, then [Slack RTS connector setup](/connectors/native/slack/setup/slack-rts-connector/).
-   **Enterprise Grid:** Set up [Slack connector setup](/connectors/native/slack/setup/slack-connector) first using the Enterprise Grid instructions, then [Slack RTS connector setup](/connectors/native/slack/setup/slack-rts-connector/).

note

Wait for both connectors to be healthy before enabling Glean in Slack features. In particular, the initial Slack RTS identity crawl must complete at least once for Slack search, Glean in Slack, and ranking signals to work correctly.

## Step 2: Enable Glean in Slack features[​](#step-2-enable-glean-in-slack-features "Direct link to Step 2: Enable Glean in Slack features")

After the Slack connectors are configured, enable Glean in Slack from the Admin console.

1.  In the Glean admin console, navigate to **Platform** > **Embedded integrations**.
    
2.  Select **Glean in Slack**.
    
    note
    
    This option only appears after the Slack connectors are configured. For setup instructions, see [Set up Slack connectors](/connectors/native/slack/setup/).
    
3.  Under **Slack connector**, select your Slack connector. This dropdown lists all Slack sources where **Glean in Slack** tab is configured.
    
4.  Toggle on **Enable Gleanbot to respond in channels**.
    
5.  Under **Channel Settings**, select how Glean should respond:
    
    -   **Respond in all channels where Glean is added, and all public channels:** recommended for maximum reach.
    -   **Respond in all channels where Glean is added:** limits responses to channels where the app is explicitly added.
    -   **Respond in a specified set of channels where Glean is added:** restricts responses to specific channels you select.
6.  Configure any additional settings such as emoji reactions and response behavior.
    
7.  Click **Save**.
    

For detailed configuration of bot responses, see [Configure bot responses](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-bot-responses).

## Step 3: Add Glean to Slack channels[​](#step-3-add-glean-to-slack-channels "Direct link to Step 3: Add Glean to Slack channels")

To make Glean active in a specific Slack channel, add the app to that channel:

1.  Go to the Slack channel where you want to add Glean.
2.  Type `/` to open the command menu.
3.  Select **Add apps to this channel** and select **Glean**.

![Adding the Glean app to a Slack channel](/img/administration/assistant/slackbot/about-slackbot/571f3553fbd274e3dcaf8f2d5a19f41c.png)

For more information, see Slack's [Guide to apps in Slack](https://slack.com/help/articles/360001537467-Guide-to-apps-in-Slack#find-apps).

tip

Start by adding Glean to a small number of channels to test the integration before rolling out to your entire workspace.

## Verify the installation[​](#verify-the-installation "Direct link to Verify the installation")

After completing the setup, verify that Glean in Slack is working correctly:

1.  **Test `/glean` search:** go to a channel where Glean is added and type `/glean` followed by a search query. You should see search results from Glean.
2.  **Test automated answering:** post a question in a channel where Glean is added. Depending on your configuration, Glean should either respond automatically or when mentioned with `@Glean`.
3.  **Check emoji reactions:** when Glean detects a question, it adds emoji reactions to the message to indicate processing status. Verify that these appear (default: ⏳ while processing, 👀 when suggestion is available).
4.  **Confirm permissions:** ask different users to test the bot. Responses should be personalized based on each user's content permissions.

If the bot does not respond as expected, see [Troubleshooting Slackbot](/administration/platform/embedded-integrations/slackbot/troubleshooting).

## RTS-specific installation[​](#rts-specific-installation "Direct link to RTS-specific installation")

Slack Real Time Search (RTS) is part of the standard Slack setup for Glean.

-   For new RTS setups, authorize the Glean app from the [Slack Marketplace](https://slack.com/marketplace/A097AUHM5AS-glean) during RTS setup.
-   For migrations from an existing custom Slack app, update the existing custom app manifest first, then authorize Slack RTS.
-   Each user must authorize Slack to see permission-aware private channels, DMs, and group DMs.
-   During migration, backend sync typically takes about 10 minutes, channel invitation usually takes about 20 more minutes, and the new bot can take 1–2 hours to appear in all channels where the previous bot was present.

For complete RTS setup instructions, see:

-   [Slack connector changes: Gleanbot impacts and FAQ](/connectors/native/slack/about/gleanbot-impacts/)
-   [Slack RTS connector setup](/connectors/native/slack/setup/slack-rts-connector/)

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Glean does not respond in a channel

-   Verify that the Glean app is added to the channel. Type `/remove @Glean` and then re-add it using **Add apps to this channel**.
-   Check that Gleanbot is enabled in the Admin console under **Glean in Slack** > **Enable Gleanbot to respond in channels**.
-   Verify the channel is included in your channel settings.
-   **Important:** Glean will not respond in channels that include external parties (shared channels with external organizations) to avoid inadvertently leaking information.

### \`/glean\` command is not available

-   Verify that the Slack connector is configured and healthy in the Admin console.
-   Check that the Glean app has the correct OAuth scopes. Required scopes are listed in **Admin console** > **Platform** > **Connectors** > **Slack** > **Setup**.

### Users do not see responses

-   Confirm that the user has a Glean account and an active Glean Assistant license.
-   Verify that the user has logged into Glean at least once.
-   Glean only responds to users who have Assistant access.

### Emoji reactions do not appear

-   Verify that `reactions:write` is added as a Bot Token Scope under your Slack app's OAuth & Permissions settings.
-   Emoji reactions only appear in channels where Glean is explicitly added (not in DMs or proactive triggers).

For additional troubleshooting, see [Troubleshooting Slackbot](/administration/platform/embedded-integrations/slackbot/troubleshooting).

## What's next[​](#whats-next "Direct link to What's next")

-   [Enable daily digest](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-daily-digest): enable personalized daily summaries
-   [Integrate Glean sidebar in Slack](/administration/platform/embedded-integrations/slackbot/admin-guide/setup-slack-sidebar): set up the Slack sidebar
-   [Use Code Writer with Glean in Slack](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-code-writer): turn Slack conversations into pull requests
