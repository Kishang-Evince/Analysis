---
url: "https://docs.glean.com/agents/concepts/publish-slack"
canonical: "https://docs.glean.com/agents/concepts/publish-slack"
title: "Publishing to Slack"
description: "Publish agents to Slack channels or dedicated Slack apps."
fetched_at: "2026-10-13T08:49:35.520Z"
---
On this page

You can publish agents with a **Chat message** trigger to Slack. Depending on your deployment and configuration, users can interact with the agent through the primary Glean app in Slack or through a dedicated Slack app in direct messages.

note

Agents published to Slack can answer questions and run read tools, but write tools that require interactive approval in the Glean web app do not complete from Slack. If your agent needs to create, update, or post data in another system, configure the write step to **Run without user confirmation** only when it is safe and supported for that action, or run the agent in the Glean web app where the approval flow is available. For more information, see [Human-in-the-loop confirmations for write tools](/tools/human-in-the-loop-experience-for-tools).

## Publish agents to Slack channels[​](#publish-agents-to-slack-channels "Direct link to Publish agents to Slack channels")

### Use cases[​](#use-cases "Direct link to Use cases")

Posting responses directly in the channel is valuable in scenarios where access to the agent’s knowledge is broadly shared within the organization. Examples include:

-   **IT Help Agent**: References IT knowledge sources available to the entire organization
-   **Engineering Best Practices Agent**: Documents common internal processes and makes them available to the company
-   **Onboarding Buddy Agent**: Documents common onboarding questions

### Configure channel publishing[​](#configure-channel-publishing "Direct link to Configure channel publishing")

1.  Open the Agent builder and ensure the agent is using a **Chat message** trigger
2.  Click on the **Share** button in the header
3.  Select the set of users who the agent will respond to in Slack. We recommend setting the General access setting to `Anyone at <Your Company> with the link can view`
4.  In the Publishing options, select **Slack**
5.  Select the Slack channels that the agent should respond to (note that each Slack channel can have only agent at a time)
6.  Choose who can see the agent’s responses in Slack
7.  Tick the checkbox for **Make this agent available in Slack**
8.  Save the agent

You must be an eligible Glean moderator or admin for the agent to enable Option D or publish a new version that uses it. See [Configure and publish Option D](#configure-and-publish-option-d).

### Select a Slack channel[​](#select-a-slack-channel "Direct link to Select a Slack channel")

If your deployment has multiple Slack instances, you will see an option to first choose the instance and then the channel.

If you don’t see the channel in the dropdown, click on *Can’t find a channel*.

Go to the channel in Slack and click on the channel name in the top bar. In the modal that appears, scroll down to the bottom of the “About” tab. Copy the channel ID shown and paste it into Glean.

### Choose who can see the agent’s responses in Slack[​](#choose-who-can-see-the-agents-responses-in-slack "Direct link to Choose who can see the agent’s responses in Slack")

The response visibility setting controls both who can read the response and which content the agent can use. The available options depend on your organization's configuration.

#### Option A — only visible to the user[​](#option-a--only-visible-to-the-user "Direct link to Option A — only visible to the user")

Agent replies with an answer that is “Only visible to you” in the thread. The user cannot post the response in the thread.

#### Option B — only visible to the user, with an option to share the response \[Recommended\][​](#option-b--only-visible-to-the-user-with-an-option-to-share-the-response-recommended "Direct link to Option B — only visible to the user, with an option to share the response [Recommended]")

Agent replies with an answer that is “Only visible to you” in the thread. The user can then choose to post the response in the thread.

#### Option C — visible to everyone in the Slack channel[​](#option-c--visible-to-everyone-in-the-slack-channel "Direct link to Option C — visible to everyone in the Slack channel")

Agent replies with an answer that is visible to everyone in the channel. Glean restricts the agent to only broadly shared content — documents and messages that everyone in your organization can access.

Important

Option C uses a stricter permission model than the Glean web UI. In the web app, the agent retrieves results based on the signed-in user's individual permissions. In Slack, Option C restricts results to content broadly shared across your organization — regardless of who asked the question. An agent that returns complete answers in the web UI may return different or incomplete results in Slack.

If you notice missing results, see [Troubleshoot incomplete results for option C](#troubleshoot-incomplete-results-for-option-c) later on this page.

##### Review content before using Option C[​](#best-practices "Direct link to Review content before using Option C")

Before publishing an agent with Option C:

-   Avoid adding confidential information to the agent's knowledge sources.
-   Test the agent in a private channel before deploying it to large production channels.
-   Verify that knowledge source documents meet the broad-access requirements for Option C.

#### Option D with the user's accessible sources[​](#option-d-with-the-users-accessible-sources "Direct link to Option D with the user's accessible sources")

**D - Visible to everyone in the Slack channel, using all of the user’s data sources** posts the response to the channel using content accessible to the requesting user. Unlike Option C, it does not restrict the response to content broadly shared across your organization.

Responses can reveal sensitive information

Everyone in the channel can read the response, including information from documents or messages that some channel members cannot access. Opening a cited document still requires permission to that document. Review the agent's knowledge sources and intended audience before enabling Option D.

See [Configure and publish Option D](#configure-and-publish-option-d).

### Broadly shared content used by the agent in Option C[​](#broadly-shared-content-used-by-the-agent-in-option-c "Direct link to Broadly shared content used by the agent in Option C")

Option C applies the same broad-access content rules as [public mode for Glean in Slack channels](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode) and can only reference content broadly shared across your organization. Common examples include:

-   **Slack**: Messages from public Slack channels.
-   **Google Drive**: Documents with access set to *Anyone in org can find/comment/edit* **and** the **Searchable → Can find in search results** setting enabled. Documents set to `Must have link to access` may not be discoverable, even if shared to the company domain. For more details, see [Google Drive permissions](/connectors/native/gdrive/security/permissions).

-   **Jira:**
    -   For Jira Service Management (channel access is restricted or open):
        -   Team-managed project with project access set to *Open*
        -   Company-managed project with one of these permissions for Browse Projects in **Project Settings → Access → Project permissions**: *Application Access to Jira service desk* or *Any logged in user*
    -   For Jira Software:
        -   Team-managed project with project access set to *Limited* or *Open*
        -   Company-managed project with one of these permissions for Browse Projects in **Project Settings → Access → Project permissions**: *Application Access to Jira software* or *Any logged in user*
-   **Confluence**: Pages available to an organization-wide access group (the "Default access group" as configured in the Glean **Admin console** for the Confluence connector), or pages with anonymous access.
-   **SharePoint and OneDrive**: Documents in SharePoint sites shared with the *Everyone except external users* group.
-   **All other connectors**: Glean evaluates whether a document has broad access within the connector. For a full list of connectors and what qualifies as broadly shared content, see [public mode for Glean in Slack channels](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode#connectors-that-can-contribute-to-public-replies).

note

Some connectors, such as Superhuman Docs, are excluded from public mode and won’t contribute to Option C responses. See the [full list of excluded connectors](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode#connectors-not-considered-for-public-mode) for details.

### Troubleshoot incomplete results for option C[​](#troubleshoot-incomplete-results-for-option-c "Direct link to Troubleshoot incomplete results for option C")

If your agent returns incomplete or empty results in Slack with Option C but works correctly in the Glean web UI, the most likely causes are:

1.  **Knowledge source documents aren't broadly shared**: Verify that documents in your agent's knowledge sources have organization-wide permissions, not permissions limited to specific users or groups. Documents shared with individuals or small groups aren't available in Option C, even if everyone in the channel can open them.
    
2.  **Google Drive "Searchable" setting is off**: For Google Drive documents shared to your company domain, **Searchable → Can find in search results** must be enabled. Without it, the agent can't discover the documents in Option C. See [Google Drive permissions](/connectors/native/gdrive/security/permissions) for details.
    
3.  **The connector is excluded from public mode**: Some connectors (such as Superhuman Docs and Asana) are excluded from public mode and won't contribute to Option C responses. Check the list of [excluded connectors](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode#connectors-not-considered-for-public-mode).
    
4.  **Teammates haven't authenticated Slack in Glean**: For agents in private Slack channels, teammates must connect Slack in their Glean personal settings to verify their channel membership.
    

tip

If your agent's knowledge sources include documents that aren't broadly shared, use **Option B** ("Only visible to user, with an option to share the response") instead of Option C. Option B uses the individual user's permissions, so the agent behaves the same in Slack as it does in the web UI.

### Configure and publish Option D[​](#configure-and-publish-option-d "Direct link to Configure and publish Option D")

The agent uses documents and messages accessible to the requesting user to generate the response. Everyone in the Slack channel can read that response, even if they cannot access the documents or messages it used.

See [Option D with the user's accessible sources](#option-d-with-the-users-accessible-sources).

An eligible Glean moderator or admin for the agent must enable Option D and publish new versions that use it. Editors who aren't eligible must submit their changes for review and publication.

#### Enable Option D[​](#enable-option-d "Direct link to Enable Option D")

To enable Option D, you must be an eligible Glean moderator or admin for the agent. Eligible roles include Agent Moderator, Admin, and Super Admin. Departmental Agent Moderators are eligible when the agent falls within their moderation scope. These are Glean roles, not Slack roles.

1.  Open the agent in **Agent builder** and click **Share**.
2.  Under **Publishing options**, select **Slack**.
3.  Select Option D and review the sensitive-information warning.
4.  Save the Slack settings:
    -   For workflow agents, click **Update**, then **Done** in the **Share** dialog.
    -   For autonomous agents, click **Save**.

If you can't select Option D because you aren't eligible, ask an eligible Glean moderator or admin for the agent to enable it. A publish request can't enable this option.

![Option D disabled with a tooltip directing the user to ask a moderator to select it](/img/publish-slack/option-d-moderator-required.png)

If Option D becomes unavailable for an agent already using it, select another response option and save the Slack settings before publishing. This requirement also applies to eligible Glean moderators and admins.

#### Publish or request approval[​](#publish-or-request-approval "Direct link to Publish or request approval")

If you're an eligible Glean moderator or admin for the agent, review the changes and sensitive-information warning, then publish the new version.

If you can edit the agent but aren't an eligible Glean moderator or admin for it, request publication:

1.  Click **Publish** in **Agent builder**.
2.  Enter a change summary in the **What changed in this version?** field.
3.  Click **Request to Publish**.

An eligible Glean moderator or admin for the agent reviews the pending changes and warning, then publishes the new version. For an already published agent, the current version stays live until they publish the update. See [Agents draft and version](/agents/concepts/agents-draft-version).

When Option D is already enabled and remains available, editors can save changes to existing Slack settings even if they aren't eligible Glean moderators or admins for the agent. Publishing a new version that uses Option D still requires an eligible Glean moderator or admin for the agent.

## Use a dedicated Slack app[​](#use-a-dedicated-slack-app "Direct link to Use a dedicated Slack app")

A dedicated Slack app gives an agent its own Slack app identity for direct-message conversations. This is separate from **Via Glean in Slack**, which uses the primary Glean app and supports both direct messages and channels.

The dedicated-app option is available only when your deployment has the required feature enabled and you have access to an eligible Slack service credential. If you do not see the option, contact your Glean administrator.

### Before you begin[​](#before-you-begin "Direct link to Before you begin")

-   The agent uses a **Chat message** trigger.
-   An administrator has created a [Slack app service credential](/administration/agent-identity/slack-app) and given you access to use it.
-   A Slack admin installed the app in the workspace where users will message the agent.

### Configure the dedicated app[​](#configure-the-dedicated-app "Direct link to Configure the dedicated app")

1.  Open the agent in the Agent builder and select **Share**.
2.  Select **Slack** under **Publishing options**.
3.  Turn on **Make this agent available in Slack**.
4.  Under **How do people access your agent in Slack?**, select **Via a dedicated Slack app**.
5.  Select the eligible Slack app service credential.
6.  Save the agent.

A dedicated Slack app is available in direct messages only. You can assign each dedicated-app service credential to only one published agent at a time. If another agent already uses the credential, it is unavailable for selection.

To let the agent respond in Slack channels, use **Via Glean in Slack** and configure the channel and response-visibility settings described earlier on this page.
