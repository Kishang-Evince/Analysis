---
url: "https://docs.glean.com/tools/connector/googlecalendar/list-events"
canonical: "https://docs.glean.com/tools/connector/googlecalendar/list-events"
title: "List events"
description: "Retrieves events from a specific Google Calendar with support for filters such as time range, event types, and search terms"
fetched_at: "2026-09-01T13:30:02.227Z"
---
On this page

The *List events* tool to retrieve calendar events from a specific Google Calendar. This is a read-only tool that supports filters such as time range, event types, search terms, and extended properties.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Ensure a connected Google Calendar account exists for the user.
-   The connected account must have permission in Google Calendar to add events.
-   Google Calendar must be connected as a connector for Glean tools.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Calendar ID | String | Calendar identifier. Use "primary" for the user's main calendar or a specific calendar ID for shared calendars. |
| Time min | String | Lower bound (exclusive) for an event's end time to filter by. Must be an RFC3339 timestamp with time zone offset (e.g., 2011-06-03T10:00:00-07:00). |
| Time max | String | Upper bound (exclusive) for an event's start time to filter by. Must be an RFC3339 timestamp with time zone offset. Must be greater than timeMin if both are set. |
| Event types | Array | Event types to return. Acceptable values: birthday, default, focusTime, fromGmail, outOfOffice, workingLocation. Can be repeated for multiple types. |
| Single events | Boolean | Whether to expand recurring events into instances. Default is false. |
| Order by | String | Order of events in results. Acceptable values: startTime, updated. Default is unspecified stable order. |
| Max results | Integer | Maximum number of events per page. Default is 250, maximum is 2,500. |
| Page token | String | Token specifying which result page to return for pagination. |
| Show deleted | Boolean | Whether to include deleted events (cancelled status). Default is false. |
| Show hidden invitations | Boolean | Whether to include hidden invitations. Default is false. |
| Time zone | String | Time zone used in the response. Default is the user's primary time zone. |
| q | String | Free text search terms to find events matching these terms in various fields. |
| iCal UID | String | Event ID in iCalendar format to search for a specific event. |
| Max attendees | Integer | Maximum number of attendees to include in the response. |
| Sync token | String | Token from previous list request's nextSyncToken to retrieve only changed entries. |
| Updated min | String | Lower bound for event's last modification time (RFC3339 timestamp) to filter by. |
| Private extended property | String | Extended properties constraint as propertyName=value. Matches only private properties. |
| Shared extended property | String | Extended properties constraint as propertyName=value. Matches only shared properties. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Show me all my meetings this week."
    
-   "List all events on my calendar for tomorrow."
    
-   "What events do I have next Monday?"
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### No events are returned

-   **Possible cause:** The calendar ID is incorrect, the time range is too narrow, or the event types filter is invalid.
-   **Fix:** Confirm that *Calendar ID* is correct (use "primary" for the user's main calendar). Verify that *Time min* and *Time max* define a window that contains events. Ensure any *Event types* values are supported: birthday, default, focusTime, fromGmail, outOfOffice, or workingLocation.

### Time range filters behave unexpectedly

-   **Possible cause:** The timeMin or timeMax parameters are not valid RFC3339 timestamps, or timeMin is not earlier than timeMax.
-   **Fix:** Verify that *Time min* and *Time max* are valid RFC3339 timestamps with time zone offsets (e.g., 2025-09-22T00:00:00+05:30). Ensure *Time min* is earlier than *Time max*.

### Event types filters do not return expected events

-   **Possible cause:** Some event types like focusTime and workingLocation are only available on certain Google Workspace editions, or the calendar does not support the specified type.
-   **Fix:** Verify that your Google Workspace edition supports the event types you are filtering for. If results are still incorrect, ask your admin to confirm you are on a recent version of the Google Calendar tools service.

## FAQs[​](#faqs "Direct link to FAQs")

### Does this tool modify my calendar?

No. List events is a read-only tool that retrieves calendar events but does not create, update, or delete any events.

### How is List events different from Find event?

List events gets events from a specific calendar and is best when you already know which calendar and time range you care about. Find event is optimized for search-style queries across a calendar using free-text search, date ranges, and event types.

### How do Time min, Time max, and Time zone work together?

**Time min** and *Time max* define the time window for returned events and must be RFC3339 timestamps with explicit time zone offsets. If you do not set **Time zone**, the user's primary time zone is used when interpreting and returning event times.

### Can I retrieve events from multiple calendars at once?

No. This tool retrieves events from a single calendar specified by *Calendar ID*. To get events from multiple calendars, call the tool multiple times with different calendar IDs.
