---
url: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/getting-started/configuration-checklist"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/getting-started/configuration-checklist"
title: "Initial configuration checklist"
description: "Essential post-installation configuration steps for Glean in Slack."
fetched_at: "2026-09-01T13:29:11.965Z"
---
On this page

After installing Glean in Slack, use this checklist to configure the integration for your organization. Each item links to the relevant documentation for detailed instructions.

## Essential configuration[​](#essential-configuration "Direct link to Essential configuration")

Complete these steps to get Glean in Slack working for your team.

-   [ ]  **Configure bot response behavior:** Decide when and how Glean responds in channels: automatically on question detection, only when mentioned with `@Glean`, or both. See [Configure bot responses](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-bot-responses).
-   [ ]  **Add Glean to channels:** Add the Glean app to each Slack channel where you want the bot to respond. Start with a few test channels before a broader rollout. See the [installation guide](/administration/platform/embedded-integrations/slackbot/getting-started/installation-guide#step-3-add-glean-to-slack-channels).
-   [ ]  **Set channel scope:** In the Glean admin console, specify whether Glean should respond in all public channels and when added to others, only when added to channels, not at all, or only in a specific set of channels. See [Enable Gleanbot to respond in Slack channels](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-bot-responses).
-   [ ]  **Configure emoji reactions:** Customize the emoji reactions Glean uses to show status and feedback on messages that trigger a response, including **Glean is working on a response**, **Response posted**, **Response upvoted**, and **Response downvoted**. See [Enable Gleanbot to respond in Slack channels](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-bot-responses).
-   [ ]  **Verify user access:** Confirm that users who will interact with Glean in Slack have Glean accounts, have logged into Glean at least once, and have Assistant access.

## Feature-specific configuration[​](#feature-specific-configuration "Direct link to Feature-specific configuration")

Enable these optional features based on your organization's needs.

### Slack sidebar[​](#slack-sidebar "Direct link to Slack sidebar")

-   [ ]  **Authorize the Glean Slack App:** Verify or authorize the Glean Slack App in the [Slack API Apps](https://api.slack.com/apps) console.
-   [ ]  **Enable the Agent or Assistant feature:** In your Slack app's features section, enable Agent or Assistant and configure the required scopes (`assistant:write`) and event subscriptions (`assistant_thread_started`, `assistant_thread_context_changed`).
-   [ ]  **Enable for end users:** In the Glean admin console, enable the sidebar entry point for your organization via the Slack connector settings.

See [Integrate Glean sidebar in Slack](/administration/platform/embedded-integrations/slackbot/admin-guide/setup-slack-sidebar) for detailed steps.

### Daily digest[​](#daily-digest "Direct link to Daily digest")

RTS limitation

Daily digest is **not supported** for Slack RTS-powered deployments. It is only available with the standard Slack connector.

-   [ ]  **Enable daily digest:** In the Glean admin console, go to **Platform** > **Connectors** > **Slack** > **Glean in Slack** tab and enable daily digest for all users or a subset.
-   [ ]  **(Optional) Set up Slack Canvas:** Add `canvases:read` and `canvases:write` scopes to deliver digests in Slack Canvas format for a better reading experience.
-   [ ]  **Notify users:** Let users know they can configure their digest preferences (channels, topics, and delivery time) in the Glean app Home tab in Slack.

See [Configure daily digest in Glean in Slack](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-daily-digest) for detailed steps.

### Code Writer[​](#code-writer "Direct link to Code Writer")

-   [ ]  **Verify GitHub connector:** Confirm the GitHub connector is configured and connected to the target repositories.
-   [ ]  **Set up Code Writer tools:** In the Glean admin console, go to **Platform** > **Tools** and configure the Code Writer tools with a GitHub connector and the Glean GitHub App installed.
-   [ ]  **Grant user access:** Add engineering users or groups to the Code Writer tools' access list in the Enable Tools section.
-   [ ]  **Add Glean to engineering channels:** Add the Glean app to relevant channels such as `#prod-escalations` or `#eng-support`.

See [Use Code Writer with Glean in Slack](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-code-writer) for detailed steps.

### Public Mode[​](#public-mode "Direct link to Public Mode")

-   [ ]  **Enable public replies:** In the Glean admin console under **Platform** > **Connectors** > **Slack** > **Glean in Slack** tab, toggle on **Allow public replies in channels**.
-   [ ]  **Configure rollout scope:** Choose whether to enable Public Mode in all active channels or restrict to specific channels. Enabling public replies also enables “Reply to questions without being @mentioned.”
-   [ ]  **Review content visibility:** Understand which connectors contribute to public replies (only broadly shared content) and which are excluded for privacy.

See [Enable Public Mode](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode) for detailed steps.

## Monitoring and optimization[​](#monitoring-and-optimization "Direct link to Monitoring and optimization")

After the initial setup, review these areas to optimize the integration.

-   [ ]  **Monitor usage:** Track how often Glean responds in channels and how users interact with responses. Use feedback signals, such as response upvotes and downvotes, to gauge response quality.
-   [ ]  **Tune question detection:** If Glean responds too often or not enough, adjust channel-level settings using `/glean configure` in Slack to control response frequency. See [Customize question detection for Agents in Slack](/administration/platform/embedded-integrations/slackbot/admin-guide/customize-question-detection) for agent-specific tuning.
-   [ ]  **Review cost:** If you use your own Azure OpenAI key, monitor usage as you add more channels. Work with Glean sales or customer success for cost estimates based on channel volume.
-   [ ]  **Review best practices:** Encourage users to ask clear, complete questions in channels and use `@Glean` when they want to explicitly prompt a response.

## See also[​](#see-also "Direct link to See also")

-   [Slack connector changes: Gleanbot impacts and FAQ](/connectors/native/slack/about/gleanbot-impacts/)
-   [Troubleshooting Slackbot](/administration/platform/embedded-integrations/slackbot/troubleshooting)
-   [Glean in Slack overview](/administration/platform/embedded-integrations/slackbot/)
