---
url: "https://docs.glean.com/tools/glean/calendar-search"
canonical: "https://docs.glean.com/tools/glean/calendar-search"
title: "Calendar search"
description: "Search and retrieve events from supported calendars."
fetched_at: "2026-09-01T13:30:06.916Z"
---
On this page

The Glean calendar search tool allows you to search and retrieve events from supported calendars and perform tasks based on scheduled events. This tool currently supports:

-   Google calendar
-   Microsoft Outlook calendar

The actual tasks you can perform with the calendar search tool vary based on the calendar you're using. For information on setting up calendar tools, see the [Set up tools](/administration/tools/setup-tools) article of the Admin documentation.

## Google Calendar[​](#google-calendar "Direct link to Google Calendar")

The Glean calendar search tool allows you to search and retrieve events from supported calendars and perform tasks based on scheduled events. This tool currently supports Google calendar.

### Usage Examples[​](#usage-examples "Direct link to Usage Examples")

After you have set up the [Google Calendar connector](/connectors/native/gcal/setup), you can:

-   Query calendar events in Glean: Ask questions about your past and upcoming calendar events directly in Glean.
-   Retrieve calendar events using Agent Builder: Build agents that search and retrieve calendar data.
-   Find meetings in Search: Search for Google Calendar events and transcripts within Glean Search.
-   Use Meeting Summarization on Glean Home page: Summarize meetings to understand key decisions and action items. Limitation: Follow-up queries through the summarization modal are currently unsupported.

note

In Glean, calendar search is only available in Thinking mode and not in Fast mode.

### Configuration[​](#configuration "Direct link to Configuration")

caution

**Prerequisites**

Before you can use the calendar search tool with agents, data crawling and indexing must be set up for [Google Calendar connectors](/connectors/native/gcal/setup).

Enable calendar search in an agent:

1.  Go to the Glean app.
2.  Select Agents and click **Create Agent**.
3.  Select the step of an agent.
4.  Search and select the Calendar Search tool.
5.  Provide a natural language input (e.g., "Search for my next meeting with John") or a search operator input (e.g., `after:now before:2025-04-29`).

note

To retrieve exhaustive calendar results, set **Number of Results** to **As many as possible**. The default setting is **Let AI decide**.

## Outlook Calendar[​](#outlook-calendar "Direct link to Outlook Calendar")

The Outlook calendar search tool retrieves events from Outlook calendars through a Microsoft metered API. Unlike [Outlook tools](/tools/connector/outlook-tools), which perform actions like sending email and managing events, Calendar Search is read-only. It finds and returns calendar data.

### Usage Examples[​](#usage-examples-1 "Direct link to Usage Examples")

After you have set up the [Outlook calendar connector](/connectors/native/outlook/new-setup), you can:

-   Query calendar events in Glean: Ask questions about your past and upcoming calendar events directly in Glean.
-   Retrieve calendar events using Agent Builder: Build agents that search and retrieve calendar data.
-   Find meetings in Search: Search for Outlook calendar events and transcripts within Glean Search. Use an operator query such as `app:msteams` to search Outlook calendar events.
-   Use Meeting Summarization on Glean Home page: Summarize meetings to understand key decisions and action items. Limitation: Follow-up queries through the summarization modal are currently unsupported.

note

In Glean, calendar search is only available in Thinking mode and not in Fast mode.

### Configuration[​](#configuration-1 "Direct link to Configuration")

caution

**Prerequisites**

Before you can use the calendar search tool with agents, data crawling and indexing must be set up for the [Outlook calendar connector](/connectors/native/outlook/new-setup). Outlook Calendar Search uses domain-delegated access, and the required credentials are captured during connector setup.

For the complete setup flow, see [Microsoft 365 tools and extension tools setup](/administration/tools/setup-tools/m365-tools-setup).

Enable calendar search in an agent:

1.  Go to the Glean app.
2.  Select Agents and click **Create Agent**.
3.  Select the step of an agent.
4.  Search and select the Calendar Search tool.
5.  Provide a natural language input (e.g., "Search for my next meeting with John") or a search operator input (e.g., `after:now before:2025-04-29`).

note

To retrieve exhaustive calendar results, set **Number of Results** to **As many as possible**. The default setting is **Let AI decide**.
