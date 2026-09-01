---
url: "https://docs.glean.com/connectors/native/gcal/faqs"
canonical: "https://docs.glean.com/connectors/native/gcal/faqs"
title: "Frequently asked questions (FAQ)"
description: "Common questions around Google Calendar integration."
fetched_at: "2026-09-01T13:29:27.233Z"
---
### What’s the difference between the native (indexed) and federated modes for Google Calendar?

-   **Native (data crawling and indexing):**
    -   Stores meeting metadata in Glean’s index.
    -   Powers rich meeting search, hero cards, Meeting Summary agent, and calendar tools.
-   **Federated (data fetching):**
    -   Does not index meeting content. Fetches live data at query time.
    -   Historically used for homescreen widgets and simple availability lookup, without AI features.

You can enable both retrieval methods on a single connector for maximum flexibility.

### How far back and ahead does Glean index my meetings?

-   Up to **6 months of past events**.
-   Up to **3 months of future events**.

Events outside this window will not appear in search, Meeting Summary agent, or calendar tools.

### Why do some meetings show only as “busy” with no details in Glean search or in Calendar?

Glean respects Google Calendar permissions and event visibility:

-   If the event is marked **private**, or if the user only has free/busy access on the calendar, Glean surfaces only a **busy block** without title or description.
-   Opening the event in Calendar from Glean shows the same limited view (for example, “Private” with just time and busy status).

### What’s required for a Meeting Summary agent to work?

-   The Google Calendar connector must have **data crawling and indexing** enabled and a successful crawl.
-   The meeting must have either a **Google Meet transcript** or **Gemini-generated notes** accessible via Google Drive.
-   The event must be within the indexed time window (6 months past, 3 months future).

### Do I need to set up anything special for Calendar search tools in agents?

Yes:

1.  Ensure **data crawling and indexing** is enabled and healthy for the Google Calendar connector.
2.  In each agent’s configuration, enable [Calendar search](/tools/glean/calendar-search).
