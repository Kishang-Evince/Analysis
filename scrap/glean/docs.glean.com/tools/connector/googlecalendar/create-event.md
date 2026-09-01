---
url: "https://docs.glean.com/tools/connector/googlecalendar/create-event"
canonical: "https://docs.glean.com/tools/connector/googlecalendar/create-event"
title: "Create event"
description: "Create a new event in a connected Google Calendar"
fetched_at: "2026-09-01T13:30:01.836Z"
---
On this page

The *Google Calendar Create event* tool creates a new event on a connected Google Calendar using parameters such as start time, attendees, summary, duration, and optional meeting link. By design, the tool automatically includes the event creator as one of the attendees.

Use this write tool in scheduling workflows, often combined with *Google Calendar Find free slots* to first identify open time ranges and then schedule the final meeting. The tool supports core scheduling fields and advanced options such as recurrence, location, guest permissions, and visibility controls.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean tool must be enabled for your instance and the Google Calendar tools must be available.
-   Ensure a connected Google Calendar account exists for the user. The connected account must have permission in Google Calendar to create events.
-   Google Calendar must be connected as a connector for Glean tools.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Attendees | Array | List of attendees for the event. |
| Birthday properties | Object | Provider-specific object reserved for configuring birthday-style events, if supported. |
| Calendar ID | String | Identifier of the target calendar where the event will be created. |
| Create meeting room | Boolean | Whether to generate an online meeting link (for example, a video-conferencing room) for this event. |
| Description | String | Longer free-form description or agenda text for the event. |
| Event type | String | Event type value used by the provider (for example, standard meeting vs focus time or out of office, where supported). |
| Event Duration (Hours) | Integer | Number of whole hours in the event duration. |
| Event Duration (Minutes) | Integer | Number of minutes in the event duration, combined with event\_duration\_hour to get total length. The default duration is 30 minutes. |
| Exclude organizer | Boolean | Whether to exclude the organizer from the attendee list, even though they own the event. |
| Focus time properties | Object | Additional configuration for focus time events when the event type indicates focus time (for example, special visibility or blocking behavior). |
| Guests can invite others | Boolean | Whether guests are allowed to invite additional attendees to the event. |
| Guests can see other guests | Boolean | Whether guests can see the full attendee list on the event. |
| Guests can modify | Boolean | Whether guests are allowed to modify event details such as time, location, or description. |
| Location | String | Human-readable location for the event (for example, a room name or address). |
| Out of office properties | Object | Additional configuration for out-of-office events when the event type indicates out of office. |
| Recurrence | Array | Recurrence rules that define how and when the event repeats (for example, weekly or monthly patterns). |

## Usage example[​](#usage-example "Direct link to Usage example")

You want to schedule a team planning meeting by first finding available time slots and then creating the event with appropriate settings.

*Instruction to an agent:*

"Find a time when **Alice**, **Bob**, and **Carol** are all available next week for a 1-hour meeting, then schedule our **Q1 Planning Session** with a meeting link. Set it so guests can invite others but cannot modify the event."

*Resulting behavior:*

-   Calls *Find free slots* to identify available time slots for Alice, Bob, and Carol next week.
    
-   Presents available slots to the user and confirms which slot to book.
    
-   Calls Create event with:
    
    -   `Start datetime` set to the selected slot (for example, 2025-01-15T14:00:00).
        
    -   `Attendees` set to \["[alice@company.com](mailto:alice@company.com)", "[bob@company.com](mailto:bob@company.com)", "[carol@company.com](mailto:carol@company.com)"\].
        
    -   `Summary` set to "Q1 Planning Session".
        
    -   `Event Duration (Hours)` set to 1.
        
    -   `Create meeting room` set to true to generate a video conference link.
        
    -   `Guests can invite others` set to true.
        
    -   `Guests can modify` set to false.
        
-   Creates the calendar event on the connected user's calendar.
    
-   Automatically includes the event creator in the attendee list.
    
-   Returns the event details including the meeting link.
    

*Workflow tip:* Combine this tool with *Find free slots* to build intelligent scheduling agents. Use the `Event Duration` parameters to specify custom meeting lengths, and leverage guest permission flags to control meeting management capabilities.

## FAQs[​](#faqs "Direct link to FAQs")

### Is Create event tool considered destructive?

No. Create event is a non-destructive creation tool that adds new events without deleting or modifying existing calendar data.
