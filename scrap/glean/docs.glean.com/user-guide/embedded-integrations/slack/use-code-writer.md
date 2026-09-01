---
url: "https://docs.glean.com/user-guide/embedded-integrations/slack/use-code-writer"
canonical: "https://docs.glean.com/user-guide/embedded-integrations/slack/use-code-writer"
title: "Use Code Writer for code suggestions"
description: "Turn Slack conversations into draft pull requests with Code Writer."
fetched_at: "2026-09-01T13:30:40.232Z"
---
On this page

Code Writer lets you turn Slack conversations, incidents, and escalations into draft pull requests in GitHub without leaving Slack. You can ask Glean to propose code changes based on channel messages, tickets, or stack traces, and Code Writer opens a draft pull request with the proposed fix.

Admin-enabled feature

Code Writer in Slack must be turned on by your Glean admin. If it isn't available, share the [Slack Code Writer admin guide](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-code-writer) with them.

## How to use Code Writer[​](#how-to-use-code-writer "Direct link to How to use Code Writer")

1.  In a Slack channel where Glean is active, mention `@Glean` and describe the code change you need.
2.  Provide context such as error messages, stack traces, ticket IDs, or the repository name.
3.  Glean reads the conversation, uses Code Writer to propose a fix, and posts a draft pull request URL and summary back to the channel.
4.  Review and merge the pull request in GitHub following your team's existing review and CI processes.

## Usage examples[​](#usage-examples "Direct link to Usage examples")

### Handle escalations in Slack[​](#handle-escalations-in-slack "Direct link to Handle escalations in Slack")

Use Code Writer in an escalation channel to propose fixes as part of your incident workflow.

1.  An on-call engineer posts an error and stack trace in `#prod-escalations`.
2.  A teammate mentions Glean in Slack and asks: 'Use Code Writer to propose a fix for this error in the `payments-service` repo.'
3.  Glean:
    -   Reads the message and any attached logs.
    -   Uses Code Writer to propose a fix in the configured repository and branch.
    -   Posts a draft pull request URL and summary back to `#prod-escalations`.

Engineers review and merge the pull request in GitHub, following existing review and CI processes.

### Run a Code Writer agent from Slack[​](#run-a-code-writer-agent-from-slack "Direct link to Run a Code Writer agent from Slack")

If you have an agent with a Code Writer step:

1.  In Slack, start a conversation with Glean or use the Glean app in a channel.
2.  Trigger the agent (for example, by name or via a message shortcut, depending on your configuration).
3.  Provide the required inputs (such as a ticket ID or error summary).
4.  The agent runs, calls Code Writer as part of its steps, and returns the new pull request link in Slack.

This is useful for:

-   Jira bug-fix agents.
-   Backlog cleanup agents.
-   Internal tools that should be accessible from Slack.

## First-time setup[​](#first-time-setup "Direct link to First-time setup")

On first use, you need to connect your GitHub account:

1.  When you trigger Code Writer for the first time, Glean prompts you to authorize via GitHub OAuth.
2.  Complete the OAuth flow to connect your GitHub account.
3.  After authorization, Code Writer creates pull requests on your behalf.

This is a one-time step. After you connect your account, Code Writer works automatically in future requests.

## See also[​](#see-also "Direct link to See also")

-   [Code Writer overview](/administration/assistant/features/code-writer) — capabilities and security considerations.
-   [Set up Code Writer tools](/administration/tools/setup-tools/code-writer-tools-setup) — admin configuration for Code Writer.
-   [Code Writer in Agent Builder](/tools/glean/code-writer) — how to add Code Writer to agents.
-   [Code generation in Assistant](/user-guide/assistant/code-generation) — end-user guide for code generation in chat.
