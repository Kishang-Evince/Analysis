---
url: "https://docs.glean.com/connectors/native/gcal/faqs"
canonical: "https://docs.glean.com/connectors/native/gcal/faqs"
title: "Frequently asked questions (FAQ)"
description: "Common questions around Google Calendar integration."
fetched_at: "2026-10-13T08:49:52.099Z"
---
Google Calendar indexing and live calendar lookup serve different Glean features. Use these answers to check their requirements and access limits.

### What’s the difference between the native (indexed) and federated modes for Google Calendar?

-   **Native (data crawling and indexing):**
    -   Stores meeting metadata in Glean’s index.
    -   Powers indexed meeting search, hero cards, and the Meeting Summary agent.
-   **Federated (data fetching):**
    -   Fetches live calendar data at query time without indexing it.
    -   Supports calendar lookup in Glean Assistant and autonomous agents, including longer date ranges and accessible colleagues' calendars and shared calendars.

You can enable both retrieval methods on a single connector for maximum flexibility.

### How far back and ahead does Glean index my meetings?

-   Up to **6 months of past events**.
-   Up to **3 months of future events**.

These limits apply to native indexing and features that depend on that index, not all calendar lookup. Glean Assistant and autonomous agents support live lookups over longer ranges, such as 3–12 months back or ahead. See [Calendar search](/tools/glean/calendar-search).

### Why do some meetings show only as “busy” with no details in Glean search or in Calendar?

Glean respects Google Calendar permissions and event visibility:

-   If you have free/busy access but not access to event details, Glean doesn't expose the event's title or description.
-   Private-event details remain hidden unless your source permissions allow you to view them.
-   Opening the event in Google Calendar reflects the same source permissions.

### What’s required for a Meeting Summary agent to work?

-   The Google Calendar connector must have **data crawling and indexing** enabled and a successful crawl.
-   The meeting must have either a **Google Meet transcript** or **Gemini-generated notes** accessible via Google Drive.
-   The event must be within the indexed time window (6 months past, 3 months future).

### Do I need to set up anything special for Calendar search tools in agents?

Your admin must configure Google Calendar access, and the person running the lookup must have access to the requested calendar. Live lookup in Glean Assistant and autonomous agents doesn't require the event to be indexed. See [Calendar Search Tools Setup](/administration/tools/setup-tools/calendar-search-tools-setup#google-calendar).

For a legacy workflow agent, add the Calendar search step to the workflow. Legacy workflows receive performance improvements, but not the expanded date-range, colleague-calendar, or shared-calendar lookup capabilities.
