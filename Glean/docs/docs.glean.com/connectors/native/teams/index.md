---
url: "https://docs.glean.com/connectors/native/teams/"
canonical: "https://docs.glean.com/connectors/native/teams/"
title: "Microsoft Teams"
description: "Connect Microsoft Teams channel and chat messages to Glean for permission-aware search"
fetched_at: "2026-10-13T08:50:21.455Z"
---
On this page

![Teams logo](/img/connectors/icons/microsoft365.svg)Teams

# Search Teams content in Glean

Index channel messages and group chats for permission-aware search. Access follows each user's Teams membership.

Channel messagesGroup chatsOptional private chatsCertificate authStandalone connector

[Set up the connector](/connectors/native/teams/setup)[Calendar events and transcripts](/connectors/native/outlook-calendar/)

Use Outlook Calendar for new calendar and meeting transcript connections. If your organization still uses a Teams-based calendar connection, keep its configuration and follow the existing-connection guidance in [Teams transcripts](/connectors/native/teams/teams-transcripts).

If an existing Teams-based calendar connection crawls events, it uses the organizer's copy by default rather than copies in attendees' calendars. Glean may not index meetings from organizers whose calendars it doesn't crawl. This boundary applies to calendar events, not channel or chat messages. See [Understand calendar crawl coverage](/connectors/native/outlook/about#calendar-event-crawling).

## General information[​](#general-information "Direct link to General information")

[

### Overview

What the Teams connector indexes and how permissions are enforced.







](/connectors/native/teams/about)

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

[

Default

### Connector setup

Register the Azure app, grant permissions, and configure Teams in Glean.







](/connectors/native/teams/setup)[

Separate connector

### Outlook Calendar

Set up calendar events and supported meeting transcripts independently of Teams messages.







](/connectors/native/outlook-calendar/)

## Support[​](#support "Direct link to Support")

[

### Error codes

Look up Teams connector error codes and what they mean.







](/troubleshooting/error-codes/microsoft/teams/teams-1)
