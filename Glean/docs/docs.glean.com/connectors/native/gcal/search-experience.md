---
url: "https://docs.glean.com/connectors/native/gcal/search-experience"
canonical: "https://docs.glean.com/connectors/native/gcal/search-experience"
title: "Search experience"
description: "Learn how Glean search works with Google Calendar."
fetched_at: "2026-10-13T08:49:52.374Z"
---
On this page

Find meetings through indexed Search, or use live calendar lookup in Glean Assistant and autonomous agents. Indexed meeting cards and summaries have different requirements from live lookup.

## Rich meeting results[​](#rich-meeting-results "Direct link to Rich meeting results")

When a user searches for terms that match:

-   A meeting **title**
-   **Transcript or Gemini notes** content
-   **Attached documents** referenced in a meeting invite

Glean can show a **hero meeting card** at the top of the results page, highlighting:

-   The meeting title
-   Key participants
-   Linked documents
-   Transcript snippets matching the query

This makes it easy to go from a question (“What did we decide for Gcal setup changes?”) to the exact meeting that contains the answer.

*User's query matches a meeting transcript:* ![User’s query matches a transcript](/assets/images/nativegcalimage5-42d3390fcb660b99745f8fdbf2b03611.png)

*User's query matches a meeting title:* ![User’s query matches meeting title](/assets/images/natviegcalimage10-42d3390fcb660b99745f8fdbf2b03611.png)

## Operator search[​](#operator-search "Direct link to Operator search")

Users can narrow calendar results with standard operators. Supported operators include (among others):

-   `app:googlecalendar` — Restrict results to Google Calendar events
-   `updated:` — Search based on the meeting start time (as “updated” field)
-   `type:` — Filter by event type (currently a single event type is supported)
-   `organizer:` — Filter by organizer
-   `participants:` — Filter by invited participants
-   `before:` / `after:` — Time-bounded search for meetings before or after a date/time

Example:

```
app:googlecalendar after:now organizer:"alex@company.com"
```

finds upcoming meetings organized by a specific user.

## Meeting Summary agent[​](#meeting-summary-agent "Direct link to Meeting Summary agent")

On the Glean home page, when the connector and transcripts are configured, past meetings show a **sparkle icon**. Clicking it opens the **Meeting Summary agent**, which:

-   Summarizes the meeting
-   Highlights explicit **action items**
-   Identifies key **decision-makers** and potential **experts**
-   Surfaces related documents for follow-up work

This requires:

-   Google Calendar native indexing
-   Available transcript or Gemini notes for that meeting

## Calendar search tool for agents[​](#calendar-search-tool-for-agents "Direct link to Calendar search tool for agents")

Glean Assistant and autonomous agents can use live calendar lookup to search longer date ranges and accessible colleagues' calendars, team calendars, rooms, resources, subscribed calendars, and holiday calendars. These lookups require configured calendar access and the requesting user's source permissions, not an indexed copy of each event.

Legacy workflow agents can use the **Calendar search** step to retrieve events for later steps. They receive calendar lookup performance improvements, but not the expanded lookup capabilities.

Keep native indexing enabled for indexed Search, rich meeting cards, and the Meeting Summary agent. Live calendar lookup doesn't change the indexing requirements for those features.

For connection requirements, see [Calendar Search Tools Setup](/administration/tools/setup-tools/calendar-search-tools-setup). For example queries and workflow step configuration, see [Calendar search](/tools/glean/calendar-search).
