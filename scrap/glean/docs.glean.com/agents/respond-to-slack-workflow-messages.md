---
url: "https://docs.glean.com/agents/respond-to-slack-workflow-messages"
canonical: "https://docs.glean.com/agents/respond-to-slack-workflow-messages"
title: "Respond to Slack Workflow Messages with Glean in Slack"
description: "Glean in Slack can respond to messages posted by Slack workflows, helping you automate triage and provide timely support in help channels."
fetched_at: "2026-09-01T13:29:17.220Z"
---
On this page

Glean in Slack can respond to messages posted by Slack workflows, helping you automate triage and provide timely support in help channels.

When this setting is enabled, Gleanbot will respond to messages from workflow bots in published channels - either privately or publicly depending on your AI app's visibility settings.

## How to enable Glean in Slack workflow responses[​](#how-to-enable-glean-in-slack-workflow-responses "Direct link to How to enable Glean in Slack workflow responses")

To allow Gleanbot to respond to workflow messages:

1.  In any Slack channel, run `/glean configure`.
    
2.  Turn on **Reply to messages from bots and workflows**.
    
3.  Click **Save changes**.
    
    ![Reply to messages from bots and workflows toggle in the configure modal](/img/administration/platform/embed-integrate/agent-slack-respond.png)
    

Glean in Slack identifies the requester as the first tagged user in the message. Example: "@jamie submitted a request" or "Escalation raised by @alex".

If no user is tagged, Gleanbot can’t respond - update your workflow to mention the requester if needed.

## How It Works[​](#how-it-works "Direct link to How It Works")

When enabled:

-   Glean in Slack only responds to workflow or bot messages in channels where it’s configured.
-   The type of response depends on your Glean app’s visibility setting:
    -   Everyone – Glean replies in-thread publicly
    -   Individual – Glean sends a private (ephemeral) reply to the tagged user.

Learn more about [Glean app visibility and auto-sharing](/agents/concepts/publish-slack).

## Known Limitations[​](#known-limitations "Direct link to Known Limitations")

-   Glean in Slack won’t respond if @glean is tagged in the workflow message.
-   Glean in Slack can’t respond to workflow or bot messages that include attachments.
-   Messages must include a tagged user - Glean in Slack assumes the first tagged user is the requester.
