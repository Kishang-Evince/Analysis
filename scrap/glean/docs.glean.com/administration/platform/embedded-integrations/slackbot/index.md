---
url: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/"
title: "Glean in Slack overview"
description: "Install, configure, and manage Glean in Slack for your organization."
fetched_at: "2026-09-01T13:29:11.432Z"
---
On this page

This Admin Guide covers installing, configuring, and managing **Glean in Slack (Gleanbot)** for your organization. For end-user documentation, see [Glean in Slack for users](/user-guide/embedded-integrations/slack/).

Glean in Slack integrates enterprise search and knowledge directly into your Slack workspace, helping teams spend less time searching and more time acting on information.

## Components[​](#components "Direct link to Components")

-   **Slack bot:** The conversational interface that responds to questions, handles `/glean` commands, and supports invoking Code Writer from Slack.
-   **Slack sidebar:** A dedicated Glean interface in Slack providing Assistant access and contextual suggestions.

note

The older version of Glean in Slack, which surfaced results based on matching [Answers](/user-guide/knowledge/answers/what-are-answers-and-how-do-they-work), was deprecated in February 2024. All current functionality uses AI-powered responses.

## Core capabilities[​](#core-capabilities "Direct link to Core capabilities")

Glean in Slack (Gleanbot) supports the following functions:

| **Function** | **Action / usage** | **Visibility** |
| --- | --- | --- |
| **Automated answering** | Responds when a question is detected in a channel, or when someone mentions `@Glean`. | Answers are shown privately to the person who asked the question by default. When [Public Mode](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode) is enabled, replies are visible to all channel members. All responses are personalized by permissions. |
| **Unified search** | Lets users search Glean directly from any channel using the `/glean` command. | Results are visible only to the person who ran `/glean`, with an option to share back to the channel. |
| **Code Writer** | Turns Slack conversations, incidents, and escalations into draft pull requests in GitHub. | Draft pull requests are created on behalf of the requesting user and links are posted back to Slack. |
| **Daily digest** | Provides a personalized summary of relevant information from selected channels and topics. | Digests are delivered as direct messages in Slack when this feature is enabled for your tenant. |

## Get started as an admin[​](#get-started-as-an-admin "Direct link to Get started as an admin")

[

### Set up Glean in Slack

Install, configure, and roll out Glean in Slack for your organization. Control bot responses, permissions, and feature availability.

Start setup





](/administration/platform/embedded-integrations/slackbot/getting-started/prerequisites)[

### End-user documentation

See how end users interact with the features you configure. Share this link with your users so they can search, ask questions, and get answers in Slack.

Share with your users





](/user-guide/embedded-integrations/slack/)

## Admin capabilities[​](#admin-capabilities "Direct link to Admin capabilities")

Configure and manage these features for your organization.

| Features | What it does |
| --- | --- |
| [**Bot responses**](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-bot-responses) | Configure automatic answers in Slack channels |
| [**Question detection**](/administration/platform/embedded-integrations/slackbot/admin-guide/customize-question-detection) | Customize how Glean detects questions in channels |
| [**Slack sidebar setup**](/administration/platform/embedded-integrations/slackbot/admin-guide/setup-slack-sidebar) | Deploy the Glean sidebar for your users |
| [**Code Writer**](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-code-writer) | Enable draft PR creation from Slack conversations |
| [**Public Mode**](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode) | Allow channel-wide answer sharing |
| [**Daily Digest**](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-daily-digest) | Enable morning channel and topic summaries |
| [**Permissions and security**](/administration/platform/embedded-integrations/slackbot/admin-guide/manage-permissions-security) | Manage access controls and data security |
| [**Cost and usage**](/administration/platform/embedded-integrations/slackbot/admin-guide/cost-usage-monitoring) | Monitor usage and manage costs |
| [**Slack RTS**](/administration/platform/embedded-integrations/slackbot/getting-started/upgrading-to-slack-rts) | Enable federated real-time retrieval of live Slack messages |

## Compatibility[​](#compatibility "Direct link to Compatibility")

Gleanbot supports standard Slack workspaces and Slack Enterprise Grid organizations. For Slack RTS deployments, Glean in Slack uses both the Slack connector and the Slack RTS connector.

-   **Slack connector:** Provides engagement signals and proactive experiences.
-   **Slack RTS connector:** A federated connector that retrieves live Slack messages at query time using Slack's Real-Time Search APIs. It does not index message content — results are fetched and processed in memory at the time of each search.

note

Glean uses two separate Slack apps when RTS is enabled — one for Real-Time Search and one for personalization (engagement signals and proactive answers in channels where the bot isn't present). Both must be authorized by each user.

For setup, migration, and detailed RTS behavior, refer to the [Slack connector documentation](/connectors/native/slack/) and [Slack connector changes: Gleanbot impacts and FAQ](/connectors/native/slack/about/gleanbot-impacts/).

## Requirements[​](#requirements "Direct link to Requirements")

-   Slack workspace or Slack Enterprise Grid organization
-   Glean Assistant enabled for your organization
-   Admin permissions to install Slack apps

## Quick links[​](#quick-links "Direct link to Quick links")

Admin quick links

-   [Prerequisites](/administration/platform/embedded-integrations/slackbot/getting-started/prerequisites)
-   [Installation guide](/administration/platform/embedded-integrations/slackbot/getting-started/installation-guide)
-   [Configuration checklist](/administration/platform/embedded-integrations/slackbot/getting-started/configuration-checklist)
-   [Configure bot responses](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-bot-responses)
-   [Customize question detection](/administration/platform/embedded-integrations/slackbot/admin-guide/customize-question-detection)
-   [Slack sidebar setup](/administration/platform/embedded-integrations/slackbot/admin-guide/setup-slack-sidebar)
-   [Configure Code Writer](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-code-writer)
-   [Enable Public Mode](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode)
-   [Enable daily digest](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-daily-digest)
-   [Permissions and security](/administration/platform/embedded-integrations/slackbot/admin-guide/manage-permissions-security)
-   [Cost and usage](/administration/platform/embedded-integrations/slackbot/admin-guide/cost-usage-monitoring)
-   [Upgrade to Slack RTS](/administration/platform/embedded-integrations/slackbot/getting-started/upgrading-to-slack-rts)

## Support and resources[​](#support-and-resources "Direct link to Support and resources")

[

### Troubleshooting







](/administration/platform/embedded-integrations/slackbot/troubleshooting)[

### FAQ







](/administration/platform/embedded-integrations/slackbot/faq)[

### Reference







](/administration/platform/embedded-integrations/slackbot/reference)

## Cost considerations[​](#cost-considerations "Direct link to Cost considerations")

Glean in Slack uses Glean Assistant and generative AI.

-   If you use [Glean's Azure OpenAI key](/administration/llms), there is no additional cost.
-   If you use your own key, turning on automatic answers in channels incurs costs. Work with Glean sales or customer success to estimate costs based on your channel volume.
