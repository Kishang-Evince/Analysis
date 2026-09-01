---
url: "https://docs.glean.com/tools/connector/googlecalendar/find-event"
canonical: "https://docs.glean.com/tools/connector/googlecalendar/find-event"
title: "Find event"
description: "Search for events in a Google Calendar using text, date ranges, and event types"
fetched_at: "2026-09-01T13:30:02.105Z"
---
On this page

The *Google Calendar find event* tool searches for events in a specified Google Calendar using a combination of free-text search terms, start and end dates, event types, and last-updated time filters. It lets agents or workflows look up existing meetings that match a name, timeframe, or update window, and then use those events in downstream logic.

It supports use cases like rescheduling an existing meeting by name, grooming upcoming meetings for a period, for example, checking agenda, room, and attendee acceptance, and finding all events during an out-of-office window to cancel or decline them.  
This tool allows controlling how many results to return and how they are ordered, so agents can retrieve either a small focused set of matches or a broader list of events to post-process.  
It can include or exclude deleted events and expand recurring series into individual instances, depending on how you configure the parameters.  
This is a read-only retrieval tool. It returns matching event metadata but does not create, update, or delete any events in the calendar.

## Limitations[​](#limitations "Direct link to Limitations")

-   It operates on a single calendar per call, identified by a calendar ID and cross-calendar queries require multiple calls or a different tool.
    
-   Time-based filters, for example, for *tomorrow* must ultimately resolve to valid timestamp formats accepted by the underlying calendar provider; otherwise the provider can return *improper time format* errors.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean tool must be enabled for your instance and the Google Calendar tools must be available.
-   Ensure a connected Google Calendar account exists for the user. The user must have permission to read free/busy information for each calendar identifier included in `Calendar identifiers`.
-   Google Calendar must be connected as a connector for Glean tools.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Calendar ID | String | The calendar identifier to search, such as a primary calendar or a specific calendar ID. |
| Event types | Array | Filter for specific event types to include in results. |
| Results limit | Integer | Results limit and controls how many matching events are returned. |
| Sort by | String | Sort by field for the returned events (for example, start time or last updated). |
| Page token | String | Pagination token to request the next page of results from a previous call. |
| Search terms | String | Search terms to match against event fields such as summary or description. |
| Include deleted events | Boolean | Whether to include deleted events in the search results. |
| Expand recurring events | Boolean. Defaults to *false*. | Whether to expand recurring events into individual instances instead of returning series objects. |
| End date | String | End date or datetime for the search window; events after this point are excluded. |
| Start date | String | Start date or datetime for the search window; events before this point are excluded. |
| Updated after | String | Only return events that were updated after this timestamp. |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to review all your meetings for next week to ensure they have agendas and are properly set up before the week begins.

*Instruction to an agent:*

"Show me all my calendar events for next week and check if they have meeting agendas. For any meetings without agendas, flag them for me."

*Resulting behavior:*

-   Calls Find event with:
    
    -   `Calendar ID` set to primary (the user's main calendar).
        
    -   `Start date` set to the start of next week (for example, 2025-01-13T00:00:00).
        
    -   `End date` set to the end of next week (for example, 2025-01-19T23:59:59).
        
    -   `Results limit` set to 50 to capture a reasonable number of events.
        
    -   `Expand recurring events` set to true to show individual meeting instances.
        
-   Retrieves all matching events including:
    
    -   Event summary (meeting title)
        
    -   Event description (agenda text)
        
    -   Start and end times
        
    -   Attendee list
        
    -   Event ID for further actions
        
-   Analyzes each event's description field to check for agenda content.
    
-   Identifies meetings without agendas and presents them to the user with suggestions to add agenda text.
    

*Workflow tip:* Use the `Search terms` parameter to filter events by keywords (for example, "standup" or "1:1"). Combine with `Updated after` to find recently modified events. Set `Include deleted events` to false (default) to only see active meetings.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Improper time format from the calendar provider

-   **Possible cause:** The time-related parameters, for example, timeMin or timeMax were derived from a natural language phrase like tomorrow and did not match the expected timestamp format of the provider.
-   **Fix:** Ensure that time parameters are converted to valid timestamps before calling the tool, and avoid passing raw natural language date strings. It must be an RFC3339 timestamp.

### No events returned even though events exist

-   **Possible cause:** Filters such as Start date, End date, Search terms, or Updated after are too restrictive.
-   **Fix:** Broaden the time range, remove or relax the search terms, and temporarily clear updated\_min to confirm that the tool can see events on the selected calendar.

## FAQs[​](#faqs "Direct link to FAQs")

### Can I use this tool to search across multiple calendars at once?

Not directly. This tool searches a single calendar identified by calendar ID. To search multiple calendars, run the tool separately for each calendar and combine the results in your agent logic.
