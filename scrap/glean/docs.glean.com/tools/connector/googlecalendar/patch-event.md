---
url: "https://docs.glean.com/tools/connector/googlecalendar/patch-event"
canonical: "https://docs.glean.com/tools/connector/googlecalendar/patch-event"
title: "Patch event"
description: "Update an existing Google Calendar event by changing specific fields"
fetched_at: "2026-09-01T13:30:02.457Z"
---
On this page

The *Google Calendar Patch event* tool updates an existing event in a Google Calendar by changing selected fields while leaving unspecified fields unchanged. Use this write tool to reschedule meetings, refine event details, or clean up calendar entries without recreating events from scratch.

The tool is typically used together with read tools such as GOOGLECALENDAR\_FIND\_EVENT to locate the right event first, then apply targeted updates.

## Limitations[​](#limitations "Direct link to Limitations")

-   Time-based fields such as `start time` and `end time` must ultimately resolve to valid timestamp formats accepted by the underlying calendar provider; otherwise the provider can return time-format errors.
    
-   As this is a write tool that modifies external calendar data, some chat or agent experiences may require explicit user confirmation before it runs, depending on how your admin configures tool permissions.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean tool must be enabled for your instance and the Google Calendar tools must be available.
-   Ensure a connected Google Calendar account exists for the user. The connected account must have permission in Google Calendar to create events.
-   Google Calendar must be connected as a connector for Glean tools.
-   The caller must be able to identify the target event to patch, for example, by first calling a search or list tool and then passing its identifier into this tool.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Attendees | array | List of email addresses for attendees. Replaces existing attendees. Provide an empty list to remove all. |
| Calendar ID | string | Identifier of the calendar that owns the event. **Required.** |
| Conference data version | integer | API client's conference data support version. Set to 1 to manage conference details (e.g., Google Meet links); 0 (default) ignores conference data. Examples: 0 1. |
| Event description | string | Detailed description or agenda text for the event. |
| End time | string | Event end date and time, usually in ISO 8601 format. |
| Event ID | string | Identifier of the specific event to update. **Required.** |
| Location | string | Location of the event (room name, address, or conferencing info). |
| Max attendees | integer | Maximum number of attendees to include or process for this event update. |
| Rsvp response | string | RSVP status for the attendee or organizer (for example, accepted, tentative, declined). |
| Send updates | string | Policy for sending updates to attendees (for example, all, externalOnly, none). |
| Start time | string | Event start date and time, usually in ISO 8601 format. |
| Title | string | Short title or summary of the event. |
| Supports attachments | boolean | Whether the event supports file attachments. |
| Timezone | string | Time zone used to interpret the start and end times (for example, `America/Los_Angeles`). |

## Usage example[​](#usage-example "Direct link to Usage example")

You need to reschedule your weekly team standup meeting from Monday to Tuesday because of a conflict.

*Instruction to an agent:*

"Find my **Weekly Team Standup** meeting next Monday and reschedule it to Tuesday at the same time. Also update the location to **Conference Room B**."

*Resulting behavior:*

-   Calls Find event to locate the meeting with:
    
    -   `Search terms` set to "Weekly Team Standup".
        
    -   `Start date` and `End date` covering next Monday.
        
    -   `Calendar ID` set to primary.
        
-   Retrieves the event including its Event ID and current start time (for example, Monday 10:00 AM).
    
-   Calls Patch event with:
    
    -   `Calendar ID` set to primary.
        
    -   `Event ID` set to the retrieved event identifier.
        
    -   `Start time` set to Tuesday at 10:00 AM (for example, 2025-01-14T10:00:00).
        
    -   `End time` set to Tuesday at 10:30 AM (for example, 2025-01-14T10:30:00).
        
    -   `Timezone` set to the user's timezone (for example, America/Los\_Angeles).
        
    -   `Location` set to "Conference Room B".
        
-   Updates only the specified fields (start time, end time, location) while leaving other fields like attendees, description, and title unchanged.
    
-   Sends calendar update notifications to attendees based on the `Send updates` parameter (defaults to provider settings).
    

*Workflow tip:* Combine this tool with Find event to build intelligent meeting management agents. Only include the fields you want to change in the patch request. Use the `Send updates` parameter to control whether attendees are notified of changes.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Improper time format from the calendar provider

-   **Possible cause:** Time-related parameters such as start time or end time were derived from natural-language phrases and did not match the provider's expected timestamp format.
-   **Fix:** Ensure that time parameters are converted to valid timestamps before calling the tool, and avoid passing raw natural language date strings.

### No observable change on the event after the tool runs

-   **Possible cause:** The payload did not include any updatable fields, for example, only identifiers were passed or the values matched the existing event.
-   **Fix:** Confirm that at least one of the editable fields such as title, event description, start time, end time, location, timezone, or attendees is set to a new value before retrying.

## FAQs[​](#faqs "Direct link to FAQs")

### Does this tool create new events?

No. This tool only modifies existing calendar events; use the create-event tool when you need to add a brand new meeting.
