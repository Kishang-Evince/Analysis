---
url: "https://docs.glean.com/user-guide/assistant/team-chat"
canonical: "https://docs.glean.com/user-guide/assistant/team-chat"
title: "Team chat"
description: "Collaborate with teammates inside a single shared Glean chat, where everyone can prompt Glean and build on the same conversation"
fetched_at: "2026-10-13T08:51:29.215Z"
---
On this page

Team chat lets several teammates work with Glean in one shared conversation. One person can ask Glean to build a document, dashboard, or brief, and colleagues join the same thread to shape it with them. Instead of running separate chats and pasting results back and forth, the whole team works in one place and each turn builds on the last.

Prerequisites

An admin must turn on team chat in the **Admin console** before you can use it. See [Team chat](/administration/assistant/features/team-chat).

## Share a chat with your team[​](#share-a-chat-with-your-team "Direct link to Share a chat with your team")

Open any chat and click **Share** to add teammates as **Editor**. Each person you add gets an email and a Slack notification with a link to the conversation. From there, they can send their own messages, work with Glean directly, and edit anything the chat produces.

Team chat only works between people who have the feature enabled, so it's best to share within a group your admin has already turned it on for. If you share with someone who doesn't have it enabled, they can read the conversation but can't participate. See [Who can join a shared chat](#who-can-join-a-shared-chat).

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

Sharing a chat doesn't change anyone's access to underlying data. Each message runs with the permissions of the person who sent it. When you ask a question, Glean draws on what you can access. When a teammate asks a question in the same thread, Glean draws on what they can access. Glean labels each message with its author so it's clear who asked what.

Teammates can read the answers already generated in the thread. They can't click through to source documents they don't have permission to see. It works like sharing a document: once information is in the shared conversation, everyone with access can read it.

Glean doesn't restrict responses to the access level shared by everyone in the chat. Limiting every answer to the group's common access would return thin results as a chat grows, and it would remove the main reason to collaborate, which is bringing in a teammate who has context you don't.

note

Responses post to the thread as Glean generates them, so other participants see them without a review step. Consider what you ask in a shared chat the same way you would in a meeting or a group channel.

## Use cases[​](#use-cases "Direct link to Use cases")

Team chat works for any shared conversation. These patterns are common places to start.

### Co-author a document or dashboard[​](#co-author-a-document-or-dashboard "Direct link to Co-author a document or dashboard")

One person asks Glean to build something, such as a client dashboard or a project brief, then invites colleagues to refine it. Anyone in the thread can prompt Glean to change the artifact and leave comments for teammates to pick up.

The artifact stays live and connected to its sources while the whole team works on it, so you never export to another tool and lose the link to your data. This fits proposals, dashboards, and recurring reports.

### Hand off a line of inquiry[​](#hand-off-a-line-of-inquiry "Direct link to Hand off a line of inquiry")

One person does the initial exploration, then hands the thread to someone who takes it further. A technical lead can set up a chat, pull in the relevant context, and get an investigation to a useful starting point, then share it with a finance partner or an executive who digs into what they care about, without restarting the conversation.

This also works for coaching. A newer teammate can see how an experienced colleague prompts Glean, then ask their own follow-up questions in the same thread instead of starting cold. This fits manager-to-analyst handoffs, cross-functional research, and onboarding someone into an ongoing workstream.

### Troubleshoot together[​](#troubleshoot-together "Direct link to Troubleshoot together")

When two people hold different pieces of a problem, they can work it in real time in one place. Each person's questions draw on what they can see, and the thread accumulates the full picture as you go. This fits incident investigation, cross-team debugging, and any question where no single person has all the context.

## Behavior and limits[​](#behavior-and-limits "Direct link to Behavior and limits")

Team chat is in beta, so some of this is still changing. Here's what to know before you rely on it day to day.

### Turn Glean replies on or off[​](#turn-glean-replies-on-or-off "Direct link to Turn Glean replies on or off")

By default, Glean replies to every message in the thread. Use the **Glean replies** switch near the composer to turn that off and talk to your teammates only. Even when it's off, @mentioning Glean in a message still gets a reply, so you can pull it back in for a single turn.

You can @mention a teammate the same way to address them directly in the thread.

### Catch up on what you missed[​](#catch-up-on-what-you-missed "Direct link to Catch up on what you missed")

When you open a shared chat that has unread messages, a **Catch me up** button appears. Select it to have Glean summarize what happened since you were last in the thread, or dismiss it to read through the messages yourself.

### How requests queue[​](#how-requests-queue "Direct link to How requests queue")

If two people submit while Glean is already working, requests queue and run serially. The queue shows who submitted what, so it's clear what's coming next.

### Draft in a private thread first[​](#draft-in-a-private-thread-first "Direct link to Draft in a private thread first")

Open the **Thread** panel from a chat to work with Glean privately alongside the main conversation. Use it to test a prompt, explore something half-formed, or check something sensitive before deciding whether it belongs in the group thread.

When you have something worth sharing, highlight the text and select **Share with main chat**. You share only the text you selected, not the underlying sources.

### How artifact access works[​](#how-artifact-access-works "Direct link to How artifact access works")

Artifacts don't have their own separate permissions today. Giving someone edit access to a chat lets them edit every artifact in that conversation. That's what makes co-authoring possible, so be deliberate about it: adding a person to help with one document also gives them edit rights on everything else the thread has produced. If you need someone involved in a single artifact only, build it in its own chat.

### Who can join a shared chat[​](#who-can-join-a-shared-chat "Direct link to Who can join a shared chat")

If you share a chat with someone whose account doesn't have team chat enabled, they can view the conversation but can't participate. During the beta, keep shared chats within the group your admin has enabled, since the view-only experience still has rough edges.

## See also[​](#see-also "Direct link to See also")

-   [Share chats](/user-guide/assistant/chat-sharing) — share a read-only copy of a conversation with people who aren't collaborating in it
-   [Team chat](/administration/assistant/features/team-chat) — how admins turn team chat on and decide who gets it
