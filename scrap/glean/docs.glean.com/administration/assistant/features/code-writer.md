---
url: "https://docs.glean.com/administration/assistant/features/code-writer"
canonical: "https://docs.glean.com/administration/assistant/features/code-writer"
title: "Code Writer"
description: "Learn about Glean's capability to write code and open draft pull requests in GitHub."
fetched_at: "2026-09-01T13:29:00.017Z"
---
On this page

**Code Writer** lets you use Glean Assistant and Glean Agents to propose code changes and open draft pull requests in GitHub. It helps you complete coding tasks such as bug fixes, refactors, and updates without changing your existing GitHub review and deployment processes.

As an admin, you enable Code Writer, decide where it can run, and control which users can use it across Glean Assistant, Glean Agents, and Slack.

## Where Code Writer can be used[​](#where-code-writer-can-be-used "Direct link to Where Code Writer can be used")

When Code Writer is enabled and configured, you can use it in the following ways:

-   Within **Glean** to make changes to your codebase interactively.
-   As a **tool** in an agent workflow.
-   Call it from **Slack** (Glean in Slack) to propose fixes directly from channels.

In all cases, Code Writer:

1.  Reads relevant code from your GitHub repositories (via the GitHub connector and GitHub App).
2.  Plans a small, targeted change based on user instructions and context.
3.  Creates a branch and **draft pull request** in GitHub.
4.  Returns the pull request URL and a summary back to Glean or the agent.

note

Review and merge decisions always stay in GitHub.

## Next steps[​](#next-steps "Direct link to Next steps")

[

### Set up Code Writer tools

Configure the Code Writer tools, install the GitHub App, and control who can use Code Writer.







](/administration/tools/setup-tools/code-writer-tools-setup)[

### Code Writer in Agent Builder

Add and configure the Code Writer tool in agents to automate code changes.







](/tools/glean/code-writer)[

### Use Code Writer with Slack

Enable Code Writer in Slack channels for incident response and escalations.







](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-code-writer)[

### End-user guide

Learn how users interact with Code Writer in Glean and Slack.







](/user-guide/assistant/code-generation)[

### GitHub connector

Connect and index GitHub repositories as a connector for Code Writer.







](/connectors/native/github)[

### Security

Learn about Code Writer's security model, permissions, and best practices.







](/security/code-writer-security)
