---
url: "https://docs.glean.com/connectors/native/outlook-calendar/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/outlook-calendar/troubleshooting"
title: "Troubleshooting"
description: "Resolve Outlook Calendar permission errors and investigate missing calendar events or meeting transcripts in Glean"
fetched_at: "2026-10-13T08:50:08.756Z"
---
On this page

Resolve setup errors and missing content for the Outlook Calendar connector. For configuration steps, see [Set up Outlook Calendar](/connectors/native/outlook-calendar/setup).

## Permissions and access[​](#permissions-and-access "Direct link to Permissions and access")

Check the reported error before changing credentials or permissions.

### Setup reports missing Graph permissions[​](#setup-reports-missing-graph-permissions "Direct link to Setup reports missing Graph permissions")

**Symptoms:**

-   Setup reports `OUTLOOK-CALENDAR_1` or a required application permission is missing

Use the reported permission to identify the app configuration that needs attention.

| Cause | Fix |
| --- | --- |
| **Missing consent or application permissions:** the app's token doesn't include a required Graph permission. | Check all five application permissions and ask a Global Administrator or Privileged Role Administrator to grant admin consent. See [Outlook Calendar permissions](/connectors/native/outlook-calendar/permissions) and [OUTLOOK-CALENDAR\_1](/troubleshooting/error-codes/microsoft/outlook-calendar/outlook-calendar-1). |
| **Incorrect credentials:** the configured IDs or credentials don't match the authorized app. | Compare the **Directory (tenant) ID**, **Application (client) ID**, and selected authentication method with the app registration. For an existing connection created by Glean, contact your account team before replacing credentials. |

### The app can't access online meetings[​](#the-app-cant-access-online-meetings "Direct link to The app can't access online meetings")

**Symptoms:**

-   Transcript retrieval reports `OUTLOOK-CALENDAR_2`
-   Online meeting access fails for all users or a subset of users

Application consent and application access policies are separate requirements.

| Cause | Fix |
| --- | --- |
| **Missing application access policy:** Microsoft hasn't authorized the app to access the organizer's online meetings. | Configure and assign an application access policy that includes the Outlook Calendar app's client ID. See [Configure the application access policy](/connectors/native/outlook-calendar/setup#configure-the-application-access-policy). |
| **A user has an overriding policy:** a per-user policy doesn't include the Glean app, even though the global policy does. | Have your Microsoft administrator add the app to the appropriate policy without removing existing app access. See [OUTLOOK-CALENDAR\_2](/troubleshooting/error-codes/microsoft/outlook-calendar/outlook-calendar-2). |

### Microsoft blocks transcript API access[​](#microsoft-blocks-transcript-api-access "Direct link to Microsoft blocks transcript API access")

**Symptoms:**

-   Transcript retrieval reports `OUTLOOK-CALENDAR_3`

This error concerns Microsoft Graph transcript access, not speaker attribution.

| Cause | Fix |
| --- | --- |
| **Transcript access is off:** Microsoft Graph reports that transcript access is turned off in the Teams admin center. | Ask a Teams Administrator or Global Administrator to turn on **Microsoft Graph access** under **Meetings → Meeting settings → Transcript API access**. If it is already on, check app-level permissions. See [OUTLOOK-CALENDAR\_3](/troubleshooting/error-codes/microsoft/outlook-calendar/outlook-calendar-3). |

**Still not resolved?** Contact [Glean Support](https://support.glean.com) with the connector name, exact error text, affected meeting time, and whether the issue affects all users or specific users. Don't send client secrets or private keys.

## Missing content[​](#missing-content "Direct link to Missing content")

Check calendar indexing separately from live lookup and transcript retrieval.

### A meeting is missing from Search[​](#a-meeting-is-missing-from-search "Direct link to A meeting is missing from Search")

**Symptoms:**

-   An event appears in Outlook or live calendar lookup but not in indexed Search

An accessible source event isn't necessarily within the indexing scope.

| Cause | Fix |
| --- | --- |
| **Different connection modes:** an existing Outlook Calendar connection can provide live access without calendar indexing. | Ask your Glean admin to confirm which modes are enabled. Contact your account team before changing an existing connection's indexing mode. |
| **Outside the crawl scope:** the event date or organizer isn't included in the regular user-event crawl. | Check the meeting date and organizer against your crawl configuration. Full event crawls request the previous 90 days and the next seven days by default. This window isn't an absolute indexing boundary. |
| **Canceled event or hidden attendees:** Glean skips canceled events and attendee copies that hide the attendee list. | Check whether the event was canceled or hides attendees. Enabling attendee-copy crawling doesn't include these copies. For an event with hidden attendees, Glean needs the organizer's copy. |

**Still not resolved?** Contact [Glean Support](https://support.glean.com) with the meeting date, organizer, and whether the event is missing from Search, live lookup, or both. Share meeting details through your approved support channel.
