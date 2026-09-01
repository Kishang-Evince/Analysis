---
url: "https://docs.glean.com/tools/connector/googlecalendar/gc-find-free-slots"
canonical: "https://docs.glean.com/tools/connector/googlecalendar/gc-find-free-slots"
title: "Find free slots"
description: "Find free and busy time slots in Google Calendar for one or more calendars over a time range"
fetched_at: "2026-09-01T13:30:02.014Z"
---
On this page

The *Google Calendar Find free slots* tool retrieves free and busy time slots for one or more calendars within a specified time range. Use this read-only tool to find common availability across multiple calendars before scheduling meetings.

The tool supports multiple calendar identifiers including primary calendars, user or resource email addresses, and calendar IDs. It returns both busy intervals with event metadata and calculated free slots between them. If you do not supply start or end datetimes, the tool defaults to the current day in UTC.

## Limitations[​](#limitations "Direct link to Limitations")

-   The tool can return free/busy information for at most 50 calendars (`calendar_expansion_limit`) and can expand at most 100 calendar identifiers for a single group (`group_expansion_limit`); higher values cause errors.
    
-   Every entry in `Calendar identifiers` must be a valid calendar identifier such as `primary`, a calendar or user email, or a supported calendar ID. If any identifier is invalid or not found, the tool returns an error instead of partial results.
    
-   Each call uses one time zone context for interpreting the start and end datetimes and for computing free slots.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean tool must be enabled for your instance and the Google Calendar tools must be available.
-   Ensure a connected Google Calendar account exists for the user. The user must have permission to read free/busy information for each calendar identifier included in `Calendar identifiers`.
-   Google Calendar must be connected as a connector for Glean tools.
-   The user must pass a valid time zone identifier so the tool can correctly interpret the requested time window.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Name | Type | Description |
| --- | --- | --- |
| Start datetime | Datetime | Start of the time window to analyze. If omitted, the tool uses the beginning of the current UTC day as the default start time. |
| End datetime | Datetime | End of the time window to analyze. Must be later than `Start datetime` when both are provided. If omitted, the tool uses the end of the current UTC day by default. |
| Timezone | Timezone | Time zone used to interpret `Start datetime` and `End datetime` and to present computed free and busy slots. Marked as a recommended field in the tool schema. |
| Calendar identifiers | Array | List of calendar identifiers to query. Each item must be a valid calendar identifier: `primary`, a calendar or user email (for example, `user@example.com`), or a calendar ID ending with a Google Calendar domain. All identifiers are validated and the tool returns an error if any entry is invalid or not found. Defaults to `["primary"]` when omitted. |
| Calendar expansion limit | Integer | Maximum number of calendars for which the tool provides free/busy information. Default is `50`; higher values are not allowed and will result in an error. |
| Group expansion limit | Integer | Maximum number of calendar identifiers that can be expanded for a single group. Default is `100`; an error is returned if a group contains more members than this value. |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to schedule a meeting with three team members and need to find a time when everyone is available next week.

*Instruction to an agent:*

"Find a 1-hour time slot next Tuesday or Wednesday when **[alice@company.com](mailto:alice@company.com)**, **[bob@company.com](mailto:bob@company.com)**, and **[carol@company.com](mailto:carol@company.com)** are all available."

*Resulting behavior:*

-   Calls Find free slots with:
    
    -   `Calendar identifiers` set to \["[alice@company.com](mailto:alice@company.com)", "[bob@company.com](mailto:bob@company.com)", "[carol@company.com](mailto:carol@company.com)"\].
        
    -   `Start datetime` set to next Tuesday at 9:00 AM (for example, 2025-01-14T09:00:00).
        
    -   `End datetime` set to next Wednesday at 6:00 PM (for example, 2025-01-15T18:00:00).
        
    -   `Timezone` set to the user's local timezone (for example, America/Los\_Angeles).
        
-   Retrieves availability data including:
    
    -   Busy intervals for each calendar with event details (start time, end time, event summary).
        
    -   Calculated free slots between busy periods that are common across all three calendars.
        
-   Identifies free slots of at least 1 hour duration.
    
-   Presents the available time slots to the user, for example:
    
    -   Tuesday 1:00-2:00 PM
        
    -   Tuesday 3:30-5:00 PM
        
    -   Wednesday 10:00-11:30 AM
        
-   User selects a slot and the agent can pass it to Create event to schedule the meeting.
    

*Workflow tip:* Combine this tool with Create event to build intelligent scheduling agents. Use the returned busy event metadata to filter out lunch hours or focus time blocks. Set appropriate `Calendar expansion limit` if querying many calendars to avoid exceeding the 50-calendar maximum.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Invalid calendar identifier

-   **Possible cause:** One or more entries in Calendar identifiers are not valid calendar IDs or emails, or refer to calendars the caller cannot access.
-   **Fix:** Verify that each identifier is primary, a correct email address, or a valid Google Calendar ID such as one ending with @group.calendar.google.com, and that the caller has permission to view its free or busy information.

### Start datetime must be before End datetime

-   **Possible cause:** The start date time is equal to or later than the end date time.
-   **Fix:** Adjust the values so that Start datetime clearly precedes End datetime, or omit one of them to fall back to the default current day window.

### Error related to calendar or group expansion limits

-   **Possible cause:** The number of calendars or expanded group members exceeds calendar\_expansion\_limit (50) or group\_expansion\_limit (100).
-   **Fix:** Lower these parameter values or reduce the number of calendars and groups in Calendar identifiers so that the expanded set stays within the allowed limits.

## FAQs[​](#faqs "Direct link to FAQs")

### What happens if I do not pass start or end times?

If Start datetime or End datetime are omitted, the tool defaults to querying the current day in UTC and still enforces that the effective start precedes the end of the window.

### Can I query shared or resource calendars?

Yes. As long as you include valid calendar identifiers such as user or resource email addresses or calendar IDs ending with a supported Google Calendar domain, the tool will validate them and include their availability in the response.
