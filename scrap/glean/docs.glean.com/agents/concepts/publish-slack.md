---
url: "https://docs.glean.com/agents/concepts/publish-slack"
canonical: "https://docs.glean.com/agents/concepts/publish-slack"
title: "Publishing to Slack"
fetched_at: "2026-09-01T13:29:16.596Z"
---
On this page

Agents with a chat trigger can be set up to post their responses automatically in Slack channels, allowing everyone in the channel to see the information.

note

Agents published to Slack can answer questions and run read tools, but write tools that require interactive approval in the Glean web app do not complete from Slack. If your agent needs to create, update, or post data in another system, configure the write step to **Run without user confirmation** only when it is safe and supported for that action, or run the agent in the Glean web app where the approval flow is available. For more information, see [Human-in-the-loop confirmations for write tools](/tools/human-in-the-loop-experience-for-tools).

## Use cases[​](#use-cases "Direct link to Use cases")

Posting responses directly in the channel is valuable in scenarios where access to the agent’s knowledge is broadly shared within the organization. Examples include:

-   **IT Help Agent**: References IT knowledge sources available to the entire organization
-   **Engineering Best Practices Agent**: Documents common internal processes and makes them available to the company
-   **Onboarding Buddy Agent**: Documents common onboarding questions

## How to enable auto-sharing in Slack[​](#how-to-enable-auto-sharing-in-slack "Direct link to How to enable auto-sharing in Slack")

1.  Open the Agent builder and ensure the agent is using a **Chat message** trigger
2.  Click on the **Share** button in the header
3.  Select the set of users who the agent will respond to in Slack. We recommend setting the General access setting to `Anyone at <Your Company> with the link can view`
4.  In the Publishing options, select **Slack**
5.  Select the Slack channels that the agent should respond to (note that each Slack channel can have only agent at a time)
6.  Choose who can see the agent’s responses in Slack
7.  Tick the checkbox for **Make this agent available in Slack**
8.  Save the agent

## How to select a Slack channel[​](#how-to-select-a-slack-channel "Direct link to How to select a Slack channel")

If your deployment has multiple Slack instances, you will see an option to first choose the instance and then the channel.

If you don’t see the channel in the dropdown, click on *Can’t find a channel*.

Go to the channel in Slack and click on the channel name in the top bar. In the modal that appears, scroll down to the bottom of the “About” tab. Copy the channel ID shown and paste it into Glean.

## Options for who can see the agent’s responses in Slack[​](#options-for-who-can-see-the-agents-responses-in-slack "Direct link to Options for who can see the agent’s responses in Slack")

### Option A - Only visible to user[​](#option-a---only-visible-to-user "Direct link to Option A - Only visible to user")

Agent replies with an answer that is “Only visible to you” in the thread. The user cannot post the response in the thread.

### Option B - Only visible to user, with an option to share the response \[Recommended\][​](#option-b---only-visible-to-user-with-an-option-to-share-the-response-recommended "Direct link to Option B - Only visible to user, with an option to share the response [Recommended]")

Agent replies with an answer that is “Only visible to you” in the thread. The user can then choose to post the response in the thread.

### Option C - Visible to everyone in the Slack channel[​](#option-c---visible-to-everyone-in-the-slack-channel "Direct link to Option C - Visible to everyone in the Slack channel")

Agent replies with an answer that is visible to everyone in the channel. Glean restricts the agent to only broadly shared content — documents and messages that everyone in your organization can access.

Important

Option C uses a stricter permission model than the Glean web UI. In the web app, the agent retrieves results based on the signed-in user's individual permissions. In Slack, Option C restricts results to content broadly shared across your organization — regardless of who asked the question. An agent that returns complete answers in the web UI may return different or incomplete results in Slack.

If you notice missing results, see [Troubleshoot incomplete results with Option C](#troubleshoot-incomplete-results-with-option-c) below.

## Broadly shared content used by the agent in Option C[​](#broadly-shared-content-used-by-the-agent-in-option-c "Direct link to Broadly shared content used by the agent in Option C")

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
-   **Confluence**: Pages available to an organization-wide access group (the "Default access group" as configured in the Glean admin console for the Confluence connector), or pages with anonymous access.
-   **SharePoint and OneDrive**: Documents in SharePoint sites shared with the *Everyone except external users* group.
-   **All other connectors**: Glean evaluates whether a document has broad access within the connector. For a full list of connectors and what qualifies as broadly shared content, see [public mode for Glean in Slack channels](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode#connectors-that-can-contribute-to-public-replies).

note

Some connectors, such as Coda, are excluded from public mode and won’t contribute to Option C responses. See the [full list of excluded connectors](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode#connectors-not-considered-for-public-mode) for details.

## Troubleshoot incomplete results with Option C[​](#troubleshoot-incomplete-results-with-option-c "Direct link to Troubleshoot incomplete results with Option C")

If your agent returns incomplete or empty results in Slack with Option C but works correctly in the Glean web UI, the most likely causes are:

1.  **Knowledge source documents aren't broadly shared**: Verify that documents in your agent's knowledge sources have organization-wide permissions, not permissions limited to specific users or groups. Documents shared with individuals or small groups aren't available in Option C, even if everyone in the channel can open them.
    
2.  **Google Drive "Searchable" setting is off**: For Google Drive documents shared to your company domain, **Searchable → Can find in search results** must be enabled. Without it, the agent can't discover the documents in Option C. See [Google Drive permissions](/connectors/native/gdrive/security/permissions) for details.
    
3.  **The connector is excluded from public mode**: Some connectors (such as Coda and Asana) are excluded from public mode and won't contribute to Option C responses. Check the list of [excluded connectors](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode#connectors-not-considered-for-public-mode).
    
4.  **Teammates haven't authenticated Slack in Glean**: For agents in private Slack channels, teammates must connect Slack in their Glean personal settings to verify their channel membership.
    

tip

If your agent's knowledge sources include documents that aren't broadly shared, use **Option B** ("Only visible to user, with an option to share the response") instead of Option C. Option B uses the individual user's permissions, so the agent behaves the same in Slack as it does in the web UI.

## Best practices[​](#best-practices "Direct link to Best practices")

Use Option C with caution — responses are visible to everyone in the channel.

-   Avoid adding confidential information to the agent's knowledge sources.
-   Test the agent in a private channel before deploying it to large production channels.
-   Verify that knowledge source documents meet the broad-access requirements listed above.
