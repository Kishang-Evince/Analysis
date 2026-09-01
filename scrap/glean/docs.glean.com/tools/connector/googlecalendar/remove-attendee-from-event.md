---
url: "https://docs.glean.com/tools/connector/googlecalendar/remove-attendee-from-event"
canonical: "https://docs.glean.com/tools/connector/googlecalendar/remove-attendee-from-event"
title: "Remove attendee from event"
description: "Remove a single attendee from an existing Google Calendar event by updating the event's guest list"
fetched_at: "2026-09-01T13:30:02.615Z"
---
On this page

*Remove attendee from event* tool removes a single attendee from an existing Google Calendar event. This is a write tool that modifies the event's attendee list without affecting other event details.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Ensure a connected Google Calendar account exists for the user.
-   The connected account must have permission in Google Calendar to add events.
-   Google Calendar must be connected as a connector for Glean tools.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Attendee email | String | Email address of the attendee you want to remove from the event. |
| Event ID | String | Identifier of the specific calendar event from which the attendee will be removed. |
| Calendar ID | String | Identifier of the calendar that owns the event. Use "primary" for the user's main calendar. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

note

This tool requires an Event ID. Use the **Find event** tool to locate the event and retrieve its Event ID before removing an attendee.

-   "Remove [abc.xyz@example.com](mailto:abc.xyz@example.com) from my 2 PM product review meeting today."
    
-   "Take [abc.xyz@example.com](mailto:abc.xyz@example.com) off the attendee list for tomorrow's team standup."
    
-   "Remove [abc.xyz@example.com](mailto:abc.xyz@example.com) from the quarterly planning meeting next week."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Attendee was not removed from the event

-   **Possible cause:** The attendee email address does not exactly match any attendee on the event, or the attendee was already removed.
-   **Fix:** Verify that the attendee email matches exactly (including case and domain) with an attendee on the event. Use Find event to retrieve the current attendee list and confirm the email address before calling Remove attendee from event.

### Tool fails with invalid event ID or calendar ID

-   **Possible cause:** The event ID or calendar ID does not match an existing event that the user can access, or the event may have been deleted.
-   **Fix:** Use Find event to retrieve a valid event ID before calling Remove attendee from event. Ensure the calendar ID is correct (use "primary" for the user's main calendar).

### Permission or authentication error

-   **Possible cause:** The connected Google Calendar account does not have permission to modify the event, or the OAuth token is invalid or expired.
-   **Fix:** Confirm that the user's connected account has edit permissions for the event (organizer or writer access). If needed, reconnect the Google Calendar account to refresh the OAuth token.

## FAQs[​](#faqs "Direct link to FAQs")

### Does this tool send notifications to attendees?

Notification behavior is controlled by Google Calendar's settings, not by this tool. Google Calendar will automatically send update notifications to remaining attendees according to the calendar's notification preferences.

### Can I remove multiple attendees at once?

No. This tool removes one attendee at a time. To remove multiple attendees, call the tool multiple times with different attendee email addresses, or use the Update google event tool to replace the entire attendee list.

### What happens if I try to remove an attendee who is not on the event?

The tool will complete without error, but no changes will be made to the event since the specified attendee was not present in the attendee list.

### Can I remove the event organizer?

No. The event organizer cannot be removed from their own event. This tool only removes non-organizer attendees from the guest list.
