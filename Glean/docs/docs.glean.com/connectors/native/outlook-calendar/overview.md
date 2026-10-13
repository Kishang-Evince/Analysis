---
url: "https://docs.glean.com/connectors/native/outlook-calendar/overview"
canonical: "https://docs.glean.com/connectors/native/outlook-calendar/overview"
title: "Outlook Calendar overview"
description: "Learn what Outlook Calendar indexes, which calendar features it supports, and what limits apply"
fetched_at: "2026-10-13T08:50:08.746Z"
---
On this page

The Outlook Calendar connector provides indexed calendar search, live event lookup, and answers from supported Microsoft Teams meeting transcripts. Some existing connections support live lookup without calendar indexing.

For email, see [Outlook](/connectors/native/outlook/). For channel and chat messages, see [Microsoft Teams](/connectors/native/teams/).

## What Glean indexes[​](#what-glean-indexes "Direct link to What Glean indexes")

Glean can index the following content:

-   Calendar events, including the title, description, start and end times, organizer, and available attendee information
-   Supported Microsoft Teams meeting transcript text for meeting answers

Calendar event coverage follows the connection's configured users and date range. Live lookup uses the user's calendar access separately from indexed event permissions. See [Outlook Calendar permissions](/connectors/native/outlook-calendar/permissions).

## Limitations[​](#limitations "Direct link to Limitations")

-   An event available through live lookup might not appear in indexed Search.
-   Transcript access requires Microsoft permissions and access to the meeting. Finding an event doesn't guarantee that its transcript is available.
-   Glean skips canceled events and attendee copies with hidden attendee lists.

## See also[​](#see-also "Direct link to See also")

-   [Set up Outlook Calendar](/connectors/native/outlook-calendar/setup) — review prerequisites and configure a new connection
-   [Calendar search](/tools/glean/calendar-search) — review live lookup capabilities and examples
-   [Troubleshoot Outlook Calendar](/connectors/native/outlook-calendar/troubleshooting) — investigate setup errors and missing content
