---
url: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/reference"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/reference"
title: "Technical reference"
description: "Technical reference for Glean in Slack including architecture, permissions, and glossary."
fetched_at: "2026-09-01T13:29:12.452Z"
---
On this page

Glean uses two types of Slack connectors:

-   **Standard Slack connector:** Connects your workspace or Enterprise Grid organization to Glean and provides engagement signals for search ranking and personalization.
-   **Slack RTS connector:** A federated connector that retrieves live Slack messages at query time using Slack's Real-Time Search APIs. Glean does not store or index Slack messages - when you search, Glean securely asks Slack for results in real time and only returns messages you already have access to.

When RTS is enabled, you have two Glean apps in your Slack workspace:

-   **Glean:** The primary user-facing app. Handles bot responses, `/glean` commands, `@Glean` mentions, and sidebar access.
-   **Enterprise Graph:** Runs in the background. Manages engagement signals and identity metadata for search personalization. Users do not need to interact with this app directly.

note

Both apps require per-user authorization. A non-dismissible authorization banner appears for each user until both apps are authorized.

For setup details, see [Slack connector documentation](/connectors/native/slack/).

## Permissions model[​](#permissions-model "Direct link to Permissions model")

| Area | Behavior |
| --- | --- |
| **Content permissions** | Answers respect individual user permissions. Users only see information they have access to. |
| **Channel access** | Glean only responds in channels where it has been added. |
| **External channels** | Glean does not respond in channels that include external parties. |
| **Public Mode** | Uses only broadly shared content for public replies in channel threads. |
| **Assistant access** | Users must have Glean Assistant access to receive bot responses. |
| **Sidebar** | Requires `assistant:write` bot token scope and `assistant_thread_started` and `assistant_thread_context_changed` event subscriptions. |

## Rate limits[​](#rate-limits "Direct link to Rate limits")

-   Glean may not respond if it has received a high volume of questions in a short period. Try again later if you suspect a rate limit.
-   Automatic responses are throttled to avoid channel noise.

## Supported Slack environments[​](#supported-slack-environments "Direct link to Supported Slack environments")

Glean in Slack works with the following environments:

-   Standard Slack workspaces
-   Slack Enterprise Grid organizations
-   Slack RTS-enabled environments

## Glossary[​](#glossary "Direct link to Glossary")

| Term | Definition |
| --- | --- |
| **Gleanbot** | The conversational bot interface for Glean in Slack. Also known as Glean in Slack. |
| **Slack RTS** | Slack Real-Time Search. A federated connector that retrieves live Slack messages at query time using Slack's Real-Time Search APIs. Does not index or store message content. Required for all Glean customers who connect Slack. |
| **Slack sidebar** | A Glean interface accessible from the top-right corner of Slack for Assistant and agent access. |
| **Public Mode** | A feature that allows Glean to share answers visibly in channel threads. |
| **Daily digest** | A personalized summary of Slack channels and topics delivered as a daily DM. Not available when Slack RTS is enabled. |
| **Code Writer** | A feature that creates draft GitHub pull requests from Slack conversations. Requires the GitHub connector and Code Writer tools. |
| **/glean command** | A Slack slash command for searching across all connected connectors. Available to all Glean customers with the Slack app installed; does not require Glean Assistant access. |
| **Slack connector** | The standard integration connecting Slack to Glean for engagement signals and proactive answers in channels where the bot isn't present. |
|  |  |
| **Slack RTS connector** | The federated connector that retrieves live Slack messages at query time using Slack's Real-Time Search APIs. |
| **Enterprise Graph** | The background Glean app that remains active after RTS migration to handle engagement signals and identity metadata for search personalization. |
| **Enterprise Grid** | Slack's enterprise tier supporting multiple workspaces under one organization. |
