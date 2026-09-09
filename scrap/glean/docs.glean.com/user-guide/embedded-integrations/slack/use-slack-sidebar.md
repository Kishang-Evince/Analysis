---
url: "https://docs.glean.com/user-guide/embedded-integrations/slack/use-slack-sidebar"
canonical: "https://docs.glean.com/user-guide/embedded-integrations/slack/use-slack-sidebar"
title: "Use Glean in the Slack sidebar"
description: "Use the Glean sidebar in Slack to chat with Assistant and run supported agents."
fetched_at: "2026-09-01T13:30:40.615Z"
---
On this page

Use the Glean sidebar in Slack to chat with Assistant or run agents without opening the web app. Switch between **Fast** and **Thinking** response modes, or pick a specialized agent from the agent picker.

From the sidebar, you can:

-   **Chat without leaving Slack** - interact with the assistant directly within your workspace to maintain your workflow.
-   **Browse and run agents** - use the agent picker to select and chat with specialized agents tailored to your tasks.
-   **Choose a response mode** - switch between **Fast** and **Thinking** modes for either speedy answers or more detailed, reasoned replies.

## Before you begin[​](#before-you-begin "Direct link to Before you begin")

Users can access agents in the sidebar only after an admin completes the following:

-   Connect and authorize the Glean Slack app and Slack connector. See [Slack connector](/connectors/native/slack/).
-   [Enable the Slack Agent or Assistant experience](/administration/platform/embedded-integrations/slackbot/admin-guide/setup-slack-sidebar#enable-agent).
-   [Enable the sidebar entry point for end users](/administration/platform/embedded-integrations/slackbot/admin-guide/setup-slack-sidebar#enabling-for-end-users).

## User roles[​](#user-roles "Direct link to User roles")

| Role | Key actions |
| --- | --- |
| **Admins** | Configure the Slack connector, authorize the Glean app, and enable the sidebar entry point for the organization. |
| **Users** | Open the sidebar, select a supported agent, choose a response mode, and conduct conversations directly in Slack. |

## How to use the Slack sidebar[​](#how-to-use-the-slack-sidebar "Direct link to How to use the Slack sidebar")

1.  In Slack, click the **Glean** icon in the top-right corner.
2.  Glean opens as a sidebar in Slack.
3.  Start a conversation in the sidebar. You can choose between the standard Assistant or a specialized Agent.

## Use Assistant in the Slack sidebar[​](#use-assistant-in-the-slack-sidebar "Direct link to Use Assistant in the Slack sidebar")

Chat with the Assistant directly within the Slack sidebar.

### Choose a response mode[​](#choose-a-response-mode "Direct link to Choose a response mode")

Assistant supports two response modes:

-   **Fast** - returns a quicker response.
-   **Thinking** - spends more time reasoning through more complex or multi-step questions.

Thinking mode is the default. If you change modes, your selection remains active for the rest of the conversation.

1.  Open the Glean sidebar in Slack.
2.  Click the **Chat mode** menu.
3.  Select **Fast** or **Thinking**.
4.  Enter your question.

![Select a response mode in the Glean sidebar](/img/administration/platform/embed-integrate/select-agent-sidebar-think-fast.png)

## Run an agent in the Slack sidebar[​](#run-an-agent-in-the-slack-sidebar "Direct link to Run an agent in the Slack sidebar")

note

Some agents that work in the Glean web app may not complete the same way in Slack. Agents can run read-only steps normally, but write tools that require an interactive approval step in the Glean web app do not complete from the Slack sidebar. To use write tools in Slack, the tool must be eligible and configured to run without user confirmation. Otherwise, run the agent in the Glean web app. For more information about interactive approval flows, see [Human-in-the-loop confirmations for write tools](/tools/human-in-the-loop-experience-for-tools).

You can run supported agents directly from the sidebar.

1.  Open the Glean sidebar in Slack.
    
2.  Click the **Chat mode** menu.
    
3.  Select **Agents**.
    
4.  Choose the agent you want to use with the **Agents** picker, then click **Run**.
    
    ![Select an agent in the Glean sidebar](/img/administration/platform/embed-integrate/select-agent-sidebar.png)
    
5.  Select an action for your agent and click **Run agent**.
    
6.  Enter your request in the message box.
    
    ![Run an agent in the Glean sidebar](/img/administration/platform/embed-integrate/select-agent-sidebar1.png)
    

The selected agent stays active for the entire chat session. To switch to a different agent or to Assistant, start a new chat.

## Use case examples[​](#use-case-examples "Direct link to Use case examples")

| Department | Question | Outcome |
| --- | --- | --- |
| **IT Support** | 'How do I get VPN access on a new laptop?' | Get immediate setup steps and ask follow-up questions in the same thread. |
| **HR Support** | 'Where can I find our leave policy?' | Access policy documents and summaries without leaving the Slack workspace. |
| **Team Workflows** | 'Help me triage these support tickets.' | Streamline internal operations and recurring workflows using team-specific agents. |

## Sidebar vs. channel publishing[​](#sidebar-vs-channel-publishing "Direct link to Sidebar vs. channel publishing")

Running an agent from the Slack sidebar is different from publishing an agent to respond in Slack channels.

**Use the sidebar when you want to:**

-   Chat in a 1:1 space where only you can see the messages and history.
-   Chat directly with Assistant or a selected agent.
-   Choose between **Fast** and **Thinking** modes for Assistant conversations.
-   Run a supported agent in a DM-style Slack surface.

**Use channel publishing when:**

-   An agent should respond in a shared Slack channel or thread that everyone in the conversation can see.
-   You do not need sidebar-only features such as switching agents or chat modes.
-   For more information, see [Publish agents to Slack](/agents/concepts/publish-slack).
