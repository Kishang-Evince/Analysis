---
url: "https://docs.glean.com/user-guide/assistant/glean-chat/search-past-chats"
canonical: "https://docs.glean.com/user-guide/assistant/glean-chat/search-past-chats"
title: "Search chat history"
description: "Find and reopen your past Glean chats and agent runs from the left navigation"
fetched_at: "2026-10-13T08:51:28.003Z"
---
On this page

Search your past Glean chats and agent runs from the left navigation, then reopen a thread to pick up where you left off.

You can search by keywords from a thread title or from the conversation itself. Matching results can show a snippet from the chat.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Your admin must enable **Chat history** before you can search past chats. See [Chat history](/administration/assistant/configuration/chat-history).

note

If your organization has turned chat history off, or if retention has removed older threads, those conversations won't appear in results.

## Requirements and availability[​](#requirements-and-availability "Direct link to Requirements and availability")

-   Available on all supported clouds service providers with both Glean Key and customer-managed keys.
-   Results include only your own chats and agent runs, subject to your organization's permissions and retention settings.

## How to search your chat history[​](#how-to-search-your-chat-history "Direct link to How to search your chat history")

1.  Open Glean.
2.  In the left navigation, click the search icon in the **Chats** section, or press **Cmd+K** (Mac) or **Ctrl+K** (Windows/Linux).
3.  Type a keyword from the thread title or from something you remember saying or seeing in the chat.
4.  Select a result to open that thread.

**Tips:**

-   Use distinctive words from the title or the conversation.
-   For an agent run, try the agent name or a term from the run.

## Filter your chat history[​](#filter-your-chat-history "Direct link to Filter your chat history")

You can narrow results by the type of content produced in the chat.

1.  Open chat history search from the left navigation or with **Cmd+K** / **Ctrl+K**.
2.  Click the filter icon next to the search field.
3.  Choose a type such as **Documents**, **Emails**, **Messages**, **Images**, **Slides**, or **All chats**.

Available filters depend on which features your organization has turned on.

## Ask Glean to search your past chats[​](#ask-glean-to-search-your-past-chats "Direct link to Ask Glean to search your past chats")

Conversation history search lets you ask Glean to find an earlier conversation while you work in a new one, so you can pick up long-running work without hunting through your history. Glean searches your own past chats and agent runs, then uses what it finds to answer.

There's no control to turn on and no separate search box. Describe the earlier conversation in your prompt, for example:

-   "Find the chat where I worked on the Q3 pricing model and summarize what I decided"
-   "Last month I asked you about the onboarding checklist. Which links did you give me?"

Glean treats past conversations as background context rather than as an authoritative source. Answers in your history came from a model and can be wrong or out of date, so Glean checks any claims it reuses against primary sources such as documents and messages before citing them.

### What Glean can search[​](#what-glean-can-search "Direct link to What Glean can search")

-   **Your own conversations only.** Glean surfaces conversations from your account and doesn't return another person's chats or agent runs.
-   **Chats stored in Chat History.** If your organization has turned Chat History off, or you've turned it off for your own account, there's nothing for Glean to search.
-   **Conversations inside your organization's retention window.** Glean permanently deletes chats past the retention period.

## Manage your chat history[​](#manage-your-chat-history "Direct link to Manage your chat history")

You control whether Glean saves your chats, and you can delete your history at any time.

### Turn your chat history on or off[​](#turn-your-chat-history-on-or-off "Direct link to Turn your chat history on or off")

Even when chat history is on for your organization, you can opt out for your own account:

1.  Click your profile picture.
2.  Go to **Your settings → Preferences → Privacy**.
3.  Under **Chat history**, use the toggle. The label matches your organization's retention period (for example, **Allow chat history to be saved up to one year**).

-   **On**: Glean keeps your chats for your organization's retention period.
-   **Off**: Glean does not store your chats, even when chat history is on for your organization.

You can't set a custom number of days. You can only turn chat history on or off for your account.

### Delete your chat history[​](#delete-your-chat-history "Direct link to Delete your chat history")

1.  Go to **Settings → Preferences → Privacy**.
2.  Under **Delete chat history**, click **Delete**.
3.  When prompted, click **Delete** to confirm.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### I don't see chat history search

-   Refresh your browser tab and try again.
-   Confirm that your organization has **Chat history** enabled.
-   Check whether the thread falls outside your organization's retention window.

### I can't find a conversation I remember

-   Try other keywords from the title or from the conversation itself.
-   Confirm you used the same account when the chat happened.

## See also[​](#see-also "Direct link to See also")

-   [Chat history](/administration/assistant/configuration/chat-history) for admin setup and retention
