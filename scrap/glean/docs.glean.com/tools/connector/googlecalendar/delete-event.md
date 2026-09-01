---
url: "https://docs.glean.com/tools/connector/googlecalendar/delete-event"
canonical: "https://docs.glean.com/tools/connector/googlecalendar/delete-event"
title: "Delete event"
description: "Delete an existing event from a connected Google Calendar"
fetched_at: "2026-09-01T13:30:01.825Z"
---
On this page

The *Google Calendar Delete event* tool removes an existing event from a connected Google Calendar. Use this write tool to cancel meetings, clean up outdated entries, or remove events that are no longer needed.

The tool is typically used together with read tools such as *Find event* to locate the target event first, then delete it by its identifier.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean Tools must be enabled for your instance and the Google Calendar tools must be available.
-   Ensure a connected Google Calendar account exists for the user. The connected account must have permission in Google Calendar to delete events.
-   Google Calendar must be connected as a connector for Glean tools.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Calendar ID | String | Identifier of the calendar that owns the event. Use "primary" for the user's main calendar. **Required.** |
| Event ID | String | Identifier of the specific event to delete. **Required.** |
| Send updates | String | Policy for sending cancellation notifications to attendees (for example, all, externalOnly, none). |

## Examples[​](#examples "Direct link to Examples")

note

This tool requires an Event ID. Use the **Find event** tool to locate the event and retrieve its Event ID before deleting it.

-   "Delete my 3 PM design review meeting on Friday."
    
-   "Cancel tomorrow's one-on-one with Alex and remove it from my calendar."
    
-   "Remove the duplicate team standup event from next Monday."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Event was not deleted

-   **Possible cause:** The event ID or calendar ID does not match an existing event that the user can access, or the event may have already been deleted.
-   **Fix:** Use *Find event* to retrieve a valid event ID before calling *Delete event*. Ensure the calendar ID is correct (use "primary" for the user's main calendar).

### Permission or authentication error

-   **Possible cause:** The connected Google Calendar account does not have permission to delete the event, or the OAuth token is invalid or expired.
-   **Fix:** Confirm that the user's connected account has edit permissions for the event (organizer or writer access). If needed, reconnect the Google Calendar account to refresh the OAuth token.

## FAQs[​](#faqs "Direct link to FAQs")

### Is this tool reversible?

Deleted events may be recoverable from Google Calendar's trash for a limited time, depending on Google's retention policies. However, this tool should be treated as a permanent deletion within the context of the agent workflow.

### Does this tool send notifications to attendees?

Notification behavior depends on the `Send updates` parameter. When set, Google Calendar sends cancellation notifications to attendees according to the specified policy.

### Can I delete a recurring event?

Deleting a recurring event by its base event ID removes all instances of the recurring series. To cancel a single occurrence, use the specific instance's event ID instead.
