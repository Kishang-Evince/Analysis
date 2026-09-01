---
url: "https://docs.glean.com/tools/connector/googlecalendar/quick-add-event"
canonical: "https://docs.glean.com/tools/connector/googlecalendar/quick-add-event"
title: "Quick add event"
description: "Create a Google Calendar event from natural-language text for simple one-off scheduling in a specified calendar"
fetched_at: "2026-09-01T13:30:02.405Z"
---
On this page

The *Quick add event* tool to create simple, one-off calendar events from natural-language text. This is a write tool and parses the text to extract the event title, date, and time, and creates the event on the specified calendar with only the authenticated user as the participant.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Ensure a connected Google Calendar account exists for the user.
-   The connected account must have permission in Google Calendar to add events.
-   Google Calendar must be connected as a connector for Glean tools.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Calendar ID | String | Identifier of the calendar for the event. Use 'primary' for the main calendar, or provide a specific calendar ID |
| Event details | String | Natural language input describing the event; Google Calendar parses this for event details like title, date, and time. |
| Send updates | String | Controls whether email notifications about the event creation are sent to attendees. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Add a quick reminder to my calendar for the all-hands meeting tomorrow at 2 pm."
    
-   "Create a calendar event for lunch with the team on Friday at noon."
    
-   "Schedule a dentist appointment next Tuesday at 10 am."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Attendees are not added even when mentioned in the text

-   **Possible cause:** Quick add event does not support direct attendee addition.
-   **Fix:** Use **Create event** or **Update google event** tools if you need to manage attendees.

### Tool fails or behaves unexpectedly for non-primary calendars

-   **Possible cause:** The calendar identifier passed to the tool does not match an existing calendar. For non-primary calendars, the calendar ID may be invalid. For non-primary calendars, the calendar id must be valid for the call to succeed.
-   **Fix:** Make sure the calendar ID you pass matches an existing calendar. For non-primary calendars, use a valid calendar ID for the call to succeed.

### Tool not available in a given environment

-   **Possible cause:** Internal restriction level or beta status prevents the tool from being listed in that context.
-   **Fix:** Ask your Glean admin to confirm whether this tool is enabled for your tenant and whether your environment is configured to surface beta tools.

## FAQs[​](#faqs "Direct link to FAQs")

### When should I use \*Quick add event\* instead of \*Create event\*?

Use Quick add event when the user wants to create a simple, one-off meeting or reminder from a short natural-language sentence. Use Create event when you need to control attendees, recurrence, reminders, locations, or other detailed settings.

### Can I add attendees with \*Quick add event\*?

No. Quick add event creates an event only with the authenticated user as the participant. To invite others, use Create event or Update google event.

### Does Quick add event support recurring events?

No. Quick add event is intended for single, non-recurring events. Use Create event or Update google event for recurring meetings.
