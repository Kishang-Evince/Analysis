---
url: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/admin-guide/setup-slack-sidebar"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/admin-guide/setup-slack-sidebar"
title: "Set up Slack sidebar integration"
description: "Configure the Glean sidebar in Slack for your organization."
fetched_at: "2026-09-01T13:29:11.856Z"
---
On this page

The Glean sidebar in Slack streamlines access to Glean for users who also use Slack. This integration allows you to open a Glean Direct Message (DM) directly from the top-right corner of your Slack interface. By clicking on the Glean icon, the Glean DM opens as a sidebar, eliminating the need to switch to Glean web app or locate the Glean DM under Slack apps. This means you can ask Glean queries without leaving your Slack workspace.

## Key features[​](#key-features "Direct link to Key features")

-   **Glean sidebar:** Invoke Glean directly via the top-right corner icon; Glean opens as a sidebar. You can ask queries without going to Glean web such as: summarize this channel for the last 3 days, find a message in Slack, or any other general question.
    
    ![Glean sidebar](/img/administration/assistant/slackbot/slack-sidebar/8a6f9dea3fda5448a5084b6cd0435977.png)
    
-   **Starter prompts:** Leverage starter prompts to quickly get to the most common queries via Glean sidebar.
    
-   **Channel:** When you open the sidebar while being in a channel, channel-contextualized starter prompts are available. The sidebar is aware of which channel the user was looking at when the sidebar was invoked.
    
    ![Channel context](/img/administration/assistant/slackbot/slack-sidebar/7c66f0fd90f9626079e7d181ce963b6f.png)
    
-   **DM:** You can ask general questions and quickly get answers without needing a channel context.
    
    ![DM context](/img/administration/assistant/slackbot/slack-sidebar/f7ab24be7c9f3ce92eaff98ac36a66a1.png)
    

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

1.  The Glean Slack connector should be set up.
2.  Glean in Slack should be set up. If not, you can set it up via **Admin console → Connectors → Slack → Glean in Slack**

### Turn on Agents in Slack DMs in Feature rollouts[​](#turn-on-agents-in-slack-dms-in-feature-rollouts "Direct link to Turn on Agents in Slack DMs in Feature rollouts")

This feature is currently in beta and is turned off by default. To make it available to users, turn on **Agents in Slack DMs** in [Feature rollouts](/administration/feature-rollouts):

1.  Go to **What's new → Feature rollouts**.
2.  Open **Beta features**.
3.  Find **Agents in Slack DMs** and click **Enable**.
4.  Choose who gets access.
5.  Click **Confirm**.

### Determine whether the Glean Slack app is authorized[​](#determine-whether-the-glean-slack-app-is-authorized "Direct link to Determine whether the Glean Slack app is authorized")

1.  Navigate to [Slack API Apps](https://api.slack.com/apps) and look for the Glean Slack App. If you see it, proceed to the [Enable agent](#enable-agent) section.
    
2.  If you don't see the Glean Slack App, do the following:
    
    1.  Navigate to Glean [Admin Setup](https://app.glean.com/admin/setup/apps) page and select the connected Slack connector.
    2.  Select **Authorize** and complete the authorization process. Once finished, you will be redirected back to the same connector setup page and see the **Successfully authorized** message.
    3.  Once the Glean Slack App is authorized, skip forward to the [Enabling for End Users](#enabling-for-end-users) section. You do not need to perform the instructions in the **Enable agent** section.

### Enable agent[​](#enable-agent "Direct link to Enable agent")

1.  From the [Slack API Apps](https://api.slack.com/apps) page, select the Glean Slack app.
    
2.  Go to **Agents and Assistants** in the features section and enable **Agent or Assistant**. Add the following details into input fields:
    
    1.  **Description:** "Quickly access and search across all your company's data"
    2.  **Suggested prompts:** "Dynamic"
    3.  Select **Save**.
    
    ![Enable agent](/img/administration/assistant/slackbot/slack-sidebar/f2799a13d106be30e64bc6027fe11fb7.png)
    
3.  In the features section, go to **OAuth and Permissions** and verify that `assistant:write` is present in the bot token scope. If not, add that to the scope.
    
    ![OAuth permissions](/img/administration/assistant/slackbot/slack-sidebar/8c404a53b537dddb5538fa05db3ac9f0.png)
    
4.  Go to **Event Subscriptions**, and add the following two subscriptions to the **Subscribe to Bot Events** section:
    
    -   `assistant_thread_started`
    -   `assistant_thread_context_changed`
    
    This can help provide contextual prompts in the sidebar going forward.
    
    ![Event subscriptions](/img/administration/assistant/slackbot/slack-sidebar/b01fdf40ba17ffa5870a08655dd74160.png)
    
5.  Perform the step appropriate for your Glean Connector type:
    
    -   If your connection is a Slack2 Glean Connector, select **Reinstall your app** at the top.
    -   If your connection is a Slack Enterprise Grid Glean Connector:
        1.  Go to **OAuth & Permissions**, you can see existing tokens. Because you made a change to the app, you must revoke and reset these tokens. To do that, scroll to the bottom in that tab, and select **revoke tokens**.
            
        2.  After the tokens are revoked, go to the **Install App** tab, and select **install** (both for the org and the workspaces where it is already installed). This will create new tokens with the right scopes.
            
        3.  Go to [Glean Admin Setup](https://app.glean.com/admin/setup/apps), select the connected Slack connector. In this page:
            
            1.  Select the **Setup** tab
            2.  Modify the **Bot User OAuth Token** field (only this field needs to be copied/modified using the value from the newly generated 'Bot User OAuth Token' shown in the previous step).
            3.  Select **Authorize** at the bottom of the page.
            
            ![Glean Admin Setup](/img/administration/assistant/slackbot/slack-sidebar/8fb82bdaa4182b5140c15eb975ba0c8b.png)
            

tip

Only want to try this with a small audience? Skip the step for 'Enabling for End Users' and notify your test group users to individually enable the app.

## Enabling for end users[​](#enabling-for-end-users "Direct link to Enabling for end users")

Perform the following steps to enable the Glean sidebar in Slack for end users in your workspace or organization.

### Option 1: Workspace settings[​](#option-1-workspace-settings "Direct link to Option 1: Workspace settings")

1.  Go to your workspace settings in your Slack workspace.
    
    ![Admin console](/img/administration/assistant/slackbot/slack-sidebar/679ec844e022badd37b7feadb23838a2.png)
    
2.  On the bottom of the page, expand **App Agents and Assistants**.
    
3.  Select the **Show in top bar** option to display the bot in the top right for all users.
    
4.  Select **Save**.
    

### Option 2: Organization settings (Slack Enterprise Grid)[​](#option-2-organization-settings-slack-enterprise-grid "Direct link to Option 2: Organization settings (Slack Enterprise Grid)")

1.  In the Slack desktop app, click your **org name** in the left sidebar.
    
2.  Go to **Tools & settings > Organization settings**.
    
3.  In the left sidebar, click **Integrations > Installed apps**.
    
4.  Find and open your **Glean app** (using your org's customized app name, if applicable).
    
5.  Click **App Settings**.
    
6.  Next to **AI agent experience** or **AI assistant experience**, click **Edit**.
    
7.  Set the experience to **Enabled**, then click **Save**.
    

After this is enabled, users will be able to add the Glean assistant to their sidebar, subject to your org's Slack policies and any additional security controls.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

If users don't see the **Agents** option in the Slack sidebar after completing setup, verify that **Agents in Slack DMs** is turned on in **What's new → Feature rollouts**, and that the user is in the selected access group.
