---
url: "https://docs.glean.com/administration/assistant/configuration/chat-history"
canonical: "https://docs.glean.com/administration/assistant/configuration/chat-history"
title: "Chat History"
description: "By default, all conversations between your users and Glean as well as agent runs are saved so that they can be referred back to by the user later."
fetched_at: "2026-09-01T13:28:59.581Z"
---
On this page

By default, all conversations between your users and Glean as well as agent runs are saved so that they can be referred back to by the user later.

This includes interactions with both Company Knowledge and Public Knowledge modes.

When enabled, Chat History is maintained according to an organization‑level retention policy that your admin configures. Admins can choose from:

-   Off – chats or agent runs are not stored after the session.
-   30 days
-   90 days (3 months)
-   6 months (180 days)
-   1 year (365 days)

Chats older than the selected retention period are automatically and permanently deleted for security and compliance purposes. Changing the retention period:

-   Increasing it (for example, from 30 days to 6 months or 1 year) extends access to existing and new chats up to the new window.
-   Decreasing it permanently removes any chats that are now older than the new limit.

When Chat History is enabled, end users can search, manage, and delete their own chats from the chat history panel. For more information, see [Search chat history](/user-guide/assistant/glean-chat/search-past-chats).

## Enable or disable chat history[​](#enable-or-disable-chat-history "Direct link to Enable or disable chat history")

To configure Chat History for your organization:

1.  Navigate to **Admin console → Platform → Assistant → Settings**, then expand the **Chat History** section.
2.  In the Retention dropdown, choose one of: Off, 30 days, 90 days (3 months), 6 months (180 days), or 1 year (365 days)
3.  Click **Save**.

This setting applies to all Glean Assistant and Glean Agents conversations in your organization. When Chat History is enabled, users will see a message in chat such as “Chats are saved up to 3 months / 6 months / one year”, depending on your selection.

Individual users can also opt out of chat history for their own account, even when it's enabled for the organization. See [Search chat history](/user-guide/assistant/glean-chat/search-past-chats#manage-your-chat-history) for the end-user controls.

## Effect on Glean Customer Event logs[​](#effect-on-glean-customer-event-logs "Direct link to Effect on Glean Customer Event logs")

Turning off chat history - whether at the organization level or the individual user level - controls only whether past chats are stored and visible in the chat history panel. It doesn't affect [Glean Customer Event logs](/administration/gce-logs/data-dictionary).

Glean Customer Event logging is a separate system that records events (including `CHAT` events) for analytics and auditing purposes. These logs continue to be written regardless of the chat history setting.
