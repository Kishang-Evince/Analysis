---
url: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/faq"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/faq"
title: "Frequently asked questions"
description: "Quick answers to common questions about Glean in Slack."
fetched_at: "2026-09-01T13:29:11.829Z"
---
On this page

## General[​](#general "Direct link to General")

### What is Glean in Slack?

Glean in Slack (also known as Gleanbot) integrates enterprise search and knowledge directly into Slack. It detects questions and provides AI-powered answers, supports `/glean` search, daily digests, Code Writer, and sidebar access.

### Does Glean in Slack cost extra?

If using Glean's Azure OpenAI key, there is no additional cost. If using your own key (BYOK), automatic channel responses incur usage-based costs.

### Which Slack plans are supported?

Glean supports standard Slack workspaces and Slack Enterprise Grid organizations.

## Privacy and permissions[​](#privacy-and-permissions "Direct link to Privacy and permissions")

### Can other people see my Glean answers?

By default, Glean responses are private and only visible to you. In channels with Public Mode enabled, answers may be visible to everyone in the channel thread.

### Does Glean respect my content permissions?

Yes. Answers are personalized and strictly respect the content permissions of the user who asked the question. You only see information you have access to.

### Why does Glean respond in some channels but not others?

Glean only responds in channels where it has been explicitly added. It also does not respond in channels that include external parties.

## Features[​](#features "Direct link to Features")

### What is the /glean command?

Type `/glean` followed by your search query in any channel to search across all connected connectors. Results are visible only to you with an option to share.

### What is the daily digest?

A personalized summary of selected Slack channels and topics delivered as a direct message. You can subscribe to up to 10 topics and 100 channels.

### What is Slack RTS?

Slack Real-Time Search is an optional upgrade that retrieves Slack messages live at query time for faster, fresher search results.

### What is Code Writer?

Code Writer lets you turn Slack conversations, incidents, and escalations into draft GitHub pull requests without leaving Slack.

### What is Public Mode?

Public Mode allows Glean to share answers directly in Slack channel threads, visible to all channel members, using only broadly shared content.

### What is the Slack sidebar?

The Glean sidebar lets you access Glean Assistant and agents from Slack's top-right corner without switching to the web app.
