---
url: "https://docs.glean.com/tools/connector/slack"
canonical: "https://docs.glean.com/tools/connector/slack"
title: "Slack tools"
description: "Use Slack tools in Glean to send direct messages and channel posts directly from agents and workflows."
fetched_at: "2026-09-01T13:30:06.509Z"
---
On this page

With Slack tools, you can send messages to people and channels directly from Glean without switching to Slack.

Slack tools deliver critical updates, summaries, and workflow outputs to Slack, meeting people where work already happens. They are most commonly used in background (automated) agents, but end users can also trigger them interactively.

Slack tools enhance collaboration and productivity by:

-   Automating the delivery of key information, insights, or workflow results directly into Slack without manual handoff
-   Keeping teams informed through scheduled or event-triggered Slack notifications, reducing the risk of missing crucial updates
-   Streamlining cross-tool workflows, such as posting meeting summaries, important alerts, or automated reports from Glean into team channels or as private reminders

When building a workflow agent, you add the Slack tool as a workflow step and choose whether it sends a direct message or posts to a channel. The tool takes the output of a previous step, such as a summary, alert, or report, and sends it as a Slack message.

## Supported tools[​](#supported-tools "Direct link to Supported tools")

The Slack tools are enabled as a unified bundle.

The following tools are included:

-   Send message as DM: sends a direct message to the agent user
-   Send message to channel: posts a message to a Slack channel that the agent creator specifies

Message formatting, including links, code blocks, and Markdown, is preserved in Slack. When a message runs from a saved agent, it includes an attribution to the agent that triggered the tool.

## Example use cases[​](#example-use-cases "Direct link to Example use cases")

Slack tools support several common workflow patterns:

-   Team digests: an agent generates a daily digest or meeting summary and posts it to a Slack channel to keep the team aligned on recent activity
-   Onboarding nudges: an onboarding agent sends personalized direct messages with daily tasks and resources to new employees
-   Priority alerts: an alerting agent notifies the subscriber by direct message when a high-priority ticket is updated or a workflow step completes
-   Support summaries: a workflow posts summaries of recent conversations or support metrics into dedicated support channels
-   Cross-source project updates: an agent summarizes project updates from across enterprise sources and posts them to team channels on a schedule
-   Assistant discussion sharing: a user sends a Glean Assistant discussion or a concise summary to a teammate in Slack
-   Assistant project updates: a user drafts a project update in Glean Assistant, reviews it, and posts it to a team channel

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before using Slack tools, confirm the following:

-   A Glean admin has enabled the Slack tools through tools management in the **admin console**.
-   To post to a private channel, the Glean app is added to that channel. See [Slackbot](/administration/platform/embedded-integrations/slackbot).

### Add the tool in agent builder[​](#add-the-tool-in-agent-builder "Direct link to Add the tool in agent builder")

1.  In **agent builder**, add the Slack tool as a workflow step.
2.  Choose **Send message as DM** to message the agent user, or **Send message to channel** to post to a channel you specify.
3.  Reference the output of a previous step as the message content.
4.  Test the agent workflow to confirm messages are delivered and display as intended in Slack.

note

-   In background agents, messages send automatically when the agent is triggered
-   For channel messages, post only appropriate, nonsensitive content, especially in background agents, to avoid inadvertently sharing restricted information

note

**Migration note**

If your organization recently migrated from the native Slack app to the Slack Real-Time Search (RTS) app, Slack tools may return errors such as `slack bot is not enabled, action needed to migrate`. These errors are expected and resolve automatically once migration is complete.

## FAQ[​](#faq "Direct link to FAQ")

### Can Slack tools post to private channels?

Yes. To post to a private channel, add the Glean app to that channel first. See [Slackbot](/administration/platform/embedded-integrations/slackbot).

### Are Slack tools only for background agents?

No.

Slack tools are most commonly used in background (automated) agents, but end users can also trigger them interactively.

### Is the sending agent identified in the message?

Yes. When a message runs from a saved agent, it includes an attribution to the agent that triggered the tool.

### Why do Slack tools return a 'slack bot is not enabled' error?

This error can appear if your organization recently migrated from the native Slack app to the Slack Real-Time Search (RTS) app. It is expected and resolves automatically once migration is complete.
