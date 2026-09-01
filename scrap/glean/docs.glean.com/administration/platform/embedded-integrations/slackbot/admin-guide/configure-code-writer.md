---
url: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/admin-guide/configure-code-writer"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/admin-guide/configure-code-writer"
title: "Configure Code Writer"
description: "Enable and configure Code Writer so users can propose code changes from Slack."
fetched_at: "2026-09-01T13:29:11.562Z"
---
On this page

You can use **Code Writer** directly from Slack through Glean's Slack integration. This lets users turn Slack conversations, incidents, and escalations into draft pull requests without leaving their channels.

## How Code Writer works in Slack[​](#how-code-writer-works-in-slack "Direct link to How Code Writer works in Slack")

When Code Writer is available in Slack:

-   Users can ask Glean in Slack to propose code changes based on channel messages, tickets, or stack traces.
-   Agents that include a **Code Writer** step can be triggered from Slack.
-   Code Writer opens draft pull requests in GitHub and posts the pull request links and summaries back to Slack.

Code Writer uses the same GitHub connector, GitHub App, and tools configuration as Assistant and agents.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before users can use Code Writer in Slack:

1.  **Glean in Slack is installed** — Follow the setup steps in the Glean in Slack documentation so your workspace can use the Glean app.
    
2.  **GitHub is connected** — The GitHub connector is configured and connected to the repositories where Code Writer will open pull requests.
    
3.  **Code Writer tools are configured** — The Code generation / Code Writer tools are set up in the Admin console with:
    
    -   A GitHub connector instance.
    -   The Glean GitHub App installed.
    -   Authentication and (optional) GPG signing configured.
    -   Access granted to the groups who will use Slack.
4.  **User GitHub auth completed** — On first use, engineers connect their GitHub account via OAuth so Code Writer can run on their behalf.
    

## Admin configuration for Slack[​](#admin-configuration-for-slack "Direct link to Admin configuration for Slack")

### Enable Glean in Slack[​](#enable-glean-in-slack "Direct link to Enable Glean in Slack")

If you have not already done so:

1.  Install the **Glean** Slack app for your workspace.
2.  Complete any workspace-level and channel-level permissions needed for Glean to read messages and respond in selected channels.

See the general [Glean in Slack](/administration/platform/embedded-integrations/slackbot) documentation for detailed installation and permission steps.

### Confirm Code Writer is enabled[​](#confirm-code-writer-is-enabled "Direct link to Confirm Code Writer is enabled")

In the Admin console:

1.  Go to **[Tools](/administration/tools/)**.
    
2.  Open the **Code generation / Code Writer** configuration.
    
3.  Verify:
    
    -   A GitHub connector instance is selected.
    -   The Glean GitHub App is installed for the correct organization.
    -   Authentication is set (User OAuth or central OAuth).
    -   GPG signing is configured if you require verified commits.
    -   The **Enable tools** section includes the users or groups who will use Slack.

Changes you make here apply to Assistant, agents, and Slack.

### Add Glean to relevant channels[​](#add-glean-to-relevant-channels "Direct link to Add Glean to relevant channels")

To use Code Writer in a Slack channel:

1.  Add the **Glean** app to the channel (for example, `#prod-escalations` or `#eng-support`).
2.  Ensure channel members who will invoke Code Writer:
    -   Have Glean accounts.
    -   Are included in the Code Writer tools' access list.

## See also[​](#see-also "Direct link to See also")

-   [Code Writer (features)](/administration/assistant/features/code-writer) -- overview of Code Writer capabilities and security considerations.
-   [Set up Code Writer tools](/administration/tools/setup-tools/code-writer-tools-setup) -- admin configuration for the Code Writer tools.
-   [Code Writer (agents)](/tools/glean/code-writer) -- how to add and configure the Code Writer tool in Agent Builder.
-   [Code generation in Assistant](/user-guide/assistant/code-generation) -- end-user guide for code generation and Code Writer in chat.
-   [GitHub connector](/connectors/native/github) -- connecting GitHub as a connector.
