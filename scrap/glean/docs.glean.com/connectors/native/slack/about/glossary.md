---
url: "https://docs.glean.com/connectors/native/slack/about/glossary"
canonical: "https://docs.glean.com/connectors/native/slack/about/glossary"
title: "Slack glossary"
description: "Key terms and definitions for Glean's Slack connectors and integrations."
fetched_at: "2026-09-01T13:29:42.895Z"
---
This glossary defines the key terms you will encounter when setting up and managing Glean's Slack connectors and integrations.

| Term | Description |
| --- | --- |
| **Slack RTS app** | The Slack Real Time Search (RTS) Marketplace app managed by Glean. It connects Glean to Slack's RTS API so Glean can fetch Slack messages live at query time using Slack's own search engine. This is Slack's preferred, long-term way for partners to access Slack data. |
| **Slack custom app** | A Slack app you create and own in the Slack app admin panel (typically named *Glean* or similar). You copy its Client ID, Client secret, Signing secret, and sometimes App-Level token into the Slack connector setup in Glean. During RTS migration, you update this app's manifest so it has the right scopes and does not conflict with the RTS app. |
| **Slack Enterprise Graph app** | The Enterprise Grid version of your Glean Slack custom app. As part of upgrading to RTS, Glean updates this app's manifest (including its name and bot display name, for example to *Glean Enterprise Graph*) and adds extra bot scopes so Glean can understand channels and memberships across all workspaces in your Slack Enterprise Grid. |
| **Gleanbot** | The Glean app experience inside Slack. Gleanbot reads questions in channels or DMs, looks across your company's knowledge (including Slack, docs, tickets, and more), and replies with answers and summaries - either automatically or when someone mentions **@Glean** or uses `/glean`. |
| **Glean app in Slack** | The Slack application called "Glean" that your users see in Slack. They can open a DM with Glean, add it to channels, use `/glean` search, or open the Glean sidebar. Behind the scenes, this app uses both the RTS app and your native or Enterprise Graph connector configuration. |
| **Glean agents deployed in Slack** | Glean agents (AI apps) that are published into Slack. Their responses can appear as DMs or thread replies in channels, and they can also respond to Slack workflow messages. Admins configure which channels an agent can post to and whether responses are private to the requester or visible to everyone in the channel. |
