---
url: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/admin-guide/setup-slack-sidebar"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/admin-guide/setup-slack-sidebar"
title: "Set up Slack sidebar integration"
description: "Make Glean available in the Slack sidebar for your organization."
fetched_at: "2026-10-13T08:49:23.955Z"
---
On this page

The Glean app in Slack lets users access Glean from the Slack sidebar, chat with Glean in a direct message, and run supported agents without leaving Slack. Users can open Glean from Slack's top bar, select the **Chat** tab, and choose a chat mode or an agent.

This page covers making Glean available in the Slack sidebar. For connector setup, app authorization, and migration from a custom Slack app, see the [Slack setup guides](/connectors/native/slack/setup/). For a Slack app used as an agent service credential, see [Set up a Slack service credential](/administration/agent-identity/slack-app).

## Before you begin[​](#before-you-begin "Direct link to Before you begin")

Before you configure top-bar visibility, confirm the following:

-   A Slack admin installed and approved the Glean app in the relevant workspace or organization.
-   You have Slack admin permission to manage installed apps.
-   For Enterprise Grid, an Org Owner deployed the app to each workspace where users need access.

Connector setup and top-bar visibility are separate. Follow the [Slack setup guides](/connectors/native/slack/setup/) to configure the Slack connector, Slack Real Time Search (RTS), and any custom app required for indexing or migration.

note

Admin installation and per-user Slack RTS authorization are separate. A user may need to authorize Slack RTS for results from private channels, direct messages, and group direct messages. Neither per-user RTS authorization nor the initial identity crawl controls top-bar visibility. RTS authorization is also not required for chat or response modes to appear.

## Make Glean available to users in the sidebar[​](#make-glean-available-to-users-in-the-sidebar "Direct link to Make Glean available to users in the sidebar")

After a Slack admin installs the Glean app, configure its visibility for users. The top-bar setting controls discoverability but does not install or authorize the app.

### Single workspace[​](#single-workspace "Direct link to Single workspace")

1.  Open your Slack workspace **Settings & Permissions**.
2.  Expand **Integrations**, then select **Manage integrations**.
3.  On the **Installed apps** page, search for and open **Glean**.
4.  Select **App Settings**.
5.  Next to **Show Glean on Slack's top bar**, select **Edit**.
6.  Select **Enabled**, then select **Save**.

### Enterprise Grid[​](#enterprise-grid "Direct link to Enterprise Grid")

1.  In Slack, open **Tools & settings → Organization settings**.
2.  Select **Integrations → Installed apps**.
3.  Search for and open the organization-approved **Glean** app.
4.  Select **App Settings**.
5.  Next to **Show Glean on Slack's top bar**, select **Edit**.
6.  Select **All available workspaces** or the specific workspaces where Glean should appear.
7.  Select **Save**.

## What users see in Slack[​](#what-users-see-in-slack "Direct link to What users see in Slack")

After the admin makes Glean available, users can:

1.  Open Glean from Slack's top bar.
2.  Open the **Chat** tab in the Glean app.
3.  Use the **Chat mode** menu to choose **Adaptive**, **Thinking**, or **Fast** when those modes are available.
4.  Select **Agents** under **Find & run agents** to find and run a supported agent.

**Adaptive** automatically chooses between Fast and Thinking based on the request. To switch agents or return to Glean chat, users can start a new chat.

Some agents that work in the Glean web app may not complete the same way in Slack. Configure agents that require interactive approval for a supported no-confirmation flow, or run them from the Glean web app instead.

For the complete end-user flow, see [Use Glean in the Slack sidebar](/user-guide/embedded-integrations/slack/use-slack-sidebar).

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Glean does not appear in Slack's top bar

Check the following:

-   Confirm that a Slack admin installed and approved the Glean app in the relevant workspace or organization.
-   For Enterprise Grid, confirm that an Org Owner deployed the app to the workspace where the user is looking for it.
-   Confirm that **Show Glean on Slack's top bar** is enabled. For Slack's **Apps** or **Agents** entry points, check the workspace's app policies and installation scope.

### An agent does not appear in Glean

Check the following:

-   The agent uses a **Chat message** trigger.
-   The user has access to the agent.
-   The agent is available in Slack and does not require an interactive approval step that Slack cannot support.

### Glean opens, but chat or response modes are unavailable

Available chat modes and agents depend on the tenant configuration and the user's access. Confirm that the user opened the current Glean app from Slack's top bar.

For more help, see [Troubleshooting Glean in Slack](/administration/platform/embedded-integrations/slackbot/troubleshooting).
