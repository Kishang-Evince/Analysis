---
url: "https://docs.glean.com/tools/connector/ms-teams-tools"
canonical: "https://docs.glean.com/tools/connector/ms-teams-tools"
title: "Microsoft Teams tools"
description: "Use Microsoft Teams tools in Glean agents to manage chats, channels, and team communication workflows"
fetched_at: "2026-09-01T13:30:04.086Z"
---
On this page

Microsoft Teams extension tools enable the Glean Assistant and supported Glean Agent experiences to interact directly with Teams. This allows users to manage conversations, update channels, and coordinate with colleagues without switching between applications.

Teams tools are a key component of the broader Microsoft 365 tool suite.

When building a workflow agent, the Teams tools are available within the *Plan and Execute* step and for building agents with auto mode,the Teams tools are available for all the steps. This allows the agent to dynamically determine when to send messages, create channels, or look up chat history to fulfill a complex user request.

## Supported tools[​](#supported-tools "Direct link to Supported tools")

The Teams tools are enabled as a unified bundle. The following tools are included:

### Chat management[​](#chat-management "Direct link to Chat management")

-   List chats: Retrieves your recent and active one-on-one or group conversations.
-   List user chat messages: Pulls the message history and content from a specific conversation for context.
-   Create chat: Starts a new one-on-one or group chat session with specified colleagues.
-   Send message to Teams chat: Send a non-empty message to a specified existing Team chat.

### Teams and channels[​](#teams-and-channels "Direct link to Teams and channels")

-   List teams: Displays all Microsoft Teams of which you are a member.
-   List team channels: Shows individual channels available within a specific team.
-   Create team: Sets up a new top-level Microsoft Team for organization-wide or group collaboration.
-   Create a channel: Generates a new dedicated channel within an existing team for specific projects.
-   Add member to team: Programmatically adds a user to a specific team.

### Messaging and communication[​](#messaging-and-communication "Direct link to Messaging and communication")

-   Post chat message: Sends a new message directly into an existing one-on-one or group chat.
-   Post message to Teams channel: Publishes a new post or announcement to a specific channel within a team.
-   Reply to Teams channel message: Responds to a specific message thread to keep conversations organized.
-   List message replies: Retrieves all responses within a specific message thread.

### People and users[​](#people-and-users "Direct link to People and users")

-   List users: Searches and retrieves details for people within your organization’s Microsoft tenant.

## Example use cases[​](#example-use-cases "Direct link to Example use cases")

Integrating tools into Glean workflows provides several high-value automation opportunities:

-   Automated meeting follow-ups: An agent can summarize a meeting transcript and post the summary to a specific Teams channel along with a list of action items.
-   Incident response management: When a high-priority incident is detected, a Glean Agent can create a dedicated Teams channel and add the on-call engineering team to it automatically.
-   Sales deal coordination: A sales assistant can list recent chat messages from an account-specific group chat to help an executive catch up on deal progress before a call.
-   Onboarding automation: When a new employee is hired, an agent can automatically add them to relevant teams and send a welcome chat message with their first-day schedule.

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before configuring tools, ensure you have the following:

-   You must have administrative access to the Glean Admin Console.
    
-   Microsoft 365 must already be crawled as a connector in Glean.
    
-   Access to the Microsoft Entra ID portal to grant admin consent or configure a Custom OAuth app.
    
-   If using tools.
    

### Administrator steps[​](#administrator-steps "Direct link to Administrator steps")

1.  Enable the pack: Navigate to **Admin Console** → **Platform** → Tools and add **Microsoft Teams extensions tools** from the template library.
2.  Link connector: Link the pack to your existing *Microsoft 365 connector* instance.
3.  Configure Authentication: Microsoft 365 tools use **User OAuth**.
    -   *Managed App*: Use the Glean-managed application for simplified setup.
    -   *Custom OAuth App*: If using a custom app, it must be registered as a multi-tenant application. Single-tenant apps are not supported for Teams.
4.  One-Time Admin Connection: After creating the pack, a Glean admin must complete a one-time connection. Create an autonomous agent, add a Microsoft Teams step, and click **Connect** while signed in with admin credentials.

important

If you use Microsoft Teams extension tools, a Glean admin must complete a one-time connection after the pack is created before other users can reliably use the tools in your environment.

For detailed steps, see [Microsoft 365 tools and extension tools setup](https://docs.glean.com/administration/tools/setup-tools/m365-tools-setup).

## FAQs[​](#faqs "Direct link to FAQs")

### Why are Teams tools missing from the Workflow Builder?

Tool availability can vary by surface. While Teams tools are fully supported in Glean Assistant and Autonomous Agents (Plan and Execute), they may not appear in some static workflow builders.

### Why do users see an "Admin Approval" request?

This occurs when the Microsoft Entra ID tenant requires explicit admin approval for the permissions requested. An admin must grant consent in the Entra ID portal.

### Can I enable only some Teams tools?

Yes. Admins can enable a subset of Teams tools based on what they want to make available.
