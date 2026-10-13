---
url: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/"
title: "Glean in Slack overview"
description: "Install, configure, and manage Glean in Slack for your organization."
fetched_at: "2026-10-13T08:49:23.229Z"
---
On this page

Use this guide to install, configure, and manage Glean in Slack for your organization. For end-user documentation, see [Glean in Slack for users](/user-guide/embedded-integrations/slack/).

Glean in Slack integrates enterprise search and knowledge directly into your Slack workspace, helping teams spend less time searching and more time acting on information.

## Start here[​](#start-here "Direct link to Start here")

[

### Set up Slack connectors

Choose and complete the connector setup for your Glean deployment and Slack environment.

Choose a setup





](/connectors/native/slack/setup/choose-your-setup)[

### Configure Glean in Slack

Verify prerequisites, configure the experiences you need, and test the rollout.

Start configuration





](/administration/platform/embedded-integrations/slackbot/getting-started/prerequisites)[

### Glean in Slack for users

Find user instructions for searching, asking questions, and using Glean in the Slack sidebar.

Open user guide





](/user-guide/embedded-integrations/slack/)

## Set up the Slack sidebar[​](#set-up-the-slack-sidebar "Direct link to Set up the Slack sidebar")

Set up the Slack sidebar to make Glean part of your team’s everyday work in Slack. Users can open Glean from Slack’s top bar to ask questions and run supported agents without switching apps. See [Set up Slack sidebar integration](/administration/platform/embedded-integrations/slackbot/admin-guide/setup-slack-sidebar).

## Components[​](#components "Direct link to Components")

-   [Glean in Slack](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-bot-responses): The conversational interface that responds to questions, handles `/glean` commands, and supports invoking Code Writer from Slack.
-   [Slack sidebar](/administration/platform/embedded-integrations/slackbot/admin-guide/setup-slack-sidebar): A dedicated Glean interface in Slack where users can chat with Glean, run supported agents, and see contextual suggestions.

note

The older version of Glean in Slack, which surfaced results based on matching [Answers](/user-guide/knowledge/answers/what-are-answers-and-how-do-they-work), was deprecated in February 2024. All current functionality uses AI-powered responses.

## Core capabilities[​](#core-capabilities "Direct link to Core capabilities")

Glean in Slack supports the following functions:

| **Function** | **Action / usage** | **Visibility** |
| --- | --- | --- |
| **Automated answering** | Responds when a question is detected in a channel, or when someone mentions `@Glean`. | Answers are shown privately to the person who asked the question by default. When [Public Mode](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode) is enabled, replies are visible to all channel members. All responses are personalized by permissions. |
| **Unified search** | Lets users search Glean directly from any channel using the `/glean` command. | Results are visible only to the person who ran `/glean`, with an option to share back to the channel. |
| **Code Writer** | Turns Slack conversations, incidents, and escalations into draft pull requests in GitHub. | Draft pull requests are created on behalf of the requesting user and links are posted back to Slack. |
| **Daily digest** | Provides a personalized summary of relevant information from selected channels and topics. | Digests are delivered as direct messages in Slack when this feature is enabled for your tenant. Not supported for Slack RTS-powered deployments. |

## Compatibility[​](#compatibility "Direct link to Compatibility")

Glean in Slack supports standard Slack workspaces and Slack Enterprise Grid organizations. For Slack RTS deployments, Glean in Slack uses both the Slack connector and the Slack RTS connector.

-   **Slack connector:** Provides engagement signals and proactive experiences.
-   **Slack RTS connector:** A federated connector that retrieves live Slack messages at query time using Slack's Real-Time Search APIs. It does not index message content — results are fetched and processed in memory at the time of each search.

note

Glean uses two separate Slack apps when RTS is enabled — one for Real-Time Search and one for personalization (engagement signals and proactive answers in channels where the bot isn't present). Both must be authorized by each user.

For setup, migration, and detailed RTS behavior, refer to the [Slack connector documentation](/connectors/native/slack/) and [Slack connector changes: Gleanbot impacts and FAQ](/connectors/native/slack/about/gleanbot-impacts/).

## Requirements[​](#requirements "Direct link to Requirements")

-   Slack workspace or Slack Enterprise Grid organization
-   Glean Assistant enabled for your organization
-   Admin permissions to install Slack apps

## Admin capabilities[​](#admin-capabilities "Direct link to Admin capabilities")

Configure and manage these features for your organization.

| Features | What it does |
| --- | --- |
| [**Bot responses**](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-bot-responses) | Configure automatic answers in Slack channels |
| [**Question detection**](/administration/platform/embedded-integrations/slackbot/admin-guide/customize-question-detection) | Customize how Glean detects questions in channels |
| [**Slack sidebar setup**](/administration/platform/embedded-integrations/slackbot/admin-guide/setup-slack-sidebar) | Deploy the Glean sidebar for your users |
| [**Code Writer**](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-code-writer) | Enable draft PR creation from Slack conversations |
| [**Public Mode**](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode) | Allow channel-wide answer sharing |
| [**Permissions and security**](/administration/platform/embedded-integrations/slackbot/admin-guide/manage-permissions-security) | Manage access controls and data security |
| [**Cost and usage**](/administration/platform/embedded-integrations/slackbot/admin-guide/cost-usage-monitoring) | Monitor usage and manage costs |
| [**Slack RTS**](/administration/platform/embedded-integrations/slackbot/getting-started/upgrading-to-slack-rts) | Enable federated real-time retrieval of live Slack messages |
| [**Daily Digest**](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-daily-digest) | Enable morning channel and topic summaries. Not supported for Slack RTS-powered deployments. |

## Cost considerations[​](#cost-considerations "Direct link to Cost considerations")

Glean Assistant usage in Slack follows your organization’s pricing plan. See [Glean Enterprise Flex](/glean-enterprise-flex-pricing) or [Glean Core Suite](/glean-core-suite-pricing) for pricing and usage details. For legacy or contract-specific pricing, contact your Glean account team.

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
-   [Permissions and security](/administration/platform/embedded-integrations/slackbot/admin-guide/manage-permissions-security)
-   [Cost and usage](/administration/platform/embedded-integrations/slackbot/admin-guide/cost-usage-monitoring)
-   [Upgrade to Slack RTS](/administration/platform/embedded-integrations/slackbot/getting-started/upgrading-to-slack-rts)
-   [Enable daily digest](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-daily-digest)

## Support and resources[​](#support-and-resources "Direct link to Support and resources")

[

### Troubleshooting







](/administration/platform/embedded-integrations/slackbot/troubleshooting)[

### FAQ







](/administration/platform/embedded-integrations/slackbot/faq)[

### Reference







](/administration/platform/embedded-integrations/slackbot/reference)
