---
url: "https://docs.glean.com/administration/tools/setup-tools/calendar-search-tools-setup"
canonical: "https://docs.glean.com/administration/tools/setup-tools/calendar-search-tools-setup"
title: "Calendar Search Tools Setup"
description: "You can set up a Calendar Search Tool in Glean to integrate calendar data with multiple Glean features, such as:"
fetched_at: "2026-09-01T13:29:14.976Z"
---
You can set up a Calendar Search Tool in Glean to integrate calendar data with multiple Glean features, such as:

-   Search
-   Home Page
-   Agents

You can choose between two meeting ecosystems for your organization:

-   Google Calendar & Meet
-   Microsoft Outlook & Teams

When you set up a calendar search tool for your organization, you are influencing the functionality of these features. How calendar data is integrated and what data is available to Glean depends on your meeting ecosystem.

You can use the table below to identify supported functionality across Calendar event and a meeting Transcript elements:

| Meeting element | Search | Home page summarization | Glean queries | Agent |
| --- | --- | --- | --- | --- |
| Microsoft Outlook Calendar events | Searching for Outlook calendar events is supported | Supported through calendar events on Calendar card on home page | Querying for past outlook events is supported | Ability to fetch Outlook calendar events through Calendar Search Tool is supported |
| Microsoft Teams transcripts | Unsupported due to unavailability of transcript URL from Microsoft | Summarization of team transcripts is supported. Follow-up Q&A is unsupported | Querying for past teams transcripts is supported | Ability to fetch transcript is unsupported |
| Google Calendar events | Searching for Google calendar events is supported | Supported through calendar events on Calendar card on home page | Querying for past Google calendar events is supported | Ability to fetch Google calendar events through Calendar Search Tool is supported |
| Google Meet transcript | Supported through app:googlecalendar, meeting title search and structured results (based on ranking relevance) | Summarization of Meet transcripts and follow-up Q&A is unsupported | Querying for past Google meet transcripts is supported | Google transcripts are stored as a Google doc. Ability to read transcript documents is supported |

Perform the following connector setup steps to set up the calendar search tool for your meeting ecosystem:

[

### Google Calendar







](/connectors/native/gcal/)[

### Microsoft Teams







](/connectors/native/teams/)

To use calendar search tools as part of an Agent, refer to the [Calendar Search Tool](/tools/glean/calendar-search) article.
