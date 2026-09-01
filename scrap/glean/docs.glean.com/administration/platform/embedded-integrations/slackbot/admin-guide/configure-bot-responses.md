---
url: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/admin-guide/configure-bot-responses"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/admin-guide/configure-bot-responses"
title: "Configure bot responses in channels"
description: "Configure how Glean responds to questions in Slack channels."
fetched_at: "2026-09-01T13:29:11.619Z"
---
On this page

Glean provides helpful, AI-generated answers directly in Slack channels, either automatically or when explicitly tagged.

## Process flow[​](#process-flow "Direct link to Process flow")

1.  **Enable Glean:** Enable Glean either in your entire Slack workspace or within the specific channel.
    
2.  **Detect query:** When a question is detected either automatically or via an `@Glean` mention, Glean registers the query.
    
3.  **Search knowledge:** Glean searches across all company knowledge (previous Slack messages, knowledge articles, etc.) to generate a response.
    
4.  **Display the View prompt:** For reactive and proactive private responses, Glean posts a message indicating that a response is available. Users must select **View** to see it.
    
    ![View prompt shown before the private answer is generated](/img/administration/platform/embed-integrate/view-prompt-latency-pattern.png)
    
5.  **Generate the response:** After the user clicks **View**, they can select **Generate** to have Glean prepare the response. Glean then displays a private *Only visible to you — Generating your answer…* message while it prepares the response.
    
    -   **Enforce permissions:** Like Glean Search and Chat, the final response respects individual content permissions. This ensures the answer includes only data the user is authorized to access.
    
    ![Private generating state shown after clicking View](/img/administration/platform/embed-integrate/generating-answer-latency-pattern.png)
    
6.  **User action and feedback:** Users can review and interact with responses using the following controls:
    
    -   **Feedback buttons:** Select the thumbs-up or thumbs-down icon to give feedback on the response.
    -   **Delete:** Select the trash icon to remove the response.

## Post-response communication[​](#post-response-communication "Direct link to Post-response communication")

Glean uses specific signals to communicate its activity and solicit feedback:

-   Glean adds emoji reactions to the original message where it detected a question, to communicate answer state and feedback status. Reactions appear only in channels where Glean is explicitly added. The default reactions are:
    
    -   ⏳ (hourglass) while Glean is processing
    -   👀 (eyes) when a suggestion is available
    -   ✅ (white check mark) when a suggestion is shared in channel
    -   ⚠️ (warning) when a suggestion is marked not helpful
    
    Admins can customize the emoji used for the processing, suggestion available, shared in channel, and not helpful reactions from the Glean in Slack admin page. By default, the processing reaction is ⏳.
    

note

Emoji reactions are **not** added in DMs, proactive triggers, or generate answer / search my sources triggers.

-   If the original user has neither shared nor deleted Glean's response, Glean posts a follow-up message allowing other users to request their own response.
    
    ![Request Glean response](/img/administration/assistant/slackbot/about-slackbot/31a321924b66eff8abd9589254bad81b.png)
    

## View sources[​](#view-sources "Direct link to View sources")

Users can open a sources modal from the Slack response to inspect the sources cited in Glean's answer.

### How sources are displayed[​](#how-sources-are-displayed "Direct link to How sources are displayed")

-   Source titles are shown as plain text. The clickable link appears on the connector or site name row, not on the title.
-   The modal does not show source snippets or other source content.
-   The modal can show all sources, even when the viewing user lacks access to certain documents. Private sources still display the title and link, but do not show snippets.

![Sources modal](/img/administration/platform/embed-integrate/sources-modal-with-snippets.png)

### Source attribution in the message[​](#source-attribution-in-the-message "Direct link to Source attribution in the message")

The Slack response itself shows the **source count** and up to **3 unique connector icons** above the action buttons.

![Slack response showing source count and connector icons](/img/administration/platform/embed-integrate/sources-count-with-icons.png)

## Action buttons and overflow menu[​](#action-buttons-and-overflow-menu "Direct link to Action buttons and overflow menu")

Each Slack response displays a maximum of three buttons, including the overflow menu. If more actions are available, they move into the overflow menu. The layout varies depending on the scenario.

![Tool button layout](/img/administration/platform/embed-integrate/tool-flow.png)

### Default layout (no primary action)[​](#default-layout-no-primary-action "Direct link to Default layout (no primary action)")

If a response excludes a primary action, such as **Post in thread**, the visible buttons are:

1.  **View sources**
2.  **Open in Glean**

If **Find more information** is available, it appears in the overflow menu.

### Private responses with a primary action[​](#private-responses-with-a-primary-action "Direct link to Private responses with a primary action")

When **Post in thread** is available, it remains the primary visible button. **View sources**, **Open in Glean**, **Find more information**, and other primary actions such as **Create Google Doc** move into the overflow menu in that order.

### Write-action and approval flows[​](#write-action-and-approval-flows "Direct link to Write-action and approval flows")

-   **Write-action flows:** Keep one write action, such as Code Writer, visible outside the menu.
-   **Wait for user input flows:** Keep **Approve** and **Deny** visible outside the menu.

In both flows, all other actions move into the overflow menu.

## Configure when Glean responds[​](#configure-when-glean-responds "Direct link to Configure when Glean responds")

By default, Glean responds automatically only when it has a confident answer, a design choice intended to avoid creating channel noise.

You can tune the response frequency in any channel by typing `/glean configure` within Slack and selecting from the menu of options.

![Configuring Glean responses](/img/administration/assistant/slackbot/about-slackbot/8f30ce8b635cca28d52b9cd1f51974fc.png)

If you want a guaranteed response from Glean in a channel or a thread, you can enable responses when someone mentions `@Glean` explicitly. You can ask Glean to answer questions, summarize a thread, or anything else. As always, Glean's response is personalized to the person who asked the question, and only based on content that person has permission to access.

### Non-configurable behaviors[​](#non-configurable-behaviors "Direct link to Non-configurable behaviors")

While you can configure how often Glean responds, certain behaviors are not configurable:

-   Glean will not respond in channels that include external parties, so as to avoid inadvertently leaking information.
-   Glean will not automatically respond in threaded messages, so as to avoid noise.
-   Glean will only respond to queries by people who have access to Glean.
-   Glean may not respond if calls have exceeded a rate limit.

## Enable Gleanbot to respond in channels[​](#enable-gleanbot-to-respond-in-channels "Direct link to Enable Gleanbot to respond in channels")

1.  In the Glean Admin console, navigate to **Platform** → **Embedded integrations**.
2.  Select **Glean in Slack**.

note

This option only appears after the Slack connector has been configured. For setup instructions, see [Set up Slack connectors](/connectors/native/slack/setup/).

![Glean in Slack in the Admin console](/img/administration/platform/embed-integrate/glean-in-slack-embed.png)

3.  Under **Slack connector**, select your Slack connector. This dropdown lists all Slack sources where the **Glean in Slack** tab is configured.
    
4.  Under **Which channels should Glean reply in?**, select one of the following options:
    
    -   **All public channels and when added to others:** Glean replies in all public channels and any channels where it has been added (recommended for maximum reach).
    -   **Don't reply in channels:** Glean does not reply in any channels.
    -   **Only when added to channels:** Glean replies only in channels where it has been explicitly added.
    -   **Custom channel list:** Glean replies only in a specific set of channels. Select **Manage channels** to configure the list. You can search for channels by name, or add them by channel ID. To find a channel ID, go to the channel in Slack, click the channel name in the top bar, and copy the ID shown at the bottom of the **About** tab.
5.  Toggle on **Allow public replies in channels** and choose your rollout preference:
    
    -   **All channels where Glean is active:** enables public replies across your entire Slack workspace.
    -   **Custom channel list:** specify the exact channels where public replies should be enabled.
    
    If **Custom channel list** is selected under **Which channels should Glean reply in?**, public replies can only be enabled for channels in that list.
    
    ![Custom channel list option under Allow public replies in channels](/img/administration/platform/embed-integrate/allow-public-custom.png)
    
6.  Toggle **Reply to channels without being @mentioned**.
    
    note
    
    This setting depends on **Allow public replies in channels**. Disabling public replies automatically turns off mentions-free replies, and vice versa.
    
7.  In **Emoji Reactions**, configure the reactions Glean adds to messages: Glean is working on a response, Response posted, Response upvoted, and Response downvoted.
    
8.  Toggle **Reply to messages from bots and workflows**. When enabled, Glean can respond to messages from approved bots and workflows that @mention users in channels. Responses follow the same public or private visibility settings configured for the channel.
    
    **Allow public replies in channels** and **Reply to messages from bots and workflows** appear in the configuration modal only if they have been enabled by an admin.
    
    ![Reply to messages from bots and workflows toggle](/img/administration/platform/embed-integrate/enable-reply-bot.png)
    
9.  Click **Save**.
    

note

**Admin and channel-level precedence:** Channel owners can turn off Glean features for their own channels, but cannot enable features that an admin has turned off. In channels with deployed agents, agent settings take precedence over the Glean in Slack settings on this page.

![Glean in Slack connector selection in the Admin console](/img/administration/platform/embed-integrate/glean-in-slack-ds.png)

### Add Glean to Slack channels[​](#add-glean-to-slack-channels "Direct link to Add Glean to Slack channels")

To make Glean active and available in a specific Slack channel, add the app to the channel:

1.  Go to the Slack channel where you want to add Glean and type `/`.
2.  Select **Add apps to this channel** and select **Glean**. For more information, see [Guide to apps in Slack](https://slack.com/help/articles/360001537467-Guide-to-apps-in-Slack#find-apps).

![Configuring Glean channels](/img/administration/assistant/slackbot/about-slackbot/571f3553fbd274e3dcaf8f2d5a19f41c.png)

## Turn off responses[​](#turn-off-responses "Direct link to Turn off responses")

If you want Glean to stop responding to questions in specific channels, use one of the following methods:

-   **Configure Glean to not respond in the channel:** Go to the channel in Slack, type `/glean configure`, and select "Don't respond".
-   **Remove Glean from the channel:** Ensure that Glean is not set to respond in all channels in Admin Console. Then, make sure that Glean is removed from the channel in Slack. You can remove the Glean app from a channel by typing `/remove @Glean`.
